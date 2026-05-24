---
title: "Orion Vol0 Quickstart Contributing Roadmap"
sidebar_position: 5
---

**PROJECT ORION OS**

**Vol 0: Quick Start, Contributing & Roadmap**

_Start here before anything else — environment setup, first milestone, glossary, contributor guide, user personas, and public roadmap_

Revision 1.0 • May 2025

# **How to Use This Volume**

Vol 0 is the entry point for everyone — new contributors, users reading about the project, and the project lead reviewing priorities. It answers four questions in order:

- What is Orion OS and who is it for? (§1 — User Personas)
- How do I set up my environment and build something? (§2 — Quick Start)
- How do I contribute to the project? (§3 — Contributing Guide)
- What is being built and when? (§4 — Public Roadmap)
- What do all the terms mean? (§5 — Glossary)

# **§1 — User Personas**

_Orion OS is not built for a single user type. These five personas define exactly who we are building for, what their pain points are, what Orion OS gives them, and how we talk to them._

## **🖥️ The Old Hardware Owner**

**Tagline**

"Breathe new life into your old PC — no upgrades needed."

### **Pain Points Today**

- Modern Linux distros require 4GB+ RAM just to boot a desktop
- Windows 11 hardware requirements exclude 600+ million PCs
- Their 2012–2018 laptop is perfectly functional hardware — the OS got heavy
- Forced to buy new hardware purely because of OS bloat

### **What Orion OS Gives Them**

- &lt;150MB idle RAM — runs full desktop on 2GB
- ZRAM-powered memory compression — turns 2GB into ~4GB effective
- Hardware aging compensation — Cosmos scheduler knows their SSD is old and compensates
- Boot in under 3 seconds on a spinning HDD

### **Strategic Note**

_The biggest untapped market. 600M+ PCs running Windows 10 lose support in October 2025. This is Orion OS's launch moment._

## **🤖 The AI / ML Engineer**

**Tagline**

"Run AI models faster, with less RAM, on any hardware."

### **Pain Points Today**

- Every AI framework ships its own 500MB runtime — PyTorch, TensorFlow, ONNX all duplicated
- GPU scheduling is designed for graphics, not compute — LLM inference gets no scheduler priority
- Running a 7B model requires 8–16GB RAM; the OS wastes 3–4GB of that on its own
- No OS-level NPU scheduling — the NPU sits idle while the CPU struggles

### **What Orion OS Gives Them**

- Quasar Runtime — shared OS-level inference engine, one copy of model weights for all apps
- Cosmos kernel schedules GPU/NPU as first-class compute peers
- Unified memory model — CPU and GPU share the same pool on unified-memory hardware
- Hardware-accelerated quantisation via orion-mld

### **Strategic Note**

_The fastest-growing developer segment. Every dev is now an AI developer. Orion OS is the first OS designed for them._

## **🔒 The Privacy-Conscious User**

**Tagline**

"The only OS where your hardware cannot identify you."

### **Pain Points Today**

- Every OS leaks hardware identifiers — MAC address, CPU serial, disk ID — to every app
- Windows telemetry cannot be fully disabled
- macOS CSAM scanning proved Apple will compromise on-device privacy under pressure
- Every browser extension, every app can fingerprint your hardware

### **What Orion OS Gives Them**

- Hardware ID randomisation — MAC/CPU/GPU IDs are different every session by default
- Capability model — no app can read hardware IDs without explicit HardwareIDCapability
- Void Crypto Library — post-quantum by default, no RSA/ECC
- Zero telemetry — the OS cannot phone home without a NetworkCapability grant

### **Strategic Note**

_Signal-compatible users, Tor users, journalists, activists, enterprise security teams. A real market that currently uses Tails or QubesOS._

## **🎮 The Gamer**

**Tagline**

"Faster frames, no crashes, anti-cheat that actually works."

### **Pain Points Today**

- Windows driver crashes cause game crashes — kernel-mode graphics drivers are unstable
- CrowdStrike-style security software crashes games (kernel-mode antivirus)
- Linux gaming has a compatibility layer tax — Proton adds latency
- Anti-cheat refuses to run on Linux because it cannot verify kernel integrity

