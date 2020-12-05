# JavaScript 执行机制

## 执行 & 运行

- 首先我们需要声明下:
  - JavaScript 的 '执行' 和 '运行' 是 '两个不同概念' 的;
    - **执行**:
      - 一般依赖于环境:
        - 比如 node、浏览器、Ringo 等;
        - **JavaScript 在不同环境下的执行机制可能并不相同**;
          - 而今天我们要讨论的 Event Loop:
            - 就是 JavaScript 的一种 '执行方式';
    - **运行**:
      - 是指 JavaScript 的解析引擎。这是统一的;

## 关于 JavaScript

- 此篇文章中，这个小标题下，我们只需要牢记一句话:
  - **JavaScript 是单线程语言**;
    - 无论 HTML5 里面 Web-Worker;
    - 还是 node 里面的 cluster 都是“纸老虎”;
      - 而且 cluster 还是进程管理相关;
  - 这里读者注意区分：进程和线程。

---

- 既然 JavaScript 是单线程语言;
  - 那么就会存在一个问题:
    - 所有的代码都得一句一句的来执行;

## 概念梳理

- 在详解 '执行机制' 之前;
  - 先梳理一下 JavaScript 的一些基本概念;
    - 方便后面我们说到的时候大伙儿心里有个印象和大概的轮廓;

### 事件循环(Event Loop)

- 什么是 Event Loop？
  - 其实这个概念还是比较模糊的:
    - 因为他必须得 '结合着运行机制' 来解释;

---

- JavaScript 有一个主线程 main thread;
  - 和调用栈 call-stack 也称之为 '执行栈';
- 所有的任务都会:
  - 放到 '调用栈' 中:
    - 等待 '主线程来执行';

---

- JavaScript 的 Event Loop 是:
  - 伴随着整个源码文件生命周期的;
    - 只要当前 JavaScript 在运行中;
      - 内部的循环就会不断地循环下去:
        - 去寻找 queue 里面能执行的 task;

### 任务队列(task queue)

- task，就是任务的意思;
  - 我们这里理解为:
    - 每一个语句就是一个任务;

```js
console.log(1);
console.log(2);
```

- 如上语句，其实就是就可以理解为两个 task;
- 而 queue 呢，就是 FIFO 的队列;

---

- 所以 Task Queue 就是 '承载任务的队列';
- 而 JavaScript 的 Event Loop 就是会:
  - 不断地过来找这个 queue:
    - 问有没有 task 可以运行运行;(一次又一次的)

### 同步任务(SyncTask)、异步任务(AsyncTask)

- 同步任务说白了就是:
  - '主线程' 来执行的时候:
    - '立即就能执行' 的代码，比如:

```js
console.log("this is THE LAST TIME");
console.log("Nealyang");
```

- 代码在执行到上述 console 的时候，就会立即在控制台上打印相应结果;

---

- 而所谓的 '异步任务' 就是:
  - 主线程执行到这个 task 的时候:
    - “唉！你等会，我现在先不执行，等我 xxx 完了以后我再来等你执行” 注意上述我说的是 '等你来执行';
- 说白了, 异步任务就是:
  - 你先去执行别的 task;
  - 等我这 xxx 完之后:
    - 再往 Task Queue 里面:
      - 塞一个 task 的 '同步任务':
        - 来等待被执行;

```js
setTimeout(() => {
  console.log(2);
});
console.log(1);
```

- 如上述代码，setTimeout 就是一个异步任务;
  - 主线程去执行的时候遇到 setTimeout 发现是一个异步任务;
    - 就 '先注册了' 一个异步的 '回调';
      - 然后接着执行下面的语句 console.log(1);
        - 等上面的 '异步任务等待的时间' 到了以后;
          - 在执行 console.log(2);

---

- **事件循环(Event Loop)**:
  - 主线程自上而下执行所有代码;
  - 同步任务直接进入到主线程被执行;
    - 而异步任务则进入到 Event Table:
      - 注册相对应的回调函数;
  - 异步任务完成后:
    - Event Table 会将这个函数移入 Event Queue;
  - 主线程任务执行完了以后:
    - 会从 Event Queue 中读取任务;
      - 进入到主线程去执行;
  - 循环如上;

> 上述动作不断循环，就是我们所说的事件循环(Event Loop);

#### 小试牛刀

```js
// ajax是异步请求
ajax({
  url: www.Nealyang.com,
  data: prams,
  success: () => {
    console.log("请求成功!");
  },
  error: () => {
    console.log("请求失败~");
  },
});

console.log("这是一个同步任务");
```

- **ajax 请求首先进入到 Event Table**:
  - 分别注册了 onError 和 onSuccess 回调函数;
- **主线程执行同步任务**:
  - console.log('这是一个同步任务');
- **主线程任务执行完毕**;
  - 看 Event Queue 是否有:
    - 待执行的 task,这里是不断地检查;
      - 只要主线程的 task queue 没有任务执行了:
        - 主线程就一直在这等着;
- **ajax 执行完毕**;
  - 将回调函数 push 到 Event Queue;（步骤 3、4 没有先后顺序而言）
- **主线程“终于”等到**:
  - Event Queue 里有 task 可以执行了:
    - 执行对应的回调任务;
- **如此往复**;

### 宏任务(MacroTask)、微任务(MicroTask)

- ..