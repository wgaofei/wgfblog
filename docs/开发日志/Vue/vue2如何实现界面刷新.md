---
title: vue2如何实现界面刷新
isOriginal: true
order: 1
category:
  - 开发日志
  - Vue2
---

1. 原始方法： `location.reload()`;
2. vue 自带的路由跳转: `this.$router.go(0)`;

前两者都是强制刷新页面，会出现短暂的闪烁，用户体验效果不好。所以，我们选择第三种方式

首先在 App 里面写下如下代码：

```js
<template>
    <div id="app">
    	<router-view v-if="isRouterAlive"></router-view>
	</div>
</template>
<script>
    export default {
        name: 'App',
         //父组件中通过provide来提供变量，在子组件中通过inject来注入变量。
        provide () {
            return {
                reload: this.reload
            }
        },
        data() {
            return{
                isRouterAlive: true  //控制视图是否显示的变量
            }
        },
        methods: {
            reload () {
                this.isRouterAlive = false;   //先关闭，
                this.$nextTick(function () {
                    this.isRouterAlive = true; //再打开
                })
            }
        }
    }
</script>
```

接下来，我们就可以在需要刷新页面的组件里这样写：

```js
export default {
  inject: ['reload'], //注入App里的reload方法
  data() {
    return {}
  },
}
```

在需要刷新页面的代码中使用：

```js
this.reload()
```
