# Redux

## 在我们阅读教程之前

Redux 官方文档对 Redux 的定义是:

**一个可预测的 JavaScript 应用状态管理容器.**

这就意味着, Redux 是无法单独运作的, 它需要: 与 **"一个具体的 View 层的前端框架"** 相结合, 才能发挥出它的威力.

这里的 View 层包括但不限于 React、Vue 或者 Angular 等.

这里我们将使用 React 作为 **绑定视图层**, 因为 Redux 最初诞生于 React 社区.

为解决 React 的 "状态管理" 问题而 "设计和开发" 的一个库.

这篇教程将让你直观地感受 React 的"状态危机", 以及 Redux 是如何解决这一危机的, 从而能够更好地学习 Redux.

> 理解它的源起, 以及它将走向什么样的远方.

---

近来 React Hooks 确实很火, 展现出惊人的潜力, 甚至有人声称可以抛弃 Redux 了.

这种说法不完全正确, Redux 的成功其实不仅仅是因为这个框架本身, 还因为围绕其构建起来的 "生态系统".

**比如 Enhancers、Middlewares、还有诸如 redux-form, redux-immutable 等**

甚至还有基于 Redux 的上层框架: 

如 Dva 还有 Rematch, 这些都为 Redux 巩固了在 React 社区的王者地位.

> Redux 的 React 绑定库 react-redux 现在用 React Hooks 重构, 以求让代码更加精炼和高效.

---

## 开始 Redux 之旅

不管外界把 Redux 吹得如何天花乱坠, 实际上它可以用一张图来概括, 这张图也有利于帮助你思考前端的本质是什么：

1.Store -> 更新视图 -> View
2.View -> 发起更新动作 -> Reducers
3.Reducers -> 更新状态 -> Store
4.**S -> V -> R -> S...(loop)**

先来详解一下这张图, 并且在教程之后的内容中, 你会多次看到这张图以 "不同的形式" 出现.

希望学完本篇教程之后, 每当你想起 Redux 时, 脑海里就是上面这张图.

### View

首先我们来看 View, 在前端开发中, 我们称这个为 **视图层**.

就是 "展示给最终用户" 的效果, 在本篇教程的学习中, **我们的 View 就是 React**.

### Store

随着 "前端应用" 要完成的工作越来越丰富, 我们对前端也提出了要保持 "状态" 的要求.

- 在 React 中, 这个 "状态" 将保存在 ```this.state```.
- 在 Redux 中, 这个 "状态" 将保存在 ```Store```.

这个 ```Store``` 从 "抽象意义" 上来说, 可以看做一个前端的 "数据库".

它保存着前端的状态（state）, 并且 "分发这些状态" 给 View, 使得 View 根据这些 "状态" 渲染不同的内容.

> 注意到, Redux 是一个可预测的 JavaScript "应用状态管理" 容器, 这个 "状态容器" 就是这里的 Store.

### Reducers

我们日常生活中看到的网页, 它不是一成不变的, 而是会 "响应" 用户的 "动作".

无论是 "页面跳转" 还是 "登陆注册", 这些 "动作会改变" 当前 "应用的状态".

在 Redux 框架中, Reducers 的作用, 就是 **"响应不同的动作"**.

更精确地说, Reducers 是 **负责更新 Store 中状态的 JavaScript 函数**.

> 当我们对这 "三个核心概念" 有了粗略的认知之后, 就可以开始 Redux 的学习了.

---

## 准备初始代码

将初始 React 代码模板 Clone 到本地, 进入仓库, 并切换到 initial-code 分支（初始代码模板）：

```shell
git clone https://github.com/pftom/redux-quickstart-tutorial.git
cd redux-quickstart-tutorial
git checkout initial-code
```

安装项目依赖, 并打开开发服务器：

```shell
npm install
npm start
```

接着 React 开发服务器会打开浏览器, 如果你看到效果, 并且可以进行操作, 那么代表代码准备完成.

### 提示

> 由于我们使用 Create React App 脚手架, 它使用 Webpack Development Server（WDS）作为开发服务器.

> 因此在后面 "编辑代码" 的时候只需 "保存文件", 我们的 React 应用就会 **自动刷新**, 非常方便.

---

## 探索初始代码

我们完成的这个待办事项小应用, 如下面所示：

- 展示一个 todo 列表.(list)
- 当一个 todo 被点击时, 它将被加上 "删除线" 表示此 todo 已经完成.(completed)
- 加上了一个输入框, 使得用户可以增加新的 todo.(add)
- 在底部, 展示了三个按钮, 可以切换展示 todo 的类型.(check list -> all | active | completed)

整份 React 代码 "组件" 设计如下（首先是组件, 然后是组件所拥有的属性）：

- TodoList 用来展示 todo 列表：
  - todos: Array 是一个 todo 数组, 它其中的每个元素的样子类似 { id, text, completed }.
  - toggleTodo(id: number) 是当一个 todo 被点击时会调用的回调函数.
- Todo 是单一 todo 组件：
  - text: string 是这个 todo 将显示的内容.
  - completed: boolean 用来表示是否完成, 如果完成, 那么样式上就会给这个元素划上删除线.
  - onClick() 是当这个 todo 被点击时将调用的回调函数.
- Link 是一个 "展示过滤" 的按钮:
  - active: boolean 代表此时被选中, 那么此按钮将不能被点击.
  - onClick() 表示这个 link 被点击时将调用的回调函数.
  - children: ReactComponent 展示子组件.
- Footer 用于展示三个过滤按钮：
  - filter: string 代表此时的被选中的过滤器字符串, 它是 [SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE] 其中之一.
  - setVisibilityFilter() 代表 Link 被点击时将设置对应被点击的 filter 的回调函数.
- App 是 React 根组件:
  - 最终组合其他组件并使用 ReactDOM 对其进行编译渲染.
  - 我们在它的 state 上定义了上面的几个组件会用到的属性, 同时定义了其他组件会用到的方法.
  - 还有 nextTodoId, VisibilityFilters, getVisibleTodos 等一些辅助函数.

---

## 准备 Redux 环境

Redux 可以与 "多种视图层开发框架" 如 React, Vue 和 Angular 等搭配使用.

Redux 只是一个 "状态管理容器", 所以为了在 React 中使用 Redux, 我们还需要**安装一下对应的依赖**.

```shell
npm install redux
npm install react-redux
```

做得好！现在一切已经准备就绪, 相信你已经迫不及待的想要编写一点 Redux 相关的代码了.

