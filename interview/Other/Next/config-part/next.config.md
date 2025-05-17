# API | next.config.js

- Next.js 可以通过根目录的 next.config.js 进行配置。
- 正如文件的扩展名是 .js，next.config.js 是一个常规的 Node.js 模块，而不是一个 JSON 文件。
- 它会在 Next.js server 和构建阶段被用到，并且 **不包含在浏览器构建中**（代码不会打包到客户端）。

- 如果你需要 ECMAScript 模块，你可以使用 next.config.mjs：

```js
/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  /* config options here */
}
 
export default nextConfig
```

- 你也可以使用一个函数：

```js
export default (phase, { defaultConfig }) => {
  /**
   * @type {import('next').NextConfig}
   */
  const nextConfig = {
    /* config options here */
  }
  return nextConfig
}
```

- 从 Next.js 12.1.0 起，你还可以使用一个异步函数：

```js
module.exports = async (phase, { defaultConfig }) => {
  /**
   * @type {import('next').NextConfig}
   */
  const nextConfig = {
    /* config options here */
  }
  return nextConfig
}
```

- 其中 phase 表示配置加载的当前上下文。通过查看源码，可以知道 phase 的值一共有 5 个：
  - `PHASE_EXPORT`：导出阶段
  - `PHASE_PRODUCTION_BUILD`：生产构建阶段
  - `PHASE_PRODUCTION_SERVER`：生产服务器阶段
  - `PHASE_DEVELOPMENT_SERVER`：开发服务器阶段
  - `PHASE_DEVELOPMENT_BUILD`：开发构建阶段
- 可以通过 next/constants 导入，根据不同的阶段进行自定义配置：

```js
const { PHASE_DEVELOPMENT_SERVER } = require('next/constants')
 
module.exports = (phase, { defaultConfig }) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      /* 这里放 development 配置选项 */
    }
  }
 
  return {
    /* 除了 development 阶段的其他阶段的配置 */
  }
}
```

> 注释行的地方就是你可以放配置的地方，实际上，Next.js 定义的配置非常多，可以查看源码配置文件。

---

## 1. headers

### 1.1. 介绍

- 你可以通过 headers 选项配置 HTTP headers，这些 headers 会被添加到每个页面的响应头中。

```js
module.exports = {
  async headers() {
    return [
      {
        source: '/about',
        headers: [
          {
            key: 'x-custom-header',
            value: 'my custom header value',
          },
          {
            key: 'x-another-custom-header',
            value: 'my other custom header value',
          },
        ],
      },
    ]
  },
}
```

- headers是一个异步函数，该函数返回一个包含 **soruce** 和 **headers** 属性的对象数组，其中：
  - **source**: 表示传入的请求路径
  - **headers**: 是一个包含 key 和 value 属性的响应标头对象数组
- 除了这两个值外，还可以设置：
  - **basePath**：false 或者 undefined。当值为 false ，匹配时不会包含 basePath，只能用于外部重写
  - **locale**：false 或者 undefined，匹配时是否应该包含 locale
  - **has**：一个有 type、key、value 属性的对象数组
  - **missing**：一个有 type、key、value 属性的对象数组
- headers 会在文件系统（包括页面和 /public 文件）之前被触发。D

> 这些字段我们来一一举例介绍。

### 1.2. source
