---
title: 'Vue工具'
date: 2023-11-29 12:00:00
tags:
- 'vue'
- 'js'
categories:
- '前端'
---
https://zhuanlan.zhihu.com/p/654327710
# nvm nodejs管理工具
通过它可以安装和切换不同版本的nodejs  
下载：https://github.com/coreybutler/nvm-windows/releases  
nvm 常用命令
```
# 检查是否安装成功  
nvm version
# 显示可以安装的所有nodejs版本
nvm list available 
# 安装指定版本的nodejs
nvm install <version> 
# 显示已安装版本列表
nvm list
# 使用指定版本node
nvm use [version]
# 卸载指定版本node
nvm uninstall <version>
```
# nodejs安装
查看nodejs 所有版本  
```
nvm list available
```
nvm install [version] 安装我们需要的版本
```
nvm install x.x.x
```
使用指定版本的nodejs
```
nvm use 16.17.1
```
查看当前nodejs版本
```
# 查看node版本
node -v
# 查看npm版本
npm -v
```
# 镜像管理工具NRM 安装
输入npm install -g nrm 后回车即可全局安装NRM镜像管理工具  
nrm镜像管理工具使用
```
# 查看镜像列表
nrm ls
# 查看当前使用的镜像
nrm current 
# 添加镜像
nrm add <名称> <远程地址或私服地址>
# 删除镜像
nrm del <名称>
# 切换镜像
nrm use <名称> 
# 测试镜像网络传输速度
nrm test <名称>
# 查看nrm版本号
nrm <-version | -V> 
# 查看nrm相关信息
nrm <-help | -h>
# 打开镜像主页
nrm home <名称> [browser]
# 上传npm包或命令程序
nrm publish [<tarball>|<folder>]
```
# 创建Vue3项目
Vite 需要 Node.js 版本 14.18+，16+
使用npm 、yarn 、pnpm 其中一种命令安装即可
```
npm create vite@latest
yarn create vite
pnpm create vite
```
输入vue项目名称，我们这里就叫vite-project  
选择Vue  
选择Javascript 和TypeScript  
进入到 vite-project 项目路径下
```
npm install
npm run dev
```
浏览器打开 http://127.0.0.1:5173/  