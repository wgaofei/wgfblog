---
title: Canvas基础
tag: Canvas基础
category:
  - 前端图形
  - Canvas
---

:::tip 参考

- [MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API/Tutorial)

- [慕课网:炫丽的倒计时效果 Canvas 绘图与动画基础](https://www.imooc.com/learn/133)

:::

## 创建 canvas

```html
<canvas id="tutorial" width="1050" height="724"></canvas>
```

通过 DOM 指定宽度高度

```js
const canvas = document.getElementById('tutorial')
canvas.width = '1050'
canvas.height = '724'
```

### 渲染上下文

```js
const canvas = document.getElementById('tutorial')
const ctx = canvas.getContext('2d')
```

Canvas 公开了一个或多个**渲染上下文**，其可以用来绘制和处理要展示的内容。**我们将会将注意力放在 2D 渲染上下文中**。js 要找到渲染上下文，然后在它的上面绘制。`getContext`是用来获得渲染上下文和它的绘画功能。

### 检查支持性

```js
if (canvas.getContext) {
  const ctx = canvas.getContext('2d')
  // 使用context绘制
} else {
  // 提示不支持canvas
}
```
