### HTTP 缓存机制

- Web 缓存大致可以分为:
  - 数据库缓存;
  - 服务器端缓存（代理服务器缓存、CDN 缓存）;
  - 浏览器缓存;

## 浏览器缓存

- 浏览器缓存也包含很多内容:
  - HTTP 缓存;
  - indexDB;
  - cookie;
  - localstorage;
  - 等等;
- 这里我们只讨论 HTTP 缓存相关内容;

# HTTP 缓存

- 在具体了解 HTTP 缓存之前先来明确几个术语:
  - 缓存命中率:
    - 从'缓存中'得到'数据'的'请求数'与'所有请求数'的'比率';
    - 理想状态是越高越好;
  - 过期内容:
    - 超过设置的有效时间，被标记为“陈旧”的内容;
    - 通常'过期内容不能用于回复'客户端的请求:
      - 必须重新向源服务器请求新的内容;
      - 或者'验证缓存'的内容是否仍然准备;
  - 验证:
    - 验证缓存中的过期内容是否仍然有效;
    - 验证通过的话刷新过期时间;
  - 失效:
    - 失效就是把内容从缓存中移除;
    - 当内容发生改变时就必须移除失效的内容;