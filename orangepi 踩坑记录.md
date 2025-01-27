---
title: orangepi 踩坑记录
tags: 
categories: dairy
date: " 2025-01-27T20:20:00+08:00 "
modify: " 2025-01-27T20:20:00+08:00 "
dir: dairy
share: false
cdate: " 2025-01-27 "
mdate: " 2025-01-27 "
---

# OrangePi AIpro 开发板上手

## 1. 硬件准备

1. OrangePi AIpro 开发板
2. DP充电头+USB Type-C充电线
3. MicroUSB数据线
4. TF卡
5. 电脑

## 2. 系统烧录

1. 下载系统镜像

    [镜像下载地址](https://cloud.tsinghua.edu.cn/d/b5d368ead32f4ab9b147/)  

    建议选择Desktop版本

2. 解压系统镜像
3. 使用Etcher工具烧录系统镜像到TF卡

    [Etcher下载地址](https://www.balena.io/etcher/)

4. 烧录完成后，将TF卡插入OrangePi AIpro开发板
5. 将背部的拨码开关拨到TF卡启动位置
6. 使用DP充电头+USB Type-C充电线连接电源

## 3. 串口调试

1. 使用MicroUSB数据线连接电脑和OrangePi AIpro开发板
2. 使用串口调试工具连接串口

    [串口调试工具下载地址](https://mobaxterm.mobatek.net/)

3. 打开串口调试工具，选择串口号，波特率设置为115200
4. 重启OrangePi AIpro开发板，查看串口输出信息
5. 默认用户HwHiAiUser，密码Mind@123
6. Vscode配置ssh HwHiAiUser@<ip>

## 4. 连接网络

1. 使用network manager连接网络
    ```shell
    sudo nmtui
    ```

```
2. 连接后输入
```

    ```shell

    ifconfig

    ```

    在wlan0下找到ip地址

3. 在电脑端使用ssh连接

## 5. 设置VNC Server

1. 自己电脑上下载tightvnc viewer [下载地址](https://www.tightvnc.com/download.php)
2. 在OrangePi AIpro上安装tightvncserver（这个自带了）
3. 修改~/.vnc/xstartup为以下内容

    ```shell

    # Uncomment the following two lines for normal desktop:

    # unset SESSION_MANAGER

    # exec /etc/X11/xinit/xinitrc

    #export XKL_XMODMAP_DISABLE=1

    unset SESSION_MANAGER

    unset DBUS_SESSION_BUS_ADDRESS

    [ -x /etc/vnc/xstartup ] && exec /etc/vnc/xstartup

    [ -r $HOME/.Xresources ] && xrdb $HOME/.Xresources

    xsetroot -solid grey

    vncconfig -iconic &

    x-terminal-emulator -geometry 1920x1080 -ls -title "$VNCDESKTOP Desktop" &

    xfce4-session &

    mate-session &

    startkde &

    gnome-panel &

    gnmoe-settings-daemon &

    metacity &

    nautilus &

    gnome-terminal &

    gnome-session &

    ```

4. 终端输入：

    ```shell

    vncserver

    ```

5. 打开log查看端口号
6. 电脑端连接

## 6. 手机网络摄像头

1. 下载DroidCam App （iOS和Android都有）

## 7. 运行jupyter server

1. 运行~/samples/start_notebook.sh
2. 在输出中能够找到jupyter server的地址（127.0.0.1:8888/token一串）
3. 在自己电脑浏览器上打开这个地址
4. 运行里面的模型

## 8. 环境问题

1. 降级setuptools: pip install setuptools==62.3.4
2. 缺少一个包:av

    ```shell

    pip install av==8.0.0

    ```

3. 在~/.bashrc中添加以下内容

    ```shell

    . /usr/local/Ascend/ascend-toolkit/set_env.sh

    export PYTHONPATH=/usr/local/Ascend/thirdpart/aarch64/acllite:$PYTHONPATH

    export DDK_PATH=/usr/local/Ascend/ascend-toolkit/latest

    export NPU_HOST_LIB=$DDK_PATH/runtime/lib64/stub

    ```

4. 运行

    ```shell

    source ~/.bashrc

    ```

## 9. 运行YOLOv5

1. 按照[YOLOv5官方教程](https://gitee.com/ascend/EdgeAndRobotics/tree/master/Samples/YOLOV5Video#%E7%9B%AE%E6%A0%87%E6%A3%80%E6%B5%8Byolov5s)下载模型、转换模型、下载数据。
2. 运行scripts文件夹下的sample_run.sh
