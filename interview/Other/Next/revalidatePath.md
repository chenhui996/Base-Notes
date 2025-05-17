# revalidatePath 使用示例

- **revalidatePath** 可以在 **路由处理程序** 或 **Server Action** 中调用，用来更新 **特定路径** 的缓存。
- 创建目录：

```bash
/app
  /api
    /revalidatePath
      route.js
    /cache
      route.js
```

---

## 1. 创建 触发重新验证的 API 路由

- 在 /app/api/revalidatePath/route.js 中编写以下代码：

```js
import { revalidatePath } from 'next/cache';

export async function GET(request) {
  const path = request.nextUrl.searchParams.get('path');

  if (path) {
    revalidatePath(path); // 重新验证指定路径
    return Response.json({ revalidated: true, now: Date.now() });
  }

  return Response.json({
    revalidated: false,
    now: Date.now(),
    message: 'Missing path to revalidate',
  });
}
```

- 解释：
  - 接收 path 参数（表示需要重新验证的路径）。
  - 调用 revalidatePath(path) **更新对应路径的缓存**。
    - 效果：下次访问 path 时会重新获取最新数据。
  - 返回状态信息，指示是否成功触发重新验证。

---

## 2. 创建一个可缓存的数据接口

- 在 /app/api/cache/route.js 中创建一个简单的 API 路由，该路由返回随机的狗狗图片：

```js
// 路由动态渲染
export const revalidate = 0
// fetch 强制缓存
export const fetchCache = 'force-cache'
export async function GET() {
  const res = await fetch('https://dog.ceo/api/breeds/image/random')
  
  const data = await res.json()
  return Response.json({ data, now: Date.now() })
}
```

- 解释：
  - `export const revalidate = 0;`：禁用 Next.js 的静态渲染，使该路由每次请求时都动态渲染。
  - `export const fetchCache = 'force-cache';`：确保 fetch 请求的结果可以被缓存，以便 revalidatePath 能够重新验证。

---

## 3. 本地测试流程

### 1. 启动本地开发服务器

```shell
`npm run dev`
```

### 2. 访问 /api/cache 查看初始数据

- 打开 <http://localhost:3000/api/cache>
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

- 记录 now 的时间戳。

### 调用 /api/revalidatePath 更新缓存

- 打开 <http://localhost:3000/api/revalidatePath?path=/api/cache>
  - 会返回类似以下结果：

```json
{
  "revalidated": true,
  "now": 1702737810000
}
```

- 解释：此时，/api/cache 的缓存已被更新，下次访问 /api/cache 时会重新获取最新数据。

### 4. 再次访问 /api/cache 查看更新后的数据

- 刷新 <http://localhost:3000/api/cache>：
  - 你会发现返回的 now 时间戳和图片链接已经更新。

---

## 4. 注意事项

- **静态渲染 vs 动态渲染**
  - 如果没有 export const revalidate = 0;，API 路由会被静态渲染，导致 revalidatePath 无法生效。
    - **个人追问：为什么开发环境起效？**
      - 开发环境下，Next.js 会在每次请求时动态生成 API 路由，因此 revalidatePath 可以正常工作。
      - 生产环境下，Next.js 会预先生成 API 路由，导致 revalidatePath 无法生效。也就是静态渲染的问题。
  - 配置 revalidate = 0; 后，API 路由会在每次请求时动态生成。

- **缓存的强制管理**
  - 使用 `export const fetchCache = 'force-cache'`;，确保 fetch 请求的结果可以被缓存，便于 revalidatePath 正常工作。

- **生产环境测试**
  - 以上配置在生产环境同样有效，确保按需重新验证对指定路径生效。

---

> 通过这个例子，你可以轻松理解如何使用 revalidatePath 来实现按需重新验证，动态更新缓存。
