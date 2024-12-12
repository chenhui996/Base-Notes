# 渲染 ｜ 服务端组件和客户端组件

- 服务端组件和客户端组件是 Next.js 中非常重要的概念。
- 如果没有细致的了解过，你可能会简单的以为所谓服务端组件就是 SSR，客户端组件就是 CSR，服务端组件在服务端进行渲染，客户端组件在客户端进行渲染等等，实际上并非如此。
- 本篇就让我们深入学习和探究 Next.js 的双组件模型吧！

## 服务端组件

### 1. 介绍 (RSC)

- 在 Next.js 中，组件默认就是服务端组件。
- 举个例子，新建 app/todo/page.js，代码如下：

```jsx
export default async function Page() {
  const res = await fetch('https://jsonplaceholder.typicode.com/todos')
  const data = (await res.json()).slice(0, 10)
  console.log(data)
  return <ul>
    {data.map(({ title, id }) => {
      return <li key={id}>{title}</li>
    })}
  </ul>
}
```

- 请求会在服务端执行，并将渲染后的 HTML 发送给客户端：
  1. 启动项目后，打开 `http://localhost:3000/todo`。
  2. 打开控制台 -> Network -> todo -> Response。
  3. 可以看到服务端返回的 HTML。
- 因为在服务端执行，console 打印的结果也只可能会出现在命令行中，而非客户端浏览器中。

### 2. 优势 (RSC)

- 使用服务端渲染有很多好处：
  1. **数据获取**： 通常服务端环境（网络、性能等）更好，离数据源更近，在服务端获取数据会更快。通过 **减少** **数据加载时间** 以及 **客户端发出的请求数量**来提高性能。
  2. **安全**：在服务端保留敏感数据和逻辑，不用担心暴露给客户端。
  3. **缓存**：服务端渲染的结果可以在后续的请求中复用，提高性能。
  4. **bundle 大小**：服务端组件的代码不会打包到 bundle 中，减少了 bundle 包的大小。
  5. **初始页面加载 和 FCP**：服务端渲染生成 HTML，快速展示 UI。
  6. **Streaming**：服务端组件可以将 **渲染工作** 拆分为 chunks，并在准备就绪时将它们流式传输到客户端。用户可以更早看到页面的部分内容，而不必等待整个页面渲染完毕。
- 因为服务端组件的诸多好处，在实际项目开发的时候，**能使用服务端组件就尽可能使用服务端组件**。

### 3. 限制 (RSC)

- 虽然使用 **服务端组件** 有很多好处，但使用服务端组件 **也有一些限制**。比如：
  - 不能使用 useState 管理状态。
  - 不能使用浏览器的 API。
- 等等。
- 如果我们使用了 Next.js 会报错，比如我们将代码修改为：

```jsx
import { useState } from 'react';

export default async function Page() {

  const [title, setTitle] = useState('');

  const res = await fetch('https://jsonplaceholder.typicode.com/todos')
  const data = (await res.json()).slice(0, 10)
  console.log(data)
  return <ul>
    {data.map(({ title, id }) => {
      return <li key={id}>{title}</li>
    })}
  </ul>
}
```

- 报错信息为：
  - Error:
    - You're importing a component that needs useState.
    - It only works in a Client Component but none of its parents are marked with "useClient",
    - so they're Server Component by default.
- 报错提示: 我们此时需要使用客户端组件。
- 那么又该如何使用客户端组件呢？

## 客户端组件

### 1. 介绍 (RCC)

- 使用客户端组件，你需要在文件顶部添加一个 "use client" 声明，修改 app/todo/page.js，代码如下：

```js
'use client'

import { useEffect, useState } from 'react';

function getRandomInt(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
}

export default function Page() {

  const [list, setList] = useState([]);

  const fetchData = async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/todos')
    const data = (await res.json()).slice(0, getRandomInt(1, 10))
    setList(data)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <>
      <ul>
        {list.map(({ title, id }) => {
          return <li key={id}>{title}</li>
        })}
      </ul>
      <button onClick={() => {
        location.reload()
      }}>换一批</button>
    </>
  )
}
```

- 在这个例子中，我们使用了 useEffect、useState 等 React API，也给按钮添加了点击事件、使用了浏览器的 API。
- 无论使用哪个都需要先声明为客户端组件。

