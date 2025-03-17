# promise

## 核心概念

- **promise 状态**：
  - `pending`（进行中） -> `fulfilled`（已成功）或 `rejected`（已失败）。
  - 状态，一旦变更，不可逆🙅。
- **链式调用**：
  - `.then()`、`.catch()`、`.finally()` 返回新的 primose，支持链式操作。
- **微任务（microtask）**：
  - promise 回调属于 **微任务**，优先于 **宏任务** 执行。
- **错误冒泡**：
  - 链式调用中，未捕获的错误，会一直传递到，最近的 `.catch()`。
- **静态方法**：
  - `Promise.all`
  - `Promise.race`
  - `Promise.allSettled`
  - `Promise.any`

---

## 面试题（基础类）

### 1. 以下代码输出的顺序是什么？

```js
console.log('1');
Promise.resolve().then(() => console.log('2'));
setTimeout(() => console.log('3'), 0);
console.log('4');
```

- 回答：'1' -> '4' -> '2' -> '3'
- 解析：略

### 2. 如何让一个 promise 在 1 秒后拒绝？

```js
new Promise((resolve, reject) => {
    setTimeout(() => reject('Timeout'), 1000)
})
```

- **关键点**：利用`setTimeout` 延迟触发 `reject`。

---

## 面试题（链式调用与错误处理）

### 3. 以下代码的输出是什么？

```js
Promise.reject('error')
  .then(() => console.log('then1'))
  .catch((err) => console.log('catch1:', err))
  .then(() => console.log('then2'));
```

- **答案**：`catch1: error → then2`
- **解析**：
  - `reject` 触发 `.catch()`，之后继续执行后续 `.then()`。
  - `.catch()` 返回的 Promise 默认是 `fulfilled`，除非内部抛出错误。

### 4. 如何中断 Promise 链？

```js
Promise.resolve()
    .then(() => {
        console.log('step 1');
        return new Promise(() => {}); // 返回一个 pending 的 Promise
    })
    .then(() => console.log('step 2')); // 永远不会执行
```

- **关键点**：返回一个永远处于 `pending` 的 Promise，后续链式调用被阻塞。

---

## 面试题（并发控制与静态方法）

### 5. `Promise.all` 和 `Promise.allSettled` 的区别？

- **答案**：
  - `Promise.all`：
    - 所有 Promise 成功时返回 **结果数组**。
    - 任一失败，立即拒绝，返回第一个错误。
  - `Promise.allSettled`：
    - 等待所有 Promise 完成（无论成功/失败），返回结果对象数组。
    - 适合需要知道每个 Promise 最终状态的场景。

### 6. 实现一个带并发限制的 Promise 调度器，最多同时执行 2 个任务

```js
class  Scheduler(){
    constructor(max){
        this.max = max;
        this.queue = [];
        this,running = 0;
    }

    add(promiseCreator){
        return new Promise((resolve) => {
            this.queue.push(() => promiseCreator().then(resolve)) // 同步
            this.run(); // 同步
        })
    }

    run(){
        while(this.running < this.max && this.queue.length){
            const task = this.queue.shift();
            task().finally(() => {
                this.running--;
                this.run();
            });
            this.running++;
        }
    }
}

// 使用示例
const scheduler = new Scheduler(2);
const timeout = (time) => {
    return new Promise(resolve => setTimeout(resolve, time));
}

scheduler.add(() => timeout(1000).then(() => console.log(1))); // 1s 后输出 1
scheduler.add(() => timeout(500).then(() => console.log(2)));  // 0.5s 后输出 2
scheduler.add(() => timeout(300).then(() => console.log(3)));  // 0.8s 后输出 3

// 输出顺序：2 -> 3 -> 1
```

- **解析**：通过 **队列** 和 **计数器** 控制并发，确保最多同时执行指定数量的任务。
- **要点**：
  - `.then()` 执行完后若没有返回值，默认将 resolve。
  - `new Promise((resolve) => { ... })` 的构造函数，是同步执行的，而非像普通函数一样需要调用

> 看 primose 问题，主要关注 resolve 跟 reject，只有这两个能改变 Promise 的状态，才能决定是否往后执行，要理解本质。

### 7. 手写 `Promise.all`

```js
Promise.myall = function(promises){
    return new Promise((resolve, reject) => {
        const results = [];
        let count = 0;

        promises.forEach((promise, index) => {
            Promise.resolve(promise)
                .then((res) => {
                    results[index] = res;
                    count++;
                    if(count === promises.length){
                        resolve(results)
                    }
                })
                .catch(reject);
        })
    })
}
```

### 手写 8.Promise.race

