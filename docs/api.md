# Orion OS — Complete Documentation & Repository Structure

&gt; **The definitive, unified folder structure for the entire project.**
&gt; Every file has a purpose. Every folder has a clear entry and exit. The team never wonders "where does this go?" or "what do I do next?"

---

## Design Principles

1. **`00-start-here` is mandatory** — CI enforces that new contributors read it before their first PR is accepted.
2. **Every task folder has a `➡️-next.md`** — you always know what to do when you finish.
3. **Every phase folder has `⬅️-entry-requirements.md` and `exit-criteria.md`** — gates are explicit, not assumed.
4. **DDRs are locked and centralized** — no DDR lives inside a phase folder. Tasks reference DDRs; they don't restate them.
5. **RFCs have a full lifecycle** — draft → open → accepted → implemented (or rejected/withdrawn).
6. **Numbered prefixes drive order** — `T00`, `T01`, `T02` tell you the exact sequence.

---

## Top-Level Structure

```
orion-os/
├── README.md                           # Dashboard: phase status + 3 links to get started
├── CONTRIBUTING.md                     # One-page quick guide → points to docs/07-community/
├── CODE_OF_CONDUCT.md
├── LICENSE                             # MIT
├── SECURITY.md                         # Short version → points to docs/07-community/SECURITY.md
├── CHANGELOG.md
├── VERSIONING.md                       # Semver policy + phase-version mapping
├── Justfile                            # All dev commands: just build, just qemu, just test
│
├── docs/                               # ← All documentation lives here
├── kernel/                             # ← Kernel source (Cosmos)
├── userspace/                          # ← Userspace services and apps
├── toolchain/                          # ← Build toolchain (assembler, linker, compiler)
├── tests/                              # ← Test suites (unit, integration, fuzz)
├── benchmarks/                         # ← Performance benchmarks
└── scripts/                            # ← Dev tooling scripts
```

---

## `docs/` — Full Structure

