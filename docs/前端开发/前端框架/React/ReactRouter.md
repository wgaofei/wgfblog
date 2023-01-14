---
title: ReactRouter
order: 4
category:
  - 前端框架
  - React
icon: luyou
---

## 路由的由来

**路由（routing）就是通过互联的网络把信息从源地址传输到目的地址的活动 --- 维基百科**

路由中有一个非常重要的概念叫路由表.路由表本质上就是一个映射表, 决定了数据包的指向

路由的概念出现最早是在后端路由中实现的，原因是 web 的发展主要经历了这样一些阶段：

- 后端路由阶段
- 前后端分离阶段
- 单页面富应用（SPA）

### 阶段一：后端路由阶段

- 早期的网站开发整个 HTML 页面是由服务器来渲染的：服务器直接生产渲染好对应的 HTML 页面, 返回给客户端进行展示.

- 但是, 一个网站, 这么多页面服务器如何处理呢?
  - 一个页面有自己对应的网址, 也就是 URL.
  - URL 会发送到服务器, 服务器会通过正则对该 URL 进行匹配, 并且最后交给一个 Controller 进行处理.
  - Controller 进行各种处理, 最终生成 HTML 或者数据, 返回给前端.
  - 这就完成了一个 IO 操作.

上面的这种操作, 就是后端路由.

- 当我们页面中需要请求不同的路径内容时, 交给服务器来进行处理, 服务器渲染好整个页面, 并且将页面返回给客户端.
- 这种情况下渲染好的页面, 不需要单独加载任何的 js 和 css, 可以直接交给浏览器展示, 这样也有利于 SEO 的优化.

后端路由的缺点:

- 一种情况是整个页面的模块由后端人员来编写和维护的.

- 另一种情况是前端开发人员如果要开发页面, 需要通过 PHP 和 Java 等语言来编写页面代码.

- 而且通常情况下 HTML 代码和数据以及对应的逻辑会混在一起, 编写和维护都是非常糟糕的事情.

### 阶段二：前后端分离阶段

前端渲染的理解：

- 每次请求涉及到的静态资源都会从静态资源服务器获取
- 这些资源包括 HTML+CSS+JS，然后在前端对这些请求回来的资源进行渲染
- 需要注意的是，客户端的每一次请求，都会从静态资源服务器请求文件
- 同时可以看到，和之前的后断路由不同，这时后端只是负责提供 API 了

前后端分离阶段：

- 随着 Ajax 的出现, 有了前后端分离的开发模式
- 后端只提供 API 来返回数据，前端通过 Ajax 获取数据，并且可以通过 JavaScript 将数据渲染到页面中
- 这样做最大的优点就是前后端责任的清晰，后端专注于数据上，前端专注于交互和可视化上
- 并且当移动端(iOS/Android)出现后，后端不需要进行任何处理，依然使用之前的一套 API 即可
- 目前很多的网站依然采用这种模式开发（jQuery 开发模式）

### 阶段三：单页面富应用 SPA

- 单页面富应用的理解：

  - 单页面富应用的英文是 single-page application，简称 SPA
  - 整个 Web 应用只有实际上只有一个页面，当 URL 发生改变时，并不会从服务器请求新的静态资源
  - 而是通过 JavaScript 监听 URL 的改变，并且根据 URL 的不同去渲染新的页面

- 如何可以应用 URL 和渲染的页面呢？
  - 前端路由维护着 URL 和渲染页面的映射关系
  - 路由可以根据不同的 URL，最终让我们的框架（比如 Vue、React、Angular）去渲染不同的组件
  - 最终我们在页面上看到的实际就是渲染的一个个组件页面

## 前端路由的原理

前端路由是如何做到 URL 和内容进行映射呢？监听 URL 的改变。

- URL 发生变化，同时不引起页面的刷新有两个办法：

  - 通过 URL 的 hash 改变 URL
  - 通过 HTML5 中的 history 模式修改 URL