别担心, 在下一节中, 我们将引出 Redux Store 的详细概念, 并且通过代码讲解它将替换 React 的哪个部分.

## 理解 Store: 数据的唯一真相来源

我们前面提到了 Store 在 Redux 中的作用是用来保存状态的, 相当于我们在前端建立了一个简单的 "数据库".

在目前的 "富状态前端应用" 中, 如果每一次状态的修改（例如点击一个按钮）都需要与后端通信, 那么整个网站的 "平均响应时间" 将变得难以接受, **用户体验将糟糕透顶**.

> 根据不完全统计："一个网站能留住一名用户的时间只有 8S, 如果你在 8S 内不能吸引住用户, 或者网站出现了问题, 那么你将彻底地丢失这名用户！"

所以为了适应用户的访问需求, 聪明的 "前端拓荒者们" 开始将后端的 "数据库" 理念引入到前端中.

**这样大多数的 "前端状态" 可以直接在前端搞定, 完全不需要后端的介入.**

---

## React 状态"危机"

在 React 中, 我们将 "状态" 存在每个组件的 this.state 中, 每个组件的 state 为组件所私有.

如果要在 "一个组件中" 操作 "另外一个组件", 实现起来是 **相当繁琐** 的.(react 的逐层传递)

## 解救者：Store

React 诞生的初衷就是为了更好、更高效率地编写用户界面 , 它不应该也不需要来承担 "状态管理" 的职责.

**于是备受折磨的前端拓荒者们构想出了伟大的 Store.**

我们完全不需要, 让每个组件 "单独保持状态", 直接 "抽离所有组件的状态", 类比 React 组件树, 构造一个 **中心化的状态树**.

这棵 **状态树** 与 **React 组件树** 一一对应, 相当于对 React 组件树进行了 **状态化建模**：

```js
let stateTree = {
  A:{
    B,
    C,
  }
}
```

可以看到, 我们将组件的 state 去掉, 取而代之的是一棵状态树, **它是一个普通的 JavaScript 对象**.

通过 **对象的嵌套** 来 "类比" 组件的 **嵌套组合**, 这棵由 **JavaScript 对象建模的状态树** 就是 Redux 中的 Store.

当我们将 "组件的状态" 抽离出去之后, 我们在使用组件 B 操作组件 C 就变得相当 "简单且高效".

---

我们在组件 B 中发起一个更新状态 C 的动作, 此动作对应的更新函数更新 Store 状态树.

之后将 "更新后的状态 C" 传递给 "组件 C", 触发 "组件 C" 的 **重新渲染**.

---

可以看到, 当我们引入这种机制之后, 组件 B 与组件 C 之间的**交互就能够单独进行**.

不会影响 React 组件树中的其他组件, 也 **不需要传递很深层级** 的 handleClick 函数了.

**不需要把更新后的 state 一层一层地传给组件 C, 性能有了质的飞跃.**

有了 Redux Store 之后:

- 所有 React 应用中的 **"状态修改"** 都是对这棵 **"JavaScript 对象树"** 的修改.
- 所有 **"状态的获取"** 都是从这棵 **"JavaScript 对象树"** 获取.

> 这棵 JavaScript 对象代表的状态树, 成了整个应用的 **"数据的唯一真相来源"**.

---

## 打湿你的双手

了解了 Redux Store 之于 React 的作用之后, 我们马上在 React 中应用 Redux.

看看神奇的 Store 是如何介入并产生如此大的变化的.

我们修改 "初始代码模板" 中的 ```src/index.js```, 修改后的代码如下：

```js
import React from "react";
import ReactDOM from "react-dom";
import App, { VisibilityFilters } from "./components/App";

import { createStore } from "redux";
import { Provider } from "react-redux";

const initialState = {
  todos: [
    {
      id: 1,
      text: "你好, 图雀",
      completed: false
    },
    {
      id: 2,
      text: "我是一只小小小小图雀",
      completed: false
    },
    {
      id: 3,
      text: "小若燕雀, 亦可一展宏图！",
      completed: false
    }
  ],
  filter: VisibilityFilters.SHOW_ALL
};

const rootReducer = (state, action) => {
  return state;
};

const store = createStore(rootReducer, initialState);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
```

可以看到, 上面的代码做了下面几项工作：

- **我们首先进行了导包操作:**
  - 从 redux 中导出了 createStore.
  - 从 react-redux 导出了 Provider.
  - 从 src/components/App.js 中导出了 VisibilityFilters.
- **接着我们定义了一个 initialState 对象:**
  - 这将作为我们之后创建 Store 的 "初始状态数据".
  - 也是我们之前提到的那棵 JavaScript 对象树的 "初始值".
- **然后我们定义了一个 rootReducer 函数：**
  - 它是一个箭头函数：
    - 接收 ```state``` 和 ```action``` 然后返回 ```state```.
    - **这个 "函数" 目前还没有完成任何工作.**
      - 但是它是创建 Store 所 **必须的参数** 之一.
      - 我们将在之后的 Reducers 中 **详细讲解** 它.
- **再接着, 我们调用之前导出的 Redux API：**
  - ```createStore``` 函数:
    传入定义的 rootReducer 和 initialState , **生成了我们本节的主角：store！**
- 最后我们在 App 组件的最外层使用 Provider 包裹.
  - 并接收我们上一步创建的 store 作为参数.
    - 这确保之后, 我们可以在子组件中访问到 store 中的状态.
  - Provider 是 react-redux 提供的 API.
    - 是 Redux 在 React 使用的绑定库.
      - **它搭建起 Redux 和 React 交流的桥梁.**

现在我们已经创建了 Store, 并使用了 React 与 Redux 的绑定库 react-redux 提供的 Provider 组件.

**Provider 组件, 将 Store 与 React 组件组合在了一起.**

我们马上来看一下整合 Store 与 React 之后的效果.

打开 ```src/components/App.js``` , 修改代码如下：

```js
import React from "react";
import AddTodo from "./AddTodo";
import TodoList from "./TodoList";
import Footer from "./Footer";

import { connect } from "react-redux";

// 省略了 VisibilityFilters 和 getVisibleTodos 函数...

class App extends React.Component {
  constructor(props) {
    super(props);

    this.toggleTodo = this.toggleTodo.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.setVisibilityFilter = this.setVisibilityFilter.bind(this);
  }

  // 省略中间其他方法...

  render() {
    const { todos, filter } = this.props;

    return (
      <div>
        <AddTodo onSubmit={this.onSubmit} />
        <TodoList
          todos={getVisibleTodos(todos, filter)}
          toggleTodo={this.toggleTodo}
        />
        <Footer
          filter={filter}
          setVisibilityFilter={this.setVisibilityFilter}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  todos: state.todos,
  filter: state.filter
});

export default connect(mapStateToProps)(App);
```

