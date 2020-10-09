# Node.js

- 很多人把 node.js 当作框架，这是错误的;
- node.js ———— 它就是 js!

## node.js 与 js 有什么区别？

- node.js:
  - 运行在服务端的 js;
    - 利用 chorme 的 V8 引擎，让 js 可以运行在服务端;
    - 写法和语法，与日常编写的 js，没有任何区别;
    - 但是由于 node.js'可以'运行在服务端，所以严格来说：
      - node.js 是一门后端语言;
- 普通 js:
  - 运行在浏览器端的 js;

## 服务器

- 任何一台电脑，都可以当成一个服务器;
  - 建服务的电脑，被称为服务器;
  - 访问它的电脑，被称为客户端;
- 服务端和客户端，是一个相对的概念;

### createServer

- 创建服务端命令

```js
const http = require("http");
const server = http.createServer((req, res) => {
  res.write("hello world");
  res.end();
});
server.listen(3000);
```

- 这样，一个服务端就创建好了;

### require

- 用于引入模块、 JSON、或本地文件;

### listen(port)

- 监听端口
- port:端口号;

### 本机 ip 地址

- \$ifconfig

### nodemon

- 此插件可以帮助我们自动重启服务端;
  - 由于服务端不会自动重启;
  - 每次修改完后要停止服务端;
  - 再重新开起来，才会更新内容;
  - 故此插件可以帮助我们自动重启服务端，顶乐;

## 组件化与模块化

- 每一页为一个组件;
  - 组件之间有独立的命名空间;
  - 有利于代码的'可读性'和'可维护性';

### module.exports

- 导出组件;

### exports

- exports 是 module.exports 的一个引用;

### node_modules

- 针对第三方的，存放模块的文件夹;
- node 里所有的模块（主要是针对第三方，自己写的一般自己放一个文件夹）;
- 引用 node_modules 里的模块，不需要加"./";
- http 模块：
  - 这类模块在 node_modules 也是没有的：
    - 这类模块被称为：内置模块、官方模块;
      - 已经被集成到 node.js 里面了;

## package.json

- 描述性文件;
- 功能性文件;
- 里面留的依赖信息非常重要：
  - 当项目移植时,比方说从 github 里 clone：
    - 不需要把'无底洞'般的 node_modules 也下过来;
    - 只需要里面有完整的 package.json 文件;
    - 通过命令行：\$npm i;
    - 即可全部下载安装，顶乐;

### dependencies

- 运行依赖;
  - 一直需要的依赖;

### devDependencies

- 开发依赖;
  - 过河拆桥，开发完打包后，就没用了;

### npm

- 包管理器;
- 模块管理器;
- www.npmjs.com

### npm i

- npm install 简写;

### npm i XXX --save

- 会写进 package.jason 里面的 dependencies(运行依赖);
- 简写 -S;

### npm i XXX -D

- 会写进 package.jason 里面的 devDependencies(开发依赖);

### npm install XXX -g

- 全局安装;
- 安装目录:
  - /Users/chenhui/.nvm/versions/node/v10.15.3/lib/node_modules

### npm update XXX

- 更新组件;

### buffer

- 缓冲区;
- 在 node.js 是一个类，是一个数据格式;
- 会将文件和数据转换成二进制进行传输，效率快;
  - 呈现形式：二位 16 进制呈现;
  - 实际：二进制;

### alloc

- 通过 Buffer.alloc(number)创建指定大小的 buffer 数据;

### from

- Buffer.from(string);
- 通过字符串创建;

### stream

- 形象翻译：流;
- 当文件过大时，优化性能，可以采用 stream 流来进行文件拆分，依次运行;

### createReadStream

- 创建拆分数据流;

### createWriteStream

- 创建写入流;
- pipe：
  - 管道;

## 模版引擎

- 将'动态数据'渲染到'模版页'上面;
  - CMS 列表页;
  - CMS 详情页;

### pug 模版引擎

- 靠代码缩进来表示闭合标签;

### createServer

- 返回一个 Server 类的实例化对象;
- 等同于：

```js
const server = new Server();
```

### request

- http.ClientRequest 类;
- request 存储当前请求的客户端：信息和方法;

### response

- http.ServerResponse 类;
- response 类提供服务器响应相关的信息和方法;

## fs

- 文件操作

### fs.readFileSync

- 同步读取文件内容;