- 当监听到 URL 发生变化时，我们可以通过自己判断当前的 URL，决定到底渲染什么样的内容

### URL 的 hash

URL 的 hash 也就是锚点(#), 本质上是改变 window.location 的 href 属性

我们可以通过直接赋值 location.hash 来改变 href, 但是页面不发生刷新

注意：

- hash 的优势就是兼容性更好，在老版 IE(最低兼容到 IE3)中都可以运行

- 但是缺陷是有一个#，显得不像一个真实的路径，或者说有点丑 💩

```js
  <body>
        <div id="app">
            <a href="#/home">主页</a>
            <a href="#/about">关于</a>
            <div id="router-view"></div>
        </div>
        <script>
            const routerViewEl = document.getElementById('router-view')
            window.addEventListener('hashchange', () => {
                console.log(location.hash)
                switch (location.hash) {
                    case '#/home':
                        routerViewEl.innerHTML = '首页'
                        break
                    case '#/about':
                        routerViewEl.innerHTML = '关于'
                        break
                    default:
                        routerViewEl.innerHTML = ''
                }
            })
        </script>
    </body>
```

### HTML5 的 history

history 接口是 HTML5 新增的, 它有六种模式改变 URL 而不刷新页面：

- replaceState：替换原来的路径
- pushState：使用新的路径
- popState：路径的回退
- go：向前或向后改变路径
- forward：向前改变路径
- back：向后改变路径

```html
<div id="app">
  <a href="/home">首页</a>
  <a href="/about">关于</a>

  <div class="router-view"></div>
</div>

<script>
  // 1.获取router-view的DOM
  const routerViewEl = document.getElementsByClassName('router-view')[0]

  // 获取所有的a元素, 自己来监听a元素的改变
  const aEls = document.getElementsByTagName('a')
  for (let el of aEls) {
    el.addEventListener('click', (e) => {
      e.preventDefault()
      const href = el.getAttribute('href')
      history.pushState({}, '', href)
      urlChange()
    })
  }

  // 调用 history.pushState() 或者 history.replaceState() 不会触发 popstate 事件。popstate 事件只会在浏览器某些行为下触发，比如点击后退按钮（或者在 JavaScript 中调用 history.back() 方法）。即，在同一文档的两个历史记录条目之间导航会触发该事件。
  // 无论是浏览器的前进还是后退都会触发这个popstate事件，所以只能起到一个监听页面变化的作用。
  window.addEventListener('popstate', urlChange)

  // 监听URL的改变
  function urlChange() {
    switch (location.pathname) {
      case '/home':
        routerViewEl.innerHTML = '首页'
        break
      case '/about':
        routerViewEl.innerHTML = '关于'
        break
      default:
        routerViewEl.innerHTML = ''
    }
  }
</script>
```

<img src="https://ftp.bmp.ovh/imgs/2022/02/f86f98dd6ff7d01b.png" style="width:50%;margin-left:50%;transform:translateX(-50%)" />

## React-Router V5

//TODO v6 over=> review codewhy_react核心精讲 现在的文档是`依托答辩`

React Router 的版本 4 开始，路由不再集中在一个包中进行管理了：

- react-router 是 router 的核心部分代码
- react-router-dom 是用于浏览器的
- react-router-native 是用于原生应用的

目前我们使用的 React Router 版本是@5.2.0 的版本

安装 react-router-dom 会自动帮助我们安装 react-router 的依赖：`yarn add react-router-dom`

###  基本使用

`react-router` 最主要的` API` 是给我们提供的一些组件：

- `BrowserRouter `或 `HashRouter`
  - `Router `中包含了对路径改变的监听，并且会将相应的路径传递给子组件
  - `BrowserRouter` 使用` history `模式
  - `HashRouter` 使用 `hash` 模式
- `Link `和 `NavLink`：
  - 通常路径的跳转是使用 `Link` 组件，最终会被渲染成 `a` 元素
  - `NavLink `是在` Link `基础之上增加了一些样式属性
  - `to` 属性：`Link `中最重要的属性，用于设置跳转到的路径
  
- Route：
  - Route 用于路径的匹配
  - path 属性：用于设置匹配到的路径
  - component 属性：设置匹配到路径后，渲染的组件
  - exact：精准匹配，只有精准匹配到完全一致的路径，才会渲染对应的组件；

```jsx
import { Component } from 'react'
import { BrowserRouter, Link, Route } from 'react-router-dom'
import Home from './pages/home'
import About from './pages/about'

class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Link to="/">首页</Link>
          <Link to="/about">关于</Link>
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
        </BrowserRouter>
      </div>
    )
  }
}

export default App
```

### Switch

我们来看下面的路由规则：

- 当我们匹配到某一个路径时，我们会发现有一些问题
- 比如/about 路径匹配到的同时，/:userid 也被匹配到了，并且最后的一个 NoMatch 组件总是被匹配到

```jsx
                        <Route exact path='/' component={Home}/>
                        <Route path='/about' component={About}/>
                        <Route path='/:userid' component={User}/>
                        <Route component={NoMatch}/>
```

原因是什么呢？默认情况下，react-router 中只要是路径被匹配到的 Route 对应的组件都会被渲染

但是实际开发中，我们往往希望有一种排他的思想:只要匹配到了第一个，那么后面的就不应该继续匹配了；这个时候我们可以使用 Switch 来将所有的 Route 进行包裹即可

```jsx
<Switch>
  <Route exact path="/" component={Home} />
  <Route path="/about" component={About} />
  <Route path="/:id" component={User} />
  <Route component={NoMatch} />
</Switch>
```

### Redirect

Redirect 用于路由的重定向，当这个组件出现时，就会执行跳转到对应的 to 路径中：

我们这里使用这个的一个案例：

用户跳转到 User 界面,但是在 User 界面有一个 isLogin 用于记录用户是否登录：

- true：那么显示用户的名称

- false：直接重定向到登录界面

```jsx
// user.jsx
import { Component } from 'react'
import { Redirect } from 'react-router-dom'

class User extends Component {
  constructor() {
    super()
    this.state = {
      isLogin: false,
    }
  }

  render() {
    return (
      <div>
        {this.state.isLogin ? <h2>用户：Frank</h2> : <Redirect to={'/login'} />}
      </div>
    )
  }
}

export default User
```

### 路由嵌套

在开发中，路由之间是存在嵌套关系的

这里我们假设 about 页面中有两个页面内容：

- 商品列表和消息列表
- 点击不同的链接可以跳转到不同的地方，显示不同的内容

```jsx
import { Component } from 'react'
import { Link, Switch, Route } from 'react-router-dom'

function GoodList() {
  return (
    <ul>
      {[1, 2, 3].map((item) => {
        return <li>{`商品${item}`}</li>
      })}
    </ul>
  )
}

function NewsList() {
  return (
    <ul>
      {[1, 2, 3].map((item) => {
        return <li>{`消息${item}`}</li>
      })}
    </ul>
  )
}

class Abouts extends Component {
  render() {
    return (
      <div>
        <Link to={'/about'}>商品列表</Link>
        <Link to={'/about/news'}>消息列表</Link>

        <Switch>
          <Route exact path={'/about'} component={GoodList} />
          <Route path={'/about/news'} component={NewsList} />
        </Switch>
      </div>
    )
  }
}

export default Abouts
```

### 手动路由跳转

目前我们实现的跳转主要是通过 Link 或者 NavLink 进行跳转的，实际上我们也可以通过 JavaScript 代码进行跳转

但是通过 JavaScript 代码进行跳转有一个前提：必须获取到 history 对象

如何可以获取到 history 的对象呢？两种方式:

- 如果该组件是通过路由直接跳转过来的，那么可以直接获取 history、location、match 对象

::: tip

- history.push 这个方法会向 history 栈里面添加一条新记录，这个时候用户点击浏览器的回退按钮可以回到之前的路径。

- history.go 这个方法的参数是一个整数，意思是在 history 记录中向前或者后退多少步，类似 window.history.go(n)

- history.replace 跟 history.push 很像，唯一的不同就是，它不会向 history 添加新记录，而是跟它的方法名一样 —— 替换掉当前的 history 记录。

:::

```jsx
import { Component } from 'react'
import { NavLink, Switch, Route } from 'react-router-dom'

import styled from 'styled-components'

const AboutWrapper = styled.div`
  .about-active {
    color: orange;
  }
`

function JoinUs() {
  return <div>加入我们：zfhblog.top</div>
}

function GoodList() {
  return (
    <ul>
      {[1, 2, 3].map((item) => {
        return <li key={item}>{`商品${item}`}</li>
      })}
    </ul>
  )
}

function NewsList() {
  return (
    <ul>
      {[1, 2, 3].map((item) => {
        return <li key={item}>{`消息${item}`}</li>
      })}
    </ul>
  )
}

class Abouts extends Component {
  render() {
    return (
      <div>
        <AboutWrapper>
          <NavLink exact to={'/about'} activeClassName={'about-active'}>
            商品列表
          </NavLink>
          <NavLink to={'/about/news'} activeClassName={'about-active'}>
            消息列表
          </NavLink>
          <button
            onClick={() => {
              this.joinUs()
            }}
          >
            加入我们
          </button>
        </AboutWrapper>
        <Switch>
          <Route exact path={'/about'} component={GoodList} />
          <Route path={'/about/news'} component={NewsList} />
          <Route path={'/about/join'} component={JoinUs} />
        </Switch>
      </div>
    )
  }

  joinUs() {
    this.props.history.push('/about/join')
  }

  componentDidMount() {
    console.log(this.props.history)
  }
}

export default Abouts
```

- 如果该组件是一个普通渲染的组件，那么不可以直接获取 history、location、match 对象

那么如果普通的组件也希望获取对应的对象属性应该怎么做呢？

前面我们学习过高阶组件，可以在组件中添加想要的属性;react-router 也是通过高阶组件为我们的组件添加相关的属性的:

如果我们希望在 App 组件中获取到 history 对象，必须满足以下两个条件：

- App 组件必须包裹在 Router 组件之内
- App 组件使用 withRouter 高阶组件包裹

```jsx
// app.js
import { Component } from 'react'
import { NavLink, Route, withRouter } from 'react-router-dom'
import Home from './pages/home'
import Abouts from './pages/abouts'
import Order from './pages/order'
import styled from 'styled-components'

const NavLinkWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;

  .link {
    padding-top: 50px;
    width: 100px;
    background-color: #f1f1f1;
    display: flex;
    align-items: center;
    flex-direction: column;
  }

  a {
    text-decoration: none;
    margin-right: 20px;
    font-size: 20px;
  }

  a.link-active {
    color: red;
  }
`

class App extends Component {
  render() {
    return (
      <NavLinkWrapper>
        <div className="link">
          <NavLink exact to="/" activeClassName={'link-active'}>
            首页
          </NavLink>
          <NavLink to="/about" activeClassName={'link-active'}>
            关于
          </NavLink>
          <button
            to="/order"
            onClick={() => {
              this.toOrder()
            }}
          >
            订单
          </button>
        </div>
        <Route exact path="/" component={Home} />
        <Route path="/about" component={Abouts} />
        <Route path="/order" component={Order} />
      </NavLinkWrapper>
    )
  }

  toOrder() {
    this.props.history.push('/order')
  }
}

export default withRouter(App)
// index.js
ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
)
```

### 参数传递

#### 动态路由

动态路由的概念指的是路由中的路径并不会固定：

比如/detail 的 path 对应一个组件 Detail。如果我们将 path 在 Route 匹配时写成/detail/:id，那么 /detail/abc、/detail/123 都可以匹配到该 Route，并且进行显示这个匹配规则，我们就称之为动态路由。**通常情况下，使用动态路由可以为路由传递参数**

```jsx
import {Component} from 'react';
import {NavLink, Route, withRouter} from "react-router-dom";
import Home from "./pages/home";
import Abouts from "./pages/abouts";
import Order from "./pages/order";
import styled from "styled-components";

const NavLinkWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;

  .link {
    padding-top: 50px;
    width: 100px;
    background-color: #f1f1f1;
    display: flex;
    align-items: center;
    flex-direction: column;
  }

  a {
    text-decoration: none;
    margin-right: 20px;
    font-size: 20px;
  }

  a.link-active {
    color: red;
  }
`

class App extends Component {
    render() {
        return (
            <NavLinkWrapper>
                <div className='link'>
                    <NavLink exact to='/' activeClassName={'link-active'}>首页</NavLink>
                    <NavLink to='/about' activeClassName={'link-active'}>关于</NavLink>
                    <button to='/order' onClick={() => {
                        this.toOrder()
                    }}>订单
                    </button>
                </div>
                <Route exact path='/' component={Home}/>
                <Route path='/about' component={Abouts}/>
                <Route path='/order/:id' component={Order}/>
            </NavLinkWrapper>
        );
    }

    toOrder() {
        this.props.history.push('/order/123')
    }
}

export default withRouter(App);
// ------------------------------------------
// order.jsx
// ------------------------------------------
import {Component} from 'react';

class Order extends Component {
    render() {
        return (
            <div>
                <h2>订单:{this.props.match.params.id}</h2>
            </div>
        );
    }
}

export default Order;
```

#### search 传递参数

