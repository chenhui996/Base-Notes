# 配置 ｜ 路由段配置

- 之前的文章中已经多次提到了 **路由段配置项**。
- 路由段配置选项可以：
  - 配置页面
  - 布局
  - 路由处理程序
- 的行为。
  
> 本篇我们会详细介绍其中的 **配置内容**。

## 1. 段（Segment）

- 如果大家翻阅 Next.js 的官方文档（英文），会经常发现 Segment 这个单词，它是 Next.js 中 **路由的基本单位**。
- 为了简单起见，我翻译成“段”。
- Segment 放到 URL 这个场景时：
  - URL Segment 指的是：
    - 由 **斜杠分隔** 的 URL Path 的一部分。
    - URL Path 指的则是 **域名后面** 的 URL 部分（URL Path 由 URL Segment 组成）。
  - 如：
    - `https://example.com/segment1/segment2/segment3`
    - 其中 `segment1`、`segment2`、`segment3` 就是 URL Segment。
  - Router Segment，我翻译为“路由段”。
    - 路由中的每个文件夹都代表一个路由段。
    - 每个路由段都映射一个对应的 URL Segment：
      - /dashboard/settings由三段组成：
        - `/`：根段（Root Segment）
        - `dashboard`：第一个段（First Segment）
        - `settings`：第二个段（Second Segment），也叫页段（Page Segment）。
          - PS：叶段指的是没有子节点的段。

## 2. 路由段配置

- 接下来我们来到本章的正题——路由段配置。

- 路由段配置选项可以 **配置页面**、**布局**、**路由处理程序** 的行为。
- 比如我们使用 fetch 的时候可以单独配置某个请求的 revalidate。
  - 借助路由段配置，我们可以配置这个路由下所有 fetch 请求的 revalidate。

- 路由段配置的**使用方式**也很简单，**导出一个约定变量名即可**，比如：

```js
// layout.js | page.js | route.js
export const dynamic = 'auto'
export const dynamicParams = true
export const revalidate = false
export const fetchCache = 'auto'
export const runtime = 'nodejs'
export const preferredRegion = 'auto'
export const maxDuration = 5
 
export default function MyComponent() {}
```

- 具体这些变量名和值的类型为：

变量名           | 类型                                                                                                       | 默认值
----------------|-----------------------------------------------------------------------------------------------------------|--------
dynamic         | 'auto'、'force-dynamic'、'error'、'force-static'                                                           | 'auto'
dynamicParams   | boolean                                                                                                   | true
revalidate      | false、'force-cache'、0、number                                                                            | false
fetchCache      | 'auto'、'default-cache'、'only-cache'、'force-cache'、'force-no-store'、'default-no-store'、'only-no-store' | 'auto'
runtime         | 'nodejs'、'edge'                                                                                          | 'nodejs'
preferredRegion | 'auto'、'global'、'home'、string、string[]                                                                 | 'auto'
maxDuration     | number                                                                                                    | 部署平台设置

- 注意配置选项的值目前是静态分析的，也就是说，配置revalidate = 600是有效的，但是 revalidate = 60 * 10是无效的。

> 我们来一一讲解这些配置选项的作用。

### 2.1. dynamic

- 更改布局或者页面的动态行为，用例如下：

```js
// layout.js | page.js | route.js
export const dynamic = 'auto'
// 'auto' | 'force-dynamic' | 'error' | 'force-static'
```

- 为了讲解 dynamic 参数的选项，我们先复习下基础知识：
  - **静态渲染（Static Rendering）**:
    - 路由在 **构建时渲染**，或者在 **重新验证后后台渲染**，其 **结果会被缓存** 并可以 **推送到 CDN**。
    - 适用于未针对用户个性化且**数据已知**的情况，比如静态博客文章、产品介绍页面等。
  - **动态渲染（Dynamic Rendering）**:
    - 路由在 **请求时渲染**，适用于针对用户个性化或 **依赖请求中的信息**（如 cookie、URL 参数）的情况。

- 因为 **渲染模式** 和 **数据缓存** 是相互独立的。
  - 所以在 **动态渲染** 下：
    - **数据请求** 也分为 **缓存** 和 **不缓存**（uncached data request）的。
    - **默认是缓存**，这样做的好处在于：
      - 即便选择了动态渲染，也不用担心 **渲染时获取所有数据对性能造成影响**。

> dynamic 影响的不仅是 **渲染模式**，也会影响 **数据缓存** 的方式。

- 还有一个名词叫 **动态函数（Dynamic Functions）**，指的是：
  - **获取只能在请求时才能得到的信息**（如 cookie、请求头、URL 参数）的函数。
  - 在 Next.js 中，对应的就是：
    - cookies()
    - headers()
    - useSearchParams()
    - searchParams()
  - 这些函数。
- 如果使用了这些函数的任意一个，都会**导致路由进行动态渲染**。

