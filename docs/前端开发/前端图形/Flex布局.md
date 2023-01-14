---
title: flex布局
icon: flex
category:
  - 前端开发
  - 前端图形
---

## 基础概念

- `flex` 容器：采用 `flex` 布局的元素，称为 `flex` 容器
- `flex `项目：`flex` 容器的所有**子元素**自动成为容器成员，称为 `flex` 项目
- 容器默认存在两根轴：水平的主轴`main axis`和垂直的交叉轴`cross axis`。主轴的开始位置叫做 `main start`，结束位置叫做 `main end`；交叉轴的开始位置叫做`cross start`，结束位置叫做 `cross end`
- **项目默认沿主轴排列**,单个项目占据的主轴空间叫做 `main size`，占据的交叉轴空间叫做 `cross size`

![flex-容器](https://zfh-nanjing-bucket.oss-cn-nanjing.aliyuncs.com/blog-images/flex-%E5%AE%B9%E5%99%A8.png)

## 容器的属性

### display

决定了是否使用` flex` 布局

::: tip 两者区别

在没有指定宽度的时候，属性设置为 `flex` 的宽度默认为父元素的宽度，属性设置为 `inline-flex `为它内容的宽度

:::

- `display:flex;`将对象作为弹性伸缩盒显示

![displayflex](https://zfh-nanjing-bucket.oss-cn-nanjing.aliyuncs.com/blog-images/displayflex.png)

- `diisplay:inline-flex; `将对象作为内联块级弹性伸缩盒显示

![displayinline-flex](https://zfh-nanjing-bucket.oss-cn-nanjing.aliyuncs.com/blog-images/displayinline-flex.png)

### flex-direction

决定主轴的方向（即项目的排列方向）

- `row`（默认值）主轴为水平方向，起点在左端

![flex-direction-row](https://zfh-nanjing-bucket.oss-cn-nanjing.aliyuncs.com/blog-images/flex-direction-row.png)

- `row-reverse` 主轴为水平方向，起点在右端

![flex-direction-row-reverse](https://zfh-nanjing-bucket.oss-cn-nanjing.aliyuncs.com/blog-images/flex-direction-row-reverse.png)

- `column` 主轴为垂直方向，起点在上沿

![flex-direction-column](https://zfh-nanjing-bucket.oss-cn-nanjing.aliyuncs.com/blog-images/flex-direction-column.png)

- `column-reverse` 主轴为垂直方向，起点在下沿

![flex-direction-column-reverse](https://zfh-nanjing-bucket.oss-cn-nanjing.aliyuncs.com/blog-images/flex-direction-column-reverse.png)

### flex-wrap

默认情况下，项目都排在一条线（又称“轴线”）上，`flex-wrap` 属性定义，如一果条轴线排不下，如何换行

- `nowrap`（默认值） 不换行

  ::: tip 注意

  如果项目的宽度加和超过容器的宽度会自动压缩每个项目的宽度，坚决不换行！

  :::

![flex-wrap-nowrap](https://zfh-nanjing-bucket.oss-cn-nanjing.aliyuncs.com/blog-images/flex-wrap-nowrap.png)

- `wrap `换行 第一行在上方

![flex-wrap-wrap](https://zfh-nanjing-bucket.oss-cn-nanjing.aliyuncs.com/blog-images/flex-wrap-wrap.png)

- `wrap-reverse` 换行 第一行在下方

![flex-wrap-reverse](https://zfh-nanjing-bucket.oss-cn-nanjing.aliyuncs.com/blog-images/flex-wrap-reverse.png)

### flex-flow

`flex-direction` 属性和 `flex-wrap` 属性的简写形式，默认值为 **`row nowrap`**

### justify-content

定义了项目在主轴上的对齐方式

- `flex-start`(默认值) 左对齐

![justify-content-flex-start](https://zfh-nanjing-bucket.oss-cn-nanjing.aliyuncs.com/blog-images/justify-content-flex-start.png)

- `flex-end` 右对齐

![justify-content- flex-end](https://zfh-nanjing-bucket.oss-cn-nanjing.aliyuncs.com/blog-images/justify-content-%20flex-end.png)

- `center` 居中

![justify-content-center](https://zfh-nanjing-bucket.oss-cn-nanjing.aliyuncs.com/blog-images/justify-content-center.png)

- `space-between` 两端对齐，项目之间的间隔都相等

![justify-content-space-between](https://zfh-nanjing-bucket.oss-cn-nanjing.aliyuncs.com/blog-images/justify-content-space-between.png)

- `space-around` 每个项目两侧的间隔相等。所以，项目之间的间隔比项目与边框的间隔大一倍

![justify-content-space-around](https://zfh-nanjing-bucket.oss-cn-nanjing.aliyuncs.com/blog-images/justify-content-space-around.png)

### align-items

定义项目在交叉轴上如何对齐

- `stretch`(默认值)：如果 Flex 项目未设置交叉轴方向的大小或设为 auto，将占满整个容器交叉轴方向的大小

![align-items-stretch](https://zfh-nanjing-bucket.oss-cn-nanjing.aliyuncs.com/blog-images/align-items-stretch.png)

- `flex-start` 交叉轴的起点对齐

![align-items-flex-start](https://zfh-nanjing-bucket.oss-cn-nanjing.aliyuncs.com/blog-images/align-items-flex-start.png)

- `flex-end` 交叉轴的终点对齐

![align-items-flex-end](https://zfh-nanjing-bucket.oss-cn-nanjing.aliyuncs.com/blog-images/align-items-flex-end.png)

- `center` 交叉轴的中点对齐(垂直居中)

![align-items-center](https://zfh-nanjing-bucket.oss-cn-nanjing.aliyuncs.com/blog-images/align-items-center.png)

- `baseline` 项目的第一行文字的基线对齐

![align-items-baseline](https://zfh-nanjing-bucket.oss-cn-nanjing.aliyuncs.com/blog-images/align-items-baseline.png)

### align-content

定义了存在多根主轴线时，flex 项目在交叉轴上的对齐方式

如果项目只有一根主轴线 ，**该属性不起作用**

- `stretch`(默认值) 主轴线平分 Flex 容器交叉轴方向上的空间
- 和`align-item`一样，如果 Flex 项目未设置交叉轴方向的大小或设为 auto，将占满整个容器交叉轴方向的大小

![align-content-stretch](https://zfh-nanjing-bucket.oss-cn-nanjing.aliyuncs.com/blog-images/align-content-stretch.png)

- `flex-start` 交叉轴的起点对齐

![align-content-flex-start](https://zfh-nanjing-bucket.oss-cn-nanjing.aliyuncs.com/blog-images/align-content-flex-start.png)

- `flex-end` 交叉轴的终点对齐

![align-content-flex-end](https://zfh-nanjing-bucket.oss-cn-nanjing.aliyuncs.com/blog-images/align-content-flex-end.png)!

- `center `与交叉轴的中点对齐

![align-content-center](https://zfh-nanjing-bucket.oss-cn-nanjing.aliyuncs.com/blog-images/align-content-center.png)

- space-between 与交叉轴的两端对齐，轴线之间的间隔平均分布

![align-content-space-between](https://zfh-nanjing-bucket.oss-cn-nanjing.aliyuncs.com/blog-images/align-content-space-between.png)

- space-around 每根轴线两侧的间隔都相等，所以轴线之间的间隔比轴线与边框大一倍

![align-content-space-around](https://zfh-nanjing-bucket.oss-cn-nanjing.aliyuncs.com/blog-images/align-content-space-around.png)

## 项目的属性

### order

属性定义项目的排列顺序。数值越小，排列越靠前，默认为 0。

![order](https://zfh-nanjing-bucket.oss-cn-nanjing.aliyuncs.com/blog-images/order.png)

### flex-grow

- 属性定义项目的放大比例，默认为**0**，即如果存在剩余空间，也不放大。
- 如果所有项目的 `flex-grow` 属性都为 1，则它们将等分主轴剩余空间（如果有的话）。如果一个项目的` flex-grow` 属性为 2，其他项目都为 1，则前者占据的主轴剩余空间将是其他项的 2 倍。

![flex-grow](https://zfh-nanjing-bucket.oss-cn-nanjing.aliyuncs.com/blog-images/flex-grow.png)

- 如果有的项目有 `flex-grow` 属性，有的项目没有 `flex-grow` 属性,但有 `width` 属性，有 `flex-grow `属性的项目将等分主轴剩余空间

![flex-grow-2](https://zfh-nanjing-bucket.oss-cn-nanjing.aliyuncs.com/blog-images/flex-grow-2.png)

### flex-shrink

属性定义了项目的缩小比例，默认为**1**，即如果空间不足，该项目将缩小。

- 如果所有项目的 `flex-shrink` 属性都为 1，当空间不足时，都将等比例缩小。如果一个项目的 `flex-shrink` 属性为 0，其他项目都为 1，则空间不足时，前者不缩小。
- 负值对该属性无效。

![flex-shrink](https://zfh-nanjing-bucket.oss-cn-nanjing.aliyuncs.com/blog-images/flex-shrink.png)

### flex-basis

- 优先级高于 `width`(或` height`)
- 属性定义了在分配多余空间之前，**项目占据的主轴空间**（main size）。浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为`auto`，即项目的本来大小。

### flex

属性是` flex-grow`, `flex-shrink` 和 `flex-basis `的简写，默认值为 `0 1 auto`。后两个属性可选。

#### 关键字值

#### 单值语法

- 一个无单位数(number),会被当作 `flex:number 1 0`;
  - `flex:1` ; 平分剩余空间
- 一个有效的宽度`width`值，它会被当作` flex-basis` 的值(会被当作`flex:1 1 width`)
- 关键字 `none`，`auto `或` initial`
  - `flex: auto`; 元素会根据自身的宽度与高度来确定尺寸，但是会伸长并吸收 flex 容器中额外的自由空间，也会缩短自身来适应 flex 容器。这相当于将属性设置为 "`flex: 1 1 auto`"
  - `flex: initial`;元素会根据自身宽高设置尺寸。它会缩短自身以适应 flex 容器，但不会伸长并吸收 flex 容器中的额外自由空间来适应 flex 容器 。相当于将属性设置为"`flex: 0 1 auto`"
  - `flex: none`; 元素会根据自身宽高来设置尺寸。它是**完全非弹性的**：既不会缩短，也不会伸长来适应 flex 容器。相当于将属性设置为"`flex: 0 0 auto`"

#### 双值语法

第一个值必须为一个无单位数，并且它会被当作 `flex-grow` 的值。第二个值必须为以下之一：

- 一个无单位数：它会被当作 `flex-shrink` 的值
- 一个有效的宽度值: 它会被当作 `flex-basis` 的值

#### 三值语法

- 第一个值必须为一个无单位数，并且它会被当作 `flex-grow` 的值
- 第二个值必须为一个无单位数，并且它会被当作 `flex-shrink` 的值。
- 第三个值必须为一个有效的宽度值， 并且它会被当作 `flex-basis` 的值

### align-self

属性允许单个项目有与其他项目不一样的对齐方式，可覆盖 `align-items` 属性。默认值为 `auto`，表示继承父元素的 `align-items `属性。

- 该属性可能取 6 个值，除了 `auto`，其他都与 `align-items` 属性完全一致。

## flex 实现圣杯布局

::: normal-demo 圣杯布局

```html
<header>this is a heder</header>
<div class="main">
  <div class="main-left">left</div>
  <div class="main-body">body</div>
  <div class="main-right">right</div>
</div>
<footer>this is a footer</footer>
```

```css
* {
  margin: 0;
  padding: 0;
}
html {
  height: 100%;
}
body {
  display: flex;
  flex-direction: column;
  height: 100%;
}
header,
footer {
  height: 100px;
  background-color: aquamarine;
}
.main {
  display: flex;
  flex: 1;
}
.main-left,
.main-right {
  width: 200px;
  background-color: yellow;
}
.main-body {
  flex: 1;
  background-color: blue;
}
```



:::



## 实践是检验真理的唯一标准

1. `flex`容器的默认高度是最高的项目的高度,未设置高度的项目默认占满交叉轴

::: normal-demo demo

```html
    <div class="box">
      <div class="son1">未设置height</div>
      <div class="son2">height：400px</div>
    </div>
```

```css
      .son1 {
        width: 200px;
        background-color: red;
      }
      .son2 {
        width: 300px;
        height: 400px;
        background-color: blue;
      }
      .box {
        display: flex;
        background-color: green;
      }
```

:::