### fs.readFile

- 异步读取文件内容;

### fs.writeFile

- fs.writeFile('文件路径'，'要写入的内容'，['编码']，'回调函数');
- 写入的时候如果没有这个文件，会自动创建这个文件;
- 如果被写入的文件已存在内容，那么写入的话，会覆盖之前的内容;
- 写入数据的类型必须是字符串或 buffer 二进制数据;
  - 对象等数据写入后;
  - 接收的是数据类型;
- 编码部分一般省略即可，或填写'utf-8';
- 回调函数中，只有 err 一个参数，写入错误即可判断调用;
- fs.writeFileSync()同步版本;

### fs.watch()

- 监听文件发生改变;
- 可以用来手写 nodemon 等监听插件;

- 异步写文件;
- 权限：
  - a:追加写入;
  - w:写入;
  - r:读取;
- fs.writeFile("文件名","文件内容",{flag:"权限"},callback);

## 浏览器的地址

- 名词：虚拟地址;
- 给谁看：
  - http.js 看的(服务端文件);
- 地址看到什么内容：
  - 取决于在 http.js 你给它输出什么内容;
  - 本身并不存在地址;
- 官方总结：
  - 客户端访问的地址(url)：
    - 与后端的文件不是一对一的关系;
    - 它们是一种虚拟映射关系;
      - 这个关系是我们后端程序'根据实际情况'去返回的;

### 判断当前请求的地址是什么?

- 如何判断呢?
- 首先先理解:
  - 跟请求有关的信息，全部存在 request 类里面;
- 所以可以通过：

```js
console.log(request.url);
```

- request.url 得到发请求的地址;

## url 与资源

- url 需要定义规则：
  - 如果 url 与资源都映射，我们通过代码一个个去写，是基本不可能;
  - 所以，我们需要去定义规则：
    - 满足这个规则的 url;
    - 就是指定的目录中匹配;

### url.startsWith("/")

- 以/开头的 url;

### `__dirname`

- node 中的内置变量;
- 返回当前文件的绝对路径;

## 报文

- 每次交换的数据（请求、响应），我们称为：报文;
- 每个报文数据包含：
  - 行;
  - 头;
  - 正文;

### setHeader

- 设置浏览器的解析方式：
  - 正常情况下，传给浏览器中文，会乱码;
  - 需要给浏览器设定解析方式;

```js
response.setHeader("Content-Type", "text/html;charset=utf-8");
```

- 这样，中文就不会乱码了;
- 浏览器就会根据二进制特征去分析了：
  - html;
  - 中文;
  - 等等;
- 甚至可以在头信息中将其设置为 zip 包，自动调用浏览器的下载功能:

```js
response.setHeader("Content-Type", "application/zip");
```

## nunjucks

- 基于 node.js 的模版引擎；

### nunjucks.renderString

- 输出模版字符串
- nunjucks.renderString('Hello {{ username }}',{username:"James"})
  - 输出为：Hello James

# webserver

- 解析请求;
- 处理响应;

## koa

- 处理了请求和响应的基本逻辑;
- 提供一个接口进行扩展;
- ctx:
  - 上下文对象;
  - 是个对象:
    - ctx= {
      - request,//Koa 处理过后的
      - response,//Koa 处理过后
      - req,node 原来的
      - res node 原来
    - };
- next:
  - 传递给下一个中间件;

## koa-router

- 路由插件;

### routers

- 返回一个中间件函数;
- router.routers();
- 只要有人访问了，router.routers()返回的中间件就会执行;
  - 使用 router 提供的 get，post，put...这些方法来注册 url 函数;
    - 这些注册的函数，也会被当作中间件进行执行;
    - 所以每个函数也有 ctx 方法;
  - 访问后，router.routers()执行，中间件就会分析 url;
    - 把分许 url 与上面 get 等方法注册的时候填入的 url 进行一个匹配;
    - 满足匹配要求就执行对应的'注册函数';

### koa-router 里面的通配符 ———— `*`

- 通配符`*`，按照路由的正常逻辑写:
  - 我们会写错:

```js
// 错误写法
router.all("*", async (ctx) => {
  throw Boom.notFound("没有该路由");
});
```

- 正确写法：

```js
// 正确写法
router.all("/(.*)", async (ctx) => {
  throw Boom.notFound("没有该路由");
});
```
