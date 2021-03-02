# 面试真题

## 题目讲解-1: 何为变量提升？

### var 和 let const 的区别

- 第一点：
  - var 是 ES5 语法。
  - let、const 是 ES6 语法。
  - var 有变量提升。
- 第二点：
  - var 和 let 是变量，可修改。
  - const 是常量，不可修改。
- 第三点：
  - let、const 有块级作用域，var 没有。

```js
// 变量提升 ES5
console.log(a); // undefind
var a = 200;

// 相当于
var a; // undefind
console.log(a);
a = 200;
```

- 块级作用域：
  - 在块级作用域内定义的变量。
    - 外界无法访问。
      - let、const 具有块级作用域。
      - var 不具有块级作用域。

#### 总结

- 变量提升和暂时性死区（TDZ）
  - 变量提升：代码顺序上，变量调用在前，声明在后，可以调用该对象。（var）
  - 暂时性死区（TDZ）：变量在初始化之前不可引用，否则会报错。（let，const）

---

### typeof 返回哪些类型

- 值类型：
  - undefind
  - string
  - number
  - boolean
  - symbol
- object(注意，typeof null === 'object')
- function

### 列举强制类型转换和隐式类型转换

- 强制类型转换：
  - patseInt
  - parseFloat
  - toString
- 隐式类型转换：
  - if
  - 逻辑运算
  - `==`
  - `+` 拼接字符串

---

## 题目讲解-2: 手写深度比较 isEqual

### 手写深度比较，模拟 lodash.isEqual

- 正常两个对象进行 `===` 判断，是返回 false，因为是不同定义的，二者的 '内存地址' 是不一样的。

```js
// 值类型是直接赋值，并不会开辟新的内存地址，所以返回true
const obj1 = 1;
const obj2 = 1;
console.log(obj1 === obj2); // true

// 对象是引用类型，且定义时是开辟新的内存地址，二者内存地址不相等，所以返回 false
const obj3 = { a: 1 };
const obj4 = { a: 1 };

console.log(obj3 === obj4); // false
```

- 所以我们要手写手写深度比较 lodash 函数

```js
// 手写深度比较，模拟 lodash.isEqual

// 判断师傅是对象或数组
function isObject(obj) {
  return typeof obj === "object" && obj !== null;
}

// 全相等
function isEqual(objA, objB) {
  if (!isObject(objA) || !isObject(objB)) {
    // 值类型（注意，参与 equal 的一般不会是函数）
    return objA === objB;
  }
  if (objA === objB) {
    return true;
  }
  // 到这一步可以确定，两个都是引用类型，也就是都是对象或数组，而且不相等。
  // 1.先取出 objA 和 objB 的 keys，比较个数。
  const objAKeys = Object.keys(objA);
  const objBKeys = Object.keys(objB);
  if (objAKeys.length !== objBKeys.length) {
    return false;
  }
  // 2.以 objA 为基准，和 objB 依此进行递归比较（因为会有深层次key）
  for (let key in objA) {
    // 比较当前 key 的 val ———— 递归
    const res = isEqual(objA[key], objB[key]);
    if (!res) {
      return false;
    }
  }
  // 3. 全相等
  return true;
}

const objA = {
  a: 100,
  b: {
    x: 100,
    y: 200,
  },
};
const objB = {
  a: 100,
  b: {
    x: 100,
    y: 200,
  },
};

console.log(isEqual(objA, objB));
```

### split() 和 join() 的区别

- split() 是将字符串拆分成数组。
- join() 是将数组拼接成字符串。

### 数组的 pop push unshift shift 分别做什么？

- pop：
  - 移除数组最后一个元素。
  - 返回值：
    - 移除的元素。
- push：
  - 添加元素至数组最后一位。
  - 返回值：
    - 处理后的数组长度（length）。
- unshift：
  - 添加元素至数组第一位。
  - 返回值：
    - 处理后的数组长度（length）。
- shift：
  - 移除数组第一个元素。
  - 返回值：
    - 移除的元素。

> 上述 API 均改变原数组，也就是有副作用。
> 还有 forEach some every splice 等等。

### 【扩展】数组的 API，有哪些是纯函数？

- 纯函数：
  - 不改变原数组（没有副作用）。
  - **返回一个新数组。**
- API：
  - concat：
    - 拼接数组，返回一个新数组。
  - map：
    - 将数组中的每个元素调用一次提供的函数，返回一个新数组。
  - filter：
    - 将保留通过 '所提供函数' 实现的测试的所有元素，返回一个新数组。
  - slice:
    - 截取数组元素，返回一个新数组。

---

## 题目讲解-3: 你是否真的会用数组 map

### 数组 slice 和 splice 的区别

- 功能区别：
  - slice — 切片
  - splice - 剪接
- 参数和返回值：
  - 参数：不一样，具体看 MDN。
  - 返回值：
    slice: 切片下来的元素，组成新数组返回。
    splice：被剪下来的元素组成的数组。
- 是否是纯函数：
  - slice：是纯函数
  - splice：不是纯函数

### [10, 20, 30].map(parseInt) 返回的结果是什么？

