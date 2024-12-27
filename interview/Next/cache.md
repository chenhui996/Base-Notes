# React 和 Next.js 中的 `cache` 函数

- 在 React 18 和 Next.js 中，`cache` 函数都是优化性能的工具，它们有相似的作用：
  - 缓存异步请求的数据，减少重复的请求和计算。

> 尽管两者的功能类似，但它们的实现方式和使用场景有所不同。

## 1. React 18 中的 `cache` 函数

### 1.1 定义

在 React 18 中，`cache` 函数用于缓存异步数据的结果，通常配合 **Suspense** 和 **Concurrent Rendering** 使用，目的是避免重复请求相同的数据。

### 1.2 用法

```javascript
import React from 'react';

// 假设这是一个异步加载数据的函数
const fetchData = () => {
  return fetch('/api/data')
    .then((response) => response.json());
};

// 使用 cache 函数来缓存请求的结果
const cachedData = React.cache(fetchData);

const MyComponent = () => {
  const data = cachedData();
  
  return (
    <div>
      <h1>Data from Cache: {data}</h1>
    </div>
  );
};
```

### 1.3 工作原理

- **`cache` 函数**：缓存某个异步数据（如 `fetch` 请求的结果），避免每次重新请求相同的数据。
- **缓存粒度**：缓存的是异步请求的数据，可以有效避免重复请求相同的数据。
- **使用场景**：通常与 React 的 **Suspense** 和 **Concurrent Rendering** 配合使用，适用于优化异步加载的数据。

### 1.4 特性

- **自动缓存**：React 自动管理缓存，避免重复的网络请求。
- **不支持过期时间**：React 的 `cache` 函数目前没有提供过期机制，它的缓存管理是基于 React 渲染的行为。

---

## 2. Next.js 中的 `cache` 函数

### 2.1 定义

- Next.js 中的 `cache` 函数用于 **缓存异步函数的结果**。
  - 通常用于:
    - 优化服务器端渲染（SSR）
    - 静态站点生成（SSG）
  - 时的性能。
- 它能够缓存 API 请求的结果，减少不必要的重复请求。

### 2.2 用法

```typescript
import { cache } from 'next/dist/next-server/server/api-utils';

const fetchData = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('data');
    }, 1000);
  });
};

const getData = async () => {
  const key = 'dataKey';
  const ttl = 60;  // 缓存 60 秒
  const data = await cache(fetchData, key, ttl);
  console.log(data);
};

getData();
```

### 2.3 工作原理

- **`cache` 函数**：缓存的是异步请求的数据，减少重复的网络请求。它通过指定的 `key` 来存储数据，并且支持缓存的过期时间（TTL）。
- **缓存粒度**：缓存整个异步请求的结果，可以是全局的或者按需缓存。
- **使用场景**：主要用于减少 SSR 或 SSG 中重复的 API 请求，适用于优化性能。

### 2.4 特性

- **支持 TTL（过期时间）**：可以设置缓存的过期时间，当缓存过期后，下次请求会重新执行异步操作。
- **手动管理缓存**：开发者需要显式指定缓存的 `key` 和 `ttl`。

## 3. React `cache` 和 Next.js `cache` 的区别

| **特性**             | React 18 的 `cache` 函数                                | Next.js 的 `cache` 函数                               |
|----------------------|--------------------------------------------------------|------------------------------------------------------|
|----------------------|--------------------------------------------------------|------------------------------------------------------|
| **主要用途**          | 缓存异步数据请求的结果，配合 Suspense 使用                  | 缓存异步函数的结果，避免重复请求数据，支持过期时间           |
| **缓存的粒度**        | 主要针对数据的缓存，适用于异步加载的数据                      | 用于缓存异步请求的数据，适用于服务器端和客户端的数据请求      |
| **过期机制**          | 没有明确的过期机制，缓存依赖于 React 的渲染行为               | 支持缓存过期时间（TTL），可以手动设置缓存过期时间            |
| **适用场景**          | 配合 React 18 的 Suspense 和 Concurrent Rendering 使用   | 用于减少重复的 API 请求，优化页面渲染性能                  |

## 4. 总结

- **React 18 的 `cache` 函数**：
  - 专注于异步数据的缓存，适用于 React 组件中的数据加载，特别是在使用 `Suspense` 和 **Concurrent Rendering** 时，用于避免重复请求相同的数据。
- **Next.js 的 `cache` 函数**：
  - 用于缓存服务器端数据请求，优化 SSR 或 SSG 时的性能。它支持设置缓存过期时间（TTL），可以有效减少重复的网络请求。

> 尽管两者都实现了缓存异步数据的功能，它们的使用场景和功能细节有所不同，开发者可以根据具体需求选择合适的工具。
