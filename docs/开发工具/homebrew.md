---
title: homebrew
category: 开发工具
---

Homebrew 是一款 Mac OS 平台下的软件包管理工具，拥有安装、卸载、更新、查看、搜索等很多实用的功能。简单的一条指令，就可以实现包管理，而不用你关心各种依赖和文件路径的情况，十分方便快捷。例如 homebrew 可以快速安装 git,nvm,mysql,mongodb 等开发工具

## 安装

`homebrew`使用脚本安装:

1. ~~国内脚本：有莫名其妙的 BUG~~

```shell
/bin/zsh -c "$(curl -fsSL https://gitee.com/cunkai/HomebrewCN/raw/master/Homebrew.sh)"
```

2. 科学环境推荐官方脚本：

```shell
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

3. mac 国内第三方卸载脚本：

```shell
/bin/zsh -c "$(curl -fsSL https://gitee.com/cunkai/HomebrewCN/raw/master/HomebrewUninstall.sh)"
```

4. mac 官方卸载脚本：

```shell
 /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/uninstall.sh)"
```

## 报错

::: warning

使用国内脚本安装，可能会遇到此问题。使用官方脚本无此问题

:::

fatal: not in a git directory Error: Command failed with exit 128: git

**解决办法**：执行 brew -v 命令看看是不是有两个提示，你的 homebrew-core 和 homebrew-cask 目录被 git 认为不是一个安全的目录，需要手动添加
git config --global --add safe.directory 你的 homebrew-core 路径
git config --global --add safe.directory 你的 homebrew-cask 路径

## 注意

::: tip 提示

使用 brew uninstall git 卸载软件只会卸载软件本身而不会同时卸载其依赖包，使用以下命令可完全卸载，并且不会影响到其他软件。需要科学上网！

`brew tap beeftornado/rmtree`

结束后执行如下命令即可完全卸载软件。

`brew rmtree git`

:::

## mysql

[安装教程](https://blog.csdn.net/x123089/article/details/79729563)

通过 homebrew 安装：

```bash
brew install mysql
```

启动 mysql 服务：

```bash
mysql.server start
```

设置 mysql:

```bash
mysql_secure_installation
```

,出现以下提示:

```bash
Securing the MySQL server deployment.

Connecting to MySQL using a blank password.
//验证密码插件可以用来测试密码和提高安全性。它检查密码的强度，并允许用户只设置那些足够安全的密码。你愿意安装验证密码插件吗?
VALIDATE PASSWORD PLUGIN can be used to test passwords
and improve security. It checks the strength of password
and allows the users to set only those passwords which are
secure enough. Would you like to setup VALIDATE PASSWORD plugin?
//在下边的问题中输入y或者Y,输入其他的都表示为否
Press y|Y for Yes, any other key for No:y

// 密码验证策略有三个级别:
// 低长度> = 8
// 中长度>= 8，数字，混合情况，和特殊字符。
// 强长度>= 8，数字，混合情况，特殊字符和字典文件。

There are three levels of password validation policy:

LOW    Length >= 8
MEDIUM Length >= 8, numeric, mixed case, and special characters
STRONG Length >= 8, numeric, mixed case, special characters and dictionary file

// 0,1,2分别代表3个不同的级别,看自己的生产环境需要的密码需求

Please enter 0 = LOW, 1 = MEDIUM and 2 = STRONG:0

// 请在这里设置root的密码。
// 新密码:
// 重新输入新密码:
// 估计密码强度:50。

// 您希望继续提供密码吗?(请按y| y为Yes，任何其他关键字):


Please set the password for root here.

New password:

Re-enter new password:

Estimated strength of the password: 50
Do you wish to continue with the password provided?(Press y|Y for Yes, any other key for No) :y

// 默认情况下，MySQL安装有匿名用户，
// 允许任何人在不需要的情况下登录MySQL。
// 为它们创建的用户帐户。这仅仅是为了。
// 测试，并使安装更加顺利。
// 在开始生产之前，你应该把它们去掉。
// 环境。
// 删除匿名用户?(请按y| y为Yes，任何其他关键字):

By default, a MySQL installation has an anonymous user,
allowing anyone to log into MySQL without having to have
a user account created for them. This is intended only for
testing, and to make the installation go a bit smoother.
You should remove them before moving into a production
environment.

Remove anonymous users? (Press y|Y for Yes, any other key for No) :y

// 成功。
// 通常，根应该只允许连接。
// “localhost”。这确保了某人无法猜测。
// 来自网络的根密码。
// 不允许远程root登录吗?(请按y| y为Yes，任何其他关键字):
// 这里表示是否允许远程登录root用户,我这里是测试环境,选择键入Y

Success.

Normally, root should only be allowed to connect from
'localhost'. This ensures that someone cannot guess at
the root password from the network.

