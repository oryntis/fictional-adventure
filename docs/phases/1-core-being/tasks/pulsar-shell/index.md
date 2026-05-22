
## Task: Pulsar Shell

**Component:** `pulsar-sh` | **DDR:** DDR-004

Unix pipeline philosophy: every command composable via pipes. No shell injection. Capability-gated.

### Implementation

- No fork() — uses spawn() for every subprocess
- Pipe composability: `cmd1 | cmd2 | cmd3` via IPC capabilities
- Safe string handling: no buffer overflows, Rust throughout
- Job control: background jobs, signals, process groups

### Testing

- 10K command stress test: no hangs, no crashes
- Injection test: attempt shell injection via `$()` and `;` — must be prevented
- Pipeline test: 100-stage pipe chain

---