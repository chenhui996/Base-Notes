# Cookie

- 在了解 Cookie 概念之前我们先要了解:
  - HTTP 是无状态的 Web 服务器;
- 什么是无状态呢？
  - 就像'夏洛特烦恼'中经典的一幕对话一样;
    - 一次对话完成后;
    - 下一次对话'完全不知道'上一次对话发生了什么;
  - 如果在 Web 服务器中:
    - 只是用来'管理静态文件'还好说;
    - 对方是谁并不重要;
    - 把'文件'从磁盘中读'取出来发出去'即可;
  - 但是随着网络的不断发展:
    - 比如电商中的购物车:
      - 只有记住了用户的身份;
      - 才能够执行接下来的一系列动作;
- 所以此时就需要:
  - 无状态的服务器记住一些事情;

## 那么 Web 服务器如何记住一些事情呢？

- 既然 Web 服务器记不住东西;
- 那么我们就在外部想办法记住:
  - 相当于服务器给:
    - 每个客户端都贴上了一个小纸条;
  - 上面记录了服务器给我们返回的一些信息;
  - 然后服务器看到这张小纸条就知道我们是谁了;

## 那么 Cookie 是谁产生的呢？

- Cookies 是由服务器产生的;
- 接下来我们描述一下 Cookie 产生的过程:

### 第一步：

- '浏览器'第一次访问'服务端'时:
  - '服务器'此时肯定不知道'他'的身份;
  - 所以创建一个独特的身份标识数据:
    - 放入到 Set-Cookie 字段里;
      - 格式为 key=value;
    - 随着'响应报文'发给浏览器;

### 第二步:

- 浏览器看到有 Set-Cookie 字段以后:
  - 就知道这是'服务器'给的'身份标识';
  - 于是就保存起来;
    - '下次请求'时会自动将:(核心：记住，是下次请求时！！！！)
      - 此 key=value 值放入到 Cookie 字段中;
  - 发给服务端;

### 第三步:

- 服务端收到请求报文后:
  - 发现 Cookie 字段中有值;
  - 就能根据此值:
    - 识别用户的身份然后提供个性化的服务;

### 代码演示

- 接下来我们用代码演示一下服务器是如何生成;
- 我们自己搭建一个后台服务器;
- 这里我用的是 koa 搭建的:
  - 配合 koa-router 使用添加 cookies 值

```js
const Koa = require("koa");
const KoaRouter = require("koa-router");

const port = 5624;
const hostname = "127.0.0.1";

const app = new Koa();
const router = new KoaRouter();

router.get("/", (ctx) => {
  ctx.body = "请去fatchcookies获取cookies";
});
// koa支持直接ctx.cookies.set来添加cookies,格式为key = value
router.get("/fatchcookies", (ctx) => {
  ctx.cookies.set("cain", "18");
  console.log(ctx.cookies);
  ctx.body = `11`;
});

// 引用koa-router插件
let routerMiddleware = router.routes();

app.use(routerMiddleware);

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
```

- 项目启动以后我们输入路径 http://127.0.0.1:5624/fatchcookies
  - 然后查看发的请求;
  - 可以看到浏览器:
    - 这是我们首次访问服务器时发送的请求;
    - 可以看到服务器返回的响应(Response Headers)中有 Set-Cookie 字段;
    - Response Headers 下面的 Set-Cookie 字段:
      - 即添加成功了一个自定义的 cookies;
- 接下来我们再次刷新这个页面:
  - 可以看到在请求体(Request Headers)中已经设置了 Cookie 字段;
  - 并且将我们的值也带过去了;
  - 这样'服务器'就能够根据 Cookie 中的值'记住我们的信息'了;
- 接下来我们换一个请求呢？
  - 是不是 Cookie 也会带过去呢？
  - 接下来我们输入路径http://127.0.0.1:5624 请求;
  - 我们可以看到 Cookie 字段还是被带过去了

### 浏览器的 Cookie 是存放在哪呢？

- 如果是使用的是 Chrome 浏览器的话:
  - 那么可以按照下面步骤:
    - 在计算机打开 Chrome;
    - 在右上角，依次点击更多'图标'->'设置';
    - 在'底部'，点击'高级'；
    - 在'隐私设置和安全性'下方，点击'网站设置';
    - 依次点击'Cookie'->'查看所有 Cookie 和网站数据'
- 然后可以根据域名进行搜索:
  - 所管理的 Cookie 数据;
- 所以是'浏览器'替你管理了 Cookie 的数据;
  - 如果此时你换成了 Firefox 等其他的浏览器;
  - 因为 Cookie 刚才是存储在 Chrome 里面的;
    - 所以服务器又蒙圈了;
    - 不知道你是谁;
    - 就会给 Firefox 再次贴上小纸条;

### Cookie 中的参数设置

- 说到这里，应该知道了 Cookie 就是:
  - '服务器'委托'浏览器'存储在'客户端'里的一些数据;
  - 而这些'数据':
    - 通常都会记录'用户'的'关键识别信息';
- 所以 Cookie 需要用一些其他的手段用来保护:
  - 防止外泄或者窃取;
  - 这些手段就是 Cookie 的属性;

#### Max-Age

- 作用:
  - 设置 cookie 的过期时间，单位为秒;
- 后端设置方法:
  - cookie.setMaxAge(10);

#### Domain

- 作用:
  - 指定了Cookie所属的域名;
- 后端设置方法:
  - cookie.setDomain("");

#### Path

- 作用:
  - 指定了Cookie所属的路径;
- 后端设置方法:
  - cookie.setPath("");

#### HttpOnly

- 作用:
  - 告诉浏览器此Cookie只能靠:
    - 浏览器Http协议传输,禁止其他方式访问;
- 后端设置方法:
  - cookie.setHttpOnly(true);

#### Secure

- 作用:
  - 告诉浏览器此Cookie只能在:
    - Https安全协议中传输,如果是Http则禁止传输;
- 后端设置方法:
  - cookie.setSecure(true)

**下面我就简单演示一下这几个参数的用法及现象**

```js
app.use(async(ctx)=>{
    if(ctx.url==='/index'){
        ctx.cookies.set('cid','comedy',{
            domain:'localhost',     //写cookie所在的域名
            path:'/index',          //写cookie所在的路径
            maxAge:60*1000,         //写cookie有效时长
            expires:7,
            httpOnly:false,
            overwrite:false
        })
        ctx.body = 'cookie is ok'
    }else{
        ctx.body = 'hello world'
    }
})
```