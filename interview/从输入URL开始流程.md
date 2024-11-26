# 从输入URL开始建立前端知识体系

这篇文章全面介绍了: 从输入 URL 开始 -> 前端页面渲染完成 -> 整个知识体系。包括：

- **浏览器主要进程**
- **输入网址解析**
- **缓存机制**
- **DNS 域名解析**
- **TCP/IP 连接**
- **HTTP 请求及各版本特点**
- **服务器处理请求**
- **浏览器渲染页面**
- **断开连接等内容**
  
并对其中的 **关键概念** 和 **流程** 进行了详细阐述。

--- 

## 前置内容 浏览器主要进程

浏览器是多进程的，主要分为：

- **浏览器主进程**：只有一个，主要控制页面的创建、销毁、网络资源管理、下载等。
- **第三方插件进程**：每一种类型的插件对应一个进程，仅当使用该插件时才创建。
- **GPU进程**：最多一个，用于3D绘制等。
- **浏览器渲染进程(浏览器内核)**：每个Tab页对应一个进程，互不影响。
  - GUI渲染线程：负责渲染浏览器界面，解析HTML、CSS，构建DOM树和Render树，布局和绘制等。
  - JavaScript引擎线程：负责处理JavaScript脚本程序。
  - 事件触发线程：负责事件轮询，发送事件到事件队列中。
  - 定时触发器线程：setInterval与setTimeout所在的线程。
  - 异步http请求线程：处理XMLHttpRequest请求。

## 第一部分 输入网址并解析

这里我们只考虑输入的是一个URL 结构字符串，如果是非 URL 结构的字符串，则会用 **浏览器默认的搜索引擎** 搜索该字符串。

### URL的组成

- URL 主要由 协议、主机、端口、路径、查询参数、锚点6部分组成！
  - **协议**：http、https、ftp、file 等。
  - **主机**：www.baidu.com、www.google.com 等。
  - **端口**：80、8080、443 等。
  - **路径**：/、/index.html、/images 等。
  - **查询参数**：?id=1&name=2 等。
  - **锚点**：#top、#bottom 等。

## 1. 解析 URL

输入URL后，浏览器会解析出 **协议、主机、端口、路径等**信息，并构造一个HTTP请求。

- 浏览器发送请求前，根据 **请求头** 的 **expires** 和 **cache-control** 判断是否命中（包括是否过期）**强缓存**策略，如果命中，直接从缓存获取资源，并**不会发送请求**。
  - 如果没有命中，则进入下一步。
- **没有命中** 强缓存规则，浏览器会 **发送请求**，根据 **请求头** 的 **If-Modified-Since** 和 **If-None-Match** 判断 **是否命中协商缓存**，如果命中，直接从缓存获取资源。
  - 如果没有命中，则进入下一步。
- 如果前两步都没有命中，则 **直接从服务端获取资源**。

### HSTS
- HSTS，HTTP Strict Transport Security，简单说就是强制客户端使用 HTTPS 访问页面。其原理就是：
  1. 在服务器响应头中添加 Strict-Transport-Security，可以设置 max-age。
  2. 用户访问时，服务器种下这个头。
  3. 下次如果使用 http 访问，只要 max-age 未过期，客户端会进行内部跳转，可以看到 307 Redirect Internel 的响应码。
  4. 变成 https 访问源服务器。
- 由于安全隐患，会 **使用 HSTS 强制客户端使用 HTTPS 访问页面**。
- 当你的网站均采用 HTTPS，并符合它的安全规范：
  - 就可以申请加入 HSTS 列表，之后用户不加 HTTPS 协议再去访问你的网站，浏览器都会定向到 HTTPS。
- 无论匹配到没有，都要开始 DNS 查询工作了。