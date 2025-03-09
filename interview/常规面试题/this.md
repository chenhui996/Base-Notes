# JavaScript 中的 this

- 在 JavaScript 中：
  - `this` 是一个 **动态绑定** 的关键字，代表 **当前执行上下文的对象**。
  - 值 **取决于 函数的调用方式**，非定义位置。
- 理解 `this` 重要，体现场景：
  - **对象方法**
  - **回调函数**
  - **事件处理**
  - **构造函数**
  - **箭头函数**
  - 等

## 1. this 的绑定规则

### 1.1 默认绑定（独立函数调用）

- **非严格模式**，`this` 指向 **全局对象**（浏览器中是 window，Node.js 中是 global）。
- **严格模式**，`this` 为 **undefined**。

- 示例：

```js
function show() {
  console.log(this); // 非严格模式：window，严格模式：undefined
}

show();
```

### 1.2 隐式绑定（对象方法调用）

- **函数 作为对象 的 方法 调用时**，this 指向 -> **调用该方法的对象**

- 示例：

```js
const obj = {
  name: "Alice",
  greet() {
    console.log(this.name); // this 指向 obj
  }
};

obj.greet(); // Alice
```

- 注意：隐式丢失

```js
const greetFn = obj.greet;
greetFn(); // ❌ undefined（因为 this 丢失）
```

### 1.3 显式绑定（call、apply、bind）

- call 和 apply：可以指定 this，**立即调用** 函数。
- bind：返回一个 **新的函数**，不会立即调用。

> 二者均手动指定了 this

- 示例：

```js
function greet(){
    console.log(this.name);
}

const person = {name: 'Cain'};

greet.call(person); // Cain
greet.apply(person); // Cain

const boundGreet = greet.bind(person);
// 需手动调用
boundGreet(); // Cain
```

- 区别：
  - call 和 apply 的区别在于 **参数传递方式**：
    - call(thisArg, arg1, arg2, ...)
    - apply(thisArg, [arg1, arg2, ...])
  - 还有 bind：
    - bind(thisArg, arg1, arg2, ...)

### 1.4 new 绑定（构造函数）

- new 关键词 创建 新对象，并将 this 绑定到该 **新对象**。

- 示例：

```js
function Person(name){
    this.name = name;
}

const p = new Person('Cain');
console.log(p.name); // Cain

// this 绑定到了 p
```

### 1.5 箭头函数绑定（词法作用域）

- 箭头函数不绑定 this，它的 this **继承 自 外部作用域**。

- 示例：

```js
const obj = {
    name: 'Cain',
    greet: () => {
        console.log(this.name); // ❌ this 指向外部作用域（window / global）
    }
}

obj.greet(); // undefined
```

- 箭头函数不会创建自己的 this，会继承定义时的 this。

---

## 面试题

- 概念题：

### 1. 什么是 this？它在 JavaScript 中的作用是什么？

- `this` 是什么:
  - 在 JavaScript 中，`this` 是一个 **动态绑定** 的关键字，代表 **当前执行上下文的对象**。
  - `this` 的值 **取决于 函数的调用方式**，非定义位置。
- `this` 的主要作用是：
  - 由于指向的是 **当前执行的上下文对象**，使得 **函数** 能够 访问和操作 **所属对象** 的 **属性和方法**。

### 2. this 在严格模式 ('use strict') 下的行为是怎样的？

- **独立调用函数时**：
  - `this` 为 undefined（不再指向全局对象）。
- **显式绑定**：
  - 在非严格模式下，若显式绑定 call/apply 传入 null 或 undefined，`this` 会替换为全局对象。
  - 严格模式下，`this` 直接接受传入的值（包括 null 或 undefined）
- **构造函数（new 绑定）**：
  - 构造函数必须通过 new 调用（否则报错）。（避免意外污染全局变量

> 其他规则（隐式绑定、箭头函数）与非严格模式一致。

### 为什么 this 在 setTimeout 回调中通常指向 window？

- 原因在于回调函数的调用方式。
- 具体来说，这与 this 的 **默认绑定规则** 和 setTimeout 的 **工作机制有关**。
- 以下是详细解释：

#### 默认绑定规则

- setTimeout 的回调函数会被当作一个 **普通函数独立调用**（而不是作为对象的方法或通过显式绑定）。
- 此时，this 的指向遵循 **默认绑定规则**：
  - 非严格模式：默认绑定到全局对象（如 window）。
  - 严格模式：默认绑定为 undefined。

#### setTimeout 的执行机制

- setTimeout 的 **回调函数** 会被 推入 **事件队列**，等待 **当前执行栈** 清空后执行。
- 此时，**回调函数** 的 **调用者** 实际上是 **全局执行上下文**，而非 **某个对象** 或 **显式绑定** 的上下文。
- 因此，this 默认指向全局对象。

