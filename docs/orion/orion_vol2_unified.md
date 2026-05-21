---
title: "Orion Vol2 Unified"
sidebar_position: 8
---

**PROJECT ORION OS**

**Vol 2: Technical Architecture & All DDRs**

_DDR-001 through DDR-020 + DDR-HAL + DDR-IR + DDR-INIT + DDR-VFS + DDR-PF + DDR-COMPOSITOR + DDR-AUDIO + DDR-COMIT — all 25 DDRs in one document_

Revision 3.0 — Unified Edition • May 2025

# **Preface — How This Document Is Organised**

Vol 2 is the single source of truth for every design decision in Orion OS. Vol 2B (the supplement) has been merged in. This is the canonical unified architecture document.

**DDR Status Key**

✅ LOCKED = final. Changing a locked DDR requires opening an RFC (see Vol 0 §3.2). ⚠️ Proposed = drafted but not locked — do not build against proposed DDRs. All 25 DDRs in this document are ✅ LOCKED.

## **Document Structure**

_Part 1 (§1–§14): Foundational DDRs — DDR-001 to DDR-014. Core kernel decisions._

_Part 2 (§15–§20): Extended DDRs — DDR-015 to DDR-020. GPU, privacy, AI, ML, quotas._

_Part 3 (§21–§27): Subsystem DDRs — HAL, IR, init, VFS, firewall, compositor, audio, Comit._

# **Part 1 — Foundational DDRs (DDR-001 to DDR-014)**

**Source**

These DDRs were locked in Vol 2 v1.0. They are reproduced here as the merged canonical reference. Full detailed text is in the original Vol 2 document.

**DDR**

**Design Question**

**Decision Summary**

**Blocks**

DDR-001

Kernel architecture?

Hybrid microkernel. Cosmos kernel = scheduler + MM + IPC + capability system only. All device drivers run in userspace processes. Hardware isolation via IOMMU. Kernel &lt;200KB binary target.

All kernel implementation

DDR-002

Where are capabilities stored?

Kernel-managed capability tables. Processes hold opaque integer handles. The kernel validates every syscall against the caller's capability table. Processes cannot forge or inspect raw capability tokens.

All IPC, all syscalls, all resource access

DDR-003

4-level or 5-level page tables?

4-level (PML4) by default on x86-64. 5-level (PML5) opt-in at boot for workloads requiring &gt;128TB address space. ARM64: 4-level (48-bit VA). RISC-V: Sv48 (4-level).

Memory management implementation

DDR-004

fork() or spawn()?

No fork(). spawn() only. Child process receives an explicit capability set from the parent. No implicit address space copying. No pthread_atfork complexity.

Process model, all userspace apps

DDR-005

Scheduler design?

Five scheduling classes: RealTime, Interactive, Normal, Batch, Idle. Heterogeneous dispatch: CPU + GPU + NPU + TPU as compute peers. Tickless kernel (NO_HZ_FULL). Topology-aware on P/E-core CPUs.

All scheduling, power management, gaming

DDR-006

IPC mechanism?

Synchronous message passing (fast path: &lt;500ns, small messages). Zero-copy page remapping for large payloads (MemoryCapability transfer). All IPC requires a capability token.

All inter-process communication

DDR-007

Driver model?

All drivers are unprivileged userspace processes. IOMMU enforces DMA ranges — drivers cannot access memory outside their granted MemoryCapability. orion-devmgr manages driver lifecycle.

All hardware drivers

DDR-008

Why hybrid and not exokernel or unikernel?

Exokernel: no isolation between apps — incompatible with multi-user security model. Unikernel: single-process — incompatible with capability-isolated app model. Hybrid: security + performance + multi-process.

Kernel architecture justification

DDR-009

Vega FS metadata structure?

B+ tree with 4KB nodes for metadata. LSM tree rejected: too write-amplifying for NVMe random workloads. BLAKE3 checksums per data block. CoW write path: new extents allocated, never overwrite.

Vega FS implementation

DDR-010

Driver safety model?

