---
title: "Orion Vol4 Learning Resources"
sidebar_position: 11
---

**PROJECT ORION OS**

**Vol 4 — Learning Resources & Roadmap**

_Everything You Need to Learn — Organised, Prioritised, Complete_

# **0\. Stage Zero — Learn to Program First**

**Read This Before Anything Else**

The rest of this volume assumes you can write programs. If you cannot yet write a Python script that reads a file and processes it — the OS dev books are years away. Do not skip this stage. Every month here is multiplied in every stage that follows. There is no shortcut.

**Step**

**Detail**

**Why Python first**

Not because Orion OS uses Python. Because programming must become unconscious before you can think about harder problems. Python removes language friction fastest. When writing a program feels natural — when the language stops getting in the way of the thinking — you are ready to add more complexity.

**Automate the Boring Stuff**

automatetheboringstuff.com — Free. Best practical Python book. Solves real problems you might actually have. Read it, type every example, do every exercise.

**Build 5 real projects**

A file organiser (scans folder, sorts files by type). A web scraper (fetches a webpage, extracts data). A CLI tool (does one thing from the command line). A text adventure game. A contact book with search. Make things YOU want to use.

**The readiness test**

Can you write a program that: reads a directory recursively, finds all files modified in the last 7 days, groups them by file extension, and prints a summary report — without looking anything up? When that feels easy, move to Stage 1.

**Time: 6-12 months**

If you spend 1-2 focused hours daily. Not a race. Understanding matters more than speed. Rushing this stage costs triple the time later.

**Python resources**

python.org/about/gettingstarted — official start. realpython.com — excellent tutorials. CS50P (Harvard Python course, free on edX) — structured if you prefer video.

# **1\. How to Use This Volume**

**The Learning Philosophy**

You cannot read everything at once. This volume is organised into phases matching the bootstrap roadmap. Read Phase 0 resources while doing Phase 0 work. Add Phase 1 resources when Phase 0 is solid. Never skip ahead — each layer builds on the previous. The resources in each phase are ordered: read first, then second, then third.

**Phase**

**What to Study**

**Phase 0 (Years 0-2)**

Computer architecture, C, x86 assembly, basic OS theory. Before you write one line of kernel code.

**Phase 1 (Years 1-3)**

Rust (no\_std), bootloaders, memory management, scheduling, interrupts. While writing kernel core.

**Phase 2 (Years 2-5)**

Drivers, filesystems, networking, security. While building system software.

**Phase 3 (Years 4-7)**

Compilers, formal verification, GPU programming, heterogeneous compute. Advanced systems.

**Phase 4 (Ongoing)**

Research papers, academic conferences, cutting-edge hardware specs. Stay current.

# **2\. Essential Books — Ordered by Phase**

## **2.1 Phase 0 — Start Here**

**Book**

**Description**

**Priority**

**Computer Systems: A Programmer's Perspective (CS:APP)**

Bryant & O'Hallaron. THE foundational book. Covers: bits, C, assembly, memory hierarchy, linking, exceptional control flow, virtual memory, I/O. Read this FIRST. Do all labs. Available free as PDF from CMU.

Must Read

**The C Programming Language (K&R)**

Kernighan & Ritchie. The original. Short, dense, perfect. Every OS developer must know C deeply. Read after CS:APP.

Must Read

**Computer Organization and Design (RISC-V Edition)**

Patterson & Hennessy. How CPUs actually work: ISA, datapath, pipelining, memory hierarchy. RISC-V edition is the most modern. Pairs with CS:APP.

Must Read

**The Rust Programming Language (The Book)**

Klabnik & Nichols. Free at doc.rust-lang.org/book. Complete Rust introduction. Read all chapters. Do all exercises. Your primary language requires mastery.

Must Read

**Programming Rust (2nd Edition)**

Blandy, Orendorff, Tindall. O'Reilly. Goes deeper than The Book. Covers lifetimes, traits, concurrency, unsafe. Read after The Book.

Must Read

## **2.2 Phase 1 — OS Theory & Kernel Basics**

**Book**

**Description**

**Priority**

**Operating Systems: Three Easy Pieces (OSTEP)**

Arpaci-Dusseau. Free at ostep.org. The best modern OS textbook. Covers: virtualisation, concurrency, persistence. Conversational style. Do all homework. Primary OS theory reference.

Must Read

**Modern Operating Systems (5th Ed)**

Tanenbaum & Bos. More comprehensive than OSTEP. Covers microkernels deeply (Tanenbaum wrote MINIX). Read alongside OSTEP.

Must Read

**Operating System Concepts (10th Ed — Dinosaur Book)**

Silberschatz, Galvin, Gagne. Classic textbook. Broader coverage. Good for exam-style understanding of scheduling, synchronisation, deadlock.

Recommended

**Rust for Rustaceans**

Jon Gjengset. O'Reilly. Advanced Rust: lifetimes, traits, unsafe, async, macros. Essential for kernel-level Rust code. Read after Programming Rust.

Must Read

**Rust Embedded Book**

Free at docs.rust-embedded.org/book. no\_std Rust, bare metal, PAC/HAL layers. Essential for writing kernel code in Rust. Read before writing bootloader.

Must Read

