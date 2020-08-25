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

```js
axios({
  // ...
  // 下面即为config的配置项
});
```

### url

- 用于请求的服务器 URL;

```js
url: '/user',
```

### method

- 是创建请求时使用的方法;

```js
method: 'get',
```

### baseURL

- 将自动加在 `url` 前面:
  - 除非 `url` 是一个绝对 URL;
- 可以通过设置一个 `baseURL`:
  - 便于为 axios 实例的方法传递相对 URL;

```js
baseURL: 'https://baidu.com/api/',
```

### transformRequest

- 允许在向'服务器发送前'，修改请求数据;

```js
transformRequest: [
  function (data, headers) {
    // 这里修改马上要发送的 data 属性
    return data;
  },
],
```

### transformResponse

- 在传递给 then/catch 前, 允许修改响应数据

```js
transformResponse: [function (data) {
    // 对 data 进行任意转换处理
    // 理解: 是这是请求完成后，拿回来的数据，进行处理;
    return data;
  }],
```

### headers

- 即将被发送的自定义请求头

```js
headers: {'X-Requested-With': 'XMLHttpRequest'},
```

### params

- 即将与请求一起发送的 URL 参数
- 必须是一个:
  - 无格式对象:(plain object);
  - URLSearchParams 对象;

```js
params: {
    ID: 12345
},
```

### paramsSerializer

- 负责 `params` 序列化的函数;

```js
paramsSerializer: function(params) {
    // 作者菜语：这个暂时无法理解，可待后续'会'了后，来回顾
    return Qs.stringify(params, {arrayFormat: 'brackets'})
},
```

### data

- 作为请求主体被发送的数据;
- 只适用于这些请求方法:
  - PUT
  - POST
  - PATCH
- 在没有设置 `transformRequest` 时，必须是以下类型之一：
  - string
  - plain object
  - ArrayBuffer
  - ArrayBufferView
  - URLSearchParams
  - 浏览器专属:
    - FormData
    - File
    - Blob
  - Node 专属:
    - Stream

```js
data: {
    firstName: 'chen'
  },
```

### timeout

- 指定请求超时的毫秒数(0 表示无超时时间)
- 如果请求话费了超过 `timeout` 的时间:
  - 请求将被中断;

```js
timeout: 1000,
```

### withCredentials

- 表示跨域请求时是否需要使用凭证;

```js
// 作者菜语：本人没用过，暂时无法理解深刻
withCredentials: false, // default
```

### adapter

- 允许自定义处理请求，以使测试更轻松;
- 返回一个 promise 并应用一个有效的响应;

```js
// 作者菜语：想象不到具体使用场景，暂时无法理解深刻
adapter: function (config) {
    /* ... */
},
```

### maxContentLength

- 定义允许的响应内容的最大尺寸

```js
 maxContentLength: 2000,
```

### responseType

- 表示服务器响应的数据类型，可以是:
  - arraybuffer
  - blob
  - document
  - json
  - text
  - stream

```js
responseType: 'json',
```

### proxy

- 定义代理服务器

```js
proxy: {
    host: '127.0.0.1',
    port: 9000,
    auth: {
      username: 'mikeymike',
      password: 'rapunz3l'
    }
  },
```

### cancelToken

- 指定用于取消请求的 cancel token;

```js
cancelToken: new CancelToken(function (cancel) {});
```

## 小结

- 上面总结了部分我常用的一些配置项
  - 具体用的比较偏的，切我也没看懂，就暂时没整理，等后面牛了，再进行补充;

## then

- 使用 then 时，你将接收下面这样的响应 :

```js
axios.get("/user/123").then(function (response) {
  console.log(response.data);
  console.log(response.status);
  console.log(response.statusText);
  console.log(response.headers);
  console.log(response.config);
  // 整理了response的输出，以后用的时候辅助调试;
});
```

## 配置默认值

- 你可以指定将被用在各个请求的配置默认值

### 全局的 axios 默认值

```js
axios.defaults.baseURL = "https://api.example.com";
axios.defaults.headers.common["Authorization"] = AUTH_TOKEN;
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";

// 自定义默认值
const instance = axios.create({
  baseURL: "https://api.example.com",
});
instance.defaults.headers.common["Authorization"] = AUTH_TOKEN;
```

## 配置的优先顺序

- 配置会以一个优先顺序进行合并;
- 这个顺序是：
  - 在 lib/defaults.js 找到的库的默认值;
  - 然后是实例的 defaults 属性;
  - 最后是请求的 config 参数;
- 后者将优先于前者;

```js
// 使用由库提供的配置的默认值来创建实例
// 此时超时配置的默认值是 `0`
var instance = axios.create();

// 覆写库的超时默认值
// 现在，在超时前，所有请求都会等待 2.5 秒
instance.defaults.timeout = 2500;

// 为已知需要花费很长时间的请求覆写超时设置
instance.get("/longRequest", {
  timeout: 5000,
});
```

- 就跟 js 一样，自上而下进行编译覆盖，没有啥函数提升的坑;

## 拦截器

- 在请求或响应被 then 或 catch 处理前拦截它们;

```js
// 添加请求拦截器
axios.interceptors.request.use(function (config){
    // 发送前，还可以在这做一些操作，做完了return
    return config;
}), function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
// 这里的数据，之后就真要给then 或 catch了
axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});
```

## 取消

- 使用 cancel token 取消请求

```js
const CancelToken = axios.CancelToken;
const source = CancelToken.source();
// get
axios.get("/user/123", {
  cancelToken: source.token,
});
//post
axios.post(
  "/user/123",
  {
    name: "new name",
  },
  {
    cancelToken: source.token,
  }
);
```

## 小结

- 本篇文档为本人通读'官方文档'以及'学习资源'，自己理解并记录的学习文档，并非转载或抄袭;
    - 但由于水平有限，仅将自己理解且会用的内容记录了进来，所以是一篇个人向学习记录文档;
- 若有童鞋看到，仅供参考;

# 暗号：axios
