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

### 小结：

- Axios 是根据环境不同，被'不同内容为基础'包装的语法糖;
  - 浏览器环境: 基于 XMLHttpRequests 的一个 Promise 语法糖;
  - node.js: 基于 http 的一个 Promise 语法糖;

## 执行 GET 请求

- 创建一个 axios 的 get 请求：直接调用 axios 的 get 方法;
- 用实例进行学习:
  - 带 query 参数形式的 get 请求:

```js
// 为给定 ID 的 user 创建请求
// query 参数: /user?ID=123
axios
  .get("/user?ID=123")
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
// axios返回的是一个Promise对象，所以也就封装了then方法，包括链式调用也是
// 核心：axios是基于 Promise 的语法糖;
```

- get 的另一种写法：
  - 使用 params 参数形式的 get 请求

```js
// 框架基本不变，传参有调整
// 用拼接的形式，传参
axios
  .get("/user", {
    // params代表'/user'后面的 ID
    params: {
      ID: 123,
    },
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
```

### 小结

- axios.get(url).then(callback).catch(callback);
  - url:
    - 带 query 参数形式的 get 请求;
    - 使用 params 参数形式的 get 请求;
  - then(callback):
    - 请求完成后的链式调用;
  - catch(callback):
    - 请求过程中的任意失败，都会被 catch()进行捕获;

## 执行 POST 请求

- axios 的 post 请求，与 get 请求类似，直接调用 post 方法即可:

```js
// post，顾名思义，就是带数据传输
axios
  .post("/user", {
    // 要发送的数据扔这
    firstNmae: "chen",
    lastName: "hui",
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
```

## 执行多个并发请求

- 与 promise 的 all 方法类似,全部的请求都执行;

```js
// 定义一个axios的get请求;
function getUserAccount() {
  return axios.get("/user/123");
}
// 定义一个axios的post请求;
function postUserPermissions() {
  return axios.post("/user", {
    firstNmae: "chen",
    lastName: "hui",
  });
}

// 直接用axios的all方法，进行'全部的请求'执行并发送
axios.all([getUserAccount(), postUserPermissions()]).then(
  axios.spred(function (acct, perms) {
    // 两个请求都执行完成
    // axios.spred: 处理并发请求的助手函数
  })
);
```

- 这里用了 axio 的 spred 方法;
- axios.all 与 axios.spred:
  - 处理并发请求的助手函数;
  - 上面的例是两个并发请求:
    - 故要用到 axios.spred，处理并发;
      </br>

### 小结

- 上面，就是 axios 主要的概念以及最基础的操作了;
- 下面，继续深入看与学习;

## axios API

- 可以通过向 axios 传递相关配置来创建请求

### axios(config)

- 各种配置，直接配：

```js
// 用config直接给配置，发送一个post请求
axios({
  method: "post",
  url: "/user/123",
  data: {
    fitstName: "chen",
    lastName: "hui",
  },
});
```

### 并发

- 处理并发请求的助手函数
  - axios.all(iterable)
  - axios.spread(callback)

## 创建实例

### axios.create([config])

- 可以使用'自定义配置'新建一个 axios 实例:

```js
const myAxios = axios.create({
  baseURL: "https://baidu.com/api/",
  timeout: 1000,
  headers: { "X-Custom-Header": "foobar" },
});
```

## 请求的配置

- axios(config)中的 config：

### url

- url:
  - 用于请求的服务器 URL;

### method

- method:
  - 是创建请求时使用的方法;
