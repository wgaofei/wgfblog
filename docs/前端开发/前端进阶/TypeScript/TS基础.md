---
title: TS基础
icon: typescript
category:
  - 前端开发
  - 前端进阶
  - TypeScript
order: 2
---


## TypeScript Environment

1. 安装 ts:`npm i -g typescript`,编译 ts: `tsc xxx.ts`,得到 js 文件执行

2. 直接使用 `ts-node` 运行 ts 文件:

   - `npm i ts-node -g`
   - `npm i typescript -g`
   - `ts-node xxx.ts`

## boolean

```ts
const bool1 = true
const bool2: boolean = false
```

## number

```ts
const num1: number = 1
const num2 = 2
```

## string

```ts
const str1 = 'frank'
const str2: string = 'frank'
const str3 = `我叫${str2}`
```

## array

数组的几种声明方式：

```js
let list1: number[] = [1, 2, 3, 4]
let list2 = [1, 2, 3, '4']
let list3: Array<number> = [1, 2, 3, 4] // 泛型
let list4: any[] = [1, 'ddd', { a: 1 }, [1, 2, 3]]
```

## tuple <Badge text='似乎不太常用'/>

元组类型是另一种类型 Array，它确切地知道它包含多少个元素，以及它在特定位置包含哪些类型（官方文档元组定义翻译）

```ts
let person: [number, string] = [1, '123']

console.log(person)
```

当添加越界的元素时，它的类型会被限制为元组中每个类型的联合类型:

```ts
let tom: [string, number]
tom = ['Tom', 25]
tom.push('male')
tom.push(true)
// Argument of type 'true' is not assignable to parameter of type 'string | number'.
```

## union

联合类型 `Union Types` 表示取值可以为多种类型中的一种

联合类型使用 `|`分隔每个类型

```ts
let union1: number | string
union1 = 123
union1 = '456'

let union2: number | string | string[] | boolean

let union3: 1 | 2 | 3
```

## literal

字面量 `Literal` 类型的**特定数据**就是 它自己的类型

```ts
const num = 1
// 与联合类型结合
let nums: 1 | 2 | 3
nums = 2
nums = 4 // 报错 nums只能是 1,2,3 中的其中一个
```

## any

任意值 `Any` 用来表示允许赋值为任意类型

```ts
let result: any = 555
result = { a: 1 }
result = []
result = false
```

## unknown

`unknown` 不保证类型，但保证类型安全(类型安全的 `any`)，只有确定了变量类型以后，才能正常使用

```ts
let res: unknown = 123
res = function () {
  console.log('res')
}
if (typeof res === 'function') {
  res()
}
res = 123
if (typeof res === 'number') {
  console.log(res++)
}
```

## void

::: tip void 和 undefined
`void` 代表变量本身就不存在，`undefined`代表应该此处应该有一个变量，但是没有定义
:::

在 `TypeScript` 中，可以用 `void` 表示没有任何返回值的函数:

```js
function printRes(): void {
  console.log('string')
}

function printRes2(): undefined {
  console.log('string')
  return
}
```

## Enum

