---
title: week-6-傅里叶变换的性质
tags:
  - 信号与系统
categories: 
date: 2025-04-01T19:49:40+08:00
modify: 2025-04-01T19:49:40+08:00
dir: 
share: false
cdate: 2025-04-01T19
mdate: 2025-04-01T19
---

# 傅里叶变换的性质

## 一、典型信号的傅里叶变换

### 1. 矩形脉冲信号
**定义**  
$$f(t) = E \left [ u (t+\frac{\tau}{2}) - u (t-\frac{\tau}{2}) \right] $$

**傅里叶变换推导**  
$$
\begin{aligned}
F(\omega) &= \int_{-\tau/2}^{\tau/2} E e^{-j\omega t} dt \\
&= E \cdot \tau \cdot \text{Sa}\left( \frac{\omega \tau}{2} \right) \\
&= E\tau \cdot \frac{\sin(\omega \tau /2)}{\omega \tau /2}
\end{aligned}
$$

**关键结论**  
- **频谱特性**：无限时宽 → 有限频宽（主瓣宽度为 $\frac{4\pi}{\tau}$）
- **对称性**：时移会导致相位谱线性变化

---

### 2. 三角脉冲信号
**定义**  
$$f(t) = 
\begin{cases} 
E\left(1 - \frac{2|t|}{\tau}\right), & |t| \leq \frac{\tau}{2} \\
0, & \text{其他}
\end{cases}$$

**傅里叶变换推导**  
通过**微分性质**或**卷积法**推导，最终结果为：  
$$F(\omega) = \frac{4E}{\omega^2 \tau} \sin^2\left( \frac{\omega \tau}{4} \right)$$

---

### 3. 升余弦信号
**时域表达式**  
$$f(t) = \frac{E}{2} \left [1 + \cos\left (\frac{2\pi t}{\tau}\right)\right] , \quad |t| \leq \frac{\tau}{2}$$

**频谱特性**  
$$F(\omega) = \frac{E\tau}{2} \text{Sa}\left( \frac{\omega \tau}{2} \right) + \frac{E\tau}{4} \text{Sa}\left( \frac{\omega \tau}{2} - \pi \right) + \frac{E\tau}{4} \text{Sa}\left( \frac{\omega \tau}{2} + \pi \right)$$

---

### 4. 高斯信号
**定义**  
$$f(t) = E e^{-\pi \left( \frac{t}{\tau} \right)^2}$$

**傅里叶变换**  
$$F(\omega) = E\tau e^{-\pi \left( \frac{\omega \tau}{2\pi} \right)^2}$$  
- **特性**：时域与频域波形相同（傅里叶变换的本征函数）

---

## 二、傅里叶变换性质

### 1. 奇偶虚实性
| 时域特性 | 频域特性     |
| -------- | ------------ |
| 实偶函数 | 实偶函数     |
| 实奇函数 | 虚奇函数     |
| 复函数   | 无固定对称性 |

**数学表达**  
$$
\begin{aligned}
R(\omega) &= \int_{-\infty}^{\infty} f(t) \cos(\omega t) dt \quad (\text{偶函数}) \\
X(\omega) &= -\int_{-\infty}^{\infty} f(t) \sin(\omega t) dt \quad (\text{奇函数})
\end{aligned}
$$

---

### 2. 广义傅里叶变换
**符号函数**  
$$
\text{sgn}(t) = 
\begin{cases} 
1, & t > 0 \\
-1, & t < 0 
\end{cases}
\quad \Rightarrow \quad F(\omega) = \frac{2}{j\omega}
$$

**单位阶跃信号**  
$$u(t) = \lim_{a \to 0} e^{-at}u(t) \quad \Rightarrow \quad F(\omega) = \frac{1}{j\omega} + \pi \delta(\omega)$$

---

## 三、关键推导示例

### 单位阶跃信号的FT
**步骤**  
1. 用单边指数信号逼近：  
   $$f_a(t) = e^{-at}u(t), \quad a \to 0$$
2. 计算极限：  
   $$
   F(\omega) = \lim_{a \to 0} \frac{1}{a + j\omega} = \pi \delta(\omega) + \frac{1}{j\omega}
   $$

---

## 四、常见信号FT对照表

