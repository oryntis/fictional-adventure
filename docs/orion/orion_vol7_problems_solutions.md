---
title: "Orion Vol7 Problems Solutions"
sidebar_position: 14
---

**ORION OS**

Volume 6: Problems, Current State & Nova Solutions

_Why every major OS problem exists, what people do today, and exactly how Orion OS solves it.  
Revision 1.0 • May 2025_

# Preface — Why Vol 6 Exists

_Every feature in Orion OS exists because there is a real problem it solves. This document maps every major problem in modern operating systems to its root cause, the current inadequate workarounds, the Orion OS solution, the remaining challenges, and its implementation status. Vol 6 is the "why" beneath the "what" of Vol 3._

This document is also a living checklist. As Orion OS components are built, their status changes from ❌ Missing to ⚠️ Partial to ✅ Covered. At any point in development, this document shows exactly how much of the problem space Orion OS has addressed.

# 1\. Core Operating System Problems

_The fundamental problems with operating systems that have existed for 30+ years and that Orion OS is designed to solve._

## 1.1 Kernel Bloat & Complexity

Linux kernel: 30+ million lines. Windows NT kernel: 40+ million lines. Most of this is legacy driver code, architecture-specific workarounds, and accumulated technical debt that cannot be removed without breaking compatibility.

**Dimension**

**Linux/Windows Today**

**Orion OS Solution**

**Challenge**

**Status**

Kernel size

30-40 million lines

Target &lt;200KB microkernel core + userspace drivers

Microkernel IPC overhead

⚠️ Partial

Attack surface

Every driver = kernel attack surface

Drivers in userspace with capability isolation

IPC performance for high-throughput drivers

⚠️ Partial

Memory footprint

Linux idle: ~180MB RAM

Orion OS idle: &lt;64MB RAM target

Achieving this without losing features

⚠️ Partial

Driver crashes

Driver crash = kernel panic (BSOD/kernel panic)

Driver crash = driver process restart; system continues

Fast driver restart without data loss

✅ Covered (DDR-001)

Formal verification

Impossible at 30M+ lines

Kernel core (&lt;200KB) formally verified via Kani

Verification scope must stay small

✅ Covered (DDR-013)

## 1.2 Security as an Afterthought

SELinux (Linux), UAC (Windows), and SIP (macOS) are all bolt-on security systems. They were added years after the OS was designed and it shows: they are complex to configure, poorly understood by users, and frequently bypassed.

**Attack Vector**

**Current OS Vulnerability**

**Orion OS Defence**

**DDR**

**Status**

Malicious app reads SSH keys

Full filesystem access by default (ambient authority)

Capability model: app only sees files explicitly granted

DDR-002

✅ Covered

Remote code execution via exploit

Root shell gives full system access

No root: compromised service has only its declared caps

DDR-001

✅ Covered

DMA attack via Thunderbolt

No IOMMU enforcement by default

Mandatory IOMMU enforcement for all DMA operations

DDR-010

✅ Covered

Supply chain / package tampering

Package checksums optional, weak (MD5/SHA1 common)

Dilithium PQ signatures + BLAKE3 checksums on all packages

DDR-011

✅ Covered

Harvest-now-decrypt-later (QC)

RSA/ECC keys vulnerable to future quantum computers

CRYSTALS-Kyber + Dilithium from day one, no legacy crypto

N/A

✅ Covered

Boot chain compromise / rootkit

Secure Boot optional, rarely enforced end-to-end

Mandatory measured boot, TPM PCR sealing, rollback counter

DDR-011

✅ Covered

Hardware fingerprinting

MAC, CPU serial, GPU ID exposed to all processes

HardwareIDCapability required; randomised IDs by default

DDR-016

✅ Covered

Zero-day kernel exploit

70% of CVEs are memory safety bugs in C kernel code

100% safe Rust kernel + Kani verification of critical paths

DDR-010

✅ Covered

Spectre/Meltdown side-channels

KPTI patches added performance overhead retroactively

KPTI-equivalent designed in from architecture stage

N/A

⚠️ Partial

## 1.3 Memory Safety in the Kernel

