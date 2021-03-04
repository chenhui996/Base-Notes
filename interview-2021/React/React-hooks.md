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
- 其他 Hook
- 自定义 Hook
- 组件逻辑复用
- 规范和注意事项

---

## 面试题

### 为什么会有 React Hooks，它解决了哪些问题？

- 完善函数组件的能力，函数更适合 React 组件。
- 组件逻辑复用，Hooks 表现更好。
- class 复杂组件正在变得费解，不易拆解，不易测试，逻辑混乱。
  - class 组件中，相同的逻辑散落在各处：
    - DidMount 和 DidUpdate 中获取数据。
    - DidMount 绑定事件，WillUnMount 解绑事件。
  - 使用 Hooks，相同逻辑可分割到一个一个的 useEffect 中。

### React Hooks 如何模拟组件生命周期？

- 模拟 componentDidMount - useEffect 依赖 []。
- 模拟 componentDidUpdate - useEffect 无依赖，或者依赖 [a, b]。
- 模拟 componentWillUnMount - useEffect 中返回一个函数。
  - 注意：此处不是真正的 WillUnMount：
    - useEffect 依赖 []，组件销毁是执行 fn，等于 WillUnMount。
    - useEffect 无依赖或依赖 [a, b]，组件更新时执行 fn。
      - 即，下一次执行 useEffect 之前，就会执行 fn，无论更新或卸载。

### 如何自定义 Hook？

- 就是正常写一个执行函数：
  - 函数名：useXxx。
- 基本逻辑、思路：
  - 定义 state：useState
  - 设计 state：useEffect
  - 返回

### React Hooks 性能优化

- useMemo：缓存数据。
- useCallback：缓存函数。

> 相当于 class 组件的 SCU 和 PureComponent。

### 使用 React Hooks 遇到哪些坑？

- 遇到的坑：
  - useState 初始化值，只有第一次有效。
  - useEffect 内部不能修改 state。
  - useEffect 可能出现死循环。

### Hooks 相比 HOC 和 Render Prop 有哪些优点？

- 本质就是自定义 Hook：
  - 将公共逻辑代码抽离，封装成自定义 Hook。
- **好处：**
  - 完全符合 Hooks 原有规则，没有其他要求，易于理解记忆。
  - 变量作用域，明确。
  - 不会产生组件嵌套。

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
> 准确的说：返回的函数，会在下一次 effect 执行之前，被执行。

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

## useEffect 执行总结

- useEffect 依赖 []，组件销毁时执行 fn，等同于 WillUnMount。
- useEffect 无依赖或依赖 [a, b]，组件更新时执行 fn。
  - 即，下一次执行 useEffect 之前，就会执行 fn，无论更新或卸载。

> fn 指的是 useEffect 返回的回调函数。

## useEffect 让纯函数有了副作用

- 默认情况下，执行纯函数，输入参数，返回结果：
  - 无副作用。
- 所谓副作用：
  - 就是对函数之外造成影响，如设置全局定时任务。
- 而组件需要副作用，所以需要 useEffect “钩” 入纯函数中。

> 因为需要，所以存在。———— 技术向业务妥协。

---

## 小结

- 函数组件更适合 React 组件，但需要 Hooks 增强功能。
- useState 可实现 state 和 setState。
- useEffect 可模拟组件主要的生命周期。

---

## 其他 Hooks

### useRef

- 获取 DOM 元素。
  - 场景：
    - 代码编辑器。
    - 富文本编辑器。
  - 有可能需要我们 DOM 节点去帮助渲染。这时候就要拿到 DOM 元素。

### useContext

- 跨组件传内容。

```js
// 创建 Context
const ThemeContext = React.createContext(themes.light);
// 发布出去 ThemeContext.Provider
function App() {
  return (
    <ThemeContext.Provider value={themes.dark}>
      {children}
    </ThemeContext.Provider>
  ); // 记得挂载在根目录，用 {children} 就能传给所有子组件。
}
```

```js
// 接收组件
const theme = useContext(ThemeContext);
function AcrossCom() {
  return <button style={{ background: theme.background }}>hello world</button>;
}
```

### useReducer

- 从实现上来看，很像 useState 的复杂版。
- 使用：
  - 当修改 state 的逻辑比较复杂时，可以使用 useReducer。

```js
important React, { useReducer } from 'react';

const initState = { count: 0 };

const reducer = (state, dispatch) => {
    switch (action.type) {
        case 'INCREMENT':
            return { count: state.count + 1 }
        case 'DECREMENT':
            return { count: state.count - 1 }
        default:
            return state;
    }
}

function App(){
    const [state, dispatch] = useReducer(reducer, initState);
    return <div>
        const: {state.count}
        <button onClick={() => dispatch({type:'INCREMENT'})}> ADD </button>
        <button onClick={() => dispatch({type:'DECREMENT'})}> SUB </button>
    </div>
}
```

