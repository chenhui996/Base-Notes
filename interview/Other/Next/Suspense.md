# Suspense

还记得总结的 SSR 的几个缺点吗？

1. SSR 的数据获取必须在 **组件渲染之前**。
2. 组件的 JavaScript 必须 **先加载到客户端**，才能开始水合。
3. 所有组件 **必须先水合**，然后才能跟其中任意一个组件交互。

---

- 为了解决这些问题，React 18 引入了 `<Suspense>` 组件。
- 我们来介绍下这个组件：
  - `<Suspense>` 允许你 **推迟渲染** 某些内容，直到满足某些条件（例如数据加载完毕）。
  - 你可以将 **动态组件** 包装在 Suspense 中，然后向其传递一个 fallback UI，以便在 **动态组件加载时** 显示。
  - 如果 **数据请求缓慢**，使用 Suspense 流式渲染该组件，不会影响页面其他部分的渲染，更不会阻塞整个页面。
- 让我们来写一个例子，新建 app/dashboard/page.js，代码如下：

```js
import { Suspense } from 'react'

const sleep = ms => new Promise(r => setTimeout(r, ms));

async function PostFeed() {
  await sleep(2000)
  return <h1>Hello PostFeed</h1>
}

async function Weather() {
  await sleep(8000)
  return <h1>Hello Weather</h1>
}

async function Recommend() {
  await sleep(5000)
  return <h1>Hello Recommend</h1>
}

export default function Dashboard() {
  return (
    <section style={{padding: '20px'}}>
      <Suspense fallback={<p>Loading PostFeed Component</p>}>
        <PostFeed />
      </Suspense>
      <Suspense fallback={<p>Loading Weather Component</p>}>
        <Weather />
      </Suspense>
      <Suspense fallback={<p>Loading Recommend Component</p>}>
        <Recommend />
      </Suspense>
    </section>
  )
}
```

- 页面会显示：
  - **Loading PostFeed Component**，然后 **2s** 后显示 **Hello PostFeed**。
  - **Loading Weather Component**，然后 **8s** 后显示 **Hello Weather**。
  - **Loading Recommend Component**，然后 **5s** 后显示 **Hello Recommend**。
- 让我们观察下 dashboard 这个 HTML 文件的加载情况：（network）
  - 你会发现它一开始是 2.03s
  - 然后变成了 5.03s
  - 最后变成了 8.04s
- 这不就正是我们设置的 sleep 时间吗？
- 查看 dashboard 请求的响应头：
  - **Transfer-Encoding** 标头的值为 **chunked**：表示数据将以 **一系列分块的形式** 进行发送。

> 分块传输编码（Chunked transfer encoding）是超文本传输协议（HTTP）中的一种数据传输机制。
> 允许 HTTP由网页服务器发送给客户端应用（ 通常是网页浏览器）的数据可以分成多个部分。
> 分块传输编码只在 HTTP 协议1.1版本（HTTP/1.1）中提供。

- 再查看 dashboard 返回的数据就会发现：
  - **使用 Suspense 组件的 fallback UI** 和 **渲染后的内容** 都会出现在该 HTML 文件中。
  - 说明该 请求 **持续** 与 **服务端** 保持连接，服务端在 **组件渲染完后** 会将 渲染后的内容 **追加传给客户端**。
  - 客户端收到新的内容后进行解析，执行类似于 $RC("B:2", "S:2")这样的函数交换 DOM 内容，使 fallback UI 替换为渲染后的内容。
- 这个过程被称之为 Streaming Server Rendering（流式渲染），它解决了上节说的传统 SSR 的第一个问题：
  - fix：数据获取必须在组件渲染之前。
- 使用 Suspense，先渲染 Fallback UI，等 **数据返回再渲染** 具体的组件内容。

- 使用 Suspense 还有一个好处就是：
  - Selective Hydration（选择性水合）。
  - 简单的来说，当多个组件等待水合的时候，React 可以根据 **用户交互决定** 组件水合的 **优先级**。
  - 比如 Sidebar 和 MainContent 组件都在等待水合，快要到 Sidebar 了，但此时用户点击了 MainContent 组件：
    - React 会在 **单击事件的捕获阶段** 同步水合 MainContent 组件以保证立即响应，Sidebar 稍后水合。
