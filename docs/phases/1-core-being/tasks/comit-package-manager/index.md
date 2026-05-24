## Task: Comit Package Manager v1

**Component:** `comit` | **DDR:** DDR-COMIT

**What it does:** Capability-scoped package installation. Signed packages only. 9-step atomic install with rollback.

### Implementation

- PubGrub dependency resolution — no conflicting packages
- Dilithium3 signatures on all packages — unsigned = rejected
- 9-step atomic install: download → verify → unpack → link → activate → clean
- Rollback: any step failure → complete rollback to previous state
- Nebula Hub: package registry with typosquatting protection

### Testing

- 100 package install/remove cycle: no corruption, no leaks
- Conflict resolution: 1000 packages with complex deps — PubGrub resolves correctly
- Atomic rollback: kill process mid-install → verify clean state

---
