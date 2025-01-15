---
title: 'stm32'
date: 2024-12-01 12:00:00
tags:
- '嵌入式'
- 'stm32'
categories:
- '嵌入式'
---

::: tip 说明

stm32
:::

[Keil官网](<https://www.keil.com>)

<!-- more -->
## 安装

安装Keil5 MDK  
安装器件支持包  
软件注册  
安装STLINK驱动  
安装USB转串口驱动  

## Keil配置

建立工程文件夹，Keil中新建工程，选择型号  
工程文件夹里建立Start、Library、User等文件夹，复制固件库里面的文件到工程文件夹  
工程里对应建立Start、Library、User等同名称的分组，然后将文件夹内的文件添加到工程分组里  
工程选项，C/C++，Include Paths内声明所有包含头文件的文件夹  
工程选项，C/C++，Define内定义USE_STDPERIPH_DRIVER  
工程选项，Debug，下拉列表选择对应调试器，Settings，Flash Download里勾选Reset and Run  

## GPIO 模式分类
* 输入模式  
GPIO_Mode_IN_FLOATING（浮空输入）：输入引脚没有上拉或下拉电阻，适用于外部信号完全控制的场景。  
GPIO_Mode_IPU（上拉输入）：输入引脚内部连接到高电平，默认读取高电平。  
GPIO_Mode_IPD（下拉输入）：输入引脚内部连接到低电平，默认读取低电平。  
* 输出模式  
GPIO_Mode_Out_PP（推挽输出）：输出高低电平，能提供较强驱动能力。  
GPIO_Mode_Out_OD（开漏输出）：需要外部上拉电阻，常用于 I²C 等总线通信。  
* 复用功能模式  
GPIO_Mode_AF_PP（复用推挽输出）：用于外设复用功能，例如 UART、SPI、I²C 等。  
GPIO_Mode_AF_OD（复用开漏输出）：常用于 I²C 总线。  
* 模拟模式  
GPIO_Mode_AIN（模拟输入）：用于 ADC 或其他模拟信号输入。  