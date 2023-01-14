---
title: CSS图片底侧空白缝隙解决方案
isOriginal: true
category:
  - 开发日志
  - CSS
---

从下面的案例来看，图片是与文字的基线对齐的。这就是底部缝隙出现的原因
<CodePen
  link="https://codepen.io/zhangfanhang/pen/BaVjLJg"
  :theme="$isDarkMode? 'dark': 'light'"
/>

## 方案 1:vertical-align

vertical-align 属性设置元素的垂直对齐方式

### 属性值

- `baseline`：默认值，元素放置在父元素的基线上
- `top`：把元素的顶端与行中最高元素的顶端对齐
- `middle`：把此元素放置在父元素的中部
- `bottom`：把元素的顶端与行中最低的元素的顶端对齐

![vertical-align-1](https://zfh-nanjing-bucket.oss-cn-nanjing.aliyuncs.com/blog-images/vertical-align-1.png)

设置除了`baseline`任一属性均可以解决问题

## 方案 2:转换为块级元素 display: block

块级元素没有 `vertical-align` 的属性，不会有基线对齐的方式
