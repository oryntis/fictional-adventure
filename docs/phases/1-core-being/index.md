
# Phase 1: Core Being

**Version:** 0.1.0 → 0.1.2 (Alpha) | **Duration:** 6–9 months | **Target:** Q3 2027 → Q1 2028

&gt; *"A being exists. A being acts. A being creates."*
&gt; **Philosophy:** The kernel comes alive. Build the things users and contributors actually see and use.

## Architecture Map

```
Phase 1: Core Being
├── Process Model (spawn, no fork)   DDR-004
├── Userspace Driver Framework       DDR-007
│     ├── virtio-blk (QEMU block)
│     ├── NVMe / AHCI
│     └── Intel e1000e / Realtek r8169
├── Vega FS (userspace daemon)       DDR-009, DDR-VFS
├── Network Stack                    DDR-011, DDR-PF
│     ├── ether-d (TCP/IP)
│     └── orion-pf (firewall)
├── Pulsar Shell                     —
├── orion-init                       DDR-INIT
└── Comit Package Manager v1         DDR-COMIT
```

---
