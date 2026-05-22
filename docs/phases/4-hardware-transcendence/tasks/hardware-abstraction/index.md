## The HAL (Hardware Abstraction Layer)

**Component:** `cosmos-hal` + arch crates | **DDR:** DDR-HAL

The `CosmosHal` Rust trait is the single interface through which the kernel talks to hardware. Each architecture implements it.

```rust
// Simplified DDR-HAL interface
pub trait CosmosHal: Send + Sync {
    fn current_cpu_id() -&gt; CpuId;
    fn disable_interrupts();
    fn enable_interrupts();
    fn flush_tlb_all();
    fn flush_tlb_page(addr: VirtAddr);
    fn read_page_table_root() -&gt; PhysAddr;
    fn write_page_table_root(addr: PhysAddr);
    fn halt_cpu() -&gt; !;
    fn send_ipi(target: CpuId, vector: u8);
    fn memory_barrier();
}
```

**Zero runtime dispatch:** The HAL implementation is selected at compile-time via Rust's type system — no vtable, no branch on architecture at runtime.

---