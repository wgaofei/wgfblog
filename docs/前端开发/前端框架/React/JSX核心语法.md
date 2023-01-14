---
title: JSX核心语法
category:
  - 前端框架
  - React
icon: jsx-
order: 1
---

::: tip 修订记录 📝

2022.11.30 开始更新文档内容至`React 18`,移除弃用的`API,`添加新特性，全面拥抱`hook`

:::

## 认识 JSX

`JSX` 是 `JavaScript` 的语法扩展，`JSX` 使得我们可以以类似于 `HTML` 的形式去使用` JS`。`JSX`便是`React`中声明式编程的体现方式。使用`JSX`将我们所期望的网页结构编写出来，然后`React`再根据`JSX`自动生成`JS`代码

## JSX 的书写规范

- `JSX `的顶层只能有一个根元素，所以我们很多时候会在外层包裹一个 `div` 原生

- 为了方便阅读，我们通常在 `jsx `的外层包裹一个小括号()，这样可以方便阅读，并且 `jsx `**可以进行换行书写**

```jsx
            render(){
                return (
                <div>'hello,world'</div>
                )
            }
```

- `JSX` 中的标签可以是单标签，也可以是双标签(注意：如果是单标签，必须以`/>`结尾)

## JSX 中的注释

```jsx
{
  /*我是一段注释*/
}
```

## JSX 嵌入变量

- 情况一：当变量是`Number`、`String`、`Array`类型时，可以直接显示

```jsx
render(){
    return (
    <div>
    <h2>{this.state.arr}<h2>
    </div>
    )
}
```

- 情况二：当变量是`null`、`undefined`、`Boolean`类型时，内容为空；

  - 如果希望可以显示 `null`、`undefined`、`Boolean`，那么需要转成字符串；
  - 转换的方式有很多，比如`toString` 方法、和空字符串拼接，`String(变量)`等方式

情况三：对象类型不能显示`Objects are not valid as a React child`

## JSX 嵌入表达式

- 运算表达式
- 三元运算符
- 执行一个函数

```js
class App extends React.Component {
  constructor() {
    super()
    this.state = {
      xing: 'zhang',
      ming: 'fanhang',
    }
  }
  render() {
    return <div>{this.getFullName()}</div> /*执行一个函数*/
  }
  getFullName() {
    return this.state.xing + this.state.ming
  }
}
```

## JSX 绑定属性

- 比如元素都会有 `title` 属性

```jsx
<div title={this.state.title}></div>
```

- 比如 `img `元素会有 `src `属性(有坑注意 ⚠️)

- 比如 `a` 元素会有 `href` 属性
- 比如元素可能需要绑定 `class`

::: warning 注意
这里必须写`className`,不能写`class`
:::

绑定普通类名：

```jsx
<div className="active"></div>
```

动态添加类名:

```jsx
<div className={`fz30 ${this.state.active && 'active'}`}>hello,world</div>
```