Rust drivers with Kani formal verification on critical paths. Maximum 3 unsafe&#123;&#125; blocks in entire kernel — each formally justified. IOMMU mandatory for all DMA — no exceptions.

All kernel and driver code

DDR-011

Boot security?

Measured boot: each stage measures the next via TPM PCR extension. Dilithium3 (post-quantum) signatures on kernel image and boot stages. Rollback protection via TPM monotonic counter in NVRAM.

Boot sequence, measured boot

DDR-012

Threat model?

Five named adversaries: Remote Attacker, Malicious App, Compromised Driver, Physical Attacker, Supply Chain Attacker. Seven-layer defence in depth. Post-quantum crypto everywhere by default.

Security architecture

DDR-013

Formal verification scope?

Kani model checker targets: capability system, physical memory manager, IPC fast path, scheduler dispatch. Total scope: &lt;15,000 lines of Rust. Driver code is not in scope.

Formal verification

DDR-014

Kernel ABI?

Exactly 13 syscalls + vDSO for time queries. All syscalls take capability handles — no integer resource IDs. Stable ABI after v0.5 (Alpha).

Syscall implementation, POSIX compat layer

# **Part 2 — Extended DDRs (DDR-015 to DDR-020)**

## **DDR-015 — GPU/NPU/TPU Abstraction Layer**

**DDR-015 ✅ LOCKED — May 2025**

**Field**

**Value**

Status

✅ LOCKED — May 2025

Blocks

Phase 2 gaming, Quasar Runtime, GPU drivers, Aurora compositor

### **Decision**

**DDR-015**

ComputePeer model: GPU, NPU, TPU are scheduling entities at the same level as CPU cores. Each has a typed capability. ComputeScheduler dispatches work across all peers. Fuchsia Magma is the reference architecture, improved with capability-gating.

**Capability**

**Hardware**

**Rights Bitmap**

**Holder**

GPUCapability

Intel xe/i915, AMD amdgpu, NVIDIA open, Mali, Adreno, AGX

RENDER | COMPUTE | COPY | DISPLAY

Aurora (DISPLAY), games (RENDER), Quasar (COMPUTE)

NPUCapability

Intel VPU, Apple ANE, Qualcomm Hexagon, MediaTek APU

INFER | TRAIN_LITE | MODEL_LOAD

Quasar Runtime, orion-mld

TPUCapability

Google Edge TPU, future custom silicon

INFER | BATCH_INFER

Quasar Runtime only (privileged)

ComputeCapability

Abstract — OS chooses best available peer

COMPUTE

General apps

DisplayCapability

Display output scanout only — no render

DISPLAY | CURSOR

Aurora compositor only

### **ComputeScheduler Rules**

- GPU context switch every 16ms (one display frame). Gaming processes: 33ms slices.
- Preemption via hardware GPU preemption (Intel Gen12+, AMD GFX10+). Polling fallback for older GPUs.
- IOMMU enforcement: GPU DMA outside granted MemoryCapability → fault → driver restart, not kernel panic.
- Unified memory (Apple M / AMD APU): MemoryCapability:UNIFIED flag — same physical pages for CPU+GPU.

## **DDR-016 — Hardware Privacy & ID Randomisation**

**DDR-016 ✅ LOCKED — May 2025**

**Field**

**Value**

Status

✅ LOCKED — May 2025

Blocks

Privacy persona, anti-fingerprinting, HardwareIDCapability

**DDR-016**

All hardware identifiers virtualised by default. Apps receive randomised per-session IDs. Real IDs require HardwareIDCapability:TYPE. Randomisation in kernel via orion-devmgr intercept — hardware drivers never expose real IDs to userspace.

**Hardware ID**

**Default**

**Real ID Access**

**Method**

MAC Address

Random per network association

HardwareIDCapability:MAC_REAL

CSPRNG 48-bit, valid unicast bits

CPU Serial/CPUID

Randomised vendor string per boot

HardwareIDCapability:CPU_REAL

Deterministic from boot seed

GPU PCI Device ID

