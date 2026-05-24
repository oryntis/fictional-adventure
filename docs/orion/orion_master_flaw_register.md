---
title: "Orion Master Flaw Register"
sidebar_position: 3
---

**PROJECT ORION OS**

**Master Flaw, Gap & Edge Case Register**

_Every flaw, error, gap, inconsistency, and edge case across all 13 documents — prioritised, cross-referenced, and actionable_

May 2025 • Not for public release • Internal working document

# **How to Read This Document**

This is the unfiltered gap register. Every item is something that needs to be fixed, decided, or documented. Nothing is softened. Priority levels:

**Priority**

**Label**

**Meaning**

**When to Fix**

🔴 P0

Showstopper

Breaks the security model, blocks Phase B, or makes a core claim false

This week

🟠 P1

Blocker

Prevents Phase 1–2 from starting or creates a serious architectural hole

Before Phase 1

🟡 P2

Major Gap

Reduces quality, creates inconsistency, or leaves a known attack surface

Before Phase 2

🟢 P3

Minor Gap

Docs improvement, edge case, or nice-to-have hardening

Eventually

# **1 — Security Architecture Flaws**

_These are flaws in how Orion OS's security model is designed, not just documented. Each one creates a real attack surface._

## **1.1 — 🔴 P0 The Confused Deputy Problem (DDR-002)**

**What is it?**

Your capability model assumes that if a process holds a capability, using it is safe. It isn't. A malicious app can trick a privileged service into using its capabilities on the attacker's behalf. Example: attacker sends IPC to orion-devmgr (which holds DeviceCapability:/dev/nvme0) saying 'read block X and send it to me.' orion-devmgr obeys — it has the capability. The attacker gets NVMe data it was never granted access to.

**Flaw**

**Location**

**Impact**

**Fix Needed**

**New DDR?**

No intent-based capabilities

DDR-002

Services misuse capabilities on behalf of attackers

Add intent suffix: FileCapability:/etc/shadow:READ_FOR_AUTH — kernel enforces allowed use

DDR-021

Services don't attenuate before responding

DDR-002, DDR-007

orion-devmgr responds with data from its own broad capabilities

Services must create a restricted sub-capability for each requester — never use their own cap directly

DDR-021

No caller identity verification in IPC

DDR-006

A service cannot verify who is calling it or why

IPC messages must carry a verified caller PID + capability proof token

DDR-006 update

## **1.2 — 🔴 P0 TOCTOU Race Conditions in Capability Checks (DDR-002)**

_DDR-002 checks capabilities at syscall entry. But between the check and the actual use, the capability can be revoked. Process A reads → Process B revokes → Process A uses stale grant. This is the classic Time-of-Check to Time-of-Use bug._

**Scenario**

**Attack Vector**

**Fix**

File read TOCTOU

Check FileCapability at open(). Revoke before read(). read() succeeds with stale grant.

Re-validate at every kernel boundary crossing — not just at syscall entry.

MemoryCapability transfer race

Send MemoryCapability via IPC. Revoke it. Receiver uses it. Memory is no longer valid.

Reference counting: revocation only takes effect after all holders drop their reference.

Capability lock needed

No way for a process to 'lock' a capability during a critical section.

Add CAP_LOCK flag: kernel guarantees no revocation while locked. Max lock duration: 10ms.

## **1.3 — 🔴 P0 Supply Chain Attack Surface (DDR-COMIT, DDR-011)**

_Dilithium signatures only verify that a package was signed by someone with the key. They don't verify the build machine wasn't compromised, the source code is clean, or the Rust crates in the dependency tree aren't trojaned._

**Attack Vector**

**Real-World Precedent**

**Gap in Current Docs**

**Fix**

Compromised build machine

SolarWinds 2020 — build machine injected malware into signed binaries

No HSM signing requirement. Dilithium key could be on disk.

HSM-backed signing (YubiKey/TPM). Key never touches disk. 2-of-3 maintainer multi-sig required for releases.

Trojanated Rust dependency

xz backdoor 2024 — SSH servers compromised via dependency

cargo.lock pins versions but not commit hashes. No cargo vet in CI.

Pin all deps to commit SHA, not version. cargo vet mandatory in CI. cargo-audit on every PR.

Reproducible builds ≠ trusted builds

N/A — design flaw

Docs say reproducible builds. Never say 'and the source must also be verified.'

Add: source verification policy. All kernel source changes require 2 maintainer GPG sign-off.

Bootstrap trust gap

Ken Thompson's 'Trusting Trust' (1984)

Phase B1-B4 depends on host Rust + LLVM. If those are compromised, the kernel is.

Publish SHA-256 of every build tool used. Verify toolchain before every CI run.

## **1.4 — 🔴 P0 No Global Capability Limits — DoS via Exhaustion (DDR-020)**

_DDR-020 limits capabilities per process (256 default). But it doesn't limit capabilities system-wide. An attacker spawns 10,000 processes each holding 256 caps = 2.56M capabilities. Kernel cap table overflows → OOM → system down._

**Gap**

**Impact**

**Fix**

No kernel-wide capability count limit

OOM via capability table overflow

Hard limit: 1,048,576 capabilities system-wide. Kernel rejects new cap creation when at 80% capacity.

No per-user capability limit

One user account can DoS all other users

Per-user cap limit: 65,536 capabilities. Per-session: 16,384.

No syscall rate limit

IPC flooding starves kernel

Limit: 10,000 syscalls/sec per process. Exponential backoff after 5,000.

No delegation rate limit in DDR-020

