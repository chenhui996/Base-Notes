# Github 访问速度很慢的原因，以及解决方法

- github 的 CDN 被某墙屏了，由于网络代理商的原因，所以访问下载很慢;
- ping github.com 时，速度只有 300 多 ms;

## CDN

- CDN，Content Distribute Network，可以直译成内容分发网络;
- CDN 解决的是如何将数据快速可靠从源站传递到用户的问题;
- 用户获取数据时，不需要直接从源站获取:
  - 通过 CDN 对于数据的分发;
  - 用户可以从一个较优的服务器获取数据;
  - 从而达到快速访问，并减少源站负载压力的目的;

## 如何解决？

- 绕过 dns 解析，在本地直接绑定 host:
  - 该方法也可加速其他因为 CDN 被屏蔽导致访问慢的网站;
  - https://github.com/521xueweihan/GitHub520
    - 具体可参照此文档;
  
