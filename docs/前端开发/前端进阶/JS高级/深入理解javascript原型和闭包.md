---
title: 深入理解javascript原型和闭包
author: 王福朋
icon: javascript
category:
  - 前端开发
  - 前端进阶
  - JS高级
---

## 一切都是对象

**“一切都是对象”这句话的重点在于如何去理解“对象”这个概念。**

——当然，也不是所有的都是对象，**值类型就不是对象。**

首先咱们还是先看看 javascript 中一个常用的运算符——typeof。typeof 应该算是咱们的老朋友，还有谁没用过它？

typeof 函数输出的一共有几种类型，在此列出：

```js
function show(x) {
  console.log(typeof x) // undefined
  console.log(typeof 10) // number
  console.log(typeof 'abc') // string
  console.log(typeof true) // boolean

  console.log(typeof function () {}) //function

  console.log(typeof [1, 'a', true]) //object
  console.log(typeof { a: 10, b: 20 }) //object
  console.log(typeof null) //object
  console.log(typeof new Number(10)) //object
}
show()
```

以上代码列出了 typeof 输出的结果，其中上面的四种（undefined, number, string, boolean）属于简单的**值类型**，不是对象。剩下的几种情况——函数、数组、对象、null、new Number(10)都是对象。他们都是引用类型。

判断一个变量是不是对象非常简单。**值类型的类型判断用 typeof，引用类型的类型判断用 instanceof**。

```js
var fn = function () {}
console.log(fn instanceof Object) // true
```

那么在 javascript 中的对象，到底该如何定义呢？

**对象——若干属性的集合**。

java 或者 C#中的对象都是 new 一个 class 出来的，而且里面有字段、属性、方法，规定的非常严格。但是 javascript 就比较随意了——数组是对象，函数是对象，对象还是对象。对象里面的一切都是属性，只有属性，没有方法。那么这样方法如何表示呢？——方法也是一种属性。因为它的属性表示为键值对的形式。

而且，更加好玩的事，**javascript 中的对象可以任意的扩展属性**，没有 class 的约束。这个大家应该都知道，就不再强调了。

先说个最常见的例子：

```js
var obj = {
  a: 10,
  b: function (x) {
    alert(this.a + x)
  },
  c: {
    name: 'alex',
    year: 1999,
  },
}
```

以上代码中，obj 是一个自定义的对象，其中 a、b、c 就是它的属性，而且在 c 的属性值还是一个对象，它又有 name、year 两个属性。

这个可能比较好理解，那么函数和数组也可以这样定义属性吗？——当然不行，但是它可以用另一种形式，总之函数/数组之流，**只要是对象，它就是属性的集合。**

以函数为例子：

```js
var fn = function () {
  alert(100)
}
fn.a = 10
fn.b = function () {
  alert(123)
}
fn.c = {
  name: '王福朋',
  year: 1988,
}
```

上段代码中，函数就作为对象被赋值了 a、b、c 三个属性——很明显，这就是属性的集合吗。

你问：这个有用吗？

回答：可以看看 jQuery 源码！

在 jQuery 源码中，“jQuery”或者“\$”，这个变量其实是一个函数，不信你可以叫咱们的老朋友 typeof 验证一下。

```js
console.log(typeof $) // function
console.log($.trim(' ABC '))
```

验明正身！的确是个函数。那么咱们常用的 \$.trim() 也是个函数，经常用，就不用验了吧！

很明显，这就是在\$或者 jQuery 函数上加了一个 trim 属性，**属性值是函数，作用是截取前后空格。**

其次要解释的就是本文的内容 —— **一切（引用类型）都是对象，对象是属性的集合**。 最需要了解的就是对象的概念，和 java/C#完全不一样。所以，切记切记

最后，有个疑问。在 typeof 的输出类型中，function 和 object 都是对象，为何却要输出两种答案呢？都叫做 object 不行吗？——当然不行。

具体原因，且听下回分解！

## 函数和对象的关系

上文 (一切都是对象)已经提到，函数就是对象的一种，因为通过 instanceof 函数可以判断。

```js
var fn = function () {}
console.log(fn instanceof Object) // true
```

函数是一种对象，**但是函数却不像数组一样——你可以说数组是对象的一种，因为数组就像是对象的一个子集一样。但是函数与对象之间，却不仅仅是一种包含和被包含的关系，函数和对象之间的关系比较复杂，甚至有一点鸡生蛋蛋生鸡的逻辑，咱们这一节就缕一缕。**

```js
function Fn() {
  this.name = '王福朋'
  this.year = 1988
}
var fn1 = new Fn()
```

上面的这个例子很简单，它能说明：**对象可以通过函数来创建** 对！也只能说明这一点。

但是我要说——**对象都是通过函数创建的**——有些人可能反驳：不对！因为：

```js
var obj = { a: 10, b: 20 }
var arr = [5, 'x', true]
```

但是不好意思，这个——真的只是一种——“快捷方式”，在编程语言中，一般叫做“`语法糖`”。

其实以上代码的本质是：

```js
//var obj = { a: 10, b: 20 };
//var arr = [5, 'x', true];

var obj = new Object()
obj.a = 10
obj.b = 20

var arr = new Array()
arr[0] = 5
arr[1] = 'x'
arr[2] = true
```

而其中的 Object 和 Array 都是函数：

```js
console.log(typeof Object) // function
console.log(typeof Array) // function
```

所以，可以很负责任的说——**对象都是通过函数来创建的。**

现在是不是糊涂了—— **对象是函数创建的，而函数却又是一种对象**——天哪！函数和对象到底是什么关系啊？

别着急！揭开这个谜底，还得先去了解一下另一位老朋友——prototype 原型。

## prototype 原型

在咱们的第一节中说道,**函数也是一种对象**。他也是**属性的集合**，你**也可以对函数进行自定义属性**。

不用等咱们去试验，javascript 自己就先做了表率，人家就默认的给函数一个属性——`prototype`。对，每个函数都有一个属性叫做 prototype。

这个 prototype 的属性值是一个对象（**属性的集合，再次强调！**），默认的只有一个叫做`constructor`的属性，指向这个函数本身。

