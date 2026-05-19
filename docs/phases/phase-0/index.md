# Index
*Laying the foundation for Orion OS.*

---

## **🎯 Overview**
**Phase 0** is the **first phase** of Orion OS development, focusing on **bootstrapping the kernel** and establishing the **lowest-level infrastructure** required to run any code. This phase is **critical**—without it, nothing else in Orion OS can function.

**Goal**:
- Boot a **minimal kernel** in QEMU and on real hardware.
- Implement **basic memory management**, **interrupt handling**, and **early console output**.
- Achieve **Milestone 0**: A bootloader that prints **"ORION OS"** on screen.

**Why "Cosmic Dawn"?**
The name reflects the **beginning of the universe**—a moment of **pure potential** before the complexity of stars, planets, and life. Similarly, Phase 0 is the **raw, minimal foundation** upon which the rest of Orion OS will be built.

---

## **📌 Key Milestones**
   **Milestone** | **Description**                                                                 | **Exit Criteria**                                                                 | **Status**       | **Volume Reference**               |
 |---------------|---------------------------------------------------------------------------------|-----------------------------------------------------------------------------------|------------------|------------------------------------|
 | **0.0**       | Project setup: Docs, GitHub, CI/CD, RFC process.                                | 16 canonical volumes + 39 DDRs locked + GitHub infrastructure live.               | ✅ Done          | Vol 0, Vol 1, Vol 2                 |
 | **0.1**       | **Milestone 0**: BIOS bootloader in NASM.                                       | QEMU boots and prints **"ORION OS"** on screen.                                   | ✅ Done          | Vol 3 §1.1                         |
 | **0.2**       | UEFI bootloader in Rust.                                                       | Boots on UEFI hardware (QEMU `-bios OVMF.fd`).                                     | ⬜ Not Started    | Vol 3 §1.1                         |
 | **0.3**       | Kernel entry: GDT, IDT, long mode, early console.                              | Rust code runs on bare metal; VGA text output works.                             | ⬜ Not Started    | Vol 3 §1.1                         |
 | **0.4**       | Physical Memory Manager (PMM).                                                 | Buddy allocator tracks free/used pages from UEFI memory map.                     | ⬜ Not Started    | Vol 3 §1.2                         |
 | **0.5**       | Virtual Memory Manager (VMM).                                                 | Page tables, demand paging, kernel heap (slab allocator).                         | ⬜ Not Started    | Vol 3 §1.2                         |
 | **0.6**       | Basic scheduler (round-robin, single core).                                    | Two processes run simultaneously, context switching works.                       | ⬜ Not Started    | Vol 3 §1.4                         |
 | **0.7**       | Interrupt handling (APIC, timer, keyboard).                                     | Kernel handles hardware interrupts without crashing.                             | ⬜ Not Started    | Vol 3 §1.3                         |
 | **0.8**       | Early console (VGA + UEFI framebuffer).                                        | Kernel can print debug messages to screen.                                       | ⬜ Not Started    | Vol 3 §1.1                         |
 | **0.9**       | **Phase 0 Exit**: Kernel boots, handles interrupts, allocates memory.          | All Phase 0 milestones complete; kernel stable in QEMU.                          | ⬜ Not Started    | —                                  |

---

## **📁 Directory Structure**
```text
0-foundation/
├── index.md                     # This file (Phase overview)
├── resources.md                 # Learning materials for Phase 0
├── tasks/
│   ├── bootloader.md            # BIOS/UEFI bootloader development
│   │   ├── index.md             # Overview of bootloader task
│   │   ├── implementation.md    # Step-by-step guide
│   │   ├── testing.md           # Test cases (QEMU, real hardware)
│   │   └── troubleshooting.md   # Common issues and fixes
│   ├── kernel-entry.md          # Kernel entry point (GDT, IDT, long mode)
│   │   ├── index.md
│   │   ├── implementation.md
│   │   ├── testing.md
│   │   └── troubleshooting.md
│   ├── memory-manager.md        # Physical/Virtual Memory Manager
│   │   ├── index.md
│   │   ├── implementation.md
│   │   ├── testing.md
│   │   └── troubleshooting.md
│   ├── scheduler.md             # Basic round-robin scheduler
│   │   ├── index.md
│   │   ├── implementation.md
│   │   ├── testing.md
│   │   └── troubleshooting.md
│   ├── interrupts.md             # Interrupt handling (APIC, timer, keyboard)
│   │   ├── index.md
│   │   ├── implementation.md
│   │   ├── testing.md
│   │   └── troubleshooting.md
│   └── early-console.md         # VGA/UEFI framebuffer output
│       ├── index.md
│       ├── implementation.md
│       ├── testing.md
│       └── troubleshooting.md
└── summary.md                   # Phase 0 completion checklist