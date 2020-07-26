# Bom

- 浏览器对象模型(browers object model);
  - 浏览器下的一些方法和属性;

# Bom 下五大对象

- window 对象;
- location 对象;
- history 对象;
- navigator 对象;
- screen 对象;

# window 对象

- innerWidth: 可视区宽度;
- innerHeight: 可视区高度;
- open: 打开一个新窗口;
  - window.open(URL,target,specs,replace)
    - URL: 新窗口地址;
    - target: 属性 新窗口打开方式：
      - `_blank`: 新窗口打开;
      - `_self`: 当前窗口打开;
    - specs: 新窗口规格;
      - 窗口的宽高等规格;
      - 很多功能不兼容;
- close: 关闭一个窗口;

# window.onresize

- 监听窗口大小发生改变;

# window.onscroll

- 监听滚动条位置发生变化;

# window.scrollX

- 获取横向滚动条位置;
- IE 不行;
- IE: document.body.scrollLeft;
- 可用||解决兼容性问题;

```js
let scrollL = document.body.scrollLeft || document.documentElement.scrollLeft;
```

# window.scrollY

- 获取纵向滚动条位置;
- IE 不行;
- IE: document.body.scrollTop;
- 可用||解决兼容性问题;

```js
let scrollT = document.body.scrollTop || document.documentElement.scrollTop;
```

# window.scrollTo()

- window.scrollTo(x,y):
  - 滚动条滚到相应位置;

# location 对象

- 与地址栏相关的一些属性信息;

# host

- 主机信息;
  - 域名 + 端口;
  - 端口默认为 80，可以不添加访问;
    - 若修改了端口，需要在域名后面加对应端口才可访问;

# pathname

- 路径;

# protocol

- 协议：
  - http:
    - 大部分网站;
  - https:
    - 追求更安全;

# search

- 网址中?后跟随的内容(get 方式提交的数据)

# location.href()

- 设置跳转地址

# location.replace()

- 替换跳转地址

# location.reload()

- 刷新页面

# hash

- `#`号后面的跟的内容;
- 主要运用于'前端路由'领域;
- css 叫锚点;

# 前端路由

- 路由(routing):根据'路径'决定前端所显示的视图;

# history 对象

- 历史记录

# history.back()

- 返回上一个页面;

# history.forward

- 返回下一个页面;

# history.go()

- history.go(number):
  - 前进或回退至 number 页面:
    - 正数：前进;
    - 负数：后退;

# navigator 对象

# onLine

- 网络信息：
  - true: 有网;
  - false: 无网;

# userAgent

- 用户代理信息;
  - 系统版本(设备信息);
  - 浏览器版本;
