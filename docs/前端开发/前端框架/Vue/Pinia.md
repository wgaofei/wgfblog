---
title: Pinia
category:
  - 前端框架
  - Vue
icon: vue
order: 6
---

<center>
  <img src='https://zfh-nanjing-bucket.oss-cn-nanjing.aliyuncs.com/blog-images/pinia_logo.svg' style='width:200px;height:200px'>
</center>
[Pinia](https://pinia.vuejs.org/zh/) 是` Vue` 的存储库，它允许您跨组件/页面共享状态。它被认为是`vuex 5.0`

[Pinia](https://pinia.vuejs.org/zh/) 同时支持`Vue 2` 和 `Vue 3`

本文示例使用 `vue3` 和组合式 `api`

## 安装

```bash
yarn add pinia
# 或者使用 npm
npm install pinia
```

## main.js

```js
import { createPinia } from 'pinia'

app.use(createPinia())
```

## Store

Store 是使用 `defineStore()` 定义的，并且它需要一个**唯一**名称，作为第一个参数传递：

```js
// stores/xxx.js

import { defineStore } from 'pinia'

// useStore 可以是 useUser、useCart 之类的任何东西
// 第一个参数是应用程序中 store 的唯一 id
export const useStore = defineStore('main', {
  // other options...
})
```

### 使用 store

```vue
import { storeToRefs } from 'pinia' import { useUserStore} from '../store/user'
<script setup>
const userStore = useUserStore()
const { name } = storeToRefs(userStore)
</script>
```

### actions

可以把`actions`视为组件中的方法：

```js
export const useCounterStore = defineStore('count', {
  state: () => ({
    counter: 0,
  }),
  actions: {
    increment() {
      this.counter++
    },
  },
})
```

### 使用 actions

```js
import { useCounterStore } from '../stores/counterStore'

// setup
const counterStore = useCounterStore()
const incrementAndPrint = () => {
  counterStore.increment()
}
```

### state

有时我们可能需要使 state 在模板中保持响应式，此时应该使用计算属性：

```js
let tabs = computed(() => tabsStore.tabs)
```

## 热更新

当你更改`store`中的代码时，可能项目无法正常工作

这时你需要加入热更新支持,如果你有多个 store,那么每个 store 都需要添加

vite：

```js
// store/user.js
import { defineStore, acceptHMRUpdate } from 'pinia'
export const useUserStore = defineStore('user', {
  // other options...
  state: () => {
    return {
      role: '',
      token: '',
    }
  },
})
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
}
```