Delegation chain amplification attack

Max 10 delegations/sec per process. Max delegation chain depth: 8.

IPC message queue has no size cap

Unlimited IPC queue = OOM

Max 4,096 pending IPC messages per port. Drop oldest on overflow (not crash).

## **1.5 — 🔴 P0 Unsafe Rust in Kernel — Not Fully Hardened (DDR-010)**

_DDR-010 allows 3 unsafe blocks in the kernel. Kani verifies memory safety in safe Rust. But unsafe blocks are outside Kani's scope. One use-after-free or buffer overread in an unsafe block corrupts the capability table and game over._

**Gap**

**Real CVE Precedent**

**Fix**

ARM MTE mentioned in DDR-010 but not mandated

N/A

Make ARM MTE mandatory on ARM64 builds. Build fails without MTE support.

Intel CET not mentioned at all

CVE-2021-4034 PwnKit — control flow hijack

Add Intel CET (Shadow Stack + IBT) for x86-64. All kernel binaries must be CET-enabled.

Capability table in same address space as kernel heap

Any kernel UAF can corrupt cap table

Isolate capability table in a separate MPK (Memory Protection Key) domain. Only cap_lookup() and cap_alloc() can write to it.

No Spectre v1 mitigations specified

Spectre v1 leaks kernel memory via speculative loads

Add array_index_nospec() equivalent for all capability table lookups. Documented in DDR-012 update.

Kani doesn't verify side-channel resistance

Cache timing can reveal which capabilities a process holds

Add constant-time capability lookup for sensitive operations (auth, crypto).

## **1.6 — 🟠 P1 No Capability Revocation for Live Processes (Missing DDR-024)**

_If ether-d is compromised mid-session, you cannot revoke its NetworkCapability without killing it (which breaks networking). There is no cap_revoke(pid, capability) syscall in DDR-014's 13-syscall ABI._

**Missing Component**

**Impact**

**Fix**

cap_revoke(pid, cap_handle) syscall

No way to surgically remove a capability from a live process

Add as syscall 14. Kernel marks the cap as REVOKED. All future uses return ECAPREVOKED. Existing memory mappings from the cap remain until explicitly released.

No graceful ECAPREVOKED handling spec

Services will crash on revocation, not degrade gracefully

Every service in Vol 3 must handle ECAPREVOKED: log it, attempt reconnect, fail-safe if reconnect fails.

No emergency revocation for user sessions

Compromised session keeps all caps until logout

orion-init can call cap_revoke_session(uid) to revoke all caps for a user's session without logout.

## **1.7 — 🟠 P1 POSIX Compatibility Layer Bypasses Capability Model (Vol 3 §13)**

_The POSIX layer translates Linux syscalls to Orion OS. But Linux apps expect root, setuid, and unrestricted file access. The compatibility layer has to grant broad capabilities to satisfy these expectations, undermining the security model._

**Gap**

**Attack Vector**

**Fix**

setuid binaries in POSIX layer

A trojaned setuid binary gains elevated caps

No setuid in POSIX layer. Emulate via temporary cap grant from orion-pamd: passwd gets FileCapability:/etc/shadow:WRITE for 1 second.

POSIX apps run as broad-capability processes

Malicious ls binary reads files it shouldn't

All POSIX apps run inside a posix-sandbox process with minimum required capabilities declared at ELF load time.

Unsigned Linux binaries can run

Trojaned binaries have no signature check

Mandatory signing for POSIX binaries. Unsigned ELF → comit-posix-sandbox with maximum restriction.

No spec for which capabilities POSIX layer grants

Ambiguous — developers will guess

Write DDR-POSIX: explicit mapping of every POSIX capability to an Orion OS capability grant.

## **1.8 — 🟠 P1 No Full Disk Encryption Spec (DDR-011)**

_DDR-011 specifies measured boot and TPM PCR sealing. But it never specifies Full Disk Encryption (FDE). An attacker with physical access can read /home and /data from another OS even with measured boot._

**Gap**

**Attack**

**Fix**

No FDE spec for /home and /data

Remove disk, read from another OS

Vega FS encryption: ChaCha20-Poly1305 per-extent. Key derived from TPM PCR state + user passphrase via Argon2id. Key never on disk.

No cold boot attack mitigation

Freeze RAM, read encryption keys

Key stored in non-volatile TPM memory, not RAM. RAM overwrite on power-off (where hardware supports it).

No evil maid attack protection

Modify bootloader between uses

Orion OS custom Secure Boot keys replace OEM keys. Only Horizon Boot with valid Dilithium signature boots.

No tamper-evident hardware spec

Attacker opens case, reads JTAG

Document: seal TPM JTAG port in production builds. TPM2_PCR_Extend on chassis intrusion detection.

## **1.9 — 🟠 P1 No Rollback Protection for User Data (Vol 5 §3.3)**

_Vega FS snapshots protect against file corruption. But if ransomware encrypts /home for 48 hours before the user notices, all snapshots within that window are encrypted too. The pre-encryption snapshot may have been evicted._

**Gap**

**Impact**

**Fix**

Snapshots are evicted on LRU policy

Ransomware waits for clean snapshots to evict, then demands ransom

Retention policy: minimum 1 pre-comit-install snapshot kept forever (pinned). Weekly snapshots kept 1 year minimum.

No immutable /home profile layer

Malicious comit package modifies .bashrc or .ssh/authorized_keys

Read-only base profile at /system/user-profiles/USERNAME/. Writable overrides at /home/USERNAME/overrides/. Merged at session start.