### **What Orion OS Gives Them**

- Userspace GPU drivers — a driver crash restarts the driver, not the game
- Real-time scheduling class for games — zero competition from background processes
- Kernel attestation — anti-cheat can cryptographically verify the Cosmos kernel is unmodified
- DirectStorage-equivalent — NVMe to GPU DMA with no CPU involvement

### **Strategic Note**

_100M+ PC gamers who want Windows-level compatibility and Linux-level stability. The gaming angle drives community and press coverage._

## **🖧 The Server / DevOps Engineer**

**Tagline**

"A secure, lightweight OS for your next cloud deployment."

### **Pain Points Today**

- Container isolation on Linux is still syscall-based — not capability-based
- A compromised container can escape via kernel vulnerabilities
- Alpine Linux is minimal but still carries 30 years of Unix security debt
- OCI compatibility is table stakes — everything else needs to be better

### **What Orion OS Gives Them**

- Capability-isolated containers — each container gets exactly the capabilities it declares, no more
- Orion unikernel mode — single-application OS image under 10MB
- OCI-compatible via orion-runc — existing Docker workflows work unchanged
- Deterministic builds — every binary is bit-for-bit reproducible

### **Strategic Note**

_Cloud-native developers, homelab operators, edge compute deployments. Orion OS server as a competitive Bottlerocket/Flatcar alternative._

# **§2 — Quick Start Guide**

**Goal of This Section**

By the end of this section you have: a working dev environment, QEMU running, and a first bootloader printing 'ORION OS' on screen. This is Milestone 0 — every other milestone builds from it.

## **2.1 — System Requirements**

**Platform**

**Minimum**

**Recommended**

**Notes**

macOS

macOS 12+, 8GB RAM, 20GB disk

macOS 14+, 16GB RAM, 50GB SSD

Use Homebrew for all tools

Linux (Ubuntu/Debian)

Ubuntu 22.04+, 8GB RAM

Ubuntu 24.04, 16GB RAM, 50GB SSD

apt-based install commands below

Windows

WSL2 + Ubuntu 22.04

WSL2 + Ubuntu 24.04, 16GB RAM

All commands run inside WSL2

Hardware

Any x86-64 CPU

CPU with hardware virtualisation (VT-x/AMD-V)

Check BIOS — enable VT-x/AMD-V

## **2.2 — Environment Setup (One Session)**

**Run these commands in order. Do not skip any step.**

### **Step 1 — Install Rust (the kernel language)**

curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

source ~/.cargo/env

rustup update stable

### **Step 2 — Add bare-metal build targets**

rustup target add x86_64-unknown-none

rustup target add aarch64-unknown-none

rustup target add riscv64gc-unknown-none-elf

### **Step 3 — Add essential Rust components**

rustup component add rust-src llvm-tools-preview rustfmt clippy miri

cargo install just cargo-nextest cargo-llvm-cov cargo-audit cargo-deny

cargo install kani-verifier --locked

### **Step 4 — Install QEMU (emulator)**

\# macOS: brew install qemu

\# Ubuntu: sudo apt install qemu-system-x86 qemu-system-aarch64 qemu-utils

### **Step 5 — Install assembler and cross-compiler**

\# macOS: brew install nasm x86_64-elf-gcc aarch64-elf-gcc

\# Ubuntu: sudo apt install nasm gcc-x86-64-linux-gnu gcc-aarch64-linux-gnu

### **Step 6 — Install debugger and analysis tools**

\# macOS: brew install gdb llvm binutils

\# Ubuntu: sudo apt install gdb llvm binutils

### **Step 7 — Install VSCode and extensions**

\# Install VSCode: https://code.visualstudio.com

code --install-extension rust-lang.rust-analyzer

code --install-extension vadimcn.vscode-lldb

code --install-extension tamasfe.even-better-toml

### **Step 8 — Verify everything works**

rustc --version # should print rustc 1.7x.x

