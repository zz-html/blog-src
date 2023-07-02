#!/usr/bin/env sh
 
# ȷ���ű��׳������Ĵ���
set -e
 
# ���ɾ�̬�ļ�
npm run build
rm -rf ../blog/*

# ��build���ɵ�distĿ¼��������һ��Ŀ¼��
cp -rf dist/* ../blog/

# �������ɵ��ļ���
cd ../blog

# git��ʼ����ÿ�γ�ʼ����Ӱ������
git init
git add -A
git commit -m 'deploy'
git branch -M main

# �������Ҫ���� https://USERNAME.github.io
git push -f git@github.com:zz-html/blog.git main