~70% of all kernel CVEs across Linux and Windows are memory safety bugs: buffer overflows, use-after-free, double-free, and type confusion. These bugs are structural: they come from C, and C cannot prevent them.

**Memory Bug Class**

**Root Cause**

**Orion OS Prevention**

**Remaining Risk**

**Status**

Buffer overflow

C: no bounds checking on arrays or pointer arithmetic

Rust: bounds checking at compile time and runtime (in debug)

Unsafe blocks (3 allowed in kernel)

✅ Covered

Use-after-free

C: manual memory management with no ownership tracking

Rust: ownership system prevents use of freed memory

ARM MTE catches residual unsafe UAF

✅ Covered

Double-free

C: no mechanism to prevent freeing memory twice

Rust: ownership transfer prevents double-free

None after safe Rust

✅ Covered

Data races

C: no language-level concurrency safety

Rust: Send/Sync traits enforce thread safety at compile time

None in safe Rust

✅ Covered

Integer overflow

C: integer overflow is undefined behaviour

Rust: debug mode panics on overflow; release mode wraps

Semantic overflow bugs still possible

⚠️ Partial

Unintialised memory

C: local variables have undefined initial value

Rust: all variables must be initialised before use (compiler)

None in safe Rust

✅ Covered

Kernel-specific: slab re-use

C: freed slab objects can be reallocated + read

Rust slab allocator zeros on free; ARM MTE re-tags on free

ARM64 hardware only for MTE

⚠️ Partial

## 1.4 Driver Unreliability

The majority of kernel code is device drivers. The majority of kernel vulnerabilities are in device drivers. The majority of kernel crashes are driver crashes. This is architecturally inevitable in a monolithic kernel: every driver line is as privileged as the memory manager.

**Problem**

**Today**

**Orion OS**

**Status**

Driver crash scope

Driver crash = full kernel panic (BSOD/kernel panic)

Driver crash = driver process exits, orion-devmgr restarts it, system continues

✅ Covered (DDR-001)

Driver memory safety

C drivers: 70% of kernel CVEs

Rust drivers: memory safety at compile time + Kani verification

✅ Covered (DDR-010)

DMA security

Driver can DMA to any physical address

IOMMU locks each driver to its declared DMA range only

✅ Covered

Driver update requires reboot

Kernel module reload requires care; full drivers need reboot

Driver is a userspace process: kill + restart = instant driver update

✅ Covered

Driver development difficulty

Must understand kernel internals, locking, IRQ contexts

Driver is a Rust userspace process: normal async programming model

✅ Covered

GPU driver quality (proprietary)

NVIDIA requires proprietary blob; AMD/Intel open-source

Nova targets open-source drivers (AMD RDNA2+, Intel open); Nouveau for NVIDIA

⚠️ Partial

# 2\. Performance Problems

## 2.1 Scheduling for Modern Hardware

Linux CFS (Completely Fair Scheduler) was designed in 2007 for symmetric multiprocessing. Modern CPUs have P-cores, E-cores, shared caches, NUMA nodes, and heterogeneous memory. CFS does not model any of this correctly.

**Scheduling Problem**

**Linux CFS Weakness**

**Orion OS Solution**

**Nova DDR**

**Status**

Heterogeneous cores (P+E)

CFS treats all cores as identical; misplaces interactive work on E-cores

Scheduler topology map; Interactive class → P-cores; Normal/Batch → E-cores

DDR-005

✅ Covered

Real-time + general co-existence

PREEMPT_RT is a separate kernel; mainstream kernel has poor RT latency

Realtime scheduling class by design; hard preemption guarantees

DDR-005

✅ Covered

Tickless operation

Default 250Hz timer wakes CPU even when idle

NO_HZ_FULL tickless by default; CPU sleeps until next event

DDR-005

✅ Covered

GPU scheduling

GPU scheduling entirely in driver; no kernel-level GPU time-slicing

GPUCapability + kernel GPU context scheduler; fair sharing per process

DDR-015

✅ Covered

AI/ML workload scheduling

No distinction between ML inference and general compute

quasar-runtime dispatches to CPU/GPU/NPU; kernel schedules quasar-runtime

DDR-012

✅ Covered

Power-aware scheduling

