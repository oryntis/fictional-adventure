# Orion OS Documentation

> **A capability-based, microkernel operating system written in Rust — built for security, correctness, and modern hardware.**

*"An operating system is not built — it evolves through stages of consciousness."*
*From bare metal to cosmic harmony — a philosophical journey in 7 phases.*

---

## What is Orion OS?

Orion OS is a from-scratch operating system that treats **security as a first-class design constraint**, not an afterthought. Every resource — files, network sockets, GPU time, IPC channels — is accessed through an unforgeable **capability token** validated by the Cosmos microkernel. No ambient authority. No confused deputy attacks. No privilege escalation via path traversal.

| Property | Decision |
|----------|----------|
| **Kernel** | Cosmos — hybrid microkernel in Rust, ≤5K lines for Phase 1 |
| **Security model** | Capability-based (DDR-002) — zero ambient authority |
| **Drivers** | 100% userspace — no driver code in kernel |
| **Filesystem** | Vega FS — CoW, atomic writes, BLAKE3 checksums |
| **Crypto** | Post-quantum (CRYSTALS-Kyber + CRYSTALS-Dilithium) |
| **Display** | Aurora — Wayland-compatible compositor |
| **Package manager** | Comit + Nebula Hub — capability-scoped installs |
| **Targets** | x86-64 (Phase 1) → ARM64, RISC-V, PowerPC, LoongArch |

---

## Quick Start (QEMU)

**Requirements:** Rust 1.78+ nightly, QEMU 8.x, `just`

```bash
git clone https://github.com/orionos/orionos
cd orionos
cargo install just
just setup        # install toolchain, deps
just qemu         # boot Orion OS in QEMU x86-64
```

Expected output:
```
[cosmos] Initialising on x86-64. 8GiB RAM detected.
[cosmos] Capability table initialised. 1,048,576 slots available.
[orion-init] Starting core services...
[orion-init] All services ready. ORION OK.
```

---

## Current Phase: Phase B (Pre-kernel)

| Phase | Status | Description |
|-------|--------|-------------|
| **Phase A** | ✅ Done | Architecture locked (39 DDRs), documentation complete |
| **Phase B** | 🔄 Active | Cosmos IR, HAL, assembler bootstrap |
| **Phase 0** | ⬜ Planned | Cosmic Dawn — bootable kernel on QEMU x86-64 |
| **Phase 1** | ⬜ Planned | Core Being — drivers, Vega FS, shell |
| **Phase 2** | ⬜ Planned | System Symphony — GUI, AI runtime, FDE |
| **Phase 3** | ⬜ Planned | User Enlightenment — desktop, WASM, accessibility |
| **Phase 4** | ⬜ Planned | Hardware Transcendence — ARM64, RISC-V, PowerPC |
| **Phase 5** | ⬜ Planned | Self-Realization — Cosmos Compiler replaces LLVM |
| **Phase 6** | ⬜ Planned | Universal Harmony — 1.0.0 stable release |

---

## System Architecture

```
┌──────────────────────────────────────────────────────────┐
│                    User Applications                     │
├──────────────────────────────────────────────────────────┤
│  Aurora (Display)  │  orion-net  │  Vega FS  │  Comit    │
├──────────────────────────────────────────────────────────┤
│           Userspace Drivers (capability-gated)           │
├──────────────────────────────────────────────────────────┤
│   Cosmos Microkernel  │  Scheduler │  MM  │  Cap Table   │
├──────────────────────────────────────────────────────────┤
│        HAL (DDR-HAL) — x86-64 │ ARM64 │ RISC-V           │
└──────────────────────────────────────────────────────────┘
```

The Cosmos kernel contains **only**: scheduler, physical memory manager, IPC fast path, and capability table. Everything else — including all hardware drivers — runs as a userspace process with a limited, explicitly-granted capability set.

---

## Documentation Sections

| Section | Contents |
|---------|----------|
| [About](./02-about.md) | Mission, personas, philosophy, eco-advantage, OS comparison, version guide |
| [Roadmap](./03-roadmap.md) | 7-phase roadmap, Mermaid Gantt, exit criteria per phase |
| [Phases 0–1](./04-phases-0-1.md) | Cosmic Dawn + Core Being — task trackers, pitfalls, best practices |
| [Phases 2–3](./05-phases-2-3.md) | System Symphony + User Enlightenment |
| [Phases 4–5–6](./06-phases-4-5-6.md) | Hardware ports, self-hosting compiler, 1.0.0 release |
| [Architecture](./07-architecture.md) | All 39 DDRs, diagrams index, problem-solution tracker |
| [Develop](./08-develop.md) | Workflow, tools, best practices, glossary |
| [Community](./09-community.md) | CONTRIBUTING, SECURITY, templates, maintainers |
| [Learn](./10-learn.md) | Books by phase, tutorials, assembly primer |

---

## Security

Found a vulnerability? **Do not open a public issue.** See [Community → Security Policy](./09-community.md#security-policy) for responsible disclosure. Email: **security@orionos.dev**

---

## License

Orion OS is licensed under the **MIT License**.

*"The goal is not to build a faster Linux. The goal is to build the OS that Linux would be if it were designed today."*
