# Implementation
*Step-by-step guide to writing a BIOS bootloader in NASM.*

---
## **📌 Step 1: Understand the Boot Process**
When an x86 CPU starts:
1. **BIOS/UEFI** runs first (firmware).
2. BIOS loads the **first 512 bytes** of the boot device (e.g., disk, USB) into memory at **`0x7C00`**.
3. BIOS jumps to `0x7C00` (your bootloader).
4. Your bootloader **must**:
   - Be **exactly 512 bytes**.
   - End with the **magic number `0x55AA`** (last 2 bytes).
   - Set up the **stack, segments, and video mode**.

---
## **📌 Step 2: Write the Bootloader Code**
Create `boot.asm` with the following code:

```nasm
; boot.asm - BIOS Bootloader for Orion OS (Phase 0)
[BITS 16]       ; 16-bit real mode
[ORG 0x7C00]    ; BIOS loads us at 0x7C00

start:
    ; Disable interrupts (we don't need them yet)
    cli

    ; Set up segment registers
    xor ax, ax
    mov ds, ax
    mov es, ax
    mov ss, ax
    mov sp, 0x7C00  ; Stack grows downward from 0x7C00

    ; Enable interrupts (optional, but good practice)
    sti

    ; Print "ORION OS" to the screen
    mov si, msg    ; Load address of message into SI
    call print_string

    ; Halt the CPU (infinite loop)
    cli
    hlt

; Function: print_string
; Input: SI = address of null-terminated string
print_string:
    lodsb           ; Load byte from [SI] into AL, increment SI
    or al, al       ; Check if AL == 0 (null terminator)
    jz .done        ; If zero, we're done
    mov ah, 0x0E    ; BIOS teletype function (print character)
    int 0x10        ; Call BIOS
    jmp print_string
.done:
    ret

; Data: null-terminated string
msg db "ORION OS", 0

; Fill the rest of the bootloader with zeros
times 510-(\$-$$) db 0

; Magic boot signature (last 2 bytes)
dw 0xAA55