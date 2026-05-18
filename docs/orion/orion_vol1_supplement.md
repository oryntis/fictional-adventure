---
title: "Orion Vol1 Supplement"
sidebar_position: 6
---

**PROJECT ORION OS**

**Vol 1 Supplement — Governance, Philosophy & Embedded Config**

_§22 Governance (RFC, CLA, Voting) • §23–26 Philosophy Deep Dives • §27 Orion Micro Build Config_

Revision 1.0 • May 2025 • Merge into Vol 1

# **Purpose**

This document fills the remaining governance and philosophy gaps from the suggestions report. It is designed to be merged directly into Vol 1.

**Merge Instructions**

§22.1–§22.5 → extend Vol 1 §22 (Governance). §23–§26 → add after Vol 1 §24 (Lightweight Philosophy). §27 → cross-reference from Vol 3 (Orion Micro build config lives here until Vol 3 is updated).

# **§22 — Community Governance (Full Specification)**

## **§22.1 — Code of Conduct**

**Adopted: Contributor Covenant v2.1**

Orion OS formally adopts the Contributor Covenant v2.1 as its Code of Conduct. Report violations to: conduct@orionos.dev. Community leaders are required to respond within 72 hours.

### **Our Pledge**

We pledge to make participation in the Orion OS community a harassment-free experience for everyone regardless of age, body size, disability, ethnicity, sex characteristics, gender identity, level of experience, education, socio-economic status, nationality, personal appearance, race, caste, religion, or sexual identity and orientation.

### **Expected Behaviour**

*   Show empathy and kindness toward other community members
*   Respect differing opinions, viewpoints, and experience levels
*   Give and gracefully accept constructive criticism — kernel code review can be direct, but never personal
*   Accept responsibility for mistakes and learn from them
*   Focus on what is best for the project and the community, not just for yourself

### **Unacceptable Behaviour**

*   Sexualised language, imagery, or unwanted advances of any kind
*   Trolling, insulting, derogatory comments, or personal attacks
*   Public or private harassment of any community member
*   Publishing others' private information without explicit permission (doxing)
*   Conduct that would be considered inappropriate in a professional setting

### **Enforcement**

**Violation Level**

**Example**

**Consequence**

1 — Correction

Inappropriate language, minor unprofessional behaviour

Written warning. Explanation of why behaviour was inappropriate.

2 — Warning

Single serious violation or pattern of minor violations

Formal warning. No interaction with involved parties for 30 days. Violation of terms = temporary ban.

3 — Temporary Ban

Sustained inappropriate behaviour or serious violation

Temporary ban from all community spaces for 60–180 days.

4 — Permanent Ban

Pattern of sustained violations, harassment, or aggression

Permanent ban from all Orion OS community spaces.

## **§22.2 — RFC Process (Request for Comments)**

**When is an RFC Required?**

Any change to a locked DDR. Any new major feature that affects the kernel ABI, capability model, or public API. Any change to governance documents. New volume additions to the doc system.

**Stage**

**Action**

**Duration**

**Decision**

1\. Draft

Open GitHub Discussion with RFC label. Use template below. Announce on Matrix/Discord.

Author's timeline

Author

2\. Community Review

Community comments, questions, objections. Author updates RFC based on feedback.

≥ 2 weeks minimum

Community

3\. Final Comment Period (FCP)

Core team announces FCP. Last-call for objections. Disposition: accept / postpone / close.

1 week

Core team

4\. Accepted

RFC merged to /docs/rfcs/XXXX-title.md. Implementation issue created and linked.

N/A

Core team

5\. Implemented

PR linked to RFC. RFC status updated to Implemented. DDR updated if applicable.

N/A

RFC author + reviewers

### **RFC Template**

\# RFC-XXXX: \[Short Descriptive Title\]

\- \*\*Status:\*\* Draft | Under Review | FCP | Accepted | Implemented | Withdrawn

\- \*\*Author:\*\* \[Your name / GitHub handle\]

\- \*\*Created:\*\* YYYY-MM-DD

\- \*\*Affects:\*\* Vol X §Y, DDR-ZZZ (list all affected documents)

\## Summary

One paragraph. What is this RFC proposing?

\## Motivation / Problem

Why does this need to change? What is the current design's limitation?

