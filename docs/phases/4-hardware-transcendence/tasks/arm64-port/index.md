## Task: ARM64 Port

**Component:** `cosmos-hal-arm64` | **DDR:** DDR-HAL, DDR-022

**Target hardware:** Raspberry Pi 4/5, Apple M1/M2 (baseline compatibility), NVIDIA Jetson, server-class ARM (Ampere Altra).

### Implementation

- Page tables: 4-level (48-bit VA) with ARMv8.2 LPA extension for 52-bit
- Memory Tagging Extension (MTE): mandatory for all allocations — no raw pointer access
- big.LITTLE / DynamIQ: topology-aware scheduling (P-cores vs E-cores)
- SVE (Scalable Vector Extension): float workloads, ML inference
- Translation Table Walk hardware: no software page-table walks
- TrustZone: `orion-cryptod` uses TrustZone secure world on ARM64

### Security Rules

- MTE mandatory: every heap allocation tagged — hardware catches use-after-free and buffer overflow
- No raw pointer arithmetic — all pointer operations through MTE-aware allocator
- TrustZone for key material — secrets never touch normal world memory

### Performance Targets

| Hardware              | Boot Time | Idle RAM  | Peak IPC                 |
| --------------------- | --------- | --------- | ------------------------ |
| Raspberry Pi 4 (4GB)  | &lt;2s    | &lt;100MB | Goal: match Linux        |
| Apple M1 (8GB)        | &lt;1s    | &lt;120MB | Goal: ≥ Linux/macOS      |
| Ampere Altra (server) | &lt;3s    | &lt;200MB | Goal: match Linux server |

### Testing

- Raspberry Pi 4 physical boot: UART serial output, `ORION OK`
- QEMU `aarch64`: `qemu-system-aarch64 -machine virt -cpu cortex-a72`
- MTE validation: allocate, free, attempt access-after-free → hardware fault
- big.LITTLE scheduling: verify interactive tasks dispatch to P-cores
- Stress test: 10K processes on 8 cores, 12 hours — no crash, no starvation

### Troubleshooting

| Problem                         | Likely Cause                             | Fix                                                            |
| ------------------------------- | ---------------------------------------- | -------------------------------------------------------------- |
| MTE tag mismatch fault          | Incorrect memory tag assignment on alloc | Audit allocator tag assignment; use ARM MTE-aware allocator    |
| Raspberry Pi 4 hangs at boot    | Incorrect device tree or UART init       | Use `miniUART` (UART1) not `PL011` for early console on RPi 4  |
| TrustZone secure world fault    | Incorrect EL2/EL1/EL0 transition         | Verify exception level transitions with ARMv8 reference manual |
| big.LITTLE wrong core selection | Missing ACPI PPTT topology data          | Parse PPTT table for cluster topology                          |

---
