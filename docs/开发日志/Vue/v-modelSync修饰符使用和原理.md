---
title: v-model,Sync修饰符使用和原理
isOriginal: true
tag:
  - vue2
  - vue3
  - 原理
category:
  - 开发日志
  - Vue
---

## v-model 原理

`v-model`是`vue`中常用的语法糖，它的本质其实是`v-bind`一个叫`value`的变量，利用`v-on`绑定原生`input`事件实现：

```vue
<template>
  <div>
    <h2>v-model</h2>
    <div style="margin-bottom: 20px;">
      <el-tag style="margin-right: 10px;">v-model语法糖</el-tag>
      <input style="width: 300px;height: 20px" v-model="text" />
    </div>
    <div>
      <el-tag style="margin-right: 10px;">v-model=:value+@input</el-tag>
      <input
        style="width: 300px;height: 20px"
        :value="text2"
        @input="(e) => (text2 = e.target.value)"
      />
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      text: '123456',
      text2: '123456',
    }
  },
}
</script>
```

## v-model 作用在组件上的原理

在组件上使用`v-model`，实际上是给该组件传入了一个名为`value`的`prop`,并绑定了一个名为`input`的自定义事件。

`prop`是不能修改,我们可以利用计算属性或者原生事件触发自定义事件，把最新的值带给父组件。

比如我们实现一个`select`组件：

```vue
<template>
  <div>
    <select :value="value" @change="selectChange">
      <option value="13">iphone13</option>
      <option value="12">iphone12</option>
      <option value="11">iphone11</option>
      <option value="X">iphoneX</option>
    </select>
  </div>
</template>
<script>
export default {
  name: 'MySelect',
  props: ['value'],
  methods: {
    selectChange(e) {
      this.$emit('input', e.target.value)
    },
  },
}
</script>
```

在`select`发生改变触发了原生`change`事件，该事件触发了`input`自定义事件

父组件中：

```vue
<template>
  <div>
    <h1>v-model在组件上</h1>
    <my-select v-model="my" />
  </div>
</template>
<script>
import MySelect from '@/components/V_Model/MySelect'
export default {
  name: 'V_Model',
  components: { MySelect },
  data() {
    return {
      my: 'X',
    }
  },
}
</script>
```

## sync 修饰符的原理

和 v-model 类似也是实现父子之间数据的双向绑定

其本质是：给子组件绑定了一个名为`update:你通过v-bind绑定的变量名称`的自定义事件

```vue
<template>
  <div>
    <h1>sync修饰符</h1>

    <!-- <my-sync :title="title" @update:title="titleChange" /> :-->
    <!-- 使用 sync 修饰符 :-->
    <my-sync :title.sync="title" />
    <h2>title:{{ title }}</h2>
  </div>
</template>
<script>
import MySync from '@/components/V_Model/MySync'
export default {
  name: 'V_Model',
  components: { MySelect, MySync },
  data() {
    return {
      title: '123',
      my: 'X',
      text: '123456',
      text2: '123456',
    }
  },
  methods: {
    titleChange(val) {
      this.title = val
    },
  },
}
</script>
```

在子组件中触发该自定义事件：

```vue
<template>
  <div>
    <input :value="title" @input="inputChange" />
  </div>
</template>
<script>
export default {
  name: 'MyTitle',
  props: ['title'],
  methods: {
    inputChange(e) {
      this.$emit('update:title', e.target.value)
    },
  },
}
</script>
```

## vue2 和 vue3 的差异

`vue3`已将`v-bind`的`sync`修饰符<span style='color:red'>废弃</span>

`vue2`中， 使用`v-model`，`sync`可以实现父子组件之间的数据双向绑定。但是`v-model`只能使用一次，如果多个数据需要双向绑定，那就得使用`sync`修饰符。`vue3` 将` v-model` 进行了升级

看代码，子组件中：

```vue
<script setup>
defineProps(['modelValue'])
defineEmits(['update:modelValue'])
</script>

<template>
  <h2>hello world!</h2>
  <input
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>
```

父组件中：

```vue
<script setup>
import HelloWorld from './components/HelloWorld.vue'
import { ref } from 'vue'
let text = ref('123')
</script>

<template>
  <HelloWorld v-model="text" />
  <!--  相当于:-->
  <!--  <hello-world :modelValue="text" @update:modelValue="newValue => text = newValue"></hello-world>-->
</template>
```

如果需要双向绑定多个值呢？可以通过给 `v-model` 指定一个参数

父组件：

```vue
<script setup>
import HelloWorld from './components/HelloWorld.vue'
import { ref } from 'vue'
let text = ref('123')
let text2 = ref('456')
</script>
<template>
  <HelloWorld v-model:text="text" v-model:text2="text2" />
</template>
```

子组件：

```vue
<script setup>
defineProps(['text', 'text2'])
defineEmits(['update:text', 'update:text2'])
</script>

<template>
  <h2>hello world!!</h2>
  <input :value="text" @input="$emit('update:text', $event.target.value)" />
  <input :value="text2" @input="$emit('update:text2', $event.target.value)" />
</template>
```
