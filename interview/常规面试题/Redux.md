# Redux

- 以由浅入深、面向面试的方式，系统学习 Redux。
- 内容会分为 **几个阶段逐步递进**，结合：
  - 核心概念
  - 代码示例
  - 面试题解析

## 阶段1: Redux 基础概念

### 1.1 为什么需要 Redux？

- **问题背景**：
  - 前端应用复杂度增加（如 多组件 共享状态、异步操作、状态变更 跟踪困难）。
- **解决思路**：
  - redux：
    - 提供 **可预测的状态管理**。
    - 通过：
      - **单一数据源**
      - **严格的更新规则**
    - 让 **状态变化** 透明且可追踪。

### 1.2 redux 三大原则

- **单一数据源（single sourse of truth）**：
  - 整个应用的 **状态** 存储在 **唯一一个store** 的 **state 对象中**。
  - 类比：整个公司的财务数据 统一由 财务部门管理。
- **状态是只读的（state is read-only）**：
  - 修改状态的唯一方式是触发 `action`（一个描述 “发生了什么” 的普通对象）。
  - 类比：修改银行账户，必须填写申请表（action），不能直接修改数据库。
- **使用纯函数修改状态（Changes with Pure Reducers）**
  - 通过 `reducer` 函数接收 **旧状态** 和 **action**，**返回新状态**。
  - 纯函数特征：无副作用，同样输入必得同样输出。

---

## 阶段2: redux 核心概念详解

### 2.1 action

- **定义**：
  - 一个普通对象。
  - 描述发生了什么。
  - 是修改状态 的 **唯一** 信息来源。
- **结构**：

```js
{
    type: "ADD_TODO", // 必须的字符串类型标识
    payload: "Learn Redux" // 可选的数据载体
}
```

- **创建 action 的函数（action creator）**：

```js
const addTodo = (text) => {
    return {
        type: "ADD_TODO",
        payload: text
    }
}
```

### 2.2 reducer

- **定义**：纯函数，接收当前 `state` 和 `action`，返回新的 `state`。
- **示例**：

```js
const initialState = {
    todos: []
};

function todoReducer(state = initialState, action){
    switch (action.type){
        case "ADD_TODO":
            return {
                ...state,
                todos: [
                    ...state.todos,
                    action.payload
                ]
            }
        default: 
            return state; // 必须返回原 state 作为默认
    }
}
```

### 2.3 store

- **定义**：管理状态的容器，通过 `createStore` 创建。
- **核心方法**：
  - `getState()`: 获取当前状态。
  - `dispatch(action)`: 触发 action 更新状态。
  - `subscribe(listener)`: 监听状态变化。

### 2.4 数据流

- action -> dispatch -> reducer -> new state -> ui update

---

## 阶段3: redux 工作流程 示例

### 3.1 创建 store

```js
import {createStore} from 'redux';
const store = createStore(todoReducer);
```

### 3.2 触发 action

```js
store.dispatch(addTodo("learn redux"));
console.log(store.getState()); // {todos: ["learn redux"]}
```

### 3.3 监听状态变化

```js
const unsubscribe = store.subscribe(() => {
    console.log("state changed:", store.getState());
})

// 取消监听 
unsubscribe()
```

---

## 阶段4: redux 中间件（middleware）

### 4.1 中间件的作用

- **扩展 redux**：在 `dispatch` action 到 reducer 之前，插入自定义逻辑（如日志、异步操作）。
- **常见中间件**：`redux-thunk`（处理异步）、`redux-logger`（日志记录）。

### 4.2 中间件原理

- **函数链式调用**：中间件通过 **高阶函数** 组合，形成处理链。
- **签名**：

```js
const middleware = (store) => {
    return (next) => {
        return (action) => {
            // 前置逻辑
            const result = next(action); // 调用下一个中间件或 dispatch

            // 后置逻辑
            return result;
        }
    }
}
```

### 4.3 使用 applyMiddleware

```js
import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';

const store = createStore(reducer, applyMiddleware(thunk));
```

---

## 阶段5: redux 与 react 集成

### 5.1 `react-redux` 库

- `<Provider>`: 包裹 **根组件**，传递 store 到 **所有子组件**。

```js
import {Provider} from 'react-redux';

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
)
```

- `connect()`: 连接组件与 store（旧 API，现推荐使用 hooks）。

```js
import {connect} from 'react-redux';

const mapStateToProps = (state) => {
    return {
        todos: state.todos
    }
}

const mapDispatchToProps = {
    addTodo
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
```

- **Hooks API**: `useSelector`、`useDispatch` (更简洁)。

```js
import {useSelector, useDispatch} from 'react-redux';

const TodoList = () => {
    const todos = useSelector(state => state.todos);
    const dispatch = useDispatch();

    return (
        <button onClick={() => dispatch(addTodo("new task"))}>Add</button>
    )
};
```

---

## 阶段6：redux 优缺点（面试高频问题）

### 6.1 优点

