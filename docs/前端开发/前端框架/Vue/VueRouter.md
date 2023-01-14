---
title: VueRouter
category:
  - 前端框架
  - Vue
icon: vue
order: 3
---

::: warning 注意

版本：`Vue Router 3.x`

[可能比文档还详细--VueRouter 完全指北](https://juejin.cn/post/6844903665388486664)

:::

## 简介

`vue-router`和`vue`是深度集成的,用于单页面应用

传统的路由是用一些超链接来实现页面切换和跳转,而`vue-router`在单页面应用(SPA)中,则是组件之间的切换

其本质就是:**建立并管理`url`和对应组件之间的映射关系**

一个路由`route`就是一组映射关系（`key` ==>` value`）

### 对 SPA 应用的理解

单页面应用（`single page web application` ,`SPA`):整个页面只有一个完整的页面;点击页面中的导航链接不会刷新页面,只会做页面的局部刷新

### 路由分类

#### 后端路由

(1) 理解：`value`是` function`, 用于处理客户端提交的请求

(2) 工作过程：服务器接收到一个请求时, 根据请求路径找到匹配的函数来处理请求, 返回响应数据

#### 前端路由

(1) 理解:`value` 是` component`，用于展示页面内容

(2) 工作过程：当浏览器的路径改变时, 对应的组件就会显示

## 基本使用

1. 安装`vue-router`，命令：`npm i vue-router`

2. 创建文件：`src/router/index.js`

```js
//引入Vue核心库
import Vue from 'vue'
//引入VueRouter
import VueRouter from 'vue-router'
//引入路由组件
import About from '../components/About'
import Home from '../components/Home'

Vue.use(Router)

//创建router实例对象，去管理一组一组的路由规则
const router = new VueRouter({
  routes: [
    {
      path: '/about',
      component: About,
    },
    {
      path: '/home',
      component: Home,
    },
  ],
})

//暴露router
export default router
```

3. 在`main.js`中创建`vm`时传入`router`配置项

```js
  ......
  //引入router
  import router from './router'
  ......

  //创建vm
  new Vue({
  	el:'#app',
  	render: h => h(App),
  	router
  })
```

4. 实现切换

   ::: danger 关于/的说明

   经过本人测试在`router-link`的`to`属性路径`path`前面无论加不加`/`均可完成跳转，但为了避免造成不必要的困惑，请始终添加`/`

   :::

   ```html
   // active-class设置链接激活时使用的CSS类名
   <router-link active-class="active" to="/about">About</router-link>
   ```

5. 在组件中指定展示位置

   ```html
   <router-view></router-view>
   ```

### 几个注意点

::: warning router,routes,route 傻傻分不清?

- `router`:一般指的就是路由实例.如$router
- `routes`:指 router 路由实例的 routes API.用来配置多个 route 路由对象
- ` route`:指的就是路由对象.例如;$route 指的就是当前路由对象.

:::

1. 路由组件通常存放在`views`文件夹，一般组件通常存放在`components`文件夹

2. 通过切换，“隐藏”了的路由组件，默认是被销毁掉的，需要的时候再去挂载

   ```js
     mounted() {
       console.log('about组件被挂载了')
       console.log(this)
     },
     beforeDestroy() {
       console.log('about组件被销毁了')
     }}
   ```

3. 每个组件都有自己的`$route`属性，里面存储着自己的路由信息,可以通过`this.$route`获取

4. 整个应用只有一个`router`（路由实例:路由实例可以包含多个路由对象.它们是父子包含关系），可以通过`this.$router`属性获取到`router`实例

## 动态路由匹配

我们经常需要把某种模式匹配到的所有路由，全都映射到同个组件。例如，我们有一个 `User` 组件，对于所有 `ID` 各不相同的用户，都要使用这个组件来渲染。那么，我们可以在 `vue-router` 的路由路径中使用“动态路径参数”(dynamic segment) 来达到这个效果：