- 接下来我们讲解 dynamic 的值都有哪些作用：
  - **'auto'（默认）**：自动判断。
  - **'force-dynamic'**：强制 **动态渲染** 和 **退出所有 fetch 请求缓存**，相当于：
    - Page Router 下使用了 getServerSideProps()。
    - 将布局或页面中每个 fetch() 请求都设置为 { cache: 'no-store', next: { revalidate: 0 } }
    - 设置了路由段配置 export const fetchCache = 'force-no-store'
  - **'error'**：强制 **静态渲染并缓存数据**，如果有组件使用了**动态函数或不缓存数据请求**（uncached data request），就会**导致错误**，相当于：
    - Page Router 下使用了getStaticProps()
    - 将布局或页面中每个 fetch() 请求都设置为 { cache: 'force-cache' }
    - 设置了路由段配置 fetchCache = 'only-cache', dynamicParams = false
    - 设置dynamic = 'error' 会更改 dynamicParams 的默认值 true 为 false
  - **'force-static'**： 强制 **静态渲染并缓存数据**，强制 cookies()、headers()、useSearchParams() 返回空值。

### 2.2. dynamicParams

- 是 Next.js 13 及更高版本中引入的一个特性。
- 用于控制动态路由的行为，特别是在处理那些没有通过 generateStaticParams 预先生成的动态路由段时。
- 这个选项可以帮助你定义当用户访问一个未预先生成的动态页面时，应用应该如何响应。
  - 简单来说，就是 **按需生成** 还是 **返回 404**。（视觉上）

```js
// layout.jsx | page.jsx
export const dynamicParams = true // true | false,
```

- **true（默认）**：按需生成
  - 当用户访问一个 **未预先生成的动态路由** 时，Next.js 会尝试动态生成该页面。
    - 这意味着服务器会 **根据请求** 实时生成页面内容，类似于 SSR（服务器端渲染）。
  - 这对于那些 **无法预先生成所有可能组合的页面** 非常有用，比如用户个人资料页面，因为用户数量可能非常大。
- **false**：返回 404
  - 如果用户访问一个未预先生成的动态路由，Next.js 会直接返回 404 页面。
  - 这适用于那些你希望严格控制只能访问预先生成的页面的场景。

#### 与 getStaticPaths 的 fallback 选项的对比

- 在 Next.js 的早期版本中，getStaticPaths 函数有一个 fallback 选项，用于控制动态 SSG（静态站点生成）页面的行为：
  - fallback: true：允许按需生成页面。
  - fallback: false：只允许访问预先生成的页面，其他返回 404。
  - fallback: 'blocking'：在生成页面时阻塞请求，直到页面生成完成。
- dynamicParams 可以看作是 fallback 选项在 Next.js 13 及更高版本中的对应机制，但适用于新的应用目录结构和特性。

> 通过合理配置 dynamicParams，你可以更好地控制动态路由的行为，优化用户体验和应用性能。

### 2.3. revalidate

- 设置布局或者页面的默认验证时间。
- 此设置不会覆盖单个 fetch 请求设置的 revalidate 的值。
- 注意 revalidate 选项只能用于 Nodejs Runtime，不能用于 Edge Runtime。

```js
// layout.jsx | page.jsx | route.js
export const revalidate = false
// false | 'force-cache' | 0 | number
```

#### revalidate 选项的作用

- **设置布局或页面的默认验证时间：**
  - revalidate 可以为页面或布局设置一个默认的重新验证时间（以秒为单位）。
  - 这意味着，在指定的时间间隔后，Next.js 将重新验证页面或布局的数据，并更新缓存。
- **不覆盖单个 fetch 请求的 revalidate 值：**
  - 如果页面或布局中的单个 fetch 请求设置了 revalidate 值，那么这个值将覆盖页面或布局默认的 revalidate 值。
  - 这意味着你可以对特定的数据请求进行更细粒度的缓存控制。
- **只能在 Node.js Runtime 中使用：**
  - revalidate 选项只能在 Node.js Runtime 中使用，不能在 Edge Runtime 中使用。
  - 这是因为在 Edge Runtime 中，**数据请求和缓存管理的方式** 与 Node.js Runtime 有所不同。

#### revalidate 选项的值

- **false（默认）**：相当于 revalidate: Infinity，即资源将无限期缓存，直到手动触发重新验证。
- **0**：页面或布局总是动态渲染，即使数据请求没有被缓存。这意味着每次请求都会重新获取数据，不进行缓存。
- **number**：设置一个具体的秒数作为重新验证频率。例如，revalidate: 60 表示每 60 秒重新验证一次数据。

### 2.4. fetchCache

- 在 Next.js 中，fetchCache 是一个高级配置选项，用于控制页面中所有 fetch 请求的缓存行为。
- 这个选项允许开发者 **覆盖** Next.js 默认的缓存策略，以满足特定的需求。
- 下面是对这个选项及其可能值的详细分析：

