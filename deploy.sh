#!/usr/bin/env sh
 
# 确保脚本抛出遇到的错误
set -e
 
# 生成静态文件
npm run build
rm -rf ../zz-html.github.io/*

# 将build生成的dist目录拷贝至上一层目录中
cp -rf dist/* ../zz-html.github.io/

# 进入生成的文件夹
cd ../zz-html.github.io

# git初始化，每次初始化不影响推送
git init
git add -A
git commit -m 'deploy'
git branch -M main

# 如果你想要部署到 https://USERNAME.github.io
git push -f git@github.com:zz-html/zz-html.github.io.git main