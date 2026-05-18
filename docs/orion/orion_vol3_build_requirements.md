---
title: "Orion Vol3 Build Requirements"
sidebar_position: 9
---

**PROJECT ORION OS**

**Vol 3 — Complete Build Requirements**

_Everything Orion OS Must Build — The Master Checklist_

# **1\. Kernel Subsystems**

**The Core Rule**

The kernel is everything below userspace. Every item here is a component the Orion OS kernel owns completely. No third-party kernel code. No borrowed kernel subsystems. These are built in Rust + Assembly from the Orion Bootstrap phases.

## **1.1 Boot & Initialization**

**Component**

**What It Does & How**

**UEFI Bootloader**

Reads kernel from disk, sets up memory map, hands control to kernel. Written in Rust + Assembly. Must handle: GOP framebuffer, ACPI tables, memory map, UEFI exit.

**BIOS Bootloader (legacy)**

For old hardware without UEFI. 512-byte MBR stage 1 + larger stage 2. Pure Assembly.

**Kernel Entry Point**

Assembly trampoline: sets up stack, enables SSE/AVX, switches to long mode, calls Rust kernel\_main().

**GDT Setup**

Global Descriptor Table: defines kernel code/data segments, TSS for interrupt stack. Assembly + Rust.

**IDT Setup**

Interrupt Descriptor Table: 256 entries, each pointing to a handler. All 256 handlers in Assembly, dispatch to Rust.

**Early Console**

VGA text buffer or UEFI framebuffer output for debugging before drivers load. Essential for boot debugging.

**SMP Boot (AP startup)**

Bring up additional CPU cores: send INIT/SIPI IPIs, each AP runs startup trampoline, joins the scheduler.

**CPU Feature Detection**

CPUID: detect SSE/AVX/AES-NI/RDRAND/SGX/MTE/etc. Enable only what is present.

## **1.2 Memory Management**

**Component**

**What It Does**

**Physical Memory Manager**

Tracks which physical pages are free/used. Buddy allocator for page-granularity allocation. Built from the UEFI memory map at boot.

**Virtual Memory Manager**

Maps virtual addresses to physical pages. Creates/destroys page tables. Handles demand paging, copy-on-write.

**Kernel Heap (slab allocator)**

Fast fixed-size object allocator for kernel data structures. Per-CPU caches eliminate lock contention.

**ZRAM Subsystem**

Compresses cold pages with LZ4/Zstd. Transparent to all other kernel subsystems. Tunable compression ratio.

**Huge Pages**

2MB and 1GB page support. Reduces TLB pressure for large allocations. Transparent huge pages for AI tensors.

**NUMA Awareness**

Topology-aware allocation. Prefers local NUMA node. Migrates pages when access pattern shifts.

**CXL Memory Support**

Recognises CXL-attached memory as a NUMA node. Placement policy for hot vs cold data.

**Memory Tagging (ARM MTE)**

Tags every allocation on ARM. Detects use-after-free and buffer overflow in hardware.

**PIM Dispatch**

Identifies PIM-capable memory regions. Dispatches vector operations to in-memory compute units.

**Three-Tier Swap**

ZRAM → NVMe → HDD. Predictive prefetch. Compression before disk. Intelligent eviction scoring.

## **1.3 Process & Thread Management**

**Component**

**What It Does**

**Process Control Block (PCB)**

Per-process state: memory map, capability set, file handles, signal mask, thread list, scheduling info.

**Thread Control Block (TCB)**

Per-thread: register state, stack pointer, TLS pointer, scheduling priority, CPU affinity.

**Context Switch**

Assembly: saves all GP registers + FP/SIMD state to TCB, loads next thread's state, switches page tables.

**Fork / Spawn**

fork(): copy-on-write process duplication. spawn(): create fresh process from executable. Both use capability inheritance.

**Exec**

Replace current process image with new executable. Validates capability requirements before loading.

**Wait / Exit**

Process exit: release capabilities, wake waiting parents, reclaim resources. Zombie prevention.

**Thread Local Storage (TLS)**

Per-thread data area. Set up via FS/GS segment base on x86-64. Managed by the threading library.

**Signal handling**

Async signal delivery: queue signals, deliver at safe points, run signal handlers in userspace.

## **1.4 Scheduler**

**Component**

**What It Does**

**Workload Classifier**

Detects: interactive / batch / AI inference / real-time / gaming. Uses syscall patterns and CPU usage history.

**CFS-inspired base scheduler**

Fair CPU sharing for normal processes. O(log n) run queue via red-black tree. Tunable latency target.

**Real-Time Scheduler**

FIFO and round-robin real-time classes. Hard latency guarantees. Separate from normal scheduler.

**Heterogeneous Dispatch**

Schedules tasks to CPU / GPU / NPU / TPU. Understands compute unit capabilities and current load.

**Per-CPU Run Queues**

Each CPU has its own run queue. Load balancer migrates tasks when imbalance detected. Minimises cache thrashing.

**Thermal Governor**

Monitors CPU/GPU temps. Proactively throttles to stay below thermal limit. Prevents emergency throttling.

**Power Governor**

CPU frequency scaling: performance / balanced / powersave / eco. Per-core frequency on hybrid CPUs (P-cores vs E-cores).

**Gaming Mode**

Activated per-process. Boosts CPU/GPU clocks. Deprioritises background. Minimises scheduling latency.

**Deadline Scheduler**

For real-time tasks with explicit deadlines. Guarantees completion before deadline or raises alarm.

## **1.5 IPC & Capabilities**

**Component**

**What It Does**

**Capability System**

Every resource access requires a typed capability token. Kernel mints, transfers, and revokes capabilities. Unforgeable.

**Message Passing**

Synchronous and async typed messages between processes. Zero-copy where possible via shared memory handoff.

**Shared Memory**

Capability-gated shared memory regions. Both processes must hold compatible capabilities. Mapped into both address spaces.

**Pipes**

Unidirectional byte stream. Kernel buffer. Blocking read/write. O\_NONBLOCK support.

**Unix Sockets**

Bidirectional. Used for local service communication. Pass file descriptors and capabilities between processes.

**Signals**

Async notification. Defined set of signals. User-definable handlers. Real-time signals with queuing.

**Futexes**

Fast userspace mutexes. Kernel involvement only on contention. Basis for all threading primitives.

**Event Queues**

io\_uring-style async event submission and completion. Zero syscall overhead for batched I/O operations.

# **2\. Device Drivers**

**Driver Architecture**

ALL Orion OS drivers run in userspace processes. A driver crash = that process dies and is restarted. The kernel provides: DMA mapping API, interrupt delivery to userspace, MMIO mapping into driver address space, capability-gated hardware access.

## **2.1 Storage Drivers**

**Driver**

**What It Supports**

**NVMe driver**

PCIe NVMe protocol. Admin queues, I/O queues, namespace management. Supports NVMe-oF (over fabric).

**SATA/AHCI driver**

SATA hard drives and SSDs. AHCI port enumeration, command queuing (NCQ).

**USB Mass Storage**

USB BOT (Bulk-Only Transport) and UAS (USB Attached SCSI). For USB drives and external SSDs.

**SD/eMMC**

SD card and eMMC for mobile and embedded. SDIO for WiFi modules on mobile platforms.

**Virtio-blk**

Paravirtual storage for when Orion OS runs as a VM guest. Used for cloud and container deployments.

## **2.2 Network Drivers**

**Driver**

**What It Covers**

**Intel e1000e / igb / ixgbe**

Intel Gigabit and 10GbE Ethernet. Most common in x86 machines and servers.

**Realtek r8169**

Realtek Gigabit Ethernet. Very common in consumer motherboards.

**Intel WiFi (iwlwifi)**

Intel WiFi 6/6E/7 (AX200/AX210/BE200). Most common WiFi in modern laptops.

**Qualcomm Atheros (ath11k)**

WiFi 6 on many laptops and embedded boards.

**MediaTek WiFi (mt7921)**

Common in budget and ARM laptops.

**Virtio-net**

Paravirtual network for VM guests.

**USB WiFi (generic)**

USB WiFi dongle support via USB network class driver.

**Bluetooth HCI**

HCI (Host Controller Interface) over USB and UART. Base for all Bluetooth profiles.

**Cellular modem**

QMI and MBIM protocols for LTE/5G modems. Required for Orion Mobile.

**CAN bus**

Controller Area Network for Orion Auto. Socketcan-compatible interface.

## **2.3 GPU Drivers**

**Driver**

**What It Covers**

**Intel (xe / i915)**

