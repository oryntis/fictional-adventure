
## Task: Cosmos Assembler

**Component:** `cosmos-asm` (Rust) | **DDR:** DDR-IR

**What it does:** Replaces NASM. First step toward self-hosting (B2 in bootstrap sequence).

### Implementation

- Written in Rust — no unsafe in assembler core
- Supports x86-64 AT&T and Intel syntax
- Reproducible output: identical binary output given identical input
- Bootstrap test: `cosmos-asm` assembles its own assembly stubs and output is bit-for-bit identical to NASM output

### Testing

- Bootstrap test: `cosmos-asm kernel_entry.asm` → diff against `nasm kernel_entry.asm` → must be identical
- Fuzz: random instruction sequences, verify no panic

---