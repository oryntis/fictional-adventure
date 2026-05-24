## Task: Userspace Driver Framework

**Component:** `orion-driver` + individual drivers | **DDR:** DDR-007

All drivers run in unprivileged userspace processes. IOMMU enforces DMA ranges. `orion-devmgr` manages driver lifecycle.

### Core drivers to implement in Phase 1

| Driver        | Component           | Priority | Testing                |
| ------------- | ------------------- | -------- | ---------------------- |
| virtio-blk    | `orion-virtio-blk`  | P0       | QEMU block device I/O  |
| NVMe          | `orion-nvme`        | P0       | Benchmark vs Linux     |
| AHCI/SATA     | `orion-ahci`        | P1       | Legacy hardware boot   |
| Intel e1000e  | `orion-net-intel`   | P0       | Throughput benchmark   |
| Realtek r8169 | `orion-net-realtek` | P1       | Consumer hardware test |

### Security Rules

- No driver code in kernel — ever
- IOMMU mandatory for all DMA — driver cannot access memory outside its `MemoryCapability`
- Driver crash → `orion-devmgr` restarts it — kernel never stops

### Troubleshooting

| Problem               | Likely Cause                     | Fix                                                   |
| --------------------- | -------------------------------- | ----------------------------------------------------- |
| Driver crashes system | Kernel-mode assumption in driver | All drivers 100% userspace; crash = process restart   |
| DMA out of bounds     | Missing IOMMU enforcement        | Always validate DMA mappings against MemoryCapability |
| Driver fails to load  | Capability set too restrictive   | Review capability set in driver manifest              |

---