#### useReducer 和 redux 的区别

- useReducer 是 useState 的代替方案，用于 state 复杂变化。
  - 也就是说 state 的变化比较复杂的话，useState 可能会应对不了。
    - 那 useReducer 可能会是一种更好的 '复杂变化' 的表达方式。
- useReducer 是单个组件状态管理，组件通讯还需要 props。
  - **它管不了跨组件，这一点是他与 redux 最大的区别。**
- **redux 是全局的状态管理，是多组件共享数据。**

### useMemo

- 性能优化：
  - 避免无意义的重复渲染。
- 分两步：
  - 第一步，对于可能不需要重复渲染的组件包括 memo。
    - 类似 class PrueComponent，对 props 进行浅层比较，判断是否要重新渲染。
  - 第二步，对于需要进行比较的数据进行 useMemo 包裹。
    - 用 useMemo 缓存数据，有依赖。
- **总结：**
  - React 默认会更新所有子组件。
  - class 组件使用 SCU 和 PureComponent 做优化。
  - Hooks 中使用 useMemo，但优化的原理是相同的。
    - 都是对 props 的浅层对比，进行优化。

```js
import React, { useState, memo, useMemo } from "react";

const [name, setName] = useState("cain");

// 这是第二步，对于需要进行比较的数据进行 useMemo 包裹
// 用 useMemo 缓存数据，有依赖。
const userInfo = useMemo(() => {
  return { name, age: 20 };
}, [name]);

// 子组件
// 这是第一步，对于可能不需要重复渲染的组件包括 memo。
// 类似 class PrueComponent，对 props 进行浅层比较，判断是否要重新渲染。
const Child = memo((props) => {
  const { userInfo } = props;
  console.log("Child render...", userInfo);

  return (
    <div>
      <p>
        This is Child {userInfo.name} {userInfo.age}
      </p>
    </div>
  );
});
```

#### 回顾下 shouldComponentUpdate

- react 的执行机制问题。
  - 避免无意义的重复渲染。

```js
// 演示 shouldComponentUpdate
shouldComponentUpdate(nextProps, nextState){
    if(nextState.count !== this.state.count){
        return true; // 可以渲染
    }
    return false // 不重复渲染
}
```

### useCallback

- 性能优化：
  - 优化原理类似 useMemo，不过是作用于函数方法。
- 总结：
  - useMemo 缓存数据。
  - useCallback 缓存函数。
  - 两者都是 React Hooks 的常见优化策略。

```js
import React, { useCallback } from "react";
import Child from "./child";

function Parent() {
  const handleChange = useCallback((e) => {
    console.log(e.target.value);
  }, []);

  return (
    <div>
      <Child onChange={handleChange} />
    </div>
  );
}
```

---

## 自定义 Hook

- 在 Hooks 这一块，是非常重要的功能：
  - 因为它体现了：
    - 我们怎么去 **'封装通用的功能'。**
    - 这在我们日常开发中，是非常常见的事情。
- 开发和使用第三方 Hooks 本质都是一样的：
  - 开发：自己写 '自定义 Hooks'，自己用。
  - 使用第三方 Hooks：直接用别人写好的 '自定义 Hooks'。
- 自定义 Hook 带来了无限的扩展性，接耦代码。
  - 扩展性极为重要。

> 这也是 React Hooks 牛逼的地方，就是你提供了一些基本功能给别人用，还能外带一些自定义的扩展能力。牛掰。

### 自定义 useAxios

- 本质：
  - 本质是一个函数，以 use 开头(重要)。
  - 内部可正常使用过 useState useEffect 获取其他 Hooks。
  - 自定义返回结果，格式不限。

```js
import React, { useState, useEffect } from "react";
import axios from "axios";

// 封装 axios 发送网络请求的自定义 Hook
function useAxios(url) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    // 利用 axios 发送网络请求
    setLoading(true);
    axios
      .get(url)
      .then((res) => {
        setData(res);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => setLoading(false)); // 发送一个 get 请求，返回一个Promise
  }, [url]);

  return [loading, data, error];
}

export default useAxios;
```

> 第三方 hooks: 1.https://nikgraf.github.io/react-hooks/ 2. https://github.com/umijs/hooks

---

## Hooks 使用规范（规则）