Fake VID/DID per session

HardwareIDCapability:GPU_REAL

PCI config space intercept

NVMe Serial Number

CSPRNG 20-char per boot

HardwareIDCapability:DISK_REAL

NVMe IDENTIFY intercept

USB Serial Number

CSPRNG hex per session

HardwareIDCapability:USB_REAL

USB GET_DESCRIPTOR intercept

Bluetooth MAC

Random per pairing session

HardwareIDCapability:BT_REAL

HCI command intercept

TPM Endorsement Key

Never exposed to apps

HardwareIDCapability:TPM_REAL (kernel only)

orion-cryptod gatekeeper

## **DDR-017 — Quasar Runtime (OS-Level AI Inference Engine)**

**DDR-017 ✅ LOCKED — May 2025**

**Field**

**Value**

Status

✅ LOCKED — May 2025

Blocks

Phase 2.3 Quasar Runtime, NPU scheduling, app AI access

**DDR-017**

Quasar Runtime is a privileged userspace daemon holding NPUCapability and GPUCapability:COMPUTE. Apps request inference via typed IPC. Quasar maintains a shared model weight cache (models loaded once, shared across all apps). Priority-aware inference queue dispatches to Cosmos ComputeScheduler.

// quasar.orion — Quasar IPC interface

interface QuasarRuntime &#123;

fn load_model(model_id: String, quantisation: Quantisation) -&gt; Result&lt;ModelHandle, QuasarError&gt;;

fn infer(model: ModelHandle, input: InferInput, priority: Priority,

completion_port: IpcPort) -&gt; Result&lt;InferenceHandle, QuasarError&gt;;

fn cancel(handle: InferenceHandle) -&gt; Result&lt;(), QuasarError&gt;;

fn hardware_info() -&gt; HardwareInfo; // &#123;npu: bool, gpu: bool, unified_mem: bool&#125;

&#125;

**Priority**

**Who Uses It**

**Max Wait**

**Preempts Lower?**

REALTIME

orion-mld anomaly detection (security)

&lt;1ms

Yes — preempts all

HIGH

User-interactive AI: chat, code completion

&lt;100ms

Yes — preempts NORMAL/BACKGROUND

NORMAL

Background AI: summarisation, indexing

&lt;1s

No

BACKGROUND

On-device training, model updates

Best effort

No

## **DDR-018 — Kernel ML Integration (Tier 1)**

**DDR-018 ✅ LOCKED — May 2025**

**Field**

**Value**

Status

✅ LOCKED — May 2025

Blocks

Scheduler ML classifier, anomaly detection, power prediction

**DDR-018 — Non-Negotiable Safety Rule**

Every kernel ML inference call MUST have a non-ML fallback. If the model returns an error, NaN, Inf, or out-of-range output: the fallback fires immediately. The kernel NEVER makes a scheduling or security decision based on corrupt ML output.

**Model**

**Type**

**Size**

**Latency**

**Fallback Rule**

Workload Classifier

Decision Tree (ONNX, tract no_std)

≤50KB

&lt;50µs

classify_heuristic() — io_wait/cpu/gpu heuristic

Anomaly Detector

Isolation Forest (ONNX)

≤100KB

&lt;100µs

Allow if score &lt; 0.95 (conservative default)

Hardware Aging Predictor

Linear Regression (ONNX)

≤5KB

&lt;20µs

Use degradation_level=5 (medium — safe default)

Power Predictor

Tiny LSTM (ONNX)

≤80KB

&lt;100µs

Use current_power_mw (no prediction)

_Total Tier 1 ML memory budget: ≤512KB kernel memory. No dynamic model loading. All models embedded via include_bytes!() at compile time._

## **DDR-019 — orion-mld ML Daemon (Tier 2)**

**DDR-019 ✅ LOCKED — May 2025**

**Field**

**Value**

Status

✅ LOCKED — May 2025

Blocks

Phase 3 AI features, malware detection, user intent prediction

**DDR-019**

