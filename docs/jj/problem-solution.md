# 📋 Orion OS: Problems and Solutions

> **A living document to track and resolve every identified flaw, gap, inconsistency, and risk in the Orion OS project.**
> *Last Updated: May 2026*
> *Owner: Narendra Samtani*
> *Sources: Master Flaw Register · Analysis Feedback Report · Critical Flaws Tracker · Roadmap Feedback*

---

## 📌 How to Use This Document

1. **Review tables below** — items are grouped by priority (P0 → P3) and category.
2. **Update Status** as work progresses: `⬜ Not Started` → `🔄 In Progress` → `✅ Done`.
3. **Move resolved items** to the [✅ Resolved](#-resolved-issues) section at the bottom.
4. **Add new issues** by appending a row to the appropriate priority table.
5. **Cross-reference DDRs** — every security or architecture issue links to its DDR.

---

## 🔴 P0 — Showstoppers (Fix Before Any Kernel Code)

*These block Phase B or make a core security claim false.*

---

### 🛡️ Security Architecture Flaws

| **#** | **Problem** | **Root Cause** | **Impact** | **Solution** | **DDR** | **Owner** | **Status** |
|-------|-------------|----------------|------------|--------------|---------|-----------|------------|
| S-01 | **Confused Deputy Problem** — Services can be tricked into misusing capabilities on behalf of attackers. Example: orion-devmgr reads NVMe data for an attacker that was never granted access. | No intent field on capabilities; services use their own broad caps when responding to clients. | Any privileged service becomes a weapon for unprivileged attackers. Entire capability model is compromised. | Intent-based capabilities: `FileCapability:/path:READ_FOR_AUTH`. Services must create a restricted sub-capability for each requester. IPC messages carry verified caller-ID. | DDR-021 | @Narendra | ✅ Done |
| S-02 | **TOCTOU Race Conditions** — Capability checked at syscall entry, revoked before use. File read: check → revoke → use stale grant. | Single validation point at syscall entry; no re-validation at use. | Race condition exploitable in multi-threaded scenarios; stale capability grants used after revocation. | Atomic check-and-use at every kernel boundary. `CAP_LOCK` flag prevents revocation during critical section (max 10ms). Reference counting defers free until all holders drop. | DDR-002 | @Narendra | ✅ Done |
| S-03 | **No Global Capability Limits** — 10,000 processes × 256 caps = 2.56M capabilities → OOM → system down. | DDR-020 limited per-process caps but not system-wide totals. | DoS via capability table exhaustion. One user account can kill all others. | System-wide hard limit: 1,048,576. Per-user: 65,536. Per-session: 16,384. Reject new caps at 80% capacity. Rate limit: 10,000 syscalls/sec per process. | DDR-020 | @Narendra | ✅ Done |
| S-04 | **Unsafe Rust Not Fully Hardened** — 3 `unsafe{}` blocks exist; one UAF corrupts the capability table. | Kani cannot verify unsafe blocks. Cap table shares address space with kernel heap. | Memory corruption in any unsafe block = capability table corruption = full privilege escalation. | ARM MTE mandatory (ARM64). Intel CET mandatory (x86-64). Cap table in MPK domain (write-only via `cap_lookup()` / `cap_alloc()`). `array_index_nospec()` on all cap table lookups. | DDR-022 | @Narendra | ✅ Done |
| S-05 | **Supply Chain Attack Surface** — Signing only proves who signed, not that the build machine was clean or deps are trusted. | No HSM-backed signing. No `cargo vet`. Deps pinned by version, not commit SHA. | SolarWinds-style attack: signed binaries with trojaned code. xz-style: backdoored dependency. | HSM-backed signing. 2-of-3 maintainer multi-sig. `cargo vet` mandatory CI gate. Pin all deps to commit SHA. Sandboxed CI runners. Reproducible builds as CI gate. | DDR-023 | @Narendra | ✅ Done |

---

### 📄 Documentation Errors (P0)

| **#** | **Problem** | **Location** | **Fix** | **Owner** | **Status** |
|-------|-------------|--------------|---------|-----------|------------|
| D-01 | **Vol 7 header says "Volume 6"** | orion_vol7_problems_solutions.docx | Rename header to "Vol 7: Problems, Current State & Orion OS Solutions" | @Narendra | ✅ Done |
| D-02 | **Vol 6 §12 uses "Nova-Specific Tools"** | orion_vol6_developer_tools.docx | Rename to "Orion OS-Specific Tools"; update all tool names `nova-*` → `orion-*` | @Narendra | ✅ Done |
| D-03 | **Kernel size contradiction: 200KB vs 15K lines of Rust** | Vol 2 DDR-001 | Clarify: 200KB is Phase 3 stretch goal. Phase 1 target: &lt;5K lines / ~500KB. Phase 2: &lt;10K lines. Phase 3: &lt;15K lines / ~200KB. | @Narendra | ✅ Done |
| D-04 | **"Nova" naming persists throughout docs** | Vol 5, Vol 6, Vol 7, Vol 8 | Global find-and-replace: `Nova` → `Orion OS`. `Nova FS` → `Vega FS`. `nova-mld` → `orion-mld`. `Nova DDR` → `Orion OS DDR`. | @Narendra | ✅ Done |
| D-05 | **Ask Manager (orion-ask) referenced in tools spec** | orion_project_tools_spec.docx | Remove all Ask Manager references; document is orion-tasks only. | @Narendra | ✅ Done |
| D-06 | **Vol 5 title includes "Solutions"** | orion_vol5_philosophy_problems.docx | Rename to "Vol 5: Philosophy & Problem Root Causes". Solutions belong in Vol 7. | @Narendra | ✅ Done |
| D-07 | **Multiple stale master index files (v3–v8)** | Project folder | Archive `orion_00_master_index_v3.docx` through `v7.docx`. Keep only v9. | @Narendra | ⬜ Not Started |
| D-08 | **Vol 8 references stale "Nova" names** | orion_vol8_os_landscape_analysis.docx | Replace `.nova IDL` → `Cosmos IDL` in all comparison tables. | @Narendra | ✅ Done |
| D-09 | **Inconsistent terminology: "Cosmos" ambiguous** | All volumes | Standardise: "Cosmos" = the kernel only. "Orion OS" = the full OS. Document in Vol 0 §5 glossary. | @Narendra | ⬜ Not Started |
| D-10 | **Philosophy Matrix appears twice in roadmap.md** | roadmap.md | Deduplicate; link to single source in about.md. | @Narendra | ✅ Done |

---

### 🌐 GitHub & Community Infrastructure (P0)

| **#** | **Problem** | **Fix** | **Effort** | **Owner** | **Status** |
|-------|-------------|---------|------------|-----------|------------|
| G-01 | **No README.md** | Create with elevator pitch, quick start, volume index, architecture diagram | 1 hour | @Narendra | ✅ Done |
| G-02 | **No CONTRIBUTING.md** | Full guide: dev environment, workflow, code standards, CI gates, first 30 days | 2 hours | @Narendra | ✅ Done |
| G-03 | **No CODE_OF_CONDUCT.md** | Contributor Covenant v2.1 | 20 min | @Narendra | ✅ Done |
| G-04 | **No SECURITY.md** | Responsible disclosure process, response timelines, in-scope definition | 30 min | @Narendra | ✅ Done |
| G-05 | **No MAINTAINERS.md** | Roles, GitHub handles, area ownership, DDR ownership, path to maintainership | 30 min | @Narendra | ✅ Done |
| G-06 | **No RFC template** | `.github/DISCUSSION_TEMPLATE/rfc.md` with summary/motivation/design/DDR-changes/voting | 30 min | @Narendra | ✅ Done |
| G-07 | **No CLA enforcement** | Add CLA Assistant bot; require `Signed-off-by` on all commits | 1 hour | @Narendra | ⬜ Not Started |
| G-08 | **No issue/PR templates** | Bug report, feature request, PR template (all created) | 1 hour | @Narendra | ✅ Done |
| G-09 | **No CODEOWNERS file** | `.github/CODEOWNERS` with per-path ownership | 30 min | @Narendra | ✅ Done |
| G-10 | **No GitHub Projects board** | Create board for milestone tracking: Phase B → Phase 1 → Phase 2 | 1 hour | @Narendra | ⬜ Not Started |
| G-11 | **No `good-first-issue` labels** | Label issues by difficulty, area, and phase | 1 hour | @Narendra | ⬜ Not Started |

---

## 🟠 P1 — Blockers (Fix Before Phase 1 Code)

*These prevent Phase 1 from starting or create serious architectural holes.*

---

### 🛡️ Missing Security DDRs (P1)

| **#** | **Missing DDR** | **What It Blocks** | **Decision Summary** | **Owner** | **Status** |
|-------|-----------------|---------------------|----------------------|-----------|------------|
| M-01 | **DDR-024: Capability Revocation API** | Live process compromise handling | `cap_revoke(pid, handle)` = syscall 14. `ECAPREVOKED` error. Reference counting — revocation deferred until all holders drop. Revocation events logged to audit stream. | @Narendra | ✅ Done |
| M-02 | **DDR-POSIX: POSIX Compatibility Sandbox** | Linux app support | setuid emulated via orion-pamd (time-bounded grants). All POSIX processes in capability-sandboxed containers. Signed ELF policy manifests mandatory. | @Narendra | ✅ Done |
| M-03 | **DDR-FDE: Full Disk Encryption** | Physical attacker protection | TPM 2.0 + Argon2id key derivation. Cold boot mitigation (keys in TPM volatile memory). BIP39 mnemonic recovery. AES-256-XTS per-volume. | @Narendra | ✅ Done |
| M-04 | **DDR-025: Hardware Enclaves (SGX/TrustZone)** | orion-cryptod security | orion-cryptod runs in SGX (Intel) / TrustZone (ARM). Keys never leave enclave in plaintext. Software-only fallback with explicit warning. | @Narendra | ✅ Done |
| M-05 | **DDR-026: User Data Protection** | Ransomware/malicious package defence | /home snapshotted pre-install. 7-day hourly + 30-day daily retention. Immutable base profile. Signed credentials. Entropy monitoring for ransomware detection. | @Narendra | ✅ Done |
| M-06 | **DDR-HAL: Hardware Abstraction Layer** | Multi-architecture support | CosmosHal Rust trait. Cargo feature arch selection (hal-x86, hal-arm64, hal-riscv). Zero runtime dispatch cost. | @Narendra | ✅ Done |
| M-07 | **DDR-IR: Cosmos Intermediate Representation** | Compiler bootstrap (Phase 5) | SSA form, cap\&lt;R\> type, capability intrinsics. Bootstrap B1→B7: rustc+LLVM → Cosmos Compiler → delete LLVM. | @Narendra | ✅ Done |

---

### 📄 Documentation Gaps (P1)

| **#** | **Gap** | **Location** | **Fix** | **Owner** | **Status** |
|-------|---------|--------------|---------|-----------|------------|
| D-11 | **Incomplete glossary — 10+ missing terms** | Vol 0 §5 | Add: Confused Deputy, TOCTOU, IOMMU, BLAKE3, CoW, MPK, SGX, HSM, NTS, PubGrub + §5.2 table | @Docs Team | ✅ Done |
| D-12 | **DDR status mismatch between Vol 7 and Vol 2** | Vol 7 | Add complete DDR Status Reference table to Vol 7 showing all 39 DDRs as ✅ LOCKED | @Narendra | ✅ Done |
| D-13 | **No contributor onboarding guide ("First 30 Days")** | Vol 0 | Add §3.5 "First 30 Days" plan + §3.6 "Good First Issues" table | @Docs Team | ⬜ Not Started |
| D-14 | **No Executive Summary / TL;DR in Vol 1** | Vol 1 | Add 1-page Executive Summary as first section of Vol 1 | @Narendra | ⬜ Not Started |
| D-15 | **Vol 1 sections not grouped by theme** | Vol 1 | Reorder into 3 groups: (A) Vision & Philosophy, (B) Strategy & Market, (C) Architecture Overview. Move §7 Skill Tree to Vol 4, §16 Mac Dev Setup to Vol 6. | @Narendra | ⬜ Not Started |
| D-16 | **Vol 3 and Vol 3 Supplement both exist separately** | Project folder | Merge Vol 3 Supplement (§16–§21) into Vol 3 main. Archive supplement. | @Narendra | ⬜ Not Started |
| D-17 | **Vol 1 and Vol 1 Supplement both exist** | Project folder | Merge Vol 1 Supplement (Governance, Philosophy, Embedded Config) into Vol 1 main. Archive supplement. | @Narendra | ⬜ Not Started |
| D-18 | **No visual roadmap** | Project docs | Add Mermaid Gantt chart to roadmap.md (done above) and embed in Vol 0 | @Narendra | ✅ Done |
| D-19 | **No problem statement / "Why Orion" section** | Project docs | Add dedicated "The Gap Nobody Is Filling" section to about.md and Vol 1 | @Narendra | ✅ Done |

---

### 🧪 Testing & CI Gaps (P1)

| **#** | **Gap** | **Fix** | **Effort** | **Owner** | **Status** |
|-------|---------|---------|------------|-----------|------------|
| T-01 | **No fuzzing in CI pipeline** | Add `cargo-fuzz` + `syzkaller` as **blocking** CI stages (not background). Target: all 13 syscalls + all parsers. | 1 day | @Kernel Team | ⬜ Not Started |
| T-02 | **No end-to-end tests** | Add 5 critical E2E tests: comit install, POSIX binary, network capability, capability revocation, ransomware recovery snapshot. | 1 day | @Kernel Team | ⬜ Not Started |
| T-03 | **No benchmark harness** | Define measurable targets for DDR-014 (boot time, IPC latency, context switch, cap lookup). Add criterion.rs benchmarks as CI gate (>5% regression = warn). | 1 day | @Kernel Team | ⬜ Not Started |
| T-04 | **No Kani harnesses for kernel code** | Write Kani harnesses for: cap_alloc, cap_revoke, pmm_alloc, pmm_free, ipc_send, ipc_recv, sched_dispatch. Add to CI as blocking gate. | 2 days | @Kernel Team | ⬜ Not Started |
| T-05 | **No hardware matrix testing** | Set up orion-hw-lab with 100 virtual HW configs via QEMU virtual HW. Run weekly + pre-release. | 3 days | @Kernel Team | ⬜ Not Started |
| T-06 | **No dependency management for Rust crates** | Add `deny.toml` (reject GPL/CVEs) + `audit.toml` + `cargo-deny` CI gate + `cargo vet` mandatory. | 1 day | @Kernel Team | ⬜ Not Started |

---

### 🔧 Implementation Gaps (P1)

| **#** | **Gap** | **Fix** | **Effort** | **Owner** | **Status** |
|-------|---------|---------|------------|-----------|------------|
| I-01 | **No error handling strategy** | Define standard `OrionError` enum in DDR-014. Add "No Surprises Principle": every error must have a cause, human-readable explanation, and suggested action. | 2 days | @Kernel Team | ⬜ Not Started |
| I-02 | **No driver development tutorial** | Add to Vol 4: "Writing Your First Orion OS Driver" (virtio-blk worked example — 5 steps) | 3 days | @Docs Team | ✅ Done |
| I-03 | **No Kani tutorial** | Add to Vol 4: "Writing a Kani Harness for Cosmos Kernel Code" with worked example | 2 days | @Docs Team | ✅ Done |
| I-04 | **Aggressive timelines — risk of burnout** | Add 20-30% buffer to all phase estimates. Define "Minimum Viable OS" milestone. Break Phase 0 into Phase 0.1 (Bootloader + Kernel Entry) and Phase 0.2 (PMM + VMM + Capabilities). | 1 month | @Narendra | ⬜ Not Started |
| I-05 | **No POSIX binary runtime in Phase 1** | Write DDR-POSIX (done). Add posix-compat sandbox to Phase 3 task list. | 2 days | @Narendra | ✅ Done |

---

## 🟡 P2 — Major Gaps (Fix Before Phase 2 Code)

*These reduce quality, create inconsistencies, or leave known attack surfaces.*

---

### 🛡️ Missing DDRs (P2)

| **#** | **DDR** | **Blocks** | **Decision Summary** | **Owner** | **Status** |
|-------|---------|------------|----------------------|-----------|------------|
| M-08 | **DDR-027: Userspace Side-Channel Mitigations** | High-security mode | CPU pinning, optional SMT disable, constant-time enforcement for all crypto primitives. Spectre/Meltdown always on. | @Narendra | ✅ Done |
| M-09 | **DDR-028: Firmware Verification** | UEFI/BMC security | LVFS integration. BMC isolated via capability. Secure Boot key owned by user. UEFI variable write-protection. | @Narendra | ✅ Done |
| M-10 | **DDR-029: Social Engineering Defences** | User protection | Sandbox-first installs. Diff before update. TOTP for system-level changes. Plain-English permission prompts. | @Narendra | ✅ Done |

---

### 📄 Documentation Gaps (P2)

| **#** | **Gap** | **Fix** | **Effort** | **Owner** | **Status** |
|-------|---------|---------|------------|-----------|------------|
| D-20 | **Inconsistent date formats across volumes** | Standardise: `Revision X.Y • Month YYYY` | 1 week | @Docs Team | ⬜ Not Started |
| D-21 | **Missing "Last Updated" dates** | Add Document History table at the start of each volume | 1 week | @Docs Team | ⬜ Not Started |
| D-22 | **No cross-volume hyperlinks** | Add hyperlinks for all DDR cross-references (e.g., `[DDR-002](#ddr-002)`) | 2 weeks | @Docs Team | ⬜ Not Started |
| D-23 | **No style guide for documentation** | Add "Documentation Style Guide" to Vol 0 §6: headings, tables, code blocks, links | 2 weeks | @Docs Team | ⬜ Not Started |
| D-24 | **No RISC-V / ARM64 assembly guides** | Add to Vol 4: ARM64 & RISC-V assembly primer with Cosmos-specific usage (MTE, PMP, etc.) | 3 days | @Docs Team | ✅ Done |
| D-25 | **Vol 4 resources lack status tracking** | Add Status column (✅ Available / ⚠️ Check / ❌ Discontinued) to all resource tables in Vol 4 | 2 hours | @Docs Team | ⬜ Not Started |
| D-26 | **No benchmark methodology** | Add to Vol 1 §33: RAPL tool, comparison workload, reporting format | 1 day | @Narendra | ⬜ Not Started |
| D-27 | **No gaming benchmark methodology** | Add to Vol 3 §12: Vulkan triangle demo latency + frame pacing test | 1 day | @Narendra | ⬜ Not Started |
| D-28 | **DDR numbering inconsistency across volumes** | Canonical DDR numbering = Vol 2 Unified. Update all other docs to match. | 1 week | @Docs Team | ⬜ Not Started |
| D-29 | **DDR cross-references missing** | Add "Depends On" and "Depended On By" fields to every DDR in Vol 2 | 2 weeks | @Docs Team | ⬜ Not Started |
| D-30 | **Vol 8 OS comparisons use old DDR numbers** | Update DDR references in Vol 8 to match Vol 2 Unified numbering | 1 week | @Docs Team | ⬜ Not Started |

---

### 🔧 Implementation Gaps (P2)

| **#** | **Gap** | **Fix** | **Effort** | **Owner** | **Status** |
|-------|---------|---------|------------|-----------|------------|
| I-06 | **No real hardware debugging guide** | Add to Vol 6 §8: "Debugging Orion OS on Raspberry Pi 4 via UART + JTAG" (full setup, common panic patterns) | 2 days | @Docs Team | ✅ Done |
| I-07 | **GPU memory quotas missing from DDR-015** | Update DDR-015: VramQuota field on GPUCapability. EVRAMQUOTA error. IOMMU bandwidth caps at 80% of rated throughput. | 1 day | @Narendra | ✅ Done |
| I-08 | **No atomic /home update spec in DDR-COMIT** | Add to DDR-COMIT: pre-install snapshot of /home before modifications. 9th step in the 9-step atomic install. | 1 day | @Narendra | ⬜ Not Started |
| I-09 | **Self-hosting compiler complexity — risk of Phase 5 delay** | Start with minimal subset (x86-64 only). Leverage `rustc_codegen_gcc` for codegen initially. Gradual LLVM replacement (B1→B7). | 3 months | @Compiler Team | ⬜ Not Started |
| I-10 | **Hardware dependencies — risk of Phase 4 delay** | Prioritise QEMU first (easier to iterate). List QEMU fallbacks for every real HW target. Engage RISC-V Foundation + ARM dev forums early. | 3 months | @HW Team | ⬜ Not Started |
| I-11 | **WASM maturity gap — no standard ABI for OS-level apps** | Clarify WASM ↔ Orion syscall interface: "WASI + Orion extensions". Address performance: "WASM → native compilation for hot paths". | 1 month | @Architecture | ⬜ Not Started |
| I-12 | **AI Integration (Quasar) — NPU hardware dependency** | Document fallback paths: if no NPU → GPU → CPU. List supported NPUs: Intel Meteor Lake, AMD Ryzen AI, Qualcomm Hexagon. Explain how Quasar differs from ONNX Runtime and TensorRT. | 1 month | @AI Team | ⬜ Not Started |

---

### 👥 Community & Adoption (P2)

| **#** | **Gap** | **Fix** | **Effort** | **Owner** | **Status** |
|-------|---------|---------|------------|-----------|------------|
| C-01 | **No community engagement plan** | Add "Community & Adoption" section to Vol 1: hackathons, bounties, mentorship, forums (Discord/Matrix), governance model, partnerships (RISC-V Foundation, Rust Foundation) | 1 month | @Narendra | ⬜ Not Started |
| C-02 | **No licensing information** | Choose license (GPLv3 for copyleft, or MIT/Apache 2.0 for permissive). Document choice and rationale in Vol 1 + README | 1 month | @Narendra | ⬜ Not Started |
| C-03 | **No sustainability / funding plan** | Add to Vol 1: open-core model options, GitHub Sponsors, NLnet/Sovereign Tech Fund applications, hardware partnerships (Pine64, SiFive) | 2 months | @Narendra | ⬜ Not Started |
| C-04 | **No governance model defined** | Define in Vol 1: BDFL vs meritocracy vs foundation. Maintainer election process. RFC voting process. | 1 month | @Narendra | ⬜ Not Started |

---

## 🟢 P3 — Minor Gaps (Fix Eventually)

*Documentation improvements, edge cases, nice-to-haves.*

| **#** | **Gap** | **Fix** | **Effort** | **Owner** | **Status** |
|-------|---------|---------|------------|-----------|------------|
| P3-01 | **No TL;DR summaries in DDRs** | Add 1-paragraph summary at the start of every DDR | 2 hours | @Docs Team | ⬜ Not Started |
| P3-02 | **No "Why This Matters" in DDRs** | Add "Why This Matters" sub-section to every DDR | 1 day | @Docs Team | ⬜ Not Started |
| P3-03 | **No "Last Updated" owner in doc headers** | Add to every document header | 2 hours | @Docs Team | ⬜ Not Started |
| P3-04 | **No mini-glossary at start of each volume** | Add 5–10 key terms at the start of every volume | 2 hours | @Docs Team | ⬜ Not Started |
| P3-05 | **No screenshots / mockups** | Add QEMU screenshots and Aurora UI mockups to README and Vol 6 | 1 day | @Design Team | ⬜ Not Started |
| P3-06 | **No Hacker News post plan** | Tag milestones with "post to HN" tags in roadmap. Draft announcement template. | 30 min | @Narendra | ⬜ Not Started |
| P3-07 | **No devlog / blog** | Start GitHub Pages blog. One post per milestone. Template: What we built, why, what's next. | 1 hour | @Narendra | ⬜ Not Started |
| P3-08 | **No grant strategy** | Add NLnet / Sovereign Tech Fund / GNOME Foundation applications to Vol 1 | 2 hours | @Narendra | ⬜ Not Started |
| P3-09 | **No newsletter** | Add GitHub Releases subscription + Buttondown link to README | 1 hour | @Narendra | ⬜ Not Started |
| P3-10 | **No footnotes / citations for statistics** | Add sources for "X% of CVEs are..." and "53M tonnes e-waste" claims | 1 day | @Docs Team | ⬜ Not Started |
| P3-11 | **No Linux → Orion OS migration guide** | Add to Vol 0: backup strategy, data migration path, POSIX compatibility notes | 2 days | @Docs Team | ⬜ Not Started |
| P3-12 | **Inconsistent code block languages** | Use ` ```rust ` for Rust, ` ```bash ` for shell, ` ``` ` for generic. Audit all volumes. | 1 week | @Docs Team | ⬜ Not Started |
| P3-13 | **Some tables lack column separators** | Ensure all tables use `|---|` separators for consistency | 1 week | @Docs Team | ⬜ Not Started |
| P3-14 | **No index of figures/tables in volumes** | Add "Index of Figures" and "Index of Tables" at the end of each volume | 2 weeks | @Docs Team | ⬜ Not Started |

---

## ✅ Resolved Issues

*Issues that have been fully resolved. Moved here from the active tables above.*

| **#** | **Issue** | **Resolution** | **Owner** | **Date Resolved** |
|-------|-----------|----------------|-----------|-------------------|
| S-01 | Confused Deputy Problem | DDR-021 written and locked. Vol 2 Part 3 updated. | @Narendra | May 2026 |
| S-02 | TOCTOU Race Conditions | DDR-002 Amendment A1 added: CAP_LOCK, reference counting, CLOCK_MONOTONIC. | @Narendra | May 2026 |
| S-03 | No Global Capability Limits | DDR-020 updated: 1M system-wide, 65K per-user, 16K per-session, rate limits. | @Narendra | May 2026 |
| S-04 | Unsafe Rust Not Hardened | DDR-022 written and locked: ARM MTE, Intel CET, MPK domain for cap table. | @Narendra | May 2026 |
| S-05 | Supply Chain Attack Surface | DDR-023 written and locked: HSM signing, 2-of-3 multi-sig, cargo vet. | @Narendra | May 2026 |
| D-01 | Vol 7 header "Volume 6" | Vol 7 repacked: header now reads "Volume 7: Problems, Current State & Orion OS Solutions". | @Narendra | May 2026 |
| D-02 | Vol 6 §12 "Nova-Specific Tools" | Vol 6 repacked: §12 renamed to "Orion OS-Specific Tools". All nova-* renamed. | @Narendra | May 2026 |
| D-03 | Kernel size contradiction | DDR-001 amended: phase-gated targets. 200KB = Phase 3 stretch goal only. | @Narendra | May 2026 |
| D-04 | Nova naming throughout docs | All five corrected volumes repacked. Nova → Orion OS throughout. | @Narendra | May 2026 |
| D-05 | Ask Manager in tools spec | orion_project_tools_spec.docx: all Ask Manager content removed (–36 paragraphs). | @Narendra | May 2026 |
| D-06 | Vol 5 title includes "Solutions" | Vol 5 title: "Philosophy & Problem Root Causes". Preface updated. | @Narendra | May 2026 |
| D-08 | Vol 8 Nova IDL naming | Vol 8: `.nova IDL` → `Cosmos IDL` throughout. | @Narendra | May 2026 |
| D-10 | Philosophy Matrix appears twice | about.md is now the single source of truth. roadmap.md links to it. | @Narendra | May 2026 |
| D-18 | No visual roadmap | Mermaid Gantt chart added to roadmap.md with full 7-phase timeline. | @Narendra | May 2026 |
| D-19 | No problem statement | "The Gap Nobody Is Filling" added to about.md §1. | @Narendra | May 2026 |
| D-24 | No RISC-V/ARM64 assembly guides | Vol 4 updated: ARM64 + RISC-V assembly primer section added. | @Docs Team | May 2026 |
| G-01 | No README.md | README.md created with pitch, quick start, architecture diagram, contributing links. | @Narendra | May 2026 |
| G-02 | No CONTRIBUTING.md | CONTRIBUTING.md created with dev environment, workflow, CI gates, 30-day plan. | @Narendra | May 2026 |
| G-03 | No CODE_OF_CONDUCT.md | Contributor Covenant v2.1 created. | @Narendra | May 2026 |
| G-04 | No SECURITY.md | SECURITY.md created with disclosure process, timelines, DDR reference table. | @Narendra | May 2026 |
| G-05 | No MAINTAINERS.md | MAINTAINERS.md created with area ownership and DDR assignments. | @Narendra | May 2026 |
| G-06 | No RFC template | `.github/DISCUSSION_TEMPLATE/rfc.md` created with full 7-section structure. | @Narendra | May 2026 |
| G-08 | No issue/PR templates | Bug report, feature request, PR template — all created. | @Narendra | May 2026 |
| G-09 | No CODEOWNERS | `.github/CODEOWNERS` created with per-path ownership. | @Narendra | May 2026 |
| I-02 | No driver development tutorial | Vol 4 updated: virtio-blk 5-step tutorial added. | @Docs Team | May 2026 |
| I-03 | No Kani tutorial | Vol 4 updated: Kani harness tutorial with worked example added. | @Docs Team | May 2026 |
| I-06 | No hardware debugging guide | Vol 6 §8 added: Raspberry Pi 4 UART + JTAG debugging guide. | @Docs Team | May 2026 |
| I-07 | GPU memory quotas missing | DDR-015 Block row updated with VRAM quota amendment. | @Narendra | May 2026 |
| M-01 | DDR-024 missing | DDR-024 written and locked: cap_revoke syscall. | @Narendra | May 2026 |
| M-02 | DDR-POSIX missing | DDR-POSIX written and locked: POSIX sandbox architecture. | @Narendra | May 2026 |
| M-03 | DDR-FDE missing | DDR-FDE written and locked: Full Disk Encryption spec. | @Narendra | May 2026 |
| M-04 | DDR-025 missing | DDR-025 written and locked: SGX/TrustZone enclaves. | @Narendra | May 2026 |
| M-05 | DDR-026 missing | DDR-026 written and locked: User Data Protection. | @Narendra | May 2026 |
| M-06 | DDR-HAL missing | DDR-HAL written and locked: CosmosHal Rust trait. | @Narendra | May 2026 |
| M-07 | DDR-IR missing | DDR-IR written and locked: Cosmos IR + bootstrap sequence. | @Narendra | May 2026 |
| M-08 | DDR-027 missing | DDR-027 written and locked: Side-channel mitigations. | @Narendra | May 2026 |
| M-09 | DDR-028 missing | DDR-028 written and locked: Firmware verification. | @Narendra | May 2026 |
| M-10 | DDR-029 missing | DDR-029 written and locked: Social engineering defences. | @Narendra | May 2026 |
| D-11 | Incomplete glossary | Vol 0 §5.2 added with 10 new terms: Confused Deputy, TOCTOU, MPK, SGX, HSM, IOMMU, BLAKE3, CoW, NTS, PubGrub. | @Docs Team | May 2026 |
| D-12 | DDR status mismatch Vol 7 / Vol 2 | Vol 7 updated: complete 39-row DDR Status Reference table added showing all DDRs as ✅ LOCKED. | @Narendra | May 2026 |

---

## 📊 Summary Dashboard

### Priority Breakdown

| **Priority** | **Total** | **Done** | **In Progress** | **Not Started** |
|--------------|-----------|----------|-----------------|-----------------|
| 🔴 **P0 Critical** | 21 | 17 | 0 | 4 |
| 🟠 **P1 Blocker** | 24 | 12 | 0 | 12 |
| 🟡 **P2 Major Gap** | 27 | 7 | 0 | 20 |
| 🟢 **P3 Minor** | 14 | 0 | 0 | 14 |
| **Total** | **86** | **36** | **0** | **50** |

### Category Breakdown

| **Category** | **Total Issues** | **Done** | **Remaining** |
|--------------|-----------------|----------|---------------|
| Security Architecture | 10 | 10 | 0 |
| Missing DDRs | 10 | 10 | 0 |
| Documentation Errors | 15 | 8 | 7 |
| GitHub Infrastructure | 11 | 9 | 2 |
| Testing & CI | 6 | 0 | 6 |
| Implementation Gaps | 12 | 5 | 7 |
| Community & Adoption | 4 | 0 | 4 |
| Minor / P3 | 14 | 0 | 14 |

---

## 🎯 Recommended Workflow

### This Week (P0 Remaining)
1. ✅ All security DDRs are done — no P0 security blockers remain
2. ⬜ **G-07**: Set up CLA Assistant bot — 1 hour
3. ⬜ **G-10**: Create GitHub Projects board — 1 hour
4. ⬜ **G-11**: Add good-first-issue labels — 1 hour
5. ⬜ **D-07**: Archive stale master index files (v3–v8) — 30 min

### Next Sprint (P1 Remaining)
1. ⬜ **T-01** through **T-06**: Set up CI pipeline with fuzzing, E2E tests, Kani, benchmarks
2. ⬜ **D-13**: Write "First 30 Days" contributor onboarding guide
3. ⬜ **D-14/D-15**: Restructure Vol 1 with Executive Summary
4. ⬜ **D-16/D-17**: Merge Vol 3 Supplement + Vol 1 Supplement into main volumes
5. ⬜ **I-01**: Define `OrionError` standard enum — error handling strategy

### Before Phase 2 (P2 Remaining)
- All P2 documentation gaps
- Community engagement plan
- Licensing decision
- Sustainability/funding plan

---

## 💬 Open Questions

1. **Licensing**: GPLv3 (copyleft) vs MIT/Apache 2.0 (permissive)? Which aligns best with Orion's open-source goals?
2. **Minimum Viable OS**: Should we define an MVO milestone between Phase 0 and Phase 1 for early community engagement?
3. **WASM vs Native**: Should Phase 3 apps be WASM-first or native-first? What's the performance trade-off threshold?
4. **Community Platform**: Discord vs Matrix vs Slack for real-time community communication?
5. **Hardware Partnerships**: Which hardware vendors to approach first — Raspberry Pi Foundation, SiFive, Pine64?
6. **Governance**: BDFL (Narendra as sole architect) vs meritocracy vs foundation model?

---

*📌 Note: This document is a living resource. Update it as issues are resolved or new ones are discovered.*
*🔗 Related: [about.md](about.md) · [roadmap.md](roadmap.md) · [CONTRIBUTING.md](CONTRIBUTING.md) · [SECURITY.md](SECURITY.md)*