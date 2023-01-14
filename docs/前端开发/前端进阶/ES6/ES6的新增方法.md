---
title: ES6 的新增方法
tag: ES6新增方法
category:
  - 前端进阶
  - ES6
---

## 字符串新增方法

### includes()

- 判断字符串中是否含有某些字符 1.基本用法

```js
console.log('abc'.includes('a')) // true
```

2. 第二个参数

表示开始搜索的位置，默认为 0

```js
console.log('abc'.includes('a', 1))
```

3. 应用:query 的拼接

```html
<!-- query的拼接 -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <script>
      let url = 'https://www.imooc.com/course/list?'
      let url1 = 'https://www.imooc.com/course/list?username=xm&'
      let url2 = 'https://www.imooc.com/course/list?username=xm'
      const addURL = (url, name, value) => {
        if (url.includes('?')) {
          if (
            url.substr(url.length - 1, 1) == '?' ||
            url.substr(url.length - 1, 1) == '&'
          ) {
            url += ''
          } else {
            url += '&'
          }
        } else {
          url += '?'
        }
        url += `${name}=${value}`
        return url
      }

      console.log(addURL(url, 'password', 'admin'))
      console.log(addURL(url1, 'password', 'admin'))
      console.log(addURL(url2, 'password', 'admin'))
    </script>
  </body>
</html>
```

### padStart()和 padEnd()

1. 基本用法

补全字符串

```js
console.log('xxx'.padStart(4, 'a')) // axxx
console.log('xxx'.padEnd(4, 'a')) // xxxa
```

2. 注意事项

- 原字符串的长度，等于或大于最大长度，不会消减原字符串，字符串补全不生效，返回原字符串
- 用来补全的字符串与原字符串长度之和超过了最大长度，截去超出位数的补全字符串，原字符串不动
- 如果省略第二个参数，默认使用空格补全长度

3. 应用

显示日期格式

2021-1-1  
 2021-10-12

保持日期格式统一，一位数前面补零=》'1'.padStart(2,'0') // 01

### trimStart()和 trimEnd()

1. 基本用法  
   清除字符串的首或尾空格，中间的空格不会清除

```js
console.log('                        xxxxx'.trimStart())
```

2. 应用  
   清除表单非法数据

```html
<body>
  <input type="text" id="username" />
  <input type="submit" value="提交" id="btn" />
  <script>
    const username = document.getElementById('username')
    const btn = document.getElementById('btn')

    btn.onclick = () => {
      // trim()去除字符串的头尾空格
      if (username.value.trim() !== '') {
        console.log('可以提交')
      } else {
        console.log('不可以提交')
      }
    }
  </script>
</body>
```

> 备注： trim()同时清除两边的空格

### replaceAll()

相比于 replace 方法，可以在不使用正则的情况下，一次性替换掉所有的匹配

```js
const str = 'aabbcc'
const str2 = str.replaceAll('b', '-')
console.log(str2) // aa--cc
```

## 数组的新增方法

### includes()

1. 基本用法  
   ncludes() 方法用来判断一个数组是否包含一个指定的值，如果是返回 true，否则 false。
2. 应用：数组去重

### Array.from()

[Array.from()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/from)

1. 基本用法  
   将其他数据类型转换成数组
2. 哪些可以通过 Array.from()转换成数组

- 所有可遍历的：数组、字符串、set、map、 nodeList、 arguments
- 拥有 **length**属性的任意对象

```js
const obj = {
  0: 'a',
  1: 'b',
  length: 2,
}
console.log(Array.from(obj))
```

3. 第二个参数  
   作用类似于数组的[map](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/map)方法，用来对每个元素进行处理，将处理后的值放入返回的数组

```js
console.log(Array.from('12', v => v * 2))
```

4. 第三个参数

   指定回调函数中的 this 指向，**大坑**：箭头函数无法修改

### find()和 findIndex()

1. 基本用法

- find():找到满足条件的一个立即返回
- findIndex():找到满足条件的一个，立即返回其索引

```js
const arr = [1, 2, 3, 4, 5]

console.log(
  arr.find(function (value, index, arr) {
    return value > 2
  })
)
```

2. 应用

筛选数据

## 对象的新增方法

### Object.assign()

1.  基本用法

```js
const apple = {
  color: 'black',
  shape: '圆柱形',
  taste: '甜',
}
const pen = {
  color: 'red',
  shape: '球形',
  use: 'write',
}
console.log(Object.assign(apple, pen))
```

直接合并`到`了第一个参数中，返回的就是合并后的对象(修改后的第一个对象是同一个引用)。  
如果像创建一个新对象可以这样写

```js
console.log(Object.assign({}, apple, pen))
```

可以合并多个对象

2. 注意事项

- 基本数据类型作为源对象：与对象的展开类似，**先转换成对象**，再合并

```js
console.log(Object.assign({}, 'str'))
```

```js
Object.assign(目标对象，源对象，....)
```

- 同名属性的替换 ：后面的直接覆盖前面的，如果属性值为引用数据类型，也是直接覆盖，不用考虑那么多

3. 应用  
   合并默认参数和用户参数

```js
const logUser = useroptions => {
  const Defaults = {
    username: 'zhangsan',
    password: '123',
  }
  const options = Object.assign({}, Defaults, useroptions)
  console.log(options)
}
logUser({})
```

### Object.keys()、Object.values()和 Object.entries()

1. 基本用法

```js
const person = {
  name: 'zhangsan',
  age: 18,
  sex: 'male',
}
console.log(Object.keys(person))
console.log(Object.values(person))
console.log(Object.entries(person))
```

2. 与数组类似方法的区别

1、调用方法不同，对于数组来说是实例的方法，对象是构造函数的方法

2、返回值不同，数组的方法返回的是数组的可遍历对象，对象的方法返回的是数组

3. 使用对象的 Object.keys()、Object.values()、Object.entries() ，才能让对象使用 for...of 循环遍历对象

```js
const apple = {
  color: 'black',
  shape: '圆柱形',
  taste: '甜',
}
for (const [key, value] of Object.entries(apple)) {
  console.log(key, value)
}
```

4. 但是，Object.keys()/values()/entires() 并不能保证顺序一定是看到的样子，这一点和 for in 是一样的=>**属性是数字，在使用 Object.keys()、Object.values()、Object.entries()方法时，顺序是按照属性的大小来定的**

```js
 const person = {
      100: "p",
      2: "e",
      5: "r",
      30: "s",
      15: "o",
      75: "n"
    };
    console.log(Object.keys(person))
    console.log(Object.values(person))
    console.log(Object.entries(person)
```
