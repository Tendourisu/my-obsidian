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

### 输入输出的用法

```c
#include <stdio.h>

int main() {
    int c;
    printf("请输入一个字符: ");
    c = getchar(); // 从标准输入读取一个字符
    printf("你输入的字符是: %c\n", c);

    FILE *file = fopen("example.txt", "r");
    if (file) {
        c = getc(file); // 从文件读取一个字符
        printf("文件中的第一个字符是: %c\n", c);
        fclose(file);
    }
	
	char buffer[100];
    printf("请输入一行文本: ");
    fgets(buffer, sizeof(buffer), stdin); // 从标准输入读取一行文本
    printf("你输入的文本是: %s", buffer)
    
    FILE *file = fopen("example.txt", "r");
    if (file) {
        fgets(buffer, sizeof(buffer), file); // 从文件读取一行文本
        printf("文件中的第一行是: %s", buffer);
        fclose(file);
    }

	int i = 42;
    float f = 3.14;
    printf("整数: %d, 浮点数: %.2f\n", i, f); // 输出到标准输出

    FILE *file = fopen("output.txt", "w");
    if (file) {
        fprintf(file, "整数: %d, 浮点数: %.2f\n", i, f); // 输出到文件
        fclose(file);
    }

    int i;
    float f;
    printf("请输入一个整数和一个浮点数: ");
    scanf("%d %f", &i, &f); // 从标准输入读取整数和浮点数
    printf("你输入的整数是: %d, 浮点数是: %.2f\n", i, f);

    FILE *file = fopen("input.txt", "r");
    if (file) {
        fscanf(file, "%d %f", &i, &f); // 从文件读取整数和浮点数
        printf("文件中的整数是: %d, 浮点数是: %.2f\n", i, f);
        fclose(file);
    }

    char buffer[100];
    int i = 42;
    float f = 3.14;

    sprintf(buffer, "整数: %d, 浮点数: %.2f", i, f); // 将格式化字符串写入buffer
    printf("sprintf的结果: %s\n", buffer);

    snprintf(buffer, sizeof(buffer), "整数: %d, 浮点数: %.2f", i, f); // 安全地写入buffer
    printf("snprintf的结果: %s\n", buffer);
    return 0;
}
```

## 函数指针

- You have a function definition"
	- char*foo(char*a, int b){ …}
- Can create a pointer of that type…"
	- char*(*f)(char*, int);
		- Declares f as a function taking a char* and an int and returning a char*"
- Can assign to it"
	- f=&foo
		- Create a reference to function foo
- And can then call it..."
	- printf(“%s\n”,(*f)(“cat”, 3))

## 程序安全

- 使用工具检测问题：`vlagfind`

## Float

| Type|Exponent|Mantissa|
| ---|---|---|
| Regular Number|1-254|Anything|
| Zero|All zeros|All zeros|
| Infinity|All ones(255)|All zeros|
| NaN|All ones(255)|Nonzero|
| Denorm|All zeros|Nonzero|
![image.png](https://raw.githubusercontent.com/Tendourisu/images/master/202501292309113.png)

![image.png](https://raw.githubusercontent.com/Tendourisu/images/master/202501292309457.png)
![image.png](https://raw.githubusercontent.com/Tendourisu/images/master/202501292309207.png)
Instruction Set Architecture(ISA)
• Examples: ARM, Intel x86, MIPS, RISC-V, IBM/Motorola PowerPC(old Mac)