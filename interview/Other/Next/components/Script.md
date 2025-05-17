# 组件 | Script

- Next.js 内置的脚本组件，用于控制加载和执行三方脚本文件。使用基本示例如下：

```jsx
// app/dashboard/page.js
import Script from 'next/script'
 
export default function Dashboard() {
  return (
    <>
      <Script src="https://example.com/script.js" />
    </>
  )
}
```

- 这是用在 page.js 之中，也可以用在 layout.js 之中使用，实现为多个路由加载一个脚本：

```jsx
// app/dashboard/layout.js
import Script from 'next/script'
 
export default function DashboardLayout({ children }) {
  return (
    <>
      <section>{children}</section>
      <Script src="https://example.com/script.js" />
    </>
  )
}
```

- 这样当访问如 dashboard/page.js 或是子路由 dashboard/settings/page.js的时候，脚本都会获取。
- Next.js 会保证脚本只加载一次，即使用户在同一布局的多个路由之间导航。

- 如果你希望所有路由都加载一个脚本，那可以直接写在根布局中：

```jsx
// app/layout.js 
import Script from 'next/script'
 
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
      <Script src="https://example.com/script.js" />
    </html>
  )
}
```

- 当然考虑到性能问题，尽可能在特定页面或布局中加载三方脚本。

## strategy

- 脚本加载策略，一共有四种：
  - beforeInteractive： 在可交互前加载，适用于如机器人检测、Cookie 管理等
  - afterInteractive：默认值，在可交互后加载，适用于如数据统计等
  - lazyOnload：在浏览器空闲时间加载
  - worker：（实验性质）通过 web worker 加载
  
### beforeInteractive

- 顾名思义，在可交互之前加载。
- beforeInteractive脚本必须放在根布局（app/layout.tsx）之中，用于加载整站都需要的脚本，适用于一些在页面具有可交互前需要获取的关键脚本。
- 它会被注入到 HTML 文档的 head 中，不管你写在组件的哪里：

```js
// app/layout.js
import Script from 'next/script'
 
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
      <Script
        src="https://example.com/script.js"
        strategy="beforeInteractive"
      />
    </html>
  )
}
```

> 虽然我们将 Script 组件写在 body 标签之后，但依然被注入到 head 中。

### afterInteractive

- 顾名思义，在页面可交互后（不一定是完全可交互）后加载，这是 Script 组件默认的加载策略，适用于需要尽快加载的脚本。
- afterInteractive 脚本可以写在任何 **页面** 或者 **布局** 中，并且 **只有当浏览器中打开该页面的时候** 才会加载和执行。

```js
// app/page.js
import Script from 'next/script'
 
export default function Page() {
  return (
    <>
      <Script src="https://example.com/script.js" strategy="afterInteractive" />
    </>
  )
}
```

### lazyOnload

- 在 **浏览器空闲的时候** 注入到 HTML 客户端，并在 **页面所有资源都获取后** 开始加载。
- 此策略是用于不需要提前加载的后台或者低优先级脚本。
- lazyOnload 脚本可以写在任何页面或者布局中，并且只有当浏览器中打开该页面的时候才会加载和执行。

```js
// app/page.js
import Script from 'next/script'
 
export default function Page() {
  return (
    <>
      <Script src="https://example.com/script.js" strategy="lazyOnload" />
    </>
  )
}
```

### worker

- worker，实验性质的加载策略，目前并不稳定，并且不能在 app 目录下使用，所以请谨慎使用。
- 使用该策略的脚本将开一个 web worker 线程执行，从确保主线程处理关键的代码。
- 它的背后是使用 Partytown 处理。尽管这个策略可以用于任何脚本，但作为一种高级用法，并不保证支持所有第三方脚本。

```js
// next.config.js
module.exports = {
  experimental: {
    nextScriptWorkers: true,
  },
}
```

- 此时当你运行 npm run dev的时候，Next.js 会提示你安装 Partytown：

```bash
npm install @builder.io/partytown
```

- 当完成设置后，定义 strategy="worker"将会在应用中实例化 Partytown，并将脚本放在 web worker 中。
- 不过 worker 脚本目前只能在 pages/ 目录下使用：

```js
// pages/home.js
import Script from 'next/script'
 
export default function Home() {
  return (
    <>
      <Script src="https://example.com/script.js" strategy="worker" />
    </>
  )
}
```

### onLoad

- 一些三方脚本需要在脚本加载完毕后执行 JavaScript 代码以完成实例化或者调用函数。
- 如果使用 afterInteractive 或者 lazyOnload 作为加载策略，则可以在加载完后使用 onLoad 属性执行代码。

> 注意：onLoad 不能在服务端组件中使用，只能在客户端中使用。
> 而且 onLoad 不能和 beforeInteractive 一起使用，使用 onReady 代替。

### onReady

- 某些三方脚本要求用户在脚本完成加载后以及每次组件挂载的时候执行 JavaScript 代码，就比如地图导航。
- 你可以使用 onLoad 属性处理首次加载，使用 onReady 属性处理组件每次重新挂载的时候执行代码。

### onError

- 当脚本加载失败的时候用于捕获错误，此时可以使用 onError 属性处理。

### 其他 prop

- 原生的 `<script>` 元素有很多 DOM 属性，其他添加在 Script 组件的 prop 都会自动转发给底层的 `<script>` 元素。

```js
// app/page.js
import Script from 'next/script'
 
export default function Page() {
  return (
    <>
      <Script
        src="https://example.com/script.js"
        id="example-script"
        nonce="XUENAJFW"
        data-test="script"
      />
    </>
  )
}
```
