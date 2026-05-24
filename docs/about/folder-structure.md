## 🎯 **Documentation Structure**

### **📁 Folder Hierarchy**

```text
orion-docs/
├── about/
│   ├── index.md                     # Main about page (use your about.md)
│   ├── comparison-matrix.md         # Feature & philosophy comparison
│   ├── philosophy.md                # Core principles
│   └── roadmap.md                   # Version roadmap (use your roadmap.md)
│
├── phases/
│   ├── 0-foundation/                # Phase 0: Cosmic Dawn
│   │   ├── index.md                 # Phase overview + philosophy
│   │   ├── resources.md              # Learning materials
│   │   ├── tasks/
│   │   │   ├── bootloader/
│   │   │   │   ├── index.md         # Main task page
│   │   │   │   ├── implementation.md # Step-by-step guide
│   │   │   │   ├── testing.md       # Test cases
│   │   │   │   └── troubleshooting.md # Common issues
│   │   │   ├── kernel-entry/
│   │   │   │   ├── index.md
│   │   │   │   ├── implementation.md
│   │   │   │   ├── testing.md
│   │   │   │   └── troubleshooting.md
│   │   │   └── memory-management/
│   │   │       ├── index.md
│   │   │       ├── implementation.md
│   │   │       ├── testing.md
│   │   │       └── troubleshooting.md
│   │   └── summary.md                # Phase completion checklist
│   │
│   ├── 1-essence/                   # Phase 1: Core Being
│   │   ├── index.md
│   │   ├── resources.md
│   │   ├── tasks/
│   │   │   ├── process-management/
│   │   │   │   ├── index.md
│   │   │   │   ├── implementation.md
│   │   │   │   ├── testing.md
│   │   │   │   └── troubleshooting.md
│   │   │   ├── scheduling/
│   │   │   │   ├── index.md
│   │   │   │   ├── implementation.md
│   │   │   │   ├── testing.md
│   │   │   │   └── troubleshooting.md
│   │   │   └── interrupts/
│   │   │       ├── index.md
│   │   │       ├── implementation.md
│   │   │       ├── testing.md
│   │   │       └── troubleshooting.md
│   │   └── summary.md
│   │
│   ├── 2-harmony/                   # Phase 2: System Symphony
│   │   ├── index.md
│   │   ├── resources.md
│   │   ├── tasks/
│   │   │   ├── device-drivers/
│   │   │   │   ├── index.md
│   │   │   │   ├── implementation.md
│   │   │   │   ├── testing.md
│   │   │   │   └── troubleshooting.md
│   │   │   ├── filesystem.md
│   │   │   └── networking.md
│   │   └── summary.md
│   │
│   ├── 3-awakening/                 # Phase 3: User Enlightenment
│   │   ├── index.md
│   │   ├── resources.md
│   │   ├── tasks/
│   │   │   ├── shell/
│   │   │   │   ├── index.md
│   │   │   │   ├── implementation.md
│   │   │   │   ├── testing.md
│   │   │   │   └── troubleshooting.md
│   │   │   ├── syscalls.md
│   │   │   └── user-libraries.md
│   │   └── summary.md
│   │
│   ├── 4-unification/               # Phase 4: Hardware Transcendence
│   │   ├── index.md
│   │   ├── resources.md
│   │   ├── tasks/
│   │   │   ├── multiarch-support/
│   │   │   │   ├── index.md
│   │   │   │   ├── x86.md
│   │   │   │   ├── arm64.md
│   │   │   │   ├── riscv.md
│   │   │   │   ├── testing.md
│   │   │   │   └── troubleshooting.md
│   │   │   └── hardware-abstraction.md
│   │   └── summary.md
│   │
│   ├── 5-evolution/
│   │   ├── index.md
│   │   ├── roadmap.md
│   │   ├── architecture.md
│   │   ├── resources.md
│   │   ├── bootstrap/
│   ├── shared/
│   │   ├── build-system.md
│   │   ├── ir-spec.md
│   │   ├── abi.md
│   │   ├── object-format.md
│   │   └── reproducibility.md
│       │
│   │   ├── b1-host-rust-llvm/
│   │   ├── b2-cosmos-assembler/
│   │   ├── b3-cosmos-linker/
│   │   ├── b4-cosmos-compiler-x86/
│   │   ├── b5-cosmos-compiler-arm64/
│   │   ├── b6-cosmos-compiler-riscv/
│   │   └── b7-self-hosting/
│   │
│   ├── validation/
│   │   ├── deterministic-builds/
│   │   ├── bootstrap-graphs/
│   │   ├── binary-diffing/
│   │   └── performance/
│   │
│   └── summary.md
│
│   └── 6-cosmos/                    # Phase 6: Universal Harmony
│       ├── index.md
│       ├── resources.md
│       ├── tasks/
│       │   ├── ecosystem/
│       │   │   ├── index.md
│       │   │   ├── implementation.md
│       │   │   ├── testing.md
│       │   │   └── troubleshooting.md
│       │   ├── packaging.md
│       │   └── community.md
│       └── summary.md
│
├── architecture/
│   ├── ddrs/                        # All DDRs
│   │   ├── ddr-001.md
│   │   └── ...
│   ├── diagrams/                    # Mermaid/Excalidraw
│   │   ├── boot-process.mmd
│   │   ├── memory-layout.mmd
│   │   └── capability-model.mmd
│   └── problem-solution.md          # Living dashboard (use your problem-solution.md)
│
├── develop/
│   ├── workflow.md                  # Team processes
│   ├── best-practices/
│   │   ├── coding.md               # General coding standards
│   │   ├── security.md              # Security guidelines
│   │   └── testing.md               # Testing strategies
│   └── tools/
│       ├── qemu.md                  # QEMU setup
│       ├── gdb.md                   # Debugging guide
│       └── kani.md                  # Formal verification
│
└── reference/
    ├── api/
    │   ├── kernel.md                # Kernel syscalls
    │   ├── userspace.md             # Userspace APIs
    │   └── drivers.md               # Driver interfaces
    ├── security/
    │   ├── threat-model.md          # Threat model
    │   ├── mitigations.md            # Security mitigations
    │   └── crypto.md                # Cryptography standards
    └── hardware/
        ├── x86.md                   # x86-specific docs
        ├── arm64.md                 # ARM64-specific docs
        └── riscv.md                 # RISC-V-specific docs

```

