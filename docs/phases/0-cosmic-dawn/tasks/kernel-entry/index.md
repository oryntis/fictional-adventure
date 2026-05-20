## Task: Kernel Entry Point

**Component:** `kernel_entry.asm` | **DDR:** DDR-001

**What it does:** Assembly trampoline: sets up stack, enables SSE/AVX, switches to 64-bit long mode, calls Rust `kernel_main()`.