```js
Promise.myRace = (promises) => {
    return new Promise(resolve, reject) => {
        promises.forEach((promise) => {
            Promise.resolve(promise).then(resolve).catch(reject)
        })
    }
}
```

- **解析**：第一个完成的 Promise（无论成功/失败）触发外层 Promise。

---

## 面试题（陷阱与进阶）

### 9：以下代码的输出顺序是什么？

```js
Promise.resolve()
  .then(() => {
    console.log('then1');
    Promise.resolve().then(() => console.log('then1-1'));
  })
  .then(() => console.log('then2'));

Promise.resolve()
  .then(() => console.log('then3'));

```

- **答案**：then1 → then3 → then1-1 → then2
- **解析**：
  - 外层 then1 触发后，其回调中的微任务（then1-1）加入队列。
  - 外层第二个 then3 先于 then1-1 执行。
  - 每个 .then() 生成一个新的微任务。

> 注意每个 then 加入微任务队列的顺序

### 10. 如何取消一个正在进行的 Fetch 请求？

```js
const controller = new AbortController();
const signal = controller.signal;

fetch(url, { signal })
  .then(response => response.json())
  .catch(err => {
    if (err.name === 'AbortError') console.log('Request aborted');
  });

// 取消请求
controller.abort();
```

- **关键点**：使用 `AbortController` 和 `AbortSignal` 中断请求。

### 11. 如何时先 Promise 的重试机制（失败后最多重试三次）？

```js
function retry(promiseCreator, retries = 3){
    return new Promise((resolve, reject) => {
        const tryAagin = () => {
            promiseCreator()
                .then(resolve)
                .catch(err => {
                    if(retries === 0) reject(err);
                    retries--;
                    tryAagin();
            })
        }

        tryAagin();
    })
}
```

- **解析**：
  - **递归重试**：每次失败后递归调用 `attempt()`，直到重试次数用尽。
  - **错误处理**：重试次数用尽后，拒绝外层 Promise，也就是执行 reject()。

> 感悟：处理 promise 问题，要时刻盯着 “对外的 Promise，何时 resolve 或 reject。
> 说白了再难的 promise 题目，玩的 就是 resolve、reject。”

### 12. 解释 `Promise.resolve()` 的几种传惨情况（非 Promise、thenable 对象、Promise）

- **非 Promise 值**：转换为 `fulfilled` 的 Promise。直接往后执行。
  - 示例代码：

```js
Promise.resolve(42).then(val => console.log(val)); // 输出 42
```

- **Thenable 对象**：调用其 `then` 方法，转换为 Promise。
  - 示例代码：

```js
Promise.resolve({
    then: (resolve) => resolve(3)
}).then(val => console.log(val)); // 输出3
```

- **Promise 对象**：直接返回原 Promise。
  - 示例代码：

```js
const p = new Promise(resolve => resolve('A'));
Promise.resolve(p).then(val => console.log(val)); // 输出 'A'
```

### 13. 如何让 async/await 与 Promise 结合实现休眠（sleep）功能？

```js
funcion sleep(time){
    return new Promise(resolve => setTimeout(resolve, time));
}

async function demo(){
    console.log('start');
    await sleep(1000); // 休眠 1s
    console.log('end');
}

demo();
```

- **解析**：
  - **sleep 函数**：返回一个 Promise，在指定时间后 resolve。
  - **async/await**：通过 await 暂停函数执行，直到 Promise 完成。

### 14. 解释 Promise 构造函数中的 resolve 和 reject 是否必须调用？

- **答案**：
  - **非必须**：如果不调用 resolve 或 reject，Promise 将永远处于 pending 状态。
  - **潜在问题**：未完成的 Promise 可能导致 **内存泄漏** 或 **逻辑错误**。

### 15. 如何避免 Promise 地狱（回调金字塔）？

- **答案**：
  - 使用 async/await
  - 链式调用

### 16. Promise.finally() 与 .then() 的区别是什么？

- **答案**：
  - `finally()`：无论 Promise 成功或失败，都会执行。不接受参数。
  - `then()`：仅在 Promise 成功时执行，接收返回值。

### 17. 如何检测一个对象是否是 Promise？

```js
function isPromise(obj){
    return obj && typeof obj.then === 'function';
}

console.log(isPromise(Promise.resolve())); // true
console.log(isPromise({})); // false
```

- **解析**：
  - **判断依据**：Promise 对象必须包含 then 方法。

### 18. 解释 Promise 的 unhandledrejection 事件及其应用场景

- **答案**：
  - **事件作用**：捕获未处理的 Promise 拒绝（reject）。
  - **应用场景**：全局错误监控。

```js
window.addEventListener('unhandledrejection', event => {
  console.error('未处理的拒绝:', event.reason);
});

Promise.reject('错误');
```
