# JS - 基础语法

## 变量类型和计算

### js 值类型和引用类型的区别

- 值类型:
  - 直接赋值，各自独立。

```js
// 值类型
let a;
const s = "abc";
const n = 100;
const b = true;
const s = Symbol("s");
```

- 引用类型：
  - 各变量指向的是 '内存地址'。
  - 会出现 '共享同一内存地址' 的情况。

```js
// 引用类型
const obj = { x: 100 };
const arr = ["a", "b", "c"];
const n = null; // 特殊的引用类型，指针指向为空地址
function fn() {} // 特殊引用类型，但不用于存储数据，所以没有“拷贝、复制函数”这一说
```

### 追问：为什么要做出如此区分？

- 成本问题（内存的空间、CPU 计算的耗时）：
  - 创建值类型的 '内存成本' 较小。
  - 创建 '对象' 的 '内存成本' 大（一个对象有可能很复杂，很大）。
- 是不得已而为之。

> 存储机制、赋值机制、拷贝机制，均做严格的区分。

---

## typeof 运算符

- 识别出所有 '值类型'。
- 识别函数。
- 判断是否是 '引用类型'（不可再细分）。

---

## 手写深拷贝

- 注意判断 '值类型' 和 '引用类型'。
- 注意判断是 '数组' 还是 '对象'。
- 核心知识点:
  - 递归

```js
/**
 * 深拷贝
 * @param {object} obj 要拷贝的对象
 */
function deepClone(obj = {}) {
  if (typeof obj !== "object" || obj == null) {
    return obj;
  }
  // 初始化返回结果
  let result;
  if (obj instanceof Array) {
    result = [];
  } else {
    result = {};
  }

  for (let key in obj) {
    // 保证 key 不是原型的属性
    if (obj.hasOwnProperty(key)) {
      // 递归调用
      result[key] = deepClone(obj[key]);
    }
  }

  // 返回结果
  return result;
}
```

---

## 变量计算 - 类型转换

### 字符串拼接

```js
// 隐式类型转换
const a = 100 + 10; // 110
const b = 100 + "10"; // 10010
const c = true + "10"; // true10
```

### == 运算符

- == 会做一些隐式类型转换，让两者尝试相等。

```js
// == 只比值，不比类型
100 == "100"; //true
0 == ""; // true
0 == false; // true
false == ""; // true
null == undefind; // true
```

> 除了 == null 以外， 其他都一律用 ===。

### if 语句和逻辑运算

- if 语句或逻辑运算，判断的是 truly 变量或 falsely 变量。
  - 并不是判断 true 或 false。

```js
// 以下是 falsely 变量。除此之外都是 truly 变量
!!0 === false;
!!NaN === false;
!!"" === false;
!!null === false;
!!undefind === false;
!!false === false;
```

---

## 原型和原型链

### class

- class 可以理解成一个模版。
  - 可以基于此模版，构建一些东西。
    - constructor
    - 属性
    - 方法

### class 继承

- 子类用 extends 和 super(...) 来继承父类的方法和属性。

---

## 类型判断 - instanceof

```js
xialuo instanceof Student // true
xialuo instanceof People // true
xialuo instanceof Object // true

[] instanceof Array // true
[] instanceof Object // true

{} instanceof Object // true
```

> Object 可以理解为所有引擎的父类。

## 原型

```js
xialuo.__proto__ === Student.prototype;
```

- 实例化对象下的 `__proto__` 方法指向的是 '其实例化类' 下的 '显示原型'，也就是 'prototype'方法。

### 原型关系

- 每个 class 都有显示原型 `prototype`。
- 每个 实例 都有隐式原型 `__proto__`。

> 实例的 `__proto__` 指向其对应 class 的 `prototype`。

### 基于原型的执行规则

- 获取属性 xialuo.name 或执行方法 xialuo.sayhi() 时:
  - 先在自身 '属性和方法' 中寻找。
  - 如果找不到，则自动去 `__proto__` 中查找。

> 此例中，xialuo.name 是自身属性，可以直接找到。
> xialuo.sayhi() 不是自身属性，是构建其 class 的方法。
>
> > 如上述，不是自身属性，于是像其 `__proto__` 中寻找。
> >
> > > 其 `__proto__` 指向的是其对应 class 的 `prototype`。
> > > 也就是 Student.prototype，其中存有此 class 的所有方法和属性。
> > >
> > > > 最终结果，找到。

---

## 原型链