**Writing a Simple Operating System from Scratch**

Nick Blundell. Free PDF. Step-by-step: bootloader, protected mode, kernel basics. Companion to OSDev wiki. Great practical intro.

Recommended

## **2.3 Phase 2 — Systems Programming & Drivers**

**Book**

**Description**

**Priority**

**Linux Kernel Development (3rd Ed)**

Robert Love. How the Linux kernel works: scheduling, memory, VFS, devices, modules. Essential reference even though Orion OS is not Linux. Learn what Linux does then design yours better.

Must Read

**Understanding the Linux Kernel (3rd Ed)**

Bovet & Cesati. Deeper than Love. Source-code level analysis. Memory management chapter alone is worth the book.

Must Read

**The Art of Unix Programming**

Eric S. Raymond. Free online. Philosophy of Unix: modularity, composition, text streams. Understand what to keep and what to reject.

Recommended

**Unix Network Programming Vol 1 & 2**

Stevens. The definitive network programming reference. Sockets, TCP/IP, IPC. Still the best despite its age.

Must Read

**Computer Networks (6th Ed)**

Tanenbaum. How networks work from physical layer to application. Required for writing the Orion OS network stack.

Recommended

**File System Forensics Analysis**

Brian Carrier. How filesystems are structured on disk. Covers ext2/3/4, FAT, NTFS internals. Helps design Vega FS.

Recommended

**Storage Systems — Organization, Performance, Coding, Reliability**

Bucy et al. Free PDF. Storage hierarchy, RAID, SSDs, file systems. Required for Vega FS design.

Recommended

## **2.4 Phase 3 — Advanced Topics**

**Book**

**Description**

**Priority**

**Engineering a Compiler (3rd Ed)**

Cooper & Torczon. How to build a real compiler: lexing, parsing, semantic analysis, IR, optimisation, code generation. Required for Cosmos Compiler.

Must Read

**Crafting Interpreters**

Robert Nystrom. Free at craftinginterpreters.com. Builds two complete language implementations. Best practical compiler intro. Read before Engineering a Compiler.

Must Read

**Programming Language Pragmatics (4th Ed)**

Scott. Language design and implementation theory. Type systems, scoping, control flow, memory models.

Recommended

**The Garbage Collection Handbook**

Jones, Hosking, Moss. Comprehensive GC survey. Important for Cosmos Compiler's memory model even if you avoid GC — understand what you are NOT doing and why.

Reference

**Introduction to Formal Methods**

Huth & Ryan. Logic in Computer Science. Propositional/predicate logic, model checking, program verification. Foundation for formally verifying Orion OS critical paths.

Must Read

**Software Foundations (Vol 1-4)**

Pierce et al. Free online. Coq proof assistant. Formal verification from first principles. How seL4's verification was done.

Advanced

**Real-Time Systems**

Liu. Scheduling theory for real-time. Rate monotonic, EDF, schedulability analysis. Required for Orion OS real-time scheduler design.

Must Read

## **2.5 Hardware Reference Manuals (Free Downloads)**

**Manual**

**Description**

**Priority**

**Intel 64 and IA-32 Architectures Software Developer's Manual (SDM)**

5000+ pages. The definitive x86-64 reference. Volumes 1-3: basic architecture, instruction set, system programming. Read system programming guide (Vol 3) during bootloader phase. software.intel.com/sdm

Essential

**Intel 64 Architecture x2APIC Specification**

APIC and x2APIC for SMP. Interrupt routing, IPI, timer. Used during SMP bring-up.

Essential

**RISC-V ISA Specification**

riscv.org/technical/specifications. Unprivileged and Privileged ISA specs. Required for RISC-V port.

Essential

**ARM Architecture Reference Manual (ARMv8-A / ARMv9-A)**

ARM DDI 0487. AArch64 instruction set, exception model, memory model, system registers. Required for ARM64 port.

Essential

**UEFI Specification 2.10**

UEFI boot services, runtime services, protocols. Required for UEFI bootloader. uefi.org/specifications

Essential

**ACPI Specification 6.5**

Power management, hardware enumeration, device description. Required for power management and device discovery. uefi.org/specifications

Essential

**NVMe Base Specification 2.0**

NVMe command set, queue model, PCIe transport. Required for NVMe driver. nvmexpress.org/specifications

Essential

**PCI Express Base Specification 6.0**

PCIe architecture, configuration space, interrupt model. Required for any PCIe driver. pcisig.com

Essential

**USB 3.2 Specification**

USB protocol, device classes, enumeration. Required for USB stack. usb.org/documents

Essential

# **3\. Online Courses — Structured Learning**

**Course**

**Description**

**When to Take**

**MIT 6.S081 / 6.828 — OS Engineering**

The best OS course in the world. Labs build xv6 step by step. All materials free: pdos.csail.mit.edu/6.828. Do every lab. This is your Phase 1 foundation. Estimated: 6-12 months.

Phase 1 — Start immediately

**Nand2Tetris (Parts 1 & 2)**

Build a complete computer from logic gates: gates → ALU → CPU → assembler → VM → compiler → OS. nand2tetris.org. Free. Coursera option. Best for understanding the full stack.

Phase 0 — First 3 months

**CS:APP Labs (CMU)**

