---
title: "Orion Project Tools Spec"
sidebar_position: 4
---

**PROJECT ORION OS**

**orion-tasks: Task Manager — Full Specification**

_Usage guide • Priority and phase definitions • 55-task reference list • Vol 0 / Vol 6 / Vol 7 integration_

Revision 3.0 • May 2025 • Merge §6 into Vol 0 and §14 into Vol 6

# **What It Is**

orion-tasks is an interactive task tracking system built as a Claude artifact. It comes pre-loaded with all 55 tasks from the Master Flaw Register and implementation roadmap, organised by priority (P0–P3) and phase. Tasks persist across sessions. It runs inside Claude — no installation required.

**Why Not Just GitHub Issues?**

GitHub Issues are for public-facing bug reports and feature requests. orion-tasks is your personal implementation backlog — the tasks you are personally working through. When a task is done here, it becomes a GitHub PR, a merged DDR, or a closed issue. They complement each other.

# **How to Open It**

\# In any Claude conversation, type:

"Show me the Orion OS Task Manager"

\# The artifact loads with all 55 pre-loaded tasks.

\# Tasks persist across sessions automatically.

# **Full Feature List**

**Feature**

**Description**

**How to Use**

55-task pre-loaded backlog

All tasks from the flaw register pre-loaded with correct priority and phase

Open the artifact — tasks appear grouped P0→P1→P2→P3 immediately

Persistent storage

Tasks persist between Claude sessions — closing browser does not lose progress

Check a task done — it stays done next time you open it

Priority grouping

Tasks auto-grouped: P0 (critical) → P1 (blocker) → P2 (major gap) → P3 (minor). Done tasks move to bottom.

Visible immediately — no manual sorting needed

Priority filter

Show only P0, P1, P2, or P3 tasks

Use the Priority dropdown above the task list

Phase filter

Show only tasks for a specific phase

Use the Phase dropdown — Phase B, Phase 1–3, Docs, Security, Community

Status filter

Show only open or only completed tasks

Use the Status dropdown

Progress dashboard

4 stat cards: total tasks, done %, P0 open, P1 open. Live progress bar.

Updates automatically as you check tasks

Add custom tasks

Text input + priority + phase — add any task beyond the 55

Fill the input row and press Add task or hit Enter

Delete tasks

Remove tasks not relevant to your setup

Click × on any task row

Export for sprint planning

Sends your full task list to Claude for weekly sprint analysis

Click Export — Claude analyses priority and suggests a day-by-day plan

# **Workflows**

## **Day 1 Setup**

*   Open the Task Manager in Claude
*   Filter to P0 — 11 critical tasks that must be done before writing any kernel code
*   Work through them in order, checking each off when complete
*   When P0 is clear, filter to P1 — 14 tasks needed before Phase 1 starts

## **Weekly Sprint Planning**

*   Monday morning: open the Task Manager
*   Check off any tasks completed last week
*   Click Export — sends your full task list to Claude
*   Ask Claude: 'What should I focus on this week? Give me a day-by-day plan'
*   Claude analyses priorities and dependencies and returns a sprint plan

## **Adding New Tasks**

*   As new DDRs are identified or new gaps are found: add them immediately
*   Format: '\[DDR number or Vol section\]: brief description of what needs to be done'
*   Assign priority using the definitions below
*   Assign phase using the definitions below

# **Priority Definitions**

_Use these definitions exactly when assigning priority to new tasks._

**Priority**

**Label**

**Definition**

**Test Question**

🔴 P0

Showstopper

Blocks Phase B kernel code. OR makes a core security claim false. OR the system cannot function without it.

If this isn't done, can I write any kernel code? If yes → P0.

🟠 P1

Blocker

Cannot start Phase 1 or 2 without it. Creates a serious architectural hole if missing.

If missing before Phase 1, will I have to rewrite Phase 1 code? If yes → P1.

🟡 P2

Major Gap

Reduces quality or creates a known attack surface. Should be done before Phase 2 code.

Does this gap cause a real security problem or block a Phase 2 milestone? If yes → P2.

🟢 P3

Minor Gap

Docs improvement, edge case hardening, or community nice-to-have. Nothing is blocked.

Can Phase B through Phase 2 proceed safely without this? If yes → P3.

# **Phase Definitions**

**Phase**

**When to Use**

**Examples**

Phase B

Must be done before Phase 1 kernel code. Bootloader, PMM, VMM, capability system, IPC, first driver.

UEFI bootloader, buddy allocator, IPC fast path, virtio-blk driver

Phase 1

Needed for first real hardware boot (v0.5 Alpha). NVMe, network, filesystem write, shell, packages.

NVMe driver, Ether-d stack, Pulsar Shell, Comit package manager

Phase 2

Needed for desktop milestone (v0.8 Beta). Compositor, GPU, AI runtime, gaming.

