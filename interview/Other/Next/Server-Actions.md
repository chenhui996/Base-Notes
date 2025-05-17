# 数据获取 | Server Actions

## 前言 (上篇)

- Server Actions 是指:
  - **在服务端执行的异步函数**。
  - 它们可以在 **服务端** 和 **客户端** 组件中使用, 以处理 Next.js 应用中的 **数据提交和更改**。

- 注: 如果大家看英文文档, “数据更改”更专业的说法叫做 Data Mutations, 中文译为“数据突变”。
- 简单来说, 数据查询 (Data Queries) 指读取数据, 数据突变 (Data Mutations) 指更改数据。
- 突变可以是: 新增、更新、删除字段或对象。
- “数据突变”初听可能有些奇怪, 习惯就好。

## 基本用法

- 定义一个 Server Action 需要使用 React 的 "use server" 指令。
- 按指令的定义位置分为两种用法:
  - 将 "use server" 放到一个 async 函数的顶部表示 **该函数** 为 Server Action (函数级别)
  - 将 "use server" 放到一个单独文件的顶部表示 **该文件导出的所有函数** 都是 Server Actions (模块级别)
- Server Actions 可以在 **服务端组件** 使用, 也可以在 **客户端组件** 使用。

- 当在 **服务端组件中** 使用的时候, 两种级别都可以使用:

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

- 而在 **客户端组件中** 使用的时候, **只支持 模块级别**。
- 需要先创建一个文件 (文件名无约定, 很多开发者常命名为 "actions") , 在顶部添加 "use server" 指令:

```jsx
'use server'

// app/actions.js
export async function create() {
  // ...
}
```

- 当需要使用的时候, 导入该文件:

```jsx
import { create } from '@/app/actions'
 
export function Button() {
  return (
    // ...
  )
}
```

- 也可以将 Server Action 作为 props 传给客户端组件:

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

- 在 Pages Router 下, 如果要进行前后端交互, 需要先定义一个接口, 然后前端调用接口完成前后端交互。
- 而在 App Router 下, 这种操作都可以简化为 Server Actions。

- 也就是说:
  - 如果你要实现一个功能。
  - 按照传统前后端分离的架构, 需要自己先写一个接口, 用于前后端交互。
- 那就都可以尝试使用 Server Actions, 除非你就是需要写接口方便外部调用。

- 而在具体使用上:
  - 虽然 Server Actions 常与 `<form>` 一起使用。
  - 但其实还可以在:
    - **事件处理程序**
    - **useEffect**
    - **三方库**
    - **其他表单元素** (如 `<button>`)
  - 中调用。

## 实战体会

- 了解了基本用法, 还是让我们在实战中具体体会吧！
- 我们的目标是写一个简单的 ToDoList。

> 写之前我们先用传统的 Pages Router 来实现一遍, 通过对比来感受传统的使用 API 开发和使用 Server Actions 开发之间的区别。

### Pages Router - API

- 实现一个 ToDoList, 我们需要先创建一个 /api/todo接口。
- 新建 app/api/todos/route.js, 代码如下:

```js
import { NextResponse } from 'next/server'

const data = ['阅读', '写作', '冥想']
 
export async function GET() {
  return NextResponse.json({ data })
}

export async function POST(request) {
  const formData = await request.formData() // 获取表单数据, 有多少个 input 就有多少个 key-value
  const todo = formData.get('todo')
  data.push(todo)
  return NextResponse.json({ data })
}
```

- 此时访问 /api/todos, 效果如下:
  - GET: 返回 ['阅读', '写作', '冥想']
- 现在我们开始写页面, 在项目根目录新建 pages目录 (用了 src, 就放到 src 下) , 新建 pages/form.js, 代码如下:

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

- 代码很简单, 页面加载的时候 GET 请求 /api/todos 渲染待办事项, 表单提交的时候 POST 请求 /api/todos修改数据, 然后渲染最新的待办事项。
- 这就是传统的 Pages Router + API 的开发方式, 我们来看看 Server Actions 的开发方式。

### App Router - Server Actions

- 那么用 Server Actions 该怎么实现呢？
- 新建 app/form2/page.js, 代码如下:

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

- 新建 app/form2/actions.js, 代码如下:

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

