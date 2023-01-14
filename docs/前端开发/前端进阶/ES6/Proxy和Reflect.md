---
title: Proxy和Reflect
tag:
  - Proxy
  - Reflect
category:
  - 前端进阶
  - ES6
---

## Proxy

_`Proxy` 可以理解成，在目标对象之前架设一层“拦截”，外界对该对象的访问，都必须先通过这层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写。_

ES6 原生提供 Proxy 构造函数，用来生成 Proxy 实例

```js
const proxy = new Proxy(target, handler)
```

`new Proxy()`表示生成一个`Proxy`实例，`target`参数表示所要拦截的目标对象，`handler`参数也是一个对象，用来定制拦截行为。

```js
const obj = new Proxy(
  {},
  {
    get: function (target, propKey) {
      return 199
    },
  }
)
console.log(obj.name) // 119

```

::: warning 注意

要使得`Proxy`起作用，必须针对`Proxy`实例进行操作(上例是obj)，而不是针对目标对象（上例是空对象）**进行操作**

:::

下面是拦截器支持的主要操作：

### get()

`get`方法用于拦截某个属性的读取操作，可以接受三个参数，依次为目标对象、属性名和 proxy 实例本身，其中最后一个参数可选

```js
const proxy = new Proxy(person, {
  get(target, propName) {
    if (propName in target) {
      return target[propName]
    } else {
      throw new Error(`${propName}不存在`)
    }
  },
})
console.log(proxy.age) // 抛出一个错误
```

上面代码表示，如果访问目标对象不存在的属性，会抛出一个错误。如果没有这个拦截函数，访问不存在的属性，只会返回`undefined`。

`get`方法可以继承。

```js
let proto = new Proxy(
  {},
  {
    get(target, propName) {
      console.log(`get${propName}`)
      return target[propName]
    },
  }
)
let obj = Object.create(proto)

console.log(obj.foo) // "getfoo"
// undefined
```

上面代码表示，拦截操作定义在`proto`上面，所以如果读取`obj`对象继承的属性时，拦截会生效。

下面的例子使用`get`拦截，实现数组读取负数的索引

```js
const createArray = (...elements) => {
  let handler = {
    get(target, propKey) {
      let index = Number(propKey)
      if (index < 0) propKey = String(target.length + index)
      return Reflect.get(target, propKey)
    },
  }
  let target = []
  target.push(...elements)
  return new Proxy(target, handler)
}
let arr = createArray(2, 3, 4)
console.log(arr[-2]) //3
```

下面的例子则是利用`get`拦截，实现一个生成各种 DOM 节点的通用函数`dom`。

```js
const dom = new Proxy(
  {},
  {
    get(target, propetry) {
      return (attrs = {}, ...children) => {
        // 创造元素
        const el = document.createElement(propetry)
        // 设置传递的属性
        for (let prop of Object.keys(attrs)) {
          el.setAttribute(prop, attrs[prop])
        }
        // 处理子元素
        for (child of children) {
          if (typeof child === 'string') child = document.createTextNode(child)
          el.appendChild(child)
        }
        return el
      }
    },
  }
)

const el = dom.div(
  { style: 'font-size:20px' },
  'Hello, my name is ',
  dom.a({ href: 'https://zfhblog.top' }, 'Frank'),
  '. I like:',
  dom.ul(
    {},
    dom.li({}, 'react'),
    dom.li({}, 'vue'),
    dom.li({}, "…actually that's it")
  )
)
document.body.appendChild(el)
```

下面是一个`get`方法的第三个参数的例子，它总是指向原始的读操作所在的那个对象，一般情况下就是 Proxy 实例。

```javascript
const proxy = new Proxy(
  {},
  {
    get: function (target, key, receiver) {
      return receiver
    },
  }
)
proxy.getReceiver === proxy // true
```

上面代码中，`proxy`对象的`getReceiver`属性是由`proxy`对象提供的，所以`receiver`指向`proxy`对象。

```javascript
const proxy = new Proxy(
  {},
  {
    get: function (target, key, receiver) {
      return receiver
    },
  }
)

const d = Object.create(proxy)
d.a === d // true
```

上面代码中，`d`对象本身没有`a`属性，所以读取`d.a`的时候，会去`d`的原型`proxy`对象找。这时，`receiver`就指向`d`，代表原始的读操作所在的那个对象。

如果一个属性不可配置（configurable）且不可写（writable），则 Proxy 不能修改该属性，否则通过 Proxy 对象访问该属性会报错。

```js
const target = Object.defineProperties(
  {},
  {
    foo: {
      value: 123,
      writable: false,
      configurable: false,
    },
  }
)

const handler = {
  get(target, propKey) {
    return 'abc'
  },
}

const proxy = new Proxy(target, handler)

proxy.foo
// TypeError: Invariant check failed
```

### set()

`set`方法用来拦截某个属性的赋值操作，可以接受四个参数，依次为目标对象、属性名、属性值和 Proxy 实例本身，其中最后一个参数可选。

假定`Person`对象有一个`age`属性，该属性应该是一个不大于 200 的整数，那么可以使用`Proxy`保证`age`的属性值符合要求。 

```js
let validator = {
  set: function(obj, prop, value) {
    if (prop === 'age') {
      if (!Number.isInteger(value)) {
        throw new TypeError('The age is not an integer');
      }
      if (value > 200) {
        throw new RangeError('The age seems invalid');
      }
    }

    // 对于满足条件的 age 属性以及其他属性，直接保存
    obj[prop] = value;
    return true;
  }
};

let person = new Proxy({}, validator);

person.age = 100;

person.age // 100
person.age = 'young' // 报错
person.age = 300 // 报错
```

 

::: tip 相关文章推荐

- [为什么 Proxy 一定要配合 Reflect 使用](https://juejin.cn/post/7080916820353351688)

:::