动态类名可以使用这个第三方的库： [classnames](https://github.com/JedWatson/classnames)

```jsx
classNames('foo', 'bar') // => 'foo bar'
classNames('foo', { bar: true }) // => 'foo bar'
classNames({ 'foo-bar': true }) // => 'foo-bar'
classNames({ 'foo-bar': false }) // => ''
classNames({ foo: true }, { bar: true }) // => 'foo bar'
classNames({ foo: true, bar: true }) // => 'foo bar'

// lots of arguments of various types
classNames('foo', { bar: true, duck: false }, 'baz', { quux: true }) // => 'foo bar baz quux'

// other falsy values are just ignored
classNames(null, false, 'bar', undefined, 0, 1, { baz: null }, '') // => 'bar 1'

// Arrays will be recursively flattened (扁平化) as per the rules above:
var arr = ['b', { c: true, d: false }]
classNames('a', arr) // => 'a b c'

// If you're in an environment that supports computed (计算) keys (available in ES2015 and Babel) you can use dynamic class names
let buttonType = 'primary'
classNames({ [`btn-${buttonType}`]: true })
```

- 比如原生使用内联样式`style`
  ::: warning 注意
  在 `jsx `中书写` css` 属性时，必须使用小驼峰：`font-size` 必须写为 `fontSize`，且必须为**JavaScript 样式对象**
  :::

```jsx
<img style={{ width: '140px', height: '140px' }} />
```

## React 事件绑定

如果原生 `DOM` 原生有一个监听事件，我们可以如何操作呢？

方式一：获取 `DOM `原生，添加监听事件:`object.onclick=function(){SomeJavaScriptCode}`

方式二：在 `HTML `原生中，直接绑定 `onclick`:`<element onclick="SomeJavaScriptCode" />`

`React `中的事件监听与原生`DOM`主要有两点不同

`React `事件的命名采用小驼峰式`camelCase`，而不是纯小写=>`onClick`

我们需要通过`{}`传入一个事件处理函数，这个函数会在事件发生时被执行

### this 的绑定问题

在`button`点击事件执行后，我们可能需要获取当前类的对象中相关的属性，这个时候需要用到`this`

如果我们这里直接打印` this`，也会发现它是一个 `undefined`

**为什么是 `undefined` 呢？**

原因是`button`点击事件处理函数并不是我们主动调用的，而且当点击事件发生改变时，`React `内部调用了该事件处理函数，而它内部调用时，并不知道要如何绑定正确的 `this`

**如何解决 `this` 的问题呢？**

方案一：`bind` 给 `btnClick` 显示绑定 `this`

```jsx
<button onClick={this.btnClick.bind(this)}>Click</button>
```

方案二：事件监听时传入箭头函数（推荐）

```js
// this 为上一层render() 函数的this
<button
  onClick={() => {
    this.btnClick()
  }}
>
  Click
</button>
```

### 事件参数传递

[官方文档:向事件处理程序传递参数](https://zh-hans.reactjs.org/docs/handling-events.html#passing-arguments-to-event-handlers)

在执行事件函数时，有可能我们需要获取一些参数信息：比如 `event` 对象、其他参数

情况一：获取 `event` 对象

- 很多时候我们需要拿到 `event` 对象来做一些事情（比如阻止默认行为）

- 假如我们**用不到`this`**，那么直接传入函数就可以获取到 `event` 对象

```jsx
            render() {
                return (
                    <div>
                        <div>'hello,world'</div>
                        <button onClick={this.btnClick}>click</button>
                    </div>
                )
            }
            btnClick(event) {
                console.log(event)
            }
```

情况二：获取更多参数
有更多参数时，我们最好的方式就是通过箭头函数的方式，此时事件对象必须显式的进行传递

```jsx
<button
  onClick={(event) => {
    this.btnClick(item, index, event)
  }}
>
  Click
</button>
```

当然下面这种方式也是可以的，注意这里不要显式传入`event`参数,通过 `bind` 的方式，事件对象会被作为最后一个参数隐式的进行传递

```jsx
<button onClick={this.btnClick.bind(this, item, index)}>Click</button>
```

## React 条件渲染

某些情况下，界面的内容会根据不同的情况显示不同的内容，或者决定是否渲染某部分内容：

- 在 `vue `中，我们会通过指令来控制：比如` v-if`、`v-show`
- 在 `React` 中，所有的条件判断都和普通的 `JavaScript` 代码一致

常见的条件渲染的方式有哪些呢？

1. 条件判断语句:适合逻辑较多的情况

```js
let welcome = null
if (this.state.isLogin) {
  welcome = '欢迎回来'
} else {
  welcome = '马上登录'
}
return <div>{welcome}</div>
```

2. 三元运算符:适合逻辑比较简单

```js
return <div>{this.state.isLogin ? '欢迎回来' : '马上登录'}</div>
```

3. 与运算符&&: 适合如果条件成立，渲染某一个组件；如果条件不成立，什么内容也不渲染；

```jsx
// ...
class App extends React.Component {
  constructor() {
    super()
    this.state = {
      login: true,
    }
  }
  render() {
    const login = this.state.login
    return <div>{login && <IsLogin />}</div>
  }
}
```

`v-show` 的效果:主要是控制 `display` 属性是否为 `none`

```jsx
<h2 style={{ display: isLogin ? 'block' : 'none' }}>欢迎回来</h2>
```

## React 列表渲染

在 `React `中并没有像 `Vue`模版语法中的 `v-for`指令，而且需要我们通过`JavaScript`代码的方式组织数据，转成`JSX`：

在 `React` 中，展示列表最多的方式就是**使用数组的 `map`高阶函数**:

```jsx
class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      movie: ['流浪地球', '长津湖', '信条', '肖生客的救赎'],
    }
  }
  render() {
    return (
      <div>
        <ul>
          {this.state.movie.map((item) => {
            return <li>{item}</li>
          })}
        </ul>
      </div>
    )
  }
}
ReactDOM.render(<App />, document.getElementById('app'))
```

很多时候我们在展示一个数组中的数据之前，需要先对它进行一些处理：

比如**过滤掉一些内容：`filter` 函数**

比如**截取数组中的一部分内容：`slice` 函数**