orion-mld is a sandboxed userspace daemon with MLHintCapability only — it can send scheduling and security HINTS to the kernel, never commands. Kernel ignores hints that conflict with capability model rules. Models hot-swappable via comit without daemon restart.

**Capability**

**Allows**

**Prevents**

MLHintCapability:SCHEDULER

Send WorkloadHint to Cosmos scheduler

Forcing priority changes — hints only

MLHintCapability:SECURITY

Flag suspicious processes to orion-securityd

Killing processes — flags only

FileCapability:/var/lib/orion-mld

Read/write model cache

Access to any other path

FileCapability:/dev/orion-ml-telemetry (r/o)

Read kernel telemetry stream

Write to kernel — one-way only

NetworkCapability (opt-in)

Download model updates from Nebula Hub

Not granted by default

## **DDR-020 — Capability Quotas & Rate Limiting**

**DDR-020 ✅ LOCKED — May 2025**

**Field**

**Value**

Status

✅ LOCKED — May 2025

Blocks

Resource control, DoS prevention, delegation audit

**Process Type**

**Default Budget**

**Max**

**Raise Via**

Normal user process

256 capabilities

4096

CapabilityBudgetCapability — user approves

System service

1024 capabilities

16384

Declared in .orion-service manifest

Privileged daemon (Quasar, orion-mld)

2048 capabilities

16384

Granted at install, audited

**Operation**

**Rate Limit**

**Burst**

**On Exceed**

IPC message send

10,000/sec

5,000

RATE_EXCEEDED — throttled 10ms

Capability invocation

1,000/sec per capability

200

RATE_EXCEEDED — capability throttled

NetworkCapability: new connections

100/sec

50

ECONNREFUSED

FileCapability: open()

500/sec

100

EAGAIN — retry after 2ms

Capability delegation

10/sec

5

EDELEGATE_LIMIT — logged + blocked

Capability creation

100 new caps/sec

20

ENOCAP — must free existing caps first

# **Part 3 — Subsystem DDRs**

## **DDR-HAL — Hardware Abstraction Layer**

**DDR-HAL ✅ LOCKED — May 2025**

**Field**

**Value**

Status

✅ LOCKED — May 2025

Blocks

Multi-arch support, ARM64 port, RISC-V port

**DDR-HAL**

Two-layer HAL: (1) arch-specific boot shim puts CPU in known state before kernel_main(). (2) CosmosHal Rust trait — every arch implements it. Kernel calls only the trait. Arch selected at compile time via Cargo features. Zero runtime overhead — monomorphised.

pub trait CosmosHal: Send + Sync + 'static &#123;

// Timer

fn time_now_ns() -&gt; u64;

fn timer_set_next_ns(ns: u64);

// Interrupts

fn irq_disable() -&gt; IrqState;

fn irq_restore(state: IrqState);

fn irq_register(vector: u8, handler: IrqHandler);

fn irq_eoi(vector: u8);

// MMU

fn mmu_new_table() -&gt; PhysAddr;

fn mmu_map(table: PhysAddr, virt: VirtAddr, phys: PhysAddr, flags: PageFlags);

fn mmu_switch_table(table: PhysAddr);

fn mmu_tlb_flush(virt: VirtAddr);

// CPU

fn cpu_halt();

fn cpu_id() -&gt; u32;

fn cpu_features_init();

unsafe fn cpu_context_switch(current: \*mut TaskContext, next: \*const TaskContext);

// Serial (early console)

fn serial_write_byte(byte: u8);

// SMP

fn smp_send_ipi(cpu: u32, vector: u8);

fn smp_core_count() -&gt; u32;

&#125;

**Interface**

**x86-64**

**ARM64**

**RISC-V**

time_now_ns()

RDTSC + TSC/HPET calibration

CNTVCT_EL0 virtual counter

rdtime instruction

timer_set_next_ns()

LAPIC one-shot timer

CNTP_TVAL_EL0 generic timer

SBI timer extension (ecall)

irq_disable/restore()

CLI/STI + RFLAGS.IF

MSR DAIF register

csrci/csrsi STATUS.MIE