| 序号 | 信号类型         | 时域表达式 $f(t)$                                                | 傅里叶变换 $F(\omega)$                                                                                                              | 关键特性/备注                                     |
| ---- | ---------------- | ---------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------- |
| 1    | 单位冲激信号     | $\delta(t)$                                                      | $1$                                                                                                                                 | 白色频谱，所有频率分量等幅                        |
| 2    | 直流信号         | $1$                                                              | $2\pi \delta(\omega)$                                                                                                               | 零频分量无限大                                    |
| 3    | 单边指数信号     | $e^{-at}u(t), \, a>0$                                            | $\frac{1}{a + j\omega}$                                                                                                             | 衰减指数，频谱包含所有频率                        |
| 4    | 双边指数信号     | $e^{-a\|t\|}, \, a>0$                                            | $\frac{2a}{a^2 + \omega^2}$                                                                                                         | 对称衰减，实偶频谱                                |
| 5    | 矩形脉冲信号     | $\text{rect}\left(\frac{t}{\tau}\right)$                         | $\tau \cdot \text{Sa}\left(\frac{\omega \tau}{2}\right)$                                                                            | 有限时宽 → 无限频宽，主瓣宽度 $\frac{4\pi}{\tau}$ |
| 6    | 三角脉冲信号     | $\Lambda\left(\frac{t}{\tau}\right)$                             | $\tau \cdot \text{Sa}^2\left(\frac{\omega \tau}{4}\right)$                                                                          | 二次衰减，频谱更集中                              |
| 7    | 升余弦信号       | $\frac{E}{2}\left[1+\cos\left(\frac{2\pi t}{\tau}\right)\right]$ | $\frac{E\tau}{2} \text{Sa}\left(\frac{\omega \tau}{2}\right) + \frac{E\tau}{4} \text{Sa}\left(\frac{\omega \tau}{2} \pm \pi\right)$ | 频谱分量减少，适用于通信脉冲设计                  |
| 8    | 高斯信号         | $E e^{-\pi \left(\frac{t}{\tau}\right)^2}$                       | $E\tau e^{-\pi \left(\frac{\omega \tau}{2\pi}\right)^2}$                                                                            | 时域与频域波形相同（本征函数）                    |
| 9    | 符号函数         | $\text{sgn}(t)$                                                  | $\frac{2}{j\omega}$                                                                                                                 | 奇对称，纯虚频谱                                  |
| 10   | 单位阶跃信号     | $u(t)$                                                           | $\pi \delta(\omega) + \frac{1}{j\omega}$                                                                                            | 直流分量与衰减高频分量的叠加                      |
| 11   | 正弦信号         | $\sin(\omega_0 t)$                                               | $j\pi [\delta(\omega+\omega_0) - \delta(\omega-\omega_0)]$                                                                          | 频域为正负频率处的冲激对                          |
| 12   | 余弦信号         | $\cos(\omega_0 t)$                                               | $\pi [\delta(\omega+\omega_0) + \delta(\omega-\omega_0)]$                                                                           | 频域为正负频率处的冲激对                          |
| 13   | 周期冲激序列     | $\sum_{n=-\infty}^{\infty} \delta(t-nT)$                         | $\frac{2\pi}{T} \sum_{k=-\infty}^{\infty} \delta\left(\omega - \frac{2\pi k}{T}\right)$                                             | 时域周期 → 频域离散冲激串                         |
| 14   | 抽样信号（Sinc） | $\text{Sa}\left(\frac{\pi t}{\tau}\right)$                       | $\tau \cdot \text{rect}\left(\frac{\omega \tau}{2\pi}\right)$                                                                       | 无限时宽 → 有限频宽，理想低通特性                 |
| 15   | 单边正弦信号     | $\sin(\omega_0 t)u(t)$                                           | $\frac{\pi}{j} [\delta(\omega-\omega_0) - \delta(\omega+\omega_0)] + \frac{\omega_0}{\omega_0^2 - \omega^2}$                        | 包含冲激分量和连续谱                              |


---

## 五、核心结论
1. **频谱衰减规律**  
   - 信号越光滑（连续可导次数越高），频谱衰减越快。
   - 不连续信号（如矩形脉冲）频谱按 $\frac{1}{\omega}$ 衰减。

2. **时频关系**  
   - **有限时宽** ↔ **无限频宽**（如矩形脉冲）
   - **无限时宽** ↔ **有限频宽**（如高斯信号）

3. **本征函数**  
   高斯函数和冲激序列是傅里叶变换的本征函数，满足 $f(t) \leftrightarrow F(\omega)$ 形式相同。
