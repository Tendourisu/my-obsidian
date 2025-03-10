---
title: 
tags:
  - 概率论
date: " 2025-03-10T13:32:37+08:00 "
modify: " 2025-03-10T13:32:37+08:00 "
share: false
cdate: " 2025-03-10 "
mdate: " 2025-03-10 "
math: "true"
---
## 期望（均值）
### 均值定义

$$
Def  \ X\sim{p_i}\ \  E(X)=\sum_{i}x_{i}p_{i}(必须绝对收敛)
$$
>[!hint]+
>- **绝对收敛**：若级数 $\sum a_n$ 的各项绝对值组成的级数 $\sum |a_n|$ **收敛**，则原级数$\sum a_n$称为**绝对收敛**。
>- **条件收敛**：若级数 $\sum a_n$**本身收敛**，但绝对值级数 $\sum |a_n|$∑∣**发散**，则原级数称为**条件收敛**。
### 方差定义
- 方差
$$
D（X）=E[X-EX]^2
$$
- 样本方差
$$
S^2=\frac{1}{n-1}\sum^n_{i=1}(X-\overline{X})^2
$$
### 中位数定义
- p分位数$x_p$
$$
P(X\le x_{p})\ge p, P(X\ge x_{p})\ge 1-p, 0\lt q \lt 1
$$
- 中位数$p=\frac{1}{2}$
- 性质：x为随机变量 X 的中位数 $\leftrightarrow \frac{1}{2}\le F(x)\le \frac{1}{2}+P(X=x)$
### 众数定义
- 概率密度最大的$x_{p}$