Disallow root login remotely? (Press y|Y for Yes, any other key for No) :y

成功。

// 默认情况下，MySQL附带一个名为“test”的数据库。
// 任何人都可以访问。这也只用于测试，
// 在开始生产之前应该将其移除。
// 环境。
// 这里提示是否删除mysql的test数据库


删除测试数据库并访问它?(请按y| y为Yes，任何其他关键字):

Success.

By default, MySQL comes with a database named 'test' that
anyone can access. This is also intended only for testing,
and should be removed before moving into a production
environment.


Remove test database and access to it? (Press y|Y for Yes, any other key for No) :y


// ——删除测试数据库……
// 成功。
// -删除测试数据库上的特权…
// 成功。
// 重新加载特权表将确保所有更改。
// 到目前为止，将立即生效。
// 现在重新加载权限表吗?(请按y| y为Yes，任何其他关键字):
- Dropping test database...
Success.

 - Removing privileges on test database...
Success.

Reloading the privilege tables will ensure that all changes
made so far will take effect immediately.

Reload privilege tables now? (Press y|Y for Yes, any other key for No) :y


Success.
//出现此消息,说明mysql设置成功,请牢记输入的mysql密码
All done!
```

登录 mysql 进行测试:

```shell
mysql -u root -p
```

## git
```shell
brew install git
```
## nvm

[更多细节](/node技术栈/node基础知识&工具#nvm)

```shell
brew install nvm
```

## mongodb

1. brew tap mongodb/brew
2. brew install mongodb-community
3. 启动：brew services start mongodb-community
4. 停止 ：brew services stop mongodb-community

[安装教程](https://www.jianshu.com/p/8db0b29a931d)

[github](https://github.com/mongodb/homebrew-brew)

## fd

检索文件工具，速度较快，比`everything`还是差一点,[github](https://github.com/sharkdp/fd)

##  autojump
 [autojump](https://github.com/wting/autojump),快速跳转目录(只能跳转已经 cd 过的目录)

```shell
# .zshrc
 [ -f /opt/homebrew/etc/profile.d/autojump.sh ] && . /opt/homebrew/etc/profile.d/autojump.sh
fpath=($fpath "/Users/frank/.zfunctions")
```
## zsh-syntax-highlighting
[zsh-syntax-highlighting](https://github.com/zsh-users/zsh-syntax-highlighting):高亮终端的代码

```shell
# .zshrc
source /opt/homebrew/share/zsh-syntax-highlighting/zsh-syntax-highlighting.zsh
```

## neofetch

终端显示设备信息

配置中文：

```shell
~/.config/neofetch/config.conf
```

```shell
# 复制下面内容到上面的配置文件中
print_info() {
    info title
    info underline
	#OS
    info "操作系统" distro
    #Host
    info "型　　号" model
    #Kernel
    info "内核版本" kernel
    #Uptime
    info "开机时间" uptime

    prin "当前时间" "$(date +%Y年%m月%d"日 "%H时%M分%S秒)"
    #Packages
    #info "Packages" packages
    info "S h e ll" shell
    #Resolution
    info "分  辨  率" resolution
    #info "DE" de
    #info "WM" wm
    #WM Theme
    info "主　　题" wm_theme
    info "Theme" theme
    info "Icons" icons
    #Terminal
    info "终　　端" term
    #Terminal Font
    info "终端字体" term_font
    #CPU
    info "处  理  器" cpu
    #GPU
    info "显卡设备" gpu
    #Memory
    info "内　　存" memory
    #info "GPU Driver" gpu_driver  # Linux/macOS only
    # CPU Usage
    info "CPU 已用" cpu_usage
    #info "Disk" disk
    #Battery
    info "剩余电量" battery
    # info "Font" font
    # info "Song" song
    # [[ "$player" ]] && prin "Music Player" "$player"
    # 本地IP
    info "内  网  IP" local_ip
    #Public IP
    info "公  网  IP" public_ip
    #Users
    #info "用户" users
    #Locale
    info "语　　言" locale  # This only works on glibc systems.
    #info cols
}
```

![neofetch](https://zfh-nanjing-bucket.oss-cn-nanjing.aliyuncs.com/blog-images/neofetch.png "neofetch效果图")

## tree

用于生成文件夹树形结构图

```shell
├── App.jsx
├── AsyncData.jsx
├── store
│   ├── Count
│   │   ├── actionCreators.js
│   │   ├── constants.js
│   │   ├── index.js
│   │   └── reducer.js
│   ├── Data
│   │   ├── actionCreators.js
│   │   ├── constants.js
│   │   ├── index.js
│   │   └── reducer.js
│   ├── index.js
│   └── reducer.js
├── tree.txt
└── utils
    ├── connect.js
    └── context.js
```

