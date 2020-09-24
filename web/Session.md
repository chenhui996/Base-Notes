# Session

- 前序:
    - Cookie是存储在客户端方;
    - Session是存储在服务端方;
    - 客户端只存储SessionId;

- 在上面我们了解了什么是Cookie;
- 既然浏览器已经通过Cookie实现了:
    - 有状态这一需求;


## 那么为什么又来了一个Session呢？

- 这里我们想象一下:
    - 如果将账户的一些信息都存入Cookie中的话;
    - 一旦信息被拦截;
    - 那么我们所有的账户信息都会丢失掉;
- 所以就出现了Session:
    - 在一次会话中将重要信息保存在Session中;
    - 浏览器只记录SessionId:
        - 一个SessionId对应一次会话请求;