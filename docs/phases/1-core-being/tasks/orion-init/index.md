## Task: orion-init

**Component:** `orion-init` | **DDR:** DDR-INIT

**What it does:** PID 1 service manager. DAG-ordered parallel startup. Capability-gated service configuration.

### Implementation

- Services described in TOML manifests with explicit capability sets
- Kahn's algorithm for dependency ordering
- Parallel startup: independent services start simultaneously
- Crash recovery: restart policy per service (restart-always, restart-on-failure, no-restart)
- Target: boot to userspace in &lt;2 seconds on QEMU

### Testing

- Dependency cycle test: circular dependency → `orion-init` refuses to start
- Boot time: measure from `kernel_main()` to `[orion-init] All services ready` — must be &lt;2s
- Service crash: kill any service, verify auto-restart in &lt;100ms

---
