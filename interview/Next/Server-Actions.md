# 数据获取 ｜ Server Actions

- Server Actions 是指：
  - **在服务端执行的异步函数**。
  - 它们可以在 **服务端** 和 **客户端** 组件中使用，以处理 Next.js 应用中的 **数据提交和更改**。

- 注：如果大家看英文文档，“数据更改”更专业的说法叫做 Data Mutations，中文译为“数据突变”。
- 简单来说，数据查询（Data Queries）指读取数据，数据突变（Data Mutations）指更改数据。
- 突变可以是：新增、更新、删除字段或对象。
- “数据突变”初听可能有些奇怪，习惯就好。

## 基本用法

- 定义一个 Server Action 需要使用 React 的 "use server" 指令。
- 按指令的定义位置分为两种用法：
  - 将 "use server" 放到一个 async 函数的顶部表示该函数为 Server Action（函数级别）
  - 将 "use server" 放到一个单独文件的顶部表示该文件导出的所有函数都是 Server Actions（模块级别）
- Server Actions 可以在 **服务端组件** 使用，也可以在 **客户端组件** 使用。

- 当在 **服务端组件中** 使用的时候，两种级别都可以使用：

```jsx
// app/page.jsx
export default function Page() {
  // Server Action
  async function create() {
    'use server'
 
    // ...
  }
 
  return (
    // ...
  )
}
```

- 而在 **客户端组件中** 使用的时候，**只支持 模块级别**。
- 需要先创建一个文件（文件名无约定，很多开发者常命名为 "actions"），在顶部添加 "use server" 指令：

```jsx
'use server'

// app/actions.js
export async function create() {
  // ...
}
```

- 当需要使用的时候，导入该文件：

```jsx
import { create } from '@/app/actions'
 
export function Button() {
  return (
    // ...
  )
}
```

- 也可以将 Server Action 作为 props 传给客户端组件：

```jsx
<ClientComponent updateItem={updateItem} />
```

```jsx
'use client'
 
export default function ClientComponent({ updateItem }) {
  return <form action={updateItem}>{/* ... */}</form>
}
```

## 使用场景

- 在 Pages Router 下，如果要进行前后端交互，需要先定义一个接口，然后前端调用接口完成前后端交互。
- 而在 App Router 下，这种操作都可以简化为 Server Actions。

- 也就是说：
  - 如果你要实现一个功能。
  - 按照传统前后端分离的架构，需要自己先写一个接口，用于前后端交互。
- 那就都可以尝试使用 Server Actions，除非你就是需要写接口方便外部调用。

- 而在具体使用上：
  - 虽然 Server Actions 常与 `<form>` 一起使用。
  - 但其实还可以在:
    - **事件处理程序**
    - **useEffect**
    - **三方库**
    - **其他表单元素**（如 `<button>`）
  - 中调用。

## 实战体会

- 了解了基本用法，还是让我们在实战中具体体会吧！
- 我们的目标是写一个简单的 ToDoList。

> 写之前我们先用传统的 Pages Router 来实现一遍，通过对比来感受传统的使用 API 开发和使用 Server Actions 开发之间的区别。

### Pages Router - API

- 实现一个 ToDoList，我们需要先创建一个 /api/todo接口。
- 新建 app/api/todos/route.js，代码如下：

```js
import { NextResponse } from 'next/server'

const data = ['阅读', '写作', '冥想']
 
export async function GET() {
  return NextResponse.json({ data })
}

export async function POST(request) {
  const formData = await request.formData() // 获取表单数据，有多少个 input 就有多少个 key-value
  const todo = formData.get('todo')
  data.push(todo)
  return NextResponse.json({ data })
}
```

- 此时访问 /api/todos，效果如下：
  - GET：返回 ['阅读', '写作', '冥想']
- 现在我们开始写页面，在项目根目录新建 pages目录（用了 src，就放到 src 下），新建 pages/form.js，代码如下：

```jsx
import { useEffect, useState } from 'react'

export default function Page () {
  const [todos, setTodos] = useState([])

  // ------------------------------------------------------------------------------------

  async function onSubmit (event) {
    event.preventDefault()
    const response = await fetch('/api/todos', {
      method: 'POST',
      body: new FormData(event.currentTarget)
    })

    const { data } = await response.json()
    setTodos(data)
  }

  // ------------------------------------------------------------------------------------

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await (await fetch('/api/todos')).json()
      setTodos(data)
    }
    fetchData()
  }, [])

  // ------------------------------------------------------------------------------------

  return (
    <>
      <form onSubmit={onSubmit}>
        <input type='text' name='todo' />
        <button type='submit'>Submit</button>
      </form>
      <ul>
        {todos.map((todo, i) => (
          <li key={i}>{todo}</li>
        ))}
      </ul>
    </>
  )
}
```

- 代码很简单，页面加载的时候 GET 请求 /api/todos 渲染待办事项，表单提交的时候 POST 请求 /api/todos修改数据，然后渲染最新的待办事项。
- 这就是传统的 Pages Router + API 的开发方式，我们来看看 Server Actions 的开发方式。

### App Router - Server Actions

- 那么用 Server Actions 该怎么实现呢？
- 新建 app/form2/page.js，代码如下：

```jsx
import { findToDos, createToDo } from './actions';

export default async function Page() {
  const todos = await findToDos();
  return (
    <>
      <form action={createToDo}>
        <input type="text" name="todo" />
        <button type="submit">Submit</button>
      </form>
      <ul>
        {todos.map((todo, i) => <li key={i}>{todo}</li>)}
      </ul>
    </>
  )
}
```

