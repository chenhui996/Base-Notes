# JS Web API

- DOM 操作
- BOM 操作
- 事件绑定
- ajax
- 存储

## DOM 操作

- vue 和 react 框架应用广泛，封装了 DOM 操作。
- 但 DOM 操作一直都会是前端工程师的基础、必备知识。
- 只会 vue 或 react，而不懂 DOM 操作的前端程序员，不会长久。

---

- DOM 操作（Document Object Model）

## 题目

### DOM 是哪种数据结构

- 树（DOM 树），树型结构。

### DOM 操作的常用 API

- DOM 节点操作。
- DOM 结构操作。
- attribute 和 property。

### attribute 和 property 区别

- property：修改对象属性，不会体现到 html 结构中。（尽量用 property）
- attribute：修改 html 属性，会改变 html 结构。
- 两者都有可能引起 DOM 重新渲染。

### 一次性插入多个 DOM 节点，考虑性能

- 通过 '文档片段' 的方式，将各个节点先插入 '文档片段'，最后一次性插入 DOM 树中。
  - document.createDocumentFragment()

## 知识点

### DOM 本质

- 就是一棵树。
  - 从 HTML 文件解析出来的一棵树。

### DOM 节点操作

- 获取节点：
  - document.getElementById('div1'); // ID
  - document.getElementsByTagName('div') // 标签名 集合
  - document.getElementsByClassName('.container') // class 集合
  - document.querySelectAll('p') // 集合
- attribute
  - 对 DOM 结构的节点属性进行修改。
  - 可以通过两个 API 直接修改 HTML 的结构：
    - p.getAttribute('data-name');
    - p.setAttribute('data-name', 'cain');
    - p.getAttribute('style');
    - p.setAttribute('style', 'font-size: 30px');
- property
  - 对 DOM 元素的 JS 变量进行修改。
  - 本身不是 API，是一种形式。
    - 代表着 DOM 节点下的属性操作。
      - p1.style.width
      - p1.calssName
      - p1.nodeName
      - p1.nodeType (:number)
      - ...

> property：修改对象属性，不会体现到 html 结构中。（尽量用 property）
> attribute：修改 html 属性，会改变 html 结构。
> 两者都有可能引起 DOM 重新渲染。

### DOM 结构操作

- 新增/插入节点。
  - 对于现有节点使用 appendChild，会移动节点。

```js
// 添加新节点
const div1 = document.getElementById("div1");
const p1 = document.createElement("p");
p1.innerHTML = "this is p1";
div1.appendChild(p1); // 插入新创建的元素

// 移动已有节点。注意是移动
const p2 = document.getElementById("p2");
div1.appendChild(p2);
```

- 获取子元素列表，获取父元素。
  - 获取子元素列表：div1.childNodes
  - 获取父元素：div1.parentNode

```js
// 获取子元素列表有坑
// 会获取到 text 节点
// 正确处理
const divChildNodes = Array.prototypr.slice
  .call(div1.childNodes)
  .filter((child) => {
    if (child.nodeType === 1) {
      return true;
    }
    return false;
  });

console.log("divChildNodes", divChildNodes);
```

- 删除子元素。
  - removeChild();

### DOM 性能

- DOM 操作非常 '昂贵'，要避免频繁的 DOM 操作。
  - 对 DOM 查询做缓存。
  - 将频繁操作改为一次性操作。

#### DOM 查询做缓存

```js
// 不缓存 DOM 查询结果
for (let i = 0; i < document.getElementsByTagName("p").length; i++) {
  // 每次循环，都会计算 length，频繁进行 DOM 查询
}

// 缓存 DOM 查询结果
const pList = document.getElementsByTagName("p");
const length = pList.length;
for (let i = 0; i < length; i++) {
  // 缓存 length，只进行一次 DOM 查询
}
```

#### 将频繁操作改为一次性操作

```js
const listNode = document.getElementById("list");

// 创建一个 '文档片段'，此时还没有插入到 DOM 树中
const frag = document.createDocumentFragment();

// 执行插入
for (let x = 0; x < 10; x++) {
  const li = document.createElement("li");
  li.innerHTML = "List item" + x;
  frag.appendChild(li);
}

// 都完成之后，再插入到 DOM 树中
listNode.appendChild(frag);
```

> 涉及到 DOM 操作时，要尽量做到 '缓存' 或 '合并处理'。

---

# BOM 操作（Browser Object Model）

## 题目

### 如何识别浏览器的类型

- navigator API

```js
// navigator
const ua = navigator.userAgent;
const isChrome = ua.indexOf("Chrome");
console.log(isChrome);
```

### 分析拆解 url 各个部分

