---
title: 'deepseek'
date: 2025-01-28 00:00:00
tags:
- 'AI'
categories:
- 'AI'
---

## 本地运行deepseek模型

### ollama安装  
ollama是AI模型部署平台  
[ollama官网：https://ollama.com](<https://ollama.com>)  
[ollama github：https://github.com/ollama/ollama](<https://github.com/ollama/ollama>)  
下载Windows版本，直接安装
```bash
# windows cmd 查看是否安装好
ollama
```

### deepseek模型

镜像和显卡对应关系：1.5b 模型，4GB显存。7b、8b 模型，8GB显存。14b 模型，12GB显存。32b 模型，24GB显存。  
拉取deepseek模型并运行。  
```bash
ollama list 
ollama pull deepseek-r1:8b
ollama run deepseek-r1:8b
# 停止运行
ollama stop deepseek-r1:8b
```

### Page Assist

谷歌浏览器扩展程序安装Page Assist。  
可以使用浏览器窗口访问deepseek模型。  