```js
// 父类 People
// 子类 Student

console.log(Student.prototype.__proto__);
console.log(People.prototype);
console.log(People.prototype === Student.prototype.__proto__);
```

> 顺着原型链一层层往上找，直至 Object.prototype。

- Object.prototype 下的方法：
  - toString
  - hasOwnProperty
- 每次调用这两个方法。
  - 其实就是一层层顺着 '原型链' 找到 Object.prototype。

> Object.prototype 其隐式原型 `__proto__` 指向 null。（到头了）

---

### 再看 instanceof

```js
console.log(xialuo instanceof Student);
```

- 顺着 xialuo 实例 的 '隐式原型' 一层层向上找 Student.prototype。
  - 找到，则返回 true
  - 否则，则返回 false

---

## 原型相关面试题

### 如何准确判断一个变量是不是数组

- a instanceof Array

### class 原型的本质

- 原型和原型链的图示（直接画出来）。
- 属性和方法的执行规则。

### 手写一个简易 jQuery-demo

```js
class jQuery {
  constructor(selector) {
    const result = document.querySelectorAll(selector);
    const length = result.length;
    for (let i = 0; i < length; i++) {
      this[i] = result[i];
    }
    this.length = length;
  }
  get(index) {
    return this[index];
  }
  each(fn) {
    for (let i = 0; i < this.length; i++) {
      const elem = this[i];
      fn(elem);
    }
  }
  on(type, fn) {
    return this.each((elem) => {
      elem.addEventListener(type, fn, false);
    });
  }
}

// 插件
jQuery.prototype.dialog = function (info) {
  alert(info);
};

// 复写（造轮子）
// 用 extends 继承写的 jQuery ，在其基础上造轮子。
```

---

## 作用域和闭包

### 作用域

- 代表 '一个变量' 或者说 '某个变量':
  - **一个合法的使用范围。**
- 种类:
  - 全局作用域
  - 函数作用域
  - 块级作用域（ES6 新增）

```js
// ES6 块级作用域
if (true) {
  let x = 100;
}
console.log(x); // 会报错
```

### 创建 10 个 `<a>` 标签，点击时弹出对应的序号

```js
for (let i = 0; i < 10; i++) {
  let a = document.createElement("a");
  a.innerHTML = i + "<br>"; // a 标签的内容
  a.addEventListener("click", function (e) {
    e.preventDefault();
    alert(i);
  });
  document.body.appendChild(a); // 将 a 标签的 dom 节点挂载到文档中
}
```

### 自由变量

- 一个变量:
  - 在当前作用域没有定义，但被使用了。（说明在其他地方定义了，或者说根本没定义）
- 向上级作用域，一层层依此寻找 '此变量的定义处'。
  - 直至找到为止。
- 若到全局作用域都没找到，则报错 xx is not defind。

> 这，就叫 **自由变量**。

---

### 闭包

- 闭包这个词听着很专业，但其实就是 '作用域应用' 的一个特殊的情况。
- 作用域应用的 '特殊情况'，有两种表现：
  - 函数作为 '参数' 被传递。
  - 函数作为 '返回值' 被返回。

> 闭包核心：所有的自由变量查找，是在其 '定义的上级作用域' 查找，**不是在执行的地方一层层向外找**。

```js
// 函数作为返回值
function create() {
  const a = 100;
  return function () {
    console.log(a);
  };
}

let fn = create();
const a = 200;
fn(); // 100
```

- 因为在执行时，作用域向上查找，还没找到 '全局中的 a' 变量。
  - 由于自身函数内部也定义了一个 a，当自由变量向作用域向上查找时：
    - 在函数内就找到了 a 变量，于是停止查找，正常执行。
- 无论全局的 a 变量怎么变，都不会影响到函数的执行结果。
  - 那么，此函数的作用域，就形成了闭包。

```js
// 函数作为参数被传递
function print(fn) {
  let a = 200;
  fn();
}
let a = 100;
function fn() {
  console.log(a);
}
print(fn); // 100
```

- 核心点:
  - print 函数 只是引用了 fn()。
    - 不是定义 fn()；
  - 所以当 print(fn) 执行到 fn() 时，引擎需要找到 fn 函数的定义处，并且执行它。
    - **当前作用域找不到，于是顺着上级作用域找。**
      - 在全局作用域中找到了 fn，执行。
        - 此时内部需要打印 a 这个 '自由变量'。
          - 于是要在作用域中找到 a。
            - **当前作用域找不到，于是顺着上级作用域找。**
              - 在全局作用域中找到了 a，打印。
                - **结果，100**

