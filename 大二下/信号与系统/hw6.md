一、傅里叶变换
1、必做题
（1）
由题意：
  $$
  f(t) = \frac{E}{\tau} t, \quad 0 \leq t \leq \tau
  $$
$$
  f(t) = 0, \quad t < 0 \text{ 或 } t > \tau
  
F(\omega) = \int_{0}^{\tau} \frac{E}{\tau} t e^{-j\omega t} \, dt
$$
我们有：
$$
\int_{0}^{\tau} t e^{-j\omega t} \, dt = \left[ t \cdot \frac{e^{-j\omega t}}{-j\omega} \right]_{0}^{\tau} - \int_{0}^{\tau} \frac{e^{-j\omega t}}{-j\omega} \, dt
$$

计算第一部分：
$$
\left[ t \cdot \frac{e^{-j\omega t}}{-j\omega} \right]_{0}^{\tau} = \frac{\tau e^{-j\omega \tau}}{-j\omega} - \frac{0 \cdot e^{-j\omega \cdot 0}}{-j\omega} = \frac{\tau e^{-j\omega \tau}}{-j\omega}
$$

计算第二部分：
$$
\int_{0}^{\tau} \frac{e^{-j\omega t}}{-j\omega} \, dt = \frac{1}{-j\omega} \int_{0}^{\tau} e^{-j\omega t} \, dt = \frac{1}{-j\omega} \left[ \frac{e^{-j\omega t}}{-j\omega} \right]_{0}^{\tau}
$$
$$
= \frac{1}{-j\omega} \left( \frac{e^{-j\omega \tau}}{-j\omega} - \frac{e^{-j\omega \cdot 0}}{-j\omega} \right) = \frac{1}{-j\omega} \left( \frac{e^{-j\omega \tau} - 1}{-j\omega} \right)
$$
$$
= \frac{e^{-j\omega \tau} - 1}{\omega^2}
$$

将两部分结合起来：
$$
\int_{0}^{\tau} t e^{-j\omega t} \, dt = \frac{\tau e^{-j\omega \tau}}{-j\omega} + \frac{e^{-j\omega \tau} - 1}{\omega^2}
$$

因此，傅里叶变换为：
$$
F(\omega) = \frac{E}{\tau} \left( \frac{\tau e^{-j\omega \tau}}{-j\omega} + \frac{e^{-j\omega \tau} - 1}{\omega^2} \right)
$$

```matlab
% 参数设置
E = 1; % 信号最大值
tau = 1; % 斜升时间
N = 1024; % FFT 点数
fs = 100; % 采样频率
t = 0:1/fs:(tau+0.1); % 时间向量，稍长于 tau 以包含完整信号

% 生成信号
f_t = (E/tau) * t .* (t <= tau);

% 计算傅里叶变换
F_omega = fft(f_t, N);
F_omega = F_omega / length(F_omega); % 归一化
freq = linspace(-fs/2, fs/2, N); % 频率向量

% 绘制幅度谱
figure;
plot(freq, abs(fftshift(F_omega)));
title('信号的幅度谱');
xlabel('频率 (Hz)');
ylabel('幅度');
grid on;
xlim([-10 10]); % 展示感兴趣的频率范围
```

### 代码解释
1. **参数设置**：
   - `E` ：信号的最大值。
   - `tau` ：斜升信号的时间长度。
   - `N` ：FFT 的点数，决定频谱的分辨率。
   - `fs` ：采样频率，确保满足 Nyquist-Shannon 采样定理。

2. **信号生成**：
   - 使用 `(E/tau) * t .* (t <= tau)` 生成斜升信号，超出 `[0, tau]` 区间的值为零。

3. **傅里叶变换**：
   - 使用 `fft` 函数计算离散傅里叶变换。
   - 结果进行归一化，以便正确显示幅度谱。

4. **频率向量**：
   - 使用 `linspace` 生成对称的频率向量，便于观察正负频率。

5. **绘图**：
   - 使用 `fftshift` 将零频率移到频谱的中心。
   - 绘制幅度谱，并设置合适的横轴范围。

### 结果
运行上述代码后，MATLAB 将绘制出给定斜升信号的幅度谱。幅度谱反映了信号在不同频率成分上的分布情况。

### 最终答案
$$
\boxed{\text{见 MATLAB 代码及运行结果}}
$$