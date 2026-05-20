# Phase 0: Cosmic Dawn

**Version:** 0.0.1 → 0.0.3 (Pre-Alpha) | **Duration:** 6–9 months | **Target:** Q3 2026 → Q2 2027

&gt; _"From void to first light — establishing the fundamental laws"_
&gt; **Philosophy:** The Big Bang of our OS universe. Nothing borrowed. Everything understood. Everything owned.

## Architecture Map

```
Hardware
  └── HAL: Hardware Abstraction Layer (DDR-HAL)
        └── Bootloader (Horizon Boot)
              └── Kernel Entry Point
                    ├── Early Console
                    └── kernel_main() [Rust]
                          ├── Physical Memory Manager  (DDR-003)
                          ├── Virtual Memory Manager   (DDR-003)
                          ├── Capability System        (DDR-002)
                          ├── IPC Fast Path            (DDR-006)
                          └── Scheduler (Base)         (DDR-005)
```

---

## Task: Physical Memory Manager

**Component:** `cosmos_pmm` (Buddy allocator) | **DDR:** DDR-003

**What it does:** Tracks which physical pages are free/used. Buddy allocator for page-granularity allocation. Built from UEFI memory map at boot.

### Implementation

- Parse UEFI memory map passed from bootloader
- Buddy allocator: 4KB base order, up to 1GB pages (order 18)
- Zero all pages on free — no stale data leaks
- Per-NUMA-node free lists for topology-aware allocation
- ZRAM subsystem: compress cold pages with LZ4/Zstd (transparent)

### Security Rules

- No `unsafe` blocks — pure safe Rust
- 4KB alignment enforced on every allocation
- Zero on free: prevents data leaks between processes
- Kani verification required before Phase 0 exits

### Testing

```bash
cargo kani --harness pmm_alloc_free_harness
cargo test --package cosmos_pmm
```

- Alloc/free stress test: 1M allocations, verify no leaks
- Kani verification: no overflow, no double-free, no use-after-free
- NUMA test: allocations stay on local NUMA node

### Troubleshooting

| Problem                  | Likely Cause                       | Fix                                                |
| ------------------------ | ---------------------------------- | -------------------------------------------------- |
| PMM panics on boot       | UEFI memory map misread            | Validate memory map entries; skip reserved regions |
| Alloc returns wrong size | Buddy order calculation off-by-one | Add Kani harness for order calculation             |
| NUMA alloc on wrong node | Missing topology detection         | Parse ACPI SRAT table for NUMA topology            |

---

## Task: Virtual Memory Manager

**Component:** `cosmos_vmm` | **DDR:** DDR-003

**What it does:** Maps virtual addresses to physical pages via 4-level PML4 page tables. Creates/destroys page tables. Handles demand paging, copy-on-write.

### Implementation

- x86-64: 4-level PML4 (48-bit VA), optional 5-level PML5 for &gt;128TB
- ARM64: 4-level (48-bit VA)
- RISC-V: Sv48 (4-level)
- ASLR: randomise user address space layout at process creation
- Guard pages on kernel stack

### Security Rules

- No kernel memory mapped into userspace — ever
- ASLR entropy: minimum 28 bits on x86-64
- Validate all page table entries before activation
- No TLB flush storms: use `INVLPG` for single pages, `INVPCID` for process

### Testing

- Page walk fuzzing: random virtual addresses, verify correct resolution
- ASLR entropy test: 1000 process spawns, measure VA randomness
- Page fault handler: inject faults, verify &lt;500ns handling
- W^X enforcement: writable pages must not be executable

### Troubleshooting

| Problem                               | Likely Cause                             | Fix                                        |
| ------------------------------------- | ---------------------------------------- | ------------------------------------------ |
| Page fault on valid address           | TLB not flushed after map                | Add `INVLPG` after every `map_page()` call |
| ASLR entropy too low                  | PRNG not seeded with hardware randomness | Use `RDRAND` for ASLR seed                 |
| Kernel address in userspace backtrace | Missing U/S bit in page table            | Set U/S = 0 on all kernel pages            |

---

## Task: Capability System

**Component:** `cosmos_caps` | **DDR:** DDR-002, DDR-020, DDR-021, DDR-024

**What it does:** Every resource access requires a typed capability token. Kernel mints, transfers, and revokes capabilities. Processes cannot forge or inspect raw tokens.

### Implementation

- Per-process capability table: 256 slots default, 1M system-wide limit
- Integer handles — opaque to userspace, validated by kernel on every syscall
- Atomic check-and-use: validation happens within the syscall frame — no TOCTOU
- `CAP_LOCK` flag: lock a capability for duration of an operation
- Reference counting: `cap_revoke()` marks REVOKED, defers free until refcount = 0
- Intent-based: `FileCapability:/path:READ_FOR_AUTH` (DDR-021)
- Delegation chain depth: maximum 8 hops

### Security Rules

