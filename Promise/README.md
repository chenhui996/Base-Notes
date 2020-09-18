# Promise 之你看得懂的 Promise

## Promise 源码详解

### 回调地狱

- 曾几何时，我们的代码是这样的:
  - 为了拿到回调的结果;
  - 不得不 callback hell;
- 这种环环相扣的代码可以说是相当恶心了;

```js
let fs = require("fs");
fs.readFile("./a.txt", "utf8", function (err, data) {
  fs.readFile(data, "utf8", function (err, data) {
    fs.readFile(data, "utf8", function (err, data) {
      console.log(data);
    });
  });
});
```

- 话不多说，Promise 救场:

```js
let fs = require("fs");
function read(url) {
  return new Promise((resolve, reject) => {
    fs.readFile(url, "utf8", function (err, data) {
      error && reject(error);
      resolve(data);
    });
  });
}

read("./a.txt")
  .then((data) => {
    return read(data);
  })
  .then((data) => {
    return read(data);
  })
  .then((data) => {
    console.log(data);
  });
```

- 如上所示:
  - 真的是很方便;

---

### 重点开始，小眼睛都看过来

#### Promise/A+

- 首先我们要知道自己手写一个 Promise;
  - 应该怎么去写;
  - 谁来告诉我们怎么写;
  - 需要遵循什么样的规则;
- 当然这些你都不用担心;
  - 其实业界都是通过一个'规则指标'来生产 Promise 的;
    - Promise/A+;

#### constructor

- 我们先声明一个类，叫做 Promise
  - 里面是构造函数;

```js
class Promise {
  constructor(executor) {
    // 控制状态，使用了一次之后，接下来的都不被使用
    this.status = "pendding";
    this.value = undefined;
    this.reason = undefined;

    // 定义resolve函数
    let resolve = (data) => {
      if (this.status === "pendding") {
        this.status = "resolve";
        this.value = data;
      }
    };

    // 定义reject函数
    let reject = (data) => {
      if (this.status === "pendding") {
        this.status = "reject";
        this.reason = data;
      }
    };

    // executor方法可能会抛出异常，需要捕获
    try {
      // 将resolve和reject函数给使用者
      executor(resolve, reject);
    } catch (e) {
      // 如果在函数中抛出异常则将它注入reject中
      reject(e);
    }
  }
}
```

- 那么接下来我会分析上面代码的作用，原理:
  - executor:
    - 这是实例 Promise 对象时在构造器中传入的参数;
    - 一般是一个 function(resolve,reject){};
  - status:
    - ``Promise 的状态:
      - 一开始是默认的 pendding 状态;
      - 每当调用到 resolve 和 reject 方法时:
        - 就会改变其值，在后面的 then 方法中会用到;
  - value:
    - resolve 回调成功后:
      - 调用 resolve 方法里面的参数值;
  - reason:
    - reject 回调成功后:
      - 调用 reject 方法里面的参数值;
  - resolve:
    - 声明 resolve 方法在构造器内:
      - 通过传入的 executor 方法传入其中;
      - 用以给使用者回调;
  - reject:
    - 声明 reject 方法在构造器内:
      - 通过传入的 executor 方法传入其中;
      - 用以给使用者回调;

#### then

- then 方法是 Promise 中最为重要的方法;
- 他的用法大家都应该已经知道:
  - 就是将 Promise 中的 resolve 或者 reject 的结果拿到;
- 那么我们就能知道这里的 then 方法需要两个参数:
  - 成功回调
  - 失败回调

```js
then((onFufilled, onRejected) => {
  if (this.status === "reslove") {
    onFufilled(this.value);
  }
  if (this.status === "reject") {
    onRejected(this.reason);
  }
});
```

- 这里主要做了将构造器中:
  - resolve 和 reject 的结果:
    - 传入 onFufilled 和 onRejected 中;
- 注意这两个是使用者传入的参数 ———— 是个方法;
  - 要想更 Swag 的应对各种场景，我们必须得再完善;

### 异步的 Promise

- 之前我们只是处理了同步情况下的 Promise;
  - 简而言之所有操作都没有异步的成分在内;
- 么如果是异步该怎么办？

#### callback！！！！

- 最早处理异步的方法就是 callback;
- 就相当于我让你帮我扫地:
  - 我会在给你发起任务时给你一个手机;
  - 之后我做自己的事情去;
  - 不用等你;
  - 等你扫完地就会打手机给我;
  - 我就知道了地扫完了;
- 这个手机就是 callback，回调函数;

---

- 首先我们需要改一下构造器里的代码;
  - 分别添加'两个回调函数'的数组;
    - 分别对应'成功回调'和'失败回调';
  - 他们的作用是:
    - 当成功执行 resolve 或 reject 时;
      - 执行 callback;

```js
//存放成功回调的函数
this.onResolvedCallbacks = []
//存放失败回调的函数
this.onRejectedCallbacks = []

let resolve = (data)=>{
    if(this.status==='pendding'){
        this.status = 'resolve'
        this.value = data
        // 监听回调函数
        this.onResolvedCallbacks.foreach(fn=>fn());
    }
}

let reject = (data)=>{
  if(this.status==='pendding'){
    this.status = 'reject'        
    this.reason = data
    this.onRejectedCallbacks.forEach(fn=>fn())
  } 
}
```

- 然后是then需要多加一个状态判断:
    - 当Promise中是异步操作时:
        - 需要在我们之前定义的'回调函数'数组中添加一个回调函数;

```js
if(this.status === 'padding'){
    this.onResolvedCallbacks.push(()=>{
    // to do....
    let x = onFufilled(this.value)
    resolvePromise(promise2,x,resolve,reject)
    });
    this.onRejectedCallbacks.push(()=>{
    let x = onRejected(this.reason)
    resolvePromise(promise2,x,resolve,reject)
  })
}
```

- 异步已经解决;

...