```javascript
const User = {
  template: '<div>User</div>',
}

const router = new VueRouter({
  routes: [
    // 动态路径参数 以冒号开头
    { path: '/user/:id', component: User },
  ],
})
```

现在呢，像 `/user/foo` 和 `/user/bar` 都将映射到相同的路由。

一个“路径参数”使用冒号 `:` 标记。当匹配到一个路由时，参数值会被设置到 `this.$route.params`，可以在每个组件内使用。

| **模式**                      | **匹配路径**        | **$route.params**                    |
| ----------------------------- | ------------------- | ------------------------------------ |
| /user/:username/post/:post_id | /user/evan/post/123 | { username: 'evan', post_id: '123' } |

### 响应路由参数的变化

从 `/user/foo` 导航到 `/user/bar`，**原来的组件实例会被复用**。因为两个路由都渲染同个组件，比起销毁再创建，复用则显得更加高效。**不过，这也意味着组件的生命周期钩子不会再被调用**。

复用组件时，想对路由参数的变化作出响应的话，你可以简单地 watch (监测变化) `$route` 对象：

```js
const User = {
  template: '...',
  watch: {
    $route(to, from) {
      // 对路由变化作出响应...
    },
  },
}
```

### 捕获所有路由或 404 Not found 路由

当我们将`path`设为`*`，会匹配所有的路径，比较常见的场景是在 404 页面进行使用

假设此时我们有 3 个页面：`index`,`about`,`404`

```js
const router = new Router({
  routes: [
    { path: '/index', component: Index },
    { path: '/about', component: About },
    { path: '*', component: 404 }, //这个意思就是如果浏览器地址栏输入的不是'/index'也不是'/about'，那我就让它跳转到'404'页面
  ],
})
```

### 路由的 params 参数

1. 配置路由，声明接收 params 参数

   ```js
   {
   	path:'/home',
   	component:Home,
   	children:[
   		{
   			path:'news',
   			component:News
   		},
   		{
         path:'message'
   			component:Message,
   			children:[
   				{
   					name:'xiangqing',
   					path:'detail/:id/:title', //使用占位符声明接收params参数
   					component:Detail
   				}
   			]
   		}
   	]
   }
   ```

2. 传递参数

   ::: warning 特别注意
   路由携带`params`参数时，若使用`to`的对象写法，则**不能使用`path`配置项**，必须使用`name`配置;`query`的话,`name`和`path`均可
   :::

   ```html
   <!-- 跳转并携带params参数，to的字符串写法 -->
   <router-link to="/home/message/detail/666/你好">跳转</router-link>

   <!-- 跳转并携带params参数，to的对象写法 -->
   <router-link :to="{name:'xiangqing',params:{id:666,title:'你好'}}"
     >跳转</router-link
   >
   ```

3. 接收参数：

   ```js
   $route.params.id
   $route.params.title
   ```

### 路由的 query 参数

::: tip 扩展阅读:params 和 query 的区别

