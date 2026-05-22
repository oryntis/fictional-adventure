
## Task: Process Model

**Component:** `cosmos_process` | **DDR:** DDR-004

No `fork()`. Only `spawn()`. Child process receives an explicit capability set from the parent.

**Why no fork:** fork() copies the entire address space then exec() replaces it. Threads + fork = disaster (pthread_atfork is a nightmare). Orion OS eliminates this permanently.

### Implementation

- `spawn(executable: CapHandle, caps: CapSet) -&gt; ProcessHandle`
- No address space copying — child starts fresh from executable
- Explicit capability inheritance — parent decides what child gets
- `PCB`: memory map, capability set, file handles, signal mask, thread list, scheduling info
- `TCB`: register state, stack pointer, TLS pointer, scheduling priority, CPU affinity

### Security Rules

- No ambient authority on spawn — every cap must be explicitly passed
- Capability validation before process creation
- No setuid — no program can claim rights not in its declared cap set

### Testing

- Spawn 10K processes: verify no leaks, no zombie processes
- Capability leak detection: child cannot access parent's unclaimed caps
- Stress test: rapid spawn + kill cycles

### Troubleshooting

| Problem | Likely Cause | Fix |
|---------|-------------|-----|
| Spawn hangs | Deadlock in capability system during spawn | Timeout-based cap checks; stress test spawn |
| Child inherits wrong caps | Incorrect cap set passed to spawn | Explicitly enumerate every cap in the spawn call |
| Zombie processes | Wait not called on exit | Implement wait4() equivalent; orion-init reaps orphans |

---