```jsx
// app.js
import { Component } from 'react'
import { NavLink, Route, withRouter } from 'react-router-dom'
import Home from './pages/home'
import Abouts from './pages/abouts'
import Order2 from './pages/order2'
import styled from 'styled-components'

const NavLinkWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;

  .link {
    padding-top: 50px;
    width: 100px;
    background-color: #f1f1f1;
    display: flex;
    align-items: center;
    flex-direction: column;
  }

  a {
    text-decoration: none;
    margin-right: 20px;
    font-size: 20px;
  }

  a.link-active {
    color: red;
  }
`

class App extends Component {
  render() {
    return (
      <NavLinkWrapper>
        <div className="link">
          <NavLink exact to="/" activeClassName={'link-active'}>
            首页
          </NavLink>
          <NavLink to="/about" activeClassName={'link-active'}>
            关于
          </NavLink>
          <button
            to="/order"
            onClick={() => {
              this.toOrder()
            }}
          >
            订单
          </button>
        </div>
        <Route exact path="/" component={Home} />
        <Route path="/about" component={Abouts} />
        <Route path="/order" component={Order2} />
      </NavLinkWrapper>
    )
  }

  toOrder() {
    this.props.history.push('/order?id=123&name=frank&test=2&test2=1231231')
  }
}

