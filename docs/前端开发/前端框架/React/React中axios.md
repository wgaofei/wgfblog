---
title: React中axios
order: 6
category:
  - 前端框架
  - React
icon: wangluo
---

// TODO： 待整理
[官方文档](https://www.axios-http.cn/)

[React 系列十三 - axios 库的使用](https://mp.weixin.qq.com/s/MTj0Or-QFmv9a7BugO6--A)

## 为什么不是...?

1. Jquery-ajax:没什么好说的
2. Fetch API：Fetch 是一个 low-level（底层）的 API，没有帮助你封装好各种各样的功能和实现

## 为什么是 Axios？

Vue 作者也是推荐在 vue 中使用 axios(尤大说好就是好 👌)

## Axios 的基本使用

### 发送请求

react 一般在`componentDidMount`生命周期函数中发生网络请求

🌰 例子：

```jsx
import { PureComponent } from 'react'
import axios from 'axios'

export default class App extends PureComponent {
  constructor() {
    super()
    this.state = {
      res: {},
    }
  }
  render() {
    return <div>url:{this.state.res.url}</div>
  }
  async componentDidMount() {
    const res = await axios.get('https://httpbin.org/get')
    this.setState({
      res: res.data,
    })
  }
}
```

- 发送 get 请求
- 发送 post 请求
- 多个请求的合并

```js
const request1 = axios.get('https://httpbin.org/get', {
  params: { name: 'why', age: 18 },
})
const request2 = axios.post('https://httpbin.org/post', {
  name: 'kobe',
  age: 40,
})
axios
  .all([request1, request2])
  .then(([res1, res2]) => {
    console.log(res1, res2)
  })
  .catch((err) => {
    console.log(err)
  })
```

- 使用 async、await 发送请求

```js
async componentDidMount() {
    const result = await axios.get("https://httpbin.org/get", {
      params: {
        name: "kobe",
        age: 40
      }
    })
    console.log(result);
  }
```

### 配置信息

- 优先是请求的 config 参数配置
- 其次是实例的 default 中的配置
- 最后是创建实例时的配置

### 拦截器

```js
axios.interceptors.request.use(config => {
  // 1.发送网络请求时，在页面中添加一个loading组件作为动画；

  // 2.某些网络请求要求用户必须登录，可以在请求中判断是否携带了token，没有携带token直接跳转到login页面；

  // 3.对某些请求参数进行序列化；
  return config;
}, err => {
  return err;
})

axios.interceptors.response.use(response => {
  return response.data;
}, err => {
  if (err && err.response) {
    switch (err.response.status) {
      case400:
        err.message = "请求错误";
        break;
      case401:
        err.message = "未授权访问";
        break;
    }
  }
  return err;
})
```

## axios 库的二次封装

### 为什么要封装？

为什么我们要对 axios 进行二次封装呢？

- 默认情况下我们是可以直接使用 axios 来进行开发的；
- 但是我们考虑一个问题，假如有 100 多处中都直接依赖 axios，突然间有一天 axios 出现了重大 bug，并且该库已经不再维护，这个时候你如何处理呢？
- 大多数情况下我们会寻找一个新的网络请求库或者自己进行二次封装；
- 但是有 100 多处都依赖了 axios，方便我们进行修改吗？我们所有依赖 axios 库的地方都需要进行修改
- 如果是自己进行了二次封装，并且暴露一套自己的 API:只需要重新封装另一个网络请求库(只需要修改一个 js 文件)

### axios 二次封装

创建一个 service 文件夹（其他名字都可以），用于存放所有的网络请求相关的内容。

创建文件 config.js，用于存放一些配置信息：

[React 使用.env.\*进行环境部署](https://blog.csdn.net/sayUonly/article/details/118225775)

```js
export const TIMEOUT = 5000

const devBaseURL = 'https://httpbin.org'
const proBaseURL = 'https://production.org'
console.log(process.env.NODE_ENV)
export const baseURL =
  process.env.NODE_ENV === 'development' ? devBaseURL : proBaseURL
```

创建 request.js，用于封装请求对象：

```js
import axios from 'axios'

import { TIMEOUT, baseURL } from './config'

const instance = axios.create({
  timeout: TIMEOUT,
  baseURL: baseURL,
})

axios.interceptors.request.use(
  (config) => {
    // 1.发送网络请求时，在页面中添加一个loading组件作为动画；

    // 2.某些网络请求要求用户必须登录，可以在请求中判断是否携带了token，没有携带token直接跳转到login页面；

    // 3.对某些请求参数进行序列化；
    return config
  },
  (err) => {
    return err
  }
)

instance.interceptors.response.use(
  (response) => {
    return response.data
  },
  (err) => {
    if (err && err.response) {
      switch (err.response.status) {
        case 400:
          err.message = '请求错误'
          break
        case 401:
          err.message = '未授权访问'
          break
      }
    }
    return err
  }
)

export default instance
```

测试：

```js
equest({
  url: '/get',
  params: {
    name: 'why',
    age: 18,
  },
})
  .then(console.log)
  .catch(console.error)

request({
  url: '/post',
  method: 'post',
  data: {
    name: 'kobe',
    age: 40,
  },
})
  .then(console.log)
  .catch(console.error)
```