qemu-system-x86_64 --version # should print QEMU emulator version 8.x

nasm --version # should print NASM version 2.1x

gdb --version # should print GNU gdb x.x

## **2.3 — Dev Container (Alternative — Recommended for Teams)**

If you want a pre-configured environment without manual setup, use the .devcontainer. This gives every contributor an identical environment.

\# 1. Install Docker Desktop and VSCode Dev Containers extension

\# 2. Clone the Orion OS repo

git clone https://github.com/orionos/orionos.git

cd orionos

\# 3. Open in VSCode — it will offer to reopen in container

code .

\# 4. Inside container — all tools pre-installed, targets pre-configured

just build # builds the kernel

just qemu # runs in QEMU

just test # runs all tests

## **2.4 — Milestone 0: Boot 'ORION OS' in QEMU**

**This is your first milestone**

A BIOS bootloader written in NASM that prints 'ORION OS' on a black screen in QEMU. It sounds trivial. It is not. When this works, you have written real code that a real CPU runs in real mode. Everything else in this project builds from this exact moment.

### **Create boot.asm (NASM source)**

\[BITS 16\]

\[ORG 0x7C00\]

start:

mov si, msg

.loop:

lodsb

or al, al

jz .done

mov ah, 0x0E

int 0x10

jmp .loop

.done:

hlt

msg db 'ORION OS', 0

times 510-($-$$) db 0

dw 0xAA55

### **Build and run**

nasm -f bin boot.asm -o boot.bin

qemu-system-x86_64 -drive format=raw,file=boot.bin

\# You should see: ORION OS

## **2.5 — What to Build Next (Phase B1 Checklist)**

_After Milestone 0, follow this order. Each step is in Vol 3 §1 with full specification._

**Order**

**Component**

**Description**

**Vol Reference**

**Estimated Time**

B1.1

UEFI Bootloader

Rust-based UEFI bootloader — replaces NASM version for modern hardware

Vol 3 §1.1

1-2 weeks

B1.2

Kernel Entry

Assembly trampoline → long mode → Rust kernel_main()

Vol 3 §1.1

3-5 days

B1.3

GDT + IDT

Descriptor tables and interrupt handlers in Rust

Vol 3 §1.1

1 week

B1.4

Early Console

VGA text output from kernel — 'Hello from Cosmos'

Vol 3 §1.1

2-3 days

B1.5

Physical Memory Manager

Buddy allocator for physical pages from UEFI memory map

Vol 3 §1.2

1-2 weeks

B1.6

Virtual Memory Manager

Page table creation, demand paging, kernel heap

Vol 3 §1.2

2-3 weeks

B1.7

Capability System

Kernel capability table — the security foundation

Vol 2 DDR-002

2-3 weeks

B1.8

IPC Primitives

Synchronous message passing — the kernel's only communication method

Vol 2 DDR-006

2 weeks

# **§3 — Contributing Guide**

Orion OS is an open-source project. Everyone is welcome to contribute — from fixing a typo in docs to implementing a kernel subsystem. This section explains how.

## **3.1 — Code of Conduct**

**Orion OS adopts the Contributor Covenant v2.1**

We are committed to making participation in Orion OS a harassment-free experience for everyone, regardless of level of experience, gender, gender identity, sexual orientation, disability, personal appearance, body size, race, ethnicity, age, religion, or nationality. Report violations to: conduct@orionos.dev

The short version:

- Be welcoming to newcomers — everyone was a beginner once
- Criticise ideas, never people — 'this approach has a problem' not 'you're wrong'
- Assume good faith — most mistakes are honest mistakes
- Kernel code review can be blunt — that is normal and does not violate the CoC

## **3.2 — RFC Process (Request for Comments)**

**Any change to a locked DDR, or any new major feature, requires an RFC before implementation begins.**

**RFC Stage**

**Description**

**Duration**

**Who Decides**

1\. Draft

Author opens a GitHub Discussion with RFC template. Labels: RFC, needs-discussion

N/A

Author

2\. Review Period

Community comments on the RFC. Author responds to questions and objections.

Minimum 2 weeks