mmu_switch_table()

MOV CR3, phys_addr

MSR TTBR0_EL1

csrw satp, (MODE|PPN)

serial_write_byte()

Port 0x3F8 OUT

PL011 UART DR register

SBI console putchar

smp_send_ipi()

LAPIC ICR write

GIC SGI

SBI HSM extension

## **DDR-IR — Cosmos Intermediate Representation**

**DDR-IR ✅ LOCKED — May 2025**

**Field**

**Value**

Status

✅ LOCKED — May 2025

Blocks

Phase B4 linker, B5 compiler, Cosmos Assembler

**DDR-IR**

Cosmos IR: typed SSA form with first-class cap&lt;R&gt; capability type and capability intrinsics. Inspired by LLVM IR, adds: capability type tracked by type system (cannot be forged), capability intrinsics (lower to the 13 kernel syscalls), simpler type system tuned for systems programming. LLVM used during bootstrap B1–B4, replaced in B5.

; Cosmos IR — capability-gated file read example

define i64 @read_file(cap&lt;FileRead&gt; %file_cap, ptr&lt;u8&gt; %buf, i64 %len) &#123;

entry:

%valid = call i1 @cosmos.cap.check(cap&lt;FileRead&gt; %file_cap)

br i1 %valid, label %do_read, label %cap_error

do_read:

%result = call i64 @cosmos.cap.invoke(

cap&lt;FileRead&gt; %file_cap, i64 SYSCALL_READ, ptr&lt;u8&gt; %buf, i64 %len

)

ret i64 %result

cap_error:

ret i64 -1 ; ECAPINVAL

&#125;

; Attenuation: remove rights (cannot add rights)

define cap&lt;FileRead&gt; @make_readonly(cap&lt;FileRead|FileWrite&gt; %full) &#123;

entry:

%ro = call cap&lt;FileRead&gt; @cosmos.cap.attenuate(

cap&lt;FileRead|FileWrite&gt; %full, i64 RIGHTS_FILE_READ

)

ret cap&lt;FileRead&gt; %ro

&#125;

**Bootstrap Phase**

**Compiler Used**

**IR Used**

**Goal**

B1–B3

rustc + LLVM

LLVM IR via Rust

Bootstrap kernel in Rust via host LLVM

B4

Cosmos Assembler

Native x86/ARM/RISC-V

Hand-written assembly for critical paths

B5

Cosmos Linker

ELF object files

Self-hosted linking of kernel binary

B6

Cosmos Compiler v0

Cosmos IR → x86-64

Compiles subset of Orion OS itself

B7

Cosmos Compiler v1

Cosmos IR → x86+ARM+RISC-V

Full bootstrap — delete LLVM ⭐

## **DDR-INIT — orion-init Service Manager (Helios)**

**DDR-INIT ✅ LOCKED — May 2025**

**Field**

**Value**

Status

✅ LOCKED — May 2025

Blocks

Boot sequence, all system service startup

**DDR-INIT**

orion-init reads .orion-service TOML files from /system/services/, builds a dependency DAG using Kahn's algorithm, starts services in parallel groups. Socket activation, restart policies, resource limits, and capability declarations all in the TOML format.

\# /system/services/ether-d.orion-service

\[service\]

name = "ether-d"

binary = "/system/bin/ether-d"

user = "\_network"

\[capabilities\]

required = \["NetworkCapability", "FileCapability:/etc/ether-d"\]

\[dependencies\]

after = \["cosmos-kernel", "vega-vfsd"\]

before = \["orion-dnsd", "orion-wifid"\]

\[restart\]

policy = "always"

delay_ms = 1000

max_retries = 5

\[socket_activation\]

sockets = \["/run/ether-d.sock"\]

\[resources\]

memory_limit_mb = 64

cpu_weight = 100

**Boot Stage**

**Services**

**Parallel?**

**Failure Mode**

Stage 0

cosmos-kernel

N/A

Kernel panic

Stage 1

horizon-boot (measured boot verify)

No

Emergency mode

Stage 2