#### 常见的误解场景

- 即使 **回调函数** 定义在 **对象方法内部**，setTimeout 的回调 -> 仍会丢失原对象的 this。
- 这是因为:
  - 回调函数被直接传递给 setTimeout，而 **非通过对象调用**。

#### 如何解决 this 指向问题？

##### 方法一：使用箭头函数

- **箭头函数** 没有自己的 `this`，它会继承外层作用域的 `this`。

```js
const user = {
  name: "Alice",
  greet() {
    setTimeout(() => {
      console.log(this.name); // 输出 "Alice"（this 指向 user）
    }, 1000);
  },
};

user.greet();
```

##### 方法二：显式绑定 this

- 通过 bind、call 或 apply 强制绑定 this。

```js
const user = {
  name: "Alice",
  greet() {
    setTimeout(function() {
      console.log(this.name); // 输出 "Alice"
    }.bind(this), 1000); // 将外层 this 绑定到回调函数
  },
};
user.greet();
```

##### 方法三：保存 this 到变量

- 利用闭包捕获外层 this。

```js
const user = {
  name: "Alice",
  greet() {
    const self = this; // 保存 this
    setTimeout(function() {
      console.log(self.name); // 输出 "Alice"
    }, 1000);
  },
};
user.greet();
```

#### 严格模式下的行为

- 在严格模式中，独立调用的函数 this 为 undefined，但 setTimeout 的回调仍可能指向全局对象（部分环境实现差异）。
- 不过更安全的做法是显式绑定。

### 箭头函数的 this 绑定方式是什么？如何影响它的使用？

- **无自身的 this**:
  - 箭头函数没有自己的 this 绑定，它的 this **继承自定义时所在的外层作用域**（即最近的非箭头函数作用域或全局作用域）。
- **静态绑定**:
  - this 在 **箭头函数定义时确定**，且在整个生命周期中 **不可更改**（无法通过 call、apply、bind 显式修改）。
- **严格模式的影响**:
  - 如果外层作用域处于严格模式，箭头函数的 this 会继承严格模式下的值（如 undefined）；若外层是非严格模式，则可能继承全局对象。

#### 如何正确使用？

```js
const obj = {
  name: "Bob",
  greet() {
    const arrowFn = () => console.log(this.name); 
    // 此时的this，继承自 外侧最近 且 非箭头函数 的作用域。
    // 也就是 greet 的 this，也就是obj

    arrowFn(); // ✅ "Bob"，因为 this 继承自 obj
  }
};
obj.greet();
```

### this 在 class 方法和普通函数中有什么区别？

- class 内部的方法默认使用严格模式，即使不写 "use strict"。
- class 方法中的 this 默认指向当前实例对象，但如果方法被单独赋值，会丢失 this 绑定。

#### 示例（正确的 this 绑定）

```js
class Person {
  constructor(name) {
    this.name = name;
  }
  greet() {
    console.log(this.name);
  }
}
const p = new Person("Charlie");
p.greet(); // ✅ "Charlie"
```
  
#### 错误示例（this 丢失）

```js
const greetFn = p.greet;
greetFn(); // ❌ undefined，因为 `this` 变成 `window`
```

#### 解决方法：使用 bind 绑定 this

```js
const boundGreet = p.greet.bind(p);
boundGreet(); // ✅ "Charlie"
```

### bind() 方法与 call() 和 apply() 的区别是什么？

- 作用:
  - call：显式绑定 this
  - apply：显式绑定 this
  - bind：显式绑定 this
- 是否立刻调用：
  - call：立即
  - apply：立即
  - bind：不立即
- 参数：
  - call：逗号分隔参数
  - apply：参数数组
  - bind：逗号分隔参数

### 在 ES6 class 中，为什么建议使用箭头函数作为类方法？

- **普通方法** 会在 方法 **被提取 或 作为 回调函数 使用时**，可能导致 this 丢失。
- **箭头函数** 不会创建自己的 this，可以直接访问 class 内部的 this，避免 this 绑定丢失。

- ✅ 示例（使用箭头函数避免 this 丢失）：

```js
class Counter {
  count = 0;
  increment = () => {
    console.log(this.count++);
  };
}

const counter = new Counter();
const fn = counter.increment;
fn(); // ✅ 0（this 仍然指向 counter）
```

- ❌ 如果用普通函数，会丢失 this：

```js
class Counter {
  count = 0;
  increment() {
    console.log(this.count++);
  }
}
const counter = new Counter();
const fn = counter.increment;
fn(); // ❌ TypeError: Cannot read properties of undefined
```

- 📌 结论：在 React/前端开发中，建议 **使用箭头函数作为类方法**，**防止 this 丢失**。
