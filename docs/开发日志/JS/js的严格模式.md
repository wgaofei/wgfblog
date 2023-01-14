---
title: js的严格模式
tag:
  - 严格模式
category:
  - 开发日志
  - JS
---

JavaScript 中除了正常运行模式（非严格模式），还有一种严格模式（strict mode），顾名思义，这种模式使得 JavaScript 在更严格的模式下运行

严格模式消除了 JavaScript 语法的一些不合理、不严谨之处，减少一些怪异行为。
消除代码运行一些不安全之处，保证代码运行的安全。
提高代码编译效率，增加运行速度。
为未来新版本的 JavaScript 做好铺垫。

开启严格模式：

1、为整个脚本开启严格模式，需要在所有语句之前放一个特定语句"use strict"

2、为函数开启严格模式，把"use strict"声明放在函数体的所有语句之前

严格模式与非严格模式（正常运行模式）的常见区别:

(1) 在非严格模式中，如果一个变量没有声明就赋值，默认是全局变量，不会出现报错。严格模式禁止这种用法，添加"use strict"开启严格模式后，会出现报错

```js
'use strict'
num = 1 //Uncaught ReferenceError: num is not defined
```

(2) 在非严格模式中，全局作用域中的函数内部 this 默认指向 window,在严格模式中，全局作用域中的函数内部 this 默认指向 undefined

```js
function fn() {
  console.log(this) // window
}
fn()
```

```js
function fn() {
  'use strict'
  console.log(this) // undefined
}
fn()
```

(3) 非严格模式下，允许重复变量命名;在严格模式下，不允许重复变量命名

```js
function sum(a, a, c) {
  return a + a + c
}
```

```js
'use strict'
function sum(a, a, c) {
  // !!! 语法错误
  return a + a + c // 代码运行到这里会出错
}
```
