---
title: "Orion Vol6 Developer Tools"
sidebar_position: 13
---

**PROJECT ORION OS**

**Vol 6: Developer Tools & Workflow**

_Every tool for every task — categorised, recommended, and ranked. Updated with visualisation tools, AI/ML tooling, and new workflow sections._

Revision 2.0 • May 2025

# **Contents**

§1 Environment Setup • §2 Kernel & Driver Dev • §3 Visualisation & Design • §4 Filesystem & Storage • §5 Networking • §6 Performance & Profiling • §7 Build System & CI/CD • §8 Driver Hardware Dev • §9 AI/ML Tools • §10 Security Tools • §11 Documentation • §12 New: Innovative Nova-Specific Tools • §13 Daily Workflow Playbook

# **§1 — Environment Setup**

**Start Here**

Complete this setup in one session before any kernel work. Every tool below is required.

**Tool**

**Install Command**

**Purpose**

**Orion OS Use**

Homebrew (macOS)

brew (pre-installed)

Package manager for macOS dev tools

Install all tools below on macOS

QEMU

brew install qemu / apt install qemu-system-x86

Full system emulator: x86, ARM, RISC-V

Run Orion OS kernel without real hardware

Rust toolchain

curl --proto '=https' https://sh.rustup.rs | sh

Cosmos kernel primary language

All kernel code, all userspace services

NASM

brew install nasm / apt install nasm

x86 assembler

Nova bootloader + early kernel assembly stubs

GDB

brew install gdb / apt install gdb

Debugger — works with QEMU -s -S flags

Kernel debugging with breakpoints

LLVM / Clang

brew install llvm / apt install llvm

Compiler toolchain

Rust uses LLVM; needed for objdump/readelf

x86\_64-elf toolchain

brew install x86\_64-elf-gcc

Cross-compiler for bare-metal x86

Build kernel without host libc contamination

VSCode + extensions

brew install --cask visual-studio-code

IDE with Rust-analyzer, QEMU support

Daily driver for all Nova development

rust-analyzer

code --install-extension rust-lang.rust-analyzer

Rust IDE support

Code completion, type hints, inline errors

just

cargo install just

Modern task runner (replaces Make)

nova just build, just qemu, just test

cargo-fuzz

cargo install cargo-fuzz

Fuzzing for Rust code

Test Vega FS parser, packet parsers

Kani

cargo install --locked kani-verifier

Rust model checker — formal verification

Verify DDR-013 targets in kernel code

Miri

rustup component add miri

Rust undefined behaviour detector

Catch UB in unsafe Rust blocks (kernel)

rustfmt + clippy

rustup component add rustfmt clippy

Formatter + linter

Enforce code style on every PR

### **First Day Setup — Exact Command Sequence**

_\# 1. Install Rust_

curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

_\# 2. Add bare-metal target_

rustup target add x86\_64-unknown-none aarch64-unknown-none riscv64gc-unknown-none-elf

_\# 3. Add Rust components_

rustup component add rust-src llvm-tools-preview rustfmt clippy miri

_\# 4. Install just_

cargo install just

_\# 5. Install QEMU (macOS)_

brew install qemu

_\# 6. Test: boot QEMU_

qemu-system-x86\_64 -nographic -m 64M # should show blank screen — ready for your bootloader

# **§2 — Kernel & Driver Development Tools**

**Tool**

**Purpose**

**Why It's Useful**

**Orion OS Application**

QEMU + GDB (daily driver)

Full system emulation + debugging

Debug kernel with breakpoints, inspect registers. QEMU flags: -s -S -serial stdio

Run Cosmos kernel; attach GDB to debug crashes

KGDB

Kernel-specific GDB protocol

Debug running kernel on real hardware over serial

Debug Nova on physical x86 hardware

GDB scripts

Automate debug sequences

Write .gdbinit macros for kernel data structure inspection

Custom scripts for Nova capability table dumps

