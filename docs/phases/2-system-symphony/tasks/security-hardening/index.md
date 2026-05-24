## Task: Security Hardening

**Components:** `orion-cryptod`, Vega FS FDE layer | **DDRs:** DDR-025, DDR-FDE, DDR-022

### orion-cryptod (DDR-025)

Hardware enclave-backed cryptography daemon. All key material lives in SGX (x86-64) or TrustZone (ARM64) — never in kernel memory.

- TPM-sealed keys: key material encrypted with TPM PCR values
- Argon2id for password-based key derivation (DDR-FDE)
- CRYSTALS-Dilithium3 for all signing operations
- CRYSTALS-Kyber for all key encapsulation (post-quantum)
- All symmetric crypto: ChaCha20-Poly1305 (AEAD)

### Full Disk Encryption (DDR-FDE)

- Algorithm: ChaCha20-Poly1305 (AES-256-XTS on x86-64 with AES-NI)
- Key = `TPM_PCR_values ⊕ Argon2id(user_password)`
- BIP39 recovery mnemonic: 24-word mnemonic generated at FDE setup
- RAM scrambling: physical RAM scrambled on power-off (prevent cold boot attacks)
- No key ever written to disk in plaintext — ever

### Testing

- Power loss test: kill power mid-write → reboot → data intact, no corruption
- Cold boot attack simulation: dump RAM after power loss → verify scrambling
- Key recovery test: use BIP39 mnemonic to recover from wiped TPM
- Crypto fuzzing: `cargo fuzz run crypto_fuzz -- -max_total_time=600`

### Troubleshooting

| Problem             | Likely Cause                         | Fix                                                                   |
| ------------------- | ------------------------------------ | --------------------------------------------------------------------- |
| FDE boot fails      | TPM PCR values changed (BIOS update) | User enters BIP39 recovery mnemonic to reseal                         |
| Encryption key loss | BIP39 mnemonic not backed up         | Require BIP39 backup confirmation before enabling FDE                 |
| SGX enclave fails   | SGX not supported on hardware        | Fall back to TrustZone (ARM64) or software-only with reduced security |

---
