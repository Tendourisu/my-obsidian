---
title: riscv 想法
tags:
  - RISC-V
  - cs61c
categories: dairy
date: " 2025-02-02T14:02:19+08:00 "
modify: " 2025-02-02T14:02:19+08:00 "
dir: dairy
share: false
cdate: " 2025-02-02 "
mdate: " 2025-02-02 "
---
- 调用函数用 `jal jalr` 如果要在函数中再次调用函数，记得使用 `addi sp sp -4`
- 函数返回用 `jr ra`
- 在纯 loop 中才用 `j`
- 