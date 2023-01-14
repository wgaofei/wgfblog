---
title: 理解js事件循环
category:
  - 开发日志
  - JS
---

- [这一次，彻底弄懂 JavaScript 执行机制](https://juejin.cn/post/6844903512845860872)

- [一次搞懂- JS 事件循环之宏任务和微任务](https://segmentfault.com/a/1190000039971920)

- [10 分钟理解 JS 引擎的执行机制](https://segmentfault.com/a/1190000012806637#1)

---

![浏览器完整流程图](https://zfh-nanjing-bucket.oss-cn-nanjing.aliyuncs.com/blog-images/%E6%B5%8F%E8%A7%88%E5%99%A8%E5%AE%8C%E6%95%B4%E6%B5%81%E7%A8%8B%E5%9B%BE.png)

**任务队列**的执行过程是：先执行一个`宏任务`，执行过程中如果产出新的`宏/微任务`，就将他们推入相应的`任务队列`，之后在执行一队`微任务`，之后再执行`宏任务`，如此循环。以上不断重复的过程就叫做 `Event Loop(事件循环)`。

::: tip 那些是宏任务？那些是微任务？

- 宏任务主要包括：包括整体代码 script、setTimeout、setInterval...
- 微任务主要包括：Promise.then...

:::

![宏任务微任务](https://zfh-nanjing-bucket.oss-cn-nanjing.aliyuncs.com/blog-images/%E5%AE%8F%E4%BB%BB%E5%8A%A1%E5%BE%AE%E4%BB%BB%E5%8A%A1.png)
