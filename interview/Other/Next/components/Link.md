# 组件 | Link

- Link 组件是一个拓展了 HTML `<a>` 元素的 React 组件，提供了预加载和客户端路由之间的导航功能。
- 它是 Next.js 路由导航的主要方式。使用示例如下：

```jsx
// app/page.js
import Link from 'next/link'
 
export default function Page() {
  return <Link href="/dashboard">Dashboard</Link>
}
```

## href（必须）

- 导航跳转的路径或者 URL：
  - 如果是相对路径，会被解析为相对于当前页面的路径。
  - 如果是绝对路径，会被解析为相对于应用根目录的路径。
  - 如果是 URL，会被直接使用。

```jsx
<Link href="/dashboard">Dashboard</Link>
<Link href="https://example.com">Example</Link>
```

- href也支持传入一个对象：
  - `pathname`：路径或 URL。
  - `query`：查询参数对象。

```jsx
// 导航至 /about?name=test
<Link
  href={{
    pathname: '/about',
    query: { name: 'test' },
  }}
  >
  About
</Link>

```

- 可传：
  - href：'<http://user:pass@host.com:8080/p/a/t/h?query=string#hash>'
  - protocol：'http:'
  - host: 'host.com:8080'
  - auth: 'user:pass'
  - hostname: 'host.com'
  - port: '8080'
  - pathname: '/p/a/t/h'
  - search: '?query=string'
  - path: '/p/a/t/h?query=string'
  - query: 'query=string' or {'query':'string'}
  - hash: '#hash'

## replace

- 默认值为 false，当值为 true 的时候，next/link会替换浏览器当前的历史记录，而非在浏览器的历史项里新增一个 URL。

```jsx
// app/page.js
import Link from 'next/link'
 
export default function Page() {
  return (
    <Link href="/dashboard" replace>
      Dashboard
    </Link>
  )
}
```

## scroll

- 默认值为 true。
- `<Link>` 组件的默认行为是:
  - **滚动** 到一个 **新导航** 的 **顶部** 或者在 **前进后退导航中** 维持之前的 **滚动位置**。
  - 当值为 false，next/link **不会** 在导航后 **滚动到新的页面顶部**（继续维持上一个路由的位置）。

```jsx
// app/page.js
import Link from 'next/link'
 
export default function Page() {
  return (
    <Link href="/dashboard" scroll={false}>
      Dashboard
    </Link>
  )
}
```

## prefetch

- 默认值为 true。
- 当值为 true 的时候，next/link会在后台预获取页面。
- 这可以有效改善客户端导航性能。
- 任何视口中的 `<Link />` （无论是初始加载的时候还是通过滚动）都会预加载。
- 但是要注意：预获取仅在生产环境中开启。
- 你可以通过传递 prefetch={false}来禁用这个功能。

```jsx
// app/page.js
import Link from 'next/link'
 
export default function Page() {
  return (
    <Link href="/dashboard" prefetch={false}>
      Dashboard
    </Link>
  )
}
```

## 其他 props

- 其他 props 会自动转发给底层的 `<a>` 元素，比如 target="_blank"、className。

## 示例

### 链接至动态路由

- 通过传递一个对象给 href，可以链接至动态路由。

```jsx
// app/blog/page.js
import Link from 'next/link'
 
function Page({ posts }) {
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>
          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
        </li>
      ))}
    </ul>
  )
}
```

### 中间件

- 我们通常会用中间件实现鉴权等功能，然后让用户重定向到其他的页面。
- 为了让组件能够在有中间件的时候获取到重定向后的链接，你需要告诉 Next.js 用于展示的 URL 和用于预获取的 URL。

- 举个例子，当你访问 /dashboard 这个路由的时候，需要进行身份验证。
- 如果身份验证通过，跳转到 /auth/dashboard 路由。
- 如果没有通过，则跳转到公共访问的 /public/dashboard 路由，实现代码如下：

```jsx
// middleware.js
export function middleware(req) {
  const nextUrl = req.nextUrl
  if (nextUrl.pathname === '/dashboard') {
    if (req.cookies.authToken) {
      return NextResponse.rewrite(new URL('/auth/dashboard', req.url))
    } else {
      return NextResponse.rewrite(new URL('/public/dashboard', req.url))
    }
  }
}
```

- 这个时候，为了让 <Link /> 组件预获取正确的地址，你可以这样写：

```jsx
import Link from 'next/link'
import useIsAuthed from './hooks/useIsAuthed'
 
export default function Page() {
  const isAuthed = useIsAuthed()
  const path = isAuthed ? '/auth/dashboard' : '/dashboard'
  return (
    <Link as="/dashboard" href={path}>
      Dashboard
    </Link>
  )
}
```

- 这里我们用到了 as 这个 prop，as 是一个遗留的 prop，早期为了搭配动态路由而实现。
- 这是因为在早期实现跳转动态路由功能的时候，代码并不像上节例子展示的那样理所当然：

```jsx
const pids = ['id1', 'id2', 'id3']
{
  pids.map((pid) => (
    <Link href="/post/[pid]" as={`/post/${pid}`}>
      <a>Post {pid}</a>
    </Link>
  ))
}
```

- 这是因为早期设计中：
  - href 基于文件系统路径，并不能在运行时被改变，跳转地址只能是 "/post/[pid]"这种形式。
  - 但为了让浏览器显示正确的地址，于是增加了 as prop，它是浏览器 URL 地址栏中展示的地址。

- 回到刚才这个例子：

```jsx
  <Link as="/dashboard" href={path}>
    Dashboard
  </Link>
```

- 因为 prefetch 基于的是 href 地址，为了 prefetch 到正确的地址，所以 path 做了 isAuthed 判断。
- 但最终跳转的地址应该是 /dashboard，然后在中间件里做具体的判断，所以使用了 as prop。
