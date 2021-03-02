# http 面试题

- 前端工程师开发界面，
  - 需要调用后端的接口，提交/获取 数据 ———— http 协议。
- 要求事先掌握好 ajax。

---

## 题目

### http 常见的状态码有哪些？

- 状态码分类
  - 1xx 服务器收到请求。
  - 2xx 请求成功，如 200。
  - 3xx 重定向，如 302。
  - 4xx 客户端错误，如 404。
  - 5xx 服务器端报错，如 500。
- 常见状态码
  - 200 成功。
  - 301 永久重定向（配合 location，浏览器自动处理）。
    - 场景：域名到期。换域名，老域名返回 301，让浏览器自动根据 location 信息跳转访问新域名。
  - 302 临时重定向（配合 location，浏览器自动处理）。
    - 与 301 区别：浏览器不会记住 是否是 重定向，每次都要等待返回 302，或者说等待再次确认。才会根据 location 信息跳转访问。
  - 304 资源未被修改。（缓存知识）
  - 404 资源未找到。
  - 403 没有权限。
    - 场景：没有登陆、没有权限。
  - 500 服务器错误。（5xx 找后端）
  - 504 网关超时。

### 什么是 Restful API

- Restful API
  - 一种新的 API 设计方法（早已推广使用）
  - 传统 API 设计：
    - 把每个 url 当作一个功能。
  - Restful API 设计：
    - 把每个 url 当作一个唯一的资源。（资源的标识，ID）

> Restful API 设计：用 method 表示操作类型，然后 url 设计成唯一标识的资源。具体如何对此资源进行操作，取决于用哪种 method 方法。

### http 常见的 header 有哪些？

#### 常见的 Request Headers

- 客户端往服务端发送的 Headers。
  - Accept 浏览器可接收的 '数据格式'。
  - Accept-Encoding 浏览器可接收的 '压缩算法'，如 gzip。(保证资源变小，传输的更快一些)
  - Accept-Languange 浏览器可接收的语言，如 zh-CN。
  - Connection: keep-alive 一次 TCP 连接重复使用。
  - cookie。（不是跨域，同域请求时，都会把 cookie 带上）
  - Host 域名。
  - User-Agent （简称 UA）浏览器信息。
  - Content-type 发送数据的格式，如 application/json。（post、put 请求时，告知服务器我们**发送的数据格式**）

#### 常见的 Response Headers

- 服务端向客户端返回时返回的 Headers。
  - Content-type 返回数据的格式，如 application/json。（向服务端请求数据，服务器告知我们**返回的数据格式**）
  - Content-length 返回数据的大小，多少字节。
  - Content-Encoding 返回数据的压缩算法，如 gzip。
  - Set-Cookie 服务端改 cookie。

#### 缓存相关的 headers

- Cache-Control Expires
- Last-Modified If-Modified-Since
- Etag If-None-Match

### 描述一下 http 的缓存机制（重要）

- 图片翻译成文字：
  - http 请求。
    - 有缓存：（Cache-Control）
      - 缓存是否过期？
        - 否：读取缓存（强缓存）-> 页面呈现。
        - 是：判断请求中是否有 Etag 或 Last-Modified。（也可两者都有）
          - 否：向服务器发起 http 请求（不带参） -> 服务器返回请求资源 -> 页面呈现。
          - 是：向服务器发起 http 请求（带参）：
            - 带 If-None-Match、If-Modified-Since 字段。
              - **服务端判定缓存是否可用**
                - 不可用：返回状态码 200 -> 服务器返回请求资源 -> 页面呈现。
                - 可用：返回状态码 304 -> 读取缓存（协商缓存）-> 页面呈现。

## 知识点

### http methods

- 传统的 methods
  - get 获取服务器的数据。
  - post 像服务器提交数据。
  - 简单的网页功能，就这两个操作。
- 现在的 methods
  - get 获取数据。
  - post 新建数据。
  - patch/put 更新数据。
  - delete 删除数据。
- Restful API
  - 一种新的 API 设计方法（早已推广使用）
  - 传统 API 设计：
    - 把每个 url 当作一个功能。
  - Restful API 设计：
    - 把每个 url 当作一个唯一的资源。（资源的标识，ID）

#### 如何设计成一个资源？

- **尽量不用 url 参数：**
  - 传统 API 设计： /api/list?pageIndex=2
  - Restful API 设计： /api/list/2
- **用 method 表示操作类型：**
  - 传统 API 设计：
    - post 请求：
      - /api/create-blog
      - /api/update-blog?id=100
    - get 请求：
      - /api/get-blog?id=100
  - Restful API 设计：
    - post 请求： /api/blog
    - patch 请求： /api/blog/100
    - get 请求： /api/blog/100

