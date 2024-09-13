---
title: 'OpenTelemetry'
date: 2024-09-11 00:00:00
tags:
- 'OpenTelemetry'
categories:
- 'OpenTelemetry'
---
官网: [https://opentelemetry.io/zh/](https://opentelemetry.io/zh/)  
文档（墙）: [https://opentelemetry.opendocs.io/docs/collector/getting-started/](https://opentelemetry.opendocs.io/docs/collector/getting-started/)  

## 创建 Collector 配置文件

```yaml
receivers:
  otlp:
    protocols:
      grpc:
        endpoint: "0.0.0.0:4317"
      http:

exporters:
  logging:
    loglevel: debug
  otlp:
    endpoint: jaeger:4317
    tls:
      insecure: true

service:
  pipelines:
    traces:
      receivers: [otlp]
      processors: []
      exporters: [logging, otlp]

```

## 创建 Docker Compose 文件

```yaml
services:
  otel-collector:
    image: otel/opentelemetry-collector:latest
    container_name: otel-collector
    ports:
      - "4317:4317"   # OTLP gRPC 端口
      - "55681:55681" # OTLP HTTP 端口
    volumes:
      - /build/opentelemetry/otel-config.yaml:/etc/otel-config.yaml # 挂载配置文件
    command:
      - --config=/etc/otel-config.yaml

  jaeger:
    image: jaegertracing/all-in-one:latest
    container_name: jaeger
    ports:
      - "5775:5775/udp"
      - "6831:6831/udp"
      - "6832:6832/udp"
      - "5778:5778"
      - "16686:16686" # Jaeger UI 端口
      - "14250:14250"
      - "14268:14268"
      - "14269:14269"
      - "9411:9411"

```

启动所有服务  
docker-compose up -d  
验证部署  
访问 Jaeger UI： 在浏览器中打开 http://zzdev.asia:16686，可以查看追踪数据。

## springboot引入

源码：https://github.com/ZHANG-ZHENG/spring-boot-study/tree/master/opentelemetry  

```xml
    <dependency>
        <groupId>io.opentelemetry</groupId>
        <artifactId>opentelemetry-api</artifactId>
        <version>1.42.1</version>
    </dependency>
    <dependency>
        <groupId>io.opentelemetry</groupId>
        <artifactId>opentelemetry-sdk</artifactId>
        <version>1.42.1</version>
    </dependency>
    <dependency>
        <groupId>io.opentelemetry</groupId>
        <artifactId>opentelemetry-exporter-otlp</artifactId>
        <version>1.42.1</version>
    </dependency>
    <dependency>
        <groupId>io.opentelemetry.instrumentation</groupId>
        <artifactId>opentelemetry-spring-boot-starter</artifactId>
        <version>2.7.0</version>
    </dependency>

```

```yaml
otel:
  exporter:
    otlp:
      endpoint: "http://zzdev.asia:4317"  # OTLP gRPC 端点
      protocol: "grpc"                   # 指定协议为 gRPC
  service:
    name: "my-spring-boot-app"           # 设置服务名称
  traces:
    sampler: "always_on"                 # 设置采样策略（always_on 表示全量采样）

```

## springboot无侵入引入

从 OpenTelemetry 官方网站或 GitHub Releases 下载最新版本的 Java Agent：  
https://github.com/open-telemetry/opentelemetry-java-instrumentation/releases  
下载 opentelemetry-javaagent.jar 文件。  

源码：https://github.com/ZHANG-ZHENG/spring-boot-study/tree/master/spring-boot-study-demo  

```bash
java -javaagent:opentelemetry-javaagent.jar -Dotel.exporter.otlp.endpoint=http://zzdev.asia:4317 -Dotel.exporter.otlp.protocol=grpc -Dotel.service.name=springboot-demo-service -jar demo-1.0.0.jar

```