```
docs/
│
├── 00-start-here/                      ← READ THIS FIRST (CI gate: must acknowledge before PR)
│   ├── README.md                       # "Read these 5 files before touching code"
│   ├── onboarding-checklist.md         # 10-step setup: env, tools, first QEMU boot
│   ├── how-to-read-this-project.md     # Explains folder numbering, DDR system, phase gates
│   ├── repository-layout.md            # Every top-level folder explained in 1 sentence
│   ├── development-flow.md             # Branch → Code → Test → PR → Review → Merge
│   ├── coding-standards.md             # No unsafe, no unwrap, typed caps, error handling
│   ├── testing-standards.md            # Every kernel change needs Kani; every parser needs fuzz
│   ├── security-principles.md          # Capability model, zero ambient authority, DDR-002 summary
│   ├── glossary.md                     # All project-specific terms (Cap, DDR, PMM, VMM, IPC...)
│   └── quick-reference.md              # Cheat sheet: common commands, links, contacts
│
│
├── 01-project/                         ← Vision, mission, strategy
│   ├── README.md
│   ├── mission.md                      # The mission statement + eco-advantage
│   ├── philosophy.md                   # 10 non-negotiable design principles
│   ├── roadmap.md                      # 7-phase roadmap + Mermaid Gantt chart
│   ├── comparison-matrix.md            # Orion vs Linux vs Windows vs macOS vs Fuchsia
│   ├── personas.md                     # Who is Orion OS for? (gamer, sysadmin, dev, student)
│   └── long-term-goals.md              # Post-1.0.0 vision
│
│
├── 02-architecture/                    ← Source of truth for all decisions
│   │
│   ├── README.md                       # "How architecture decisions are made and locked"
│   ├── overview.md                     # Layer diagram + component map
│   ├── problem-solution.md             # Living dashboard: problem → DDR → status → task
│   │
│   ├── ddrs/                           ← Design Decision Records (LOCKED after approval)
│   │   ├── README.md                   # DDR process: propose → RFC → approve → lock → amend
│   │   ├── template.md                 # Copy this to create a new DDR
│   │   ├── index.md                    # All 39 DDRs in one searchable table
│   │   │
│   │   ├── kernel/
│   │   │   ├── DDR-001-kernel-architecture.md       # Cosmos: hybrid microkernel, Rust, ≤5K lines
│   │   │   ├── DDR-002-capability-system.md         # Zero ambient authority, unforgeable tokens
│   │   │   ├── DDR-003-memory-manager.md            # PMM + VMM: buddy allocator, capability-scoped
│   │   │   ├── DDR-004-ipc-design.md                # IPC fast path: synchronous, zero-copy
│   │   │   └── DDR-005-scheduler.md                 # Heterogeneous: CPU + GPU + NPU + TPU
│   │   │
│   │   ├── boot/
│   │   │   ├── DDR-006-boot-protocol.md             # Horizon Boot: UEFI primary, BIOS legacy
│   │   │   ├── DDR-007-driver-model.md              # 100% userspace drivers, IOMMU-enforced
│   │   │   └── DDR-008-init-system.md               # Init: capability-first, no suid
│   │   │
│   │   ├── filesystem/
│   │   │   ├── DDR-006-vega-fs.md                   # CoW, atomic writes, BLAKE3 checksums
│   │   │   └── DDR-VFS-virtual-fs.md                # VFS layer: capability-gated mount points
│   │   │
│   │   ├── networking/
│   │   │   ├── DDR-011-network-stack.md             # Zero-trust, no open ports by default
│   │   │   └── DDR-PF-packet-filter.md              # Packet filter: capability-gated rules
│   │   │
│   │   ├── security/
│   │   │   ├── DDR-009-crypto.md                    # CRYSTALS-Kyber + Dilithium3, ChaCha20
│   │   │   ├── DDR-FDE-full-disk-encryption.md      # FDE: post-quantum key wrapping
│   │   │   ├── DDR-020-capability-delegation.md
│   │   │   ├── DDR-021-intent-capabilities.md
│   │   │   ├── DDR-022-unsafe-policy.md             # Every unsafe block needs justification comment
│   │   │   ├── DDR-023-release-signing.md           # 2-of-3 maintainer multisig on all releases
│   │   │   ├── DDR-024-revocation.md
│   │   │   └── DDR-025-to-029-hardening.md
│   │   │
│   │   ├── display/
│   │   │   ├── DDR-012-aurora-compositor.md         # Wayland-compatible compositor
│   │   │   └── DDR-COMPOSITOR-protocol.md
│   │   │
│   │   ├── toolchain/
│   │   │   ├── DDR-013-compiler-design.md           # Cosmos Compiler: self-hosting in Phase 5
│   │   │   ├── DDR-IR-intermediate-repr.md           # Cosmos IR specification
│   │   │   ├── DDR-HAL-hardware-abstraction.md      # Unified HAL across all 5 architectures
│   │   │   └── DDR-COMIT-package-manager.md         # Comit: atomic, capability-scoped installs
│   │   │
│   │   ├── gpu-ai/
│   │   │   ├── DDR-014-syscall-abi.md               # 13 syscalls, capability handles only
│   │   │   ├── DDR-015-gpu-scheduling.md
│   │   │   ├── DDR-017-npu-support.md
│   │   │   ├── DDR-018-quasar-runtime.md            # AI runtime: NPU/TPU/GPU as first-class
│   │   │   └── DDR-019-ai-memory.md                 # Tensors as first-class memory objects
│   │   │
│   │   └── amendments/                 # DDR-XXX-AN: approved amendments only
│   │       └── README.md              # Amendment process + history log
│   │
│   ├── rfcs/                           ← Proposals to change or create DDRs
│   │   ├── README.md                   # RFC lifecycle: 7-day open period, maintainer vote
│   │   ├── template.md                 # Use this exact template — incomplete RFCs are closed
│   │   │
│   │   ├── draft/                      # Being written, not yet open for comment
│   │   ├── open/                       # Open for 7-day community discussion
│   │   ├── accepted/                   # Approved, awaiting implementation
│   │   ├── implemented/                # Done — DDR updated
│   │   ├── rejected/                   # Closed with documented reason
│   │   └── withdrawn/                  # Author withdrew
│   │
│   ├── specifications/                 # Formal specs: ABI, wire formats, protocols
│   │   ├── syscall-abi.md              # All 13 syscalls with signatures + capability requirements
│   │   ├── capability-model.md         # Token format, delegation rules, revocation
│   │   ├── ddr-ir-spec.md              # Cosmos IR: instruction set + encoding
│   │   ├── executable-format.md        # Orion ELF variant spec
│   │   ├── ipc-spec.md                 # IPC message format + fast path protocol
│   │   ├── vfs-spec.md                 # VFS interface + capability-gated mount spec
│   │   ├── driver-api.md               # Userspace driver interface spec
│   │   ├── scheduler-spec.md           # Heterogeneous scheduling policy spec
│   │   └── memory-layout.md            # Virtual memory layout: kernel + userspace regions
│   │
│   └── diagrams/                       # Mermaid, Excalidraw, SVG — committed as source files
│       ├── README.md                   # How to render + edit diagrams
│       ├── system-architecture.mmd     # Full layer stack
│       ├── boot-flow.mmd               # Horizon Boot → kernel_main() sequence
│       ├── capability-model.mmd        # Cap token lifecycle
│       ├── memory-layout.mmd           # Virtual address space map
│       ├── ipc-fastpath.mmd            # IPC call path
│       └── scheduler-flow.mmd          # CPU + GPU + NPU scheduling decision tree
│
│
├── 03-phases/                          ← WHERE DEVELOPMENT HAPPENS — the heart of the project
│   │
│   ├── README.md                       # Current phase status dashboard (updated every sprint)
│   ├── phase-flow.md                   # How phases connect: exit criteria → entry requirements
│   │
│   ├── phase-B-pre-kernel/             ← 🔄 CURRENT ACTIVE PHASE
│   │   ├── README.md                   # What Phase B is and what "done" looks like
│   │   ├── goals.md
│   │   ├── exit-criteria.md            # ALL must be ✅ before Phase 0 starts
│   │   ├── tasks/
│   │   │   ├── T00-cosmos-ir/
│   │   │   │   ├── README.md
│   │   │   │   ├── implementation.md
│   │   │   │   ├── testing.md
│   │   │   │   ├── related-ddrs.md     # → DDR-IR
│   │   │   │   ├── done-checklist.md
│   │   │   │   └── ➡️-next.md          # "Next: T01-hal-design"
│   │   │   ├── T01-hal-design/
│   │   │   └── T02-assembler-bootstrap/
│   │   └── ➡️-next-phase.md            # "When exit-criteria.md is fully ✅ → start Phase 0"
│   │
│   ├── phase-0-cosmic-dawn/            ← ⬜ PLANNED — v0.0.x — "From void to first light"
│   │   ├── README.md                   # Philosophy, goals, key deliverable: QEMU prints ORION OK
│   │   ├── goals.md                    # What this phase achieves in plain language
│   │   ├── ⬅️-entry-requirements.md    # "Phase B exit-criteria.md must be fully ✅"
│   │   ├── exit-criteria.md            # Checklist: all must ✅ to unlock Phase 1
│   │   │
│   │   ├── tasks/                      ← Tasks are in strict order — follow T00 → T08
│   │   │   │
│   │   │   ├── T00-bootloader/         # Horizon Boot — UEFI + BIOS legacy path
│   │   │   │   ├── README.md           # What, why, estimated effort, DDR references
│   │   │   │   ├── implementation.md   # Step-by-step: from UEFI crate to exit_boot_services()
│   │   │   │   ├── testing.md          # QEMU boot test, tamper test, TPM PCR validation
│   │   │   │   ├── debugging.md        # Triple fault? Signature fail? Solutions here
│   │   │   │   ├── security.md         # Dilithium3 sig verify, TPM PCR, constant-time compare
│   │   │   │   ├── pitfalls.md         # "exit_boot_services() before jump", stack alignment
│   │   │   │   ├── related-ddrs.md     # → DDR-006, DDR-009, DDR-023
│   │   │   │   ├── done-checklist.md   # Must ALL be ✅ before starting T01
│   │   │   │   └── ➡️-next.md          # "Next task: T01-kernel-entry"
│   │   │   │
│   │   │   ├── T01-kernel-entry/       # Assembly trampoline → Rust kernel_main()
│   │   │   │   ├── README.md
│   │   │   │   ├── implementation.md   # GDT, IDT, long mode enable, SSE/AVX, AP bringup
│   │   │   │   ├── testing.md          # GDB step-through, interrupt injection, SMP with -smp 4
│   │   │   │   ├── debugging.md        # Triple fault debug, AP hang, stack misalign
│   │   │   │   ├── security.md         # No C in early boot, static buffers only
│   │   │   │   ├── pitfalls.md         # GDT segment selectors, 16-byte RSP alignment
│   │   │   │   ├── related-ddrs.md     # → DDR-001, DDR-HAL
│   │   │   │   ├── done-checklist.md
│   │   │   │   └── ➡️-next.md          # "Next task: T02-physical-memory-manager"
│   │   │   │
│   │   │   ├── T02-physical-memory-manager/    # cosmos_pmm — buddy allocator
│   │   │   │   ├── README.md
│   │   │   │   ├── implementation.md   # Buddy allocator from UEFI memory map
│   │   │   │   ├── testing.md          # Kani harness for pmm_alloc, stress alloc/free
│   │   │   │   ├── debugging.md
│   │   │   │   ├── security.md         # No ambient access; typed pages
│   │   │   │   ├── pitfalls.md         # UEFI reserved regions, alignment requirements
│   │   │   │   ├── related-ddrs.md     # → DDR-003
│   │   │   │   ├── done-checklist.md
│   │   │   │   └── ➡️-next.md          # "Next: T03-virtual-memory-manager"
│   │   │   │
│   │   │   ├── T03-virtual-memory-manager/     # 4-level paging, KASLR
│   │   │   │   ├── README.md
│   │   │   │   ├── implementation.md
│   │   │   │   ├── testing.md
│   │   │   │   ├── debugging.md
│   │   │   │   ├── security.md         # SMEP, SMAP, NX enforcement
│   │   │   │   ├── pitfalls.md
│   │   │   │   ├── related-ddrs.md     # → DDR-003
│   │   │   │   ├── done-checklist.md
│   │   │   │   └── ➡️-next.md
│   │   │   │
│   │   │   ├── T04-capability-system/  # Unforgeable token table — the OS security core
│   │   │   │   ├── README.md
│   │   │   │   ├── implementation.md   # Cap table, cap_invoke, intent-based caps
│   │   │   │   ├── testing.md          # Kani harness for cap_lookup, cap_revoke
│   │   │   │   ├── debugging.md
│   │   │   │   ├── security.md         # TOCTOU prevention, CAP_LOCK, atomic check-and-use
│   │   │   │   ├── pitfalls.md         # TOCTOU race — most common cap bug
│   │   │   │   ├── related-ddrs.md     # → DDR-002, DDR-020, DDR-021, DDR-024
│   │   │   │   ├── done-checklist.md
│   │   │   │   └── ➡️-next.md
│   │   │   │
│   │   │   ├── T05-ipc-fastpath/       # Synchronous IPC, zero-copy
│   │   │   │   ├── README.md
│   │   │   │   ├── implementation.md
│   │   │   │   ├── testing.md          # Fuzz target for IPC message parser
│   │   │   │   ├── debugging.md
│   │   │   │   ├── security.md
│   │   │   │   ├── pitfalls.md
│   │   │   │   ├── related-ddrs.md     # → DDR-004
│   │   │   │   ├── done-checklist.md
│   │   │   │   └── ➡️-next.md
│   │   │   │
│   │   │   ├── T06-scheduler-base/     # Basic preemptive scheduler (CPU only at this stage)
│   │   │   │   ├── README.md
│   │   │   │   ├── implementation.md
│   │   │   │   ├── testing.md
│   │   │   │   ├── debugging.md
│   │   │   │   ├── security.md
│   │   │   │   ├── pitfalls.md
│   │   │   │   ├── related-ddrs.md     # → DDR-005
│   │   │   │   ├── done-checklist.md
│   │   │   │   └── ➡️-next.md
│   │   │   │
│   │   │   ├── T07-cosmos-assembler/   # Cosmos Assembler replaces NASM
│   │   │   │   ├── README.md
│   │   │   │   ├── implementation.md
│   │   │   │   ├── testing.md          # Output must be identical to NASM
│   │   │   │   ├── debugging.md
│   │   │   │   ├── pitfalls.md
│   │   │   │   ├── related-ddrs.md     # → DDR-IR, DDR-013
│   │   │   │   ├── done-checklist.md
│   │   │   │   └── ➡️-next.md
│   │   │   │
│   │   │   └── T08-ci-cd-setup/        # CI pipeline: build, test, QEMU boot, Kani
│   │   │       ├── README.md
│   │   │       ├── implementation.md
│   │   │       ├── done-checklist.md
│   │   │       └── ➡️-next.md          # "Next: complete all T0x → check exit-criteria.md"
│   │   │
│   │   ├── integration/                # Notes on how the T0x tasks fit together
│   │   ├── blockers/                   # Active blockers with owner + expected resolution
│   │   ├── known-issues/               # Issues found, not yet fixed
│   │   ├── retrospective.md            # Filled in AFTER phase is complete
│   │   └── ➡️-next-phase.md            # "When exit-criteria.md is fully ✅ → Phase 1"
│   │
│   ├── phase-1-core-being/             ← ⬜ PLANNED — v0.1.x — "The kernel breathes"
│   │   ├── README.md
│   │   ├── goals.md
│   │   ├── ⬅️-entry-requirements.md    # Phase 0 exit-criteria.md must be fully ✅
│   │   ├── exit-criteria.md
│   │   │
│   │   ├── tasks/
│   │   │   ├── T00-process-model/      # fork/exec model, process table
│   │   │   │   ├── README.md
│   │   │   │   ├── implementation.md
│   │   │   │   ├── testing.md
│   │   │   │   ├── debugging.md
│   │   │   │   ├── security.md
│   │   │   │   ├── pitfalls.md
│   │   │   │   ├── related-ddrs.md
│   │   │   │   ├── done-checklist.md
│   │   │   │   └── ➡️-next.md
│   │   │   ├── T01-userspace-drivers/  # virtio-gpu, virtio-net, virtio-blk, virtio-input
│   │   │   ├── T02-vega-filesystem/    # CoW FS, BLAKE3 checksums, atomic writes
│   │   │   ├── T03-network-stack/      # orion-net: TCP/UDP, zero-trust defaults
│   │   │   ├── T04-pulsar-shell/       # Capability-aware shell
│   │   │   ├── T05-comit-package-manager/ # Atomic installs, rollback, capability scoping
│   │   │   └── T06-real-hardware-boot/ # Boot on ≥1 real x86-64 machine
│   │   │
│   │   ├── integration/
│   │   ├── blockers/
│   │   ├── known-issues/
│   │   ├── retrospective.md
│   │   └── ➡️-next-phase.md
│   │
│   ├── phase-2-system-symphony/        ← ⬜ PLANNED — v0.2.x — "Individual notes become a melody"
│   │   ├── README.md
│   │   ├── goals.md
│   │   ├── ⬅️-entry-requirements.md    # Phase 1 exit-criteria.md must be fully ✅
│   │   ├── exit-criteria.md
│   │   │
│   │   ├── tasks/
│   │   │   ├── T00-aurora-compositor/  # Wayland-compatible display compositor
│   │   │   ├── T01-gpu-drivers/        # GPU acceleration, display pipeline
│   │   │   ├── T02-full-disk-encryption/ # orion-cryptod, post-quantum key wrapping
│   │   │   ├── T03-quasar-ai-runtime/  # NPU/TPU/GPU AI runtime
│   │   │   ├── T04-void-audio/         # Audio subsystem
│   │   │   └── T05-nebula-hub-v1/      # Package ecosystem: 100+ packages
│   │   │
│   │   ├── integration/
│   │   ├── blockers/
│   │   ├── retrospective.md
│   │   └── ➡️-next-phase.md
│   │
│   ├── phase-3-user-enlightenment/     ← ⬜ PLANNED — v0.3.x — "Technology adapts to humans"
│   │   ├── README.md
│   │   ├── goals.md
│   │   ├── ⬅️-entry-requirements.md    # Phase 2 exit-criteria.md must be fully ✅
│   │   ├── exit-criteria.md
│   │   │
│   │   ├── tasks/
│   │   │   ├── T00-cosmic-desktop/     # Full desktop environment
│   │   │   ├── T01-window-manager/     # Tiling + floating, capability-gated
│   │   │   ├── T02-wasm-runtime/       # Sandboxed WASM app runtime
│   │   │   ├── T03-accessibility/      # Screen reader, keyboard nav, WCAG AAA
│   │   │   ├── T04-orion-ai-assistant/ # System-wide AI assistant (Quasar-backed)
│   │   │   ├── T05-posix-compat/       # POSIX compatibility layer for Linux apps
│   │   │   └── T06-nebula-hub-v2/      # App Store: 100+ apps
│   │   │
│   │   ├── integration/
│   │   ├── blockers/
│   │   ├── retrospective.md
│   │   └── ➡️-next-phase.md
│   │
│   ├── phase-4-hardware-transcendence/ ← ⬜ PLANNED — v0.4.x — "Hardware is but a vessel"
│   │   ├── README.md
│   │   ├── goals.md
│   │   ├── ⬅️-entry-requirements.md    # Phase 3 exit-criteria.md must be fully ✅
│   │   ├── exit-criteria.md            # Must boot on ALL 5 architectures
│   │   │
│   │   ├── tasks/
│   │   │   ├── T00-arm64-port/         # Raspberry Pi 4 + Apple Silicon (bare metal)
│   │   │   ├── T01-riscv-port/         # SiFive HiFive Unmatched
│   │   │   ├── T02-powerpc-port/       # PowerPC 64LE (Talos II)
│   │   │   ├── T03-loongarch-port/     # LoongArch 3A5000
│   │   │   ├── T04-unified-hal/        # Merge all arch HALs into single interface
│   │   │   └── T05-cross-arch-ci/      # CI: all 5 architectures on every PR
│   │   │
│   │   ├── integration/
│   │   ├── blockers/
│   │   ├── retrospective.md
│   │   └── ➡️-next-phase.md
│   │
│   ├── phase-5-self-realization/       ← ⬜ PLANNED — v0.5.x — "The system builds itself"
│   │   ├── README.md
│   │   ├── goals.md
│   │   ├── ⬅️-entry-requirements.md    # Phase 4 exit-criteria.md must be fully ✅
│   │   ├── exit-criteria.md            # LLVM must be deleted from build system
│   │   │
│   │   ├── bootstrap-stages/           # The B1 → B7 trust chain — strictly sequential
│   │   │   ├── README.md               # Why bootstrap order matters; trust chain explained
│   │   │   ├── B1-host-rust-llvm/      # Gate: QEMU boot passes with host toolchain
│   │   │   │   ├── README.md
│   │   │   │   ├── implementation.md
│   │   │   │   ├── gate-criteria.md    # "QEMU boot passes"
│   │   │   │   └── ➡️-next.md          # "Next: B2"
│   │   │   ├── B2-cosmos-assembler/    # Gate: output identical to NASM
│   │   │   ├── B3-cosmos-linker/       # Gate: output identical to LLD
│   │   │   ├── B4-cosmos-compiler-x86/ # Gate: binary identical to LLVM build
│   │   │   ├── B5-cosmos-compiler-arm64/ # Gate: ARM64 kernel boots
│   │   │   ├── B6-cosmos-compiler-riscv/ # Gate: RISC-V kernel boots
│   │   │   └── B7-llvm-deleted/        # Gate: ALL CI passes without LLVM ← milestone
│   │   │
│   │   ├── validation/
│   │   │   ├── deterministic-builds.md # How to verify reproducibility
│   │   │   ├── binary-diffing.md       # How to diff Cosmos vs LLVM output
│   │   │   └── bootstrap-graphs.md     # Trust graph from B1 to B7
│   │   │
│   │   ├── retrospective.md
│   │   └── ➡️-next-phase.md
│   │
│   └── phase-6-universal-harmony/      ← ⬜ PLANNED — v0.6.0 → 1.0.0 — "Nothing left to remove"
│       ├── README.md
│       ├── goals.md
│       ├── ⬅️-entry-requirements.md    # Phase 5 exit-criteria.md must be fully ✅
│       ├── exit-criteria.md            # = the 1.0.0 release checklist
│       │
│       ├── tasks/
│       │   ├── T00-security-audit/     # External red-team audit
│       │   ├── T01-performance-polish/ # All benchmarks meet targets on all 5 architectures
│       │   ├── T02-localization/       # 10+ language localisations
│       │   ├── T03-installation-media/ # Signed ISO + installer
│       │   └── T04-1.0.0-release/      # Press kit, release notes, 2-of-3 multisig
│       │
│       ├── release-checklist.md        # The final 1.0.0 gate — every line must be ✅
│       └── retrospective.md
│
│
├── 04-engineering/                     ← How we build, test, debug, and verify
│   ├── README.md
│   ├── build-system.md                 # Justfile, cargo xtask, build flags
│   ├── ci-cd.md                        # CI gates table: what runs on every PR
│   ├── cross-compilation.md            # Cross-arch toolchain setup
│   ├── reproducible-builds.md          # How to verify bit-for-bit reproducibility
│   ├── dependency-management.md        # cargo deny, supply chain rules
│   │
│   ├── testing/
│   │   ├── overview.md                 # Test pyramid for Orion OS
│   │   ├── unit-tests.md               # cargo test: what to test, what not to
│   │   ├── integration-tests.md        # Cross-component tests
│   │   ├── kani-formal-verification.md # Kani harness writing guide
│   │   ├── fuzzing.md                  # libFuzzer targets for parsers + syscalls
│   │   └── qemu-boot-tests.md          # Automated QEMU boot test pipeline
│   │
│   ├── debugging/
│   │   ├── qemu-setup.md               # QEMU flags, serial output, GDB server
│   │   ├── gdb-guide.md                # Kernel debugging with GDB + QEMU
│   │   ├── serial-debugging.md         # UART serial output setup
│   │   ├── kernel-panics.md            # How to read and diagnose a panic
│   │   └── performance-analysis.md     # perf, flamegraph, tracing
│   │
│   └── workflows/
│       ├── feature-development.md      # Branch naming, PR flow, review checklist
│       ├── bugfix-flow.md              # Bug triage → fix → regression test
│       └── security-patch-flow.md      # Embargo → fix → coordinated disclosure
│
│
├── 05-security/                        ← Security documentation
│   ├── README.md
│   ├── threat-model.md                 # Who are our adversaries? What do they want?
│   ├── attack-surface.md               # All attack vectors and mitigations
│   ├── capability-security.md          # Deep dive: cap model, delegation, revocation
│   ├── kernel-hardening.md             # SMEP, SMAP, NX, KASLR, stack canaries
│   ├── crypto.md                       # CRYSTALS-Kyber + Dilithium3: why, how, where
│   ├── secure-boot.md                  # Boot chain: TPM PCR → Dilithium3 → kernel
│   ├── memory-safety.md                # No unsafe without justification, Kani coverage
│   ├── sandboxing.md                   # IOMMU, namespace isolation, seccomp equivalent
│   └── vulnerability-management.md     # Disclosure process, CVE policy, hall of fame
│
│
├── 06-performance/                     ← Performance targets, benchmarks, optimization
│   ├── README.md
│   ├── targets.md                      # ALL performance targets by phase (RAM, boot time, fps)
│   ├── boot-performance.md             # Target: &lt;2s boot on reference hardware
│   ├── scheduler-performance.md        # Latency targets for CPU/GPU/NPU scheduling
│   ├── memory-performance.md           # &lt;150MB idle RAM target and measurement
│   ├── profiling.md                    # How to profile kernel and userspace
│   └── benchmarks/                     # Benchmark results committed here per phase
│       ├── README.md
│       └── phase-0-baseline.md         # (filled in when Phase 0 is complete)
│
│
├── 07-community/                       ← Contributing, governance, templates
│   ├── README.md
│   ├── CONTRIBUTING.md                 # Full contributing guide
│   ├── SECURITY.md                     # Vulnerability reporting: security@orionos.dev
│   ├── MAINTAINERS.md                  # Who owns what, how to become a maintainer
│   ├── GOVERNANCE.md                   # Decision-making: DDR → RFC → vote process
│   ├── good-first-issues.md            # 10+ well-defined entry points for new contributors
│   └── templates/
│       ├── bug-report.md               # Template: bug reports
│       ├── pull-request.md             # Template: PRs (empty sections = auto-reject)
│       └── rfc.md                      # Template: RFC proposals
│
│
├── 08-reference/                       ← Technical API + hardware reference
│   ├── README.md
│   ├── syscalls/
│   │   └── all-13-syscalls.md          # Every syscall: signature, caps required, errors
│   ├── kernel-api/                     # Internal kernel API docs
│   ├── driver-api/                     # Userspace driver interface
│   ├── filesystem/                     # Vega FS internals + VFS interface
│   ├── networking/                     # orion-net API + packet filter rules
│   └── hardware/
│       ├── x86-64.md                   # x86-64 specifics: CPUID, MSRs, APIC
│       ├── arm64.md                    # ARM64: GIC, PSCI, device tree
│       └── riscv.md                    # RISC-V: PLIC, SBI, OpenSBI
│
│
└── 09-learn/                           ← Learning resources organized by phase
    ├── README.md
    ├── assembly-primer.md              # x86-64 assembly: enough to write kernel_entry.asm
    ├── rust-no-std-guide.md            # Rust in a no_std kernel context
    ├── phase-0-resources.md            # Books + tutorials for Cosmic Dawn
    ├── phase-1-resources.md
    ├── phase-2-resources.md
    ├── phase-3-resources.md
    ├── phase-4-resources.md
    └── phase-5-resources.md
```

