---
title: Promise
tag:
  - Promise
  - 异步
category:
  - 前端进阶
  - ES6
---

## 初识 Promise

`promise是es6进行异步编程的新解决方案`--- 旧方案指的是`回调函数`

从语法上来说，Promise 是一个构造函数

从功能上来说，Promise 对象用来封装一个异步操作并可以获取其成功或失败的结果值

## 为什么要使用 Promise?

1. 指定回调函数的方式更加灵活：

- 旧的：必须在启动异步任务前指定
- promise：启动异步任务 → 返回 promise 对象 → 给 promise 对象绑定回调函数（甚至可以在异步任务结束后指定多个）

```js
// 一个promise指定多个回调如下
let p2 = new Promise((resolve, reject) => {
  resolve(1)
})
p2.then(value => {
  console.log('第一个', value)
})
p2.then(value => {
  console.log('第二个', value)
})
// 不止成功的promise会如此，失败的promise亦是如此，如下：
let p3 = new Promise((resolve, reject) => {
  reject(2)
})
p3.then(
  () => {},
  value => {
    console.log('第一个', value)
  }
)
p3.then(
  () => {},
  value => {
    console.log('第二个', value)
  }
)
```

2. 支持链式调用，Promise 可以用来解决`回调地狱`(**外部回调函数异步执行的结果是嵌套的回调执行的条件**)的问题

回调地狱不方便阅读，也不便于异常处理

