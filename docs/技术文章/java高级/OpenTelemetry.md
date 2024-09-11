---
title: 'OpenTelemetry'
date: 2024-09-11 00:00:00
tags:
- 'OpenTelemetry'
categories:
- 'OpenTelemetry'
---

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