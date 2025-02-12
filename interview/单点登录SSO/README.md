# 单点登录（SSO）

- 这篇文章主要介绍了单点登录（SSO）相关内容。
- 包括常见模式如:
  - session + cookie
  - token
  - token + refreshToken 及其优缺点
  - token 无感刷新的实现及优化
  - 还提到了 OAuth2 协议
- 最后指出:
  - 小规模系统适用 Session + Cookie，
  - 大规模系统适合 Token 或双 Token
  - 第三方登录用 OAuth2。

## 前言

- 一个规模大点的公司大概率会有很多子系统，每个子系统都是属于公司的，**没必要为每个子系统做一个登录系统**，因为用户是相通的。
- **把每个子系统的登录部分抽离出来形成一个 “认证中心”，这就是单点登录(Single Sign On)**

- 实现单点登录的模式比较多，并没有固定的模式，不过有：
  - 标准模式（CAS, OAuth2）
  - 非标准模式
- 可能每个公司实现方案都不相同。
- 但从技术上来看，大体上可以分为两种：
  - session + cookie
  - token

## session + cookie

- 用户将账号密码信息发给 **认证中心**。
- 认证中心有个 session 表格，里面是 **键值对**：
  - key 是生成的全局唯一 id
  - value 就是用户的身份信息
- 一旦用户登录成功，表格里面就会记录一条信息。

> 只要认证中心的 session 表有这个用户的信息，那么就表明该用户是登录成功的状态。
> 反之，session 表没这个信息，用户就会登录失效，有可能是过期了。
> session 表有可能是存在 **数据库** 的，也有可能是存在 **redis(内存)** 中。

- 用户登录成功，cookie 把 sid 带给用户，浏览器保存 sid，后面浏览器访问 **子系统**，把 sid 带过去。
- 子系统，并没有 session 表去判定是否有效。
  - 于是，子系统会 -> 将接收到的 sid 发给 -> **认证中心**。
  - **认证中心** 去查，查到后，告诉 **子系统 该用户完成登录**，具有权限。
  - 把身份信息给到子系统。
- 这种模式好处：
  - **认证中心** 控制力很强：
    - 只要 session 表删除了用户信息，用户就会立马下线，再配合黑名单，用户就登不上系统了。
- 但是：
  - 这种模式下只要 **用户体量很大**，**认证中心的压力就会非常大**。
  - 不同子系统 **不断的给** 认证中心发 sid 让他判断。
  - 并且表也会非常庞大
  - 还要做 session 集群
  - 并且认证中心不能挂
  - 你需要给他做一个 session 容灾
  - 再者，某个子系统的 **用户体量很大** 导致 **该系统要扩容**。
    - 这样一来，这个子系统给认证中心发 sid 的频率也在变大，随之认证中心也要扩容。
  - 这里面所有的缺陷最终都是指向烧钱，为了降低成本，**token 模式随之诞生**

---

- ai 生成具体流程如下：

1. 用户登录成功后，认证中心会给用户一个 **cookie**，这个 cookie 里面存的是 **session id**。
2. 用户再去访问其他子系统的时候，会带着这个 cookie 去访问。
3. 子系统拿到 cookie 里面的 session id，去认证中心查找，看看这个用户是否登录成功。
4. 如果登录成功，子系统就会给用户一个 **子系统的 session**，这个 session 里面存的是用户的身份信息。
5. 这样用户就可以在子系统里面做一些操作了。

---

## token

- 这个模式下的认证中心压力很小，因为 **认证中心不需要存储用户信息**。

- token 模式下用户向认证中心发送登录信息后，认证中心此时并没有向 session 表去记录任何东西。
- 认证中心会生成一个 **不能篡改的字符串 token** 给用户，这其实就是 jwt。
  - 跳转：[jwt](./JWT.md)
- 用户接收到 token 后，会将token 存入。
- 可以存 cookie 也可以存入 localStorage 都可以，后面的事情就无关认证中心了。
- 于是用户访问某个子系统时带上 token，**子系统是可以自己认证的**。
- 具体认证方式比如：
  - **子系统** 和 **认证中心** 去 **交换一个密钥**。
  - 子系统拿到一个密钥之后可以自行认证用户的 token 是否为认证中心颁发的。
  - 一旦认证成功就会把 **受保护的资源** 发给用户，这样就完成了认证。
- 由此可见，token 模式下认证中心压力就很小了。
- 因为子系统几乎没有向认证中心发送任何的请求，成本随之降低。
- 具体 **某个子系统用户体量大而去扩容也不会影响到认证中心**。
- 缺点也显而易见：
  - 认证中心失去了对用户的绝对控制。
  - 假设某个用户违规操作，现在希望让这个用户下线，就需要认证中心向每个子系统去发送信息，让用户下线。
  - 一两个子系统倒还好，一旦子系统过多就很麻烦。