Power management tacked onto scheduler via EAS (Energy Aware Scheduling)

Energy as first-class resource; orion-powerd integrates with scheduler

N/A

✅ Covered

Per-job resource accounting

cgroups: complex to configure, no unified view

Job hierarchy: every process in a job; resource limits on jobs

DDR-004

✅ Covered

## 2.2 Boot Time

**Boot Stage**

**Linux (typical)**

**Windows (typical)**

**Orion OS Target**

**How Nova Achieves It**

**Status**

Firmware/UEFI

2-5s

3-5s

&lt;1s

Cannot control firmware; target modern UEFI (&lt; 1s on modern hardware)

⚠️ Partial

Bootloader

0.5-2s

1-3s

&lt;200ms

horizon-boot &lt; 100KB; no GRUB menu by default; direct kernel load from Vega FS

⬜ Not started

Kernel init

0.5-2s

1-3s

&lt;300ms

Tickless init; only mandatory subsystems; defer non-critical to Phase 2 init

⬜ Not started

Driver init

1-4s

2-5s

&lt;500ms

Parallel driver init; lazy driver loading for non-critical devices

⬜ Not started

Service init

1-5s

2-4s

&lt;500ms

orion-init: parallel service launch based on dependency graph; socket activation

⬜ Not started

Total to login

8-15s

12-25s

&lt;2s

All stages optimised; NVMe storage eliminates I/O wait from boot path

⬜ Not started

## 2.3 Memory Efficiency

**Memory Problem**

**Current State**

**Orion OS Solution**

**Status**

Idle RAM usage

Ubuntu 24.04 idle: ~180MB. Windows 11 idle: ~2GB

Orion OS target: &lt;64MB idle (microkernel + essential daemons only)

⚠️ Partial

Memory accounting lies

RSS, VSZ, PSS all measure different things; none accurate

Kernel-level per-process memory accounting; owner-based attribution

⬜ Not started

Heap fragmentation

Long-running servers degrade over time; restart = "fix"

Buddy allocator + slab + background compaction; fragmentation metric

⬜ Not started

Transparent huge pages

Linux THP: often causes latency spikes (compaction stalls)

THP with compaction moved to background; latency-sensitive processes opt out

⬜ Not started

ZRAM / swap compression

ZRAM available on Linux but not default; no automatic tuning

ZRAM default; LZ4 compression; auto-tune compression level vs. CPU trade-off

⬜ Not started

Shared library memory

Each process maps its own copy of glibc pages (CoW shared but tracked per-process)

MemoryCapability shared between processes; physical pages attributed proportionally

⬜ Not started

# 3\. Filesystem Problems

**Filesystem Problem**

**Today's Reality**

**Vega FS Solution**

**Technical Mechanism**

**Status**

Silent data corruption

ext4, NTFS: no per-block checksums. Bit rot is invisible.

Every block carries a BLAKE3-256 checksum in its parent tree node.

On read: verify checksum. On mismatch: repair from mirror or report error.

✅ Covered (DDR-009)

No atomic updates

Power loss during ext4 write can corrupt filesystem. fsck on boot.

CoW: writes create new blocks. Old blocks valid until freed. Journal-free.

The CoW tree update is the atomic operation. No separate journal needed.

✅ Covered

No snapshots (default)

ext4: no snapshots. btrfs/ZFS: snapshots but complex to use.

O(1) snapshots: record current tree root. Free.

vega-fs snapshot create returns in microseconds. Storage cost = only changed blocks.

✅ Covered

Fragmentation

ext4 fragments over time. Performance degrades on old files.

Extent-based allocation prevents fragmentation. Background defrag.

Contiguous extent allocation. Defrag runs on idle in Batch scheduling class.

⚠️ Partial

No transparent encryption

ext4: fscrypt (complex). NTFS: BitLocker (Windows-only, proprietary).

ChaCha20-Poly1305 per-file encryption. TPM-sealed key management.

Encryption key derived from user capability + TPM. Transparent to applications.

⬜ Not started

No native AI/tensor support

Tensor files (GGUF, ONNX, SafeTensors) are just blobs. No special I/O.

TensorObject type: contiguous allocation, huge page mapping, GPU DMA-ready.

