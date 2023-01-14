---
title: Array.prototype.slice.call()&Array.from()的应用和理解
category:
  - 开发日志
  - JS
---

Array.prototype.slice.call() 可将类数组(arguments,NodeList)，字符串(String)转换成数组。

Array.from() 可将类数组(arguments,NodeList)，可迭代对象(Set,Map)，字符串(String)转换成数组。

## Array.prototype.slice.call() 的常用示例

Array.prototype.slice.call(arrayLike, start, end) 将类数组 arrayLike 转换为数组，并且从下标 start 开始到下标为 end 截取数组。

```js
function makeArray (arrayLike) {
    return Array.prototype.slice.call(arrayLike);
}
function doSomething() {
    var args = makeArray(arguments);
    // 使用args
    ...
}
```

上述示例中，将 slice()方法执行时的 this 值设置为类数组对象(arguments)，而 slice()对象只需是数值型索引和 length 属性就能够正常运行，即任何类数组对象(arguments)都能被转换为数组, 例如下面对象就可转换为数组：

```js
var obj = { 0: 'hello', 1: 'world', length: 2 }
console.log(Array.prototype.slice.call(obj)) // ["hello", "world"]
```

而没有 length 属性的对象则不能

```js
var obj = { 0: 'hello', 1: 'world' } // 没有length属性
console.log(Array.prototype.slice.call(obj)) // []
```

## Array.from() 的常用示例

[Array.from()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/from)

Array.from(arrayLike, mapFn, thisArg) --> Array.from(arrayLike).map(fn(), thisArg)

### 示例 1——将类数组转化为数组

```js
function doSomething () {
    var args = Array.from(arguments);
    // 使用args
    ...
}
```

此方法为 ECMAScript6 新方法，更简洁清晰的将类数组对象转化为数组。

Array.from()方法调用会基于 arguments 对象中的元素创建一个新的数组，args 是 Array 的一个实例，包含 arguments 对象中同位置的相同值。

### 示例 2——将 Set 集合转化为数组

```js
let arr = [1,2,3,4,5,6,7,8,9]
let set = new Set(arr)
console.log(Array.from(set) // [1,2,3,4,5,6,7,8,9]
```

### 示例 3——将 map 集合转化为数组

```js
const myMap = new Map().set(true, 7)
console.log(myMap) // Map(1) {true => 7}
console.log(Array.from(myMap)) // [[true,7]]
// 如需变为一维数组可
console.log(Array.from(myMap).flat()) // [true ,7]
```

::: tip 版权声明
作者：黑桃 z18889
链接：https://juejin.cn/post/6844904106159505421
来源：稀土掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
:::