Data lab, bomb lab, attack lab, cache lab, shell lab, malloc lab, proxy lab. Each lab is a mini OS component. csapp.cs.cmu.edu/3e/labs.html. Free.

Phase 0-1

**Stanford CS140 — Operating Systems**

Complete OS course. Video lectures on YouTube. Covers scheduling, virtual memory, file systems, synchronisation.

Phase 1 — Supplement to MIT

**Berkeley CS162 — Operating Systems**

Video lectures on YouTube/Internet Archive. Pintos OS project (build on a teaching OS). Different perspective from MIT.

Phase 1 — Optional depth

**The Cherno — C++ Series (use for C concepts)**

YouTube. Best explained low-level C/C++ concepts. Watch for memory management, pointers, linker explanations.

Phase 0 — Reference

**Low Level Learning (YouTube)**

Practical low-level C and systems content. Buffer overflows, memory layout, OS concepts applied practically.

Phase 0-1

**Andreas Kling (SerenityOS / YouTube)**

Live OS development from the SerenityOS creator. Watch how real decisions are made. youtube.com/@awesomekling

Phase 1+ — Ongoing inspiration

**Jon Gjengset — Rust Deep Dives (YouTube)**

Advanced Rust explained in-depth. Streams of real Rust systems code. youtube.com/@jonhoo

Phase 1 — Rust mastery

**Let's Build an OS — OSDev Tutorial**

Step-by-step video series following OSDev wiki. Bootloader to kernel. Good companion to written tutorials.

Phase 1 — Practical

# **4\. Essential Websites & Documentation**

**Resource**

**Description & URL**

**When Needed**

**OSDev Wiki**

wiki.osdev.org — The single most important website for OS development. Every low-level detail: bootloaders, GDT, IDT, paging, APIC, drivers, file systems. Your daily reference. Search here before searching anywhere else.

Daily Reference

**OSDev Forum**

forum.osdev.org — Active community of OS developers. Search before posting — most questions answered. Post stuck points after trying.

When Stuck

**Phil Opp's Blog**

blog.phil-opp.com — 'Writing an OS in Rust' tutorial series. Step-by-step from bootloader to basic kernel in Rust. Follow this in parallel with your own work.

Phase 1 Essential

**Rust Book**

doc.rust-lang.org/book — The official Rust reference. Bookmark chapters on lifetimes, traits, unsafe, and the module system.

Phase 0-1 Reference

**Rust Reference**

doc.rust-lang.org/reference — Formal Rust language specification. For when the Book doesn't answer your question.

Reference

**Rust Embedded Book**

docs.rust-embedded.org/book — Bare metal Rust. no\_std, HAL, PAC, interrupt handling. Essential for kernel code.

Phase 1 Essential

**Rust Nomicon**

doc.rust-lang.org/nomicon — The dark arts of unsafe Rust. Required reading before writing any unsafe kernel code.

Phase 1-2

**Redox OS Source**

gitlab.redox-os.org/redox-os/redox — A complete Rust microkernel you can study, run, and learn from. Most similar to Orion OS vision.

Phase 1+ Study

**SerenityOS**

github.com/SerenityOS/serenity — Complete OS written from scratch by one person. Proof of concept. Excellent code to read.

Phase 1+ Inspiration

**Linux Kernel Source**

github.com/torvalds/linux — Study what Linux does to understand what to do differently. Don't copy — learn the concepts.

Phase 2+ Reference

**LLVM Documentation**

llvm.org/docs — IR, backend development, passes. Required for Cosmos Compiler phases.

Phase 3

**Wasmtime Documentation**

docs.wasmtime.dev — WASM runtime internals, Cranelift JIT. For Nova WASM runtime.

Phase 3

**seL4 Documentation**

sel4.systems/Info/Docs — Formally verified microkernel. Design papers. Proof methodology. Inspiration for formal verification.

Phase 2-3

**UEFI Forum**

uefi.org/specifications — Official UEFI and ACPI specifications. Free download.

Phase 1 Reference

# **5\. Research Papers — Read When Ready**

**When to Read Papers**

Read papers when you reach the relevant phase. Do not read papers before you understand the practical basics — theory without implementation experience does not stick. Each paper below is listed with the phase where it becomes relevant.

**Paper**

**Description**

**Read In**

**'Reflections on Trusting Trust' — Thompson 1984**

The Trusting Trust problem. Why you must build your own compiler chain. 4 pages. Read immediately — it is the philosophical foundation of the bootstrap philosophy.

NOW

**'The UNIX Time-Sharing System' — Ritchie & Thompson 1974**

The original Unix paper. How the first modern OS was designed. Short. Essential context.

Phase 0

**'seL4: Formal Verification of an OS Kernel' — Klein et al. 2009**

How seL4 was formally verified. The capability system design. The IPC model. Directly applicable to Orion OS security design.

Phase 1

**'The Performance of µ-Kernel-Based Systems' — Liedtke 1995**

Why microkernels can be fast. The L4 IPC design. Counters the 'microkernels are slow' myth. Required for Orion OS microkernel design.

Phase 1

**'Exokernel: An Operating System Architecture for Application-Level Resource Management' — Engler et al. 1995**

