---
title: lec09-RISC-V汇编与编译
tags:
  - cs61c
categories: dairy
date: " 2025-02-02T21:37:39+08:00 "
modify: " 2025-02-02T21:37:39+08:00 "
dir: dairy
share: false
cdate: " 2025-02-02 "
mdate: " 2025-02-02 "
---

# RISC-V汇编与编译链接流程总结

## 目录

1. [函数调用与堆栈管理](#函数调用与堆栈管理)
2. [寄存器用途与保存规则](#寄存器用途与保存规则)
3. [关键指令与伪指令实现](#关键指令与伪指令实现)
4. [编译链接流程](#编译链接流程)
5. [动态链接与静态链接](#动态链接与静态链接)
6. [代码示例](#代码示例)

---

## 函数调用与堆栈管理

### 调用约定（Calling Convention）

![image.png](https://raw.githubusercontent.com/Tendourisu/images/master/202502022150230.png)

- **Caller责任**：
  - 保存临时寄存器（如`a0-a7`, `t0-t6`）
  - 传递参数到`a0-a7`，返回值通过`a0`返回
- **Callee责任**：
  - 保存被调用者保存寄存器（如`s0-s11`）
  - 通过栈帧管理局部变量

### 栈帧操作

```riscv
map:
addi sp, sp, -16   # 分配栈空间（16字节）
sw ra, 0(sp)       # 保存返回地址
sw s0, 4(sp)       # 保存s0
mv s0, a0          # 将参数a0（lst）保存到s0
...
postamble:
lw ra, 0(sp)       # 恢复返回地址
addi sp, sp, 16    # 释放栈空间
ret                # 返回（等价于jalr x0, ra, 0）
```

**说明**：函数入口分配栈空间保存寄存器，出口恢复寄存器并释放栈空间。

---

## 寄存器用途与保存规则

| 寄存器类型 | 示例       | 保存责任      |
|------------|------------|---------------|
| **临时寄存器** | `t0-t6`   | Caller保存     |
| **保存寄存器** | `s0-s11`  | Callee保存     |
| **参数寄存器** | `a0-a7`   | Caller保存     |
| **返回地址**  | `ra`       | Caller保存（需显式保存）|

---

## 关键指令与伪指令实现

### 条件分支与跳转

| 伪指令       | 实际指令           | 说明                     |
|--------------|--------------------|--------------------------|
| `j label`    | `jal x0, label`    | 无条件跳转               |
| `ret`        | `jalr x0, ra, 0`   | 从函数返回               |
| `bnez rs, L` | `bne rs, x0, L`    | 非零跳转                 |

### 尾递归优化（Tail Call）


1. **代码约定**：
    
	```c
	int foo(int x) {
		//lots of code 
		return foo(y); 
	}
	```
    - 这里定义了一个函数`foo`，它接收一个整数参数，并在某些计算后返回对自身的递归调用。
2. **尾递归**：
    
    - "Tail Recursion"：如果一个函数在其最后一条指令中调用了自己，这种调用被称为尾递归。尾递归的特点是当前函数在调用另一个函数之前不需要做任何额外的工作。
3. **优化目的**：
    
    - "So for efficiency when it is tail recursive..."：为了提高效率，当函数是尾递归形式时，可以进行特殊的优化处理。
4. **参数评估与寄存器分配**：
    
    - "Evaluate the arguments for foo() and place them in a0-a7..."：在执行尾递归调用之前，先计算传给`foo`的参数，并将这些参数放到特定的寄存器（如a0到a7）中。这是为即将发生的函数调用准备数据。
5. **直接跳转而非调用**：
    
    - "Then call foo() with j or tail"：通常情况下会使用跳转指令（jump），而不是标准的子程序调用指令来进入新的函数调用。这避免了创建新的栈帧。
6. **跳过前导部分**：
    
    - "But jump past the preamble: We use the old ra and saved registers"：由于已经处于同一个函数上下文中，可以直接复用现有的返回地址（ra）和其他保存的寄存器内容，而不需要再次设置它们。这样就节省了空间和时间。
7. **直接返回**：
    
    - "Then when foo() returns, it can return directly to where it needs to return to"：经过优化后的尾递归调用，`foo`可以直接返回到最初调用它的位置，而不需要层层返回。
8. **减少寄存器恢复**：
    
    - "Rather than returning to wherever foo() was called and returning from there, and no need for excess restoring of saved registers"：通过这种方式，减少了不必要的寄存器恢复操作，进一步提高了性能。

总结来说，尾递归优化允许编译器识别出尾递归模式，并将其转换成循环结构或更高效的跳转机制，从而避免了每次递归调用都增加新的栈帧所带来的开销。这种优化对于防止栈溢出以及提升性能非常有用，尤其是在深度递归场景下。

```riscv
# 传统调用
call map
# 尾递归优化
mv a0, s0       # 设置参数
mv a1, s1
tail map        # 直接跳转，跳过栈帧分配
```

**说明**：尾递归通过`tail`伪指令跳过冗余栈操作，提升性能。

---

## 编译链接流程

### 四阶段流程

9. **编译**：C → 汇编（ `.s` ）
   - 处理伪指令（如`la`分解为`auipc` + `addi`）11. **汇编**：汇编 → 目标文件（ `.o` ）
   - 生成符号表与重定位表
10. **链接**：目标文件 → 可执行文件（ `a.out` ）
   - 合并代码段与数据段，解析外部符号
11. **加载**：可执行文件 → 内存
   - OS分配地址空间，初始化寄存器与栈  
![image.png](https://raw.githubusercontent.com/Tendourisu/images/master/202502022301216.png)  
![image.png](https://raw.githubusercontent.com/Tendourisu/images/master/202502022301503.png)

### 符号表与重定位表

| 表类型       | 内容                   |
|--------------|------------------------|
| **符号表**   | 全局符号地址（函数/数据）|
| **重定位表** | 需要修正的指令地址      |

---

## 动态链接与静态链接

| 特性         | 静态链接                  | 动态链接                  |
|--------------|---------------------------|---------------------------|
| **空间效率** | 包含所有库代码，体积大    | 共享库，体积小            |
| **更新维护** | 需重新编译                | 替换库文件即可            |
| **内存占用** | 独立进程占用高            | 共享库减少内存冗余        |

---

## 代码示例

### 递归函数`map`的RISC-V实现

```riscv
map:
addi sp, sp, -16
sw ra, 0(sp)
sw s0, 4(sp)
mv s0, a0                # lst存入s0
bnez s0, else
li a0, 0                 # 返回NULL
j postamble
else:
li a0, 8
call malloc              # 分配内存
mv s2, a0                # newcell存入s2
lw a0, 0(s0)
jalr ra, s1              # 调用f(lst->car)
sw a0, 0(s2)             # newcell->car = f(...)
lw a0, 4(s0)
call map                 # 递归调用
sw a0, 4(s2)             # newcell->cdr = map(...)
postamble:
lw ra, 0(sp)
addi sp, sp, 16
ret
```

**逻辑**：递归遍历链表，对每个节点应用函数`f`，生成新链表。

### 乘法与除法指令

```riscv
mulh s1, s2, s3     # 高32位乘积
mul s0, s2, s3      # 低32位乘积
div s0, s2, s3      # 商
rem s1, s2, s3      # 余数
```

**说明**：RISC-V乘法指令生成64位结果需两条指令（`mulh` + `mul`）。
