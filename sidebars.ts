import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    'index',
    {
      type: 'category',
      label: 'About',
      items: [
        'about/index',
        'about/folder-structure',
        'about/getting-started',
        'about/personas',
        'about/philosophy',
        'about/market-gap',
        'about/eco-advantage',
        'about/comparison-matrix',
        'about/space-naming',
        'about/version-guide',
        'about/roadmap',
      ],
    },
    {
      type: 'category',
      label: 'Phases',
      items: [
        {
          type: 'category',
          label: 'Phase 0: Cosmic Dawn',
          items: [
            'phases/cosmic-dawn/index',
            'phases/cosmic-dawn/resources',
            {
              type: 'category',
              label: 'Tasks',
              items: [
                {
                  type: 'category',
                  label: 'Bootloader',
                  items: [
                    'phases/cosmic-dawn/tasks/bootloader/index',
                    'phases/cosmic-dawn/tasks/bootloader/implementation',
                    'phases/cosmic-dawn/tasks/bootloader/testing',
                    'phases/cosmic-dawn/tasks/bootloader/troubleshooting',
                  ],
                },
                {
                  type: 'category',
                  label: 'Kernel Entry',
                  items: [
                    'phases/cosmic-dawn/tasks/kernel-entry/index',
                    'phases/cosmic-dawn/tasks/kernel-entry/implementation',
                    'phases/cosmic-dawn/tasks/kernel-entry/testing',
                    'phases/cosmic-dawn/tasks/kernel-entry/troubleshooting',
                  ],
                },
                {
                  type: 'category',
                  label: 'Physical Memory Manager',
                  items: [
                    'phases/cosmic-dawn/tasks/physical-memory-manager/index',
                    'phases/cosmic-dawn/tasks/physical-memory-manager/implementation',
                    'phases/cosmic-dawn/tasks/physical-memory-manager/testing',
                    'phases/cosmic-dawn/tasks/physical-memory-manager/troubleshooting',
                  ],
                },
                {
                  type: 'category',
                  label: 'Virtual Memory Manager',
                  items: [
                    'phases/cosmic-dawn/tasks/virtual-memory-manager/index',
                    'phases/cosmic-dawn/tasks/virtual-memory-manager/implementation',
                    'phases/cosmic-dawn/tasks/virtual-memory-manager/testing',
                    'phases/cosmic-dawn/tasks/virtual-memory-manager/troubleshooting',
                  ],
                },
                {
                  type: 'category',
                  label: 'Capability System',
                  items: [
                    'phases/cosmic-dawn/tasks/capability-system/index',
                    'phases/cosmic-dawn/tasks/capability-system/implementation',
                    'phases/cosmic-dawn/tasks/capability-system/testing',
                    'phases/cosmic-dawn/tasks/capability-system/troubleshooting',
                  ],
                },
                {
                  type: 'category',
                  label: 'IPC Fast Path',
                  items: [
                    'phases/cosmic-dawn/tasks/ipc-fast-path/index',
                    'phases/cosmic-dawn/tasks/ipc-fast-path/implementation',
                    'phases/cosmic-dawn/tasks/ipc-fast-path/testing',
                    'phases/cosmic-dawn/tasks/ipc-fast-path/troubleshooting',
                  ],
                },
                {
                  type: 'category',
                  label: 'Scheduler Core',
                  items: [
                    'phases/cosmic-dawn/tasks/scheduler-core/index',
                    'phases/cosmic-dawn/tasks/scheduler-core/implementation',
                    'phases/cosmic-dawn/tasks/scheduler-core/testing',
                    'phases/cosmic-dawn/tasks/scheduler-core/troubleshooting',
                  ],
                },
                {
                  type: 'category',
                  label: 'Cosmos Assembler',
                  items: [
                    'phases/cosmic-dawn/tasks/cosmos-assembler/index',
                    'phases/cosmic-dawn/tasks/cosmos-assembler/implementation',
                    'phases/cosmic-dawn/tasks/cosmos-assembler/testing',
                    'phases/cosmic-dawn/tasks/cosmos-assembler/troubleshooting',
                  ],
                },
              ],
            },
            'phases/cosmic-dawn/summary',
          ],
        },
        {
          type: 'category',
          label: 'Phase 1: Core Being',
          items: [
            'phases/core-being/index',
            'phases/core-being/resources',
            {
              type: 'category',
              label: 'Tasks',
              items: [
                {
                  type: 'category',
                  label: 'Process Model',
                  items: [
                    'phases/core-being/tasks/process-model/index',
                    'phases/core-being/tasks/process-model/implementation',
                    'phases/core-being/tasks/process-model/testing',
                    'phases/core-being/tasks/process-model/troubleshooting',
                  ],
                },
                {
                  type: 'category',
                  label: 'Userspace Drivers',
                  items: [
                    'phases/core-being/tasks/userspace-drivers/index',
                    'phases/core-being/tasks/userspace-drivers/implementation',
                    'phases/core-being/tasks/userspace-drivers/testing',
                    'phases/core-being/tasks/userspace-drivers/troubleshooting',
                  ],
                },
                {
                  type: 'category',
                  label: 'Vega FS',
                  items: [
                    'phases/core-being/tasks/vega-fs/index',
                    'phases/core-being/tasks/vega-fs/implementation',
                    'phases/core-being/tasks/vega-fs/testing',
                    'phases/core-being/tasks/vega-fs/troubleshooting',
                  ],
                },
                {
                  type: 'category',
                  label: 'Networking',
                  items: [
                    'phases/core-being/tasks/networking/index',
                    'phases/core-being/tasks/networking/implementation',
                    'phases/core-being/tasks/networking/testing',
                    'phases/core-being/tasks/networking/troubleshooting',
                  ],
                },
                {
                  type: 'category',
                  label: 'Pulsar Shell',
                  items: [
                    'phases/core-being/tasks/pulsar-shell/index',
                    'phases/core-being/tasks/pulsar-shell/implementation',
                    'phases/core-being/tasks/pulsar-shell/testing',
                    'phases/core-being/tasks/pulsar-shell/troubleshooting',
                  ],
                },
                {
                  type: 'category',
                  label: 'Comit Package Manager',
                  items: [
                    'phases/core-being/tasks/comit-package-manager/index',
                    'phases/core-being/tasks/comit-package-manager/implementation',
                    'phases/core-being/tasks/comit-package-manager/testing',
                    'phases/core-being/tasks/comit-package-manager/troubleshooting',
                  ],
                },
              ],
            },
            'phases/core-being/summary',
          ],
        },
        {
          type: 'category',
          label: 'Phase 2: System Symphony',
          items: [
            'phases/system-symphony/index',
            'phases/system-symphony/resources',
            {
              type: 'category',
              label: 'Tasks',
              items: [
                {
                  type: 'category',
                  label: 'Aurora Compositor',
                  items: [
                    'phases/system-symphony/tasks/aurora-compositor/index',
                    'phases/system-symphony/tasks/aurora-compositor/implementation',
                    'phases/system-symphony/tasks/aurora-compositor/testing',
                    'phases/system-symphony/tasks/aurora-compositor/troubleshooting',
                  ],
                },
                {
                  type: 'category',
                  label: 'GPU/NPU/TPU Drivers',
                  items: [
                    'phases/system-symphony/tasks/gpu-npu-tpu-drivers/index',
                    'phases/system-symphony/tasks/gpu-npu-tpu-drivers/implementation',
                    'phases/system-symphony/tasks/gpu-npu-tpu-drivers/testing',
                    'phases/system-symphony/tasks/gpu-npu-tpu-drivers/troubleshooting',
                  ],
                },
                {
                  type: 'category',
                  label: 'Security Hardening',
                  items: [
                    'phases/system-symphony/tasks/security-hardening/index',
                    'phases/system-symphony/tasks/security-hardening/implementation',
                    'phases/system-symphony/tasks/security-hardening/testing',
                    'phases/system-symphony/tasks/security-hardening/troubleshooting',
                  ],
                },
                {
                  type: 'category',
                  label: 'Quasar AI Runtime',
                  items: [
                    'phases/system-symphony/tasks/quasar-ai-runtime/index',
                    'phases/system-symphony/tasks/quasar-ai-runtime/implementation',
                    'phases/system-symphony/tasks/quasar-ai-runtime/testing',
                    'phases/system-symphony/tasks/quasar-ai-runtime/troubleshooting',
                  ],
                },
                {
                  type: 'category',
                  label: 'Void Audio Server',
                  items: [
                    'phases/system-symphony/tasks/void-audio-server/index',
                    'phases/system-symphony/tasks/void-audio-server/implementation',
                    'phases/system-symphony/tasks/void-audio-server/testing',
                    'phases/system-symphony/tasks/void-audio-server/troubleshooting',
                  ],
                },
              ],
            },
            'phases/system-symphony/summary',
          ],
        },
        {
          type: 'category',
          label: 'Phase 3: User Enlightenment',
          items: [
            'phases/user-enlightenment/index',
            'phases/user-enlightenment/resources',
            {
              type: 'category',
              label: 'Tasks',
              items: [
                {
                  type: 'category',
                  label: 'Cosmic Desktop',
                  items: [
                    'phases/user-enlightenment/tasks/cosmic-desktop/index',
                    'phases/user-enlightenment/tasks/cosmic-desktop/implementation',
                    'phases/user-enlightenment/tasks/cosmic-desktop/testing',
                    'phases/user-enlightenment/tasks/cosmic-desktop/troubleshooting',
                  ],
                },
                {
                  type: 'category',
                  label: 'WASM App Runtime',
                  items: [
                    'phases/user-enlightenment/tasks/wasm-app-runtime/index',
                    'phases/user-enlightenment/tasks/wasm-app-runtime/implementation',
                    'phases/user-enlightenment/tasks/wasm-app-runtime/testing',
                    'phases/user-enlightenment/tasks/wasm-app-runtime/troubleshooting',
                  ],
                },
                {
                  type: 'category',
                  label: 'Accessibility',
                  items: [
                    'phases/user-enlightenment/tasks/accessibility/index',
                    'phases/user-enlightenment/tasks/accessibility/implementation',
                    'phases/user-enlightenment/tasks/accessibility/testing',
                    'phases/user-enlightenment/tasks/accessibility/troubleshooting',
                  ],
                },
                {
                  type: 'category',
                  label: 'POSIX Sandbox',
                  items: [
                    'phases/user-enlightenment/tasks/posix-sandbox/index',
                    'phases/user-enlightenment/tasks/posix-sandbox/implementation',
                    'phases/user-enlightenment/tasks/posix-sandbox/testing',
                    'phases/user-enlightenment/tasks/posix-sandbox/troubleshooting',
                  ],
                },
              ],
            },
            'phases/user-enlightenment/summary',
          ],
        },
        {
          type: 'category',
          label: 'Phase 4: Hardware Transcendence',
          items: [
            'phases/hardware-transcendence/index',
            'phases/hardware-transcendence/resources',
            {
              type: 'category',
              label: 'Tasks',
              items: [
                {
                  type: 'category',
                  label: 'ARM64 Port',
                  items: [
                    'phases/hardware-transcendence/tasks/arm64-port/index',
                    'phases/hardware-transcendence/tasks/arm64-port/implementation',
                    'phases/hardware-transcendence/tasks/arm64-port/testing',
                    'phases/hardware-transcendence/tasks/arm64-port/troubleshooting',
                  ],
                },
                {
                  type: 'category',
                  label: 'RISC-V Port',
                  items: [
                    'phases/hardware-transcendence/tasks/riscv-port/index',
                    'phases/hardware-transcendence/tasks/riscv-port/implementation',
                    'phases/hardware-transcendence/tasks/riscv-port/testing',
                    'phases/hardware-transcendence/tasks/riscv-port/troubleshooting',
                  ],
                },
                {
                  type: 'category',
                  label: 'PowerPC/LoongArch Port',
                  items: [
                    'phases/hardware-transcendence/tasks/powerpc-loongarch-port/index',
                    'phases/hardware-transcendence/tasks/powerpc-loongarch-port/implementation',
                    'phases/hardware-transcendence/tasks/powerpc-loongarch-port/testing',
                    'phases/hardware-transcendence/tasks/powerpc-loongarch-port/troubleshooting',
                  ],
                },
                {
                  type: 'category',
                  label: 'Hardware Abstraction',
                  items: [
                    'phases/hardware-transcendence/tasks/hardware-abstraction/index',
                    'phases/hardware-transcendence/tasks/hardware-abstraction/implementation',
                    'phases/hardware-transcendence/tasks/hardware-abstraction/testing',
                    'phases/hardware-transcendence/tasks/hardware-abstraction/troubleshooting',
                  ],
                },
              ],
            },
            'phases/hardware-transcendence/summary',
          ],
        },
        {
          type: 'category',
          label: 'Phase 5: Self-Realization',
          items: [
            'phases/self-realization/index',
            'phases/self-realization/resources',
            {
              type: 'category',
              label: 'Bootstrap',
              items: [
                {
                  type: 'category',
                  label: 'B1: Host Rust + LLVM',
                  items: [
                    'phases/self-realization/bootstrap/b1-host-rust-llvm/index',
                    'phases/self-realization/bootstrap/b1-host-rust-llvm/implementation',
                    'phases/self-realization/bootstrap/b1-host-rust-llvm/testing',
                    'phases/self-realization/bootstrap/b1-host-rust-llvm/troubleshooting',
                  ],
                },
                {
                  type: 'category',
                  label: 'B2: Cosmos Assembler',
                  items: [
                    'phases/self-realization/bootstrap/b2-cosmos-assembler/index',
                    'phases/self-realization/bootstrap/b2-cosmos-assembler/implementation',
                    'phases/self-realization/bootstrap/b2-cosmos-assembler/testing',
                    'phases/self-realization/bootstrap/b2-cosmos-assembler/troubleshooting',
                  ],
                },
                {
                  type: 'category',
                  label: 'B3: Cosmos Linker',
                  items: [
                    'phases/self-realization/bootstrap/b3-cosmos-linker/index',
                    'phases/self-realization/bootstrap/b3-cosmos-linker/implementation',
                    'phases/self-realization/bootstrap/b3-cosmos-linker/testing',
                    'phases/self-realization/bootstrap/b3-cosmos-linker/troubleshooting',
                  ],
                },
                {
                  type: 'category',
                  label: 'B4: Cosmos Compiler (x86-64)',
                  items: [
                    'phases/self-realization/bootstrap/b4-cosmos-compiler-x86/index',
                    'phases/self-realization/bootstrap/b4-cosmos-compiler-x86/implementation',
                    'phases/self-realization/bootstrap/b4-cosmos-compiler-x86/testing',
                    'phases/self-realization/bootstrap/b4-cosmos-compiler-x86/troubleshooting',
                  ],
                },
                {
                  type: 'category',
                  label: 'B5: Cosmos Compiler (ARM64)',
                  items: [
                    'phases/self-realization/bootstrap/b5-cosmos-compiler-arm64/index',
                    'phases/self-realization/bootstrap/b5-cosmos-compiler-arm64/implementation',
                    'phases/self-realization/bootstrap/b5-cosmos-compiler-arm64/testing',
                    'phases/self-realization/bootstrap/b5-cosmos-compiler-arm64/troubleshooting',
                  ],
                },
                {
                  type: 'category',
                  label: 'B6: Cosmos Compiler (RISC-V)',
                  items: [
                    'phases/self-realization/bootstrap/b6-cosmos-compiler-riscv/index',
                    'phases/self-realization/bootstrap/b6-cosmos-compiler-riscv/implementation',
                    'phases/self-realization/bootstrap/b6-cosmos-compiler-riscv/testing',
                    'phases/self-realization/bootstrap/b6-cosmos-compiler-riscv/troubleshooting',
                  ],
                },
                {
                  type: 'category',
                  label: 'B7: LLVM Deleted',
                  items: [
                    'phases/self-realization/bootstrap/b7-llvm-deleted/index',
                    'phases/self-realization/bootstrap/b7-llvm-deleted/implementation',
                    'phases/self-realization/bootstrap/b7-llvm-deleted/testing',
                    'phases/self-realization/bootstrap/b7-llvm-deleted/troubleshooting',
                  ],
                },
              ],
            },
            'phases/self-realization/summary',
          ],
        },
        {
          type: 'category',
          label: 'Phase 6: Universal Harmony',
          items: [
            'phases/universal-harmony/index',
            'phases/universal-harmony/resources',
            {
              type: 'category',
              label: 'Tasks',
              items: [
                {
                  type: 'category',
                  label: 'Security Audit',
                  items: [
                    'phases/universal-harmony/tasks/security-audit/index',
                    'phases/universal-harmony/tasks/security-audit/implementation',
                    'phases/universal-harmony/tasks/security-audit/testing',
                    'phases/universal-harmony/tasks/security-audit/troubleshooting',
                  ],
                },
                {
                  type: 'category',
                  label: 'Packaging Ecosystem',
                  items: [
                    'phases/universal-harmony/tasks/packaging-ecosystem/index',
                    'phases/universal-harmony/tasks/packaging-ecosystem/implementation',
                    'phases/universal-harmony/tasks/packaging-ecosystem/testing',
                    'phases/universal-harmony/tasks/packaging-ecosystem/troubleshooting',
                  ],
                },
                {
                  type: 'category',
                  label: 'Community Release',
                  items: [
                    'phases/universal-harmony/tasks/community-release/index',
                    'phases/universal-harmony/tasks/community-release/implementation',
                    'phases/universal-harmony/tasks/community-release/testing',
                    'phases/universal-harmony/tasks/community-release/troubleshooting',
                  ],
                },
              ],
            },
            'phases/universal-harmony/summary',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Achitecture',
      items: [
        'architecture/index',
        'architecture/overview',
        {
          type: 'category',
          label: 'ddrs',
          items: [
            'architecture/ddrs/index',
            {
              type:'category',
              label: 'Core Kernel (DDR-001 to DDR-014)',
              items:[
                'architecture/ddrs/core-kernal/ddr-001',
                'architecture/ddrs/core-kernal/ddr-002',
                'architecture/ddrs/core-kernal/ddr-003',
                'architecture/ddrs/core-kernal/ddr-004',
                'architecture/ddrs/core-kernal/ddr-005',
                'architecture/ddrs/core-kernal/ddr-006',
                'architecture/ddrs/core-kernal/ddr-007',
                'architecture/ddrs/core-kernal/ddr-008',
                'architecture/ddrs/core-kernal/ddr-009',
                'architecture/ddrs/core-kernal/ddr-010',
                'architecture/ddrs/core-kernal/ddr-011',
                'architecture/ddrs/core-kernal/ddr-012',
                'architecture/ddrs/core-kernal/ddr-013',
                'architecture/ddrs/core-kernal/ddr-014',
              ]
            },
            {
              type: 'category',
              label: 'Extended Subsystems (DDR-015 to DDR-020)',
              items: [
                'architecture/ddrs/extended-subsystems/ddr-015',
                'architecture/ddrs/extended-subsystems/ddr-016',
                'architecture/ddrs/extended-subsystems/ddr-017',
                'architecture/ddrs/extended-subsystems/ddr-018',
                'architecture/ddrs/extended-subsystems/ddr-019',
                'architecture/ddrs/extended-subsystems/ddr-020',
              ]
            },
            {
              type: 'category',
              label: 'Security DDRs (DDR-021 to DDR-024)',
              items: [
                'architecture/ddrs/security/ddr-021',
                'architecture/ddrs/security/ddr-022',
                'architecture/ddrs/security/ddr-023',
                'architecture/ddrs/security/ddr-024',
              ]
            },
            {
              type: 'category',
              label: 'Subsystem DDRs',
              items: [
                'architecture/ddrs/subsystem/ddr-hal',
                'architecture/ddrs/subsystem/ddr-ir',
                'architecture/ddrs/subsystem/ddr-init',
                'architecture/ddrs/subsystem/ddr-vfs',
                'architecture/ddrs/subsystem/ddr-pf',
                'architecture/ddrs/subsystem/ddr-compositor',
                'architecture/ddrs/subsystem/ddr-audio',
                'architecture/ddrs/subsystem/ddr-comit',
              ]
            },
            {
              type: 'category',
              label: 'Extended Security DDRs (DDR-025 to DDR-029)',
              items: [
                'architecture/ddrs/extended-security/ddr-025',
                'architecture/ddrs/extended-security/ddr-026',
                'architecture/ddrs/extended-security/ddr-027',
                'architecture/ddrs/extended-security/ddr-028',
                'architecture/ddrs/extended-security/ddr-029',
              ]
            },
            {
              type: 'category',
              label: 'Compatibility DDRs',
              items: [
                'architecture/ddrs/compability/ddr-fde',
                'architecture/ddrs/compability/ddr-posix',
              ]
            }
          ]
        },
        'architecture/problem-solution',
      ],
    },
    {
      type: 'category',
      label: 'Develop',
      items: [
        'develop/index',
        'develop/workflow',
        'develop/first-30-days',
        'develop/glossary',
        {
          type: 'category',
          label: 'Best Practices',
          items: [
            'develop/best-practices/coding',
            'develop/best-practices/security',
            'develop/best-practices/testing',
            'develop/best-practices/error-handling',
          ],
        },
        {
          type: 'category',
          label: 'Tools',
          items: [
            'develop/tools/index',
            'develop/tools/environment-setup',
            'develop/tools/qemu',
            'develop/tools/gdb',
            'develop/tools/kani',
            'develop/tools/miri',
            'develop/tools/cargo-fuzz',
            'develop/tools/cargo-deny',
            'develop/tools/raspberry-pi-4',
            'develop/tools/perf-flamegraph',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Reference',
      items: [
        {
          type: 'category',
          label: 'API',
          items: [
            'reference/api/syscalls',
            'reference/api/capability-api',
            'reference/api/userspace',
            'reference/api/drivers',
          ],
        },
        {
          type: 'category',
          label: 'Security',
          items: [
            'reference/security/threat-model',
            'reference/security/capability-model',
            'reference/security/mitigations',
            'reference/security/crypto',
            'reference/security/supply-chain',
          ],
        },
        {
          type: 'category',
          label: 'Hardware',
          items: [
            'reference/hardware/x86-64',
            'reference/hardware/arm64',
            'reference/hardware/riscv',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Community',
      items: [
        'community/index',
        'community/contributing',
        'community/maintainers',
        'community/security-policy',
        'community/code-of-conduct',
        'community/cla',
        {
          type: 'category',
          label: 'Templates',
          items: [
            'community/templates/bug-report',
            'community/templates/pull-request',
            'community/templates/rfc',
          ],
        },
        'community/good-first-issues',
      ],
    },
    {
      type: 'category',
      label: 'Learn',
      items: [
        'learn/index',
        'learn/stage-0-programming',
        {
          type: 'category',
          label: 'Books',
          items: [
            'learn/books/phase-0',
            'learn/books/phase-1',
            'learn/books/phase-2',
            'learn/books/phase-3',
          ],
        },
        {
          type: 'category',
          label: 'Tutorials',
          items: [
            'learn/tutorials/write-a-virtio-driver',
            'learn/tutorials/kani-harness-guide',
            'learn/tutorials/x86-assembly-primer',
            'learn/tutorials/os-comparison-lessons',
          ],
        },
      ],
    },
  ],
};

export default sidebars;
