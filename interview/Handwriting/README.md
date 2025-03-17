# 手写题

- 以下是前端高频手写题，涵盖核心 API 实现、设计模式、算法等，附详细解析与答案。
- 助你轻松应对面试：

## 手写 `Function.prototype.call`

- **功能**：改变 `this` 指向并 **立即执行函数**。

```js
Function.prototype.myCall = function(context, ...args){
  context = context || window; // 默认全局对象

  const fn = Symbol(); // 创建唯一标识
  context[fn] = this; // 将当前函数挂载到 context 对象

  const result = context[fn](...args); // 调用函数

  delete context[fn]; // 清理临时属性
  return result;
}


// 使用示例
const obj = { name: 'Alice' };
function greet() { console.log(this.name); }
greet.myCall(obj); // 输出 'Alice'
```

---

## 手写 `Function.prototype.bind`

- **功能**：返回一个绑定 `this` 的新函数。

```js
Function.prototype.myBind = function(context, ...args){
    const self = this; // 保存原函数，以便后续调用。

    return function(...innerArgs){
        // 自行实现类似于 apply
        const fn = Symbol();
        context[fn] = self;
        
        const result = context[fn](...args.concat(innerArgs));
        
        delete context(fn);
        return result;
    }
}

// 使用示例
const obj = {x: 42};
function add(y){
    return this.x + y;
}

const boundAdd = add.myBind(obj, 10);
console.log(boundAdd()); // 52
```

- **解析**：
  - **为什么需要 const self = this？**
    - **this 的动态性**：
      - JavaScript 中的 this 是动态绑定的，取决于函数的调用方式。
      - 在 myBind 内部，this 指向原函数；
      - 但在返回的新函数中，this 指向调用新函数的上下文。
    - **闭包的作用**：
      - 通过 const self = this，将原函数的引用保存在闭包中，确保在新函数中仍能访问到原函数。

---

## 3. 手写深拷贝（Deep Clone）

- **功能**：克隆对象及其嵌套属性。

```js
function deepClone(obj, map = new WeakMap()){
    if(typeof obj !== 'object' || obj === null){
        return obj; // 最里层判断
    }
    
    if(map.has(obj)){
        return map.get(obj); // 检测循环引用
    }

    const clone = Array.isArray(obj) ? [] : {};

    map.set(obj, clone); // 记录已拷贝的对象

    for(const key in obj){
        if(obj,hasOwnProperty(key)){
            clone[key] = deepClone(obj[key], map); // 递归拷贝
        }
    }

    return clone;
}

// 使用示例
const obj = {
    a: 1,
    b: {
        c: 2
    }
};

const cloned = deepClone(obj);
```

---

## 4. 手写防抖（Debounce）

- **功能**：高频事件 延迟 执行，只执行最后一次。

```js
function debounce(fn, delay, immediate = false){
    let timer;
    return function(...args){
        if(immediate && !timer){
            fn.apply(this, args); // 立即执行
        }

        clearTimeout(timer);

        timer = setTimeout(() => {
            if(!immediate){
                fn.apply(this, args); // 延迟执行
            }

            timer = null;
        }, delay)
    }
}

// 使用示例
const debouncedHandler = debounce(() => console.log('Resize'), 300);

window.addEventListener('resize', debouncedHandler)
```

- **注意点**：
  - 问：为什么使用 fn.apply(this, args)？
  - 答：
    - 绑定正确的 this。
    - 正确处理参数。

---

## 5. 手写节流（Throttle）

- **功能**：高频事件按固定间隔执行。

```js
function throttle(fn, delay){
    let lastTime = 0;

    return function(...args){
        const now = Date.now();
        if(now - lastTime >= delay){
            fn.apply(this, args);
            lastTime = now;
        }
    }
}

// 使用示例
const throttleHandle = throttle(() => console.log('Scroll'), 100);

window.addEventListener('scroll', throttleHandle);
```

## 6. 手写 Promise

- 符合 **Promise/A+ 规范** 的 手写 Promise 实现：
  - then
  - resolve
  - reject
  - 处理异步任务队列
  - 链式调用