- 新建 app/form2/actions.js，代码如下：

```jsx
'use server'

import { revalidatePath } from "next/cache";

const data = ['阅读', '写作', '冥想']
 
export async function findToDos() {
  return data
}

export async function createToDo(formData) {
  const todo = formData.get('todo')
  data.push(todo)
  revalidatePath("/form2");
  return data
}
```

- 其实效果跟 Pages Router 下相同。

---

## Server Actions

- 就让我们以这个简单的 Server Actions Demo 为例来分析下 Server Actions。

### 基本原理

- 首先是原理，Server Actions 是怎么实现的呢？让我们看下表单对应的 HTML 元素：

```html
<form action={createToDo}>
  <input type="text" name="todo" />
  <button type="submit">Submit</button>
</form>
```

- 启动后，我们在浏览器中查看源代码，发现dom结构如下：

```html
<form action enctype="multipart/form-data" method="POST">
    <input type="hidden" name="$ACTION_ID_7d0078dd37ba889ac25b20edfef0d582e4e9f532">
    <input type="text" name="todo">
    <button type="submit">Submit</button>
</form>
```

- 解析：
  - Next.js 会自动插入一个 `<input type="hidden">`，其值为 $ACTION_ID_xxxxxxxx，用于让服务端区分 Action（因为一个页面可能使用多个 Server Actions）。
  - 当点击 Submit 的时候，触发表单提交，会发送一个 POST 请求到当前页面地址：
    - 请求会携带表单中的值，以及 $ACTION_ID：
    - 接口返回 RSC Payload，用于渲染更新后的数据。
- 简而言之：
  - **Server Actions 背后使用的是 POST 请求方法**，请求 **当前页面地址**，根据 $ACTION_ID 区分。
  - **Server Actions 与 Next.js 的缓存和重新验证架构集成**。
    - 调用 Action 时，Next.js 可以一次性返回更新的 UI 和新数据。

### 使用好处

- 说说使用 Server Actions 的好处：
  - 代码更简洁。
    - 你也不需要手动创建接口。
    - 而且 Server Actions 是函数，这意味着它们可以在应用程序的 **任意位置中复用**。
  - 当结合 form 使用的时候，支持 **渐进式增强**。
    - 也就是说，即使禁用 JavaScript，表单也可以正常提交。
    - 如果使用 Pages Router 下的监听事件的方式，表单就无法正常工作了。
    - 但是 Server Actions 即使禁用 JS，也可以正常工作。
    - 使用 Server Actions 禁用和不禁用 JS 的差别是：
      - 不禁用的时候提交表单，**页面不会刷新**。
      - 禁用的时候 **提交表单页面会刷新**。

### 注意要点

- 最后讲讲使用 Server Actions 的注意要点。
  - Server Actions 的 **参数** 和 **返回值** 都必须是可序列化的，简单的说，JSON.stringfiy 这个值不出错。
  - Server Actions 会 **继承** 使用的 **页面** 或者 **布局** 的运行时和 **路由段配置项**，包括像 maxDuration 等字段

### 支持事件

- 前面也说过：

> 而在具体使用上，虽然 Server Actions 常与 `<form>` 一起使用，但其实还可以在事件处理程序、useEffect、三方库、其他表单元素（如 `<button>`）中调用。

- 如果是在事件处理程序中，该怎么使用呢？
- 我们为刚才的 ToDoList 增加一个 “添加运动” 的按钮。当点击的时候，将运动添加到 TODO 中。
  - 修改 app/form2/page.js，代码如下：

```jsx
import { findToDos, createToDo } from './actions';
import Button from './button';

export default async function Page() {
  const todos = await findToDos();
  return (
    <>
      <form action={createToDo}>
        <input type="text" name="todo" />
        <button type="submit">Submit</button>
      </form>
      <Button>添加运动</Button>
      <ul>
        {todos.map((todo, i) => <li key={i}>{todo}</li>)}
      </ul>
    </>
  )
}
```

- 新建 app/form2/button.js，代码如下：

```jsx
'use client'

import { createToDoDirectly } from './actions';

export default function Button({children}) {
  return <button onClick={async () => {
    const data = await createToDoDirectly('运动')
    alert(JSON.stringify(data))
  }}>{children}</button>
}
```

- 修改 app/form2/actions.js，添加代码：

```jsx
export async function createToDoDirectly(value) {
  const form = new FormData()
  form.append("todo", value);
  return createToDo(form)
}
```

- 这里的 Server Actions 是怎么实现的呢？
  - 其实还是发送了一个 POST 请求到当前地址。
  - 返回的依然是 RSC Payload。
- 通过 Button 组件，我们可以看到，Server Actions 也可以在 **事件处理程序** 中使用。

### 总结 （50%）

- 想必大家已经熟悉了 Server Actions 的基本用法。
- Server Actions 自 Next.js v14 起进入稳定阶段。
- 以后应该会是 Next.js 开发全栈项目时获取数据的主要方式，一定要熟练掌握。

- 其实使用 Server Actions 还有很多细节，比如：
  - 如何获取表单提交时的等待状态？
  - 服务端如何验证字段？
  - 如何进行乐观更新？
  - 如何进行错误处理？
  - 如何获取 Cookies、Headers 等数据？
  - 如何重定向？
  - ……
- 这些也都是开发中常遇到的问题，接下来继续 Server Actions。