> 注意："use client"用于 **声明** 服务端 和 客户端 组件模块 之间的 **边界**。
> 当你在文件中定义了一个 "use client"，导入的其他模块包括子组件，都会被视为客户端 bundle 的一部分。

### 2. 优势（RCC）

1. 交互性：客户端组件可以使用 state、effects 和事件监听器，意味着用户可以与之交互。
2. 浏览器 API：客户端组件可以使用浏览器 API 如地理位置、localStorage 等。

## 服务端组件 VS 客户端组件

### 1. 如何选择使用？

- 服务端组件和客户端组件各有优势，如何选择使用呢？
  - 服务端组件：
    - 获取数据
    - 访问后台资源（直接）
    - 在服务端上保留敏感信息（访问令牌、API 密钥等）
    - 在服务端使用依赖包，从而减少客户端JS的大小
  - 客户端组件：
    - 添加 **交互** 和 **事件侦听器**（onClick、 onChange 等）
    - 使用 **状态** 和 **生命周期**（useState、useReducer、useEffect 等）
    - 使用 **浏览器 API**（localStorage、fetch 等）
    - 使用 依赖于：
      - **状态**（MobX 或 Zustand 等状态管理库）
      - **效果**（使用 react-query 来管理数据获取、缓存、同步和更新，它基于 React 的 hook 构建）
      - **浏览器 API 的库或 hook**（自定义的 useWindowDimensions hook，它使用window.innerWidth和window.innerHeight来获取窗口尺寸，并在窗口大小变化时更新这些尺寸）
    - 使用 React 类组件。

### 2. 渲染环境

> 服务端组件只会在服务端渲染，但客户端组件会在服务端渲染一次，然后在客户端渲染。

- 这是什么意思呢？让我们写个例子，新建 app/client/page.js，代码如下：

```js
'use client'

import { useState } from 'react';

console.log('client')

export default function Page() {

  console.log('client Page')

  const [text, setText] = useState('init text');

  return (
    <button onClick={() => {
      setText('change text')
    }}>{text}</button>
  )
}
```

- 新建 app/server/page.js，代码如下：

```js
console.log('server')

export default function Page() {

  console.log('server Page')

  return (
    <button>button</button>
  )
}
```

- 现在运行 npm run dev，会打印哪些数据呢？
  - /clinet:
    - client
    - client Page
  - /server:
    - [server] server
- 客户端组件在浏览器中打印，这可以理解，毕竟它是客户端组件，当然要在客户端运行。
- 可是客户端组件为什么在编译的时候会运行一次呢？让我们看下 /client 的返回：
  - 你会发现 init text其实是来自于 useState 中的值，但是却依然输出在 HTML 中。
  - 这就是 **编译客户端组件** 的作用，为了第一次加载的时候能更快的展示出内容。

> 所以其实所谓 **服务端组件**、**客户端组件** 并不直接对应于 物理 上的 **服务器** 和 **客户端**。
> 服务端组件运行在构建时和服务端。
> 客户端组件运行在构建时、服务端（生成初始 HTML）和客户端（管理 DOM）。

### 3. 交替使用服务端组件和客户端组件

- 实际开发的时候，不可能纯用服务端组件或者客户端组件，当交替使用的时候，一定要注意一点，那就是：

> 服务端组件 -> 可以 -> 导入 客户端组件。
> 客户端组件 -> 不能 -> 导入 服务端组件。

```js
'use client'
 
// 这是不可以的
import ServerComponent from './Server-Component'
 
export default function ClientComponent({ children }) {
  const [count, setCount] = useState(0)
 
  return (
    <>
      <button onClick={() => setCount(count + 1)}>{count}</button>
 
      <ServerComponent />
    </>
  )
}
```

- 但同时正如介绍客户端组件时所说：
  - "use client"用于声明服务端和客户端组件模块之间的边界。
  - 当你在文件中定义了一个 "use client"，导入的其他模块包括子组件，都会被视为客户端 bundle 的一部分。

- 组件默认是服务端组件，但当组件导入到客户端组件中会被认为是客户端组件。
- 客户端组件不能导入服务端组件，其实是在告诉你，如果你在服务端组件中使用了诸如 Node API 等，该组件可千万不要导入到客户端组件中。

