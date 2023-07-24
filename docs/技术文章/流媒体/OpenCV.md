---
title: 'OpenCV'
date: 2023-07-23 12:00:00
tags:
- 'meida'
categories:
- '流媒体'
---
> 加载图像（cv::imread）

imread功能是加载图像文件成为一个Mat对象，其中第一个参数表示图像文件名称第二个参数，表示加载的图像是什么类型，支持常见的三个参数值IMREAD_UNCHANGED (<0) 表示加载原图，不做任何改变IMREAD_GRAYSCALE ( 0)表示把原图作为灰度图像加载进来IMREAD_COLOR (>0) 表示把原图作为RGB图像加载进来

> 显示图像 (cv::namedWindos 与cv::imshow)

namedWindos功能是创建一个OpenCV窗口，它是由OpenCV自动创建与释放，你无需取销毁它。常见用法namedWindow("Window Title", WINDOW_AUTOSIZE)WINDOW_AUTOSIZE会自动根据图像大小，显示窗口大小，不能人为改变窗口大小WINDOW_NORMAL,跟QT集成的时候会使用，允许修改窗口大小。imshow根据窗口名称显示图像到指定的窗口上去，第一个参数是窗口名称，第二参数是Mat对象

> 修改图像 (cv::cvtColor)

cvtColor的功能是把图像从一个彩色空间转换到另外一个色彩空间，有三个参数，第一个参数表示源图像、第二参数表示色彩空间转换之后的图像、第三个参数表示源和目标色彩空间如：COLOR_BGR2HLS 、COLOR_BGR2GRAY 等
cvtColor(image, gray_image, COLOR_BGR2GRAY);

> 保存图像(cv::imwrite)

保存图像文件到指定目录路径  
只有8位、16位的PNG、JPG、Tiff文件格式而且是单通道或者三通道的BGR的图像才可以通过这种方式保存  
保存PNG格式的时候可以保存透明通道的图片  
可以指定压缩参数  