可以看到, 上面的代码做了这几项工作：

- **首先我们从 react-redux 绑定库里面导出了 connect 函数.**
- **然后在文件底部, 我们定义了一个 mapStateToProps 箭头函数:**
  - 它接收 state 和 props:
    - state:
      - 就是我们那棵 Store 里面保存的 **JavaScript 对象状态树**.
      - 目前就是我们在 "上一个文件中" 定义的 initialState 内容.
    - props:
      - 就是我们熟悉的原 React 组件的 props, 它对于 mapStateToProps 是一个可选参数.
  - mapStateToProps 函数就是:
    - 可以 "同时操作" 组件的 "原 props" 和 "Store 的状态", 然后 "合并" 成 "最终的组件 props"（当然这里我们并没有使用原组件 props 内容）.
      - 并通过 "connect 函数" 传递给 App 组件.
- **connect 函数接收 mapStateProps 函数:**
  - 获取 mapStateProps 返回的 "最终组合后的状态".
    - 将其注入到 App 组件中, 返回一个新的组件.
      - 交给 export default 导出.
- **经过上面的工作:**
  - 我们在 App 组件中, 就可以取到通过 mapStateToProps 返回的 { todos, filter } 内容了.
  - 我们通过对象解构, 从 this.props 拿到 todos 和 filter 属性.
- **最后我们删除不再需要的 constructor 中的 this.state 内容.**

> **注意**
> connect 其实是一个高阶函数
> 这里 connect 通过, 接收 mapStateToProps.
> 然后调用返回一个 "新函数", 接着这个 "新函数" 再接收 App 组件作为参数.
> 通过 mapStateToProps 注入 todos 和 filter 属性.
> **最后返回注入后的 App 组件.**

> **提示**
> 这里之所以我们能在 App 组件中, 通过 mapStateToProps 拿到 Store 中保存的 **JavaScript 对象状态树**.
> 是因为我们在之前通过 **Provider 包裹了 App 组件**, 并将 **store 作为属性传递给了 Provider**.

---

## 再现 Redux 环形图

现在再来看一看我们在第一步骤中提到的环形图.

- 我们现在处于这个流程的第一步:
  - **即将 Store 里面的 "状态" 传递到 View 中.**
- 具体我们是通过 React 的 Redux 绑定库:
  - **react-redux 中的 connect 实现的.**

> 保存改变的内容, 如果你的 React 开发服务器打开着, 那么你应该可以在浏览器中看到新内容.

---

## 小结

恭喜你！你已经成功编写了 Redux 的 Store, 完成将 Redux 整合进 React 工作的 1/3. 

通过在 React 中接入 Store, 你成功的将 Redux 和 React 之间的数据打通, 并删除了 this.state , 使用 Store 的状态来取代 this.state.

但是！当你此时点击 Add Todo 按钮, 你的浏览器应该会显示出红色的错误, 因为我们已经删除了 this.state 的内容.

所以在 onSubmit 方法中读取 this.state.todos 就会报错.**别担心, 我们将在下一节中： ```Action``` 中讲解如何解决这些错误.**

---

## 理解 Action: 改变 State 的唯一手段

欢迎来到 Redux Action 环节.

这一节我们就来讲一讲, 如何修改 Redux Store 中保存的状态.

我们已经创建好了 Store, 并在里面存储了一棵 JavaScript 对象状态树.

> 我们通过 "发起更新动作" 来修改 Store 中保存的状态.

## Action 是什么？

在 Redux 的概念术语中, 更新 Store 的状态 **有且仅有** 一种方式：

**那就是调用 ```dispatch``` 函数, 传递一个 ```action``` 给这个函数 .**

一个 Action 就是一个简单的 JavaScript 对象：

```js
let action = { type: 'ADD_TODO', text: '我是一只小小小图雀' }
```

我们可以看到:

- 一个 action 包含 **动作的类型**, 以及更新状态 **需要的数据**.
  - ```type```:
    - **是必须的, 其它内容都是可选的.**
  - ```text```:
    - 代表我们发起 ```type``` 为 ```ADD_TODO``` 的动作是, 额外传递了一个 ```text``` 内容.

所以如果我们需要更新 Store 状态, 那么就需要类似下面的函数调用：

```js
dispatch({ type: 'ADD_TODO', text: '我是一只小小小图雀' })
```

---

## 使用 Action Creators

创建 Action 时, 有时候有些内容是固定的, 比如我们的 "待办事项添加" 教程的 Action, 有三个字段, 分别是 type, text, id.

我们可能会要在多个地方可以 dispatch 这个 Action, 那么我们每次都需要写下面长长的一串：

```js
{ type: 'ADD_TODO', text: '我是一只小小小图雀' , id: 0}
{ type: 'ADD_TODO', text: '小若燕雀, 亦可一展宏图' , id: 1}
...
{ type: 'ADD_TODO', text: '欢迎你加入图雀社区！' , id: 10}

```

对 JavaScript 函数比较熟悉的同学, 可能就知道该如何解决这种问题.

**是的, 我们只需要 "定义一个函数", 然后传入 "需要变化的参数" 就可以了.**

```js
let nextTodoId = 0;

const addTodo = text => ({
    type: "ADD_TODO",
    id: nextTodoId++,
    text
});

export { addTodo }
```

这种接收一些需要修改的参数, 返回一个 Action 的函数在 Redux 中被称为 ->  **Action Creators（动作创建器）**.

当我们使用 Action Creators 来创建 Action 之后, 我们再想要修改 Store 的状态就变成了下面这样：

```js
dispatch(addTodo('我是一只小小小图雀'))
```

可以看到, 我们的逻辑大大简化了.

> 每次发起一个新的 "ADD_TODO" action, 都只需要传入对应的 text.

---

## 与 React 整合

了解了 Action 的 "基础概念" 之后, 我们马上来尝试一下如何在 React 中发起 "更新动作".

- 首先, 我们在 ```src``` 文件夹下面创建 ```actions``` 文件夹.
  - 然后在 ```actions``` 文件夹下创建 ```index.js``` 文件.
    - 并在里面添加下面的 ```Action Creators```:

```js
let nextTodoId = 0;

const addTodo = text => ({
    type: "ADD_TODO",
    id: nextTodoId++,
    text
});

export { addTodo }
```