Vega FS allocates tensor-typed extents with alignment guarantees for DMA.

⬜ Not started

Slow cold reads (HDD)

Random I/O on HDD: 5-15ms per seek. Kills performance on old hardware.

Sequential write optimisation + ML-assisted cache prefetching.

orion-mld Markov chain prefetcher predicts next access; vega-fsd prefetches.

⚠️ Partial

No versioning

No OS-level file versioning. Git for code, nothing for everything else.

Every write creates a new CoW version. Versions browsable via vega-fs history.

Vega FS keeps old tree roots until explicitly pruned. Time-travel built-in.

⬜ Not started

Package format chaos

Linux: .deb, .rpm, .flatpak, .snap, .appimage. Incompatible.

Single .nova format: WASM + metadata + Dilithium signature + capability list.

.nova is a tar-like archive with a signed manifest. comit installs atomically.

⚠️ Partial

# 4\. Network Stack Problems

**Network Problem**

**Linux Today**

**Orion OS Solution**

**Status**

Network stack in kernel

Linux TCP/IP: 100K+ lines of code in kernel space. Any bug = kernel CVE.

ether-d: user-space network stack. Bug = daemon crash + restart. No kernel exposure.

✅ Covered (DDR-006, Vol 3 §14)

No per-app network policy

iptables/nftables: complex, global. No easy per-app rules.

NetworkCapability: app only gets network access if explicitly granted. orion-pf enforces.

✅ Covered

No built-in VPN

WireGuard added to Linux 5.6 (2020) after 25 years of external tools.

WireGuard implemented as a network stack primitive in ether-d from day one.

✅ Covered (Vol 3 §14)

TCP stack latency overhead

System call + copy per packet. High latency on userspace stacks.

Zero-copy RX path: NIC DMA directly to userspace via MemoryCapability grant.

✅ Covered (Vol 3 §14)

No QUIC native support

QUIC (HTTP/3) requires userspace libraries in every app separately.

QUIC (RFC 9000) built into ether-d. All apps benefit automatically.

✅ Covered

IPv4-only default configs

Many Linux distros still default to IPv4 only for compatibility.

Dual-stack IPv4+IPv6 mandatory from day one. No IPv4-only shortcuts.

✅ Covered

Firewall complexity (iptables)

iptables has 5 tables, 5 chains, complex rule matching. Experts only.

orion-pf: single stateful packet filter with Orion Config Language rules. Human-readable.

✅ Covered

Network traffic fingerprinting

MAC address, TCP stack fingerprint, timing patterns expose device identity.

Randomised MAC per network (DDR-016). TCP stack timing hardened.

⚠️ Partial

# 5\. AI & Modern Workload Problems

_AI workloads represent the fastest-growing class of OS workloads and the area where current OSes are least prepared. Every current OS treats ML inference as a userspace problem with no OS involvement._

**AI Problem**

**Today's Reality**

**Orion OS Solution**

**Challenge**

**Status**

No unified compute scheduler

GPU: CUDA/ROCm/oneAPI (incompatible). NPU: vendor SDKs. CPU: standard. No unified view.

quasar-runtime + DDR-012: unified dispatch to CPU/GPU/NPU based on model + latency + power.

Open-source GPU/NPU drivers needed. NVIDIA is hardest.

✅ Covered (DDR-012, DDR-017)

Duplicate ML runtimes per app

Each app ships TensorFlow/PyTorch/ONNX Runtime separately (50-300MB each).

quasar-runtime: system-level shared runtime. Apps use IPC to request inference.

ONNX model compatibility coverage. Not all models are ONNX.

✅ Covered (DDR-017)

Duplicate model weights

Multiple apps using same LLM load separate copies into RAM/VRAM (10GB each).

quasar-runtime model cache: weights loaded once, shared via read-only MemoryCapability.

Model versioning. Two apps needing different quantisation of same model.

✅ Covered (DDR-017)

No NPU scheduling / isolation

NPU runs vendor SDK in userspace. No kernel visibility or fairness.

GPUCapability / NPUCapability: kernel tracks which process holds NPU context. Time-sliced.

Hardware-specific: each NPU vendor has different command submission model.