Community

3\. Final Comment Period

FCP announced. Last chance for objections. Disposition: merge / postpone / close.

1 week

Core team

4\. Accepted

RFC merged to docs/rfcs/. Implementation tracking issue created.

N/A

Core team

5\. Implemented

PR linked to RFC. RFC marked as implemented. DDR updated if applicable.

N/A

Author + core team

### **RFC Template**

\# RFC-XXXX: \[Title\]

\*\*Status:\*\* Draft | Under Review | Accepted | Implemented | Withdrawn

\*\*Affects:\*\* Vol X §Y, DDR-ZZZ

\## Summary

One paragraph explaining the change.

\## Problem

What problem does this solve? Why is the current design insufficient?

\## Proposed Solution

Detailed description of the change.

\## Alternatives Considered

What else was considered and why was it rejected?

\## Trade-offs

What does this give up? What does it gain?

\## Unresolved Questions

What still needs to be decided?

## **3.3 — How to Submit a Pull Request**

**Step**

**Action**

**Details**

1

Fork & branch

Fork orionos/orionos. Create a branch: git checkout -b feature/my-change

2

Make your change

Keep changes focused — one logical change per PR. Smaller = faster review.

3

Write tests

Every kernel function needs a unit test. No test = PR blocked.

4

Run CI locally

just fmt && just lint && just test && just qemu-test — all must pass.

5

Conventional commit

Format: type(scope): message. Types: feat, fix, docs, test, refactor, perf, chore

6

Open PR

Use the PR template. Link to any RFC or issue. Fill in every section.

7

Code review

At least 1 core team review required. DDR changes require 2.

8

CI must pass

All 9 CI pipeline stages must be green. No exceptions for kernel code.

9

Merge

Squash merge for features. Merge commit for DDR changes (preserves history).

## **3.4 — Commit Message Format**

_Orion OS uses Conventional Commits. This enables automatic changelog generation with git-cliff._

**Type**

**When to Use**

feat

New feature or capability

fix

Bug fix

docs

Documentation only change

test

Adding or fixing tests

refactor

Code change that neither fixes a bug nor adds a feature

perf

Performance improvement

chore

Build system, dependency updates, CI config

ddr

Design decision record change — always needs RFC

Examples:

feat(scheduler): add P/E core topology awareness to workload classifier

fix(cosmos/mm): prevent double-free in buddy allocator free list

docs(vol2): complete DDR-HAL for x86 timer interface

test(vega-fs): add fuzz test for B+ tree metadata lookup

ddr(DDR-018): lock kernel ML integration design

## **3.5 — Where to Start: Good First Issues**

**Area**

**Good First Issue**

**Skills Needed**

**Difficulty**

Documentation

Write a TL;DR for Vol 2 §3 (VMM Design)

English, understanding of memory management

Easy

Documentation

Add Mermaid.js diagram for IPC message flow

Mermaid.js syntax

Easy

Testing

Write unit tests for Vol 3 §1.1 GDT setup code

Rust, x86 architecture basics

Medium

Tooling

Write a justfile recipe for ARM64 QEMU boot

Shell scripting, QEMU flags

Easy

Kernel

Implement physical memory page bitmap tracker

Rust, bare-metal, no_std

Medium

Kernel

Port Cosmos scheduler to run under QEMU

Rust, x86 interrupts, multitasking

Hard

Drivers

Write virtio-blk driver in userspace Rust

Rust, virtio protocol, MMIO

Hard

Research

Benchmark MicroTVM vs tract-onnx on x86

Rust, ML frameworks, benchmarking

Medium

# **§4 — Public Roadmap**

**Living Document**

This roadmap is updated at the start of every phase. Progress is tracked in Vol 7 (Problems & Solutions status dashboard). Phase start dates are targets — they depend on Phase N-1 being complete.

## **4.1 — Release Schedule**

**Release**

**Name**

**Target**

**What It Means**

**Key Deliverable**

v0.1

Cosmos Spark

Late 2025

First bootable kernel in QEMU — no drivers, no FS, no shell

