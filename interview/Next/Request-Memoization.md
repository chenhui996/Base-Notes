# 请求记忆（Request Memoization）

## 工作原理

- React 拓展了 fetch API，当有相同的 URL 和参数的时候，React 会自动将请求结果缓存。
- 也就是说，即时你在组件树中的 **多个位置请求一份相同的数据**，但数据获取只会执行一次。

- 这样当你跨路由（比如跨布局、页面、组件）时，你不需要在顶层请求数据，然后将返回结果通过 props 转发。
  - **直接在需要数据的组件中请求数据即可**。
  - **不用担心对同一数据发出多次请求造成的性能影响**。

```js
// app/page.js
async function getItem() {
  // 自动缓存结果
  const res = await fetch('https://.../item/1')
  return res.json()
}
 
// 函数调用两次，但只会执行一次请求
const item = await getItem() // cache MISS
 
const item = await getItem() // cache HIT
```

- 描述：
  1. 当渲染 /a 路由的时候，由于是第一次请求，会触发缓存 MISS。
  2. 函数被执行，请求结果会被存储到内存中（缓存SET）。
  3. 当下一次相同的调用发生时，会触发缓存 HIT，数据直接从内存中取出。

- 关于请求记忆，要注意：
  - **请求记忆是 React 的特性，并非 Next.js 的特性**。
    - React 和 Next.js 都做了请求缓存：
      - React 的方案叫做“请求记忆”。
      - Next.js 的方案叫做“数据缓存”。
    - 两者有很多不同。
  - **请求记忆只适合用于用 GET 方法的 fetch 请求**。
  - **请求记忆只应用于 React 组件树**。
    - 也就是说你在 generateMetadata、generateStaticParams、布局、页面和其他 **服务端组件中** 使用 fetch 会触发请求记忆。
    - 但是在 **路由处理程序中** 使用则 **不会触发**，因为这就不在 React 组件树中了。

## 持续时间

- **缓存** 会持续在 **服务端请求的生命周期中**，**直到 React 组件树渲染完毕**。
- 它的存在是为了：
  - 避免组件树 **渲染的时候**，**多次请求** 同一数据造成的 **性能影响**。

## 重新验证

- 由于请求记忆只会在渲染期间使用，因此也无须重新验证。

## 退出方式

- 这个行为是 React 的默认优化。不建议退出。
- 如果你不希望 fetch 请求被记忆，可以借助 AbortController 这个 Web API，具体使用方式如下（虽然这个 API 本来的作用是用来中止请求）：

```js
const { signal } = new AbortController()
fetch(url, { signal })
```

## React Cache

- 如果你不能使用 fetch 请求，但是又想实现记忆，可以借助 React 的 cache 函数：

```js
// utils/get-item.ts
import { cache } from 'react'
import db from '@/lib/db'
 
export const getItem = cache(async (id: string) => {
  const item = await db.item.findUnique({ id })
  return item
})
```

> 细节介绍 cache 函数，跳转：[React 和 Next.js 中的 `cache` 函数](./cache.md)