Radical alternative: expose hardware directly to apps via safe abstractions. Influenced Nebula Extensions design.

Phase 1

**'io\_uring' — Axboe 2019**

The design of Linux's io\_uring async I/O interface. Blueprint for Orion OS async I/O.

Phase 2

**'The Slab Allocator: An Object-Caching Kernel Memory Allocator' — Bonwick 1994**

How the slab allocator works. Used in Orion OS kernel heap design.

Phase 1

**'Lottery Scheduling: Flexible Proportional-Share Resource Management' — Waldspurger & Weihl 1994**

Probabilistic scheduler. Influences Orion OS workload classification.

Phase 1

**'A Case for Redundant Arrays of Inexpensive Disks (RAID)' — Patterson et al. 1988**

The RAID paper. Foundation for understanding storage reliability for Vega FS.

Phase 2

**'ZFS: The Last Word in File Systems' — Bonwick & Moore 2006**

ZFS design philosophy: end-to-end data integrity. Blueprint for Vega FS checksums and CoW.

Phase 2

**'WebAssembly: A Compilation Target for the Web' — Haas et al. 2017**

The WASM design paper. Foundation for Orion OS WASM app runtime.

Phase 3

**'CRYSTALS-Kyber Algorithm Specification' — NIST 2024**

Post-quantum key encapsulation. Orion OS crypto foundation.

Phase 2

**'CRYSTALS-Dilithium Algorithm Specification' — NIST 2024**

Post-quantum signatures. Orion OS boot chain and package signing.

Phase 2

**'Unikraft: Fast, Specialized Unikernels the Easy Way' — Kuenzer et al. 2021**

How to build unikernels from a modular library OS. Influences Orion OS unikernel mode.

Phase 3

**'The Scalable Commutativity Rule' — Clements et al. 2015**

When OS interfaces can scale on multicore. Directly applicable to Orion OS syscall interface design.

Phase 2

# **6\. Tools to Install and Master**

## **6.1 Development Tools**

**Tool**

**What It Does**

**When to Install**

**QEMU**

qemu-system-x86\_64. Your virtual hardware lab. brew install qemu. Used every day.

Day 1

**Rust + rustup**

rustup.rs. Manage Rust versions and targets. Add: x86\_64-unknown-none, aarch64-unknown-none.

Day 1

**NASM**

Assembler for bootloader. brew install nasm on Mac.

Day 1

**GDB**

Debugger. Attaches to QEMU's GDB server. brew install gdb.

Day 1

**LLVM / Clang**

Cross-compiler for bootstrap phase. brew install llvm.

Day 1

**x86\_64-elf-gcc**

Cross-compilation GCC. brew install x86\_64-elf-gcc on Mac.

Day 1

**VSCode + Rust Analyzer**

Editor with Rust code completion and error checking.

Day 1

**cargo**

Rust's build system. Already installed with rustup. Learn it completely.

Day 1

**just**

Command runner (better Make). cargo install just. Define build recipes.

Week 1

**lldb**

LLVM's debugger. Better Rust support than GDB in some cases. Included with LLVM.

Week 1

**bochs**

x86 PC emulator with built-in debugger. Useful for early bootloader debugging.

Month 1

**radare2 / ghidra**

Reverse engineering / binary analysis. For understanding compiled output.

Month 2+

**perf / valgrind equivalent**

Performance profiling. For when you need to measure what is actually slow.

Phase 2+

## **6.2 Build System Setup (Mac)**

**Step**

**Command**

**Step 1: Homebrew**

/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

**Step 2: Core tools**

brew install qemu nasm gdb llvm x86\_64-elf-gcc x86\_64-elf-binutils

**Step 3: Rust**

curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

**Step 4: Rust targets**

rustup target add x86\_64-unknown-none aarch64-unknown-none riscv64gc-unknown-none-elf

**Step 5: Rust nightly (for kernel features)**

rustup install nightly && rustup component add rust-src --toolchain nightly

**Step 6: cargo tools**

cargo install just cargo-binutils cargo-watch

**Step 7: VSCode extensions**

Install: rust-analyzer, CodeLLDB, x86 and x86\_64 Assembly, Even Better TOML

**Step 8: QEMU test**

qemu-system-x86\_64 --version (should print version)

# **7\. The First 12 Months — Week by Week**

**The Most Important Rule**

Do not move to the next week's topic until you can do the current week's task from memory without looking it up. Speed does not matter. Understanding matters. One solid month beats four confused months.

**Period**

**Focus**

**Milestone**

**Weeks 1-4**

Read CS:APP Chapters 1-3 (tour, bits, integers). Install all tools. Set up QEMU. Run your first QEMU machine. Read OSDev wiki: 'Getting Started'.

Understand what a computer is at the bit level

**Weeks 5-8**

Read CS:APP Chapters 4-5 (processor, optimisation). Start Nand2Tetris Part 1. Write your first x86-64 Assembly program. Understand registers, stack, calling convention.

Write Assembly that runs in QEMU

**Weeks 9-12**

Read CS:APP Chapters 8-9 (control flow, virtual memory). Start The Rust Book (complete it). Write simple Rust programs. Understand ownership and lifetimes.

Rust fundamentals solid

**Weeks 13-16**

