# 运行环境

- 运行环境通常指浏览器（server 端有 nodejs）。
  - 浏览器下载网页代码，渲染出页面，期间会执行若干 JS。
- 需要做什么？
  - 要保证代码在浏览器中：
    - **稳定且高效。**

---

# 网页是如何加载并渲染出来的？

## 题目

### 从输入 url 到渲染处页面的整个过程

- 下载资源：
  - 各个资源类型，下载过程。
- 渲染页面：
  - 结合 html css javascript 图片 等

### window.onload 和 DOMContentLoaded 的区别

```js
window.addEventListener("load", function () {
  // 页面的全部资源加载完才会执行，包括图片、视频等
});
document.addEventListener("DOMContentLoaded", function () {
  // DOM 渲染后即可执行，此时图片、视频还可能没有加载完。
});
```

> DOMContentLoaded 可能会比 window.onload 更快一些。

## 知识点

### 加载资源的形式

- 资源的形式：
  - html 代码。
  - 媒体文件，如图片、视屏等。
  - javascript css

### 加载资源的过程

- 加载过程：
  - 输入 url，第一步的时候进行：
    - DNS 解析：域名 -> IP 地址。（为什么不直接用 IP 地址？1.域名更好记。2.大型网站，不同区域 IP 地址不同）
  - 第二步：
    - 浏览器根据 IP 地址向 '服务器' 发起 http 请求。（本质上是浏览器调用，操作系统的发送请求服务）
  - 第三步：
    - 服务器处理 http 请求，并返回给浏览器。

> DNS：域名解析服务。（因为我们最终还是要将域名解析成 IP 地址的）

### 渲染页面的过程

- 渲染过程：
  -  第一步：
    - 根据 HTML 代码生成 DOM Tree。
    - 根据 CSS 代码生成 CSSOM。
  - 第二步：
    - 将 DOM Tree 和 CSSOM 整合形成 Render Tree。
  - 第三步：渲染页面
    - 根据 Render Tree 渲染页面。
    - 遇到 `<script>` 则暂停渲染，优先加载并执行 JS 代码，完成再继续。
    - 直至把 Render Tree 渲染完成。

#### css 的 link 标签为何要放在 head 中？

- 在 DOM 加载之前，先加载 CSS：
  - 避免加载 DOM 时，重复渲染加载。

#### js 的 script 标签为何要放在 body 尾部？

- JS 会阻塞 DOM 渲染：
  - 若 JS 复杂，响应较慢，体验方面会很差。
    - 所以放在尾部，避免阻塞 DOM 渲染页面。

---

# 性能优化、体验优化

- 是一个综合性问题，没有标准答案，但要求尽量全面。
- 某些细节问题可能会单独提问：
  - 手写 防抖、节流。
- 目前只关注核心点，针对面试。

### 性能优化原则

- 多使用内存、缓存或其他方法。
- 减少 CPU 计算量，减少网络加载耗时。

> 适用于所有编程的性能优化 ———— 空间换时间。

## 性能优化从何入手？

- 让加载更快。
- 让渲染更块。

### 让加载更快

- 减少资源体积：压缩代码。
  - webpack 配置文件中：mode:'production'，编译后代码即为压缩后的代码。
- 减少访问次数：
  - 合并代码。（webpack）
  - SSR 服务器端渲染：将网页和数据一起加载，一起渲染。
    - 服务端将网页和页面需要显示的内容，一块给前端显示出来。
      - 这样前端拿到内容后，就可以立马把内容展示出来。
    - 若不用 SSR（前后端分离）：
      - 先加载网页，网页的 ajax 再加载数据，返回数据后再渲染数据。
      - 早先的 JSP、ASP、PHP，就是相当于现在的 vue 和 React 的 SSR。
  - 缓存。
    - webpack：
      - 静态资源加 hash 后缀，根据文件内容计算 hash。
        - 文件内容不变，则 hash 不变，则 url 不变。
          - url 和文件不变，则会自动触发 http 缓存机制，返回 304。（协商缓存）
