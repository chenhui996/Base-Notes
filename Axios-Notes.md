# Axios

- 本文档为本人学习 axios 的学习笔记;
- 后期也可作为知识手册进行回顾;
- 已上传至 github，欢迎各位同学进行交流补充;
  - github 地址: https://github.com/chenhui996/Base-Notes/blob/master/Axios-Notes.md

## Axios 概念

- 基于 promise 用于浏览器和 node.js 的 http 库
  - 浏览器环境: xhr;
  - 服务端 node 环境: http;

## Axios 能干嘛(特征)

- 从浏览器中创建 XMLHttpRequests
- 从 node.js 创建 http 请求
- 支持 Promise API
- 拦截请求和响应
- 转换请求和响应数据
- 取消请求
- 自动转换 JSON 数据
- 浏览器端支持防止 CSRF(跨站请求伪造)

## 小结：

- Axios 是基于环境不同，被包装的一个语法糖;
  - node.js: 基于 http 的一个语法糖