Read OSTEP Chapters 1-20 (virtualisation). Start MIT 6.S081 Labs: Lab 0 (Unix utilities), Lab 1 (system calls). Read OSDev wiki: Bootloader.

Understand syscalls and processes

**Weeks 17-20**

Write your own BIOS bootloader in NASM. Goal: print 'ORION OS' on screen in QEMU. This is the hardest thing you have done. Spend as long as it takes. Read Intel SDM Vol 3 Chapter 2-3.

Bootloader that boots in QEMU

**Weeks 21-24**

Switch to 32-bit protected mode. GDT setup. Read Intel SDM Vol 3 Chapter 3-4. Read OSDev wiki: Protected Mode, GDT Tutorial. MIT Lab 2 (memory allocator).

Boot in 32-bit protected mode

**Weeks 25-28**

Switch to 64-bit long mode. Enable paging. Set up page tables. Read Intel SDM Vol 3 Chapter 4. Read OSDev wiki: Long Mode.

Boot in 64-bit long mode with paging

**Weeks 29-32**

Read Rust Embedded Book. Jump from bootloader into first Rust function. No\_std kernel entry. Linker script. MIT Lab 3 (page tables). Read Phil Opp Part 1-3.

Rust code running on bare metal

**Weeks 33-36**

Interrupt handling. IDT setup. APIC configuration. Handle keyboard interrupt. Handle timer interrupt. Read Intel SDM Vol 3 Chapter 6-7. OSDev wiki: IDT, APIC.

Interrupts working

**Weeks 37-40**

Physical memory manager. Bitmap or buddy allocator. Allocate and free pages. Write tests. MIT Lab 4 (traps). Phil Opp Part 4.

Allocate memory pages

**Weeks 41-44**

Virtual memory. Map virtual to physical. Handle page faults. Set up kernel heap. MIT Lab 5 (lazy allocation). Phil Opp Part 5-6.

Virtual memory and kernel heap working

**Weeks 45-48**

Basic process model. PCB. Simple round-robin scheduler. Context switch in Assembly. Two processes running simultaneously. MIT Lab 6 (multithreading).

Two processes running concurrently

# **8\. Communities & People to Follow**

**Community / Person**

**Where / URL**

**Type**

**OSDev Forum**

forum.osdev.org — Primary community. 15+ year archive of questions and answers. Search before posting.

Forum

**Rust Embedded Working Group**

github.com/rust-embedded/wg — Official working group for bare metal Rust. Active, welcoming.

GitHub / Matrix

**SerenityOS Discord**

discord.gg/serenityos — Active OS development community. Andreas Kling often participates.

Discord

**Redox OS Chat**

matrix.to/#/#redox-os:matrix.org — Rust microkernel community. Closest to Orion OS architecture.

Matrix

**Linus Torvalds**

Linux kernel mailing list — Read his kernel submissions and rejections to understand kernel quality standards.

LKML

**Andreas Kling**

youtube.com/@awesomekling — SerenityOS creator. Watch live OS development decisions.

YouTube

**Jon Gjengset**

youtube.com/@jonhoo — Advanced Rust deep dives. Best Rust education on YouTube.

YouTube

**Low Level Learning**

youtube.com/@lowlevellearning — Practical low-level systems content.

YouTube

**Tsoding Daily**

youtube.com/@TsodingDaily — Systems programming live coding. C and Rust.

YouTube

**Fuchsia OS Developers**

groups.google.com/a/fuchsia.dev — Fuchsia/Zircon team discussions. Learn from Google's microkernel decisions.

Google Groups

# **9\. SteamOS — Study This**

**Why Study SteamOS**

SteamOS 3.0 (Steam Deck) is the most successful gaming Linux distribution ever built. It solved problems that Linux gaming had for 30 years. Orion OS's gaming subsystem must understand every decision Valve made and why — to learn from their solutions and identify what can be done better at the kernel level.

**Topic**

**What to Know**

**SteamOS is Arch Linux + Valve additions**

Built on Arch Linux rolling release. KDE Plasma desktop. Wayland + Pipewire. Read-only root filesystem. A/B update partitions.

**Gamescope compositor**

Valve's custom Wayland compositor for gaming. Resolution scaling, VRR, HDR, frame pacing, per-game display contexts. Source: github.com/ValveSoftware/gamescope

**Proton compatibility layer**

Wine fork + DXVK (DX9-11→Vulkan) + VKD3D-Proton (DX12→Vulkan) + Steam Linux Runtime container. Source: github.com/ValveSoftware/Proton

**Immutable root filesystem**

OS partition is read-only. Games and data on separate partition. Cannot corrupt the OS. Updates via A/B partition swap.

**Pipewire audio**

Low-latency audio graph that handles gaming, streaming, and communication simultaneously without conflicts.

**What Orion OS does better**

Kernel-level anti-cheat attestation (SteamOS cannot do this — Linux kernel integrity is unprovable). Real-time scheduler by design (SteamOS patches PREEMPT\_RT). Gaming compositor built into Nova compositor (not a separate product). Shader cache shared globally at OS level.

## **SteamOS Resources to Study**

