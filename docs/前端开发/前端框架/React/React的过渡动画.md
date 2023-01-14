---
title: React的过渡动画
category:
  - 前端框架
  - React
icon: donghua
order: 7
---

[官方文档](https://reactcommunity.org/react-transition-group/)

## react-transition-group

`react-transition-group`可以帮助我们方便的实现组件的 入场 和 离场 动画，使用时需要进行额外的安装：

:::code-tabs

@tab npm

```shell
npm add react-transition-group
```

@tab yarn

```npm
yarn add react-transition-group
```

:::

## CSSTransition

CSSTransition 执行过程中，有三个状态：`appear`(初次入场)、`enter`(入场)、`exit`退场)

它们对应的 CSS 样式：

- 第一类,开始状态：对于的类是`-appear`、`-enter`、`-exit`
- 第二类,执行动画：对应的类是`-appear-active`、`-enter-active`、`-exit-active`
- 第三类,执行结束：对应的类是`-appear-done`、`-enter-done`、`-exit-done`

### CSSTransition 常见属性

#### in

触发进入或者退出状态

- 如果添加了 `unmountOnExit`，那么该组件会在执行退出动画结束后被移除掉；
- 当 `in` 为` true` 时，触发进入状态，会添加`-enter`、`-enter-acitve` 的`class`，当动画执行结束后，会移除这两个 `class`，并且添加`-enter-done` 的 `class`
- 当 `in` 为 `false `时，触发退出状态，会添加`-exit`、`-exit-active` 的 `class`开始执行动画，当动画执行结束后，会移除这两个 `class`，并且添加`-done-done` 的 `class`

::: tip 比如说，一个 div 的显示/隐藏动画

1. `div `显示:对应的` class` 为` card-enter` `card-enter-active` 动画走完为 `card-enter-done`
2. `div `消失:对应的`class`为 `card-exit` `card-exit-active` 动画走完为 `card-exit-done`

:::

#### classNames

动画 `class` 的名称

决定了在编写 `css` 时，设置为`card`对应的 `class` 名称：比如 `card-enter`、`card-enter-active`、`card-enter-done`

这些类名也可以自定义，如：

```jsx
classNames={{
 appear: 'my-appear',
 appearActive: 'my-active-appear',
 appearDone: 'my-done-appear',
 enter: 'my-enter',
 enterActive: 'my-active-enter',
 enterDone: 'my-done-enter',
 exit: 'my-exit',
 exitActive: 'my-active-exit',
 exitDone: 'my-done-exit',
}}
```

这里就可以结合`animate.css`实现动画：

```jsx
import { useState } from 'react'

import { CSSTransition } from 'react-transition-group'

function CssAni(props) {
  const [show, setShow] = useState(true)
  return (
    <div>
      <button
        onClick={() => {
          setShow(!show)
        }}
      >
        show
      </button>
      <CSSTransition
        timeout={3000}
        unmountOnExit
        in={show}
        classNames={{
          enter: 'animate__animated',
          enterActive: 'animate__backInRight',
          exit: 'animate__animated',
          exitActive: 'animate__backOutRight',
        }}
      >
        <div
          style={{ width: '200px', height: '300px', backgroundColor: 'black' }}
        >
          ...
        </div>
      </CSSTransition>
    </div>
  )
}

export default CssAni
```

#### timeout <Badge text='必需的属性' type='dange' />

类添加删除的时间，动画/过渡的时间还是得通过`css`设置

#### appear

是否在初次进入添加动画（需要和 `in` 同时为` true`）

#### unmountOnExit

退出后卸载组件(移除 `DOM `节点)

## 一个栗子 🌰

::: code-tabs

@tab CSS.jsx

```jsx
import { CSSTransition } from 'react-transition-group'
import { useState } from 'react'
import './CSS.css'

function Css(props) {
  const [show, setShow] = useState(true)
  return (
    <div>
      <button
        onClick={() => {
          setShow(!show)
        }}
      >
        show
      </button>
      <CSSTransition
        timeout={2000}
        in={show}
        appear={true}
        classNames="card"
        unmountOnExit
      >
        <div className="box"></div>
      </CSSTransition>
    </div>
  )
}

export default Css
```

@tab CSS.css

```css
.card-enter {
  opacity: 0;
  transform: scale(0.7);
}

.card-enter-active {
  opacity: 1;
  transform: scale(1);
  transition: all 300ms;
}

.card-appear {
  opacity: 0;
  transform: scale(0.7);
}

.card-appear-active {
  opacity: 1;
  transform: scale(1);
  transition: all 300ms;
}

.card-exit {
  opacity: 1;
  transform: scale(1);
}

.card-exit-active {
  opacity: 0;
  transform: scale(0.7);
  transition: all 300ms;
}

.box {
  width: 200px;
  height: 200px;
  background-color: #000;
}
```

:::

## SwitchTransition

`SwitchTransition` 可以完成两个组件之间切换的炫酷动画：

- 比如我们有一个按钮需要在 `on` 和 `off` 之间切换，我们希望看到 `on` 先从左侧退出，`off` 再从右侧进入
- 这个动画在 `vue` 中被称之为 `vue transition modes`(过渡模式)
- `react-transition-group` 中使用 `SwitchTransition `来实现该动画

SwitchTransition 中主要有一个属性：`mode`，有两个值

- `in-out`：表示新组件先进入，旧组件再移除
- `out-in`：表示就组件先移除，新组建再进入

如何使用 `SwitchTransition` 呢？

- `SwitchTransition` 组件里面要有 `CSSTransition` 组件，不能直接包裹你想要切换的组件
- `SwitchTransition` 里面的 `CSSTransition` 组件不再像以前那样接受 `in `属性来判断元素是何种状态，取而代之的是` key` 属性

::: code-tabs

@tab Switch.jsx

```jsx
import { SwitchTransition, CSSTransition } from 'react-transition-group'
import { useState } from 'react'
import './Switch.css'
function SWitch(props) {
  const [isShow, setShow] = useState(false)
  return (
    <div>
      <SwitchTransition mode="out-in">
        <CSSTransition
          key={isShow ? 'on' : 'off'}
          classNames="btn"
          timeout={1000}
        >
          <button
            style={{
              marginBottom: '20px',
              marginTop: '20px',
              marginLeft: '30px',
            }}
            onClick={() => {
              setShow(!isShow)
            }}
          >
            {isShow ? '隐藏' : '显示'}
          </button>
        </CSSTransition>
      </SwitchTransition>
    </div>
  )
}

export default SWitch
```

@tab Switch.css

```css
.btn-enter {
  opacity: 0;
  transform: translateX(100%);
}

.btn-enter-active {
  opacity: 1;
  transform: translateX(0);
  transition: all 1000ms;
}

.btn-exit {
  opacity: 1;
  transform: translateX(0);
}

.btn-exit-active {
  opacity: 0;
  transform: translateX(-100%);
  transition: all 1000ms;
}
```

:::

## TransitionGroup <Badge text='似乎不太常用' type='warning' />

当我们有一组动画时，需要将这些 `CSSTransition` 放入到一个 `TransitionGroup` 中来完成动画,常用于列表