> 因为在使用 Redux 的 React 应用中, 我们将需要创建大量的 Action 或者 Action Creators.

> 所以 Redux 社区的 "最佳实践" 推荐我们:
>> 创建一个独立的 actions文件夹, 并在这个文件夹里面, 编写特定的 Action 逻辑.

可以看到, 我们加入了一个 addTodo Action Creator:

- 它接收 text 参数.
- 每次自增一个 id.
- 返回:
  - **带有 id 和 text.**
  - **类型为 "ADD_TODO" 的 Action.**

---

接着我们修改 src/components/AddTodo.js 文件.

将之前的 onSubmit 替换成以 dispatch(action) 的形式来修改 Store 的状态:

```js
import React, { useRef } from "react";
import { connect } from "react-redux";
import { addTodo } from '../actions';

const AddTodo = ({ dispatch }) => {
  let inputRef = useRef();

  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault();
          if (!inputRef.current.value.trim()) {
            return;
          }
          dispatch(addTodo(inputRef.current.value));
          inputRef.current.value = "";
        }}
      >
        <input ref={inputRef} />
        <button type="submit">Add Todo</button>
      </form>
    </div>
  );
};

export default connect()(AddTodo);
```

可以看到, 上面的代码做了这几项改变：

- **首先我们从 react-redux 中导出了 connect 函数:**
  - 它负责将 Store 中的状态注入组件, 同时:
    - 还给组件传递了一个 "额外的方法": ```dispatch```.
    - 这样我们就可以, 在组件的 props 中 "获取这个方法".
      - 注意到, 我们在 AddTodo 函数式组件中, 使用了 "对象解构" 来获取 dispatch 方法.
- **导出了我们刚刚创建的 addTodo Action Creators.**
- **之后我们使用使用 addTodo:**
  - 接收 input.value 输入值.(text)
  - 创建一个类型为 "ADD_TODO" 的 Action.(addTodo 的内部实现)
  - 并使用 dispatch 函数将这个 Action 发送给 Redux.
    - 请求更新 Store 的内容.
    - **更新 Store 的状态需要 Reducers 来进行操作.**
      - 我们将在 Reducer 中详细讲解它.

因为我们已经, 将直接修改 todo 的 setState 的 onSubmit, 换成了 dispatch 一个 Action.

所以我们删除 src/components/App.js 相应的代码, 因为我们现在已经不需要它们了:

```js
import React from "react";
import AddTodo from "./AddTodo";
import TodoList from "./TodoList";
import Footer from "./Footer";

import { connect } from "react-redux";

export const VisibilityFilters = {
  SHOW_ALL: "SHOW_ALL",
  SHOW_COMPLETED: "SHOW_COMPLETED",
  SHOW_ACTIVE: "SHOW_ACTIVE"
};

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case VisibilityFilters.SHOW_ALL:
      return todos;
    case VisibilityFilters.SHOW_COMPLETED:
      return todos.filter(t => t.completed);
    case VisibilityFilters.SHOW_ACTIVE:
      return todos.filter(t => !t.completed);
    default:
      throw new Error("Unknown filter: " + filter);
  }
};

const App = (props) => {
  const { todos, filter } = props;

  const toggleTodo = (id) => {
    // setTodos(todos.map(todo =>
    //   todo.id === id ? { ...todo, completed: !todo.completed } : todo
    // ));
  }

  const setVisibilityFilter = (filter) => {
    // setFilter(filter);
  }

  return (
    <div>
      <AddTodo />
      <TodoList
        todos={getVisibleTodos(todos, filter)}
        toggleTodo={toggleTodo}
      />
      <Footer
        filter={filter}
        setVisibilityFilter={setVisibilityFilter}
      />
    </div>
  );

}

const mapStateToProps = (state, props) => ({
  todos: state.todos,
  filter: state.filter
});

export default connect(mapStateToProps)(App);
```

可以看到:

- 我们删除了 nextTodoId , 因为我们已经在 src/actions/index.js 中重新定义了它.
- 接着我们删除了 onSubmit 方法.
- 最后我们删除了传递给 AddTodo 组件的 onSubmit 方法.

保存修改的内容, 我们在 "待办事项小应用" 的 "输入框" 里面输入点内容, 然后点击 Add Todo 按钮.

**我们发现, 将不会报错, 但是无反应.（因为 Reducers 还未就位）**

## 小结

在这一节中, 我们完成了 Redux 状态环形图的第二个部分, 即发起更新动作.

我们首先讲解了:

- 什么是 Action 和 Action Creators.
- 然后通过 dispatch(action) 的方式, 来发起一个更新 Store 中状态的动作.

当我们使用了 dispatch(action) 之后.

传递给子组件, 用来修改父组件 State 的方法就不需要了, 所以我们在代码中删除了它们.

> 在我们的 AddTodo 中, 这个方法就是 onSubmit.

但是有一点遗憾就是:

- 虽然删除了 onSubmit 方法.
- 但是我们这一节中 "讲到和实现" 的 dispatch(action) :
  - 还只能完成之前 onSubmit 方法的一半功能.
    - **即发起修改动作.**
  - **但是我们目前还无法修改 Store 中的状态.**
- 为了修改 Store 中的 State:
  - **我们需要定义 Reducers.**
    - 用于响应我们 dispatch 的 Action.
    - 并根据 Action 的要求修改 Store 中对应的数据.

---

## 理解 Reducers: 响应 Action 的指令

在这一节中, 我们马上来了结上一节中留下的遗憾.

> 即我们好像放了一声空炮, dispatch 了一个 Action, 但是没有收获任何效果.

首先祭出我们万能的 Redux 状态循环:

我们已经完成了前两步了, 离 Redux 整合进 React 只剩下最后一个步骤.

> 即 "响应" 从 "组件中 dispatch" 出来 Action, 并 "更新 Store 中的状态".

> 这在 Redux 的概念中, 被称之为 Reducers.

### 纯化的 Reducers

reducer 是一个普通的 JavaScript 函数.

它接收两个参数：```state``` 和 ```action```：

- ```state```: Store 中存储的那棵 JavaScript 对象状态树.
- ```action```: 组件中 dispatch 的那个 Action.(addTodo)

```js
reducer(state, action) {
  // 对 state 进行操作
  return newState;
}
```

reducer 根据 action 的指示, 对 state 进行对应的操作, 然后 **"返回操作后的 state"**.

**Redux Store 会 "自动保存" 这份新的 state.**

> 注意

