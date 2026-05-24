## Task: Void Audio Server

**Component:** `void-audio` | **DDR:** DDR-AUDIO

- 4 buffer modes: real-time, low-latency, standard, power-saving
- PipeWire-compatible API for ecosystem compatibility
- `AudioCapability:PLAYBACK` to play, `AudioCapability:CAPTURE` to record
- No app can capture another app's audio without explicit `AudioCapability`

---
