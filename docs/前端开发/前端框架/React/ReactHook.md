---
title: React Hook
order: 8
category:
  - 前端框架
  - React
icon: hook
---

// TODO 待修改

## Class 组件存在的问题

1. 复杂组件变得难以理解：

   我们在最初编写一个 `class` 组件时，往往逻辑比较简单，并不会非常复杂。但是随着业务的增多，我们的 class 组件会变得越来越复杂

   比如 componentDidMount 中，可能就会包含大量的逻辑代码：包括网络请求、一些事件的监听（还需要在 componentWillUnmount 中移除）

   而对于这样的 class 实际上非常难以拆分：因为它们的逻辑往往混在一起，强行拆分反而会造成过度设计，增加代码的复杂度

2. 难以理解的 class：

   很多人发现学习 ES6 的 class 是学习 React 的一个障碍

   比如在 class 中，我们必须搞清楚 this 的指向到底是谁

3. [实现组件状态逻辑复用](https://blog.csdn.net/w_D_lufei/article/details/104091014)很难:

   在前面为了组件状态逻辑复用我们需要通过高阶组件或 render props(**🔎 详情见 react 组件化**)

   像我们之前学习的 redux 中 connect 或者 react-router 中的 withRouter，这些高阶组件设计的目的就是为了状态的复用

   或者类似于 Provider、Consumer 来共享一些状态，但是多次使用 Consumer 时，我们的代码就会存在很多嵌套

   **这些代码让我们不管是编写和设计上来说，都变得非常困难**

## 为什么需要 Hook？

Hook 是 React 16.8 的新增特性，它可以让我们在不编写 class 的情况下使用 state 以及其他的 React 特性（比如生命周期）

我们先来思考一下 class 组件相对于函数式组件有什么优势？比较常见的是下面的优势：

- class 组件可以定义自己的 state，用来保存组件自己内部的状态；函数式组件不可以，因为函数每次调用都会产生新的临时变量；

- class 组件有自己的生命周期，我们可以在对应的生命周期中完成自己的逻辑；比如在 componentDidMount 中发送网络请求，并且该生命周期函数只会执行一次；函数式组件在学习 hooks 之前，如果在函数中发送网络请求，意味着每次重新渲染都会重新发送一次网络请求；

- class 组件可以在状态改变时只会重新执行 render 函数以及我们希望重新调用的生命周期函数 componentDidUpdate 等函数式组件在重新渲染时，整个函数都会被执行，似乎没有什么地方可以只让它们调用一次；

所以，在 Hook 出现之前，对于上面这些情况我们通常都会编写 class 组件

## Hook 的出现

Hook 可以让我们在不编写 class 的情况下使用 state 以及其他的 React 特性

Hook 的出现基本可以代替我们之前所有使用 class 组件的地方（除了一些非常不常用的场景）

## Hook 规则

1.  只在最顶层使用 Hook。**不要在循环，条件或嵌套函数中调用 Hook，** 确保总是在你的 React 函数的最顶层以及任何 return 之前调用他们

1.  只在 React 函数（函数组件，自定义 Hook）中调用 Hook，**不要在普通的 JavaScript 函数中调用 Hook**

## useState

`useState` 来自 `react`，需要从 `react `中导入，它是一个 `hook`

- 参数：初始化值
- 返回值：数组，包含两个元素
  - 元素一：当前状态的值（第一调用为初始化值）
  - 元素二：设置状态值的函数

`useState`会帮助我们定义一个 `state` 变量，`useState` 是一种新方法，它与 `class` 里面的 `this.state` 提供的功能完全相同。一般来说，在函数退出后变量就会“消失”，而 `state` 中的变量会被 `React` 保留

`useState` 接受唯一一个参数，在第一次组件被调用时使用来作为初始化值

`useState` 是一个数组，我们可以通过数组的解构，来完成赋值会非常方便

```jsx
import { useState } from 'react'

export default function App() {
  const [friends, setFriends] = useState([
    {
      name: 'frank',
      age: 10,
    },
    {
      name: 'zhang',
      age: 123,
    },
  ])

  function addAge(index) {
    const newFriends = [...friends]
    newFriends[index].age += 1
    setFriends(newFriends)
  }

  return (
    <div>
      <ul>
        {friends.map((item, index) => {
          return (
            <li key={index}>
              {item.name},{item.age},
              <button
                onClick={(e) => {
                  addAge(index)
                }}
              >
                age+1
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
```

### 函数式更新

如果新的 `state` 需要通过使用先前的 `state`计算得出，那么可以将函数传递给 `setState`。该函数将接收先前的 `state`，并返回一个更新后的值。下面的计数器组件示例展示了 `setState` 的两种用法：

```jsx
function Counter({ initialCount }) {
  const [count, setCount] = useState(initialCount)
  return (
    <>
      Count: {count}
      <button onClick={() => setCount(initialCount)}>Reset</button>
      <button onClick={() => setCount((prevCount) => prevCount - 1)}>-</button>
      <button onClick={() => setCount((prevCount) => prevCount + 1)}>+</button>
    </>
  )
}
```

## useEffect

useEffect 要求我们传入一个回调函数，默认情况下，无论是第一次渲染之后，还是每次 DOM 更新之后，都会执行这个回调函数

`useEffect `可以看作是 componentDidMount,componentDidUpdate , componentWillUnmount 这三个函数的组合

```jsx
import { useEffect, useState } from 'react'

export default () => {
  const [count, setCount] = useState(1)
  useEffect(() => {
    // 网页标题和count同步
    // 如果采用class组件实现相同的功能
    // 需要在componentDidMount,componentDidUpdate 两个生命周期函数中，
    // 编写相同的逻辑代码
    document.title = count
  })
  return (
    <div>
      {count}
      <button
        onClick={() => {
          setCount((prevCount) => prevCount + 1)
        }}
      >
        +1
      </button>
    </div>
  )
}
```

### 需要清除 Effect

在 class 组件的编写过程中，某些副作用的代码，我们需要 componentWillUnmount 中进行清除，比如我们之前的事件总线或 Redux 中手动调用 subscribe，都需要在 componentWillUnmount 有对应的取消订阅

useEffect 传入的回调函数 A 本身可以有一个返回值，这个返回值是另外一个回调函数 B，如此可以将添加和移除订阅的逻辑放在一起。React 会在组件更新和卸载的时候执行清除操作

::: tip react 中文文档此处翻译会让人产生误解

When exactly(究竟) does React clean up an effect? React performs(执行) the cleanup when the component unmounts. However, as we learned earlier, effects run for every render and not just once. This is why React **also** cleans up effects from the previous render before running the effects next time.

**summary** :react performs the cleanup when the componrnt unmount and update

:::

```jsx
useEffect(() => {
  // ,....
  return () => {
    // cleanup
  }
})
```

### 使用多个 Effect

Hook 允许我们按照代码的用途分离它们， 而不是像生命周期函数那样,React 将按照 effect 声明的顺序依次调用组件中的每一个 effect

### Effect 性能优化

默认情况下，useEffect 的回调函数会在每次渲染时都重新执行，但是这会导致两个问题

某些代码我们只是希望执行一次即可，类似于 componentDidMount 和 componentWillUnmount 中完成的事情（比如网 络请求、订阅和取消订阅）

另外，多次执行也会导致一定的性能问题

我们如何决定 useEffect 在什么时候应该执行和什么时候不应该执行呢？

useEffect 实际上有两个参数：

- 参数一：执行的回调函数
- 参数二：一个数组;其中存放的元素发生变化时，effect 会重新执行；如果数组中有多个元素，即使只有一个元素发生变化，React 也会执行 effect。

如果你要使用此优化方式，请确保数组中包含了**所有外部作用域中会随时间变化并且在 effect 中使用的变量**（同时满足这两个条件），否则你的代码会引用到先前渲染中的旧变量，如下面的代码所示：

```jsx
import { useEffect, useState } from 'react'

export default () => {
  const [count, setCount] = useState(1)
  const [login, setLogin] = useState(false)
  useEffect(() => {
    console.log(`count增加了`, count)
    console.log(login) //  看这里 输出有问题
  }, [count])
  useEffect(() => {
    console.log('第二个effect')
  }, [login])
  return (
    <div>
      {count}
      <button onClick={(event) => setCount(count + 1)}>+</button>
      <button onClick={(event) => setLogin(!login)}>
        {login ? '已登陆' : '未登录'}
      </button>
    </div>
  )
}
```

如果想执行只运行一次的 effect（仅在组件挂载和卸载时执行），可以传递一个空数组（`[]`）作为第二个参数。这就告诉 React 你的 effect 不依赖于 props 或 state 中的任何值，所以它永远都不需要重复执行

## useContext

在之前的开发中，我们要在组件中使用共享的 Context 有两种方式：

- 类组件可以通过 类名.contextType = MyContext 方式，在类中获取 context
- 多个 Context 或者在函数式组件中通过 MyContext.Consumer 方式共享 context；

但是多个 Context 共享时的方式会存在大量的嵌套

Context Hook 允许我们通过 Hook 来直接获取某个 Context 的值:

```jsx
import React, { Component, useContext, useEffect } from 'react'

const MyContext = React.createContext()
const MyContext2 = React.createContext()

function User() {
  //  useContext 的参数必须是 context 对象本身
  const user = useContext(MyContext)
  const user2 = useContext(MyContext2)
  useEffect(() => {
    console.log(user, user2)
  })
  return (
    <div>
      {user.age},{user.name}
    </div>
  )
}

export default class App extends Component {
  constructor() {
    super()
    this.state = {
      name: 'frank',
      age: 123,
    }
  }

  render() {
    return (
      <div>
        <MyContext.Provider value={this.state}>
          <MyContext2.Provider value={{ name: 'frank123' }}>
            <User />
          </MyContext2.Provider>
        </MyContext.Provider>
      </div>
    )
  }
}
```

## useReducer

useReducer 仅仅是 useState 的一种替代方案：

- 在某些场景下，如果 state 的处理逻辑比较复杂，我们可以通过 useReducer 来对其进行拆分
- 或者这次修改的 state 需要依赖之前的 state 时，也可以使用

不同组件之间数据是不会共享的，它们只是使用了相同的 counterReducer 的函数而已；所以，useReducer 只是 useState 的一种替代品，并不能替代 Redux

## useCallback

useCallback 实际的目的是为了进行性能的优化。

如何进行性能的优化呢？

- useCallback 会返回一个函数的 memoized（记忆的） 值
- 在依赖不变的情况下，多次定义的时候，返回的值是相同的

通常使用 useCallback 的目的是不希望子组件进行多次渲染，并不是为了函数进行缓存

1. 使用 useCallback 定义一个函数**不会**带来性能的优化

```jsx
import { useState, useCallback } from 'react'

export default () => {
  console.log('app渲染了！')
  const [count, setCount] = useState(0)
  const add1 = () => {
    console.log('执行add---1')
    setCount(count + 1)
  }
  //重新渲染，依然存在函数创建的过程
  const add2 = useCallback(() => {
    console.log('执行add---2')
    setCount(count + 1)
  }, [count])
  return (
    <div>
      <h1>{count}</h1>

      <button
        onClick={() => {
          add1()
        }}
      >
        add1
      </button>
      <button
        onClick={() => {
          add2()
        }}
      >
        add2
      </button>
    </div>
  )
}
```

2. 使用 useCallback 定义一个函数传递给子组件**会**带来性能的优化

```jsx
import { useState, memo, useCallback } from 'react'

const MemoButton = memo(function Abutton(props) {
  console.log('Abutton已渲染,,,' + props.title)
  return (
    <div>
      <button onClick={props.add}>add1</button>
    </div>
  )
})

export default () => {
  console.log('app渲染了！')
  const [count, setCount] = useState(0)
  const [login, setLogin] = useState(false)
  const add1 = () => {
    console.log('执行add---1')
    setCount(count + 1)
  }
  const add2 = useCallback(() => {
    console.log('执行add---2')
    setCount(count + 1)
  }, [count])
  return (
    <div>
      <h1>{count}</h1>
      <MemoButton title={'add1'} add={add1} />
      // count不发生变化，每次传入的add函数都是同一个，加上memo带来了性能优化
      <MemoButton title={'add2'} add={add2} />
      <button
        onClick={() => {
          setLogin(!login)
        }}
      >
        切换
      </button>
    </div>
  )
}
```

## useMemo

::: tip

useMemo 和 useCallBack 的区别是 useMemo 是基于函数的返回值进行优化，返回值可以是对象，一个值，一个函数；useCallBack 则只能基于函数进行优化

:::

useMemo 实际的目的也是为了进行性能的优化

如何进行性能的优化呢？

- useMemo 返回的也是一个 memoized（记忆的） 值

- 在依赖不变的情况下，多次定义的时候，返回的值是相同的

```jsx
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b])
```

### 使用场景

进行大量的计算操作，是否有必须要每次渲染时都重新计算

```jsx
import { useMemo, useState } from 'react'

function bigNum(count) {
  console.log(`bigNum重新计算`)
  let total = 0
  for (let i = 0; i < count; i++) {
    total += i
  }
  return total
}
export default () => {
  const [count, setCount] = useState(0)
  const [login, setLogin] = useState(false)

  const total = useMemo(() => bigNum(count), [count])
  return (
    <div>
      <h2>{total}</h2>
      <button
        onClick={() => {
          setCount(count + 1)
        }}
      >
        +
      </button>
      <button
        onClick={() => {
          setLogin(!login)
        }}
      >
        切换
      </button>
    </div>
  )
}
```

## useRef

`useRef` 返回一个` ref` 对象，返回的`ref`对象在组件的整个生命周期保持不变

最常用的 `ref` 是两种用法：

- 用法一：引入` DOM`（或者组件，但是需要是 `class` 组件）元素
- 用法二：保存一个数据，这个对象在整个生命周期中可以保存不变

案例：

- 案例一：引用 `DOM`

```jsx
import { useRef } from 'react'

export default () => {
  const titleRef = useRef()
  const inputRef = useRef()
  const changeDOM = () => {
    inputRef.current.focus()
    titleRef.current.innerHTML = 'hello,sb'
  }
  return (
    <div>
      <input type="text" ref={inputRef} />
      <h2 ref={titleRef}>hello,html!</h2>
      <button onClick={changeDOM}>changeDOM</button>
    </div>
  )
}
```

- 案例二：使用 ref 保存上一次的某一个值

```jsx
import { useEffect, useRef, useState } from 'react'

export default () => {
  const [count, setCount] = useState(0)
  const numRef = useRef(count)
  useEffect(() => {
    numRef.current = count
  }, [count])
  const add = () => {
    setCount(count + 10)
  }
  return (
    <div>
      <h2>上一次的值：{numRef.current}</h2>
      <h2>这一次的值：{count}</h2>
      <button onClick={add}>+10</button>
    </div>
  )
}
```

## useImperativeHandle

通过 forwardRef 可以将 ref 转发到子组件,子组件拿到父组件中创建的 ref，绑定到自己的某一个元素中

forwardRef 的做法本身没有什么问题，但是我们是将子组件的 DOM 直接暴露给了父组件：

- 直接暴露给父组件带来的问题是某些情况的不可控

- 父组件可以拿到 DOM 后进行任意的操作

通过 useImperativeHandle 可以值暴露固定的操作：

- 通过 useImperativeHandle，将传入的 ref 和 useImperativeHandle 第二个参数返回的对象绑定到了一起
- 所以在父组件中，使用 inputRef.current 时，实际上使用的是返回的对象

```jsx
import { forwardRef, useImperativeHandle, useRef } from 'react'

const Input = forwardRef((_, ref) => {
  const inputRef = useRef()
  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus()
    },
  }))
  return <input type="text" ref={inputRef} />
})

export default () => {
  const TitleRef = useRef()
  const ChangeDOM = () => {
    TitleRef.current.focus()
    console.log(TitleRef)
  }
  return (
    <div>
      <Input ref={TitleRef} />
      <button onClick={ChangeDOM}>changeDOM</button>
    </div>
  )
}
```

## useLayoutEffect

[useLayoutEffect](https://zh-hans.reactjs.org/docs/hooks-reference.html#uselayouteffect)看起来和 useEffect 非常的相似，事实上他们也只有一点区别而已：

- useEffect 会在渲染的内容更新到 DOM 上后执行，不会阻塞 DOM 的更新

- useLayoutEffect 会在渲染的内容更新到 DOM 上之前执行，会阻塞 DOM 的更新

![useLayoutEffect](https://zfh-nanjing-bucket.oss-cn-nanjing.aliyuncs.com/blog-images/useLayoutEffect.png)

如果我们希望在某些操作发生之后再更新 DOM，那么应该将这个操作放到 useLayoutEffect：

```jsx
import { useEffect, useLayoutEffect, useState } from 'react'

export default () => {
  const [count, setCount] = useState(10)
  // 使用useEffecrt,出现闪屏
  // 实际上useLayoutEffect用的并不多
  useLayoutEffect(() => {
    if (count === 0) {
      setCount(Math.random())
    }
  }, [count])
  return (
    <div>
      {count}
      <button
        onClick={() => {
          setCount(0)
        }}
      >
        改数字
      </button>
    </div>
  )
}
```

**一开始先用 `useEffect`**，只有当它出问题的时候再尝试使用 `useLayoutEffect`

## 自定义 Hook

自定义 Hook 本质上只是一种函数代码逻辑的抽取，严格意义上来说，它本身并不算 React 的特性

### 案例 1:所有的组件在创建和销毁时都进行打印

组件被创建：打印 组件被创建了；组件被销毁：打印 组件被销毁了

```jsx
import { useEffect, useState } from 'react'

const Com1 = () => {
  usePrintLog('com1')
  return <h2>Com1</h2>
}

const Com2 = () => {
  usePrintLog('com2')
  return <h2>Com2</h2>
}

const Com3 = () => {
  usePrintLog('com3')
  return <h2>Com3</h2>
}

export default () => {
  const [display, setdisplay] = useState(true)
  return (
    <div>
      {display ? <Com1 /> : <h2>Com1销毁</h2>}
      {display ? <Com2 /> : <h2>Com2销毁</h2>}
      {display ? <Com3 /> : <h2>Com3销毁</h2>}
      <button
        onClick={() => {
          setdisplay(!display)
        }}
      >
        display?
      </button>
    </div>
  )
}

const usePrintLog = (name) => {
  useEffect(() => {
    console.log(`${name}创建了`)
    return () => {
      console.log(`${name}销毁了`)
    }
  }, [])
}
```

### 案例 2:Context 的共享

```jsx
import { userContext } from '../11_useHook_共享context/app'
import { useContext } from 'react'

// 自定义Hook
export default function useUserContext() {
  const user = useContext(userContext)
  return [user]
}
```

```jsx
// 在组件中使用
const User = () => {
  const [user] = useUserContext()
  return (
    <div>
      <h2>{user.name}</h2>
    </div>
  )
}
```

### 案例 2:获取滚动位置

```jsx
import { useEffect, useState } from 'react'

function useScrollPosition() {
  const [scrollPosition, setScrollPosition] = useState(0)
  const handleScroll = () => {
    setScrollPosition(window.scrollY)
  }
  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])
  return scrollPosition
}

export default useScrollPosition
```

```jsx
import useScrollPosition from './Hook/useScrollPosition'

export default () => {
  const scrollPositon = useScrollPosition()
  return (
    <div style={{ height: '2000px' }}>
      <h2 style={{ position: 'fixed' }}>当前滚动位置：{scrollPositon}</h2>
    </div>
  )
}
```

### 案例 3：localStorage 存储

```jsx
import { useEffect, useState } from 'react'

const useLocalStorage = (key) => {
  const [data, setData] = useState(() => {
    return JSON.parse(window.localStorage.getItem(key))
  })
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(data))
  }, [data])
  return [data, setData]
}
export default useLocalStorage
```

## redux hooks <Badge type="warning" text="待再次学习完善"/>

// TODO: 2022.8.16 待再次学习完善 参考：codewhy 视频，https://juejin.cn/post/6844903903981469703

使用 useSelector、useDispatch 等 HooksApi 替代 connect

useSelector 的作用是将 state 映射到组件中:

- 参数一：将 state 映射到需要的数据中

- 参数二：可以进行比较来决定是否组件重新渲染（可以传入 react-redux 中的 shallowEqual 函数进行浅层比较）

useSelector 默认会比较我们返回的两个对象是否相等，如何比较呢？ `const refEquality = (a, b) => a === b`,也就是我们必须返回两个**完全相等**的对象才可以不引起重新渲染（这一点真的很坑。connect 是会对 mapStateToProps 返回的对象进行浅层比较的）

::: tip 什么是浅层比较？

```js
// a simple implementation of the shallowCompare.
// only compares the first level properties and hence shallow.
// state updates(theoretically) if this function returns true.
function shallowCompare(newObj, prevObj) {
  for (key in newObj) {
    if (newObj[key] !== prevObj[key]) return true
  }
  return false
}
//
var game_item = {
  game: 'football',
  first_world_cup: '1930',
  teams: {
    North_America: 1,
    South_America: 4,
    Europe: 8,
  },
}
// Case 1:
// if this be the object passed to setState
var updated_game_item1 = {
  game: 'football',
  first_world_cup: '1930',
  teams: {
    North_America: 1,
    South_America: 4,
    Europe: 8,
  },
}

console.log(shallowCompare(updated_game_item1, game_item)) // false
```

:::

useDispatch 非常简单，就是直接获取 dispatch 函数，之后在组件中直接使用即可

::: danger usedispatch 的坑

注意如果在 useEffect 中使用 dispatch，请将 dispatch 添加在依赖项数组中，否则可能会引起该组件的不停渲染，原因未知

```jsx
useEffect(() => {
  // 这里是利用redux-thunk发送网络请求
  dispatch(getBannerDataAction())
}, [dispatch])
```

:::

```jsx
import React from 'react'
import { createStore } from 'redux'
import { Provider, useSelector, useDispatch } from 'react-redux'

const initialState = { num: 0 }

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'decrement':
      return { ...state, num: state.num - 1 }
    case 'increment':
      return { ...state, num: state.num + 1 }
    default:
      return state
  }
}

const store = createStore(reducer)

const ComponentUseReactRedux = () => {
  return (
    <div>
      <h2>ComponentUseReactRedux</h2>
      <Provider store={store}>
        <ChildComponentUseReactRedux />
      </Provider>
    </div>
  )
}

const ChildComponentUseReactRedux = () => {
  const num = useSelector((state) => state.num)
  const dispatch = useDispatch()
  return (
    <div>
      <h3>Using useSelector, useDispatch</h3>
      Number: {num}
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
    </div>
  )
}

export default ComponentUseReactRedux
```