✅ Covered (DDR-015)

Privacy: cloud inference

Most AI features require sending data to cloud. Privacy violation by design.

On-device inference only by default. quasar-runtime has no network access. No telemetry.

Model quality vs. size trade-off. 7B+ models need 6GB+ VRAM.

✅ Covered

LLM on old hardware

LLaMA-2 7B: needs 8GB RAM minimum. Excludes most hardware in Nova's target range.

Quantised models (4-bit GGUF) via llama.cpp-equivalent. Orion Mobile offloads to Orion Server.

Quality vs. speed trade-off with quantisation.

⚠️ Partial

No hardware aging compensation

No OS predicts SSD wear, thermal throttling, or HDD degradation patterns.

orion-mld hardware aging predictor: SMART data + ML → predict failures before they occur.

Training data for wear prediction varies by hardware manufacturer.

✅ Covered (DDR-018, DDR-019)

Compiler not power-aware

GCC/LLVM optimise for speed or size. No power optimisation mode.

Cosmos Compiler (Phase B5): --power-optimize flag. Energy-aware instruction selection.

Requires hardware power models per CPU microarch.

⬜ Not started

# 6\. User Experience Problems

**UX Problem**

**Today's Reality**

**Orion OS Solution**

**Status**

Silent update failures

apt upgrade: "E: dpkg was interrupted." No rollback. System broken.

Atomic A/B updates: failure leaves system on A. comit shows clear error + suggestions.

✅ Covered

Slow package install

Ubuntu: apt install firefox: 45 seconds. Dependency hell. No parallelism.

comit: parallel download + CoW install + dedup. Target: &lt;10s for 100 packages.

⚠️ Partial

Battery life mystery

No OS shows which app used 3W for the last hour. Users blame "the battery".

orion-top shows per-process mW. Nova Energy Dashboard shows history + suggestions.

✅ Covered (Vol 1 §33, DDR-new)

Confusing error messages

"Segmentation fault (core dumped)". Users have no idea what to do.

No Surprises Principle: every error has cause, explanation, and suggested action.

⬜ Not started (needs Vol 1 addition)

Permission popups without context

Android: "Allow app to access location?" No reason given.

Nova permission prompts: "Firefox wants network access to download updates. Allow for this session / always / deny?"

⬜ Not started

Accessibility as afterthought

Screen readers, high contrast are usually third-party on Linux.

Built-in accessibility: AT-SPI equivalent in compositor, system-wide TTS, keyboard navigation.

❌ Missing (no spec yet)

No hardware status dashboard

lshw, dmidecode: expert tools. Users cannot tell if their hardware is healthy.

"nova hardware status": feature table showing what is supported, what is degraded, what to upgrade.

⬜ Not started

Old hardware excluded

Windows 11: requires TPM 2.0, 64GB storage, 4GB RAM. Modern Linux: 2GB+ RAM.

Orion Micro: &lt;32MB RAM. Orion Base: &lt;128MB RAM. Progressive enhancement for hardware.

✅ Covered (Vol 1)

App isolation opaque

Users cannot tell what permissions apps have or what they are doing.

Nebula Hub: every app shows its capability list. Settings shows active capabilities per running app.

⚠️ Partial

# 7\. Bootloader & Boot Chain Problems

**Boot Problem**

**GRUB / Windows Boot Manager Today**

**Nova Boot Solution**

**Status**

No mandatory verification

GRUB: Secure Boot optional. Most installs skip it.

horizon-boot: Dilithium signature mandatory. Unsigned kernel refuses to boot.

✅ Covered (DDR-011)

No measured boot

No standard for measuring boot components into TPM PCRs.

All boot stages measured into TPM PCR\[0-2\]. Key sealed to measured state.

✅ Covered (DDR-011)

No anti-rollback

Attacker can flash old vulnerable bootloader. No protection.

Monotonic counter in TPM NVRAM. Boot refuses if version &lt; stored minimum.

✅ Covered (DDR-011)

Slow bootloader

GRUB: 1-2 seconds. Finds kernel, loads modules, draws menu.

horizon-boot: &lt;100KB. No menu by default. Direct load. Target: &lt;200ms.

⬜ Not started

