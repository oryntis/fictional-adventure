## Task: Virtual Memory Manager

**Component:** `cosmos_vmm` | **DDR:** DDR-003

**What it does:** Maps virtual addresses to physical pages via 4-level PML4 page tables. Creates/destroys page tables. Handles demand paging, copy-on-write.

### Implementation

- x86-64: 4-level PML4 (48-bit VA), optional 5-level PML5 for &gt;128TB
- ARM64: 4-level (48-bit VA)
- RISC-V: Sv48 (4-level)
- ASLR: randomise user address space layout at process creation
- Guard pages on kernel stack

### Security Rules

- No kernel memory mapped into userspace — ever
- ASLR entropy: minimum 28 bits on x86-64
- Validate all page table entries before activation
- No TLB flush storms: use `INVLPG` for single pages, `INVPCID` for process

### Testing

- Page walk fuzzing: random virtual addresses, verify correct resolution
- ASLR entropy test: 1000 process spawns, measure VA randomness
- Page fault handler: inject faults, verify &lt;500ns handling
- W^X enforcement: writable pages must not be executable

### Troubleshooting

| Problem                               | Likely Cause                             | Fix                                        |
| ------------------------------------- | ---------------------------------------- | ------------------------------------------ |
| Page fault on valid address           | TLB not flushed after map                | Add `INVLPG` after every `map_page()` call |
| ASLR entropy too low                  | PRNG not seeded with hardware randomness | Use `RDRAND` for ASLR seed                 |
| Kernel address in userspace backtrace | Missing U/S bit in page table            | Set U/S = 0 on all kernel pages            |

---
