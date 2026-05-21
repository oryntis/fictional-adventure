# 🌌 About Orion OS

&gt; *"An operating system is not built — it evolves through stages of consciousness."*
&gt; **From bare metal to cosmic harmony — a philosophical journey in 7 phases.**

---

## 📌 Table of Contents

1. [The Mission](#1-the-mission)
2. [Who Is Orion OS For?](#2-who-is-orion-os-for)
3. [The Eco-Advantage](#3-the-eco-advantage)
4. [Core Design Principles](#4-core-design-principles)
5. [Philosophy Matrix](#5-philosophy-matrix)
6. [Feature Comparison Matrix](#6-feature-comparison-matrix)
7. [What Orion OS Learns from Others](#7-what-orion-os-learns-from-others)
8. [Technical Architecture Overview](#8-technical-architecture-overview)
9. [All 39 Design Decision Records (DDRs)](#9-all-39-design-decision-records-ddrs)
10. [Philosophical Problems & Root Causes](#10-philosophical-problems--root-causes)
11. [Space Naming System](#11-space-naming-system)
12. [The North Star — Phase B7](#12-the-north-star--phase-b7)
13. [Version System & Stability Guide](#13-version-system--stability-guide)
14. [Document System](#14-document-system)
15. [Quick Reference Cards](#15-quick-reference-cards)

---

## 1. The Mission

&gt; **Build an operating system that is lighter, faster, more secure, and more future-ready than anything that exists — one that runs beautifully on old hardware, serves every type of user, and helps reduce global e-waste and energy consumption.**

Orion OS is a capability-based, microkernel operating system written entirely in Rust. It treats security as a first-class design constraint, not an afterthought. Every resource — files, network sockets, GPU time, IPC channels — is accessed through an unforgeable **capability token** validated by the Cosmos microkernel. No ambient authority. No confused deputy attacks. No privilege escalation via path traversal.

### The Gap Nobody Is Filling

There is **no operating system today** that is simultaneously:

1. **Lightweight** enough to revive old hardware (2012–2018 machines)
2. **Fast** enough for gaming (competing with Windows)
3. **Secure** enough for servers (capability-based, zero ambient authority)
4. **Smart** enough for AI workloads (first-class NPU/TPU scheduling)
5. **Friendly** enough for everyday users

**This is our target.**

---

## 2. Who Is Orion OS For?

Orion OS is designed to serve **ALL users** — not a niche. This is a critical differentiator from most new OS projects.

| **User Group** | **What They Get** | **Competitive Edge** |
|----------------|-------------------|----------------------|
| **Everyday Users** | Clean, fast, familiar UI. Boots in seconds. Works on 10-year-old laptops. | No learning curve |
| **Gamers** | Low-latency kernel, direct GPU access, no background bloat, faster frame delivery. | Compete with Windows Gaming |
| **AI / ML Engineers** | First-class NPU/TPU/GPU scheduling, huge-page memory, tensor-aware allocator. | Linux lacks this natively |
| **Server / DevOps** | Minimal footprint, deterministic latency, container-native, secure by default. | Beats Alpine/minimal Linux |
| **Old Hardware Owners** | Runs well on machines with 2GB RAM and 10-year-old CPUs. | The biggest untapped market |
| **Enterprise** | Verified boot, mandatory access control, audit trails, zero-trust networking. | Security-first culture trend |
| **Embedded / IoT** | Sub-32MB RAM footprint, deterministic scheduling, RISC-V first-class support. | Purpose-built, not ported |

---

## 3. The Eco-Advantage

&gt; There are ~53 million tonnes of e-waste generated globally per year. A massive portion comes from "obsolete" PCs and laptops that are slow **not because of hardware failure** — but because their OS grew too heavy.

If Orion OS can breathe life into machines from 2012–2018, it could keep hundreds of millions of devices out of landfills.

- Lower idle CPU/RAM usage → less power draw → lower electricity bills and carbon footprint
- Legacy hardware revival → less manufacturing demand → less mining, less pollution
- A measurable stat to market: *"Orion OS uses X% less power than Windows 11 on the same machine"*
- Potential partnerships: schools, NGOs, developing markets, refurbished hardware companies

**This is a story no major OS company is telling — and it resonates deeply with the current generation.**

---

## 4. Core Design Principles

These are **non-negotiable rules** that guide every technical decision. If a feature conflicts with these principles, the feature loses.

| **Principle** | **What It Means in Practice** |
|---------------|-------------------------------|
| **Speed First** | Every subsystem must be measurably faster than Linux equivalents on the same hardware. No exceptions. |
| **Memory Respect** | The OS must run fully functional on 1GB RAM. Idle RAM usage target: under 150MB. |
| **Security by Default** | Secure behaviour is the DEFAULT — users must opt OUT of security, not opt IN. No legacy-permission bolt-ons. |
| **Hardware Universality** | Must support x86-64, ARM64, and RISC-V from day one. No proprietary hardware lock-in. |
| **Future Compute Ready** | First-class support for CPU + GPU + NPU + TPU as equal compute citizens. Not an afterthought. |
| **Zero Trust Networking** | Network stack built on zero-trust principles. No open ports by default. |
| **Eco Accountability** | Power usage must be measurable, reportable, and minimizable at every layer. |
| **Driver Safety** | All drivers run in isolated userspace. A bad driver cannot crash the kernel. |
| **Clean ABI** | No 30-year-old syscall baggage. Clean, capability-based interface from day one. |
| **Self-Sufficiency** | The north star is a system that compiles itself. No permanent dependency on external toolchains. |

---

## 5. Philosophy Matrix

| **Aspect** | **Orion's Innovation** | **Philosophical Foundation** | **Implementation** | **DDR Reference** |
|------------|------------------------|------------------------------|--------------------|--------------------|
| **Security Model** | Pure capability-based (no ambient authority) | "Trust is a vulnerability" | Kernel-enforced capabilities | DDR-002 |
| **Kernel Architecture** | Hybrid microkernel (&lt;500KB Phase 1, &lt;200KB Phase 3 goal) | "Simplicity enables verification" | Minimal core + userspace services | DDR-001 |
| **Driver Model** | Userspace isolation | "Failure containment is freedom" | All drivers run in userspace | DDR-007 |
| **Memory Safety** | Rust + formal verification (Kani) | "Prevention over detection" | No unsafe in kernel core (max 3 blocks) | DDR-010 |
| **AI Integration** | OS-level inference runtime (Quasar) | "Computation should adapt to humans" | Shared model cache, NPU scheduling | DDR-017 |
| **Eco-Friendliness** | Power as first-class resource | "Technology should serve, not consume" | Per-process energy accounting | DDR-014 |
| **Compatibility** | 3-phase transition (POSIX → Native → WASM) | "Evolution without abandonment" | Gradual migration path | DDR-COMIT |
| **Update Mechanism** | Atomic A/B updates with rollback | "Progress without regression" | Snapshot-based updates via Vega FS | DDR-009 |
| **Hardware Support** | Multi-arch from day one (x86, ARM64, RISC-V) | "True portability requires abstraction" | Unified HAL | DDR-HAL |
| **Boot Process** | Measured boot with TPM integration | "Security starts at power-on" | Chain of trust from firmware | DDR-011 |
| **Self-Hosting** | Cosmos Compiler replaces LLVM | "A system is only truly free when it can recreate itself" | Bootstrap B1→B7 | DDR-IR |
| **Confused Deputy** | Intent-based capabilities | "Capabilities must carry purpose, not just permission" | FileCapability:/path:INTENT | DDR-021 |

---

## 6. Feature Comparison Matrix

| **Category** | **Feature** | **Orion OS** | **Linux** | **Windows** | **macOS** | **Qubes OS** | **Orion Improvement** |
|--------------|-------------|--------------|-----------|-------------|-----------|--------------|----------------------|
| **Kernel** | Microkernel Architecture | ✅ Hybrid | ❌ Monolithic | ⚠️ Hybrid (NT) | ⚠️ Hybrid (XNU) | ✅ Pure (Xen) | Formal verification |
| | Memory Safety | ✅ Rust + Kani | ❌ C | ❌ C/C++ | ⚠️ Mixed | ❌ C | &lt;15K lines verified |
| | Real-time Scheduling | ✅ SCHED_DEADLINE | ⚠️ PREEMPT_RT | ⚠️ Yes | ❌ No | ❌ No | Hard real-time guarantees |
| **Security** | Capability-Based Security | ✅ Yes | ❌ No | ❌ No | ❌ No | ✅ Yes | Pure capability model |
| | Mandatory Access Control | ✅ Yes | ⚠️ SELinux | ✅ Yes | ✅ Yes | ✅ Yes | No root, no sudo |
| | Hardware Isolation | ✅ IOMMU mandatory | ⚠️ Optional | ⚠️ Yes | ✅ Yes | ✅ Strong | All DMA through IOMMU |
| | Verified Boot Chain | ✅ Yes | ❌ No | ⚠️ Secure Boot | ✅ Yes | ✅ Yes | Post-quantum (Dilithium3) |
| | Confused Deputy Prevention | ✅ Intent-based caps | ❌ No | ❌ No | ❌ No | ❌ Partial | DDR-021 |
| **Filesystem** | Copy-on-Write | ✅ Vega FS | ⚠️ btrfs | ❌ No | ✅ APFS | ❌ No | O(1) snapshots |
| | Per-Block Checksums | ✅ BLAKE3 | ❌ No | ❌ No | ❌ No | ❌ No | Silent corruption prevention |
| | Atomic Package Updates | ✅ Pre-install snapshot | ❌ No | ⚠️ VSS | ⚠️ Yes | ❌ No | 9-step atomic install |
| **Performance** | Tickless Scheduler | ✅ NO_HZ_FULL | ⚠️ Partial | ⚠️ Partial | ✅ Yes | ❌ No | Maximum power savings |
| | Heterogeneous Scheduling | ✅ P/E/NPU/TPU | ❌ No | ⚠️ Thread Director | ✅ Yes | ❌ No | AI workload aware |
| | Zero-Copy IPC | ✅ Yes | ❌ No | ❌ No | ❌ No | ✅ Yes | Shared memory mapping |
| **Hardware** | Old Hardware Revival | ✅ Target &lt;32MB idle | ❌ No | ❌ No | ❌ No | ❌ No | 600M+ Windows 10 PCs |
| | RISC-V Support | ✅ Day 1 | ⚠️ Partial | ❌ No | ❌ No | ❌ No | First-class architecture |
| | GPU as First-Class | ✅ GPUCapability | ❌ No | ⚠️ DXGK | ✅ Metal | ❌ No | Unified scheduling |
| **AI/ML** | OS-Level Inference Runtime | ✅ Quasar | ❌ No | ❌ No | ⚠️ Core ML | ❌ No | Shared model cache |
| | NPU Scheduling | ✅ Yes | ❌ No | ❌ No | ❌ No | ❌ No | Kernel-managed |
| | Model Weight Sharing | ✅ Yes | ❌ No | ❌ No | ❌ No | ❌ No | MemoryCapability |
| **UX** | Per-App Energy Accounting | ✅ Yes | ❌ No | ❌ No | ❌ No | ❌ No | mW precision |
| | Full Disk Encryption | ✅ TPM+Argon2id | ⚠️ LUKS | ✅ BitLocker | ✅ FileVault | ✅ LUKS | Hardware-bound keys |
| **Dev** | Self-Hosting Compiler | ✅ Cosmos CC (Phase 5) | ❌ No | ❌ No | ❌ No | ❌ No | Full ownership |
| | WASM as Primary App Format | ✅ Yes (Phase 3) | ❌ No | ⚠️ WASI | ❌ No | ❌ No | Universal binaries |
| | Reproducible Builds | ✅ Yes | ⚠️ Partial | ❌ No | ❌ No | ✅ Yes | Bit-for-bit identical |

---

## 7. What Orion OS Learns from Others

### From Linux
| **Feature** | **Linux** | **Orion Approach** |
|-------------|-----------|---------------------|
| Driver Ecosystem | 30+ years of drivers | Linux driver compatibility shim in Phase 1–2 |
| Community Scale | Massive developer community | Build contributor onboarding early |
| Kernel Modules | Loadable kernel modules | **Reject**: All drivers in userspace (DDR-007) |
| Telemetry | None in kernel | **Keep**: Zero telemetry by design |

### From Windows
| **Feature** | **Windows** | **Orion Approach** |
|-------------|-------------|---------------------|
| Hardware Support | Broadest driver compatibility | Prioritise open-source drivers (Intel, AMD) |
| Gaming Ecosystem | DirectX, broad compatibility | Kernel-level anti-cheat attestation (DDR-015) |
| Backward Compatibility | Decades of legacy support | 3-phase compatibility strategy |
| Telemetry | Extensive data collection | **Reject**: Zero telemetry by design |

### From macOS
| **Feature** | **macOS** | **Orion Approach** |
|-------------|-----------|---------------------|
| Power Management | Excellent battery life | Per-process energy accounting (DDR-014) |
| Security | Strong sandboxing | Capability model is even stronger |
| Closed Source | Proprietary kernel | **Reject**: Fully open source |

### From Qubes OS
| **Feature** | **Qubes** | **Orion Approach** |
|-------------|-----------|---------------------|
| Security Isolation | VM-based compartmentalization | Capability-based isolation is lighter weight |
| Verified Boot | Strong boot chain | TPM + Dilithium signatures (DDR-011) |
| Complexity | High (Xen + multiple VMs) | **Improve**: Simpler capability model |

### From seL4
| **Feature** | **seL4** | **Orion Approach** |
|-------------|----------|---------------------|
| Formal Verification | Full kernel verification (10K C lines) | Verify &lt;15K lines of Orion core (DDR-013) |
| Microkernel | Pure microkernel | Hybrid for performance (DDR-001) |
| Capabilities | Strong capability system | Similar but with Rust memory safety |

### From Fuchsia
| **Feature** | **Fuchsia** | **Orion Approach** |
|-------------|-------------|---------------------|
| Microkernel | Zircon microkernel | Hybrid with better IPC |
| Component Architecture | Modular, replaceable | Orion Extensions model |
| Language Choice | Rust + C++ | **Improve**: Rust-only kernel |

---

## 8. Technical Architecture Overview

```
┌──────────────────────────────────────────────────────────────────┐
│                    User Applications (WASM / Native)             │
├──────────────────────────────────────────────────────────────────┤
│  Cosmic Desktop  │  Pulsar Shell  │  Nebula Hub  │  Quasar AI    │
├──────────────────────────────────────────────────────────────────┤
│  Aurora (Display) │  ether-d (Net) │  Vega FS  │  orion-cryptod  │
├──────────────────────────────────────────────────────────────────┤
│           Userspace Drivers (capability-gated, IOMMU-protected)  │
├──────────────────────────────────────────────────────────────────┤
│   Cosmos Microkernel  │  Scheduler │  PMM  │  VMM  │  Cap Table  │
├──────────────────────────────────────────────────────────────────┤
│        HAL (DDR-HAL) — x86-64  │  ARM64  │  RISC-V  │  PowerPC   │
└──────────────────────────────────────────────────────────────────┘
```

### Key Architecture Decisions

| **Decision** | **Choice** | **Why** |
|--------------|------------|---------|
| **Kernel type** | Hybrid microkernel | Security isolation without pure-microkernel IPC overhead |
| **Language** | Rust (kernel + core services) | Memory safety without GC, accepted by Linux in 2022 |
| **Driver model** | 100% userspace | A driver crash cannot crash the OS |
| **Security model** | Capability-based | Zero ambient authority — no root, no sudo |
| **Filesystem** | Vega FS (custom) | CoW, BLAKE3 checksums, O(1) snapshots, native encryption |
| **Crypto** | Post-quantum (Kyber + Dilithium3) | Quantum-resistant from day one |
| **Display** | Aurora (Wayland-compatible) | GPU-accelerated, VRR, HDR, direct scanout |
| **Package manager** | Comit + Nebula Hub | 9-step atomic install with rollback |
| **AI runtime** | Quasar (privileged daemon) | Shared model weights, NPU scheduling, privacy-first |
| **Init system** | orion-init | DAG ordering, socket activation, 6 boot stages |

---

## 9. All 39 Design Decision Records (DDRs)

*Every DDR is ✅ LOCKED. Changing any requires an RFC (see CONTRIBUTING.md).*

### Part 1 — Core Kernel (DDR-001 to DDR-014)

| **DDR** | **Decision Summary** |
|---------|----------------------|
| **DDR-001** | Hybrid microkernel. Cosmos = scheduler + MM + IPC + capability system only. All drivers run in userspace. Hardware isolation via IOMMU. Kernel target: &lt;5K lines / ~500KB Phase 1; &lt;15K lines / ~200KB stretch goal Phase 3. |
| **DDR-002** | Kernel-managed capability tables. Processes hold opaque integer handles. Kernel validates every syscall against the caller's capability table. Processes cannot forge or inspect raw capability tokens. Atomic check-and-use (TOCTOU amendment: CAP_LOCK flag, reference counting, CLOCK_MONOTONIC for all security checks). |
| **DDR-003** | 4-level PML4 page tables by default. 5-level opt-in for address spaces &gt;128TB. ASLR with modern entropy. Per-process page table isolation. |
| **DDR-004** | No fork(). spawn() only. Every new process receives an explicit, minimal capability set. Copy-on-write semantics for data sharing. |
| **DDR-005** | 5 scheduling classes: interactive, batch, real-time, AI inference, gaming. Heterogeneous dispatch (CPU / GPU / NPU / TPU). Tickless. P/E core topology aware. SCHED_DEADLINE for hard real-time. |
| **DDR-006** | Zero-copy page remap for large IPC payloads. Synchronous fast-path &lt;500ns for small messages. Every IPC message carries a verified caller PID + capability proof token. |
| **DDR-007** | All device drivers run as userspace processes. IOMMU-enforced DMA — no driver can access memory outside its granted range. orion-devmgr manages driver lifecycle. |
| **DDR-008** | Why hybrid microkernel: exokernel = no isolation, unikernel = no multi-process. Both incompatible with the security model. Pure microkernel = IPC overhead. Hybrid gives isolation + performance. |
| **DDR-009** | Vega FS: B+ tree with 4KB nodes. BLAKE3 per-block checksum. Copy-on-Write write path. Atomic transactions. O(1) snapshots. ChaCha20-Poly1305 encryption per extent. |
| **DDR-010** | Rust + Kani. Maximum 3 unsafe{} blocks in entire Cosmos kernel — each requires a formal safety justification comment. IOMMU mandatory. ARM MTE mandatory on ARM64. Intel CET mandatory on x86-64. Capability table in MPK domain. |
| **DDR-011** | Measured boot + TPM PCR sealing + Dilithium3 signatures + rollback counter. FDE: ChaCha20-Poly1305, key = TPM + Argon2id (never on disk). Horizon Boot replaces OEM Secure Boot keys. |
| **DDR-012** | 5 adversary classes. 7-layer security model. Post-quantum everywhere (Kyber + Dilithium3). Spectre: array_index_nospec() at all capability table lookups. Constant-time cap lookups for auth/crypto. |
| **DDR-013** | Kani model checker targets: capability system, physical memory manager, IPC fast path, scheduler dispatch. Total scope: &lt;15K lines of Rust. Driver code is not in scope. |
| **DDR-014** | 13 Cosmos syscalls + syscall 14 (cap_revoke). vDSO for time/CPUID. Capability handles only — no integer resource IDs. All syscalls capability-gated. |

### Part 2 — Extended Subsystems (DDR-015 to DDR-020)

| **DDR** | **Decision Summary** |
|---------|----------------------|
| **DDR-015** | ComputePeer model: GPUCapability / NPUCapability / TPUCapability. ComputeScheduler manages heterogeneous compute. 16ms GPU timeslice. Unified memory flag. VRAM quota amendment: each GPUCapability carries a VramQuota field; exceeding returns EVRAMQUOTA. IOMMU I/O bandwidth capped at 80% of rated device throughput. |
| **DDR-016** | All hardware IDs virtualised by default (MAC, serial, CPU ID, etc.). HardwareIDCapability:TYPE required to see real IDs. orion-devmgr intercepts all hardware enumeration. |
| **DDR-017** | Quasar Runtime: privileged daemon, shared model weights via MemoryCapability, NPUCapability scheduling, 4-priority inference queue (real-time / interactive / batch / background). |
| **DDR-018** | Tier 1 kernel ML: tract-onnx no_std, statically embedded, mandatory non-ML fallback, &lt;100µs latency, ≤512KB total memory budget. Scheduler load prediction and memory pressure prediction only. |
| **DDR-019** | orion-mld Tier 2: MLHintCapability only (hints, not commands). ONNX Runtime userspace. Telemetry feed. Hot-swap models. &lt;1% false positive rate. |
| **DDR-020** | 256-capability default per process. 1,048,576 system-wide hard limit. 65,536 per-user. 16,384 per-session. 10,000 syscalls/sec per-process rate limit. Max delegation chain depth: 8. Max 10 delegations/sec per process. |

### Part 3 — Security DDRs (DDR-021 to DDR-024)

| **DDR** | **Decision Summary** |
|---------|----------------------|
| **DDR-021** | Confused Deputy Prevention: intent-based capabilities (FileCapability:/path:INTENT). Services must attenuate capabilities to the caller's declared intent before acting. Caller identity verified in every IPC message via kernel-managed caller-ID. A service cannot exercise capabilities beyond what the original caller's intent permits. |
| **DDR-022** | Hardware Memory Safety: ARM MTE mandatory on ARM64 builds. Intel CET mandatory on x86-64 builds. Capability table in MPK domain inaccessible to user processes. array_index_nospec() at every user-derived array index. Max 3 unsafe{} blocks in Cosmos kernel, each with formal safety justification comment. |
| **DDR-023** | Secure Build Pipeline: HSM-backed signing key for all release binaries. 2-of-3 maintainer multi-sig required for releases. cargo vet mandatory CI gate. All deps pinned to exact commit SHA in Cargo.lock. Sandboxed ephemeral CI runners. Reproducible builds as CI gate (same source → identical binary). |
| **DDR-024** | Capability Revocation: cap_revoke(pid, handle) is syscall 14. Any process in the delegation chain may invoke it. Kernel immediately marks the handle REVOKED; all subsequent invocations return ECAPREVOKED. Full revocation deferred until all reference-count holders drop the capability. Revocation events written to audit stream. |

### Part 4 — Subsystem DDRs

| **DDR** | **Decision Summary** |
|---------|----------------------|
| **DDR-HAL** | CosmosHal Rust trait with arch-specific implementations. Cargo feature arch selection: hal-x86, hal-arm64, hal-riscv. Zero runtime dispatch cost (monomorphisation). Provides: timer, IRQ, MMU, CPU, serial, power per architecture. |
| **DDR-IR** | Cosmos Intermediate Representation: SSA form, cap\&lt;R\&gt; type for capability values, capability intrinsics. Bootstrap sequence B1→B7: rustc+LLVM → Cosmos Assembler → Cosmos Linker → Cosmos Compiler (x86-64) → Cosmos Compiler (ARM64, RISC-V) → delete LLVM. |
| **DDR-INIT** | orion-init: TOML .orion-service format. Kahn's algorithm for DAG dependency ordering. Socket activation. 6 boot stages. Parallel startup. Boot target: &lt;2 seconds to userspace. |
| **DDR-VFS** | vega-vfsd: userspace daemon. Per-process filesystem namespaces. 8-mount point structure. FUSE-equivalent IPC interface via Cosmos typed messages. |
| **DDR-PF** | orion-pf: Default deny-all firewall. NetworkCapability classes (LAN / Internet / Service). DNS-over-TLS by default. WireGuard bypass for VPN traffic. Capability-based rule management. |
| **DDR-COMPOSITOR** | Aurora: Wayland-compatible compositor. 9 protocols. GPU pipeline target: &lt;8ms at 60Hz. Direct Scanout gaming mode (zero-copy). VRR (Variable Refresh Rate). HDR support. |
| **DDR-AUDIO** | Void Audio Server: PipeWire-compatible graph. 4 buffer modes from 1.3ms (pro audio) to 85ms (power saving). AudioCapability model for capability-gated audio access. |
| **DDR-COMIT** | Comit package manager: .cpkg format = WASM binary + manifest.toml + Dilithium3 signature. PubGrub dependency resolution. 9-step atomic install with Vega FS pre-install snapshot. Rollback guaranteed. |

### Part 5 — Extended Security DDRs (DDR-025 to DDR-029)

| **DDR** | **Decision Summary** |
|---------|----------------------|
| **DDR-025** | Hardware Enclaves: orion-cryptod runs in SGX enclave on Intel, TrustZone on ARM. Key material never leaves enclave in plaintext. Software-only fallback for non-enclave hardware with explicit user warning. |
| **DDR-026** | User Data Protection: /home snapshotted before every package install. 7-day hourly retention, 30-day daily, 1-year weekly. Immutable base profile layer. Signed credential store. Ransomware detection via write-pattern entropy monitoring. |
| **DDR-027** | Userspace Side-Channel Mitigations: high-security mode enables CPU pinning (isolated core), optional SMT disable, constant-time enforcement for all crypto primitives. Spectre/Meltdown mitigations always on. |
| **DDR-028** | Firmware Verification: LVFS integration for firmware updates. BMC isolated behind dedicated capability. Secure Boot key owned by user (not OEM). UEFI variable write-protection enforced. |
| **DDR-029** | Social Engineering Defences: all installs run sandbox-first (no network access on first execution). Diff shown to user before system update applies. TOTP required for system-level changes. Permission prompts use plain English with "what this means" explanations. |

### Part 6 — Compatibility DDRs

| **DDR** | **Decision Summary** |
|---------|----------------------|
| **DDR-POSIX** | POSIX Compatibility Sandbox: all POSIX processes run in capability-sandboxed containers. setuid emulated via temporary capability grant from orion-pamd (time-bounded, explicit). ELF binaries must declare required capabilities in a signed policy manifest. POSIX syscalls translated to Cosmos IPC. No direct kernel syscalls from the POSIX layer. |
| **DDR-FDE** | Full Disk Encryption: TPM 2.0 + Argon2id key derivation. Cold boot mitigation (keys in TPM volatile memory, not RAM). Recovery via 12-word BIP39 mnemonic stored offline. Boot measured by TPM PCR values. Volume encryption via AES-256-XTS. |

---

## 10. Philosophical Problems & Root Causes

*The core problems that make Orion OS necessary. Solutions are in Vol 7 and the DDRs above.*

### Security Problems

| **Problem** | **Root Cause** | **Why Existing OSes Fail** |
|-------------|----------------|---------------------------|
| **Ambient Authority** | Processes inherit broad permissions by default | Every process can access any resource the user can — one exploit = full compromise |
| **Confused Deputy** | Services hold capabilities and act on behalf of callers without verification | Any client can trick a privileged service into misusing its own capabilities |
| **TOCTOU Race Conditions** | Capability checked once at syscall entry, not at use time | Capability revoked between check and use → stale grant exploited |
| **Driver-Kernel Coupling** | Kernel-mode drivers share address space with the kernel | One bad driver line = kernel panic, one CVE = full ring-0 compromise |
| **Supply Chain Vulnerability** | Build machines trusted implicitly; deps pinned by version, not by content | SolarWinds 2020: signed builds with trojaned code; xz 2024: backdoored dependency |
| **Physical Attack Surface** | Encryption keys stored in RAM or on disk | Cold boot attack recovers AES keys; evil maid attack compromises bootloader |

### Architecture Problems

| **Problem** | **Root Cause** | **Why Existing OSes Fail** |
|-------------|----------------|---------------------------|
| **Monolithic Kernel Complexity** | Decades of accumulated Linux kernel code (30M+ lines) | Formal verification is impossible; one bug in any subsystem can compromise all |
| **Fork() Complexity** | Unix heritage: fork() creates implicit capability inheritance | Every child process must explicitly drop capabilities it doesn't need — almost nobody does |
| **Legacy Syscall Interface** | POSIX syscalls designed in the 1970s | Integer resource IDs (file descriptors) can be guessed; no type safety |
| **No Native AI Scheduling** | CPUs and GPUs scheduled by separate subsystems | AI workloads thrash between CPU and GPU, wasting energy and causing latency spikes |
| **WASM Maturity Gap** | WASM designed for browsers, not OS-level apps | No standard ABI for syscalls; WASI is incomplete; performance overhead for hot paths |

### Ecosystem Problems

| **Problem** | **Root Cause** | **Why Existing OSes Fail** |
|-------------|----------------|---------------------------|
| **Hardware Obsolescence** | Bloated OSes require ever-more powerful hardware | 600M+ Windows 10 PCs will be "unsupported" by 2025 — hardware is fine, OS isn't |
| **Energy Waste** | No per-process power accounting; background processes run unchecked | Impossible to identify which app drains the battery; no OS-level enforcement |
| **Package Trust** | Package managers verify signatures but not build provenance | A compromised package maintainer can push malicious code with a valid signature |
| **Community Fragmentation** | Linux has 1000+ distros with incompatible package formats | Contributors and users can't collaborate; effort is diluted |

---

## 11. Space Naming System

Every component in Orion OS has a consistent space-themed name. This is the canonical naming.

| **Name** | **Component** | **Role** |
|----------|--------------|----------|
| **Cosmos** | Microkernel | The core. Scheduler + MM + IPC + capability table. |
| **Orion OS** | The operating system | The full system — everything together. |
| **Vega FS** | Filesystem | CoW B+ tree filesystem with BLAKE3 checksums. |
| **Nebula** | Package ecosystem | The hub of packages and extensions. |
| **Comit** | Package manager | Atomic package installation and management. |
| **Aurora** | Compositor | Wayland-compatible display server and compositor. |
| **Quasar Runtime** | AI inference daemon | OS-level inference with shared model weights. |
| **Pulsar Shell** | Shell | No-fork shell with capability-gated builtins. |
| **Horizon Boot** | Bootloader | UEFI + BIOS bootloader with Dilithium signatures. |
| **Void Crypto Library** | Cryptography | Post-quantum crypto (Kyber, Dilithium3, BLAKE3). |
| **Ether-d** | Network daemon | Zero-copy userspace network stack. |
| **orion-pf** | Firewall | Capability-based packet filter (default deny-all). |
| **orion-devmgr** | Device manager | Hardware enumeration and driver lifecycle management. |
| **orion-cryptod** | Crypto daemon | TPM-backed key management in SGX/TrustZone enclave. |
| **orion-mld** | ML daemon | Tier 2 ML hint daemon (hints only, not commands). |
| **orion-init** | Service manager | DAG-ordered parallel service startup. |
| **Cosmos Compiler** | Self-hosting compiler | Phase 5 north star: replaces LLVM entirely. |
| **Cosmos IR** | Intermediate representation | SSA-form IR with cap\&lt;R\&gt; type for capabilities. |

---

## 12. The North Star — Phase B7

&gt; **"Cosmos Compiler compiles Cosmos kernel. LLVM is deleted from the build system. Every CPU instruction executed when running Orion OS was written by us — not borrowed from any external toolchain. No other OS in widespread use can say this. Every phase exists to make this one moment possible."**

The bootstrap sequence:

| **Stage** | **What Changes** |
|-----------|-----------------|
| **B1** | Host Rust + LLVM compiles Cosmos |
| **B2** | Cosmos Assembler replaces NASM |
| **B3** | Cosmos Linker replaces LLD |
| **B4** | Cosmos Compiler (x86-64) compiles kernel code |
| **B5** | Cosmos Compiler (ARM64) added |
| **B6** | Cosmos Compiler (RISC-V) added |
| **B7** | ✅ LLVM deleted. Orion OS is fully self-hosting. |

---

## 13. Version System & Stability Guide

| **Version** | **Phase** | **Status** | **Target Date** | **Key Milestone** |
|-------------|-----------|------------|-----------------|-------------------|
| **0.0.0** | Pre-Phase 0 | 🏗️ Planning | — | DDRs locked, documentation complete |
| **0.0.1** | Phase 0: Cosmic Dawn | ❌ Pre-Alpha | Q4 2026 | First QEMU boot |
| **0.0.2** | Phase 0 (50%) | ❌ Pre-Alpha | Q1 2027 | PMM + VMM + Capability System stable |
| **0.0.3** | Phase 0 Complete | ❌ Pre-Alpha | Q2 2027 | Cosmos Assembler replaces NASM |
| **0.1.0** | Phase 1: Core Being | ⚠️ Alpha | Q3 2027 | First real hardware boot |
| **0.1.1** | Phase 1 (50%) | ⚠️ Alpha | Q4 2027 | Networking + package manager |
| **0.1.2** | Phase 1 Complete | ⚠️ Alpha | Q1 2028 | Minimal usable system |
| **0.2.0** | Phase 2: System Symphony | ⚠️ Beta | Q2 2028 | Desktop-ready |
| **0.2.1** | Phase 2 (50%) | ⚠️ Beta | Q3 2028 | GPU drivers + gaming subsystem |
| **0.2.2** | Phase 2 Complete | ⚠️ Beta | Q4 2028 | Feature-complete beta |
| **0.3.0** | Phase 3: User Enlightenment | ⚠️ Beta | Q1 2029 | User-ready beta |
| **0.3.2** | Phase 3 Complete | ✅ RC | Q3 2029 | Feature freeze |
| **0.4.0** | Phase 4: Hardware Transcendence | ✅ RC | Q4 2029 | ARM64 + RISC-V ports |
| **0.4.2** | Phase 4 Complete | ✅ RC | Q2 2030 | Arch-agnostic core |
| **0.5.0** | Phase 5: Self-Realization | ✅ RC | Q3 2030 | Cosmos Compiler (x86-64) |
| **0.5.2** | Phase 5 Complete | ✅ RC | Q1 2031 | LLVM deleted — fully self-hosting |
| **0.6.0** | Phase 6: Universal Harmony | ✅ RC | Q2 2031 | Final security audit |
| **0.6.2** | Phase 6 Complete | ✅ RC | Q4 2031 | Release candidate |
| **1.0.0** | **All Phases Complete** | ✅ **Stable** | **Q1 2032** | **First stable release** |

### Stability Definitions

| **Status** | **Definition** | **Breaking Changes** | **Target Users** |
|------------|----------------|----------------------|------------------|
| 🏗️ **Planning** | No code yet. Architecture locked. | Expected | Core team only |
| ❌ **Pre-Alpha** | Early kernel development. Core functionality may change. | Frequent | Developers only |
| ⚠️ **Alpha** | Feature-complete for phase. Untested at scale. | Possible | Testers |
| ⚠️ **Beta** | Mostly stable. Missing some features. | Rare | Early adopters |
| ✅ **RC** | Release candidate. Considered stable but not yet production-ready. | None | Beta testers |
| ✅ **Stable** | Production-ready. Only backward-compatible changes. | None | General public (5+ year LTS) |

---

## 14. Document System

The canonical 16 documents. Always use these — archive all older `nova_*` files.

| **File** | **Volume** | **Purpose** | **Read When** |
|----------|------------|-------------|---------------|
| orion_00_master_index_v9.docx | Index | Navigation hub | Always first |
| orion_vol0_quickstart_contributing_roadmap.docx | Vol 0 | Quick Start & Contributing | New contributor setup |
| orion_vol1_vision_strategy.docx | Vol 1 | Vision, Strategy & Innovation | Strategic planning |
| orion_vol2_unified.docx | Vol 2 | Technical Architecture & All DDRs | Before any kernel code |
| orion_vol3_build_requirements.docx | Vol 3 | Complete Build Requirements | During active development |
| orion_vol4_learning_resources.docx | Vol 4 | Learning Resources | Phase-ordered study |
| orion_vol5_philosophy_problems.docx | Vol 5 | Philosophy & Problem Root Causes | Designing solutions |
| orion_vol6_developer_tools.docx | Vol 6 | Developer Tools & Workflow | Build/debug/test setup |
| orion_vol7_problems_solutions.docx | Vol 7 | Problems, Current State & Solutions | Implementation status |
| orion_vol8_os_landscape_analysis.docx | Vol 8 | OS Landscape Analysis | Competitive research |
| orion_master_flaw_register.docx | Flaws | Master Flaw & Gap Register | Security audit |
| orion_project_tools_spec.docx | Tools | orion-tasks Task Manager | Task tracking |
| orion_analysis_feedback_report.docx | Report | Master Analysis & Feedback | Project review |
| about.md | Web | Complete project overview | Anyone learning about Orion |
| roadmap.md | Web | 7-phase development roadmap | Sprint planning |
| problems_and_solutions.md | Web | Living problems tracker | Issue tracking |

---

## 15. Quick Reference Cards

### New Contributor — 5 Steps
1. Read Vol 0 §2: install Rust, QEMU, NASM, GDB
2. Build Milestone 0: bootloader prints `ORION OK` in QEMU
3. Read Vol 0 §3: Contributing Guide and Code of Conduct
4. Sign CLA: add `Signed-off-by` to all commits (`git commit -s`)
5. Before coding any subsystem: find its DDR in Vol 2 and read it first

### Rule Before Any Code
&gt; *Open orion_vol2_unified.docx. Find the DDR for your subsystem. All 39 DDRs are in one file, all locked. If a DDR needs changing: open an RFC using the template in CONTRIBUTING.md. Do not write code that deviates from a locked DDR without an accepted RFC.*

### Quick Build Commands
```bash
git clone https://github.com/orionos/orionos
cd orionos
cargo install just
just setup        # install toolchain + deps
just build        # build kernel
just qemu         # boot in QEMU x86-64
just qemu-test    # run CI boot test
just kani         # run Kani formal verification
just fuzz         # run cargo-fuzz targets
```

### CI Gates (All Must Pass Before Merge)
```
cargo fmt --check          # format
cargo clippy -- -D warnings # lint
cargo audit                # CVE check
cargo deny check           # license + CVE
cargo nextest run --all    # unit tests
just qemu-test             # QEMU boot (prints ORION OK)
cargo kani                 # formal verification
cargo bench (no &gt;5% regression) # performance
```

---

*Orion OS — From bare metal to cosmic harmony. One phase at a time.*