*   github.com/ValveSoftware/gamescope — Read entire compositor source
*   github.com/ValveSoftware/Proton — Understand the compatibility layer architecture
*   github.com/ValveSoftware/steam-runtime — The container that isolates game library dependencies
*   Valve's GDC talks on YouTube — 'Steam Deck Hardware Deep Dive', 'Proton: Past, Present, Future'
*   ProtonDB.com — 75,000+ game compatibility reports. See which games fail and why.
*   github.com/lutris/lutris — Alternative game launcher. Different compatibility approach.
*   github.com/nicowillis/linux-gaming-guide — Comprehensive current-state Linux gaming guide.

# **10\. Multi-Platform Learning Resources**

**Resource**

**Description**

**Platform**

**ARM Architecture Reference Manual**

developer.arm.com/documentation/ddi0487. ARMv8-A/v9-A. Exception model, memory model, system registers. Required for Orion Mobile and Orion Auto.

ARM64 port

**ARM Cortex-M Programming Guide**

developer.arm.com — Cortex-M33/M55 for Orion Watch. MPU-based memory protection (no MMU). Thumb-2 instruction set. Interrupt priority model.

Orion Watch

**RISC-V ISA Specification**

riscv.org. Unprivileged + Privileged specs. Simpler than x86 — good for understanding ISA design.

RISC-V port

**Linux on Mobile (postmarketOS)**

postmarketos.org — Linux port to Android phones. Understand mobile driver challenges.

Orion Mobile

**Automotive Grade Linux (AGL)**

automotivelinux.org — Automotive Linux reference. CAN bus, AUTOSAR, safety requirements.

Orion Auto

**ISO 26262 Overview**

Functional safety for road vehicles. Read the overview (full standard is expensive). Required context for Orion Auto.

Orion Auto

**Zephyr RTOS**

zephyrproject.org — Embedded RTOS. Best reference for ultra-minimal OS design. Orion Embedded and Orion Watch are inspired by it.

Orion Watch / Embedded

**Android Open Source Project (AOSP)**

source.android.com — Mobile OS architecture. HAL design, Binder IPC, power management.

Orion Mobile reference

**Wear OS Architecture**

developer.android.com/training/wearables — How wearable OS handles: ambient mode, health APIs, BLE sync, power budgets.

Orion Watch reference

**Raspberry Pi Hardware Docs**

datasheets.raspberrypi.com — BCM2711/BCM2712 SoC docs. GPIO, I2C, SPI, UART, CSI. Required for Nova SBC Raspberry Pi support.

Nova SBC

**Rockchip RK3588 TRM**

radxa.com/files/RK3588\_TRM — Technical Reference Manual for RK3588 SoC. Used in Rock 5, Orange Pi 5.

Nova SBC

**StarFive JH7110 Datasheet**

starfivetech.com — RISC-V SBC SoC. VisionFive 2 board. Good for RISC-V + SBC overlap.

Nova SBC / RISC-V

**Bluetooth Core Specification 5.3**

bluetooth.com/specifications — BLE protocol stack. GATT, GAP, ATT, SMP. Required for Orion Watch BLE stack.

Orion Watch

**Zephyr BLE Stack**

docs.zephyrproject.org/latest/connectivity/bluetooth — Best open BLE implementation reference. Study before writing Orion Watch BLE.

Orion Watch

**FreeRTOS Documentation**

freertos.org — Ultra-minimal RTOS. Study tick-less idle, minimal RAM scheduler. Orion Watch kernel takes inspiration.

Orion Watch

# **11\. Formal Verification Resources**

**When to Start Formal Verification**

Do not start formal verification until you have a working kernel. Verifying non-existent code is meaningless. Start verification when: (1) the capability system design is finalised, (2) the memory manager is working and tested, (3) you have at least 2 years of kernel development experience.

**Resource**

**Description**

**When**

**Software Foundations (Coq)**

softwarefoundations.cis.upenn.edu — Free. Coq proof assistant from first principles. The math behind formal verification.

Start after Year 3

**The SeL4 Proofs**

github.com/seL4/l4v — The actual Isabelle/HOL proofs for seL4. Most ambitious open-source verification effort. Study the structure.

Year 4+

**TLA+ (Leslie Lamport)**

learntla.com — Model checking for distributed systems and concurrent algorithms. Lighter than full theorem proving.

Year 2-3

**Frama-C**

frama-c.com — C program formal analyser. Useful for verifying C components during bootstrap phase.

Year 2+

**Kani (Rust formal verification)**

model-checking.github.io/kani — Rust model checker from AWS. Formally verify Rust code. Closest to Orion OS use case.

Year 2+

**'How seL4 is Verified' — Klein talks**

YouTube — Gernot Heiser and Gerwin Klein lectures on seL4 verification methodology. Watch before starting.

Year 2-3

# **12\. Missing Resources — Filling the Gaps**

## **12.1 Rust Async Programming**

**Resource**

**Description & URL**

**Phase**

**Async Rust Book**

rust-lang.github.io/async-book — The official async Rust reference. Futures, async/await, Tokio, Pin. Essential for writing async Orion OS daemons and the Nova network stack.

Phase 2

**Tokio Documentation**

tokio.rs/tokio/tutorial — Tokio async runtime tutorial. Even though Orion OS does not use Tokio in the kernel, understanding it teaches async patterns used throughout Orion OS userspace.

