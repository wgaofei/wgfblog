---
title: vue3+vite3.0项目支持路径别名
isOriginal: true
tag:
  - vite3
  - vue3
category:
  - 开发日志
  - Vue
---

## 让编辑器认识@

修改 jsconfig.json

```json
{
  "compilerOptions": {
    "baseUrl": "./",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

## 让 vite 认识@

::: warning 注意事项

1. 不能在 vite.config.js 使用@导入文件
2. 使用 commonjs 语法导入 path 模块会报错，使用 import 语法导入，又会报`__dirname is not defined in ES module scope`,在 vue2+webpack 这样做是可以正确运行的。vite 项目不可以，现在下面这种方式可以正确运行。

:::

修改 vite.config.js

```js
import path from 'path'

import { fileURLToPath } from 'url'

const __newDirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__newDirname, 'src'),
    },
  },
})
```
