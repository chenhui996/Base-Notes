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
  - **服务端组件**：
    - 获取数据
    - 访问后台资源（直接）
    - 在服务端上保留敏感信息（访问令牌、API 密钥等）
    - 在服务端使用依赖包，从而减少客户端JS的大小
  - **客户端组件**：
    - 添加 **交互** 和 **事件侦听器**（onClick、 onChange 等）
    - 使用 **状态** 和 **生命周期**（useState、useReducer、useEffect 等）
    - 使用 **浏览器 API**（localStorage、fetch 等）
    - 使用 依赖于：
      - **状态**（MobX 或 Zustand 等状态管理库）
      - **效果**（使用 react-query 来管理数据获取、缓存、同步和更新，它基于 React 的 hook 构建）
      - **浏览器 API 的库或 hook**（自定义的 **useWindowDimensions** hook，它使用window.innerWidth和window.innerHeight来获取窗口尺寸，并在窗口大小变化时更新这些尺寸）
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

- Next.js 使用 React API 来组织组件的渲染工作。根据 **路由** 和 **Suspense**，渲染过程会被拆分成多个块（chunks），以实现按需加载。
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

- 服务端组件和客户端组件的 **分离** 使得页面加载更加高效，避免了不必要的 JavaScript 加载。
- 通过 Suspense 和 Streaming，React 可以实现按需加载组件并高效水合，提升页面的性能和交互性。
- 具体来说，生成 HTML 的流程：
  - **服务端渲染阶段**：Next.js 会先渲染服务端组件（Server Components），生成 RSC Payload。
  - **生成 HTML**：
    - 接下来，Next.js 会把 RSC Payload 和 客户端组件所需要的 JavaScript 代码 一起返回。
    - 这些客户端组件的 JavaScript 代码不会直接影响服务端渲染的 HTML 输出，但是它们会被注入到页面的 `script` 标签中。(比如通过 useState、useEffect、事件处理等方式控制客户端行为的代码。)
    - 这样，浏览器就能在接收到 HTML 后，加载并执行这些 JavaScript 代码来激活客户端组件，实现页面的交互性。

### 最佳实践：使用服务端组件

#### 1. 共享数据

- 当在 **服务端获取数据** 的时候，有可能出现 **多个组件共用一个数据** 的情况。
- 面对这种情况，你不需要使用 React Context（当然服务端也用不了），也不需要通过 props 传递数据，直接 **在需要的组件中请求数据** 即可。
- 这是因为 React 拓展了 fetch 的功能，添加了记忆缓存功能，相同的请求和参数，返回的数据会做缓存。

```js
async function getItem() {
  const res = await fetch('https://.../item/1')
  return res.json()
}
 
// 函数被调用了两次，但只有第一次才执行
const item = await getItem() // cache MISS
 
// 第二次使用了缓存
const item = await getItem() // cache HIT
```

- 当然这个缓存也是有一定条件限制的，比如只能在 GET 请求中，具体的限制和原理在缓存篇中具体讲解。

#### 2. 组件只在服务端使用

- 由于 JavaScript 模块可以在 服务器 和 客户端 组件模块之间 **共享**，所以如果你希望一个模块 **只用于服务端**，就比如这段代码：

```js
export async function getData() {
  const res = await fetch('https://external-service.com/data', {
    headers: {
      authorization: process.env.API_KEY,
    },
  })
 
  return res.json()
}
```

- 这个函数使用了 API_KEY，所以它应该是只用在服务端的。
- 如果用在客户端，为了防止泄露，Next.js 会将 **私有环境变量** 替换为空字符串，所以这段代码可以在客户端导入并执行，但并不会如期运行。

- 为了防止客户端意外使用服务器代码，我们可以借助 server-only 包，这样在客户端意外使用的时候，会抛出构建错误。
- 使用 server-only，首先安装该包：

```bash
npm install server-only
```

- 其次将该包导入只用在 **服务端的组件** 代码中：

```js
import 'server-only'
 
export async function getData() {
  const res = await fetch('https://external-service.com/data', {
    headers: {
      authorization: process.env.API_KEY,
    },
  })
 
  return res.json()
}
```

- 现在，任何导入 getData 的 **客户端组件** 都会在构建的时候抛出错误，以保证 **该模块只能在服务端使用**。

#### 3. 使用三方包

