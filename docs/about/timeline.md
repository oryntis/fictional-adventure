## Visual Timeline

```
2026          2027          2028          2029          2030          2031          2032
 │             │             │             │             │             │             │
 ├─[Phase B]───┤             │             │             │             │             │
 │  Pre-kernel │             │             │             │             │             │
 │  (Track A)  │             │             │             │             │             │
 │             ├─[Phase 0]───┤             │             │             │             │
 │             │  Cosmic     │             │             │             │             │
 │             │  Dawn       │             │             │             │             │
 │             │             ├─[Phase 1]───┤             │             │             │
 │             │             │  Core Being │             │             │             │
 │             │             │             ├─[Phase 2]───┤             │             │
 │             │             │             │  System     │             │             │
 │             │             │             │  Symphony   │             │             │
 │             │             │             │             ├─[Phase 3]───┤             │
 │             │             │             │             │  User       │             │
 │             │             │             │             │  Enlighten. │             │
 │             │             │             │             ├─[Phase 4]───┤             │
 │             │             │             │             │  Hardware   │             │
 │             │             │             │             │  Transcend. │             │
 │             │             │             │             │             ├─[Phase 5]───┤
 │             │             │             │             │             │  Self-      │
 │             │             │             │             │             │  Realization│
 │             │             │             │             │             │             ├─[1.0.0]
```

### Mermaid Gantt (renders in Docusaurus)

```mermaid
gantt
  title Orion OS — Full Development Timeline
  dateFormat YYYY-MM
  axisFormat %b %Y

  section Track A · Prototype
  Phase B — Pre-kernel prototype      :active, pb, 2026-01, 2026-07

  section Phase 0 · Cosmic Dawn (v0.0.x)
  Bootloader + Kernel Entry           :p0a, 2026-07, 2026-10
  PMM + VMM + Capability System       :p0b, 2026-10, 2027-01
  IPC + Scheduler + Cosmos Assembler  :p0c, 2027-01, 2027-04

  section Phase 1 · Core Being (v0.1.x)
  Process Model + Userspace Drivers   :p1a, 2027-04, 2027-07
  Vega FS + Network Stack             :p1b, 2027-07, 2027-10
  Shell + Package Manager             :p1c, 2027-10, 2028-01

  section Phase 2 · System Symphony (v0.2.x)
  Aurora Compositor + GPU Drivers     :p2a, 2028-01, 2028-04
  Security Hardening + FDE            :p2b, 2028-04, 2028-07
  Quasar AI Runtime + Audio           :p2c, 2028-07, 2028-10

  section Phase 3 · User Enlightenment (v0.3.x)
  Cosmic Desktop + WASM Runtime       :p3a, 2028-10, 2029-01
  App Ecosystem + Accessibility       :p3b, 2029-01, 2029-07

  section Phase 4 · Hardware Transcendence (v0.4.x)
  ARM64 + RISC-V Ports                :p4a, 2029-07, 2030-01
  PowerPC + LoongArch + Unified HAL   :p4b, 2030-01, 2030-04

  section Phase 5 · Self-Realization (v0.5.x)
  Cosmos Compiler x86-64              :p5a, 2030-04, 2030-10
  Cosmos Compiler ARM64 + RISC-V      :p5b, 2030-10, 2031-01
  LLVM deleted — fully self-hosting   :milestone, m5, 2031-01, 0d

  section Phase 6 · Universal Harmony (v0.6.x → 1.0.0)
  Security Audit + Performance Polish :p6a, 2031-01, 2031-07
  Localisation + Release Prep         :p6b, 2031-07, 2032-01
  Orion OS 1.0.0 Stable               :milestone, m6, 2032-01, 0d
```