- 总结一下，使用 Suspense，可以解锁两个主要的好处，使得 SSR 的功能更加强大：
  1. Streaming Server Rendering（流式渲染）：从 服务器 到 客户端 **渐进式渲染 HTML**。
  2. Selective Hydration（选择性水合）：React 根据 **用户交互** 决定水合的优先级。

## Suspense 会影响 SEO 吗？

- 首先，Next.js 会等待 generateMetadata 内的数据请求完毕后，再将 UI 流式传输到客户端，这保证了响应的第一部分就会包含 `<head>` 标签。
- 其次，因为 Streaming 是流式渲染，HTML 中会包含最终渲染的内容，所以它不会影响 SEO。

### 面试：你在使用 React 的 `<Suspense>` 组件时，是怎么处理 SEO 和搜索引擎爬虫的？

- 当我使用 `<Suspense>` 组件时，主要关注的是页面的 **初始渲染** 和 **SEO**。
  - Suspense 是用来 **处理异步加载的组件** 的，它允许我们在 **数据还在加载时** 显示一个 **占位符**，比如一个加载中的小圈圈。
  - 但是，对于 SEO 和搜索引擎爬虫来说，它们最关心的是 **页面的初始内容**，尤其是 `<head>` 里面的 **元数据** 和 **页面的主体部分**。
  - 所以，在设计页面时，需要先确保这些 **关键内容** 在 **初始渲染时** 就已经确定，并且包含在发送给客户端的 HTML 里。
  - 这样，即使页面里有一些 **异步加载的子组件**，爬虫在抓取页面时也能拿到完整的 `<head>` 信息和主体内容。
  - 而异步组件嘛，它们 **加载完成后** 只是 **替换掉之前的占位符**，不会影响到已经发送给爬虫的内容。
- 所以，总的来说，使用 `<Suspense>` 组件并不会对 SEO 产生负面影响，关键是要 **确保页面的关键内容** 在初始渲染时就已经准备好。”
  - **关键内容**：
    - `<head>` 里面的元数据
      - title、description、keywords 等
    - 页面的主体内容
      - 比如文章的标题、正文、图片等
    - 其他搜索引擎爬虫关心的内容
      - 比如链接、导航、标签等
    - 这些内容都要在初始渲染时就已经确定，并且包含在发送给客户端的 HTML 里。

## Suspense 如何控制渲染顺序？

- 在刚才的例子中，我们是将三个组件同时进行渲染，哪个组件的数据先返回，就先渲染哪个组件。
- 但有的时候，希望按照某种顺序展示组件:
  - 比如先展示 PostFeed，再展示Weather，最后展示Recommend
  - 此时，你可以将 Suspense 组件进行嵌套：

```js
import { Suspense } from 'react'

const sleep = ms => new Promise(r => setTimeout(r, ms));

async function PostFeed() {
  await sleep(2000)
  return <h1>Hello PostFeed</h1>
}

async function Weather() {
  await sleep(8000)
  return <h1>Hello Weather</h1>
}

async function Recommend() {
  await sleep(5000)
  return <h1>Hello Recommend</h1>
}

export default function Dashboard() {
  return (
    <section style={{padding: '20px'}}>
      <Suspense fallback={<p>Loading PostFeed Component</p>}>
        <PostFeed />
        <Suspense fallback={<p>Loading Weather Component</p>}>
          <Weather />
          <Suspense fallback={<p>Loading Recommend Component</p>}>
            <Recommend />
          </Suspense>
        </Suspense>
      </Suspense>
    </section>
  )
}
```

- 那么问题来了，此时页面的最终加载时间是多少秒？
- 是请求花费时间最长的 8s 还是 2 + 8 + 5 = 15s 呢？
- 答案是 8s:
  - 这些数据请求是同时发送的。
  - 所以当 Weather 组件返回的时候：
    - Recommend 组件立刻就展示了出来。

> 注意：这也是因为这里的数据请求并没有前后依赖关系，如果有那就另讲了。
