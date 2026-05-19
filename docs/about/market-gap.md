# Market Gap

## OS Landscape & What the Gap Is

| OS | Weakness Orion OS Exploits |
|----|---------------------------|
| **Windows 11** | Extremely heavy (TPM required, 4GB+ RAM), bloatware, privacy concerns. Dominates desktop but increasingly resented. |
| **macOS** | Beautiful UX, zero openness, expensive hardware lock-in, no server presence. |
| **Linux (Ubuntu/Fedora)** | Free and powerful, but fragmented, inconsistent UX, not optimised for AI or old hardware. |
| **ChromeOS** | Lightweight but Google-dependent, no offline/power-user use. |
| **Fuchsia** | Microkernel-based but closed-source and Google-controlled. |
| **Redox OS** | Rust-based microkernel — closest to Orion's vision, but tiny team, no GPU story. |
| **Haiku OS** | BeOS revival, niche, no modern hardware support strategy. |
| **seL4** | Formally verified — but not a general-purpose OS; no userspace story. |

### What Orion OS Learns from Each

| OS | Steal This | Avoid This |
|----|-----------|-----------|
| **Unix** | Composability, text interfaces, hierarchical namespace, pipeline philosophy | fork() as process primitive, binary root, setuid |
| **Linux** | io_uring, tickless kernel, cgroups concepts, driver breadth strategy | 30M monolithic kernel, never-break-userspace ABI, C language |
| **macOS/XNU** | Mach fast IPC, Grand Central Dispatch, Metal GPU model | Proprietary lock-in, binary-only policy |
| **seL4** | Formally verified capability kernel, minimal TCB philosophy | Lack of practical userspace story |
| **Fuchsia** | Capability model, component framework, Magma GPU model | Google corporate control, closed roadmap |
| **Plan 9** | Everything is a file (extended), clean namespace model | Abandoned ecosystem |

---