```js
class MyPromise {
  constructor (executor) {
    this.state = 'pending' // Promise 的初始状态：'pending'（进行中）
    this.value = undefined // 存储成功时的值
    this.reason = undefined // 存储失败时的原因
    this.onFulfilledCallbacks = [] // 存储 `then` 里成功的回调（当 `resolve` 先执行时）
    this.onRejectedCallbacks = [] // 存储 `then` 里失败的回调（当 `reject` 先执行时）

    // 定义 resolve 方法
    const resolve = value => {
      if (this.state === 'pending') {
        // 只有在 'pending' 状态下才能改变状态
        this.state = 'fulfilled' // 状态变为 'fulfilled'（已成功）
        this.value = value // 记录 `resolve` 传入的值
        this.onFulfilledCallbacks.forEach(cb => cb(value)) // 依次执行 `then` 存储的成功回调
      }
    }

    // 定义 reject 方法
    const reject = reason => {
      if (this.state === 'pending') {
        // 只有在 'pending' 状态下才能改变状态
        this.state = 'rejected' // 状态变为 'rejected'（已失败）
        this.reason = reason // 记录 `reject` 传入的失败原因
        this.onRejectedCallbacks.forEach(cb => cb(reason)) // 依次执行 `then` 存储的失败回调
      }
    }

    try {
      executor(resolve, reject) // 立即执行传入的 `executor` 函数，并提供 `resolve` 和 `reject`
    } catch (error) {
      reject(error) // 如果 `executor` 代码抛出异常，自动执行 `reject`
    }
  }

  // then 方法：处理 Promise 成功和失败的情况
  then (onFulfilled, onRejected) {
    onFulfilled =
      typeof onFulfilled === 'function' ? onFulfilled : value => value // 成功回调默认返回 value
    onRejected =
      typeof onRejected === 'function'
        ? onRejected
        : reason => {
            throw reason
          } // 失败回调默认抛出 reason

    return new MyPromise((resolve, reject) => {
      // `then` 返回一个新的 Promise 以支持链式调用
      if (this.state === 'fulfilled') {
        // 如果当前 Promise 已经成功
        setTimeout(() => {
          // 确保 then 里的代码是异步执行的
          try {
            const result = onFulfilled(this.value) // 执行成功回调
            resolve(result) // 传递给下一个 `then`
          } catch (error) {
            reject(error) // 如果回调出错，则 `reject`
          }
        }, 0)
      } else if (this.state === 'rejected') {
        // 如果当前 Promise 已经失败
        setTimeout(() => {
          try {
            const result = onRejected(this.reason) // 执行失败回调
            resolve(result) // 传递给下一个 `then`
          } catch (error) {
            reject(error) // 如果回调出错，则 `reject`
          }
        }, 0)
      } else {
        // 如果状态是 'pending'(异步情况)
        this.onFulfilledCallbacks.push(() => {
          // 存储成功回调，等 resolve 执行后调用
          setTimeout(() => {
            try {
              const result = onFulfilled(this.value)
              resolve(result)
            } catch (error) {
              reject(error)
            }
          }, 0)
        })

        this.onRejectedCallbacks.push(() => {
          // 存储失败回调，等 reject 执行后调用
          setTimeout(() => {
            try {
              const result = onRejected(this.reason)
              resolve(result)
            } catch (error) {
              reject(error)
            }
          }, 0)
        })
      }
    })
  }

  // catch 方法：处理 reject 逻辑
  catch (onReject) {
    return this.then(null, onReject) // catch 实际上，是 then 的语法糖
  }

  // finally 方法：无论成功或失败，都会执行 callback
  finally (callback) {
    return this.then(
      value => MyPromise.resolve(callback()).then(() => value), // `finally` 里不影响后续的值
      reason =>
        MyPromise.resolve(callback()).then(() => {
          throw reason
        }) // 失败时 `finally` 也会执行
    )
  }

  // 静态 resolve 方法：直接返回一个成功的 Promise
  static resolve (value) {
    return new MyPromise(resolve => resolve(value))
  }

  // 静态 reject 方法：直接返回一个失败的 Promise
  static reject (reason) {
    return new MyPromise((_, reject) => reject(reason)) // 调用 `reject` 立即失败
  }

  // 静态 all 方法: 所有 Promise 必须全部成功，任意失败即失败
  static all (promises) {
    return new MyPromise((resolve, reject) => {
      let resultArray = [] // 存储所有 Promise 结果
      let count = 0 // 记录已完成的 Promise 数量

      if (promises.length === 0) resolve([]) // 如果是空数组，直接返回成功

      promises.forEach((promise, index) => {
        MyPromise.resolve(promise).then(
          value => {
            resultArray[index] = value // 存储成功的值
            count++
            if (count === promises.length) resolve(resultArray)
          },
          reason => reject(reason) // 只要有一个失败，直接 `reject`
        )
      })
    })
  }

  // 静态 race 方法：谁最先执行完，返回谁的结果
  static race (promises) {
    return new MyPromise((resolve, reject) => {
      promises.forEach(promise => {
        MyPromise.resolve(promise).then(resolve, reject) // 任何一个 Promise 先完成，就 resolve/reject
      })
    })
  }
}
```

