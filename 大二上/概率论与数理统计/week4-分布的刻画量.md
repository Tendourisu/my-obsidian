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
- $E((X^*)^3)$:偏度skewness
	在统计学中，**正偏（Positive Skewness）** 的定义如下：
	
	### **正偏（右偏）的定义**
	当数据分布**右侧（较大值方向）的尾部比左侧更长**，且主要数据集中在左侧时，这种不对称性称为**正偏态（右偏态）**。其特点是：
	1. **均值（Mean） > 中位数（Median） > 众数（Mode）**  
	   - 右侧的极端值（大值）会显著拉高均值，而中位数和众数相对不受影响。
	1. **偏度系数（Skewness）> 0**  
	   - 通过计算偏度系数（如 Pearson 偏度系数或矩偏度系数），若结果为正，则表明分布右偏。
	
	### **直观理解**
	- **图形特征**：正偏分布的“峰值”位于左侧，右侧有一条长尾。  
	  - 例如：大多数人的收入集中在较低水平，但少数极高收入者使右侧出现长尾（下图示意）。  
	  ![正偏态分布示意图](https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Negative_and_positive_skew_diagrams_%28English%29.svg/320px-Negative_and_positive_skew_diagrams_%28English%29.svg.png)
	
	- **实际场景**：  
	  - 自然现象：洪水发生频率（大多数年份正常，少数年份极严重）。  
	  - 社会经济：个人收入、房价（多数集中在低值，少数极高值）。  
	  - 生物学：某些物种的寿命分布（多数个体寿命较短，少数存活极久）。
	
	### **注意事项**
	- **名称与方向的关系**：  
	  - **正偏 = 右偏**：名称中的“正”指偏度系数为正，“右”指长尾在右侧。
	- **数据处理的启示**：  
	  - 正偏数据可能不服从正态分布，需通过取对数、Box-Cox变换等方法处理后再建模。

- $E((X^*)^4$ :峰度kurtosis
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
1. $X\sim B(n,p)\leftrightarrow P(X=k)=C^k_{n}p^kq^{n-k}$  
	1. $M_{X}(u)=pe^u+q$    $M_{X^n}(u)=(pe^u+q)^n$
	2. $EX=np$
	3. $DX=Var(X)=npq$  $DX=E(X-EX)^2=E{X^2-2XE(X)+(E(X))^2}=E(X^2)-(E(X))^2$
	4. 二项分布B(n, p)的最大可能值k *存在，且
$$k^* = 
\begin{cases} 
(n+1)p \text{ 或 } (n+1)p-1, & \text{当}(n+1)p\text{为整数时}, \\
\lfloor (n+1)p \rfloor, & \text{当}(n+1)p\text{为非整数时}.
\end{cases}$$
2. $X\sim Ge(P)\leftrightarrow PX=k)=q^{k-1}p\leftrightarrow P(X>k)=\sum^{\infty}_{i=k+1}q^{i-1}p=q^k$, 则
	1. $M_{X}=\sum_{k=1}^{\infty}e^{uk}q^{k-1}p=\frac{p}{q}\sum^{\infty}_{k=1}[qe^u]^k=\frac{p}{q} \frac{qe^u}{1-qe^u}=\frac{pe^u}{1-qe^u}$    
	2. $EX=\frac{1}{q}$
	3. $DX=\frac{q}{p^2}$
	4. X是正整数，则下列三条等价
		1. $X\sim Ge(p)$
		2. X是具有“无记忆性的”，i.e.$P(X>m+n|X>m)=P(X>n)$
		3. $P(X=m+n|X>m)=P(X>n)=P(X=n)$