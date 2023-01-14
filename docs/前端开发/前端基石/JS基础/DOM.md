---
title: DOM
tag: DOM
category:
  - 前端基石
  - JS基础
---

[DOM 接口](https://developer.mozilla.org/zh-CN/docs/Web/API/Document_Object_Model)

**"DOM 是 JS 操控 HTML 和 CSS 的桥梁"**

## DOM 简介

- DOM（ Document Object Model，文档对象模型）是 JavaScript 操作 HTML 文档的接口，使文档操作变得非常优雅、简便

- DOM 最大的特点就是将文档表示为节点树

![dom节点树2](https://zfh-nanjing-bucket.oss-cn-nanjing.aliyuncs.com/blog-images/dom%E8%8A%82%E7%82%B9%E6%A0%912.png)

- DOM 的继承关系图解

![DOM继承树](https://zfh-nanjing-bucket.oss-cn-nanjing.aliyuncs.com/blog-images/DOM%E7%BB%A7%E6%89%BF%E6%A0%91.jpg)

- 节点的 nodeType 属性可以显示这个节点具体的类型

![nodeType常用属性值](https://zfh-nanjing-bucket.oss-cn-nanjing.aliyuncs.com/blog-images/nodeType%E5%B8%B8%E7%94%A8%E5%B1%9E%E6%80%A7%E5%80%BC.png)

## 访问元素节点

### 访问元素节点的常用方法

![访问元素节点方法](https://zfh-nanjing-bucket.oss-cn-nanjing.aliyuncs.com/blog-images/%E8%AE%BF%E9%97%AE%E5%85%83%E7%B4%A0%E8%8A%82%E7%82%B9%E6%96%B9%E6%B3%95.png)

#### getElementById()

document.getElementById()功能是通过**id**得到元素节点

- 如果页面上有相同 id 的元素，则只能得到第一个(一个页面一个 id 命名一般只能出现一次)
- 括号里面**不要写#**
- 通过 ID 获取元素的上下文**只能是 document**，getElementById 只在 Document 类的原型上，HTMLDivElement 没有继承 Document 类，所以 div 不能使用 getElementById 方法

#### getElementsByTagName()

getElementsByTagName()方法的功能是通过标签名得到节点数组

- 数组方便遍历，从而可以批量操控元素节点
- 即使页面上只有一个指定标签名的节点，也将得到长度为 1 的数组
- 上下文可以是 document，也可以是一个元素

#### getElementsByClassName()

getElementsByClassName()方法的功能是通过类名得到节点数组

- 即使页面上只有一个指定类名的节点，也将得到长度为 1 的数组
- **括号内不要写"."**
- 上下文可以是 document，也可以是一个元素

#### querySelector()

querySelector()方法的功能是通过选择器得到元素

- querySelector()方法只能得到页面上一个元素，如果有多个元素符合条件，则只能得到第一个元素

- 上下文可以是 document，也可以是一个元素

#### querySelectorAll()

querySelectorAll()方法的功能是通过选择器得到元素数组

- 即使页面上只有一个符合选择器的节点，也将得到长度为 1 的数组

- 上下文可以是 document，也可以是一个元素

## 节点的关系

![节点的关系2](https://zfh-nanjing-bucket.oss-cn-nanjing.aliyuncs.com/blog-images/%E8%8A%82%E7%82%B9%E7%9A%84%E5%85%B3%E7%B3%BB2.png)

### 文本节点也属于节点

- DOM 中，文本节点也属于节点，在使用节点的关系时一定要注意

- 在标准的 W3C 规范中，空白文本节点也应该算作节点，但是在 IE8 及以前的浏览器中会有一定的兼容问题，它们不把空文本节点当做节点

### 排除文本节点的干扰

从 IE9 开始支持一些“只考虑元素节点”的属性

![排除文本节点的干扰](https://zfh-nanjing-bucket.oss-cn-nanjing.aliyuncs.com/blog-images/%E6%8E%92%E9%99%A4%E6%96%87%E6%9C%AC%E8%8A%82%E7%82%B9%E7%9A%84%E5%B9%B2%E6%89%B0.png)

### 书写常见的节点关系函数

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>

  <body>
    <div id="box">
      <p>我是段落</p>
      <p>我是段落</p>
      <p>我是段落</p>
      <p id="fpara">我是段落fpara</p>
      我是文本
      <!-- 我是注释 -->
      <p id="para">
        我是段落para
        <span>1</span>
        <span>2</span>
        <span>3</span>
      </p>
      <p>我是段落</p>
      <p>我是段落</p>
      <p>我是段落</p>
    </div>

    <script>
      var box = document.getElementById('box')
      var para = document.getElementById('para')
      var fpara = document.getElementById('fpara')

      // 封装一个函数，这个函数可以返回元素的所有子元素节点（兼容到IE6），类似children的功能
      function getChildren(node) {
        // 结果数组
        var children = []
        // 遍历node这个节点的所有子节点，判断每一个子节点的nodeType属性是不是1
        // 如果是1，就推入结果数组
        for (var i = 0; i < node.childNodes.length; i++) {
          if (node.childNodes[i].nodeType == 1) {
            children.push(node.childNodes[i])
          }
        }
        return children
      }

      console.log(getChildren(box))
      console.log(getChildren(para))

      // 封装一个函数，这个函数可以返回元素的前一个元素兄弟节点（兼容到IE6），类似previousElementSibling的功能
      function getElementPrevSibling(node) {
        var o = node
        // 使用while语句
        while (o.previousSibling != null) {
          if (o.previousSibling.nodeType == 1) {
            // 结束循环，找到了
            return o.previousSibling
          }

          // 让o成为它的前一个节点，就有点“递归”的感觉
          o = o.previousSibling
        }
        return null
      }

      console.log(getElementPrevSibling(para))
      console.log(getElementPrevSibling(fpara))

      // 封装第三个函数，这个函数可以返回元素的所有元素兄弟节点
      function getAllElementSibling(node) {
        // 前面的元素兄弟节点
        var prevs = []
        // 后面的元素兄弟节点
        var nexts = []

        var o = node
        // 遍历node的前面的节点
        while (o.previousSibling != null) {
          if (o.previousSibling.nodeType == 1) {
            prevs.unshift(o.previousSibling)
          }
          o = o.previousSibling
        }

        o = node

        // 遍历node的后面的节点
        while (o.nextSibling != null) {
          if (o.nextSibling.nodeType == 1) {
            nexts.push(o.nextSibling)
          }
          o = o.nextSibling
        }

        // 将两个数组进行合并，然后返回
        return prevs.concat(nexts)
      }

      console.log(getAllElementSibling(para))
    </script>
  </body>
</html>
```

## 节点操作

### 改变元素节点中的内容

改变元素节点中的内容可以使用两个相关属性

- innerHTML 属性能以 HTML 语法设置节点中的内容
- innerText 属性只能以纯文本的形式设置节点中的内容

### 改变元素节点的 css 样式

改变元素节点的 CSS 样式需要使用这样的语句

```js
box.style.backgroudColor = 'red'
```

### 改变元素节点的 HTML 属性

标准 W3C 属性，如 src、href 等等，只需要直接打点进行更改即可

```js
oImg.src = 'images/2.png'
```

class 属性需要通过 **className 属性** 获取和修改，而不是直接使用 el.class,修改该值将直接覆盖之前所有的类名

```js
document.getElementById('myDIV').classList.add('mystyle')
```

classList 属性返回元素的类名，作为 DOMTokenList 对象。

该属性用于在元素中**添加，移除及切换 CSS 类**

classList 属性是**只读**的，但你可以使用 **add()** 和 **remove()** 方法修改它。

不符合 W3C 标准的属性，要使用 setAttribute()和 getAttribute()来设置、读取

```js
oBox.setAttribute(data - n, 10)
var n = oBox.getAttribute(data - n)
alert(n) //10
```

#### 自定义属性 data

在 HTML5 中添加了 data-*的方式来自定义属性，所谓 data-*实际上就是 data-前缀加上自定义的属性名，使用这样的结构可以进行数据存放。使用 data-\*可以**解决自定义属性混乱无管理** 的现状。

1. 设置自定义属性的 2 种方式：

（1）第一种方式是可以直接在 HTML 标签上面书写：

```js
<h2 data-weather="rain">今天下雨啦</h2>
```

上面 data-weather 就是一个自定义属性，值为 rain。

> 注意：如果设置的自定义属性是多个单词的组合的话，需要用中横线（-）链接，比如：

```js
<h2 data-birth-date="20201128">今天下雨啦</h2>
```

（2）第二种方式是通过 js 的 dataset 属性来设置：

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Document</title>
  </head>
  <body>
    <h2>今天下雨啦</h2>
    <script>
      var h2 = document.querySelector('h2')
      h2.dataset.weather = 'rain'
    </script>
  </body>
</html>
```

这样也是设置了一个 data-weater 的自定义属性，值为 rain，HTML5 中元素都会有一个 dataset 的属性，这是一个 DOMStringMap 类型的键值对集合。

> 注意：如果设置的是多个单词的组合的话，需要使用驼峰命名法来书写，如下：

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Document</title>
  </head>
  <body>
    <h2>今天下雨啦</h2>
    <script>
      var h2 = document.querySelector('h2')
      h2.dataset.birthDate = '20201128'
    </script>
  </body>
</html>
```

2. js 读取自定义属性

读取的时候通过 dataset 属性，使用" . "来获取自定义属性，需要去掉 data- 前缀，连字符需要转化为驼峰命名，如下：

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Document</title>
  </head>
  <body>
    <h2 data-weather="rain" data-birth-date="20201128">今天下雨啦</h2>
    <script>
      var h2 = document.querySelector('h2')
      console.log(h2.dataset.weather) // rain
      console.log(h2.dataset.birthDate) // 20201128
    </script>
  </body>
</html>
```

3. CSS 也可以通过自定义属性来书写样式，如下：

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Document</title>
    <style>
      h2[data-birth-date='20201128'] {
        color: red;
      }
    </style>
  </head>
  <body>
    <h2 data-birth-date="20201128">今天下雨啦</h2>
  </body>
</html>
```

4. 自定义属性 data 一个不错的 demo

> 当然也可以使用 setAttribute()和 getAttribute()来设置、读取

<CodePen
  link="https://codepen.io/zhangfanhang/pen/poVwPVN"
  :theme="$isDarkMode? 'dark': 'light'"
/>
// TODO 9.2s

### 节点的创建

document.createElement()方法用于创建一个指定 tagName 的 HTML 元素

```js
var oDiv = document.createElement('div')
```

#### “孤儿节点"

- 新创建出的节点是"孤儿节点”，这意味着它并没有被挂载到 DOM 树上，我们无法看见它

- 必须继续使用 appendChild() 或 insertBefore() 方法将孤儿节点插入到 DOM 树上

#### appendChild()

任何已经在 DOM 树上的节点，都可以调用 appendChild()法，它可以将孤儿节点挂载到它的内部，成为它的**最后一个节点**

```js
父节点.appendChild(孤儿节点)
```

#### insertBefore()

任何已经在 DOM 树上的节点，都可以调用 insertBefore() 方法，它可以将孤儿节点挂载到它的内部，成为它的**“标杆子节点”之前的节点**

```js
父节点.insertBefore(孤儿节点, 标杆子节点)
```

### 移动节点

- 如果将已经挂载到 DOM 树上的节点成为 appendChild()或者 insertBefore()的参数，这个节点将会被移动

```js
新父节点.appendChild(已经有父亲的节点)

新父节点.insertBefore(已经有父亲的节点, 标杆子节点)
```

- 这意味着一个节点不能同时位于 DOM 树的两个位置

### 删除节点

- removeChild()方法从 DOM 中删除一个子节点

- 节点不能主动删除自己，必须由父节点删除它

### 克隆节点

- cloneNode() 方法可以克隆节点，克隆出的节点是
  "孤儿节点“

```js
var 孤儿节点 = 老节点.cloneNode()

var 孤儿节点 = 老节点.cloneNode(true)
```

- 参数是一个布尔值，表示是**否采用深度克隆**：如果为 true，则该节点的所有后代节点也都会被克隆，如果为 false，则只克隆该节点本身

## DOM 事件

### 事件监听

![事件监听eg](https://zfh-nanjing-bucket.oss-cn-nanjing.aliyuncs.com/blog-images/%E4%BA%8B%E4%BB%B6%E7%9B%91%E5%90%ACeg.png)

#### 常见的鼠标事件监听

![常见的鼠标事件监听](https://zfh-nanjing-bucket.oss-cn-nanjing.aliyuncs.com/blog-images/%E5%B8%B8%E8%A7%81%E7%9A%84%E9%BC%A0%E6%A0%87%E4%BA%8B%E4%BB%B6%E7%9B%91%E5%90%AC.png)

#### 常见的键盘事件监听

![常见的键盘事件监听](https://zfh-nanjing-bucket.oss-cn-nanjing.aliyuncs.com/blog-images/%E5%B8%B8%E8%A7%81%E7%9A%84%E9%94%AE%E7%9B%98%E4%BA%8B%E4%BB%B6%E7%9B%91%E5%90%AC.png)

#### 常见的表单事件监听

![常见的表单事件监听](https://zfh-nanjing-bucket.oss-cn-nanjing.aliyuncs.com/blog-images/%E5%B8%B8%E8%A7%81%E7%9A%84%E9%94%AE%E7%9B%98%E4%BA%8B%E4%BB%B6%E7%9B%91%E5%90%AC.png)

#### 常见的页面事件监听

![常见的页面事件监听](https://zfh-nanjing-bucket.oss-cn-nanjing.aliyuncs.com/blog-images/%E5%B8%B8%E8%A7%81%E7%9A%84%E9%A1%B5%E9%9D%A2%E7%9B%91%E5%90%AC%E4%BA%8B%E4%BB%B6.png)

### 事件传播

#### 当盒子嵌套时事件监听的执行顺序

事件的传播是：先从外到内，然后再从内到外

![盒子嵌套事件监听的执行顺序](https://zfh-nanjing-bucket.oss-cn-nanjing.aliyuncs.com/blog-images/%E7%9B%92%E5%AD%90%E5%B5%8C%E5%A5%97%E4%BA%8B%E4%BB%B6%E4%BC%A0%E6%92%AD%E9%A1%BA%E5%BA%8F.png)

- onXXX 这样的写法只能监听冒泡阶段

![onxxx事件传播](https://zfh-nanjing-bucket.oss-cn-nanjing.aliyuncs.com/blog-images/onxxx%E4%BA%8B%E4%BB%B6%E4%BC%A0%E6%92%AD.png)

#### addEventListener()方法

![addEventListener0方法](https://zfh-nanjing-bucket.oss-cn-nanjing.aliyuncs.com/blog-images/addEventListener0%E6%96%B9%E6%B3%95.png)

- 最内部元素不再区分捕获和冒泡阶段，会先执行写在前面的监听，然后执行后写的监听
- 如果给元素设置相同的两个或多个同名事件，则 DOM0 级写法后面写的会覆盖先写的;而 D0M2 级会按顺序执行

### 事件对象

- 事件处理函数提供一个形式参数，它是一个对象，封裝了本次事件的细节
- 这个参数通常用单词 event 或字母 e 表示
  ![事件对象e](https://zfh-nanjing-bucket.oss-cn-nanjing.aliyuncs.com/blog-images/%E4%BA%8B%E4%BB%B6%E5%AF%B9%E8%B1%A1e.png)

#### 鼠标位置

![鼠标位置](https://zfh-nanjing-bucket.oss-cn-nanjing.aliyuncs.com/blog-images/%E9%BC%A0%E6%A0%87%E4%BD%8D%E7%BD%AE.png)

**demo**

当鼠标移入红色区域便会显示该位置的坐标（相对于事件源元素）

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      #root {
        width: 500px;
        height: 500px;
        background-color: red;
      }
    </style>
  </head>
  <body>
    <div id="root"></div>
    <div id="x"></div>
    <div id="y"></div>
    <script>
      var odiv = document.getElementById('root')
      var ox = document.getElementById('x')
      var oy = document.getElementById('y')
      odiv.onmousemove = function (e) {
        x.innerText = `x：${e.offsetX}`
        y.innerText = `y：${e.offsetY}`
      }
    </script>
  </body>
</html>
```

#### e.charCode 和 e.keyCode 属性

- e.charCode 属性通常用于 onkeypress 事件中，表示用户输入的字符的“字符码”

![字符码](https://zfh-nanjing-bucket.oss-cn-nanjing.aliyuncs.com/blog-images/%E5%AD%97%E7%AC%A6%E7%A0%81.png)

- e.keyCode 属性通常用于 onkeydown 事件和 onkeyup 中，表示用户按下的按键的“键码“

![键码](https://zfh-nanjing-bucket.oss-cn-nanjing.aliyuncs.com/blog-images/%E9%94%AE%E7%A0%81.png)

- **eg** 按方向键可以控制页面上的盒子移动

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      #root {
        width: 200px;
        height: 200px;
        position: absolute;
        top: 200px;
        left: 200px;
        background-color: #f1f1f1;
      }
    </style>
  </head>
  <body>
    <div id="root"></div>
    <script>
      var t = 200
      var l = 200
      var oroot = document.getElementById('root')
      document.onkeydown = function (e) {
        switch (e.keyCode) {
          case 37:
            l -= 3
            break
          case 38:
            t -= 3
            break
          case 39:
            l += 3
            break
          case 40:
            t += 3
            break
        }
        oroot.style.top = t + 'px'
        oroot.style.left = l + 'px'
      }
    </script>
  </body>
</html>
```

#### e.preventDefault()方法

- e.preventDefault()方法用来阻止事件产生的”默认动作“

- 一些特殊的业务需求，需要阻止事件的“默认动作”

**eg**:制作一个文本框，只能让用户在其中输入小写字母和数字，其他字符输入没有效果。

```html
<body>
  <form>
    <div id="message"></div>
    <input type="text" name="name" id="text_id" />
    <input type="password" id="password" />
  </form>
  <script>
    var text_id = document.getElementById('text_id')
    text_id.onkeypress = function (e) {
      if (
        !(
          (e.charCode >= 48 && e.charCode <= 57) ||
          (e.charCode >= 97 && e.charCode <= 122)
        )
      )
        e.preventDefault()
    }
  </script>
</body>
```

#### e.stopPropagation()方法

用来阻止事件继续传播

**eg**: 制作一个弹出层：点击按钮显示弹出层，点击网页任意地方，弹出层关闭

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      #button {
        z-index: -1;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
      .mask {
        display: none;
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        background-color: rgba(0, 0, 0, 0.445);
      }
    </style>
  </head>
  <body>
    <div class="mask"></div>
    <button id="button">按我打开弹出层</button>
    <script>
      var obutton = document.getElementById('button')
      var mask = document.getElementsByClassName('mask')[0]
      obutton.onclick = function (e) {
        mask.style.display = 'block'
        e.stopPropagation()
        console.log('点击了按钮')
      }
      document.onclick = function () {
        mask.style.display = 'none'
        console.log('点击了网页')
      }
    </script>
  </body>
</html>
```

### 事件委托

#### 批量添加事件监听

页面上有一个无序列表 ul，它内部共有 20 个 li 元素，请批量给它们添加点击事件监听，实现效果：点击哪个 li 元素，哪个 li 元素就变红

##### 批量添加事件监听的性能问题

- 每一个事件监听注册都会消耗一定的系统内存，而批量添加事件会导致监听数量太多，内存消耗会非常大

- 实际上，每个 li 的事件处理函数都是不同的函数，这些函数本身也会占用内存

#### 新增元素动态绑定事件

页面上有一个无序列表 ul，它内部没有 1i 元素，请制作一个按钮，点击这个按钮就能增加一个 1i 元素。并且要求每个增加的 li 元素也要有点击事件监听，实现效果点击哪个 li 元素，哪个 1i 元素就变红

##### 动态绑定事件的问题

- 新增元素必须分别添加事件监听，**不能自动获得事件监听**
- 大量事件监听、大量事件处理函数都会产生大量消耗内存

#### 解决方案--事件委托

- 利用**事件冒泡**机制，将后代元素**事件委托**给祖先元素

![事件委托](https://zfh-nanjing-bucket.oss-cn-nanjing.aliyuncs.com/blog-images/%E4%BA%8B%E4%BB%B6%E5%A7%94%E6%89%98.png)

- 事件委托通常需要结合使用 e.target 属性

![e,target](https://zfh-nanjing-bucket.oss-cn-nanjing.aliyuncs.com/blog-images/e,target.png)

eg：在下面的例子中，点击事件中，每个 li 元素就是**事件源元素**，而 list 就是**e.currentTarget**

##### 动态绑定事件 demo

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <button id="btn">点击我添加列表项</button>
    <ul id="list"></ul>
    <script>
      var btn = document.getElementById('btn')
      var list = document.getElementById('list')
      btn.onclick = function () {
        var li = document.createElement('li')
        li.innerText = '我是新来的'
        list.appendChild(li)
      }
      list.onclick = function (e) {
        e.target.style.color = 'red'
      }
    </script>
  </body>
</html>
```

#### 事件委托的使用场景

- 当有大量类似元素需要批量添加事件监听时，使用事件委托可以减少内存开销

- 当有动态元素节点上树时，使用事件委托可以让新上树的元素具有事件监听

### 使用事件委托时需要注意的事项

- 使用事件委托时要注意：**不能委托不冒泡的事件给祖先元素**,比如：

onmouseenter 和 onmouseover 都表示“鼠标进入”, onmouseenter 不冒泡, onmouseover 冒泡。

onmouseenter 这个属性天生就是“不冒泡”的，相当于你事件处理函数附加给了哪个 DOM 节点就是哪个 D0M 节点自己触发的事件，没有冒泡过程

- 最内层元素不能再有额外的内层元素了，比如：

![最内层元素不能再有额外的内层元素](https://zfh-nanjing-bucket.oss-cn-nanjing.aliyuncs.com/blog-images/%E6%9C%80%E5%86%85%E5%B1%82%E5%85%83%E7%B4%A0%E4%B8%8D%E8%83%BD%E5%86%8D%E6%9C%89%E9%A2%9D%E5%A4%96%E7%9A%84%E5%86%85%E5%B1%82%E5%85%83%E7%B4%A0.png)

## 定时器和延时器

### 定时器

- setInterval()函数可以重复调用一个函数，在每次调用之间具有固定的时间间隔

![setInterval()](<https://zfh-nanjing-bucket.oss-cn-nanjing.aliyuncs.com/blog-images/setInterval().png>)

- setInterval()函数可以接收第 3、4…个参数，它们将按顺序传入函数

![3，4个参数](https://zfh-nanjing-bucket.oss-cn-nanjing.aliyuncs.com/blog-images/3%EF%BC%8C4%E4%B8%AA%E5%8F%82%E6%95%B0.png)

- 具名函数也可以传入 setInterval()

![具名函数传入](https://zfh-nanjing-bucket.oss-cn-nanjing.aliyuncs.com/blog-images/%E5%85%B7%E5%90%8D%E5%87%BD%E6%95%B0%E4%BC%A0%E5%85%A5.png)

#### 清除定时器

ClearInterval()函数可以清除一个定时器

![清除定时器](https://zfh-nanjing-bucket.oss-cn-nanjing.aliyuncs.com/blog-images/%E6%B8%85%E9%99%A4%E5%AE%9A%E6%97%B6%E5%99%A8.png)

### 延时器

setTimeout()函数可以设置一个延时器，当指定时间到了之后，会执行函数一次，不再重复执行。

![延时器](https://zfh-nanjing-bucket.oss-cn-nanjing.aliyuncs.com/blog-images/%E5%BB%B6%E6%97%B6%E5%99%A8.png)

#### 清除延时器

clearTimeout()函数可以清除延时器

### 函数节流

[7 分钟理解 JS 的节流、防抖及使用场景](https://juejin.cn/post/6844903669389885453)

节流的意思是让函数有节制地执行，而不是毫无节制的触发一次就执行一次。什么叫有节制呢？第一次执行之后，在设定的时间之后才执行第二次

// TODO： 改 2022.10.23

![函数节流](https://zfh-nanjing-bucket.oss-cn-nanjing.aliyuncs.com/blog-images/%E5%87%BD%E6%95%B0%E8%8A%82%E6%B5%81.png)

## 动画效果开发

### 无缝连续滚动特效

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      * {
        margin: 0;
        padding: 0;
      }

      .box {
        width: 1000px;
        height: 130px;
        border: 1px solid #000;
        margin: 50px auto;
        overflow: hidden;
      }

      .box ul {
        list-style: none;
        /* 设置大一点，这样li才能浮动 */
        width: 5000px;
        position: relative;
      }

      .box ul li {
        float: left;
        margin-right: 10px;
      }
    </style>
  </head>

  <body>
    <div id="box" class="box">
      <ul id="list">
        <li><img src="images/number/0.png" alt="" /></li>
        <li><img src="images/number/1.png" alt="" /></li>
        <li><img src="images/number/2.png" alt="" /></li>
        <li><img src="images/number/3.png" alt="" /></li>
        <li><img src="images/number/4.png" alt="" /></li>
        <li><img src="images/number/5.png" alt="" /></li>
      </ul>
    </div>
    <script>
      var box = document.getElementById('box')
      var list = document.getElementById('list')

      // 复制多一遍所有的li
      list.innerHTML += list.innerHTML

      // 全局变量，表示当前list的left值
      var left = 0

      // 定时器，全局变量
      var timer

      move()

      // 动画封装成函数
      function move() {
        // 设表先关，防止动画积累
        clearInterval(timer)

        timer = setInterval(function () {
          left -= 4
          // 验收
          if (left <= -1260) {
            left = 0
          }
          list.style.left = left + 'px'
        }, 20)
      }

      // 鼠标进入停止定时器
      box.onmouseenter = function () {
        clearInterval(timer)
      }

      // 鼠标离开继续定时器
      box.onmouseleave = function () {
        move()
      }
    </script>
  </body>
</html>
```

**tips**

- timer 延时器必须是全局变量，后面鼠标移入盒子需要清楚延时器。
- 开启延时器之前要清除延时器，防止动画积累：’**设表先关**‘

### 轮播图特效

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      * {
        margin: 0;
        padding: 0;
      }
      .carousel {
        width: 650px;
        height: 360px;
        border: 1px solid #000;
        margin: 50px auto;
        position: relative;
        overflow: hidden;
      }
      .carousel ul {
        list-style: none;
        width: 6000px;
        position: relative;
        left: 0px;
        transition: left 0.5s ease 0s;
      }
      .carousel ul li {
        float: left;
      }
      .carousel .leftbtn {
        position: absolute;
        left: 20px;
        top: 50%;
        margin-top: -25px;
        width: 50px;
        height: 50px;
        background-color: rgb(28, 180, 226);
        border-radius: 50%;
      }
      .carousel .rightbtn {
        position: absolute;
        right: 20px;
        top: 50%;
        margin-top: -25px;
        width: 50px;
        height: 50px;
        background-color: rgb(28, 180, 226);
        border-radius: 50%;
      }
    </style>
  </head>
  <body>
    <div class="carousel">
      <ul id="list">
        <li><img src="images/beijing/0.jpg" alt="" /></li>
        <li><img src="images/beijing/1.jpg" alt="" /></li>
        <li><img src="images/beijing/2.jpg" alt="" /></li>
        <li><img src="images/beijing/3.jpg" alt="" /></li>
        <li><img src="images/beijing/4.jpg" alt="" /></li>
      </ul>
      <a href="javascript:;" class="leftbtn" id="leftbtn"></a>
      <a href="javascript:;" class="rightbtn" id="rightbtn"></a>
    </div>
    <script>
      // 得到按钮和ul，ul整体进行运动
      var leftbtn = document.getElementById('leftbtn')
      var rightbtn = document.getElementById('rightbtn')
      var list = document.getElementById('list')
      // 克隆第一张图片
      var cloneli = list.firstElementChild.cloneNode(true)
      list.appendChild(cloneli)
      // 当前ul显示到第几张了，从0开始数
      var idx = 0
      // 节流锁
      var lock = true
      // 右边按钮监听
      rightbtn.onclick = function () {
        // 判断锁的状态
        if (!lock) return
        lock = false
        // 给list加过渡，为什么要加？？css中不是已经加了么？？这是因为最后一张图片会把过渡去掉
        list.style.transition = 'left .5s ease 0s'
        idx++
        if (idx > 4) {
          // 设置一个延时器，延时器的功能就是将ul瞬间拉回0的位置，延时器的目的就是让过渡动画结束之后
          setTimeout(function () {
            // 取消掉过渡，因为要的是瞬间移动，不是“咕噜”回去
            list.style.transition = 'none'
            list.style.left = 0
            idx = 0
          }, 500)
        }
        list.style.left = -idx * 650 + 'px'
        // 函数节流
        setTimeout(function () {
          lock = true
        }, 500)
      }
      // 左边按钮监听
      leftbtn.onclick = function () {
        if (!lock) return
        lock = false
        // 判断是不是第0张，如果是，就要瞬间用假的替换真的
        if (idx == 0) {
          // 取消掉过渡，因为要的是瞬间移动，不是“咕噜”过去
          list.style.transition = 'none'
          // 直接瞬间移动到最后的假图片上
          list.style.left = -5 * 650 + 'px'
          // 设置一个延时器，这个延时器的延时时间可以是0毫秒，虽然是0毫秒，但是可以让我们过渡先是瞬间取消，然后再加上
          setTimeout(function () {
            // 加过渡
            list.style.transition = 'left .5s ease 0s'
            // idx改为真正的最后一张
            idx = 4
            list.style.left = -idx * 650 + 'px'
          }, 0)
        } else {
          idx--
          list.style.left = -idx * 650 + 'px'
        }
        // 函数节流
        setTimeout(function () {
          lock = true
        }, 500)
      }
    </script>
  </body>
</html>
```

**tips**

- 获取元素的第一个子节点使用 element.firstElementChild
- 关于 setTimeout(function(),0):同步代码转异步代码，很常用的技巧。这是为了手动调配优先级不高的代码靠后执行
- **函数节流**的用法，第一次执行之后，在设定的时间之后才执行第二次，重点就是**开关锁**
- 左右按钮的写法不一样，尤其注意是否采用**if...else**写法！

### 呼吸轮播图

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      * {
        margin: 0;
        padding: 0;
      }

      .carousel {
        width: 650px;
        height: 360px;
        border: 1px solid #000;
        margin: 50px auto;
        position: relative;
      }

      .carousel ul {
        list-style: none;
      }

      .carousel ul li {
        position: absolute;
        top: 0;
        left: 0;
        /* 透明度都是0 */
        opacity: 0;
        transition: opacity 1s ease 0s;
      }

      /* 只有第一张透明度是1 */
      .carousel ul li:first-child {
        opacity: 1;
      }

      .carousel .leftbtn {
        position: absolute;
        left: 20px;
        top: 50%;
        margin-top: -25px;
        width: 50px;
        height: 50px;
        background-color: rgb(28, 180, 226);
        border-radius: 50%;
      }

      .carousel .rightbtn {
        position: absolute;
        right: 20px;
        top: 50%;
        margin-top: -25px;
        width: 50px;
        height: 50px;
        background-color: rgb(28, 180, 226);
        border-radius: 50%;
      }
    </style>
  </head>

  <body>
    <div class="carousel">
      <ul id="list">
        <li><img src="images/beijing/0.jpg" alt="" /></li>
        <li><img src="images/beijing/1.jpg" alt="" /></li>
        <li><img src="images/beijing/2.jpg" alt="" /></li>
        <li><img src="images/beijing/3.jpg" alt="" /></li>
        <li><img src="images/beijing/4.jpg" alt="" /></li>
      </ul>
      <a href="javascript:;" class="leftbtn" id="leftbtn"></a>
      <a href="javascript:;" class="rightbtn" id="rightbtn"></a>
    </div>
    <script>
      // 得到按钮和ul，ul整体进行运动
      var leftbtn = document.getElementById('leftbtn')
      var rightbtn = document.getElementById('rightbtn')
      var list = document.getElementById('list')
      var lis = list.getElementsByTagName('li')

      // 当前是第几张图显示
      var idx = 0

      // 节流
      var lock = true

      // 右按钮
      rightbtn.onclick = function () {
        // 判断节流
        if (!lock) return

        lock = false

        // 还没有改idx，此时的idx这个图片就是老图，老图淡出
        lis[idx].style.opacity = 0
        idx++
        if (idx > 4) idx = 0
        // 改了idx，此时的idx这个图片就是新图，新图淡入
        lis[idx].style.opacity = 1

        // 动画结束之后，开锁
        setTimeout(function () {
          lock = true
        }, 1000)
      }

      // 左按钮
      leftbtn.onclick = function () {
        // 判断节流
        if (!lock) return

        lock = false

        // 还没有改idx，此时的idx这个图片就是老图，老图淡出
        lis[idx].style.opacity = 0
        idx--
        if (idx < 0) idx = 4
        // 改了idx，此时的idx这个图片就是新图，新图淡入
        lis[idx].style.opacity = 1

        // 动画结束之后，开锁
        setTimeout(function () {
          lock = true
        }, 1000)
      }
    </script>
  </body>
</html>
```

// 使用纯 css 实现轮播图 2022.10.23
