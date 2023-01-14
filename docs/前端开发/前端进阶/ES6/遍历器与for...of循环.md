---
title: 遍历器与for...of循环
category:
  - 前端进阶
  - ES6
---

Iterator 是一个统一的`遍历方式`, 我们一般**不会直接**使用 Iterator 去遍历

## for...of 的用法

[mdn 文档](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/for...of)

1.认识 for...of：**Iterator 的封装**

```js
const arr = [1, 2, 3, 4]
for (const item of arr) {
  console.log(item)
}
```

2. 与 break,continue 一起使用

```js
const arr = [1, 2, 3, 4]
for (const item of arr) {
  if (item === 2) {
    break
    // continue
  }
  console.log(item)
}
```

3. 在 for...of 中取得数组的索引

- keys()得到的是索引的可遍历对象，可以遍历出索引值

```js
const arr = [1, 2, 3, 4]
for (const key of arr.keys()) {
  console.log(key)
}
```

- values()得到的是值的可遍历对象，可以遍历出值，`多此一举`，和直接使用 for...of 方法效果一样

- entries()得到的是索引+值组成的`数组`的可遍历对象

```js
const arr = [11, 21, 31, 4]
// 解构赋值
for (const [key, value] of arr.entries()) {
  console.log(key, value)
}
```

## 原生可遍历与非原生可遍历

1. 什么是可遍历

只要有 **[Symbol.iterator]** 方法，就是可遍历的，只要可遍历，就可以使用 for...of 循环来统一遍历

2. 原生可遍历的有哪些？

- 数组
- 字符串
- Set
- Map
- arguments
- NodeList

3. 非原生可遍历的有哪些？ 对象

## 使用了 Iterator 的场合

1. 数组的展开运算符

2. 数组的解构赋值

```js
const [a, b] = 'hi'
const [a, b] = new Set([3, 4])
```

**只要是原生可遍历的就可以按照数组的方式展开，解构**

## 遍历总结

### for

- 用于遍历`数组`,`字符串`,`类数组对象`(NodeList,arguments)

- 可以使用 break,continue 语句

### forEach

**forEach 方法对数组的每个元素执行一次给定的函数**

- 用于遍历`数组`, `Set`和`Map`数据结构
- 可以通过回调函数参数传入**value,key 和自身**,同时可以改变 this 指向(**回调函数为非箭头函数时**)

- **不能使用 break 和 continue 语句**

[map 和 forEach:数组中 forEach() 和 map() 的区别](https://blog.csdn.net/weixin_46837985/article/details/112211133)

### for in

[JavaScript for...in 循环出来的对象属性顺序到底是什么规律？](https://blog.csdn.net/weixin_34051201/article/details/91377138)

- 用于遍历`数组`(**不推荐，for...in 不应该用于迭代一个关注索引顺序的 `Array`**),`对象`,`字符串`
- 只能获得 key,**没有 value**
- 可以使用 break 和 continue 语句

### for of

- 用于遍历`数组`,`字符串`,`Set`,`Map`,`NodeList`,`arguments`(**原生可遍历**),**不能直接遍历对象**
- 默认获得 value,但可以通过 keys(),values(),entries()获得对应可遍历对象
- 可以使用 break 和 continue 语句
