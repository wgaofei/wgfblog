---
title: React中的CSS
category:
  - 前端框架
  - React
order: 2
icon: css
---

> 事实上，`css` 一直是 `React` 的痛点， 在这一点上，`Vue` 做的要确实要好于 `React`，`React` 官方并没有给出在 `React` 中统一的样式风格，以下介绍几种 `React` 中的 `CSS` 解决方案

## 内联样式

内联样式是官方推荐的一种 `css` 样式的写法：

- `style` 接受一个采用小驼峰命名属性的 `JavaScript` 对象
- 并且可以引用 `state` 中的状态来设置相关的样式

内联样式的优点:

- 内联样式, 样式之间不会有冲突
- 可以动态获取当前 `state` 中的状态

内联样式的缺点：

- 写法上都需要使用驼峰标识
- 某些样式没有提示
- 大量的样式, 代码混乱
- 某些样式无法编写(比如伪类/伪元素)

所以官方依然是希望内联样式和普通的` css` 来结合编写

## 普通的 css

普通的 css 我们通常会编写到一个单独的文件，之后再进行引入

这样的编写方式和普通的网页开发中编写方式是一致的

组件化开发中我们总是希望组件是一个独立的模块，即便是样式也只是在自己内部生效，不会相互影响。但是普通的 css 都属于全局的 css，**样式之间会相互影响**

这种编写方式最大的问题是样式之间会相互层叠掉

## css modules

[css modules](https://www.ruanyifeng.com/blog/2016/06/css_modules.html)并不是`React`特有的解决方案，而是所有使用了类似于`webpack`配置的环境下都可以使用的

`React`的脚手架已经内置了`css modules`的配置：`.css/.less/.scss `等样式文件都修改成 `.module.css/.module.less/.module.scss` ，之后就可以引用并且进行使用了

`css modules`确实解决了局部作用域的问题，也是很多人喜欢在`React`中使用的一种方案

但是这种方案也有自己的缺陷：

- 引用的类名，不能使用连接符`(.home-title)`，在`JavaScript`中是不识别的
- 所有的`className`都必须使用`{style.className} `的形式来编写,编写较为繁琐

`css modules` 动态控制`className`:

::: code-tabs

@tab 使用函数抽离（适合多条件判断）

```jsx
const buttonClassChange = () => {
  if (cart.totalAmount > 0) {
    return style.button
  } else if ((cart.totalAmount = 0)) {
    return style.noMealButton
  } else {
    return style.otherButton
  }
}
// jsx
;<div className={buttonClassChange()}>我是一个按钮</div>
```

@tab 三元运算符

```jsx
<div className={cart.totalAmount > 0 ? style.button : style.noMealButton}>
  {props.buttonText}
</div>
```

@tab 运算符判断

```jsx
<div className={(cart.totalAmount > 0 && style.button) || style.noMealButton}>
  {props.buttonText}
</div>
```

@tab 模板字符串拼接

```jsx
<div
  className={`${style.button} ${cart.totalAmount === 0 && style.noMealButton}`}
>
  {props.buttonText}
</div>
```

:::

## CSS in JS

“`CSS-in-JS`” 是指一种模式，其中 `CSS` 由 `JavaScript` 生成而不是在外部文件中定义；注意此功能并不是` React`的一部分，而是由第三方库提供



<center>
  <img src='https://styled-components.com/logo.png'/>
</center>





[styled-component](https://styled-components.com/docs)是社区最流行的` CSS-in-JS` 库

安装 `styled-components`:

::: code-tabs

@tab npm

```bash
npm install styled-components
```

@tab yarn

```bash
yarn add styled-components
```

:::

`styled-components` 的本质是创建出一个组件：这个组件会被自动添加上一个不重复的 `class`,`styled-components` 会给该` class` 添加相关的样式

另外，它支持类似于 `CSS `预处理器一样的特性：

- 支持样式嵌套，如嵌套后代选择器

- 可以通过`&`符号获取当前元素

- 使用伪类选择器、伪元素等

```css
const AppWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #f1f1f1;
   .color{
    width: 200px;
    height: 200px;
    background-color: red;
  }
  &:hover{
    background-color: red;
  }
  a:hover{
    color:#f6d365;
  }
  a::before{
    content:"✨";
    font-size: 100px;
  }
`
```

::: tip 提示

`style-conpontents`非常强大，此处并非是`sc`的全部特性，这些说到的点已经可以可以结合 `react`高效编写`css`了

:::

### props 穿透

`props` 可以被传递给` styled` 组件,`style-compontents`可以自动过滤非`html`标签属性，并将标准 `html` 属性映射到组件 `html` 结构最外层的标签上

```jsx
// value,className会映射至组件 html 结构最外层的标签上
<MyInput
  value="这是我的输入组件"
  onChange={inputChange}
  className="myInput"
></MyInput>
```

获取 `props` 需要通过`${}`传入一个函数，`props `会作为该函数的参数,这种方式可以有效的解决**动态样式**的问题

```jsx
import styled from 'styled-components'
import { useState } from 'react'

const MyButton = styled.button``

const AppWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: ${(props) => (props.show ? 'black' : 'red')};
`

function App(props) {
  const [show, setShow] = useState(false)
  return (
    <AppWrapper show={show}>
      <MyButton
        onClick={() => {
          setShow(!show)
        }}
      >
        切换背景色
      </MyButton>
    </AppWrapper>
  )
}

export default App
```

### 扩展样式

```css
const MainButtion = styled.div`
  color: #000;
  font-size: 30px;
  padding: 8px 30px;
`
/* 对MainButton组件样式进行扩展 */
const MenuButton = styled(MainButton)`
  background-color: red;
`
```

### 扩展非styled组件的样式

如果想要扩展非`styled`组件的样式，前提是把`className`作为`props`传递给`DOM`元素

其他`props`会传递给被扩展的组件,像使用被扩展组件一样，使用`styled`组件

`Ant Desgin`的组件均支持传递`className`给组件根 `dom `节点 

```jsx
const Link = ({ className, children }) => (
  <a className={className}>
    {children}
  </a>
);

const StyledLink = styled(Link)`
  color: palevioletred;
  font-weight: bold;
`;

render(
  <div>
    <Link>Unstyled, boring Link</Link>
    <br />
    <StyledLink>Styled, exciting Link</StyledLink>
  </div>
);
```



