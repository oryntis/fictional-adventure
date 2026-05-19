# About Orion OS

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

| Component | Purpose | Status |
|---|---|---|
| **Cosmos** | Hybrid microkernel (scheduler, memory, IPC, capabilities). | ✅ Phase 0–1 (Design) |
| **Vega FS** | Copy-on-Write filesystem with **BLAKE3 checksums** and **O(1) snapshots**. | ✅ Design (DDR-009) |
| **Aurora** | Wayland compositor with **gaming mode**, **HDR**, and **VRR**. | ⚠️ Phase 2 |
| **Quasar Runtime** | OS-level **AI inference engine** (shared model weights, NPU/GPU scheduling). | ⚠️ Phase 2–3 |
| **Comit** | Package manager with **WASM apps**, **Dilithium signatures**, and **atomic updates**. | ⚠️ Phase 1 |
| **Pulsar Shell** | System shell with **pipelines**, **job control**, and **tab completion**. | ⚠️ Phase 1 |
| **Nebula Hub** | Community ecosystem for **extensions**, **packages**, and **config profiles**. | ⬜ Future |

---

## **🔗 Key Links**
- **[Vision & Strategy (Vol 1)](orion_vol1_vision_strategy.docx)**: Deep dive into the project’s philosophy and market positioning.
- **[Technical Architecture (Vol 2)](orion_vol2_unified.docx)**: All 39 **Design Decision Records (DDRs)**.
- **[Build Requirements (Vol 3)](orion_vol3_build_requirements.docx)**: Complete checklist of what needs to be built.
- **[Roadmap](#roadmap)**: Public development phases and milestones.
- **[Contributing Guide](CONTRIBUTING.md)**: How to get involved.
- **[RFC Process](rfc.md)**: Proposing changes to locked DDRs.

---
## **📖 Next Steps**
- **New to Orion OS?** Start with the **[Quick Start Guide](orion_vol0_quickstart_contributing_roadmap.docx)**.
- **Want to contribute?** Check out the **[Good First Issues](orion_vol0_quickstart_contributing_roadmap.docx#35---where-to-start-good-first-issues)**.
- **Interested in the architecture?** Read **[Vol 2: Technical Architecture](orion_vol2_unified.docx)**.