---

## Source Code Structure

```
kernel/                                 # Cosmos microkernel source
├── README.md
├── src/
│   ├── main.rs                         # kernel_main() entry point
│   ├── arch/                           # Architecture-specific code
│   │   ├── x86_64/
│   │   ├── arm64/
│   │   └── riscv/
│   ├── boot/                           # Early boot, GDT, IDT
│   ├── memory/                         # PMM, VMM, heap
│   ├── cap/                            # Capability system
│   ├── ipc/                            # IPC fast path
│   ├── sched/                          # Scheduler (CPU + GPU + NPU)
│   ├── drivers/                        # Minimal in-kernel stubs (IOMMU only)
│   └── hal/                            # Hardware Abstraction Layer
├── tests/                              # Kernel unit + Kani tests
└── benches/                            # Kernel benchmarks

userspace/                              # All userspace services and apps
├── cosmos-init/                        # PID 1 init process
├── vega-fs/                            # Vega FS userspace driver
├── orion-net/                          # Network stack
├── aurora/                             # Display compositor
├── pulsar/                             # Shell
├── comit/                              # Package manager
├── orion-cryptod/                      # Crypto daemon (FDE, key management)
├── quasar/                             # AI runtime
└── nebula-hub/                         # App store client

toolchain/                              # Build toolchain
├── cosmos-assembler/                   # Replaces NASM (Phase B → Phase 0)
├── cosmos-linker/                      # Replaces LLD (Phase 5, stage B3)
└── cosmos-compiler/                    # Replaces LLVM (Phase 5, stages B4-B7)
```

---

## Key Rules (for the README)

| Rule                                                              | Where it's documented                                |
| ----------------------------------------------------------------- | ---------------------------------------------------- |
| Follow task order T00 → TXX within each phase                     | `03-phases/README.md`                                |
| Check `⬅️-entry-requirements.md` before starting a phase          | Each phase folder                                    |
| All tasks have a `➡️-next.md` — always know what's next           | Each task folder                                     |
| DDRs are locked — amend via RFC only                              | `02-architecture/ddrs/README.md`                     |
| Every kernel change needs a Kani harness                          | `04-engineering/testing/kani-formal-verification.md` |
| Every parser/syscall change needs a fuzz target                   | `04-engineering/testing/fuzzing.md`                  |
| Never add `unsafe` without a justification comment                | DDR-022, `00-start-here/coding-standards.md`         |
| Security issues go to security@orionos.dev — never a public issue | `07-community/SECURITY.md`                           |
| 2-of-3 maintainer sign-off on all releases                        | DDR-023                                              |
