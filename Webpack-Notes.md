# 面试官：webpack 原理都不会？

## 引言

- 前一段时间我把 webpack 源码大概读了一遍;
- webpack 到 4.x 版本后，其源码已经比较庞大;
- 对各种开发场景进行了高度抽象;
  - 阅读成本也愈发昂贵;

<br>

- 过度分析源码对于大家并没有太大的帮助;
- 本文主要是想通过分析 webpack 的:
  - '构建流程'以及'实现'一个简单的 webpack;
  - 让大家对 webpack 的'内部原理'有一个大概的了解;

## webpack 构建流程分析

- entry-option: 初始化流程;
- run: 开始编译;
- make: 从 entry 开始'递归的'分析依赖，对每个'依赖模块'进行 build;
- before-resolve: 对'模块位置'进行解析;
- build-module: 开始'构建'某个'模块';
- normal-module-loader: 将 loader 加载完成的 module 进行编译，生成 AST 树;
- program: 遍历 AST 树，当遇到 require 等一些调用表达式时，收集依赖;
- seal: 所有依赖 build 完成，开始优化;
- emit: 输出到 dist 目录;
