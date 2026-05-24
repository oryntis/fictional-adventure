## Task: Network Stack (ether-d + orion-pf)

**Component:** `ether-d` + `orion-pf` | **DDR:** DDR-011, DDR-PF

**ether-d:** Zero-copy TCP/IP stack running in userspace. Default-deny inbound. No raw socket access.

**orion-pf:** Capability-based firewall. DNS-over-TLS mandatory. No inbound connections by default.

### Implementation

- Userspace TCP/IP with io_uring-style event queue
- Zero-copy: NIC DMA directly into userspace buffer
- DNS-over-TLS: all DNS queries encrypted by default
- Network capability: `NetworkCapability:OUTBOUND:443` to connect to HTTPS

### Testing

- Packet fuzzing: `cargo fuzz run ether_fuzz`
- DNS leak test: verify all DNS over TLS
- Throughput: iperf3 benchmark vs Linux
- Firewall rule test: verify default-deny works

---