```js
// layout.jsx | page.jsx | route.js
export const fetchCache = 'auto'
// 'auto' | 'default-cache' | 'only-cache'
// 'force-cache' | 'force-no-store' | 'default-no-store' | 'only-no-store'
```

#### 默认行为

- 默认情况下，Next.js 会缓存那些在动态函数（如 getServerSideProps、getStaticProps 等）执行之前的 fetch 请求。
- 对于动态函数之后的 fetch 请求，Next.js 不会进行缓存。

#### fetchCache 选项

- fetchCache 可以在 **页面**、**布局** 或 **路由文件中** 设置，以控制该范围内所有 fetch 请求的缓存行为。
- 其可选值包括：
  - **auto:**
    - 这是一个智能缓存策略，可能会根据请求的具体情况**自动选择最合适的缓存行为**。
    - 动态函数之前按照开发者设置的 cache 选项进行缓存，动态函数之后不缓存请求。
  - **default-cache:**
    - 开发者可以自由设置 cache 选项，但如果开发者未设置 cache 选项，默认设置为 force-cache，这意味着即使是在动态函数之后的请求，也会被视为静态。
  - **default-no-store:**
    - 开发者可以自由设置 cache 选项，但如果开发者未设置 cache 选项，默认设置为 no-store，这意味着即使是在动态函数之前的请求，也会被视为动态。
  - **only-cache:**
    - 强制所有请求 **仅使用缓存**，即使缓存可能已经过期。
    - 这可以减少对服务器的请求，但可能导致用户看到过时的数据。
    - 如果开发者未设置 cache 选项，默认设置为 force-cache，如果有请求设置成 cache: 'no-store'，则会导致报错
  - **only-no-store:**
    - 如果开发者未设置 cache 选项，默认设置为 no-store，如果有请求设置成 cache: 'force-cache'，则会导致报错。
  - **force-cache:**
    - 这是 Next.js 的默认行为，**优先从缓存中查找匹配请求**，当没有匹配项或匹配项过时时，才从服务器上获取资源并更新缓存。
  - **force-no-store:**
    - 将所有请求的 cache 选项设置为 no-store。
    - 所有请求都不使用缓存，**每次都直接从服务器获取资源，并且不更新缓存**。
    - 这确保了数据的实时性，但可能增加服务器的负载。

- 一个路由可能有多个布局和一个页面，此时选项应该相互兼容：
  - 如何 'only-cache' 和 'force-cache' 同时提供，'force-cache' 获胜。
  - 如果 'only-no-store' 和 'force-no-store'同时提供，'force-no-store'获胜。
  - 带 force 的选项会更改整个路由的行为，并会阻止 'only-*' 引发的错误。
- 'only-*' 和 force-*' 选项的作用就是：确保整个路由 **要么是完全静态 要么是完全动态**，这意味着：
  - 在单个路由中不允许同时使用 'only-cache'和 'only-no-store'。
  - 在单个路由中不允许同时使用 'force-cache'和 'force-no-store'。
- 如果子级提供了 'auto'或 '*-cache'，父级无法使用 'default-no-store'，因为这会导致请求有不同的行为。

> Next.js 建议共享的父布局使用 'auto'，在子级中自定义不同的选项。

### 2.5. runtime

- 设置运行时环境

```js
// layout.jsx | page.jsx | route.js
export const runtime = 'nodejs'
// 'edge' | 'nodejs'
```

- nodejs（默认）
- edge

### 2.6. preferredRegion

- 在 Vercel Serverless Functions 中使用，搭配 export const runtime = 'edge';
  
- 用于设置 Edge Functions 执行的区域。
- 默认情况下，Edge Functions 在最接近传入请求的区域中执行。
- 但如果你的函数 **比较依赖数据源**，你会 **更希望它靠近数据源所在的位置** 以实现快速响应，那就可以设置 preferredRegion 指定一系列首选区域。

- 指定区域的时候，传入的是区域 ID。
- 区域列表参考 Vercel 的 Region List 文档。
  - 其中 iad1 表示美国东部区域，参考位置美国华盛顿地区
  - sfo1 表示美国西部，参考位置美国旧金山。

```js
// layout.jsx | page.jsx | route.js
export const preferredRegion = 'auto'
// 'auto' | 'global' | 'home' | ['iad1', 'sfo1']
```

### 2.7. maxDuration

- 在 Vercel Serverless Functions 中使用，用于配置 Vercel 函数的最大持续时间。
- 所谓 Max duration，指的是：
  - 函数在 **响应之前** 可以处理 HTTP 请求的最长时间。
  - 如果持续时间内没有响应，则会返回错误码。
  - 如果没有指定，根据不同的部署平台，默认时间会不同。

```js
export const maxDuration = 5
```

### 2.8 generateStaticParams

- 跳转：[generateStaticParams](../generateStaticParams.md)
