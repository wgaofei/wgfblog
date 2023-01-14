---
title: Vue组件化编程
category:
  - 前端框架
  - Vue
icon: vue
order: 2
---

::: warning 传统方式的缺点
传统方式编写应用，依赖关系混乱，代码复用率不高
:::

## 几个概念

### 模块

向外提供特定功能的 js 程序，一般就是一个 js 文件

为什么？js 文件很多很复杂。

作用：可以复用 js，简化 js 的编写，提高 js 的运行效率

### 组件

实现应用中**局部**功能的代码（(html,css,js)和资源(mp3,mp4,字体....)的**集合**

为什么？一个界面的功能很复杂

作用：复用编码，简化项目编码，提高运行效率

### 模块化

当应用中的 js 都以模块来编写的，那这个应用就是一个模块化的应用。

### 组件化

当应用中的功能都是多组件的方式来编写的，那这个应用就是一个组件化的应用。

## 组件

::: tip 提示
非单文件组件和单文件组件的区别：“非单文件组件一个文件中包含有 n 个组件，单文件组件一个文件只包含一个组件“
:::

Vue 中使用组件的步骤：

1. 定义组件(创建组件)

2. 注册组件

3. 使用组件(写组件标签)

如何定义一个组件？

使用 `Vue.extend(options)`创建，其中 `options` 和 `new Vue(options)`时传入的那个 `options `几乎一样，但也有点区别；

区别如下：

1.`el `不要写，为什么？ ——— 最终所有的组件都要经过一个 `vm` 的管理，由 `vm` 中的 `el` 决定服务哪个容器

2.`data` 必须写成函数，为什么？ ———— **避免组件被复用时，数据存在引用关系**。

备注：使用 `template` 可以配置组件结构

如何注册组件？

1. 局部注册：靠 `new Vue` 的时候传入 `components` 选项

2. 全局注册：靠 `Vue.component('组件名',组件)`

编写组件标签：

```html
<school></school>
```

一个例子：

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>非单文件组件基本使用</title>
    <script src="https://cdn.jsdelivr.net/npm/vue@2.6.14/dist/vue.js"></script>
  </head>
  <body>
    <div id="root">
      {{msg}}
      <hello></hello>
    </div>
    <div id="root2">
      {{msg2}}
      <hello></hello>
    </div>

    <script type="text/javascript">
      Vue.config.productionTip = false
      const hello = Vue.extend({
        name: 'hello',
        template: `<div>hello!
            <button @click='alertHello'>点我点我</button>
            </div>
        `,
        methods: {
          alertHello() {
            alert('hello')
          },
        },
      })
      // 全局注册
      Vue.component('hello', hello)
      new Vue({
        el: '#root',
        //  components:{
        //     //  局部注册
        //      hello:hello
        //  },
        data() {
          return {
            msg: 'frank你好！',
          }
        },
      })
      new Vue({
        el: '#root2',
        data() {
          return {
            msg2: 'alex你好！',
          }
        },
      })
    </script>
  </body>
</html>
```

### 组件的几个注意点

1.关于组件名:

第一种写法(`kebab-case `命名)：`my-school`

第二种写法(`CamelCase` 命名)：`MySchool`,在模板中一样可以使用`my-school`这种写法

备注：

(1).组件名尽可能回避 `HTML` 中已有的元素名称，例如：`h2`、`H2` 都不行。

(2).可以使用 `name` 配置项指定组件在开发者工具中呈现的名字。

2.关于组件标签:

第一种写法：`<school></school>`

第二种写法：`<school/>`

3.一个简写方式：

`const school = Vue.extend(options)` 可简写为：`const school = options`

### 组件的嵌套

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>组件的嵌套</title>
    <!-- 引入Vue -->
    <script src="https://cdn.jsdelivr.net/npm/vue@2.6.14/dist/vue.js"></script>
  </head>
  <body>
    <!-- 准备好一个容器-->
    <div id="root"></div>
  </body>

  <script type="text/javascript">
    Vue.config.productionTip = false //阻止 vue 在启动时生成生产提示。

    //定义student组件
    const student = Vue.extend({
      name: 'student',
      template: `
				<div>
					<h2>学生姓名：{{name}}</h2>	
					<h2>学生年龄：{{age}}</h2>	
				</div>
			`,
      data() {
        return {
          name: 'frank',
          age: 18,
        }
      },
    })

    //定义school组件
    const school = Vue.extend({
      name: 'school',
      template: `
				<div>
					<h2>学校名称：{{name}}</h2>	
					<h2>学校地址：{{address}}</h2>	
					<student></student>
				</div>
			`,
      data() {
        return {
          name: 'SNUT',
          address: 'HAN ZHONG',
        }
      },
      //注册组件（局部）
      components: {
        student,
      },
    })

    //定义hello组件
    const hello = Vue.extend({
      template: `<h1>{{msg}}</h1>`,
      data() {
        return {
          msg: '欢迎来到SNUT学习！',
        }
      },
    })

    //定义app组件
    const app = Vue.extend({
      template: `
				<div>	
					<hello></hello>
					<school></school>
				</div>
			`,
      components: {
        school,
        hello,
      },
    })

    //创建vm
    new Vue({
      template: '<app></app>',
      el: '#root',
      //注册组件（局部）
      components: { app },
    })
  </script>
</html>
```