```
orion/
├── README.md                                # Project entry point
├── CONTRIBUTING.md
├── CODE_OF_CONDUCT.md
├── LICENSE
├── SECURITY.md
├── GOVERNANCE.md
├── ROADMAP.md
├── CHANGELOG.md
├── VERSIONING.md
├── RELEASES.md
├── glossary.md
├── timeline.md
│
├── docs/
│   │
│   ├── 00-start-here/                       # Mandatory onboarding path
│   │   ├── README.md
│   │   ├── vision.md
│   │   ├── architecture-overview.md
│   │   ├── philosophy.md
│   │   ├── terminology.md
│   │   ├── repository-layout.md
│   │   ├── development-flow.md
│   │   ├── contribution-flow.md
│   │   ├── documentation-rules.md
│   │   ├── coding-standards.md
│   │   ├── testing-standards.md
│   │   ├── security-principles.md
│   │   ├── debugging-workflow.md
│   │   ├── branch-strategy.md
│   │   ├── review-process.md
│   │   ├── ci-cd-overview.md
│   │   ├── release-process.md
│   │   └── how-to-read-this-project.md
│   │
│   ├── 01-project/
│   │   ├── vision/
│   │   ├── philosophy/
│   │   ├── comparisons/
│   │   ├── roadmap/
│   │   ├── milestones/
│   │   ├── releases/
│   │   └── long-term-goals/
│   │
│   ├── 02-architecture/
│   │   │
│   │   ├── overview/
│   │   │   ├── kernel-architecture.md
│   │   │   ├── userspace-architecture.md
│   │   │   ├── driver-model.md
│   │   │   ├── security-architecture.md
│   │   │   ├── memory-model.md
│   │   │   ├── boot-flow.md
│   │   │   ├── process-model.md
│   │   │   ├── filesystem-architecture.md
│   │   │   ├── network-architecture.md
│   │   │   └── toolchain-architecture.md
│   │   │
│   │   ├── specifications/
│   │   │   ├── syscall-abi.md
│   │   │   ├── executable-format.md
│   │   │   ├── object-format.md
│   │   │   ├── vfs-spec.md
│   │   │   ├── driver-api.md
│   │   │   ├── ipc-spec.md
│   │   │   ├── scheduler-spec.md
│   │   │   ├── capability-model.md
│   │   │   ├── memory-layout.md
│   │   │   ├── loader-spec.md
│   │   │   └── ddr-ir-spec.md
│   │   │
│   │   ├── diagrams/
│   │   │   ├── boot/
│   │   │   ├── memory/
│   │   │   ├── scheduler/
│   │   │   ├── networking/
│   │   │   ├── filesystem/
│   │   │   ├── userspace/
│   │   │   └── toolchain/
│   │   │
│   │   ├── decisions/                      # DDRs / ADRs
│   │   │   ├── README.md
│   │   │   ├── template.md
│   │   │   │
│   │   │   ├── proposed/
│   │   │   ├── accepted/
│   │   │   ├── deprecated/
│   │   │   ├── superseded/
│   │   │   ├── rejected/
│   │   │   └── archived/
│   │   │
│   │   ├── rfcs/                           # Request For Comments
│   │   │   ├── README.md
│   │   │   ├── template.md
│   │   │   │
│   │   │   ├── draft/
│   │   │   ├── review/
│   │   │   ├── accepted/
│   │   │   ├── implemented/
│   │   │   ├── rejected/
│   │   │   └── withdrawn/
│   │   │
│   │   └── research/
│   │       ├── experiments/
│   │       ├── benchmarks/
│   │       ├── alternatives/
│   │       └── feasibility/
│   │
│   ├── 03-engineering/
│   │   │
│   │   ├── workflows/
│   │   │   ├── feature-development.md
│   │   │   ├── bugfix-flow.md
│   │   │   ├── release-flow.md
│   │   │   ├── kernel-patch-flow.md
│   │   │   ├── emergency-fix-flow.md
│   │   │   ├── security-patch-flow.md
│   │   │   └── documentation-flow.md
│   │   │
│   │   ├── build-system/
│   │   │   ├── overview.md
│   │   │   ├── bootstrap.md
│   │   │   ├── cross-compilation.md
│   │   │   ├── reproducible-builds.md
│   │   │   ├── dependency-management.md
│   │   │   └── ci-pipeline.md
│   │   │
│   │   ├── testing/
│   │   │   ├── unit-tests.md
│   │   │   ├── integration-tests.md
│   │   │   ├── kernel-tests.md
│   │   │   ├── userspace-tests.md
│   │   │   ├── fuzzing.md
│   │   │   ├── property-testing.md
│   │   │   ├── stress-testing.md
│   │   │   ├── regression-testing.md
│   │   │   └── hardware-validation.md
│   │   │
│   │   ├── debugging/
│   │   │   ├── qemu.md
│   │   │   ├── bochs.md
│   │   │   ├── gdb.md
│   │   │   ├── serial-debugging.md
│   │   │   ├── tracing.md
│   │   │   ├── kernel-panics.md
│   │   │   ├── crash-dumps.md
│   │   │   └── performance-analysis.md
│   │   │
│   │   ├── verification/
│   │   │   ├── formal-methods.md
│   │   │   ├── kani.md
│   │   │   ├── loom.md
│   │   │   ├── model-checking.md
│   │   │   └── static-analysis.md
│   │   │
│   │   └── metrics/
│   │       ├── performance.md
│   │       ├── reliability.md
│   │       ├── coverage.md
│   │       └── security.md
│   │
│   ├── 04-development/
│   │   │
│   │   ├── phases/
│   │   │   │
│   │   │   ├── 00-foundation/
│   │   │   │   ├── README.md
│   │   │   │   ├── goals.md
│   │   │   │   ├── milestones.md
│   │   │   │   ├── dependencies.md
│   │   │   │   ├── validation.md
│   │   │   │   ├── completion-checklist.md
│   │   │   │   │
│   │   │   │   ├── tasks/
│   │   │   │   │   ├── 0001-bootloader/
│   │   │   │   │   │   ├── README.md
│   │   │   │   │   │   ├── objectives.md
│   │   │   │   │   │   ├── architecture.md
│   │   │   │   │   │   ├── implementation.md
│   │   │   │   │   │   ├── testing.md
│   │   │   │   │   │   ├── debugging.md
│   │   │   │   │   │   ├── security.md
│   │   │   │   │   │   ├── benchmarks.md
│   │   │   │   │   │   ├── validation.md
│   │   │   │   │   │   ├── dependencies.md
│   │   │   │   │   │   ├── next-steps.md
│   │   │   │   │   │   ├── related-ddrs.md
│   │   │   │   │   │   ├── related-rfcs.md
│   │   │   │   │   │   ├── troubleshooting.md
│   │   │   │   │   │   └── completion-checklist.md
│   │   │   │   │   │
│   │   │   │   │   ├── 0002-kernel-entry/
│   │   │   │   │   ├── 0003-memory-management/
│   │   │   │   │   ├── 0004-interrupts/
│   │   │   │   │   └── 0005-paging/
│   │   │   │   │
│   │   │   │   ├── integration/
│   │   │   │   ├── blockers/
│   │   │   │   ├── known-issues/
│   │   │   │   └── retrospective.md
│   │   │   │
│   │   │   ├── 01-core/
│   │   │   ├── 02-platform/
│   │   │   ├── 03-userspace/
│   │   │   ├── 04-multiarch/
│   │   │   ├── 05-self-hosting/
│   │   │   └── 06-ecosystem/
│   │   │
│   │   ├── active-work/
│   │   │   ├── current-sprint.md
│   │   │   ├── active-tasks.md
│   │   │   ├── blockers.md
│   │   │   ├── ownership.md
│   │   │   └── priorities.md
│   │   │
│   │   └── onboarding/
│   │       ├── new-contributor.md
│   │       ├── first-task.md
│   │       ├── local-development.md
│   │       ├── build-environment.md
│   │       └── debugging-setup.md
│   │
│   ├── 05-security/
│   │   ├── threat-model.md
│   │   ├── attack-surface.md
│   │   ├── memory-safety.md
│   │   ├── sandboxing.md
│   │   ├── kernel-hardening.md
│   │   ├── secure-boot.md
│   │   ├── crypto.md
│   │   ├── permissions.md
│   │   ├── capabilities.md
│   │   └── vulnerability-management.md
│   │
│   ├── 06-performance/
│   │   ├── boot-performance.md
│   │   ├── scheduler-performance.md
│   │   ├── memory-performance.md
│   │   ├── io-performance.md
│   │   ├── profiling.md
│   │   ├── benchmarks/
│   │   └── optimization-guidelines.md
│   │
│   ├── 07-reference/
│   │   ├── syscalls/
│   │   ├── drivers/
│   │   ├── kernel-api/
│   │   ├── userspace-api/
│   │   ├── filesystems/
│   │   ├── networking/
│   │   ├── boot/
│   │   ├── hardware/
│   │   └── toolchain/
│   │
│   ├── 08-labs/
│   │   ├── experimental-kernels/
│   │   ├── microkernel/
│   │   ├── capability-security/
│   │   ├── distributed-kernel/
│   │   ├── wasm-runtime/
│   │   └── research-notes/
│   │
│   └── 09-archive/
│       ├── deprecated/
│       ├── abandoned-designs/
│       ├── rejected-features/
│       ├── historical-builds/
│       ├── migration-notes/
│       └── superseded-docs/
│
├── kernel/
│   ├── README.md
│   ├── arch/
│   ├── boot/
│   ├── memory/
│   ├── scheduler/
│   ├── drivers/
│   ├── fs/
│   ├── net/
│   ├── security/
│   ├── userspace/
│   └── tests/
│
├── userspace/
├── toolchain/
├── scripts/
├── tests/
├── benchmarks/
├── examples/
└── third_party/
```