Kani

Rust model checker — formal verification

Prove Rust code properties: no data races, no overflow

Verify Nova capability system, IPC, memory manager

Miri

Rust UB detector

Catch undefined behaviour in unsafe blocks

Validate every unsafe&#123;&#125; block in Cosmos kernel

cargo-fuzz / libFuzzer

Fuzz testing

Generate random inputs and find panics/crashes

Fuzz Vega FS parser, network packet parsers

AddressSanitizer (ASan)

Memory bug detector

UAF, heap overflow detection

C bootstrap code safety checks

UBSan

Undefined behaviour detector

Signed overflow, misaligned access

Bootstrap C code checks

valgrind

Memory error analysis

Use-after-free, leak detection in userspace code

Nova services before moving to Rust

cargo-llvm-cov

Code coverage

Track what percentage of kernel code is tested

CI gate: require &gt;80% test coverage on core

cargo-nextest

Parallel test runner

3× faster than cargo test

Speed up CI on every PR

perf + flamegraph

CPU profiling + visualisation

Find kernel hotspots; generate flame charts

Optimise IPC fast path and scheduler

stress-ng

Stress testing

Push scheduler, memory manager, IPC to edge cases

Stability testing before each phase milestone

hyperfine

CLI benchmarking

Compare Nova utilities vs GNU equivalents

orion-cp vs cp, orion-ls vs ls benchmarks

# **§3 — Visualisation & Design Tools**

**New Section**

Added from dummy.md analysis. These tools are essential for communicating architecture to contributors and for documenting DDRs visually.

**Tool**

**Purpose**

**Why It's Useful**

**Orion OS Use**

Excalidraw (excalidraw.com)

Hand-drawn style architecture diagrams

Simple, collaborative, self-hostable. No account needed. Best for whiteboarding.

Quick kernel subsystem sketches, DDR diagrams

Mermaid.js

Code-based diagrams in Markdown

Version-controlled diagrams — lives in docs repo. Integrates with GitHub.

Vol 2 architecture diagrams, IPC flow charts

D2 (d2lang.com)

Text-to-diagram (simpler than Mermaid)

CLI-first, cleaner syntax than Mermaid for complex diagrams

System architecture overviews in docs

Graphviz / dot

Automated graph visualisation

Generate call graphs from Rust code with macros

Kernel call graph, capability delegation trees

Penpot (penpot.app)

UI/UX design — open source Figma

Vector-based, collaborative, no vendor lock-in

Orion Settings app, aurora UI design

yEd Live

Advanced diagram editor

Drag-and-drop, SVG/PDF export, auto-layout

IPC message flow diagrams, boot sequence

Obsidian

Knowledge base with backlinks

Markdown-based, graph view, links DDRs together

Tracking design decisions, linking DDR cross-refs

TikZ (LaTeX)

Mathematical/precise diagrams

Best for papers and formal specification documents

Orion OS technical papers, formal spec diagrams

### **📐 Diagram Recommendation by Use Case**

**Use Case**

**Recommended Tool**

**Why**

Quick architecture sketch

Excalidraw

Fastest from idea to diagram — no setup

DDR documentation diagrams

Mermaid.js in Markdown

Version-controlled, lives in the DDR file

Auto-generated call graphs

Graphviz

Generate from Rust code, update automatically

UI/UX mockups for Nova apps

Penpot

Open-source, collaborative, exportable

Formal spec / paper diagrams

TikZ

Precise, beautiful, reproducible

Complex IPC flow charts

yEd Live

Auto-layout handles many-node diagrams

# **§4 — Filesystem & Storage Tools**

**Tool**

**Purpose**

**Why It's Useful**

**Orion OS Use**

fio

Filesystem benchmarking — IOPS, throughput, latency

Industry standard. Parameterised test profiles.

Benchmark Vega FS vs ext4 / btrfs. CI gate for regressions.

blktrace / blkparse

