# Index
*Phase 0: Milestone 0.1 — The first code that runs on the CPU.*

---
## **🎯 Overview**
The **bootloader** is the **first piece of code** that runs when a computer starts. Its job is to:
1. **Initialize the CPU** (set up segments, enable protected mode, etc.).
2. **Load the kernel** from disk into memory.
3. **Jump to the kernel entry point** (transition to 32-bit or 64-bit mode).

**Why This Matters**:
- Without a bootloader, the CPU doesn’t know where the kernel is or how to run it.
- This is your **first tangible milestone**—when your bootloader prints **"ORION OS"** on screen, you’ve officially written code that runs on bare metal.

---
## **📌 Prerequisites**
Before starting this task, ensure you have:
1. **Installed all tools** from [`resources.md`](../resources.md).
2. **Read**:
   - OSDev Wiki: [Bootloader](https://wiki.osdev.org/Bootloader)
   - Intel SDM Vol. 3, Chapter 2 (Real Mode) and Chapter 3 (Protected Mode).
3. **Understood**:
   - How the **x86 CPU starts** (real mode, 16-bit).
   - The **BIOS/UEFI boot process**.
   - **NASM syntax** for x86 assembly.

---
## **🚀 Goal**
- Write a **BIOS bootloader** in NASM that:
  - Prints **"ORION OS"** to the screen in **VGA text mode**.
  - Boots in **QEMU** (`qemu-system-x86_64 -drive format=raw,file=boot.bin`).
- **Stretch Goal**: Extend it to load a **kernel binary** from disk.

---
## **📁 Files to Create**
   **File** | **Purpose** |
 |----------|-------------|
 | `boot.asm` | NASM source code for the bootloader. |
 | `boot.bin` | Compiled binary (512 bytes, ends with `0x55AA`). |

---
## **🔗 Related Tasks**
- Next: **[Kernel Entry](kernel-entry.md)** (Transition to 32-bit/64-bit mode).
- Later: **[UEFI Bootloader](bootloader.md/uefi.md)** (Phase 0.2).

---
## **📚 Additional Resources**
- [OSDev Wiki: Bootloader](https://wiki.osdev.org/Bootloader)
- [NASM Manual](https://nasm.us/doc/nasmdoc0.html)
- [Phil Opp: Writing a Bootloader](https://blog.phil-opp.com/2018/09/17/writing-a-bootloader-in-assembly/)