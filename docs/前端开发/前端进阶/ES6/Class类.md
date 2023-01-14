---
title: Class类
tag: Class
category:
  - 前端进阶
  - ES6
---

// TODO: 2022.5.23 基于 ES6 入门 class 章节重新梳理

## Class 基本用法

类名一般首字母大写

```js
class Person {
  constructor(name, age) {
    // 实例化时执行构造方法
    this.name = name
    this.age = age
  }
  // 各实例共享的方法(在原型上定义)
  speak() {}
}
```

## 属性与方法

### 实例属性、静态方法和静态属性

1. 实例属性

```js
class Person {
  // 实例属性除了定义在constructor()方法里面的this上面，也可以定义在类的最顶层
  age = 0
  sex = 'male'
  //方法就是值为函数的特殊属性
  getSex = function () {
    return this.sex
  }

  constructor(name, sex) {
    this.name = name
    this.sex = sex || this.sex
  }
  speak() {
    console.log('啊这')
  }
}
const p = new Person('Alex')
p.speak()
console.log(p)
console.log(p.getSex())
```

2. 静态方法(类的方法)

```js
static speak(){
  // this指向类
    console.log('人类可以说话')
}
```

3. 静态属性(类的属性)

```js
// 这是一个最近添加到 JavaScript 的特性,可以在最近的 Chrome 工作
static version='1.0'
// 推荐 将属性变成方法
static getVersion(){
    return '1.0'
}
```

### 私有属性和方法

::: tip 新提案

这是一个最近添加到 JavaScript 的特性，它为私有属性和方法提供语言级支持。

私有属性和方法应该以 `#` 开头。它们只在类的内部可被访问：

```javascript
class Foo {
  // 必须声明，否则会报错：‘Private field '#a' must be declared in an enclosing class’ 普通属性无需这样做
  #a
  #b
  constructor(a, b) {
    this.#a = a
    this.#b = b
  }
  #sum() {
    return this.#a + this.#b
  }
  printSum() {
    console.log(this.#sum())
  }
}
```

上面代码中，`#a,#b`为私有属性（必须在类中声明），`#sum()`就是一个私有方法。

:::

私有方法和私有属性，是只能在类的内部访问的方法和属性，外部不能访问。这是常见需求，有利于代码的封装，但 ES6 不提供，只能通过变通方法模拟实现。

模拟私有属性和方法：`_`开头表示私有，属性或方法名用下划线开头（业界规定这样的属性或方法表示私有，不应该随意改动，但不具备很强的约束力）

```js
class Person {
  constructor(name) {
    this._name = name
  }
  getName() {
    return this._name
  }
}

const p = new Person('alex')
console.log(p.getName())
```

将私有属性和方法移出类,从根本上解决问题

```js
;(function () {
  let name = ''
  class Person {
    constructor(username) {
      name = username
    }
    getName() {
      return name
    }
  }
  // 将Person类暴露到全局
  window.Person = Person
})()

const p = new Person('alex')
console.log(p.name)
// 只能通过暴露出的方法访问属性
console.log(p.getName())
```

## 存取器

使用 getter 和 setter 可以改变属性的赋值和读取行为：

```js
class Animal {
  constructor(name) {
    this.name = name
  }
  get name() {
    return 'Jack'
  }
  set name(value) {
    console.log('setter: ' + value)
  }
}

let a = new Animal('Kitty') // setter: Kitty
a.name = 'Tom' // setter: Tom
console.log(a.name) // Jack
```

## 继承

### extends

::: warning 注意

在 `class` 方法中，继承是使用 `extends` 关键字来实现的。子类必须在 `constructor()`调用 `super()`方法，否则新建实例时会报错

报错的原因是：子类是没有自己的 `this`对象的，它只能继承自父类的 `this` 对象，然后对其进行加工，而`super()`就是将父类中的` this` 对象继承给子类的。没有 `super`，子类就得不到 `this `对象。

但是 子类中不写 `constructor` 可以不写 `super`

:::

```js
class Person {
  constructor(name, sex) {
    this.name = name
    this.sex = sex
    this.say = function () {
      console.log('say')
    }
  }
  speak() {
    console.log('speak')
  }
  // 静态属性和方法是可被继承的
  static speak() {
    console.log('staic')
  }
}
Person.version = '1.0'
class Programmer extends Person {
  //实现继承的关键语句
  constructor(name, sex, feature) {
    // this 操作不能放在 super 前面
    super(name, sex) //实现继承的关键语句
    this.feature = feature
  }

  // 子类可以定义属于自己的特有方法
  hi() {
    console.log('hi')
  }

  // 子类如果定义同名函数，就会覆盖父类的函数
  speak() {
    console.log('Programmer speak')
  }
}

const zs = new Programmer('zs', '男', '秃头')

// 继承的父类的方法和属性
console.log(zs.name)
console.log(zs.sex)
zs.say()
Programmer.speak()
console.log(Programmer.version)

// 子类独有的方法和属性
console.log(zs.feature)
zs.speak()
zs.hi()
```

### super

#### 作为函数调用

- `super` 可以作为函数调用，形式是 `super(参数 1, 参数 2, ...)`
- 代表**父类的构造方法**，只能用在子类的构造方法中，用在其他地方就会报错
- `super` 虽然代表了父类的构造方法，但是内部的 this 指向子类的实例

#### 作为对象使用 <Badge text="了解"/>

`super` 还可以作为对象调用，形式是 `super.函数名()`

(1) 在构造方法中使用或在一般方法中使用

- super 代表父类的原型对象 `Person.prototype`
- 定义在父类 `constructor` 上的方法或属性，是**无法**通过 `super` 调用的
- 通过`super`调用`父类`的方法时,方法内部的` this` 指向**当前的子类实例**

```js
class Person {
  constructor(name, sex) {
    this.name = name
    this.sex = sex
  }
  speak() {
    console.log(this.name + 'speak')
  }
}
class Programmer extends Person {
  constructor(name, sex) {
    super(name, sex)
    super.speak()
  }
}
const p = new Programmer('frank', 'male')
```

(2) 在静态方法中使用

- `super` 代表的是**父类**，而不是父类的原型对象
- 通过 `super` 调用父类的方法时，父类静态方法内部的 `this` 指向当前的子类，而不是子类的实例

```js
class Person {
  constructor(name, sex) {
    this.name = name
  }
  static speak() {
    console.log('person speak')
  }
}
class Programmer extends Person {
  constructor(name, sex) {
    super(name, sex)
  }
  static speak() {
    super.speak()
    console.log('p speak')
  }
}
Programmer.speak()
```
