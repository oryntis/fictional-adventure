## Task: Cosmic Desktop

**Component:** `cosmic`, `cosmic-wm`, `cosmic-shell` | **DDR:** DDR-COMPOSITOR

**What it does:** Full graphical desktop environment. Modular, AI-powered layout, themeable. No data collection.

### Implementation

- Window manager: tiling + floating hybrid, GPU-accelerated animations
- Desktop shell: taskbar, launcher, notification system, system tray
- AI-assisted window placement: Quasar Runtime suggests optimal tiling layout based on usage patterns (hints only — user can override)
- Themeable: TOML-based theme system, light/dark mode automatic
- All UI state: <100ms response time (hardware cursor = 0ms)

### Security Rules

- No data collection — all AI features use local models only
- Capability-gated window access: no app can read another app's window buffer
- No `ScreenshotCapability` for background apps — user must explicitly grant

### Performance Targets

- UI response: <100ms for any user interaction
- Animation: 60Hz smooth, no dropped frames
- Cold start: desktop ready in <3s from `ORION OK`

### Testing

- Eye-tracking usability: test with 10 users, measure task completion time
- 10K window operations: open/close/resize/move — no crashes, no leaks
- Responsiveness: simulate CPU load, verify UI remains <100ms
- Memory: 1-hour idle desktop session — no memory growth >10MB

### Troubleshooting

| Problem | Likely Cause | Fix |
|---------|-------------|-----|
| Desktop freezes under load | compositor running at Normal scheduler class | Move aurora and cosmic to Interactive class |
| Window decorations missing | Compositor not receiving window metadata | Verify Wayland xdg_toplevel protocol implementation |
| AI layout suggestions incorrect | Model not trained on user patterns | Ensure orion-mld telemetry opt-in for layout learning |
