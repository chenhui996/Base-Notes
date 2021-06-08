# JS 异步进阶

## 问答题

### 请描述 event loop（事件循环/事件轮询）的机制，可画图

#### 铺垫

- JS 是单线程运行的。
- 异步要基于回调来实现。
- event loop 就是异步回调的实现原理。
- 先吧 '同步代码' 执行完，再执行 '异步'。

#### JS 是如何执行的？

- 从前到后，一行一行执行。
- 如果某一行执行报错，则停止下面代码的执行。

### 总结 event loop 过程

- 同步代码，一行一行放在 Call Stack 执行。
- 遇到异步，会先 '记录' 下，等待时机（定时、网络请求等）。
- 时机到了，就移动到 Callback Queue。
- 如 Call Stack 为空（即同步代码执行完）：
  - 会先尝试 DOM 渲染。
  - 再触发 Event Loop。（轮询）
- 轮询查找 Callback Queue：
  - 如有则移动到 Call Stack 执行。
  - 然后当 Call Stack 内的任务执行完了：
    - 它又会触发 尝试 DOM 渲染。
      - 再触发 Event Loop。（轮询）。
- 然后继续轮询查找（永动机一样）。

### DOM 事件和 event loop

- 由于 JS 是单线程的。
  - 异步（setTimeout，ajax 等）使用回调，基于 event loop。
  - DOM 事件也使用回调，也基于 event loop。

### Promise 有哪三种状态？如何变化？

- 三种状态
  - pending
  - resolve
  - rejected

> pending -> resolved 或 pending -> rejected
>
> > 变化不可逆

### 各状态

```js
const p1 = new Promise((resolve, reject) => {});

console.log("p1", p1); // p1 Promise {<pending>}

const p2 = Promise.resolve(); // 直接返回一个状态是 resolved 的 Promise。()里面的东西会传给 then
```

- 状态的表现和变化
  - 表现:
    - pending 状态，不会触发 then 和 catch。
    - resolved 状态，会触发后续的 then 回调函数。
    - reject 状态，会触发后续的 catch 回调函数。

### then 和 catch 对状态的影响

- then 正常返回 resolved，里面有报错则返回 rejected。
- catch 正常返回 resolved，里面有报错则返回 rejected。

```js
// catch 正常返回 resolved，里面有报错则返回 rejected。
const p3 = Promise.reject().catch((err) => {
  console.err("err", err); // resolved, 因为catch函数内，并没有报错语句
});

const p4 = Promise.reject().catch((err) => {
  throw new Error(" catch err "); // rejected
});
```

> 而且记住，只要 catch 返回的 Promise 状态为 resolved，那么后续还可以继续用 then，而且 then 也能被触发。

### promise 和 setTimeout 的顺序

- Promise 是微任务，setTimeout 是宏任务
- 在同一个大的宏任务中:
  - 微任务先执行，宏任务后执行，所以：
    - Promise 先执行
    - setTimeout 后执行

```js
// Promise 是微任务，setTimeout是宏任务
console.log(100);
setTimeout(() => {
  console.log(200);
});
Promise.resolve().then(() => {
  console.log(300);
});
console.log(400);

// 100 400 300 200
```

## Promise 总结

- 三种状态，状态的表现和变化。
- then 和 catch 对状态的影响（重要）。
- then 和 catch 的链式调用（常考）。

---

## async / await

- 异步回调 callback hell。
- Promise then catch 链式调用，但也还是基于回调函数。
- async/await 是同步语法，彻底消灭回调函数。

```js
// 基础 Promise 的定义
function loadImg(src) {
  return new Promise((resolve, reject) => {
    const img = document.createElement("img");
    img.onload = () => {
      resolve(img);
    };
    img.onerror = () => {
      reject(new Error(`图片加载失败 ${src}`));
    };
    img.src = src;
  });
}

const src1 = "./as1.jpg";
const src2 = "./as2.jpg";

!(async function () {
  // 同步的写法

  // img1
  const img1 = await loadImg(src1); // loadImg() 为 Promise 对象
  console.log(img1.height, img1.width);

  // img2
  const img2 = await loadImg(src2);
  console.log(img2.height, img2.width);
})();
```

### async/await 和 Promise 的关系

- async/await 是消灭异步回调的终极武器。
- 但和 Promise 并不互斥。
  - 一开始，还没有 Promise，异步全用回调来解决。
    - Promise 除了后，用起了链式调用。
      - async/awiat 出了后，让我们能用 '同步的方法' 进行异步操作。
- 反而，两者相铺相成。
  - 执行 async 函数，返回的 '一定且总是' 是 Promise 对象。
  - await 相当于 Promise 的 then。
  - try...catch 可捕获异常，代替了 Promise 的 catch。

