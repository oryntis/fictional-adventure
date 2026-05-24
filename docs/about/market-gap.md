# Market Gap

## OS Landscape & What the Gap Is

| OS                        | Weakness Orion OS Exploits                                                                                          |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| **Windows 11**            | Extremely heavy (TPM required, 4GB+ RAM), bloatware, privacy concerns. Dominates desktop but increasingly resented. |
| **macOS**                 | Beautiful UX, zero openness, expensive hardware lock-in, no server presence.                                        |
| **Linux (Ubuntu/Fedora)** | Free and powerful, but fragmented, inconsistent UX, not optimised for AI or old hardware.                           |
| **ChromeOS**              | Lightweight but Google-dependent, no offline/power-user use.                                                        |
| **Fuchsia**               | Microkernel-based but closed-source and Google-controlled.                                                          |
| **Redox OS**              | Rust-based microkernel — closest to Orion's vision, but tiny team, no GPU story.                                    |
| **Haiku OS**              | BeOS revival, niche, no modern hardware support strategy.                                                           |
| **seL4**                  | Formally verified — but not a general-purpose OS; no userspace story.                                               |

---

### What Orion OS Learns from Each

| OS            | Steal This                                                                  | Avoid This                                                   |
| ------------- | --------------------------------------------------------------------------- | ------------------------------------------------------------ |
| **Unix**      | Composability, text interfaces, hierarchical namespace, pipeline philosophy | fork() as process primitive, binary root, setuid             |
| **Linux**     | io_uring, tickless kernel, cgroups concepts, driver breadth strategy        | 30M monolithic kernel, never-break-userspace ABI, C language |
| **macOS/XNU** | Mach fast IPC, Grand Central Dispatch, Metal GPU model                      | Proprietary lock-in, binary-only policy                      |
| **seL4**      | Formally verified capability kernel, minimal TCB philosophy                 | Lack of practical userspace story                            |
| **Fuchsia**   | Capability model, component framework, Magma GPU model                      | Google corporate control, closed roadmap                     |
| **Plan 9**    | Everything is a file (extended), clean namespace model                      | Abandoned ecosystem                                          |

---

### From Linux

| **Feature**      | **Linux**                   | **Orion Approach**                             |
| ---------------- | --------------------------- | ---------------------------------------------- |
| Driver Ecosystem | 30+ years of drivers        | Linux driver compatibility shim in Phase 1–2   |
| Community Scale  | Massive developer community | Build contributor onboarding early             |
| Kernel Modules   | Loadable kernel modules     | **Reject**: All drivers in userspace (DDR-007) |
| Telemetry        | None in kernel              | **Keep**: Zero telemetry by design             |

### From Windows

| **Feature**            | **Windows**                   | **Orion Approach**                            |
| ---------------------- | ----------------------------- | --------------------------------------------- |
| Hardware Support       | Broadest driver compatibility | Prioritise open-source drivers (Intel, AMD)   |
| Gaming Ecosystem       | DirectX, broad compatibility  | Kernel-level anti-cheat attestation (DDR-015) |
| Backward Compatibility | Decades of legacy support     | 3-phase compatibility strategy                |
| Telemetry              | Extensive data collection     | **Reject**: Zero telemetry by design          |

### From macOS

| **Feature**      | **macOS**              | **Orion Approach**                      |
| ---------------- | ---------------------- | --------------------------------------- |
| Power Management | Excellent battery life | Per-process energy accounting (DDR-014) |
| Security         | Strong sandboxing      | Capability model is even stronger       |
| Closed Source    | Proprietary kernel     | **Reject**: Fully open source           |

### From Qubes OS

| **Feature**        | **Qubes**                     | **Orion Approach**                           |
| ------------------ | ----------------------------- | -------------------------------------------- |
| Security Isolation | VM-based compartmentalization | Capability-based isolation is lighter weight |
| Verified Boot      | Strong boot chain             | TPM + Dilithium signatures (DDR-011)         |
| Complexity         | High (Xen + multiple VMs)     | **Improve**: Simpler capability model        |

### From seL4

| **Feature**         | **seL4**                               | **Orion Approach**                           |
| ------------------- | -------------------------------------- | -------------------------------------------- |
| Formal Verification | Full kernel verification (10K C lines) | Verify &lt;15K lines of Orion core (DDR-013) |
| Microkernel         | Pure microkernel                       | Hybrid for performance (DDR-001)             |
| Capabilities        | Strong capability system               | Similar but with Rust memory safety          |

### From Fuchsia

| **Feature**            | **Fuchsia**          | **Orion Approach**            |
| ---------------------- | -------------------- | ----------------------------- |
| Microkernel            | Zircon microkernel   | Hybrid with better IPC        |
| Component Architecture | Modular, replaceable | Orion Extensions model        |
| Language Choice        | Rust + C++           | **Improve**: Rust-only kernel |

---