Intel Arc and integrated graphics. Display engine, 3D engine, media engine, compute. Vulkan via Mesa.

**AMD (amdgpu)**

AMD Radeon discrete and integrated graphics. GFX + compute + display + video. Vulkan via RADV.

**NVIDIA (open kernel module)**

NVIDIA's own open-source kernel module (released 2022). Required for CUDA and gaming on NVIDIA hardware.

**Mali GPU driver**

ARM Mali for mobile SoCs. Used in most Android-class hardware. OpenGL ES and Vulkan.

**Qualcomm Adreno**

Qualcomm SoC GPU. Required for Orion Mobile on Snapdragon platforms.

**Apple GPU (AGX)**

For RISC-V/ARM targets. Reverse-engineered Asahi Linux driver as reference. Required for Apple Silicon.

**Virtio-gpu**

Paravirtual GPU for VM guests. 3D acceleration via virgl.

## **2.4 Input Drivers**

**Driver**

**What It Covers**

**USB HID**

USB Human Interface Device class. Covers keyboards, mice, gamepads, joysticks, tablets.

**PS/2 keyboard & mouse**

Legacy input. Still present on many machines. Required for broadest old-hardware support.

**I2C/SPI touchpad (libinput equivalent)**

Synaptics, ELAN, and generic I2C touchpads. Gesture recognition. Multi-touch.

**Touchscreen (Orion Mobile)**

Capacitive multi-touch. I2C-based. Gesture events: tap, swipe, pinch, rotate.

**Gamepad / Controller**

USB and Bluetooth gamepad support. XInput-compatible API for Nova games. Haptic feedback.

**Accelerometer / Gyroscope**

IIO (Industrial I/O) equivalent. Required for Orion Mobile and Orion Auto.

**Fingerprint sensor**

USB and I2C fingerprint readers. Nova biometric authentication API.

## **2.5 Display & Audio Drivers**

**Driver**

**What It Covers**

**DRM/KMS equivalent**

Kernel display framework: mode setting, scanout, gamma, colour management. VRR/FreeSync/G-Sync support.

**HDMI / DisplayPort**

Connector management, hot-plug detection, EDID parsing, audio info frame, CEC.

**eDP (laptop display)**

Embedded DisplayPort for laptop panels. Backlight control, brightness.

**HDA (High Definition Audio)**

Most common audio on x86. Codec enumeration, PCM playback/capture, HDMI audio.

**USB Audio**

USB Audio class 1 and 2. Plug-and-play audio devices.

**I2S Audio (mobile/embedded)**

I2S bus audio for SoC platforms. Used in Orion Mobile and Orion Auto.

**HDMI Audio**

Part of HDMI/DP driver. Multichannel PCM and compressed audio passthrough (AC-3, DTS, TrueHD, Atmos).

# **3\. Vega Filesystem (Vega FS)**

**Component**

**What It Does**

**On-disk format**

Superblock, block groups, inode table, extent tree, journal. CoW by design — writes never overwrite in place.

**Block allocator**

Extent-based allocation. Minimises fragmentation. SSD-aware (avoids small random writes). HDD-aware (sequential preference).

**Inode design**

Extended attributes, capability ACLs, inline data for small files, 64-bit timestamps (no 2038 problem).

**Journal**

Metadata journaling by default. Full data journaling optional. Crash recovery in &lt; 1 second.

**Copy-on-Write**

Snapshots are instant. No data is ever overwritten. Old versions remain until garbage collected.

**Checksums**

CRC32C on every metadata block. BLAKE3 on data blocks (optional, tunable). Silent corruption is impossible.

**Transparent compression**

LZ4 by default (fast), Zstd optional (higher ratio). Per-file and per-directory compression policy.

**Encryption**

ChaCha20-Poly1305 per-file encryption. Key derived from user credential + hardware TPM binding.

**Snapshot management**

Create/delete/list/mount snapshots. Diff between snapshots. Send/receive for backup.

**VFS layer**

Virtual Filesystem Switch: abstraction over Vega FS, FAT32, ext4 (read-only), tmpfs, procfs, devfs.

**FUSE equivalent**

Userspace filesystem framework. Safe, capability-gated. For SSHFS, cloud storage mounts, custom filesystems.

**FAT32 driver**

Read/write for USB interop. Every OS reads FAT32.

**ext4 driver (read-only)**

Read existing Linux filesystems. Data migration from Linux. No write support required.

**tmpfs**

RAM-based filesystem. /tmp, /run. Backed by ZRAM under memory pressure.

**procfs / sysfs equivalent**

Kernel information exported as a filesystem. Process info, hardware info, kernel parameters. Read-only tree.

**devfs**

Device files: /dev/null, /dev/urandom, /dev/tty, block devices, char devices. Managed by kernel, populated dynamically.

**Network filesystems**

NFS client (v3, v4), SMB/CIFS client. Mount remote filesystems transparently.

# **4\. Orion Libc — Complete Function List**

**The Rule**

Orion Libc is written entirely in Rust with a C-compatible ABI. Every function listed here must be implemented. These are the functions every program calls. Until Orion Libc is complete, musl libc fills the gaps (Phase B2).

## **4.1 Memory Functions**

**Function**

**Description**

**Header**

**memcpy**

Copy n bytes from src to dst. Non-overlapping. SIMD-optimised (AVX2/NEON).

stdlib

**memmove**

Copy n bytes allowing overlap. Handles direction automatically.

stdlib

**memset**

Fill n bytes with value. SIMD-optimised.

stdlib

**memcmp**

Compare n bytes. Returns &lt;0, 0, >0.

stdlib

**malloc**

Allocate heap memory. Returns aligned pointer or NULL.

stdlib

**calloc**

Allocate zeroed memory. count \* size bytes.

stdlib

**realloc**

Resize allocation. May move to new location.

stdlib

**free**

Release allocation. No double-free (Rust ownership tracks this).

stdlib

**aligned\_alloc**

Allocate with specific alignment. Required for SIMD buffers.

stdlib

**posix\_memalign**

POSIX-compatible aligned allocation.

stdlib

## **4.2 String Functions**

**Function**

**Description**

**Header**

**strlen**

Length of null-terminated string.

string.h

**strcpy / strncpy**

Copy string. strncpy limits length.

string.h

**strcmp / strncmp**

Compare strings. strncmp limits length.

string.h

**strcat / strncat**

Concatenate strings.

string.h

**strstr**

Find substring in string.

string.h

**strchr / strrchr**

Find character in string (first/last).

string.h

**strtok / strtok\_r**

Tokenise string by delimiter. \_r is reentrant.

string.h

**strtol / strtoul / strtoll**

String to integer with base and error detection.

stdlib.h

**strtod / strtof**

String to float/double.

stdlib.h

**snprintf / sprintf**

Format string into buffer. snprintf is bounds-safe.

stdio.h

**sscanf**

Parse formatted string.

stdio.h

**strdup / strndup**

Duplicate string (allocates memory).

string.h

**strcasecmp / strncasecmp**

Case-insensitive string comparison.

strings.h

## **4.3 I/O Functions**

**Function**

**Description**

**Header**

**printf / fprintf / dprintf**

Print formatted output to stdout / file / fd.

stdio.h

**scanf / fscanf**

Read formatted input from stdin / file.

stdio.h

**fopen / fclose**

Open/close FILE\* stream.

stdio.h

**fread / fwrite**

Read/write binary data to FILE\* stream.

stdio.h

**fgets / fputs**

Read/write line to FILE\* stream.

stdio.h

**fseek / ftell / rewind**

Seek within FILE\* stream.

stdio.h

**fflush / feof / ferror**

Flush / check end / check error on FILE\*.

stdio.h

**perror / strerror**

Print/return error description for errno.

stdio.h / string.h

**read / write**

Raw fd read/write. Lowest level I/O syscall wrapper.

unistd.h

**open / close**

Open/close file descriptors.

fcntl.h

**lseek**

Seek within a file descriptor.

unistd.h

**ioctl**

Device control. Used by most drivers.

sys/ioctl.h

**mmap / munmap**

Map file or anonymous memory into address space.

sys/mman.h

**poll / select / epoll**

Wait for events on multiple file descriptors.

poll.h / sys/select.h

## **4.4 Math Functions**

**Function**

**Description**

**Header**

**sin/cos/tan**

Trigonometric functions. Hardware FPU or SIMD accelerated.

math.h

**asin/acos/atan/atan2**

Inverse trig. atan2 is two-argument.

math.h

**sqrt/cbrt**

Square and cube root.

math.h