- 输出：10, NaN, NaN
  - 因为传给 parseInt 的第二参数表示的是：
    - 被解析值的进制：
      - 常规为 2, 10, 16。
        - **所以后面两位无法识别。**

```js
// 本质
const res = [10, 20, 30].map(parseInt);

// 相当于
const res1 = [10, 20, 30].map((num, index) => {
  parseInt(num, index);
});

// 10 -> parseInt(10, 0) -> 10
// 20 -> parseInt(20, 1) -> NaN
// 30 -> parseInt(30, 2) -> NaN
```

### ajax 请求 get 和 post 的区别？

- 第一点：
  - git 一般用于查询操作。
  - post 一般用于用户提交操作。
- 第二点：
  - git 参数拼接在 url 上。
  - post 放在请求体内（数据体积可更大）。
- 第三点：
  - 安全性：post 易于防止 CSRF。

---

## 题目讲解-4: 再学闭包

### 函数 call 和 apply 的区别

```js
fn.call(this, p1, p2, p3);
fn.apply(this, arguments);
```

- call 的剩余参数是一个个拆分传入。
- apply 的剩余参数是 '数组' 或 '类数组' 的形式传入。

### 事件代理（委托）是什么？

- 利用事件冒泡的机制：
  - 将事件设定在外层 DOM 上，实现减少事件绑定的操作。（event.target 获取触发元素）

### 闭包是什么，有什么特性？有什么负面影响？

- 回顾作用域和自由变量。
- 回顾闭包应用场景：
  - 作为参数被传入。
  - 作为返回值被返回。
- 回顾：
  - 自由变量的查找，要在函数定义的地方（而非执行的地方）。
- 影响：
  - 变量会常驻内存，得不到释放。闭包不要乱用。

--

## 回顾 DOM 操作和优化

### 如何阻止事件冒泡和默认行为？

- event.stopPropagation();
- event.preventDefault();

### 查找、添加、删除、移动 DOM 节点

- easy，自己回顾
  - 查找：getElementById() ...
  - 添加：createElement()、appendChild()
  - 删除：removeChild()
  - 移动：获取节点的情况下用 appendChild()

### 如何减少 DOM 操作

- 缓存 DOM 查询结果。(for 循环的 length，函数给默认值，都先计算好，不要每次用到都计算查询一次)
- 多次 DOM 操作，合并到一次插入。(createDocumentFragment())

---

## 面试讲解-6: jsonp 本质是 ajax 吗？

### 解释 jsonp 的原理，为何它不是真正的 ajax？

- 前置：
  - 浏览器的同源策略（服务端没有同源策略）和跨域。
- 能绕过跨域的 html 标签：
  - img
  - script
- jsonp 原理：
  - 动态创建 script，然后给予动态的 src，实现跨域。
- 为何它不是真正的 ajax？
  - 它核心是用 script 标签。
    - 没有用到 ajax 的 XMLHttpRequest()。

### document load 和 ready 的区别

- 其实比较的是：
  - load：
    - 页面全部自由加载完才会执行。
  - DOMContentLoaded
    - DOM 渲染完即可执行。

### === 和 == 的区别

- `==` 会进行隐式类型转换，使得两端的比较目标尽可能成立相等。
- `===` 不会进行隐式类型转换，必须都相等 ———— 值、类型、内存地址等。

> 只有 == null，用 ==，其余均用 === 即可。

---

## 面试讲解-7: 是否用过 Object.create()

### 函数声明和函数表达式的区别

- 函数声明：function fn(){...}
- 函数表达式：const fn = function(){...}
- 函数声明会在代码执行前预加载（类似变量提升），而函数表达式不会。

### new Object() 和 Object.create() 的区别

- {} 等同于 new Object(), 隐式原型为 Object.Prototype。
- Object.create(null) 没有原型。
- Object.create({...})可指定原型。

### 关于 this 的场景题

- this 执行时才能确认其指向。

---

## 面试讲解-8: 常见的正则表达式

### 关于作用域和自由变量的场景题 - 1

```js
let i;
for (i = 1; i <= 3; i++) {
  setTimeout(() => {
    console.log(i);
  }, 0);
}

// 4 4 4
```

### 判断字符串以字母开头，后面字母数字下划线，长度 6-30

```js
const reg = /^[a-zA-Z]\w{5,29}$/;
```

- 具体看 MDN 手册把。

### 关于作用域和自由变量的场景题 - 2

```js
let a = 100;
function test() {
  alert(a);
  a = 10;
  alert(a);
}
test();
alert(a);
// 100 10 10
```

> 看 code 小技巧，函数还未执行，直接跳过，什么时候执行，再回头来看。

---

## 面试讲解-9: 如何获取最大值

### 手写字符串 trim 方法，保证浏览器兼容性

```js
String.prototype.trim1 = function () {
  return this.replace(/^\s+/, "").replace(/\s+$/, "");
};
```

### 如何获取多个数字中的最大值

- 直接用 Math.Max()
- 手写 max 函数：