No Dilithium-signed user credentials

Attacker replaces ~/.ssh/authorized_keys

Critical files (.ssh/, .gnupg/, .config/orion/) have Dilithium signatures checked at session start. Mismatch → warn user.

## **1.10 — 🟠 P1 Hardware Isolation Missing for High-Security Workloads (DDR-012)**

_DDR-012 has a 5-adversary threat model but no SGX/TrustZone spec. orion-cryptod (crypto daemon) runs in normal userspace — a compromised kernel can read its keys._

**Gap**

**Attack**

**Fix**

No Intel SGX for orion-cryptod

Compromised kernel reads cryptographic keys from daemon memory

orion-cryptod runs in SGX enclave on supported hardware. Keys never leave enclave plaintext.

No ARM TrustZone spec

Same attack on ARM hardware

orion-cryptod uses OP-TEE (TrustZone OS) on ARM64. Crypto operations happen in secure world.

DMA from USB/Thunderbolt not disabled by default

Malicious Thunderbolt device DMA attacks

Default: DMA disabled for all external bus devices. Explicit DMACapability required per device. User prompted on first connect.

No BMC/iLO isolation spec

BMC takes over server remotely

Embedded/server builds: BMC network interface disabled by default. Physical presence required to enable.

## **1.11 — 🟡 P2 Time-Based Attack Surfaces (DDR-002, DDR-011)**

**Gap**

**Attack**

**Fix**

**Priority**

Capability expiry uses wall clock

Set system clock back → expired caps become valid again

Use CLOCK_MONOTONIC exclusively for all capability expiry checks. Wall clock only for display.

🟡 P2

No NTS (Network Time Security)

NTP spoofing → rollback system clock

ether-d uses NTS by default for time sync. Plain NTP rejected.

🟡 P2

Slow Loris on IPC

Open IPC connection, send 1 byte/minute, keep it open indefinitely

Kernel closes IPC connections with no activity for &gt;30 seconds (configurable per service).

🟡 P2

No monotonic time spec in DDR-002

Developers will use wall clock by accident

Add explicit rule to DDR-002: 'All security checks MUST use CLOCK_MONOTONIC. Using CLOCK_REALTIME for security is a bug.'

🟡 P2

## **1.12 — 🟡 P2 Userspace Side-Channel Attacks (DDR-012)**

_DDR-012 covers kernel side channels. It says nothing about userspace process-to-process side channels._

**Gap**

**Attack**

**Fix**

No cache timing isolation between processes

Flush+Reload attack: process A spies on process B's memory access patterns via shared LLC cache

orion-settings: 'High Security Mode' option. Enables: core pinning for sensitive processes, L1/L2 cache flush on context switch, SMT disabled.

No Spectre v1 mitigation in userspace

Malicious process reads another process's memory via speculative execution

All kernel boundary crossings use array_index_nospec(). Documented in DDR-010 update.

Hyper-Threading not documented

SMT allows cross-thread cache timing attacks

Document: HT/SMT disabled in Orion Micro builds. User-togglable in Full builds via High Security Mode.

## **1.13 — 🟡 P2 Firmware Attack Surface (DDR-011)**

**Gap**

**Real Attack**

**Fix**

No UEFI firmware verification

LoJax 2018, MoonBounce 2021 — UEFI rootkits survive OS reinstall

Verify UEFI firmware against LVFS (Linux Vendor Firmware Service) hashes. orion-fwupd checks signature before every boot.

No BMC/IPMI isolation spec

iLO/IPMI firmware compromise = full server takeover

Server builds: BMC network port disabled by default. Requires physical jumper to enable.

Secure Boot uses OEM keys

OEM keys are not Orion OS controlled — OEM could sign malicious boot image

Ship Orion OS Secure Boot keys. Installer optionally replaces OEM keys with Orion OS keys (user consent required).

# **2 — Documentation Errors & Inconsistencies**

## **2.1 — 🔴 P0 Vol 7 Still Has Wrong Volume Number in Header**

**Confirmed Error**

orion_vol7_problems_solutions.docx has 'Volume 6: Problems, Current State & Nova Solutions' in its header. The rename from Vol 6 → Vol 7 updated the filename but NOT the internal document title. Also still says 'Nova Solutions' not 'Orion Solutions'.

Fix: Open Vol 7, change header to 'Vol 7: Problems, Current State & Orion Solutions'. Also update the preface text which says 'Vol 6 Exists'.

## **2.2 — 🔴 P0 Vol 6 (Developer Tools) Still Contains 'Nova-Specific Tools' in Contents**

The contents listing in Vol 6 reads: '§12 New: Innovative Nova-Specific Tools'. The entire document was renamed to Orion but this heading was missed. Also the §12 tools are named 'nova energy', 'nova time-machine' etc — not 'orion energy', 'orion time-machine'.

Fix: Update Vol 6 §12 heading and all tool names inside it. Use the rename map: nova-\* → orion-\*.

## **2.3 — 🔴 P0 Multiple Stale Index Files (v3, v4, v5, v6, v7, v8)**

The outputs folder contains master index files v3 through v8. Only v8 is canonical. Having 6 versions of the index in the same folder will cause anyone reading the docs to open the wrong one. v3–v7 should be archived or deleted.

Fix: Delete or move orion_00_master_index_v3.docx through v7.docx to an /archive/ subfolder. Rename v8 to orion_00_master_index.docx (no version suffix — it IS the current version).

## **2.4 — 🟠 P1 Vol 2 and Vol 2 Unified Both Exist — Which Is Canonical?**