- 首先是原理, Server Actions 是怎么实现的呢？让我们看下表单对应的 HTML 元素:

```html
<form action={createToDo}>
  <input type="text" name="todo" />
  <button type="submit">Submit</button>
</form>
```

- 启动后, 我们在浏览器中查看源代码, 发现dom结构如下:

```html
<form action enctype="multipart/form-data" method="POST">
    <input type="hidden" name="$ACTION_ID_7d0078dd37ba889ac25b20edfef0d582e4e9f532">
    <input type="text" name="todo">
    <button type="submit">Submit</button>
</form>
```

- 解析:
  - Next.js 会自动插入一个 `<input type="hidden">`, 其值为 $ACTION_ID_xxxxxxxx, 用于让服务端区分 Action (因为一个页面可能使用多个 Server Actions) 。
  - 当点击 Submit 的时候, 触发表单提交, 会发送一个 POST 请求到当前页面地址:
    - 请求会携带表单中的值, 以及 $ACTION_ID:
    - 接口返回 RSC Payload, 用于渲染更新后的数据。
- 简而言之:
  - **Server Actions 背后使用的是 POST 请求方法**, 请求 **当前页面地址**, 根据 $ACTION_ID 区分。
  - **Server Actions 与 Next.js 的缓存和重新验证架构集成**。
    - 调用 Action 时, Next.js 可以一次性返回更新的 UI 和新数据。

### 使用好处

- 说说使用 Server Actions 的好处:
  - 代码更简洁。
    - 你也不需要手动创建接口。
    - 而且 Server Actions 是函数, 这意味着它们可以在应用程序的 **任意位置中复用**。
  - 当结合 form 使用的时候, 支持 **渐进式增强**。
    - 也就是说, 即使禁用 JavaScript, 表单也可以正常提交。
    - 如果使用 Pages Router 下的监听事件的方式, 表单就无法正常工作了。
    - 但是 Server Actions 即使禁用 JS, 也可以正常工作。
    - 使用 Server Actions 禁用和不禁用 JS 的差别是:
      - 不禁用的时候提交表单, **页面不会刷新**。
      - 禁用的时候 **提交表单页面会刷新**。

> 这里的禁用指的是: 在浏览器的开发者工具中禁用 JavaScript。

### 注意要点

- 最后讲讲使用 Server Actions 的注意要点。
  - Server Actions 的 **参数** 和 **返回值** 都必须是可序列化的, 简单的说, JSON.stringfiy 这个值不出错。
  - Server Actions 会 **继承** 使用的 **页面** 或者 **布局** 的运行时和 **路由段配置项**, 包括像 maxDuration 等字段

### 支持事件

- 前面也说过:

> 而在具体使用上, 虽然 Server Actions 常与 `<form>` 一起使用, 但其实还可以在事件处理程序、useEffect、三方库、其他表单元素 (如 `<button>`) 中调用。

- 如果是在事件处理程序中, 该怎么使用呢？
- 我们为刚才的 ToDoList 增加一个 “添加运动” 的按钮。当点击的时候, 将运动添加到 TODO 中。
  - 修改 app/form2/page.js, 代码如下:

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

- 新建 app/form2/button.js, 代码如下:

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

- 修改 app/form2/actions.js, 添加代码:

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
- 通过 Button 组件, 我们可以看到, Server Actions 也可以在 **事件处理程序** 中使用。

### 总结 (上篇)

- 想必大家已经熟悉了 Server Actions 的基本用法。
- Server Actions 自 Next.js v14 起进入稳定阶段。
- 以后应该会是 Next.js 开发全栈项目时获取数据的主要方式, 一定要熟练掌握。

- 其实使用 Server Actions 还有很多细节, 比如:
  - 如何获取表单提交时的等待状态？
  - 服务端如何验证字段？
  - 如何进行乐观更新？
  - 如何进行错误处理？
  - 如何获取 Cookies、Headers 等数据？
  - 如何重定向？
  - ……
- 这些也都是开发中常遇到的问题, 接下来继续 Server Actions。

## 前言 (下篇)

- 上篇我们讲了 Server Actions 的基本用法, 本篇我们讲讲 Server Actions 的“标准”用法。
- 比如哪些 API 和库是常搭配 Server Actions 使用的？
- 写一个 Server Actions 要注意哪些地方？

