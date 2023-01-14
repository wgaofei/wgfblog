---
title: 数组delete元素
category:
  - 开发日志
  - JS
---

```js
let arr = ['I', 'go', 'home']

delete arr[1] // remove "go"

alert(arr[1]) // undefined

// now arr = ["I",  , "home"];
alert(arr.length) // 3
```

使用 delete 删除指定索引号的数组元素后会发生什么？

- 数组元素值消失
- 通过索引号访问，得到 `undefined`
- 数组长度不变
