---
title: 'Pinia'
date: 2024-3-7 12:00:00
tags:
- 'vue'
- 'Pinia'
categories:
- '前端'
---
# Pinia
官网 https://pinia.web3doc.top/  
demo源码地址 https://github.com/zz-html/vue3-ts-project/tree/main/pinia-demo
## 创建工程
```
pnpm create vite
```

输入vue项目名称，pinia-demo
选择Vue  
选择TypeScript  
cd 进入到 pinia-demo 项目路径下
```
pnpm install
pnpm run dev
```

浏览器打开 http://127.0.0.1:5173/  
## 使用Pinia
```
pnpm install pinia
```

在项目的 src/store 目录下，新建一个 index.ts 文件作为Pinia的入口文件，并创建根Store

```
import { createPinia } from "pinia"

const store = createPinia()

export default store
```

在 main.ts 中引入使用即可  

```
import store from './store'

app.use(store)
```

开发中需要根据模块划分状态，这样才方便我们统一管理不同模块下的状态。在 src/store/modules 目录下新建一个 user.ts

```
import { defineStore } from 'pinia'

const useUserStore = defineStore('user', {
    state: () => ({
        count: 1,
    }),
    getters: {
        doubleCount: (state) => state.count * 2,
    },
    actions: {
        increment() {
            this.count++;
        },
    },
})
export default useUserStore
```

页面调用

```
<template>
  <div class="store">
    <div>
      <p>Count: {{ store.count }}</p>
      <p>Double Count: {{ store.doubleCount }}</p>
      <button @click="store.increment">Increment</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import useUserStore from './store/modules/user'
const store = useUserStore()
</script>
```