'ORION OS' in QEMU via Cosmos kernel

v0.2

Cosmos Core

Mid 2026

Capability system + IPC + basic memory management

First capability-gated system call working

v0.3

Vega Seed

Late 2026

Vega FS mounts and reads files — NVMe driver in userspace

Self-hosting filesystem read

v0.4

Orion Shell

Mid 2027

Pulsar Shell runs — Comit installs first package

First interactive session on Orion OS

v0.5 Alpha

Orion Alpha

Late 2027

Boots on real x86-64 hardware — network, audio, display

First real hardware boot

v0.8 Beta

Orion Beta

2029

Gaming subsystem, Quasar Runtime, full Comit ecosystem

Community usable daily driver

v1.0

Orion One

2031

Stable ABI, Cosmos Compiler bootstrap, 1000+ packages

First production release

## **4.2 — Phase-by-Phase Breakdown**

## **Phase B: Bootstrap (Now → v0.3)**

_Build the tools to build the OS. No user-facing features. All work is kernel infrastructure._

**ID**

**Component**

**Description**

**Volume**

**Status**

B1

Bootloader + Kernel Entry

UEFI + BIOS bootloader. Long mode. Early console. CPU detection.

Vol 3 §1.1

🔴 Not started

B2

Memory Management

PMM (buddy allocator) + VMM (page tables) + kernel heap (slab)

Vol 3 §1.2

🔴 Not started

B3

Capability System

64-bit token, kernel table, rights bitmap, revocation

Vol 2 DDR-002

🔴 Not started

B4

IPC Primitives

Message passing, shared memory, zero-copy fast path

Vol 2 DDR-006

🔴 Not started

B5

Scheduler

5 scheduling classes, tickless, SMP

Vol 2 DDR-005

🔴 Not started

B6

Process Model

spawn() only, PCB/TCB, context switch

Vol 2 DDR-004

🔴 Not started

B7

First Driver

virtio-blk in userspace — reads a block device in QEMU

Vol 3 §2

🔴 Not started

B8

Vega FS Read-Only

Mount Vega FS, read files — no write yet

Vol 3 §5

🔴 Not started

## **Phase 1: Foundation (v0.3 → v0.5)**

_First real hardware boot. Basic device support. Pulsar Shell. Comit package manager._

**ID**

**Component**

**Description**

**Volume**

**Status**

1.1

NVMe Driver

Userspace NVMe driver — reads/writes real storage

Vol 3 §2

🟠 After B8

1.2

Network Stack (Ether-d)

TCP/IP, DNS, DHCP — basic network connectivity

Vol 2 §14

🟠 After B7

1.3

Vega FS Write

Full CoW write path, snapshots, BLAKE3 checksums

Vol 3 §5

🟠 After B8

1.4

Pulsar Shell

Command shell, pipelines, job control, history

Vol 3 §7

🟠 After B6

1.5

Comit Package Manager

Install/remove/update packages. Dilithium verification.

Vol 3 §11

🟠 After 1.4

1.6

VGA/KMS Display

Basic framebuffer → DRM/KMS display output

Vol 3 §2

🟠 After B5

1.7

USB HID

Keyboard + mouse input drivers

Vol 3 §2

🟠 After B7

1.8

Real Hardware Boot

Boot on physical x86-64 machine

All Phase B + 1.x

🟠 Phase 1 end

## **Phase 2: Desktop (v0.5 → v0.8)**

_User-facing desktop experience. Gaming. AI runtime. Community adoption begins._

**ID**

**Component**

**Description**

**Volume**

**Status**

2.1

Aurora Compositor

Wayland compositor, tiling WM, multi-monitor

Vol 2 §17

🔵 After 1.6

2.2

GPU Drivers

Intel xe, AMD amdgpu, NVIDIA open — basic 3D

Vol 3 §2

🔵 After 1.6

2.3

Quasar Runtime

OS-level AI inference — shared model weights

Vol 2 DDR-017

🔵 After 2.2

2.4

Gaming Subsystem

Real-time scheduling, Vulkan, kernel attestation

