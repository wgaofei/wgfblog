---
title: Vue3
category:
  - 前端框架
  - Vue
icon: vue
order: 5
---

# Vue3

::: tip 注意

**vue3 向下兼容 vue2**

:::

## 使用 vite 创建 Vue3.0 工程

::: danger 警告
在 `vite` 项目中，引入组件时，`.vue` 不能省略
`import xxx from './xxx.vue'`
:::

[vite 官网](https://cn.vitejs.dev/)

```bash
## 创建vue项目
npm create vite@latest my-vue-app --template vue
## 按提示操作
```

## Composition API

[Composition API](https://v3.cn.vuejs.org/guide/composition-api-introduction.html)

## ref()

- 作用: 创建可以使用任何值类型的响应式 ` ref`
- 语法:

```js
import { ref } from 'vue'
const xxx = ref(initValue)
```

- `js`中操作数据： `xxx.value`
- 一般的我们通过 `ref `声明响应式数据，在` js` 中访问需要加`.value`

  通过响应式语法糖，我们可以省去 `value`

  通过配置开启：

  ```js
  // vite.config.js
  export default {
    plugins: [
      vue({
        reactivityTransform: true,
      }),
    ],
  }
  ```

- 模板中读取数据: 不需要`.value`，直接`xxx`使用
- 备注：
  - 接收的数据可以是：`基本类型`、也可以是`对象类型`
  - 基本类型的数据：响应式依然是靠`Object.defineProperty()`的`get`与`set`完成的
  - 对象类型的数据：内部使用了`Vue3.0` 中的一个新函数—— `reactive`函数，模板中读取：`obj.xxx`,`js`中读取数据:`obj.value.xxx`

## reactive()

- 作用: 创建一个响应式对象或数组

- 语法：

  ```js
  import { reactive } from 'vue'
  const xxx = ref({})
  ```

- 内部基于 `ES6 `的 `Proxy` 实现，通过代理对象操作源对象内部数据进行操作

- 操作数据与读取数据：均不需要`.value`

## reactive 对比 ref

- 从定义数据角度对比：
  - `ref` 用来定义：基本数据类型
  - `reactive` 用来定义：对象（或数组）类型数据
  - 备注：`ref` 也可以用来定义对象（或数组）类型数据 , 它内部会自动通过`reactive`转为代理对象
- 从原理角度对比：
  - `ref `通过`Object.defineProperty()`的`get`与`set`来实现响应式（数据劫持）
  - `reactive` 通过使用`Proxy`来实现响应式（数据劫持）, 并通过`Reflect`操作源对象内部的数据
- 从使用角度对比：
  - `ref` 定义的数据：操作数据需要 `.value`，读取数据时模板中直接读取不需要`.value`
  - `reactive` 定义的数据：操作数据与读取数据均不需要`.value`
  - `reactive`存在局限性：一个包含对象类型值的`ref`可以响应式地替换整个对象,`ref `被传递给函数或是从一般对象上被解构时，不会丢失响应性;不可以随意地“替换”用`reactive`创建的响应式对象，将响应式对象的属性赋值或解构至本地变量时，或是将该属性传入一个函数时，会失去响应性

## Vue3 的响应式原理

### vue2

- 实现原理：

  - 对象类型：通过`Object.defineProperty()`对属性的读取、修改进行拦截（数据劫持）。

  - 数组类型：通过重写更新数组的一系列方法来实现拦截。（对数组的变更方法进行了包裹）。

    ```js
    Object.defineProperty(data, 'count', {
      get() {},
      set() {},
    })
    ```

- 存在问题：

  - **新增对象属性、删除属性, 界面不会更新**
  - **直接通过下标修改数组, 界面不会自动更新**

### Vue3

- 实现原理:

  - 通过`Proxy`（代理）: 拦截对象中任意属性的变化, 包括：属性值的读写、属性的添加、属性的删除等

  - 通过`Reflect`（反射）: 对源对象的属性进行操作

#### 模拟 vue3 的响应式实现

```js
const a = {
  name: 'frank',
  age: 19,
}
const b = new Proxy(a, {
  // 读取
  get(target, propName) {
    console.log(`有人读取了b身上的${propName}属性`)
    return Reflect.get(target, propName)
  },
  // 修改
  set(target, propName, value) {
    console.log(`有人修改了b身上的${propName}值为${value},需要更新界面`)
    return Reflect.set(target, propName, value)
  },
  // 删除
  deleteProperty(target, propName) {
    console.log(`有人删除了b身上的${propName},需要更新界面`)
    return Reflect.deleteProperty(target, propName)
  },
})
b.name = 'zhang'
console.log(delete b.age)
console.log(a) //{ name: 'zhang' }
console.log(b) //{ name: 'zhang' }
```

- MDN 文档中描述的 Proxy 与 Reflect： [Proxy](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy) [Reflect](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect)
- 阮一峰[Proxy](https://es6.ruanyifeng.com/#docs/proxy)教程，[Reflect](https://es6.ruanyifeng.com/#docs/reflect)教程

## props

[更多细节](https://cn.vuejs.org/guide/components/props.html#props-declaration)

在使用 `<script setup>` 的单文件组件中，`props `使用 `defineProps()` 宏来声明：

```vue
<script setup>
const props = defineProps(['foo'])
console.log(props.foo)
</script>
```

## computed

- 与 Vue2.x 中 computed 配置功能一致

- 写法

  ```js
  import {computed} from 'vue'

  setup(){
      ...
  	//计算属性——简写
      let fullName = computed(()=>{
          return person.firstName + '-' + person.lastName
      })
      //计算属性——完整
      let fullName = computed({
          get(){
              return person.firstName + '-' + person.lastName
          },
          set(value){
              const nameArr = value.split('-')
              person.firstName = nameArr[0]
              person.lastName = nameArr[1]
          }
      })
  }
  ```

## watch

```js
import { watch, reactive, ref } from 'vue'

let sum = ref(1)
let msg1 = ref('123')
let msg2 = ref('456')

let person = reactive({
  job: 'fe',
  name: 'frank',
  fun: {
    a: {
      x: 1,
    },
  },
})

//情况一：单个ref
watch(
  sum,
  (newValue, oldValue) => {
    console.log('sum变化了', newValue, oldValue)
  },
  { immediate: true }
)

//情况二：多个来源组成的数组
watch([sum, () => msg1.value + msg2.value], (newValue, oldValue) => {
  console.log('sum或msg1+msg2变化了', newValue, oldValue)
})

// 情况三：一个getter 函数
watch(
  () => msg1.value + msg2.value,
  (newValue, oldValue) => {
    console.log('msg1+msg2变化了', newValue, oldValue)
  }
)

// 情况四： reactive
watch(
  person,
  (newValue, oldValue) => {
    // 强制开启深层侦听器
    // 在嵌套的属性变更时触发
    // 注意：`newValue` 此处和 `oldValue` 是相等的,因为它们是同一个对象！
    console.log('person变化了', newValue, oldValue)
  },
  { immediate: true, deep: false }
) //此处的deep配置失效

//情况五：监视reactive定义的响应式中的某个属性
// 不能直接侦听响应式对象的属性值;错误，因为 watch() 得到的参数是一个string
watch(person.job, (newValue, oldValue) => {
  console.log('person的job变化了', newValue, oldValue)
})
// 正确
watch(
  () => person.job,
  (newValue, oldValue) => {
    console.log('person的job变化了', newValue, oldValue)
  }
)
// 当属性也是响应式对象
watch(
  () => person.fun.a,
  (newValue, oldValue) => {
    // 仅当person.fun.a被替换触发
    console.log('person的fun的a变化了', newValue, oldValue)
  }
)
// 监视 reactive 定义的响应式对象中某个属性时：deep 配置有效
watch(
  () => person.fun.a,
  (newValue, oldValue) => {
    // 注意：`newValue` 此处和 `oldValue` 是相等的
    // *除非* person.fun.a 被整个替换了
    console.log('person的fun的a变化了', newValue, oldValue)
  },
  { deep: true }
)
```

## watchEffect

- `watch` 的套路是：既要指明监视的属性，也要指明监视的回调

- `watchEffect` 的套路是：不用指明监视哪个属性，监视的回调中用到哪个属性，那就监视哪个属性

- `watchEffect `有点像 `computed`：

  - 但`computed`注重的计算出来的值（回调函数的返回值），所以必须要写返回值
  - 而 `watchEffect` 更注重的是过程（回调函数的函数体），所以不用写返回值

  ```js
  //watchEffect所指定的回调中用到的数据只要发生变化，则直接重新执行回调。
  watchEffect(() => {
    const x1 = sum.value
    const x2 = person.age
    console.log('watchEffect配置的回调执行了')
  })
  ```

## 生命周期

### Vue2

![vue2生命周期](https://zfh-nanjing-bucket.oss-cn-nanjing.aliyuncs.com/blog-images/vue2%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F.png)

### Vue3

![vue3生命周期](https://zfh-nanjing-bucket.oss-cn-nanjing.aliyuncs.com/blog-images/vue3%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F.png)

- Vue3.0 中可以继续使用 Vue2.x 中的生命周期钩子，但有有两个被更名：
  - `beforeDestroy`改名为 `beforeUnmount`
  - `destroyed`改名为 `unmounted`
- Vue3.0 也提供了 Composition API 形式的生命周期钩子，与 Vue2.x 中钩子对应关系如下：
  - `beforeCreate`===>`setup()`
  - `created`=======>`setup()`
  - `beforeMount` ===>`onBeforeMount`
  - `mounted`=======>`onMounted`
  - `beforeUpdate`===>`onBeforeUpdate`
  - `updated` =======>`onUpdated`
  - `beforeUnmount` ==>`onBeforeUnmount`
  - `unmounted` =====>`onUnmounted`

## 组合式函数

// TODO 学习官方文档 https://cn.vuejs.org/guide/reusability/composables.html

- “组合式函数” 是一个利用 Vue 组合式 API 来封装和复用**有状态逻辑**的函数
- 类似于 vue2.x 中的 mixin

```js
// 外部
// import xxx from 'xxx'
// 内部
function xxx (){
  // ....

  return { yyy,zzz }
}
setup(){
  let {yyy,zzz} =xxx()
  return {yyy,zzz}
}
```

## toRef

- 作用：创建一个 ref 对象，其 value 值指向另一个对象中的某个属性。
- 语法：`const name = toRef(person,'name')`
- 应用: 要将响应式对象中的某个属性单独提供给外部使用时。

- 扩展：`toRefs` 与`toRef`功能一致，但可以批量创建多个 ref 对象，语法：`const { name,age }=toRefs(person)`

## provide 与 inject

[官方文档](https://cn.vuejs.org/guide/components/provide-inject.html)

- 作用：实现祖与后代组件间通信

- 套路：父组件有一个 `provide` 选项来提供数据，后代组件有一个 `inject` 选项来开始使用这些数据

- 具体写法：

1. 祖组件中：

```js
import { provide } from 'vue'
     setup(){
     	......
         let car = reactive({name:'奔驰',price:'40万'})
         provide('car',car)
         ......
     }
```

2. 后代组件中：

```js
import { inject } from 'vue'

     setup(props,context){
     	......
         const car = inject('car')
         return {car}
     	......
     }
```
