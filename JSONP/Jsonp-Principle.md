# 一文让你读懂 JSONP 跨域原理

- 相信很多小伙伴们都知道什么是跨域;
- 为了照顾不清楚的小伙伴，这边先简单介绍下:
  - 跨域是指'浏览器'不能执行其他网站的脚本;
  - 它是由浏览器的'同源策略'造成的,是浏览器对 JavaScript 实施的'安全限制';

## 为什么会出现 JSONP

- 出于浏览器安全限制:
  - 数据是不可以直接跨域'请求'的;
    - 不同的根域名;
    - 不同的二级域名;
    - 不同的端口;
  - 除非目标域名授权你可以访问;
- 所以我们采用另外一种方式来实现跨域请求;
- 小伙伴们还记得:
  - 可以让浏览器发起'跨域请求'的'标签'有哪些吗：
    - iframe 标签
    - img 标签
    - link 标签
    - script 标签
    - ...

## 什么是 JSONP

- JSONP 是一种动态 script 标签跨域请求技术;
- 指的是请求方:
  - 动态创建 script 标签;
  - src 指向响应方的服务器;
  - 同时传一个参数 callback;
  - callback 后面是我们的 functionName;
- 当'请求方'向'响应方'发起请求时:
  - 响应方根据传过来的参数 callback;
  - 构造并调用形如:

```js
xxx.call(undefined, "你要的数据");
```

- 其中'你要的数据'的传入格式是以 JSON 格式传入的;
- 因为传入的 JSON 数据具有左右 padding:
  - 因而得名 JSONP;
- 后端代码构造并调用了 xxx:
  - 浏览器接收到了响应;
  - 就会执行 xxx.call(undefined,'你要的数据');
- 于是乎，'请求方'就知道了他要的数据了(成功拿到数据);

## JSONP 如何使用

- 现在我们来基于 node 来做一个 JSONP 跨域请求 :
- 先是'服务端':

```js
// 服务端：
const Koa = require('koa');
const bodyParser = require("koa-bodyparser");
const { getUser } = require("./mock");
const app = new Koa();

app.use(bodyParser());

app.use(async (ctx, next) => {
    const { path: curPath } = ctx.request;

    if (curPath === '/jsonp') {
    // 设置响应头
    ctx.set('Content-Type', 'application/javascript;charset=utf-8');
    ctx.set('X-Content-Type-Options', 'nosniff');

    const callback = ctx.query.callback;
    let data =  getUser(ctx.query.type);
    data = JSON.stringify(data);
    ctx.body = `${callback}(${data})`
    console.log(ctx.query)
    }
};

console.log("服务器已启动！")
app.listen(3030);
```

- 然后是'客户端':

```ts
const btn: HTMLElement = document.getElementById("btn");
btn.addEventListener(
  "click",
  () => {
    let url = "http://127.0.0.1:3030/jsonp?type=all&callback=getdata";
    loadScripr(url);
  },
  false
);
function loadScripr(src: string): void {
  const script: HTMLScriptElement = document.createElement("script");
  script.src = src;
  script.onload = () => {
    // 每次动态创建script标签之后,都将script标签删掉 这很重要哦，不然整个页面的 script 标签要爆炸了
    document.body.removeChild(script);
  };
  script.onerror = () => {
    console.error("请求失败了");
    delete window["getdata"];
    document.body.removeChild(script);
  };
  document.body.appendChild(script);
}

function getdata(data: any): void {
  // data 为服务端返回的数据
  // to do something
  alert(JSON.stringify(data));
}
```

- 最后得到：

```js
<script>// data 为后端返回的数据 getdata(data)</script>
```

- 类似这样的结构;
- 那为什么会出现这这样的情况呢？
