# React 原理

- 函数式编程：
  - 不可变值。
- vdom 和 diff 算法。
- JSX 本质。
- 合成事件。
- setState batchUpdate。
- 组件渲染过程。

## 函数式编程

- 一种编程范式，概念比较多。
- 纯函数。
- 不可变值。

## vdom 和 diff 算法

- h 函数。
- vnode 数据结构。
  - tag
  - props
  - children
- patch 函数。

---

- diff 算法：
  - 只比较同级，不跨级比较。
  - tag 不相同，则直接删掉重建，不再深度比较。
  - tag 和 key，两者都相同，则任务是相同节点，不再深度比较。
