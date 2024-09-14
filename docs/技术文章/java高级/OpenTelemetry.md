---
title: 'OpenTelemetry'
date: 2024-09-11 00:00:00
tags:
- 'OpenTelemetry'
categories:
- 'OpenTelemetry'
---
官网: [https://opentelemetry.io/zh/](https://opentelemetry.io/zh/)  
文档: [https://opentelemetry.opendocs.io/docs/collector/getting-started/](https://opentelemetry.opendocs.io/docs/collector/getting-started/)  

## 服务部署

### 创建 Collector 配置文件

```yaml
receivers:
  otlp:
    protocols:
      grpc:
        endpoint: "0.0.0.0:4317"
      http:
        endpoint: "0.0.0.0:4318"

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

### 创建 Docker Compose 文件

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
访问 Jaeger UI： 在浏览器中打开[http://zzdev.asia:16686](http://zzdev.asia:16686)，可以查看追踪数据。

## Vue引入

源码：[https://github.com/zz-html/vue3-project/tree/main/OpenTelemetry](https://github.com/zz-html/vue3-project/tree/main/OpenTelemetry)  

npm install

```bash
npm install @opentelemetry/sdk-trace-web @opentelemetry/auto-instrumentations-web @opentelemetry/exporter-trace-otlp-http

```

创建一个新的配置文件 opentelemetry.js，在 src 目录下，用于初始化 OpenTelemetry 并配置自动埋点。

```javascript
// src/opentelemetry.js
import { WebTracerProvider } from '@opentelemetry/sdk-trace-web';
import { BatchSpanProcessor } from '@opentelemetry/sdk-trace-base';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { registerInstrumentations } from '@opentelemetry/instrumentation';
import { getWebAutoInstrumentations } from '@opentelemetry/auto-instrumentations-web';
import { Resource } from '@opentelemetry/resources';
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';

// 配置 Resource 并设置 SERVICE_NAME
const resource = new Resource({
  [SemanticResourceAttributes.SERVICE_NAME]: 'vue-service', // 替换为你的服务名称
})

// 创建 Tracer 提供者
const provider = new WebTracerProvider({
  resource: resource, // 设置 Resource
});

// 配置 OTLP 导出器，将数据发送到 OpenTelemetry Collector
const exporter = new OTLPTraceExporter({
  //url: 'http://zzdev.asia:4318/v1/traces', // 替换为你的 OpenTelemetry Collector 端点
  url: '/v1/traces', // 替换为你的 OpenTelemetry Collector 端点
});

// 使用批量处理器来发送 Spans
provider.addSpanProcessor(new BatchSpanProcessor(exporter));

// 注册自动探测的仪器
registerInstrumentations({
  instrumentations: [
    getWebAutoInstrumentations({
      '@opentelemetry/instrumentation-fetch': {
        enabled: true,
        propagateTraceHeaderCorsUrls: [/.*/], // 配置要追踪的 Fetch 请求
      },
      '@opentelemetry/instrumentation-xml-http-request': {
        enabled: true,
        propagateTraceHeaderCorsUrls: [/.*/], // 配置要追踪的 XHR 请求
      },
      '@opentelemetry/instrumentation-user-interaction': {
        enabled: true, // 捕获用户交互事件（如点击、输入）
      },
      '@opentelemetry/instrumentation-document-load': {
        enabled: true, // 捕获页面加载时间
      },
      '@opentelemetry/instrumentation-history': {
        enabled: true, // 捕获路由导航
      },
    }),
  ],
});

// 注册提供者
provider.register();

export default provider;

```

在 src/main.js 中引入 opentelemetry.js 配置文件，以初始化 OpenTelemetry 自动埋点：

```javascript
import { createApp } from 'vue';
import App from './App.vue';
import './opentelemetry'; // 引入 OpenTelemetry 配置

createApp(App).mount('#app');
```

手动埋点

```javascript
// 在组件或服务中
import { trace } from '@opentelemetry/api';
// 获取 Tracer 实例
const tracer = trace.getTracer('vue-frontend');

const manuData = () => {
  console.log("manuData");
  const span = tracer.startSpan('fetch-data');
  span.addEvent('do something1 successfully');
  span.addEvent('do something2 successfully');
  // span.recordException(error);
  span.end();
};
```

vite.config.js代理配置：

```javascript
export default defineConfig({
  plugins: [vue()],
  server: {
    host: '0.0.0.0', // 局域网别人也可访问
    port: 5000,    
    proxy: {
      // 配置反向代理
      '/v1/traces': {
        target: 'http://zzdev.asia:4318', // 后端 API 地址
        changeOrigin: true,
        pathRewrite: {
          '^/v1/traces': '/v1/traces'
        }
      },
    },  
  }
})
```

## springboot无侵入引入

从 OpenTelemetry 官方网站或 GitHub Releases 下载最新版本的 Java Agent：  
源码：[https://github.com/open-telemetry/opentelemetry-java-instrumentation/releases](https://github.com/open-telemetry/opentelemetry-java-instrumentation/releases)  
下载 opentelemetry-javaagent.jar 文件。  

源码：[https://github.com/ZHANG-ZHENG/spring-boot-study/tree/master/spring-boot-study-demo](https://github.com/ZHANG-ZHENG/spring-boot-study/tree/master/spring-boot-study-demo)  

```bash
java -javaagent:opentelemetry-javaagent.jar -Dotel.exporter.otlp.endpoint=http://zzdev.asia:4317 -Dotel.exporter.otlp.protocol=grpc -Dotel.service.name=springboot-demo-service -jar demo-1.0.0.jar
```

## springboot引入

源码：[https://github.com/ZHANG-ZHENG/spring-boot-study/tree/master/opentelemetry](https://github.com/ZHANG-ZHENG/spring-boot-study/tree/master/opentelemetry)  

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
