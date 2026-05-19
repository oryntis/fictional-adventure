---

---

#### **📄 `resources.md`**
*(Learning materials, tools, and references for Phase 0)*

```markdown
# **Phase 0: Cosmic Dawn — Resources**
*Everything you need to complete Phase 0.*

---

## **📚 Essential Reading**
### **Books (Must Read Before Coding)**
| **Book** | **Why It Matters** | **Priority** | **Where to Get It** |
|----------|---------------------|--------------|---------------------|
| **Computer Systems: A Programmer's Perspective (CS:APP)** | Covers bits, C, assembly, memory hierarchy, linking, and system-level programming. **The foundation for all OS development.** | ⭐⭐⭐⭐⭐ | [Free PDF (CMU)](https://csapp.cs.cmu.edu/) |
| **The C Programming Language (K&R)** | The definitive guide to C. **Required for understanding low-level systems.** | ⭐⭐⭐⭐⭐ | [Amazon](https://www.amazon.com/Programming-Language-2nd-Brian-Kernighan/dp/0131103628) |
| **The Rust Programming Language** | Free online. **Master Rust before writing kernel code.** | ⭐⭐⭐⭐⭐ | [Official Book](https://doc.rust-lang.org/book/) |
| **Programming Rust (2nd Ed.)** | Goes deeper into Rust’s advanced features (lifetimes, traits, unsafe). | ⭐⭐⭐⭐ | [O’Reilly](https://www.oreilly.com/library/view/programming-rust-2nd/9781492052586/) |
| **Rust Embedded Book** | **Critical for no_std Rust kernel development.** | ⭐⭐⭐⭐⭐ | [Free Online](https://docs.rust-embedded.org/book/) |

### **Online Courses**
| **Course** | **Why It Matters** | **When to Take** | **Link** |
|-----------|---------------------|------------------|---------|
| **MIT 6.S081 / 6.828 (OS Engineering)** | Builds xv6 (a Unix-like OS) from scratch. **Best practical OS course.** | Start immediately | [Course Website](https://pdos.csail.mit.edu/6.828/) |
| **Nand2Tetris (Parts 1 & 2)** | Build a computer from logic gates → OS. **Teaches the full stack.** | First 3 months | [nand2tetris.org](https://www.nand2tetris.org/) |
| **CS:APP Labs (CMU)** | Hands-on labs for **data representation, memory, and systems.** | After reading CS:APP | [Labs](https://csapp.cs.cmu.edu/3e/labs.html) |
| **Writing an OS in Rust (Phil Opp)** | Step-by-step guide to writing a kernel in Rust. **Follow alongside your own work.** | Phase 0 | [Blog](https://blog.phil-opp.com/) |

### **Documentation & References**
| **Resource** | **Purpose** | **Link** |
|--------------|-------------|---------|
| **OSDev Wiki** | **The #1 reference for OS development.** Covers bootloaders, GDT, IDT, paging, and more. | [wiki.osdev.org](https://wiki.osdev.org/) |
| **Intel SDM (Software Developer’s Manual)** | **Definitive x86-64 reference.** Volumes 1–3 cover architecture, instructions, and system programming. | [Intel SDM](https://www.intel.com/content/www/us/en/developer/articles/technical/intel-sdm.html) |
| **Rust Embedded Book** | **Bare-metal Rust development.** | [docs.rust-embedded.org](https://docs.rust-embedded.org/book/) |
| **NASM Documentation** | **x86 assembly reference.** | [NASM Docs](https://nasm.us/doc/) |
| **QEMU Documentation** | **Emulator reference for testing.** | [QEMU Docs](https://www.qemu.org/docs/) |

---

## **🛠️ Tools & Setup**
### **Required Tools**
| **Tool** | **Purpose** | **Install Command (macOS)** | **Install Command (Linux)** | **Verify** |
|----------|-------------|-----------------------------|-----------------------------|-----------|
| **Rust** | Primary language for Orion OS. | `curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs \| sh` | Same as macOS | `rustc --version` |
| **QEMU** | Full-system emulator for testing. | `brew install qemu` | `sudo apt install qemu-system-x86` | `qemu-system-x86_64 --version` |
| **NASM** | Assembler for bootloader. | `brew install nasm` | `sudo apt install nasm` | `nasm --version` |
| **GDB** | Debugger for kernel development. | `brew install gdb` | `sudo apt install gdb` | `gdb --version` |
| **x86_64-elf-gcc** | Cross-compiler for bare-metal x86. | `brew install x86_64-elf-gcc` | `sudo apt install gcc-x86-64-linux-gnu` | `x86_64-elf-gcc --version` |
| **VSCode** | IDE with Rust support. | `brew install --cask visual-studio-code` | Download from [code.visualstudio.com](https://code.visualstudio.com/) | — |
| **just** | Modern task runner (replaces Make). | `cargo install just` | Same as macOS | `just --version` |

### **VSCode Extensions**
| **Extension** | **Purpose** | **Install Command** |
|---------------|-------------|----------------------|
| **Rust Analyzer** | Rust language support. | `code --install-extension rust-lang.rust-analyzer` |
| **CodeLLDB** | Debugger for Rust. | `code --install-extension vadimcn.vscode-lldb` |
| **Even Better TOML** | TOML syntax highlighting. | `code --install-extension tamasfe.even-better-toml` |

---
## **💡 Tips for Phase 0**
1. **Start with the bootloader** (`tasks/bootloader.md`). This is your first tangible milestone.
2. **Use QEMU for all testing**—no real hardware needed until Phase 1.
3. **Debug with GDB**—attach to QEMU (`-s -S` flags) to step through your code.
4. **Read the Intel SDM**—especially **Volume 3 (System Programming)** for GDT, IDT, and paging.
5. **Follow Phil Opp’s blog**—it’s the best Rust OS development guide.
6. **Join the OSDev Forum**—ask questions, share progress, and learn from others.

---
## **📖 Recommended Study Order**
1. **Read CS:APP Chapters 1–3** (Data representation, machine-level programming).
2. **Complete Nand2Tetris Part 1** (Build a computer from logic gates).
3. **Write a bootloader in NASM** (Milestone 0.1).
4. **Read the Rust Book** (Chapters 1–15).
5. **Follow Phil Opp’s blog** (Parts 1–3: Bootloader → Kernel Entry).
6. **Implement a basic kernel in Rust** (Milestone 0.3).

---
**Last Updated**: May 18, 2026