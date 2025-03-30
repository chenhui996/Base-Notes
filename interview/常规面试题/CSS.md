# CSS

- 基础概念
- 布局
- 响应式设计
- 动画与过渡
- 其他

## 基础概念

### 1. 什么事盒模型？标准盒模型 和 怪异盒模型有什么区别？

- 盒模型（box model）是，浏览器渲染页面时 -> 用来 **计算** 元素的 **大小及布局** 的模型，包含以下部分：
  - **内容（content）**：元素的实际内容区域。
  - **内边距（padding）**：内容与边框之间的距离。
  - **边框（border）**：围绕内容和内边距的边框。
  - **外边距（margin）**：元素与其他元素之间的间距。

#### 标准盒模型（W3C box model）

- `width` 和 `height` 所代表的：
  - 只包含 **内容区域（content）** 大小。
  - 不包含 `padding` 和 `border`。
- 总宽度计算公式（width 还需加上其他）：
  - `total width = content + padding + border`
- 总高度计算公式（height 还需加上其他）：
  - `total height = content + padding + border`

#### 怪异盒模式（IE box model）

- `width` 和 `height` 包含 `padding` 和 `border`，不会额外增加尺寸。
- 总宽度计算公式：`total width = width（已包含 padding + border）`
- 总高度计算公式：`total height = height（已包含 padding + border）`

#### 追问：如何切换盒模型？

- 标准盒模型（默认）

```css
div{
    box-sizing: content-box;
}
```

- 怪异盒模型：

```css
div{
    box-sizing: border-box;
}
```

---

### 2. 如何让一个元素水平垂直居中？（至少3种方法）

#### 1. 使用 flexbox（推荐）

```css
.parent{
    display: flex;
    justify-content: center; /* 水平居中 */
    align-items: center; /* 垂直居中 */
    height: 100vh;
}
```

#### 2. 使用 grid

```css
.parent{
    display: grid;
    place-items: center; /* 直接水平垂直居中 */
    height: 100vh;
}
```

#### 3. 使用 position + transform

```css
.child{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
```

---

### 3. CSS 选择的优先级时如何计算的？

- **答案**：内联样式 -> ID 选择权 -> 类、伪类、属性 -> 元素、伪元素

---

### 4. 什么是 BFC（块级格式化上下文）？如何触发 BFC？

#### BFC（Block Formatting Context） 定义

- BFC 是一个 **独立的布局区域**。
- 在 BFC 内部：
  - **元素 不会与 外部元素 的 浮动、margin 重叠**。

#### BFC 的特性

1. **内部的元素** 不会影响 **外部元素**（如 margin 不会塌陷）。
2. **清除浮动**：BFC 可以包裹浮动元素，避免 **父元素** 高度塌陷。
3. **防止 margin 重叠**：BFC 内部 margin 不会和外部 margin 发生重叠。

#### 如何触发 BFC？

```css
/* 1. overflow（最常用） */
.bfc-1{
    overflow: hidden;
}

/* 2. display: flow-root */
.bfc-2{
    display: flow-root;
}

/* 3. float(不推荐) */
.bfc-3{
    float: left;
}

/* 4. position: absolute 或 fixed */
.bfc-4{
    position: absolute;
}

/* 5. 使用 display: flex 或 display: grid */
.bfc-5{
    display: flex;
}
```

---

### 5. css 中的 display 有哪些常见的值？他们分别有什么作用？

- display 属性决定了元素的 **布局方式**。
- 常见值如下：
  - `none`：隐藏元素，不占据空间。
  - `block`：块级元素，占据整行，支持 width 和 height。
  - `inline`：行内元素，不支持 width 和 height。
  - `inline-block`：即是 行内元素（不换行），又支持 width 和 height。
  - `flex`：触发 flexbox 布局，子元素可灵活排列。
  - `grid`：触发 grid 布局，子元素按网格排列。
  - `table`：让元素表现得像 table。
  - `table-cell`：让元素表现得像 td 单元格。
  - `list-item`：让元素表现得像 li，可以有 ::marker。
  - `flow-root`：触发 BFC（块级格式化上下文）。

---

## 布局

### 1. Flexbox 布局中，flex: 1 是什么意思？

- `flex: 1` 是简写，其包含以下属性：
  - `flex-grow: 1`：可以 **扩展填充** 父容器 **剩余空间**。
  - `flex-shrink: 1`：可以 **收缩适应** 父容器。
  - `flex-basis: 0%`：初始宽度为 0，不计算内容大小。