**pow/exp/log/log2/log10**

Power, exponential, logarithm.

math.h

**ceil/floor/round/trunc**

Rounding functions.

math.h

**fabs/fmod/remainder**

Absolute value, modulo, remainder.

math.h

**hypot**

sqrt(x²+y²) without overflow.

math.h

**fma**

Fused multiply-add. Single rounding. SIMD-accelerated.

math.h

**isinf/isnan/isfinite**

Float classification predicates.

math.h

## **4.5 Threading & Synchronization**

**Function**

**Description**

**Header**

**orion\_thread\_create**

Create thread with stack size, priority, affinity.

nova/thread.h

**orion\_thread\_join**

Wait for thread completion, get return value.

nova/thread.h

**orion\_thread\_detach**

Detach thread. Resources freed on exit.

nova/thread.h

**orion\_mutex\_init/lock/unlock/destroy**

Mutual exclusion. Futex-based. Priority inheritance.

nova/sync.h

**orion\_rwlock\_\***

Reader-writer lock. Multiple readers or one writer.

nova/sync.h

**orion\_cond\_wait/signal/broadcast**

Condition variables. Atomically release mutex and wait.

nova/sync.h

**orion\_sem\_\***

Semaphore. Counting synchronization primitive.

nova/sync.h

**orion\_atomic\_\***

Atomic operations: load, store, add, CAS, exchange.

nova/atomic.h

**orion\_barrier\_\***

Thread barrier. All threads wait until all arrive.

nova/sync.h

**orion\_tls\_create/get/set**

Thread-local storage key management.

nova/thread.h

# **5\. Pulsar Shell & Core Utilities**

## **5.1 Pulsar Shell (pulsar-sh)**

**Feature**

**What It Does**

**Command parsing**

Lexer + parser for shell syntax. Handles quoting, escaping, here-docs, process substitution.

**Pipelines**

cmd1 | cmd2 | cmd3. Connect stdout to stdin. Parallel execution. Pipe buffer management.

**Redirections**

&lt; input, > output, >> append, 2> stderr, 2>&1, /dev/null.

**Variables**

Local: x=value. Environment: export x. Read-only: readonly x. Arrays: x=(a b c).

**Control flow**

if/elif/else/fi. for/done. while/done. until/done. case/esac. break/continue.

**Functions**

function name &#123; &#125; and name() &#123; &#125;. Local variables. Return values.

**Job control**

Ctrl+Z to suspend. bg, fg, jobs. Signals to job groups. Disown.

**Tab completion**

Completes: commands, files, directories, variables, orion-specific commands, package names.

**Command history**

Persistent history file. Ctrl+R reverse search. History expansion (!!, !cmd).

**Scripting**