Aurora compositor, GPU drivers, Quasar Runtime, gaming subsystem

Phase 3

Needed for v1.0 production release. Ports, compiler, formal verification, enterprise.

ARM64/RISC-V ports, Cosmos Compiler bootstrap, Kani verification

Docs

Documentation task — writing a volume section, updating a DDR, fixing a doc error.

Write DDR-021, fix Vol 7 header, add glossary terms, merge supplements

Security

Writing or updating a security DDR, adding a security test to CI.

Draft DDR-022, update DDR-002 TOCTOU section, add syzkaller to CI

Community

GitHub infrastructure, community management, public presence.

Add ISSUE\_TEMPLATE, write README.md, set up Matrix server

# **All 55 Pre-Loaded Tasks — Complete Reference**

## **🔴 P0 — Critical (11 tasks)**

**#**

**Task**

**Phase**

**Fixes**

1

Draft DDR-021: Confused Deputy + intent-based capabilities

Security

Services misuse caps on attacker's behalf — capability model's biggest known flaw

2

Update DDR-002: atomic checks + CAP\_LOCK + reference counting

Security

TOCTOU race conditions in capability check/use gap

3

Update DDR-020: 1M system-wide cap limit + per-user limits + syscall rate limits

Security

DoS via capability table exhaustion

4

Draft DDR-022: hardware memory safety (MTE mandate, CET, MPK isolation)

Security

Unsafe Rust hardening + Spectre v1 mitigations

5

Draft DDR-023: secure build pipeline (HSM signing, multi-sig, cargo vet)

Security

SolarWinds/xz-class supply chain attacks on build system

6

Fix Vol 7 internal header — still says 'Volume 6' in the document body

Docs

Wrong volume number inside the file confuses contributors

7

Fix Vol 6 §12 tool names — still uses nova-\* naming in that section

Docs

Incomplete rename pass in Vol 6

8

Archive master index v5–v8. Keep only v9.

Docs

Six stale index versions create confusion about which is current

9

Ensure Vol 2 Unified is the only Vol 2. Archive the original.

Docs

Original Vol 2 is missing DDR-015 through DDR-COMIT

10

Add README.md, CODE\_OF\_CONDUCT.md, SECURITY.md, CONTRIBUTING.md to repo

Community

Project has no public GitHub presence — bare minimum needed

11

Add cargo-fuzz + Miri as blocking CI stages (not background tasks)

Phase B

Fuzzing that doesn't block merges has no security value

## **🟠 P1 — Blocker (14 tasks)**

**#**

**Task**

**Phase**

**Fixes**

12

Draft DDR-024: cap\_revoke() syscall + ECAPREVOKED handling spec

Security

No mechanism to revoke capabilities from a live compromised process

13

Draft DDR-POSIX: sandbox architecture for POSIX compat layer + setuid emulation

Security

POSIX compatibility layer bypasses the capability model entirely

14

Draft DDR-FDE: full disk encryption spec (TPM + Argon2id key derivation)

Security

Physical attacker can read /home and /data from another OS

15

Draft DDR-026: user data protection (/home snapshot retention + immutable profiles)

Security

Ransomware can encrypt /home; malicious package can modify .ssh/

16

Merge Vol 3 Supplement into Vol 3

Docs

Testing, a11y, i18n, hardware matrix specs are invisible to Vol 3 readers

17

Merge Vol 1 Supplement into Vol 1

Docs

Governance, CLA, RFC template, philosophy dives invisible to Vol 1 readers

18

Add 10 missing glossary terms to Vol 0 §5

Docs

Confused Deputy, TOCTOU, IOMMU, BLAKE3, CoW, MPK, SGX, HSM, NTS, PubGrub undefined

19

Add Depends On / Depended On By fields to all DDRs

Docs

No way to trace the impact of a DDR change across the system

20

Fix Vol 5 title — remove solution content (belongs in Vol 7)

Docs

Vol 5 titled 'Problems, Philosophy & Solutions' but solutions belong in Vol 7

21

Write 5 end-to-end test specifications for critical integration paths

Phase B

No E2E tests exist or are specified anywhere

22

Add signed metadata spec to DDR-COMIT (manifest.toml + dep tree signed)

Security

Dependency redirect attack possible without signed metadata

23

Add .github/ISSUE\_TEMPLATE, PR template, MAINTAINERS.md to repo

Community

No GitHub templates — contributors cannot report bugs or submit PRs consistently

24

Add 'First 30 Days' structured onboarding plan to Vol 0

Docs

High contributor dropout after Milestone 0 — no structured next steps

25

Add elevator pitch + OS comparison table to README

Community

No public summary of what Orion OS is or why it matters

## **🟡 P2 — Major Gap (15 tasks)**

**#**

**Task**

**Phase**

**Fixes**

26

Draft DDR-025: hardware enclaves (SGX/TrustZone) for orion-cryptod