---

## 7. 手写 Array.prototype.flat

- **功能**：数组扁平化，支持指定深度。

```js
function myFlat (arr, depth = 1) {
  return depth > 0
    ? arr.reduce((acc, val) => {
        return acc.concat(Array.isArray(val) ? myFlat(val, depth - 1) : val)
      }, [])
    : arr.slice()
}

// 使用示例
const arr = [1, [2, [3]]]
console.log(myFlat(arr, 2)) // [1, 2, 3]
```

---

## 8. 手写 EventEmitter (发布订阅模式)

- **功能**：实现 **事件监听**与 **触发**。

```js
class EventEmitter {
  constructor () {
    this.events = {}
  }

  on (event, listener) {
    if (!this.events[event]) {
      this.events[event] = []
    }
    this.events[event].push(listener)
  }

  emit (event, ...args) {
    (this.events[event] || []).forEach(listener => listener(...args));
  }

  off (event, listener) {
    if (!this.events[event]) {
      return
    }

    this.events[event] = this.events[event].filter(l => l !== listener)
  }

  once(event, listener){
    const onceWrapper = (...args) => {
        listener(...args);
        this.off(event, onceWrapper); // 触发一次后自动解绑
    }

    this.on(event, onceWrapper);
  }
}

// 使用示例
const emitter = new EventEmitter()
emitter.on('message', msg => console.log(msg))
emitter.emit('message', 'Hello!') // 输出 'Hello!'
```

---

## 9. 手写柯里化（currying）

- 功能：将 **多参数函数** 转换为 **嵌套的单参数函数**。

```js
function curry (fn) {
  return function curried (...args) {
    // 如果参数数量足够，直接执行
    if (args.length >= fn.length) {
      return fn.apply(this, args)
    }

    // 否则返回一个新函数，继续接收剩余参数
    return (...args2) => curried.apply(this, args.concat(args2))
  }
}

// 示例
const add = (a, b, c) => a + b + c
const addCurry = curry(add)
console.log(addCurry(1)(2)(3)) // 6

```

---

## 10. 手写 JSON.stringify（简化版）

- **功能**：将对象转换为 JSON 字符串。

```js
function myStringify(obj){
    if(typeof obj !== 'object' || obj === null){
        return typeof obj === 'string' ? `"${obj}"` : String(obj);
    }

    if(Array.isArray(obj)){
        return `[${obj.map(item => myStringify(item)).join(',')}]`
    }

    const entries = Object.entries(obj)
        .map((key, val) => {
            return `"${key}": ${myStringify(val)}`
        })

    return `{${entries.join(',')}}` // entries 是数组，需将数组处理成字符串 return
}

// 使用示例
console.log(myStringify({ a: 1, b: [2, { c: 3 }] })); // {"a":1,"b":[2,{"c":3}]}
```

---

## 11. 手写 instanceof

- **功能**：检测构造函数的 prototype 属性是否出现在某个实例对象的原型链上。

```js
function myInstanceof(obj, constructor){
    let proto = Object.getPrototypeOf(obj); // 返回 obj 的原型
    while(proto){
        if(proto === constructor.prototype) return true;
        proto = Object.getPrototypeOf(proto);
    }

    return false
}

// 使用示例
console.log(myInstanceof([], Array));
```

## 12. 手写 Object.create

- **功能**：创建一个以指定对象为原型的新对象。