The folder contains both orion_vol2_technical_architecture.docx (original Vol 2, DDR-001 to DDR-014 only, 100KB) and orion_vol2_unified.docx (merged, all 25 DDRs, 67KB). This is the same ambiguity problem as the Vol 6 duplicate from session 1. A contributor will open the original Vol 2 and miss DDR-015 through DDR-COMIT.

Fix: Rename orion_vol2_unified.docx → orion_vol2_technical_architecture.docx. Archive the old Vol 2 as ARCHIVE_orion_vol2_v1_ddr001-014_only.docx.

## **2.5 — 🟠 P1 Vol 3 and Vol 3 Supplement Both Exist — Same Problem**

Same issue as Vol 2. A contributor reading Vol 3 misses the testing strategy, hardware matrix, accessibility spec, i18n spec, and dev tool specs because they're in the supplement, not the main document.

Fix: Physically merge Vol 3S content into orion_vol3_build_requirements.docx. Archive the supplement.

## **2.6 — 🟠 P1 Vol 1 and Vol 1 Supplement Both Exist**

Same pattern. Vol 1 Supplement contains the governance docs, CLA, RFC template, and philosophy deep dives. Anyone reading Vol 1 misses all of this.

Fix: Merge Vol 1S into Vol 1. Archive the supplement.

## **2.7 — 🟠 P1 Vol 7 DDR Status Doesn't Match Vol 2 Unified**

Vol 7 was reconciled but was created before Vol 2 Unified existed. Vol 7 still shows DDR-015 through DDR-020 as their pre-lock status. After the unified merge, the source of truth is Vol 2 Unified — but Vol 7 was never re-synced against it.

Fix: Open Vol 7, find every DDR-015–DDR-020 reference, update status to ✅ LOCKED.

## **2.8 — 🟠 P1 Vol 5 Still Called 'Vol 5 — Problems, Philosophy & Solutions' But Solutions Are Now in Vol 7**

The Vol 5 header says 'Problems, Philosophy & Solutions'. But the reorganisation moved all solutions to Vol 7. Vol 5 is supposed to be philosophy and problem root causes only. The title is now wrong and the content still has solution sections mixed in.

Fix: Rename Vol 5 to 'Vol 5 — Philosophy & Problem Root Causes'. Remove all ✅/⚠️/❌ status rows (they belong in Vol 7). Keep only problem descriptions and philosophy statements.

## **2.9 — 🟡 P2 Vol 9 References 'orion-mld', 'orion-ai-runtime', 'Orion OS ML'**

The Vol 9 rename pass changed most Nova references but missed several inside code blocks, table cells that weren't caught by the regex. Quick scan: 'Orion OS ML Guide' appears in the ML roadmap Phase 4 description. 'orion-mld' appears in the Tier 2 section title.

Fix: Search Vol 9 for 'nova' (case-insensitive) and replace all remaining instances.

## **2.10 — 🟡 P2 Inconsistent DDR Numbering Across Documents**

Vol 2 Unified numbers subsystem DDRs as DDR-HAL, DDR-IR, DDR-INIT, DDR-VFS, DDR-PF, DDR-COMPOSITOR, DDR-AUDIO, DDR-COMIT. Vol 2B (which still exists) numbers them differently in its own sections. Vol 0 glossary references some by different names. The master index uses yet another format in some tables.

Fix: Canonical DDR numbering = exactly as listed in Vol 2 Unified Table of Contents. Every other document must match exactly. The 9 subsystem DDRs need formal integer numbers: DDR-021 through DDR-029 is reserved for the new security DDRs (confused deputy, etc.) — so subsystem DDRs should be named, not numbered.

## **2.11 — 🟡 P2 Vol 4 Learning Resources Has No 'Last Updated' Date or Version**

Vol 4 is the most time-sensitive document — book recommendations, course links, and research papers go stale fastest. It has no version number, no last-updated date, and no mechanism to flag when a resource becomes unavailable.

Fix: Add version + date header. Add a 'Status' column to every resource table: ✅ Available | ⚠️ Check availability | ❌ Discontinued.

## **2.12 — 🟡 P2 Vol 8 OS Landscape Analysis Links to DDRs But DDR Numbers Changed**

Vol 8 references 'DDR-007 (driver model)' and 'DDR-009 (Vega FS)' in its Orion OS Application columns. These numbers are correct. But it also references 'Vega FS' (not Vega FS) in several places, and mentions 'Void Crypto Library' not 'Void Crypto Library'. The rename pass missed Vol 8's table cells.

Fix: Run targeted rename on Vol 8: Vega FS → Vega FS, Void Crypto → Void Crypto, nova-netd → ether-d.

## **2.13 — 🟡 P2 No Cross-Reference System Between DDRs**

DDR-002 (capabilities) affects DDR-006 (IPC), DDR-007 (drivers), DDR-014 (ABI), DDR-020 (quotas), and all 9 subsystem DDRs. But none of these DDRs mention each other. A developer changing DDR-002 has no way to know which other DDRs they must also update.

Fix: Add 'Depends On' and 'Depended On By' fields to every DDR. This is a documentation cross-reference, not a code change.

## **2.14 — 🟡 P2 Vol 0 Glossary Missing 10+ Key Terms**

The Vol 0 glossary has 31 terms. Missing terms that appear throughout all documents:

- Confused Deputy (critical security concept — referenced in security analysis but not defined)
- TOCTOU (Time-of-Check to Time-of-Use — referenced in security DDRs)
- IOMMU (defined implicitly in DDR-007 but not in glossary)
- BLAKE3 (the checksum algorithm — mentioned everywhere, never defined for readers)
- PubGrub (dependency resolution algorithm in DDR-COMIT — not defined)
- MPK (Memory Protection Keys — mentioned in security analysis, not defined)
- SGX / TrustZone (mentioned in DDR-012 gap analysis, not defined)
- HSM (Hardware Security Module — mentioned in supply chain fix, not defined)
- NTS (Network Time Security — mentioned in time attack fix, not defined)
- CoW (Copy-on-Write — mentioned 50+ times, never defined in glossary)

# **3 — Architecture Design Gaps (Missing DDRs)**

_These are architectural decisions that affect Phase 1+ but have no DDR written yet. Code cannot be written for these subsystems until the DDR exists and is locked._

**Missing DDR**

**What It Decides**

**Blocks**

**Priority**

**New DDR #**

Confused Deputy + Intent Capabilities

Intent suffix syntax, kernel enforcement, service attenuation rules

Every service implementation

🔴 P0

DDR-021

Hardware Memory Safety (MTE/CET/MPK)

Mandated hardware mitigations per architecture, capability table isolation

All kernel code

🔴 P0

DDR-022

Secure Build Pipeline

HSM signing, multi-sig, dependency pinning, sandboxed builds, toolchain verification

Every release

🔴 P0

DDR-023

Capability Revocation API

cap_revoke() syscall semantics, ECAPREVOKED error handling, reference counting

Every long-running service

🟠 P1

DDR-024

POSIX Sandbox Architecture

How setuid is emulated, which caps POSIX layer grants, signed ELF policy

POSIX compat layer (Vol 3 §13)

🟠 P1

DDR-POSIX

Hardware Enclaves (SGX/TrustZone)

orion-cryptod enclave design, key lifecycle, fallback on no-SGX hardware

orion-cryptod, key management

🟠 P1

DDR-025

User Data Protection (/home)

FDE spec, snapshot retention policy, immutable profile layer, signed credentials

All user-facing storage

🟠 P1

DDR-026

Full Disk Encryption

Key derivation (TPM + Argon2id), key storage, recovery, cold boot mitigation

Boot sequence, disk encryption

🟠 P1

DDR-FDE

Userspace Side-Channel Mitigations

CPU pinning policy, SMT disable option, constant-time enforcement

High-security mode

🟡 P2

DDR-027

Firmware Verification

LVFS integration, UEFI hash checking, BMC isolation

orion-fwupd, server builds

🟡 P2

DDR-028

Social Engineering Defences

Sandbox-first install, diff before update, TOTP for system changes

comit, orion-settings

🟡 P2

DDR-029

GPU Memory Quotas

VRAM limit per GPUCapability, IOMMU I/O bandwidth caps

GPU drivers, Phase 2 gaming

🟡 P2

DDR-015 update

Kernel Panic Prevention (IPC)

IPC message validation sandbox, syzkaller in CI, malformed message handling

All IPC-using services

🟡 P2

DDR-006 update

# **4 — Implementation & Testing Gaps**

## **4.1 — 🔴 P0 No Fuzzing in CI Pipeline**

_Vol 3 Supplement §16 specifies a 9-stage CI pipeline. Stage 5 is 'syzkaller continuous fuzzing (background)'. But this is described as a background task, not a CI gate. Fuzzing that isn't blocking isn't fuzzing._

**Gap**

**Fix**

syzkaller runs as background, not CI gate

Add a 'fuzz regression' CI stage: run syzkaller for 60 seconds against latest kernel. If any new crash found: block merge.

cargo-fuzz not in any CI stage

Add cargo-fuzz stage: fuzz Vega FS parser + comit manifest parser + IPC message parser for 30s each. New crashes block merge.

No fuzzer corpus tracked in repo

Add /fuzz/corpus/ directory to repo. Grow corpus over time. Re-fuzz on every kernel change.

Miri not in CI

DDR-010 allows 3 unsafe blocks. Add Miri run on all unsafe code in CI. Miri failure blocks merge.

## **4.2 — 🔴 P0 No End-to-End Tests**

The test pyramid has unit, integration (QEMU boot), property, formal, fuzz, hardware matrix, and benchmark. There are no E2E tests: 'install comit package → launch app → verify output → uninstall → verify clean'. These are the tests that catch integration bugs between subsystems.

**Missing E2E Test**

**What It Catches**

comit install → launch → verify → uninstall

Comit ↔ capability model integration bugs

boot → shell → run POSIX binary → verify output

POSIX compat layer regressions

boot → connect network → ping → disconnect

ether-d + orion-pf integration

install package with NetworkCapability → verify DNS works → revoke cap → verify DNS blocked

Capability revocation end-to-end

simulate ransomware → verify snapshot recovery

Vega FS snapshot recovery path

## **4.3 — 🟠 P1 No Driver Development Tutorial in Vol 4**

Vol 4 has books, courses, and hardware manuals. It has nothing that says 'here is how you write a Cosmos userspace driver from scratch, step by step.' Vol 6 lists driver dev tools. Vol 3 lists what drivers need to be written. But nowhere does it say HOW.

Fix: Add Vol 4 §New: 'Writing Your First Orion OS Driver' — a worked example of the virtio-blk driver, from empty file to working QEMU boot.

## **4.4 — 🟠 P1 No Real Hardware Debugging Guide in Vol 6**

Vol 6 §8 mentions 'JTAG + OpenOCD' in one row of a table. There is no step-by-step guide for: flashing Orion OS to real hardware, attaching serial console, attaching JTAG debugger, interpreting a real hardware crash dump. This is the most common blocker for solo OS developers.

