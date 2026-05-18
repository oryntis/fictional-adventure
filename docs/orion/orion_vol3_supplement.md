---
title: "Orion Vol3 Supplement"
sidebar_position: 10
---

**PROJECT ORION OS**

**Vol 3 Supplement: Missing Sections**

_§16 Testing Strategy & CI/CD • §17 Missing User-Facing Components • §18 Hardware Compatibility Matrix • §19 Accessibility Build Checklist • §20 i18n/IME Build Checklist • §21 Orion-Specific Dev Tools Specs_

Revision 1.0 • May 2025

# **Purpose**

This supplement fills the gaps identified in the suggestions report. It is read alongside Vol 3 (Build Requirements). Sections are numbered to continue from Vol 3's existing sections.

**How to Use**

Add these sections to your copy of Vol 3. Each section is a self-contained build checklist ready for implementation. Status column: ⬜ Not started | 🔄 In progress | ✅ Done.

# **§16 — Formal Testing Strategy & CI/CD Pipeline**

**Primary Section**

This is the authoritative testing spec. Vol 2B §16 is a duplicate — this Vol 3 §16 is the source of truth for all implementation work.

## **16.1 — The 8-Level Testing Pyramid**

**Level**

**Framework**

**Tests What**

**When**

**Coverage Target**

**Status**

1\. Unit (no\_std)

cargo nextest + cosmos\_test! macro

Individual kernel functions in isolation

Every commit &lt;30s

≥90% on cosmos/ crate

⬜

2\. Integration (QEMU)

just qemu-test — full kernel boot

Subsystem interactions in QEMU

Every PR &lt;5min

All Phase B milestones

⬜

3\. Property tests

proptest crate

Invariants: no double-alloc, no cap corruption

Nightly &lt;20min

All critical data structures

⬜

4\. Formal verification

Kani model checker

Mathematical proof: no overflow, no data race

Weekly &lt;2hrs

DDR-013 targets 100%

⬜

5\. Syscall fuzzing

syzkaller against Cosmos ABI

Random syscall sequences → crashes

Continuous (background)

All 13 syscalls

⬜

6\. Parser fuzzing

cargo-fuzz + AFL++

Random inputs to Vega FS, Comit, network parsers

Nightly

All parser entry points

⬜

7\. Hardware matrix

orion-hw-lab (QEMU virtual HW)

100 virtual HW configs across driver matrix

Weekly + pre-release

All Vol 3 §2 drivers

⬜

8\. Perf regression

criterion.rs benchmarks

IPC latency, context switch, Vega FS IOPS

Every PR

No >5% regression

⬜

## **16.2 — CI/CD Pipeline — 9 Mandatory Stages**

**#**

**Stage**

**Command**

**Pass Condition**

**On Fail**

**Est. Time**

1

Format check

cargo fmt --check

Zero format errors

Block PR

&lt;10s

2

Lint

cargo clippy -- -D warnings

Zero warnings

Block PR

&lt;30s

3

Security audit

cargo audit

Zero CVEs in deps

Block PR

&lt;10s

4

Dependency check

cargo deny check

No GPL / no CVEs

Block PR

&lt;10s

5

Unit tests

cargo nextest run --all

All tests pass

Block PR

&lt;2min

6

Coverage gate

cargo llvm-cov --check

≥90% on cosmos/ crate

Block PR

&lt;3min

7

QEMU boot test

just qemu-test

Boots, prints ORION\_OK, exits 0

Block PR

&lt;2min

8

Kani formal check

kani --harness cosmos\_core

No counterexample found

Block PR

&lt;5min

9

Benchmark check

cargo bench -- --baseline main

No benchmark >5% slower

Warning comment on PR

&lt;5min

## **16.3 — no\_std Kernel Test Harness**

_Standard cargo test requires std. Cosmos uses a custom cosmos\_test! macro that runs tests as QEMU subprocesses:_

// cosmos/src/lib.rs — test harness registration

#!\[cfg\_attr(not(test), no\_std)\]

#!\[feature(custom\_test\_frameworks)\]

#!\[test\_runner(crate::test::cosmos\_test\_runner)\]

#!\[reexport\_test\_harness\_main = "test\_main"\]

// cosmos/src/test.rs

pub fn cosmos\_test\_runner(tests: &\[&dyn Fn()\]) &#123;

serial\_println!("Running &#123;&#125; tests", tests.len());