```js
function myCreate(proto){
    // 创建一个空构造函数
    function F(){};

    // 将传入对象的原型赋值给空构造函数的 prototype 属性
    F.prototype = proto;

    // 使用 new 操作符创建 F 的实例，该实例的原型即为传入的 proto，即之后的实例化的对象： newObj.__proto__ -> F.prototype -> proto
    return new F();
}
```

## 13. 手写 `Array.prototype.filter`

- **功能**：过滤数组元素。

```js
Array.prototype.myFilter = function(callback){
    const result = [];
    for(let i = 0; i < this.length; i++){
        if(callback(this[i], i, this)){
            result.push(this[i]);
        }
    }

    return result;
}

// 使用示例
const arr = [1, 2, 3].myFilter(n => n > 2);
console.log(arr); // [3]
```

---

## 15. 手写 new 操作符

- **功能**：模拟 new 关键字的行为。

```js
function myNew(fn, ...args){

  if (typeof fn !== 'function') {
    throw new Error('参数有误!')
  }

  const newObj = Object.create(fn.prototype)

  const result = fn.apply(newObj, args)

  return typeof result === 'object' && result !== null ? result : newObj
}

// 使用示例
function Person(name) { this.name = name; }
const p = myNew(Person, 'Alice');
console.log(p.name); // 'Alice'
```

- **要点**：
  - 判断是否是函数
  - 创建一个新对象，并且将 新对象的 隐式原型 指向 fn 的显示原型
  - 用 apply 执行构造函数，将构造函数执行时的this，指向新创建的对象。
  - 若构造函数返回的是非对象类型，则直接返回新创建的对象，否则返回构造函数的返回结果。

---

## 16. 手写 观察者模式

**功能**：实现数据变化的观察与通知。

```js
class Subject {
  constructor () {
    this.observerList = new Set();
  }

  subscribe (observer) {
    this.observerList.add(observer);
  }

  unsubscribe (observer) {
    this.observerList.delete(observer)
  }

  notify (message) {
    this.observerList.forEach(observer => observer.update(message))
  }
}

class Observer {
  constructor (name) {
    this.name = name
  }

  update (message) {
    console.log(`${this.name} 收到通知：${message}`)
  }
}

// 测试
const subject = new Subject()
const observer1 = new Observer('观察者1')
const observer2 = new Observer('观察者2')

// 订阅
subject.subscribe(observer1)
subject.subscribe(observer2)

// 触发通知
subject.notify('更新啦！')
// 输出：观察者1 收到通知：更新啦！
// 输出：观察者2 收到通知：更新啦！

// 取消订阅
subject.unsubscribe(observer1)

// 再次触发通知
subject.notify('又更新啦！')
// 输出：观察者2 收到通知：又更新啦！
```

## 17. 手写单例模式

- **功能**：确保一个类只有一个实例。

```js
class Singleton {
  static instance  // 静态属性，存储唯一实例
  constructor () {
    if (Singleton.instance) {
      return Singleton.instance
    }

    Singleton.instance = this
  }
}

// 使用示例
const s1 = new Singleton()
const s2 = new Singleton()

console.log(s1 === s2) // true
```

- **解析**：
  - 为什么 Singleton.instance 一直指向同一个对象？
    - 因为 Singleton.instance 是静态属性，存储在 Singleton 类上，而不是实例上。
    - 类的 **静态属性** 在 **内存中只存在一份**，所有 new Singleton() 都 **共享这份数据**。
    - **构造函数** 检查 Singleton.instance 是否存在，如果存在，则直接返回它，**不再创建新实例**。
  - 面试官追问：**如果不用 static，还能实现单例模式吗？**
    - 可以使用 **闭包**，Singleton 直接写成构造函数形式，无需 class 类的写法，私有化变量存储。

--

## 18. 手写 函数组合 compose

- **功能**：将多个函数组合成一个新函数。

```js
function compose(...fns){
  return fns.reduce((acc, cul) => {
      return (...args) => {
          const result = cul(...args); // 第一个函数执行完
          return acc(result); // 传给第二个函数继续执行
      }
  })
}

// 使用示例
const add = x => x + 1;
const multiply = x => x * 2;
const func = compose(multiply, add);
console.log(func(3)); // (3 + 1) * 2 = 8
```