No recovery mechanism

Linux: boot to rescue mode manually. Windows: recovery partition (large).

F11 at boot: loads signed recovery image from read-only recovery partition.

⬜ Not started

GRUB config complexity

grub.cfg: expert-only. Users break it by editing.

horizon-boot has no user-editable config file. Settings via horizon-boot-config tool.

⬜ Not started

Multi-boot chaos

Dual-booting Linux+Windows: fragile. GRUB must detect Windows.

Nova boot manager: clean multi-boot. Each OS entry signed independently.

⬜ Not started

# 8\. Compiler & Toolchain Problems (Bootstrap Phases B1-B5)

**Compiler Problem**

**LLVM/GCC Today**

**Cosmos Compiler Solution (Phase B4-B5)**

**Status**

Slow compile times

LLVM: 10-30 min for debug kernel build. Chromium: 2+ hours.

Incremental compilation. mold linker (3-10x faster). Parallel codegen. sccache.

⚠️ Partial (mold/sccache, not Cosmos Compiler yet)

No OS-aware optimisation

Compiler assumes generic OS. Cannot optimise for capabilities.

Cosmos Compiler knows Orion OS ABI: capability-aware optimisations, IPC call inlining.

❌ Missing (Phase B5)

No formal verification

GCC/LLVM: no proof of correctness for generated code.

Rust (type-safe) + Kani (model checker) + future Cosmos Compiler with verified lowering.

⚠️ Partial (Kani covers Rust; Cosmos IR not designed)

Cross-arch complexity

Separate toolchain for each arch. Configuration-heavy.

Single Cosmos Compiler: x86-64, ARM64, RISC-V backends from one codebase.

❌ Missing (Phase B5)

No power-aware compilation

No compiler flag for energy optimisation.

Cosmos Compiler: --power-optimize. Selects instructions with lower power coefficients.

❌ Missing (Phase B5)

No Cosmos IR (intermediate rep)

N/A — this is a new concept for Nova

Cosmos IR: SSA form, typed, capability-aware. Defined before Phase B4 starts.

❌ Missing (needs Vol 2B)

Supply chain trust

Trusting the compiler is trusting the bootstrap chain (Ken Thompson).

5-phase bootstrap: each phase is verified against the previous. Self-hosting by Phase B5.

✅ Covered (Vol 1)

# 9\. Problem Coverage Dashboard — Current Status

_This table is the living health check of Orion OS. Update it as components are built._

**Problem Category**

**Nova Solution**

**DDR(s)**

**Status**

Kernel bloat / size

Hybrid microkernel &lt;200KB core target

DDR-001

**⚠️ Partial**

Driver crashes = system crash

User-space drivers + orion-devmgr restart

DDR-001, DDR-010

**✅ Covered**

Memory safety (70% of CVEs)

100% safe Rust kernel + Kani + ARM MTE

DDR-010

**✅ Covered**

Security as afterthought

Capability model + 7-layer security arch

DDR-002

**✅ Covered**

DMA attacks (Thunderbolt)

IOMMU mandatory for all DMA

DDR-010

**✅ Covered**

Supply chain attacks (XZ-style)

PQ package signatures + reproducible builds

DDR-011, DDR-014

**✅ Covered**

Post-quantum vulnerability

Kyber + Dilithium from day one

N/A

**✅ Covered**

Hardware fingerprinting

HardwareIDCapability + randomised IDs

DDR-016

**✅ Covered**

Boot chain compromise

Measured boot + TPM PCR sealing + anti-rollback

DDR-011

**✅ Covered**

Scheduling for P+E cores

Topology-aware scheduler + 5 scheduling classes

DDR-005

**✅ Covered**

Real-time latency

Realtime scheduling class + tickless kernel

DDR-005

**✅ Covered**

GPU scheduling / isolation

GPUCapability + kernel GPU context scheduler

DDR-015

**✅ Covered**

AI workload scheduling

quasar-runtime + DDR-012 dispatch logic

DDR-012, DDR-017

**✅ Covered**

Slow boot time

&lt;2s target; horizon-boot + parallel init

DDR-011

⬜ Not started

High idle RAM usage

&lt;64MB idle target; microkernel architecture

