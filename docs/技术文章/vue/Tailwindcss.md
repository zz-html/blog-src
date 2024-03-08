---
title: 'Tailwindcss'
date: 2024-3-7 12:00:00
tags:
- 'vue'
- 'Tailwindcss'
categories:
- '前端'
---
# Tailwindcss
官网 https://www.tailwindcss.cn/  
demo源码地址 https://github.com/zz-html/vue3-ts-project/tree/main/tailwindcss-demo
## 创建工程
```
pnpm create vite
```

输入vue项目名称，tailwindcss-demo
选择Vue  
选择TypeScript  
cd 进入到 tailwindcss 项目路径下
```
pnpm install
pnpm run dev
```

浏览器打开 http://127.0.0.1:5173/  
## 使用TailwindCSS
```
// 安装
pnpm install -D tailwindcss
// 创建你自己的 create your tailwind.config.js 配置文件。
npx tailwindcss init
```

在 tailwind.config.js 配置文件中添加所有模板文件的路径。

```
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{vue,js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

style/input.css @tailwind 指令添加每一个 Tailwind 功能模块。

```
@tailwind base;
@tailwind components;
@tailwind utilities;
```

tailwind编译。

```
npx tailwindcss -i ./src/style/input.css -o ./src/style/output.css
```

main.ts 导入

```
import "./style/output.css";
```

页面使用
```
<template>
  <div class="w-32 h-32 bg-blue-500">
    TailwindCSS
  </div>
  <div class="p-2 text-gray-900 font-semibold">首页</div>
  <div class="p-2 text-gray-900 font-semibold">学习TailwindCSS</div>
  <div class="p-2 text-gray-900 font-semibold">TailwindCSS的设计哲学</div>
  <div class="p-2 text-gray-900 font-semibold">最佳实践</div>
</template>
```
