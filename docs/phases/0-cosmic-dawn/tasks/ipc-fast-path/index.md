
## Task: IPC Fast Path

**Component:** `cosmos_ipc` | **DDR:** DDR-006 (DDR-004 in master index)

**What it does:** Synchronous message passing with &lt;500ns latency for small messages. Zero-copy page remapping for large payloads.

### Implementation

- Small messages (&lt;256 bytes): copy through kernel, synchronous scheduling
- Large messages: `MemoryCapability` transfer — remap pages between address spaces
- All IPC requires a capability token — no unauthenticated messages
- Caller-ID verified in every message — services know who is calling

### Security Rules

- Capability-gated: no IPC without an `IPCCapability`
- Caller-ID injected by kernel — cannot be spoofed by userspace
- Zero-copy: kernel never copies large payloads, only remaps pages

### Testing

- IPC latency benchmark: small message round-trip must be &lt;500ns on QEMU
- Large payload test: 1GB transfer via page remap, verify no copy overhead
- Fuzzing: `cargo fuzz run ipc_fuzz_target -- -max_total_time=300`
- Capability gate test: IPC attempt without cap → `ECAPINVALID`

---