Phase 2

**Jon Gjengset — Decrusting Futures**

youtube.com/@jonhoo — 'Decrusting the tokio crate' and async Rust deep dives. Best explanation of how Rust async actually works under the hood.

Phase 2

**Asynchronous Programming in Rust (book)**

packtpub.com — Comprehensive async Rust. Covers: event loops, executors, async I/O, structured concurrency. Read alongside Tokio docs.

Phase 2

## **12.2 Driver Writing Resources**

**Resource**

**Description & URL**

**Phase**

**Linux Device Drivers (3rd Ed)**

lwn.net/Kernel/LDD3 — Free PDF. Despite being Linux-specific, the fundamental concepts (char devices, block devices, network devices, interrupt handling, DMA) apply to all OS driver development. Read chapters 1-10 and 15-17.

Phase 2

**Writing a Simple Linux Kernel Module**

derekmolloy.ie/writing-a-linux-kernel-module — Step-by-step kernel module tutorial. Teaches the mechanics of driver registration, interrupts, and hardware access.

Phase 1-2

**Rust Driver Writing (Linux)**

rust-for-linux.com — Documentation for writing Linux kernel drivers in Rust. The patterns translate directly to Orion OS userspace driver architecture.

Phase 2

**UEFI PI Specification (EDK2 docs)**

tianocore.github.io — Reference for UEFI driver development. Orion OS UEFI bootloader must understand UEFI driver protocols.

Phase 1

**PCIe in Practice**

youtube.com — 'PCIe for Beginners' playlist by Lauterbach. Understanding PCIe is required for writing any PCIe-connected device driver (GPU, NVMe, network).

Phase 2

## **12.3 Embedded Rust & Bare Metal**

**Resource**

**Description & URL**

**When**

**Rust Embedded Book**

docs.rust-embedded.org/book — Essential. No\_std Rust for microcontrollers. PAC (Peripheral Access Crate), HAL (Hardware Abstraction Layer), RTIC (Real-Time Interrupt Concurrency). Required reading before writing any bare-metal Orion OS code.

Phase 1 — Read Now

**The Embedonomicon**

docs.rust-embedded.org/embedonomicon — How to bootstrap Rust on bare metal from absolute zero. Custom linker scripts, memory layout, startup code. Most detailed bare-metal Rust reference.

Phase 1

**Embedded Rust Community**

matrix.to/#/#rust-embedded:matrix.org — Active Matrix community. Ask questions about no\_std, HAL design, specific microcontroller issues. Very welcoming to newcomers.

Ongoing

**Cortex-M Quickstart**

github.com/rust-embedded/cortex-m-quickstart — Template for starting a Cortex-M Rust project. Orion Watch development starts here.

Orion Watch Phase

## **12.4 Compiler Design — Video Courses**

**Resource**

**Description & URL**

**When**

**LLVM Tutorial — Kaleidoscope**

llvm.org/docs/tutorial — Build a complete compiler (the Kaleidoscope language) using LLVM infrastructure. The definitive LLVM tutorial. Goes from lexer to JIT compilation.

Phase 3

**CS143 Compilers (Stanford)**

web.stanford.edu/class/cs143 — Free online. Video lectures, assignments. Build a complete compiler for COOL language. Covers: lexing, parsing, semantic analysis, code generation.

Phase 3

**Build a Compiler in Rust**

youtube.com — 'Building a Compiler in Rust' series by various creators. Practical Rust implementation of compiler concepts.

Phase 3

**Cranelift Developer Docs**

cranelift.dev — Internal architecture docs for Cranelift. Essential for building the Nova WASM JIT runtime and understanding Cosmos Compiler backend design.

Phase 3

**SSA (Static Single Assignment) Form**

cs.princeton.edu — Understanding SSA is required for building an optimising compiler. Cosmos Compiler's IR uses SSA form. Princeton lecture notes are the best free resource.

Phase 3

## **12.5 Security Research Resources**

**Resource**

**Description & URL**

**When**

**pwn.college**

pwn.college — Free. Learn binary exploitation, reverse engineering, kernel exploitation. Understanding attacks is essential for designing defences. Teaches exactly the class of bugs Orion OS is designed to prevent.

Phase 2+

**LiveOverflow (YouTube)**

youtube.com/@LiveOverflow — Exploit development, CTF writeups, kernel security. Explains real-world vulnerabilities in Linux and Windows. Essential for understanding what Orion OS security must defend against.

Phase 2+

**Google Project Zero Blog**

googleprojectzero.blogspot.com — The world's most sophisticated security research team. Real vulnerability analyses. Read to understand the threat model at the highest level.

Phase 2+

**The Art of Exploitation**

nostarch.com/hacking2 — Jon Erickson. Exploit development from first principles. Memory layout, shellcode, heap exploitation. Understanding this is required for designing Orion OS memory safety.

Phase 2

**Kernel Exploitation Techniques**

github.com/xairy/linux-kernel-exploitation — Comprehensive list of Linux kernel exploitation techniques. Read to understand what capability isolation and formal verification protect against.

Phase 2+

**OWASP Security Knowledge Framework**

owasp.org — Web and app security standards. Relevant for Orion OS app sandbox design and the capability permission model for web-facing apps.

