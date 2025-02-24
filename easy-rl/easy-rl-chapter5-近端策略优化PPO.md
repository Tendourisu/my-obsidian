---
title: easy-rl-chapter5-近端策略优化PPO
tags:
  - RL
date: " 2025-02-24T19:56:13+08:00 "
modify: " 2025-02-24T19:56:13+08:00 "
share: false
cdate: " 2025-02-24 "
mdate: " 2025-02-24 "
math: "true"
---

# 近端策略优化（PPO）算法总结

## 5.1 重要性采样

### 核心概念

- **同策略与异策略**：
  - **同策略**：智能体与环境交互并在此策略下进行更新。
  - **异策略**：训练时使用不同的策略进行数据采样，避免每次更新都需要重新交互。
- **重要性采样**：解决从异策略中采样数据的问题。通过引入重要性权重 $\frac{p(x)}{q(x)}$，将一个策略的数据（$q$）转换为另一个策略的数据（$p$）。

### 公式

- **期望值计算**：
  - 如果可以从分布 $p$ 采样数据，期望值为：

$$
    \mathbb{E}_{x \sim p}[f(x)] \approx \frac{1}{N} \sum_{i=1}^N f(x^i)
$$

  - 但如果只能从 $q$ 采样，需加权修正为：

$$
 \mathbb{E}_{x \sim p}[f(x)] = \mathbb{E}_{x \sim q}\left[f(x) \frac{p(x)}{q(x)}\right]
$$

### 问题与限制

