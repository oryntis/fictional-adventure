## Quick Start (QEMU)

**Requirements:** Rust 1.78+ nightly, QEMU 8.x, `just`

```bash
git clone https://github.com/orionos/orionos
cd orionos
cargo install just
just setup        # install toolchain, deps
just qemu         # boot Orion OS in QEMU x86-64
```

Expected output:

```
[cosmos] Initialising on x86-64. 8GiB RAM detected.
[cosmos] Capability table initialised. 1,048,576 slots available.
[orion-init] Starting core services...
[orion-init] All services ready. ORION OK.
```