- location
  - location.href // 整个网址
  - location.protocol // 'http:' 'https:'
  - location.host // 主域名部分
  - location.pathname // 浏览器路径
  - location.search // 查询参数 '?a=100.....'
  - location.hash // '#' 后面的内容

## 知识点

### navigator

- 浏览器信息
  - navigator.userAgent

### screen

- 屏幕信息
  - screen.width
  - screen.height

### location

- 地址信息（url）
  - location.href // 整个网址
  - location.protocol // 'http:' 'https:'
  - location.host // 主域名部分
  - location.pathname // 浏览器路径
  - location.search // 查询参数 '?a=100.....'
  - location.hash // '#' 后面的内容

### history

- 前进/后退
  - history.back()
  - history.forward()

---

# JS Web API 事件

## 题目

### 编写一个通用的事件监听函数

```js
function bindEvnet(elem, type, selector, fn) {
  if (fn == null) {
    fn = selector;
    selector = null;
  }
  elem.addEventListener(type, (event) => {
    const target = event.target;
    if (selector) {
      // 代理绑定
      if (target.matches(selector)) {
        // 保证是指定的 标签 触发。
        fn.call(target, event);
      }
    } else {
      // 普通绑定
      fn.call(target, event);
    }
  });
}
```

### 描述事件冒泡的流程

- 基于 DOM 树形结构：
  - 事件会顺着触发元素往上冒泡。
- 应用场景：
  - 事件代理

### 无限下拉的图片列表，如何监听每个图片的点击？

- 事件代理：
  - 用 event.target 获取触发元素。
    - **用 matches 来判断是否是触发元素**。

## 知识点

### 事件绑定

- btn.addEventListener();

### 事件冒泡

- 事件顺着 DOM 结构往上冒。

```js
function bindEvnet(elem, type, fn) {
  elem.addEventListener(type, fn);
}

const body = document.body;
bindEvent(body, "click", (event) => {
  console.log("取消");
});

const p1 = document.getElementById("p1");
bindEvent(p1, "click", (event) => {
  event.stopPropagation(); // 阻止事件冒泡
  console.log("激活");
});

// 打印出来

// div2 clicked
// body clicked
```

> 事件会顺着 DOM 结构往外冒泡，直至 body。

### 事件代理

- 代码简洁。
- 减少浏览器内存占用。
- 但是，不要滥用。

```js
// 事件加在父元素上，只用加一个，避免了多个事件绑定。
const div3 = document.getElementById("div3");
bindEvent(div3, "click", (event) => {
  event.preventDefault();
  const target = event.target;
  if (target.nodeName === "A") {
    alert(target.innerHTML);
  }
});
```

---

# Ajax

## 题目

### 手写一个简易的 ajax

```js
// get 请求
// 配合 Promise 链式调用

function ajax(url) {
  const p = new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          resolve(JSON.parse(xhr.responseText));
        } else if (xhr.status === 404) {
          reject(new Error("404 not found"));
        }
      }
    };
    xhr.send(null);
  });

  return p;
}

const url = "/data/test.json";
ajax(url)
  .then((res) => {
    console.log("res", res);
  })
  .catch((err) => {
    console.log("err", err);
  });
```

### 跨域的常用实现方式

- JSONP
- CORS(纯服务端)

## 知识点

### XMLHttpRequest

- ajax 的一个核心的 API。

```js
// get 请求
const xhr = new XMLHttpRequest();
xhr.open("GET", "/data/test.json", true); // true 是异步
xhr.onreadystatechange = function () {
  // 这里的函数异步执行，可参考之前 JS 基础中的异步模块
  if (xhr.readyState === 4) {
    if (xhr.status === 200) {
      console.log(JSON.parse(xhr.responseText));
      alert(xhr.responseText);
    } else {
      console.log("其他情况");
    }
  }
};
xhr.send(null);
```

```js
// post 请求
const xhr = new XMLHttpRequest();
xhr.open("POST", "/login", true); // true 是异步
xhr.onreadystatechange = function () {
  // 这里的函数异步执行，可参考之前 JS 基础中的异步模块
  if (xhr.readyState === 4) {
    // 大前提，只有 readyState === 4，才能继续进入状态码的情况分析。
    if (xhr.status === 200) {
      console.log(JSON.parse(xhr.responseText));
      alert(xhr.responseText);
    } else {
      console.log("其他情况");
    }
  }
};
const postData = {
  username: "cain",
  password: "123123",
};
xhr.send(JSON.stringify(postData));
```

#### xhr.readyState

- 0 - (未初始化) 还没有调用 send()方法。
- 1 - (载入) 已调用 send()方法，**正在发生请求。**
- 2 - (载入完成) send()方法执行完成，**已经接收到全部响应内容。**
- 3 - (交互) **正在解析响应内容。**
- 4 - (完成) **响应内容解析完成**，可以在客户端调用。

