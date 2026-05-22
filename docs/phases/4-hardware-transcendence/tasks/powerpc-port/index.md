## Task: PowerPC Port

**Component:** `cosmos-hal-powerpc` | **DDR:** DDR-HAL

**Target:** IBM Power10 servers, TALOS II workstations, PowerPC embedded boards.

### Implementation

- Little-endian mode (ELFv2 ABI) — modern PowerPC is little-endian
- SMT (Simultaneous Multi-Threading): up to 8 threads per core on Power10
- Hash Page Table (HPT): PowerPC's hardware page-table mechanism
- AltiVec/VMX + VSX: SIMD vector support
- Secure Execution: IBM's equivalent of SGX for PowerPC

### Troubleshooting

| Problem | Likely Cause | Fix |
|---------|-------------|-----|
| Endianness bugs | Mixed big/little endian handling | Enforce little-endian mode; endianness test suite |
| SMT thread scheduling wrong | Missing SMT topology detection | Parse device tree for SMT configuration |

---