# CSS 面试题

## 盒模型宽度计算

- offsetWidth:
  - 内容宽度 + 内边距 + 边框，无外边距
    - 也就是:
      - width + padding-left + padding-right + border-left-width + border-right-width

### box-sizing 样式问题（接上题）

- 加上样式:
  - box-sizing: border-box;
- 此时，width 即为 box 宽度（offsetWidth 的值与 width 的值将一致）。
  - padding、border 等宽度，均会被含在 width 中。

---

## margin 纵向重叠问题

- 相邻元素的:
  - margin-top 和 margin-bottom
    - 会发生重叠。
- 中间隔着的'空'元素（div、p 等，input 这种不行），一般情况下也会重叠（忽略）。

---

## margin 负值问题

- margin-top 和 margin-left 负值:
  - 元素对应 '向上'、'向左'移动。
- margin-right 负值:
  - 右侧元素左移，自身不受影响。
- margin-buttom 负值:
  - 下方元素上移，自身不受影响。

---

## BFC 理解与应用

- Block format context，块级格式化上下文。
- **一块独立渲染区域**
  - 内部元素的渲染:
    - 不会影响 '边界以外' 的元素。

### 形成 BFC 的常见条件

- float 不是 none。
- position 是 absolute 或 fixed。
- overflow 不是 visible。
- display 是 flex、inline-block 等。

### BFC 的常见应用

- 清除浮动。
  - 将脱离文档流的元素纳入容器中。

```css
.left {
  float: left;
}
.bfc {
  overflow: hidden;
}
```

```html
<div class="bfc">
  <img class="left" src="any..." />
  <p class="bfc">logo</p>
</div>
```

---

## float 布局

- 如何实现 '圣杯布局' 和 '双飞翼布局'。
- 手写 clearfix。

### '圣杯布局' 和 '双飞翼布局' 的技术总结

- 使用 float 布局。
- 两侧使用 margin 负值， 以便和 '中间内容' 横向重叠。
- 防止 '中间内容' 被 '两侧覆盖':
  - 一个用 padding。
  - 一个用 margin。

### 手写 clearfix

```css
.clearfix {
  content: "";
  display: table;
  clear: both;
}
```

- 然后加在:
  - 需要 '清除浮动' 的 '元素' 的:
    - 上一个 '相邻' 元素上。

---

## flex 布局

- 常用语法回顾:
  - flex-direction:
    - 主轴排列方向:
      - 横向
      - 纵向
  - justify-content:
    - 主轴对齐方式:
      - 开始对齐
      - 结束对齐
      - 居中对齐
      - 两边对齐
  - align-items:
    - 交叉轴对齐方式:
      - 开始对齐
      - 结束对齐
      - 居中对齐
      - 两边对齐
  - flex-wrap:
    - 是否换行
  - align-self:
    - 子元素在交叉轴的对齐方式:
      - 开始对齐
      - 结束对齐
      - 居中对齐
      - 两边对齐

### flex 实现一个三点的色子

```css
.box {
  width: 200px;
  height: 200px;
  display: flex;
  justify-content: space-between;
}

.item {
  width: 40px;
  height: 40px;
  background-color: red;
}

.item:nth-child(2) {
  align-self: center;
}
.item:nth-child(3) {
  align-self: flex-end;
}
```

```html
<div class="box">
  <div class="item"></div>
  <div class="item"></div>
  <div class="item"></div>
</div>
```

---

## CSS - 定位

### absolute 和 relative 定位

- relative 依据自身定位。
- absolute 依据最近一层的 '定位元素' 定位。
  - 定位元素:
    - absolute
    - relative
    - fixed
    - body（不是定位元素，但是是兜底手段）
      - 一层层向上查找，直至找到 body。
        - 根据 body 定位。

### 居中对齐的实现方式

- 水平居中
  - inline 元素:
    - text-align: center;
  - block 元素:
    - margin: auto;
  - absolute 元素:
    - left: 50% + margin-left 负值
- 垂直居中
  - inline 元素:
    - line-height 的值等于 height 的值。
  - absolute 元素:
    - top: 50% + margin-top 负值
    - transform(-50%, -50%);
    - top, left, buttom, right = 0 + margin: auto;

---

## CSS - 图文样式

### line-height 如何继承

- 写具体数值，如 30px，则继承该值（比较好理解）
- 写比例，如 2/1.5，则继承该比例（比较好理解）
- **写百分比，如 200%，则继承计算出来的值（考点）**

---

## CSS - 响应式

### rem 是什么

- rem 是一个长度单位。
  - 长度单位:
    - px: 绝对长度单位，最常用。
    - em: 相对长度单位，相对于父元素，不常用。
    - rem: 相对长度单位，相对于根元素，常用于响应式布局。

### 响应式布局的常用方案

- media-query:
  - 根据 '不同的屏幕宽度' 设置 '根元素' font-size。
- rem:
  - 基于根元素的相对单位。

> 上述两者搭配使用。

### vw / vh

- rem 的弊端:
  - '阶梯' 性。
    - 细节不够细。

> 此时，可用 vw/vh。

### 网页视口尺寸

- window.screen.height // 屏幕高度
- window.innerHeight // 网页视口高度
- document.body.clientHeight // body 高度