[vue router 如何使用 params query 传参，以及有什么区别](https://juejin.cn/post/6844903510719348749)

[Vue Router 的 params 和 query 的区别](https://juejin.cn/post/7045875372553928740)

:::

1. 传递参数

   ```js
   <!-- 跳转并携带query参数，to的字符串写法 -->
   <router-link :to="/home/message/detail?id=666&title=你好">跳转</router-link>

   <!-- 跳转并携带query参数，to的对象写法 -->
   <router-link :to="{path:'/home/message/detail',query:{id:666,title:'你好'}}">跳转</router-link>
   ```

2. 接收参数：

   ```js
   $route.query.id
   $route.query.title
   ```

## 嵌套路由

::: warning 嵌套路由的两个要点

- 路由对象中通过`children`配置子级路由

- 组件内`router-view`的使用

:::

1. 配置路由规则，使用`children`配置项：

```js
routes: [
  {
    path: '/about',
    component: About,
  },
  {
    path: '/home',
    component: Home,
    children: [
      //通过children配置子级路由
      {
        path: 'news',
        // 此时path等同于'/home/news',子路由会继承父路由的路径.但是不能写成path:'/news'.因为以 / 开头的嵌套路径会被当作根路径,也就是说此时news成了根路径.而不是home.
        component: News,
      },
      {
        //此处一定不要写：/message
        path: 'message',
        component: Message,
      },
    ],
  },
]
```

::: warning 注意
如果`/home`下没有匹配到其他子路由时,`home`的`router-view`是什么都不会显示的,如果你想让它显示点什么:可以将`home`的某一子级路由的`path`,设为空`''`. 它所配置的组件就是默认显示的组件

**利用重定向解决**:重定向其实就是通过路由拦截`path`,然后替换`url`跳转到`redirect`所指定的路由上. 重定向是通过` routes` 配置来完成，可以给父组件设置重定向到任意子路由，也可以解决一打开什么也没有显示的问题

::: details 参考代码

```js
//从 /a 重定向到 /b
const router = new VueRouter({
  routes: [{ path: '/a', redirect: '/b' }],
})

///从 /a 重定向到 命名为'foo'的路由
const router = new VueRouter({
  routes: [{ path: '/a', redirect: { name: 'foo' } }],
})
```

:::

2. 跳转（要写完整路径）：

   ```html
   <router-link to="/home/news">News</router-link>
   <router-link :to="{path:'/home/news'}">News</router-link>
   ```

## 编程式的导航

1. 作用：不借助`<router-link> `实现路由跳转，让路由跳转更加灵活

2. 具体编码：

   ```js
   // 这个方法会向 history 栈添加一个新的记录，所以，当用户点击浏览器后退按钮时，则回到之前的 URL。
   //  当你点击 <router-link> 时，这个方法会在内部调用，所以说，点击 <router-link :to="..."> 等同于调用 router.push(...)
   // 字符串写法
   this.$router.push('/home')
   // 对象写法
   this.$router.push({
     name: 'xiangqing',
     params: {
       id: xxx,
       title: xxx,
     },
   })
   // 跟 router.push 很像，唯一的不同就是，它不会向 history 添加新记录，而是跟它的方法名一样 —— 替换掉当前的 history 记录
   this.$router.replace({
     name: 'xiangqing',
     params: {
       id: xxx,
       title: xxx,
     },
   })
   this.$router.forward() //在浏览器记录中前进一步 等同于router.go(1)
   this.$router.back() //后退一步记录 等同于router.go(-1)
   this.$router.go() //可前进也可后退 传数字 负数后退几步 正数前进几步
   ```

## 命名路由

1. 作用：可以简化路由的跳转

2. 如何使用

   1. 给路由命名：

      ```js
      {
      	path:'/demo',
      	component:Demo,
      	children:[
      		{
      			path:'test',
      			component:Test,
      			children:[
      				{
                        name:'hello' //给路由命名
      					path:'welcome',
      					component:Hello,
      				}
      			]
      		}
      	]
      }
      ```

   2. 简化跳转：

      ```js
      <!--简化前，需要写完整的路径 -->
      <router-link to="/demo/test/welcome">跳转</router-link>

      <!--简化后，直接通过名字跳转 -->
      <router-link :to="{name:'hello'}">跳转</router-link>

      <!--简化写法配合传递参数 -->
      <router-link :to="{name:'hello',query:{id:666,title:'你好'}}">跳转</router-link>
      ```

## 命名视图

有时候想同时 (同级) 展示多个视图，而不是嵌套展示，例如创建一个布局，有 `sidebar` (侧导航) 和 `main` (主内容) 两个视图，这个时候命名视图就派上用场了。你可以在界面中拥有多个单独命名的视图，而不是只有一个单独的出口。如果 `router-view` 没有设置名字，那么默认为 `default`

```js
<router-view class="view one"></router-view>
<router-view class="view two" name="a"></router-view>
<router-view class="view three" name="b"></router-view>
```

一个视图使用一个组件渲染，因此对于同个路由，多个视图就需要多个组件。确保正确使用 `components` 配置 (带上 s)：

```js
const router = new VueRouter({
  routes: [
    {
      path: '/',
      components: {
        default: Foo,
        a: Bar,
        b: Baz,
      },
    },
  ],
})
```

## 路由组件传参

在组件中使用 `$route` 会使之与其对应路由形成高度**耦合**(耦合指的是各个模块依赖程度)，从而使组件只能在某些特定的 `URL` 上使用，限制了其灵活性,可以使用 `props` 将组件和路由解耦

### 路由的 props 配置

作用：让路由组件更方便的收到参数

```js
{
	name:'xiangqing',
	path:'detail/:id',
	component:Detail,

	//第一种写法：props值为对象，该对象中所有的key-value的组合最终都会通过props传给Detail组件
	// props:{a:900}

	//第二种写法：props值为布尔值，布尔值为true，则把路由收到的所有params参数通过props传给Detail组件
	// props:true

	//第三种写法：props值为函数，该函数返回的对象中每一组key-value都会通过props传给Detail组件
	props(route){
		return {
			id:route.query.id,
			title:route.query.title
		}
	}
}
```

对于包含命名视图的路由，你必须分别为每个命名视图添加 `props` 选项

```js
    {
      path: '/user/:id',
      components: { default: User, sidebar: Sidebar },
      props: { default: true, sidebar: false }
    }
```

之后我们就可以在该组件中利用`props`配置项接收参数，并且可以在任何地方使用该组件，使得该组件更易于重用和测试

## 路由器的两种工作模式

1. 对于一个`url`来说，什么是`hash`值？—— #及其后面的内容就是 hash 值

2. `hash`值不会包含在 `HTTP` 请求中，即：`hash`值不会带给服务器

3. `hash`模式：
   1. 地址中永远带着`#`号，不美观
   2. 若以后将地址通过第三方手机`app`分享，若`app`校验严格，则地址会被标记为不合法
   3. 兼容性较好
4. `history`模式：
   1. 地址干净，美观
   2. 兼容性和`hash`模式相比略差
   3. 应用部署上线时需要后端人员支持，解决刷新页面服务端`404`的问题

::: tip 提示

[koa2-connect-history-api-fallback ](https://www.npmjs.com/package/koa2-connect-history-api-fallback)

`koa2`的一个中间件，用于处理`vue-router`使用 history 模式返回`index.html`，让`koa2`支持`SPA`应用程序
:::

## 导航守卫 <Badge text='困难' type='error' />

1. 作用：对路由进行权限控制

2. 分类：全局守卫、独享守卫、组件内守卫

3. 全局守卫:

   ```js
   //全局前置守卫：初始化时执行、每次路由切换前执行
   router.beforeEach((to, from, next) => {
     console.log('beforeEach', to, from)
     if (to.meta.isAuth) {
       //判断当前路由是否需要进行权限控制
       if (localStorage.getItem('school') === 'atguigu') {
         //权限控制的具体规则
         next() //放行
       } else {
         alert('暂无权限查看')
         // next({name:'guanyu'})
       }
     } else {
       next() //放行
     }
   })

   //全局后置守卫：初始化时执行、每次路由切换后执行
   router.afterEach((to, from) => {
     console.log('afterEach', to, from)
     if (to.meta.title) {
       document.title = to.meta.title //修改网页的title
     } else {
       document.title = 'vue_test'
     }
   })
   ```

::: tip 提示
路由配置的 meta 对象里的信息是路由元信息,我们可以通过在 meta 里设置的状态,来判断是否需要进行登录验证.如果 meta 里的 isAuth 为 true,则需要判断是否已经登录,没登录就跳转到登录页.如果已登录则继续跳转.

前面说的 path,params,query 都可以存储信息,作为登录验证的状态标记.的确,它们也可以达到同样的效果.如果是少量单个的验证,使用它们问题不大.
但如果是多个路由都需要进行登录验证呢?path,params,query 是把信息显性地存储在 url 上的.并且多个路径都把一个相同的状态信息加在 url 上.这样就使 url 不再单纯,并且也很不优雅美观.
所以要优雅要隐性地传递信息,就使用 meta 对象吧
:::

4. 独享守卫:

   ```js
   beforeEnter(to,from,next){
   	console.log('beforeEnter',to,from)
   	if(to.meta.isAuth){ //判断当前路由是否需要进行权限控制
   		if(localStorage.getItem('school') === 'atguigu'){
   			next()
   		}else{
   			alert('暂无权限查看')
   			// next({name:'guanyu'})
   		}
   	}else{
   		next()
   	}
   }
   ```

5. 组件内守卫：

   ```js
   //进入守卫：通过路由规则，进入该组件时被调用
   beforeRouteEnter (to, from, next) {
   },
   //离开守卫：通过路由规则，离开该组件时被调用
   beforeRouteLeave (to, from, next) {
   }
   ```

## 缓存路由组件

1. 作用：让不展示的路由组件保持挂载，不被销毁

2. 具体编码：

   ```html
   // include 缓存那个组件，这里写的是组件名 如果有多个,要写成数组形式
   <keep-alive include="News">
     <router-view></router-view>
   </keep-alive>
   ```

3. 两个新的生命周期钩子

- 作用：keep-alive 缓存的路由组件所独有的两个钩子，用于捕获路由组件的激活状态

- 具体名字：

1. `activated`路由组件被激活时触发
2. `deactivated`路由组件失活时触发

## 路由懒加载

当打包构建应用时，JavaScript 包会变得非常大，影响页面加载。如果我们能把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应组件，这样就会更加高效。

```js
// 将
// import UserDetails from './views/UserDetails'
// 替换成
const UserDetails = () => import('./views/UserDetails')
```

### 把组件按块划分

有时候我们想把某个路由下的所有组件都打包在同个异步块 (chunk) 中。只需要使用命名 chunk，一个特殊的注释语法来提供 chunk name (需要 Webpack > 2.4)：

```js
const UserDetails = () =>
  import(/* webpackChunkName: "group-user" */ './UserDetails.vue')
const UserDashboard = () =>
  import(/* webpackChunkName: "group-user" */ './UserDashboard.vue')
const UserProfileEdit = () =>
  import(/* webpackChunkName: "group-user" */ './UserProfileEdit.vue')
```

webpack 会将任何一个异步模块与相同的块名称组合到相同的异步块中。

## vue-router 4.x <Badge text='4.x补充' />

### 创建

1. 创建`src/router/index.js`

```js
import { createRouter, createWebHashHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Welcome from '../components/Welcome.vue'
const routes = [
  {
    name: 'home',
    path: '/',
    redirect: '/welcome',
    children: [
      {
        name: 'welcome',
        path: '/welcome',
        component: Welcome,
      },
    ],
  },
  {
    name: 'login',
    path: '/login',
    component: Login,
  },
]

const router = createRouter({
  routes,
  // 创建hash路由
  history: createWebHashHistory(),
})

export default router
```

2. `main.js`应用`vue-router`

```js
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
//导入router
import router from './router/index.js'
const app = createApp(App)
// 应用router
app.use(ElementPlus).use(router).mount('#app')
```

## 在 `setup` 中访问路由和当前路由

```vue
<template>
  欢迎访问vue3+vite admin
  <el-button @click="goLogin()">去登陆</el-button>
</template>
<script setup>
import { useRouter, useRoute } from 'vue-router'
// 路由实例
const router = useRouter()
// 当前路由对象
const route = useRoute()
// 去登陆页面
const goLogin = () => {
  console.log(route.name)
  router.push({ name: 'login' })
}
</script>
<style scoped></style>
```
