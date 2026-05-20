### Troubleshooting

| Problem                      | Likely Cause                          | Fix                                                    |
| ---------------------------- | ------------------------------------- | ------------------------------------------------------ |
| Bootloader hangs in QEMU     | Incorrect `exit_boot_services()` call | Ensure memory map is retrieved before calling exit     |
| Signature verification fails | Wrong public key or wrong algorithm   | Use Dilithium3 with correct key material from DDR-011  |
| Early console prints garbage | VGA buffer not initialised            | Initialise VGA buffer at `0xB8000` before any write    |
| TPM PCR value wrong          | Measurement order incorrect           | Follow TPM measurement chain: stage1 → stage2 → kernel |

---
