### Testing

- QEMU boot test: `just qemu` must print `[horizon-boot] Booting kernel...`
- Tamper test: corrupt kernel signature → bootloader must halt with clear error
- TPM PCR validation: verify PCR values match expected after clean boot
- Legacy BIOS: boot in `qemu-system-x86_64 -bios` mode
