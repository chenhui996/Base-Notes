# 简历 QA

## 面试官：“你说进公司后，将公司项目从 react 类组件 + js 升级成了 react 函数式组件 和 hooks + ts，请讲讲为什么要升级？有什么优势？”

- 进公司后，我主导了将项目从 react 类组件 + js 逐步重构到 react 函数式组件 + hooks + ts。
- 升级的原因：
  - **简化组件逻辑**：
    - 函数式组件集合 hooks 后，可以更直观地组织逻辑，避免了类组件：比如 **this 绑定**、**生命周期复杂** 等等的问题，开发体验更好。
  - **提升可维护性**：
    - hooks 让 **状态管理**、**复用逻辑** 更加灵活，例如封装一些自定义 hooks 啥的。
    - 而且项目结构也更清晰，利于 **多人协作** 和 **后期维护**。
  - **引入类型安全**：
    - ts 带来了 **静态类型检查**，可以在开发阶段发现更多潜在错误，提高代码的健壮性。
    - 而且在多人合作、长期维护大型项目中，因为函数、对象、组件间有明确的类型定义，提高了协作性和维护性，优势非常明显。

## 面试官：“类组件有什么缺陷？”

1. this易错 ➔ 需要绑定this，出错率高。
2. 生命周期复杂 ➔ 同一逻辑拆散写，维护困难。
3. 复用逻辑难 ➔ HOC/render props嵌套，阅读差。
4. 逻辑分散 ➔ 相关代码分开，不利维护。
5. 体积稍大 ➔ 性能比函数组件略差。
6. 未来受限 ➔ 类组件难适配新特性。

## 面试官：“你说你在股票项目中用了 FP（函数式编程），可以说说 FP 吗？”

在股票行情系统项目中，因为涉及到行情数据的推送处理、状态变更逻辑非常复杂，我引入了**函数式编程（FP）**的思想来优化代码结构。

**函数式编程（FP）简单理解：**

是一种以函数为核心、强调数据不可变性和无副作用的编程范式。

通过组合小的纯函数来构建复杂的业务逻辑，避免了传统命令式编程中容易出现的副作用和状态污染问题。

**在项目中的具体实践：**

pipe 函数组合：

把复杂的数据处理流程，拆解成单一职责的小函数，再通过 pipe 顺序组合，提高了代码的可读性和可维护性。

map、filter、reduce：

处理行情列表、成交明细等数据时，使用 map/filter/reduce 替代传统 for 循环，代码更简洁声明式。

curry 柯里化：

将一些参数固定的通用逻辑封装成柯里化函数，提升了代码复用性，比如事件处理、行情推送处理。

保持纯函数：

尽可能写无副作用的纯函数，比如不会在函数内部直接修改外部变量，只根据输入返回新的输出，便于单元测试和调试。

**FP 带来的好处：**

逻辑更清晰独立，降低了代码耦合。

错误更容易定位，因为纯函数的行为是可预测的。

维护成本下降，新增需求时，只需要组合或调整已有小函数。

## 面试官：“为什么股票项目中，左侧5000+的全量列表只拉取一次，之后由前端自己维护，而不是后端维护？”

整体设计原因是：为了降低后端压力、减少网络传输负担、提升前端交互实时性。

具体解释：

### 1. 后端只负责推送"变化量"（增量推送）

股票行情变化频繁，后端如果每次都重新推送全量，会极大占用带宽，增加网络开销，推送延迟也会变高。

所以后端采用只推送变更数据（比如某只股票价格变化了，就推这只股票的更新数据），降低带宽占用，提高系统整体吞吐量。

### 2. 前端自己维护全量状态，实时更新展示

前端一开始拿一次全量数据，存成内存中的本地状态（通常是 Map/对象结构，O(1)查询）。

后续收到推送后，根据股票代码 id，局部更新对应的股票条目，保证列表总是最新。

这样用户看到的界面是实时更新的，而且更新速度快，体验流畅。

### 3. 分工合理，提高扩展性

后端专注于发布变化，前端专注于状态维护和展示。

如果前端有多种不同的展示（比如列表、自选股、分组视图等），都可以基于本地的状态自行组合展示，不需要后端配合，前端扩展更灵活。

如果后端每次都推送全量，会带来什么问题？

网络压力爆炸（特别是高频行情推送下），容易引发丢包、延迟增加。

客户端每次要重新处理大批量数据，体验卡顿。

难以横向扩展，整体架构不可规模化。

---

因为实时行情变化频繁，后端如果推全量数据，带宽开销和延迟都不可接受。
所以后端只推变化，前端拉一次全量，之后基于推送增量自己维护状态，这样可以降低网络压力，提高性能，前端交互也更流畅。

## 面试官：“你从 0-1 做了 UI 组件库，说说实现一个组件库，需要注意什么？”

1. 设计规范统一
2. 通用性 & 可扩展性
3. 类型定义完善（TypeScript）
4. 可访问性（Accessibility）
5. 良好的文档和示例
6. 按需加载
7. 测试保障

## WebSocket断了怎么办？

- 可以监听 onclose 或 onerror，自动发起重连。
- 为了防止频繁连接导致资源浪费，通常采用指数退避算法，每次失败后延迟时间成倍增加，最大限制在30秒或一分钟以内。
- 同时，合理设置最大重连次数，避免死循环。
