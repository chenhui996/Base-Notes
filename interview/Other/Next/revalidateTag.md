# revalidateTag 使用示例

- **revalidateTag** 可以通过 **标签标记** 的方式 **批量重新验证缓存**。
- 创建目录：

```bash
/app
  /api
    /cacheWithTags
      route.js
    /revalidateTag
      route.js
```

---

## 1. 创建 API 路由并使用标签缓存

- 在 /app/api/cacheWithTags/route.js 中编写以下代码：

```js
import { revalidateTag } from 'next/cache';

// 为此 API 路由指定一个标签
export const fetchCache = 'force-cache';
export const dynamic = 'force-dynamic';
export const tags = ['dog-data'];

export async function GET() {
  const res = await fetch('https://dog.ceo/api/breeds/image/random');
  const data = await res.json();

  return Response.json({ data, now: Date.now() });
}
```

- 解释：
  - `tags = ['dog-data'];`：为该路由的缓存添加一个名为 dog-data 的标签。
  - 每次调用该路由时，缓存 -> 都会 **关联** 到此标签。
    - 关联: 使得 **revalidateTag('dog-data')** 可以 **批量重新验证** 与该标签关联的所有缓存。

---

## 2. 创建触发重新验证的 API 路由

- 在 /app/api/revalidateTag/route.js 中编写以下代码：

```js
import { revalidateTag } from 'next/cache';

export async function GET(request) {
  const tag = request.nextUrl.searchParams.get('tag');

  if (tag) {
    revalidateTag(tag); // 重新验证指定标签
    return Response.json({ revalidated: true, now: Date.now() });
  }

  return Response.json({
    revalidated: false,
    now: Date.now(),
    message: 'Missing tag to revalidate',
  });
}
```

- 解释：
  - 接收 tag 参数（表示需要重新验证的标签）。
  - 调用 revalidateTag(tag) 更新所有与该标签关联的缓存。

---

## 3. 本地测试流程

### 1. 启动本地开发服务器

```shell
`npm run dev`
```

### 2. 访问 /api/cacheWithTags 查看初始数据

- 打开 <http://localhost:3000/api/cacheWithTags>
  - 会返回类似以下结果：

```json
{
  "data": {
    "message": "https://images.dog.ceo/breeds/hound-afghan/n02088094_3348.jpg",
    "status": "success"
  },
  "now": 1702737805000
}
```

### 调用 /api/revalidateTag 更新缓存

- 打开 <http://localhost:3000/api/revalidateTag?tag=dog-data>
  - 会返回类似以下结果：

```json
{
  "revalidated": true,
  "now": 1702737810000
}
```

- 解释: 此时，/api/cacheWithTags 的缓存已被更新，下次访问 /api/cacheWithTags 时会重新获取最新数据。

### 4. 再次访问 /api/cacheWithTags 查看更新后的数据

- 刷新 <http://localhost:3000/api/cacheWithTags>
  - 你会发现返回的 now 时间戳和图片链接已经更新。

---

## 另一种方式：使用 next: { tags: [...] } 来标记请求

- 在 Next.js 中，你可以通过 next 配置中的 tags 选项，在发送 fetch 请求时为请求的数据添加标签。例如：

```js
// app/page.js
export default async function Page() {
  const res = await fetch('https://dog.ceo/api/breeds/image/random', { 
    next: { tags: ['collection'] }  // 设置标签
  });
  const data = await res.json();

  return (
    <div>
      <img src={data.message} alt="Dog" />
    </div>
  );
}
```

- 通过这种方式，你可以在发送请求时为数据添加标签，以便在需要时重新验证缓存。
  - 例如，你可以使用 revalidateTag('collection') 来重新验证与 collection 标签关联的所有缓存。

---

## 4. 注意事项

- **标签的使用场景**
  - **revalidateTag** 更适用于批量更新缓存，例如某些资源（如 API 数据）被 多个 **页面或组件** 使用的情况。

- **生产环境支持**
  - 确保在 **生产环境中** 正确设置 **标签** 和 **缓存策略**，**revalidateTag** 能够有效更新相关资源。

---

> 通过 revalidateTag，你可以轻松实现基于标签的缓存更新，适用于复杂场景下的批量操作。