![回调地狱](https://zfh-nanjing-bucket.oss-cn-nanjing.aliyuncs.com/blog-images/%E5%9B%9E%E8%B0%83%E5%9C%B0%E7%8B%B1.png)

## Promise 的基本流程

![promise的基本流程](https://zfh-nanjing-bucket.oss-cn-nanjing.aliyuncs.com/blog-images/promise%E7%9A%84%E5%9F%BA%E6%9C%AC%E6%B5%81%E7%A8%8B.png)

## Promise 的基本用法

1. 实例化构造函数生成实例对象

```js
const p = new Promise(executor)
```

(1). `executor函数`： 执行器(resolve,reject)=>{}

(2). `resolve函数`：内部定义成功时调用的函数

(3).`reject函数`：内部定义失败时调用的函数

::: warning 注意
executor 会在 promise 内部立即同步调用，异步操作在执行器中执行
:::

2. Promise 对象状态属性:`PromiseState`

（1）一开始声明后不进行任何操作，就是 `pending`,未完成

（2）执行 `resolve`函数，变成`fulfilled`，已成功

（3）执行`reject`函数，变成 `rejected`，已失败

（4）Promise 函数的两个参数可以任意命名，但是功能并不会改变

（5）Promise 的状态一旦发生变化，就不会再改变，即**Promise 函数里的 resolve 或是 reject 只执行第一个**

```js
const p = new Promise((resolve, reject) => {
  // pending->fulfilled
  // resolve();     //可以传递参数，在then()方法的第一个回调函数中接收
  // pending->rejected
  //reject();        //可以传递参数，在then()方法的第二个回调函数中接收
})
```

3. Promise 对象结果值属性：`PromiseResult`

保存对象成功（resolve）或者失败（reject）的结果

## 实例方法

### Promise.prototype.then()

1. 什么时候执行？

（1）`resolve()`:状态 pending->fulfilled 的时候，执行 then 方法的第一个回调函数

（2）`reject()`:状态 pending->rejected 的时候，执行 then 方法的第二个回调函数

```js
const p = new Promise((resolve, reject) => {
  // resolve 和 reject 函数的参数
  // resolve('success');  //传的是字符串
  // resolve({ username: 'frank' });  //传的是对象
  reject(new Error('reason')) //传的是错误对象
})
p.then(
  data => {
    //data接收的是成功状态下，resolve函数传递的参数
    console.log('success', data)
  },
  err => {
    //err接收的是失败状态下，reject函数传递的参数
    console.log('error', err)
  }
)
```

2. 执行后返回的值也是一个 promise 对象，then 方法可以**连续调用**，并且每次调用后都会返回一个新的 Promise 对象。

```js
const p = new Promise((resolve, reject) => {
  resolve() //改变状态为fulfilled
})
p.then(
  () => {},
  () => {}
)
  .then()
  .then()
```

3. then 方法返回的 Promise 对象的状态

**由 then()指定的回调函数执行的结果决定**

① 如果抛出异常, 新 promise 变为 rejected, reason 为抛出的异常

```js
const p = new Promise((resolve, reject) => {
  resolve('frank')
})
p.then(value => {
  console.log(value)
  // throw '错啦!'
}).then(
  a => {
    // 没有返回值相当于return undefined,即return一个成功状态的promise
    console.log(a) // undefined
    console.log('成功了!')
  },
  err => {
    console.log(err)
  }
)
```

② 如果返回的是非 promise 的任意值, 新 promise 变为 resolved, value 为返回的值
::: tip 提示
没有返回值相当于 return undefined,即 return 一个成功状态的 promise,结果为 undefined
:::

```js
const p = new Promise((resolve, reject) => {
  resolve('frank')
})
p.then(value => {
  console.log(value)
  return 456
}).then(value => {
  console.log(value) // 456
})
```

③ 如果返回的是另一个新 promise, 此 promise 的结果就会成为新 promise 的结果

```js
const p = new Promise((resolve, reject) => {
  resolve('frank')
})
p.then(value => {
  console.log(value)
  return new Promise((resolve, reject) => {
    resolve('123')
  })
}).then(value => {
  console.log(value) // 123
})
```

### Promise.prototype.catch()

1. 有什么用

- catch 专门用来处理 rejected 状态
- catch **本质是 then 的特例**,即它只能指定失败的回调,不能指定成功的回调

2. 基本用法
   一般总是建议，Promise 对象后面要跟 catch 方法，这样可以处理 Promise 内部发生的错误

```js
const p = new Promise((resolve, reject) => {
  reject('err')
})
  .catch(err => {
    console.log(err)
    return 123
  })
  .then(data => {
    console.log(data) // 123
  })
```

### Promise.prototype.finally()

`finally()`方法返回一个 `Promise`。在 `promise` 结束时，无论结果是 `fulfilled` 或者是`rejected`，都会执行指定的回调函数。**这为在 `Promise` 是否成功完成后都需要执行的代码提供了一种方式。**

```js
p.finally(function () {
  // 返回状态为(resolved 或 rejected)
})
```

## 构造函数方法

### Promise.resolve()

Promise.resolve()， 返回一个**成功**/失败的 Promise 对象的一种简写形式

```js
new Promise(resolve => resolve('foo'))
// 简写
Promise.resolve('foo')
```

- 参数

1. 一般参数(非 Promise 对象),返回的结果为成功 Promise 对象

```js
Promise.resolve('foo').then(data => {
  console.log(data)
})
```

2. 以 Promise 对象当做参数

如果传入的参数是 Promise 对象，则`参数的结果`决定了`Promise.resolve()`的结果

```js
const p = Promise.resolve(
  new Promise((resolve, reject) => {
    reject(123)
  })
)
console.log(p) // Promise {<rejected>: 123}
p.catch(err => {
  console.log(err)
})
```

### Promise.reject()

Promise.reject()，返回一个失败状态 Promise 对象的一种简写形式

```js
new Promise((resolve, reject) => {
  reject('reason')
})

// 等价于
Promise.reject('reason')
```

与 Promise.resolve()不同，Promise.reject()不管什么参数,它返回的结果**永远**都是失败的，而且传入什么参数，失败的结果就是什么(传入 promise,失败的结果也是 promise)

### Promise.all()

关注多个 Promise 对象的状态变化，可以传入多个 Promise 实例，**包装成一个新的 Promise 实例返回**

Promise.all() 的状态变化与所有传入的 Promise 实例对象状态有关,所有状态都变成 resolved，最终的状态才会变成 resolved,**只要有一个变成 rejected，最终的状态就变成 rejected**

基本用法

```js
const delay = ms => {
  return new Promise(resolve => {
    setTimeout(resolve, ms)
  })
}

const p1 = delay(1000).then(() => {
  console.log('p1 完成了')

  return 'p1'
  // return Promise.reject('reason1');
})

const p2 = delay(2000).then(() => {
  console.log('p2 完成了')

  return 'p2'
  // return Promise.reject('reason2');
})

const p = Promise.all([p1, p2])
p.then(
  data => {
    console.log(data) //["p1", "p2"]
  },
  err => {
    console.log(err) //如果p1失败，会立即输出reason，不会等到p2执行完 ,控制台打印reason1
  }
)
```

### Promise.race()和 Promise.allSettled()

1. Promise.race()  
   关注多个 Promise 对象的状态变化，**最终状态取决于第一个 Promise 对象的状态**。  
   如果第一个成功了，那最终的就成功；如果第一个失败了，那最终的就失败

```js
const delay = ms => {
  return new Promise(resolve => {
    setTimeout(resolve, ms)
  })
}

const p1 = delay(1000).then(() => {
  console.log('p1 完成了')

  return 'p1'
  //   return Promise.reject('reason1');
})

const p2 = delay(2000).then(() => {
  console.log('p2 完成了')

  return 'p2'
  // return Promise.reject('reason2');
})

const r = Promise.race([p1, p2])
r.then(
  data => {
    console.log(data) //
  },
  err => {
    console.log(err)
  }
)
```

2. Promise.allSettled() 只会真实记录下各个 Promise 的表现，最终状态永远都是成功的

```js
const delay = ms => {
  return new Promise(resolve => {
    setTimeout(resolve, ms)
  })
}

const p1 = delay(1000).then(() => {
  console.log('p1 完成了')

  return 'p1'
  // return Promise.reject('reason');
})

const p2 = delay(2000).then(() => {
  console.log('p2 完成了')

  //   return 'p2';
  return Promise.reject('reason')
})

const allSettledPromise = Promise.allSettled([p1, p2])
allSettledPromise.then(data => {
  console.log(data)
  //   [
  //     { status: 'fulfilled', value: 'p1' },
  //   { status: 'rejected', reason: 'reason' }
  //   ]
})
```

### Promise.any()

传入的参数是一组 Promise 实例，**当所有 Promise 实例都变成 rejected 状态，返回的 Promise 才会变成 rejected 状态**，参数中只要有一个 Promise 改变为成功状态，则返回的 Promise 状态就是成功的状态。

#### 示例

（1）参数中只有一个成功状态的 Promise 实例

```js
// 失败
const p1 = new Promise((resolve, reject) => {
  reject()
})
// 失败
const p2 = new Promise((resolve, reject) => {
  reject()
})
// 成功
const p3 = new Promise(resolve => {
  resolve()
})
const res = Promise.any([p1, p3, p2])
console.log(res) // 返回成功状态的Promise
```

传入的一组 Promise 实例参数中，虽然 p1、p2 这两个是失败状态，但其中的 p3 是成功状态，所以 Promise.any()最终返回结果是成功状态的 Promise

（2）参数中全部是失败状态的 Promise 实例

```js
// 失败
const p1 = new Promise((resolve, reject) => {
  reject()
})
// 失败
const p2 = new Promise((resolve, reject) => {
  reject()
})
// 失败
const p3 = new Promise((resolve, reject) => {
  reject()
})
const res = Promise.any([p1, p3, p2])
console.log(res) // 返回失败状态的Promise
```

由于参数中的 p1、p2、p3 这个三个 Promise 实例都是失败状态的，所以 Promise.any()返回一个失败状态的 Promise 实例

**⭐ 特别注意 ⭐**:Promise.any()不会因为某个 Promise 实例变成失败状态而结束，这个方法用于返回第一个成功的 promise。只要有一个 Promise 成功此方法就会终止，它不会等待其他的 Promise 全部完成

```js
const p1 = new Promise((resolve, reject) => {
  reject('失败')
})

const p2 = new Promise((resolve, reject) => {
  setTimeout(resolve, 500, '最后完成')
})

const p3 = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, '第一个完成')
})

const res = Promise.any([p1, p2, p3])
res.then(value => {
  console.log(value)
})
```

上面这段代码中，p1 是失败状态，但 Promise.any()方法并没有结束，而是返回第一个成功的 Promise， 即 p3，当有一个 Promise 成功后，**就会终止**，**所以最终输出结果只有“第一个完成”，并没有“最后完成”内容。**

::: tip ⭐⭐ 总结 ⭐⭐
`all` 且逻辑，全部成功才会成功，一个失败，即失败，其余参数还继续执行。

`race`，只关心第一个执行，第一个成功或失败，即执行成功或失败，其余参数还继续执行。

`allStated` 只关心全部执行，不管参数是否成功或失败，最后只会执行成功，记录参数执行的状态。

`any` 或逻辑 有一个成功即成功，立刻执行成功，其余参数不执行。如果全部失败，执行失败。
:::

#### 实际应用场景

实际开发中，可能会有这样的需求：一次性加载多张图片，哪一张先加载出来就显示哪一张。那么此时就可以使用 Promise.any()方法实现效果。

## Promise 的关键问题

**1. Promise.all()/race()/allSettled()的参数，如果传的不是 Promise 数组，那么将自动转化成 Promise 数组**

```js
Promise.all([1, 2, 3]).then(data => {
  console.log(data) //[1, 2, 3]
})
// 等价于

Promise.all([Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)]).then(
  data => {
    console.log(data) //[1, 2, 3]
  }
)
```

::: tip 提示
不只是数组，任何可遍历的都可以作为参数
:::

**2. Promise.all/race/allSettled 的错误处理**

（1）错误既可以在每个 Promise 中单独处理

（2）也可以在 Promise.all/race/allSettled 中统一处理

（3）错误一旦被处理，就不会在其他地方再处理一遍

**3. 如何改变 promise 的状态**

(1) resolve(value): 如果当前是 pending 就会变为 resolved

(2) reject(reason): 如果当前是 pending 就会变为 rejected

(3) 抛出异常: `throw "出问题了"`,如果当前是 pending 就会变为 rejected

**4. 一个 promise 指定多个成功/失败回调函数, 都会调用吗?**

当 promise 改变为对应状态时都会调用

**5. 改变 promise 状态和指定回调函数谁先谁后?**

(1) 都有可能, 正常情况下是先指定回调再改变状态, 但也可以先改状态再指定回调

(2) 如何先改状态再指定回调?

① 在执行器中直接调用 resolve()/reject()

② 延迟更长时间才调用 then()

(3) 什么时候才能得到数据?

① 如果先指定的回调, 那当状态发生改变时, 回调函数就会调用, 得到数据

② 如果先改变的状态, 那当指定回调时, 回调函数就会调用, 得到数据

**6. promise 如何串连多个操作任务?**

promise 的 then()返回一个新的 promise, 通过 then 的链式调用串连多个同步/异步任务

**7. promise 异常传透?**

(1) 当使用 promise 的 then 链式调用时, 可以在最后指定失败的回调

(2) 前面任何操作出了异常, 都会传到最后失败的回调中处理

**8. 中断 promise 链?**

(1) 当使用 promise 的 then 链式调用时, 在中间中断, 不再调用后面的回调函数

(2) 有且只有一种办法: 在回调函数中返回一个 pending 状态的 promise 对象=>`return new Promise(()=>{})`

## Promise 的应用

- 异步加载图片

```js
const loadImgAsync = url => {
  return new Promise((resolve, reject) => {
    const img = new Image()

    img.onload = () => {
      resolve(img)
    }

    img.onerror = () => {
      reject(new Error(`Could not load image at ${url}`))
    }

    img.src = url
  })
}

const imgDOM = document.getElementById('img')
loadImgAsync('图片地址')
  .then(img => {
    console.log(img.src)
    setTimeout(() => {
      imgDOM.src = img.src
    }, 1000)
  })
  .catch(err => {
    console.log(err)
  })
```

- AJAX 请求

```js
/**
 * 封装一个函数 sendAJAX 发送 GET AJAX 请求
 * 参数   URL
 * 返回结果 Promise 对象
 */
function sendAJAX(url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.responseType = 'json'
    xhr.open('GET', url)
    xhr.send()
    //处理结果
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        //判断成功
        if (xhr.status >= 200 && xhr.status < 300) {
          //成功的结果
          resolve(xhr.response)
        } else {
          reject(xhr.status)
        }
      }
    }
  })
}

sendAJAX('https://api.apiopen.top/getJoke').then(
  value => {
    console.log(value)
  },
  reason => {
    console.warn(reason)
  }
)
```

## 手写 Promise

```js
//声明构造函数
function Promise(executor) {
  //添加属性
  this.PromiseState = 'pending'
  this.PromiseResult = null
  //声明属性
  this.callbacks = []
  //保存实例对象的 this 的值
  const self = this // self _this that
  //resolve 函数
  function resolve(data) {
    //判断状态
    if (self.PromiseState !== 'pending') return
    //1. 修改对象的状态 (promiseState)
    self.PromiseState = 'fulfilled' // resolved
    //2. 设置对象结果值 (promiseResult)
    self.PromiseResult = data
    //调用成功的回调函数
    setTimeout(() => {
      self.callbacks.forEach(item => {
        item.onResolved(data)
      })
    })
  }
  //reject 函数
  function reject(data) {
    //判断状态
    if (self.PromiseState !== 'pending') return
    //1. 修改对象的状态 (promiseState)
    self.PromiseState = 'rejected' //
    //2. 设置对象结果值 (promiseResult)
    self.PromiseResult = data
    //执行失败的回调
    setTimeout(() => {
      self.callbacks.forEach(item => {
        item.onRejected(data)
      })
    })
  }
  try {
    //同步调用『执行器函数』
    executor(resolve, reject)
  } catch (e) {
    //修改 promise 对象状态为『失败』
    reject(e)
  }
}

//添加 then 方法
Promise.prototype.then = function (onResolved, onRejected) {
  const self = this
  //判断回调函数参数
  if (typeof onRejected !== 'function') {
    onRejected = reason => {
      throw reason
    }
  }
  if (typeof onResolved !== 'function') {
    onResolved = value => value
    //value => { return value};
  }
  return new Promise((resolve, reject) => {
    //封装函数
    function callback(type) {
      try {
        //获取回调函数的执行结果
        let result = type(self.PromiseResult)
        //判断
        if (result instanceof Promise) {
          //如果是 Promise 类型的对象
          result.then(
            v => {
              resolve(v)
            },
            r => {
              reject(r)
            }
          )
        } else {
          //结果的对象状态为『成功』
          resolve(result)
        }
      } catch (e) {
        reject(e)
      }
    }
    //调用回调函数  PromiseState
    if (this.PromiseState === 'fulfilled') {
      setTimeout(() => {
        callback(onResolved)
      })
    }
    if (this.PromiseState === 'rejected') {
      setTimeout(() => {
        callback(onRejected)
      })
    }
    //判断 pending 状态
    if (this.PromiseState === 'pending') {
      //保存回调函数
      this.callbacks.push({
        onResolved: function () {
          callback(onResolved)
        },
        onRejected: function () {
          callback(onRejected)
        },
      })
    }
  })
}

//添加 catch 方法
Promise.prototype.catch = function (onRejected) {
  return this.then(undefined, onRejected)
}

//添加 resolve 方法
Promise.resolve = function (value) {
  //返回promise对象
  return new Promise((resolve, reject) => {
    if (value instanceof Promise) {
      value.then(
        v => {
          resolve(v)
        },
        r => {
          reject(r)
        }
      )
    } else {
      //状态设置为成功
      resolve(value)
    }
  })
}

//添加 reject 方法
Promise.reject = function (reason) {
  return new Promise((resolve, reject) => {
    reject(reason)
  })
}

//添加 all 方法
Promise.all = function (promises) {
  //返回结果为promise对象
  return new Promise((resolve, reject) => {
    //声明变量
    let count = 0
    let arr = []
    //遍历
    for (let i = 0; i < promises.length; i++) {
      //
      promises[i].then(
        v => {
          //得知对象的状态是成功
          //每个promise对象 都成功
          count++
          //将当前promise对象成功的结果 存入到数组中
          arr[i] = v
          //判断
          if (count === promises.length) {
            //修改状态
            resolve(arr)
          }
        },
        r => {
          reject(r)
        }
      )
    }
  })
}

//添加 race 方法
Promise.race = function (promises) {
  return new Promise((resolve, reject) => {
    for (let i = 0; i < promises.length; i++) {
      promises[i].then(
        v => {
          //修改返回对象的状态为 『成功』
          resolve(v)
        },
        r => {
          //修改返回对象的状态为 『失败』
          reject(r)
        }
      )
    }
  })
}
```