> Redux 官方社区对 reducer 的约定是一个纯函数.
> **即我们不能直接修改 state, 而是可以使用 {...} 等对象解构手段, 返回一个被修改后的新 state.**

> 比如我们对 state = { a: 1, b: 2 } 进行修改, 将 a 替换成 3.
> 我们应该这么做：newState = { ...state, a: 3 }, 而不应该 state.a = 3.

> 这种 "不直接修改原对象", 而是 "返回一个新对象的修改", 我们称之为 "纯化" 的修改.

---

### 准备响应 Action 的修改

当了解了 Reducer 的概念之后，我们马上在应用中, 响应我们之前 dispatch 的 Action.

打开 src/index.js，对 rootReducer 作出如下修改：

```js
// ...

const rootReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TODO": {
      const { todos } = state;

      return {
        ...state,
        todos: [
          ...todos,
          {
            id: action.id,
            text: action.text,
            completed: false
          }
        ]
      };
    }
    default:
      return state;
  }
};

// ...
```

上面的代码做了这么几项工作:

- **可以看到，我们将之前的 rootReducer 进行改进:**
  - 从单纯地返回原来的 state，变成了一个 switch 语句.
  - 在 switch 语句中**对 action 的 type 进行判断**，然后做出对应的处理。
- **当 action.type 的类型为 "ADD_TODO" 时:**
  - 我们从 state 中取出了 todos.
  - 然后使用 {...} 语法给 todos 添加一个 "新的元素对象 - {}".
    - 并设置 completed 属性为 false 代表此 todo 未完成.
  - 最后再通过一层 {...} 语法将新的 todos 合并进老的 state 中.
    - 返回这个新的 state.
- **当 action.type 没有匹配 switch 的任何条件时:**
  - 我们返回默认的 state，表示 state 没有任何更新。

当我们对 rootReducer 函数做了上述的改动之后.

Redux 通过 Reducer 函数, 就可以 "响应": 从组件中 dispatch 出来的 action 了.

目前, 我们还只可以响应 action.type 为 "ADD_TODO" 的 action: **它表示新增一个 todo**.

> 保存修改的代码，打开浏览器，在输入框里面输入点内容，然后点击 Add Todo 按钮.

> 现在网页应该可以 "正确响应你的操作" 了，我们又可以愉快地 "添加新的待办事项" 了.

---

## 小结

在这一小节中，我们实现了:

- 第一个可以响应组件 dispatch 出来的 Action 的 Reducer.
  - 它判断 action.type 的类型.
  - 根据这些类型对 state 进行 “纯化” 的修改.
  - 当 action.type 没有匹配 Reducer 中任何类型时，我们返回原来的 state.

当了解了 Redux 三大概念：Store，Action，Reducers 之后, 我们再来看 dispatch 、 reducers 和 connect 所完成的工作:

- ```dispatch(action)```:
  - **用来在 React 组件中, 发出修改 Store 中 "保存状态" 的指令.**
  - 在我们需要 "新加一个待办事项" 时:
    - 它 "取代" 了 "之前定义" 在组件中的 onSubmit 方法.
- ```reducer(state, action)```:
  - **用来根据这一指令修改 Store 中保存状态对应的部分.**
  - 在我们需要 "新加一个待办事项" 时:
    - 它 "取代" 了 "之前定义" 在组件中的 setTodos 操作.
- ```connect(mapStateToProps)```:
  - **用来将 "更新好的数据" 传给组件, 然后触发 React 重新渲染，显示最新的状态.**
  - **它架设起 Redux 和 React 之间的数据通信桥梁.**

> 现在，Redux 的核心概念你已经全部学完了，并且我们的应用已经完全整合了 Redux.

> 但是，我们还有一点工作没有完成: 那就是将整个应用完全使用 Redux 重构.

> 故，我们将使用我们在上面三节学到的知识，一步一步将我们的 "待办事项应用" 的 "其他部分" 重构成 Redux.

---
---

## 第二部分: 引入 combineReducers 拆分和组合状态逻辑

在这一部分中，我们将趁热打铁.

运用上篇教程学到的 Redux 三大核心概念, 将待办事项的 "剩下部分重构完成".

它涉及到:

- 将 TodoList 和 Footer 部分的相关代码重构到 Redux.
- 使用 Redux combineReducers API 进行 "逻辑拆分和组合".
  - 使得我们可以在使用 Redux 便利的同时，又不至于让 "应用的逻辑" 看起来臃肿不堪.
  - 复用 React 组件化的便利，我们可以让 "状态的处理" 也 "组件化".

## 重构代码：将 TodoList 部分迁移到 Redux

此时如果你在 "浏览器里面" 尝试这个 "待办事项小应用"，你会发现它还 "只可以添加新的待办事项".

**对于 "完成和重做待办事项" 以及 "过滤查看待办事项" 这两个功能，目前我们还没有使用 Redux 实现.**

所以当你 "点击单个待办事项" 时，浏览器会报错.(若之前函数内容已注释，则表现为无反应，空炮)

同样, 当你 "点击底部的三个过滤器按钮" 时，浏览器不会有任何反应.

> 在这一小节中，我们将使用 Redux 重构 “完成和重做待办事项” 功能.
> 即你可以通过 "点击某个待办事项" 来完成它.

**我们将运用 "Redux 最佳实践的开发方式" 来重构这一功能:**

- 定义 Action Creators.
- 定义 Reducers.
- ```connect``` 组件以及, 在组件中 ```dispatch Action```.

> 以后在开发 Redux 应用的时候，都可以使用 "这三步流程" 来周而复始地开发新的功能，或改进现有的功能.

---

### 定义 Action Creators

首先我们要定义 "完成待办事项" 这一功能所涉及的 Action.

打开 ```src/actions/index.js```，修改内容内容如下:

```js
let nextTodoId = 0;

const addTodo = text => ({
  type: "ADD_TODO",
  id: nextTodoId++,
  text
});

const toggleTodo = id => ({
  type: "TOGGLE_TODO",
  id
});

export { addTodo, toggleTodo }
```

可以看到，我们定义并导出了一个 toggleTodo 箭头函数:

**它接收 id 并返回一个类型为 "TOGGLE_TODO" 的 Action.**

---

### 定义 Reducers

接着我们来定义响应 dispatch(action) 的 Reducers.

打开 src/index.js，修改 rootReducer 函数如下:

```js
import React from "react";
import ReactDOM from "react-dom";
import App, { VisibilityFilters } from "./components/App";

import { createStore } from "redux";
import { Provider } from "react-redux";

const initialState = {
  todos: [
    {
      id: 1,
      text: "你好, 图雀",
      completed: false
    },
    {
      id: 2,
      text: "我是一只小小小小图雀",
      completed: false
    },
    {
      id: 3,
      text: "小若燕雀，亦可一展宏图！",
      completed: false
    }
  ],
  filter: VisibilityFilters.SHOW_ALL
};

const rootReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TODO": {
      const { todos } = state;

      return {
        ...state,
        todos: [
          ...todos,
          {
            id: action.id,
            text: action.text,
            completed: false
          }
        ]
      };
    }

    case "TOGGLE_TODO": {
      const { todos } = state;

      return {
        ...state,
        todos: todos.map(todo =>
          todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
        )
      };
    }
    default:
      return state;
  }
};

const store = createStore(rootReducer, initialState);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
```

可以看到，我们在 switch 语句里面添加了一个 "TOGGLE_TODO" 的判断.

并根据 action.id 来 "判断对应操作的 todo":

- 取反它目前的 completed 属性.
- 用来表示 "从完成到未完成"，或 "从未完成到完成" 的操作.

### connect 和 dispatch(action)

当定义了 Action，声明了响应 Action 的 Reducers 之后.

我们开始定义 React 和 Redux 交流的接口:

- connect 和 dispatch.
  - connect: 将 Redux Store 的内容整合进 React.
  - dispatch: 从 React 中发出操作 Redux Store 的指令.

我们打开 src/components/TodoList.js 文件，对文件内容作出如下的修改:

```js
import React from "react";
import PropTypes from "prop-types";
import Todo from "./Todo";

import { connect } from "react-redux";
import { toggleTodo } from "../actions";

const TodoList = ({ todos, dispatch }) => (
  <ul>
    {todos.map(todo => (
      <Todo
        key={todo.id}
        {...todo}
        onClick={() => dispatch(toggleTodo(todo.id))}
      />
    ))}
  </ul>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      completed: PropTypes.bool.isRequired,
      text: PropTypes.string.isRequired
    }).isRequired
  ).isRequired
};

export default connect()(TodoList);
```

可以看到，我们对文件做出了以下几步修改:

- **首先从 react-redux 中导出 connect 函数:**
  - 它负责给 TodoList 传入 dispatch 函数.
  - 使得我们可以在 TodoList 组件中 dispatch Action.(const { dispatch } = props)
- **然后我们导出了 ```toggleTodo``` Action Creators:**
  - 并将之前从父组件接收 toggleTodo 方法并调用的方式, 改成:
    - 当 Todo 被点击之后，我们 dispatch(toggle(todo.id)).
- **我们删除 propsTypes 中不再需要的 toggleTodo.**

### 删除无用代码

当我们通过以上三步整合了 Redux 的内容之后，我们就可以删除原 App.js 中不必要的代码了.

打开 ```src/components/App.js``` 修改内容如下:

```js
import React from "react";
import AddTodo from "./AddTodo";
import TodoList from "./TodoList";
import Footer from "./Footer";

import { connect } from "react-redux";

export const VisibilityFilters = {
  SHOW_ALL: "SHOW_ALL",
  SHOW_COMPLETED: "SHOW_COMPLETED",
  SHOW_ACTIVE: "SHOW_ACTIVE"
};

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case VisibilityFilters.SHOW_ALL:
      return todos;
    case VisibilityFilters.SHOW_COMPLETED:
      return todos.filter(t => t.completed);
    case VisibilityFilters.SHOW_ACTIVE:
      return todos.filter(t => !t.completed);
    default:
      throw new Error("Unknown filter: " + filter);
  }
};

const App = (props) => {
  const { todos, filter } = props;

  const setVisibilityFilter = (filter) => {
    // setFilter(filter);
  }

  return (
    <div>
      <AddTodo />
      <TodoList
        todos={getVisibleTodos(todos, filter)}
      />
      <Footer
        filter={filter}
        setVisibilityFilter={setVisibilityFilter}
      />
    </div>
  );

}

const mapStateToProps = (state, props) => ({
  todos: state.todos,
  filter: state.filter
});

export default connect(mapStateToProps)(App);
```

可以看到:

- 我们删除了 toggleTodo 方法.
- 并对应删除了 toggleTodo 定义, 以及传给 TodoList 的 toggleTodo 属性.

保存上述修改的代码，打开浏览器，你应该又可以 "点击单个待办事项" 来 "完成和重做" 它了:

## 小结

在本节中，我们介绍了 "开发 Redux 应用的最佳实践".

并通过重构 "完成和重做待办事项“ 这一功能来 "详细实践" 了这一 "最佳实践".

---

## 重构代码：将 Footer 部分迁移到 Redux

这一节中，我们将继续重构剩下的部分。我们将继续遵循上一节提到的 Redux 开发的最佳实践:

- 定义 Action Creators
- 定义 Reducers
- connect 组件以及, 在组件中 dispatch Action.

### 定义 Action Creators

打开 ```src/actions/index.js``` 文件，修改内容如下:

```js
let nextTodoId = 0;

const addTodo = text => ({
    type: "ADD_TODO",
    id: nextTodoId++,
    text
});

const toggleTodo = id => ({
    type: "TOGGLE_TODO",
    id
});

const setVisibilityFilter = filter => ({
    type: "SET_VISIBILITY_FILTER",
    filter
});

export { addTodo, toggleTodo, setVisibilityFilter }
```

可以看到:

- 我们创建了一个名为 setVisibilityFilter 的 Action Creators
  - 它接收 filter 参数.
  - 然后返回一个类型为 "SET_VISIBILITY_FILTER" 的 Action.

### 定义 Reducers

打开 ```src/index.js 文件```，修改代码如下:

```js
import React from "react";
import ReactDOM from "react-dom";
import App, { VisibilityFilters } from "./components/App";

import { createStore } from "redux";
import { Provider } from "react-redux";

const initialState = {
  todos: [
    {
      id: 100,
      text: "你好, 图雀",
      completed: false
    },
    {
      id: 101,
      text: "我是一只小小小小图雀",
      completed: false
    },
    {
      id: 102,
      text: "小若燕雀，亦可一展宏图！",
      completed: false
    }
  ],
  filter: VisibilityFilters.SHOW_ALL
};

const rootReducer = (state, action) => {
  console.log('in-rootReducer', action);
  switch (action.type) {
    case "ADD_TODO": {
      const { todos } = state

      return {
        ...state,
        todos: [
          ...todos,
          {
            id: action.id,
            text: action.text,
            completed: false
          }
        ]
      }
    }
    case "TOGGLE_TODO": {
      const { todos } = state

      return {
        ...state,
        todos: todos.map(todo =>
          todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
        )
      }
    }
    case "SET_VISIBILITY_FILTER": {
      return {
        ...state,
        filter: action.filter
      }
    }
    default: {
      return state;
    }
  }

};

const store = createStore(rootReducer, initialState);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
```

