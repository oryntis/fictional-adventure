## Task: POSIX Sandbox

**Component:** `posix-compat` | **DDR:** DDR-POSIX

**What it does:** Runs Linux ELF binaries in a POSIX compatibility sandbox. Translation layer on top of Cosmos kernel — not embedded in kernel.

### Philosophy

POSIX compatibility is a service provided on top of the kernel, not embedded in it. The Cosmos kernel ABI is 13 syscalls + vDSO. POSIX is translated from legacy calls to Cosmos capabilities.

### Implementation

- `fork()` → `spawn()` with capability set derived from parent
- `open(path)` → `FileCapability:path:intent`
- `setuid` / `setgid` → rejected (no privilege escalation by design)
- Signed ELF policy: unsigned ELF binaries rejected unless user explicitly allows
- Sandbox: Linux app runs in capability-restricted environment

### Scope and Limitations

- Target: run common Linux CLI tools and GUI apps (Firefox, GIMP)
- Not a goal: 100% Linux binary compatibility
- Out of scope: kernel modules, raw socket programs, setuid binaries

### Testing

- 100 Linux app compatibility: test 100 common Linux apps
- Rejection test: unsigned ELF → rejected with clear error
- Sandbox escape: attempt to access resources beyond declared caps — must fail
