---
title: VueX
category:
  - 前端框架
  - Vue
icon: vue
order: 4
---

## 概念

在 Vue 中实现集中式状态（数据）管理的一个 Vue 插件，对 vue 应用中多个组件的共享状态进行集中式的管理（读/写），也是一种组件间通信的方式，且适用于**任意组件间通信**。

## 何时使用

多个组件需要共享数据时

## VueX 工作原理

![vuex](https://zfh-nanjing-bucket.oss-cn-nanjing.aliyuncs.com/blog-images/vuex.png)

## 搭建 vuex 环境

1. 创建文件：`src/store/index.js`

   ```js
   //引入Vue核心库
   import Vue from 'vue'
   //引入Vuex
   import Vuex from 'vuex'
   //应用Vuex插件
   Vue.use(Vuex)

   //准备actions对象——响应组件中用户的动作
   const actions = {}
   //准备mutations对象——修改state中的数据
   const mutations = {}
   //准备state对象——保存具体的数据
   const state = {}

   //创建并暴露store
   export default new Vuex.Store({
     actions,
     mutations,
     state,
   })
   ```

2. 在`main.js`中创建 vm 时传入`store`配置项

   ```js
   ......
   //引入store
   import store from './store'
   ......

   //创建vm
   new Vue({
   	el:'#app',
   	render: h => h(App),
   	store
   })
   ```

## 基本使用

1. 初始化数据、配置`actions`、配置`mutations`，操作文件`store.js`

   ```js
   //引入Vue核心库
   import Vue from 'vue'
   //引入Vuex
   import Vuex from 'vuex'
   //引用Vuex
   Vue.use(Vuex)

   const actions = {
     //响应组件中加的动作
     jia(context, value) {
       // console.log('actions中的jia被调用了',miniStore,value)
       context.commit('JIA', value)
     },
   }

   const mutations = {
     //执行加
     JIA(state, value) {
       // console.log('mutations中的JIA被调用了',state,value)
       state.sum += value
     },
   }

   //初始化数据
   const state = {
     sum: 0,
   }

   //创建并暴露store
   export default new Vuex.Store({
     actions,
     mutations,
     state,
   })
   ```

2. 组件中读取 vuex 中的数据：`$store.state.sum`

3. 组件中修改 vuex 中的数据：`$store.dispatch('action中的方法名',数据)` 或 `$store.commit('mutations中的方法名',数据)`

::: tip 备注

若没有网络请求或其他业务逻辑(即单纯的修改 state 中的数据)，组件中也可以越过 actions，即不写`dispatch`，直接编写`commit`

Action 类似于 mutation，不同在于：

- Action 提交的是 mutation，而不是直接变更状态。

- Action 可以包含任意异步操作。

:::

4. 可以向 store.commit 传入额外的参数，即 mutation 的 `载荷（payload）`，在大多数情况下，载荷应该是一个对象，这样可以包含多个字段并且记录的 mutation 会更易读

```js
// ...
mutations: {
  increment (state, payload) {
    state.count += payload.amount
  }
}
// ...
store.commit('increment', {
  amount: 10
})
```

## getters 的使用

1. 概念：当 state 中的数据需要经过加工后再使用时，可以使用 getters 加工
   ::: tip 提示
   getters 可以认为是 store 的计算属性,就像计算属性一样，getter 的返回值会根据它的依赖被缓存起来，且只有当它的依赖值发生了改变才会被重新计算。
   :::

2. 在`store.js`中追加`getters`配置

   ```js
   ......

   const getters = {
   	bigSum(state){
   		return state.sum * 10
   	}
   }

   //创建并暴露store
   export default new Vuex.Store({
   	......
   	getters
   })
   ```

3. 组件中读取数据：`$store.getters.bigSum`

## 四个 map 方法的使用

1. <strong>mapState 方法：</strong>用于帮助我们映射`state`中的数据为计算属性

   ```js
   computed: {
       //借助mapState生成计算属性：he、xuexiao、kemu（对象写法）
        ...mapState({he:'sum',xuexiao:'school',kemu:'subject'}),

       //借助mapState生成计算属性：sum、school、subject（数组写法）
       ...mapState(['sum','school','subject']),
   },
   ```

2. <strong>mapGetters 方法：</strong>用于帮助我们映射`getters`中的数据为计算属性

   ```js
   computed: {
       //借助mapGetters生成计算属性：bigSum（对象写法）
       ...mapGetters({bigSum:'bigSum'}),

       //借助mapGetters生成计算属性：bigSum（数组写法）
       ...mapGetters(['bigSum'])
   },
   ```

3. <strong>mapActions 方法：</strong>用于帮助我们生成与`actions`对话的方法，即：包含`$store.dispatch(xxx)`的函数

   ```js
   methods:{
       //靠mapActions生成：incrementOdd、incrementWait（对象形式）
       ...mapActions({incrementOdd:'jiaOdd',incrementWait:'jiaWait'})

       //靠mapActions生成：jiaOdd、jiaWait（数组形式）
       ...mapActions(['jiaOdd','jiaWait'])
   }
   ```

4. <strong>mapMutations 方法：</strong>用于帮助我们生成与`mutations`对话的方法，即：包含`$store.commit(xxx)`的函数

   ```js
   methods:{
       //靠mapActions生成：increment、decrement（对象形式）
       ...mapMutations({increment:'JIA',decrement:'JIAN'}),

       //靠mapMutations生成：JIA、JIAN（对象形式）
       ...mapMutations(['JIA','JIAN']),
   }
   ```

   ::: danger 特别注意
   mapActions 与 mapMutations 使用时，若需要传递参数需要：在模板 template 中绑定事件时传递好参数，否则参数是事件对象。
   :::

## 模块化+命名空间

1. 目的：让代码更好维护，让多种数据分类更加明确。

2. 修改`store.js`

   ```js
   const countAbout = {
     namespaced:true,//开启命名空间
     state:{x:1},
     mutations: { ... },
     actions: { ... },
     getters: {
       bigSum(state){
          return state.sum * 10
       }
     }
   }

   const personAbout = {
     namespaced:true,//开启命名空间
     state:{ ... },
     mutations: { ... },
     actions: { ... }
   }

   const store = new Vuex.Store({
     modules: {
       countAbout,
       personAbout
     }
   })
   ```

3. 开启命名空间后，组件中读取 state 数据：

   ```js
   //方式一：自己直接读取
   this.$store.state.personAbout.list
   //方式二：借助mapState读取：
   ...mapState('countAbout',['sum','school','subject']),
   ```

4. 开启命名空间后，组件中读取 getters 数据：

   ```js
   //方式一：自己直接读取
   this.$store.getters['personAbout/firstPersonName']
   //方式二：借助mapGetters读取：
   ...mapGetters('countAbout',['bigSum'])
   ```

5. 开启命名空间后，组件中调用 dispatch

   ```js
   //方式一：自己直接dispatch
   this.$store.dispatch('personAbout/addPersonWang',person)
   //方式二：借助mapActions：
   ...mapActions('countAbout',{incrementOdd:'jiaOdd',incrementWait:'jiaWait'})
   ```

6. 开启命名空间后，组件中调用 commit

   ```js
   //方式一：自己直接commit
   this.$store.commit('personAbout/ADD_PERSON',person)
   //方式二：借助mapMutations：
   ...mapMutations('countAbout',{increment:'JIA',decrement:'JIAN'}),
   ```

7. 模块化
   在`store`文件夹下，新建`count.js`,`person.js`两个文件对应两个命名空间。
   ::: details count.js 代码

```js
export default {
  // 开启命名空间 默认为false
  namespaced: true,
  state: {
    sum: 0,
  },
  mutations: {
    ADD(state, value) {
      state.sum += value
    },
    ADDODD(state, value) {
      state.sum += value
    },
    REDUCE(state, value) {
      state.sum -= value
    },
    ADDWAIT(state, value) {
      state.sum += value
    },
  },

  actions: {
    addOdd(context, value) {
      if (context.state.sum % 2 !== 0) {
        context.commit('ADDODD', value)
      }
    },
    addWait(context, value) {
      setTimeout(() => {
        context.commit('ADDWAIT', value)
      }, 2000)
    },
  },
  getters: {
    tenSum(state) {
      return state.sum * 10
    },
  },
}
```

:::
在`store/index.js`中引入

```js
//该文件用于创建Vuex中最为核心的store
import Vue from 'vue'
//引入Vuex
import Vuex from 'vuex'
// 模块化
import countOptions from './count'
import personOptions from './person'
//
//应用Vuex插件
Vue.use(Vuex)

//创建并暴露store
export default new Vuex.Store({
  modules: {
    countAbout: countOptions,
    personAbout: personOptions,
  },
})
```

## vue-router 4.x <Badge text='4.x补充' />

### 创建 Stroe

1. Store/index.js

```js

```
