---
title: 'Vue3'
date: 2024-3-7 12:00:00
tags:
- 'vue'
- 'js'
categories:
- '前端'
---

## Axios

```bash
npm install axios
```

main.js

```js
import { createApp } from 'vue';
import App from './App.vue';
import axios from 'axios';

const app = createApp(App);

// 将 axios 挂载到全局
app.config.globalProperties.$axios = axios;

app.mount('#app');

```

使用 Axios：

```js
<template>
  <div>
    <button @click="fetchData">Fetch Data</button>
  </div>
</template>

<script setup>
import { getCurrentInstance } from 'vue';

const { proxy } = getCurrentInstance();

const fetchData = () => {
  proxy.$axios.get('/demo/test')
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      console.error(error);
    });
};

const fetchData2 = async () => {
  try {
    const response = await proxy.$axios.get('/demo/test2');
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};
</script>

```
