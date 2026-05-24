# About Orion OS

&gt; **A capability-based, microkernel operating system written in Rust — built for security, correctness, and modern hardware.**

_"An operating system is not built — it evolves through stages of consciousness."_
_From bare metal to cosmic harmony — a philosophical journey in 7 phases._

---

## What is Orion OS?

Orion OS is a from-scratch operating system that treats **security as a first-class design constraint**, not an afterthought. Every resource — files, network sockets, GPU time, IPC channels — is accessed through an unforgeable **capability token** validated by the Cosmos microkernel. No ambient authority. No confused deputy attacks. No privilege escalation via path traversal.

| Property            | Decision                                                   |
| ------------------- | ---------------------------------------------------------- |
| **Kernel**          | Cosmos — hybrid microkernel in Rust, ≤5K lines for Phase 1 |
| **Security model**  | Capability-based (DDR-002) — zero ambient authority        |
| **Drivers**         | 100% userspace — no driver code in kernel                  |
| **Filesystem**      | Vega FS — CoW, atomic writes, BLAKE3 checksums             |
| **Crypto**          | Post-quantum (CRYSTALS-Kyber + CRYSTALS-Dilithium)         |
| **Display**         | Aurora — Wayland-compatible compositor                     |
| **Package manager** | Comit + Nebula Hub — capability-scoped installs            |
| **Targets**         | x86-64 (Phase 1) → ARM64, RISC-V, PowerPC, LoongArch       |

**Orion OS** is a next-generation, **capability-based operating system** designed to be **lightweight, secure, fast, and universally compatible**—reviving old hardware, empowering AI/ML workloads, and prioritizing user privacy and control.

Built from scratch in **Rust**, Orion OS reimagines the OS architecture with:

- A **hybrid microkernel** (Cosmos) with **userspace drivers** for stability.
- A **capability-based security model** (no root, no ambient authority).
- **Self-hosting** as the ultimate goal: Every line of code, from the compiler to the kernel, is owned by the project (Phase B7).
- **Post-quantum cryptography** (CRYSTALS-Kyber, Dilithium) by default.
- **AI-native** scheduling and memory management for modern workloads.

---

## **🎯 Core Mission**

Orion OS aims to fill a **gap no other OS addresses simultaneously**:

1. **Lightweight**: Runs on **&lt;150MB RAM**, reviving 2012–2018 hardware (600M+ devices at risk of obsolescence).
2. **Secure**: **Capability model** + **formally verified kernel core** (DDR-013) + **memory-safe Rust**.
3. **Fast**: **Heterogeneous scheduler** (CPU/GPU/NPU/TPU) + **tickless kernel** + **zero-copy IPC**.
4. **Universal**: Supports **x86-64, ARM64, RISC-V** from day one.
5. **Eco-Friendly**: Reduces e-waste by extending hardware lifespans.

---

## 🌌 The Orion OS Ecosystem

| Component          | Purpose                                                                               | Status                |
| ------------------ | ------------------------------------------------------------------------------------- | --------------------- |
| **Cosmos**         | Hybrid microkernel (scheduler, memory, IPC, capabilities).                            | ✅ Phase 0–1 (Design) |
| **Vega FS**        | Copy-on-Write filesystem with **BLAKE3 checksums** and **O(1) snapshots**.            | ✅ Design (DDR-009)   |
| **Aurora**         | Wayland compositor with **gaming mode**, **HDR**, and **VRR**.                        | ⚠️ Phase 2            |
| **Quasar Runtime** | OS-level **AI inference engine** (shared model weights, NPU/GPU scheduling).          | ⚠️ Phase 2–3          |
| **Comit**          | Package manager with **WASM apps**, **Dilithium signatures**, and **atomic updates**. | ⚠️ Phase 1            |
| **Pulsar Shell**   | System shell with **pipelines**, **job control**, and **tab completion**.             | ⚠️ Phase 1            |
| **Nebula Hub**     | Community ecosystem for **extensions**, **packages**, and **config profiles**.        | ⬜ Future             |

---

## Current Phase: Phase B (Pre-kernel)

| Phase       | Status     | Description                                           |
| ----------- | ---------- | ----------------------------------------------------- |
| **Phase A** | ✅ Done    | Architecture locked (39 DDRs), documentation complete |
| **Phase B** | 🔄 Active  | Cosmos IR, HAL, assembler bootstrap                   |
| **Phase 0** | ⬜ Planned | Cosmic Dawn — bootable kernel on QEMU x86-64          |
| **Phase 1** | ⬜ Planned | Core Being — drivers, Vega FS, shell                  |
| **Phase 2** | ⬜ Planned | System Symphony — GUI, AI runtime, FDE                |
| **Phase 3** | ⬜ Planned | User Enlightenment — desktop, WASM, accessibility     |
| **Phase 4** | ⬜ Planned | Hardware Transcendence — ARM64, RISC-V, PowerPC       |
| **Phase 5** | ⬜ Planned | Self-Realization — Cosmos Compiler replaces LLVM      |
| **Phase 6** | ⬜ Planned | Universal Harmony — 1.0.0 stable release              |

---

## **🔗 Key Links**

- **[Vision & Strategy (Vol 1)](../orion/orion_vol1_vision_strategy.md)**: Deep dive into the project’s philosophy and market positioning.
- **[Technical Architecture (Vol 2)](../orion/orion_vol2_unified.md)**: All 39 **Design Decision Records (DDRs)**.
- **[Build Requirements (Vol 3)](../orion/orion_vol3_build_requirements.md)**: Complete checklist of what needs to be built.
- **[Roadmap](roadmap.md)**: Public development phases and milestones.
- **[Contributing Guide](../community/contributing.md)**: How to get involved.
- **[RFC Process](../community/templates/rfc.md)**: Proposing changes to locked DDRs.

---

## **📖 Next Steps**

- **New to Orion OS?** Start with the **[Quick Start Guide](../orion/orion_vol0_quickstart_contributing_roadmap.md)**.
- **Want to contribute?** Check out the **[Good First Issues](../orion/orion_vol0_quickstart_contributing_roadmap.md#35---where-to-start-good-first-issues)**.
- **Interested in the architecture?** Read **[Vol 2: Technical Architecture](../orion/orion_vol2_unified.md)**.
