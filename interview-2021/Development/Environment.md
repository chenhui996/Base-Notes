# 开发环境

- 面试官想通过开发环境：
  - 了解候选人的实际工作情况。
- 开发环境的工具，能体现处工作产出的效率。
- 会以聊天形式为主，不会问具体的问题。

---

## 考察方面

- git
- 调试工具
- 抓包
- webpack babel
- linux 常用命令

### git

- 最常用的代码版本管理工具。
- 为什么需要 '代码版本管理工具'？
  - 大型项目需要多人协作开发，必须熟用 git。
- Mac OS 自带 git 命令，windows 可去官网下载安装。
- git 服务端常见的有：
  - github coding.net 等。
- 大公司会搭建自己的内外 git 服务。

#### git 常用命令

- git add
- git checkout xxx
- git commit -m "xxx"
- git push origin master
- git pull origin master (从服务端下载东西)
- git branch (查看分支，多人开发时，每个人有自己的分支，互补干涉)
- git checkout -b xxx / git checkout xxx (切换分支)
- git merge xxx (合并分支)
- git stash （将修改放到别的区域）
- git pop （将 stash 的文件抓取下来）
- git fetch （住区所有分支）

> 冲突要手动解决。三种情况

---

## chorome 调试工具

- 一般不会面试时考察。
- 但这是前端工程师必备的技能（不算知识）。
- 工具：
  - Elements
  - Console
  - debugger
  - Network
  - Application

---

## 抓包

- 移动端 h5 页，查看网络请求（还有网址代理或其他），需要用工具抓包。
  - windows 一般用 fiddler。
  - Mac OS 一般用 charles。
- 手机和电脑连同一个局域网。
  - 将手机代理到电脑上。
    - 手机浏览网页，即可抓包。

### 连上之后

- 做的事情：
  - 查看网络请求
  - 网址代理
  - https

---