Fix: Vol 6 §8 needs a worked example: 'Debugging Orion OS on a Raspberry Pi 4 via UART0 + OpenOCD + GDB'. 2 pages minimum.

## **4.5 — 🟠 P1 No Performance Benchmarks Defined or Measured**

DDR-014 lists 12 performance targets (boot &lt;2s, IPC &lt;500ns, etc.). Vol 3 §16 mentions 'criterion.rs benchmarks'. But no benchmark code exists, no baseline has been measured, and the targets in DDR-014 are not validated against anything. They are aspirational numbers with no evidence.

Fix: Write the benchmark harness before writing any kernel subsystem. Every DDR performance claim must have a QEMU-measurable benchmark that CI runs. If the target can't be measured, the DDR target is fiction.

## **4.6 — 🟠 P1 comit Has No Spec for Signed Metadata**

DDR-COMIT specifies that the .cpkg binary and WASM module are Dilithium-signed. But the package metadata (manifest.toml, dependency tree, version information) is not separately signed. An attacker who can serve a modified manifest.toml can redirect dependencies to malicious packages without breaking the binary signature.

Fix: The Nebula Hub must sign the full dependency resolution result, not just individual packages. Add: Dilithium3(manifest.toml + full_dep_tree + timestamp) = registry_signature. comit verifies registry_signature before accepting the resolution.

## **4.7 — 🟡 P2 No Atomic Update for /home (Only for /system)**

The A/B atomic update system protects /system. If comit installs a package that modifies /home/user/.config/ and fails halfway, /home is in a partial state. Vol 3 §11 doesn't specify atomic semantics for user data modifications.

Fix: comit pre-install snapshot of /home before any modification. If install fails: auto-restore from snapshot. Snapshot label: 'pre-comit-install-PACKAGE-VERSION-TIMESTAMP'.

## **4.8 — 🟡 P2 No Upgrade Path from Linux (User Adoption Blocker)**

Vol 0 tells new developers how to set up an Orion OS build environment. It says nothing about how a user currently on Linux switches to Orion OS as their daily driver. This is the most important adoption document and it doesn't exist.

Fix: Vol 0 §New: 'Migrating from Linux to Orion OS': backup strategy, data migration, which Linux apps work via POSIX layer, which need comit equivalents, what breaks and how to recover.

# **5 — Learning & Onboarding Gaps**

**Gap**

**Location**

**Impact**

**Fix**

**Priority**

No 'First 30 Days' structured plan

Vol 0

New contributors don't know what to do after Milestone 0

Add week-by-week plan: Week 1 env, Week 2 bootloader, Week 3 GDT/IDT, etc.

🟠 P1

No 'Common Pitfalls' guide

Vol 4

New devs repeat the same mistakes

Add: 'Top 10 mistakes new OS developers make on Orion OS'

🟠 P1

No 'How to Ask for Help'

Vol 0

Poor-quality support requests waste maintainer time

Add: structured help request format (OS version, QEMU flags, error output, what was tried)

🟠 P1

No driver writing worked example

Vol 4

Slowest path to first hardware driver

Full virtio-blk driver walkthrough from blank file to QEMU boot

🟠 P1

RISC-V assembly guide missing from Vol 4

Vol 4

RISC-V port (Phase 3) starts without any RISC-V docs

Add RISC-V assembly basics + privileged spec overview to Vol 4 Phase 3 resources

🟡 P2

ARM64 assembly guide missing from Vol 4

Vol 4

ARM64 port starts without ARM64 docs

Add ARMv8/v9 assembly basics + exception model overview to Vol 4 Phase 3 resources

🟡 P2

No Kani/formal verification tutorial

Vol 4

Developers can't add new Kani harnesses to DDR-013 targets

Add: 'Writing a Kani Harness for Cosmos Kernel Code' worked example

🟡 P2

No GDB + QEMU debugging tutorial for beginners

Vol 6

New devs stuck at first kernel panic

Add: 'Your First Kernel Crash: How to Debug in QEMU with GDB'

🟡 P2

No energy benchmarks vs Linux/Windows

Vol 1 §33

Can't prove eco claims without measurement

Add benchmark methodology: RAPL tool, comparison workload, reporting format

🟡 P2

No gaming benchmark methodology

Vol 3 §12

Can't prove gaming claims without FPS/latency data

Add: Vulkan triangle demo latency + frame pacing test methodology

🟡 P2

# **6 — GitHub & Community Infrastructure Gaps**

_Everything in this section costs less than 1 day to fix and has immediate community impact._

**Gap**

**Fix**

**Time**

**Priority**

No README.md in repo

Create README.md: 1-sentence tagline, 3 key features, links to Vol 0 and GitHub Discussions

1 hour

🔴 P0

RFC template exists in docs but not in .github/

Add .github/DISCUSSION_TEMPLATE/rfc.md (copy from Vol 1S §22.2)

30 min

🔴 P0

CLA is in docs but not enforced by GitHub

Add CLA Assistant bot to repo. Configure to require Signed-off-by on all commits.

1 hour

🔴 P0

CODE_OF_CONDUCT.md not in repo root

Copy Contributor Covenant text from Vol 1S §22.1 to CODE_OF_CONDUCT.md

20 min

🔴 P0

No CONTRIBUTING.md

Create CONTRIBUTING.md linking to Vol 0 §3 (Contributing Guide)

30 min

🟠 P1

No MAINTAINERS.md