Block layer I/O tracing

Debug storage stack — see every request at block level

NVMe driver debugging, queue depth analysis

nvme-cli

NVMe device management

Inspect NVMe namespaces, send admin commands, check health

Nova NVMe driver testing and validation

smartctl

SMART data and disk health

Monitor SSD wear level — feeds Nova hardware aging compensation

Hardware aging compensation data source

dd + pv

Low-level disk I/O with progress

Test raw device read/write speed

Test Nova block device layer performance

btrfs-heatmap

Visualise btrfs block usage

Understand block placement — inspiration for Vega FS tooling

Design vega-stats visualisation tool

testdisk

Data recovery

Test Vega FS robustness — can we recover from partial corruption?

Vega FS disaster recovery testing

parted / fdisk

Partition table manipulation

Test Nova disk layout and partition handling

orion-disk tool development

hdparm

HDD/SSD parameter tuning

Test legacy HDD characteristics for old-hardware target

Old hardware compatibility testing

vega-stats (TODO)

Vega FS-specific stats

Custom: block utilisation, checksum verification rate, snapshot count

Build this as first Vega FS userspace tool

**💡 Benchmark Strategy**

Run fio with three profiles: (1) 4K random read/write (SSD IOPS limit), (2) 128K sequential (throughput limit), (3) 1M sequential (CPU + checksum overhead). Compare Vega FS vs ext4 on same hardware. Anything within 10% of ext4 is acceptable for Phase 1.

# **§5 — Networking Tools**

**Tool**

**Purpose**

**Why It's Useful**

**Orion OS Use**

Wireshark

Packet capture and deep analysis

See every byte on the wire with full protocol decode

Debug ether-d TCP/IP stack during development

tshark

CLI Wireshark — scriptable

Automate packet analysis in CI

Regression test for network stack correctness

iperf3

Network throughput testing

Measure TCP/UDP throughput between two hosts

Benchmark ether-d performance vs Linux

netperf

Network latency testing

Measure request/response latency — critical for IPC-over-network

Validate &lt;1ms latency target for ether-d

scapy (Python)

Packet crafting and injection

Test edge cases: malformed packets, fragmentation

Fuzz ether-d with crafted malformed inputs

nmap

Network scanning

Test orion-pf firewall rules — confirm deny-all works

Validate network capability model isolation

socat

Multipurpose relay — sockets, pipes, serial

Test socket behaviour edge cases

Test ether-d socket semantics

WireGuard tools (wg)

WireGuard VPN configuration

Nova integrates WireGuard into ether-d

Test WireGuard integration in ether-d

curl / wget

HTTP client

Test ether-d HTTP stack

comit uses HTTPS — validate QUIC stack

QEMU networking

QEMU user/tap networking

Test ether-d inside QEMU without real hardware

Most network development happens in QEMU

# **§6 — Performance & Profiling Tools**

**Tool**

**Purpose**

**Why It's Useful**

**Orion OS Use**

perf

CPU profiling — hardware counters

See cache misses, branch mispredictions, IPC

Identify scheduler and IPC bottlenecks

flamegraph

Visualise perf call stacks

One glance shows exactly where time is spent

Attach after every performance regression

heaptrack

Heap memory profiling

Find memory leaks in userspace Nova services

orion-init, ether-d memory leak detection

cargo-bloat

Binary size analysis

Find which crate is bloating the kernel binary

Keep kernel binary under target size

cargo-udeps

Unused dependency detector

Remove crates that aren't used — smaller binary

Lean kernel build

criterion.rs

Rust microbenchmarking

Statistical benchmarks with confidence intervals

Benchmark IPC fast path, capability lookup

dhat (heap profiling)

Rust heap profiler

Valgrind-based heap usage analysis for Rust

Vega FS memory usage during heavy workloads

QEMU performance counters

Hardware perf inside QEMU

Basic profiling without real hardware

Phase 1 kernel optimisation

