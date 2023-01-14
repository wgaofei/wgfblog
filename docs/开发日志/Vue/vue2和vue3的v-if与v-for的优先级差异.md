---
title: vue2和vue3的v-if与v-for的优先级差异
category:
  - 开发日志
  - Vue
---

最近在使用`vue3`写一个公共表格组件，操作列需要利用`v-if`判断是否渲染这个操作按钮。居然提示：属性 `button` 此时没有在该实例上定义。这是原本的代码：

```vue
<template slot-scope="scope">
  <template v-if="item.showConfig.type === 'button'">
    <el-button
      class="table-opt-button"
      plain
      v-for="(button, index) in item.showConfig.buttons"
      :key="index + button.title"
      :title="button.title"
      @click="button.func(scope.row)"
      v-if="button.show ? button.show(scope.row, button.buttonCode) : true"
    >
      <i :class="button.icon"></i>
    </el-button>
  </template>
</template>
```

查了`vue2`和`vue3`的文档发现了一个问题：

- `Vue2`:当它们处于同一节点，`v-for` 的优先级比 `v-if` 更高，这意味着 `v-if` 将分别重复运行于每个 `v-for` 循环中。当你只想为*部分*项渲染节点时，这种优先级的机制会十分有用，如下：

```vue
<li v-for="todo in todos" v-if="!todo.isComplete">
  {{ todo }}
</li>
```

这样写在`vue2`是完全正确的，官方也是这样写的。

- `Vue3`:当它们同时存在于一个节点上时，`v-if` 比 `v-for` 的优先级更高。这意味着 `v-if` 的条件将无法访问到 `v-for` 作用域内定义的变量别名：

```vue
<!--
 这会抛出一个错误，因为属性 todo 此时
 没有在该实例上定义
-->
<li v-for="todo in todos" v-if="!todo.isComplete">
  {{ todo.name }}
</li>
```

很明显`vue3`和`vue2`的表现有差异，这就是导致问题的原因。

那么在`vue3`中，这种问题怎么处理呢？

在外新包装一层 `<template>` 再在其上使用 `v-for` 可以解决这个问题：

```vue
<template v-for="todo in todos">
  <li v-if="!todo.isComplete">
    {{ todo.name }}
  </li>
</template>
```
