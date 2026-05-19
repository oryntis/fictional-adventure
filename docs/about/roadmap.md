# Orion OS Roadmap
*Living document — Updated at the start of every phase.*

Orion OS is built in **7 phases**, each with **clear milestones, exit criteria, and estimated timelines**. The roadmap is **milestone-driven**—each phase must be **complete and stable** before moving to the next.

---
---
## **🗺️ Overview: The 7-Phase Journey**
   **Phase** | **Name**               | **Goal**                                                                 | **Target Duration** | **Status**       | **Key Deliverable**                          |
 |-----------|------------------------|--------------------------------------------------------------------------|----------------------|------------------|---------------------------------------------|
 | **0**     | Cosmic Dawn            | **Foundation**: Kernel boots, basic hardware support.                  | 1–2 years            | ⚠️ In Progress   | QEMU boots and prints "ORION OS"             |
 | **1**     | Core Being             | **Kernel breathes**: Memory, scheduling, IPC, capabilities.             | 2–3 years            | ⬜ Not Started    | Userspace program runs on Orion OS          |
 | **2**     | System Symphony        | **Subsystem integration**: Drivers, filesystem, networking.             | 2–3 years            | ⬜ Not Started    | Self-hosting filesystem read                |
 | **3**     | User Enlightenment      | **UI + Apps**: Shell, package manager, basic desktop.                  | 2–3 years            | ⬜ Not Started    | First interactive session on Orion OS       |
 | **4**     | Hardware Transcendence| **Multi-arch**: ARM64, RISC-V, PowerPC.                                   | 1–2 years            | ⬜ Not Started    | Boots on real x86-64 hardware                |
 | **5**     | Self-Realization       | **Full self-hosting**: Cosmos Compiler replaces LLVM.                   | 3–5 years            | ⬜ Not Started    | **Phase B7: LLVM deleted** ✅               |
 | **6**     | Universal Harmony      | **1.0.0 Stable**: Production-ready, 1000+ packages, community governance. | 2–3 years            | ⬜ Not Started    | v1.0 Release (2031 target)                  |

---
---
## **📅 Detailed Phase Breakdown**

---
### **🌅 Phase 0: Cosmic Dawn (Foundation)**
**Goal**: Build the **kernel foundation**—bootloader, early kernel, and basic hardware support.
**Status**: ⚠️ **In Progress** (Milestone 0 achieved: Bootloader prints "ORION OS" in QEMU).
 | **Milestone** | **Description**                                                                 | **Exit Criteria**                                                                 | **Estimated Time** | **Status**       | **Volume Reference**               |
 |---------------|---------------------------------------------------------------------------------|-----------------------------------------------------------------------------------|--------------------|------------------|------------------------------------|
 | **0.0**       | Project setup: Docs, GitHub, CI/CD, RFC process.                                | 16 canonical volumes + 39 DDRs locked + GitHub infrastructure live.               | 1–3 months         | ✅ **Done**      | Vol 0, Vol 1, Vol 2                 |
 | **0.1**       | **Milestone 0**: BIOS bootloader in NASM.                                       | QEMU boots and prints "ORION OS" on screen.                                       | 1–2 weeks          | ✅ **Done**      | Vol 3 §1.1                         |
 | **0.2**       | UEFI bootloader in Rust.                                                       | Boots on UEFI hardware (QEMU -bios OVMF.fd).                                       | 1–2 months         | ⬜ Not Started    | Vol 3 §1.1                         |
 | **0.3**       | Kernel entry: GDT, IDT, long mode, early console.                              | Rust code runs on bare metal; VGA text output works.                             | 1–2 months         | ⬜ Not Started    | Vol 3 §1.1                         |
 | **0.4**       | Physical Memory Manager (PMM).                                                 | Buddy allocator tracks free/used pages from UEFI memory map.                     | 1–2 months         | ⬜ Not Started    | Vol 3 §1.2                         |
 | **0.5**       | Virtual Memory Manager (VMM).                                                 | Page tables, demand paging, kernel heap (slab allocator).                         | 1–2 months         | ⬜ Not Started    | Vol 3 §1.2                         |
 | **0.6**       | Basic scheduler (round-robin, single core).                                    | Two processes run simultaneously, context switching works.                       | 1–2 months         | ⬜ Not Started    | Vol 3 §1.4                         |
 | **0.7**       | Interrupt handling (APIC, timer, keyboard).                                     | Kernel handles hardware interrupts without crashing.                             | 1–2 months         | ⬜ Not Started    | Vol 3 §1.3                         |
 | **0.8**       | Early console (VGA + UEFI framebuffer).                                        | Kernel can print debug messages to screen.                                       | 1 month            | ⬜ Not Started    | Vol 3 §1.1                         |
 | **0.9**       | **Phase 0 Exit**: Kernel boots, handles interrupts, allocates memory.          | All Phase 0 milestones complete; kernel stable in QEMU.                          | —                  | ⬜ Not Started    | —                                  |