export default withRouter(App)
```

```jsx
import { Component } from 'react'

class Order2 extends Component {
  render() {
    return (
      <div>
        <h2>订单:{this.props.match.params.id}</h2>
      </div>
    )
  }

  componentDidMount() {
    let query = {}
    const search = this.props.location.search.split('&')
    search[0] = search[0].split('?')[1]
    search.forEach((item) => {
      const kv = item.split('=')
      query[kv[0]] = kv[1]
    })
    console.log(query)
  }
}

export default Order2
```

#### Link 中 to 可以直接传入一个对象

这个对象有四个属性：

- pathname：跳转的路径
- state：复杂数据(对象)会传递到`location`
- search:查询参数的字符串表示，例如`?sort=name`
- Hash:放入 URL 的哈希值，例如`#a-hash`

```jsx
<NavLink to={{ pathname: '/test', state: { name: 'frank', age: 21 } }}>
  测试
</NavLink>
```

### react-router-config

目前我们所有的路由定义都是直接使用 Route 组件，并且添加属性来完成的。 但是这样的方式会让路由变得非常混乱，我们希望将所有的路由配置放到一个地方进行集中管理： 这个时候可以使用 react-router-config 来完成

1. 安装 react-router-config:`yarn add react-router-config`
2. 配置路由映射的关系数组

