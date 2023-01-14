---
title: 利用calc函数轻松实现各种宽高自适应
category:
  - 开发日志
  - CSS
---

::: tip 推荐阅读

[你需要知道的 calc 和自定义属性！](https://juejin.cn/post/7125595762733350920)

:::

CSS3 新增的函数中有一个非常好用的函数，就是`calc()`函数，CSS 的`calc()`函数可以实现**属性值的计算**

## calc 函数不生效？

运算符时两边必须要有空白字符：

```css
height: calc(100vh - 50px);
```

## 实操 <Badge text='更新' type='info'/>