DDR-001

**⚠️ Partial**

Silent data corruption

BLAKE3 per-block checksums in Vega FS

DDR-009

**✅ Covered**

No atomic filesystem updates

CoW Vega FS; journal-free atomic ops

DDR-009

**✅ Covered**

No filesystem snapshots

O(1) CoW snapshots in Vega FS

DDR-009

**✅ Covered**

Package management chaos

Single .nova WASM format + comit

N/A

**⚠️ Partial**

Network stack in kernel (CVEs)

ether-d user-space network stack

DDR-006

**✅ Covered**

No per-app network policy

NetworkCapability + orion-pf

DDR-002

**✅ Covered**

No built-in VPN

WireGuard in ether-d from day one

N/A

**✅ Covered**

Duplicate ML runtimes per app

quasar-runtime shared system runtime

DDR-017

**✅ Covered**

Cloud AI / privacy

On-device only; quasar-runtime no network access

DDR-017

**✅ Covered**

No battery usage per app

orion-powerd 10ms energy accounting loop

N/A

**✅ Covered**

Old hardware excluded

Orion Micro &lt;32MB; progressive enhancement

N/A

**✅ Covered**

Confusing error messages

No Surprises Principle (needs Vol 1 addition)

N/A

⬜ Not started

Accessibility missing

Built-in AT-SPI + TTS + keyboard nav (needs spec)

N/A

**❌ Missing**

No OS-level AI runtime

quasar-runtime + model cache + NPU dispatch

DDR-017

**✅ Covered**

ML in kernel (wrong approach)

Rejected: kernel-assisted userspace ML via orion-mld

DDR-018, DDR-019

**✅ Covered**

Compiler: no Cosmos IR

Cosmos IR spec needed before Phase B4

N/A

**❌ Missing**

HAL specification missing

Vol 2 HAL spec needed before multi-arch code

N/A

**❌ Missing**

VFS specification missing

Vol 2 VFS spec needed before vega-fsd

N/A

**❌ Missing**

# 10\. What Orion OS Explicitly Does NOT Solve

_Scope discipline is a survival skill. These are real problems that Orion OS will not attempt to solve, with the reason why._

**Problem**

**Why Orion OS Won't Solve It**

**What to Do Instead**

Quantum computing OS support

No standardised quantum hardware ISA. No application ecosystem. 10+ years from mainstream.

Monitor NIST PQC + IBM Qiskit developments. Add to Year 8+ roadmap section.

Neuromorphic chip support (active)

No consumer-grade neuromorphic hardware. Programming models incompatible with Orion OS capability system.

Reference in "future hardware" section. Do not add to active roadmap.

Ternary logic / non-binary hardware

No hardware exists. Conceptually interesting, architecturally irrelevant to Orion OS mission.

Remove from all documents. It makes the project look unfocused.

Social features / cloud backup

Any cloud feature that involves user data leaving the device violates the independence philosophy.

Users can install self-hosted cloud (Nextcloud) on their own Orion Server.

Antivirus / signature-based malware detection

The capability model makes malware architecturally impossible to persist or spread. Antivirus is for threat models Orion OS eliminates by design.

Document why antivirus is not needed. Do not ship ClamAV.

In-OS payment processing / capability trading markets

Introducing financial transactions into OS design creates regulatory, privacy, and trust risks incompatible with Orion OS values.

Use time-limited capabilities instead. Remove capability market concept.

Distributed consensus / blockchain integration

Complex, high-overhead, and solves problems Orion OS does not have. CRDTs for sync are fine; blockchain is not.

Use CRDTs for offline sync (Year 5+). No blockchain anywhere.

# How to Use This Document

This document is updated every time a Orion OS component reaches a new status. The workflow:

- When a component moves from ❌ Missing to ⬜ Not started: a DDR has been written. Design is complete.
- When a component moves from ⬜ Not started to ⚠️ Partial: code exists but not complete or not tested.
- When a component moves from ⚠️ Partial to ✅ Covered: implementation complete, CI tests passing, benchmarks measured.

_The dashboard in §9 is the single source of truth for how much of the Orion OS problem space has been addressed. Share it with collaborators and update it on every milestone._