```js
function max() {
  const nums = Array.prototype.slice.call(arguments);
  let max = 0;
  nums.forEach((num) => {
    if (num > max) {
      max = n;
    }
  });
  return max;
}
```

### 如何用 JS 实现继承？

- 就用 class 继承 ———— extends

---

## 面试讲解-10: 解析 url 参数

### 如何捕获 JS 程序中的异常？

- 手动捕获：
  - try{} catch{}
- 自动捕获：
  - window.onerror = ...

### 什么是 JSON？

- json 是一种数据格式，本质是一段字符串。
- json 格式和 JS 对象结构一致，对 JS 语言更友好。
- window.JSON 是一个全局对象：JSON.stringify JSON.parse

```json
{
  "name": "cain",
  "info": {
    "single": true,
    "age": 30,
    "city": "ShangHai"
  },
  "like": ["game", "work"]
}
```

### 获取当前页面 url 参数

- 传统方式：查找 location.search
- 新 API：URLSearchParams

```js
// 传统方式
function query(name) {
  const search = location.search.substr(1);
  // search: 'a=10&b=20&c=30'
  const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, "$");
  const res = search.match(reg);
  if ((res = null)) {
    return null;
  }
  return res[2];
}

query("a"); // 10
```

```js
// API：URLSearchParams
function query(name) {
  const search = location.search;
  const p = new URLSearchParams(search);
  return p.get(name);
}

query("b"); // 20
```

> URLSearchParams 可能有浏览器兼容问题。高版本浏览器比较稳妥。

---

## 面试讲解-11: 数组去重有几种方式？

### 将 url 参数解析为 JS 对象

```js
// 传统方式(数组拆分)
function queryToObj(name) {
  const res = {};
  const search = location.search.substr(1);
  // search: 'a=10&b=20&c=30'
  search.split("&").forEach((paramStr) => {
    const arr = paramStr.split("=");
    const key = arr[0];
    const val = arr[1];
    res[key] = val;
  });
  return res;
}

queryToObj(); // {a: 10, b: 20, c: 30}
```

```js
// 使用 URLSearchParams
function queryToObj() {
  const res = {};
  const pList = new URLSearchParams(location.search);
  pList.forEach((val, key) => {
    res[key] = val;
  });
  return res;
}

queryToObj(); // {a: 10, b: 20, c: 30}
```

### 手写数组 flatern，考虑多层级

- 核心：
  - concat.apply([], arr);
  - 递归思想

```js
// 数组拍平

// 测试用例
const arr = [[1, 2], 3, [4, 5, [6, 7, [8, 9, [10, 11]]]]];
// 最终效果：[1, 2, 3, 4, 5, 6, 7, 8, 9 , 10, 11]

function flat(arr) {
  // 验证 arr 中，还有没有深层数组 [1, 2, [3, 4]]
  const isDeep = arr.some((item) => item instanceof Array);
  if (!isDeep) {
    return arr; // 最终在此返回
  }
  const res = Array.prototype.concat.apply([], arr);
  return flat(res); // 递归
}

console.log(flat(arr)); // 最终效果：[1, 2, 3, 4, 5, 6, 7, 8, 9 , 10, 11]
```

### 数组去重

- 传统方式：遍历元素挨个比较、去重。
- ES6：使用 Set。

> 要考虑计算效率。

```js
// 传统方式（数组去重）

// 测试用例
const arr = [30, 30, 10, 10, 20, 30, 40, 10, 50, 50];

function unique(arr) {
  const res = [];
  arr.forEach((item) => {
    if (res.indexOf(item) < 0) {
      res.push(item);
    }
  });
  return res;
}

console.log(unique(arr)); // [ 30, 10, 20, 40, 50 ]
```

```js
// Set 方式（数组去重）

// 测试用例
const arr = [30, 30, 10, 10, 20, 30, 40, 10, 50, 50];

function unique(arr) {
  const set = new Set(arr);
  return [...set];
}

console.log(unique(arr)); // [ 30, 10, 20, 40, 50 ]
```

---

## 面试讲解-12: 是否用过 requestAnimationFrame

### 手写深拷贝

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

> 注意，Object.assign 不是深拷贝！！！
>
> > Object.assign 只拷贝第一层，深层的不是深拷贝。依旧指向同一内存地址。

### 介绍一下 RAF requestAnimationFrame

- 要想动画流畅，更新频率要 60 帧/s，即 16.67/ms 更新一次视图。
- setTimeout 要手动控制频率，而 RAF 浏览器会自动控制。
- 后台标签或隐藏 iframe 中，RAF 会暂停，而 setTimeout 依然执行。

```js
// RAF
const curWidth = $('div1');
const maxWidth = 640;

function animate(){
  curWidth = curWidth + 3;
  $div1.css('width', curWidth){
    if(curWidth < maxWidth)
    window.requestAnimationFrame(animate); // 时间不用自己控制，setTimeout 需要自己控制时间，60帧/s，也就是 16.7/ms 刷新一次。
  }
}
```

### 前端性能如何优化？一般从哪几个方面考虑？

- 原则：多使用内存、缓存、减少计算、减少网络请求。
- 方向：加载页面，页面渲染，页面操作流畅度。