- 毕竟 React Server Component 是一个新特性， React 生态里的很多包可能还没有跟上，这样就可能会导致一些问题。
  - 比如你使用了一个导出 <Carousel /> 组件的 acme-carousel 包。
  - 这个组件使用了 useState，但是它并没有 "use client" 声明。

- 当你在客户端组件中使用的时候，它能正常工作：
  
```js
'use client'
 
import { useState } from 'react'
import { Carousel } from 'acme-carousel'
 
export default function Gallery() {
  let [isOpen, setIsOpen] = useState(false)
 
  return (
    <div>
      <button onClick={() => setIsOpen(true)}>View pictures</button>
 
      {/* Works, since Carousel is used within a Client Component */}
      {isOpen && <Carousel />}
    </div>
  )
}
```

- 然而如果你在服务端组件中使用，它会报错：

```js
import { Carousel } from 'acme-carousel'
 
export default function Page() {
  return (
    <div>
      <p>View pictures</p>
 
      {/* Error: `useState` can not be used within Server Components */}
      <Carousel />
    </div>
  )
}
```

- 这是因为 Next.js 并不知道 <Carousel /> 是一个只能用在客户端的组件。
- 毕竟它是三方的，你也无法修改它的代码，为它添加 "use client" 声明。
- Next.js 于是就按照服务端组件进行处理，结果它使用了客户端组件的特性 useState，于是便有了报错。

- 为了解决这个问题，你可以自己包一层，将该三方组件 **包在自己的客户端组件中**，比如：

```js
'use client'
 
import { Carousel } from 'acme-carousel'
 
export default Carousel
```

- 现在，你就可以在服务端组件中使用 <Carousel /> 了：

```js
import Carousel from './carousel'
 
export default function Page() {
  return (
    <div>
      <p>View pictures</p>
      <Carousel />
    </div>
  )
}
```

> 注：有的时候改为使用客户端组件也不能解决问题，如遇到 document is not defined、window is not defined 这种报错。

#### 4. 使用 Context Provider

- 上下文是一个典型的用于节点的特性，主要是为了共享一些全局状态，就比如当前的主题（实现换肤功能）。
- 但服务端组件不支持 React context，如果你直接创建会报错：

```js
import { createContext } from 'react'
 
//  服务端组件并不支持 createContext
export const ThemeContext = createContext({})
 
export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <ThemeContext.Provider value="dark">{children}</ThemeContext.Provider>
      </body>
    </html>
  )
}
```

- 为了解决这个问题，你需要在客户端组件中进行创建和渲染：
  
```js
'use client'
 
import { createContext } from 'react'
 
export const ThemeContext = createContext({})
 
export default function ThemeProvider({ children }) {
  return <ThemeContext.Provider value="dark">{children}</ThemeContext.Provider>
}
```

- 然后再在根节点使用：

```js
import ThemeProvider from './theme-provider'
 
export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
```

- 这样应用里的其他客户端组件就可以使用这个上下文。

### 最佳实践：使用客户端组件

#### 1. 客户端组件尽可能下移

- 为了尽可能减少客户端 JavaScript 包的大小，尽可能将 **客户端组件** 在 **组件树中** 下移。
- 举个例子:
  - 当你有 **一个包含一些静态元素** 和 **一个交互式的使用状态的搜索栏** 的布局。
  - 没有必要让 **整个布局** 都成为 **客户端组件**，将 **交互的逻辑部分** 抽离成一个 **客户端组件**（比如<SearchBar />）。
  - 让布局成为一个服务端组件：

```js
// SearchBar 客户端组件
import SearchBar from './searchbar'
// Logo 服务端组件
import Logo from './logo'
 
// Layout 依然作为服务端组件
export default function Layout({ children }) {
  return (
    <>
      <nav>
        <Logo />
        <SearchBar />
      </nav>
      <main>{children}</main>
    </>
  )
}
```

#### 2. 从 服务端组件 到 客户端组件 传递的数据 需要 序列化

- 当你在 **服务端组件** 中获取的数据，需要以 props 的形式向下传给客户端组件，这个数据需要做序列化。
- 这是因为 React 需要：
  - 先在 **服务端** 将 **组件树先序列化** 传给 **客户端**。
  - 再在 **客户端** **反序列化** 构建出 **组件树**。
  - 如果你传递了不能序列化的数据，这就会导致错误。（比如在服务端获取的数据是一个函数，这个函数是不能序列化的）
- 如果你不能序列化，那就改为在客户端使用三方包获取数据吧。（如直接用 fetch）