- **方差问题**：采样分布差异过大时，方差会剧增，导致重要性采样结果的不稳定性。  
![image.png](https://raw.githubusercontent.com/Tendourisu/images/master/202502242019086.png)

### 应用到异策略训练

- **异策略梯度更新**：
  - PPO通过异策略数据采样，结合重要性采样来更新策略参数。
  - 核心公式为：

$$
\nabla \bar{R}_{\theta} = \mathbb{E}_{\tau \sim p_{\theta^{\prime}(\tau)}} \left[\frac{p_{\theta}(\tau)}{p_{\theta^{\prime}}(\tau)} R(\tau) \nabla \log p_{\theta}(\tau)\right]
$$

## 5.2 近端策略优化（PPO）

### 核心概念

- **目标函数与约束**：PPO通过引入一个KL散度约束，限制训练中策略变动过大。
  - 目标函数为：

$$
    J_{\mathrm{PPO}}^{\theta^{\prime}}(\theta) = J^{\theta^{\prime}}(\theta) - \beta \mathrm{KL}\left(\theta, \theta^{\prime}\right) 
$$

### TRPO与PPO的比较

- **TRPO**：信任区域策略优化，使用KL散度约束进行策略更新，优化困难。
- **PPO**：通过内置的KL散度约束简化了TRPO，使得实现更加高效。

### KL散度与行为策略

- **KL散度**：度量两策略之间的行为差异（而非参数差异）。
- **行为策略**：我们关注的是策略的行为差异，采用KL散度来度量两策略输出的动作分布差异。

### 5.2.1 近端策略优化惩罚（PPO-penalty）

- 通过增加KL散度惩罚项，避免策略变化过大，进行策略的多次更新。
  - 目标函数为：

$$
    J_{\mathrm{PPO}}^{\theta^{k}}(\theta) = J^{\theta^{k}}(\theta) - \beta \mathrm{KL}\left(\theta, \theta^{k}\right)
$$
### 5.2.2 近端策略优化裁剪（PPO-clip）

- 通过对采样比值进行裁剪，确保模型更新不过度偏离上一策略。
  - 裁剪后的目标函数为：
$$

    J_{\mathrm{PPO2}}^{\theta^{k}}(\theta) \approx \sum_{\left(s_{t}, a_{t}\right)} \min \left( \frac{p_{\theta}\left(a_{t} | s_{t}\right)}{p_{\theta^{k}}\left(a_{t} | s_{t}\right)} A^{\theta^{k}}\left(s_{t}, a_{t}\right), \operatorname{clip}(\cdot) \right)
    

$$
## 数学推导

### 重要性采样的推导

1. **期望值计算**：
   - 假设我们希望计算从分布 $p(x)$ 中采样得到的函数值的期望：

     
$$

     \mathbb{E}_{x \sim p}[f(x)] = \int f(x) p(x) \, dx

$$
2. **从分布 $q(x)$ 采样时的修正**：
   - 当我们只能从分布 $q(x)$ 采样数据时，可以使用重要性权重修正：
     
$$

     \mathbb{E}_{x \sim p}[f(x)] = \mathbb{E}_{x \sim q} \left[f(x) \frac{p(x)}{q(x)} \right]

$$
3. **变换后的期望值公式**：
   - 期望值计算变为：

     
$$

     \mathbb{E}_{x \sim p}[f(x)] = \mathbb{E}_{x \sim q}\left[f(x) \frac{p(x)}{q(x)}\right]

$$
### 异策略更新中的梯度

1. **同策略的梯度**：
   - 在策略梯度方法中，期望的梯度是基于同策略采样的：
$$

     \nabla \bar{R}_{\theta} = \mathbb{E}_{\tau \sim p_{\theta}(\tau)} \left[ R(\tau) \nabla \log p_{\theta}(\tau) \right]  

$$
2. **异策略的梯度**：
   - 当使用异策略时，我们需要加上重要性权重进行修正：

     
$$

     \nabla \bar{R}_{\theta} = \mathbb{E}_{\tau \sim p_{\theta^{\prime}}(\tau)} \left[\frac{p_{\theta}(\tau)}{p_{\theta^{\prime}}(\tau)} R(\tau) \nabla \log p_{\theta}(\tau)\right]

$$
### PPO的目标函数推导

1. **优化目标**：
   - PPO的目标函数通过在原目标函数中加入KL散度约束来优化：
     
	
$$

     J_{\mathrm{PPO}}^{\theta^{\prime}}(\theta) = J^{\theta^{\prime}}(\theta) - \beta \mathrm{KL}(\theta, \theta^{\prime})
    

$$
2. **TRPO与PPO的区别**：
   - **TRPO**：KL散度作为约束存在于目标函数外部，需要优化时处理复杂约束：

     
$$

     J_{\mathrm{TRPO}}^{\theta^{\prime}}(\theta) = \mathbb{E}_{(s_t, a_t) \sim \pi_{\theta^{\prime}}} \left[ \frac{p_{\theta}(a_t|s_t)}{p_{\theta^{\prime}}(a_t|s_t)} A^{\theta^{\prime}}(s_t, a_t) \right], \quad \text{KL}(\theta, \theta^{\prime}) < \delta

$$
   - **PPO**：KL散度作为约束直接加入目标函数，简化优化过程：

     
$$

     J_{\mathrm{PPO}}^{\theta^{\prime}}(\theta) = J^{\theta^{\prime}}(\theta) - \beta \mathrm{KL}(\theta, \theta^{\prime})
    $$
3. **KL散度的解释**：
   - KL散度用于衡量两个策略在行为上的差异，即给定状态下两个策略输出的动作分布的差异。
   - **行为差异**：在强化学习中，我们关心的是策略在执行时的行为差异，而非参数差异。

### PPO的变种

1. **PPO-penalty**：通过KL散度惩罚来限制策略变化过大，并在每个训练迭代中多次更新参数。
2. **PPO-clip**：通过裁剪操作来确保策略更新不会偏离太远。其目标函数为：

$$

   J_{\mathrm{PPO2}}^{\theta^{k}}(\theta) \approx \sum_{\left(s_t, a_t\right)} \min \left( \frac{p_{\theta}(a_t | s_t)}{p_{\theta^{k}}(a_t | s_t)} A^{\theta^{k}}(s_t, a_t), \operatorname{clip}(\cdot) \right)

$$

## 关键对比与总结

| 特性        | PPO-Penalty   | PPO-Clip      |
| --------- | ------------- | ------------- |
| **约束方式**  | KL 散度惩罚项      | 策略比率裁剪        |
| **调参复杂度** | 需动态调整 $\beta$ | 固定 $\epsilon$ |
| **计算开销**  | 需计算 KL 散度     | 无需额外分布计算      |
| **适用场景**  | 高精度策略更新       | 快速训练与简化实现     |

## 结论

PPO通过重要性采样和KL散度约束，成功将同策略算法转化为异策略算法，并有效地限制了策略更新的幅度，从而在实现上比TRPO更为高效。PPO的变种（如PPO-penalty与PPO-clip）进一步优化了训练过程，解决了KL散度约束和策略裁剪的问题。
