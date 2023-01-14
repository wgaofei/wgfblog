---
title: element-ui清除表单的奇怪现象
isOriginal: true
tag:
  - elementUI
  - vue2
category:
  - 开发日志
  - Vue
---

`element-ui `中` form` 中有个清空表单的方法，即假如给表单一个 `ref='form'`, 则清空表单的方法为 `this.$refs.form.resetFields()`

可当在 `dialog` 组件中用这个方法的时候，这就出现问题了，居然清空不了

问题的本质是因为你第一次打开 `dialog` 的时候给表单绑定的 `form `赋值了，这时候这个 `form` 的初始值就变成了你所赋的值。 `resetFields `的时候，会将` form` 对应的每个值重置到初始值，这时候的初始值就是你第一次打开 `dialog` 的时候赋的那个值, 而不是在 `data` 里声明的初始值

如表单绑定的值为：

```js
form: {
 age: 0,
 name: ''
}
```

但在你打开 dialog 的时候，你又对它进行赋值,如

```js
this.form = {
  age: 23,
  name: 'frank',
}
```

这个时候 `form `表单会默认这个新赋的值为初始值

解决方式是，等 `dialog` 已经初始化之后再给 `form `赋值，也就是:

```js
this.$nextTick(() => {
  // 这里开始赋值
  this.form.xxx = xxx
})
```

使用`this.$refs.xxx.resetFields()`会将所有的表单信息清除，如果你只想清除验证消息：` this.$refs.xxx.clearValidate()`

还有一点需要注意，如果这个表单`form`此时 DOM 还未渲染，例如`form`嵌套在`el-dialog`中，**第一次**打开`dialog`时，`resetFields()`也无法正常调用，须置于`nextTick`中调用。
