---
title: 对接海康USB设备
category:
  - 技术记录
order: 7
date: 2023-07-12
tag: mine
sticky: 9995
---

因项目需求，需要将海康的门禁系统融合到系统里，那么我此次主要负责开发一个本地服务，负责调用海康读卡器，读取卡号。

### 1.主要流程

根据领导传达的业务需求，我粗略的画了个草图，来理清本次功能需要做的事情

![image-20230712111434588](https://feilou.oss-cn-nanjing.aliyuncs.com/images/image-20230712111434588.png)

用户访问系统页面——>下载提前做好的exe安装包，启动下载——>下载完成后，启动运行一个exe程序——>将卡放在读卡器上——>平台页面点击读卡，通过websocket，将卡号展示在页面上。

### 2.任务拆分

首先根据最原始的业务需求，把这个功能拆分成一个功能清单，一步步的完成；

首先，最基本的，我要开发一个程序，能调用海康的读卡器设备进行读卡；

- 一个读卡程序(java)

然后，我的客户可能并不会启动java程序，也可能不会下载java环境，那么我就需要将这个java程序变成一个exe文件，并且能在没有jre环境的电脑上运行。

- 将jar包打成exe文件，和jre放一起

### 3.java程序

**基本读卡功能**

一般像这种对接第三方公司的产品，可以直接去人家公司官网，下载相应的sdk和开发手册，然后根据别人的实例进行改造开发。

通过咨询官方客服，我下载了USB SDK。然后我的客户一般都是Windows电脑，所以我本次只做了Windows版本。

https://open.hikvision.com/download/5cda567cf47ae80dd41a54b3?type=10&id=cd699e0e3def4519a6e8676f72e1ea1e

首先运行官方自带的demo程序，搞清他读卡的主流程，然后进行提取关键部分，改造改造。

捣鼓之后，发现整个读卡流程需要这几步：

- 遍历读卡器设备
- 登录你选择的读卡器设备
- 点击读卡，但是卡号序列是反的

然后就可以根据流程，提取实例里的代码，完成一个初步的功能

**碰到的技术问题**

1.代码需要引入他提供的第三方jar包，那么我是通过配置pom文件的方式引入的

![image-20230712115558722](https://feilou.oss-cn-nanjing.aliyuncs.com/images/image-20230712115558722.png)

2.代码需要加载他提供的动态链接库，写绝对路径肯定是不行的，写相对路径吧，在打成jar包之后，怎么都读不到，我初步判断是打包方式写的不对，实在太菜了，搞了好久也没搞出来。最后采用的方案是，反正最后是要连带jre一起打包的，我就把动态链接库直接放进jre了，这样加载的时候也不用写什么路径了

```java
HCUsbSDK INSTANCE = (HCUsbSDK) Native.loadLibrary("HCUSBSDK", HCUsbSDK.class);
```

完整的代码在https://github.com/wgaofei/hkusb

### 4.打包成exe

以前也做过类似打包成exe的功能，所以还是用了比较熟悉的软件exe4j，主要参考这位博主的文章

https://www.bilibili.com/read/cv16141534/

因为我是springboot项目，所以主程序选择那里要选择`org.springframework.boot.loader.JarLauncher`

然后参照文章的第二步，将jre和exe一起打包成安装软件

### 5.实现注册表功能

本以为整个功能到此就结束了，但是技术经理让我再加一个功能，把程序写进注册表，这样就可以在页面上随意拉起这个程序了。然后就模仿了一下怎么写reg文件

```reg
Windows Registry Editor Version 5.00
[HKEY_CLASSES_ROOT\HKLocalServer]
@="URL:hklocalserver Protocol Handler"
"URL Protocol"=""
[HKEY_CLASSES_ROOT\HKLocalServer\DefaultIcon]
@="C:\Program Files (x86)\\demo\\HKLocalServer.exe"
[HKEY_CLASSES_ROOT\HKLocalServer\shell]
[HKEY_CLASSES_ROOT\HKLocalServer\shell\open]
[HKEY_CLASSES_ROOT\HKLocalServer\shell\open\command]
@="\"C:\\Program Files (x86)\\demo\\HKLocalServer.exe\" \"%1\""
```

但是这有个问题，就是客户必须按照最后一行写的，将软件安装在指定位置，虽然可以在安装包构造那里，通过软件强制安装在那个目录，但是还是需要客户自己去点击才行，要是客户下载点太快，都不知道自己安哪了，体验上多多少少有点不好。

最后还是研究了一下Inno Setup Compiler 的官方文档，再根据reg的文件格式，在打包的配置文件里加上

```reg
[Registry]
Root: HKCR; Subkey: "HKLocalServer"; Flags: uninsdeletekey
Root: HKCR; Subkey: "HKLocalServer"; ValueType: string; ValueName: ""; ValueData: "URL:hklocalserver Protocol Handler"
Root: HKCR; Subkey: "HKLocalServer"; ValueType: string; ValueName: "URL Protocol"; ValueData: ""
Root: HKCR; Subkey: "HKLocalServer\shell\open\command"; ValueType: string; ValueName: ""; ValueData: "{app}\HKLocalServer.exe"
```

这样只要安装了程序之后，在页面上访问`hklocalserver://`就可以把服务拉起来。