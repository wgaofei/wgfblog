---
title: vue2实现滚动窗口同步滚动
isOriginal: true
tag:
  - vue2
category:
  - 开发日志
  - Vue2
---

项目开发中，遇到一个比较两个表单差异的需求，但当`item`过多就需要滚动条，这里就用到了滚动条同步的地方。

这是实现效果：

<CodePen
  link="https://codepen.io/zhangfanhang/pen/KKRdZJj"
  :theme="$isDarkMode? 'dark': 'light'"
/>

虽然`demo`中是表格但是实现起来是一样的，其实主要是通过`ref`属性来操控两个`div`的`scrollTop`属性

因为对两个 div 都添加了`scroll`方法，一个区域滚动会改变另外一个区域的`scrollTop`,但是同时触发了另外一个区域自己的`scroll`方法，又会进行改变，这样就形成了两个`scroll`的无限回调。

解决思路：大致思路是添加一个`flag`属性，两个 scroll 事件分别传入不同的值，再根据这个值去判断是否设置`scrollTop`属性，这样就不会造成无线回调,这里的`flag`属性需要在`scroll`事件之前传入，所以这里通过`mouserover`事件传入该属性。

还要注意的是如果直接给`el`组件绑定原生时间需要加`native`修饰符。
