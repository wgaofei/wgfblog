---
title: HTML5
icon: html
category: 前端基石
order: 1
---

## html5 骨架

::: warning 注意
请始终向 `HTML` 文档添加 `<!DOCTYPE>` 声明，这样浏览器才能获知文档类型。
:::

```html
<!DOCTYPE html>
<html>
  <head>
    <title>文档的标题</title>
  </head>

  <body>
    文档的内容......
  </body>
</html>
```

- `<!DOCTYPE>`声明必须是 `HTML`文档的第一行，位于 `html`标签之前。
- `<!DOCTYPE>`声明不是 `HTML` 标签；它是指示 `web` 浏览器关于页面使用哪个 `HTML` 版本进行编写的指令。
- 在 `HTML 4.01`中，`<!DOCTYPE>`声明引用 `DTD`，因为 `HTML 4.01`基于`SGML`。`DTD` 规定了标记语言的规则，这样浏览器才能正确地呈现内容。
- `HTML5`不基于`SGML`，所以不需要引用`DTD`，在 `HTML 4.01` 中有三种 `<!DOCTYPE>` 声明。在 `HTML5` 中只有一种：`<!DOCTYPE html>`

### `<!DOCTYPE html>`的重要性

声明文档的解析类型(`document.compatMode`)，**避免浏览器的`怪异模式`**

`document.compatMode`：

- **`BackCompat`**：怪异模式，浏览器使用自己的怪异模式解析渲染页面。
- **`CSS1Compat`**：标准模式，浏览器使用 W3C 的标准解析渲染页面。

这个属性会被浏览器识别并使用，但是如果你的页面没有`<!DOCTYPE>`的声明，那么`compatMode`默认就是`BackCompat`,

浏览器按照自己的方式解析渲染页面，那么，在不同的浏览器就会显示不同的样式。

如果你的页面添加了`<!DOCTYPE html>`那么，那么就等同于开启了标准模式，那么浏览器就得老老实实的按照`W3C`的标准解析渲染页面，这样一来，你的页面在所有的浏览器里显示的就都是一个样子了。

## 字符集

::: warning 注意
无论使用哪种字符集，一定要在`Vscode`编辑器中将文件也设置为相同字符集，否则会岀现乱码，然后更改`meta`标签
:::

|   字符集    |                               涵盖字符                                | 一个汉字字节数 |                                适用场景                                 |
| :---------: | :-------------------------------------------------------------------: | :------------: | :---------------------------------------------------------------------: |
|    UTF-8    |              涵盖全球所有国家、民族的文字和大量图形字符               |       3        |                         制作有非汉字文字的网页                          |
| Gb2312(gbk) | 收录所有汉字字符（包括简体、繁体)和英语、少量韩文、日语和少量图形字符 |       2        | 制作只有汉语和英语的网页 由于 1 个汉字仅占 2 字节，网页文件尺寸明显减少 |

```html
<!-- meta：元标签，表示网页的基本配置 -->
<!-- charset：字符集 -->
<meta charset="UTF-8" />
```

## title,关键词及页面描述

### title 的用途

1.  `title`标签用来设置网页的标题，文字会显示在浏览器的签栏上
2.  `title`也是搜索引擎收录网站时显示的标题，为了吸引用户点击，合理设置`title`是必要的

### 网页关键词和页面描述

1. 合理设置网页的网页的关键词和页面描述，也是`SEO`的重要手段

`SEO`（ `Search Engine Optimization`，搜索引擎优化）利用搜索引擎的规则提高网站在有关搜索引擎內的自然排名,让网站在搜索引擎的结果中占据领先地位，获得品牌收益

2. 使用`meta`标签**设置**网页关键词和描述，`name`属性非常关键,用来设置`meta`的具体功能

```html
<meta name="keywords" content="前端,JavaScript,Vue,React" />
<meta name="description" content="一个前端学习博客" />
```

