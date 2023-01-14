---
title: BOM
tag: BOM
category:
  - 前端基石
  - JS基础
---

## 简介

BOM（ Browser Object Model，浏览器对象模型）是 Js 与浏览器窗口交互的接口

## window 对象

window 对象是当前 JS 脚本运行所处的窗口，而这个窗口中包含 DOM 结构， window.document 属性就是 document 对象

在有标签页功能的浏览器中，每个标签都拥有自己的 window 对象；也就是说，同一个窗口的标签页之间不会共享一个 window 对象

### 全局变量是 window 的属性

![全局变量window](https://zfh-nanjing-bucket.oss-cn-nanjing.aliyuncs.com/blog-images/%E5%85%A8%E5%B1%80%E5%8F%98%E9%87%8Fwindow.png)

这就意味着，多个 js 文件之间是共享全局作用域的，即 s 文件没有作用域

### 内置函数普遍是 window 的方法

![内置函数普遍是 window的方法](https://zfh-nanjing-bucket.oss-cn-nanjing.aliyuncs.com/blog-images/%E5%86%85%E7%BD%AE%E5%87%BD%E6%95%B0%E6%99%AE%E9%81%8D%E6%98%AF%20window%E7%9A%84%E6%96%B9%E6%B3%95.png)

### 窗口尺寸相关属性

![窗口尺寸相关属性](https://zfh-nanjing-bucket.oss-cn-nanjing.aliyuncs.com/blog-images/%E7%AA%97%E5%8F%A3%E5%B0%BA%E5%AF%B8%E7%9B%B8%E5%85%B3%E5%B1%9E%E6%80%A7.png)

> document.documentElement 是一个会返回文档对象（document）的根元素的只读属性（如 HTML 文档的 html 元素）。

### resize 事件

在窗口大小改变之后，就会触发 resize 事件，可以使用 window.onresize window.addEventListener
来绑定事件处理函数

### 已卷动高度

- window.scrollY 属性表示在垂直方向已滚动的像素值

![已卷动高度](https://zfh-nanjing-bucket.oss-cn-nanjing.aliyuncs.com/blog-images/%E5%B7%B2%E5%8D%B7%E5%8A%A8%E9%AB%98%E5%BA%A6.png)

- document.documentElement.scrollTop 属性也表示窗口卷动高度

```js
var scrollTop = window.scrollY || document.documentElement.scrollTop
// 浏览器兼容性考虑
```

document.documentElement.scrollTop**不是**只读的，而 window.scrollY 是**只读**的

### scroll 事件

在窗口被卷动之后，就会触发 scroll 事件，可以使用 window.onscroll 或者 window.addEventListener 来绑定事件处理函数

## Navigator 对象

window.navigator 属性可以检索 navigator 对象，它内部含有用户此次活动的浏览器的相关属性和标识

![ Navigator对象](https://zfh-nanjing-bucket.oss-cn-nanjing.aliyuncs.com/blog-images/Navigator%E5%AF%B9%E8%B1%A1.png)

### 识别用户浏览器品牌

识别用户浏览器品牌通常使用 naviator.userAgent 属性

![识别用户浏览器品牌](https://zfh-nanjing-bucket.oss-cn-nanjing.aliyuncs.com/blog-images/%E8%AF%86%E5%88%AB%E6%B5%8F%E8%A7%88%E5%99%A8%E5%93%81%E7%89%8C.png)

## History 对象

window.history 对象提供了操作**浏览器会话历史**的接口

模拟浏览器回退按钮

```js
history.back() //等同于浏览器的后退按钮
history.go(-1) //等同于back()
```

## Location 对象

window.location 标识当前所在网址，可以通过给这个属性赋值命令浏览器进行页面跳转

![Location对象](https://zfh-nanjing-bucket.oss-cn-nanjing.aliyuncs.com/blog-images/Location%E5%AF%B9%E8%B1%A1.png)

### 重新加载当前页面

可以调用 location 的 reload 方法以重新加载当前页面，参数 true 表示强制从服务器强制加载

```js
window.location.reload(true)
```

### GET 请求查询参数

window.location.search 属性即为当前浏览器的 GET 请求查询参数

![get请求参数](https://zfh-nanjing-bucket.oss-cn-nanjing.aliyuncs.com/blog-images/get%E8%AF%B7%E6%B1%82%E5%8F%82%E6%95%B0.png)

## BOM 特效

### 返回顶部

固定定位 定时器

```js
var box = document.getElementById('box')
var timer
box.onclick = function () {
  clearInterval(timer)
  timer = setInterval(function () {
    document.documentElement.scrollTop -= 100
    if (document.documentElement.scrollTop <= 0) {
      clearInterval(timer)
    }
  }, 50)
}
```

### 楼层导航

- DOM 元素都有**offsetTop**属性(HTMLElement.offsetTop)，表示此元素到定位祖先元素的垂直距离
- 定位祖先元素：在祖先中，离自己最近的且拥有定位属性的元素，若祖先都不符合条件，offsetParent 为**body**
- 利用 scrollTo 实现 smooth(平滑滚动)

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      * {
        margin: 0;
        padding: 0;
      }
      html,
      body {
        height: 100%;
      }
      #list {
        position: fixed;
        right: 50px;
        top: 50%;
        transform: translateY(-50%);
        list-style: none;
      }
      li {
        background-color: #fd9c4c88;
        height: 40px;
        line-height: 40px;
        text-align: center;
        width: 100px;
        color: #fff;
        border-radius: 20px;
        margin-bottom: 10px;
      }
      .contentPart {
        width: 100%;
        height: 100%;
        font-size: 400px;
        text-align: center;
        line-height: 1024px;
        margin-bottom: 1px;
        background-color: black;
        color: #fff;
      }
      /* 自定义属性修改css样式 */
      /* .contentPart[data-n='one']{
           background-image:url(./1.jpg) ;
           background-size:cover;
        }
        .contentPart[data-n='two']{
           background-image:url(./2.jpg) ;
           background-size:cover;
        }
        .contentPart[data-n='three']{
           background-image:url(./3.jpg) ;
           background-size:cover;
        }
        .contentPart[data-n='four']{
           background-image:url(./4.jpg) ;
           background-size:cover;
        } */
      li.current {
        color: yellow;
      }
    </style>
  </head>
  <body>
    <ul id="list">
      <li data-n="one" class="current">one</li>
      <li data-n="two">two</li>
      <li data-n="three">three</li>
      <li data-n="four">four</li>
    </ul>

    <section class="contentPart" data-n="one">1</section>
    <section class="contentPart" data-n="two">2</section>
    <section class="contentPart" data-n="three">3</section>
    <section class="contentPart" data-n="four">4</section>

    <script>
      // 楼层导航逻辑
      var list = document.getElementById('list')
      var lis = document.querySelectorAll('#list li')
      var contentParts = document.querySelectorAll('.contentPart')
      list.onclick = function (e) {
        if (e.target.tagName.toLowerCase() == 'li') {
          var n = e.target.getAttribute('data-n')
          var contentPart = document.querySelector(
            '.contentPart[data-n=' + n + ']'
          )
          // 利用scrollTo实现smooth(平滑滚动)
          window.scrollTo({
            top: contentPart.offsetTop,
            behavior: 'smooth',
          })
        }
      }
      // 导航切换
      var offsetTopArr = []
      var nowFloor = 0
      for (var i = 0; i < contentParts.length; i++) {
        offsetTopArr.push(contentParts[i].offsetTop)
      }
      offsetTopArr.push(Infinity)
      console.log(offsetTopArr)
      window.onscroll = function () {
        var s = document.documentElement.scrollTop
        for (var i = 0; i < offsetTopArr.length; i++) {
          if (s >= offsetTopArr[i] && s < offsetTopArr[i + 1]) {
            break
          }
        }
        if (i != nowFloor) {
          nowFloor = i
          for (var j = 0; j < lis.length; j++) {
            if (j == i) {
              lis[j].className = 'current'
            } else {
              lis[j].className = 'none'
            }
          }
        }
      }
    </script>
  </body>
</html>
```
