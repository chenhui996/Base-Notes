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
        - 无论HTML5 里面 Web-Worker;
        - 还是 node 里面的cluster都是“纸老虎”;
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

- ..
