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

