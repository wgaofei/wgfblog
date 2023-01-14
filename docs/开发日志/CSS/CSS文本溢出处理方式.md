---
title: CSS文本溢出处理方式
category:
  - 开发日志
  - CSS
order: 1
---

## 单行文本溢出省略号效果

```css
.ellipsis {
  　　overflow: hidden;
  　　white-space: nowrap;
  　　text-overflow: ellipsis;
}
```

## 指定 N 行文字溢出省略号效果（以 4 行为例）

因使用了 WebKit 的 CSS 扩展属性，适用于 WebKit 浏览器及移动端

```css
ellipsis_four {
  　　display: -webkit-box;
  　　-webkit-line-clamp: 4;
  　　-webkit-box-orient: vertical;
  　　overflow: hidden;
}
```

::: tip 提示
`-webkit-line-clamp` 用来限制在一个块元素显示的文本的行数。为了实现该效果，它需要组合其他的 WebKit 属性。

常见结合属性：

`display: -webkit-box` 必须结合的属性 ，将对象作为弹性伸缩盒子模型显示

`-webkit-box-orient` 必须结合的属性 ，设置或检索伸缩盒对象的子元素的排列方式
:::