- 为了解决这个问题，**双 token** 随之诞生。

---

## token + refreshToken

- 这个模式下有两个 token，一个原 token 一个刷新 token。
  
- 用户在登录完成后，认证中心会发送两个 token：
  - 一个 token 是所有子系统都能识别的。
  - 另一个刷新 token 只有认证中心自己认识。
- 原 token 的刷新时间非常短，可能 20min 刷新一次。
- 刷新 token 的过期时间会比较长，比如一周一个月。

- 假设原 token 没有失效，那么流程就和单token 模式一样的。
- 假设失效了，用户就会拿着刷新 token 去认证中心刷新 token。
- 刷新 token 成功后，**认证中心会给用户一个新的 token**，这样用户就可以继续访问子系统了。
- 这样一来，认证中心就可以控制用户的下线了。

- 用户第一次登录会收到认证中心的两个 token。
- 假设用户过了一段时间去登录子系统：
  - 原 token 过期了，子系统告诉这个 token 失效。
  - 此时用户会将 刷新 token 发给认证中心去验证，认证中心会返回一个新的 token 给到用户。
  - 用户再去访问子系统就可以正常访问了。

- 这个模式的意义相较于单 token 模式 **多了层对用户的控制**。
- 比如某个用户违规操作希望让其下线。
- 虽然不能让该用户立即下线。
- 但是原 token 一旦过期，用户拿着 refreshToken 向认证中心索要 token 时：
  - 认证中心不管就行，其余子系统是无感的。

- 但是这种模式也有缺点：
  - 认证中心压力会比单 token 模式大一点。
  - 因为用户在刷新 token 的时候，认证中心会去查看刷新 token 是否有效。
  - 但是这个压力相对于 session + cookie 还是小很多的。

---

## token 无感刷新

> token 的无感刷新其实主要工作在于后端。

- 看个情形：
  - 一般 token 过期时间很短，假设 token 过期时间为 10min。
  - 用户登录 10min 后 token 失效就会把你送回登录界面重新登录。
  - 此时查看 request 你会发现其实是携带了 token 的，只不过你的 token 失效了，因此 401 了。
  - 每次 10min 后用户都要重新登录下，这样用户体验很糟糕。

- 如何解决这个问题呢？我们可以加一个刷新 token，也就是 refreshtoken。
- 这个 token 的过期时间一般会设置较长比如一周、两周、一个月，这个 token 的作用就是去给你替换新的 原token。

- 所谓 token 无感刷新就是：
  - 让你 原 token 过期时，前端默默帮你把 refreshtoken 替换成了新 token。
  - 用户不再需要重新登陆去拿到新的原 token。

- 所以前端想要实现无感刷新的基本思路就是：
  - 当原 token 过期时，用refreshtoken替换原token。
  - 写一个 refreshtoken 函数即可：
    - 需要去封装 axios，拦截器 interceptors。

- 一个简单的实现：

```js
// axios.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      return refreshToken().then(() => {
        return instance(error.config);
      });
    }
    return Promise.reject(error);
  }
);

// 刷新 token
function refreshToken() {
  return instance.post('/refreshToken').then((res) => {
    const token = res.data.token;
    localStorage.setItem('token', token);
    });

    return Promise.reject('refreshToken error');

}

export default instance;
```

---

## OAuth2 协议

- Oauth 1.0 版本几乎已经不用了，这里不会概述。

- Oauth2 协议其实就是你登录第三方网站。
- 这个网址支持你可以通过微信，apple，google，github 等工具去登录。
- 这样，对于你不信任的网站登录时你不需要提供账号密码，这样的方式就可以避免泄露自己的账号密码等信息。

- Oauth2 的认证流程如下：
  - 用户访问第三方网站，第三方网站会跳转到认证中心。
  - 认证中心会让用户登录，登录成功后会给用户一个 code。
  - 用户拿着 code 去认证中心换 token。
  - 认证中心会给用户一个 token，用户拿着 token 去访问第三方网站。

- 假设用户现在通过微信去登录 leetcode。
- 用户只要同意授权，那么 **认证服务器** 就会给第三方网站 leetode 颁发 token。
- 同意之后，leetcode 就可以拿到你的头像等等信息。

- 其实所谓的身份认证，其本质都是基于 **对请求方的不信任** 产生的，因此 oauth2 就是来解决这个问题的。

- 还有个问题就是：
  - 像是微信这样扮演 **认证服务器的角色** 不可能给所有的第三方站点都提供这个 token。
  - 因此第三方站点需要向微信申请第三方应用。
  - 一般微信，微博，Apple，github 都会有自己的 oauth 使用说明
- OAuth2 的有几种授权方式，这部分内容以后有空再填坑。

## 最后

- 一般来讲，小规模系统 Session + Cookie 就够用了。
- 大规模系统就适合 Token 或者 双Token。
- 若是需要第三方登录就用 OAuth2。
