#!/usr/bin/env sh
 
# ȷ���ű��׳������Ĵ���
set -e
 
# ���ɾ�̬�ļ�
npm run build
rm -rf ../zz-html.github.io/*

# ��build���ɵ�distĿ¼��������һ��Ŀ¼��
cp -rf dist/* ../zz-html.github.io/

# �������ɵ��ļ���
cd ../zz-html.github.io

# git��ʼ����ÿ�γ�ʼ����Ӱ������
git init
git add -A
git commit -m 'deploy'
git branch -M main

# �������Ҫ���� https://USERNAME.github.io
git push -f git@github.com:zz-html/zz-html.github.io.git main