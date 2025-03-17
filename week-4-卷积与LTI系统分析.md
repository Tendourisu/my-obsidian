---
title: week-4-卷积与LTI系统分析
tags: 
categories: 
date: 2025-03-17T09:59:51+08:00
modify: 2025-03-17T09:59:51+08:00
dir: 
share: false
cdate: 2025-03-17
mdate: 2025-03-17
---

# 卷积与LTI系统分析

## 1. 卷积的定义与性质

### 1.1 卷积积分与卷积和
- **连续时间系统**  
  $$y(t) = x(t) * h(t) = \int_{-\infty}^{\infty} x(\tau)h(t-\tau)d\tau = \int_{-\infty}^{\infty} x(t-\tau)h(\tau)d\tau$$  
  **积分限确定**：  
  - 若$f_1(t)$为因果信号（$t<0$时为0），则积分下限为0  
  - 若$f_1(t), f_2(t)$均为因果信号，则积分区间为$ [0, t] $

- **离散时间系统**  
  $$y [n]  = x [n]  * h [n]  = \sum_{m=-\infty}^{\infty} x [m] h [n-m] $$  
  **条件**：  
  - LTI系统零状态响应  
  - 因果性：$h [n] =0$当$n<0$

### 1.2 卷积性质
#### 代数性质
- **交换律**  
  $$x(t)*h(t) = h(t)*x(t)$$  
  离散形式：$x [n] *h [n]  = h [n] *x [n] $

- **分配律**  
  $$x(t)* [h_1 (t)+h_2 (t)]  = x(t)*h_1(t) + x(t)*h_2(t)$$  
  应用：并联系统的冲激响应为子系统冲激响应之和

- **结合律**  
  $$ [x (t)*h_1 (t)] *h_2(t) = x(t)* [h_1 (t)*h_2 (t)] $$  
  应用：串联系统的冲激响应与级联顺序无关

#### 微分/积分性质
- **微分**  
  $$\frac{d}{dt} [f_1 (t)*f_2 (t)]  = f_1'(t)*f_2(t) = f_1(t)*f_2'(t)$$

- **积分**  
  $$\int_{-\infty}^t  [f_1 (\tau)*f_2 (\tau)] d\tau =  [\int_{-\infty}^t f_1 (\tau) d\tau]  * f_2(t)$$

#### 时移性质
- **连续时间**  
  $$f_1(t-t_1)*f_2(t-t_2) = f(t-t_1-t_2)$$

- **离散时间**  
  $$f [n-m_1] *f [n-m_2]  = f [n-m_1-m_2] $$

## 2. 卷积的应用

### 2.1 LTI系统分析
- **零状态响应求解**  
  通过$h(t)$直接计算系统输出，避免微分方程求解：  
  $$y(t) = x(t)*h(t)$$

- **系统辨识**  
  已知输入$x(t)$和输出$y(t)$，求$h(t)$：  
  $$h(t) = \mathcal{F}^{-1}\left\{\frac{Y(\omega)}{X(\omega)}\right\}$$

### 2.2 信号处理
- **滤波**  
  通过设计$h(t)$实现噪声抑制：  
  - 平滑滤波：$h(t) = \frac{1}{\Delta t} [u (t)-u (t-\Delta t)] $  
  - 低通/高通滤波：利用频域特性选择频率成分

- **信号恢复**  
  采样信号重建：  
  $$f(t) = \sum_{n} f(nT) \cdot \text{sinc}\left(\frac{t-nT}{T}\right)$$

### 2.3 图像处理
- **二维卷积**  
  $$y [m, n]  = \sum_{k_1}\sum_{k_2} h [k_1, k_2] x [m-k_1, n-k_2] $$  
  - 平滑滤波：均值核 $\frac{1}{9}\begin{bmatrix}1&1&1\\1&1&1\\1&1&1\end{bmatrix}$  
  - 边缘检测：Sobel算子 $\begin{bmatrix}-1&0&1\\-2&0&2\\-1&0&1\end{bmatrix}$

## 3. LTI系统特性与冲激响应

| 特性       | 连续时间系统条件            | 离散时间系统条件          |
|------------|----------------------------|--------------------------|
| 无记忆性   | $h(t)=K\delta(t)$          | $h [n] =K\delta [n] $       |
| 因果性     | $h(t)=0, t<0$              | $h [n] =0, n<0$           |
| 稳定性     | $\int_{-\infty}^\infty |h(t)|dt < \infty$ | $\sum_{n=-\infty}^\infty |h [n] | < \infty$ |
| 可逆性     | $\exists h_i(t), h(t)*h_i(t)=\delta(t)$ | $\exists h_i [n] , h [n] *h_i [n] =\delta [n] $ |

## 4. 卷积计算方法

### 4.1 解析法
- **关键步骤**：  
  1. 变量替换：$\tau \rightarrow t-\tau$  
  2. 反褶：$h(\tau) \rightarrow h(-\tau)$  
  3. 平移：$h(-\tau) \rightarrow h(t-\tau)$  
  4. 相乘积分：$\int x(\tau)h(t-\tau)d\tau$

### 4.2 数值计算
- **矩阵法示例**：  
  ```python
  x = [2, 1, 4, 1]
  h = [3, 1, 5]
  y = convolve(x, h)  # 结果为 [6, 5, 23, 12, 21, 5]
  ```

### 4.3 解卷积
- **逆滤波**：  
  已知 $y[n] = x[n]*h[n]$ ，求 $h[n]$ ：  
  $$h[0] = \frac{y[0]}{x[0]}, \quad h[1] = \frac{y[1]-h[0]x[1]}{x[0]}$$

## 5. 典型例题
### 例 1：有限长信号卷积
- **输入**：  
  $f_1(t) = \begin{cases}1, & 0 \leq t < 2 \\ 0, & \text{else}\end{cases}$  
  $f_2(t) = \begin{cases}1, & 1 \leq t < 3 \\ 0, & \text{else}\end{cases}$

- **输出分段**：  
  
  | 时间区间    | 积分表达式                | 结果          |
  |-------------|---------------------------|---------------|
  | $0 \leq t <1$ | $\int_0^t 1 \cdot 1 d\tau$ | $t$           |
  | $1 \leq t <3$ | $\int_{t-1}^t 1 \cdot 1 d\tau$ | $1$           |
  | $3 \leq t <5$ | $\int_{t-1}^3 1 \cdot 1 d\tau$ | $4-t$         |

## 6. 思考题解答
- **奇偶性分析**：  
  1. $f(t), g(t)$ 均为偶函数：卷积结果为偶函数  
  2. $f(t), g(t)$ 均为奇函数：卷积结果为偶函数  
  3. $f(t)$ 奇， $g(t)$ 偶：卷积结果为奇函数  
  **推导**：利用变量替换 $\tau \rightarrow -\tau$ 验证对称性