- **状态可预测**：严格的 **数据流** 使调试更简单。
- **时间旅行调试**：可通过 **保存状态快照** 回溯历史。
- **生态丰富**：中间件、开发者工具支持完善。

### 6.2 缺点

- **模板代码多**：需编写 action、reducer、连接组件。
- **学习曲线陡峭**：概念较多（action、reducer、middleware）。
- **可能过度设计**：简单项目用 React 自身状态管理即可。

---

## 阶段7: 常见面试题与解析

### 1. Redux 的三大原则

- **单一数据源**：整个应用状态存储在单个 Store 中，简化调试和状态管理。
- **只读状态**：只能通过触发 Action 修改状态，确保变更可控。
- **纯函数 Reducer**：接收旧状态和 Action，返回新状态，保证可预测性。

### 2. Action 的定义

- action 是描述事件 的 普通对象，必须包含 type 字段。
- 他是触发 state 变更的唯一来源，确保 变更透明可追踪。

### 3. reducer 的作用

- Reducer 是纯函数，接收当前状态和 Action，返回新状态。
- 纯函数特性（无副作用、幂等性）保证状态变更可预测。

### 4. Store 的职责

- `getState()`: 获取当前状态。
- `dispatch(action)`：触发 Action 更新状态。
- `subscribe(listener)`：监听状态变化。
- `replaceReducer()`：替换 Reducer（热重载）。

### 5. Redux 数据流

- 用户触发 ui 事件（如点击按钮）。
- dispatch(action) 发送 action。
- reducer 根据 action 计算新 state。
- store 发生更新并通知所有订阅者。
- UI 发现状态发生改变后，重新渲染。

> 应用场景题

### 6. 如何处理异步操作？

- 回答：
  - 使用中间件如 `redux-thunk`，允许 action creator 返回函数，而不仅仅是对象。
  - 在函数中 执行异步操作 并 dispatch action。
- 代码示例：

```js
// 安装 redux-thunk 后配置 store 
import { applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';

const store = createStore(reducer, applyMiddleware(thunk));

// 异步 action creator
const fetchUser = (userId) => {
    return (dispatch) => {
        dispatch({type: 'FETCH_USER_REQUEST'});

        fetch(`/api/users/${userId}`)
            .then(res => res.json())
            .then(data => dispatch({
                type: "FETCH_USER_SUCCESS",
                payload: data
            }))
            .catch(error => dispatch({
                type: 'FETCH_USER_FAILURE',
                error
            }));
    }
}
```

### 7. 手写处理 `ADD_ITEM` 和 `REMOVE_ITEM` 的 Reducer

- **关键点**：保持状态不可变，使用展开运算符和 `filter`。

```js
const initialState = {items: []};


function itemsReducer(state = initialState, action){
    switch(action.type){
        case 'ADD_ITEM':
            return {
                ...state,
                items: [...state.item, action.payload]
            }
        case 'REMOVE_ITEM':
            return {
                ...state,
                items: state.items.filter(item => item.id !== action.payload.id)
            }
        default:
            return state;
    }
}
```

### 8. 使用 useSelector 读取状态

- 注意：useSelector 会自动订阅 Store，状态变化时组件重新渲染。

```js
import { useSelector } from 'react-redux';

const TodoList = () => {
  const todos = useSelector(state => state.todos);
  return (
    <ul>
      {todos.map(todo => <li key={todo.id}>{todo.text}</li>)}
    </ul>
  );
};
```

### 9. 时间旅行调试

- 时间旅行调试是指:
  - 能够 **回退或重放** 应用状态的变更历史。
  - 通过 Redux DevTools 插件，可以记录每个 Action 触发的状态快照，开发者可以“时间旅行”到 **任意历史状态** 进行调试。

### 10. 中间件的作用与日志中间件实现（进阶）

- 中间件在 `dispatch` 过程中插入自定义逻辑（如日志、异步处理）。
- **日志中间件示例**：

```js
const loggerMiddleware = store => next => action => {
    console.log("Dispatching:", action);
    const result = next(action); // 传递给下一个中间件或 dispatch
    console.log("New state:", store.getState());
    return result;
}

// 应用
const store = createStore(reducer, applyMiddleware(loggerMiddleware));
```

### 11. `connect` 函数的作用

- `connect` 是 `react-redux` 的高阶组件，用于将 react 组件连接到 redux store。
  - `mapStateToProps`：将 Store 状态映射到组件的 props。
  - `mapDispatchToProps`：将 `dispatch` 方法映射到组件的 props。
- 示例：

```js
const mapStateToProps = (state) => ({ todos: state.todos });
const mapDispatchToProps = { addTodo };

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
```

### 12. Redux vs React Context API

- **Redux**:
  - 适合大型应用，提供严格的单向数据流、中间件支持、事件旅行调试。
  - 缺点：模版代码多。
- **Context API**：
  - 适合中小型应用或局部状态共享，API更简单。
  - 缺点：缺乏中间件等高级功能，性能优化需手动处理。