\## Detailed Design

Full technical description of the proposed change.

Include: interfaces, data structures, algorithms, examples.

\## Alternatives Considered

What else was considered? Why was each alternative rejected?

\## Trade-offs

What does this give up? What does it gain? Be honest about both.

\## Implementation Plan

Which Phase does this land in? Who is likely to implement it?

Estimated effort: \[days / weeks / months\]

\## Unresolved Questions

What is still unclear or needs further discussion?

## **§22.3 — Maintainer Roles & Decision Making**

**Role**

**Responsibilities**

**How to Become**

**Voting Weight**

Contributor

Submit PRs, report issues, participate in RFC discussions

Open a PR that gets merged

None — advisory only

Reviewer

Review PRs in their area of expertise. First-line code review.

Nominated by a Maintainer after 5+ quality PRs merged

None on governance

Maintainer

Approve and merge PRs. Lock DDRs. Cast votes on RFCs.

Nominated by 2 Maintainers, no objection in 2 weeks

1 vote per RFC

Core Team

Strategic direction. Final RFC decisions. CoC enforcement. Release management.

Elected by Maintainers (simple majority) annually

1 vote + FCP veto

BDFL (if applicable)

Project founder. Tie-breaking vote on Core Team deadlocks only.

Project founder only

Tie-break only

### **Decision Types**

**Decision**

**Process**

**Threshold**

Lock a new DDR

RFC → FCP → Core Team vote

2 Core Team approvals, 0 vetoes

Change a locked DDR

RFC (mandatory) → FCP → Core Team vote

3 Core Team approvals, 0 vetoes

Add a new Maintainer

Nomination → 2 week open period → Maintainer vote

Simple majority of active Maintainers

Release a new version

Core Team vote

Simple majority

Change Code of Conduct

RFC → community review → Core Team vote

Unanimous Core Team

Remove a Maintainer (misconduct)

CoC enforcement process → Core Team vote

Unanimous Core Team (excluding accused)

## **§22.4 — Contributor License Agreement (CLA)**

**Why a CLA?**

A CLA gives Orion OS the legal right to use your contribution and to re-license it if necessary (e.g., to allow commercial use or to comply with future legal requirements). It does NOT transfer copyright — you retain ownership of your work.

### **Orion OS Individual Contributor License Agreement v1.0**

By submitting a pull request or patch to the Orion OS project, you accept and agree to the following terms:

**Clause**

**Text**

1\. Grant of Copyright License

You grant Orion OS Project and recipients of software distributed by Orion OS Project a perpetual, worldwide, non-exclusive, no-charge, royalty-free, irrevocable copyright license to reproduce, prepare derivative works of, publicly display, publicly perform, sublicense, and distribute your contributions and such derivative works.

2\. Grant of Patent License

You grant a perpetual, worldwide, non-exclusive, no-charge, royalty-free, irrevocable patent license to make, have made, use, offer to sell, sell, import, and otherwise transfer the work, where such license applies only to those patent claims licensable by you that are necessarily infringed by your contribution(s) alone or by combination of your contribution(s) with the project.

3\. You Represent

You represent that: (a) each contribution is your original creation; (b) your contribution does not violate any third-party rights; (c) if your employer has rights to intellectual property that you create, you have received permission to make contributions on behalf of that employer.

4\. You Retain Copyright

This CLA does NOT transfer copyright ownership of your contributions to the Orion OS Project. You retain full copyright. The CLA only grants a license to use your contribution.

5\. Inbound = Outbound

Your contributions are licensed to the project under the same license that covers the project file you are contributing to (GPLv2 for kernel code, MIT for tooling, as specified per-crate in Cargo.toml).

### **How to Sign the CLA**

*   Individual contributors: Add 'Signed-off-by: Your Name &lt;email>' to every commit (git commit -s)
*   Corporate contributors: Email legal@orionos.dev with company name and list of authorised contributors
*   The DCO (Developer Certificate of Origin) Signed-off-by line is the CLA signature for individual contributors
*   GitHub Actions will automatically check that all commits have a Signed-off-by line

## **§22.5 — Roadmap Voting Mechanism**

**Purpose**

The roadmap voting mechanism gives the community a formal way to influence feature priorities. It is advisory — Core Team makes final decisions — but voting results are published and must be addressed with reasoning if overridden.