```js
// 执行 async 函数，返回的 '一定且总是' 是 Promise 对象。
async function fn1() {
  return 100; // 相当于 return Promise.resolved(100)。
}

const res1 = fn1(); // 执行 async 函数，返回的是一个 Promise 对象。
console.log("res1", res1); // Promise 对象

// 因为是 res1 是 Promise 对象，所以还可以继续进行链式调用
res1.then((data) => {
  console.log("data", data); // 100
});
```

```js
// await 相当于 Promise 的 then。
!(async function () {
  const p1 = Promise.resolve(300);
  const data = await p1; // await 相当于 Promise then
  console.log("data", data); // 300
})();

!(async function () {
  const data1 = await 400; // 相当于 await Promise.resolve(400)
  console.log("data1", data1); // 400
})();
```

```js
// try...catch 可捕获异常，代替了 Promise 的 catch。
!(async function () {
  const p4 = Promise.reject("err1");
  try {
    const res = await p4;
    console.log("res", res);
  } catch (ex) {
    console.error(ex); // try...catch 相当于 promise catch
  }
})();
```

---

## 异步的本质

- async/await 是消灭异步回调的终极武器。
  - 但 js 还是单线程，还的是有异步，还得是基于 event loop。
    - 所以说，async/await 只是语法糖，但这颗糖真香。

> await 执行完本行。之后的代码，都会被作为异步回调的一个整体，放入异步队列，等待同步队列完成后触发执行。

```js
async function async1() {
  console.log("async1 start"); // 2
  await async2();
  console.log("async1 end"); // 5
  await async3();
  console.log("async1 end2"); //7
}
async function async2() {
  console.log("async2"); // 3
}
async function async3() {
  console.log("async3"); // 6
}

console.log("script start"); // 1
async1();
console.log("script end"); // 4

// script start
// async1 start
// async2
// script end
// async1 end
// async3
// async1 end2
```

---

## for...of

- for...in (以及 forEach for) 是常规的同步遍历。
- for...of 常用于 '异步' 的遍历.

```js
// ...

!(async function () {
  for (let i of nums) {
    const res = await muti(i);
    console.log(res);
  }
})();
// 会一个一个打印，不像同步循环，一下子打印。
```

## async/await 总结

- async/await 解决了异步回调，是一个很香的语法糖。
- async/await 和 Promise 的关系，重要。
- for...of 的使用。

---

## 什么是宏任务和微任务，两者有什么区别？

- 宏任务（macroTask）
  - setTimeout, setInterval, Ajax, DOM 事件。
- 微任务（microTask）
  - Promise async/await

> '微任务' 执行时机比 '宏任务' 要早。

```js
console.log(100);
// 宏任务
setTimeout(() => {
  console.log(200);
});
// 微任务
Promise.resolve().then(() => {
  console.log(300);
});
console.log(400);

// 100 400 300 200
```

## event loop 和 DOM 渲染

- 回顾一遍 event loop 的过程。
  - 且 JS 是单线程的，而且和 DOM 渲染共用一个线程。
    - 所以 JS 执行的时候，得留一些时机供 DOM 渲染。

### 回顾 Event Loop

- 同步代码，一行一行放在 Call Stack 执行。
- 遇到异步，会先 '记录' 下，等待时机（定时、网络请求等）。
- 时机到了，就移动到 Callback Queue。
- 如 Call Stack 为空（即同步代码执行完）：
  - 会先尝试 DOM 渲染。（在尝试 DOM 渲染之前，会先看微任务进程(micro task queue)是否有微任务，有就先执行微任务，然后再尝试 DOM 渲染）
  - 再触发 Event Loop。（轮询）
- 轮询查找 Callback Queue：
  - 如有则移动到 Call Stack 执行。
  - 然后当 Call Stack 内的任务执行完了：
    - 它又会触发 尝试 DOM 渲染。
      - 再触发 Event Loop。（轮询）。
- 然后继续轮询查找（永动机一样）。

### 微任务和宏任务的区别

- 宏任务：
  - DOM 渲染后触发，如 setTimeout。
- 微任务：
  - DOM 渲染前触发，如 Promise。

### 从 event loop 解释，为何微任务执行更早？

- 微任务是 ES6 语法规定的。
- 宏任务是由浏览器规定的。

#### 进一步总结精炼

- 1.Call Stack 清空。
- 2.执行当前的微任务。(当前 micro task queue 中的所有微任务)
- 3.尝试 DOM 渲染。
- 4.触发 Event Loop。(将 Callback Queue 中满足触发条件的的异步宏任务，推入 Call Stack 执行，然后开启下一循环)

> 本质：异步的 '微任务' 和 '宏任务'，存放的地方不一样。为什么不一样？
>
> > 微任务是 ES6 语法规定的。
> > 宏任务是由浏览器规定的。
