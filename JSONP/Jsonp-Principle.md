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
  <br>

- 回答这个问题之前;
  - 我们先来回顾下在 html 中我们是如何引入外部 js 库文件的;
  - 假设当我们引入 JQuery 库时，我们可以在响应头中看到有这么个字段:
    - Content-Type:application/javascript;
  - 正因为有这个字段：
    - 浏览器会根据'请求头'的'类型'对应做响应的'解析操作';
  - 在这里就会执行里面的代码：
    - 然后我们的全局对象中就有了 JQuery 了;
      <br>
- 细心的小伙伴们估计都看到了:
  - 在我们在服务端请求时我们设置了请求头为:
    - Content-Type :application/javascript;charset=utf-8;
  - 因此当浏览器解析资源时:
    - 会根据响应头做对应的操作;
    - 就有了如下的形式了;

```js
<script>// data 为后端返回的数据 getdata(data)</script>
```

- 因为函数调用是在全局作用域的;
  - 所以我们的接收数据的;
    - 回调函数:
      - 要 '全局定义在客户端' 这很重要哦;

## JSONP 优缺点

- 既然 JSONP 这么好用那他有什么优缺点呢，让我们来看看吧

### 优点

- 它不像 XMLHttpRequest 对象:
  - 实现的 Ajax 请求那样;
    - 受到同源策略的限制;
  - JSONP 可以跨越同源策略;
- 它的兼容性更好:
  - 在更加古老的浏览器中都可以运行;
  - 不需要 XMLHttpRequest 或 ActiveX 的支持;
- 在请求完毕后可以通过:
  - 调用 callback 的方式回传结果;
    - 将回调方法的权限给了调用方;
    - 这个就相当于将 controller 层和 view 层终于分开了;
    - 我提供的 jsonp 服务只提供纯服务的数据;
    - 至于提供服务以后的:
      - '页面渲染'和'后续 view 操作'都由'调用者'来自己定义就好了;
      - 如果有两个页面需要渲染同一份数据:
        - 你们只需要有不同的渲染逻辑就可以了;
        - 逻辑都可以使用同 一个 jsonp 服务;

### 缺点

- 它只支持 GET 请求而不支持 POST 等其它类型的 HTTP 请求;
  - jsonp 是通过 script 的 src 实现的;
  - 因为浏览器以为是请求一个资源;
  - 所以用的是 GET，而不是其他;
- 它只支持跨域 HTTP 请求这种情况;
  - 不能解决不同域的两个页面之间:
    - 如何进行 JavaScript 调用的问题;
- jsonp 在调用失败的时候不会返回各种 HTTP 状态码;
- 安全性;
  - 万一假如提供 jsonp 的服务存在页面注入漏洞;
    - 即它返回的 javascript 的内容被人控制的;
  - 那么结果是什么？所有调用这个 jsonp 的网站都会存在漏洞;
  - 于是无法把危险控制在一个域名下;
  - 所以在使用 jsonp 的时候必须要保证:
    - 使用的 jsonp 服务必须是安全可信的;
- script 标签的 onerror 函数在 HTML5 才定义;
  - 并且即使我们定义了 onerror 处理函数;
    - 我们也不容易捕捉到错误发生的原因;

作者：little_Sun
链接：https://juejin.im/post/6867096987804794888
来源：掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