for test in tests &#123;

test();

&#125;

qemu\_exit(QemuExitCode::Success);

&#125;

// Example test — runs in QEMU

#\[test\_case\]

fn test\_capability\_no\_forge() &#123;

let cap = CapTable::global().alloc(Rights::FILE\_READ);

let fake = CapHandle(cap.0 + 99999);

assert!(CapTable::global().lookup(fake).is\_err());

serial\_println!("\[ok\] capability forge prevention");

&#125;

## **16.4 — GitHub Actions Workflow Structure**

\# .github/workflows/ci.yml

name: Cosmos CI

on: \[push, pull\_request\]

jobs:

ci:

runs-on: ubuntu-latest

steps:

\- uses: actions/checkout@v4

\- uses: dtolnay/rust-toolchain@stable

with:

targets: x86\_64-unknown-none,aarch64-unknown-none

components: rustfmt,clippy,llvm-tools-preview

\- name: Install QEMU

run: sudo apt-get install -y qemu-system-x86 qemu-system-aarch64

\- name: Install just

run: cargo install just

\- name: Format check

run: cargo fmt --check

\- name: Clippy

run: cargo clippy --all-targets -- -D warnings

\- name: Security audit

run: cargo audit

\- name: Unit tests

run: cargo nextest run --all

\- name: Coverage

run: cargo llvm-cov --check --lcov --output-path lcov.info

\- name: QEMU boot test

run: just qemu-test

\- name: Upload coverage

uses: codecov/codecov-action@v4

# **§17 — Missing User-Facing Components Build Checklist**

_These components were missing from Vol 3. Each is a Phase 1 or Phase 2 build item._

## **17.1 — orion-lock (Screen Locker)**

**Design**

orion-lock is a Wayland layer-shell surface that covers all other windows. It holds AuthCapability to verify PAM/biometric unlock. No other process can draw on top of it (Wayland security model enforces this). Auto-lock timer is configurable.

**Component**

**Description**

**Capability**

**Status**

Lock surface

zwlr-layer-shell OVERLAY surface — covers everything

DisplayCapability:LOCK\_LAYER

⬜

Auth challenge

Password entry widget — text input, masked display

AuthCapability:PAM

⬜

Biometric auth

Fingerprint via FIDO2 device — orion-fido2d IPC

AuthCapability:BIOMETRIC

⬜

Auto-lock timer

Idle detection via Wayland idle-notify protocol

None — event-driven

⬜

PAM integration

Call PAM stack via orion-pamd IPC (never directly)

AuthCapability:PAM

⬜

Hibernation resume

Show lock screen when resuming from S3/S4 suspend

PowerCapability:WAKE\_LOCK

⬜

Emergency unlock

TTY console unlock via orion-init (if Wayland dies)

ConsoleCpability:ROOT\_SHELL

⬜

## **17.2 — orion-clipboard (Clipboard Manager)**

**Design**

Orion clipboard uses the Wayland wl-clipboard protocol. History is stored in encrypted memory (MemoryCapability:ENCRYPTED). Apps cannot read clipboard unless user explicitly pastes (no background clipboard monitoring allowed without ClipboardCapability:MONITOR).

**Feature**

**Description**

**Capability**

**Status**

Basic clipboard

wl-data-device-manager protocol — standard copy/paste

ClipboardCapability:READ\_WRITE

⬜

Clipboard history

Last 50 items stored in encrypted memory — accessible via orion-clipboard app

ClipboardCapability:HISTORY

⬜

Type-aware paste

Detect clipboard content type (text, image, file, code) — offer format conversion

ClipboardCapability:READ\_WRITE

⬜

Password protection

Auto-clear clipboard after 60s if content looks like a password (entropy check)

ClipboardCapability:READ\_WRITE

⬜

Cross-session deny

Apps in different Wayland sessions cannot read each other's clipboard

Enforced by Wayland security model

⬜

Clipboard monitor API

Background apps can watch for clipboard changes (opt-in, user-approved)

ClipboardCapability:MONITOR (user prompt)

⬜

## **17.3 — orion-notify (Notification Centre)**

**Feature**

**Description**

**Capability**

**Status**

Notification daemon

Freedesktop.org Notifications spec (D-Bus compatible via orion-dbus)

NotifyCapability:SEND

⬜

Notification centre

Aurora layer-shell panel — shows notification history

DisplayCapability:PANEL

