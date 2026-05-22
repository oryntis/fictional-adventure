
## Task: Vega FS

**Component:** `vega-fs` + `vega-vfsd` | **DDR:** DDR-009, DDR-VFS

**What it does:** Capability-safe filesystem. B+ tree with 4KB nodes. BLAKE3 checksum per block. CoW write path.

### Implementation

- B+ tree metadata: 4KB nodes, O(log n) lookup
- BLAKE3 checksum on every data block — silent corruption impossible
- CoW write: new extents allocated, old extents never overwritten
- O(1) snapshots: snapshot = reference to current tree root
- Per-process namespace via VFS layer (DDR-VFS)
- `vega-vfsd`: userspace daemon exposing VFS over IPC

### Security Rules

- Every block read validates BLAKE3 checksum before returning data
- `FileCapability:/path:INTENT` — intent-based access control (DDR-021)
- Per-process namespaces: processes see only their capability-granted subtree

### Testing

- Crash recovery test: power-loss simulation → fsck → all data intact
- Filesystem fuzzing: `cargo fuzz run vega_fuzz -- -max_total_time=300`
- Checksum test: corrupt one block → read returns `EINTEGRITY`
- Snapshot test: snapshot → write → verify snapshot unchanged

### Troubleshooting

| Problem | Likely Cause | Fix |
|---------|-------------|-----|
| Filesystem corruption on crash | CoW path not flushed before metadata update | Use `fsync` barriers; verify with crash simulation |
| BLAKE3 mismatch | Bit rot in storage | Automatic repair from redundant copy if available |
| Namespace escape | VFS path resolution bug | Fuzz path resolution with `../` sequences |

---