### VueComponent 构造函数

1.`school` 组件本质是一个名为 `VueComponent` 的构造函数，且不是程序员定义的，是 `Vue.extend` 生成的

2.我们只需要写`<school/>`或`<school></school>`，Vue 解析时会帮我们创建 `school` 组件的实例对象，即 `Vue` 帮我们执行的：`new VueComponent(options)`。

3.**特别注意**：每次调用 `Vue.extend`，返回的都是一个全新的 `VueComponent`

```js
// Vue.extend源码
Vue.extend = function (extendOptions) {
  // ......
  var Sub = function VueComponent(options) {
    this._init(options)
  }
  // ......
  return Sub
}
```

4.关于` this` 指向：

(1).组件配置中：

`data` 函数、`methods` 中的函数、`watch` 中的函数、`computed` 中的函数 它们的 `this` 均是`VueComponent `实例对象

(2).`new Vue(options)`配置中：

`data `函数、`methods `中的函数、`watch `中的函数、`computed` 中的函数 它们的 `this` 均是`Vue `实例对象

5.`VueComponent `的实例对象，以后简称 `vc`（也可称之为：组件实例对象）。`Vue` 的实例对象，简称 `vm`。

**一个重要的内置关系**

![重要的内置关系 ](https://zfh-nanjing-bucket.oss-cn-nanjing.aliyuncs.com/blog-images/%E9%87%8D%E8%A6%81%E7%9A%84%E5%86%85%E7%BD%AE%E5%85%B3%E7%B3%BB%20.png)

1.一个重要的内置关系：`VueComponent.prototype.__proto__=== Vue.prototype`

2.为什么要有这个关系：让组件实例对象（vc）可以访问到 Vue 原型上的属性、方法。

## vue 脚手架

::: warning 注意
最新版本 4.x
:::

### 使用

1. 全局安装 vue 脚手架:`npm i -g @vue/cli`

2. 创建项目:`vue create xxx`

### 脚手架文件结构

```
	├── node_modules
	├── public
	│   ├── favicon.ico: 页签图标
	│   └── index.html: 主页面
	├── src
	│   ├── assets: 存放静态资源
	│   │   └── logo.png
	│   │── component: 存放组件
	│   │   └── HelloWorld.vue
	│   │── App.vue: 汇总所有组件
	│   │── main.js: 入口文件
	├── .gitignore: git版本管制忽略的配置
	├── babel.config.js: babel的配置文件
	├── package.json: 应用包配置文件
	├── README.md: 应用描述文件
	├── package-lock.json：包版本控制文件
```

## render 函数

**vue 工程中的`main.js`中的`render`函数**

1. vue.js 与 vue.runtime.xxx.js 的区别：

(1).vue.js 是完整版的 Vue，包含：核心功能+模板解析器。

(2).vue.runtime.xxx.js 是运行版的 Vue，只包含：核心功能；没有`模板解析器`。

2. 因为 vue.runtime.xxx.js 没有模板解析器，所以不能使用 template 配置项，需要使用`render函数`接收到的`createElement`函数去指定具体内容。

## vue.config.js 配置文件

1. 使用`vue inspect > output.js`可以查看到 Vue 脚手架的默认配置。
2. 使用 vue.config.js 可以对脚手架进行个性化定制，详情见：https://cli.vuejs.org/zh

## ref 属性

1. 被用来给元素或子组件注册引用信息（id 的替代者）
2. 应用在 html 标签上获取的是真实 DOM 元素，应用在组件标签上是组件实例对象（vc）
3. 使用方式：
   1. 打标识：`<h1 ref="xxx">.....</h1>` 或 `<School ref="xxx"></School>`
   2. 获取：`this.$refs.xxx`

## props 配置项

1.  功能：让组件接收外部传过来的数据
2.  传递数据：`<Demo name="xxx"/>`

::: warning 注意
props 是只读的，Vue 底层会监测你对 props 的修改，如果进行了修改，就会发出警告，若业务需求确实需要修改，那么请复制 props 的内容到 data 中一份，然后去修改 data 中的数据。
:::

1. 接收数据：

   - 第一种方式（只接收）：`props:['name'] `
   - 第二种方式（限制类型）：`props:{name:String}`
   - 第三种方式（限制类型、限制必要性、指定默认值）：

     ```js
     props:{
     	name:{
     	type:String, //类型
     	required:true, //必要性
     	default:'老王' //默认值
     	}
     }
     ```

更多 🚫 限制：

```js
 props: {
    // 基础的类型检查 (`null` 和 `undefined` 会通过任何类型验证)
    propA: Number,
    // 多个可能的类型
    propB: [String, Number],
    // 必填的字符串
    propC: {
      type: String,
      required: true
    },
    // 带有默认值的数字
    propD: {
      type: Number,
      default: 100
    },
    // 带有默认值的对象
    propE: {
      type: Object,
      // 对象或数组默认值必须从一个工厂函数获取
      default: function () {
        return { message: 'hello' }
      }
    },
    // 自定义验证函数
    propF: {
      validator: function (value) {
        // 这个值必须匹配下列字符串中的一个
        return ['success', 'warning', 'danger'].includes(value)
      }
    }
  }
```

## mixin 混入

1. 功能：可以把多个组件共用的配置提取成一个混入对象

2. 使用方式：

   第一步在 js 文件中定义混合：

   ```js
   export default {
       data(){....},
       methods:{....}
       ....
   }
   ```

   第二步使用混入：

   在 mian.js 中全局混入：`Vue.mixin(xxx)`
   ​ 在组件中局部混入：`mixins:[xxx]`

## 插件

1. 功能：用于增强 Vue

2. 本质：包含 install 方法的一个对象，install 的第一个参数是 Vue，第二个以后的参数是插件使用者传递的数据。

3. 定义插件：
   xxx.js

```js
	export default{
		install(Vue, options) {
        // 1. 添加全局过滤器
        Vue.filter(....)

        // 2. 添加全局指令
        Vue.directive(....)

        // 3. 配置全局混入(合)
        Vue.mixin(....)

        // 4. 添加实例方法
        Vue.prototype.$myMethod = function () {...}
        Vue.prototype.$myProperty = xxxx
    }
	}
```

4. 使用插件：`Vue.use(xxx)`

## scoped 样式

1. 作用：**让样式在局部生效，防止冲突**。
2. 写法：`<style scoped>`

## 总结 TodoList 案例

1. 组件化编码流程：

(1).拆分静态组件：组件要按照功能点拆分，命名不要与 html 元素冲突。

(2).实现动态组件：考虑好数据的存放位置，数据是一个组件在用，还是一些组件在用：

    1).一个组件在用：放在组件自身即可。

    ​2). 一些组件在用：放在他们共同的父组件上（这种行为被称为状态提升）

