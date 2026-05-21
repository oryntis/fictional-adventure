---
title: "Orion 00 Master Index V9"
sidebar_position: 1
---

**PROJECT ORION OS**

**Master Index — v9**

_All 32 DDRs locked • 16 canonical documents • orion-tasks Task Manager • Complete gap tracker_

Revision 9.0 • May 2025 • Canonical current index — supersedes all previous versions

# **Canonical Document System — Files to Use**

**Use Only These 16 Files**

Download these files. Delete all older versions: any nova\_\* files, orion\_\*\_v3 through v8 index files, orion\_vol2b\_critical\_ddrs.docx, orion\_vol2\_technical\_architecture.docx (original). The supplements (vol1\_supplement, vol3\_supplement) should be merged into their main volumes when convenient.

**File**

**Vol**

**Title**

**When to Open**

orion\_00\_master\_index\_v9.docx

Index

Master Index (this file)

Always first

orion\_vol0\_quickstart\_contributing\_roadmap.docx

Vol 0

Quick Start, Contributing & Roadmap

New contributor / environment setup

orion\_vol1\_vision\_strategy.docx

Vol 1

Vision, Strategy & Innovation

Strategic planning, market, principles

orion\_vol1\_supplement.docx

Vol 1S

Governance, Philosophy, Embedded Config

RFC process, CLA, CoC, Orion Micro — merge into Vol 1

orion\_vol2\_unified.docx

Vol 2

Technical Architecture — ALL 32 DDRs

Before writing any kernel or subsystem code

orion\_vol3\_build\_requirements.docx

Vol 3

Complete Build Requirements

During active development

orion\_vol3\_supplement.docx

Vol 3S

Testing, User Tools, HW Matrix, A11y, i18n

Testing strategy, driver priorities — merge into Vol 3

orion\_vol4\_learning\_resources.docx

Vol 4

Learning Resources & Roadmap

Phase-ordered study plan

orion\_vol5\_philosophy\_problems.docx

Vol 5

Philosophy & Problem Analysis

Designing solutions, 'why not X?' questions

orion\_vol6\_developer\_tools.docx

Vol 6

Developer Tools & Workflow

Build / debug / test workflow setup

orion\_vol7\_problems\_solutions.docx

Vol 7

Problems, Current State & Solutions

Living implementation status dashboard

orion\_vol8\_os\_landscape\_analysis.docx

Vol 8

OS Landscape Analysis

Competitive research, lessons from other OSes

orion\_vol9\_research\_innovation\_hub.docx

Vol 9

Research & Innovation Hub

ML strategy, research papers, future directions

orion\_master\_flaw\_register.docx

Flaws

Master Flaw, Gap & Edge Case Register

Security audit, P0–P3 gap list, 55 action items

orion\_project\_tools\_spec.docx

Tools

orion-tasks Task Manager Specification

Task Manager usage, 55-task reference list

orion\_analysis\_feedback\_report.docx

Report

Master Analysis & Feedback

Quality scores, original gap analysis

# **Project Tool: orion-tasks (Task Manager)**

**orion-tasks — The Only Project Tool**

orion-tasks is an interactive task tracking system that runs inside Claude as an artifact. It comes pre-loaded with all 55 tasks from the flaw register, organised by priority (P0–P3) and phase. Tasks persist across sessions. No installation required. To open: ask Claude 'Show me the Orion OS Task Manager'. Features: filter by priority and phase, check off completed tasks, add custom tasks, Export for sprint planning.

**Action**

**How to Do It**

Open the Task Manager

Ask Claude: 'Show me the Orion OS Task Manager'

Filter to critical tasks

Use the Priority dropdown — select P0

Filter by phase

Use the Phase dropdown — Phase B, Phase 1–3, Docs, Security, Community

Check off a completed task

Click the checkbox — persists across sessions

Add a new task

Fill in the text input, choose priority + phase, press Add task

Plan your week

Click Export — sends task list to Claude for sprint planning

# **All 32 DDRs — Locked Status**

_Every DDR is locked. Changing any requires an RFC (Vol 0 §3.2)._

**DDR**

**One-Line Decision**

**Status**

DDR-001

Hybrid microkernel. Cosmos = scheduler+MM+IPC+caps. All drivers userspace.

✅ LOCKED

DDR-002

Kernel-managed cap tables. Integer handles. Atomic checks at use time. CAP\_LOCK. Reference counting. CLOCK\_MONOTONIC for all security checks.

✅ LOCKED

DDR-003

4-level PML4 default. 5-level opt-in for &gt;128TB address space.

✅ LOCKED

DDR-004

No fork(). spawn() only. Explicit capability set for child process.

✅ LOCKED

DDR-005

5 scheduling classes + heterogeneous dispatch (CPU/GPU/NPU/TPU). Tickless. P/E core topology aware.

✅ LOCKED

DDR-006

Zero-copy page remap for large IPC. Synchronous fast-path &lt;500ns for small messages.

✅ LOCKED

DDR-007

All drivers userspace. IOMMU-enforced DMA. orion-devmgr lifecycle.

✅ LOCKED

DDR-008

Why hybrid: exokernel=no isolation, unikernel=no multi-process. Both incompatible with security model.

✅ LOCKED

DDR-009

Vega FS B+ tree 4KB nodes. BLAKE3 checksum per block. CoW write path.

✅ LOCKED

DDR-010

Rust + Kani. Max 3 unsafe&#123;&#125;. IOMMU mandatory. ARM MTE mandatory (ARM64). Intel CET mandatory (x86-64). Cap table in MPK domain.