---
### **🌱 Phase 1: Core Being (Kernel Breathes)**
**Goal**: **Kernel is functional**—memory management, scheduling, IPC, and basic capabilities.
**Status**: ⬜ **Not Started** (Blocks Phase 2).
 | **Milestone** | **Description**                                                                 | **Exit Criteria**                                                                 | **Estimated Time** | **Status**       | **Volume Reference**               |
 |---------------|---------------------------------------------------------------------------------|-----------------------------------------------------------------------------------|--------------------|------------------|------------------------------------|
 | **1.1**       | **Capability System** (DDR-002).                                               | Kernel mints, transfers, and revokes capabilities.                                | 2–3 weeks          | ⬜ Not Started    | Vol 2 DDR-002                      |
 | **1.2**       | **IPC Primitives** (DDR-006).                                                  | Synchronous message passing; zero-copy for large payloads.                      | 2–3 weeks          | ⬜ Not Started    | Vol 2 DDR-006                      |
 | **1.3**       | **SMP (Symmetric Multiprocessing)**.                                           | Bring up additional CPU cores; per-CPU run queues.                               | 1–2 months         | ⬜ Not Started    | Vol 3 §1.4                         |
 | **1.4**       | **Heterogeneous Scheduler** (DDR-005).                                         | 5 scheduling classes (RealTime, Interactive, Normal, Batch, Idle).                  | 1–2 months         | ⬜ Not Started    | Vol 2 DDR-005                      |
 | **1.5**       | **Basic Filesystem (Vega FS)**.                                               | Read/write files; directories; basic journal.                                     | 2–3 months         | ⬜ Not Started    | Vol 3 Vega FS                      |
 | **1.6**       | **orion-init (Service Manager)**.                                             | Starts services in dependency order; socket activation.                          | 1–2 months         | ⬜ Not Started    | Vol 2 DDR-INIT                      |
 | **1.7**       | **Pulsar Shell (Minimal)**.                                                    | Run commands; pipes; basic builtins (cd, pwd, echo).                              | 1–2 months         | ⬜ Not Started    | Vol 3 §5.1                         |
 | **1.8**       | **First Userspace Program**.                                                   | A Rust program runs in userspace, communicates with kernel via IPC.              | 1 month            | ⬜ Not Started    | Vol 3 §5                           |
 | **1.9**       | **Phase 1 Exit**: Kernel + userspace program runs.                              | All Phase 1 milestones complete; kernel stable for basic tasks.                   | —                  | ⬜ Not Started    | —                                  |

---
### **🎨 Phase 2: System Symphony (Subsystem Integration)**
**Goal**: **Subsystems work together**—drivers, filesystem, networking, and basic desktop.
**Status**: ⬜ **Not Started** (Blocks Phase 3).
 | **Milestone** | **Description**                                                                 | **Exit Criteria**                                                                 | **Estimated Time** | **Status**       | **Volume Reference**               |
 |---------------|---------------------------------------------------------------------------------|-----------------------------------------------------------------------------------|--------------------|------------------|------------------------------------|
 | **2.1**       | **NVMe Driver** (First real storage).                                           | Read/write files from NVMe SSD in QEMU.                                           | 1–2 months         | ⬜ Not Started    | Vol 3 §2.1                         |
 | **2.2**       | **Vega FS (Read-Only)**.                                                        | Mount Vega FS; read files (no write yet).                                         | 1–2 months         | ⬜ Not Started    | Vol 3 Vega FS                      |
 | **2.3**       | **Network Stack (ether-d)**.                                                   | TCP/IP, DNS, DHCP; basic connectivity.                                            | 2–3 months         | ⬜ Not Started    | Vol 3 §14                          |
 | **2.4**       | **USB HID Driver** (Keyboard + Mouse).                                         | Input works in QEMU.                                                              | 1–2 months         | ⬜ Not Started    | Vol 3 §2.4                         |
 | **2.5**       | **VGA/KMS Display Driver**.                                                    | Basic framebuffer → DRM/KMS display output.                                      | 1–2 months         | ⬜ Not Started    | Vol 3 §2.5                         |
 | **2.6**       | **Pulsar Shell (Full)**.                                                        | Command history, tab completion, job control.                                     | 1–2 months         | ⬜ Not Started    | Vol 3 §5.1                         |
 | **2.7**       | **Comit Package Manager (Minimal)**.                                           | Install/remove/update packages; Dilithium verification.                           | 2–3 months         | ⬜ Not Started    | Vol 3 §6                           |
 | **2.8**       | **Real Hardware Boot** (x86-64).                                                | Boots on physical x86-64 machine (not just QEMU).                                  | 1–2 months         | ⬜ Not Started    | Vol 3 §2                           |
 | **2.9**       | **Phase 2 Exit**: Basic desktop with networking, storage, and input.           | All Phase 2 milestones complete; system usable for early adopters.                | —                  | ⬜ Not Started    | —                                  |