Create MAINTAINERS.md: roles, GitHub handles, areas of ownership

30 min

🟠 P1

No SECURITY.md

Create SECURITY.md: how to report vulnerabilities responsibly (do not create public issues)

30 min

🟠 P1

No issue templates (.github/ISSUE_TEMPLATE/)

Create: bug_report.md, feature_request.md, rfc_request.md templates

1 hour

🟠 P1

No PR template

Create .github/PULL_REQUEST_TEMPLATE.md: description, type (feat/fix/docs), DDR affected, tests added, CI passes

30 min

🟠 P1

No GitHub Projects board

Create a GitHub Projects board: Backlog → In Progress → Review → Done

1 hour

🟠 P1

No good-first-issue labels on GitHub

Label issues with good-first-issue, difficulty:easy/medium/hard, area:kernel/docs/tooling

1 hour

🟠 P1

ROADMAP.md not in repo

Create ROADMAP.md (copy Phase roadmap from Vol 0 §4)

30 min

🟠 P1

No community discussion space

Set up GitHub Discussions OR a Matrix/Discord server. Link from README.

2 hours

🟠 P1

No 'good-first-issue' content created yet

The good first issues listed in Vol 0 §3.5 need to actually be created as GitHub Issues

2 hours

🟡 P2

No contributor stats or leaderboard

Add GitHub Insights link to README. Monthly top-contributor shoutout in Discussions.

30 min

🟡 P2

# **7 — Marketing & Public Presentation Gaps**

_These don't affect implementation but affect whether anyone knows Orion OS exists._

**Gap**

**Impact**

**Fix**

**Priority**

No 1-sentence elevator pitch

Can't explain Orion OS to anyone in under 30 seconds

Pick one: 'The OS that makes old hardware feel new — and keeps your data yours.' or 'The only OS where the kernel knows your GPU is a computer, not a screen.'

🟠 P1

No comparison table for press/users

People need Orion OS vs Linux vs Windows vs macOS in one table

Create a 5-row comparison: Security model, Hardware aging, AI support, Old HW support, Privacy. Link from README.

🟠 P1

No screenshots or mockups

Zero visual of what Orion OS looks like — every OS announcement needs a screenshot

Create QEMU screenshots (even VGA text mode). Create Figma mockup of Aurora desktop. Add to README.

🟠 P1

No Hacker News post planned

HN is where OS developers discover projects

Plan milestones with 'post to HN when' tags: first QEMU boot, first shell, first real hardware boot.

🟡 P2

No blog or devlog

People can't follow progress between milestones

Start GitHub Pages blog: one post per milestone. Links from README.

🟡 P2

No target audience priority ordering

5 personas exist but no 'who comes first' priority

Old Hardware Owner is persona #1 (600M PCs losing Win10 support). Privacy User is #2. State this explicitly in Vol 0 §1.

🟡 P2

No grants strategy mentioned

NLnet, Sovereign Tech Fund, and EU Horizon fund OS projects

Add to Vol 1: grant application strategy. Orion OS is a strong NLnet candidate (security + open source).

🟡 P2

No newsletter or mailing list

No way to notify followers of milestones

Add to README: GitHub Releases subscription (free). Plan for Buttondown newsletter at v0.1.

🟡 P2

# **8 — Master Priority List — What to Fix & When**

_Sorted by priority then by effort. Fix P0 items before writing a single line of kernel code._

## **🔴 P0 — Fix This Week (Before Any Code)**

**#**

**Task**

**Effort**

**What It Fixes**

1

Draft DDR-021: Confused Deputy + Intent Capabilities

3 days

The single biggest capability model flaw. Blocks all service implementation.

2

Update DDR-002: Atomic cap checks + reference counting + CAP_LOCK flag

2 days

TOCTOU race conditions in capability system.

3

Update DDR-020: Global cap limits (1M system-wide) + per-user limits + syscall rate limiting

1 day

DoS via capability exhaustion.

4

Draft DDR-022: Hardware Memory Safety (MTE mandate, CET, MPK cap table isolation)

2 days

Unsafe Rust + Spectre mitigations.

5

Draft DDR-023: Secure Build Pipeline (HSM, multi-sig, cargo vet, toolchain verification)

2 days

Supply chain attack surface.

6

Fix Vol 7 header (still says 'Volume 6' and 'Nova Solutions')

30 min

Wrong volume number + wrong project name.

7

Fix Vol 6 §12 heading and tool names (still says 'Nova-Specific', 'nova energy' etc.)

30 min

Incomplete rename from Nova → Orion.

8

Archive stale master index files v3–v7. Rename v8 → canonical.

15 min

Prevents contributors opening wrong index.

9

Rename Vol 2 Unified as canonical. Archive old Vol 2.

15 min

Prevents contributors missing DDR-015 through DDR-COMIT.

10

Add README.md, CODE_OF_CONDUCT.md, SECURITY.md, CONTRIBUTING.md to repo

2 hours

Bare minimum GitHub presence.

11

Add cargo-fuzz + Miri to CI pipeline as blocking stages

1 day

Fuzzing must be blocking to be effective.

## **🟠 P1 — Fix Before Phase 1 Code**

**#**

**Task**

**Effort**

**What It Fixes**

12

Draft DDR-024: cap_revoke() syscall + ECAPREVOKED handling

2 days

No revocation for compromised live processes.

13

Draft DDR-POSIX: POSIX sandbox architecture + setuid emulation

2 days

POSIX layer capability bypass.

14

Draft DDR-FDE: Full Disk Encryption spec (TPM+Argon2id key derivation)