[enum](https://www.typescriptlang.org/docs/handbook/enums.html)



## Interface

在 `TypeScript` 中，我们使用接口`Interfaces`来定义对象的类型

在面向对象语言中，接口`nterfaces`是一个很重要的概念，它是对行为的抽象，而具体如何行动需要由类`classes`去实现`implement`

`TypeScript` 中的接口是一个非常灵活的概念，除了可用于对类的一部分行为进行抽象以外，也常用于对「对象的形状（`Shape`」进行描述:

```ts
interface IPoint {
  X: number
  Y: number
}
const p1: IPoint = {
  X: 1,
  Y: 2,
}
```

定义的变量比接口少了一些属性是不允许的,多一些属性也是不允许的。可见，**赋值的时候，变量的形状必须和接口的形状保持一致**

### 可选属性

有时我们希望不要完全匹配一个形状，那么可以用可选属性：

```ts
interface Person {
  name: string
  age?: number
}

let tom: Person = {
  name: 'Tom',
}
```

可选属性的含义是该属性可以不存在。这时**仍然不允许添加未定义的属性**

### 任意属性

有时候我们希望一个接口允许有任意的属性，可以使用如下方式：

```ts
interface Person {
  name: string
  age?: number
  // 索引签名
  [propName: string]: any
}

let tom: Person = {
  name: 'Tom',
  gender: 'male',
}
```

使用索引签名 `[propName: string]` 定义了任意属性取 `string` 类型的值。

需要注意的是，**一旦定义了任意属性，那么确定属性和可选属性的类型都必须是它的类型的子集**：

```ts
interface Person {
  name: string
  age?: number
  [propName: string]: string
}

let tom: Person = {
  name: 'Tom',
  age: 25,
  gender: 'male',
}

// index.ts(3,5): error TS2411: Property 'age' of type 'number' is not assignable to string index type 'string'.
// index.ts(7,5): error TS2322: Type '{ [x: string]: string | number; name: string; age: number; gender: string; }' is not assignable to type 'Person'.
//   Index signatures are incompatible.
//     Type 'string | number' is not assignable to type 'string'.
//       Type 'number' is not assignable to type 'string'.
```

一个接口中只能定义一个任意属性。如果接口中有多个类型的属性，则可以在任意属性中使用联合类型：

```ts
interface Person {
  name: string
  age?: number
  [propName: string]: string | number
}

let tom: Person = {
  name: 'Tom',
  age: 25,
  gender: 'male',
}
```

### 只读属性

有时候我们希望对象中的一些字段只能在创建的时候被赋值，那么可以用 `readonly` 定义只读属性：

```ts
interface Person {
  readonly id: number
  name: string
  age?: number
  [propName: string]: any
}

let tom: Person = {
  id: 89757,
  name: 'Tom',
  gender: 'male',
}

tom.id = 9527
// index.ts(14,5): error TS2540: Cannot assign to 'id' because it is a constant or a read-only property.
```

上例中，使用 `readonly` 定义的属性 `id` 初始化后，又被赋值了，所以报错了。

## function

### 定义

- 函数声明

**输入多余的（或者少于要求的）参数，是不被允许的**

```ts
function sum(x: number, y: number): number {
    return x + y;
}
```

- 函数表达式

```ts
let mySum = function (x: number, y: number): number {
    return x + y;
};
```

### 各种参数

::: tip 参考文章

[ts 函数，可选参数，默认参数，剩余参数](https://blog.csdn.net/weixin_43131046/article/details/121696924)

:::

```ts
// 可选参数
function fun(a: number, b?: number) {
  console.log(a, b) // 1 undefined
}

fun(1)
// 默认参数
function fun2(a: number = 1, b: number = 2) {
  console.log(a + b) //3
}

fun2(1)
// 剩余参数
function fun3(a: number, b: number, ...c: number[]) {
  console.log(a + b + c.reduce((pre, cur) => pre + cur)) //16
}

fun3(1, 2, 3, 4, 6)
```

::: warning 注意

- 默认参数和可选参数无法同时使用

- 三种参数都应定义在参数列表的末尾

:::

## Object

在 `ts` 中对象的定义不是`key to value` 键值对，而是 `key to type` 键类型对

```ts
const person: {
  name: string
  age: number
} = {
  name: 'frank',
  age: 14,
}
// 上面的定义等价于：
const person2 = {
  name: 'zhang',
  age: 13,
}
```

## Type Assertions类型断言

类型断言`Type Assertions`可以用来手动指定一个值的类型

```ts
let x: any
x = '123' // 仍然是any类型
// 写法1 在 tsx 语法（React 的 jsx 语法的 ts 版）中无法使用
let s1 = (<string>x).charAt(1) //  1
// 写法2
let s2 = (x as string).charAt(2) // 2
```

## Type Inference类型推论

如果没有明确的指定类型，那么 TypeScript 会依照类型推论（Type Inference）的规则推断出一个类型。

以下代码虽然没有指定类型，但是会在编译的时候报错：

```js
let myFavoriteNumber = 'seven'
myFavoriteNumber = 7
// index.ts(2,1): error TS2322: Type 'number' is not assignable to type 'string'.
```

事实上，它等价于：

```ts
let myFavoriteNumber: string = 'seven'
myFavoriteNumber = 7

// index.ts(2,1): error TS2322: Type 'number' is not assignable to type 'string'.
```

如果定义的时候没有赋值，不管之后有没有赋值，都会被推断成 any 类型而完全不被类型检查：

```ts
let myFavoriteNumber
myFavoriteNumber = 'seven'
myFavoriteNumber = 7
```