- 使用更快的网络：CDN。

### 让渲染更快

- CSS 放在 head，JS 放在 body 最下面。
- 尽早开始执行 JS，用 DOMContentLoaded 触发。
- 懒加载（图片懒加载，上滑加载更多）。
  - 懒加载就是不是直接加载，而是什么时候用，什么时候加载。
- 对 DOM 查询进行缓存。
- 频繁 DOM 操作，合并到一起插入 DOM 结构。
- 节流 throttle 、防抖 debounce。（它不是让渲染更快，应该说是让渲染更加流程）

#### 懒加载

- 一开始给一张体积很小的 '预览图片'。
  - 当满足触发条件后（比如下拉）：
    - 再通过 JS 将属性上 '真正的图片地址'：
      - 赋值给 img。

> 这，就是懒加载。

```html
<img id="img1" src="preview.png" data-realsrc="abc.png" />
<script type="text/javascript">
  const img1 = document.getElementById("img1");
  img1.src = img1.getAttribute("data-realsrc");
</script>
```

---

### 手写防抖 debounce 函数

- 监听一个输入框的：
  - 文字变化后：
    - 触发 change 事件。（useRef？受控组件？）
- 场景：
  - 一边输入用户名，一边根据你输入的信息，显示一些提示信息（用户名不可用等等）。
    - 若是直接用 keyup 事件，则会频繁触发 change 事件。
      - 所以防抖就是：
        - 用户输入结束或暂停时，才会触发 change 事件。

```js
// 手写防抖 debounce 函数
function debounce(fn, delay = 500) {
  // timer 是闭包中
  let timer = null;
  return function () {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn.apply(this, arguments);
      timer = null;
    }, delay);
  };
}

const input1 = document.getElementById("input");

input1.addEventListener(
  "keyup",
  debounce(function () {
    console.log(input1.value);
  }, 600)
);
```

---

### 手写节流 throttle

- 控制拖拽的节奏。

```js
// 手写节流 throttle 函数
function throttle(fn, delay = 100) {
  let timer = null;
  return function () {
    if (timer) {
      return;
    }
    timer = setTimeout(() => {
      fn.apply(this, arguments);
      timer = null;
    }, delay);
  };
}

const div1 = document.getElementById("div1");
div1.addEventListener(
  "drag",
  throttle(function (e) {
    console.log(e.offsetX, e.offsetY);
  }, 100)
);
```

---

# 安全（前端）

## 问题：常见的 web 前端攻击方式有哪些？

- XSS 跨站请求攻击。
- XSRF 跨站请求伪造。

### XSS 攻击

- 场景：
  - 一个博客网站，我发表一篇博客，其中嵌入 `<script>` 脚本。
    - 脚本内容：获取 cookie，发送到我的服务器（我的服务器配合跨域）。
      - 发布这篇博客，有人查看它，我轻松收割此访问者的 cookie。（document.cookie）
- 预防：
  - 替换特殊字符，如 `<` 变为 `&lt:`,`>` 变为 `&gt;`。
    - 如此操作之后：
      - `<script>` 标签将变为 `&lt:script&gt;`，将会直接显示，而不会作为脚本执行。

> 前端要替换，后端也要替换，都做总不会有错。
> npm 有工具 ———— xss

### XSRF 跨站请求伪造

- 场景：
  - 用户登陆了购物网站，在浏览。
    - 我向用户发送一封电子邮件，邮件标题很吸引人。
      - 但邮件正文隐藏这 `<img src=xxx.com/pay?id=200 />`。（img 标签可以跨域，所以可以带着我的用户信息过去，cookie）
        - 用户一查看邮件，就帮我购买了 id 是 200 的商品。（虽然商品不给我，但是给店铺制造了销量和诈骗盈利）
- 预防：
  - 使用 post 接口：
    - 因为在 post 接口做跨域很麻烦，需要服务端支持。
  - 购买前增加验证，例如密码、短信验证码、指纹等。