- 命名规范 useXxx。
- Hooks 使用规范，重要。
- 关于 Hooks 的调用顺序。

### 命名规范 useXxx

- 麻烦刻在 DNA 里。

### Hooks 使用规范

- 只能用于 'React 函数组件' 和 '自定义 Hooks' 中，其他地方不可以。
  - class 组件，不可以。
  - 普通函数，不可以。
  - ...
- **只能用于顶层代码，不能在循环、判断中使用 Hooks。**
  - 为什么？
    - 请看下文。

> 上述两条记不住，或者说忘记了咋办：1.typescript。2.eslint-plugin-react-hooks。

### 关于 Hooks 的调用顺序

- 解释：为什么 hooks 只能用于顶层代码，不能在循环、判断中使用 Hooks。
  - 无论是 render 还是 re-render，Hooks 调用顺序必须一致。
    - 如果 Hooks 出现在循环、判断里，则无法保证顺序一致。
      - **Hooks 严重依赖于调用顺序。**

---

## React Hooks 组件逻辑复用

### class 组件逻辑复用

- Mixins 早已废弃。
- 高阶组件 HOC。
  - 类似工厂模式的概念：
    - 将组件传给一个定义好的 '函数(也就是高阶组件的核心)'。
      - 此函数里面是一个 class，会定义好一些共用的 '方法' 和 '属性'。
      - 最后返回一个新的 class 组件。
  - **问题：**
    - 组件层级嵌套过多，不易渲染，不易调试。
    - HOC 会劫持 props，必须严格规范，容易出疏漏。
- Render Prop。
  - 1.用共用组件。
  - 2.传给共用组件一个函数（此函数为函数式组件）。
  - 3.经过共用 Mouse 组件加工后，放到其内部，在此返回一个新的 Mouse 组件。
    - 每个 Mouse 组件只因为传入的函数式组件的不同，而会有不同程度的不同。
  - **问题：**
    - 学习成本高，不易理解。
    - 只能传递纯函数，而默认情况下纯函数功能有限。

### React Hooks 组件逻辑复用

- 本质就是自定义 Hook：
  - 将公共逻辑代码抽离，封装成自定义 Hook。
- **好处：**
  - 完全符合 Hooks 原有规则，没有其他要求，易于理解记忆。
  - 变量作用域，明确。
  - 不会产生组件嵌套。

#### 自定义 Hook： useMousePosition

```js
import { useState, useEffect } from "react";

function useMousePosition() {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  useEffect(() => {
    function mouseMoveHandler(event) {
      setX(event.clientX);
      setY(event.clientY);
    }
    document.addEventListener("mousemove", mouseMoveHandler);
    return () => {
      document.removeEventListener("mousemove", mouseMoveHandler);
    };
  }, []);

  return [x, y];
}

export default useMousePosition;
```

---

## React Hooks 注意事项

- 遇到的坑：
  - useState 初始化值，只有第一次有效。
  - useEffect 内部不能修改 state。
  - useEffect 可能出现死循环。

### useState 初始化值，只有第一次有效。

- 核心本质：
  - 修改 state，只能通过 setState 修改。
- 现象：
  - render：初始化 state。
  - re-render：
    - 只恢复初始化的 state 值，不会再重新设置新的值。
      - 只能用 setName 修改。

```js
const [state, setState] = useState(obj.a); // 就算 obj.a 修改，但是 state 值不会变，其值仅能用 setState 修改。
```

- 解决方案：
  - 避免用 useState 的返回值，自行新增一个变量，代替 useState 的返回值，传入 useEffect 的定时任务。
    - 但是打破了纯函数的规则。 // 所以不推荐用此方式
  - 推荐方式：
    - useRef：

```js
const countRef = useRef(0);
// 然后传入 useEffect 的定时任务，代替 useState 的返回值。
useEffect(() => {
  const timer = setInterval(() => {
    setCount(++countRef.current);
  }, 1000);
}, []);
```

### useEffect 内部不能修改 state。

- 核心本质：
  - useEffect 的第二参数，[]为空数组。
    - 代表仅组件加载完触发一次 useEffect。
      - 故仅当第一次触发 useEffect 时，能修改一次 state。
      - 若是设置定时任务，在第一次修改后，后面均无法起效。

> 依赖为 [] 时：re-render 不会重新执行 effect 函数。

### useEffect 可能出现死循环。

- 现象：
  - useEffect 的第二参数 []，其依赖若有 '引用类型'，会出现死循环。
- 处理方法：
  - 可以将引用类型打散，再传入依赖：

```js
const config = { a, b, c };
useEffect(() => {}, [a, b, c]);
```