⬜

Do Not Disturb mode

Suppress all notifications — orion-settings toggle

NotifyCapability:DND

⬜

Per-app mute

User can mute specific apps in orion-settings

NotifyCapability:ADMIN

⬜

Rich notifications

Images, action buttons, progress bars — Freedesktop spec

NotifyCapability:SEND

⬜

Persistent notifications

Stored in encrypted DB — survive reboot for important alerts

NotifyCapability:PERSIST

⬜

Notification grouping

Group notifications by app — collapse repeated notifications

None — UI logic

⬜

## **17.4 — orion-partition (Disk Manager)**

**Feature**

**Description**

**Capability**

**Status**

Disk enumeration

List all physical disks and partitions via orion-devmgr IPC

DeviceCapability:/dev/disk

⬜

Partition table operations

Create/delete/resize partitions (GPT and MBR)

DiskAdminCapability (user prompt)

⬜

Vega FS format

Format partition as Vega FS with encryption key generation

DiskAdminCapability + CryptoCapability

⬜

Mount/unmount

Mount external drives, NFS, SMB via vega-vfsd IPC

MountCapability:/mnt

⬜

SMART monitoring

Read SMART data via orion-hw-lab, show health status

DeviceCapability:/dev/disk

⬜

Secure erase

NIST 800-88 erase before partition deletion

DiskAdminCapability + SecureEraseCapability

⬜

GUI frontend

orion-partition-gui — visual disk map (Wayland app)

None (calls orion-partition backend)

⬜

## **17.5 — orion-font (Font Manager)**

**Feature**

**Description**

**Status**

System font directory

/system/fonts/ (read-only, immutable core fonts). /home/user/fonts/ (user fonts)

⬜

Font discovery

fontconfig-compatible font enumeration — apps use same API

⬜

Comit font packages

comit install noto-fonts-cjk — installs to /home/user/fonts/

⬜

Variable fonts

OTF variable font support via FreeType 2

⬜

Fallback chain

Unicode block → font fallback: Latin → CJK → Symbols → Noto (universal fallback)

⬜

Font preview app

orion-font-viewer — Wayland app, browse and preview installed fonts

⬜

## **17.6 — orion-ime (Input Method Engine)**

**Architectural Note**

CJK input (Chinese, Japanese, Korean) requires an Input Method Engine that sits between the keyboard driver and the app. orion-ime implements the Wayland text-input-v3 protocol on the compositor side, and IBus-compatible protocol on the app side for compatibility with existing IMEs (Fcitx5, iBus-mozc for Japanese, etc.)

**Component**

**Description**

**Status**

text-input-v3 protocol

Wayland compositor side — Aurora implements zwp-text-input-v3

⬜

orion-imed daemon

IME manager — launches and manages IME backends

⬜

IBus compat backend

orion-imed speaks IBus protocol — existing IMEs work without porting

⬜

Fcitx5 support

Ship Fcitx5 as comit package — covers CJK, Arabic, Indic scripts

⬜

Built-in Latin IME

Autocorrect, emoji input, special characters — no external IME needed

⬜

Keyboard layout switcher

orion-kbmap — switch layouts without restart, status in panel

⬜

# **§18 — Hardware Compatibility Matrix**

_This matrix tracks driver priority and status across all supported hardware categories. It is the authoritative reference for driver development prioritisation._

**Priority System**

P0 = Blocks all other development (QEMU virtio must work first). P1 = Required for Phase 1 real hardware boot. P2 = Required for Phase 2 desktop. P3 = Phase 3 and beyond.

## **18.1 — CPU Architectures**

**Architecture**

**Target Hardware**

**Priority**

**HAL Support**

**Phase**

**Status**

x86-64

All Intel/AMD PCs from 2010+

P0

DDR-HAL: x86 shim

B1

⬜

ARM64 (AArch64)

Apple M-series, RPi 4/5, Qualcomm, NVIDIA Jetson

P1

DDR-HAL: ARM64 shim

Phase 3

⬜

RISC-V (rv64gc)

SiFive HiFive, Milk-V Pioneer, StarFive VisionFive 2

P1

DDR-HAL: RISC-V shim

Phase 3

⬜

## **18.2 — Storage Drivers**

**Driver**

**Hardware Covered**

**Priority**

**Phase**

**IOMMU Support**

**Status**

virtio-blk

QEMU virtual disk — first and most critical