sysbench

System-wide benchmarking

Test overall throughput: CPU, memory, I/O combined

Full system benchmark before each phase release

# **§7 — Build System & CI/CD**

**Tool**

**Purpose**

**Configuration**

**Orion OS Use**

Cargo

Rust build system — primary

Cargo.toml per crate

Build all Nova Rust code

just

Task runner replacing Make

justfile in repo root

just build, just qemu, just test, just clean

cargo-nextest

Parallel test runner (3× faster)

nextest.toml

All unit tests in CI

cargo-llvm-cov

Code coverage

.cargo/config.toml

CI gate: require &gt;80% on core kernel code

cargo-deny

Dependency license + security checking

deny.toml

Block GPL-contaminated or CVE-affected deps

cargo-audit

Known CVE scanner

run on every PR

Security CI check

GitHub Actions

CI/CD pipelines

.github/workflows/\*.yml

Build + test on every push and PR

QEMU in CI

Boot test in CI

qemu-system-x86\_64 in GitHub Actions runner

Catch kernel panics on every commit

Docker dev container

Reproducible dev environment

Dockerfile + devcontainer.json

Every contributor starts with identical env

mold linker

Fast linker — replaces ld

CARGO\_TARGET\_X86\_64\_LINKER=mold

Reduce link time from 30s to 3s

### **📋 Recommended CI Pipeline Stages (GitHub Actions)**

**Stage**

**Command**

**Pass Condition**

**Fail Action**

Format check

cargo fmt --check

Zero format errors

Block PR merge

Lint

cargo clippy -- -D warnings

Zero warnings

Block PR merge

Security audit

cargo audit

Zero known CVEs in deps

Block PR merge

Dependency check

cargo deny check

No GPL / no CVEs

Block PR merge

Unit tests

cargo nextest run

All tests pass

Block PR merge

Coverage

cargo llvm-cov --check

Coverage ≥ 80% on core

Block PR merge

QEMU boot test

just qemu-test

Kernel boots and prints NOVA OK

Block PR merge

Benchmark

cargo bench

No &gt;10% regression vs main

Comment on PR

# **§8 — Driver & Hardware Development Tools**

**Tool**

**Purpose**

**Why It's Useful**

**Orion OS Use**

USBPcap + Wireshark

USB packet capture

Debug USB HID, mass storage, audio drivers

USB driver development — see every transfer

PCIutils (lspci)

PCI device inspection

List all PCI devices, read config space

Debug PCIe GPU/NVMe driver enumeration

evtest

Input device testing

Test keyboard, mouse, gamepad events

Input driver development

v4l2-ctl

Video4Linux device testing

Debug camera and video capture drivers

Camera driver development

alsamixer / aplay

Audio device testing

Test HDA audio codec, USB audio

Audio driver development

ethtool / iw

Network/WiFi device testing

Inspect driver capabilities, manage WiFi channels

Network driver development

bluetoothctl

Bluetooth device testing

Debug Bluetooth stack and drivers

Bluetooth driver development

i2c-tools

I2C bus inspection

Debug touchpad, sensor, and embedded drivers

Input/sensor driver development

nvme-cli

NVMe admin commands

Full NVMe controller management

NVMe driver deep debugging

JTAG + OpenOCD

Hardware debug over JTAG

Debug kernel on real hardware at circuit level

Real hardware bring-up beyond QEMU

orion-hw-lab (TODO)

Automated hardware test suite

QEMU-based: test each driver against 100 virtual device configs

Build this as first Nova testing framework tool

# **§9 — AI/ML Tools for Orion OS**

**New Section**

These tools support orion-mld (userspace ML daemon) development and quasar-runtime (OS-level inference engine). Closely tied to Vol 9 ML strategy.

**Tool**

**Purpose**

**Orion OS Role**

**Status**

MicroTVM

Tiny ML inference engine — &lt;150KB, C

Kernel ML (Tier 1): workload classifier, anomaly detector