可以看到:

- 我们增加了一条 case 语句.
  - 来响应 "SET_VISIBILITY_FILTER" Action.
  - 通过接收新的 filter 来更新 Store 中的状态.

### connect 和 dispatch(action)

打开 ```src/components/Footer.js``` 文件，修改内容如下:

```js
import React from "react";
import Link from "./Link";
import { VisibilityFilters } from "./App";
import { connect } from "react-redux";
import { setVisibilityFilter } from '../actions'

const Footer = ({ filter, dispatch }) => (
  <div>
    <span>Show: </span>
    <Link
      active={VisibilityFilters.SHOW_ALL === filter}
      onClick={() => dispatch(setVisibilityFilter(VisibilityFilters.SHOW_ALL))}
    >
      All
    </Link>
    <Link
      active={VisibilityFilters.SHOW_ACTIVE === filter}
      onClick={() => dispatch(setVisibilityFilter(VisibilityFilters.SHOW_ACTIVE))}
    >
      Active
    </Link>
    <Link
      active={VisibilityFilters.SHOW_COMPLETED === filter}
      onClick={() => dispatch(setVisibilityFilter(VisibilityFilters.SHOW_COMPLETED))}
    >
      Completed
    </Link>
  </div>
);

export default connect()(Footer);
```

可以看到，上面的文件主要做了这几件事:

- **首先从 react-redux 中导出 connect 函数:**
  - 它负责给 Footer 传入 dispatch 函数.
  - 使得我们可以在 Footer 组件中 dispatch Action.
- **然后我们导出了 setVisibilityFilter Action Creators:**
  - 将之前从 "父组件" 接收 setVisibilityFilter 方法并调用的方式:
  - 改成了当 Link 被点击之后，我们 dispatch 对应的 Action.

### 删除无用代码

当我们通过以上三步整合了 Redux 的内容之后.

我们就可以删除原 App.js 中不必要的代码了.

打开 ```src/components/App.js``` 修改内容如下:

```js
import React from "react";
import AddTodo from "./AddTodo";
import TodoList from "./TodoList";
import Footer from "./Footer";

import { connect } from "react-redux";

export const VisibilityFilters = {
  SHOW_ALL: "SHOW_ALL",
  SHOW_COMPLETED: "SHOW_COMPLETED",
  SHOW_ACTIVE: "SHOW_ACTIVE"
};

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case VisibilityFilters.SHOW_ALL:
      return todos;
    case VisibilityFilters.SHOW_COMPLETED:
      return todos.filter(t => t.completed);
    case VisibilityFilters.SHOW_ACTIVE:
      return todos.filter(t => !t.completed);
    default:
      throw new Error("Unknown filter: " + filter);
  }
};

const App = (props) => {
  const { todos, filter } = props;

  return (
    <div>
      <AddTodo />
      <TodoList
        todos={getVisibleTodos(todos, filter)}
      />
      <Footer
        filter={filter}
      />
    </div>
  );

}

const mapStateToProps = (state, props) => ({
  todos: state.todos,
  filter: state.filter
});

export default connect(mapStateToProps)(App);
```

可以看到:

- 删除了 setVisibilityFilter 方法.
- 传给 Footer 的 setVisibilityFilter 属性.

保存上述修改的代码，打开浏览器.

你应该又可以继续 "点击底部的按钮" 来 "过滤完成和未完成的待办事项" 了.

## 小结

在本节中，我们介绍了开发 Redux 应用的最佳实践.

并通过重构 "过滤查看待办事项“ 这一功能来详细实践了这一最佳实践.

自此，我们已经使用 Redux 重构了 "整个待办事项小应用"，但是重构完的这份代码还显得有点乱:

- 不同类型的组件状态混在一起。
- 当我们的应用逐渐变得复杂时，我们的 rootReducer 就会变得非常冗长.
  
> 所以是时候考虑 "拆分不同组件" 的 "状态" 了.

> 我们将在 "下一节中讲解" 如何将 "不同组件的状态" 进行 "拆分"，以确保我们在 "编写大型应用" 时也可以显得很从容.

---

## combineReducers：组合拆分状态的 Reducers

当应用逻辑逐渐复杂的时候.

**我们就要考虑将巨大的 Reducer 函数拆分成一个个独立的单元.**

> 这在算法中被称为 ”分而治之“.

Reducers 在 Redux 中实际上, 是用来 "处理" Store 中存储的 State 中的 "某个部分":

- 一个 Reducer 和 State 对象树中的 "某个属性" 一一对应.
- 一个 Reducer 负责处理 State 中 "对应的那个属性".

比如我们来看一下现在我们的 State 的结构:

```js
const initialState = {
  todos: [
    {
      id: 1,
      text: "你好, 图雀",
      completed: false
    },
    {
      id: 2,
      text: "我是一只小小小小图雀",
      completed: false
    },
    {
      id: 3,
      text: "小若燕雀，亦可一展宏图！",
      completed: false
    }
  ],
  filter: VisibilityFilters.SHOW_ALL
};
```

因为 Reducer 对应着 State 相关的部分，这里我们的 State 有两个部分: 

```todos``` 和 ```filter```，所以我们可以 "编写两个对应" 的 ```Reducer```.

### 编写 Reducer：todos

在 Redux 最佳实践中，因为 Reducer 对应修改 State 中的 "相关部分".

当 State 对象树很大时，我们的 Reducer 也会有很多.

> 所以我们一般会 **单独建一个 reducers 文件夹** 来存放这些 "reducers".

我们在 ```src``` 目录下新建 ```reducers``` 文件夹.

然后在里面新建一个 ```todos.js``` 文件，表示处理 State 中对应 ```todos``` 属性的 Reducer:

```js
const initialTodoState = [
  {
    id: 1,
    text: "你好, 图雀",
    completed: false
  },
  {
    id: 2,
    text: "我是一只小小小小图雀",
    completed: false
  },
  {
    id: 3,
    text: "小若燕雀，亦可一展宏图！",
    completed: false
  }
];

const todos = (state = initialTodoState, action) => {
  switch (action.type) {
    case "ADD_TODO": {
      return [
        ...state,
        {
          id: action.id,
          text: action.text,
          completed: false
        }
      ];
    }

    case "TOGGLE_TODO": {
      return state.map(todo =>
        todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
      );
    }

    default:
      return state;
  }
};

export default todos;
```

