---
title: vue2中的css深度选择器
isOriginal: true
tag:
  - vue2
category:
  - 开发日志
  - Vue
---

当 `<style>` 标签有 `scoped` 属性时，它的 CSS 只作用于当前组件中的元素，父组件的样式将不会渗透到子组件。 如果你希望 scoped 样式中的一个选择器能够作用得“更深”，例如影响子组件，你可以使用深度选择器。

使用较多的场景是去定制 elementUI 等组件库的样式

## 写法

像`/deep/`，`>>>`，`::v-deep`已被弃用，下面这种方式 vue2，vue3 均可使用：

```css
:deep(.title) {
  background: yellowgreen;
}
```

参考：[vue 中的 css 深度选择器](https://juejin.cn/post/6978781674070884366)
