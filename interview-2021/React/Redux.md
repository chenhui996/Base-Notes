# Redux 使用

- 基本概念。
- 单项数据流。
- react-redux。
- 异步 action。
- 中间价。

---

## 基本概念

- store state
- action
- reducer

```js
// 这是一个 reducer，形式为 (state, action) => state 的纯函数。
// 描述了 action 如何把 state 转变成下一个 state。
function counter(state = 0, action) {
  switch (action.type) {
    case "INCREMENT":
      return state + 1;
    case "DECREMENT":
      return state - 1;
    default:
      return state;
  }
}

// 创建 Redux store 来存放应用状态。
// API 是 { subscribe, dispatch, getState }
let store = createStore(counter);

// 可以手动订阅更新，也可以事件绑定到视图层。
// state 修改完后会触发
store.subscribe(() => {
  console.log(store.getState());
});

// 改变内部 state 的唯一方法是 dispatch 一个 action。
// action 可以被序列化，用日记记录和储存下来，后期还可以以回放的方式执行。
store.dispatch({ type: "INCREMENT" });
// 1
store.dispatch({ type: "INCREMENT" });
// 2
store.dispatch({ type: "DECREMENT" });
// 1
```

---

## 单项数据流概述

- dispatch(action)
- reducer -> new State
- subscribe 触发通知

---

## react-redux

> 面试中不会有太多的考点，但是是一个比较常用的东西。

- `<Provider>`
- connect
- mapStateToProps、mapDispatchToProps

### Provider store

- 两者搭配，将根组件包裹。
  - 根组件以及所有子组件都具有 store 的能力。

```js
important { Provider } from 'react-redux';
important { createStore } from 'redux';
important todoApp from './reducers'; // reducer

let store = createStore(todoApp);

export default function () {
    return (
        <Provider store={store}>
            <App />
        </Provider>
    )
}

```

```js
// redux 引用方

const CustomTodoList = connect()(TodoList);
export default VisibleTodoList;
```
