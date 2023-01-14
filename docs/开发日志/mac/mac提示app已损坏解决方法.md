---
title: mac提示app已损坏解决方法
category:
  - 杂记
  - mac
order: 6
---

::: tip 参考

[解决 Mac 安装应用提示 xxx.app 已损坏，无法打开/打不开 xxx，因为它来自身份不明的开发者](https://www.jianshu.com/p/f4c80e46f236)
:::

```shell
sudo xattr -rd com.apple.quarantine
```

终端输入以上命令+应用程序路径，绕过公证
