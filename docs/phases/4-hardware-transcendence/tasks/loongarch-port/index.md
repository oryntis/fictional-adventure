## Task: LoongArch Port

**Component:** `cosmos-hal-loongarch` | **DDR:** DDR-HAL

**Target:** Loongson 3A6000, 3C6000 processors (China's domestic CPU).

### Implementation

- LSX (Loongson SIMD Extension) + LASX (256-bit): vector SIMD
- TLB refill: software TLB refill handler (no hardware TLB walker)
- CSR registers: Control and Status Registers for privilege management

### Notes

LoongArch is architecturally similar to MIPS and RISC-V. The software TLB refill is the biggest differentiator — requires a performance-critical handler written in Assembly.

---