- No ambient authority — every access needs an explicit cap
- Atomic validation — no capability can be revoked between check and use
- `CLOCK_MONOTONIC` for all lease expiry — no wall-clock manipulation
- Cap table in MPK domain — write-only via `cap_lookup()` / `cap_alloc()`

### Testing

```bash
cargo kani --harness cap_toctou_harness
cargo fuzz run cap_fuzz_target -- -max_total_time=300
```

- TOCTOU test: race condition between revocation and use
- Fuzzing: 300s cap system fuzzing
- Delegation chain test: verify 9-hop chain is rejected
- Rate limit test: 10,001 syscalls/sec must be rate-limited

### Troubleshooting

| Problem                    | Likely Cause                     | Fix                                                             |
| -------------------------- | -------------------------------- | --------------------------------------------------------------- |
| Capability deadlock        | Circular dependency in cap graph | Static analysis for cycles; never allow circular delegation     |
| TOCTOU still possible      | Re-validation not atomic         | Use kernel spinlock for entire check-and-use window             |
| System-wide cap exhaustion | No per-user limits enforced      | Enforce per-user limit of 65,536; reject at 80% system capacity |

---

## Task: IPC Fast Path

**Component:** `cosmos_ipc` | **DDR:** DDR-006 (DDR-004 in master index)

**What it does:** Synchronous message passing with &lt;500ns latency for small messages. Zero-copy page remapping for large payloads.

### Implementation

- Small messages (&lt;256 bytes): copy through kernel, synchronous scheduling
- Large messages: `MemoryCapability` transfer — remap pages between address spaces
- All IPC requires a capability token — no unauthenticated messages
- Caller-ID verified in every message — services know who is calling

### Security Rules

- Capability-gated: no IPC without an `IPCCapability`
- Caller-ID injected by kernel — cannot be spoofed by userspace
- Zero-copy: kernel never copies large payloads, only remaps pages

### Testing

- IPC latency benchmark: small message round-trip must be &lt;500ns on QEMU
- Large payload test: 1GB transfer via page remap, verify no copy overhead
- Fuzzing: `cargo fuzz run ipc_fuzz_target -- -max_total_time=300`
- Capability gate test: IPC attempt without cap → `ECAPINVALID`

---

## Task: Scheduler Core

**Component:** `cosmos_sched` | **DDR:** DDR-005

**What it does:** Five scheduling classes. Heterogeneous dispatch: CPU + GPU + NPU + TPU. Tickless kernel. Topology-aware on P/E-core CPUs.

### Implementation

| Class       | For                  | Behaviour                             |
| ----------- | -------------------- | ------------------------------------- |
| RealTime    | Audio, HID drivers   | FIFO, hard latency guarantees         |
| Interactive | Shell, browser       | Lowest latency, boosts on I/O         |
| Normal      | General processes    | CFS-inspired, fair sharing            |
| Batch       | Compilation, backups | Lower priority, no latency guarantees |
| Idle        | Screen saver         | Only runs when nothing else can       |

- Tickless: `NO_HZ_FULL` — CPU sleeps until next event
- P/E-core aware: interactive tasks → P-cores; batch → E-cores
- GPU timeslice: 16ms (one display frame); gaming: 33ms

### Testing

- 10K thread stress test: all threads make progress, no starvation
- Context switch latency: measure &lt;1µs on x86-64
- Heterogeneous dispatch: GPU task dispatched in &lt;16ms

---

## Task: Cosmos Assembler

**Component:** `cosmos-asm` (Rust) | **DDR:** DDR-IR

**What it does:** Replaces NASM. First step toward self-hosting (B2 in bootstrap sequence).

### Implementation

- Written in Rust — no unsafe in assembler core
- Supports x86-64 AT&T and Intel syntax
- Reproducible output: identical binary output given identical input
- Bootstrap test: `cosmos-asm` assembles its own assembly stubs and output is bit-for-bit identical to NASM output

### Testing

- Bootstrap test: `cosmos-asm kernel_entry.asm` → diff against `nasm kernel_entry.asm` → must be identical
- Fuzz: random instruction sequences, verify no panic

---

## Phase 0 Exit Criteria

&gt; **All of the following must be ✅ Done before proceeding to Phase 1:**

- [ ] UEFI Bootloader (Horizon Boot) — boots QEMU and real x86-64 hardware
- [ ] BIOS legacy bootloader — boots QEMU in legacy BIOS mode
- [ ] Kernel Entry Point — GDT, IDT, SMP, CPU feature detection
- [ ] Physical Memory Manager — buddy allocator, Kani verified
- [ ] Virtual Memory Manager — PML4, ASLR, W^X enforcement
- [ ] Capability System — atomic check-and-use, Kani verified, 300s fuzz
- [ ] IPC Fast Path — &lt;500ns latency, 300s fuzz
- [ ] Scheduler (Base) — 5 classes, tickless, 10K thread stress test
- [ ] Cosmos Assembler — replaces NASM, bootstrap test passes
- [ ] CI/CD pipeline operational
- [ ] QEMU prints `ORION OK`

**Duration:** 6–9 months | **Next:** Phase 1: Core Being
