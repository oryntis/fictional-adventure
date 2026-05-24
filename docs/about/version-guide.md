## Version System & Stability Guide

| Version | Phase                           | Stability         | Use For                 |
| ------- | ------------------------------- | ----------------- | ----------------------- |
| `0.0.x` | Phase 0: Cosmic Dawn            | Pre-Alpha         | Development only — QEMU |
| `0.1.x` | Phase 1: Core Being             | Alpha             | Developers + testers    |
| `0.2.x` | Phase 2: System Symphony        | Beta              | Early adopters          |
| `0.3.x` | Phase 3: User Enlightenment     | Beta → RC         | Power users             |
| `0.4.x` | Phase 4: Hardware Transcendence | Release Candidate | Multi-arch testing      |
| `0.5.x` | Phase 5: Self-Realization       | Release Candidate | Bootstrap validation    |
| `1.0.0` | Phase 6: Universal Harmony      | **Stable**        | Everyone                |

### ABI Stability Policy

- **Before v0.5 (Alpha):** No ABI stability. Breaking changes expected between minor versions.
- **v0.5 (Alpha):** Kernel syscall ABI frozen. Userspace APIs may still change.
- **v1.0.0 (Stable):** Full ABI stability. No breaking changes without major version bump.

The 13 kernel syscalls (DDR-014) are the only kernel ABI. All other interfaces are userspace services and can evolve without kernel changes.