Primary kernel ML framework

tract-onnx (Rust)

Rust-native ONNX inference

Rust kernel ML — best long-term choice for no\_std

Alternative to MicroTVM for Rust kernel

ONNX Runtime

Cross-platform inference — CPU/GPU/NPU

orion-mld userspace daemon (Tier 2)

Powers all Tier 2 userspace ML models

Apache TVM

Model compilation and optimisation

Optimise ONNX models for Nova hardware targets

Pre-deployment model optimisation pipeline

Vulkan Compute

GPU compute shaders

GPU-accelerated inference in quasar-runtime

Cross-vendor GPU compute for AI workloads

OpenVINO (Intel)

Intel NPU/GPU inference

Intel Meteor Lake NPU driver backend

Intel NPU driver support

ROCm (AMD)

AMD GPU inference — open source

AMD GPU AI backend for quasar-runtime

AMD GPU AI workloads

ggml / llama.cpp

LLM inference library

Run 7B+ LLMs on Orion OS using quasar-runtime

User-facing AI assistant feature

WASM NN Proposal

WASM-based neural network inference

WASM apps call quasar-runtime via capability

Universal AI access for WASM apps

Keras → ONNX pipeline

Prototype ML models in Python, export to ONNX

Train orion-mld models — export for kernel embedding

ML model development workflow

orion-mld (TODO)

Nova ML daemon — userspace

Tier 2 ML: power predictor, malware detector, user intent

Build per Phase 3 in Vol 9 roadmap

# **§10 — Security Tools**

**Tool**

**Purpose**

**Why It's Useful**

**Orion OS Use**

Kani (also §2)

Rust formal verification

Prove kernel code correctness — no data races, no overflow

Verify DDR-013 targets: capability system, IPC, MM

cargo-fuzz

Fuzz testing

Random input generation → crash finding

Fuzz Vega FS, network packet parsers, IPC handlers

TPM2-Tools

TPM 2.0 management

Measured boot, PCR sealing, NVRAM counter

Test horizon-boot measured boot in QEMU with vTPM

Libsodium

Modern crypto library — reference

Simpler than OpenSSL. Void Crypto Library uses the same primitives.

Study for Void Crypto Library implementation

WireGuard (wg tool)

WireGuard VPN management

Configure and test WireGuard tunnels

Nova WireGuard integration in ether-d

syzkaller

Kernel syscall fuzzer

Google's tool for finding kernel bugs via random syscalls

Fuzz Nova syscall table after Phase 1 kernel

GDB + ASLR bypass scripts

Debug ASLR-protected binaries

Test Nova's ASLR implementation

Verify ASLR randomisation is correct

nmap + netcat

Network security testing

Port scanning + raw socket testing

Test orion-pf firewall rules and network capabilities

# **§11 — Documentation Tools**

**Tool**

**Purpose**

**Why It's Useful**

**Orion OS Use**

MkDocs + Material theme

Markdown documentation site

Beautiful docs, GitHub Pages deploy, search

Orion OS public documentation site

Docusaurus

React-based docs site

Versioned docs, i18n, blog built-in

Alternative to MkDocs for richer docs

rustdoc

Rust API documentation

Cargo doc generates API docs from /// comments

Cosmos kernel API documentation

mdbook

Rust-style books from Markdown

rustc, servo use this — great for guides

The Orion OS Developer Guide book

Mermaid.js in Markdown

Code-integrated diagrams

Diagrams version-controlled with docs

Vol 2 DDR diagrams, architecture charts

Obsidian

Knowledge base + backlinks

Link DDRs together, track design decisions, graph view

Personal DDR tracking + research notes

git-cliff

Changelog generation from commits

Auto-generate changelogs from conventional commits

Orion OS release notes automation

# **§12 — Innovative Nova-Specific Tool Proposals**

**Build These**

