---
title: Vue核心
category:
  - 前端框架
  - Vue
order: 1
icon: vue
---

## vue 简介

一套用于**构建用户界面**的**渐进式** `JavaScript`框架

`Vue`可以自底向上逐层的应用

- 简单应用：只需一个轻量小巧的核心库

- 复杂应用：可以引入各式各样的`Vue`插件 `vue-router`,`vuex`.....

### vue 的特点

⭐ 组件化，提高代码复用率。且让代码更好维护

⭐ 声明式编码,无需直接操作`DOM`(命令式编码关心的是`how to do`，声明式编码关心的是`what to do`，`how` 的部分由框架完成)

![声明式编码](https://zfh-nanjing-bucket.oss-cn-nanjing.aliyuncs.com/blog-images/%E5%A3%B0%E6%98%8E%E5%BC%8F%E7%BC%96%E7%A0%81.png)

⭐ 使用`虛拟DOM`+优秀的`Diff算法`，尽量复用`DOM`节点。

![真实DOM](https://zfh-nanjing-bucket.oss-cn-nanjing.aliyuncs.com/blog-images/%E7%9C%9F%E5%AE%9EDOM.png)

![虚拟DOM](https://zfh-nanjing-bucket.oss-cn-nanjing.aliyuncs.com/blog-images/%E8%99%9A%E6%8B%9FDOM.png)

## 初识 Vue

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>初识Vue</title>
    <!-- 引入Vue -->
    <script src="https://cdn.bootcdn.net/ajax/libs/vue/2.6.14/vue.min.js"></script>
  </head>
  <body>
    <div id="root">
      <h1>Hello,{{Vue}}</h1>
    </div>
    <script type="text/javascript">
      //阻止 vue 在启动时生成生产提示。
      Vue.config.productionTip = false
      //创建Vue实例
      new Vue({
        el: '#root',
        data: {
          name: 'world',
        },
      })
    </script>
  </body>
</html>
```

1. 想让`Vue`工作，就必须创建一个**Vue 实例**，且要传入一个**配置对象**
2. `root`容器里的代码依然符合`html`规范，只不过混入了一些特殊的`Vue`语法
3. `root`容器里的代码被称为**Vue 模板**
4. `Vue`实例和容器是一一对应的
5. 真实开发中只有一个`Vue`实例，并且会配合着组件一起使用
6. 双花括号中的`xxx`要写` js` 表达式，且`xxx`可以自动读取到 `data `中的所有属性
7. **一旦 data 中的数据发生改变，那么页面中用到该数据的地方也会自动更新**

::: warning 注意区分
`js`表达式 和 `js`代码(语句)

1. 表达式：一个表达式会产生一个值，可以放在任何一个需要值的地方：

- `a`

- `a+b`

- `sum(1)`

- `x === y ? 'a' : 'b'`

2. js 代码(语句):

- `if(){}`

- `f or(){}`

:::

## 模板语法

### 插值语法

- 功能：用于解析标签体内容
- 写法：

```js
{
  {
    xxx
  }
}
```

`xxx` 是` js` 表达式，且可以直接读取到`data `中的所有属性

### 指令语法

::: warning 注意
`Vue` 中有很多的指令，且形式都是：`v-????`，此处只是拿 `v-bind` 举个例子
:::

- 功能：用于解析标签（包括：标签属性、标签体内容、绑定事件.....）
- 举例：

```js
v-bind:href="xxx" //或简写为 `:href="xxx"`
```

`xxx `同样要写` js` 表达式，且可以直接读取到 `data` 中的所有属性

## 数据绑定

- 单向绑定 `v-bind` :数据只能从 `data` 流向页面

- 双向绑定 `v-model` :数据不仅能从 `data` 流向页面，还可以从页面流向 `data`

## el 与 data 的两种写法

### el 有 2 种写法

- `new Vue`时候配置 `el` 属性
- 先创建`Vue`实例，随后再通过`vm.$mount('#root')`指定` el` 的值

### data 有 2 种写法

- 对象式

```js
data: {
  // ......
}
```

- 函数式

```js
data(){
    return{
    // ......
    }
}
```

如何目前哪种写法都可以，使用脚手架(vue-cli)开发时，**`data` 必须使用函数式**，否则必会报错

## MVVM 模型

1. `M`：模型`Model`=>`data`:主要存的是页面中的数据
2. `V`：视图`View` =>`templete`:MVVM 中的 View 通过使用模板语法来声明式的将数据渲染进 DOM，当 `ViewModel` 对 `Model `进行更新的时候，会通过数据绑定更新到 View
3. `VM`：视图模型`ViewModel`=>`Vue`实例:它是连接 view 和 model 的桥梁。它有两个方向：

- 将 `Model` 转化成 `View`，即将后端传递的数据转化成所看到的页面。实现的方式是：数据绑定。

- 将` View` 转化成` Model`，即将所看到的页面转化成后端的数据。实现的方式是：DOM 事件监听。

这两个方向都实现的，我们称之为数据的双向绑定。

![MVVM](https://zfh-nanjing-bucket.oss-cn-nanjing.aliyuncs.com/blog-images/MVVM.png)

## 事件处理

::: tip 两个重要的小原则

1. **所有被 Vue 管理的函数，最好写成普通函数，这样 this 的指向才是 vm 或 组件实例对象。**
2. **所有不被 Vue 所管理的函数（定时器的回调函数、ajax 的回调函数等、Promise 的回调函数），最好写成箭头函数，这样 this 的指向才是 vm 或 组件实例对象。**

:::

### 基本使用

1.

```js
v-on:xxx
// 或
@xxx // 简写
```

其中 xxx 是事件名

2. 事件的回调需要配置在 methods 对象中，最终会在 vm 上
3. methods 中配置的函数，**不要用箭头函数**，否则 this 就不是 vm 了
4. methods 中配置的函数，都是被 Vue 所管理的函数，this 的指向是 vm 或 **组件实例对象**
5.

```js
@click="demo"
@click="demo($event)"
```

上面两种写法效果一致，前者已经默认传入 event 事件对象，后者可以传参；（\$event 事件对象占位符）

### 事件修饰符

::: tip 提示
主要记住前三条

修饰符可以连续写：@click.prevent.stop
:::

1.  `prevent`：阻止默认事件（常用）
2.  `stop`：阻止事件冒泡（常用）
3.  `once`：事件只触发一次（常用）
4.  `capture`：使用事件的捕获模式
5.  `self`：只有 event.target(触发此事件最早元素)是当前元素自身**时**才触发事件
6.  `passive`：事件的默认行为立即执行，无需等待事件回调执行完毕

### 键盘事件

::: tip 提示
主要记住第一条，后两条不太会用到
:::

1. Vue 中常用的按键别名：

- 回车 => `enter`
- 删除 => `delete` (捕获“删除”和“退格”键)
- 退出 => `esc`
- 空格 =>`space`
- 换行 =>`tab` (特殊，必须配合 keydown 才可以正常使用\*\*)
- 上 =>`up`
- 下 =>`down`
- 左 =>`left`
- 右 => `right`

```html
<input type="text" placeholder="按下回车提示输入" @keydown.enter="showInfo" />
```

2. Vue 未提供别名的按键，可以使用按键原始的`key`值`event.key`去绑定，但注意要转为`kebab-case`（短横线命名）

```html
<input
  type="text"
  placeholder="按下大小写切换键提示输入"
  @keydown.caps-lock="showInfo"
/>
```

3. 系统修饰键（用法特殊）：`ctrl`、`alt`、`shift`、`meta(徽标键)`

::: tip 提示
`keyup`:当某个按键被松开，`keydown`当某个按键被按下
:::

(1).配合`keyup`使用：按下修饰键的同时，再按下其他键，随后释放其他键，事件才被触发。

(2).配合`keydown`使用：正常触发事件

::: warning KeyCode 已废弃

**已弃用:** 不再推荐使用该特性。虽然一些浏览器仍然支持它，但也许已从相关的 web 标准中移除，也许正准备移除或出于兼容性而保留。请尽量不要使用该特性，并更新现有的代码。

:::

4. 也可以使用`keyCode`去指定具体的按键 <Badge text='不推荐' type="error"/>

```html
<input type="text" placeholder="按下回车提示输入" @keydown.13="showInfo" />
```

5. 键盘事件同样可以连写<Badge text='不常用' type="error"/>===>`@keydown.ctrl.67`（Ctrl + C）

6. `Vue.config.keyCodes.自定义键名 = 键码`，可以去定制按键别名

```js
Vue.config.keyCodes.huiche = 13 //定义了一个别名按键
```

## 计算属性与监视

### 计算属性-computed

::: danger 坑点

不要在`computed`中使用`localStorage`,如果可以请使用`vuex`

```js
computed: {
	image() {
	// bad computed中无法监听localStorage
		return localStorage.getItem('imgUrl')
	},
	pic() {
		// good
		return this.$store.state.picUrl
	}
```

:::

1. 定义：要用的属性不存在，要通过**已有属性**计算得来
2. 原理：底层借助了 `Objcet.defineproperty` 方法提供的 `getter `和 `setter`
3. get 函数什么时候执行？

- 初次读取时会执行一次
- 当依赖的数据发生改变时会被再次调用

4. 优势： `methods`和计算属性两种方式的最终结果确实是完全相同的。然而，不同的是**计算属性是支持缓存**。只在依赖数据发生改变时它们才会重新求值。这就意味着只要依赖的数据不改变，多次访问计算属性会立即返回之前的计算结果，而不必再次执行函数，效率更高

5. 备注：

- 计算属性最终会出现在 vm 上，在模板中**直接读取**使用即可。
- 如果计算属性要被修改，那必须写 set 函数去响应修改，且 set 中要引起计算时依赖的数据发生改变。

<CodePen
  link="https://codepen.io/zhangfanhang/pen/rNJyRKe"
  :theme="$isDarkMode? 'dark': 'light'"
/>

6. 计算属性的简写（计算属性只读不改的前提下）：

```js
			computed:{
				fullName(){
					return this.firstName + '-' + this.lastName
				}
			}
```

### 监视属性-watch

1. 当被监视的属性变化时, 回调函数自动调用, 进行相关操作
2. 监视的属性必须存在，才能进行监视！！

3. 监视的两种写法：

(1)new Vue 时传入 watch 配置

<CodePen
  link="https://codepen.io/zhangfanhang/pen/MWQpZJp"
  :theme="$isDarkMode? 'dark': 'light'"
/>

(2)通过 `vm.$watch` 监视

```js
vm.$watch('isHot', {
  immediate: true,
  handler(newValue, oldValue) {
    console.log('isHot被修改了', newValue, oldValue)
  },
})
```

4. 深度监视

(1)Vue 中的 watch 默认不监测对象内部值的改变,比如 numbers 为对象{a:1,b:2},默认监视 numbers,改变 a,b 的值是不会触发回调函数的

(2)配置 deep:true 可以监测对象内部值改变

```js
			watch:{
				numbers:{
					deep:true,
					handler(){
						console.log('numbers改变了')
					}
				}
			}
```

备注：

(1)Vue 自身可以监测对象内部值的改变，但 Vue 提供的 watch 默认不可以！

(2)使用 watch 时根据数据的具体结构，决定是否采用深度监视。

5. 监视的简写方式(前提是没有 deep,immediate)：

```js
// 1
watch:{
	isHot(newValue,oldValue){
console.log('isHot被修改了',newValue,oldValue,this)
		}
	}
// 2
vm.$watch('isHot',function(newValue,oldValue){
console.log('isHot被修改了',newValue,oldValue,this)
		})
```

6. 可以单独监测对象中的某个值：

```js
  watch: {
    "dialogForm.ybExpression.value"(val) {
      console.log(val)
    }
```

### watch 对比 computed

[computed 和 watch 的区别](https://notes.zfhblog.top/%E5%89%8D%E7%AB%AF%E9%9D%A2%E8%AF%95/%E9%9D%A2%E8%AF%95%E9%A2%98%E6%80%BB%E7%BB%93/Vue%E9%9D%A2%E8%AF%95%E9%A2%98.html#computed-%E5%92%8C-watch-%E7%9A%84%E5%8C%BA%E5%88%AB)

## class 与 style 绑定

### class 样式

写法`:class="xxx"` `xxx` 可以是**字符串、对象、数组**。

- 字符串写法适用于：类名不确定，要动态获取。
- 数组写法适用于：要绑定多个样式，个数不确定，名字也不确定。
- 对象写法适用于：要绑定多个样式，个数确定，名字也确定，但不确定用不用。

```html
<!-- 字符串写法 -->
<h2 :class="isColor">{{list}}</h2>
<!-- 这种写法可以规定那个class类名是否生效，可以使用三目运算符进行判断 -->
<h2 :class='isColor?"red":"black"'>{{list}}</h2>
<!-- 对象写法 -->
<h2 :class="{ docker_item: true, 'docker_item-active': index === currentIndex}">
  {{list}}
</h2>
<!-- 数组写法 -->
<h2 :class="['docker_item', 'docker_item-active']">{{list}}</h2>
```

### style 样式(行内样式)

- `:style="{fontSize: '30px'}"`(或者这样写`:style="{'font-size': '30px'}"`)

- 直接绑定到一个样式对象(样式对象的 `key` 必须是`css`中的属性)通常更好，这会让模板更清晰：

```js
data(){
	return{
		styleObj:{
			fontSize:'40px',
			color:'red'
		}
	}
}
```

- `:style="[a,b]"`其中 `a`、`b` 是样式对象，这样可以将多个样式对象应用到同一个元素上。

## 条件渲染

### v-if

写法：

(1).v-if="表达式"

(2).v-else-if="表达式"

(3).v-else

适用于：切换频率较低的场景

特点：不展示的 DOM 元素直接被移除

注意：v-if 可以和:v-else-if、v-else 一起使用，但要求结构不能被“打断”

### v-show

写法：v-show="表达式"

适用于：切换频率较高的场景

特点：不支持 template，不展示的 DOM 元素未被移除，仅仅是使用样式(display:none)隐藏掉

### 备注

使用 v-if 的时，元素可能无法获取到，而使用 v-show 一定可以获取到。

如果需要同时控制多个 DOM 元素的隐藏，可以使用 template 占位符，不影响 DOM 结构

```html
<template v-if="true">
  <div id="box1">
    <div />
    <div id="box2">
      <div />
      <div id="box3">
        <div />
        <template />
      </div>
    </div></div
></template>
```

## 列表渲染

### v-for 指令

1.用于展示列表数据

2.语法：

```js
v-for="(item, index) in xxx" :key="yyy"
```

3.可遍历：数组、对象、字符串（用的很少）、指定次数（用的很少,指定 xxx 为一个数字）

::: danger 特别注意
如果在 template 上进行列表渲染，可能会报错(v-for 可以在 template 使用但是不能使用 key 属性)：

**`<template>` cannot be keyed. Place the key on real elements instead.**

原因：vue 不支持在 template 元素上绑定属性。比如这里想绑定 key 属性就不行

:::

### key 的作用和原理

::: warning 面试题
react、vue 中的 key 有什么作用？（key 的内部原理）
:::

#### 虚拟 DOM 中 key 的作用

`key`是`虚拟DOM`对象的标识，当数据发生变化时，`Vue`会根据 `新数据` 生成 `新的虚拟DOM` , 随后`Vue`进行 `新虚拟DOM` 与 `旧虚拟DOM` 的差异比较，比较规则如下：

#### 对比规则

1. **旧虚拟 DOM 中找到了与新虚拟 DOM 相同的 key**：

①. 若虚拟 DOM 中内容没变, 直接使用之前的真实 DOM

②. 若虚拟 DOM 中内容变了, 则生成新的真实 DOM，随后替换掉页面中之前的真实 DOM。

2. **旧虚拟 DOM 中未找到与新虚拟 DOM 相同的 key**：
   创建新的真实 DOM，随后渲染到到页面。

#### 用 index 作为 key 可能会引发的问题

①. 若对数据进行：逆序添加、逆序删除等破坏顺序操作:**会产生没有必要的真实 DOM 更新** ==> 界面效果没问题, 但效率低.(**DOM 没办法复用**)

②. 如果结构中还包含输入类的 DOM：**产生错误 DOM 更新** ==> 界面有问题。

#### 开发中如何选择 key?

①. 最好使用每条数据的唯一标识作为 key, 比如 id、手机号、身份证号、学号等唯一值。

②. 如果不存在对数据的逆序添加、逆序删除等破坏顺序操作，仅用于渲染列表用于展示，使用 index 作为 key 是没有问题的。

5. 图示：

![遍历列表时key的作用-index为key](https://zfh-nanjing-bucket.oss-cn-nanjing.aliyuncs.com/blog-images/%E9%81%8D%E5%8E%86%E5%88%97%E8%A1%A8%E6%97%B6key%E7%9A%84%E4%BD%9C%E7%94%A8-index%E4%B8%BAkey.png)

![遍历列表时key的作用-id为key](https://zfh-nanjing-bucket.oss-cn-nanjing.aliyuncs.com/blog-images/%E9%81%8D%E5%8E%86%E5%88%97%E8%A1%A8%E6%97%B6key%E7%9A%84%E4%BD%9C%E7%94%A8-id%E4%B8%BAkey.png)

### 列表过滤

[Array.prototype.filter()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)

#### watch 实现

<CodePen
link="https://codepen.io/zhangfanhang/pen/xxYqBmr"
:theme="$isDarkMode? 'dark': 'light'"
/>

#### computed 实现

<CodePen
  link="https://codepen.io/zhangfanhang/pen/gOvmEQQ"
  :theme="$isDarkMode? 'dark': 'light'"
/>

### 列表排序

<CodePen
  link="https://codepen.io/zhangfanhang/pen/ExQWMrW"
  :theme="$isDarkMode? 'dark': 'light'"
/>

## Vue 监测数据变化的原理

### 对于对象

**通过 setter 实现监视**，data 数据一改变，就会引起 vue 重新解析模板。且要在 new Vue 时就传入要监测的数据

(1).对象中后追加的属性，Vue 默认不做响应式处理

::: warning 特别注意
Vue.set() 和 vm.\$set() 不能给 vm 或 vm 的根数据对象 添加属性
:::

(2).如需给后添加的属性做响应式，请使用如下 API：

`Vue.set(target,propertyName,value)` 或 `this.$set(target,propertyName,value)`

(3). 移除一个响应式对象属性，请使用如下 API：

`Vue.delete(target,propertyName)`或 `this.$delete(target,propertyName)`

::: tip vue 比我们完善
vue 中可以通过 vm.name 直接获取到 name 的值，是因为这里做了**数据代理**；对象的嵌套 vue 可以处理，我们处理不了
:::

```html
<!-- 模拟一个简单的数据监测_对象 -->
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Document</title>
  </head>
  <body>
    <script type="text/javascript">
      let data = {
        name: 'Frank',
        address: '江苏南京',
      }

      //创建一个监视的实例对象，用于监视data中属性的变化
      const obs = new Observer(data)
      // console.log(obs)

      //准备一个vm实例对象
      let vm = {}
      // 加工data,然后赋给vm._data
      vm._data = data = obs

      function Observer(obj) {
        //汇总对象中所有的属性形成一个数组
        const keys = Object.keys(obj)
        //遍历
        keys.forEach((k) => {
          Object.defineProperty(this, k, {
            get() {
              return obj[k]
            },
            // 关键 数据劫持
            set(val) {
              console.log(
                `${k}被改了，我要去解析模板，生成虚拟DOM.....我要开始忙了`
              )
              obj[k] = val
            },
          })
        })
      }
    </script>
  </body>
</html>
```

### 对于数组

```js
// persons是一个数组
this.persons[0]={...} // 通过数组下标修改数组的项，vue无法监测到。
```

通过包裹数组更新元素的方法实现，本质就是做了两件事：

(1).调用原生对应的方法对数组进行更新。

(2).重新解析模板，进而更新页面。

在 Vue 修改数组中的某个元素一定要用如下方法：

使用这些 API:`push()`、`pop()`、`shift()`、`unshift()`、`splice()`、`sort()`、`reverse()`=>均是变更方法

非变更方法，例如 `filter()`、`concat()` 和 `slice()`。它们不会变更原始数组，而总是返回一个新数组。**当使用非变更方法时，可以用新数组替换旧数组**

```js
// 左边旧数组
 items =  items.filter(function (item) {
  return  ...... // 返回一个新数组
})
```

(2). 新增一个响应式数组元素，请使用如下 API：

`Vue.set(target,index,value)` 或 `this.$set(target,index,value)`

(3). 移除一个响应式数组元素，请使用如下 API：

`Vue.delete(target,index)`或 `this.$delete(target,index)`

## 数据代理

### Object.defineProperty

[更多细节:Object.defineProperty()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)

```js
let number = 18
let person = {
  name: '张三',
  sex: '男',
}

Object.defineProperty(person, 'age', {
  // value:18,
  enumerable: true, //控制属性是否可以枚举(遍历)，默认值是false
  // writable:true, //控制属性是否可以被修改，默认值是false
  configurable: true, //当且仅当该属性的 configurable 键值为 true 时,该属性的描述符才能够被改变，同时该属性也能从对应的对象上被删除，默认值是false

  //当有人读取person的age属性时，get函数(getter)就会被调用，且返回值就是age的值
  get() {
    console.log('有人读取age属性了')
    return number
  },

  //当有人修改person的age属性时，set函数(setter)就会被调用，且会收到修改的具体值
  set(value) {
    console.log('有人修改了age属性，且值是', value)
    number = value
  },
})
```

### 何为数据代理

通过一个对象代理对另一个对象中属性的操作（读/写）

```js
let obj = { x: 100 }
let obj2 = { y: 200 }

Object.defineProperty(obj2, 'x', {
  get() {
    return obj.x
  },
  set(value) {
    obj.x = value
  },
})
```

### Vue 中的数据代理

![数据代理图示](https://zfh-nanjing-bucket.oss-cn-nanjing.aliyuncs.com/blog-images/%E6%95%B0%E6%8D%AE%E4%BB%A3%E7%90%86%E5%9B%BE%E7%A4%BA.jpg)

1. `Vue中的数据代理`：通过 vm 对象来代理 data 对象中属性的操作（读/写）

2. `Vue中数据代理的好处`：更加方便的操作 data 中的数据

3. `基本原理`：通过 Object.defineProperty()把 data 对象中所有属性添加到 vm 上。为每一个添加到 vm 上的属性，都指定一个 getter/setter。在 getter/setter 内部去操作（读/写）data 中对应的属性。

## 收集表单数据

::: warning 注意
现在不会使用 form 中的 action 提交数据，更多的是使用 ajax
:::

若：input type="text"，则 v-model 收集的是 value 值，**用户输入的就是 value 值**。

若：input type="radio"，（单选）则 v-model 收集的是 value 值，**且要给标签配置 value 值**。

若：input type="checkbox"(多选)

1. 单个复选框，绑定到布尔值

2. 多个复选框，绑定到同一个数组( value 组成的数组)

若 input type="select"：绑定到字符串(option 的 value 值)

<CodePen
  link="https://codepen.io/zhangfanhang/pen/qBxrGgO"
  :theme="$isDarkMode? 'dark': 'light'"
/>

::: tip v-model 的修饰符

lazy：失去焦点再收集数据

number：输入字符串转为有效的数字,.number 底层调用了 parseFloat(),即无法输入 0 开头的数字

trim：输入首尾空格过滤

:::

## 内置指令

回顾,之前学过的指令：

- v-bind : 单向绑定解析表达式, 可简写为 :xxx
- v-model : 双向数据绑定
- v-for : 遍历数组/对象/字符串
- v-on : 绑定事件监听, 可简写为@
- v-if : 条件渲染（动态控制节点是否存存在）
- v-else : 条件渲染（动态控制节点是否存存在）
- v-show : 条件渲染 (动态控制节点是否展示)

### v-text

1.  作用：向其所在的节点中渲染文本内容
2.  与插值语法的区别：v-text 会替换掉节点中的内容，插值语法则不会

### v-html

::: danger 严重注意:v-html 有安全性问题

(1).在网站上动态渲染任意 HTML 是非常危险的，容易导致[XSS 攻击](https://juejin.cn/post/6844903685122703367)。

XSS，是一种代码注入攻击。攻击者通过在目标网站上注入恶意脚本，使之在用户的浏览器上运行。利用这些恶意脚本，攻击者可获取用户的敏感信息如 Cookie、SessionID 等，进而危害数据安全。

(2).一定要在可信的内容上使用 v-html，**永远不要用在用户提交的内容上**！

:::

1. 作用：向指定节点中渲染包含 html 结构的内容

2. 与插值语法的区别：

(1).v-html 会替换掉节点中所有的内容，插值语法则不会

(2).v-html 可以识别 html 结构

### v-cloak

v-cloak 指令没有值 1.本质是一个特殊属性，Vue 实例创建完毕并接管容器后，会删掉 v-cloak 属性。

2.使用 css`属性选择器`([v-clock]{display:none;})配合 v-cloak 可以解决网速慢时页面展示的问题。

### v-once

1.`v-once`所在节点在初次动态渲染后，就视为静态内容了。

2.以后数据的改变不会引起`v-once`所在结构的更新，**可以用于优化性能**。

### v-pre

v-pre 指令是没有值的

1.跳过其所在节点的编译过程。

2.可利用它跳过：没有使用指令语法、没有使用插值语法的节点，**会加快编译**。

## 自定义指令

// TODO 自定义指令

### 定义局部指令

```js
// 对象式
 new Vue({
	 directives:{指令名:配置对象}
 })
//  函数式
  new Vue({
 directives{指令名:回调函数}
  })
```

### 定义全局指令

`Vue.directive(指令名,配置对象)` 或 `Vue.directive(指令名,回调函数)`

配置对象中常用的 3 个回调：

(1).`bind`：指令与元素成功绑定时调用。

(2).`inserted`：指令所在元素被插入页面时调用。

(3).`update`：指令所在模板结构被重新解析时调用。

### 备注

1.指令定义时不加 v-，但使用时要加 v-；

2.指令名如果是多个单词，要使用 kebab-case(短横线命名)命名方式，不要用 camelCase(驼峰)命名。

::: details demo

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>自定义指令</title>
    <script type="text/javascript" src="../js/vue.js"></script>
  </head>
  <body>
    <!-- 准备好一个容器-->
    <div id="root">
      <h2>{{name}}</h2>
      <h2>当前的n值是：<span v-text="n"></span></h2>
      <!-- <h2>放大10倍后的n值是：<span v-big-number="n"></span> </h2> -->
      <h2>放大10倍后的n值是：<span v-big="n"></span></h2>
      <button @click="n++">点我n+1</button>
      <hr />
      <input type="text" v-fbind:value="n" />
    </div>
  </body>

  <script type="text/javascript">
    Vue.config.productionTip = false

    //定义全局指令
    /* Vue.directive('fbind',{
			//指令与元素成功绑定时（一上来）
			bind(element,binding){
				element.value = binding.value
			},
			//指令所在元素被插入页面时
			inserted(element,binding){
				element.focus()
			},
			//指令所在的模板被重新解析时
			update(element,binding){
				element.value = binding.value
			}
		}) */

    new Vue({
      el: '#root',
      data: {
        name: '尚硅谷',
        n: 1,
      },
      directives: {
        //big函数何时会被调用？1.指令与元素成功绑定时（一上来）。2.指令所在的模板被重新解析时。
        /* 'big-number'(element,binding){
					// console.log('big')
					element.innerText = binding.value * 10
				}, */
        big(element, binding) {
          console.log('big', this) //注意此处的this是window
          // console.log('big')
          element.innerText = binding.value * 10
        },
        fbind: {
          //指令与元素成功绑定时（一上来）
          bind(element, binding) {
            element.value = binding.value
          },
          //指令所在元素被插入页面时
          inserted(element, binding) {
            element.focus()
          },
          //指令所在的模板被重新解析时
          update(element, binding) {
            element.value = binding.value
          },
        },
      },
    })
  </script>
</html>
```

:::

## 生命周期

![生命周期](https://zfh-nanjing-bucket.oss-cn-nanjing.aliyuncs.com/blog-images/%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F.png)

1. 是什么：`Vue` 在关键时刻帮我们调用的一些特殊名称的函数
2. 生命周期函数中的 this 指向是`vm` 或 组件实例对象

### 常用的生命周期钩子

1.**mounted**: 发送`ajax`请求、启动定时器、绑定自定义事件、订阅消息等**初始化操作**

2.**beforeDestroy**: 清除定时器、解绑自定义事件、取消订阅消息等**收尾工作**

### 关于销毁 Vue 实例

(1)销毁后借助`Vue开发者工具`看不到任何信息

(2)销毁后自定义事件会**失效**，但原生`DOM`事件依然**有效**

(3)一般不会在`beforeDestroy`**操作数据**，因为即便操作数据，也**不会**再触发更新流程了

### 关于 beforeCreate 和 created

指的不是`vm`的创建之前，而是`数据监测`，`数据代理`初始化之前。created 指的是它两初始化之后。

因为此时`beforeCreate`生命周期钩子中`this`指向`vm`,如果`beforeCreate`指的是`vm`创建之前，`vm`还没有被创建，它怎么指向`vm`
