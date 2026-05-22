## Task: Physical Memory Manager

**Component:** `cosmos_pmm` (Buddy allocator) | **DDR:** DDR-003

**What it does:** Tracks which physical pages are free/used. Buddy allocator for page-granularity allocation. Built from UEFI memory map at boot.

### Implementation

- Parse UEFI memory map passed from bootloader
- Buddy allocator: 4KB base order, up to 1GB pages (order 18)
- Zero all pages on free — no stale data leaks
- Per-NUMA-node free lists for topology-aware allocation
- ZRAM subsystem: compress cold pages with LZ4/Zstd (transparent)

### Security Rules

- No `unsafe` blocks — pure safe Rust
- 4KB alignment enforced on every allocation
- Zero on free: prevents data leaks between processes
- Kani verification required before Phase 0 exits

### Testing

```bash
cargo kani --harness pmm_alloc_free_harness
cargo test --package cosmos_pmm
```

- Alloc/free stress test: 1M allocations, verify no leaks
- Kani verification: no overflow, no double-free, no use-after-free
- NUMA test: allocations stay on local NUMA node

### Troubleshooting

| Problem | Likely Cause | Fix |
|---------|-------------|-----|
| PMM panics on boot | UEFI memory map misread | Validate memory map entries; skip reserved regions |
| Alloc returns wrong size | Buddy order calculation off-by-one | Add Kani harness for order calculation |
| NUMA alloc on wrong node | Missing topology detection | Parse ACPI SRAT table for NUMA topology |

---