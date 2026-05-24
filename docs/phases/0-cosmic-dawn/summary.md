## Phase 0 Exit Criteria

&gt; **All of the following must be ✅ Done before proceeding to Phase 1:**

- [ ] UEFI Bootloader (Horizon Boot) — boots QEMU and real x86-64 hardware
- [ ] BIOS legacy bootloader — boots QEMU in legacy BIOS mode
- [ ] Kernel Entry Point — GDT, IDT, SMP, CPU feature detection
- [ ] Physical Memory Manager — buddy allocator, Kani verified
- [ ] Virtual Memory Manager — PML4, ASLR, W^X enforcement
- [ ] Capability System — atomic check-and-use, Kani verified, 300s fuzz
- [ ] IPC Fast Path — &lt;500ns latency, 300s fuzz
- [ ] Scheduler (Base) — 5 classes, tickless, 10K thread stress test
- [ ] Cosmos Assembler — replaces NASM, bootstrap test passes
- [ ] CI/CD pipeline operational
- [ ] QEMU prints `ORION OK`

**Duration:** 6–9 months | **Next:** Phase 1: Core Being

---
