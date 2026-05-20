### Testing

- GDB step-through from reset vector to `kernel_main()`
- Interrupt injection test: trigger each IDT entry, verify dispatch
- SMP: bring up N AP cores in QEMU with `qemu -smp 4`
