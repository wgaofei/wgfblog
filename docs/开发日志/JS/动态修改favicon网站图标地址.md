---
title: 动态修改favicon网站图标地址
category:
  - 开发日志
  - JS
---

最近开发的项目中有个需要是系统配置修改了`logo`，要同步到`favicon`。

直接上代码：

```js
document.getElementsByTagName('link')[0]['href'] = localStorage.logoimageUrl
```

其他的逻辑根据业务的实际去写。
