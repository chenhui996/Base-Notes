# 在 nextjs 中，讨论一下 Streaming

## 1. 什么是 Streaming

- Streaming 是一种数据传输方式，它允许：
  - 客户端在接 **收到数据的同时** 进行处理，而 **不需要等待所有数据传输完毕**。
- 在 Next.js 中，Streaming 是指：
  - **在服务端渲染时：**
    - 将数据 **流式传输到客户端**，而不是等待所有数据生成完毕后再传输。

## 2. Streaming 的优势

- Streaming 的优势：
  - **更快的首屏渲染速度：**
    - 客户端可以在接收到数据的同时进行处理，而不需要等待所有数据传输完毕。
  - **更低的内存占用：**
    - 服务端可以在生成数据时，将数据流式传输到客户端，而不需要等待所有数据生成完毕后再传输。

## 3. Streaming 的实现

- 在 Next.js 中，Streaming 的实现方式：
  - 使用 `react-stream-render` 库：
    - 该库可以将数据流式传输到客户端。

```js
import { streamRender } from 'react-stream-render';

export default streamRender(
  async (req, res) => {
    const data = await fetchData();
    return <Page data={data} />;
  }
);
```

## 4. Streaming 的注意事项

- 在使用 Streaming 时，需要注意：
  - **不要在组件中使用 `useState` 等 Hook：**
    - 因为 Hook 会在组件渲染时执行，而 Streaming 是在数据生成时执行。
  - **不要在组件中使用 `useEffect` 等 Hook：**
    - 因为 Hook 会在组件渲染时执行，而 Streaming 是在数据生成时执行。

## 5. Streaming 的适用场景

- Streaming 适用于：
  - **数据量较大的页面：**
    - Streaming 可以在数据生成时，将数据流式传输到客户端，而不需要等待所有数据生成完毕后再传输。
  - **需要更快的首屏渲染速度的页面：**
    - Streaming 可以在接收到数据的同时进行处理，而不需要等待所有数据传输完毕。

## 6. 总结

- Streaming 是一种数据传输方式，它允许客户端在接收到数据的同时进行处理，而不需要等待所有数据传输完毕。
- 在 Next.js 中，Streaming 是指将数据流式传输到客户端。
- Streaming 的优势是更快的首屏渲染速度和更低的内存占用。
- 在使用 Streaming 时，需要注意不要在组件中使用 `useState` 等 Hook。
- Streaming 适用于数据量较大的页面和需要更快的首屏渲染速度的页面。

---

## 面试：直接使用底层的 Web API 实现一个完整的 Streaming 例子

- 直接使用底层的 Web API 实现 Streaming：

```js
// app/api/route.js
// https://developer.mozilla.org/docs/Web/API/ReadableStream#convert_async_iterator_to_stream
function iteratorToStream(iterator) {
  return new ReadableStream({
    async pull(controller) {
      const { value, done } = await iterator.next()
 
      if (done) {
        controller.close()
      } else {
        controller.enqueue(value)
      }
    },
  })
}
 
function sleep(time) {
  return new Promise((resolve) => {
    setTimeout(resolve, time)
  })
}
 
const encoder = new TextEncoder() // 创建一个文本编码器
 
async function* makeIterator() {
  yield encoder.encode('<p>One</p>')
  await sleep(200)
  yield encoder.encode('<p>Two</p>')
  await sleep(200)
  yield encoder.encode('<p>Three</p>')
}
 
export async function GET() {
  const iterator = makeIterator()
  const stream = iteratorToStream(iterator)
 
  return new Response(stream)
}
```

- 客户端调用：

```js
// 客户端代码，假设API路由的URL是'/api/route'
async function fetchStream() {
  const response = await fetch('/api/route');
  
  // 检查响应是否成功
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  // 获取流的读取器
  const reader = response.body.getReader();

  // 异步读取流中的数据
  async function readStream() {
    let done = false;
    while (!done) {
      const { value, done: streamDone } = await reader.read();
      if (streamDone) {
        done = true;
        console.log('Stream closed.');
      } else {
        // 处理读取到的数据块，这里假设数据是Uint8Array类型
        const textDecoder = new TextDecoder(); // 创建一个文本解码器
        const text = textDecoder.decode(value);
        console.log(text); // 输出: <p>One</p>，然后<p>Two</p>，最后<p>Three</p>
      }
    }
  }

  // 开始读取流
  readStream();
}

// 调用函数来发起请求并处理响应
fetchStream();
```

> 核心：获取流的读取器 -> const reader = response.body.getReader();
