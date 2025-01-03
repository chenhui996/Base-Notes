# 数据缓存（Data Cache）

## 工作原理

- Next.js 有自己的数据缓存方案，可以 **跨服务端请求** 和 **构建部署存储数据**。
- 之所以能够实现，是因为 Next.js 拓展了 fetch API，在 Next.js 中，**每个请求都可以设置自己的缓存方式**。

- 不过与 React 的 **请求记忆** 不同的是：
  - **请求记忆** 因为只用于组件树渲染的时候，所以不用考虑 **数据缓存更新** 的情况。
  - 但 Next.js 的 **数据缓存** 方案更为持久，则需要考虑这个问题。

- 默认情况下，使用 fetch 的数据请求都会被缓存，这个缓存是持久的，它不会自动被重置。
- 你可以使用 fetch 的 cache 和 next.revalidate 选项来配置缓存行为：

```js
fetch(`https://...`, { cache: 'force-cache' | 'no-store' })
```

```js
fetch(`https://...`, { next: { revalidate: 3600 } })
```

- 让我们解释一下：
  - 当 **渲染首次调用** 时：
    - **请求记忆** 和 **数据缓存** 都会 MISS，从而执行请求。
    - 返回的结果在 **请求记忆** 和 **数据缓存** 中都会存储一份。  
  - 再次调用时，因为添加了 `{cache: 'no-store'}` 参数：
    - 请求参数不同，**请求记忆** 会 MISS，而这个参数会导致 **数据缓存** 跳过，所以依然是执行请求。
    - 因为配置了 `no-store`，所以 **数据缓存** 也 **不会缓存** 返回的结果，**请求记忆** 则会 **正常做缓存处理**。

## 持续时间

- **数据缓存** 在:
  - **传入请求** 和 **部署** 中都 **保持不变**。
  - 除非 **重新验证** 或者 **选择退出**。

## 重新验证

- Next.js 提供了两种方式更新缓存：

- **基于时间的重新验证（Time-based revalidation）**：
  - 即经过一定时间并有新请求产生后重新验证数据，适用于不经常更改且新鲜度不那么重要的数据。
- **按需重新验证（On-demand revalidation）**：
  - 根据事件手动重新验证数据。
  - 按需重新验证又可以使用 **基于标签（tag-based）** 和 **基于路径（path-based）** 两种方法 **重新验证数据**。
  - 适用于需要尽快展示最新数据的场景。

### 基于时间

- 基于时间的重新验证，需要使用 fetch 的 next.revalidate 选项设置缓存的时间（注意它是以秒为单位）。例如：

```js
// 每60s重新验证
fetch('https://...', { next: { revalidate: 60 } })
```

- 可以借助路由段配置项来配置该路由所有的 fetch 请求：

```js
// /app/api/cache/route.js
export const revalidate = 60
export async function GET() {
  // ...
}
```

- 以上代码表示，该路由下的所有 fetch 请求都会被缓存 60s。
- 并不是 60s 后该请求会自动更新，而是 60s 后再有请求的时候，会进行重新验证：
  1. 60s 后的第一次请求依然会返回之前的缓存值。
  2. 但 Next.js 将使用新数据更新缓存。
  3. 60s 后的第二次请求会使用新的数据。

### 按需更新

- 使用按需重新验证，数据可以根据路径（revalidatePath）和 缓存标签（revalidateTag） 按需更新。

- revalidatePath 用在路由处理程序或 Server Actions 中，用于手动清除特定路径中的缓存数据：

```js
revalidatePath('/')
```

- revalidateTag 依赖的是 Next.js 的缓存标签系统。
  - 当使用 fetch 请求的时候，**声明一个标签**。
  - 然后在 **路由处理程序** 或是 **Server Actions 中** 重新验证具有某一标签的请求：

```js
// 使用标签
fetch(`https://...`, { next: { tags: ['a', 'b', 'c'] } })
```

```js
// 重新验证标签
revalidateTag('a')
```

- 跟基于时间的重新验证有所不同。
  - 第一次调用请求的时候，正常缓存数据。
  - 当触发 **按需重新验证** 的时候:
    - 例如匹配 `revalidatePath('/')` 或 `revalidateTag('a')`。
    - **将会从缓存中删除相应的缓存条目**。
  - 下次请求的时候，又相当于第一次调用请求，正常缓存数据。

## 退出方式

- 退出方式是指 **如何清除缓存**。
- 如果你想要退出数据缓存，有两种方式：

- 一种是将 fetch 的 cache 选项设置为 no-store，示例如下，每次调用的时候都会重新获取数据：

```js
fetch(`https://...`, { cache: 'no-store' })
```

- 一种是使用 **路由段配置项**，它会影响该路由段中的所有数据请求：

```js
// /app/api/cache/route.js
export const fetchCache = 'no-store' // 每次请求都重新获取数据。还有 force-dynamic：每次请求都重新获取数据，但会缓存结果。
export async function GET() {
  // ...
}
```