3. 其他 meta:[HTML meta 标签 看这篇就够了](https://juejin.cn/post/6844904099184377870)

## 标题和段落标签

```html
<h1>
  ~
  <h6></h6>
</h1>
```

- 搜索引擎非常看重`h1`标签的内容，应该将重点内容放到`h1`中，比如网页的`logo`等

- `h1`标签一般只能**放置一个**

```html
<p>this is a p</p>
```

- 任何段落**都要**放到`p`标签中，因为`HTML`中即使代码换行了，页面显示效果也不会换行

- **`p`元素嵌套任何块级元素都一定会被浏览器错误解析**

## div 标签

`div`像是一个容器，什么都可以容纳，因此一般被称呼为**盒子**

## HTML5 特性

### 空白折叠现象

1. 文字和文字之间的多个空格、换行会被折叠成一个空格
2. 标签“内壁”和文字之间的空格会被忽略

### 转义字符

```html
<!-- //小于号 -->
&lt;
<!-- //大于号 -->
&gt;
<!-- //空格（不会被折叠） -->
&nbsp;
<!--  //版权符号 -->
&copy;
```

## 列表标签

```html
<!-- 无序列表 -->
<ul></ul>
<!-- 有序列表 -->
<ol></ol>
<!-- 定义列表 -->
<dl>
  <dt></dt>
  <dd></dd>
</dl>
```

注意：

- `li`标签是不能单独使用的，它必须放到`ul`或`ol`中
- `ul`和`ol`的子标签只能是`li`
- `li`标签中可以放**任何标签**

### 有序列表 ol

#### ol 标签的 type 属性

| type 属性值 |         意义         |
| :---------: | :------------------: |
|      a      | 表示小写英文字母编号 |
|      A      | 表示大写英文字母编号 |
|      ¡      | 表示小写罗马数字编号 |
|      Ⅰ      | 表示大写罗马数字编号 |
|      1      | 表示数字编号（默认） |

#### ol 标签的 start 属性

1.`start`属性值必须是一个整数，指定了列表编号的起始值

2. 此属性的值应为阿拉伯数字，尽管列表条目的编号类型`type`属性可能指定为了罗马数字编号等其他类型的编号

#### ol 标签的 reversed 属性

1. `reversed`属性指定列表中的条目是否是倒序排列的

2. `reversed`属性不需要值，只需要写`reversed`单词即可，这是`HTML5`的全新特性

### 定义列表 dl

- 需要逐条给出定义描述的列表就是定义列表
- 只要语义上有“解释说明”含义的文字，且为列表形态，应该使用定义列表。

```html
<!-- 定义列表 -->
<dl>
  <!-- 数据项  -->
  <dt></dt>
  <!--数据定义  -->
  <dd></dd>
</dl>
```

- 一个例子:

```html
<!-- <dl>是定义列表标签，内容交替出现<dt>、<dd>标签 -->
<dl>
  <dt>手机</dt>
  <dd>iphone</dd>
  <dd>xiaomi</dd>
  <dd>huawei</dd>
  <dt>电脑</dt>
  <dd>联想</dd>
  <dd>HP</dd>
  <dd>DELL</dd>
</dl>
<!-- 也允许dt和dd不交替出现，而是分别处于不同的定义列表中 -->
<dl>
  <dt>手机</dt>
  <dd>iphone</dd>
  <dd>xiaomi</dd>
  <dd>huawei</dd>
  <dt>电脑</dt>
</dl>
<dl>
  <dd>联想</dd>
  <dd>HP</dd>
  <dd>DELL</dd>
</dl>
```

## 多媒体标签

### img 标签

::: tip 提示
如果需要回退层级，使用`../`这样的写法,`./`是当前目录
:::

1.  `alt`属性：由于某种原因**无法加载图像**，浏览器会在页面上显示`alt`属性中的备用文本
2.  相对路径：描述从网页出发，如何找到图片
3.  绝对路径：描述图片**精准地址**

### a 标签

::: warning 注意
**`a`元素嵌套`a` 元素会导致所有浏览器解析错误**,但`a` 元素可以嵌套其他的内联元素(比如:`img`)
:::

1. `href`属性：规定链接的`目标地址`,支持`相对路径`和`绝对路径`

2. `title`属性：用于设置鼠标的悬停文本

3. 在新窗口打开网页：将`target`属性设置为`blank`

4. 给图片设置超级链接：用 `a` 标签包裹 `img` 标签

5. 页面内锚点：较长的页面，可以适当的给 `h` 系列标签添加 `id`属性，它将成为页面的“锚点”;当网址后面添加#时，页面将自动滚动到锚点所在位置;其他页面的超级链接，可以链接到指定锚点

```html
<a href="1.html#baoji">baoji</a>
```

### audio 标签

```html
<audio controls src="音频地址"></audio>
```

1. `autoplay`属性：声明 autopaly 会自动播放音乐
2. `loop`属性：声明 loop 属性会循环播放音频
3. `controls`属性: 显示控制面板
4. `muted`: 静音

### video 标签

使用方法，属性和`audio`类似，不赘述。

## 语义化标签

**语义化的标签，旨在让标签有自己的含义**

![语义化](https://zfh-nanjing-bucket.oss-cn-nanjing.aliyuncs.com/blog-images/%E8%AF%AD%E4%B9%89%E5%8C%96.png)

```html
<p>一行文字</p>
<span>一行文字</span>
```

如上代码，`p` 标签与 `span` 标签都区别之一就是，`p` 标签的含义是：段落。而 `span` 标签责没有独特的含义。

### 语义化标签的优势

- **代码结构**: 使页面没有 `css`的情况下，也能够呈现出很好的内容结构

- **有利于 SEO**: 爬虫依赖标签来确定关键字的权重，因此可以和搜索引擎建立良好的沟通，帮助爬虫抓取更多的有效信息

- **提升用户体验**： 例如 `title`、`alt` 可以用于解释名称或者解释图片信息，以及 `label` 标签的灵活运用。

- **便于团队开发和维护**: 语义化使得代码更具有可读性，让其他开发人员更加理解你的 `html` 结构，减少差异化

- **方便其他设备解析**: 如屏幕阅读器、盲人阅读器、移动设备等，以有意义的方式来渲染网页

### 常见的语义化标签

#### h1~h6 元素

定义页面的标题，`h1` 元素具有最高等级，`h6`元素具有最低的等级

#### header 标签

用于定义页面的介绍展示区域，通常包括网站 `logo`、主导航、全站链接以及搜索框。也适合对页面内部一组介绍性或导航性内容进行标记。

```html
<header>
  <h1>HTML Reference</h1>
  <nav>
    <a>Home</a>
    <a>About</a>
    <a>Contact</a>
  </nav>
</header>
```

#### nav 标签

定义导航链接的部分

```html
<nav>
  <a>Home</a>
  <a>About</a>
  <a>Contact</a>
</nav>
```
#### main 标签

定义页面的主要内容 

```html
<main>
  <h1>My blog test</h1>
  <p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec viverra nec
    nulla vitae mollis.
  </p>
  <p>etc.</p>
</main>
```
#### footer 标签

定义文档的底部区域，通常包含文档的作者，著作权信息，链接的使用条款，联系信息等


## 表格标签


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
    <!-- 这种写法已被废弃 -->
    <table border="1">
      <!-- 表格的标题 -->
      <caption>
        数字表
      </caption>
      <tr>
        <!-- 标题单元格 -->
        <th>1</th>
        <th>2</th>
        <th>3</th>
      </tr>
      <tr>
        <td>4</td>
        <td>5</td>
        <td>6</td>
      </tr>
      <tr>
        <td>5</td>
        <td>8</td>
        <td>9</td>
      </tr>
    </table>
  </body>
</html>
```

### 单元格的合并

- `colspan`属性:用来设置 td 或 th 的列跨度
- `rowspan`属性:用来设置 td 或 th 的行跨度

### 表格的其他特征

- `< thead >`标签定义表头
- `< tbody >`标签定义表核心内容
- `< tfoot >`标签定义表脚，通常是汇总行

```html
<table border="1">
  <thead>
    <tr>
      <th>Month</th>
      <th>Savings</th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>January</td>
      <td>$100</td>
    </tr>
    <tr>
      <td>February</td>
      <td>$80</td>
    </tr>
  </tbody>

  <tfoot>
    <tr>
      <td>Sum</td>
      <td>$180</td>
    </tr>
  </tfoot>
</table>
```

## 表单标签

### 表单的创建

表单用来收集信息，比如注册、登录、发送评论反馈、购买商品等等

- `action`属性表示表单要提交到的后台程序的网址(现在基本用不到了)
- `method`属性表示表单提交的方式，有 get 或 post(现在基本用不到了)
- `onsubmit`:onsubmit 事件在表单提交时触发

```html
<form action="" method="" onsubmit="myFunction()"></form>
```

### 单行文本框

- `value`属性表示已经填写好的值

```html
<input type="text" value="zfh" />
```

- `placeholder`属性表示提示文本，将以浅色文字写在文本框中，并不是文本框中的值

```html
<input type="text" placeholder="请输入姓名" />
```

- `disabled` 属性表示用户不能与元素交互，即“锁死"

```html
<input type="text" disabled />
```

### 单选按钮

- 互斥的单选按钮应该设置它们的`name`为相同值
- 单选按钮要有`value`属性值，向服务器提交的就是 value 值
- 单选按钮如果加上了`checked`属性，表示默认被选中

```html
男<input type="radio" name="sex" value="男" /> 女<input
  type="radio"
  name="sex"
  value="女"
  checked
/>
```

### label 标签

`label`标签用来将文字和单选按钮进行绑定，用户单击文字的时候也视为点击了单选按钮

```html
<label> 男<input type="radio" name="sex" value="男" /> </label>

<label> 女<input type="radio" name="sex" value="女" /> </label>
```

### 复选框

- 同组复选框应该设置它们的`name`为相同值
- 复选框要有 `value`属性值，向服务器提交的就是 value 值
- 多选按钮如果加上了 `checked`属性，表示默认被选中

```html
<input type="checkbox" name="province" value="sx" />陕西
<input type="checkbox" name="province" value="sc" />四川
<input type="checkbox" name="province" value="hb" checked />湖北
```

### 密码框

使用`type`属性值被设置为`password`的 `input` 元素可以创建密码框

### 下拉菜单

- `<select>`标签表示下拉菜单，`<option>`是它内部的选项
- `value`是提交到服务器的值
- `selected`表示默认被选中

```html
<select>
  <option value="alipay">支付宝</option>
  <option value="vx">微信</option>
  <option value="dy" selected>抖音</option>
</select>
```

### 多行文本框

`<textarea></textarea>`表示多行文本框；`rows`和`cols`属性，用于定义多行文本框的行数和列数

### 三种按钮

```html
// 普通按钮 ，可以简写为<button></button>
// value代表按钮上的文字
<input type="button" value="普通按钮" />
// 重置按钮
<input type="reset" value="重置按钮" />
// 提交按钮
<input type="submit" value="提交按钮" />
```

### datalist 控件

`datalist`控件可以为输入框提供一些备选项，当用户输入的内容与备选项文字相同时，将会显示智能感应

```html
<input type="text" list="province-list" />
<datalist id="province-list">
  <option value="山东"></option>
  <option value="陕西"></option>
  <option value="云南"></option>
  <option value="贵州"></option>
</datalist>
```