```jsx
import Home from '../pages/home'
import Abouts, { GoodList, JoinUs, NewsList } from '../pages/abouts'
import Order from '../pages/order'

const routes = [
  {
    path: '/',
    exact: true,
    component: Home,
  },
  {
    path: '/about',
    component: Abouts,
    routes: [
      {
        path: '/about',
        exact: true,
        component: GoodList,
      },
      {
        path: '/about/news',
        component: NewsList,
      },
      {
        path: '/about/join',
        component: JoinUs,
      },
    ],
  },
  {
    path: '/order',
    component: Order,
  },
]

export default routes
```

1. 使用 renderRoutes 函数完成配置

```jsx
import { Component } from 'react'
import { NavLink, Route, withRouter } from 'react-router-dom'
// import Home from "./pages/home";
// import Abouts from "./pages/abouts";
// import Order from "./pages/order";
import routes from './router'
import styled from 'styled-components'
import { renderRoutes } from 'react-router-config'

const NavLinkWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;

  .link {
    padding-top: 50px;
    width: 100px;
    background-color: #f1f1f1;
    display: flex;
    align-items: center;
    flex-direction: column;
  }

  a {
    text-decoration: none;
    margin-right: 20px;
    font-size: 20px;
  }

  a.link-active {
    color: red;
  }
`

class App extends Component {
  render() {
    return (
      <NavLinkWrapper>
        <div className="link">
          <NavLink exact to="/" activeClassName={'link-active'}>
            首页
          </NavLink>
          <NavLink to="/about" activeClassName={'link-active'}>
            关于
          </NavLink>
          <button
            onClick={() => {
              this.toOrder()
            }}
          >
            订单
          </button>
        </div>
        {/*<Route exact path='/' component={Home}/>*/}
        {/*<Route path='/about' component={Abouts}/>*/}
        {/*<Route path='/order' component={Order}/>*/}
        {renderRoutes(routes)}
      </NavLinkWrapper>
    )
  }

  toOrder() {
    this.props.history.push('/order')
  }
}

export default withRouter(App)
```

Abouts.jsx:

```jsx
import { Component } from 'react'
import { NavLink, Switch, Route } from 'react-router-dom'

import styled from 'styled-components'
import { renderRoutes } from 'react-router-config'

const AboutWrapper = styled.div`
  .about-active {
    color: orange;
  }
`

export function JoinUs() {
  return <div>加入我们：zfhblog.top</div>
}

export function GoodList() {
  return (
    <ul>
      {[1, 2, 3].map((item) => {
        return <li key={item}>{`商品${item}`}</li>
      })}
    </ul>
  )
}

export function NewsList() {
  return (
    <ul>
      {[1, 2, 3].map((item) => {
        return <li key={item}>{`消息${item}`}</li>
      })}
    </ul>
  )
}

class Abouts extends Component {
  render() {
    return (
      <div>
        <AboutWrapper>
          <NavLink exact to={'/about'} activeClassName={'about-active'}>
            商品列表
          </NavLink>
          <NavLink to={'/about/news'} activeClassName={'about-active'}>
            消息列表
          </NavLink>
          <button
            onClick={() => {
              this.joinUs()
            }}
          >
            加入我们
          </button>
        </AboutWrapper>
        {/*<Switch>*/}
        {/*    <Route exact path={'/about'} component={GoodList}/>*/}
        {/*    <Route path={'/about/news'} component={NewsList}/>*/}
        {/*    <Route path={'/about/join'} component={JoinUs}/>*/}
        {/*</Switch>*/}
        {renderRoutes(this.props.route.routes)}
      </div>
    )
  }