2 days

Physical attacker can read /home.

15

Draft DDR-026: User data protection (/home snapshot retention + immutable profiles)

1 day

Ransomware + malicious package protection for user data.

16

Merge Vol 3 Supplement into Vol 3 main document

1 day

Contributors miss testing, a11y, i18n, hardware matrix specs.

17

Merge Vol 1 Supplement into Vol 1 main document

1 day

Contributors miss governance, CLA, RFC template, philosophy dives.

18

Add 10 missing glossary terms to Vol 0 §5

2 hours

Undefined terms appear throughout all docs.

19

Add DDR cross-reference fields (Depends On / Depended On By) to all DDRs

1 day

No way to trace DDR change impact.

20

Fix Vol 5 title + remove solution content (move to Vol 7)

1 day

Vol 5 still contains what was supposed to go to Vol 7.

21

Write E2E test specifications for 5 critical paths

1 day

No E2E tests exist or are specified.

22

Add comit signed metadata spec to DDR-COMIT

1 day

Manifest.toml not separately signed — dep redirect attack.

23

Add .github/ISSUE_TEMPLATE + PR template + MAINTAINERS.md

2 hours

GitHub bare minimum for contributors.

24

Add 'First 30 Days' structured onboarding to Vol 0

1 day

High new contributor dropout after Milestone 0.

25

Add elevator pitch + comparison table to README

2 hours

No public-facing summary of Orion OS.

## **🟡 P2 — Fix Before Phase 2 Code**

**#**

**Task**

**Effort**

**What It Fixes**

26

Draft DDR-025: Hardware enclaves (SGX/TrustZone) for orion-cryptod

2 days

orion-cryptod keys readable by compromised kernel.

27

Draft DDR-027: Userspace side-channel mitigations (CPU pinning, SMT, constant-time)

1 day

Cross-process cache timing attacks.

28

Draft DDR-028: Firmware verification (LVFS, BMC isolation, Secure Boot keys)

1 day

UEFI rootkits, BMC compromise.

29

Draft DDR-029: Social engineering defences (sandbox-first, diff, TOTP)

1 day

User installs malicious packages.

30

Add RISC-V + ARM64 assembly guides to Vol 4 Phase 3

3 days

Phase 3 port starts with no arch documentation.

31

Add Kani tutorial to Vol 4

2 days

Developers can't add formal verification harnesses.

32

Write driver development tutorial in Vol 4 (virtio-blk worked example)

3 days

No step-by-step driver writing guide.

33

Write real hardware debugging guide in Vol 6 §8 (RPi4 UART + JTAG)

2 days

Most common Phase 1 blocker for solo developers.

34

Fix remaining Nova → Orion renames in Vol 9 code blocks

30 min

Incomplete rename in Vol 9.

35

Fix Vega FS → Vega FS, Void Crypto → Void Crypto in Vol 8

30 min

Incomplete rename in Vol 8.

36

Add benchmark harness spec to Vol 3 §16 (measurable targets, not aspirational)

1 day

DDR-014 performance targets are unvalidated.

37

Add atomic /home update spec to comit (DDR-COMIT update)

1 day

/home can be left in partial state after failed install.

38

Add Vol 4 resource status column (✅/⚠️/❌ availability)

2 hours

Links in Vol 4 will go dead — no way to track.

39

Update DDR-015 with GPU memory quota and IOMMU I/O bandwidth limits

1 day

GPU memory exhaustion DoS not addressed.

40

Add monotonic time rule to DDR-002 (explicit ban on CLOCK_REALTIME for security)

30 min

Developers will use wall clock for capability expiry.

## **🟢 P3 — Fix Eventually**

**#**

**Task**

**Effort**

41

Add TL;DR (1-paragraph summary) at start of every major DDR section

2 hours per DDR

42

Add 'Why This Matters' + 'Alternatives Considered' + 'Open Questions' to every DDR

1 day total

43

Add Last Updated date + owner to every document

2 hours

44

Add mini-glossary (5–10 terms) to start of every volume

2 hours per volume

45

Add screenshot/mockups of Aurora and Pulsar to README and Vol 0

1 day

46

Add Hacker News post plan to milestone timeline

30 min

47

Start GitHub Pages devlog/blog — one entry per milestone

Ongoing

48

Add energy benchmark methodology vs Linux/Windows to Vol 1 §33

1 day

49

Add gaming benchmark methodology to Vol 3 §12

1 day

50

Add Linux→Orion OS migration guide to Vol 0

2 days

51

Add grant strategy (NLnet, Sovereign Tech Fund) to Vol 1

2 hours

52

Add footnotes/citations to all 'X% of CVEs are...' claims

1 day

53

Add 'Contributor Stories' section to Vol 0 for community inspiration

Ongoing

54

Set up Matrix or Discord community server

2 hours

55

Add newsletter subscription (GitHub Releases or Buttondown)

1 hour

**Final Honest Assessment**

The documentation system is already in the top 1% of solo OS projects. The philosophical foundations are correct. The DDR format is professional. The space naming system is memorable. The critical security flaws identified here — particularly the Confused Deputy problem and TOCTOU race conditions — are not Orion OS inventions. They are known capability model attack patterns that seL4 and Fuchsia both had to solve. The difference is that seL4 and Fuchsia solved them with years of formal analysis. Orion OS needs to solve them now, in DDR-021 and DDR-002 updates, before writing a single line of IPC or service code. The good news: solving them now is a design change. Solving them after the code exists is an architectural rewrite.
