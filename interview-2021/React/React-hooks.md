# React Hooks

- 是 react 在 16.8 版本之后新出的一系列 api。
- 是可选功能：
  - 也就是说使用 '类组件' 和使用 '函数式 hooks 组件'，不冲突。
  - 100%向后兼容，没有破坏性改动。

> 不会说取代 class 组件，尚无计划说要移除 class 组件。

---

## 本文档主要内容

- State Hook
- Effect Hook
- other Hook
- custom Hook
- 组件逻辑复用
- 规范和注意事项

---

## 面试题

### 为什么会有 React Hooks，它解决了哪些问题？

### React Hooks 如何模拟组件生命周期？

### 如何自定义 Hook？

### React Hooks 性能优化

### 使用 React Hooks 遇到哪些坑？

### Hooks 相比 HOC 和 Render Prop 有哪些优点？

---

## 函数组件的特点

- 没有组件实例：
  - 函数执行完，就销毁了，没有所谓的实例。
- 没有生命周期。
- 没有 state 和 setState，只能接收 props。

## class 组件的问题

- 大型组件很难拆分和重构，很难测试（即 class 不易拆分）
- 相同业务逻辑，分散到各个方法中，逻辑混乱。
- 复用逻辑变得复杂，如 Mixins、HOC、Render Props。

## React 组件更易用函数表达

- React 提倡函数式编程，view = fn(props)。
- 函数更灵活，更易拆分，更易测试。
- 但函数组件太简单，需要增强能力：
  - **Hooks 横空出世**

> 函数组件 + hooks，就能实现 class 组件的功能，还能规避 class 组件的一些问题，这就是 hooks 存在的原因之一。

## React 函数式组件

- 三要素：
  - 引入 React。
  - 组件是一个函数。
  - 返回 JSX。

## Hooks 命名规范

- 规定所有的 Hooks 都 use 开头，如 useXxx。
- 自定义 Hook 也要以 use 开头。
- 非 Hooks 的地方，尽量不要使用 useXxx 写法。

---

# State Hook

## 让函数组件实现 state 和 setState

- 默认函数组件没有 state。
- 函数组件是一个纯函数，执行完即销毁，无法存储 state。
- 需要 State Hook，即把 state 功能 “钩” 到纯函数中。

## useState 使用总结

- useState() 传入初始值，返回数组 [state, setState]。
- 通过 state 获取值。
- 通过 setState() 修改值。

---

# Effect Hook

## 让函数组件模拟生命周期

- 默认 '函数组件' 没有生命周期。
- 函数组件是一个纯函数，执行完即销毁，自己无法实现生命周期。
- 使用 Effect Hook 把生命周期 '钩' 到纯函数中。

## 用 useEffect 模拟组件生命周期

### 模拟 DidMount 和 DidUpdate

- 模拟 class 组件的 DidMount 和 DidUpdate。
  - DidMount：组件加载完毕。
  - DidUpdate：组件更新完毕。

```js
// 模拟 class 组件的 DidMount 和 DidUpdate。
useEffect(() => {
  console.log("模拟生命周期 DidMount 和 DidUpdate");
});
```

### 只模拟 DidMount

- 只模拟 class 组件的 DidMount：
  - DidMount：组件加载完毕。
    - useEffect 传入第二参数 `[]`。

```js
// 只模拟 class 组件的 DidMount。
useEffect(() => {
  console.log("只模拟生命周期 DidMount");
}, []); // 第二参数 [], 表示不依赖于任何 state
```

### 精细模拟 DidUpdate

- 精细模拟 class 组件的 DidUpdate
  - DidUpdate：组件更新完毕。
    - useEffect 传入第二参数 `[xxx,yyy]`。
      - 括号内的是依赖：
        - 识别 **'xxx 或 yyy 更新了，我才触发更新'。**

```js
// 精细模拟 class 组件的 DidUpdate。
useEffect(() => {
  console.log("只模拟生命周期 DidMount");
}, [xxx, yyy]);
```

### 模拟 WillUnMount

- 模拟 class 组件的 WillUnMount
  - WillUnMount：组件销毁时。
    - useEffect 传入第二参数 `[xxx,yyy]`。
      - 返回一个函数。
        - 在函数内清除副作用。

> 注意，模拟 WillUnMount, 但不完全相等。

```js
// 模拟 class 组件的 WillUnMount
useEffect(() => {
  let timerId = window.setInterval(() => {
    console.log(Date.now());
  });

  // 返回一个函数
  // 模拟 class 组件的 WillUnMount
  return () => {
    window.clearInterval(timerId);
  };
}, []);
```

## useEffect 使用总结

- 模拟 componentDidMount - useEffect 依赖 []。
- 模拟 componentDidUpdate - useEffect 无依赖，或者依赖 [a, b]。
- 模拟 componentWillUnMount - useEffect 中返回一个函数。

## useEffect 让纯函数有了副作用

- 默认情况下，执行纯函数，输入参数，返回结果：
  - 无副作用。
- 所谓副作用：
  - 就是对函数之外造成影响，如设置全局定时任务。
- 而组件需要副作用，所以需要 useEffect “钩” 入纯函数中。

> 因为需要，所以存在。———— 技术向业务妥协。