- 我们还会介绍开发 Server Actions 时常遇到的一些问题, 比如:
  - 如何进行乐观更新？
  - 如何进行错误处理？
  - 如何获取 Cookies、Headers 等数据？
  - 如何重定向？
  - 等等

> 让我们开始吧。

### Form

- 我们先讲讲 Server Actions 处理 **表单提交时** 常搭配使用的一些 API。

#### 1. useFormStatus

- 有时候我们需要获取表单提交时的状态, 比如:
  - 表单是否正在提交
  - 表单提交失败
  - 表单提交成功
- useFormStatus, 这是 React 的官方 hook, 用于返回表单提交的状态信息。示例代码如下:

```jsx
'use client'
// app/submit-button.jsx
import { useFormStatus } from 'react-dom'
 
export function SubmitButton() {
  const { pending } = useFormStatus()
 
  return (
    <button type="submit" aria-disabled={pending}>
      {pending ? 'Adding' : 'Add'}
    </button>
  )
}
```

```jsx
// app/page.jsx
import { SubmitButton } from '@/app/submit-button'
 
export default async function Home() {
  return (
    <form action={...}>
      <input type="text" name="field-name" />
      <SubmitButton />
    </form>
  )
}
```

- 使用的时候要注意:
  - useFormStatus 必须用在 `<form>` 下的组件内部, 就像这段示例代码一样。
  - 先建立一个按钮组件, 在组件内部调用 useFormStatus, 然后 `<form>` 下引用该组件。
  - 不能完全写到一个组件中, 像这样写就是错误的:

```jsx
function Form() {
  // 🚩 `pending` will never be true
  // useFormStatus does not track the form rendered in this component
  const { pending } = useFormStatus();
  return <form action={submit}></form>;
}
```

#### 2. useFormState

- 然后是 useFormState, 这也是 React 官方 hook, 根据表单 action 的结果更新状态。

- 用在 React 时示例代码如下:

```jsx
import { useFormState } from "react-dom";

async function increment(previousState, formData) {
  return previousState + 1;
}

function StatefulForm({}) {
  const [state, formAction] = useFormState(increment, 0);
  return (
    <form>
      {state}
      <button formAction={formAction}>Increment</button>
    </form>
  )
}
```

- 用在 Next.js, 结合 Server Actions 时, 示例代码如下:

```jsx
'use client'

import { useFormState } from 'react-dom'

export default function Home() {

  async function createTodo(prevState, formData) {
    return prevState.concat(formData.get('todo'));
  }

  const [state, formAction] = useFormState(createTodo, [])

  return (
    <form action={formAction}>
      <input type="text" name="todo" />
      <button type="submit">Submit</button>
      <p>{state.join(',')}</p>
    </form>
  ) 
}
```

#### 3. 实战体会 (useFormStatus 和 useFormState)

- 现在让我们结合 useFormStatus 和 **useFormState**, 讲解使用 Server Actions 如何处理 form 提交。
- 涉及的目录和文件如下:

```bash
app                 
└─ form3           
   ├─ actions.js   
   ├─ form.js      
   └─ page.js            
```

- 其中 app/form3/page.js 代码如下:

```jsx
import { findToDos } from './actions';
import AddToDoForm from './form';

export default async function Page() {
  const todos = await findToDos();
  return (
    <>
      <AddToDoForm />
      <ul>
        {todos.map((todo, i) => <li key={i}>{todo}</li>)}
      </ul>
    </>
  )
}
```

- app/form3/form.js, 代码如下:

```jsx
'use client'
 
import { useFormState, useFormStatus } from 'react-dom'
import { createToDo } from './actions';

const initialState = {
  message: '',
}
 
function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button type="submit" aria-disabled={pending}>
      {pending ? 'Adding' : 'Add'}
    </button>
  )
}

export default function AddToDoForm() {
  const [state, formAction] = useFormState(createToDo, initialState)
 
  return (
    <form action={formAction}>
      <input type="text" name="todo" />
      <**SubmitButton** />
      <p aria-live="polite" className="sr-only">
        {state?.message}
      </p>
    </form>
  )
}
```

- app/form3/actions.js, 代码如下:

```jsx
'use server'

import { revalidatePath } from "next/cache";

const sleep = ms => new Promise(r => setTimeout(r, ms));

let data = ['阅读', '写作', '冥想']
 
export async function findToDos() {
  return data
}

export async function createToDo(prevState, formData) {
  await sleep(500)
  const todo = formData.get('todo')
  data.push(todo)
  revalidatePath("/form3");
  return {
    message: `add ${todo} success!`
  }
}
```

- 注意: 当使用 useFormState 的时候, 对应 Server Action 函数的参数, 第一个参数是 prevState, 第二个参数是 formData。
- 当使用 useFormStatus 的时候, 要写在 form 下的单独的组件中。
- 使用的时候, 注意这两点就行。
- 特别注意：现在使用 React.useActionState 一个 api，即可替换上面的 useFormState 和 useFormStatus。（是React 19 新增的）

### Server Actions 注意点

- 接下来讲讲写 Server Actions 有哪些注意要点。简单来说, 要注意:
  - 获取提交的数据
  - 表单验证
  - 重新验证数据
  - 错误处理

#### 1. 获取提交的数据

- 如果使用 form action 这种最基本的形式, Server Action 函数第一个参数就是 formData:

```jsx
export default function Page() {
  // 这就是 Server Actions 函数
  async function createInvoice(formData) {
    'use server'
 
    const rawFormData = {
      customerId: formData.get('customerId')
    }
 
    // mutate data
    // revalidate cache
  }
 
  return <form action={createInvoice}>...</form>
}
```

- 如果使用 form action + useFormState 这种形式:
  - Server Actions 函数第一个参数是 prevState, 第二个参数是 formData:

```jsx
'use client'

import { useFormState } from 'react-dom'

export default function Home() {

  // 这就是 Server Actions 函数
  async function createTodo(prevState, formData) {
    return prevState.concat(formData.get('todo'));
  }

  const [state, formAction] = useFormState(createTodo, [])

  return (
    <form action={formAction}>
      <input type="text" name="todo" />
      <button type="submit">Submit</button>
      <p>{state.join(',')}</p>
    </form>
  ) 
}
```

- 如果是 **直接调用**，那看 **调用** 的时候是怎么 **传入** 的，比如上篇举的 **事件调用的例子**：

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

```jsx
'use server'

export async function createToDoDirectly(value) {
  const form = new FormData()
  form.append("todo", value);
  return createToDo(form)
}
```

> 也就是所谓的无魔法，就是看 **调用** 的时候是怎么 **传入** 的，就是怎么 **接收** 的。

#### 2. 表单验证

- Next.js 推荐基本的表单验证使用 HTML 元素自带的验证如 required、type="email"等。
- 对于更高阶的服务端数据验证，可以使用 zod 这样的 schema 验证库来验证表单数据的结构：

```jsx
'use server'
 
import { z } from 'zod'
 
const schema = z.object({
  email: z.string({
    invalid_type_error: 'Invalid Email',
  }),
})
 
export default async function createsUser(formData) {
  const validatedFields = schema.safeParse({
    email: formData.get('email'),
  })
 
  // Return early if the form data is invalid
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }
 
  // Mutate data
}
```

#### 3. 重新验证数据

- Server Action 修改数据后，一定要注意重新验证数据，否则数据不会及时更新。

- 使用 revalidatePath 与 revalidateTag。

```jsx
revalidatePath('/posts')
revalidateTag('posts')
```

- 细节可跳转：
  - [revalidatePath](./revalidatePath.md)
  - [revalidateTag](./revalidateTag.md)

#### 4. 错误处理

- 一种是返回错误信息。
- 举个例子，当一个条目创建失败，返回错误信息：

```jsx
'use server'
// app/actions.js
export async function createTodo(prevState, formData) {
  try {
    await createItem(formData.get('todo'))
    return revalidatePath('/')
  } catch (e) {
    return { message: 'Failed to create' }
  }
}
```

- 在客户端组件中，读取这个值并显示错误信息：

