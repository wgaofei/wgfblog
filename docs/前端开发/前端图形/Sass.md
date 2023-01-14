---
title: Sass
icon: sass
category:
  - 前端开发
  - 前端图形
---

::: warning 注意
以下不代表 scss 的所有功能，仅总结本人目前在项目大量使用过的功能

[Sass 中文网](https://www.sass.hk/)
:::

scss 里加{}，加“;”

sass 里不加{}，不加“;”

**根据个人习惯，使用 scss**

## 变量

方便批量管理统一的样式

```scss
$text-color: #555;
$small-font: 14px+3px;
```

## 嵌套

减少代码重复次数

```scss
div {
  span {
    // div span
    color: red;
    a {
      // div span a
      color: blue;
    }
  }
}
```

## 拆分，引入

把代码拆分成若干个 scss 文件

```scss
// 引入，相对路径
@import 'header.scss';
```

## Mixin 混入的使用

```scss
// 超出文本隐藏
@mixin singleline-ellipsis($width) {
  width: $width;
  overflow: hidden;
  // 规定段落中的文字不进行换行
  white-space: nowrap;
  // 显示省略符号来代表被修剪的文本
  text-overflow: ellipsis;
}
.text {
  @include singleline-ellipsis(500px);
}
```

## 父选择器 &

编译后的 CSS 文件中 & 将被替换成嵌套外层的父选择器，如果含有多层嵌套，最外层的父选择器会一层一层向下传递

```scss
#main {
  color: black;
  a {
    font-weight: bold;
    &:hover {
      color: red;
    }
  }
}
```

编译为：

```css #main {
    color: black;
}
#main a {
    font-weight: bold;
}
#main a:hover {
    color: red;
}
```

& 必须作为选择器的第一个字符，其后可以跟随后缀生成复合的选择器，例如

```scss
#main {
  color: black;
  &-sidebar {
    border: 1px solid;
  }
  &.one {
    color: red;
  }
}
```

编译为：

```css
#main {
  color: black;
}
#main-sidebar {
  border: 1px solid;
}
#main.one {
  color: red;
}
```