Vol 3 §12

🔵 After 2.2

2.5

orion-mld

ML daemon — workload classification, anomaly detection

Vol 9 §1

🔵 After 2.3

2.6

POSIX Compat Layer

Run Linux binaries on Orion OS

Vol 3 §13

🔵 After 1.4

2.7

Orion Settings App

System settings GUI

Vol 3 §12

🔵 After 2.1

2.8

Nebula Extension Hub

Community extensions marketplace

Vol 1 §22

🔵 After 1.5

## **Phase 3: Maturity (v0.8 → v1.0)**

_Production quality. Cosmos Compiler bootstrap. ARM64 + RISC-V ports. Enterprise features._

**ID**

**Component**

**Description**

**Volume**

**Status**

3.1

ARM64 Port

Full Orion OS on ARM64 hardware (Apple M-series dev boards, RPi)

Vol 2 DDR-HAL

🔵 Phase 3

3.2

RISC-V Port

Orion OS on RISC-V (SiFive, Milk-V)

Vol 2 DDR-HAL

🔵 Phase 3

3.3

Cosmos Assembler

Self-hosted assembler — replaces NASM

Vol 1 §13

🔵 Phase 3

3.4

Cosmos Linker

Self-hosted linker — replaces LLD

Vol 1 §13

🔵 Phase 3

3.5

Cosmos Compiler

Self-hosted compiler — replaces LLVM. The north star.

Vol 1 §13

🔵 Phase 3

3.6

Formal Verification

Kani verification of kernel core (&lt;15K lines)

Vol 2 DDR-013

🔵 Phase 3

3.7

Enterprise Features

MDM, LDAP, audit logging, SELinux compat

Vol 3 §New

🔵 Phase 3

3.8

v1.0 Release

Stable ABI, 1000+ packages, community governance in place

All

🔵 2031 target

# **§5 — Glossary of Terms**

_Every technical term used across all Orion OS volumes, defined in plain language._

**Term**

**Definition**

**First Used In**

Capability

An unforgeable token that grants specific rights to a resource. Stored only in kernel-managed tables. Processes hold integer handles, never the token itself.

Vol 2 DDR-002

Capability Model

The security architecture where every resource access requires a capability. No ambient authority — if you don't have a capability for it, you can't touch it.

Vol 2 DDR-002

Comit

The Orion OS package manager. Named as a portmanteau of 'comet' and 'commit'. Handles install, remove, update, and rollback with Dilithium-signed packages.

Vol 3 §11

Cosmos

The Orion OS kernel. A hybrid microkernel: scheduler, memory manager, IPC, and capability system only — all drivers in userspace.

Vol 2

Cosmos Compiler

The eventual self-hosted compiler for Orion OS. Phase 3 goal — replaces LLVM. Named because it builds the Cosmos kernel itself.

Vol 1 §13

Cosmos IR

The Intermediate Representation for the Cosmos Compiler. SSA form with capability intrinsics. Multi-arch backends: x86-64, ARM64, RISC-V.

Vol 2 DDR-IR

DDR

Design Decision Record. A structured document that states a design question, the decision Orion OS makes, the rationale, and the trade-off. Once locked, requires a formal RFC to change.

Vol 2

DMA

Direct Memory Access. Hardware that transfers data without CPU involvement. All DMA in Orion OS is IOMMU-enforced — hardware can only access memory it has been explicitly granted.

Vol 2 DDR-007

Ether-d

The Orion OS network daemon. Runs in userspace. Implements TCP/IP, QUIC, WireGuard, and DNS-over-TLS. Zero-copy network I/O via MemoryCapability.

Vol 3 §6

Fuchsia

Google's microkernel OS. The closest architectural sibling to Orion OS. Both use capability handles, userspace drivers, and typed IPC. Orion OS learns from and improves on Fuchsia.

Vol 8

Horizon Boot

The Orion OS bootloader. UEFI + BIOS. Implements measured boot, TPM PCR sealing, and Dilithium-signed boot stages.

Vol 2 DDR-011

IOMMU