✅ LOCKED

DDR-011

Measured boot + TPM PCR + Dilithium3 signatures + rollback counter. FDE: ChaCha20-Poly1305, key=TPM+Argon2id.

✅ LOCKED

DDR-012

5 adversaries. 7-layer security. Post-quantum everywhere. Spectre: array\_index\_nospec(). Constant-time cap lookups.

✅ LOCKED

DDR-013

Kani verification: cap system + PMM + IPC + scheduler. &lt;15K lines scope.

✅ LOCKED

DDR-014

13 syscalls + syscall 14 (cap\_revoke) + vDSO. Capability handles only — no integer resource IDs.

✅ LOCKED

DDR-015

ComputePeer model. GPUCapability/NPUCapability/TPUCapability. ComputeScheduler. 16ms GPU timeslice. Unified memory flag.

✅ LOCKED

DDR-016

All hardware IDs virtualised by default. HardwareIDCapability:TYPE for real IDs. orion-devmgr intercepts all.

✅ LOCKED

DDR-017

Quasar Runtime: privileged daemon, shared model weights, NPUCapability, 4-priority inference queue.

✅ LOCKED

DDR-018

Tier 1 kernel ML: tract-onnx no\_std, static embed, mandatory non-ML fallback, &lt;100µs, ≤512KB total budget.

✅ LOCKED

DDR-019

orion-mld Tier 2: MLHintCapability only (hints not commands), ONNX Runtime, telemetry feed, hot-swap models.

✅ LOCKED

DDR-020

256-cap default per process. 1M system-wide hard limit. 65536 per-user. Rate limits. Delegation chain depth max 8.

✅ LOCKED

DDR-021

Confused Deputy fix: intent-based capabilities (FileCapability:/path:INTENT). Services attenuate before responding.

✅ LOCKED

DDR-022

Hardware memory safety: ARM MTE (ARM64), Intel CET (x86-64), cap table in MPK domain, array\_index\_nospec().

✅ LOCKED

DDR-023

Secure build: HSM-backed signing, 2-of-3 maintainer multi-sig, cargo vet in CI, commit-SHA dep pinning.

✅ LOCKED

DDR-024

cap\_revoke(pid, handle) syscall. ECAPREVOKED error. Reference counting — revocation after all holders drop.

✅ LOCKED

DDR-HAL

CosmosHal Rust trait. Cargo feature arch selection (hal-x86, hal-arm64, hal-riscv). Zero runtime cost.

✅ LOCKED

DDR-IR

SSA + cap&lt;R&gt; type + intrinsics. Bootstrap B1→B7: rustc+LLVM → Cosmos Assembler → Linker → Compiler → delete LLVM.

✅ LOCKED

DDR-INIT

TOML .orion-service format. Kahn's DAG. Socket activation. 6 boot stages.

✅ LOCKED

DDR-VFS

vega-vfsd userspace daemon. Per-process namespaces. 8-mount structure. FUSE-equivalent IPC interface.

✅ LOCKED

DDR-PF

Default deny-all. NetworkCapability classes. DNS-over-TLS default. WireGuard bypass.

✅ LOCKED

DDR-COMPOSITOR

Aurora Wayland. 9 protocols. GPU pipeline &lt;8ms at 60Hz. Direct Scanout gaming mode. VRR. HDR.

✅ LOCKED

DDR-AUDIO

PipeWire-compatible graph. 4 buffer modes (1.3ms–85ms latency). AudioCapability model.

✅ LOCKED

DDR-COMIT

.cpkg = WASM + manifest.toml + Dilithium3 signature. PubGrub resolution. 9-step atomic install with Vega FS snapshot.

✅ LOCKED

# **Quick Reference Cards**

**🚀 New Contributor — 5 Steps**

1\. Read Vol 0 §2: install Rust, QEMU, NASM, GDB. 2. Build Milestone 0: bootloader prints 'ORION OS' in QEMU. 3. Read Vol 0 §3: Contributing Guide and Code of Conduct. 4. Sign CLA: add Signed-off-by to all commits (git commit -s). 5. Before coding any subsystem: find its DDR in Vol 2 Unified and read it first.

**📐 Rule Before Any Code**

Open orion\_vol2\_unified.docx. Find the DDR for your subsystem. All 32 DDRs are in one file, all locked. If a DDR needs changing: open an RFC using the template in Vol 1S §22.2. Do not write code that deviates from a locked DDR without an accepted RFC.

**🗂️ orion-tasks — Task Manager**

Ask Claude: 'Show me the Orion OS Task Manager'. 55 pre-loaded tasks grouped P0→P3. Filter by priority and phase. Check off completed tasks — they persist across sessions. Start with P0 tasks (11 critical items before any kernel code). Click Export for weekly sprint planning.

**🌌 Space Naming System**

Cosmos (kernel) • Vega FS (filesystem) • Orion OS (the OS) • Nebula (ecosystem) • Comit (package manager) • Aurora (compositor) • Quasar Runtime (AI inference) • Pulsar Shell (shell) • Horizon Boot (bootloader) • Void Crypto Library (cryptography) • Ether-d (network daemon) • Cosmos Compiler (self-hosting — Phase B7 north star)

**⭐ The North Star — Phase B7**

Cosmos Compiler compiles Cosmos kernel. LLVM is deleted from the build system. Every CPU instruction executed when running Orion OS was written by us — not borrowed from any external toolchain. No other OS in widespread use can say this. Every phase exists to make this one moment possible.