**Voting Mechanism**

**How It Works**

**When Used**

GitHub Reactions (👍/👎)

Any GitHub issue or RFC can be up/down voted by community. Sorted by reaction count in project board.

Continuous — for prioritisation within a phase

Quarterly Priority Poll

GitHub Discussions poll: 'What should we focus on next quarter?' Community votes on 5 options, ranked choice.

Quarterly — before each sprint planning

RFC Sentiment Survey

When an RFC has conflicting community feedback, a structured survey (Google Form / Pol.is) measures community sentiment precisely.

As needed — when RFC discussion is heated

Funding Vote

When Orion OS receives grants or donations, community votes on allocation between: infrastructure, bounties, core dev time.

When funds are received

### **Roadmap Voting Rules**

*   Voting is open to all GitHub users who have interacted with the Orion OS repository (starred, opened issue, or submitted PR)
*   Results published within 48 hours of poll closing
*   Core Team must respond to top-voted items within 2 weeks: either include in next sprint or explain why not
*   Voting cannot override locked DDRs — the architecture is not up for popular vote
*   Feature prioritisation is voted on. Security decisions are not voted on.

# **§23–26 — Philosophy Deep Dives**

_Four questions that every new contributor asks. These are the 'why' answers that are too long for a DDR rationale section — they deserve their own dedicated explanations._

## **§23 — Why No Antivirus in Orion OS?**

**Short Answer**

Because antivirus is a symptom of a broken security model. Orion OS's capability model makes the class of attack that antivirus protects against structurally impossible, not just detectable after the fact.

### **The Problem With Antivirus**

Traditional antivirus works like this: malware runs, does damage, antivirus detects the damage or matches a signature database, removes the malware. This model has three fundamental problems:

*   It is reactive — malware must execute before it can be detected. Files may be encrypted, data exfiltrated, or credentials stolen before detection.
*   It requires kernel-mode access — antivirus installs kernel hooks, minifilter drivers, and callback registrations. This is exactly how the CrowdStrike incident (July 2024) took down 8.5 million Windows machines: kernel-mode security software crashed the kernel.
*   It is a signature arms race — each new piece of malware requires an updated signature. Zero-day malware is invisible until the signature is written.
*   It creates a false sense of security — users believe antivirus protects them from anything. It only protects against known threats with written signatures.

### **How Orion OS Makes Antivirus Unnecessary**

**Attack Vector**

**How Antivirus Handles It**

**How Orion OS Handles It**

Malware installs itself

Antivirus detects during/after installation

Comit: every package is Dilithium-signed. Unsigned code cannot install.

Malware reads private files

Antivirus scans for suspicious file access patterns

FileCapability: apps can only read files they were granted access to at install. Malware gets no FileCapability for /home/user.

Malware phones home

Antivirus monitors network traffic

NetworkCapability: apps cannot open sockets without capability. Malware with no NetworkCapability cannot exfiltrate data.

Malware escalates privileges

Antivirus monitors privilege escalation syscalls

No privilege escalation mechanism exists. There is no root, no setuid, no SYSTEM account. Capabilities cannot be gained — only lost (attenuation).

Malware injects into other processes

Antivirus monitors process injection APIs

Process injection requires IPCCapability to the target process. Malware cannot IPC to a process it has never been granted access to.

Ransomware encrypts files

Antivirus detects ransomware patterns

FileCapability grants specific access. Ransomware cannot access files it wasn't granted. Even if it encrypts granted files: Vega FS snapshots allow instant recovery.

Kernel rootkit

Antivirus uses kernel hooks to detect rootkits

The kernel is immutable and verified by measured boot. A rootkit cannot persist across reboots. The Cosmos kernel is formally verified — critical paths are mathematically correct.

### **What Orion OS Has Instead of Antivirus**

*   Comit signature verification — every binary is Dilithium3-signed before execution
*   Capability model — apps can only access what they were explicitly granted
*   orion-mld anomaly detection — ML-based syscall pattern analysis (complement, not replacement)
*   Measured boot — kernel integrity verified by TPM before every boot
*   Vega FS snapshots — instant recovery from ransomware or corruption
*   Formal verification of kernel core — certain classes of kernel exploit are mathematically impossible

