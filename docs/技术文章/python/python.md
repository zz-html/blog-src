---
title: 'python'
date: 2023-12-11 12:00:00
tags:
- 'python'
categories:
- 'python'
---
# python
官网 https://www.python.org/
# python虚拟环境
可以使用虚拟环境（virtual environment）来在本地文件夹中安装 Python 项目的依赖。虚拟环境是一个隔离的 Python 环境，允许你在项目级别管理依赖，而不影响全局 Python 环境。
## 创建虚拟环境
```
python -m venv venv
```
## 激活虚拟环境
```
# Windows 系统
venv\Scripts\activate
# macOS/Linux 系统
source venv/bin/activate
```
## 安装依赖、运行项目
```
pip install -r requirements.txt
```
使用虚拟环境运行项目  
django项目运行 python manage.py runserver
## 退出虚拟环境
```
deactivate
```