vega-vfsd, orion-logd

Yes

Emergency mode

Stage 3

orion-devmgr (device enumeration + driver launch)

No

Emergency mode

Stage 4

ether-d, orion-cryptod

Yes

Degrade gracefully

Stage 5

orion-init-user, aurora

Yes

Drop to shell

Stage 6

All user services

Yes

Log and continue

## **DDR-VFS — Virtual Filesystem (vega-vfsd)**

**DDR-VFS ✅ LOCKED — May 2025**

**Field**

**Value**

Status

✅ LOCKED — May 2025

Blocks

vega-vfsd, all filesystem operations, /proc /dev /sys

**DDR-VFS**

vega-vfsd is a userspace daemon — VFS is not in the kernel. Per-process namespaces (Plan 9 style). Path resolution at VFS layer. FUSE-equivalent IPC for userspace filesystems. Capability-gated at every mount boundary.

**Mount Point**

**Filesystem**

**Contents**

**Access**

/system

Vega FS (read-only)

OS binaries, service files — immutable core

SystemCapability to remount

/home

Vega FS (read-write)

User data, config, documents

FileCapability per user dir

/data

Vega FS (read-write)

App data, databases, logs

FileCapability per app dir

/dev

devfs (virtual)

Device nodes — keyboard, disk, GPU, serial

DeviceCapability per device

/proc

procfs (virtual)

Per-process info: maps, status, capabilities

ProcessCapability

/run

tmpfs (in-memory)

Runtime sockets, PIDs — cleared on boot

FileCapability:/run

/boot

Vega FS (read-only)

Bootloader, kernel image, verified boot chain

BootCapability

/mnt

User-mountable

External drives, network filesystems

FileCapability:/mnt + consent

### **Path Resolution Algorithm**

- All resolution starts from the calling process's namespace root — not the global root.
- Split path by '/', resolve each component. Check FileCapability at each mount boundary crossing.
- Symlinks: resolved at VFS level. Maximum 8 levels of indirection. Circular → ELOOP.
- Cross-filesystem copy: vega-vfsd coordinates. Always materialise-then-copy — never zero-copy across FS boundary.

## **DDR-PF — orion-pf Firewall & Network Policy**

**DDR-PF ✅ LOCKED — May 2025**

**Field**

**Value**

Status

✅ LOCKED — May 2025

Blocks

Zero-trust networking, NetworkCapability enforcement

**DDR-PF — Default Policy: Deny All**

All inbound blocked. All outbound blocked. Loopback always allowed. Apps need NetworkCapability to open any socket. DNS is DNS-over-TLS by default.

\# /system/config/orion-pf.toml — default ruleset (applied at boot)

\[default_policy\]

inbound = "deny"

outbound = "deny"

forward = "deny"

\[loopback\]

allow_all = true # 127.0.0.1/::1 always allowed

\[\[capability_rules.network\]\]

capability = "NetworkCapability"

inbound = "deny"

outbound = \["tcp:80", "tcp:443", "udp:53"\] # HTTP, HTTPS, DNS

\[\[capability_rules.network_server\]\]

capability = "NetworkCapability:server"

inbound = "allow" # user declared port in manifest

outbound = "allow"

\[dns\]

resolver = "dns-over-tls"

dnssec_validation = true

fallback_resolver = "1.1.1.1:853" # user-overrideable

## **DDR-COMPOSITOR — Aurora Wayland Compositor**

**DDR-COMPOSITOR ✅ LOCKED — May 2025**

**Field**

**Value**

Status

✅ LOCKED — May 2025

Blocks

Phase 2.1 Aurora, GPU integration, gaming subsystem

**DDR-COMPOSITOR**

Aurora is a Wayland compositor running as an unprivileged userspace process. Communicates with apps via Wayland protocol over Unix sockets. GPU access via DeviceCapability-gated DRM/KMS. Replaceable — any Wayland compositor works.

**Protocol**

**Version**

**Purpose**

**Required For**

wayland core

1.21

Base: surface, buffer, input, output

All apps