**The Bottom Line**

Antivirus exists because Windows and Linux allow apps to run unsigned code, access the filesystem freely, and escalate privileges. Remove those three permissions, and 95% of malware has no attack surface. Orion OS removes all three by design.

## **§24 — Why No fork() in Orion OS?**

**Short Answer**

fork() was designed in 1969 for single-threaded processes on single-core machines. It is fundamentally incompatible with threads, capabilities, and modern security requirements. It should never have been standardised.

### **What fork() Does (And Why It Was a Mistake)**

fork() creates an exact copy of the calling process — all memory, all file descriptors, all state. The child then calls exec() to replace itself with a new program. This fork-exec idiom has been the Unix process creation model since 1969.

### **The Six Problems With fork()**

**Problem**

**Impact**

**Real-World Evidence**

fork() + threads = disaster

fork() in a multi-threaded process copies only the calling thread. All other threads disappear. Mutexes held by dead threads are locked forever. The child is in an inconsistent state.

pthread\_atfork() exists specifically to work around this. It is extremely difficult to use correctly. Almost all multi-threaded code cannot safely call fork().

fork() copies everything — even things you don't need

Copying a 2GB heap process just to exec() a tiny utility wastes time and memory. CoW helps but doesn't eliminate the problem.

Systems that fork() large processes (databases, browsers) spend measurable CPU time on fork() even with CoW page tables.

fork() + capabilities = fork() leaks all capabilities

In a capability system, fork() gives the child ALL parent capabilities by default. Every file descriptor, every capability handle. The child must manually close each one.

POSIX requires O\_CLOEXEC on every file descriptor you don't want children to inherit. This is error-prone — one missed descriptor leaks a capability.

fork() makes security analysis impossible

To audit what capabilities a child process has, you must trace every fork() chain and every close() call. The capability set is implicit.

Securing forking servers (Apache prefork, PostgreSQL) requires complex permission-dropping code that is frequently incorrect.

fork() between user and kernel is expensive

Even with CoW, fork() must copy the page table, update reference counts, flush TLB entries. On large processes: measurable milliseconds.

PostgreSQL's fork-per-connection model limits scalability. Redis had to add a thread pool because fork() for persistence was too slow.

fork() is unnecessary with good IPC

The entire purpose of fork() is to create new processes. Modern systems have better primitives: posix\_spawn(), Zircon's process\_create(), Plan 9's rfork().

Every modern OS design (Fuchsia, Plan 9, seL4) has moved away from fork(). Even Linux has posix\_spawn() in glibc as an alternative.

### **spawn() — The Correct Alternative**

Orion OS uses spawn() only. spawn() creates a new process from an executable with an explicit, declared capability set:

**Property**

**fork() + exec()**

**Orion OS spawn()**

Capability inheritance

All parent capabilities, must manually drop

Explicit list of capabilities granted to child — nothing implicit

Memory

Copy parent address space (CoW)

Fresh address space — load from executable

Thread model

Copies calling thread only — others disappear

New process starts clean with one thread

Security analysis

Must trace fork chain to know capabilities

manifest.toml declares capabilities statically — auditable at install time

Performance

Copy page table + CoW setup overhead

No copying — fresh mapping from ELF

Multi-thread safety

Fundamentally broken — pthread\_atfork hack

Not applicable — fresh process

## **§25 — Why an Immutable OS Core?**

**Short Answer**

Configuration drift, persistent malware, and failed updates are all caused by the same thing: the OS allows its own core files to be modified at runtime. Remove that permission, and all three problems disappear structurally.

### **What is an Immutable Core?**

In Orion OS, the /system partition (OS binaries, drivers, services, system libraries) is mounted read-only and cryptographically verified. No process — not even a process with the highest privileges — can modify /system at runtime. Updates replace the entire /system partition atomically via A/B swap.

### **Three Problems It Solves**

**Problem**

**Traditional OS**

**Orion OS (Immutable Core)**

Configuration Drift

After 6 months of use, every Linux system has configuration files in different states from every other Linux system. 'It works on my machine' is caused by drift.

System configuration is declarative TOML files. User data in /home. /system is the same byte-for-byte on every Orion OS install of the same version.

Persistent Malware