These are tools that don't exist yet but should be built specifically for Orion OS. Each one is both a useful tool and a demonstration of Orion OS capabilities.

### **nova energy**

Real-time per-process power accounting dashboard. Shows milliwatt usage per process, historical trends, and optimisation suggestions ('Close Firefox to save 2W'). Reads Intel RAPL + ARM PMU data from kernel energy capability.

**Volumes Referenced**

**Description**

**Build Priority**

Vol 1 §33, Vol 3

_nova energy_

**High**

### **nova time-machine**

Filesystem time-travel using Vega FS O(1) snapshots. Restore any file to any past state: nova time-machine restore /etc/config --time '24 hours ago'. Snapshots are instant and free — this tool is just a UI around what Vega FS already does.

**Volumes Referenced**

**Description**

**Build Priority**

Vol 3 Vega FS

_nova time-machine_

**High**

### **nova hw-lab**

Automated hardware driver testing framework. QEMU-based virtual hardware: test NVMe driver against 100 virtual device configurations in CI. Crowdsourced hardware compatibility reports from the community.

**Volumes Referenced**

**Description**

**Build Priority**

Vol 3 testing

_nova hw-lab_

**Medium**

### **nova ai**

On-device AI assistant for OS diagnostics. On-device 7B LLM via quasar-runtime (no data leaves device). Context-aware: knows Orion OS internals. Example: 'nova ai why is my WiFi slow?' → analyses signal, driver state, channel interference.

**Volumes Referenced**

**Description**

**Build Priority**

Vol 9, Vol 3

_nova ai_

**Medium**

### **nova pkg --sandbox**

Sandboxed package installation testing. Install a package into a temporary ephemeral namespace first. If it works: nova pkg install --accept. If it fails: system reverts automatically. Zero risk package installation.

**Volumes Referenced**

**Description**

**Build Priority**

Vol 3 comit

_nova pkg --sandbox_

**High**

### **nova debug connect**

Remote kernel debugging over USB serial or network. Debug Orion OS running on a Raspberry Pi from a developer machine: nova debug connect --serial /dev/ttyUSB0 --kernel /boot/cosmos-kernel. Crash dump analysis with automatic suggestion.

**Volumes Referenced**

**Description**

**Build Priority**

Vol 6

_nova debug connect_

**High**

### **nova offload**

Transparent computation offloading to a Nova server. For old hardware: heavy tasks are delegated to a nearby Nova server. nova offload render-video --server 192.168.1.100. Privacy-preserving: data encrypted in transit via ether-d WireGuard.

**Volumes Referenced**

**Description**

**Build Priority**

Vol 1 §11

_nova offload_

**Low**

# **§13 — Daily Development Workflow Playbook**

_Follow this sequence every development session. Consistency is more important than brilliance in OS development._

**Phase**

**Action**

**Tools**

**Time**

Morning — Orient

Pull latest. Review open issues. Check CI status.

git pull, GitHub Issues

5 min

Work — Build

Make a small, focused change. One subsystem at a time.

VSCode + rust-analyzer, cargo build

2-3 hrs

Work — Test

Run unit tests. Boot in QEMU. Check no regressions.

cargo nextest, just qemu

30 min

Work — Debug

If QEMU crashes: attach GDB. Inspect registers + stack.

GDB + QEMU -s -S flags

As needed

Work — Profile

If performance regression: flamegraph + perf.

perf record, flamegraph.pl

As needed

Work — Verify

If touching DDR-013 targets: run Kani on changed code.

kani --function &lt;fn\_name&gt;

As needed

End — Document

Update DDR or docs if design decision was made.

Markdown, Mermaid

15 min

End — Commit

Conventional commit format: type(scope): message.

git commit, git push

5 min

End — CI

Check GitHub Actions: all stages pass before moving on.

GitHub Actions web UI

5 min

Weekly — Review

Review DDR status, update Vol 7 problem dashboard.

Vol 7 docx, obsidian notes

30 min