- 但你可以将服务端组件以 props 的形式传给客户端组件：

```js
'use client'
 
import { useState } from 'react'
 
export default function ClientComponent({ children }) {
  const [count, setCount] = useState(0)
 
  return (
    <>
      <button onClick={() => setCount(count + 1)}>{count}</button>
      {children}
    </>
  )
}
```

```js
import ClientComponent from './client-component'
import ServerComponent from './server-component'
 
export default function Page() {
  return (
    <ClientComponent>
      <ServerComponent />
    </ClientComponent>
  )
}
```

- 使用这种方式，`ClientComponent` 和 `ServerComponent` 代码解耦且独立渲染。

> 注：你可能会想为什么要这么麻烦的非要使用 ServerComponent 呢？
> 这是因为 ServerComponent 有很多好处比如代码不会打包到 bundle 中。
> 而为什么以 props 的形式就可以传递呢？这是因为 props 是 React 的特性，React 会自动处理。

### 4. 组件渲染原理

在 Next.js 中，组件的渲染分为服务端渲染和客户端渲染两个阶段。下面是详细的渲染过程：

#### 1. 在服务端渲染（SSR）阶段

- Next.js 使用 React API 来组织组件的渲染工作。根据路由和 `Suspense`，渲染过程会被拆分成多个块（chunks），以实现按需加载。
- 每个渲染块分为两步：
  1. **渲染服务端组件**：React 将服务端组件渲染成一种特殊的数据格式，称为 **React Server Component Payload（RSC Payload）**。
  2. **生成 HTML**：Next.js 使用 RSC Payload 和客户端组件的 JavaScript 代码在服务端渲染 HTML，生成最终的页面结构。

- **RSC Payload** 中包含：
  1. 服务端组件的渲染结果。
  2. 客户端组件的占位符和引用的 JavaScript 文件。
  3. 从服务端组件传递给客户端组件的数据。

#### 2. 在客户端渲染阶段

- **加载和展示 HTML**：浏览器加载并展示渲染好的 HTML，首先呈现一个 **非交互式界面**（Non-interactive UI）。
- **协调客户端和服务端组件**：RSC Payload 被用来协调客户端和服务端的组件树，确保客户端组件和服务端渲染的 HTML 一致，并更新 DOM。
- **水合客户端组件**：浏览器加载相应的 JavaScript 代码，将客户端组件“水合”到 HTML 中，使页面具备 **交互性**（Interactive UI）。

#### 3. 服务端组件与客户端组件的协作

- **优化加载**：为了避免加载不必要的 JavaScript 代码，服务端组件的代码不会被打包到客户端的 JavaScript bundle 中。只有客户端组件的代码需要被加载和水合。
- **水合问题**：在传统的渲染中，所有组件都必须进行水合，导致即使是没有交互需求的组件也会加载 JavaScript，浪费资源。而通过服务端组件和客户端组件的分离，只有客户端组件才需要水合，服务端组件则直接渲染。

#### 4. 后续导航（客户端渲染）

- 在用户进行页面导航时，客户端组件完全在客户端渲染，服务端组件已经渲染并缓存好。
- React 使用 RSC Payload 来协调客户端和服务端组件树，并更新 DOM，以确保界面更新的流畅性。

---

### 总结

- 服务端组件和客户端组件的分离使得页面加载更加高效，避免了不必要的 JavaScript 加载。
- 通过 Suspense 和 Streaming，React 可以实现按需加载组件并高效水合，提升页面的性能和交互性。
- 具体来说，生成 HTML 的流程：
  - **服务端渲染阶段**：Next.js 会先渲染服务端组件（Server Components），生成 RSC Payload。
  - **生成 HTML**：
    - 接下来，Next.js 会把 RSC Payload 和 客户端组件所需要的 JavaScript 代码 一起返回。
    - 这些客户端组件的 JavaScript 代码不会直接影响服务端渲染的 HTML 输出，但是它们会被注入到页面的 `script` 标签中。(比如通过 useState、useEffect、事件处理等方式控制客户端行为的代码。)
    - 这样，浏览器就能在接收到 HTML 后，加载并执行这些 JavaScript 代码来激活客户端组件，实现页面的交互性。
