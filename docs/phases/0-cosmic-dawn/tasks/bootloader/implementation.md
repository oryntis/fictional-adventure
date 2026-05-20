### Implementation

- Write UEFI bootloader in Rust using `uefi` crate — no dynamic alloc in early boot
- BIOS legacy path: 512-byte MBR stage 1 + larger stage 2 in pure Assembly
- Call `exit_boot_services()` before jumping to kernel
- Measure kernel image into TPM PCR using `TPM2_PCR_Extend`
- Verify Dilithium3 signature on kernel image before executing

---

### Security Rules

- All comparisons in constant time — no timing side channels on signature verification
- TPM PCR measurement before any kernel execution
- Static buffers only — no heap in bootloader