Malware that gains root access on Linux/Windows can modify system binaries, add kernel modules, or install persistent daemons. It survives reboots.

Even with full capability compromise: the malware cannot write to /system (read-only mount). On reboot, measured boot verifies /system against TPM PCRs. Modification detected → rollback to known-good.

Broken Updates

apt upgrade can fail halfway through and leave the system in a partially upgraded state. Recovering from a broken package state is a common Linux user pain point.

A/B updates: the update installs to the inactive partition. On reboot, it activates. If the system fails to boot cleanly: automatic rollback to the previous partition. No partial state.

### **ChromeOS Comparison — Immutable Core in Production**

ChromeOS has shipped with an immutable root filesystem since 2011. Over 14 years and hundreds of millions of devices, the evidence is clear:

*   ChromeOS has near-zero user-reported 'broken update' incidents — the A/B system works
*   ChromeOS malware persistence is essentially zero — there is nowhere for malware to persist across a verified reboot
*   ChromeOS enterprise management is dramatically simpler than Windows — the system state is predictable and known
*   ChromeOS update adoption is near-instant — users cannot defer updates because the system doesn't ask, it just switches partitions

**NixOS Lesson**

NixOS takes immutability further than ChromeOS — every package installation creates a new system generation. The system is always in a known, reproducible state. Orion OS's immutable core is inspired by both ChromeOS (A/B updates) and NixOS (declarative, reproducible configuration).

## **§26 — Why WebAssembly as the App Format?**

**Short Answer**

WASM is the first binary format that is simultaneously: safe by construction, architecture-neutral, fast, and already widely supported. It is the correct long-term app format for any OS that wants security and portability.

### **What WASM Provides That ELF Cannot**

**Property**

**ELF (traditional binary)**

**WASM (Orion OS apps)**

Memory safety

C/C++ ELF: no. Rust ELF: yes.

All WASM: yes by construction. The WASM VM cannot access memory outside its linear memory.

Architecture neutral

No — must recompile for each ISA (x86, ARM, RISC-V)

Yes — one .wasm binary runs on all Orion OS architectures

Capability model integration

Requires OS-level enforcement (Orion capability syscalls)

WASM capabilities are import declarations — the VM enforces at the module boundary

Sandboxing overhead

Full process isolation — 1–3ms context switch

WASM VM isolation — sub-microsecond boundary crossing for same-process modules

Binary size

Full native binary with all deps statically linked — typical: 5–50MB

WASM modules with tree-shaking — typical: 200KB–5MB

JIT compilation

Not applicable — already native

WASM JIT (Cranelift, LLVM MCJIT) achieves 80–95% of native performance

Update granularity

Replace entire binary

Replace individual WASM modules — fine-grained updates

Formal verification

Difficult — arbitrary machine code

Possible — WASM has formal semantics (the WASM spec is a formal document)

### **Security Model — WASM Capabilities**

WASM modules declare their capabilities as imports. The Orion OS WASM runtime only provides imported capabilities if the process holds the corresponding capability:

**WASM Import Declaration**

**Orion OS Capability Required**

**What the App Gets**

(import "orion" "file\_read" (func ...))

FileCapability:/path/to/dir

Read access to declared path only

(import "orion" "network\_connect" (func ...))

NetworkCapability

TCP connect to approved ports

(import "orion" "infer" (func ...))

InferenceCapability (from Quasar)

AI inference via Quasar Runtime

(import "orion" "gpu\_render" (func ...))

GPUCapability:RENDER

GPU rendering surface

No import

No capability required

WASM computation only — completely sandboxed

### **Native Shims for Performance-Critical Code**

100% WASM is not always possible. Orion OS allows an optional native shim alongside the WASM module:

*   The WASM module handles all app logic, UI, and I/O
*   The native shim (.so per architecture) handles performance-critical inner loops (codecs, physics engines, ML kernels)
*   The native shim is subject to all capability restrictions — it cannot bypass the WASM module's capability set
*   Comit verifies both the WASM module and the native shim with Dilithium signatures

# **§27 — Orion Micro — Embedded Build Configuration**

**What is Orion Micro?**

Orion Micro is the embedded tier of the Orion OS three-tier model (Micro / Base / Full). It runs on devices with as little as 32MB RAM, no MMU (microcontrollers), or ARM Cortex-M class hardware. Full capability model. No features removed — only features compiled out via Cargo feature flags.

