---
title: week3-2
tags:
  - 概率论
date: " 2025-03-06T09:51:49+08:00 "
modify: " 2025-03-06T09:51:49+08:00 "
share: false
cdate: " 2025-03-06 "
mdate: " 2025-03-06 "
math: "true"
---

### Bernoulli 概型

- 二项分布：n 次实验中，记成功的次数为 X，则成功的次数恰好为k 的概率 

$$
P(X=k)=C_{n}^kp^kq^{n-k}\leftrightarrow X\sim B(n,p)
$$

- 几何分布： $\infty重Bernoulli$ 实验中,首次“成功”出现时所需的试验次数为Y, 则首次成功出现时恰好实验 k 次的概率  

$$
P(Y=k)=q^{k-1}p \leftrightarrow Y\sim Ge(p)
$$

- 负二项分布： $\infty重Bernoulli$ 实验中, 第r 次“成功”出现时所需的试验次数为Z，则r 次成功出现时恰好出现在 k 次的概率 （**帕斯卡分布**）

 $$
P(Z=k)=C_{k-1}^{r-1}q^{k-r}p^r \leftrightarrow Z\sim NB(r,p)
$$

>ex1:“巴拿赫火柴盒问题”（Banach's matchbox problem）:假设一位数学有两个火柴盒，每个火柴盒中最初都装有 N 根火柴。他每次随机地从其中一个火柴盒中取出一根火柴使用。某一时刻，当他再次伸手去拿火柴时，发现他选中的那个火柴盒已经空了。此时，求另一个火柴盒中恰好有 r根火柴的概率。

不失一般性，假设右盒被取光，则右盒被选 N+1次，左盒被选 N-r 次，则由负二项分布， 

$$
p=2C^N_{2N-r}(\frac{1}{2})^{2N-r+1}
$$

### 事件相关性度量

def: let 0<P (A)<1, 0<P (B)<1, call

$$
r(A,B)=\frac{P(AB)-P(A)P(B)}{\sqrt{P(A)(1-P(A))P(B)(1-P(B)) }}
$$
性质：
- $|r(A,B)|\le 1$
- $r(A,B)=-r(A,B^C)$