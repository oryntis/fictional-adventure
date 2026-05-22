## Task: Aurora Compositor

**Component:** `aurora` | **DDR:** DDR-COMPOSITOR, DDR-012

**What it does:** Wayland-compatible compositor. GPU-accelerated rendering. Variable Refresh Rate (VRR), HDR, direct scanout.

### Implementation

- Wayland protocol compositor — native Wayland, no X11 compatibility layer in kernel
- Direct scanout: bypass compositor for fullscreen apps (gaming, video)
- Atomic framebuffer commits — no tearing
- VRR (FreeSync/G-Sync) support: dynamic refresh rates 40–360Hz
- All window access requires `DisplayCapability` — no app can capture another's window

### Security Rules

- No tearing: atomic commits only — no partial frame writes
- Capability-gated: `DisplayCapability:RENDER` to draw, `DisplayCapability:DISPLAY` to scanout
- No kernel copies: GPU renders directly to scanout buffer
- Screenshot requires explicit `ScreenshotCapability` — apps cannot capture other windows

### Performance Targets

- Frame budget: &lt;8ms at 60Hz (leaves 8.7ms headroom), &lt;2.8ms at 360Hz
- Input latency: &lt;16ms touch-to-pixel
- Direct scanout: 0 compositor overhead for fullscreen apps

### Testing

- Frame timing test: 60Hz for 1 hour — zero dropped frames, zero tears
- VRR test: test with FreeSync monitor, verify dynamic refresh
- Fuzzing: random Wayland protocol messages — no crashes
- Security: verify app A cannot capture app B's window

### Troubleshooting

| Problem | Likely Cause | Fix |
|---------|-------------|-----|
| Compositor tearing | Non-atomic framebuffer swap | Use `DRM_MODE_ATOMIC_COMMIT` only — never legacy flip |
| VRR not activating | KMS not detecting VRR-capable display | Verify `vrr_capable` property in DRM connector |
| GPU driver crash kills compositor | Driver in wrong isolation domain | All GPU drivers in userspace — compositor restarts on crash |
| High input latency | Compositor running at wrong scheduler class | Aurora must run in `Interactive` scheduling class |

---