---
title: 利用tooltip实现文本超出提示
isOriginal: true
tag:
  - elementUI
  - vue2
category:
  - 开发日志
  - Vue
---

::: tip 开始之前...

以下概念均不包括`margin`,因为它不是元素的一部分

`offsetWidth/offsetHeight`:它们提供了元素的“外部” width/height。或者，换句话说，它的完整大小（包括边框）

`scrollWidth/scrollHeight`这些属性就像 `clientWidth/clientHeight`，但它们还包括滚动出（隐藏）的部分

`clientWidth/clientHeight`:这些属性提供了元素边框内区域的大小。它们包括了 “content width” 和 “padding”，但不包括滚动条宽度（scrollbar:不同的设备和浏览器，滚动条的宽度可能有所不同，chorme 浏览器的滚动条宽带为`15px`）

[元素大小和滚动（目前看到解释最好的一篇）](https://zh.javascript.info/size-and-scroll#offsetwidthheight)

[盒模型相关](/前端开发/前端基石/CSS3/基础与盒模型.html#盒模型种类和-box-sizing-属性)

:::

写业务碰到需要固定容器判断文字是否超出，超出部分使用省略号隐藏，鼠标悬浮显示 tip。

html 结构：

```html
<el-tooltip effect="dark" :content="title" placement="top" :disabled="!show">
  <div class="context" ref="text">{{ title }}</div>
</el-tooltip>
```

省略号使用 css 完成：

```css
.context {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
```

判断是否超出逻辑：

```js
const el = this.$refs.text
// 大于即超出可视区
this.show = el && el.scrollWidth > el.offsetWidth
```
