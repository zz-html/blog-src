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
## python虚拟环境
可以使用虚拟环境（virtual environment）来在本地文件夹中安装 Python 项目的依赖。虚拟环境是一个隔离的 Python 环境，允许你在项目级别管理依赖，而不影响全局 Python 环境。
### 创建虚拟环境
```
python -m venv venv
```
### 激活虚拟环境
```
# Windows 系统
venv\Scripts\activate
# macOS/Linux 系统
source venv/bin/activate
```
### 安装依赖、运行项目
```
pip install -r requirements.txt
```
使用虚拟环境运行项目  
django项目运行 python manage.py runserver
### 退出虚拟环境
```
deactivate
```

## 镜像
### 临时更改镜像源
常用国内镜像源：  
阿里云: https://mirrors.aliyun.com/pypi/simple  
腾讯云: https://mirrors.cloud.tencent.com/pypi/simple  
清华大学: https://pypi.tuna.tsinghua.edu.cn/simple  
中国科技大学: https://pypi.mirrors.ustc.edu.cn/simple  
```
pip install <package-name> -i https://pypi.tuna.tsinghua.edu.cn/simple
```
### 永久更改镜像源
```
pip config set global.index-url https://pypi.tuna.tsinghua.edu.cn/simple
# 查看
pip config list
# 恢复默认镜像源
pip config set global.index-url https://pypi.org/simple
```

## 打包exe
安装 PyInstaller
```
pip install pyinstaller
```
打包命令
```
pyinstaller --onefile my_script.py
```
--onefile 选项会将所有的依赖文件打包成一个.exe 文件  
--icon=icon.ico：为 .exe 文件添加图标  
--noconsole(多个平台) 或 --windowed 选项防止在 GUI 应用程序中打开命令行窗口  


## Jupyter Notebook
安装 Jupyter Notebook：pip install notebook  
启动 Jupyter Notebook：在命令行中输入 jupyter notebook  
在浏览器中打开 Jupyter Notebook 服务器 http://localhost:8888，选择或创建一个 .ipynb 文件。
