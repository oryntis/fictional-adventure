## Task: Scheduler Core

**Component:** `cosmos_sched` | **DDR:** DDR-005

**What it does:** Five scheduling classes. Heterogeneous dispatch: CPU + GPU + NPU + TPU. Tickless kernel. Topology-aware on P/E-core CPUs.

### Implementation

| Class       | For                  | Behaviour                             |
| ----------- | -------------------- | ------------------------------------- |
| RealTime    | Audio, HID drivers   | FIFO, hard latency guarantees         |
| Interactive | Shell, browser       | Lowest latency, boosts on I/O         |
| Normal      | General processes    | CFS-inspired, fair sharing            |
| Batch       | Compilation, backups | Lower priority, no latency guarantees |
| Idle        | Screen saver         | Only runs when nothing else can       |

- Tickless: `NO_HZ_FULL` — CPU sleeps until next event
- P/E-core aware: interactive tasks → P-cores; batch → E-cores
- GPU timeslice: 16ms (one display frame); gaming: 33ms

### Testing

- 10K thread stress test: all threads make progress, no starvation
- Context switch latency: measure &lt;1µs on x86-64
- Heterogeneous dispatch: GPU task dispatched in &lt;16ms

---
