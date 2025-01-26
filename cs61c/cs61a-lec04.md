---
title: cs61a-lec04
tags: 
categories: dairy
date: " 2025-01-26T11:33:18+08:00 "
modify: " 2025-01-26T11:33:18+08:00 "
dir: dairy
share: false
cdate: " 2025-01-26 "
mdate: " 2025-01-26 "
---




### 内存区域
- 栈、旗、静态数据、代码区

### 动态内存管理
- `malloc`, `calloc`, `realloc`, `free`...
```c
#include <stdio.h>
#include <string.h>
#include <stdlib.h>

int main() {
    char source[] = "Hello, World!";
    
    // 计算源字符串的长度（不包括 '\0'）
    size_t length = strlen(source);

    // 动态分配内存，+1 是为了存储 '\0'
    char *destination = malloc(sizeof(char) * (length + 1));
    if (destination == NULL) {
        fprintf(stderr, "Memory allocation failed!\n");
        return 1;
    }

    // 使用 strcpy 复制字符串
    strcpy(destination, source); // 不会检查destination的长度，所以必须确保有足够的长度
    // strncpy(destination, source, length + 1) 
    printf("Source: %s\n", source);
    printf("Destination: %s\n", destination);

    // 释放动态分配的内存
    free(destination);

    return 0;
}
```
### 游戏内存流量与错误使用

## 结构体与联合体

## 面向对象编程概念

## 类型转换与函数指针

## 常用软件
- 未知/随机变量、空指针访问

## 程序安全
- 使用工具检测问题：`vlagfind`

## 内存碎片化与管理策略

## 附加主题

### 硬件系统视角的寄存器

### 消费者与生产者的例子