P0

B7

✅ Mandatory

⬜

NVMe

All NVMe SSDs (PCIe 3.0/4.0/5.0)

P1

1.1

✅ Mandatory

⬜

AHCI/SATA

SATA SSDs and HDDs — legacy but common

P1

1.1

✅ Mandatory

⬜

USB Mass Storage (UMS)

USB flash drives, external HDDs

P1

1.2

✅ Mandatory

⬜

SD/eMMC (SDHCI)

SD cards, embedded storage on ARM boards

P2

2.x

⚠️ Partial IOMMU on ARM

⬜

Virtio-SCSI

QEMU SCSI virtual device

P2

2.x

✅ Mandatory

⬜

## **18.3 — GPU / Display Drivers**

**Driver**

**Hardware Covered**

**Priority**

**Phase**

**Vulkan**

**Display**

**Status**

virtio-gpu

QEMU virtual GPU — 2D + basic 3D

P0

B1 (basic)

❌ No

✅ Yes

⬜

Intel i915/xe

Intel HD/UHD/Iris/Arc (Gen8–Gen14, Meteor Lake)

P1

2.2

✅ Yes

✅ Yes

⬜

AMD amdgpu

AMD GCN4+ (RX 400 series onwards)

P1

2.2

✅ Yes

✅ Yes

⬜

NVIDIA open

NVIDIA RTX 20xx–40xx (open kernel module)

P2

2.2

✅ Yes

✅ Yes

⬜

ARM Mali

Mali-G52/G57/G68/G78 (Kirin, Dimensity)

P2

ARM port

✅ Yes (Panfrost)

✅ Yes

⬜

Qualcomm Adreno

Adreno 600/700 series (Snapdragon)

P2

ARM port

✅ Yes (Turnip)

✅ Yes

⬜

Apple AGX

Apple M1/M2/M3 GPU

P3

Phase 3+

⚠️ Partial (Asahi)

✅ Yes

⬜

## **18.4 — Network Drivers**

**Driver**

**Hardware Covered**

**Priority**

**Phase**

**Status**

virtio-net

QEMU virtual network — first and critical

P0

B7

⬜

Intel e1000e

Intel GbE (many laptops 2010–2020)

P1

1.x

⬜

Intel igc

Intel 2.5GbE (i225/i226 — modern Intel desktop)

P1

1.x

⬜

Realtek r8169

Realtek GbE (extremely common, cheap boards)

P1

1.x

⬜

Intel iwlwifi

Intel WiFi (AX200/AX210/AX211 — most Intel laptops)

P1

1.x

⬜

Realtek rtw89

Realtek WiFi 6/6E (many modern budget laptops)

P1

1.x

⬜

MediaTek mt7921

MediaTek WiFi 6 (AMD laptops, many ARM boards)

P1

1.x

⬜

Atheros ath11k

Qualcomm/Atheros WiFi 6 (Lenovo, HP, Dell)

P2

2.x

⬜

Bluetooth: Intel BT

Intel Bluetooth (AX200/AX210 combo)

P2

2.x

⬜

USB WiFi (RTL8812AU)

Common USB WiFi dongles — old hardware fallback

P2

2.x

⬜

## **18.5 — Input Drivers**

**Driver**

**Hardware Covered**

**Priority**

**Phase**

**Status**

USB HID keyboard

All USB keyboards (HID class)

P1

1.x

⬜

USB HID mouse

All USB mice (HID class)

P1

1.x

⬜

PS/2 keyboard+mouse

Legacy PS/2 — still in many desktop BIOSes

P1

1.x

⬜

I2C HID touchpad

Most modern laptop touchpads (Synaptics, ELAN)

P1

1.x

⬜

libinput gesture

Two/three-finger gestures, pinch zoom — built on I2C HID

P2

2.x

⬜

USB gamepad (XInput)

Xbox controllers, XInput-compatible gamepads

P2

2.x (gaming)

⬜

Touchscreen (I2C)

Laptop touchscreens, 2-in-1 displays

P2

2.x

⬜

IMU/accelerometer

Tablet rotation sensor, laptop lid-close detect

P3

3.x

⬜

# **§19 — Accessibility (orion-a11yd) Build Checklist**

**Accessibility is Architectural**

Accessibility in Orion OS is not a plugin — it is designed in from Phase 1. orion-a11yd must be running before the first Aurora surface appears. Every app must expose an accessible surface tree or it fails certification for the Nebula package hub.

