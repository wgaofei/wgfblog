---
title: let和const
tag:
  - let
  - const
category:
  - 前端进阶
  - ES6
---

::: tip ES6 圣经
[ECMAScipt 6 入门](https://es6.ruanyifeng.com/)
:::

## let 和 const

`let` 声明变量,`const` 声明常量。

```js
{
  var username = 'Frank'
  let age = 18
  const sex = 'male'
}
console.log(username) //  Frank
console.log(age) // 报错
console.log(sex) // 报错
```

- `var`,`let` 声明的是变量，变量一旦初始化以后，还可以重新赋值。
- `const`声明的是常量，常量一旦初始化，就不能重新赋值了，否则会报错。
- `let`,`const`所声明的变量/常量，只在自身所在的代码块内有效。

::: tip for 循环的计数器，就很适合使用 let 命令

```js
var a = []
for (let i = 0; i < 10; i++) {
  a[i] = function () {
    console.log(i)
  }
}
a[6]() // 6
```

上面代码中，变量 i 是 let 声明的，当前的 i 只在本轮循环有效，所以每一次循环的 i 其实都是一个新的变量，所以最后输出的是 6。你可能会问，如果每一轮循环的变量 i 都是重新声明的，那它怎么知道上一轮循环的值，从而计算出本轮循环的值？这是因为 JavaScript 引擎内部会记住上一轮循环的值，初始化本轮的变量 i 时，就在上一轮循环的基础上进行计算。

如果是 var 声明的 i 呢？所有的输出都是 10，变量 i 是 var 命令声明的，在全局范围内都有效，所以全局只有一个变量 i。每一次循环，变量 i 的值都会发生改变，而循环内被赋给数组 a 的函数内部的 console.log(i)，里面的 i 指向的就是全局的 i。也就是说，所有数组 a 的成员里面的 i，指向的都是同一个 i，导致运行时输出的是最后一轮的 i 的值，也就是 10。

需要注意的是， **for 循环还有一个特别之处，就是设置循环变量的那部分是一个父作用域，而循环体内部是一个单独的子作用域。**

```js
for (let i = 0; i < 3; i++) {
  let i = 'abc'
  console.log(i)
}
// abc
// abc
// abc
```

上面代码正确运行，输出了 3 次 abc。这表明**函数内部的变量 i 与循环变量 i 不在同一个作用域**，有各自单独的作用域（同一个作用域不可使用 let 重复声明同一个变量）。

:::

## const

使用 `const` **声明一个只读的常量**，一旦声明，就必须立即初始化，不能留到最后赋值。

const 声明的常量，允许在不重新赋值的情况下修改它的值：

1.  基本类型数据类型是做不到的
2.  引用数据类型可以

```js
const person = { username: 'bob' }
person.username = 'zhang'
```

::: tip 原因
`const` **实际上保证的，并不是变量的值不得改动，而是变量指向的那个内存地址所保存的数据不得改动**。对于简单类型的数据（数值、字符串、布尔值），值就保存在变量指向的那个内存地址，因此等同于常量。但对于复合类型的数据（主要是对象和数组），变量指向的内存地址，保存的只是一个指向实际数据的指针，**const 只能保证这个指针是固定的（即总是指向另一个固定的地址），至于它指向的数据结构是不是可变的，就完全不能控制了**,所以可以在不重新赋值的情况下修改 const 声明的引用数据类型。
:::

如果真的想将对象冻结，应该使用 `Object.freeze` 方法,那如果对象的属性也是对象呢？

```js
const constantize = obj => {
  Object.freeze(obj)
  Object.keys(obj).forEach(key => {
    if (typeof obj[key] === 'object') {
      Object.freeze(obj[key])
      console.log(i)
    }
  })
}
```

## 声明最佳实践

1. 简单一看能用 let 的场景就用 let,比如 for 循环中的循环变量
2. **判断不了就用 const,报错好修改**

## let,const 与 var 的区别

### 重复声明

var 允许重复声明，let,const 不允许不允许在相同作用域内，重复声明同一个变量。

```js
var a = 1
var a = 2
console.log(a) //2
let b = 2
let b = 3
console.log(b) //SyntaxError: Identifier 'b' has already been declared
```

### 变量提升

var 会提升变量的**声明**到当前作用域的顶部，let，const 不存在变量提升,**所声明的变量/常量一定要在声明后使用，否则报错**。

```js
console.log(a) // undefined
var a = 2
console.log(b) // ReferenceError: Cannot access 'b' before initialization
let b = 2
```

### 修改声明的变量

var 和 let 可以修改

const 声明一个只读的常量。一旦声明，常量的值就不能改变。并且 const 声明时，**必须立即初始化**

### 暂时性锁区

只要块级作用域内存在 let,const 命令，它所声明的变量就“绑定”（binding）这个区域，**不再受外部的影响**。

```js
const a = 100

function fun() {
  console.log(a) // 报错Cannot access 'a' before initialization（在初始化之前无法访问“a”）
  const a = 1
}
fun()
```

上面代码中，在 `const` 命令声明变量 a 之前，属于变量 a 的“`死区`”

在代码块内，使用 `let`、`const` 命令声明变量或常量之前，**该变量或常量都是不可用的**。这在语法上，称为`暂时性死区`(_temporal dead zone_，简称 `TDZ`)

### window 对象的属性和方法

全局作用域中，var 声明的变量和通过 function 声明的函数，会自动变成 window 对象的属性或方法，let、 const 不会。

### 块级作用域

`let`，`const`会形成块级作用域，`var` 没有块级作用域。

没有块级作用域会导致两个问题：

**内层变量可能会覆盖外层变量**:

```js
var tmp = new Date()

function f() {
  // 由于var存在变量声明提升 导致tmp的声明提升到f 函数的顶部，此时tmp的值为undefined
  console.log(tmp)
  if (false) {
    var tmp = 'hello world'
  }
}

f() // undefined
```

**用来计数的循环变量泄露为全局变量**:

```js
for (var i = 0; i < 3; i++) {
  console.log(i) // 0,1,2
}
console.log(i) // 3
```

**ES6 允许块级作用域的任意嵌套，内层作用域可以定义外层作用域的同名变量**，块级作用域的出现，实际上使得获得广泛应用的匿名立即执行函数表达式（匿名 IIFE）不再必要了。

有哪些块级作用域?

```js
{}
for(){}
while(){}
do{}while()
if(){}
switch(){}
```

## let,const 的应用

场景：点击那个按钮弹出按钮上的数字

es6 之前(利用闭包解决)：

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>let 和 const 的应用</title>
    <style>
      body {
        padding: 50px 0 0 150px;
      }

      .btn {
        width: 100px;
        height: 100px;
        margin-right: 20px;
        font-size: 80px;
        cursor: pointer;
      }
    </style>
  </head>
  <body>
    <button class="btn">0</button>
    <button class="btn">1</button>
    <button class="btn">2</button>

    <script>
      // var
      // var btns = document.querySelectorAll('.btn');

      // for (var i = 0; i < btns.length; i++) {
      //   btns[i].addEventListener(
      //     'click',
      //     function () {
      //       console.log(i); // 永远都是3！
      //     },
      //     false
      //   );
      // }

      // 利用闭包解决
      var btns = document.querySelectorAll('.btn')

      for (var i = 0; i < btns.length; i++) {
        ;(function (index) {
          btns[index].addEventListener(
            'click',
            function () {
              console.log(index)
            },
            false
          )
        })(i)
      }
    </script>
  </body>
</html>
```

es6 写法：

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>let 和 const 的应用</title>
    <style>
      body {
        padding: 50px 0 0 150px;
      }

      .btn {
        width: 100px;
        height: 100px;
        margin-right: 20px;
        font-size: 80px;
        cursor: pointer;
      }
    </style>
  </head>
  <body>
    <button class="btn">0</button>
    <button class="btn">1</button>
    <button class="btn">2</button>

    <script>
      let btns = document.querySelectorAll('.btn')

      for (let i = 0; i < btns.length; i++) {
        btns[i].addEventListener(
          'click',
          function () {
            console.log(i)
          },
          false
        )
      }
    </script>
  </body>
</html>
```