---
### **👥 Phase 3: User Enlightenment (UI + Apps)**
**Goal**: **User-facing desktop experience**—shell, package manager, and basic apps.
**Status**: ⬜ **Not Started** (Blocks Phase 4).
 | **Milestone** | **Description**                                                                 | **Exit Criteria**                                                                 | **Estimated Time** | **Status**       | **Volume Reference**               |
 |---------------|---------------------------------------------------------------------------------|-----------------------------------------------------------------------------------|--------------------|------------------|------------------------------------|
 | **3.1**       | **Aurora Compositor (Basic)**.                                                 | Wayland compositor; basic window management.                                      | 2–3 months         | ⬜ Not Started    | Vol 2 DDR-COMPOSITOR               |
 | **3.2**       | **GPU Drivers (Intel/AMD)**.                                                    | Basic 3D acceleration; Vulkan support.                                            | 3–6 months         | ⬜ Not Started    | Vol 3 §2.3                         |
 | **3.3**       | **Vega FS (Write Support)**.                                                   | Full CoW write path; snapshots; BLAKE3 checksums.                                  | 2–3 months         | ⬜ Not Started    | Vol 3 Vega FS                      |
 | **3.4**       | **Comit Package Manager (Full)**.                                              | 100+ packages; dependency resolution; atomic updates.                             | 3–6 months         | ⬜ Not Started    | Vol 3 §6                           |
 | **3.5**       | **Orion Settings App**.                                                         | System configuration GUI.                                                        | 1–2 months         | ⬜ Not Started    | Vol 3 §9.4                         |
 | **3.6**       | **Basic Desktop Apps** (File Manager, Terminal, Text Editor).                  | Core utilities for daily use.                                                     | 2–3 months         | ⬜ Not Started    | Vol 3 §5                           |
 | **3.7**       | **POSIX Compatibility Layer**.                                                  | Run Linux binaries via orion-pamd.                                               | 2–3 months         | ⬜ Not Started    | Vol 2 DDR-POSIX                    |
 | **3.8**       | **Phase 3 Exit**: Daily-usable desktop for developers.                         | All Phase 3 milestones complete; system usable for early adopters.                | —                  | ⬜ Not Started    | —                                  |

---
### **🖥️ Phase 4: Hardware Transcendence (Multi-Arch)**
**Goal**: **Port to ARM64 and RISC-V**; optimize for embedded and server use cases.
**Status**: ⬜ **Not Started** (Blocks Phase 5).
 | **Milestone** | **Description**                                                                 | **Exit Criteria**                                                                 | **Estimated Time** | **Status**       | **Volume Reference**               |
 |---------------|---------------------------------------------------------------------------------|-----------------------------------------------------------------------------------|--------------------|------------------|------------------------------------|
 | **4.1**       | **ARM64 Port** (Raspberry Pi 4, Apple M-series).                                | Orion OS boots on ARM64 hardware.                                                 | 3–6 months         | ⬜ Not Started    | Vol 2 DDR-HAL                      |
 | **4.2**       | **RISC-V Port** (SiFive, Milk-V).                                               | Orion OS boots on RISC-V hardware.                                                | 3–6 months         | ⬜ Not Started    | Vol 2 DDR-HAL                      |
 | **4.3**       | **Unikernel Mode**.                                                             | Single binary (app + kernel) for server deployments.                              | 1–2 months         | ⬜ Not Started    | Vol 1 §15.4                        |
 | **4.4**       | **Orion Server (Minimal)**.                                                     | Network-optimized kernel; no GUI; container-native.                               | 2–3 months         | ⬜ Not Started    | Vol 3 §8                           |
 | **4.5**       | **Orion Mobile (Early)**.                                                       | Touch compositor; basic input; ARM64 SoC support.                                  | 3–6 months         | ⬜ Not Started    | Vol 3 §8                           |
 | **4.6**       | **Phase 4 Exit**: Multi-arch support; server and embedded use cases.             | All Phase 4 milestones complete.                                                 | —                  | ⬜ Not Started    | —                                  |