## **19.1 — Core orion-a11yd Daemon**

**Component**

**Description**

**Blocks**

**Status**

AT-SPI2 IPC interface

orion-a11yd exposes AT-SPI2 D-Bus compatible interface — Orca screen reader connects here

Screen reader support

⬜

Aurora surface tree bridge

Aurora sends accessible surface metadata to orion-a11yd via IPC after each frame

All a11y features

⬜

Accessible node cache

orion-a11yd caches the full accessible tree — screen readers query without re-requesting

Performance

⬜

Focus tracking

orion-a11yd tracks input focus and notifies AT clients of focus changes

Keyboard navigation

⬜

Text-to-speech hook

orion-a11yd IPC interface for TTS engines (espeak-ng, piper) — not bundled

Screen reader

⬜

Event bus

Broadcast a11y events (focus change, text insert, selection) to all registered AT clients

All AT tools

⬜

## **19.2 — Input Accessibility**

**Feature**

**Description**

**Standard**

**Status**

Full keyboard navigation

All UI navigable via Tab/Shift-Tab/Arrow keys — no mouse required

WCAG 2.1 AA

⬜

Sticky Keys

One-key modifier: press Shift, then letter = capital. For users who cannot hold keys.

OS standard

⬜

Slow Keys

Ignore brief keypresses — only register held keys. For tremor/motor difficulties.

OS standard

⬜

Bounce Keys

Ignore rapid repeated keypresses. For motor control difficulties.

OS standard

⬜

Mouse Keys

Control mouse pointer via numpad. For users who cannot use a physical mouse.

WCAG 2.1 AAA

⬜

On-screen keyboard

orion-osk — Wayland on-screen keyboard. Touchscreen + mouse input. Auto-appears on touch.

Mobile a11y

⬜

Switch access

Single-switch scanning interface. For users with very limited motor control.

Assistive Tech

⬜

## **19.3 — Visual Accessibility**

**Feature**

**Description**

**Status**

High contrast mode

Aurora applies inverted/high-contrast LUT to all surfaces. 4 preset themes (light, dark, yellow-on-black, etc.)

⬜

Large text scale

System-wide font scale multiplier (1.0x–3.0x). All apps inherit via orion Wayland protocol extension.

⬜

Aurora magnifier

Screen magnifier: 1x–16x zoom. Follows focus cursor. Hardware-accelerated via GPU.

⬜

Reduced motion

prefers-reduced-motion hint sent to all apps — disable animations, parallax, auto-play video.

⬜

Colour blind modes

Deuteranopia, Protanopia, Tritanopia LUT filters in Aurora compositor.

⬜

Cursor size

System cursor size 16px–128px. High visibility colour options.

⬜

## **19.4 — Braille & Screen Reader Support**

**Feature**

**Description**

**Status**

Braille HID driver

USB HID Braille display driver — BrailleCapability grants access to orion-a11yd

⬜

BrlTTY integration

BrlTTY as comit package — connects to orion-a11yd's AT-SPI2 interface

⬜

Orca screen reader

Orca as comit package — Python + AT-SPI2 — works with orion-a11yd out of box

⬜

NVDA Remote

NVDA remote control protocol support for enterprise remote accessibility auditing

⬜

# **§20 — Internationalisation (i18n) & IME Build Checklist**

**CJK Input Requires Kernel-Level Planning**

CJK (Chinese/Japanese/Korean) input requires architecture decisions at the compositor level (text-input-v3 Wayland protocol) before Phase 1 is complete. Cannot be added post-hoc to Aurora without major refactor.

## **20.1 — String & Encoding Foundation**

**Component**

**Requirement**

**Status**

UTF-8 everywhere

Kernel, Pulsar Shell, all daemons, Vega FS filenames — UTF-8 only. No Latin-1, no UCS-2.

⬜

Orion Libc Unicode

Orion Libc exposes: strlen\_utf8(), strcat\_utf8(), strcmp\_utf8(), utf8\_validate()

⬜

BLAKE3 filename hashing

Vega FS hashes UTF-8 filenames via BLAKE3 — emoji filenames, CJK filenames all work

⬜

Pulsar Shell UTF-8

Shell readline handles multi-byte UTF-8 correctly — backspace deletes codepoint not byte

⬜

Terminal emulator UTF-8