xdg-shell

stable v6

App window management

All desktop apps

zwp-linux-dmabuf

v4

Zero-copy GPU buffer sharing (DMA-BUF)

GPU-rendered apps

wp-presentation-time

v1

Frame timestamps for VSync

Games, video players

wp-fractional-scale

v1

HiDPI fractional scaling

HiDPI displays

zwlr-layer-shell

v1

Panels, wallpapers, overlays

orion desktop shell

zwlr-screencopy

v3

Screen recording / screenshots

orion-record

wp-color-management

v1

ICC profiles, HDR metadata

HDR displays

xwayland

embed

X11 app compatibility

Legacy X11 apps

**Pipeline Stage**

**Action**

**Budget at 60Hz**

Input collection

Read Wayland events, surface updates

&lt;0.5ms

Scene graph build

Build compositor scene from surface tree

&lt;0.5ms

GPU upload

DMA-BUF zero-copy for GPU-rendered apps

&lt;1ms

Composite render

OpenGL ES 3.x → output framebuffer

&lt;4ms

KMS presentation

DRM atomic scanout at VBlank

&lt;0.5ms

Total per frame

End-to-end

&lt;8ms of 16ms budget

## **DDR-AUDIO — Orion Audio Subsystem**

**DDR-AUDIO ✅ LOCKED — May 2025**

**Field**

**Value**

Status

✅ LOCKED — May 2025

Blocks

Phase 1 audio drivers, gaming audio, pro audio

**Mode**

**Buffer Size**

**Latency**

**Use Case**

Ultra-low

64 samples @ 48kHz

~1.3ms

Pro audio, live monitoring

Low

256 samples @ 48kHz

~5.3ms

Gaming, video calls

Standard

1024 samples @ 48kHz

~21ms

Media playback, casual

Power saving

4096 samples @ 48kHz

~85ms

Background music, battery save

**AudioCapability**

**Allows**

**Who Holds It**

AudioCapability:PLAYBACK

Write to audio sink (speaker)

Any app that declares it in manifest

AudioCapability:CAPTURE

Read audio source (microphone) — user prompted

Recording apps, voice call apps

AudioCapability:PRO

Request &lt;1ms real-time latency class

Known pro audio apps only

AudioCapability:BT_AUDIO

Access Bluetooth audio profiles (A2DP, HFP)

orion-btd, media players

AudioCapability:ADMIN

Manage routing graph, grant per-app caps

orion-audiod daemon

## **DDR-COMIT — Comit Package Manager Internal Design**

**DDR-COMIT ✅ LOCKED — May 2025**

**Field**

**Value**

Status

✅ LOCKED — May 2025

Blocks

Phase 1.5 Comit, Nebula Hub, package ecosystem

\# .cpkg on-disk format (tar.zst + Dilithium signature)

package.cpkg/

├── manifest.toml # metadata, capabilities, dependencies

├── binary.wasm # main WASM module

├── native/ # optional native shims

│ ├── x86_64.so

│ └── aarch64.so

├── data/ # icons, translations

│ └── locale/en.mo

├── SIGNATURE # Dilithium3 over all other files

└── CHECKSUMS # BLAKE3 per file

**Install Step**

**Action**

**Failure Recovery**

1\. Download

.cpkg to /var/comit/cache/staging/HASH.cpkg

Resume via HTTP range request

2\. Verify signature

Dilithium3 + all BLAKE3 checksums

Abort — ESIG_INVALID

3\. Capability check

User prompt if new capabilities declared

Abort if user denies

4\. Resolve deps

PubGrub algorithm — full dep tree

Abort — show conflict chain

5\. Stage

Unpack to /var/comit/staging/PACKAGE/

Delete staging dir

6\. Vega FS snapshot

O(1) snapshot of /system (instant)

Abort if disk full

7\. Atomic rename

rename() staging → /system/packages/

Restore from snapshot

8\. Register

Update comit manifest DB

Remove package dir, rollback

9\. Cleanup

Remove staging, update comit.lock

Retry on next operation
