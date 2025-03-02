---
title: easy-rl-chapter7-DQN进阶技巧
tags:
  - RL
  - DQN
date: " 2025-03-02T15:35:54+08:00 "
modify: " 2025-03-02T15:35:54+08:00 "
share: false
cdate: " 2025-03-02 "
mdate: " 2025-03-02 "
math: "true"
---

# 第7章深度Q网络进阶技巧

## 7.1 双深度Q网络（Double DQN, DDQN）

### 关键概念

- **问题**：Q值高估。传统DQN在计算目标值时直接使用目标网络的最大Q值，导致高估。
- 分析： 例如，假设我们现在有 4 个动作，本来它们得到的Q值都是差不多的，它们得到的奖励也是差不多的。但是在估计的时候，网络是有误差的。所示，假设是第一个动作被高估了，绿色代表是被高估的量，智能体就会选这个动作，就会选这个高估的 Q 值来加上 $r_t$ 来当作目标。如果第四个动作被高估了，智能体就会选第四个动作来加上 $r_t$ 当作目标。所以智能体总是会选那个 Q 值被高估的动作，总是会选奖励被高估的动作的Q值当作最大的结果去加上 $r_t$ 当作目标，所以目标值总是太大。  
![image.png](https://raw.githubusercontent.com/Tendourisu/images/master/20250302164856770.png)

- **解决方案**：分离动作选择和值计算：
  - 用**当前网络**选择动作：$a^* = \arg\max_a Q(s_{t+1}, a)$
  - 用**目标网络**计算值：$Q'(s_{t+1}, a^*)$

### 数学公式

传统DQN目标：

$$
 Q(s_t, a_t) \leftrightarrow r_t + \max_a Q'(s_{t+1}, a) \tag{7.1} 
$$

DDQN目标：

$$
 Q(s_t, a_t) \leftrightarrow r_t + Q'\left(s_{t+1}, \arg\max_a Q(s_{t+1}, a)\right) \tag{7.2} 
$$

### 实现细节

- 使用两个网络：当前网络（频繁更新）和目标网络（定期同步）。
- 改动少，计算量与DQN相当。

### 关键代码

```python
        state_batch, action_batch, reward_batch, next_state_batch, done_batch = self.memory.sample(
            self.batch_size)
        # 将数据转换为tensor
        state_batch = torch.tensor(np.array(state_batch), device=self.device, dtype=torch.float)
        action_batch = torch.tensor(action_batch, device=self.device).unsqueeze(1)  
        reward_batch = torch.tensor(reward_batch, device=self.device, dtype=torch.float).unsqueeze(1)    
        next_state_batch = torch.tensor(np.array(next_state_batch), device=self.device, dtype=torch.float)
        done_batch = torch.tensor(np.float32(done_batch), device=self.device).unsqueeze(1)
        q_value_batch = self.policy_net(state_batch).gather(dim=1, index=action_batch) # 实际的Q值
        
        next_q_value_batch = self.policy_net(next_state_batch) # 下一个状态对应的实际策略网络Q值
        next_target_value_batch = self.target_net(next_state_batch) # 下一个状态对应的目标网络Q值
        # 将策略网络Q值最大的动作对应的目标网络Q值作为期望的Q值
        next_target_q_value_batch = next_target_value_batch.gather(1, torch.max(next_q_value_batch, 1)[1].unsqueeze(1))
        expected_q_value_batch = reward_batch + self.gamma * next_target_q_value_batch* (1-done_batch) # 期望的Q值
        """dqn版本
	next_q_value_batch = self.target_net(next_state_batch).max(1)[0].detach() # 计算下一时刻的状态(s_t_,a)对应的Q值
        # 计算期望的Q值，对于终止状态，此时done_batch[0]=1, 对应的expected_q_value等于reward
        next_target_value_batch = reward_batch + self.gamma * next_q_values * (1-done_batch)
	"""

        # 计算损失
        loss = nn.MSELoss()(q_value_batch, expected_q_value_batch)
```

---

## 7.2 竞争深度Q网络（Dueling DQN）

### 网络结构改进

- 将Q网络分解为两条路径：
  - **状态值函数** $V(s)$：标量，表示状态的价值。
  - **优势函数** $A(s, a)$：向量，表示动作的相对优势。

### 数学公式

$$
 Q(s, a) = V(s) + A(s, a) 
$$

>[!hint]+ think  
>由于一个动作而更新 V 的同时，会将其余的Q（s, a）一起更新

### 约束条件

- **零均值化**：强制优势函数的每列和为0，避免$V(s)$与$A(s, a)$冗余。

  ```python
  # 零均值化伪代码
  advantages = A(s, a) - mean(A(s, a))
  Q = V(s) + advantages
  ```

### 优势

- 数据效率高：更新$V(s)$可间接影响所有动作的Q值。
- 示例：若需提升某动作Q值，可能仅需调整$V(s)$。
### 关键代码
```python
#### 主要是模型上的差别
class DuelingNet(nn.Module):
    def __init__(self, n_states, n_actions,hidden_dim=128):
        super(DuelingNet, self).__init__()
        # hidden layer
        self.hidden_layer = nn.Sequential(
            nn.Linear(n_states, hidden_dim),
            nn.ReLU()
        )
        #  advantage
        self.advantage_layer = nn.Sequential(
            nn.Linear(hidden_dim, hidden_dim),
            nn.ReLU(),
            nn.Linear(hidden_dim, n_actions)
        )
        # value
        self.value_layer = nn.Sequential(
            nn.Linear(hidden_dim, hidden_dim),
            nn.ReLU(),
            nn.Linear(hidden_dim, 1)
        )
    def forward(self, state):
        x = self.hidden_layer(state)
        advantage = self.advantage_layer(x)
        value     = self.value_layer(x)
        return value + advantage - advantage.mean()
```
---

## 7.3 优先级经验回放（Prioritized Experience Replay, PER）

### 核心思想

- **非均匀采样**：根据时序差分误差（TD error）赋予经验优先级。
- 高TD误差的经验更可能被采样。

### 实现步骤

1. 计算经验优先级：$p_i = |\delta_i| + \epsilon$（$\delta_i$为TD误差）。
2. 按优先级概率采样：$P(i) = \frac{p_i^\alpha}{\sum_j p_j^\alpha}$。
3. 重要性采样调整更新权重。

---

## 7.4 多步方法（平衡MC与TD）

### 核心思想

- **混合蒙特卡洛（MC）与时序差分（TD）**：使用$N$步奖励。
- 目标值计算：

$$
 \text{目标} = \sum_{t'=t}^{t+N} r_{t'} + \gamma^N \max_a Q(s_{t+N+1}, a) 
$$

### 优缺点

- **优点**：减少Q值估计偏差。
- **缺点**：增加奖励方差。

---

## 7.5 噪声网络（Noisy Net）

### 改进探索

- **参数空间加噪声**：在Q网络参数上添加高斯噪声。
- 回合内噪声固定，实现**状态依赖的探索**。

### 实现方式

- 每回合开始时采样噪声，保持回合内参数不变。
- 动作选择：$a = \arg\max_a \tilde{Q}(s, a)$（$\tilde{Q}$为噪声Q网络）。

---

## 7.6 分布式Q函数（Distributional Q-function）

### 核心思想

- **建模奖励分布**：输出奖励的概率分布而非期望值。
- 示例：将奖励范围离散化为$[-10, 10]$，预测每个区间的概率。

### 网络输出

- 每个动作对应一个分布向量（如5个区间概率）。
- 测试时选择均值最大的动作。

### 优势

- 捕捉奖励不确定性，支持风险敏感策略。

---

## 7.7 彩虹（Rainbow）

### 方法整合

- **7种技术组合**：DDQN、Dueling DQN、PER、多步、噪声网络、分布式Q函数、竞争架构。
- **性能对比**（图7.10）：
  - 彩虹方法（彩色实线）显著优于单一方法。
  - 去除多步或分布式Q函数性能下降明显（图7.11）。

### 关键结论

- 分布式Q函数天然缓解高估问题，使DDQN作用减弱。
- 多步方法对性能影响最大。

---

## 附录：图表说明

| 图编号 | 核心内容描述                                                                 |
|--------|----------------------------------------------------------------------------|
| 7.1    | 传统DQN（红色）的Q值高估，DDQN（蓝色）更接近真实值。                         |
| 7.2    | Q值高估机制：网络误差导致选择高估动作，目标值累积偏大。                       |
| 7.3    | Dueling DQN结构：分离$V(s)$和$A(s, a)$，相加得到Q值。                       |
| 7.4    | 训练示例：通过调整$V(s)$间接更新多个动作的Q值。                              |
| 7.5    | 零均值化约束：优势函数每列和为0，迫使网络更新$V(s)$。                        |
| 7.10   | 彩虹方法在Atari游戏中表现最优，整合所有技术后分数中位数最高。                 |
| 7.11   | 去除多步、PER或分布式Q函数后性能显著下降（虚线对比）。                        |

```