## **27.1 — Three-Tier Build Configuration**

**Tier**

**Target Hardware**

**RAM**

**Storage**

**Features Compiled In**

**Use Cases**

Orion Micro

ARM Cortex-M, RISC-V32 (no MMU), ESP32-S3, RP2040

≥64KB (Cortex-M) / ≥32MB (RISC-V)

≥1MB flash

Capability model, IPC, basic WASM runtime, BLE/WiFi, minimal shell

IoT sensors, wearables (Orion Watch), embedded controllers, industrial

Orion Base

x86-64 (old PCs), ARM64, RISC-V64 (with MMU)

≥256MB

≥4GB

Full kernel + drivers + Pulsar Shell + Comit. No compositor.

Servers, headless systems, developer boards, Raspberry Pi

Orion Full

x86-64 (modern), ARM64 Apple/Qualcomm

≥2GB

≥16GB

Everything: Aurora, Quasar, orion-mld, gaming, AI runtime

Desktop, laptop, workstation, gaming

## **27.2 — Cargo Feature Flags for Orion Micro**

**Cargo Feature**

**Default (Full)**

**Micro**

**Description**

feature = "mmu"

✅ enabled

❌ disabled

MMU-based virtual memory. Disabled for Cortex-M (no MMU hardware)

feature = "smp"

✅ enabled

❌ disabled

Multi-core SMP support. Disabled for single-core microcontrollers

feature = "aurora"

✅ enabled

❌ disabled

Wayland compositor. Disabled for headless and embedded

feature = "quasar"

✅ enabled

⚠️ tflite-micro only

Full Quasar Runtime vs TFLite Micro for Orion Watch

feature = "vega-fs"

✅ enabled

⚠️ read-only mode

Full Vega FS vs read-only Vega FS for flash storage

feature = "wasm-full"

✅ enabled

❌ → wasm-micro

Full WASM runtime (Wasmtime) vs micro WASM (wasm3)

feature = "comit"

✅ enabled

⚠️ comit-micro

Full Comit vs minimal OTA update client only

feature = "networking"

✅ enabled

⚠️ ble-only or wifi-only

Full TCP/IP stack vs BLE-only or WiFi-only for IoT

feature = "capability-full"

✅ enabled

✅ enabled

Capability model — always enabled, all tiers. Non-negotiable.

## **27.3 — Orion Micro Build Commands**

\# Orion Micro — ARM Cortex-M4 (no MMU, 256KB RAM)

cargo build --target thumbv7em-none-eabihf \\

\--no-default-features \\

\--features "capability-full,wasm-micro,ble-only"

\# Orion Micro — RISC-V32 with MMU (32MB RAM, ESP32-S3 class)

cargo build --target riscv32imc-unknown-none-elf \\

\--no-default-features \\

\--features "mmu,capability-full,wasm-micro,wifi-only,vega-fs"

\# Orion Base — ARM64 headless server (Raspberry Pi 4, 1GB)

cargo build --target aarch64-unknown-none \\

\--no-default-features \\

\--features "mmu,smp,capability-full,vega-fs,wasm-full,comit,networking"

\# Orion Full — x86-64 desktop (16GB RAM)

cargo build --target x86\_64-unknown-none # all features enabled by default

## **27.4 — Orion Watch (Wearable Reference Platform)**

**Component**

**Specification**

**Orion OS Support**

CPU

ARM Cortex-M33 @ 64MHz

thumbv8m.main-none-eabihf target

RAM

512KB SRAM + 8MB external PSRAM

MMU-less memory model. Capability tables in SRAM.

Storage

16MB SPI flash

Vega FS read-only mode. OTA via comit-micro.

Display

1.4" round OLED, 454×454px

Custom orion-watch-display driver (no Aurora needed)

Connectivity

BLE 5.3

ble-only networking feature. Pairs with Orion OS phone/desktop.

ML

TFLite Micro (quasar-micro feature)

Heart rate, step count, gesture recognition, sleep tracking

Battery

300mAh

orion-energy power accounting. Ultra-low idle: &lt;2mW

Sensors

Heart rate, SpO2, accelerometer, gyroscope, barometer

I2C sensor driver stack