---
title: Module模块
tag:
  - Module
  - export
  - export default
category:
  - 前端进阶
  - ES6
---

[ES6 入门教程:Module 的语法](https://es6.ruanyifeng.com/#docs/module)

## Module 模块介绍

- `Module`模块:一个一个的局部作用域的代码块
- `Module` 解决的问题：

(1) 模块化的问题

(2) 消除全局变量

(3) 管理加载顺序

- 使用 `script `标签加载模块:只要用到 `import` 或 `export`，在使用 `script` 标签加载的时候，就要加上 `type="module"`

```html
<script src="./xxx.js" type="module"></script>
<!--以下写法和👆的写法等价-->
<script type="module">
  import 'xxx.js'
</script>
```

## 导入与导出

如果一个模块没有`导出`，也可以进行`导入`，被导入的代码都会执行一遍，也仅仅会执行一遍

```html
<script type="module">
  import 'xxx.js'
</script>
```

::: tip 提示

使用`export default`时，对应的`import`语句不需要使用大括号；第二组是不使用`export default`时，对应的`import`语句需要使用大括号。

`export default`命令用于指定模块的默认输出。显然，一个模块只能有一个默认输出，因此`export default`命令只能使用一次。所以，`import`命令后面才不用加大括号，因为只可能唯一对应`export default`命令。

:::

### export default 和对应的 import

为了给用户提供方便，让他们不用阅读文档就能加载模块，就要用到`export default`命令，为模块指定默认输出。

本质上，`export default`就是输出一个叫做`default`的变量或方法，然后系统允许你为它取任意名字,正是因为`export default`命令其实只是输出一个叫做`default`的变量，所以它后面不能跟变量声明语句

一个模块只能有**一个** **`export default`**

```js
// 导出
const age =123
export default age
// 导入
import age from './module.js'
// 导入,可以随意命名,但不建议这样使用
import xxx from './module.js'
//--------------------------------------
// 导出匿名函数
export default ()=>{
	console.log('123')
}
// 导出具名函数，在模块外部是无效的。加载的时候，视同匿名函数加载
export default function foo() {
  console.log('foo');
}
```

### export 和对应的 import

1. 单个导出

```js
// 第一种
export const age = 18
// 第二种
const age = 18
export { age }
// ------------
// 导入
import { age } from './module.js'
```

2. 多个导出

```js
// 导出
export { Person, age }
// ------------
// 导入
import { Person, age } from './module.js'
```

3. 导出或导入时起别名

```js
// 导出
export { Person as ren, age }
// ------------
// 导入
import { ren, age as sui } from './module.js'
```

### 整体导入

整体导入中包括了`export` 导出 和 `export default `导出 的所有内容

```js
import * as obj from './module.js'
```

### 同时导入

::: warning 注意
export default 导出的内容必须写在最前面
:::

同时导入`export dafault`和`export`

```js
import age2, { func, age } from './module.js'
```
