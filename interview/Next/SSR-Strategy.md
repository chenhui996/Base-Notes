# 渲染 ｜ 服务端渲染策略

- Next.js 存在三种不同的服务端渲染策略：
  - 静态渲染
  - 动态渲染
  - Streaming
- 我们来一一介绍。

## 1. 静态渲染（Static Rendering）

- 这是默认渲染策略，路由在 **构建时渲染**，或者在 **重新验证后后台渲染**，其结果会被缓存并且可以推送到 CDN。
- 适用于 **未针对用户个性化且数据已知** 的情况，比如 **静态博客文章**、**产品介绍页面** 等。

- **构建时渲染:**
  - 通过 `next build` 构建项目，生成静态文件。
- **重新验证后后台渲染:**
  - 通过 `revalidate` 配置项，我们可以在重新验证后重新渲染页面。

- 编辑 app/server/page.js，代码如下：

```js
export const revalidate = 10

export default async function Page() {

  const url = (await (await fetch('https://api.thecatapi.com/v1/images/search')).json())[0].url
  
  return (
    <img src={url} width="300" alt="cat" />
  )
}
```

- 此时在 npm run build的输出中，/server 虽然是标记为静态渲染，但图片已经可以更新了，虽然每隔一段时间才更新（10秒）。
- 其中 revalidate=10表示设置重新验证频率为 10s，但是要注意：
  - 这句代码的效果并不是设置服务器每 10s 会自动更新一次 /server。
    - 而是至少 10s 后进行重新验证。
  - 举个例子：
    - 假设你现在访问了 /server，此时时间假设为 0s，开始计时，10s 内持续访问：
      - /server 返回的都是之前缓存的结果。
    - 当 10s 过后，假设你第 12s 又访问了一次 /server：
      - 此时虽然超过了 10s：
        - 但依然会 **返回之前** 缓存的结果。
        - 但同时会 **触发** 服务器 **更新缓存**。
    - 当你第 13s **再次访问** 的时候，就是**更新后的结果**。

> 简单来说，超过 revalidate 设置时间的 **首次访问** 会 **触发缓存更新**，如果更新成功，后续(下一次和之后)的返回就都是新的内容，直到下一次触发缓存更新。
> Tips: npm run dev 是可以及时更新的，因为它不会缓存。

## 2. 动态渲染（Dynamic Rendering）

- 动态渲染是在 **每次请求时渲染**，适用于 **用户个性化**、**依赖请求中的信息**（如 cookie、URL 参数）或 **数据未知** 的情况。
- 在渲染过程中：
  - **如果使用了动态函数（Dynamic functions）** 或者 **未缓存的数据请求（uncached data request）**，
- Next.js 就会 **切换为** 动态渲染：

| 动态函数 | 数据缓存 | 渲染策略 |
| 否      | 缓存    | 静态渲染 |
| 是      | 缓存    | 动态渲染 |
| 否      | 未缓存  | 动态渲染 |
| 是      | 未缓存  | 动态渲染 |

> 注意：作为开发者，无须选择静态还是动态渲染，Next.js 会 **自动根据使用的 功能 和 API** 为 **每个路由** 选择 **最佳的渲染策略**。

### 2.1. 使用动态函数（Dynamic functions）

> **动态函数** 指的是：获取 **只有在请求时** 才能得到信息（如 cookie、请求头、URL 参数）的函数。

- 在 Next.js 中这些动态函数是：
  - cookies() 和 headers() ：获取 cookie 和 header
  - searchParams：页面查询参数
- 使用这些函数的任意一个，都会导致路由转为动态渲染。

- 第一个例子，修改 app/server/page.js，代码如下：

```js
import { cookies } from 'next/headers'

export default async function Page() {

  const cookieStore = cookies()
  const theme = cookieStore.get('theme')

  const url = (await (await fetch('https://api.thecatapi.com/v1/images/search')).json())[0].url
  
  return (
    <img src={url} width="300" alt="cat" />
  )
}
```

- 运行 npm run build && npm run start，此时 /server显示为 **动态渲染**：
  - 因为我们使用了 cookies() 函数，获取了 cookie 信息。
- 第二个例子，使用 searchParams，修改 app/server/page.js，代码如下：

```js
export default async function Page({ searchParams }) {
  const url = (await (await fetch('https://api.thecatapi.com/v1/images/search')).json())[0].url
  return (
    <>
      <img src={url} width="300" alt="cat" />
      {new Date().toLocaleTimeString()}
      {JSON.stringify(searchParams)}
    </>
  )
}
```

- 运行 npm run build && npm run start，此时 /server显示为动态渲染：
  - 因为我们使用了 searchParams，获取了 URL 参数信息。