orion-term handles: combining characters, zero-width joiners, RTL marks

⬜

## **20.2 — Locale & Translation System**

**Component**

**Requirement**

**Status**

CLDR data

Unicode CLDR 44+ bundled as comit package — locale-aware: date, time, number, currency, sorting

⬜

ICU4X library

Rust ICU4X — locale-aware string operations for Comit packages. gettext for app translations.

⬜

Translation pipeline

All Orion-built apps ship .po source files. comit packages include .mo compiled translations.

⬜

Nebula translation hub

Community can submit translations via Nebula Hub — automated .po→.mo compilation in CI.

⬜

Locale detection

orion-init sets LANG= from TPM-stored user preference. Apps inherit via environment.

⬜

Plural forms

ICU4X handles plural forms correctly for all 200+ CLDR plural rule sets.

⬜

## **20.3 — RTL & Bidirectional Text**

**Component**

**Requirement**

**Status**

HarfBuzz text shaping

HarfBuzz as comit package — shapes Arabic, Hebrew, Persian, Devanagari, Thai correctly

⬜

Pango layout engine

Pango (uses HarfBuzz) — BiDi paragraph layout, RTL line wrapping

⬜

Aurora RTL support

Aurora compositor mirrors UI layout for RTL locales — shell, settings, all system apps

⬜

RTL keyboard shortcuts

All system keyboard shortcuts work correctly in RTL layout (no reversed key confusion)

⬜

RTL clipboard

Clipboard preserves BiDi marks when copying RTL text between apps

⬜

## **20.4 — CJK Input Pipeline**

**Component**

**Requirement**

**Phase**

**Status**

text-input-v3 protocol

Aurora implements zwp-text-input-v3 — app signals when text field active, receives preedit text

1.x (must be in Aurora from day 1)

⬜

orion-imed daemon

IME manager — launches and manages IME backends per locale

1.x

⬜

IBus compat layer

orion-imed speaks IBus protocol over IPC — existing IMEs work without porting

1.x

⬜

Fcitx5 comit package

Fcitx5 as first-class comit package — covers: Pinyin (zh), Mozc (ja), Hangul (ko)

2.x

⬜

Candidate window

Comit candidate selection popup — follows text cursor, theme-aware

1.x (must be in Aurora)

⬜

Anthy/Mozc comit pkg

