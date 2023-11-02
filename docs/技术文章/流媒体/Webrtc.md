---
title: 'Webrtc'
date: 2023-09-21 12:00:00
tags:
- 'meida'
categories:
- '流媒体'
---
# Webrtc

WebRTC是一个由Google发起的实时通讯解决方案，其中包含视频音频采集，编解码，数据传输，音视频展示等功能，我们可以通过技术快速地构建出一个音视频通讯应用。虽然其名为WebRTC，但是实际上它不光支持Web之间的音视频通讯，还支持Android以及IOS端，此外由于该项目是开源的，我们也可以通过编译C++代码，从而达到全平台的互通。

## 源码地址

[DEMO](https://github.com/zz-media/webrtc)

## 交互流程

### ice整体流程

![ice流程](./Webrtc.assets/ice.jpg)

### 信令流程

![ice流程](./Webrtc.assets/signal.jpg)
![信令说明](./Webrtc.assets/signal2.jpg)

### 连接建立流程:

![连接建立](./Webrtc.assets/peer.png)

## 服务搭建

### coturn

#### turnserver.conf配置
vi /build/coturn/turnserver.conf
```
listening-ip=0.0.0.0
listening-port=3478
external-ip=124.220.1.36
realm=ruijie.asia
min-port=60000
max-port=60100
lt-cred-mech
user=admin:123456
cli-password=654321
```

docker启动

```
docker run -d --name turn --network=host -v /build/coturn/turnserver.conf:/etc/coturn/turnserver.conf coturn/coturn
```

```
docker run -d --name turn -p 3478:3478 -p 3478:3478/udp -p 5349:5349 -p 5349:5349/udp -p 60000-60100:60000-60100/udp -v /build/coturn/turnserver.conf:/etc/coturn/turnserver.conf coturn/coturn
```

#### turnserver.conf加密配置

进入docker容器生成秘钥

```
openssl req -x509 -newkey rsa:2048 -keyout /build/coturn/turn_server_pkey.pem -out /build/coturn/turn_server_cert.pem -days 99999 -nodes
```

```
listening-ip=0.0.0.0
listening-port=3478
tls-listening-port=5349
external-ip=124.220.1.36
realm=ruijie.asia
min-port=60000
max-port=60100
lt-cred-mech
user=admin:123456
cli-password=654321
cert=/etc/coturn/turn_server_cert.pem
pkey=/etc/coturn/turn_server_pkey.pem
```

docker启动host

```
docker run -d --name turn --network=host -v /build/coturn/:/etc/coturn/ coturn/coturn
```

docker启动network

```
docker run -d --name turn --network=server-network -p 3478:3478 -p 3478:3478/udp -p 5349:5349 -p 5349:5349/udp -p 60000-60100:60000-60100/udp -v /build/coturn/:/etc/coturn/ coturn/coturn
```

#### turnserver.conf redis配置、web配置
```
listening-ip=0.0.0.0
listening-port=3478
tls-listening-port=5349
external-ip=124.220.1.36
realm=ruijie.asia
min-port=60000
max-port=60100
lt-cred-mech
user=admin:123456
cert=/etc/coturn/turn_server_cert.pem
pkey=/etc/coturn/turn_server_pkey.pem
redis-userdb="ip=redis dbname=5 port=6379 password=zz@Redis connect_timeout=30"
redis-statsdb="ip=redis dbname=6 port=6379 password=zz@Redis connect_timeout=30"
web-admin
web-admin-ip=0.0.0.0
web-admin-port=8080
```
```
docker run -d -p 6379:6379 --name redis --network=server-network redis:6.0.1 --requirepass "zz@Redis"
```
```
docker run -d --name turn --network=server-network -p 8080:8080 -p 3478:3478 -p 3478:3478/udp -p 5349:5349 -p 5349:5349/udp -p 60000-60100:60000-60100/udp -v /build/coturn/:/etc/coturn/ coturn/coturn
```
redis中添加turn用户
```
turnadmin -a -N "ip=redis dbname=5 port=6379 password=zz@Redis  connect_timeout=30" -u userzz -r ruijie.asia -p zzuser
```
redis中添加admin用户
```
turnadmin -A -N "ip=redis dbname=5 port=6379 password=zz@Redis  connect_timeout=30" -u adminzz -r ruijie.asia -p zzadmin
```
验证数据库中是否添加成功
```
turnadmin -l --redis-userdb="ip=redis dbname=5 port=6379 password=zz@Redis  connect_timeout=30"
```
#### turnserver.conf 动态秘钥
方案：redis保存临时用户，参考https://blog.csdn.net/anshichuxuezhe/article/details/128430147
java md5生成代码
```
        String username = "usertest";
        String realm = "ruijie.asia";
        String password = "usertest";
        String input = username + ":" + realm + ":" + password;
        try {
            MessageDigest md = MessageDigest.getInstance("MD5");
            byte[] inputBytes = input.getBytes();
            byte[] hashBytes = md.digest(inputBytes);
            StringBuilder hexString = new StringBuilder();
            for (byte hashByte : hashBytes) {
                hexString.append(String.format("%02x", hashByte));
            }
            System.out.println(username +" MD5 Hash: " + hexString.toString());
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        }
```
### nginx

```
docker network ls
创建网络
docker network create -d bridge server-network
docker run -d -p 80:80 --name mynginx nginx
查看nginx的配置文件目录
docker exec -it mynginx /bin/bash
docker cp -a mynginx:/etc/nginx/ /build/nginx/conf/
docker cp -a mynginx:/usr/share/nginx/html/ /build/nginx/html/
docker stop mynginx
docker rm mynginx
docker run -d -p 80:80 -p 443:443 -v /build/nginx/html/:/usr/share/nginx/html/ -v /build/nginx/conf/:/etc/nginx/ --name nginx --network server-network nginx
```

访问测试 http://ruijie.asia
申请SSL证书并放在/etc/nginx/目录下
conf配置

```
server {
    listen       443 ssl;
    server_name  localhost;
    charset 'utf-8';
    ssl_certificate      ruijie.asia.crt;
    ssl_certificate_key  ruijie.asia.key;

    location / {
        root   /usr/share/nginx/html;
        index  index.html index.htm;
    }

    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   /usr/share/nginx/html;
    }

}
```

访问测试 https://ruijie.asia

### server-java

编译demo工程 https://github.com/zz-media/webrtc/tree/main/server-java

```
docker run -d -p 18080:18080 -p 19000:19000 -v /build/server-java:/usr/local/app --name server-java --network server-network openjdk:8u272-jdk  java -jar -server -Xms256M -Xmx512M /usr/local/app/server-java.jar
```

ng conf新增配置

```
server {
    location /socket.io/ {
        # socket所在ip和端口号
        proxy_pass http://server-java:19000/socket.io/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    } 
}
```

### client-vue

编译demo工程 https://github.com/zz-media/webrtc/tree/main/server-java
放到ng目录下
访问 https://124.220.1.36/media-web