Shebang support (#!). Exit codes. set -e, set -x, set -o pipefail.

**Aliases**

alias ll='ls -la'. Persistent in ~/.nova/shellrc.

**Prompt customisation**

PS1/PS2 with git branch, battery, last exit code, time. Colour support.

## **5.2 File & Directory Utilities**

**Utility**

**Description**

**Done?**

**ls**

List directory. -l long, -a hidden, -h human sizes, -t time sort, -r reverse, --color.

\[ \]

**cp**

Copy files/directories. -r recursive, -p preserve, -v verbose, --reflink CoW copy.

\[ \]

**mv**

Move/rename. Atomic rename on same filesystem.

\[ \]

**rm**

Delete. -r recursive, -f force, --trash (moves to trash instead of delete).

\[ \]

**mkdir**

Create directory. -p parents. -m mode.

\[ \]

**rmdir**

Remove empty directory.

\[ \]

**touch**

Create file or update timestamps.

\[ \]

**ln**

Hard links and symbolic links (-s).

\[ \]

**stat**

Show file metadata: size, permissions, timestamps, inode.

\[ \]

**file**

Detect file type from content (not extension).

\[ \]

**du**

Disk usage. -h human, -s summary, --apparent-size.

\[ \]

**df**

Filesystem space usage. -h human.

\[ \]

**find**

Search filesystem. By name, size, date, type, permission. Execute actions.

\[ \]

**locate / updatedb**

Fast filename search from pre-built index.

\[ \]

**xargs**

Build and execute commands from stdin.

\[ \]

**tree**

Display directory tree visually.

\[ \]

**realpath**

Resolve symlinks to absolute path.

\[ \]

**basename / dirname**

Extract filename or directory from path.

\[ \]

## **5.3 Text Processing Utilities**

**Utility**

**Description**

**Done?**

**cat**

Concatenate and display files.

\[ \]

**less / more**

Paginated file viewing. less supports search and scrollback.

\[ \]

**head / tail**

Show first/last N lines. tail -f follows file changes.

\[ \]

**grep**

Pattern search. POSIX regex + PCRE. -r recursive, -i case-insensitive, -v invert, -l filenames only.

\[ \]

**sed**

Stream editor. Substitution, deletion, insertion. In-place editing (-i).

\[ \]

**awk**

Pattern-action text processing. Field splitting, arithmetic, printf.

\[ \]

**sort**

Sort lines. -n numeric, -r reverse, -k key field, -u unique, -t delimiter.

\[ \]

**uniq**

Remove duplicate adjacent lines. -c count, -d only duplicates.

\[ \]

**cut**

Extract fields by delimiter or byte position.

\[ \]

**paste**

Merge lines from multiple files side by side.

\[ \]

**tr**

Translate or delete characters.

\[ \]

**wc**

Count lines, words, bytes.

\[ \]

**diff / patch**

Compare files. Generate and apply patches.

\[ \]

**hexdump / xxd**

View file in hex. xxd also converts back.

\[ \]

**strings**

Extract printable strings from binary files.

\[ \]

**nl**

Number lines.

\[ \]

**column**

Format text into aligned columns.

\[ \]

**jq equivalent (nq)**

Parse and query JSON from command line.

\[ \]

## **5.4 Archive & Compression**

**Utility**

**Description**

**Done?**

**tar**

Bundle files. -c create, -x extract, -t list, -v verbose, -f file.

\[ \]

**gzip / gunzip**

Compress/decompress .gz. LZ77 + Huffman.

\[ \]

**bzip2 / bunzip2**

Compress/decompress .bz2. Better ratio than gzip, slower.

\[ \]

**xz / unxz**

Compress/decompress .xz. Best ratio for software distribution.

\[ \]

**zstd**

Compress/decompress .zst. Fast + good ratio. Used for ZRAM and packages.

\[ \]

**zip / unzip**

ZIP format. Wide compatibility with Windows/macOS.

\[ \]

**lz4**

Ultra-fast compress/decompress. Used internally by ZRAM.

\[ \]

**orion-archive**

Nova's own archive format. Signed, checksummed, streaming.

\[ \]

## **5.5 Network Utilities**

**Utility**

**Description**

**Done?**

**ping**

ICMP echo. Network reachability test.

\[ \]

**traceroute**

Path to host with per-hop latency.

\[ \]

**curl**

HTTP/HTTPS/FTP client. Download, upload, API calls. Supports all common auth methods.

\[ \]

**wget**

HTTP/HTTPS download. Recursive, resume, mirror.

\[ \]

**ssh**

Secure shell client. Key-based auth. Agent forwarding. Tunnel.

\[ \]

**scp / sftp**

Secure file copy and interactive transfer over SSH.

\[ \]

**rsync**

Efficient file sync. Delta transfer. SSH transport. --checksum verification.

\[ \]

**ip**

Interface config, routing, neighbour table. Replacement for ifconfig/route.

\[ \]

**ss**

Socket statistics. Faster netstat. Shows established, listening, timewait.

\[ \]

**dig / nslookup**

DNS query tool. Record types, DNSSEC, specific servers.

\[ \]

**wireguard-tools**

wg and wg-quick for WireGuard VPN management.

\[ \]

**tcpdump**

Packet capture and analysis.

\[ \]

**netcat (nc)**

TCP/UDP connections. Debugging, port scan, data transfer.

\[ \]

**socat**

Advanced netcat. Connect anything to anything.

\[ \]

**httpie equivalent (hx)**

User-friendly HTTP client. JSON default. For API work.

\[ \]

## **5.6 System Utilities**

**Utility**

**Description**

**Done?**

**ps**

Process list. -e all, -f full, -u user, --forest tree view.

\[ \]

**top / orion-top**

Live process monitor. CPU, RAM, I/O, energy per process.

\[ \]

**htop equivalent (ntop)**

Interactive process manager. Kill, nice, filter, sort.

\[ \]

**kill / killall**

Send signals to processes by PID or name.

\[ \]

**nice / renice**

Set/change process priority.

\[ \]

**uptime**

System uptime and load averages.

\[ \]

**free**

Memory usage: total, used, free, ZRAM.

\[ \]

**vmstat**

Virtual memory statistics over time.

\[ \]

**iostat**

I/O statistics per device.

\[ \]

**lsof**

List open files per process.

\[ \]

**orion-trace**

System call tracer (strace equivalent). Rust-based, lower overhead.

\[ \]

**orion-perf**

Performance profiler. CPU cycles, cache misses, branch mispredicts.

\[ \]

**lspci / lsusb**

List PCI and USB devices with driver info.

\[ \]

**orion-hw**

Hardware information: CPU, RAM, GPU, storage, network.

\[ \]

**dmesg equivalent (klog)**

Kernel ring buffer. Filtered by subsystem, level, time.

\[ \]

**sysctl equivalent (novactl)**

Read/write kernel parameters. Validated. Persistent option.

\[ \]

**journalctl equivalent (orion-log)**

Query system logs. Filter by time, unit, priority, field.

\[ \]

**cron equivalent (orion-schedule)**

Scheduled task runner. Crontab syntax + extended.

\[ \]

**at**

Run command once at specified time.

\[ \]

**env / printenv**

Display/set environment variables.

\[ \]

**ulimit**

Per-process resource limits.

\[ \]

**uname**

System information: kernel version, arch, hostname.

\[ \]

## **5.7 User & Permission Utilities**

**Utility**

**Description**

**Done?**

**useradd / usermod / userdel**

Create/modify/delete users.

\[ \]

**groupadd / groupmod / groupdel**

Create/modify/delete groups.

\[ \]

**passwd**

Change password. Argon2id hashing by default.

\[ \]

**orion-su**

Privilege elevation. Capability-based. No SUID. Audit logged.

\[ \]

**id**

Show current user and group IDs.

\[ \]

**who / w / last**

Show logged in users and login history.

\[ \]

**chmod / chown / chgrp**

File permission and ownership. Orion OS extends with capability ACLs.

\[ \]

**umask**

Default permission mask for new files.

\[ \]

**login / logout**

Session management. PAM equivalent (Orion Auth).

\[ \]

**orion-caps**

Show and manage capability grants for processes and files.

\[ \]

# **6\. Comit Package Manager (nova pkg)**

**The Design Principle**

One package manager. One package format. Works on every Orion OS build — Desktop, Server, Mobile, Embedded. No AUR vs PPAs vs Flatpak confusion. One command installs everything. Like Cargo but for the entire OS.

**Command**

**What It Does**

**nova pkg install NAME**

Install a package. Resolves dependencies. Validates signatures. Atomic install with rollback on failure.

**nova pkg remove NAME**

Complete removal. No orphaned files. No leftover config unless --keep-config.

**nova pkg update**

Update all installed packages. Pre-update snapshot created automatically.

**nova pkg update NAME**

Update single package.

**nova pkg search QUERY**

Search Nebula Hub by name, description, category, author.

**nova pkg info NAME**

Show: description, version, dependencies, size, signatures, audit status, install count.

**nova pkg list**

List all installed packages with version and install date.

**nova pkg outdated**

List packages with available updates.

**nova pkg lock**

Generate nova.lock file: exact versions and hashes for reproducible installs.

**nova pkg build**

Build a package from source using nova.pkg.toml spec.

**nova pkg publish**

Sign and publish to Nebula Hub after verification.

**nova pkg verify NAME**

Verify package signatures and checksums against Nebula Hub.

**nova pkg audit**

Check installed packages for known security advisories.

**nova pkg source NAME**

Download source code of installed package.

**nova pkg export**

Export list of installed packages to file (for reproduced installs).

**nova pkg import FILE**

Install all packages from an exported list.

**nova pkg mirror set URL**

Set preferred package mirror. Supports local mirrors for offline environments.

**nova pkg cache clean**

Clear download cache. --older-than=30d option.

**nova pkg rollback**

Restore to package state before last update using pre-update snapshot.

## **6.1 Package Format (nova.pkg.toml)**

**Package Specification**

Every Orion OS package is defined by a nova.pkg.toml file. This defines: name, version, description, authors, licence, dependencies, build steps, installed files, permissions required, and the cryptographic signing key. Packages are self-contained signed archives. One file = one complete package.

## **6.2 Package Categories**

**Category**

**What It Contains**

**System**

Kernel modules, drivers, init services, core libraries

**Development**

Compilers, debuggers, profilers, editors, SDKs

**Network**

Servers, clients, protocols, security tools

**Media**

Audio, video, graphics, streaming, editing

**Gaming**

Games, game libraries, compatibility layers, tools

**AI/ML**

Inference runtimes, training tools, models, datasets

**Security**

Cryptography, auditing, VPN, firewall, forensics

**Productivity**

Office, notes, email, calendar, communication

**Science**

Maths, simulation, data analysis, visualisation

**Embedded**

Cross-compilation targets, RTOS tools, firmware

# **7\. Gaming Subsystem**

**Orion OS Gaming Philosophy**

Gaming is a first-class workload, not an afterthought. The kernel scheduler understands gaming. The compositor has a gaming mode. The anti-cheat framework is designed in. The shader cache is shared. The goal: Orion OS reaches 95%+ Windows game compatibility AND runs games faster than Windows on equivalent hardware.

**Component**

**What It Does**

**Orion GameMode**

Kernel-level. When a process is marked as a game: CPU/GPU boost, background deprioritise, scheduler switches to gaming profile, network latency minimised. No daemon — built into the scheduler.

**Vulkan-native graphics**

Vulkan is the ONLY native 3D API. No legacy OpenGL driver complexity. Thinner stack. Lower overhead. Better performance.

**Orion Compatibility Layer**

DirectX → Vulkan translation (DXVK/VKD3D-Proton equivalent) + Windows syscall translation. Integrated at OS level, not userspace layer on top of Linux.

**Global Shader Cache**

Shaders compiled by one user are anonymously contributed. Next user skips compilation. Eliminates first-play stutter. Opt-out available for privacy.

**Orion Anti-Cheat Framework**

Game companies integrate via a certified API. Orion OS provides: kernel integrity attestation (proven unmodified kernel), process isolation verification, memory access audit log. Kernel-level anti-cheat games can trust Orion OS.

**Gaming Compositor Mode**

Gamescope-equivalent built into Nova compositor: resolution scaling, VRR/G-Sync/FreeSync, HDR, frame pacing, latency optimisation. Activate per-application.

**DirectStorage equivalent**

NVMe Direct Storage: GPU decompresses game assets directly from NVMe without CPU involvement. Faster level loads. Required for modern open-world games.

**Controller support**

XInput-compatible API. USB and Bluetooth. Haptic feedback. Gyroscope support. Steam Input equivalent for remapping.

**OpenGL compatibility**

Mesa OpenGL on top of Vulkan (like Zink). For older games that only support OpenGL.

**Game overlay**

FPS counter, frame time graph, CPU/GPU usage, temperature, VRAM usage. In-compositor, zero game performance impact.

**Screenshot / recording**

GPU-accelerated screen capture. HEVC/AV1 recording at zero CPU overhead via hardware encoder.

**Wine compatibility (legacy)**

Windows x86 programs via binary translation for non-game Windows software.

# **8\. Multi-Platform Strategy**

**One Kernel, Every Device**

The Orion OS microkernel, Orion Libc, and Nova package format are the same across all platforms. Platform-specific compile profiles add platform drivers and remove irrelevant subsystems. An app built for Orion Desktop can target Orion Mobile with one recompile if it uses the Orion UI framework.

**Platform**

**Description**

**Size Target**

**Orion Desktop**

x86-64, ARM64, RISC-V. Full kernel + compositor + all drivers + gaming subsystem + AI runtime. Target: standard laptops, desktops, workstations.

&lt; 400MB installed, &lt; 150MB idle

**Orion Server**

x86-64, ARM64, RISC-V. Network-optimised kernel. No compositor. Unikernel support. Container-native. Auto-scaling.

&lt; 30MB, &lt; 80MB idle

**Orion Mobile**

ARM64 (Snapdragon, Dimensity, Exynos). Touch compositor. Cellular. Camera pipeline. Biometric auth. Ultra power management.

&lt; 200MB OS partition

**Orion TV**

ARM64 / RISC-V. 10-foot compositor. HDMI-CEC. Hardware video decode (4K/8K). Dolby Atmos. Remote control input.

&lt; 100MB OS

**Orion Auto**

ARM64 / RISC-V. Real-time kernel (ISO 26262 target). CAN bus, LIN, automotive Ethernet. Split-display. OTA with rollback.

&lt; 50MB OS, &lt; 32MB idle

**Orion Embedded**

ARM Cortex-M / RISC-V. Orion Micro profile. BLE. Ultra-low power. OTA in &lt; 100KB patches. MQTT.

&lt; 2MB total

**Nebula Cloud**

x86-64. Optimised for virtualisation (Virtio). Confidential computing (SEV-SNP/TDX). Unikernel default. Auto-scaling hooks.

&lt; 20MB, &lt; 64MB idle

# **9\. Additional Systems to Build**

## **9.1 Orion Init System**

**Component**

**What It Does**

**Service supervision**

Each service: a directory with run, log/run, and finish scripts. Runit-philosophy. Under 3,000 lines of Rust.

**Dependency ordering**

Services declare before= and after= in their nova.service file. Topological sort at boot.

**Parallel startup**

Independent services start in parallel. Dependency graph determines actual order.

**Restart policies**

on-failure / always / never. Exponential backoff. Max restart count.

**Emergency mode**

Single-user mode when boot fails. Nova shell with minimal services. Repair tools available.

**Shutdown sequence**

Graceful SIGTERM → timeout → SIGKILL. Unmount filesystems in reverse mount order.

**System targets**

Multi-user target, graphical target, rescue target, emergency target.

## **9.2 Orion Audio System (PipeWire equivalent)**

**Component**

**What It Does**

**Audio graph**

Graph-based routing: sources → filters → sinks. Low-latency paths for gaming and pro audio.

**Session manager**

Auto-connects devices and apps. Saves and restores routing on reconnect.

**ALSA compatibility**

Legacy ALSA apps work via shim. No app changes needed.

**PulseAudio compatibility**

PulseAudio socket compatibility for existing apps.

**Bluetooth audio**

A2DP, HFP, HSP profiles. aptX, LDAC, AAC codecs.

**Pro audio mode**

JACK compatibility. &lt; 1ms latency. Real-time threads. Hardware buffer control.

**USB audio**

Class 1 and 2. UAC3 for future devices.

**Noise suppression**

RNNoise-based AI noise suppression. CPU or NPU accelerated.

## **9.3 Aurora Display Server (Compositor)**

**Component**

**What It Does**

**Wayland compositor**

Implements core Wayland protocol + xdg-shell + Nebula extensions. All Wayland apps work.

**XWayland compatibility**

X11 apps run via XWayland translation layer. Required for legacy software.

**Nova native protocol**

Extensions beyond Wayland: capability passing, gaming mode, energy reporting, HDR, VRR.

**Tiling layout plugin**

Auto-tiling default: new windows tile automatically. Float on demand. Keyboard-driven.

**Animation engine**

60/120/144Hz smooth animations. GPU-accelerated. Respects reduced-motion accessibility setting.

**Multi-monitor**

Independent refresh rates per monitor. Different scaling per monitor. Hotplug.

**HDR support**

HDR10, Dolby Vision for supported displays. Tone mapping for SDR content on HDR displays.

**Screen recording**

GPU-accelerated capture. H.264/HEVC/AV1 via hardware encoder. Zero CPU overhead.

**Remote desktop**

RDP server built into compositor. Encrypted. Zero-copy screen sharing.

## **9.4 Orion Settings Application**

**Panel**

**What User Configures**

**System Overview**

CPU, RAM, GPU, storage, battery — live. Hardware info. Orion OS version. Update status.

**Display**

Resolution, refresh rate, scaling, orientation, night light, HDR, multi-monitor arrangement.

**Network**

WiFi list and connect, Ethernet config, VPN (WireGuard), firewall rules, bandwidth usage.

**Audio**

Output device, input device, volume mixer per app, Bluetooth audio devices.

**Power**

Profile selector, battery threshold, display sleep, suspend settings, energy per-app dashboard.

**Security**

Verified boot status, capability grants review, app permissions, firewall status, audit log.

**Users**

Add/remove users, password change, sudo/orion-su grants, login history.

**Extensions**

Installed extensions, enable/disable, settings per extension, install from Hub.

**Updates**

Available updates with risk rating, update history, rollback to previous state.

**Hardware**

Detected hardware, driver status, nova hardware detect button.

## **9.5 Orion Text Editor (orion-edit)**

*   Nano-equivalent for terminal. Keyboard shortcuts shown at bottom. No learning curve.
*   Syntax highlighting: Rust, C, Python, shell, TOML, NCL (Orion Config Language), JSON, Markdown.
*   Search and replace with regex support.
*   Line numbers. Auto-indent. Bracket matching.
*   Multiple files open (tabs). Split view.
*   Can edit system config files with orion-su elevation prompt.

## **9.6 Void Cryptography Library**

**Algorithm/Component**

**What It Provides**

**ChaCha20-Poly1305**

Symmetric authenticated encryption. Faster than AES on systems without AES-NI. Default for filesystems.

**AES-256-GCM**

Symmetric encryption. Hardware-accelerated on AES-NI systems. For compatibility.

**CRYSTALS-Kyber (ML-KEM)**

Post-quantum key encapsulation. NIST standard 2024. For all new key exchange.

**CRYSTALS-Dilithium (ML-DSA)**

Post-quantum digital signatures. NIST standard 2024. For all new signing.

**BLAKE3**

Fast cryptographic hash. 3x faster than SHA-256. Used for checksums everywhere.

**Argon2id**

Password hashing. Memory-hard. Default for all user passwords.

**X25519 / Ed25519**

Classical elliptic curve. For compatibility with existing infrastructure.

**HKDF**

Key derivation function. Derives multiple keys from one master key.

**CSPRNG**

Cryptographically secure RNG. Seeded from hardware RNG (RDRAND/RDSEED) + entropy pool.

**TLS 1.3 stack**

Full TLS 1.3 implementation for orion-ssl. Hybrid classical + post-quantum.

# **10\. System Daemons — The Always-Running Services**

**What Daemons Are**

Daemons are background processes that run at all times providing system services. These are NOT part of the kernel — they are userspace processes with specific capabilities granted by Orion Init. Every daemon listed here must be written in Rust. Every daemon is a capability-isolated process — a crashed daemon cannot affect the kernel or other daemons.

## **10.1 Core System Daemons**

**Daemon**

**What It Does and Why**

**orion-devd (Device Manager)**

The udev equivalent — CRITICAL. Watches for hardware events (device plugged in, removed). Creates device nodes in /dev. Loads appropriate drivers. Sends events to userspace. Without this, plugging in a USB drive does nothing. This is one of the first daemons you must write.

**orion-logd (System Logger)**

The syslog/journald equivalent. Collects log entries from kernel (via /dev/kmsg) and all userspace daemons. Stores structured logs with: timestamp, source process, severity level, message. Queryable via orion-log CLI. Ring buffer for recent entries. Persistent storage for history.

**orion-timed (Time Synchronisation)**

The NTP/chrony equivalent. Synchronises system clock with NTP servers. Handles leap seconds. Maintains RTC (hardware clock). Provides accurate time to all processes. Critical for TLS certificates (expired time = broken HTTPS), log correlation, and scheduling.

**orion-dhcpd (DHCP Client)**

Obtains IP address, gateway, DNS servers from network DHCP server. Runs when a network interface is brought up. Renews lease before expiry. Falls back to link-local (169.254.x.x) if no DHCP server. Required for any network to work automatically.

**orion-dnsd (DNS Resolver)**

Local DNS resolver daemon. Caches DNS responses (massive performance win). DNSSEC validation. DNS-over-TLS and DNS-over-HTTPS. Handles split-DNS for VPN. All processes query orion-dnsd, not the network directly.

**ether-d (Network Manager)**

Manages network interfaces: WiFi scan and connect, Ethernet up/down, VPN connect/disconnect, network profiles, captive portal detection. The user-facing network management. Talks to kernel network subsystem and WiFi drivers.

**orion-ipcbus (D-Bus equivalent)**

Typed message bus for desktop applications. Apps publish interfaces. Other apps subscribe to events. Essential for: media player controls, notification system, power management signals, hardware events reaching desktop apps. Written as a capability-safe Rust IPC bus.

**orion-powerd (Power Manager)**

Monitors battery level, AC/DC state, lid state, thermal sensors. Triggers: screen dim, screen off, suspend, hibernate. Coordinates with orion-devd for device power states. Sends low-battery warnings. Controls CPU/GPU power governors.

**orion-audiod (Audio Session Manager)**

Manages audio routing between apps and hardware. Which app gets the speaker. Volume mixing. Bluetooth audio session management. Routes notifications to correct output. The PipeWire session manager equivalent.

**orion-sshd (SSH Server)**

Secure Shell server. Key-based authentication only (no password by default). Capability-isolated: sshd process cannot access files outside /home. Ed25519 + CRYSTALS-Dilithium hybrid keys. Disabled by default — must be explicitly enabled.

**orion-fwupd (Firmware Updater)**

Updates firmware for: SSDs, USB controllers, UEFI/BIOS, embedded controllers, WiFi chips. Uses LVFS (Linux Vendor Firmware Service) repository. Signed firmware only. Rollback on failed update. Critical for security (firmware CVEs are serious).

**orion-printd (Print Manager)**

CUPS-equivalent. Manages printers: discovery (Bonjour/IPP), job queuing, driver management. IPP Everywhere for modern printers (no drivers needed). PDF → printer language conversion.

**orion-btd (Bluetooth Manager)**

Manages Bluetooth pairing, connections, profiles. HFP (headset), A2DP (audio), HID (keyboard/mouse), GATT (IoT). Pairs with orion-audiod for Bluetooth audio routing.

**orion-geod (Location Service)**

GPS, WiFi positioning, cell tower positioning. Privacy-controlled: apps must declare location capability. Accuracy tiers: coarse (city) vs fine (GPS). Orion Watch sensor data fusion.

**orion-installd (Package Install Daemon)**

Privileged helper for nova pkg. Runs as separate capability-elevated process. Performs actual file writes during package install/remove. Regular processes request installs via IPC — installd does the privileged work.

## **10.2 Nova Installer — Getting Orion OS Onto Hardware**

**The Installer Is More Important Than Most Think**

The first thing a new user sees is the installer. A confusing installer = user gives up and goes back to Windows. The Orion OS installer must be: bootable from USB, graphical and text modes, guided and advanced modes, automatically partitions disk sensibly, handles dual-boot, finishes in under 10 minutes.

**Feature**

**Requirements**

**Live USB boot**

Orion OS ISO boots from USB into a live environment. Try before installing. All features work from USB.

**Graphical installer**

Step-by-step GUI: language → keyboard → timezone → disk → user account → install → done. No confusing questions.

**Text mode installer**

For servers and systems without GPU. Same steps, terminal UI (ncurses-style).

**Auto-partition**

Detects disk, proposes sensible layout: EFI (512MB) + Nova root (remainder). One click to accept.

**Manual partitioning**

For advanced users: choose partition sizes, filesystem, mount points, encryption.

**Dual-boot support**

Detects existing Windows/Linux. Resizes partition safely. Adds Orion OS to existing bootloader.

**Disk encryption**

Full disk encryption with user passphrase. TPM-sealed key option (auto-unlock on trusted hardware).

**User account setup**

Username, password (Argon2id), admin capability grant. SSH key import option.

**Hardware detection**

Runs nova hardware detect during install. Downloads required drivers. Configures automatically.

**First boot wizard**

After reboot: timezone confirm, display settings, theme choice, optional account linking.

**Recovery mode**

Installer doubles as recovery tool: repair boot, reset password, restore snapshot, reinstall without losing data.

**orion-mkimage**

Tool to create Orion OS install images. Custom configurations baked into ISO. Used for kiosk, embedded, server deployments.

## **10.3 Missing Shell Builtins — cd, pwd, and More**

**Shell Builtins vs External Commands**

cd, pwd, echo, export — these are NOT standalone programs. They are built into Pulsar Shell itself because they must affect the shell's own state. cd must change the shell's working directory — an external program cannot do this. These must all be implemented inside pulsar-sh.

**Builtin**

**What It Does**

**cd**

Change directory. cd ~ = home. cd - = previous. cd .. = parent. The most-used shell command.

**pwd**

Print working directory. Shows absolute path of current location.

**echo**

Print arguments to stdout. echo -n (no newline). echo -e (interpret escapes).

**export**

Set environment variable and mark for inheritance by child processes.

**unset**

Remove variable or function from environment.

**source / .**

Execute script in current shell context. Used for: . ~/.nova/shellrc, activating virtual environments.

**alias / unalias**

Define and remove command aliases. alias ll='ls -la'

**history**

Show command history. history N shows last N. history -c clears.

**read**

Read line from stdin into variable. Used in scripts for user input.

**set / unset**

Set shell options: set -e (exit on error), set -x (trace), set -o pipefail.

**exec**

Replace current shell with command. exec pulsar-sh starts a new shell replacing the current one.

**eval**

Evaluate string as shell command. Powerful and dangerous — document carefully.

**exit**

Exit shell with status code.

**true / false**

Return success (0) or failure (1). Used in conditionals.

**test / \[**

Evaluate conditional expressions: \[ -f file \], \[ -d dir \], \[ $x -eq 5 \].

**type / which**

Show what a command is (builtin, function, alias, or external program path).

**ulimit**

Show and set per-process resource limits.

**trap**

Run command when signal received. trap 'cleanup' EXIT INT TERM

**wait**

Wait for background jobs to complete.

**getopts**

Parse command-line options in scripts. Proper -flag parsing.

**printf**

Formatted output. More powerful than echo. printf '%s\\n' value

**jobs / fg / bg**

List background jobs, bring to foreground, send to background.

**hash**

Remember location of commands to avoid PATH lookup on every call.

**umask**

Set default permission mask for new files created by this shell.

## **10.4 Missing Utility Commands**

**Command**

**What It Does**

**Done?**

**lsblk**

List block devices in tree format. Shows: name, size, type, mountpoint, filesystem. Essential for storage management.

\[ \]

**blkid**

Print block device UUID, filesystem type, label. Used by fstab and boot scripts.

\[ \]

**mkfs suite**

mkfs.novafs, mkfs.fat, mkfs.ext4 (compat). Format partitions. Called by installer and storage tools.

\[ \]

**fsck suite**

Check and repair filesystems. fsck.novafs runs Vega FS journal recovery. Called automatically if unclean shutdown.

\[ \]

**mount / umount**

Mount and unmount filesystems. Reads /etc/fstab equivalent (nova.fstab). Managed via capabilities.

\[ \]

**swapon / swapoff**

Enable/disable swap. Orion OS manages ZRAM via orion-powerd but explicit swap control needed.

\[ \]

**losetup**

Set up loop devices. Mount disk images as block devices. Essential for development.

\[ \]

**sha256sum / sha512sum**

Compute and verify SHA-256/512 checksums. Essential for download verification.

\[ \]

**b2sum**

BLAKE3 checksum. Orion OS's preferred hash. Faster than SHA-256.

\[ \]

**md5sum**

MD5 (legacy, for compatibility). Not for security — only for quick integrity checks.

\[ \]

**base64**

Encode and decode base64. Used in scripting, email, certificates.

\[ \]

**base32**

Base32 encoding. Used in TOTP/2FA, some protocols.

\[ \]

**od**

Octal dump. Display file in octal, hex, decimal, or ASCII. Binary file inspection.

\[ \]

**watch**

Run command repeatedly, show output. watch -n 1 orion-top. Essential for monitoring.

\[ \]

**orion-mux (tmux equivalent)**

Terminal multiplexer: multiple terminal sessions in one window, detach and reattach. Essential for remote server work.

\[ \]

**orion-man (man pages)**

Manual page viewer. Every nova command has a man page. nova man ls, nova man comit. Full man page database.

\[ \]

**apropos / whatis**

Search man page descriptions. apropos 'network' lists all network-related commands.

\[ \]

**bc**

Arbitrary precision calculator. bc -l for math library. Used in scripts.

\[ \]

**factor**

Factorise integers. Mathematical utility.

\[ \]

**seq**

Generate sequences of numbers. seq 1 10. seq 0 0.5 5.

\[ \]

**yes**

Output string repeatedly until killed. yes | nova pkg install pkg (auto-confirm).

\[ \]

**shuf**

Randomly shuffle lines. shuf -n 5 file (pick 5 random lines).

\[ \]

**tee**

Read stdin, write to stdout AND file simultaneously. cmd | tee output.log | next-cmd.

\[ \]

**timeout**

Run command with time limit. timeout 30 slow-command.

\[ \]

**nohup**

Run command immune to hangup signal. Survives terminal close.

\[ \]

**taskset**

Set CPU affinity for a process. Pin to specific cores.

\[ \]

**pgrep / pkill**

Find/kill processes by name pattern. pgrep ether-d. pkill -HUP orion-logd.

\[ \]

**fuser**

Show which processes use a file or socket. fuser 8080/tcp.

\[ \]

**ldd**

List shared library dependencies of a binary.

\[ \]

**nm**

List symbols in object file or binary.

\[ \]

**objdump**

Disassemble and inspect compiled binaries.

\[ \]

**readelf**

Display ELF/Nova binary structure: sections, symbols, headers.

\[ \]

**strip**

Remove debug symbols from binary to reduce size.

\[ \]

**addr2line**

Convert program address to source file and line number. Essential for crash debugging.

\[ \]

**stdbuf**

Modify buffering of stdin/stdout/stderr for piped commands.

\[ \]

**column**

Format text into aligned columns. Great for tabular output in scripts.

\[ \]

**numfmt**

Format numbers: --to=iec 1073741824 → 1.0G

\[ \]

**mktemp**

Create unique temporary file or directory safely.

\[ \]

**install**

Copy files and set permissions in one step. Used by build systems.

\[ \]

**orion-encrypt (age equivalent)**

Modern file encryption. Encrypt: orion-encrypt -r pubkey file. Decrypt: orion-encrypt -d file.

\[ \]

**orion-sign**

Sign files with CRYSTALS-Dilithium key. Verify signatures. Used for package signing and code signing.

\[ \]

**orion-cert**

TLS certificate management. Generate, sign, view, verify X.509 certificates with post-quantum support.

\[ \]

**pwgen**

Secure password generator. pwgen -s 24 1 (24-char secure password).

\[ \]

**xxd**

Hex dump with ASCII. Also converts hex back to binary. Better than od for most use cases.

\[ \]

**getent**

Query system databases: passwd, group, hosts, services.

\[ \]

**locale**

Show locale settings. locale -a lists available locales.

\[ \]

**iconv**

Convert text between character encodings (UTF-8, Latin-1, etc).

\[ \]

**uuidgen**

Generate UUID v4 (random) or v5 (namespace-based).

\[ \]

**orion-cron (cron)**

Crontab management. nova cron edit, nova cron list. POSIX cron syntax plus extensions.

\[ \]

**at**

Schedule one-time command: echo 'nova pkg update' | at midnight

\[ \]

**nsenter**

Enter Linux namespaces. For debugging containerised processes.

\[ \]

**chroot equivalent (orion-chroot)**

Execute command in different root filesystem. Used by installer and build system.

\[ \]

**orion-container**

Lightweight container tool. Uses Orion OS namespaces + capabilities. Like a simple Docker for Orion OS.

\[ \]

## **10.5 Development Tools Package**

**Nova Dev Tools**

Not part of base installation but available via nova pkg install orion-dev-tools. Every developer needs these. They should work out of the box with zero configuration on Orion OS.

**Tool**

**Why Needed**

**Done?**

**git**

Version control. The single most important development tool. Must work perfectly on Orion OS from day one.

\[ \]

**orion-cc**

Compiler wrapper: invokes Cosmos Compiler (or LLVM during bootstrap). gcc-compatible flags for existing build scripts.

\[ \]

**orion-build (CMake/Make equiv)**

Declarative build system. Nova projects use nova.build.toml. Compatible with existing CMake and Make projects.

\[ \]

**orion-gdb**

Source-level debugger. Knows Orion OS process model and capability system. GDB-compatible commands.

\[ \]

**orion-valgrind**

Memory error detector: use-after-free, leaks, uninitialised reads. Slower than MTE but more detailed.

\[ \]

**cargo**

Rust package manager. Ships with Rust toolchain. First-class citizen on Orion OS.

\[ \]

**python3**

Python interpreter. Critical for scripting and tooling. nova pkg install python3.

\[ \]

**comit-dev**

Tools for creating Nova packages: init, build, test, sign, publish.

\[ \]

**orion-vm**

Lightweight QEMU wrapper. nova vm create my-test-vm. For testing Orion OS builds.

\[ \]

**vim / neovim**

Terminal text editor. Many developers require this. nova pkg install vim.

\[ \]

**jq / nq**

JSON query tool (jq equivalent written in Rust, called nq). Parses API responses, config files.

\[ \]

**hyperfine**

Command-line benchmarking. hyperfine 'nova pkg install' vs 'apt install'. For performance testing.

\[ \]

**tokei**

Count lines of code by language. Shows Orion OS codebase statistics.

\[ \]

# **11\. Missing Components — Essential Apps & Daemons**

**Complete the Picture**

These components are required for Orion OS to be a complete, daily-usable system. Without them, users cannot lock their screen, manage fonts, copy and paste between apps, or use basic productivity tools.

## **11.1 Security & Session Daemons**

**Daemon**

**What It Does**

**orion-lock (Screen Locker)**

Locks the session when idle or on user request. Displays lock screen with: clock, biometric unlock, PIN fallback. Capability-gated: only orion-lock can unlock the session. Prevents any other process reading the display while locked.

**orion-keyring (Secret Service)**

Stores secrets (passwords, API keys, SSH keys, certificates) encrypted with the user's login credential and hardware TPM binding. Apps request secrets via IPC — they never hold the decryption key. Compatible with libsecret/kwallet API for POSIX apps.

**orion-vpnd (VPN Daemon)**

Manages WireGuard VPN connections. Config stored in orion-keyring. Auto-connect on trusted/untrusted networks. Split tunneling: only specific routes go through VPN. CLI: nova vpn connect work, nova vpn status.

**orion-telemetryd (Telemetry Daemon)**

Opt-in only, off by default. Collects: anonymous crash signatures, hardware compatibility data, performance metrics. Everything is reviewed by user before sending. GDPR-compliant. No personal data ever collected. Helps identify crashes and hardware gaps in the wild.

**orion-sandboxd (Sandbox Runtime)**

Enforces application sandboxes. Each app runs in a capability-restricted namespace. orion-sandboxd monitors sandbox violations and logs them. Apps can request capability expansion via a user-facing permission dialog. Bubblewrap-equivalent but Nova-native.

## **11.2 Desktop Applications — Core Set**

**App**

**What It Does**

**orion-term (Terminal Emulator)**

GPU-accelerated terminal. Supports: 256 colours, true colour, Unicode (including CJK and RTL), ligatures, sixel graphics. Tabs and splits. Scrollback with search. pulsar-shell integration: working directory displayed in title bar. Config: font size, colour theme, keybindings in NCL format.

**orion-files (File Manager)**

Two-pane file manager. Shows: file type icons, size, permissions, modification date. Operations: copy, move, delete (to trash), compress, extract, open with. Search with indexing. Bookmarks. Network locations (SMB, NFS, SFTP). Keyboard-first design with mouse support.

**orion-view (Document Viewer)**

Views: PDF, images (JPEG, PNG, WebP, AVIF, SVG), text, Markdown, EPUB. Zoom, pan, search in PDF. Slideshow mode for images. Remembers last position in documents. Lightweight — no rendering engine bundled, uses OS-level image decoders.

**orion-calc (Calculator)**

Basic and scientific modes. History of calculations. Unit conversion (length, weight, temperature, data). Currency conversion (offline rates, update on request). Programmer mode: binary, octal, hexadecimal. Expression history searchable.

**orion-monitor (System Monitor GUI)**

Live graphs: CPU per-core, RAM tiers (physical/ZRAM/swap), disk I/O per device, network per interface, GPU, energy per-app. Process list with sort, filter, kill. Network connections per process. Open files per process. Thermal sensors. Battery health.

**orion-font (Font Manager)**

Browse installed fonts with preview. Install fonts from file or Nebula Hub. Remove fonts. Set system default fonts: UI font, monospace font, document font. Font fallback chain configuration for Unicode coverage.

**orion-clipboard (Clipboard Manager)**

Persistent clipboard history: last 500 items. Text, images, and files. Search history. Pin important clips. Sync between applications (Nova Clipboard API). Privacy mode: exclude specific apps from history. Keyboard shortcut to open history.

**orion-notify (Notification Centre)**

Stores notification history. Filter by app. Mark as read/unread. Do Not Disturb schedule. Per-app notification settings: sound, banner, badge. Notification actions (reply, dismiss, snooze). Focus modes: work (only calendar alerts), gaming (nothing), sleep (nothing).

## **11.3 System Administration Tools**

**Tool**

**What It Does**

**orion-partition (Disk Manager)**

GUI and CLI disk partitioning. Create, resize, delete partitions. Format with Vega FS, FAT32, ext4. Mount/unmount. Shows: partition table, filesystem, usage, health (SMART data). Used by installer. CLI: nova partition list, nova partition format.

**orion-a11yd (Accessibility Daemon)**

Implements AT-SPI2-equivalent accessibility tree. Every UI element registered with orion-a11yd. Screen readers (Orca equivalent: orion-reader) read the tree. Magnification service. High contrast mode enforcer. Braille display driver integration. Nova apps must register with orion-a11yd to be accessible.

**orion-font-render (Font Rendering Engine)**

System-level font rasterisation. FreeType-equivalent written in Rust. Subpixel rendering (for LCD), greyscale (for OLED). Hinting. Kerning. Font fallback (Noto fonts cover all Unicode). All apps use orion-font-render — no per-app font library bundled.

**orion-theme (Theme Engine)**

System-wide visual theme applied at compositor level. Theme file: NCL format, defines colours, border radius, spacing, animation durations. Ships three themes: Nova Light, Nova Dark, Nova High Contrast. Community themes via Nebula Hub. Colour scheme tokens exposed as environment variables to apps.

**orion-ime (Input Method Framework)**

Input Method Editor framework for CJK and other complex scripts. IBus-compatible API. Ships default engines: Pinyin (Chinese), Mozc (Japanese), Hangul (Korean). Third-party engines installable via nova pkg. Integrates with pulsar-shell for terminal IME support.

## **11.4 Technical Architecture — Missing Details**

**Component**

**Technical Detail**

**IRQ Affinity & CPU Pinning**

orion-irqbalance: daemon that distributes hardware interrupts across CPU cores for optimal performance. Per-IRQ CPU affinity settable via orion config. GPU interrupts pinned to CPUs adjacent to the GPU's NUMA node. Network interrupts distributed across all cores with receive-side scaling. Gaming mode: pin game process to performance cores, pin GPU interrupt to same core.

**DMA-BUF / Zero-Copy Buffer Sharing**

dma-buf equivalent in Orion OS: a capability token representing a memory buffer that can be shared between kernel subsystems without copying. GPU renders a frame → dma-buf token passed to compositor → compositor displays it. No copy of the frame data. Critical for: GPU → compositor, camera → display, video decoder → display.

**Memory Hot-Plug**

Hot-add RAM while system is running (server use case). Orion OS memory manager: online new DIMM when ACPI fires memory-add event. Integrate into NUMA topology. Make immediately available for allocation. Hot-remove: evacuate pages from the DIMM region before taking offline. Required for cloud VM memory balloon drivers.

**CPU Hot-Plug**

Add or remove CPU cores while running. orion-hotplugd handles ACPI CPU events. Bring CPU online: initialise per-CPU data structures, add to scheduler's CPU list, begin accepting work. Take offline: migrate all runnable processes away, drain interrupt queues, stop the CPU cleanly. Required for cloud VM vCPU management.

**ECC Memory Support**

Error Correcting Code memory: detects and corrects single-bit RAM errors. Critical for servers and scientific computing. Orion OS ECC monitor: reads EDAC (Error Detection And Correction) counters via ACPI. Logs correctable errors. Alerts on uncorrectable errors. Marks degraded DIMM regions as avoid-allocate.

**Sandboxing Runtime Detail**

App launch sequence: nova pkg installs app → orion-sandboxd reads app manifest (declared capabilities) → on first launch, user approves capabilities → subsequent launches: app process spawned with exactly declared capabilities in a restricted namespace → orion-sandboxd monitors: any capability violation is logged and the operation is denied → apps can request additional capabilities at runtime via user-facing dialog.

# **12\. Testing Infrastructure — Non-Negotiable**

**The Rule**

Every kernel component gets tests before it is considered done. OS bugs are silent — a memory allocator bug causes a crash 3 layers above. Without testing infrastructure, 80% of your time is debugging instead of building. Tests are not optional.

**Test Type**

**What and How**

**Unit test framework**

Custom no\_std test framework for kernel code. No std::test — write a minimal test runner that runs in bare-metal kernel context. Each subsystem has its own test module.

**QEMU-based integration tests**

Boot Orion OS in QEMU, run tests, check exit code. Automates: did the kernel boot? Did the scheduler run 100 context switches without corruption? Did the allocator survive 10,000 alloc/free cycles?

**Fuzzing (AFL++ / libFuzzer)**

Fuzz: syscall interface (random syscall numbers + args), filesystem parser (random bytes as Vega FS image), network packet parser (random bytes as packets), bootloader (random memory maps). Each fuzzer runs continuously in CI.

**KASAN equivalent (orion-san)**

Instruments unsafe Rust blocks and C interop. Detects use-after-free and buffer overflows at runtime in debug builds. Rust's safety catches most — KASAN catches what remains in unsafe code.

**Performance benchmarks**

Boot time, context switch latency (target: &lt; 1 microsecond), memory allocator throughput, file read/write speed, network round-trip. Run on every PR. Regression > 5% = block merge.

**CI/CD pipeline (GitHub Actions)**

Every PR triggers: cargo test, boot test in QEMU, fuzzer crash check, performance benchmark, clippy lint, format check. Fails PR if anything regresses.

**Hardware compatibility tests**

Automated: boot on each supported hardware model in a test farm. At least: Intel NUC, AMD laptop, Raspberry Pi 4, RISC-V board. Catches driver regressions.

**Stress tests**

Run 10,000 threads simultaneously. Fill RAM to 95% then free it all. Hammer the scheduler for 24 hours. These find the bugs that normal use never triggers.

# **12\. The Complete Build Checklist**

**How to Use This**

Check off each item as you build it. This is your master build list — everything Orion OS needs to be a complete, self-hosted, production-grade operating system. Do not try to build them in parallel. Follow the roadmap phases.

## **Phase B1 Checklist — Own This Before Anything Else**

**Component**

**Notes**

**Done?**

**UEFI Bootloader**

Rust + Assembly. UEFI GOP, memory map, ACPI, kernel load.

\[ \]

**Kernel Entry (ASM)**

GDT, IDT, long mode, SSE enable, call kernel\_main.

\[ \]

**Physical Memory Manager**

Buddy allocator from UEFI memory map.

\[ \]

**Virtual Memory Manager**

Page tables, VMAs, demand paging.

\[ \]

**Kernel Heap**

Slab allocator. Per-CPU caches.

\[ \]

**Basic Scheduler**

Round-robin. Single core first. Then SMP.

\[ \]

**IPC Foundations**

Message passing. Capability tokens.

\[ \]

**Interrupt Handling**

IDT. APIC. Timer interrupt. Keyboard interrupt.

\[ \]

**Early Console**

VGA text output. UEFI framebuffer output.

\[ \]

**Basic NVMe Driver**

Read/write from NVMe storage.

\[ \]

**Basic Network Driver**

Intel e1000e or virtio-net.

\[ \]

**Vega FS (minimal)**

Read/write files. Directories. Basic journal.

\[ \]

**Orion Init (minimal)**

Boot to shell. Start 3 services.

\[ \]

**Pulsar Shell (minimal)**

Run commands. Pipes. Basic builtins.

\[ \]

## **Phase B2 — Orion Libc**

**Component**

**Notes**

**Done?**

**Memory functions**

memcpy, memmove, memset, memcmp — SIMD optimised

\[ \]

**String functions**

strlen, strcpy, strcmp, strcat, strstr, strtol, snprintf

\[ \]

**I/O functions**

printf, fopen, fread, fwrite, read, write, open, close

\[ \]

**Math library**

sin, cos, sqrt, pow, log — hardware FPU accelerated

\[ \]

**Thread primitives**

mutex, condvar, rwlock, semaphore — futex based

\[ \]

**Atomic operations**

All sizes: u8 through u64, load/store/CAS/exchange

\[ \]

**Socket interface**

socket, bind, listen, accept, connect, send, recv

\[ \]

**Error handling**

errno, strerror, perror

\[ \]

**Delete musl**

Once Orion Libc passes test suite, remove musl from build

\[ \]

## **Phase B3-B5 — Toolchain**

**Component**

**Notes**

**Done?**

**Cosmos Assembler**

x86-64 + ARM64 + RISC-V. Replaces NASM.

\[ \]

**Cosmos Linker**

Symbol resolution, relocation, Orion executable format.

\[ \]

**Cosmos Compiler (bootstrap)**

Compile with LLVM one last time to get first binary.

\[ \]

**Cosmos Compiler (self-hosted)**

Compile Cosmos Compiler with Cosmos Compiler. Delete LLVM.

\[ \]