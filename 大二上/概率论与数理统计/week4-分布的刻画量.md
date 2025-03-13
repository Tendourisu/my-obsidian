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
- Lotus定理
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

### 引理
$$
X \sim {p_{i}} \ \overline{y}=h(\overline{x} )\in {h(x_{1}, \dots,x_{n})}\rightarrow P(\overline{y}=y_{i})=\sum_{i:h(x_{i}=y_{i})}p_{i}
$$

### 中心距
- $E(X^k)$: k阶（原点）距
- $E(X-EX)^k$:k阶中心距
- $E^*=\frac{X-EX}{\sqrt{DX }}$ 标准化
- $E(X^*)$:偏度
- $E(X^*)$ :峰度
- 矩母函数MGF:
$$
M_{X}(u)=E[e^uX]=\begin{cases}
\sum_{i} e^{ux_{i}}p_{i}\\
 \int_{-\infty}^{\infty}e^{ux}f_{X}(x) dx 
\end{cases}
$$
![image.png](https://raw.githubusercontent.com/Tendourisu/images/master/20250313092136649.png)

若$M_{X}(u)$在u=0的某个开邻域内存在，则
$$
E(X^k)=M_{X}^{(k)}(0)
$$
矩母函数（若存在）与分布函数相互唯一确定
有关矩母函数的详细讲解与证明可参考：[如何通俗的理解矩母函数](https://zhuanlan.zhihu.com/p/148408669)
### 常见分布
1. $X\sim B(n,p)$  则$M_{X}(u)=pe^u+q$    $M_{X^n}(u)=(pe^n+q)^n$
2. $X\sim Ge(P)$, 则$M_{X}=\sum_{k=1}^{\infty}e^{uk}q^{k-1}p=\frac{p}{q}\sum^{\infty}_{k=1}[qe^u]^k=\frac{p}{q} \frac{qe^u}{1-qe^u}=\frac{pe^u}{1-qe^u}$    