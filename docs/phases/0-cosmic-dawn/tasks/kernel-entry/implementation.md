### Implementation

```asm
; kernel_entry.asm — pure Assembly, &lt;500 lines
; 1. Disable interrupts
; 2. Set up GDT for long mode
; 3. Enable PAE paging
; 4. Enable long mode in EFER
; 5. Enable paging
; 6. Set up stack (16-byte aligned for SSE)
; 7. Call kernel_main()
```

- GDT: kernel code segment, kernel data segment, TSS for interrupt stack
- IDT: 256 entries — all 256 handlers in Assembly, dispatch to Rust
- CPU Feature Detection via CPUID: SSE/AVX/AES-NI/RDRAND/SGX/MTE

### Security Rules

- No C in early boot — pure Assembly until Rust `kernel_main()`
- Static buffers only — no heap before PMM initialised
- Interrupts disabled until IDT and GDT are fully set up