  joinUs() {
    this.props.history.push('/about/join')
  }

  componentDidMount() {
    // console.log(this.props.history)
    console.log(this.props.route)
  }
}

export default Abouts
```

## React-Router V6

## 基本使用

不同于`vueRouter`作为一个`Vue`插件进行注册使用，`ReactRouter`需要使用`BrowserRouter`（` history `模式）或`HashRouter`（ `hash` 模式）对根`App`组件进行包裹使用

```jsx
<HashRouter>
<App />
</HashRouter>
```

## 路由映射配置

`Routes`:包裹所有的`Route`，在其中匹配一个路由

v5使用的`Switch`组件，或者`Route`可以单独存在

`Route`:`Route`用于路径的匹配

- `path`属性：用于设置匹配到的路径
- `element`属性：设置匹配到路径后，渲染的组件 <Badge text='v5使用的是component属性' />
- `exact`:精准匹配，只有精准匹配到完全一致的路径，才会渲染对应的组件 <Badge text='v6不再支持该属性,自动精准匹配' type='danger'/>

## 路由配置和跳转

通常路径的跳转是使用`Link`组件，最终会被渲染成`a`元素

`to`属性：`Link`中最重要的属性，用于设置跳转到的路径

```jsx
import {Link, Route, Routes} from "react-router-dom";
import About from "./About"; 
import Home from "./Home";

function App(props) {
    return (
        <div>
            <header>
                <Link to={'/'}>首页</Link>
                <Link to={'/about'}>关于</Link>
            </header>
            <div className="main">
                <Routes>
                    <Route  path='/' element={<Home/>}></Route>
                    <Route path='/about' element={<About/>}></Route>
                </Routes>
            </div>
        </div>
    );
}

export default App;
```

## Navigate导航 <Badge text='v5的Redirect'/>

`navigate`用于路由的重定向，当这个组件出现时，就会执行跳转到对应的`to`路径中。

例如判断当前用户登录状态，未登录跳转到登录页：

```jsx
function Home(props) {
    const {isLogin,changeLoginStatus}=useState(false)
    return (
        <div>
            {
                isLogin?'这是首页':<Navigate to={'/login'}></Navigate>
            }
        </div>
    );
}
```

## 404页面配置

设置这样一个`Route`，当前面的路由都没有匹配上就会匹配这个路由:

```jsx {4}
                <Routes>
                    <Route  path='/' element={<Home/>}></Route>
                    <Route path='/about' element={<About/>}></Route>
                    <Route path='*' element={<NotFound />}></Route>
                </Routes>
```

## 路由嵌套

让父路由包裹子路由：

```jsx
                <Routes>
                    <Route path='/' element={<Navigate to={'/home'}/>}></Route>
                    <Route path={'/home'} element={<Home/>}>
                        {/*子路由匹配时,/home默认跳转到'/home/shop' 防止页面空白*/}
                        <Route path='/home' element={<Navigate to={'/home/shop'}/>}></Route>
                        <Route path={'/home/shop'} element={<Cart/>}></Route>
                        <Route path={'/home/news'} element={<New/>}></Route>
                    </Route>
                    <Route path='/about' element={<About/>}>
                    </Route>
                    <Route path='/login' element={<Login/>}></Route>
                    <Route path='*' element={<NotFound/>}></Route>
                </Routes>
```

在`home`组件下：

```jsx
            <div>
                <Link to={'/home/shop'}>商品列表</Link>
                <Link to={'/home/news'}>消息列表</Link>
            </div>
{/*用于在父路由元素中作为子路由的占位元素*/}
            <Outlet/>
```

## 编程式导航

## 函数组件

```jsx
    const navigate=useNavigate()
    function goAbout(){
        navigate('/about')
    }
              <button onClick={goAbout}>
                    编程式导航去关于
                </button>
```