(3).实现交互：从绑定事件开始。

2. props 适用于：

   (1).父组件 ==> 子组件 通信

   (2).子组件 ==> 父组件 通信（要求父先给子一个函数）

3. 使用 v-model 时要切记：v-model 绑定的值不能是 props 传过来的值，因为 props 是不可以修改的！

4. props 传过来的若是对象类型的值，修改对象中的属性时 Vue 不会报错，但不推荐这样做。

5. oninput 事件类似于 onchange 事件。不同之处在于 oninput 事件在元素值发生变化是立即触发， onchange 在元素失去焦点时触发。另外一点不同是 onchange 事件也可以作用于 `<keygen>` 和 `<select>` 元素。

- [oninput 事件](https://www.runoob.com/jsref/event-oninput.html)
- [onchange 事件](https://www.runoob.com/jsref/event-onchange.html)

## webStorage

// TODO 删除合并

1. 存储内容大小一般支持 5MB 左右（不同浏览器可能还不一样）

2. 浏览器端通过 Window.sessionStorage 和 Window.localStorage 属性来实现本地存储机制。

3. 相关 API：

   1. `xxxxxStorage.setItem('key', 'value');`
      该方法接受一个键和值作为参数，会把键值对添加到存储中，如果键名存在，则更新其对应的值。

   2. `xxxxxStorage.getItem('person');`

      该方法接受一个键名作为参数，返回键名对应的值。

   3. `xxxxxStorage.removeItem('key');`

      该方法接受一个键名作为参数，并把该键名从存储中删除。

   4. `xxxxxStorage.clear()`

      该方法会清空存储中的所有数据。

4. 备注：

   1. `SessionStorage` 存储的内容会随着浏览器窗口关闭而消失。
   2. `LocalStorage `存储的内容，需要手动清除才会消失。
   3. `xxxxxStorage.getItem(xxx)`如果 `xxx` 对应的 `value` 获取不到，那么 `getItem `的返回值是 `null`。
   4. `JSON.parse(null)`的结果依然是 `null`。

## 组件的自定义事件

1. 一种组件间通信的方式，适用于：<strong style="color:red">子组件 ===> 父组件</strong>

2. 使用场景：A 是父组件，B 是子组件，B 想给 A 传数据，那么就要在 A 中给 B 绑定自定义事件（<span style="color:red">事件的回调在 A 中</span>）。

3. 绑定自定义事件：

   1. 第一种方式，在父组件中：`<Demo @getData="getData"/>` 或 `<Demo v-on:getData="getData"/>`

   2. 第二种方式，在父组件中：

```vue
<Child ref="child" />
// .....
<script>
export default {
  methods: {
    getData(data) {
      console.log(data)
    },
  },
  mounted() {
    this.$refs.child.$on('getData', this.getData)
  },
}
</script>
```

3. 触发自定义事件：`this.$emit('getData',数据)`

4. 若想让自定义事件只能触发一次，可以使用`once`修饰符，或`$once`方法。

5. 解绑自定义事件`this.$off('getData')`;解绑多个自定义事件`this.$off(['getData','demo'])`;解绑所有的自定义事件：`this.$off()`

6. 组件上也可以绑定原生 `DOM `事件，需要使用`native`修饰符

7. 注意：通过`this.$refs.xxx.$on('getData',回调)`绑定自定义事件时，回调<span style="color:red">要么配置在 `methods` 中</span>，<span style="color:red">要么用箭头函数</span>，否则 `this `指向会出问题(该回调中的 `this` 指向触发自定义事件的组件实例对象)

## 全局事件总线（GlobalEventBus）

::: tip 实现全局事件总线的前提

- 所有组件都可以看到
- 可以调用`$on`,`$off`,`$emit`

:::

1.  一种组件间通信的方式，适用于<span style="color:red">任意组件间通信</span>。

2.  安装全局事件总线：

```js
// main.js
new Vue({
  // ......
  beforeCreate() {
    Vue.prototype.$bus = this //安装全局事件总线，$bus 就是当前应用的 vm
  },
  // ......
})
```

3.  使用事件总线：

    1. 接收数据：A 组件想接收数据，则在 A 组件中给\$bus 绑定自定义事件，事件的<span style="color:red">回调留在 A 组件自身。</span>

    2. 提供数据：`this.$bus.$emit('xxxx',数据)`

    3. 最好在` beforeDestroy` 钩子中，用 `$off` 去解绑<span style="color:red">当前组件所用到的</span>事件。

```js
export default {
  // ......
  methods: {
    getData(data) {
      console.log(data)
    },
  },
  mounted() {
    // 给bus绑定自定义事件
    this.$bus.$on('getData', this.getData)
  },
  beforeDestroy() {
    this.$bus.$off('getData')
  },
}
```

## 消息订阅与发布（pubsub）

::: danger 警告
经本人测试 订阅消息`数据参数`只能有**一个** 如果存在多个参数 请将参数包装成`对象`传递

最好在 `beforeDestroy` 钩子中，用`pubsub.unsubscribe(this.pid)`去<span style="color:red">取消订阅。</span>

:::

1. 一种组件间通信的方式，适用于<span style="color:red">任意组件间通信</span>。

2. 使用步骤：

   1. 安装 pubsub：`npm i pubsub-js`

   2. 引入: `import pubsub from 'pubsub-js'`

   3. 接收数据（订阅消息）：A 组件想接收数据，则在 A 组件中订阅消息，订阅的<span style="color:red">回调留在 A 组件自身。</span>

   4. 提供数据(发布消息)：`pubsub.publish('消息名',数据)`

```js
export default {
  // 接受数据
  methods: {
    sub(msgName, data) {
      // 如果不想接收msgName(消息的名字),可以使用"_"占位
      console.log(msgName, data)
    },
  },
  mounted() {
    this.pid = pubsub.subscribe('getData', this.sub) //订阅消息
  },
  //   取消订阅
  beforeDestroy() {
    pubsub.unsubscribe(this.pid)
  },
}
```

```js
// 发布数据
export default {
  methods: {
    pub() {
      pubsub.publish('getData', '数据')
    },
  },
}
```

## nextTick

1. 语法：`this.$nextTick(回调函数)`
2. 作用：在下一次 DOM 更新结束后执行其指定的回调。
3. 什么时候用：当改变数据后，要基于更新后的新 DOM 进行某些操作时，要在 nextTick 所指定的回调函数中执行。

```js
// 修改数据
this.msg = 'Hello'
// DOM 还没有更新
this.$nextTick(function () {
  // DOM 更新了
})
```

## Vue 封装的过度与动画

[官方文档](https://cn.vuejs.org/v2/guide/transitions.html)

// TODO 梳理 改

1. 作用：在插入、更新或移除 DOM 元素时，在合适的时候给元素添加样式类名。
2. 写法：

   1. 准备好样式(class)：

      - 元素进入的样式：
        1. v-enter：进入的起点
        2. v-enter-active：进入过程中
        3. v-enter-to：进入的终点
      - 元素离开的样式：
        1. v-leave：离开的起点
        2. v-leave-active：离开过程中
        3. v-leave-to：离开的终点

   2. 使用`<transition>`包裹要过度的元素，并配置 name 属性：

::: tip 提示

给 transition 加上 name 属性 xxx,就需要将类名 v-...改成 xxx-...

对于这些在过渡中切换的类名来说，如果你使用一个没有名字的 `<transition>`，则 v- 是这些类名的默认前缀。如果你使用了 `<transition name="my-transition">`，那么 v-enter 会替换为 my-transition-enter
:::

```js
<transition name="hello">
  <h1 v-show="isShow">你好啊！</h1>
</transition>
```

3. 备注：若有多个元素需要过度，则需要使用：`<transition-group>`，且每个元素都要指定`key`值。

4. 可以通过 appear attribute 设置节点在初始渲染的过渡

```js
<transition appear>
  <!-- ... -->
</transition>
```

5. 使用第三方动画库 animate.css

[animate.css](https://animate.style/)是强大的跨平台的预设 css3 动画库

安装:`npm install animate.css --save`

引入:`import "animate.css"`

使用第三方动画库需要通过以下 attribute 来自定义过渡类名

- enter-class
- enter-active-class
- enter-to-class (2.1.8+)
- leave-class
- leave-active-class
- leave-to-class (2.1.8+)

**一个栗子:**

```vue
<transition-group
  appear
  // 必须 添加 animate__animated
  enter-active-class="animate__animated animate__swing"
  leave-active-class="animate__animated animate__backOutUp"
>
  <h1 v-show="!isShow" key="1">
    你好啊！
  </h1>
  <h1 v-show="isShow" key="2">
    尚硅谷！
  </h1>
</transition-group>
```

## vue 脚手架配置代理

// TODO 查 changeOrigin

### 方法一

在 vue.config.js 中添加如下配置：

```js
devServer: {
  proxy: 'http://localhost:5000'
}
```

说明：

1. 优点：配置简单，请求资源时直接发给前端（8080）即可。
2. 缺点：不能配置多个代理，不能灵活的控制请求是否走代理。
3. 工作方式：若按照上述配置代理，当请求了前端不存在的资源时，那么该请求会转发给服务器 （优先匹配前端资源）

### 方法二

编写 vue.config.js 配置具体代理规则：

```js
module.exports = {
  devServer: {
    proxy: {
      '/api1': {
        // 匹配所有以 '/api1'开头的请求路径
        target: 'http://localhost:5000', // 代理目标的基础路径
        changeOrigin: true,
        pathRewrite: { '^/api1': '' },
      },
      '/api2': {
        // 匹配所有以 '/api2'开头的请求路径
        target: 'http://localhost:5001', // 代理目标的基础路径
        changeOrigin: true,
        pathRewrite: { '^/api2': '' },
      },
    },
  },
}
/*
   changeOrigin设置为true时，服务器收到的请求头中的host为：localhost:5000
   changeOrigin设置为false时，服务器收到的请求头中的host为：localhost:8080
   changeOrigin默认值为true
*/
```

说明：

1. 优点：可以配置多个代理，且可以灵活的控制请求是否走代理。
2. 缺点：配置略微繁琐，请求资源时必须加前缀。

## 插槽

[官方文档:插槽](https://v2.cn.vuejs.org/v2/guide/components-slots.html)

::: warning 废弃的语法
在 Vue 2.6.0 中，为具名插槽和作用域插槽引入了一个新的统一的语法 (即 `v-slot` 指令)。它取代了 `slot` 和 `slot-scope` 这两个目前已被废弃但未被移除的 API，在接下来所有的 2.x 版本中 `slot` 和 `slot-scope` attribute 仍会被支持，但已经被官方废弃且不会出现在 Vue 3 中。

:::

1. 作用：让父组件可以向子组件指定位置插入 `html` 结构，也是一种组件间通信的方式，适用于 <strong style="color:red">父组件 ===> 子组件</strong>;父级模板里的所有内容都是在父级作用域中编译的,子模板里的所有内容都是在子作用域中编译的，也就说插槽可以访问父组件中的数据，但不能访问子组件中的数据

2. 分类：`默认插槽`、`具名插槽`、`作用域插槽`

### 默认插槽

```html
<!-- 父组件中： -->
<Category>
  <div>this is a div</div>
</Category>

<!-- 子组件中： -->
<template>
  <div>
    <!-- 定义插槽 -->
    <!-- 如果提供内容则会取代后备内容-->
    <slot>我是后备内容，没有提供内容，我会被渲染～</slot>
  </div>
</template>
```

### 具名插槽

一个不带 `name` 的 `<slot>` 出口会带有隐含的名字:`default`

`v-slot`一般只能定义在`template`上 _注：特殊情况见`作用域插槽`_

```html
<!-- 父组件中： -->
<template>
  <div id="app">
    <HelloWorld>
      <template v-slot:header><div>this is header</div> </template>
      <!-- 默认插槽：任何没有被包裹在带有 v-slot 的 <template> 中的内容都会被视为默认插槽的内容。 -->
      <div>this is default</div>
      <!-- 如果你希望更明确一些，仍然可以在一个 <template> 中包裹默认插槽的内容 -->
      <!-- <template v-slot:default><div>this is default</div></template> -->
      <template v-slot:main><div>this is main</div></template>
      <template v-slot:footer><div>this is footer</div></template>
    </HelloWorld>
  </div>
</template>
<!-- 子组件中： -->
<template>
  <div>
    <!-- 定义插槽 -->
    <slot></slot>
    <slot name="header">插槽默认内容</slot>
    <slot name="main"> 插槽默认内容</slot>
    <slot name="footer">插槽默认内容</slot>
  </div>
</template>
```

::: details 使用“#“缩写

```html
<!-- 父组件中： -->
<HelloWorld>
  <template #header><div>this is header</div> </template>
  <template #main><div>this is main</div></template>
  <template #footer><div>this is footer</div></template>
</HelloWorld>
<!-- 子组件中： -->
<template>
  <div>
    <!-- 定义插槽 -->
    <slot name="header">插槽默认内容</slot>
    <slot name="main"> 插槽默认内容</slot>
    <slot name="footer">插槽默认内容</slot>
  </div>
</template>
```

:::

### 作用域插槽

1.  理解：<span style="color:red">数据定义在子组件，父组件想要访问定义在子组件中的数据</span>

2.  具体编码（父组件通过插槽能够访问子组件中才有的数据）：

```html
<!-- 父组件中 -->
<template>
  <div id="app">
    <!-- 特殊情况，被提供的内容只有默认插槽 -->
    <HelloWorld v-slot="slotProps"> <h2>{{ slotProps.msg }}</h2></HelloWorld>
  </div>
</template>

<!-- 子组件中： -->
<template>
  <div class="hello">
    <slot :msg="msg"></slot>
  </div>
</template>

<script>
  export default {
    name: 'HelloWorld',
    data() {
      return {
        msg: 'frank chang is handsome man',
      }
    },
  }
</script>
```

3. `v-slot `只能添加在 `<template>`的例外情况：**当被提供的内容只有默认插槽时，组件的标签才可以被当作插槽的模板来使用。这样就可以把 `v-slot` 直接用在组件上**:

```html
<!--  `v-slot` 直接用在组件上 -->
<current-user v-slot:default="slotProps">
  {{ slotProps.userName }}
</current-user>

<!-- 就像假定未指明的内容对应默认插槽一样，不带参数的 v-slot 被假定对应默认插槽 -->
<current-user v-slot="slotProps"> {{ slotProps.userName }} </current-user>

<!-- 默认插槽的缩写语法(上面👆的写法)不能和具名插槽混用，无效会导致警告 -->
<!-- 所以只要出现多个插槽，请始终为所有的插槽使用完整的基于 `<template>` 的语法👇 -->
<current-user>
  <template v-slot:default="slotProps">
    {{ slotProps.user.firstName }}
  </template>

  <template v-slot:other="otherSlotProps"> ... </template>
</current-user>
```

4. 使用“#“缩写

和其它指令一样，该缩写只在其有参数的时候才可用。这意味着以下语法是无效的：

```html
<!-- 这样会触发一个警告 -->
<current-user #="slotProps"> {{ slotProps.userName }} </current-user>
```

如果使用缩写的话，必须始终明确插槽名：

```html
<current-user #default="slotProps"> {{ slotProps.userName }} </current-user>
```

5. 解构插槽 Prop

适用情况:插槽提供了多个 `prop` 的时候

```html
<!-- 父组件 -->
<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <HelloWorld v-slot="{ user, msg }">
      <h2>{{ user.name }}</h2>
      <h3>{{ msg }}</h3>
    </HelloWorld>
  </div>
</template>
<!-- 子组件 -->
<template>
  <div class="hello">
    <slot :user="user" :msg="msg"></slot>
  </div>
</template>
<script>
  export default {
    name: 'HelloWorld',
    data() {
      return {
        user: { name: 'frank', age: 18 },
        msg: 'frank is a man',
      }
    },
  }
</script>
```

::: details 定义后备内容，用于插槽 `prop` 是 `undefined `的情形

```html
<!-- 父组件 -->
<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <HelloWorld
      v-slot="{ user={name:'not a found' age:'null'}, msg='not a found' }"
    >
      <h2>{{ user.name}},{{user.age }}</h2>
      <h3>{{ msg }}</h3>
    </HelloWorld>
  </div>
</template>
<!-- 子组件 -->
<template>
  <div class="hello">
    <slot :user="user" :msg="msg"></slot>
  </div>
</template>
<script>
  export default {
    name: 'HelloWorld',
    data() {
      return {
        user: { name: 'frank', age: 18 },
        msg: 'frank is a man',
      }
    },
  }
</script>
```

:::

## inheritAttrs ｜$attrs ｜ $listeners

### inheritAttrs

当我们在使用组件时，为其传递的参数要在组件的`props`中进行定义，才能够使用。如果没有定义，则这个属性会作为这个 DOM 结构`根节点`的`attribute`被渲染。

1.当设置`inheritAttrs: true`（默认）时，子组件的顶层标签元素中**会渲染出父组件传递过来的且未在 props 中定义的属性**

2.当设置`inheritAttrs: false`时，子组件的顶层标签元素中**不会渲染出父组件传递过来的且未在 props 中定义的属性**

### $attrs

`$attrs` 是一个内置属性，指父组件传递的、除了自己定义的 `props` 属性之外的所有属性

### $listeners <Badge text='Vue3中已被移除,事件监听器现在是 $attrs 的一部分' type='warning' />

`$listeners` 包含了作用在这个组件上所有的监听器，即父组件绑定的全部监听事件，通过` v-on="\$listeners"`，可以将这些事件绑定给它自己的子组件。

`$attrs` + `$listeners`实现爷孙组件事件通信

- 爷传孙：把想要传给孙组件的数据先传给父组件，在父组件中通过`v-bind='$attrs'`把数据传给孙子组件,**在父组件不要定义需要传递给孙组件的 props**

- 孙传爷：

  1. 在爷组件中,给父组件绑定自定义事件

  2. 在父组件中,通过:`v-on="$listeners"`,可以将这些事件绑定给它孙组件(vue3 通过`v-bind=$attrs`)

  3. 在孙组件中通过`this.$emit`触发自定义事件

## 挂载全局变量

如果需要设置全局变量，可以通过在 `main.js` 中，在 Vue 原型上添加属性实现全局变量

```js
Vue.prototype.$appName = 'My App'
```