---
### **🤖 Phase 5: Self-Realization (Full Self-Hosting)**
**Goal**: **Replace all external toolchain dependencies** with Orion OS’s own tools.
**Status**: ⬜ **Not Started** (The **North Star** of Orion OS).
 | **Milestone** | **Description**                                                                 | **Exit Criteria**                                                                 | **Estimated Time** | **Status**       | **Volume Reference**               |
 |---------------|---------------------------------------------------------------------------------|-----------------------------------------------------------------------------------|--------------------|------------------|------------------------------------|
 | **5.1**       | **Orion Libc** (Replace musl).                                                  | Full C standard library implementation in Rust.                                  | 1–2 years          | ⬜ Not Started    | Vol 3 §4                           |
 | **5.2**       | **Cosmos Assembler** (Replace NASM).                                           | x86-64, ARM64, RISC-V assembler in Rust.                                           | 6–12 months        | ⬜ Not Started    | Vol 2 DDR-IR                       |
 | **5.3**       | **Cosmos Linker** (Replace LLD).                                                | Linker for Orion executable format.                                              | 6–12 months        | ⬜ Not Started    | Vol 2 DDR-IR                       |
 | **5.4**       | **Cosmos Compiler (Bootstrap)**.                                               | First version compiled with LLVM.                                                | 1–2 years          | ⬜ Not Started    | Vol 2 DDR-IR                       |
 | **5.5**       | **Cosmos Compiler (Self-Hosting)**.                                            | Cosmos Compiler compiles itself. **LLVM deleted from build system.** ✅            | 1–2 years          | ⬜ Not Started    | Vol 2 DDR-IR                       |
 | **5.6**       | **Formal Verification (Kani)**.                                                | Kani verification of kernel core (capability system, MM, IPC, scheduler).       | Ongoing            | ⬜ Not Started    | Vol 2 DDR-013                      |
 | **5.7**       | **Phase 5 Exit**: **Full self-hosting achieved**.                              | Orion OS compiles Orion OS. No external dependencies.                             | —                  | ⬜ Not Started    | —                                  |

---
### **🌌 Phase 6: Universal Harmony (1.0.0 Stable)**
**Goal**: **Production-ready OS** with stable ABI, 1000+ packages, and community governance.
**Status**: ⬜ **Not Started** (Target: **2031**).
 | **Milestone** | **Description**                                                                 | **Exit Criteria**                                                                 | **Estimated Time** | **Status**       | **Volume Reference**               |
 |---------------|---------------------------------------------------------------------------------|-----------------------------------------------------------------------------------|--------------------|------------------|------------------------------------|
 | **6.1**       | **Stable ABI**.                                                                | Kernel ABI frozen; no breaking changes.                                           | 6–12 months        | ⬜ Not Started    | Vol 2 DDR-014                      |
 | **6.2**       | **1000+ Packages**.                                                           | Nebula Hub with 1000+ verified packages.                                          | 1–2 years          | ⬜ Not Started    | Vol 3 §6                           |
 | **6.3**       | **Community Governance**.                                                      | RFC process, maintainer team, foundation.                                          | 6–12 months        | ⬜ Not Started    | Vol 1 §22                          |
 | **6.4**       | **Enterprise Features**.                                                       | MDM, LDAP, audit logging, SELinux compatibility.                                   | 1–2 years          | ⬜ Not Started    | Vol 3 §9.6                         |
 | **6.5**       | **Gaming Subsystem (Full)**.                                                   | Anti-cheat attestation; DirectStorage; global shader cache.                      | 1–2 years          | ⬜ Not Started    | Vol 3 §7                           |
 | **6.6**       | **Quasar Runtime (Full)**.                                                    | OS-level AI inference; NPU/GPU scheduling; model cache.                           | 1–2 years          | ⬜ Not Started    | Vol 2 DDR-017                      |
 | **6.7**       | **Orion Auto (Automotive)**.                                                   | ISO 26262 compliance; CAN bus; OTA updates.                                         | 1–2 years          | ⬜ Not Started    | Vol 3 §8                           |
 | **6.8**       | **v1.0 Release**.                                                              | Stable, production-ready OS.                                                     | —                  | ⬜ Not Started    | —                                  |

