## Task: Quasar AI Runtime

**Component:** `quasar-runtime` | **DDR:** DDR-017

**What it does:** OS-level inference engine. One copy of model weights shared across all apps. NPU scheduling. Hardware-adaptive quantisation.

### Philosophy

&gt; The OS should be the AI runtime manager the same way it is the memory manager. Apps should not manage their own model weights and inference engines.

### Implementation

- Single shared inference engine (ONNX-compatible) as a kernel-adjacent service
- Apps call via IPC: `"run this model on this input"` → result via IPC
- NPU scheduling: Quasar holds `NPUCapability:INFER` — only service that can directly schedule NPU
- Hardware-adaptive quantisation: bf16 on capable hardware, int8 mid-range, int4 on weak hardware
- Model caching: weights loaded once, memory-mapped, shared across all requesting apps
- 4-priority inference queue: RealTime &gt; Interactive &gt; Normal &gt; Background

### Kernel ML Integration (DDR-018)

Tier 1 (kernel-embedded ML for kernel decisions only):

- `tract-onnx` in `no_std` mode — statically embedded in kernel
- Used for: scheduler workload classification, I/O pattern prediction, thermal management
- Hard limits: &lt;100µs inference time, ≤512KB total budget
- Mandatory non-ML fallback for every decision — ML is a hint, never a command

### orion-mld (DDR-019)

Tier 2 ML daemon — runs in userspace, provides hints to kernel and apps:

- `MLHintCapability` only — hints are not commands, kernel can ignore them
- Hot-swappable models: update model without daemon restart
- Telemetry feed: anonymised usage patterns for model improvement (opt-in)

### Performance Targets

- Inference latency: &lt;10ms for typical 7B model query on NPU
- Memory efficiency: 13B model at int4 quantisation in 4GB VRAM
- Startup: model load from cache &lt;500ms

### Testing

- Inference accuracy: compare int4 vs bf16 output — &lt;5% quality degradation
- Memory test: run 5 apps simultaneously using Quasar — verify shared weights, no duplication
- NPU scheduling: verify Quasar correctly prioritises inference over background compute
- Hallucination rate: 500 prompts to local LLM — hallucination rate &lt;1%

---