Phase 3+

## **12.6 RISC-V Learning Resources**

**Resource**

**Description & URL**

**When**

**RISC-V ISA Specification**

riscv.org/technical/specifications — The authoritative specification. Unprivileged ISA (instructions), Privileged ISA (supervisor mode, page tables, interrupts). Read Privileged spec before writing Orion OS RISC-V port.

Phase 2

**RISC-V Assembly Programming**

riscv.org/wp-content/uploads/2017/05/riscv-spec-v2.2.pdf — RISC-V is simpler and cleaner than x86. Learning RISC-V assembly is easier than x86-64 and teaches the same concepts.

Phase 1

**SiFive HiFive Boards**

sifive.com — Real RISC-V hardware. HiFive Unmatched: full Linux-capable RISC-V board. Essential for Orion OS RISC-V port testing. Buy one in Phase 2.

Phase 2

**RISC-V Bytes (blog)**

danielmangum.com/posts — Deep dives into RISC-V internals. Supervisor mode, SBI (Supervisor Binary Interface), page tables. Best written RISC-V systems content available.

Phase 2

**Writing a RISC-V OS in Rust**

github.com/sgmarz/osblog — 'The Adventures of OS' blog. Complete tutorial for building an OS for RISC-V in Rust. Direct inspiration for Orion OS RISC-V port.

Phase 2

**VisionFive 2 (StarFive)**

starfivetech.com/visionfive2 — Affordable RISC-V SBC with 8GB RAM. Good first RISC-V test board. Community support growing rapidly.

Phase 2 hardware

## **12.7 Formal Methods Courses**

**Resource**

**Description & URL**

**When**

**Software Foundations (online)**

softwarefoundations.cis.upenn.edu — Free. Four volumes. Coq proof assistant from absolute scratch. The mathematical foundation for formal verification. Start with Volume 1 (Logical Foundations) when kernel design is stable.

Year 3+

**TLA+ Video Course (Hillel Wayne)**

learntla.com/video-course — The best introduction to TLA+ model checking. Hillel Wayne's course is clear, practical, and free. Learn TLA+ before Coq — it is more immediately applicable to OS design.

Year 2-3

**Formal Verification of Programs (MIT OCW)**

ocw.mit.edu — MIT 6.820 Fundamentals of Program Analysis. Covers: dataflow analysis, abstract interpretation, model checking, theorem proving.

Year 3+

**Gernot Heiser — seL4 Verification Talks**

youtube.com — Gernot Heiser's talks on seL4 verification methodology. Watch before starting formal verification work. Context on what seL4 proved and how long it took.

Year 2

**Isabelle/HOL Tutorial**

isabelle.in.tum.de/documentation — Official tutorial. Start with 'Programming and Proving in Isabelle/HOL'. The tool used to verify seL4.

Year 4+

# **13\. Progress Tracking**

**Update This Regularly**

Review and update this tracker every month. If a topic has been 'in progress' for more than 3 months without moving, that is a signal to seek help, change approach, or spend more focused time on it.

**Resource**

**Progress Status**

**Last Reviewed**

**CS:APP**

\[ \] Not started \[ \] Reading \[ \] Done \[ \] Labs done

\[ \] Reviewed

**Nand2Tetris**

\[ \] Not started \[ \] Part 1 \[ \] Part 2 \[ \] Complete

\[ \] Reviewed

**The Rust Book**

\[ \] Not started \[ \] Reading \[ \] Done \[ \] Exercises done

\[ \] Reviewed

**Programming Rust**

\[ \] Not started \[ \] Reading \[ \] Done

\[ \] Reviewed

**Rust Embedded Book**

\[ \] Not started \[ \] Reading \[ \] Done

\[ \] Reviewed

**OSTEP**

\[ \] Not started \[ \] Reading \[ \] Done \[ \] Homework done

\[ \] Reviewed

**MIT 6.S081**

\[ \] Not started \[ \] Labs 0-3 \[ \] Labs 4-6 \[ \] Complete

\[ \] Reviewed

**Linux Kernel Development**

\[ \] Not started \[ \] Reading \[ \] Done

\[ \] Reviewed

**Engineering a Compiler**

\[ \] Not started \[ \] Reading \[ \] Done

\[ \] Reviewed

**Intel SDM Vol 3**

\[ \] Not started \[ \] Chapters 1-4 \[ \] Chapters 5-10 \[ \] Reference

\[ \] Reviewed

**UEFI Specification**

\[ \] Not started \[ \] Boot services \[ \] Complete

\[ \] Reviewed

**NVMe Specification**

\[ \] Not started \[ \] Reading \[ \] Done

\[ \] Reviewed

**Thompson 1984 paper**

\[ \] Not started \[ \] Read

\[ \] Reviewed

**seL4 paper**

\[ \] Not started \[ \] Read

\[ \] Reviewed

**io\_uring paper**

\[ \] Not started \[ \] Read

\[ \] Reviewed

**ZFS paper**

\[ \] Not started \[ \] Read

\[ \] Reviewed

**WASM paper**

\[ \] Not started \[ \] Read

\[ \] Reviewed

**Post-Quantum NIST specs**

\[ \] Not started \[ \] Read

\[ \] Reviewed