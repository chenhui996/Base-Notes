# 事件循环（Event Loop）

- JavaScript 是单线程语言，**事件循环** 是其 **处理异步任务** 的 **核心机制**。

- 它通过协调：
  - **调用栈（Call Stack）**
  - **任务队列（Task Queues）**
  - **浏览器/Node.js 的API**
- 实现 **非阻塞的异步执行**。

- 以下是核心流程：

## 调用栈（Call Stack）

- **同步代码** 按顺序执行，**函数调用** 形成栈帧。
- 当遇到 **异步操作（如 setTimeout、Promise、fetch）**，交给 Web API 处理，主线程继续执行后续代码。

## 任务队列（Task Queues）

- **宏任务队列（Macrotask Queue）**：包括 setTimeout、setInterval、DOM 事件回调、I/O 操作等。
- **微任务队列（Microtask Queue）**：包括 Promise.then、MutationObserver、process.nextTick（Node.js）。

## 事件循环的步骤

- 执行当前调用栈中的所有同步代码。
- 调用栈清空后，处理微任务队列中的所有任务（直到队列为空）。
- 执行一次宏任务队列中的第一个任务。
- 可能触发浏览器渲染（如重绘、回流）。
- 重复循环。

---

## 10 道 Event Loop 面试题

### 1. 基础题：代码执行顺序

```js
console.log('1')
setTimeout(() => console.log('2'), 0)
Promise.resolve()
  .then(() => console.log('3'))
  .then(() => console.log('4'))
  .then(() => console.log('5'))
  .then(() => console.log('6'))
  .then(() => console.log('7'))
console.log('8')
```

- **答案**：1 -> 8 > 3 -> 4 -> 5 -> 6 -> 7 -> 2
- **考察点**：微任务（Promise）优先于宏任务（setTimeout）。

### 2. 嵌套 Promise 和 setTimeout

```js
setTimeout(() => console.log("A"), 0);
Promise.resolve()
  .then(() => {
    console.log("B");
    setTimeout(() => console.log("C"), 0);
  });
console.log("D");
```

- **答案**：D -> B -> A -> C
- **考察点**：微任务中的代码会立即执行，内部的 setTimeout 进入下一轮宏任务队列。

### 3. 微任务与宏任务的优先级

```js
setTimeout(() => console.log("timeout"));
Promise.resolve().then(() => console.log("promise"));
queueMicrotask(() => console.log("microtask"));
```

- **答案**：promise -> microtask -> timeout
- **考察点**：queueMicrotask 和 Promise.then 同属微任务，按代码顺序执行。

### 4. 多层嵌套的宏任务与微任务

```js
setTimeout(() => console.log("1"));
Promise.resolve()
  .then(() => {
    setTimeout(() => console.log("2"));
    Promise.resolve().then(() => console.log("3"));
  });
```

- **答案**：3 → 1 → 2
- **考察点**：外层微任务中的代码（包括新的宏任务和微任务）执行顺序。

### 5. async/await 的执行顺序

```js
async function foo() {
  console.log("A");
  await Promise.resolve(); // JavaScript 立即 暂停执行 foo()，并将后续代码放入微任务队列（Microtask Queue）。
  console.log("B");
}
foo();
console.log("C");
```

- **答案**：A → C → B
- **考察点**：await 之后的代码相当于 Promise.then，属于微任务。

### 6. 浏览器渲染与事件循环

```js
setTimeout(() => console.log("A"), 0);
requestAnimationFrame(() => console.log("B"));
Promise.resolve().then(() => console.log("C"));
```

- **答案**：C → B → A（假设浏览器在微任务后执行 requestAnimationFrame）
- **考察点**：requestAnimationFrame 在渲染前执行，但不同浏览器可能有差异。

### 7. Node.js 与浏览器的差异

```js
setTimeout(() => console.log("A"), 0);
setImmediate(() => console.log("B"));
```

- **答案**：可能输出 A → B 或 B → A，取决于 **事件循环初始化** 的耗时。
- **考察点**：Node.js 中 setTimeout(fn, 0) 和 setImmediate 的执行顺序不确定性。

### 8. 递归微任务是否会阻塞？

```js
function loop() {
  Promise.resolve().then(loop);
}
loop();
setTimeout(() => console.log("Hi"), 100);
```

- **答案**：Hi 永远不会输出，因为微任务队列被无限递归填充，阻塞后续宏任务。
- **考察点**：微任务队列 **需清空** 后才处理宏任务。

### 9. DOM 事件与微任务

```js
button.addEventListener("click", () => {
  Promise.resolve().then(() => console.log("A"));
  console.log("B");
});
// 用户点击按钮后输出顺序？
```

- **答案**：B → A
- **考察点**：DOM 事件回调属于宏任务，内部的微任务在回调执行后立即处理。

### 10. Node.js 的 process.nextTick

```js
Promise.resolve().then(() => console.log("A"));
process.nextTick(() => console.log("B"));
```

- **答案**：Node.js 环境）：B → A
- **考察点**：process.nextTick 优先级高于 Promise.then。

### 总结

- 事件循环的面试重点：
  - 微任务（Microtask）优先于宏任务（Macrotask）。
  - 调用栈清空后，先处理所有微任务，再执行一个宏任务。
  - 浏览器与 Node.js 的差异（如 setImmediate、process.nextTick）。
  - 代码执行顺序的逻辑推导能力。