Japanese IME — Mozc (Google's) as comit package via IBus compat

2.x

⬜

librime comit pkg

Chinese Rime IME engine — handles Cantonese, Traditional/Simplified Chinese

2.x

⬜

# **§21 — Orion-Specific Developer Tools — Full Specifications**

_These tools were listed in Vol 6 §12 as ideas. This section provides full build specifications, capability requirements, and implementation order._

## **21.1 — orion-energy (Per-Process Power Dashboard)**

**Description**

Real-time per-process power accounting. Shows milliwatt consumption per process, historical trends, battery life impact, and optimisation suggestions. Data source: Intel RAPL (x86), ARM PMU (ARM64). Reads from kernel EnergyCapability data feed.

**Component**

**Implementation**

**Capability**

**Status**

Kernel energy accounting

EnergyCapability — kernel reads RAPL/PMU every 100ms, exposes /dev/orion-energy

EnergyCapability:READ (kernel internal)

⬜

orion-energy daemon

Userspace: reads /dev/orion-energy, aggregates per-process, stores in ring buffer

FileCapability:/dev/orion-energy

⬜

CLI: orion-energy top

Terminal UI: live milliwatt usage table sorted by power draw

EnergyCapability:READ

⬜

GUI panel widget

Aurora panel widget: battery % + top power consumer tooltip

EnergyCapability:READ

⬜

orion-settings panel

Full energy history graph, per-app breakdown, suggestions

EnergyCapability:READ

⬜

Optimisation suggestions

If process uses >500mW idle: 'Firefox is using 600mW idle. Close to save 2h battery.'

orion-energy daemon (built-in logic)

⬜

Orion Micro support

RAPL not available on ARM — use ARM PMU alternative path

EnergyCapability:PMU (ARM)

⬜

## **21.2 — orion-time-machine (Vega FS Snapshot Browser)**

**Description**

Time-travel file restoration using Vega FS O(1) snapshots. Restore any file or directory to any previous state: orion-time-machine restore /home/user/doc.txt --time '2 hours ago'. Snapshots are free and instant — this tool is purely a UI on top of Vega FS snapshot API.

**Component**

**Implementation**

**Status**

Snapshot list API

vega-vfsd IPC: list\_snapshots(path) → \[&#123;timestamp, size\_delta, label&#125;\]

⬜

File diff view

orion-time-machine diff path --snapshot S1 --snapshot S2 → unified diff output

⬜

CLI restore

orion-time-machine restore path --time 'yesterday' — resolves to nearest snapshot

⬜

GUI browser

Wayland app: timeline slider, file tree per snapshot, drag-to-restore

⬜

Auto-snapshot policy

orion-init schedules snapshots: hourly (24h retention), daily (30d), weekly (1y)

⬜

Snapshot labels

comit hooks: pre-install snapshot labelled 'before comit install firefox'

⬜

Space accounting

orion-time-machine usage: shows total snapshot space consumption by age

⬜

## **21.3 — orion-hw-lab (Hardware Driver Test Framework)**

**Description**

Automated hardware driver testing using a matrix of QEMU virtual device configurations. Run: orion-hw-lab test nvme — boots Cosmos in QEMU with 100 different NVMe virtual configurations, runs the driver test suite, reports pass/fail per config.

**Component**

**Implementation**

**Status**

QEMU config matrix

YAML matrix: device type, firmware version, queue depth, error injection config

⬜

orion-hw-lab runner

Parallel QEMU launches: 8 concurrent QEMU instances, collect results

⬜

Driver test harness

Per-driver test suite: basic I/O, error handling, suspend/resume, hotplug

⬜

CI integration

just hw-lab-test runs subset (10 configs) in CI. Full 100-config matrix runs weekly.

⬜

Hardware report format

JSON + Markdown report: which configs pass, which fail, which are flaky

⬜

Community HW reports

orion-hw-lab report --submit: upload real hardware results to Nebula Hub compatibility DB

⬜

Error injection testing

Inject I/O errors, DMA faults, timeout conditions — verify driver handles gracefully

⬜

## **21.4 — comit --sandbox (Safe Package Testing)**

**Component**

**Implementation**

**Status**

Ephemeral namespace

comit install --sandbox: install to /run/comit-sandbox/HASH/ — deleted on exit

⬜

Capability sandbox

Sandbox process gets only declared capabilities — no real filesystem access

⬜

Test session

User interacts with sandboxed app — approve or reject install after testing

⬜

Auto-cleanup

On sandbox exit: all files removed, all capabilities revoked, no system state changed

⬜

Install promotion

comit install --accept HASH: promotes sandbox result to real install (no re-download)

⬜

## **21.5 — orion-debug-connect (Remote Kernel Debugging)**

**Description**

Remote kernel debugging over USB serial or network. Attach GDB to a Cosmos kernel running on physical hardware from a developer workstation: orion-debug-connect --serial /dev/ttyUSB0 --kernel /boot/cosmos.elf

**Component**

**Implementation**

**Status**

Serial GDB stub

Cosmos kernel embeds GDB RSP (Remote Serial Protocol) stub on UART3 (configurable)

⬜

Network GDB stub

TCP GDB stub on port 1234 (behind NetworkCapability:DEBUG)

⬜

orion-debug-connect CLI

Wrapper: connects GDB to serial/TCP, loads kernel ELF symbols automatically

⬜

Crash dump capture

On kernel panic: dump registers + stack to serial. orion-debug-connect parses offline.

⬜

Symbol server

orion-debug-connect --symbol-server: serves debug symbols for loaded drivers

⬜

JTAG via OpenOCD

orion-debug-connect --jtag /dev/ttyUSB0: wraps OpenOCD for hardware-level debug

⬜

## **21.6 — orion-offload (Transparent Compute Offloading)**

**Component**

**Implementation**

**Status**

Discovery

orion-offload discovers Orion OS servers on LAN via mDNS (orion.\_tcp.local)

⬜

Capability auth

Server grants OffloadCapability via WireGuard-authenticated IPC

⬜

Work submission

orion-offload render-video --server 192.168.1.100 --input in.mp4 --output out.mp4

⬜

Data transfer

Input data encrypted via WireGuard, transferred to server, result returned encrypted

⬜

Progress reporting

orion-offload shows progress: \[=====> \] 60% ETA 2min on server 192.168.1.100

⬜

Privacy guarantee

Data never stored on server — processed in-memory, result returned, memory zeroed

⬜