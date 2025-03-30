---
title: Untitled
tags: 
categories: 
date: 2025-03-30T21:53:44+08:00
modify: 2025-03-30T21:53:44+08:00
dir: 
share: false
cdate: 2025-03-30T21
mdate: 2025-03-30T21
---
[WSL2 中获取摄像头数据流 – IYATT-yx 的博客](https://blog.iyatt.com/?p=10249)
```bash
1. **Windows 安装 `usbipd-win`**：
    
    powershell
    
    不换行复制代码
    
    ```powershell
    winget install usbipd
    ```
    
2. **绑定摄像头设备到 WSL**：
    
    powershell
    
    不换行复制代码
    
    ```powershell
    usbipd list                   # 查看摄像头 BUSID
    usbipd bind --busid <BUSID>   # 绑定设备
    ```
    
3. **WSL 连接摄像头**：
    
    bash
    
    不换行复制代码
    
    ```bash
    sudo apt install linux-tools-generic
    sudo usbip attach -r 127.0.0.1 -b <BUSID>
    ls /dev/video*                # 检查是否出现 video0
    ```
    
4. **运行 YOLOv5**：
    
    bash
    
    不换行复制代码
    
    ```bash
    python detect.py --source 0   # 直接调用摄像头
    ```
```