```
orion-docs/
├── index.md                                  # Site root — links to all sections
│
├── about/
│   ├── index.md                              # about.md — full project reference
│   ├── getting-started.md                    # Quick Start from Vol 0 §2 (QEMU boot)
│   ├── personas.md                           # Vol 0 §1 — 5 user personas
│   ├── philosophy.md                         # Vol 1 + Vol 5 — core principles
│   ├── eco-advantage.md                      # Vol 1 §1.2 — sustainability story
│   ├── comparison-matrix.md                  # Vol 1 + Vol 8 — OS comparison tables
│   ├── space-naming.md                       # about.md §11 — naming system
│   ├── version-guide.md                      # about.md §13 — version system + stability
│   └── roadmap.md                            # roadmap.md — 7-phase roadmap
│
├── phases/
│   ├── 0-cosmic-dawn/
│   │   ├── index.md                          # Phase 0 overview
│   │   ├── resources.md
│   │   ├── tasks/
│   │   │   ├── bootloader/
│   │   │   │   ├── index.md
│   │   │   │   ├── implementation.md
│   │   │   │   ├── testing.md
│   │   │   │   └── troubleshooting.md
│   │   │   │
│   │   │   ├── kernel-entry/
│   │   │   │   ├── index.md
│   │   │   │   ├── implementation.md
│   │   │   │   ├── testing.md
│   │   │   │   └── troubleshooting.md
│   │   │   │
│   │   │   ├── physical-memory-manager/
│   │   │   │   ├── index.md
│   │   │   │   ├── implementation.md
│   │   │   │   ├── testing.md
│   │   │   │   └── troubleshooting.md
│   │   │   │
│   │   │   ├── virtual-memory-manager/
│   │   │   │   ├── index.md
│   │   │   │   ├── implementation.md
│   │   │   │   ├── testing.md
│   │   │   │   └── troubleshooting.md
│   │   │   │
│   │   │   ├── capability-system/
│   │   │   │   ├── index.md
│   │   │   │   ├── implementation.md
│   │   │   │   ├── testing.md
│   │   │   │   └── troubleshooting.md
│   │   │   │
│   │   │   ├── ipc-fast-path/
│   │   │   │   ├── index.md
│   │   │   │   ├── implementation.md
│   │   │   │   ├── testing.md
│   │   │   │   └── troubleshooting.md
│   │   │   │
│   │   │   ├── scheduler-core/
│   │   │   │   ├── index.md
│   │   │   │   ├── implementation.md
│   │   │   │   ├── testing.md
│   │   │   │   └── troubleshooting.md
│   │   │   │
│   │   │   └── cosmos-assembler/
│   │   │       ├── index.md
│   │   │       ├── implementation.md
│   │   │       ├── testing.md
│   │   │       └── troubleshooting.md
│   │   │
│   │   └── summary.md
│   │
│   ├── 1-core-being/
│   │   ├── index.md
│   │   ├── resources.md
│   │   ├── tasks/
│   │   │   ├── process-model/
│   │   │   ├── userspace-drivers/
│   │   │   ├── vega-fs/
│   │   │   ├── networking/
│   │   │   ├── pulsar-shell/
│   │   │   └── comit-package-manager/
│   │   └── summary.md
│   │
│   ├── 2-system-symphony/
│   │   ├── index.md
│   │   ├── resources.md
│   │   ├── tasks/
│   │   │   ├── aurora-compositor/
│   │   │   ├── gpu-npu-tpu-drivers/
│   │   │   ├── security-hardening/
│   │   │   ├── quasar-ai-runtime/
│   │   │   └── void-audio-server/
│   │   └── summary.md
│   │
│   ├── 3-user-enlightenment/
│   │   ├── index.md
│   │   ├── resources.md
│   │   ├── tasks/
│   │   │   ├── cosmic-desktop/
│   │   │   ├── wasm-app-runtime/
│   │   │   ├── accessibility/
│   │   │   └── posix-sandbox/
│   │   └── summary.md
│   │
│   ├── 4-hardware-transcendence/
│   │   ├── index.md
│   │   ├── resources.md
│   │   ├── tasks/
│   │   │   ├── arm64-port/
│   │   │   ├── riscv-port/
│   │   │   ├── powerpc-loongarch-port/
│   │   │   └── hardware-abstraction/
│   │   └── summary.md
│   │
│   ├── 5-self-realization/
│   │   ├── index.md
│   │   ├── resources.md
│   │   ├── bootstrap/
│   │   │   ├── b1-host-rust-llvm/
│   │   │   ├── b2-cosmos-assembler/
│   │   │   ├── b3-cosmos-linker/
│   │   │   ├── b4-cosmos-compiler-x86/
│   │   │   ├── b5-cosmos-compiler-arm64/
│   │   │   ├── b6-cosmos-compiler-riscv/
│   │   │   └── b7-llvm-deleted/
│   │   └── summary.md
│   │
│   └── 6-universal-harmony/
│       ├── index.md
│       ├── resources.md
│       ├── tasks/
│       │   ├── security-audit/
│       │   ├── packaging-ecosystem/
│       │   └── community-release/
│       └── summary.md
│
├── architecture/
│   ├── index.md
│   ├── overview.md
│   │
│   ├── ddrs/
│   │   ├── index.md
│   │   ├── ddr-001.md
│   │   ├── ddr-002.md
│   │   ├── ddr-003.md
│   │   ├── ddr-004.md
│   │   ├── ddr-005.md
│   │   ├── ddr-006.md
│   │   ├── ddr-007.md
│   │   ├── ddr-008.md
│   │   ├── ddr-009.md
│   │   ├── ddr-010.md
│   │   ├── ddr-011.md
│   │   ├── ddr-012.md
│   │   ├── ddr-013.md
│   │   ├── ddr-014.md
│   │   ├── ddr-015.md
│   │   ├── ddr-016.md
│   │   ├── ddr-017.md
│   │   ├── ddr-018.md
│   │   ├── ddr-019.md
│   │   ├── ddr-020.md
│   │   ├── ddr-021.md
│   │   ├── ddr-022.md
│   │   ├── ddr-023.md
│   │   ├── ddr-024.md
│   │   ├── ddr-025.md
│   │   ├── ddr-026.md
│   │   ├── ddr-027.md
│   │   ├── ddr-028.md
│   │   ├── ddr-029.md
│   │   ├── ddr-hal.md
│   │   ├── ddr-ir.md
│   │   ├── ddr-init.md
│   │   ├── ddr-vfs.md
│   │   ├── ddr-pf.md
│   │   ├── ddr-compositor.md
│   │   ├── ddr-audio.md
│   │   ├── ddr-comit.md
│   │   ├── ddr-posix.md
│   │   └── ddr-fde.md
│   │
│   ├── diagrams/
│   │   ├── boot-process.mmd
│   │   ├── memory-layout.mmd
│   │   ├── capability-model.mmd
│   │   ├── scheduler-dispatch.mmd
│   │   ├── ipc-fast-path.mmd
│   │   ├── driver-model.mmd
│   │   ├── system-stack.mmd
│   │   ├── cosmos-compiler-bootstrap.mmd
│   │   └── vega-fs-structure.mmd
│   │
│   └── problem-solution.md
│
├── develop/
│   ├── index.md
│   ├── workflow.md
│   ├── first-30-days.md
│   ├── glossary.md
│   │
│   ├── best-practices/
│   │   ├── coding.md
│   │   ├── security.md
│   │   ├── testing.md
│   │   └── error-handling.md
│   │
│   └── tools/
│       ├── index.md
│       ├── environment-setup.md
│       ├── qemu.md
│       ├── gdb.md
│       ├── kani.md
│       ├── miri.md
│       ├── cargo-fuzz.md
│       ├── cargo-deny.md
│       ├── raspberry-pi-4.md
│       └── perf-flamegraph.md
│
├── reference/
│   ├── api/
│   │   ├── syscalls.md
│   │   ├── capability-api.md
│   │   ├── userspace.md
│   │   └── drivers.md
│   │
│   ├── security/
│   │   ├── threat-model.md
│   │   ├── capability-model.md
│   │   ├── mitigations.md
│   │   ├── crypto.md
│   │   └── supply-chain.md
│   │
│   └── hardware/
│       ├── x86-64.md
│       ├── arm64.md
│       └── riscv.md
│
├── community/
│   ├── index.md
│   ├── contributing.md
│   ├── maintainers.md
│   ├── security-policy.md
│   ├── code-of-conduct.md
│   ├── cla.md
│   │
│   ├── templates/
│   │   ├── bug-report.md
│   │   ├── pull-request.md
│   │   └── rfc.md
│   │
│   └── good-first-issues.md
│
├── learn/
│   ├── index.md
│   ├── stage-0-programming.md
│   │
│   ├── books/
│   │   ├── phase-0.md
│   │   ├── phase-1.md
│   │   ├── phase-2.md
│   │   └── phase-3.md
│   │
│   └── tutorials/
│       ├── write-a-virtio-driver.md
│       ├── kani-harness-guide.md
│       ├── x86-assembly-primer.md
│       └── os-comparison-lessons.md
│
└── assets/
    ├── css/
    │   └── custom.css
    │
    └── js/
        └── progress.js
```
