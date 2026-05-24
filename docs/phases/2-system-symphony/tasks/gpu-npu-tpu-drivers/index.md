## Task: GPU/NPU/TPU Drivers

**Component:** `orion-gpu-intel`, `orion-gpu-amd`, `orion-gpu-mali` | **DDR:** DDR-015

**What it does:** ComputePeer model — GPU, NPU, TPU are scheduling entities at the same level as CPU cores. Capability-gated access. VRAM quota enforcement.

### Capability Model

| Capability          | Hardware                                                  | Rights Bitmap                       | Primary Holder                                     |
| ------------------- | --------------------------------------------------------- | ----------------------------------- | -------------------------------------------------- |
| `GPUCapability`     | Intel xe/i915, AMD amdgpu, NVIDIA open, Mali, Adreno, AGX | `RENDER │ COMPUTE │ COPY │ DISPLAY` | Aurora (DISPLAY), games (RENDER), Quasar (COMPUTE) |
| `NPUCapability`     | Intel VPU, Apple ANE, Qualcomm Hexagon, MediaTek APU      | `INFER │ TRAIN_LITE │ MODEL_LOAD`   | Quasar Runtime, orion-mld                          |
| `TPUCapability`     | Google Edge TPU, future custom silicon                    | `INFER │ BATCH_INFER`               | Quasar Runtime only                                |
| `ComputeCapability` | Abstract — OS chooses best peer                           | `COMPUTE`                           | General apps                                       |
| `DisplayCapability` | Display output scanout only                               | `DISPLAY │ CURSOR`                  | Aurora compositor only                             |

### Scheduler Rules

- GPU context switch: every 16ms (one display frame). Gaming: 33ms slices.
- Preemption via hardware GPU preemption (Intel Gen12+, AMD GFX10+).
- IOMMU enforcement: GPU DMA outside granted `MemoryCapability` → fault → driver restart.
- Unified memory (Apple M / AMD APU): `MemoryCapability:UNIFIED` flag — same physical pages for CPU+GPU.
- VRAM quota: each `GPUCapability` carries `VramQuota` field. Exceeding it returns `EVRAMQUOTA`.

### Implementation Priority

1. **Intel GPU (xe driver)** — most QEMU-testable via `virtio-gpu`
2. **AMD GPU (amdgpu)** — widespread desktop/laptop use
3. **Mali** — ARM64/Raspberry Pi support
4. NVIDIA open (Phase 2 stretch goal)

### Security Rules

- IOMMU mandatory — no GPU DMA outside granted MemoryCapability
- VRAM quotas prevent starvation between processes
- IOMMU I/O bandwidth capped at 80% of rated throughput per holder

### Testing

- FPS benchmark: compare Orion vs Linux on identical GPU (same driver version)
- VRAM exhaustion: exceed quota → `EVRAMQUOTA` returned, no crash
- GPU crash isolation: kill GPU driver process → compositor restarts, kernel unaffected
- Multi-GPU: verify ComputeScheduler dispatches correctly across heterogeneous compute

---
