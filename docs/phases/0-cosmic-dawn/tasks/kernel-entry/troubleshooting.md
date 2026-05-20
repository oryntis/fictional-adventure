### Troubleshooting

| Problem                     | Likely Cause             | Fix                                                   |
| --------------------------- | ------------------------ | ----------------------------------------------------- |
| Triple fault on boot        | GDT/IDT misconfigured    | Verify segment selectors and IDT gate types with GDB  |
| `kernel_main` never reached | Stack not aligned        | Ensure RSP is 16-byte aligned before call             |
| AP cores hang               | INIT/SIPI sequence wrong | Use correct 20-bit real-mode address for startup code |
