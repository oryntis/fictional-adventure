## Task: RISC-V Port

**Component:** `cosmos-hal-riscv` | **DDR:** DDR-HAL

**Target hardware:** VisionFive 2 (JH7110), StarFive boards, QEMU riscv64.

### Implementation

- Privilege levels: M-mode (firmware) → S-mode (kernel) → U-mode (userspace)
- Physical Memory Protection (PMP): 16 PMP regions — kernel uses for memory isolation
- Sv48: 4-level page tables (48-bit VA) — matches x86-64 and ARM64
- Vector extension (RVV 1.0): SIMD for ML inference and crypto
- Hypervisor extension (H): for virtualisation support (Phase 4 stretch)
- SBI (Supervisor Binary Interface): firmware calls via `ecall`

### Security Rules

- PMP mandatory — kernel uses PMP for all userspace memory isolation
- No S-mode access to M-mode registers — SBI call only
- RVV operations on capability-gated memory only

### Performance Targets

- VisionFive 2 boot: &lt;3s to `ORION OK`
- QEMU riscv64 boot: &lt;5s

### Testing

- VisionFive 2 physical boot
- QEMU: `qemu-system-riscv64 -machine virt -bios opensbi`
- PMP test: attempt U-mode access to kernel pages → fault
- RVV test: vector-accelerated BLAKE3, verify output matches scalar

### Troubleshooting

| Problem | Likely Cause | Fix |
|---------|-------------|-----|
| PMP misconfiguration | Incorrect region granularity (PMPGRANULE) | Ensure PMP granularity ≥ page size; test with pmp_checker harness |
| SBI call fails | Wrong extension ID or function ID | Verify against OpenSBI source and SBI spec v1.0 |
| VisionFive 2 no serial | Wrong UART base address | Use `0x10000000` (NS16550) for JH7110 |

---