Input-Output Memory Management Unit. Hardware that restricts which physical memory addresses a DMA device can access. Mandatory in Orion OS — all hardware DMA is IOMMU-enforced.

Vol 2 DDR-007

IPC

Inter-Process Communication. In Orion OS: zero-copy page remapping for large messages, synchronous fast-path for small messages. All IPC requires a capability token.

Vol 2 DDR-006

Kani

A Rust model checker. Used by Orion OS for formal verification of the kernel core — capability system, memory manager, IPC, scheduler.

Vol 2 DDR-013

Nebula

The name for the entire Orion OS ecosystem — the package registry, extension hub, developer community, and all software that runs on Orion OS.

Vol 1

Orion OS

The operating system. Built on the Cosmos kernel. Targets everyday users, gamers, AI/ML engineers, old hardware owners, and server operators.

Vol 1

orion-init (Helios)

The Orion OS service manager. Reads .orion-service TOML files, builds a dependency DAG, starts services in parallel with socket activation.

Vol 2 §9

orion-mld

The Orion OS ML daemon. Tier 2 ML: runs ONNX models in userspace. Feeds hints to the kernel scheduler and security subsystem.

Vol 9 §1

Aurora

The Orion OS Wayland compositor. Replaces aurora. Handles display management, tiling, multi-monitor, HDR, and VRR.

Vol 3 §12

PIM

Processing-in-Memory. Computing that happens inside the RAM chip itself, reducing memory bandwidth bottlenecks. Relevant for AI workloads.

Vol 5

PMM

Physical Memory Manager. Tracks which physical RAM pages are free. Orion OS uses a buddy allocator for page-granularity allocation.

Vol 3 §1.2

Pulsar Shell

The Orion OS system shell. Named for pulsars — regular, precise signals. Features: pipelines, redirections, job control, tab completion, scripting.

Vol 3 §7

Quasar Runtime

The Orion OS AI inference engine. Named for quasars — the most energetic objects in the universe. Provides shared model weights, NPU scheduling, and quantisation.

Vol 3 §11

RISC-V

An open-source CPU instruction set architecture. Orion OS third target (after x86-64 and ARM64). Important for embedded and custom silicon.

Vol 2 DDR-HAL

seL4

A formally verified microkernel. Orion OS's capability model is directly inspired by seL4. seL4 proves that a small, verified kernel is deployable in production.

Vol 8

SSA

Static Single Assignment. A property of IRs where each variable is assigned exactly once. Simplifies compiler optimisations. Cosmos IR uses SSA form.

Vol 2 DDR-IR

TPM

Trusted Platform Module. Hardware security chip. Used by Orion OS for measured boot (PCR sealing) and rollback protection (monotonic counter in NVRAM).

Vol 2 DDR-011

Vega FS

The Orion OS filesystem. Copy-on-Write B+ tree structure. BLAKE3 checksums per block. O(1) snapshots. Named for Vega — one of the brightest reference stars.

Vol 2 §8

VMM

Virtual Memory Manager. Maps virtual addresses to physical pages. Handles demand paging, copy-on-write, ASLR, and huge pages.

Vol 3 §1.2

Void Crypto Library

The Orion OS cryptography library. Named for the void between stars — cryptographically dark. Algorithms: ChaCha20-Poly1305, AES-GCM, Kyber, Dilithium, BLAKE3, Argon2id.

Vol 3 §10

WASM

WebAssembly. Orion OS uses WASM as its universal binary format for sandboxed app execution. The eventual target for Cosmos Compiler.

Vol 1 §15

WireGuard

A modern VPN protocol. Built into Ether-d. Orion OS default VPN for secure networking.

Vol 3 §6

Zero-Trust

Security model: nothing is trusted by default. Every resource access requires a capability. Network is default-deny. Orion OS implements zero-trust at the kernel level.

Vol 2 DDR-012

Zircon

Google Fuchsia's kernel. The closest production sibling to Cosmos. Uses handles (capabilities), userspace drivers, and FIDL IPC. Study Zircon source when implementing Cosmos.

Vol 8
