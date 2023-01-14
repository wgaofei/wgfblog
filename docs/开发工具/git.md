---
title: git
category: 开发工具
order: 1
---

::: tip 参考文章

[常用 Git 命令清单](http://www.ruanyifeng.com/blog/2015/12/git-cheat-sheet.html)

[如何将一个项目同时提交到 GitHub 和 Gitee(码云)两个仓库](https://blog.csdn.net/yilovexing/article/details/107226141)

[git 忽略已经提交的文件，管用！](https://blog.csdn.net/m0_37897396/article/details/125992705)

:::

## 安装

### mac

通过`homebrew`安装:`brew install git`

## 配置账户

1、设置用户名：`git config --global user.name '你git平台上的用户名'`;

2、设置用户邮箱：`git config --global user.email '注册时候的邮箱'`;

## 配置 SSH 密钥

- [生成/添加 SSH 公钥](https://gitee.com/help/articles/4181)
- [Git 配置多个 SSH-Key](https://gitee.com/help/articles/4229)

以下命令 `win` 在 `git bash` 下执行

```bash
ssh-keygen -t rsa -C 'gitee' -f ~/.ssh/gitee_id_rsa

ssh-keygen -t rsa -C 'github' -f ~/.ssh/github_id_rsa

# 生成完去gitee，github设置添加公钥 pub文件
# mac 操作 win忽略
ssh-add ~/.ssh/github_id_rsa
ssh-add ~/.ssh/gitee_id_rsa
# 终端连接
ssh -T git@gitee.com
ssh -T git@github.com
```

`mac` 下每次开机后需要执行:

```bash
ssh-add ~/.ssh/gitee_id_rsa
ssh-add ~/.ssh/github_id_rsa
```

可以自动添加，在每次开机后自动运行：[具体步骤](https://www.jianshu.com/p/ada03bd51ed5)

## 墙内自救指南

使用`clash X Pro` 增强模式可以实现全局代理，它将接管系统流量，无需设置

~~[macOS 给 Git(Github) 设置代理（HTTP/SSH）](https://gist.github.com/chuyik/02d0d37a49edc162546441092efae6a1)~~

## 使用

![git本地版本控制](https://zfh-nanjing-bucket.oss-cn-nanjing.aliyuncs.com/blog-images/git%E6%9C%AC%E5%9C%B0%E7%89%88%E6%9C%AC%E6%8E%A7%E5%88%B6.png)

### 生成版本

::: tip git add

使用 `git add` 后，工作区和暂存区的内容是一致的

工作区和暂存区内容不一致的时候，需要通过 `git add`，让它们内容一致

只要工作区的文件有变动，就需要将工作区的变动添加到暂存区

:::

- `git init`:在项目中初始化 Git，让 Git 管理当前项目
- ` git status`:检查当前文件状态
- ` git add <file1> <file2>` ...:将工作区的指定内容添加到暂存区
- `git add .` :将工作区的内容一起添加到暂存区

::: tip git commit

`git commit` 后，暂存区和本地版本库的内容是一致的

暂存区和本地版本库内容不一致的时候，需要通过 `git commit` ，让它们内容一致

:::

- `git commit -m '描述消息'`：将暂存区的内容提交到本地仓库，生成版本

- `git log` ：查看提交内容
- ` git log --oneline`：以一行的方式查看提交记录

### 重置版本

- `git reset --soft 版本号`：仅重置本地仓库
- `git reset --mixed 版本号`：重置本地仓库和暂存区，默认行为
- `git reset --hard 版本号`：重置本地仓库、暂存区和工作区(危险，会覆盖正在开发的代码)
- `git reflog`:可以查看所有记录，包括被"丢弃"的版本
- `git log`:查看提交记录，不包括被"丢弃"的版本

### git 忽略文件.gitignore

::: warning .gitignore 只对从来没有 commit 过的文件起作用

项目中的某个文件（比如 stupid.txt)已经被 commit，并 push 到 server 了，这时发现 stupid.txt 不应该被 git 管理，
同步到团队每个开发人员那里，这时在.gitignore 文件里面添加"stupid.txt"已经不起作用了。
因为.gitignore 只对从来没有 commit 过的文件起作用。这时可以

1. 文件夹：`git rm -r --cached directory_name`
2. 文件：`git rm --cached stupid.txt`
3. 在`.gitignore`中添加要忽略的文件

:::

- `#`：注释
- `test.html`:忽略指定文件，不让 Git 管理
- `test.*`：忽略所有文件名是 test 的文件，不管后缀是什么
- `*.tmp`：忽略所有后缀是.tmp 的文件，不管文件名是什么
- `node_modules/`:忽略`node_modules`目录下的所有文件
- git 管理的是文件，空目录会自动忽略

### git 分支

#### 创建和切换分支

::: tip checkout

checkout=>**签出**操作(webstrom)

:::

- `git branch`:查看分支
- `git branch -v`:查看分支（展示的信息多一些）
- `git branch 分支名`：在当前分支的节点上创建新的分支
- `git checkout 分支名`：切换分支，兼容性好
- `git switch 分支名`：切换分支，v2.23.0 版及以后可用

#### 合并和删除分支

`git merge 要合并的分支名`：将指定的分支合并到当前分支

`git branch -d 分支名`：删除分支

`git log --oneline --graph`:以一行、图形化的方式查看提交记录

合并分支时，先切换到最终要合并的分支，再合并

合并分支时可能产生冲突：在两个不同的分支中，对同一个文件的同一部分进行了不同的修改；产生了冲突，需要人为解决后再提交一次

### 远程仓库

推送本地仓库到远程仓库：`git push` (-f:强行推送当前分支到远程仓库，即使有冲突;-all:推送所有分支到远程仓库)

克隆远程仓库到本地：`git clone `

拉取远程仓库的最新代码到本地：`git pull`