![prototype1](https://zfh-nanjing-bucket.oss-cn-nanjing.aliyuncs.com/blog-images/prototype1.png)

如上图，SuperType 是是一个函数，右侧的方框就是它的原型。

原型既然作为对象，属性的集合，不可能就只弄个 constructor 来玩玩，肯定可以自定义的增加许多属性。例如这位 Object 大哥，人家的 prototype 里面，就有好几个其他属性。

![prototype2](https://zfh-nanjing-bucket.oss-cn-nanjing.aliyuncs.com/blog-images/prototype2.png)

咦，有些方法怎么似曾相似？

对！别着急，之后会让你知道他们为何似曾相识。

接着往下说，你也可以在自己**自定义的函数的 prototype 中新增自己的属性**

```js
function Fn() {}
Fn.prototype.name = '王福朋'
Fn.prototype.getYear = function () {
  return 1988
}
```

看到没有，这样就变成了

![prototype3](https://zfh-nanjing-bucket.oss-cn-nanjing.aliyuncs.com/blog-images/prototype3.png)

但是，这样做有何用呢？如果用咱们自己的代码来演示，就是这样

```js
function Fn() {}
Fn.prototype.name = '王福朋'
Fn.prototype.getYear = function () {
  return 1988
}

var fn = new Fn()
console.log(fn.name)
console.log(fn.getYear())
```

即，Fn 是一个函数，fn 对象是从 Fn 函数 new 出来的，这样 fn 对象**就可以调用 Fn.prototype 中的属性**。

因为每个对象都有一个隐藏的属性——`__proto__`，这个属性引用了创建这个对象的函数的 prototype。即：`fn.__proto__ === Fn.prototype`

这里的"`__proto__`"称为“`隐式原型`”，下回继续分解。

## 隐式原型

上节已经提到，每个函数 function 都有一个 prototype，即原型。这里再加一句话——每个对象都有一个`__proto__`，可称为隐式原型。

这个`__proto__`是一个隐藏的属性，javascript 不希望开发者用到这个属性值，有的低版本浏览器甚至不支持这个属性值。所以你在 Visual Studio 2012 这样很高级很智能的编辑器中，都不会有`__proto__`的智能提示，但是你不用管它，直接写出来就是了。

![隐式原型1](https://zfh-nanjing-bucket.oss-cn-nanjing.aliyuncs.com/blog-images/%E9%9A%90%E5%BC%8F%E5%8E%9F%E5%9E%8B1.png)

上面截图看来，obj.**proto**和 Object.prototype 的属性一样！这么巧！

**答案就是一样**。

obj 这个对象本质上是被 Object 函数创建的，因此`obj.__proto__=== Object.prototype`。我们可以用一个图来表示。

![隐式原型2](https://zfh-nanjing-bucket.oss-cn-nanjing.aliyuncs.com/blog-images/%E9%9A%90%E5%BC%8F%E5%8E%9F%E5%9E%8B2.png)

那么上图中的“Object.prototype”也是一个对象，它的`__proto__`指向哪里？

好问题！

在说明“Object.prototype”之前，先说一下自定义函数的 prototype。自定义函数的 prototype 本质上就是和 var obj = {} 是一样的，都是被 Object 创建，所以它的`__proto__`指向的就是 Object.prototype。

**但是 Object.prototype 却是一个特例——它的**proto**指向的是 null，切记切记！**

> 批注：这就是原型链的终点

![隐式原型3](https://zfh-nanjing-bucket.oss-cn-nanjing.aliyuncs.com/blog-images/%E9%9A%90%E5%BC%8F%E5%8E%9F%E5%9E%8B3.png)

还有——函数也是一种对象，函数也有`__proto__`吗？

又一个好问题！——当然有。

函数也不是从石头缝里蹦出来的，函数也是被创建出来的。谁创建了函数呢？——Function——注意这个大写的“F”。

且看如下代码。

![隐式原型4](https://zfh-nanjing-bucket.oss-cn-nanjing.aliyuncs.com/blog-images/%E9%9A%90%E5%BC%8F%E5%8E%9F%E5%9E%8B4.png)

以上代码中，第一种方式是比较传统的函数创建方式，第二种是用 new Functoin 创建。

首先根本**不推荐用第二种方式**。

这里只是向大家演示，函数是被 Function 创建的。

好了，根据上面说的一句话——对象的`__proto__`指向的是创建它的函数的 prototype，就会出现：`Object.__proto__=== Function.prototype`。用一个图来表示。

![隐式原型5](https://zfh-nanjing-bucket.oss-cn-nanjing.aliyuncs.com/blog-images/%E9%9A%90%E5%BC%8F%E5%8E%9F%E5%9E%8B5.png)

上图中，很明显的标出了：自定义函数`Foo.__proto__`指向`Function.prototype`，`Object.__proto__`指向`Function.prototype`，唉，**怎么还有一个 Function.**proto**指向 Function.prototype？这不成了循环引用了？**

对！是一个环形结构。

其实稍微想一下就明白了。Function 也是一个函数，函数是一种对象，也有`__proto__`属性。既然是函数，那么它一定是被 Function 创建。所以——**Function 是被自身创建的**。所以它的`__proto__`指向了自身的 Prototype。

最后一个问题：Function.prototype 指向的对象，它的`__proto__`是不是也指向 Object.prototype？

答案是肯定的。因为 Function.prototype 指向的对象也是一个普通的被 Object 创建的对象，所以也遵循基本的规则。

![隐式原型6](https://zfh-nanjing-bucket.oss-cn-nanjing.aliyuncs.com/blog-images/%E9%9A%90%E5%BC%8F%E5%8E%9F%E5%9E%8B6.png)

## instanceof

> instanceof 运算符用于**检测构造函数的 prototype 属性**是否**出现**在某个**实例对象**的**原型链**上。

```js
object instanceof constructor //object 某个实例对象;constructor 某个构造函数
```

又介绍一个老朋友——instanceof。

对于值类型，你可以通过 typeof 判断，string/number/boolean 都很清楚，但是 typeof 在判断到引用类型的时候，返回值只有 object/function，你不知道它到底是一个 object 对象，还是数组，还是 new Number 等等。

这个时候就需要用到 instanceof。例如：

![instanceof](https://zfh-nanjing-bucket.oss-cn-nanjing.aliyuncs.com/blog-images/instanceof.png)

上图中，f1 这个对象是被 Foo 创建，但是“f1 instanceof Object”为什么是 true 呢？

至于为什么过会儿再说，先把 instanceof 判断的规则告诉大家。根据以上代码看下图：

![instanceof2](https://zfh-nanjing-bucket.oss-cn-nanjing.aliyuncs.com/blog-images/instanceof2.png)

instanceof 运算符的第一个变量是一个对象，暂时称为 A；第二个变量一般是一个函数，暂时称为 B。

instanceof 的判断规则是：**沿着 A 的**proto**这条线来找，同时沿着 B 的 prototype 这条线来找，如果两条线能找到同一个引用，即同一个对象，那么就返回 true。如果找到终点还未重合，则返回 false。**

按照以上规则，大家看看“ f1 instanceof Object ”这句代码是不是 true？ 根据上图很容易就能看出来，就是 true。

通过上以规则，你可以解释很多比较怪异的现象，例如

![instanceof3](https://zfh-nanjing-bucket.oss-cn-nanjing.aliyuncs.com/blog-images/instanceof3.png)

这些看似很混乱的东西，答案却都是 true，这是为何？

正好，这里也接上了咱们上一节说的“乱”。

上一节咱们贴了好多的图片，其实那些图片是可以联合成一个**整体**的，即：

![instanceof4](https://zfh-nanjing-bucket.oss-cn-nanjing.aliyuncs.com/blog-images/instanceof4.png)

看这个图片，**千万不要嫌烦**，必须一条线一条线挨着分析。如果上一节你看的比较仔细，再结合刚才咱们介绍的 instanceof 的概念，相信能看懂这个图片的内容。

看看这个图片，你也就知道为何上面三个看似混乱的语句返回的是 true 了。

问题又出来了。instanceof 这样设计，到底有什么用？到底 instanceof 想表达什么呢？

重点就这样被这位老朋友给引出来了——继承——原型链。

即，**instanceof 表示的就是一种继承关系**，或者原型链的结构。请看下节分解。

## 继承

为何用“继承”为标题，而不用“原型链”？

原型链如果解释清楚了很容易理解，不会与常用的 java/C#产生混淆。而“继承”却是常用面向对象语言中最基本的概念，但是 java 中的继承与 javascript 中的继承又完全是两回事儿。因此，这里把“继承”着重拿出来，就为了体现这个不同。

javascript 中的继承是通过原型链来体现的。先看几句代码

![继承1](https://zfh-nanjing-bucket.oss-cn-nanjing.aliyuncs.com/blog-images/%E7%BB%A7%E6%89%BF1.png)

以上代码中，f1 是 Foo 函数 new 出来的对象，f1.a 是 f1 对象的基本属性，f1.b 是怎么来的呢？——从 Foo.prototype 得来，因为 f1.**proto**指向的是 Foo.prototype

**访问一个对象的属性时，先在基本属性中查找，如果没有，再沿着**proto**这条链向上找，这就是原型链。**

看图说话：

![继承2](https://zfh-nanjing-bucket.oss-cn-nanjing.aliyuncs.com/blog-images/%E7%BB%A7%E6%89%BF2.png)

上图中，访问 f1.b 时，f1 的基本属性中没有 b，于是沿着**proto**找到了 Foo.prototype.b。

那么我们在实际应用中如何区分一个属性到底是基本的还是从原型中找到的呢？大家可能都知道答案了——hasOwnProperty，特别是在 for…in…循环中，一定要注意。

![继承3](https://zfh-nanjing-bucket.oss-cn-nanjing.aliyuncs.com/blog-images/%E7%BB%A7%E6%89%BF3.png)

等等，不对！ f1 的这个 hasOwnProperty 方法是从哪里来的？ f1 本身没有，Foo.prototype 中也没有，哪儿来的？

好问题。

它是从 Object.prototype 中来的，请看图：

![继承4](https://zfh-nanjing-bucket.oss-cn-nanjing.aliyuncs.com/blog-images/%E7%BB%A7%E6%89%BF4.png)

对象的原型链是沿着`__proto__`这条线走的，因此在查找 f1.hasOwnProperty 属性时，就会顺着原型链一直查找到 Object.prototype。

由于所有的对象的原型链都会找到 Object.prototype，因此所有的对象都会有 Object.prototype 的方法。这就是所谓的“继承”。

当然这只是一个例子，你可以自定义函数和对象来实现自己的继承。

说一个函数的例子吧。

我们都知道每个函数都有 call，apply 方法，都有 length，arguments，caller 等属性。为什么每个函数都有？这肯定是“继承”的。函数由 Function 函数创建，因此继承的是 Function.prototype 中的方法。不信可以，我们验证一下：

![继承5](https://zfh-nanjing-bucket.oss-cn-nanjing.aliyuncs.com/blog-images/%E7%BB%A7%E6%89%BF5.png)

看到了吧，有 call、length 等这些属性。

那怎么还有 hasOwnProperty 呢？——那是 Function.prototype 继承自 Object.prototype 的方法。有疑问可以看看上一节将 instanceof 时候那个大图，看看**Function.prototype.**proto**是否指向 Object.prototype。**

## 原型的灵活性

在 Java 和 C#中，你可以简单的理解 class 是一个模子，对象就是被这个模子压出来的一批一批月饼（中秋节刚过完）。压个啥样，就得是个啥样，不能随便动，动一动就坏了。

而在 javascript 中，就没有模子了，月饼被换成了面团，你可以捏成自己想要的样子。

首先，对象属性可以随时改动。

对象或者函数，刚开始 new 出来之后，可能啥属性都没有。但是你可以这会儿加一个，过一会儿在加两个，非常灵活。

其次，如果继承的方法不合适，可以做出修改。

![原型的灵活性](https://zfh-nanjing-bucket.oss-cn-nanjing.aliyuncs.com/blog-images/%E5%8E%9F%E5%9E%8B%E7%9A%84%E7%81%B5%E6%B4%BB%E6%80%A7.png)

如上图，Object 和 Array 的 toString()方法不一样。肯定是 Array.prototype.toString()方法做了修改。

同理，我也可以自定义一个函数，并自己去修改 prototype.toString()方法。

![原型的灵活性2](https://zfh-nanjing-bucket.oss-cn-nanjing.aliyuncs.com/blog-images/%E5%8E%9F%E5%9E%8B%E7%9A%84%E7%81%B5%E6%B4%BB%E6%80%A72.png)

最后，如果感觉当前缺少你要用的方法，可以自己去创建 =>
(内置对象添加原型的方法(属性))

```js
//在字符串中添加一个倒序字符串的方法
String.prototype.myReverse = function () {
  for (var i = this.length - 1; i >= 0; i--) {
    console.log(this[i])
  }
}
var str = 'abcd'
str.myReverse() //'dcba'
```

## 简述【执行上下文】上

什么是“执行上下文”（也叫做“执行上下文环境”）？暂且不下定义，先看一段代码：

![执行上下文1](https://zfh-nanjing-bucket.oss-cn-nanjing.aliyuncs.com/blog-images/%E6%89%A7%E8%A1%8C%E4%B8%8A%E4%B8%8B%E6%96%871.png)

第一句报错，a 未定义，很正常。第二句、第三句输出都是 undefined，说明浏览器在执行 console.log(a)时，已经知道了 a 是 undefined，但却不知道 a 是 10（第三句中）。

在一段 js 代码拿过来真正一句一句运行之前，浏览器已经做了一些“准备工作”，其中就包括对变量的声明，而不是赋值。变量赋值是在赋值语句执行的时候进行的。可用下图模拟：

![执行上下文2](https://zfh-nanjing-bucket.oss-cn-nanjing.aliyuncs.com/blog-images/%E6%89%A7%E8%A1%8C%E4%B8%8A%E4%B8%8B%E6%96%872.png)

下面还有。先来个简单的。

![执行上下文3](https://zfh-nanjing-bucket.oss-cn-nanjing.aliyuncs.com/blog-images/%E6%89%A7%E8%A1%8C%E4%B8%8A%E4%B8%8B%E6%96%873.png)

有 js 开发经验的朋友应该都知道，你无论在哪个位置获取 this，都是有值的。至于 this 的取值情况，比较复杂，会专门拿出一篇文章来讲解。

与第一种情况不同的是：第一种情况只是对变量进行声明（并没有赋值），而此种情况直接给 this 赋值。这也是“准备工作”情况要做的事情之一。

下面还有。。。第三种情况。

在第三种情况中，需要注意代码注释中的两个名词——“函数表达式”和“函数声明”。虽然两者都很常用，但是这两者在“准备工作”时，却是两种待遇。

![执行上下文4](https://zfh-nanjing-bucket.oss-cn-nanjing.aliyuncs.com/blog-images/%E6%89%A7%E8%A1%8C%E4%B8%8A%E4%B8%8B%E6%96%874.png)

看以上代码。“函数声明”时我们看到了第二种情况的影子，而“函数表达式”时我们看到了第一种情况的影子。

没错。在“准备工作”中，对待函数表达式就像对待“ var a = 10 ”这样的变量一样，只是声明。而对待函数声明时，却把函数整个赋值了。

好了，“准备工作”介绍完毕。

我们总结一下，在“准备工作”中完成了哪些工作：

- 变量、函数表达式——变量声明，默认赋值为 undefined；
- this——赋值；
- 函数声明——赋值；

这三种数据的准备情况我们称之为“执行上下文”或者“执行上下文环境”。

> 这里插一句题外话：通过以上三种情况，你可能会联想到网上的有些考 js 语法的题目/面试题。的确，几乎每个 js 语法题中都有这种题目出现。之前你遇到这种题目是不是靠背诵来解决？背过了，隔几天又忘记了。——任何问题，都要去追根溯源，要知道这个问题是真正出自哪一块知识点，要真正去理解。光靠背诵是没用的。

细心的朋友可能会发现，我们上面所有的例子都是在全局环境下执行的。

其实，javascript 在执行一个代码段之前，都会进行这些“准备工作”来生成执行上下文。这个“代码段”其实分三种情况——全局代码，函数体，eval 代码。

这里解释一下为什么代码段分为这三种。

所谓“代码段”就是一段文本形式的代码。

首先，全局代码是一种，这个应该没有非议，本来就是手写文本到 script 标签里面的。

其次，eval 代码接收的也是一段文本形式的代码。

![执行上下文5](https://zfh-nanjing-bucket.oss-cn-nanjing.aliyuncs.com/blog-images/%E6%89%A7%E8%A1%8C%E4%B8%8A%E4%B8%8B%E6%96%875.png)

![执行上下文6](https://zfh-nanjing-bucket.oss-cn-nanjing.aliyuncs.com/blog-images/%E6%89%A7%E8%A1%8C%E4%B8%8A%E4%B8%8B%E6%96%876.png)

最后，函数体是代码段是因为函数在创建时，本质上是 new Function(…) 得来的，其中需要传入一个文本形式的参数作为函数体。

![执行上下文7](https://zfh-nanjing-bucket.oss-cn-nanjing.aliyuncs.com/blog-images/%E6%89%A7%E8%A1%8C%E4%B8%8A%E4%B8%8B%E6%96%877.png)

这样解释应该能理解了。

最后，**eval 不常用，也不推荐大家用**。

下一节我们介绍函数的情况，并一起总结一下执行上下文到底包含哪些内容。敬请期待。

## 简述【执行上下文】下

上一篇我们讲到在全局环境下的代码段中，执行上下文环境中有如何数据：

- 变量、函数表达式——变量声明，默认赋值为 undefined；
- this——赋值；
- 函数声明——赋值；

如果在函数中，除了以上数据之外，还会有其他数据。先看以下代码：

![执行上下文8](https://zfh-nanjing-bucket.oss-cn-nanjing.aliyuncs.com/blog-images/%E6%89%A7%E8%A1%8C%E4%B8%8A%E4%B8%8B%E6%96%878.png)

以上代码展示了在函数体的语句执行之前，arguments 变量和函数的参数都已经被赋值。从这里可以看出，函数每被调用一次，都会产生一个新的执行上下文环境。因为不同的调用可能就会有不同的参数。

另外一点不同在于，函数在定义的时候（不是调用的时候），就已经确定了函数体内部自由变量的作用域。至于“自由变量”和“作用域”是后面要专门拿出来讲述的重点，这里就先点到为止。用一个例子说明一下：

![执行上下文9](https://zfh-nanjing-bucket.oss-cn-nanjing.aliyuncs.com/blog-images/%E6%89%A7%E8%A1%8C%E4%B8%8A%E4%B8%8B%E6%96%879.png)

全局代码的上下文环境数据内容为：

![执行上下文10](https://zfh-nanjing-bucket.oss-cn-nanjing.aliyuncs.com/blog-images/%E6%89%A7%E8%A1%8C%E4%B8%8A%E4%B8%8B%E6%96%8710.png)

如果代码段是函数体，那么在此基础上需要附加：

![执行上下文11](https://zfh-nanjing-bucket.oss-cn-nanjing.aliyuncs.com/blog-images/%E6%89%A7%E8%A1%8C%E4%B8%8A%E4%B8%8B%E6%96%8711.png)

给执行上下文环境下一个通俗的定义——**在执行代码之前，把将要用到的所有的变量都事先拿出来，有的直接赋值了，有的先用 undefined 占个空。**

了解了执行上下文环境中的数据信息，你就不用再去死记硬背那些可恶的面试题了。理解了就不用背诵！

讲完了上下文环境，又来了新的问题——在执行 js 代码时，会有数不清的函数调用次数，会产生许多个上下文环境。这么多上下文环境该如何管理，以及如何销毁而释放内存呢？ 通过“执行上下文栈”来解释这个问题。

不过别着急，在解释“执行上下文栈”之前，还需要把 this 说一下，this 还是挺重要的。

说完 this，接着说执行上下文栈。

## this

接着上一节讲的话，应该轮到“执行上下文栈”了，但是这里不得不插入一节，把 this 说一下。因为 this 很重要，js 的面试题如果不出几个与 this 有关的，那出题者都不合格。

其实，this 的取值，分四种情况。我们来挨个看一下。

在此再强调一遍一个非常重要的知识点：在函数中 this 到底取何值，是在函数真正被调用执行的时候确定的，函数定义的时候确定不了。因为 this 的取值是执行上下文环境的一部分，每次调用函数，都会产生一个新的执行上下文环境。

### 情况 1：构造函数

所谓构造函数就是用来 new 对象的函数。其实严格来说，所有的函数都可以 new 一个对象，但是有些函数的定义是为了 new 一个对象，而有些函数则不是。另外注意，构造函数的函数名第一个字母大写（规则约定）。例如：Object、Array、Function 等。

![this1](https://zfh-nanjing-bucket.oss-cn-nanjing.aliyuncs.com/blog-images/this1.png)

以上代码中，如果函数作为构造函数用，那么其中的 this 就代表它即将 new 出来的对象。

注意，以上仅限 new Foo()的情况，即 Foo 函数作为构造函数的情况。如果直接调用 Foo 函数，而不是 new Foo()，情况就大不一样了。

![this2](https://zfh-nanjing-bucket.oss-cn-nanjing.aliyuncs.com/blog-images/this2.png)

这种情况下 this 是 window，我们后文中会说到。

### 情况 2：函数作为对象的一个属性

如果函数作为对象的一个属性时，并且作为对象的一个属性被调用时，函数中的 this 指向该对象。

![this3](https://zfh-nanjing-bucket.oss-cn-nanjing.aliyuncs.com/blog-images/this3.png)

以上代码中，fn 不仅作为一个对象的一个属性，而且的确是作为对象的一个属性被调用。结果 this 就是 obj 对象。

注意，如果 fn 函数不作为 obj 的一个属性被调用，会是什么结果呢？

![this4](https://zfh-nanjing-bucket.oss-cn-nanjing.aliyuncs.com/blog-images/this4.png)

如上代码，如果 fn 函数被赋值到了另一个变量中，并没有作为 obj 的一个属性被调用，那么 this 的值就是 window，this.x 为 undefined。

### 情况 3：函数用 call 或者 apply 调用

当一个函数被 call 和 apply 调用时，this 的值就取传入的对象的值。

![this5](https://zfh-nanjing-bucket.oss-cn-nanjing.aliyuncs.com/blog-images/this5.png)

### 情况 4 全局 & 调用普通函数

> 非严格模式下!

在全局环境下，this 永远是 window，这个应该没有非议。

```js
console.log(this === window) // true
```

普通函数在调用时，其中的 this 也都是 window。

![this6](https://zfh-nanjing-bucket.oss-cn-nanjing.aliyuncs.com/blog-images/this6.png)

以上代码很好理解。

不过下面的情况**你需要注意一下**：

![this7](https://zfh-nanjing-bucket.oss-cn-nanjing.aliyuncs.com/blog-images/this7.png)

函数 f 虽然是在 obj.fn 内部定义的，但是它仍然是一个普通的函数，this 仍然指向 window。

### 补充

原文中 this 的其中一种情况是构造函数的，具体的内容可以参考原文，此处不再赘述。

要补充的内容是，在构造函数的 prototype 中，this 代表着什么。

![this8](https://zfh-nanjing-bucket.oss-cn-nanjing.aliyuncs.com/blog-images/this8.png)

如上代码，在 Fn.prototype.getName 函数中，this 指向的是 f1 对象。因此可以通过 this.name 获取 f1.name 的值。

其实，**不仅仅是构造函数的 prototype，即便是在整个原型链中，this 代表的也都是当前对象的值。**

## 执行上下文栈

执行全局代码时，会产生一个执行上下文环境，每次调用函数都又会产生执行上下文环境。当函数调用完成时，这个上下文环境以及其中的数据都会被消除，再重新回到全局上下文环境。处于活动状态的执行上下文环境只有一个。

其实这是一个压栈出栈的过程——执行上下文栈。如下图：

![执行上下文栈1](https://zfh-nanjing-bucket.oss-cn-nanjing.aliyuncs.com/blog-images/%E6%89%A7%E8%A1%8C%E4%B8%8A%E4%B8%8B%E6%96%87%E6%A0%881.png)

可根据以下代码来详细介绍上下文栈的压栈、出栈过程。

![执行上下文栈2](https://zfh-nanjing-bucket.oss-cn-nanjing.aliyuncs.com/blog-images/%E6%89%A7%E8%A1%8C%E4%B8%8A%E4%B8%8B%E6%96%87%E6%A0%882.png)

如上代码。

在执行代码之前，首先将创建全局上下文环境。

![执行上下文栈3](https://zfh-nanjing-bucket.oss-cn-nanjing.aliyuncs.com/blog-images/%E6%89%A7%E8%A1%8C%E4%B8%8A%E4%B8%8B%E6%96%87%E6%A0%883.png)

然后是代码执行。代码执行到第 12 行之前，上下文环境中的变量都在执行过程中被赋值。

![执行上下文栈4](https://zfh-nanjing-bucket.oss-cn-nanjing.aliyuncs.com/blog-images/%E6%89%A7%E8%A1%8C%E4%B8%8A%E4%B8%8B%E6%96%87%E6%A0%884.png)

执行到第 13 行，调用 bar 函数。

跳转到 bar 函数内部，执行函数体语句之前，会创建一个新的执行上下文环境。

![执行上下文栈5](https://zfh-nanjing-bucket.oss-cn-nanjing.aliyuncs.com/blog-images/%E6%89%A7%E8%A1%8C%E4%B8%8A%E4%B8%8B%E6%96%87%E6%A0%885.png)

并将这个执行上下文环境压栈，设置为活动状态。

![执行上下文栈6](https://zfh-nanjing-bucket.oss-cn-nanjing.aliyuncs.com/blog-images/%E6%89%A7%E8%A1%8C%E4%B8%8A%E4%B8%8B%E6%96%87%E6%A0%886.png)

执行到第 5 行，又调用了 fn 函数。进入 fn 函数，在执行函数体语句之前，会创建 fn 函数的执行上下文环境，并压栈，设置为活动状态。

![执行上下文栈7](https://zfh-nanjing-bucket.oss-cn-nanjing.aliyuncs.com/blog-images/%E6%89%A7%E8%A1%8C%E4%B8%8A%E4%B8%8B%E6%96%87%E6%A0%887.png)

待第 5 行执行完毕，即 fn 函数执行完毕后，此次调用 fn 所生成的上下文环境出栈，并且被销毁（已经用完了，就要及时销毁，释放内存）。

![执行上下文栈8](https://zfh-nanjing-bucket.oss-cn-nanjing.aliyuncs.com/blog-images/%E6%89%A7%E8%A1%8C%E4%B8%8A%E4%B8%8B%E6%96%87%E6%A0%888.png)

同理，待第 13 行执行完毕，即 bar 函数执行完毕后，调用 bar 函数所生成的上下文环境出栈，并且被销毁（已经用完了，就要及时销毁，释放内存）。

![执行上下文栈9](https://zfh-nanjing-bucket.oss-cn-nanjing.aliyuncs.com/blog-images/%E6%89%A7%E8%A1%8C%E4%B8%8A%E4%B8%8B%E6%96%87%E6%A0%889.png)

好了，我很耐心的给大家介绍了一段简短代码的执行上下文环境的变化过程，一个完整的闭环。其中上下文环境的变量赋值过程我省略了许多，因为那些并不难，一看就知道。

讲到这里，我不得不很遗憾的跟大家说：其实以上我们所演示的是一种比较理想的情况。有一种情况，而且是很常用的一种情况，无法做到这样干净利落的说销毁就销毁。这种情况就是伟大的——**闭包**。

要说闭包，咱们还得先从自由变量和作用域说起。

## 简介【作用域】

> 特别注意：es6 已加入块作用域

提到作用域，有一句话大家（有 js 开发经验者）可能比较熟悉：“**javascript 没有块级作用域**”。所谓“块”，就是大括号“｛｝”中间的语句。例如 if 语句：

![作用域1](https://zfh-nanjing-bucket.oss-cn-nanjing.aliyuncs.com/blog-images/%E4%BD%9C%E7%94%A8%E5%9F%9F1.png)

再比如 for 语句：

![作用域2](https://zfh-nanjing-bucket.oss-cn-nanjing.aliyuncs.com/blog-images/%E4%BD%9C%E7%94%A8%E5%9F%9F2.png)

所以，我们在编写代码的时候，不要在“块”里面声明变量，要在代码的一开始就声明好了。以避免发生歧义。如：

![作用域3](https://zfh-nanjing-bucket.oss-cn-nanjing.aliyuncs.com/blog-images/%E4%BD%9C%E7%94%A8%E5%9F%9F3.png)

其实，你光知道“javascript 没有块级作用域”是完全不够的，你需要知道的是——**javascript 除了全局作用域之外，只有函数可以创建的作用域。**

> 当然这句话现在来说也是错误的，es6 中加入的 let const 会创建块级作用域

所以，我们在声明变量时，全局代码要在代码前端声明，函数中要在函数体一开始就声明好。除了这两个地方，其他地方都不要出现变量声明。而且建议用“单 var”形式。

下面继续说作用域。作用域是一个很抽象的概念，类似于一个“地盘”

![作用域4](https://zfh-nanjing-bucket.oss-cn-nanjing.aliyuncs.com/blog-images/%E4%BD%9C%E7%94%A8%E5%9F%9F4.png)

如上图，全局代码和 fn、bar 两个函数都会形成一个作用域。而且，作用域有上下级的关系，上下级关系的确定就看函数是在哪个作用域下创建的。例如，fn 作用域下创建了 bar 函数，那么“fn 作用域”就是“bar 作用域”的上级。

作用域最大的用处就是**隔离变量**，不同作用域下同名变量不会有冲突。例如以上代码中，三个作用域下都声明了“a”这个变量，但是他们不会有冲突。各自的作用域下，用各自的“a”。

## 【作用域】和【上下文环境】

上文简单介绍了作用域，本文把作用域和上下文环境结合起来说一下，会理解的更深一些。

![【作用域】和【上下文环境】1](https://zfh-nanjing-bucket.oss-cn-nanjing.aliyuncs.com/blog-images/%E3%80%90%E4%BD%9C%E7%94%A8%E5%9F%9F%E3%80%91%E5%92%8C%E3%80%90%E4%B8%8A%E4%B8%8B%E6%96%87%E7%8E%AF%E5%A2%83%E3%80%911.png)

如上图，我们在上文中已经介绍了，除了全局作用域之外，每个函数都会创建自己的作用域，**作用域在函数定义时就已经确定了。而不是在函数调用时确定。**

第一步，在加载程序时，已经确定了全局上下文环境，并随着程序的执行而对变量就行赋值。

![【作用域】和【上下文环境】2](https://zfh-nanjing-bucket.oss-cn-nanjing.aliyuncs.com/blog-images/%E3%80%90%E4%BD%9C%E7%94%A8%E5%9F%9F%E3%80%91%E5%92%8C%E3%80%90%E4%B8%8A%E4%B8%8B%E6%96%87%E7%8E%AF%E5%A2%83%E3%80%912.png)

第二步，程序执行到第 27 行，调用 fn(10)，此时生成此次调用 fn 函数时的上下文环境，压栈，并将此上下文环境设置为活动状态。

![【作用域】和【上下文环境】3](https://zfh-nanjing-bucket.oss-cn-nanjing.aliyuncs.com/blog-images/%E3%80%90%E4%BD%9C%E7%94%A8%E5%9F%9F%E3%80%91%E5%92%8C%E3%80%90%E4%B8%8A%E4%B8%8B%E6%96%87%E7%8E%AF%E5%A2%83%E3%80%913.png)

第三步，执行到第 23 行时，调用 bar(100)，生成此次调用的上下文环境，压栈，并设置为活动状态。

![【作用域】和【上下文环境】4](https://zfh-nanjing-bucket.oss-cn-nanjing.aliyuncs.com/blog-images/%E3%80%90%E4%BD%9C%E7%94%A8%E5%9F%9F%E3%80%91%E5%92%8C%E3%80%90%E4%B8%8A%E4%B8%8B%E6%96%87%E7%8E%AF%E5%A2%83%E3%80%914.png)

第四步，执行完第 23 行，bar(100)调用完成。则 bar(100)上下文环境被销毁。接着执行第 24 行，调用 bar(200)，则又生成 bar(200)的上下文环境，压栈，设置为活动状态。

![【作用域】和【上下文环境】5](https://zfh-nanjing-bucket.oss-cn-nanjing.aliyuncs.com/blog-images/%E3%80%90%E4%BD%9C%E7%94%A8%E5%9F%9F%E3%80%91%E5%92%8C%E3%80%90%E4%B8%8A%E4%B8%8B%E6%96%87%E7%8E%AF%E5%A2%83%E3%80%915.png)

第五步，执行完第 24 行，则 bar(200)调用结束，其上下文环境被销毁。此时会回到 fn(10)上下文环境，变为活动状态。

![【作用域】和【上下文环境】6](https://zfh-nanjing-bucket.oss-cn-nanjing.aliyuncs.com/blog-images/%E3%80%90%E4%BD%9C%E7%94%A8%E5%9F%9F%E3%80%91%E5%92%8C%E3%80%90%E4%B8%8A%E4%B8%8B%E6%96%87%E7%8E%AF%E5%A2%83%E3%80%916.png)

第六步，执行完第 27 行代码，fn(10)执行完成之后，fn(10)上下文环境被销毁，全局上下文环境又回到活动状态。
![【作用域】和【上下文环境】7](https://zfh-nanjing-bucket.oss-cn-nanjing.aliyuncs.com/blog-images/%E3%80%90%E4%BD%9C%E7%94%A8%E5%9F%9F%E3%80%91%E5%92%8C%E3%80%90%E4%B8%8A%E4%B8%8B%E6%96%87%E7%8E%AF%E5%A2%83%E3%80%917.png)

最后我们可以把以上这几个图片连接起来看看。

![【作用域】和【上下文环境】8](https://zfh-nanjing-bucket.oss-cn-nanjing.aliyuncs.com/blog-images/%E3%80%90%E4%BD%9C%E7%94%A8%E5%9F%9F%E3%80%91%E5%92%8C%E3%80%90%E4%B8%8A%E4%B8%8B%E6%96%87%E7%8E%AF%E5%A2%83%E3%80%918.png)

连接起来看，还是挺有意思的。**作用域只是一个“地盘”，一个抽象的概念，其中没有变量。要通过作用域对应的执行上下文环境来获取变量的值。同一个作用域下，不同的调用会产生不同的执行上下文环境，继而产生不同的变量的值。所以，作用域中变量的值是在执行过程中产生的确定的，而作用域却是在函数创建时就确定了。**

所以，如果要查找一个作用域下某个变量的值，就需要找到这个作用域对应的执行上下文环境，再在其中寻找变量的值。

虽然本文很长，但是文字较少，图片居多，图片都有形象的展示，大家花十几分钟也能慢慢看完。但是，这节内容真的很重要。

以上代码中，咱们还没有设计到跨作用域取值的情况，即——自由变量。详细内容且听下回分解。

## 从【自由变量】到【作用域链】

先解释一下什么是“自由变量”。

在 A 作用域中使用的变量 x，却没有在 A 作用域中声明（即在其他作用域中声明的），对于 A 作用域来说，x 就是一个自由变量。如下图

![从【自由变量】到【作用域链】1](https://zfh-nanjing-bucket.oss-cn-nanjing.aliyuncs.com/blog-images/%E4%BB%8E%E3%80%90%E8%87%AA%E7%94%B1%E5%8F%98%E9%87%8F%E3%80%91%E5%88%B0%E3%80%90%E4%BD%9C%E7%94%A8%E5%9F%9F%E9%93%BE%E3%80%911.png)

如上程序中，在调用 fn()函数时，函数体中第 6 行。取 b 的值就直接可以在 fn 作用域中取，因为 b 就是在这里定义的。而取 x 的值时，就需要到另一个作用域中取。到哪个作用域中取呢？

有人说过**要到父作用域中取，其实有时候这种解释会产生歧义**。例如：

![从【自由变量】到【作用域链】2](https://zfh-nanjing-bucket.oss-cn-nanjing.aliyuncs.com/blog-images/%E4%BB%8E%E3%80%90%E8%87%AA%E7%94%B1%E5%8F%98%E9%87%8F%E3%80%91%E5%88%B0%E3%80%90%E4%BD%9C%E7%94%A8%E5%9F%9F%E9%93%BE%E3%80%912.png)

所以，不要在用以上说法了。相比而言，用这句话描述会更加贴切——**要到创建这个函数的那个作用域中取值**——是“创建”，而不是“调用”，切记切记——其实这就是**所谓的“静态作用域”。**

::: tip 区分静态（词法）作用域和动态作用域

词法作用域： 在代码书写的时候完成划分，作用域链沿着它**定义的位置**往外延伸

动态作用域： 在代码运行时完成划分，作用域链沿着它的**调用栈**往外延伸
:::

对于本文第一段代码，在 fn 函数中，取自由变量 x 的值时，要到哪个作用域中取？——要到创建 fn 函数的那个作用域中取——无论 fn 函数将在哪里调用。

上面描述的只是跨一步作用域去寻找。

如果跨了一步，还没找到呢？——接着跨！——一直跨到全局作用域为止。要是在全局作用域中都没有找到，那就是真的没有了。

这个一步一步“跨”的路线，我们称之为——作用域链。

我们拿文字总结一下取自由变量时的这个“作用域链”过程：（假设 a 是自由变量）

第一步，现在当前作用域查找 a，如果有则获取并结束。如果没有则继续；

第二步，如果当前作用域是全局作用域，则证明 a 未定义，结束；否则继续；

第三步，（不是全局作用域，那就是函数作用域）将创建该函数的作用域作为当前作用域；

第四步，跳转到第一步。

![从【自由变量】到【作用域链】3](https://zfh-nanjing-bucket.oss-cn-nanjing.aliyuncs.com/blog-images/%E4%BB%8E%E3%80%90%E8%87%AA%E7%94%B1%E5%8F%98%E9%87%8F%E3%80%91%E5%88%B0%E3%80%90%E4%BD%9C%E7%94%A8%E5%9F%9F%E9%93%BE%E3%80%913.png)

以上代码中：第 13 行，fn()返回的是 bar 函数，赋值给 x。执行 x()，即执行 bar 函数代码。取 b 的值时，直接在 fn 作用域取出。取 a 的值时，试图在 fn 作用域取，但是取不到，只能转向创建 fn 的那个作用域中去查找，结果找到了。

这一节看似很轻松的把作用域链引出来，并讲完了。之所有轻松是有前几节的基础，否则将很难解释。

接下来咱们开始正式说说一直期待依旧的朋友——闭包。敬请期待下一节。

## 闭包

前面提到的上下文环境和作用域的知识，除了了解这些知识之外，还是理解闭包的基础。

至于“闭包”这个词的概念的文字描述，确实不好解释，我看过很多遍，但是现在还是记不住。

但是你只需要知道应用的两种情况即可——**函数作为返回值**，**函数作为参数传递**。

### 第一，函数作为返回值

![闭包1](https://zfh-nanjing-bucket.oss-cn-nanjing.aliyuncs.com/blog-images/%E9%97%AD%E5%8C%851.png)
如上代码，bar 函数作为返回值，赋值给 f1 变量。执行 f1(15)时，用到了 fn 作用域下的 max 变量的值。至于如何跨作用域取值，可以参考上一节。

### 第二，函数作为参数被传递

![闭包2](https://zfh-nanjing-bucket.oss-cn-nanjing.aliyuncs.com/blog-images/%E9%97%AD%E5%8C%852.png)

如上代码中，fn 函数作为一个参数被传递进入另一个函数，赋值给 f 参数。执行 f(15)时，max 变量的取值是 10，而不是 100。

上一节讲到自由变量跨作用域取值时，曾经强调过：要去创建这个函数的作用域取值，而不是“父作用域”。理解了这一点，以上两端代码中，自由变量如何取值应该比较简单。（不明白的朋友一定要去上一节看看，这个很重要！）

另外，讲到闭包，除了结合着作用域之外，还需要结合着执行上下文栈来说一下。

在前面讲执行上下文栈时，我们提到当一个函数被调用完成之后，其执行上下文环境将被销毁，其中的变量也会被同时销毁。

但是在当时那篇文章中留了一个问号——有些情况下，函数调用完成之后，其执行上下文环境不会接着被销毁。这就是需要理解闭包的核心内容。

咱们可以拿本文的第一段代码（稍作修改）来分析一下。

![闭包3](https://zfh-nanjing-bucket.oss-cn-nanjing.aliyuncs.com/blog-images/%E9%97%AD%E5%8C%851.png)

第一步，代码执行前生成全局上下文环境，并在执行时对其中的变量进行赋值。此时全局上下文环境是活动状态。

![闭包4](https://zfh-nanjing-bucket.oss-cn-nanjing.aliyuncs.com/blog-images/%E9%97%AD%E5%8C%854.png)

第二步，执行第 17 行代码时，调用 fn()，产生 fn()执行上下文环境，压栈，并设置为活动状态。

![闭包5](https://zfh-nanjing-bucket.oss-cn-nanjing.aliyuncs.com/blog-images/%E9%97%AD%E5%8C%855.png)

第三步，执行完第 17 行，fn()调用完成。按理说应该销毁掉 fn()的执行上下文环境，但是这里不能这么做。注意，**重点来了**：因为执行 fn()时，返回的是一个函数。函数的特别之处在于可以创建一个独立的作用域。而正巧合的是，返回的这个函数体中，还有一个自由变量 max 要引用 fn 作用域下的 fn()上下文环境中的 max。因此，这个 max 不能被销毁，销毁了之后 bar 函数中的 max 就找不到值了。

因此，这里的 fn()上下文环境不能被销毁，还依然存在与执行上下文栈中。

——即，执行到第 18 行时，全局上下文环境将变为活动状态，但是 fn()上下文环境依然会在执行上下文栈中。另外，执行完第 18 行，全局上下文环境中的 max 被赋值为 100。如下图：

![闭包6](https://zfh-nanjing-bucket.oss-cn-nanjing.aliyuncs.com/blog-images/%E9%97%AD%E5%8C%856.png)

第四步，执行到第 20 行，执行 f1(15)，即执行 bar(15)，创建 bar(15)上下文环境，并将其设置为活动状态。

![闭包7](https://zfh-nanjing-bucket.oss-cn-nanjing.aliyuncs.com/blog-images/%E9%97%AD%E5%8C%857.png)

执行 bar(15)时，max 是自由变量，需要向创建 bar 函数的作用域中查找，找到了 max 的值为 10。这个过程在作用域链一节已经讲过。

这里的重点就在于，创建 bar 函数是在执行 fn()时创建的。fn()早就执行结束了，但是 fn()执行上下文环境还存在与栈中，因此 bar(15)时，max 可以查找到。如果 fn()上下文环境销毁了，那么 max 就找不到了。

**使用闭包会增加内容开销**，现在很明显了吧！

第五步，执行完 20 行就是上下文环境的销毁过程，这里就不再赘述了。

**闭包和作用域、上下文环境有着密不可分的关系**，真的是“想说爱你不容易”！

**无论你是想了解一个经典的框架/类库，还是想自己开发一个插件或者类库，像闭包、原型这些基本的理论，是一定要知道的。否则，到时候出了 BUG 你都不知道为什么，因为这些 BUG 可能完全在你的知识范围之外。**

## 补充：上下文环境和作用域的关系

本系列用了大量的篇幅讲解了上下文环境和作用域，有些人反映这两个是一回儿事。本文就用一个小例子来说明一下，作用域和上下文环境绝对不是一回事儿。

再说明之前，咱们先用简单的语言来概括一下这两个的区别。

1. 上下文环境：

可以理解为一个看不见摸不着的**对象**（有若干个属性），虽然看不见摸不着，但确实实实在在存在的，因为所有的变量都在里面存储着，要不然咱们定义的变量在哪里存？

另外，对于函数来说，上下文环境是在调用时创建的，这个很好理解。拿参数做例子，你不调用函数，我哪儿知道你要给我传什么参数？

2. 作用域：

   > 这句话现在看来是错误的

首先，它很抽象。第二，记住一句话：**除了全局作用域，只有函数才能创建作用域**。创建一个函数就创建了一个作用域，无论你调用不调用，函数只要创建了，它就有独立的作用域，就有自己的一个“地盘”。

3. 两者：

一个作用域下可能包含若干个上下文环境。有可能从来没有过上下文环境（函数从来就没有被调用过）；有可能有过，现在函数被调用完毕后，上下文环境被销毁了；有可能同时存在一个或多个（闭包）。

上面的文字不理解没关系，且看下面的例子。

第一，除了全局作用域外，每个函数都要创建一个作用域。作用域之间的变量是相互独立的。因此，全局作用域中的 x 和 fn 作用域中的 x，两者毫无关系，互不影响，和平相处。

![上下文环境和作用域的关系](https://zfh-nanjing-bucket.oss-cn-nanjing.aliyuncs.com/blog-images/%E4%B8%8A%E4%B8%8B%E6%96%87%E7%8E%AF%E5%A2%83%E5%92%8C%E4%BD%9C%E7%94%A8%E5%9F%9F%E7%9A%84%E5%85%B3%E7%B3%BB.png)

第二，程序执行之前，会生成全局上下文环境，并在程序执行时，对其中的变量赋值。

![上下文环境和作用域的关系2](https://zfh-nanjing-bucket.oss-cn-nanjing.aliyuncs.com/blog-images/%E4%B8%8A%E4%B8%8B%E6%96%87%E7%8E%AF%E5%A2%83%E5%92%8C%E4%BD%9C%E7%94%A8%E5%9F%9F%E7%9A%84%E5%85%B3%E7%B3%BB2.png)

第三，程序执行到第 17 行，调用 fn(5)，会产生 fn(5)的上下文环境，并压栈，并设置为活动状态。

![上下文环境和作用域的关系3](https://zfh-nanjing-bucket.oss-cn-nanjing.aliyuncs.com/blog-images/%E4%B8%8A%E4%B8%8B%E6%96%87%E7%8E%AF%E5%A2%83%E5%92%8C%E4%BD%9C%E7%94%A8%E5%9F%9F%E7%9A%84%E5%85%B3%E7%B3%BB3.png)

第四，执行完第 17 行，fn(5)的返回值赋值给了 f1。此时执行上下文环境又重新回到全局，但是 fn(5)的上下文环境不能就此销毁，因为其中有闭包的引用（可翻看前面文章，此处不再赘述）。

![上下文环境和作用域的关系4](https://zfh-nanjing-bucket.oss-cn-nanjing.aliyuncs.com/blog-images/%E4%B8%8A%E4%B8%8B%E6%96%87%E7%8E%AF%E5%A2%83%E5%92%8C%E4%BD%9C%E7%94%A8%E5%9F%9F%E7%9A%84%E5%85%B3%E7%B3%BB4.png)

::: tip 转载自
**王福朋**[深入理解 javascript 原型和闭包（完结）](https://www.cnblogs.com/wangfupeng1988/p/3977924.html)
:::
