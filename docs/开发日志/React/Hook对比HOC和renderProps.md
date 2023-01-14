---
title: Hook对比HOC和renderProps
category:
  - 开发日志
  - React
---

在 React 开发中，Hook，HOC 和 renderProps 它们均可以完成组件状态逻辑的复用

从难易程度上来说 Hook 相对于其余两种方式写起来要容易的多

现在我以 React 官方文档 中的[renderProps](https://zh-hans.reactjs.org/docs/render-props.html) 一节里的鼠标移动案例，以三种方式编写，通过对比三种方式的难易程度显而易见

## renderProps

renderProps 本质上是一个用于告知组件需要渲染什么内容的函数 prop

```jsx
import React from 'react'

class Logo extends React.Component {
  render() {
    const position = this.props.position
    return (
      <img
        src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii0xMS41IC0xMC4yMzE3NCAyMyAyMC40NjM0OCI+CiAgPHRpdGxlPlJlYWN0IExvZ288L3RpdGxlPgogIDxjaXJjbGUgY3g9IjAiIGN5PSIwIiByPSIyLjA1IiBmaWxsPSIjNjFkYWZiIi8+CiAgPGcgc3Ryb2tlPSIjNjFkYWZiIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIi8+CiAgICA8ZWxsaXBzZSByeD0iMTEiIHJ5PSI0LjIiIHRyYW5zZm9ybT0icm90YXRlKDYwKSIvPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIiB0cmFuc2Zvcm09InJvdGF0ZSgxMjApIi8+CiAgPC9nPgo8L3N2Zz4K"
        style={{
          position: 'absolute',
          left: position.x,
          top: position.y,
          width: '40px',
          height: '40px',
        }}
        alt="react-logo"
      />
    )
  }
}

class Mouse extends React.Component {
  constructor(props) {
    super(props)
    this.handleMouseMove = this.handleMouseMove.bind(this)
    this.state = { x: 0, y: 0 }
  }

  handleMouseMove(event) {
    this.setState({
      x: event.clientX,
      y: event.clientY,
    })
  }

  renderv() {
    return (
      <div style={{ height: '100vh' }} onMouseMove={this.handleMouseMove}>
        {/*
          使用 `render`prop 动态决定要渲染的内容，
          而不是给出一个 <Mouse> 渲染结果的静态表示
        */}
        {this.props.render(this.state)}
      </div>
    )
  }

  //卸载组件时，清除事件
  componentWillUnmount() {
    window.removeEventListener('mousemove', this.handleMouseMove)
  }
}

class MouseTracker extends React.Component {
  render() {
    return (
      <div>
        <h1>移动鼠标!</h1>
        <Mouse render={(position) => <Logo position={position} />} />
      </div>
    )
  }
}

export default MouseTracker
```

通过一个函数类型的 Prop，我们复用了 Mouse 组件的状态和逻辑。当然你也可以通过 children 传递它：

```jsx
<Mouse>
{ {x,y} => <p>鼠标的位置是{x}，{y}</p> }
</Mouse>

// 组件内部
this.props.ch is.state)
```

## HOC(高阶组件)

首先，高阶组件不是一个组件，而是一个函数，它的参数是一个组件，返回值也是一个组件

高阶组件通过包裹其他组件实现组件状态逻辑的复用

那么上面这个案例通过高阶组件实现：

```jsx
import React from 'react'

// 创建函数
function withMouse(WrappedComponent) {
  class Mouse extends React.Component {
    // 鼠标的位置状态
    state = {
      x: 0,
      y: 0,
    }

    // 当挂载时监听鼠标移动事件
    componentDidMount() {
      window.addEventListener('mousemove', this.handleMouseMove)
    }

    // 当组件移除时解绑事件
    componentWillUnmount() {
      window.removeEventListener('mousemove', this.handleMouseMove)
    }
    x
    handleMouseMove = (e) => {
      this.setState({
        x: e.clientX,
        y: e.clientY,
      })
    }

    render() {
      // 在render函数里面返回传递过来的组件，把当前组件的状态设置进去
      return <WrappedComponent {...this.state} {...this.props} />
    }
  }

  return Mouse
}

function Position(props) {
  return (
    <img
      src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii0xMS41IC0xMC4yMzE3NCAyMyAyMC40NjM0OCI+CiAgPHRpdGxlPlJlYWN0IExvZ288L3RpdGxlPgogIDxjaXJjbGUgY3g9IjAiIGN5PSIwIiByPSIyLjA1IiBmaWxsPSIjNjFkYWZiIi8+CiAgPGcgc3Ryb2tlPSIjNjFkYWZiIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIi8+CiAgICA8ZWxsaXBzZSByeD0iMTEiIHJ5PSI0LjIiIHRyYW5zZm9ybT0icm90YXRlKDYwKSIvPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIiB0cmFuc2Zvcm09InJvdGF0ZSgxMjApIi8+CiAgPC9nPgo8L3N2Zz4K"
      style={{
        position: 'absolute',
        left: props.x,
        top: props.y,
        width: '40px',
        height: '40px',
      }}
      alt="react-logo"
    />
  )
}

// 把position 组件来进行包装
let Logo = withMouse(Position)

class App extends React.Component {
  render() {
    return (
      <div>
        <Logo />
      </div>
    )
  }
}

export default App
```

## Hook

_Hook_ 是 React 16.8 的新增特性。它可以让你在不编写 class 的情况下使用 state 以及其他的 React 特性。_Hook_ 是开创性的，它解决了很多 React 之前的存在的问题，比如 this 指向问题、比如 hoc 的嵌套复杂度问题等等

那么这个例子通过*Hook* 实现是这样的：

```jsx
import { useEffect, useState } from 'react'

function Mouse(props) {
  const [position, setPostion] = useState({ x: 0, y: 0 })
  const handleMouseMove = (e) => {
    setPostion({ x: e.clientX, y: e.clientY })
  }
  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  })
  return (
    <div style={{ height: '100vh' }} onMouseMove={handleMouseMove}>
      {props.render(position)}
    </div>
  )
}

function Logo(props) {
  let position = props.position
  return (
    <img
      src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii0xMS41IC0xMC4yMzE3NCAyMyAyMC40NjM0OCI+CiAgPHRpdGxlPlJlYWN0IExvZ288L3RpdGxlPgogIDxjaXJjbGUgY3g9IjAiIGN5PSIwIiByPSIyLjA1IiBmaWxsPSIjNjFkYWZiIi8+CiAgPGcgc3Ryb2tlPSIjNjFkYWZiIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIi8+CiAgICA8ZWxsaXBzZSByeD0iMTEiIHJ5PSI0LjIiIHRyYW5zZm9ybT0icm90YXRlKDYwKSIvPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIiB0cmFuc2Zvcm09InJvdGF0ZSgxMjApIi8+CiAgPC9nPgo8L3N2Zz4K"
      style={{
        position: 'absolute',
        left: position.x,
        top: position.y,
        width: '40px',
        height: '40px',
      }}
      alt="react-logo"
    />
  )
}

function App() {
  return (
    <div>
      <Mouse render={(position) => <Logo position={position} />} />
    </div>
  )
}

export default App
```