> Restful API 设计：用 method 表示操作类型，然后 url 设计成唯一标识的资源。具体如何对此资源进行操作，取决于用哪种 method 方法。

---

## http 缓存

### 关于缓存的介绍

- 什么是缓存？
  - 可以把一些没有必要重新获取的东西，不再重新获取。（暂存）
- 为什么需要缓存？
  - 让页面加载的更快一些。
    - 网络请求是性能问题最大的一块：
      - 尽量减少网络请求的体积和数量，使其更快。
      - 网络请求是不稳定的，信号等等问题。（所以需要缓存）
- 哪些资源可以被缓存？
  - 静态资源（js css img）

### http 缓存策略（强制缓存 + 协商缓存）

#### 强制缓存

- Cache-Control
  - 含在 Response Headers 中（服务端返回，判断此资源是否可以被缓存，若可，则标为 Cache-Control）。
  - 控制强制缓存的逻辑。（说明 '强制缓存' 本质上是由服务端控制的）
  - 例如 Cahe-Control: max-age=31536000 (单位是秒)
  - 值：
    - max-age 设置缓存时间。（要缓存）
    - no-cache 不用本地缓存。（客户端不要）
    - no-store 不用 '本地缓存' 和 '服务端' 的缓存措施。（都不要）
    - private 只能允许最终用户做缓存。
    - public 允许 '中间路由' 或者 '中间一些代理' 进行缓存。
- Expires
  - 同在 Response Headers 中。
  - 同为控制缓存过期。
  - 已被 Cache-Control 代替。

#### 资源标识

- 在 Response Headers 中，有两种资源标识：
  - Last-Modified 资源的最后修改时间。
  - Etag 资源的唯一标识（一个字符串，类似人类的指纹）。

#### 协商缓存（对比缓存）

- 服务端缓存策略。（服务端判断资源，是不是可以被缓存）
- 服务端判断客户端资源，是否和服务端资源一样。
  - 一致则告知客户端：不需要返回资源，请直接使用本地缓存。
  - 一致则返回 304，否则返回 200 和最新的资源。
  - 浏览器与服务端的 '协商缓存' 过程：
    - Last-Modified：
      - 浏览器：初次请求。
      - 服务端：返回资源，和 'Last-Modified'(资源标识)。
      - 浏览器：再次请求，请求带着 'If-Modified-Since'(资源标识，值是 Last-Modified（最近一次的 Last-Modified）)。
      - 服务端：返回 304，或返回 '资源' 和新的 'Last-Modified'(资源标识)。
    - Etag：
      - 浏览器：初次请求。
      - 服务端：返回资源，和资源的唯一标识符 'Etag'。
      - 浏览器：再次请求，请求带着 'If-None-Match'(值为 Etag)。
      - 服务端：返回 304，或返回 '资源' 和新的唯一标识符 'Etag'(资源标识)。

> 两者共存会优先使用 Etag，因为 Last-Modified 只能精确到秒级。
> 如果资源被重复生成，而内容不变，则 Etag 更精确。（1s 生成一次的话，Last-Modified 每次都会过期，就不合适，不够精确）

### http 缓存 - 综述

- 图片翻译成文字：
  - http 请求。
    - 有缓存：（Cache-Control）
      - 缓存是否过期？
        - 否：读取缓存（强缓存）-> 页面呈现。
        - 是：判断请求中是否有 Etag 或 Last-Modified。（也可两者都有）
          - 否：向服务器发起 http 请求（不带参） -> 服务器返回请求资源 -> 页面呈现。
          - 是：向服务器发起 http 请求（带参）：
            - 带 If-None-Match、If-Modified-Since 字段。
              - **服务端判定缓存是否可用**
                - 不可用：返回状态码 200 -> 服务器返回请求资源 -> 页面呈现。
                - 可用：返回状态码 304 -> 读取缓存（协商缓存）-> 页面呈现。

> 缓存一定是在客户端。

### 刷新操作方式，对缓存的影响

- 三种刷新操作：
  - 正常操作：地址栏输入 url，跳转链接，前进后退等。
  - 手动刷新：F5，点击刷新按钮，右击菜单刷新。
  - 强制刷新：ctrl + F5。
- 不同刷新操作，不同的缓存策略：
  - 正常操作：强制缓存有效，协商缓存有效。
  - 手动刷新：强制缓存失效，协商缓存有效。
  - 强制刷新：强制缓存失效，协商缓存失效。