> 最后到 4，拿到 responseText。

### 状态码

- readyState
- status

- xhr.status 同理：
  - 2xx - 表示成功处理请求，如 200。
  - 3xx - 需要重定向，浏览器直接跳转，如 301 302 304。
    - 301: 永久重定向。
    - 302: 临时重定向。
    - 304: 资源未改变，浏览器会用自己的缓存资源。
  - 4xx - 客户端请求错误，如 404 403。
    - 404: 请求地址有错误。
    - 403: 客户端没有权限。
  - 5xx - 服务器端错误。（找后端）

---

## 跨域：同源策略，跨域解决方案

- 所有的跨域，都必须经过 server 端允许和配合。
  - 未经 server 端允许就实现跨域，说明浏览器有漏洞，危险信号。

> 跨域：同源策略（如何绕过），JSONP，CORS。

### 什么是跨域（同源策略）

- ajax 请求时，浏览器要求当前网页和 server 必须同源（安全）。
  - 同源：
    - 协议、域名、端口，三者必须一致。**（端口没写，默认端口是 80）**

> 仅限浏览器，若是服务端发送的请求，还是可以把数据拿到。（爬虫等）

#### 加载图片 css js 可无视同源策略

```html
<img src="跨域的图片地址" />
<!-- CDN -->
<img href="跨域的css地址" />
<!-- 第三方库、插件等 -->
<script src="跨域的js地址"></script>
```

> 浏览器没有限制。
> 服务器端可做 '防盗链限制'，限制上述三种情况，具体未深入了解。

#### 能干什么？

- `<img src="第三方统计服务地址" />` 可用于统计打点，可使用第三方统计服务。（PV、UV 等统计的次数）
- `<link/> <script>` 可使用 CDN，CDN 一般都是外域。
- `<script>` 可实现 JSONP。

### JSONP

- `<script>` 可绕过跨域限制。
- 服务器可以任意动态拼接数据返回。
- 所以，`<script>` 就可以获得跨域的数据，只要服务端愿意返回。

```html
<script>
  window.abc = function (data) {
    console.log(data);
  };
</script>
<script src="http://localhost:8002/jsonp.js?username=xxx&callback=abc"></script>
```

### CORS（服务端支持）

- 服务器端设计 http header

```js
// 第二个参数填写允许跨域的域名称，不建议直接写 "*"。
response.setHeader("Access-Control-Allow-Origin", "http://localhost:8011");
response.setHeader("Access-Control-Allow-Headers", "X-Requested-With");
response.setHeader(
  "Access-Control-Allow-Methods",
  "PUT,POST,GET,DELETE,OPTIONS"
);

// 接收跨域的cookies
response.setHeader("Access-Control-Allow-Credentials", "true");
```

> 若服务器端做了 CORS（服务端支持）操作，那么我们也不需要使用 JSONP 操作，直接 Ajax 操作即可。

---

## 实际项目中 ajax 的常用插件

- jQuery
- Fetch
- axios

### Fetch

- fetch() 返回的 Promise 不会被标记为 reject，即使该 HTTP 响应的状态码是 404 或 500。
- 仅当网络故障时或请求被阻止时，才会标记为 reject。
- fetch 不会从服务端发送或接收任何 cookies。
  - 要发送 cookies，必须设置 credentials 选项。

```js
// Fetch
fetch("http://example.com/movies.com")
  .then(function (response) {
    return response.json();
  })
  .then(function (myJson) {
    console.log(myJson);
  });
```

---

## 存储

## 题目

### 描述 cookie localStorage sessionStorage 区别

- 容量
- API 易用性
- 是否跟随 http 请求发送出去。

## 知识点

### cookie

- 本身用于浏览器和 server 通讯。（本身属于 http 请求的一部分）
- 被 "借用" 来，到本地存储。（由于早期没有合理的本地存储工具）
- 可用 document.cookie = '...' 来修改。（前端的修改方式）
- 虽然可以强作 '本地存储'，但有缺点：
  - 存储大小，最大 4KB。
  - http 请求时需要发送到服务端，增加请求数据量。
  - 只能用 document.cookie = '...' 来修改，太过简陋。

### localStorage 和 sessionStorage

- HTML5 专门为存储而设计，最大可存 5M。
- API 简单易用：
  - localStorage.setItem(key, value);
  - localStorage.getItem(key);
  - sessionStorage 同理。
- 不会随着 http 请求被发送出去。

#### 二者区别

- localStorage 数据会永久存储，除非代码或手动删除。
- sessionStorage 数据只存在于当前会话，浏览器关闭则清空。
- 一般用 localStorage 会多一些。