---
---
## **🎯 Release Schedule**
*(Public-facing versions for users and press)*
 | **Version** | **Name**          | **Target Date** | **Key Deliverable**                                                                 | **Phase**       |
 |-------------|-------------------|-----------------|------------------------------------------------------------------------------------|-----------------|
 | **v0.1**    | Cosmos Spark      | Late 2025       | First bootable kernel in QEMU — no drivers, no FS, no shell.                        | Phase 0         |
 | **v0.2**    | Cosmos Core       | Mid 2026        | Capability system + IPC + basic memory management.                                  | Phase 1         |
 | **v0.3**    | Vega Seed         | Late 2026       | Vega FS mounts and reads files — NVMe driver in userspace.                         | Phase 2         |
 | **v0.4**    | Orion Shell       | Mid 2027        | Pulsar Shell runs — Comit installs first package.                                  | Phase 3         |
 | **v0.5**    | Orion Alpha       | Late 2027       | Boots on real x86-64 hardware — network, audio, display.                             | Phase 4         |
 | **v0.8**    | Orion Beta        | 2029            | Gaming subsystem, Quasar Runtime, full Comit ecosystem.                            | Phase 5–6       |
 | **v1.0**    | Orion One         | 2031            | Stable ABI, Cosmos Compiler bootstrap, 1000+ packages.                             | Phase 6         |

---
---
## **📊 Phase-by-Phase Task Tracker**
*(Living dashboard — Update as tasks are completed)*

### **Phase 0: Cosmic Dawn (Foundation)**
 | **Task**                          | **Status**       | **Assignee** | **Notes**                          |
 |-----------------------------------|------------------|--------------|------------------------------------|
 | Project setup (Docs, GitHub, CI)  | ✅ Done          | —            | 16 volumes + 39 DDRs locked.       |
 | Milestone 0 (Bootloader)          | ✅ Done          | —            | Prints "ORION OS" in QEMU.          |
 | UEFI Bootloader                   | ⬜ Not Started    | —            |                                    |
 | Kernel Entry (GDT, IDT, Long Mode)| ⬜ Not Started    | —            |                                    |
 | Physical Memory Manager          | ⬜ Not Started    | —            |                                    |
 | Virtual Memory Manager           | ⬜ Not Started    | —            |                                    |
 | Basic Scheduler                   | ⬜ Not Started    | —            |                                    |
 | Interrupt Handling                | ⬜ Not Started    | —            |                                    |
 | Early Console                     | ⬜ Not Started    | —            |                                    |

### **Phase 1: Core Being (Kernel Breathes)**
 | **Task**                          | **Status**       | **Assignee** | **Notes**                          |
 |-----------------------------------|------------------|--------------|------------------------------------|
 | Capability System                 | ⬜ Not Started    | —            | DDR-002.                           |
 | IPC Primitives                    | ⬜ Not Started    | —            | DDR-006.                           |
 | SMP (Symmetric Multiprocessing)   | ⬜ Not Started    | —            |                                    |
 | Heterogeneous Scheduler           | ⬜ Not Started    | —            | DDR-005.                           |
 | Basic Filesystem (Vega FS)        | ⬜ Not Started    | —            |                                    |
 | orion-init (Service Manager)      | ⬜ Not Started    | —            | DDR-INIT.                          |
 | Pulsar Shell (Minimal)            | ⬜ Not Started    | —            |                                    |
 | First Userspace Program           | ⬜ Not Started    | —            |                                    |

*(Continue for Phases 2–6...)*

---
---
## **🚀 How to Contribute**
1. **Pick a task** from the **[Good First Issues](orion_vol0_quickstart_contributing_roadmap.docx#35---where-to-start-good-first-issues)**.
2. **Follow the [RFC Process](rfc.md)** for major changes.
3. **Submit a PR** using the **[Pull Request Template](PULL_REQUEST_TEMPLATE.md)**.
4. **Join the community** on [OSDev Forum](https://forum.osdev.org) or [Matrix](https://matrix.to/#/#orionos:matrix.org).

---
## **📅 Next Milestones**
 | **Milestone**               | **Target Date** | **Status**       |
 |-----------------------------|-----------------|------------------|
 | Phase 0 Complete             | Late 2025       | ⚠️ In Progress   |
 | v0.1 (Cosmos Spark) Release  | Late 2025       | ⬜ Not Started    |
 | Phase 1 Start                | Early 2026      | ⬜ Not Started    |
 | v0.2 (Cosmos Core) Release   | Mid 2026        | ⬜ Not Started    |

---
**Last Updated**: May 18, 2026
**Next Review**: June 1, 2026