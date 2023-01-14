---
title: TS进阶
icon: typescript
category:
  - 前端开发
  - 前端进阶
  - TypeScript
order: 3
---

## 类型收窄

[类型收窄](https://yayujs.com/handbook/Narrowing.html)



## Generics泛型

泛型`Generics`是指在定义函数、接口或类的时候，不预先指定具体的类型，而在使用的时候再指定类型的一种特性。

### 简单的例子

首先，我们来实现一个函数 `createArray`，它可以创建一个指定长度的数组，同时将每一项都填充一个默认值：

```ts
function createArray(length: number, value: any): Array<any> {
  let result = []
  for (let i = 0; i < length; i++) {
    result[i] = value
  }
  return result
}

createArray(3, 'x') // ['x', 'x', 'x']
```

上例中，我们使用了数组泛型来定义返回值的类型。

这段代码编译不会报错，但是一个显而易见的缺陷是，它并没有准确的定义返回值的类型：

`Array<any>` 允许数组的每一项都为任意类型。但是我们预期的是，数组中每一项都应该是输入的 `value` 的类型。

这时候，泛型就派上用场了：

```ts
function createArray<T>(length: number, value: T): Array<T> {
  let result: T[] = []
  for (let i = 0; i < length; i++) {
    result[i] = value
  }
  return result
}

createArray<string>(3, 'x') // ['x', 'x', 'x']
```

上例中，我们在函数名后添加了 `<T>`，其中 `T` 用来指代任意输入的类型，在后面的输入 `value: T` 和输出 `Array<T>` 中即可使用了。

接着在调用的时候，可以指定它具体的类型为 `string`。当然，也可以不手动指定，而让类型推论自动推算出来：

```ts
function createArray<T>(length: number, value: T): Array<T> {
  let result: T[] = []
  for (let i = 0; i < length; i++) {
    result[i] = value
  }
  return result
}

createArray(3, 'x') // ['x', 'x', 'x']
```

### 多个类型参

定义泛型的时候，可以一次定义多个类型参数：

```ts
function swap<T, U>(tuple: [T, U]): [U, T] {
  return [tuple[1], tuple[0]]
}

swap([7, 'seven']) // ['seven', 7]
```

上例中，我们定义了一个 `swap` 函数，用来交换输入的元组

### 泛型约束

在函数内部使用泛型变量的时候，由于事先不知道它是哪种类型，所以不能随意的操作它的属性或方法：

```ts
function loggingIdentity<T>(arg: T): T {
  console.log(arg.length)
  return arg
}

// index.ts(2,19): error TS2339: Property 'length' does not exist on type 'T'.
```

上例中，泛型 `T` 不一定包含属性 `length`，所以编译的时候报错了。

这时，我们可以对泛型进行约束，只允许这个函数传入那些包含 `length` 属性的变量。这就是泛型约束：

```ts
interface Lengthwise {
  length: number
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
  console.log(arg.length)
  return arg
}
```

上例中，我们使用了 `extends` 约束了泛型 `T` 必须符合接口 `Lengthwise` 的形状，也就是必须包含 `length` 属性。

此时如果调用 `loggingIdentity` 的时候，传入的 `arg` 不包含 `length`，那么在编译阶段就会报错了：

```ts
interface Lengthwise {
  length: number
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
  console.log(arg.length)
  return arg
}

loggingIdentity(7)

// index.ts(10,17): error TS2345: Argument of type '7' is not assignable to parameter of type 'Lengthwise'.
```

多个类型参数之间也可以互相约束：

```ts
function copyFields<T extends U, U>(target: T, source: U): T {
  for (let id in source) {
    target[id] = (<T>source)[id]
  }
  return target
}

let x = { a: 1, b: 2, c: 3, d: 4 }

copyFields(x, { b: 10, d: 20 })
```

上例中，我们使用了两个类型参数，其中要求 `T` 继承 `U`，这样就保证了 `U` 上不会出现 `T` 中不存在的字段。

### 泛型接口

可以使用接口的方式来定义一个函数需要符合的形状：

```ts
interface SearchFunc {
  (source: string, subString: string): boolean
}

let mySearch: SearchFunc
mySearch = function (source: string, subString: string) {
  return source.search(subString) !== -1
}
```

当然也可以使用含有泛型的接口来定义函数的形状：

```ts
interface CreateArrayFunc {
  <T>(length: number, value: T): Array<T>
}

let createArray: CreateArrayFunc
createArray = function <T>(length: number, value: T): Array<T> {
  let result: T[] = []
  for (let i = 0; i < length; i++) {
    result[i] = value
  }
  return result
}

createArray(3, 'x') // ['x', 'x', 'x']
```

进一步，我们可以把泛型参数提前到接口名上：

```ts
interface CreateArrayFunc<T> {
  (length: number, value: T): Array<T>
}

let createArray: CreateArrayFunc<any>
createArray = function <T>(length: number, value: T): Array<T> {
  let result: T[] = []
  for (let i = 0; i < length; i++) {
    result[i] = value
  }
  return result
}

createArray(3, 'x') // ['x', 'x', 'x']
```

注意，此时在使用泛型接口的时候，需要定义泛型的类型。

### 泛型类

与泛型接口类似，泛型也可以用于类的类型定义中：

```ts
class GenericNumber<T> {
  zeroValue: T
  add: (x: T, y: T) => T
}

let myGenericNumber = new GenericNumber<number>()
myGenericNumber.zeroValue = 0
myGenericNumber.add = function (x, y) {
  return x + y
}
```

### 泛型参数的默认类型

在 TypeScript 2.3 以后，我们可以为泛型中的类型参数指定默认类型。当使用泛型时没有在代码中直接指定类型参数，从实际值参数中也无法推测出时，这个默认类型就会起作用。

```ts
function createArray<T = string>(length: number, value: T): Array<T> {
  let result: T[] = []
  for (let i = 0; i < length; i++) {
    result[i] = value
  }
  return result
}
```

## 类型别名

类型别名用来给一个类型起个新名字

```typescript
type Name = string
type NameResolver = () => string
type NameOrResolver = Name | NameResolver
function getName(n: NameOrResolver): Name {
  if (typeof n === 'string') {
    return n
  } else {
    return n()
  }
}
```

上例中，我们使用 `type` 创建类型别名

类型别名常用于联合类型

### 类型别名与接口的区别

// TODO: 重新梳理 

- [一分钟带你搞清楚ts中 interface 和 type 的概念和用法（较全）](https://blog.csdn.net/TIAN20121221/article/details/120085998)
  
  - ## [TypeScript type 和 interface区别](https://segmentfault.com/a/1190000041878441)
  
- [TypeScript中interface和type](https://segmentfault.com/a/1190000038825361)

#### 相同点

都可以描述一个对象或者函数：

`interface`

```typescript
interface User {
  name: string
  age: number
}

interface SetUser {
  (name: string, age: number): void
}
```

`type`

```ts
type User = {
  name: string
  age: number
}

type SetUser = (name: string, age: number) => void
```

都允许拓展`extends`：

`interface` 和 `type` 都可以拓展，并且两者并不是相互独立的，也就是说` interface `可以 `extends` `type`, `type` 也可以 `extends` `interface `。 **虽然效果差不多，但是两者语法不同**。

`interface extends interface`

```ts
interface Name {
  name: string
}
interface User extends Name {
  age: number
}
```

`type extends type`

```ts
type Name = {
  name: string
}
type User = Name & { age: number }
```

`interface extend type`

```ts
type Name = {
  name: string
}
interface User extends Name {
  age: number
}
```

`type extends interface`

```ts
interface Name {
  name: string
}
type User = Name & {
  age: number
}
```

#### 不同点

`type` 可以而 `interface` 不行：

- `type` 可以声明基本类型别名，联合类型，元组等类型

```ts
// 基本类型别名
type Name = string

// 联合类型
interface Dog {
  wong()
}
interface Cat {
  miao()
}

type Pet = Dog | Cat

// 具体定义数组每个位置的类型
type PetList = [Dog, Pet]
```

- `type `语句中还可以使用 `typeof` 获取实例的 类型进行赋值

```ts
// 当你想获取一个变量的类型时，使用 typeof
let div = document.createElement('div')
type B = typeof div
```

`interface` 可以而 `type `不行：

`interface` 能够声明合并

```ts
interface User {
  name: string
  age: number
}

interface User {
  sex: string
}

/*
User 接口为 {
  name: string
  age: number
  sex: string 
}
*/
```



## 重载

重载是定义相同的方法名,参数不同;重写是子类重写父类的方法

### 函数重载

::: tip 参考文章

[TS 中几种函数重载](https://www.jianshu.com/p/98a4291d7ff4)

[TS中的方法重载,函数重载,构造器重载](https://blog.csdn.net/qq_39970857/article/details/120949349)

:::

重载允许一个函数接受不同数量或类型的参数时，作出不同的处理。

比如，我们需要实现一个函数 `reverse`，输入数字 `123` 的时候，输出反转的数字 `321`，输入字符串 `'hello'` 的时候，输出反转的字符串 `'olleh'`。

利用联合类型，我们可以这么实现：

```ts
function reverse(x: number | string): number | string | void {
  if (typeof x === 'number') {
    return Number(x.toString().split('').reverse().join(''))
  } else if (typeof x === 'string') {
    return x.split('').reverse().join('')
  }
}
```

**然而这样有一个缺点，就是不能够精确的表达，输入为数字的时候，输出也应该为数字，输入为字符串的时候，输出也应该为字符串。**

这时，我们可以使用重载定义多个 `reverse` 的函数类型：

```ts
function reverse(x: number): number // 重载签名
function reverse(x: string): string // 重载签名
function reverse(x: number | string): number | string | void {
  // 实现签名
  if (typeof x === 'number') {
    return Number(x.toString().split('').reverse().join(''))
  } else if (typeof x === 'string') {
    return x.split('').reverse().join('')
  }
}
```

上例中，我们重复定义了多次函数 `reverse`，前几次都是函数定义，最后一次是函数实现

### 方法重载

下面来实现一个方法重载 以 ArrayList 为例,可以查看数据,可以删除数据,删除可以通过 id 或者对象删除可以获取数据

```ts
class ArrayList {
  constructor(public element: object[]) {}
  /**
   * 获取某一个值
   * @param index
   * @returns
   */
  get(index: number) {
    return this.element[index]
  }
  // 显示值
  show() {
    this.element.forEach(i => console.log(i))
  }

  remove(val: number): number
  remove(val: Object): Object // 实现删除方法重载

  remove(val: number | Object) {
    this.element = this.element.filter((e, index) => {
      if (typeof val === 'number') {
        return val !== index
      } else {
        return val !== e
      }
    })
    return val
  }
}
let a = { name: 'zixia', age: 12 },
  b = { name: 'selfsummer', age: 88 },
  c = { name: '自夏', age: 18 }

let newAr = new ArrayList([a, b, c])

newAr.remove(1)
newAr.remove(c)
console.log(newAr)
```

### 构造器重载

```ts
// 类型别名
type TypeWowen = {
  name: string
  age: number
}

class Wowen {
  name: string
  age: number
  constructor(age: number, name?: string)
  constructor(paramObj: TypeWowen)
  constructor(paramObj: any, name = '未知') {
    if (typeof paramObj === 'object') {
      const { name, age } = paramObj
      this.name = name
      this.age = age
    } else {
      this.age = paramObj
      this.name = name
    }
  }
}
const w1 = new Wowen({ name: 'frank', age: 123 })
const w2 = new Wowen(123, 'frank')
// const w3 = new Wowen({ name: 'frank', age: 123 }, 123)

console.log(w1)
console.log(w2)
console.log(w3)
```

 

```typescript
 type GreetFunction = (a: string) => void
function greeter(fn: GreetFunction) {
  // ...
}
```

在 JavaScript 中，函数除了可以被调用，自己也是可以有属性值的。然而函数类型表达式并不能支持声明属性，如果我们想描述一个带有属性的函数，我们可以在一个对象类型中写一个调用签名（call signature）

```typescript
type DescribableFunction = {
  description: string
  (someArg: number): boolean
}
const fn: DescribableFunction = someArg => {
  return someArg > 0
}

fn.description = '是否大于0'

function doSomething(fn: DescribableFunction) {
  console.log(`${fn.description},returned:${fn(6)}`)
}

doSomething(fn)
```

注意这个语法跟函数类型表达式稍有不同，在参数列表和返回的类型之间用的是 `:` 而不是 `=>`。

## 构造签名

`JavaScript` 函数也可以使用 `new` 操作符调用，当被调用的时候，`TypeScript` 会认为这是一个构造函数( constructors (构造函数) )，因为他们会产生一个新对象。你可以写一个构造签名，方法是在调用签名前面加一个 `new` 关键词：

```ts
type SomeConstructor = {
  new (s: string): SomeObject
}
function fn(ctor: SomeConstructor) {
  return new ctor('hello')
}
```

## 索引签名

索引:对象或数组的对应位置的名字

数组的索引就是 number 类型的 0,1,2,3...

对象的索引就是 string 类型的属性名

有的时候，你不能提前知道一个类型里的所有属性的名字，但是你知道这些值的特征

这种情况，你就可以用一个索引签名`index signature` 来描述可能的值的类型

一个索引签名的属性类型必须是 `string` 或者是 `number`

#### 数字索引签名:通过定义接口用来约束数组

```typescript
type numberIndex={
    [index:number]:string
}
const testArray:numberIndex = ["1","2",3]// 不能将类型“number”分配给类型“string”。ts(2322) 所需类型来自此索引签名
```

 ::: tip

索引签名的名称如`[index:number]:string`里的`index`除了可读性外,并无任何意义.但有利于下一个开发者理解你的代码

:::

### 字符串索引签名:用于约束对象

```ts
type objectType{
    [propName:string]:number
}
const testObj:objectType = {
    "name":100,
    "age":"200" // 不能将类型“string”分配给类型“number”。ts(2322) 所需类型来自此索引签名。
}
```

### 注意事项

- 一旦定义了索引签名,那么确定属性和可选属性的类型都必须是它的类型的子集

```ts
type attentionType{
    name: string; // Ok
    age?: number; // 类型“number | undefined”的属性“age”不能赋给“string”索引类型“string”。ts(2411)
    sex?: undefined; // OK
    [propName: string]: string | undefined;
}
```

- 虽然 TypeScript 可以同时支持 `string` 和 `number` 类型，但数字索引的返回类型一定要是字符索引返回类型的子类型。这是因为当使用一个数字进行索引的时候，`JavaScript` 实际上把它转成了一个字符串。这就意味着使用数字 100 进行索引跟使用字符串 100 索引，是一样的。

```ts
interface Animal {
  name: string;
}
interface Dog extends Animal {
  breed: string;
}

interface NotOkay {
  [x: string]: Dog;
  [x: number]: Animal; // Error
}

interface Okay {
  [x: string]: Animal;
  [x: number]: Dog; // OK
}
```


## 常量断言

::: tip 参考文章

[TypeScript 夜点心：常量断言](https://zhuanlan.zhihu.com/p/121558249)

::: 

常量断言，可以用于断言任何一个类型：

```ts
const frank = {
  age: 22,
  hobby: 'js',
} as const

interface Isetting {
  align: 'center' | 'left' | 'right'
  padding: number
}

function layout(setting: Isetting) {
  console.log('Layout', setting)
}

const paramer = {
  align: 'left' as const,
  padding: 0,
}
layout(paramer)
```

## keyof 操作符

对一个对象类型使用 `keyof` 操作符，会返回该对象属性名组成的一个字符串或者数字字面量的联合。这个例子中的类型 P 就等同于 "x" | "y"：

```typescript
type Point = { x: number; y: number }
type P = keyof Point
```

## 类型映射

有的时候，一个类型需要基于另外一个类型，但是你又不想拷贝一份，这个时候可以考虑使用映射类型。

```ts
type Point2D = {
  x: number
  y: number
}

type Point3D = {
  [key in keyof Point2D]: number
} & {
  z: number
}

let p2: Point3D = { x: 1, y: 2, z: 3 }
```

## 映射修饰符

在使用类型映射时，有两个额外的修饰符可能会用到，一个是 `readonly`，用于设置属性只读，一个是 `?` ，用于设置属性可选。

你可以通过前缀 `-` 或者 `+` 删除或者添加这些修饰符，如果没有写前缀，相当于使用了 `+` 前缀。

```typescript
// 删除属性中的只读属性
type CreateMutable<Type> = {
  -readonly [Property in keyof Type]: Type[Property]
}

type LockedAccount = {
  readonly id: string
  readonly name: string
}

type UnlockedAccount = CreateMutable<LockedAccount>

// type UnlockedAccount = {
//    id: string;
//    name: string;
// }
```

```typescript
// 删除属性中的可选属性
type Concrete<Type> = {
  [Property in keyof Type]-?: Type[Property]
}

type MaybeUser = {
  id: string
  name?: string
  age?: number
}

type User = Concrete<MaybeUser>
// type User = {
//    id: string;
//    name: string;
//    age: number;
// }
```


## 类

### 基础概念

- 类（Class）：定义了一件事物的抽象特点，包含它的属性和方法
- 对象（Object）：类的实例，通过 new 生成
- 面向对象（OOP）的三大特性：封装、继承、多态
- 封装（Encapsulation）：将对数据的操作细节隐藏起来，只暴露对外的接口。外界调用端不需要（也不可能）知道细节，就能通过对外提供的接口来访问该对象，同时也保证了外界无法任意更改对象内部的数据
- 继承（Inheritance）：子类继承父类，子类除了拥有父类的所有特性外，还有一些更具体的特性
- 多态（Polymorphism）：由继承而产生了相关的不同的类，对同一个方法可以有不同的响应。比如 Cat 和 Dog 都继承自 Animal，但是分别实现了自己的 eat 方法。此时针对某一个实例，我们无需了解它是 Cat 还是 Dog，就可以直接调用 eat 方法，程序会自动判断出来应该如何执行 eat
- 存取器（getter & setter）：用以改变属性的读取和赋值行为
- 修饰符（Modifiers）：修饰符是一些关键字，用于限定成员或类型的性质。比如 public 表示公有属性或方法
- 抽象类（Abstract Class）：抽象类是供其他类继承的基类，抽象类不允许被实例化。抽象类中的抽象方法必须在子类中被实现
- 接口（Interfaces）：不同类之间公有的属性或方法，可以抽象成一个接口。接口可以被类实现（implements）。一个类只能继承自另一个类，但是可以实现多个接口

### Access Modifiers访问修饰符

TypeScript 可以使用三种访问修饰符（Access Modifiers），分别是 `public`、`private` 和 `protected`。

- `public` 修饰的属性或方法是公有的，可以在任何地方被访问到，默认所有的属性和方法都是 `public` 的
- `private` 修饰的属性或方法是私有的，不能在声明它的类的外部访问
- `protected` 修饰的属性或方法是受保护的，它和 `private` 类似，区别是它在子类中也是允许被访问的

```ts
interface IPoint {
  X: number
  Y: number
  drawPoint: () => void
  getDistances: (p: IPoint) => number
}
class Point implements IPoint {
  constructor(private _x: number, private _y: number) {}
  drawPoint() {
    console.log('x：' + this._x, 'y:' + this._y)
  }
  getDistances(p: IPoint) {
    return Math.sqrt((p.X - this._x) ** 2 + (p.Y - this._y) ** 2)
  }
  get X() {
    return this._x
  }
  set X(value: number) {
    if (value < 0) throw new Error('x不能小于0')
    this._x = value
  }
  get Y() {
    return this._y
  }
  set Y(value: number) {
    if (value < 0) throw new Error('y不能小于0')
    this._y = value
  }
}

const p1 = new Point(0, -1)
const p2 = new Point(0, 2)
```

### readonly

readonly 只读属性关键字

```ts
class Animal {
  readonly name
  constructor(name) {
    this.name = name
  }
}

let a = new Animal('Jack')
console.log(a.name) // Jack
a.name = 'Tom'

// index.ts(10,3): TS2540: Cannot assign to 'name' because it is a read-only property.
```

注意如果 `readonly` 和其他访问修饰符同时存在的话，需要写在其后面。

```ts
class Animal {
  constructor(public readonly name) {
    this.name = name
  }
}
```

###  抽象类

`abstract` 用于定义抽象类和其中的抽象方法。

什么是抽象类？

首先，抽象类是不允许被实例化的：

```ts
abstract class Animal {
  constructor(pubilc name) {
    this.name = name;
  }
   abstract sayHi();
}

let a = new Animal('Jack');

// index.ts(9,11): error TS2511: Cannot create an instance of the abstract class 'Animal'.
```

上面的例子中，我们定义了一个抽象类 `Animal`，并且定义了一个抽象方法 `sayHi`。在实例化抽象类的时候报错了。

其次，抽象类中的抽象方法必须被子类实现：

```ts
abstract class Animal {
  constructor(public name) {
    this.name = name
  }
  abstract sayHi()
}

class Cat extends Animal {
  eat() {
    console.log(`${this.name} is eating.`)
  }
}

let cat = new Cat('Tom')

// index.ts(9,7): error TS2515: Non-abstract class 'Cat' does not implement inherited abstract member 'sayHi' from class 'Animal'.
```

上面的例子中，我们定义了一个类 `Cat` 继承了抽象类 `Animal`，但是没有实现抽象方法 `sayHi`，所以编译报错了。

下面是一个正确使用抽象类的例子：

```ts
abstract class Animal {
  public name
  public constructor(name) {
    this.name = name
  }
  public abstract sayHi()
}

class Cat extends Animal {
  public sayHi() {
    console.log(`Meow, My name is ${this.name}`)
  }
}

let cat = new Cat('Tom')
```

### 类实现接口

实现（implements）是面向对象中的一个重要概念。一般来讲，一个类只能继承自另一个类，有时候不同类之间可以有一些共有的特性，这时候就可以把特性提取成接口（interfaces），用 implements 关键字来实现。这个特性大大提高了面向对象的灵活性。

举例来说，门是一个类，防盗门是门的子类。如果防盗门有一个报警器的功能，我们可以简单的给防盗门添加一个报警方法。这时候如果有另一个类，车，也有报警器的功能，就可以考虑把报警器提取出来，作为一个接口，防盗门和车都去实现它：

```ts
interface Alarm {
  alert(): void
}

class Door {}

class SecurityDoor extends Door implements Alarm {
  alert() {
    console.log('SecurityDoor alert')
  }
}

class Car implements Alarm {
  alert() {
    console.log('Car alert')
  }
}
```

一个类可以实现多个接口：

```ts
interface Alarm {
  alert(): void
}

interface Light {
  lightOn(): void
  lightOff(): void
}

class Car implements Alarm, Light {
  alert() {
    console.log('Car alert')
  }
  lightOn() {
    console.log('Car light on')
  }
  lightOff() {
    console.log('Car light off')
  }
}
```