- 但是图片却没有在页面刷新的时候改变。
  - 页面确实是动态渲染，因为每次刷新时间都发生了改变。
    - 但是图片并没有改变，这是因为 **数据请求被缓存** 了。
    - **动态渲染** 和 **数据请求缓存** 是两件事情。
    - **页面动态渲染** 并不代表 **页面涉及的请求** 一定不被缓存。
    - 正是因为 fetch 接口的 **返回数据** 被缓存了，这才导致了图片每次都是这一张。
- 修改 app/server/page.js，代码如下：

```js
export default async function Page({ searchParams }) {
  const url = (await (await fetch('https://api.thecatapi.com/v1/images/search', { cache: 'no-store' })).json())[0].url
  return (
    <>
      <img src={url} width="300" alt="cat" />
      {new Date().toLocaleTimeString()}
      {JSON.stringify(searchParams)}
    </>
  )
}
```

- 我们为 fetch 请求添加了 { cache: 'no-store' }，使 fetch 请求退出了缓存。
- 此时运行生产版本，图片和时间在刷新的时候都会改变。

> 注：同样是转为动态渲染，为什么使用 cookies 的时候，fetch 请求没有被缓存呢？这就是接下来要讲的内容。

- 当你在 headers 或 cookies 方法之后 -> 使用 fetch 请求，会导致请求退出缓存。
- 这是 Next.js 的自动逻辑，但还有哪些情况导致 fetch 请求自动退出缓存呢？
- 让我们往下看。

### 2.2. 使用未缓存的数据请求（uncached data request）

- 在 Next.js 中，fetch 请求的结果默认会被缓存。
- 但你可以设置退出缓存，一旦你设置了退出缓存，就意味着使用了 **未缓存的数据请求**（uncached data request）。
  - 会 **导致路由进入 动态渲染**，如：
    - fetch 请求添加了 cache: 'no-store'选项
    - fetch 请求添加了 revalidate: 0 选项
    - fetch 请求在 **路由处理程序中** 使用了 POST 方法
    - 在 headers 或 cookies 方法之后使用 fetch 请求
    - 配置了路由段选项 const dynamic = 'force-dynamic'
    - 配置了路由段选项 fetchCache ，默认会跳过缓存
    - fetch 请求使用了 Authorization 或者 Cookie 请求头，并且在组件树中其上方还有一个未缓存的请求。
  - 举个例子，修改 app/server/page.js，代码如下：

```js
export default async function Page() {
  const url = (await (await fetch('https://api.thecatapi.com/v1/images/search', { cache: 'no-store' })).json())[0].url
  return (
    <>
      <img src={url} width="300" alt="cat" />
      {new Date().toLocaleTimeString()}
    </>
  )
}
```

- 此时页面会转为动态渲染，每次刷新页面都会出现新的图片。

> 关于动态渲染再重申一遍：**数据缓存** 和 **渲染策略** 是分开的。
> 假如你选择了动态渲染，Next.js 会在请求的时候再渲染 RSC Payload 和 HTML，但其中涉及的数据请求，依然是可以从缓存中获取的。

## 3. Streaming

- 使用 loading.js 或者 React Suspense 组件会开启 Streaming。

## 其他术语防混淆

- 除了:
  - **静态渲染**
  - **动态渲染**
  - **动态函数**
  - **未缓存数据请求**
- 等术语，阅读官方文档的时候，你还可能遇到:
  - **局部渲染**
  - **动态路由**
- 等这些与：
  - **渲染**
  - **动态**
  - **静态**
- 有关的词。
- 所以我们在这里列出来帮助区分。

### 1. 局部渲染（Partial rendering）

- 局部渲染指的是：
  - 仅在 客户端 -> **重新渲染导航时 更改的** -> **路由段、共享段的** -> 内容 -> 继续保留。
  - 举个例子:
    - 当在 **两个相邻的 路由间 导航的时候**:
      - /dashboard/settings 和 /dashboard/analytics -> settings 和 analytics 页面会重新渲染，共享的 dashboard 布局会保留。

> 局部渲染的目的也是为了：减少 **路由切换时** 的 **传输数据量** 和 **执行时间**，从而提高性能。

### 2. 动态路由（Dynamic Routes）

- **动态渲染的路由**：指的是在用户请求时 **根据参数动态生成内容** 的路由。
- **静态渲染的路由**：指的是在构建时就已经生成好内容的路由，这些**内容在运行时不会改变**。

```js
export default function Page({ params }) {
  return <div>My Post: {params.slug}</div>
}
```

- 动态路由并不一定是动态渲染，你也可以用 generateStaticParams 静态生成路由。
- 但有的时候，动态路由（Dynamic Routes）会用来表达 “动态渲染的路由”（dynamically rendered routes）这个意思。
- 在官网中，很少用到静态路由（Static Routes）这个词，用到的时候是用来表达“静态渲染的路由”（statically rendered routes）。

### 3. 动态段（Dynamic Segment）

- 路由中的动态段，举个例子，app/blog/[slug]/page.js中 [slug]就是动态段。