
## Task: Capability System

**Component:** `cosmos_caps` | **DDR:** DDR-002, DDR-020, DDR-021, DDR-024

**What it does:** Every resource access requires a typed capability token. Kernel mints, transfers, and revokes capabilities. Processes cannot forge or inspect raw tokens.

### Implementation

- Per-process capability table: 256 slots default, 1M system-wide limit
- Integer handles — opaque to userspace, validated by kernel on every syscall
- Atomic check-and-use: validation happens within the syscall frame — no TOCTOU
- `CAP_LOCK` flag: lock a capability for duration of an operation
- Reference counting: `cap_revoke()` marks REVOKED, defers free until refcount = 0
- Intent-based: `FileCapability:/path:READ_FOR_AUTH` (DDR-021)
- Delegation chain depth: maximum 8 hops

### Security Rules

- No ambient authority — every access needs an explicit cap
- Atomic validation — no capability can be revoked between check and use
- `CLOCK_MONOTONIC` for all lease expiry — no wall-clock manipulation
- Cap table in MPK domain — write-only via `cap_lookup()` / `cap_alloc()`

### Testing

```bash
cargo kani --harness cap_toctou_harness
cargo fuzz run cap_fuzz_target -- -max_total_time=300
```

- TOCTOU test: race condition between revocation and use
- Fuzzing: 300s cap system fuzzing
- Delegation chain test: verify 9-hop chain is rejected
- Rate limit test: 10,001 syscalls/sec must be rate-limited

### Troubleshooting

| Problem | Likely Cause | Fix |
|---------|-------------|-----|
| Capability deadlock | Circular dependency in cap graph | Static analysis for cycles; never allow circular delegation |
| TOCTOU still possible | Re-validation not atomic | Use kernel spinlock for entire check-and-use window |
| System-wide cap exhaustion | No per-user limits enforced | Enforce per-user limit of 65,536; reject at 80% system capacity |

---