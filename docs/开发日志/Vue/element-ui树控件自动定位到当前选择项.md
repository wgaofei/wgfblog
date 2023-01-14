---
title: element-ui树控件自动定位到当前选择项
isOriginal: true
tag:
  - elementUI
  - vue2
category:
  - 开发日志
  - Vue
---

## 需求

做业务遇到了需要在树空间中回显示当前操作的的数据项，因为树空间的高度有限，如果当前选择项是比较靠后的，就无法出现在树的滚动视窗范围之内。

所以就要在树展示的时候自动滚动到当前的选择项，好在[Element](https://developer.mozilla.org/zh-CN/docs/Web/API/Element) 接口提供了这样一个 [scrollIntoView()](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/scrollIntoView)方法,该方法会滚动元素的父容器，使被调用 `scrollIntoView() `的元素对用户可见。

## 具体思路

那么现在我们只需要知道当前选择项是哪一个 DOM 元素，接着调用这个方法就好，省去了繁琐的高度计算环节。

因为树中的每个数据项都有一个独一无二的 id，所以我们可以使用自定义节点，给每个数据项加上以数据项中的 id 为值的 ID 属性，这样我们通过当前选择项的 id 就可以获得当前对应的 DO M 元素。

## 实现 demo

<CodePen
  link="https://codepen.io/zhangfanhang/pen/eYMwpBg"
  :theme="$isDarkMode? 'dark': 'light'"
/>

## 总结一下

`clientWidth`，`offsetWidth`，`scrollWidth` 这几个概念自己有时候还是会弄混，所以在此总结一下。

- `scrollWidth`包括元素的宽度（width），内边距（padding），但不包括边框（border）、外边距（margin）和垂直滚动条
- `clientWidth `包括元素的宽度（width），内边距（padding），但不包括边框（border）、外边距（margin）和垂直滚动条
- `offsetWidth `对象整体的实际宽度，包含滚动条，会随对象显示大小的变化而改变。

::: tip 说明

方法来自[[element-ui] el-tree 滚动到指定选中的位置](https://blog.csdn.net/qq_14993591/article/details/125223004)

:::