```jsx
'use client'
// app/add-form.jsx
import { useFormState, useFormStatus } from 'react-dom'
import { createTodo } from '@/app/actions'
 
const initialState = {
  message: null,
}
 
function SubmitButton() {
  const { pending } = useFormStatus()
 
  return (
    <button type="submit" aria-disabled={pending}>
      Add
    </button>
  )
}
 
export function AddForm() {
  const [state, formAction] = useFormState(createTodo, initialState)
 
  return (
    <form action={formAction}>
      <label htmlFor="todo">Enter Task</label>
      <input type="text" id="todo" name="todo" required />
      <SubmitButton />
      <p aria-live="polite" className="sr-only">
        {state?.message}
      </p>
    </form>
  )
}
```

- 一种是抛出错误，会由最近的 error.js 捕获：

```jsx
'use client'
// error.js
export default function Error() {
  return (
    <h2>error</h2>
  )
}
```

```jsx
// page.js
import { useFormState } from 'react-dom'

function AddForm() {
  async function serverActionWithError() {
    'use server';   
    throw new Error(`This is error is in the Server Action`);
  }

  return (
    <form action={serverActionWithError}>
      <button type="submit">Submit</button>
    </form>
  ) 
}

export default AddForm
```

- 这样当 Server Action 发生错误的时候，就会展示错误 UI。

### 乐观更新

- 所谓乐观更新，举个例子:
  - 当用户点击一个点赞按钮的时候，传统的做法是等待接口返回成功时再更新 UI。
  - 乐观更新是先更新 UI，同时发送数据请求，至于数据请求后的错误处理，则根据自己的需要自定义实现。

- React 提供了 useOptimistic hook，这也是官方 hook，用法如下：

```jsx
'use client'

import { useOptimistic } from 'react'
import { useFormState } from 'react-dom'
import { createToDo } from './actions';

export default function Form({ todos }) {
  const [state, sendFormAction] = useFormState(createToDo, { message: '' })

  const [optimistiToDos, addOptimisticTodo] = useOptimistic(
    todos.map((i) => ({text: i})),
    (state, newTodo) => [
      ...state,
      {
        text: newTodo,
        sending: true
      }
    ]
  );

  async function formAction(formData) {
    addOptimisticTodo(formData.get("todo"));
    await sendFormAction(formData);
  }

  console.log(optimistiToDos)

  return (
    <>
      <form action={formAction}>
        <input type="text" name="todo" />
        <button type="submit"> Add </button>
        <p aria-live="polite" className="sr-only">
          {state?.message}
        </p>
      </form>
      <ul>
        {optimistiToDos.map(({text, sending}, i) => <li key={i}>{text}{!!sending && <small> (Sending...)</small>}</li>)}
      </ul>
    </>
  )
}

```

- 简单来说，就是不管成功不成功，前端先更新 UI，然后再发送请求。UI就自定义：比如发送中，发送成功，发送失败等。
  - 如：value (发送中...)
- 注：乐观更新是一种面向未来的 UI 更新方式。
  - 如何在接口错误的时候撤回数据？
  - 如果接口实在是太慢了，乐观更新的时候，用户要离开该怎么办？

### 常见问题

#### 1. 如何获取 Cookies、Headers 等数据？

- Server Actions 可以访问请求的 Headers 和 Cookies，示例代码如下：

```jsx
'use server'

export default async function createInvoice(formData, { headers, cookies }) {
  const token = headers.get('Authorization')
  const session = cookies.get('session')
}
```

- 或：

```jsx
'use server'
 
import { cookies } from 'next/headers'
 
export async function exampleAction() {
  // Get cookie
  const value = cookies().get('name')?.value
 
  // Set cookie
  cookies().set('name', 'Delba')
 
  // Delete cookie
  cookies().delete('name')
}
```

#### 2. 如何重定向？

```jsx
'use server'
 
import { redirect } from 'next/navigation'
import { revalidateTag } from 'next/cache'
 
export async function createPost(id) {
  try {
    // ...
  } catch (error) {
    // ...
  }
 
  revalidateTag('posts') // Update cached posts
  redirect(`/post/${id}`) // Navigate to the new post page
}
```

### 总结 (下篇)

- 本篇我们讲了 Server Actions 的“标准”用法。
- 以及写 Server Actions 有哪些注意要点。
- 最后讲了一些常见问题，比如如何获取 Cookies、Headers 等数据，如何重定向等。
- Server Actions 是 Next.js v14 起进入稳定阶段的 API，是 Next.js 开发全栈项目时获取数据的主要方式，一定要熟练掌握。
