---
title: Set和Map数据结构
category:
  - 前端进阶
  - ES6
---

## Set

`Set` 是一种**无序且唯一**的数据结构

`Set`本身是一个构造函数，用来生成 `Set` 数据结构

```js
const s = new Set()
```

### set 实例的方法和属性

#### add

添加某个值，返回 `Set` 结构本身

```js
const s = new Set()
s.add(1).add(2)
```

#### has

返回一个布尔值，表示该值是否为`Set`的成员

```js
const s = new Set()
s.add(1).add(2)
console.log(s.has(1)) // true
```

####  delete  
删除某个值，返回一个布尔值，表示删除是否成功

```js
const s = new Set()
s.add(1).add(2)
s.delete(1) // true
```

####  clear

清空 `Set`，没有返回值

```js
const s = new Set()
s.add(1)
s.add(2)
s.clear()
console.log(s) // Set {}
```

####  forEach <Badge text='数组,set map 都有这个方法'/>

```js
const s = new Set()
s.add(1).add(2).add(3)
s.forEach(function (v, k, set) {
  // set中v=k
  console.log(v, k, set)
  console.log(this) // window
}, 这里修改this执向)
```

####  size

返回成员个数

### Set 构造函数的参数

1. 数组

```js
const s = new Set([1, 2, 1])
console.log(s) // Set(2) { 1, 2 }
```

2. 字符串、arguments、Nodelist、Set 等类数组对象

```js
// 字符串组作为Set构造函数的参数
const s = new Set('hello')
console.log(s) // Set(4) { 'h', 'e', 'l', 'o' }
```

```js
// Set作为Set构造函数的参数
const s = new Set()
s.add(1).add(2)
// 相当于复制了了一个全新的Set
const b = new Set(s)
console.log(b) //Set { 1, 2 }
console.log(b===s) // false
```

### Set判断重复的方式

`set` 对重复值的判断**基本**遵循严格相等,但是对于 `NaN` 的判断与`===`不同，**`Set `中 `NaN` 等于` NaN`**

### Set 的应用

1.  数组去重

```js
// Set也可以使用`展开运算符`展开
console.log([...new Set([1, 2, 1, 2, 1])])
```

2. 字符串去重

```js
console.log([...new Set('aabbccd')].join(''))
```

## Map

`Map` 和对象都是键值对的集，但是`Map`“键”的范围不限于字符串，各种类型的值（包括对象）都可以当作键

### Map 实例的属性和方法

#### set  

使用 `set` 添加的新成员，键如果已经存在，后添加的键值对覆盖已有的,返回值为该` map `对象

```js
const m = new Map()
m.set('age', 18).set('name', 'alex').set('age', 111)
```

#### get  
`get`方法读取`key`对应的键值，如果找不到`key`，返回`undefined`

```js
const m=new Map()
m.set('age',18).set('name','alex').set('age',111)
console.log(m.get('name') // 'alex'
```

#### has

`has`方法返回一个布尔值，表示某个键是否在当前 `Map `对象之中

```js
const m = new Map()
m.set('age', 18).set('name', 'alex').set('age', 111)
console.log(m.has('name')) // true
```

#### delete  
`delete`方法删除某个键，返回`true`。如果删除失败，返回`false`

```js
const m = new Map()
m.set('age', 18).set('name', 'alex').set('age', 111)
m.delete('name') // true
```

#### clear

清除所有成员没有返回值

```js
const m = new Map()
m.set('age', 18).set('name', 'alex').set('age', 111)
m.clear()
```

#### forEach

```js
const m = new Map()
m.set('age', 18).set('name', 'alex').set('age', 111)
m.forEach(function (value, key, map) {
  console.log(value, key, map)
}, 这里修改this指向)
```

#### size

// 看下imooc怎么讲的

返回 Map 结构的成员总数

### Map 构造函数的参数

#### 数组
**只能**传二维数组，而且必须体现出键和值

```js
const m = new Map([
  ['name', 'alex'],
  ['age', 18],
])
console.log(m)
```

#### Set 

Set 中也必须体现出键和值，和二维数组类似

```js
const s = new Set([
  ['age', 123],
  ['name', 'frank'],
])
const m = new Map(s)
console.log(m) // Map { 'age' => 123, 'name' => 'frank' }
```

#### Map

传入 `Map `相当于复制了一个全新的 `Map`

### Map 判断重复的方式

判断重复的方式和`Set`相同
