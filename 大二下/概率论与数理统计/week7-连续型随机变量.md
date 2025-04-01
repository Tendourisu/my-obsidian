---
title: 未命名
tags: 
categories: 
date: 2025-04-01T20:07:55+08:00
modify: 2025-04-01T20:07:55+08:00
dir: 
share: false
cdate: 2025-04-01T20
mdate: 2025-04-01T20
---

# week7-连续型随机变量

## §1 概率密度函数
### 定义与背景
- **定义**：随机变量 $X$ 的概率密度函数 $f(x)$ 满足：
  $$
  P(a < X \leq b) = \int_{a}^{b} f(x)dx \quad \text{或} \quad F(x) = \int_{-\infty}^{x} f(u)du
  $$
- **背景**：
  - Poisson过程中首位顾客到达时间 $\tau \sim E(\lambda)$。
  - 寝室到教室时间分布的统计建模。

### 密度函数性质
1. **非负性与归一化**：
   $$
   f(x) \geq 0 \quad \text{且} \quad \int_{-\infty}^{+\infty} f(x)dx = 1
   $$
2. **连续性**：分布函数 $F(x)$ 是连续函数。
3. **导数关系**：在 $f(x)$ 的连续点 $x$ 处，$F^\prime(x) = f(x)$。
4. **概率计算**：$P(X \in B) = \int_{B} f(x)dx$。

### 示例
- **均匀分布**：$X \sim U [a, b] $ 时，子区间概率与长度成正比：
  $$
  P(c \leq X < d) = \frac{d - c}{b - a}
  $$

---

## §2 数学期望
### 定义
- **连续型期望**：
  $$
  EX = \int_{-\infty}^{+\infty} x f(x)dx \quad \text{（若积分绝对收敛）}
  $$
- **函数期望**：$E [h (X)]  = \int_{-\infty}^{+\infty} h(x) f(x)dx$。

### 示例
- **均匀分布**：
  $$
  EX = \frac{a + b}{2}, \quad DX = \frac{(b - a)^2}{12}
  $$

---

## §3 重要连续型分布

### 1. 均匀分布 $U [a, b] $
| 概率密度 $f(x)$       | 期望 $EX$ | 方差 $DX$ |
|-----------------------|-----------|-----------|
| $\frac{1}{b-a}, a \leq x \leq b$ | $\frac{a+b}{2}$ | $\frac{(b-a)^2}{12}$ |

**性质**：子区间概率与长度成正比。

---

### 2. 指数分布 $E(\lambda)$
**概率密度**：
$$
f(x) = \begin{cases} 
\lambda e^{-\lambda x}, & x \geq 0 \\
0, & x < 0 
\end{cases}
$$

**性质**：
- **无记忆性**：$P(X > s + t | X > s) = P(X > t)$。
- **期望与方差**：
  $$
  EX = \frac{1}{\lambda}, \quad DX = \frac{1}{\lambda^2}
  $$

**示例**：设备寿命 $X \sim E(1/4)$，调换概率 $P(X < 1) = 1 - e^{-1/4}$。

---

### 3. 正态分布 $N(\mu, \sigma^2)$
**概率密度**：
$$
f(x) = \frac{1}{\sqrt{2\pi}\sigma} \exp\left(-\frac{(x-\mu)^2}{2\sigma^2}\right)
$$

**标准化**：若 $X \sim N(\mu, \sigma^2)$，则 $Z = \frac{X - \mu}{\sigma} \sim N(0,1)$。

**性质**：
- **对称性**：$\Phi(-x) = 1 - \Phi(x)$。
- **期望与方差**：$EX = \mu, DX = \sigma^2$。

**示例**：
- **例4**：$X \sim N(2, \sigma^2)$，已知 $P(2 < X < 4) = 0.3$，求 $P(X < 0)$：
  $$
  P(X < 0) = \Phi\left(\frac{0 - 2}{\sigma}\right) = \Phi(-2/\sigma) = 1 - \Phi(2/\sigma) = 0.2
  $$
- **例5**：方程 $y^2 + 4y + X = 0$ 无实根概率为 $1/2$，求 $\mu$：
  $$
  P(X > 4) = 1/2 \implies \mu = 4
  `$$


### 4.Γ函数性质
- **定义**： $\Gamma(x) = \int_{0}^{+\infty} u^{x-1}e^{-u}du$ 。
- **递推公式**： $\Gamma(x+1) = x\Gamma(x)$ 。
- **特殊值**： $\Gamma(n+1) = n!$ , $\Gamma(1/2) = \sqrt{\pi}$ 。