Security

Compromised kernel can read crypto keys from daemon memory

27

Draft DDR-027: userspace side-channel mitigations (CPU pinning, SMT, constant-time)

Security

Cross-process cache timing attacks between applications

28

Draft DDR-028: firmware verification (LVFS, BMC isolation, Secure Boot key ownership)

Security

UEFI rootkits and BMC compromise on server hardware

29

Draft DDR-029: social engineering defences (sandbox-first install, diff, TOTP)

Security

Users can be tricked into installing malicious packages

30

Add RISC-V + ARM64 assembly guides to Vol 4 Phase 3 resources

Docs

Phase 3 ports start with no architecture assembly documentation in the project

31

Add Kani formal verification tutorial to Vol 4

Docs

Developers cannot add new Kani harnesses without a worked example

32

Write driver development tutorial (virtio-blk worked example) in Vol 4

Docs

No step-by-step guide for writing an Orion OS userspace driver

33

Write real hardware debugging guide in Vol 6 §8 (RPi4 UART + JTAG)

Docs

Most common Phase 1 blocker for solo developers — not documented

34

Fix remaining nova→orion renames in Vol 9 code blocks

Docs

Some code block text still uses old nova-\* names

35

Fix Vega FS→Vega FS, Void Crypto→Void Crypto in Vol 8 table cells

Docs

Incomplete rename in Vol 8

36

Add benchmark harness spec to Vol 3 §16 (measurable targets not aspirational)

Phase 1

DDR-014 performance targets have no measurement methodology

37

Add atomic /home update spec to DDR-COMIT (pre-install snapshot)

Phase 1

Failed comit install can leave /home in partial state

38

Add resource availability status column to Vol 4 resource tables

Docs

Book and course links go dead with no tracking mechanism

39

Update DDR-015 with GPU memory quota + IOMMU I/O bandwidth limits

Security

GPU memory exhaustion denial-of-service not addressed

40

Add explicit rule to DDR-002: CLOCK\_MONOTONIC mandatory, CLOCK\_REALTIME banned for security

Security

Developers will use wall clock for capability expiry by accident

## **🔴 P0 — Phase B Code Tasks (8 tasks)**

**#**

**Task**

**DDR Reference**

41

Write UEFI bootloader — Phase B1.1

DDR-HAL, DDR-011

42

Write kernel entry: long mode transition + early console — Phase B1.2–B1.4

DDR-HAL

43

Implement physical memory manager: buddy allocator — Phase B1.5

DDR-003

44

Implement virtual memory manager: 4-level page tables — Phase B1.6

DDR-003

45

Implement capability system: kernel table + rights + revocation — Phase B1.7

DDR-002, DDR-024

46

Implement IPC fast path: synchronous small message &lt;500ns — Phase B1.8

DDR-006

47

Write first userspace driver: virtio-blk in QEMU — Phase B7

DDR-007

48

Mount Vega FS read-only in QEMU — Phase B8

DDR-009, DDR-VFS

## **🟢 P3 — Minor Gap (7 tasks)**

**#**

**Task**

**Phase**

49

Add TL;DR summary paragraph at the start of every major DDR section

Docs

50

Add 'Why This Matters' section to every DDR

Docs

51

Add Last Updated date and owner field to every document header

Docs

52

Add Aurora/Pulsar UI screenshots or mockups to README

Community

53

Set up GitHub Discussions or Matrix community server

Community

54

Add grant strategy (NLnet, Sovereign Tech Fund) to Vol 1

Docs

55

Start GitHub Pages devlog — one post per milestone

Community

# **Integration: Where orion-tasks Appears in the Docs**

## **Vol 0 §6 — Project Tool (add this section)**

**Vol 0 §6 — orion-tasks: Task Manager**

orion-tasks is an interactive task tracking system that runs inside Claude as an artifact. 55 tasks pre-loaded, P0→P3 priority grouped, phase filtered, persistent across sessions. To open it: ask Claude 'Show me the Orion OS Task Manager'. Use it to: track your implementation backlog, check off completed tasks, filter by priority and phase, add custom tasks, and Export for weekly sprint planning with Claude.

## **Vol 6 §14 — Developer Task Tool (add this row)**

**Tool**

**Type**

**Open With**

**Primary Use**

orion-tasks

Claude artifact — interactive, persistent

Ask Claude: 'Show me the Orion OS Task Manager'

Track implementation backlog. 55 pre-loaded tasks. Filter by priority and phase. Export for sprint planning.

## **Vol 7 Integration Note (add to preface)**

**Vol 7 + orion-tasks**

Vol 7 is the architectural status overview — which problems have a DDR and which are still open gaps. orion-tasks is the personal implementation tracker — which tasks you are personally working on this week. Use Vol 7 to understand the design status of the whole system. Use orion-tasks to manage your personal work queue.