> 因为本例子中，自由变量 a 被最先找到的地方，定义为 100，所以其他处 '定义的 a' 无论怎么变，打印出来都是 100。
> 记住，所有的自由变量查找，是在其 '定义的上级作用域' 查找，**不是在执行的地方一层层向外找**。

---

## this

- **this 取何值，是在函数 '执行时' 确认的，不是在函数 '定义时' 确认的。**
- 使用场景（+取值）：
  - 作为普通函数
    - this 指向 window。
  - 使用 call apply bind
    - this 指向 call apply bind 传入的参数。
  - 作为对象方法被调用
    - this 指向 该对象。
  - 在 class 方法中调用
    - this 指向 该类。
  - 箭头函数
    - this 取其 '上一级作用域' 的 this。

### call 和 bind 区别

- call 可以直接执行。
- bind 会返回一个新的函数执行。

---

### 手写 bind call apply 函数

```js
// 模拟bind
Function.prototype.bind1 = function () {
  // 将参数拆解为数组
  const args = Array.prototype.slice.call(arguments);

  // 获取 this （数组第一项）
  const t = args.shift();

  // 此函数本身
  const self = this;

  return function () {
    return self.apply(t, args);
  };
};

// 模拟call
Function.prototype.call1 = function (context) {
  // 若不是函数类型调用，报错
  if (typeof this !== "function") {
    throw new TypeError("Error");
  }
  const args = [...arguments];
  args.shift();
  context = context || window;
  context.fn = this;
  const result = context.fn(args);
  delete context.fn;
  return result;
};

// 模拟 apply
Function.prototype.apply1 = function (context) {
  // 若不是函数类型调用，报错
  if (typeof this !== "function") {
    throw new TypeError("Error");
  }
  context = context || window;
  context.fn = this;
  let result;
  if (arguments[1]) {
    result = context.fn(...arguments[1]);
  } else {
    result = context.fn();
  }
  delete context.fn;
  return result;
};
```

### 实际开发中闭包的应用场景，举例说明

- 隐藏数据：
  - 如做一个简单的 cache 工具

```js
// 闭包隐藏数据，只提供 API
function createCache() {
  const data = {}; // 闭包中的数据，被隐藏，不被外界访问
  return {
    set: function (key, val) {
      data[key] = val;
    },
    get: function (key) {
      return data[key];
    },
  };
}

const c = createCache();
c.set("a"), 100;
c.get("a");
```

- 此时 data 没有被放开，属于闭包中的数据（或者说变量），只能在函数内部进行访问。
  - 只提供了 API，只能通过 API 进行 data 的访问。

---

## 异步

- 来个经典：

```js
// setTimeout 笔试题
console.log(1);
setTimeout(() => {
  console.log(2);
}, 1000);
console.log(3);
setTimeout(() => {
  console.log(4);
}, 0);
console.log(5);

// 1 3 5 4 2
```

### 单线程和异步

- JS 是单线程语言，只能同时做一件事。
- 浏览器和 nodejs 已支持 JS 启动 '进程'，如 Web Worker，但并没有改变 JS 是单线程的本质。
- JS 和 DOM 渲染共用同一个线程，因为 JS 可修改 DOM 结构。
- 遇到等待（网络请求，定时任务）不能卡住。

> 所以，异步是由 '单线程' 催生而来的，并不是为了 '异步' 而 '异步'。

- 所以，需要异步。
  - 异步是由 callback 回调函数的形式进行调用。

### 同步和异步的区别是什么？

- 基于 JS 是单线程语言
  - 异步不会阻塞代码执行。
  - 同步会阻塞代码执行。

### 前端使用异步的场景有哪些？

- 网络请求，如 ajax 图片加载。
- 定时任务，如 setTimeout。

### 手写 Promise 加载一张图片

```js
const url = "./as.jpg";
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

loadImg(url)
  .then((img) => {
    console.log(img.width);
    return img;
  })
  .then((img) => {
    console.log(img.height);
  })
  .catch((err) => {
    console.err(err);
  });
```

- 直接 return img，那么 then 接收到的就是 img 实例。
  - 若返回 loadImg(url2)。
    - 那么 then 将接受一个经由 url2 请求后返回的 img 实例。

---

## promise 简介

- Promise 是 ES6 加入标准的一种异步编程解决方案。
  - 通常用来表示一个异步操作的最终完成 (或失败)。
- Promise 标准的提出，解决了 JavaScript 地狱回调的问题。