可以看到，上面的代码做了这几件事:

- **首先我们将原 ```initialState``` 里面的 ```todos``` 部分, 拆分到了 ```src/reducers/todos.js``` 文件里:**
  - 我们定义了一个 initialTodoState 代表之前的 initialState 的 todos 部分，它是一个数组.
    - 并把它赋值给 todos 函数中 state 参数的默认值.
    - 即当 "调用此函数时"，如果传进来的 state 参数为 undefined 或者 null 时，这个 state 就是 initialState.
- **接着我们定义了一个 todos 箭头函数:**
  - 它的结构和 rootReducer 类似，都是接收两个参数：state 和 action.
  - 然后进入一个 switch 判断语句.
    - 根据 action.type 判断要相应的 Action 类型.
    - 然后对 state 执行对应的操作.

> 注意

> 我们的 ```todos reducers``` 只负责处理 ```原 initialState``` 的 ```todos``` 部分.
> 所以这里它的 state 就是原 todos 属性.
> 它是一个数组, 所以我们在 switch 语句里，进行数据改变时，要对数组进行操作，并最后返回一个新的数组.

### 编写 Reducer：filter

我们前面使用 ```todos``` reducer 解决了 ```原 initialState``` 的 ```todos``` **属性操作问题**.

现在我们马上来讲解剩下的 ```filter``` 属性的操作问题.

在 ```src/reducers``` 文件夹下创建 ```filter.js``` 文件，在其中加入如下的内容:

```js
import { VisibilityFilters } from "../components/App";

const filter = (state = VisibilityFilters.SHOW_ALL, action) => {
  switch (action.type) {
    case "SET_VISIBILITY_FILTER":
      return action.filter;
    default:
      return state;
  }
};

export default filter;
```

可以看到:

- **定义了一个 filter 箭头函数:**
  - 它接收两个参数：state 和 action.
  - 因为这个 filter reducer 只负责处理原 initialState 的 filter 属性部分.
    - 所以这里这个 state 参数就是, 原 filter 属性，**这里我们给了它一个默认值.**

> 注意

> filter 函数的剩余部分和 rootReducer 类似.
> 但是注意, 这里它的 state 是对 "filter 属性" 进行操作.
> 所以当判断 "SET_VISIBILITY_FILTER" action 类型时，它只是单纯的返回 action.filter.

### 组合多个 Reducer

当我们将 rootReducer 的逻辑拆分, 并 "对应处理" Store 中保存的 State 中的属性之后.

**我们可以确保每个 reducer 都很小.**

**这个时候我们就要考虑, 如何将这些小的 reducer 组合起来, 构成最终的 rootReducer.**

这种组合就像, 我们组合 React 组件一样:

最终 "只有一个根级组件"，在我们的 "待办事项小应用" 里面，**这个组件就是 App.js 组件**.

Redux 为我们提供了 ```combineReducers``` API: **用来组合多个小的 reducer**.

我们在 ```src/reducers``` 文件夹下创建 ```index.js``` 文件，并在里面添加如下内容:

```js
import { combineReducers } from "redux";

import todos from "./todos";
import filter from "./filter";

export default combineReducers({
  todos,
  filter
});
```

可以看到:

- **我们从 redux 模块中导出了 combineReducers 函数.**
- **然后导出了之前定义的 todos 和 filter reducer.**
- **接着我们通过对象简洁表示法:**
  - 将 todos 和 filter 作为对象属性合在一起，然后传递给 combineReducers 函数.
  - 这里 combineReducers 内部就会对 todos 和 filter 进行操作.
    - 然后生成类似我们之前的 rootReducer 形式.
  - 最后我们导出生成的 rootReducer.

> 这个通过 combineReducers 组合后的最终 state:
>> 就是存储在 Store 里面的那棵 State JavaScript 对象状态树.

> 分发 dispatch 的 Action.

> 通过 combineReducers 组合 todos 和 filter reducer 之后.
> 从 React 组件中 dispatch Action会: 遍历检查 todos 和 filter reducer.
> 断是否存在响应: 对应 action.type 的 case 语句.
> 如果存在，所有的这些 case 语句都会响应.

### 删除不必要的代码

当我们将原 rootReducer 拆分成了 todos 和 filter 两个 reducer.

并通过 redux 提供的 combineReducers API 进行组合后.

我们之前在 src/index.js 定义的 initialState 和 rootReducer 就不再需要了，所以我们马上来删除它们:

```js
import React from "react";
import ReactDOM from "react-dom";
import App, { VisibilityFilters } from "./components/App";

import { createStore } from "redux";
import { Provider } from "react-redux";
import rootReducer from "./reducers";

const store = createStore(rootReducer);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
```

可以看到:

- 我们从删除了之前在 src/index.js 定义的 rootReducer.
  - 转而使用了从 src/reducers/index.js 导出的 rootReducer.
- 并且我们我们之前讲到:
  - combineReducers 的第一个功能就是组合多个 reducer 的 state.
    - 最终合并成一个大的 JavaScript 对象状态树.
    - 然后自动存储在 Redux Store 里面.
  - 所以我们不再需要给 createStore 显式的传递第二个 initialState 参数了.

保存修改的内容，打开浏览器，可以照样可以 "操作所有的功能".

> 你可以 "加点待办事项"，"点击某个待办事项" 以完成它，通过 "底部的三个过滤按钮" 查看 "不同状态下的待办事项".

## 小结

在这一小节中，我们讲解了 redux 提供的 combineReducers API，它主要解决两个问题:

- 当应用逐渐复杂的时候，我们需要对 Reducer 进行 "拆分".
  - 那么我们就需要把 "拆分后" 的 Reducer 进行 "组合"，**并合并所有的 State**.
- 对于每个 React 组件 dispatch 的 Action:
  - 将其分发给对应的 Reducer.

当有了 ```combineReducers``` 之后, 不管我们的应用如何复杂:

**我们都可以将 "处理应用状态" 的 "逻辑" 拆分都一个一个很简洁、易懂的 "小文件".**

**然后 "组合这些小文件" 来完成 "复杂的应用逻辑".**

这和 React 组件的组合思想类似，可以想见，组件式编程的威力是多么巨大！


