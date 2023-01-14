---
title: 关于async和await
category:
  - 开发日志
  - JS
---

## 发现问题

某天在牛客上刷到这样一道题：

```js
async function getData() {
  return await Promise.resolve('I made it!')
}
const data = getData()
console.log(data)
```

问输出结果是什么？我想这也太简单了，肯定是返回一个成功状态的 Promise 啊，一看答案我傻了，居然是一个未解决的 Promise.

最后我好好想了想，之前的理解一直是错的。看了几篇大牛的文章，我学废了

## 问题分析

看回上面那段代码，async 函数返回一个 Promise 对象，可以使用 then 方法添加回调函数。 当函数执行的时候，一旦遇到 await 就会**先返回**，等到触发的异步操作完成，再接着执行函数体内后面的语句。但是最重要的一点是**异步函数 async 始终返回一个 promise**。其实这段代码这样写可能更好理解：

```js
async function getData() {
  const res = await Promise.resolve('I made it!')
  return res
}
const data = getData()
console.log(data)
```

当调用`getData()`的时候，遇到了`await`那么就会暂停在这一行，等待后面的`Promise`返回结果，`getData()`会先返回，此时返回的肯定是一个`Promise`，**_而且是等待状态的_**。接着执行调用`getData()`之后（`async `函数调用不会造成阻塞，它内部所有的阻塞都被封装在一个` Promise` 对象中异步执行）的代码，那么这行代码`console.log(data)`便会紧跟着执行,此时打印的结果肯定是一个`处于等待状态的Promise`。

```js
data.then((res) => console.log(res)) // I made it!
```

这段代码可能也会让人困惑：

```js
async function getData() {
  console.log('async执行开始')
  return await Promise.resolve('123')
}
const data = getData()
console.log(data)
const c = data.then((res) => {
  console.log(res)
})
console.log(c) // 这里也打印的是一个等待状态的Promise
```

其实是一样的，分析以下这段代码的执行顺序：调用 getData(),打印`async执行开始`,遇到 await，先返回。打印 data,一个等待状态的 Promise，先执行同步代码，打印 c,结果一样。返回去执行异步任务，先清掉所有微任务，async 返回了成功状态的 Promise 且参数为`123`,接着执行 then 里面的代码，打印出`123`

## 备注

`async` 函数和普通 函数没有什么不同，他只是表示这个函数里有异步操作的方法，并返回一个` Promise` 对象
翻译过来其实就是：

```js
// async/await 写法
async function async1() {
  console.log('async1 start')
  await async2()
  console.log('async1 end')
}
// Promise 写法
async function async1() {
  console.log('async1 start')
  // 如果传入的参数是Promise对象，则参数的结果决定了Promise.resolve()的结果
  Promise.resolve(async2()).then(() => console.log('async1 end'))
}

async function async2() {
  console.log('async2')
}
```

显然，`await`后面的代码，实际上相当于`Promise`中`then`里面的代码

`await` 会暂停代码在该行上，直到 `promise` 完成，然后返回结果值。在暂停的同时，其他正在等待执行的代码就有机会执行了。

如果在函数中 `return` 一个直接量，`async` 会把这个直接量通过 `Promise.resolve()` 封装成 `Promise` 对象。

还有一点就是如果 async 函数没有返回值，又该如何？很容易想到，它会返回 `Promise.resolve(undefined)`

## 参考文章

- [await MDN 文档](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/await)

- [async 和 await:让异步编程更简单](https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/Asynchronous/Async_await)

- [理解 JavaScript 的 async/await](https://segmentfault.com/a/1190000007535316)

- [每日一题（五）async](https://blog.csdn.net/MFWSCQ/article/details/105109727)

- [async 函数的含义和用法(阮一峰)](http://www.ruanyifeng.com/blog/2015/05/async.html)

- [一次搞懂- JS 事件循环之宏任务和微任务](https://segmentfault.com/a/1190000039971920)
