# 聊一聊 react 中的预加载（preload）

## 什么是预加载？

- 预加载是指在用户点击链接之前，提前加载相关资源，以提高用户体验。
- 预加载的资源可以是图片、CSS、JavaScript 等。
- 预加载的资源不会被浏览器解析执行，而是被浏览器放在缓存中。
- 预加载的资源会在浏览器空闲时加载，不会影响其他资源的加载。
- 预加载的资源可以通过 HTTP Header 中的 Link 标签指定。
- 预加载的资源会提高用户点击后的响应速度。
- 预加载的资源并不一定会被使用，所以并不是所有资源都适合预加载。

## nextjs 中的预加载

在 nextjs 中，可以通过 `next/link` 组件的 `preload` 属性来实现预加载。

```jsx
import Link from 'next/link'

export default () => (
  <div>
    <Link href="/about" preload>
      <a>About</a>
    </Link>
  </div>
)
```

## nextjs 中的 “数据接口” 预加载

- 防止出现 **串行请求** 的另外一种方式是使用预加载。
  - 举个例子：

```js
// app/article/[id]/page.js
import Article, { preload, checkIsAvailable } from './components/Article'
 
export default async function Page({ params: { id } }) {
  // 获取文章数据
  preload(id)
  // 执行另一个异步任务，这里是伪代码，比如判断文章是否有权限访问
  const isAvailable = await checkIsAvailable()
 
  return isAvailable ? <Article id={id} /> : null
}
```

- 而在具体的 preload 函数中，则要搭配 React 的 cache 函数一起使用：

```js
// components/Article.js
import { getArticle } from '@/utils/get-article'
import { cache } from 'react'

export const getArticle = cache(async (id) => {
  // ...
})

export const preload = (id) => {
 void getArticle(id)
}

export const checkIsAvailable = (id) => {
 // ...
}

export default async function Article({ id }) {
  const result = await getArticle(id)
  // ...
}
```

- 让我们更详细地解释一下例子中如何体现了预加载的概念：

### 预加载数据的目标

- 在 React 中，通常我们会在渲染页面时异步获取数据。
- 然而，如果数据的获取是按顺序进行的（即串行请求），那么每一个异步操作都必须等上一个操作完成才能继续。
- 这会导致性能瓶颈，特别是当多个数据需要依次请求时。
- 预加载的作用是：
  - 通过在页面渲染之前提前请求（预加载）一些数据，这样等到页面渲染时，数据已经准备好了，渲染过程不会受到数据加载的阻塞。

### 代码中的预加载实现

- 在例子中，preload 函数的作用就是预先请求并缓存数据。
- 你会注意到，preload(id) 是在页面渲染之前调用的，它没有直接返回数据，而是通过 getArticle(id) 来触发数据的加载，并将数据缓存。
  - preload(id) 在页面渲染之前被调用，它会调用 getArticle(id) 来获取文章的数据并将其缓存。
  - 这样，当页面渲染时，getArticle(id) 已经提前执行过，数据已经缓存。

### 为什么这是预加载？

- 提前加载数据：
  - preload(id) 函数触发了数据的加载过程。
  - 它没有等待数据获取完成，而是直接调用了 getArticle(id) 来请求数据。
  - 这就是所谓的预加载：**提前触发了异步数据请求，而不需要等到数据准备好后才开始渲染页面。**
- 缓存数据：
  - cache 函数的使用确保了数据只会被请求一次。
  - 如果页面多次访问相同的 id，数据会从缓存中获取，而不会重复请求。
  - 这避免了不必要的网络请求，提升了性能。

### 如何改进预加载？

- 如果你想确保数据已经预先加载并准备好，通常可以通过 Suspense 或 Promise.all 等方式来并行加载多个异步任务，以提高并发性。

- 例如，如果你有多个数据需要预加载，可以通过 Promise.all 来并行预加载所有数据：

```js
export default async function Page({ params: { id } }) {
  // 并行预加载多个数据
  const preloadData = Promise.all([preload(id), checkIsAvailable(id)])
  
  // 等待所有预加载完成
  const [articleData, isAvailable] = await preloadData
  
  return isAvailable ? <Article id={id} /> : null
}
```

### 案例总结

- 在这个例子中，预加载的核心概念是：
  - 通过在渲染页面之前提前请求数据并缓存，避免在页面渲染时阻塞等待数据加载。
  - 通过使用 cache 函数，你将异步数据请求的结果进行缓存，从而实现了更高效的数据加载和渲染。
