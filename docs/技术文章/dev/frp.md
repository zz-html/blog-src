---
title: 'frp'
date: 2024-12-13 12:00:00
tags:
- 'frp'
categories:
- 'dev'
---

# frp
通过frp可以实现内网访问  
[官网：https://github.com/fatedier/frp](<https://github.com/fatedier/frp>) 

## 服务部署
官网下载版本压缩文件  
服务端配置文件frps.toml
```
bindAddr = "0.0.0.0"
bindPort = 7000
vhostHTTPPort = 80
webServer.addr = "0.0.0.0"
webServer.port = 7500
webServer.user = "admin"
webServer.password = "admin"
```
启动服务端
```bash
./frps -c frps.toml
```
访问服务端：http://101.35.20.226:7500/  

客户端配置文件frpc.toml
```
serverAddr = "101.35.20.226"
serverPort = 7000

[[proxies]]
name = "zz-nas"
type = "tcp"
localIP = "127.0.0.1"
localPort = 5000
remotePort = 5000
```
启动客户端
```bash
./frpc -c frpc.toml
```

## docker镜像
服务端镜像Dockerfile
```
FROM ubuntu:22.04
RUN mkdir -p /frp
WORKDIR /frp
COPY frps frps
COPY frps.toml frps.toml
ENTRYPOINT ["./frps", "-c","frps.toml"]
```
客户端镜像Dockerfile
```
FROM ubuntu:22.04
RUN mkdir -p /frp
WORKDIR /frp
COPY frpc frpc
COPY frpc.toml frpc.toml
ENTRYPOINT ["./frpc", "-c","frpc.toml"]
```
Dockerfile镜像已上传仓库，运行docker
```bash
docker run --network host -d --name frps registry.cn-hangzhou.aliyuncs.com/zzdocker/frps:0.61

docker run --network host -d --name frpc registry.cn-hangzhou.aliyuncs.com/zzdocker/frpc:0.61

docker run --network host -d -v /build/frpc/frpc2.toml:/frp/frpc.toml --name frpc registry.cn-hangzhou.aliyuncs.com/zzdocker/frpc:0.61
```