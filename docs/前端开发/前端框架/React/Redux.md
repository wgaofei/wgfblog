---
title: Redux
order: 5
category:
  - 前端框架
  - React
icon: redux
---

::: tip 推荐阅读



[Redux 入门教程（一）：基本用法](https://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_one_basic_usages.html)

[redux](https://redux.js.org/)

[redux-toolkit](https://redux-toolkit.js.org/)

:::

`Redux` 就是一个帮助我们管理 `State` 的容器

## Redux 的核心概念

### store

使用**普通对象**来描述应用的`state`,存放在`store`中 

```js
{
  todos: [{
    text: 'Eat food',
    completed: true
  }, {
    text: 'Exercise',
    completed: false
  }],
}
```

### action

`Redux `要求我们通过 `action` 来更新数据：

- 所有数据的变化，必须通过派发(`dispatch`)`action` 来更新

- `action `是一个普通的 JavaScript 对象，用来描述这次更新的 `typ`e 和 `content`

强制使用 `action `的好处是可以清晰的知道数据到底发生了什么样的变化

### reducer

但是如何将 `state` 和 `action` 联系在一起呢？答案就是` reducer`

- `reducer` 是一个**纯函数**
- `reducer` 做的事情就是将传入的` state` 和 `action` 结合起来生成一个新的 `state`

## Redux 的三大原则

### 单一数据源

- 整个应用程序的 `state` 被存储在一颗 `object tree` 中，并且这个 `object tree` 只存储在一个 `store `中
- `Redux` 并没有强制让我们不能创建多个 `Store`，但是那样做并不利于数据的维护
- 单一的数据源可以让整个应用程序的 `state` 变得方便维护、追踪、修改

### State 是只读的

- 唯一修改 `State` 的方法一定是触发 `action`，不要试图在其他地方通过任何的方式来修改 `State`
- 这样就确保了 `view `层或网络请求都不能直接修改 `state`，它们只能通过 `action` 来描述自己想要如何修改` state`
- 这样可以保证所有的修改都被集中化处理，并且按照严格的顺序来执行，所以不需要担心` race condition`（竟态）的问题

### 使用纯函数来执行修改

- 通过` reducer `将 旧` state` 和 `actions` 联系在一起，并且返回一个新的 `state`
- 随着应用程序的复杂度增加，我们可以将` reducer` 拆分成多个小的 `reducer`，分别操作不同 `state tree` 的一部分
- 所有的 `reducer` 都应该是纯函数，不能产生任何的副作用  

## 在 react 项目中使用 redux

## 安装redux

::: code-tabs

@tab npm

```shell
npm install redux
```
@tab yarn
```shell
yarn add redux
```
:::

## 基本使用

创建` store` 文件夹，创建 4 个文件：

- `actionCreators.js`（创建 `action` 的文件）
- `constants.js`（定义 `action` 名称常量)
- `reducer.js`(将` aciton` 和 `state` 联系在一起)
- `index.js`(导出创建好的` store`)

这里实现一个简单的 couter 案例：

::: code-tabs

@tab actionCreators.js

```js
import { JIA_ACTION } from './constants'

export function JIAA_ACTION(num) {
  return {
    type: JIA_ACTION,
    num,
  }
}
```

@tab constants.js

```js
export const JIA_ACTION = 'JIA_ACTION'
```

@tab reducer.js

```js
import { JIA_ACTION } from './constants'

const defaultStore = {
  counter: 0,
}

export default function reducer(state = defaultStore, action) {
  switch (action.type) {
    case JIA_ACTION:
      return { ...state, counter: action.num + state.counter }
    default:
      return state
  }
}
```

@tab index.js

```js
import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

export default store
```
:::



接着创建 `utils` 文件夹， 创建2个文件：

- `connect.js`(返回一个抽象` react` 与` redux` 连接逻辑的高阶组件)
- `context.js`(利用 `context` 全局共享` store`)

::: code-tabs

@tab connect.js

```js
import { PureComponent } from 'react'
import storeContext from './context'

export default function connect(mapStateToProps, mapDispatchToProps) {
  return function connectHOC(WrapperComponent) {
    class ReduxConnect extends PureComponent {
      constructor(props, context) {
        super(props, context)
        this.state = {
          storeState: mapStateToProps(context.getState()),
        }
      }

      render() {
        return (
          <div>
            <WrapperComponent
              {...this.props}
              {...mapStateToProps(this.context.getState())}
              {...mapDispatchToProps(this.context.dispatch)}
            />
          </div>
        )
      }

      componentDidMount() {
        this.unsubscribe = this.context.subscribe(() => {
          this.setState({
            storeState: mapStateToProps(this.context.getState()),
          })
        })
      }

      componentWillUnmount() {
        this.unsubscribe()
      }
    }

    ReduxConnect.contextType = storeContext
    return ReduxConnect
  }
}
```

@tab context.js

::: details context.js

```js
import react from 'react'

const StoreContext = react.createContext()

export default StoreContext
```

:::



在项目 `index.js` 文件中引入` store`，利用 `StoreContext` 的 `Provider` 组件，让 `App` 组件共享 `store`

```jsx
import store from './redux/store'
import StoreContext from './redux/utils/context'
ReactDOM.render(
  <StoreContext.Provider value={store}>
    <App />
  </StoreContext.Provider>,
  document.getElementById('root')
)
```

在想要使用 `store` 的组件中定义`mapStateToProps`、 `mapDispatchToProps`。把需要的`state` 和` dispatch `映射到想要使用 `store` 的组件的 `props` 中

```js
import { PureComponent } from 'react'

import connect from './utils/connect'

import { JIAA_ACTION } from './store/actionCreators'

const mapStateToProps = (state) => {
  return {
    counter: state.counter,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    add: function () {
      dispatch(JIAA_ACTION(3))
    },
  }
}

const App = class extends PureComponent {
  componentDidMount() {
    console.log(this.props)
  }

  render() {
    return (
      <div>
        {this.props.counter}
        <button
          onClick={() => {
            this.props.add()
          }}
        >
          +3
        </button>
      </div>
    )
  }
}

const EnApp = connect(mapStateToProps, mapDispatchToProps)(App)

export default EnApp
```

虽然手动实现了`connect`帮助我们完成`redux`与`react` 的连接，但是实际上 `redux` 官方提供了 `react-redux` 的库，可以直接在项目中使用，并且实现的逻辑会更加的严谨和高效

1. 安装:

::: code-tabs

@tab npm

```shell
npm install react-redux
```

@tab yarn

```shell
yarn add react-redux
```

:::

2. 改造之前的代码：

在 `index.js` 中将 `Provider` 组件替换成 `react-redux `中的 `Provider` 组件

```jsx {4,5,6}
import { Provider } from 'react-redux'

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
```
组件中将 connect 替换成 react-redux 中 connect

```jsx {1}
import { connect } from 'react-redux'
```

## redux 中异步操作

事实上，网络请求到的数据也属于我们状态管理的一部分，更好的一种方式应该是将其也交给 `redux` 来管理

![redux-异步操作](https://zfh-nanjing-bucket.oss-cn-nanjing.aliyuncs.com/blog-images/redux-%E5%BC%82%E6%AD%A5%E6%93%8D%E4%BD%9C.png)

但是在 `redux` 中如何可以进行异步的操作呢？

- 答案就是使用中间件
- 在`Koa`框架中，`Middleware` 可以帮助我们在请求和响应之间嵌入一些操作的代码，比如 `cookie `解析、日志记录、文件压缩等操作

### 理解中间件

`redux` 也引入了中间件`Middleware`的概念：

- 这个中间件的目的是在` dispatch` 的 `action` 和最终达到的 `reducer` 之间，扩展一些自己的代码。比如日志记录、调用异步接口、添加代码调试功能等等

- 我们现在要做的事情就是发送异步的网络请求，所以我们可以添加对应的中间件。官网推荐的、包括演示的网络请求的中间件是使用` redux-thunk`

r`edux-thunk `是如何做到让我们可以发送异步的请求呢？

- 我们知道，默认情况下的 `dispatch(action)`，`action` 需要是一个 `JavaScript` 的对象
- `redux-thunk` 可以让`action` 可以是一个函数
- 该函数会被调用，并且会传给这个函数一个 `dispatch` 函数和 `getState` 函数：

  - `dispatch` 函数用于我们之后再次派发 `action`
  - `getState` 函数考虑到我们之后的一些操作需要依赖原来的状态，用于让我们可以获取之前的一些状态

### 使用 redux-thunk

1. 安装 redux-thunk:

::: code-tabs



@tab npm

```shell
npm install redux-thunk
```

@tab yarn

```shell
yarn add redux-thunk
```

:::

1. 在创建 `store` 时传入应用了` middleware` 的 `enhance` 函数
   - 通过 `applyMiddleware` 来结合多个 `Middleware`, 返回一个 `enhancer`
   - 将 `enhancer` 作为第二个参数传入到 `createStore` 中

```js {4,5}
import {applyMiddleware, createStore} from "redux"
import thunkMiddleware from 'redux-thunk'
import reducer from './reducer'
const storeEnhancer = applyMiddleware(thunkMiddleware)
const store = createStore(reducer, storeEnhancer)
export default store
```

3. 在` actionCreators.js `定义一个返回函数的 `action`：

- 注意：**这里不是返回一个对象了，而是一个函数**
- 该函数在 `dispatch `之后会被执行

```js
export function getDataAction() {
  return (dispath) => {
    {
      console.log('react-thuck数据接受成功')
      axios.get('https://www.imooc.com/api/http/search/suggest').then((res) => {
        // 我们依然需要触发相关的action，经过reducer的处理更新数据
        dispath(dataAction(res.data.data))
      })
    }
  }
}
```

4. 映射该 `action` 的 `dispatch `操作,和相关的 `store `中的` state`：

```js
const mapStateToProps = (state) => {
  return {
    data: state.list,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    getData: function () {
      dispatch(getDataAction())
    },
  }
}
```

5. 在 `componentDidMount `调用，就可以拿到数据

```js
    componentDidMount() {
        this.props.getData()
    }
}
```

## redux-devtools

利用这个工具，我们可以知道每次状态是如何被修改的，修改前后的状态变化等等

1. 在对应的浏览器中安装相关的插件，项目中安装这个包：

```shell
npm install --save @redux-devtools/extension
```

1. 对 store 的 index.js 进行改造

```js {4,5,6}
import {applyMiddleware, createStore} from "redux"
import thunkMiddleware from 'redux-thunk'
import reducer from './reducer'
import { composeWithDevTools } from '@redux-devtools/extension';
const store = createStore(reducer,   composeWithDevTools(
    applyMiddleware(thunkMiddleware )
))
export default store
```

对于基本的 redux,只需要添加：

```js
import { createStore } from 'redux';
import { devToolsEnhancer } from '@redux-devtools/extension';

const store = createStore(
  reducer,
  devToolsEnhancer()
);
```

## Redux 代码文件拆分

随着项目的不断扩大，可能导致 `store` 结构越来越复杂，`action `越来越多。所有有必要对代码结构进行拆分

代码结构如下：

```
├── store
│   ├── Count
│   │   ├── actionCreators.js
│   │   ├── constants.js
│   │   ├── index.js
│   │   └── reducer.js
│   ├── Data
│   │   ├── actionCreators.js
│   │   ├── constants.js
│   │   ├── index.js
│   │   └── reducer.js
│   ├── index.js
│   └── reducer.js	
```

`data`模块下代码：

::: code-tabs



@tab actionCreators.js

```js
import {LIST_DATA} from './constants'
import axios from "axios";

export function getList(listData) {
    return {
        type: LIST_DATA,
        listData
    }
}

// redux-thuck
export function getSomthing() {
    return (dispatch, getStore) => {
        axios.get('https://www.imooc.com/api/http/search/suggest').then(res => {
            console.log(res)
            dispatch(getList(res.data.data))
        })
    }
}
```

@tab constants.js

```js

export const LIST_DATA='LIST_DATA'
```

@tab index.js

```js
import {getSomthing} from './actionCreators'
import DataReducer from './reducer'

export {getSomthing,DataReducer}
```

@tab reducer.js

```js
import {LIST_DATA} from "./constants";

const defaultStore={
    listData:[]
}

export default function reducer(state=defaultStore,action){
    switch (action.type){
        case LIST_DATA:
            return {...state,listData:action.listData}
        default:
            return state
    }
}
```

:::

主模块代码：

::: code-tabs

@tab reducer.js



```js {4,5,6,7}
import {counterReducer} from "./Count";
import {DataReducer} from "./Data";
export default function reducer(state = {}, action) {
    return {
        countStore: counterReducer(state.countStore, action),
        DataStore: DataReducer(state.DataStore, action),
    }
}
```

@tab index.js

```js
import {applyMiddleware, createStore} from "redux"

import reducer from './reducer'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from '@redux-devtools/extension';
const store = createStore(reducer,composeWithDevTools(
    applyMiddleware(thunkMiddleware )
))
export default store
```

:::

## combineReducers 函数

目前我们合并的方式是通过每次调用 `reducer` 函数自己来返回一个新的对象

事实上，`redux`给我们提供了一个 `combineReducers` 函数可以方便的让我们对多个 `reducer `进行合并：

```js {5,6,7,8,9}
import {counterReducer} from "./Count";
import {DataReducer} from "./Data";
import {combineReducers} from "redux"

const reducer = combineReducers({
    // reducer的目的就是为了返回state
    countStore: counterReducer,
    DataStore: DataReducer
})

export default reducer
```

## RTK  <Badge text='官方推荐' type='tip'/>

[Redux ToolKit](https://redux-toolkit.js.org/)是目前官方推荐编写`redux`逻辑的方法

`redux`的编写逻辑过于繁琐和麻烦，`RTK`的目的就是解决这个问题

安装：

```shell
npm install @reduxjs/toolkit react-redux
```

 ### 基本使用

1. 将之前的`store`代码结构作以调整

```
└── store
    ├── index.js
    └── moudles
        ├── count.js
        └── data.js
```

2. 创建`store`

```js
import {configureStore} from "@reduxjs/toolkit";
// 日志打印中间件，需要自己安装
import logger from 'redux-logger'
import  counterReducer  from "./moudles/count";
export default configureStore({
    // 传入多个reducer,或单个reducer函数
    reducer:{
        countStore:counterReducer
    },
    // 应用中间件｜getDefaultMiddleware获取默认中间件在和我们要用的其他中间件concat返回中间件数组
  // 默认启用devtools和redux-thunk
  // middleware:[thunk, logger],
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
    // 默认开启devTools
    devTools:true
})
```

3. 定义单个模块`store`

```jsx
import {createSlice} from "@reduxjs/toolkit";

const countSlice=createSlice({
  // 显示在redux devtools中的名称
    name:'count',
  // 初始值
    initialState:{
        count:1000,
    },
  // 里面定义各种action
    reducers:{
        addNumber(state,{payload}){
          // 在这里直接可以修改state
            state.count=state.count+payload
        }
    }
})

export const {addNumber}=countSlice.actions

export default countSlice.reducer
```

4. `RTK`仅仅是简化了`rdux`的逻辑编写，而连接仍需要通过`react-redux`,和之前的写法是一样的

### 异步处理

1. 引入`createAsyncThunk`,使用该`api`创建一个`thunk`,创建时第一个参数显示在`devtools`，表示是哪一个`thunk`，第二个函数用于异步数据的获取，必须返回一个`promise`
2. 在`createSlice`中` extraReducers`选项，操作`state`。有两种方式对象或者函数，官方推荐使用函数(使用对象貌似会导致`ts`使用比较麻烦，还没用到)。`fulfilled`表示数据成功获取到需要执行的逻辑

```js {2,5,6,7,8,15,16,17,18,19,20,21}
import {createSlice} from "@reduxjs/toolkit";
import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

const getListData = createAsyncThunk('getListData', async (num) => {
  //组件调用传递过来的参数
    console.log(num)
    const res = await axios.get('https://www.imooc.com/api/http/search/suggest')
    return res.data.data
})
const dataSlice = createSlice({
    name: 'data',
    initialState: {
        list: [],
    },
    reducers: {},
    extraReducers: {
        [getListData.fulfilled](state, {payload}) {
          // 在此直接操作state
            state.list=payload
        },
    }
    // extraReducers:(builder)=>{
    //     builder.addCase(getListData.fulfilled,(state,{payload})=>{
    //         state.list=payload
    //     })
})

export {getListData}

export default dataSlice.reducer
```

3. 跟普通的`aciton`一样在组件中进行映射，消费：

```jsx {31,32,33}
import {connect} from "react-redux";
import {addNumber} from "./store/moudles/count";
import {PureComponent} from "react";
import {getListData} from "./store/moudles/data";
class App extends PureComponent{
    componentDidMount() {
        this.props.getList('123')
    }

    render() {
        return (
            <div onClick={this.props.add}>
                {this.props.count}
                <ul>
                    {
                        this.props.list.map(item=><li>{item.word}</li>)
                    }
                </ul>
            </div>
        );
    }
}
const mapStateToProps=state=>({
    count:state.countStore.count,
    list:state.dataStore.list
})
const mapDispatchToProps=dispatch=>({
    add(){
        dispatch(addNumber(3))
    },
    getList(num){
        dispatch(getListData(num))
    }
})

export default connect(mapStateToProps,mapDispatchToProps)(App);
```



## redux中的hook <Badge text='官方推荐' type='tip'/>





## RTKQ

