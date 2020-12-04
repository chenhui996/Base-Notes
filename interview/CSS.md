# CSS 面试题

## CSS 选择器的优先级是怎样的？

- CSS 选择器的优先级是:
  - 内联 > ID 选择器 > 类选择器 > 标签选择器;

## link 和@import 的区别？

- link 属于 XHTML 标签;
  - ⽽@import 是 CSS 提供的;
- ⻚⾯被加载时:
  - link 会 '同时被加载';
  - ⽽@import 引⽤的 CSS 会:
    - 等到 '⻚⾯被加载完' 再加载;
- import 只在 IE 5 以上才能识别;
  - ⽽ link 是 XHTML 标签，⽆兼容问题;(为什么？XHTML 是 W3C 出的啊)
- link ⽅式的样式 '权重⾼于' @import 的权重(优先级);
- 使⽤ dom 控制样式时的差别:
  - 当使⽤ javascript 控制 dom 去:
    - 改变样式的时候:
      - 只能使⽤ link 标签;
        - 因为 @import 不是 dom 可以控制的;

## 有哪些方式(CSS)可以隐藏⻚面元素?

- opacity: 0;
  - 本质上是将 '元素的透明度' 将为 0;
    - 看起来隐藏了，但是 '依然占据空间' 且 '可以交互';
- visibility: hedden;
  - 与 opacity 属性类似的效果，占据空间，但是 '不可以交互' 了;
- overflow: hidden;
  - 只隐藏元素溢出的部分;
    - '占据空间' 且 '不可交互';
- display: none;
  - 这个是 '彻底隐藏' 了元素;
    - 元素从 '文档流' 中消失;
    - 既 '不占据空间' 也 '不交互'，也 '不影响布局';
- z-index: -9999;
  - 原理是将层级放到底部，这样就被覆盖了，看起来隐藏了;
- transform: scale(0,0);
  - 平面变换，将元素缩放为 0;
    - 但是依然 '占据空间'，但 '不可交互';

## em\px\rem 区别?

- px:
  - 绝对单位;
  - ⻚面按 '精确像素'展示;
- em:
  - 相对单位;
  - 基准点为:
    - 父节点 '字体的大小';
    - 如果自身定义了 font-size:
      - 按自身来计算;(浏览器默认字体是 16px)
  - 整个⻚面内 1em 不是一个固定的值;
- rem:
  - 相对单位;
  - 可理解为”root em”;
    - 相对:
      - '根节点 html 的字体大小' 来计算;(一般是 body 节点)
  - 是 CSS3 新加属性，chrome/firefox/IE9+支持;

## 块级元素水平居中的方法?

- margin:0 auto 方法;
- flex 布局，目前主流方法:

```css
.center {
  display: flex;
  justify-content: center;
}
```

- table 方法:

```css
.center {
  display: table;
  margin: 0 auto;
  border: 1px solid red;
}
```

- 还有一些通过 position+(margin|transform)等方法的不一样列举了，非重点没必要;

## CSS 有几种定位方式?

- static:
  - 正常文档流定位;
  - 此时 top, right, bottom, left 和 z-index 属性无效;
  - 块级元素 '从上往下' 纵向排布;
  - 行级元素 '从左向右' 排列;
- relative:
  - 相对定位;
  - 此时的 '相对' 是相对于 '正常文档流' 的位置;
- absolute:
  - 绝对定位;
  - 相对于:
    - '最近的非 static 定位祖先元素' 的 '偏移';
      - 来确定元素位置;(最简易模型:父相子绝);
- fixed:
  - 固定;
  - 指定元素:
    - 相对于 '屏幕视口(viewport)' 的位置:
      - 来指定元素位置;
  - 元素的位置在屏幕滚动时不会改变;
    - 比如那种 '回到顶部的按钮' 一般都是用此定位方式;
- sticky:
  - 粘性定位;
  - 特性近似于 relative 和 fixed 的合体;
    - 其在实际应用中的近似效果就是:
      - IOS 通讯录滚动的时候的 '顶屁股';
      - 一些页面左侧的跟随导航块;(一开始为相对定位，当视口满足 top, right, bottom, 和 left 的值时，元素将固定在视口上)

```css
#one {
  position: sticky;
  top: 10px;
}
```

## 如何理解 z-index?

- CSS 中的 z-index 属性:
  - 控制 '重叠元素' 的 '垂直叠加顺序';
  - 默认元素的 z-index 为 0;
    - 我们可以修改 z-index 来控制元素的图层 位置;
  - z-index '只能影响' 设置了 position 值的元素;

## 如何理解层叠上下文?

### 是什么?

- 层叠上下文是:
  - HTML 元素的三维概念;
  - 这些 HTML 元素在 '一条假想的':
    - 相对于面向(电脑屏幕的)视窗或者网⻚的 '用户的 z 轴' 上延伸;
      - HTML 元素依据其自身属性:
        - 按照优先级顺序占用层叠上下文的空间;

### 如何产生?

- 触发一下条件则会产生层叠上下文:
  - 根元素 (HTML);
  - z-index 值不为 "auto"的 绝对/相对定位;
  - 一个 z-index 值不为 "auto"的 flex 项目 (flex item):
    - 父元素 display: flex|inline-flex;
  - opacity 属性值小于 1 的元素;
  - transform 属性值不为 "none"的元素;
  - mix-blend-mode 属性值不为 "normal"的元素;
  - filter 值不为“none”的元素;
  - perspective 值不为“none”的元素;
  - isolation 属性被设置为 "isolate"的元素;
  - position: fixed;
  - 在 will-change 中指定了任意 CSS 属性:
    - 即便你没有直接指定这些属性的值;
  - -webkit-overflow-scrolling 属性被设置 "touch"的元素;

## 清除浮动有哪些方法?

- 空 div 方法:

```html
<div style="clear:both;"></div>
```

- Clearfix 方法:
  - 上文使用.clearfix 类已经提到;
- overflow:
  - auto 或 overflow: hidden 方法，使用 BFC;

> 在 flex 已经成为布局主流之后，浮动这种东⻄越来越少⻅了，毕竟它的副作用太大

## 你对 css sprites 的理解，好处是什么?

### 是什么 ?

- 雪碧图也叫 CSS 精灵:
  - 是一 CSS 图像合成技术;
    - 开发人员往往将:
      - 小图标合并在一起之后的图片:
        - 称作雪碧图;

### 如何操作?

- 使用工具(PS 之类的)将多张图片打包成一张雪碧图;
  - 并为其生成合适的 CSS;
- 每张图片都有相应的 CSS 类:
  - 该类 定义了 background-image、background-position 和 background-size 属性;
- 使用图片时，将相应的类添加到你的元素中;

### 好处

- 减少加载多张图片的 HTTP 请求数(一张雪碧图只需要一个请求);
- 提前加载资源;

### 不足

- CSS Sprite 维护成本较高;
  - 如果⻚面背景有少许改动，一般就要改这张合并的图片;
- 加载速度优势在 http2 开启后荡然无存:
  - HTTP2 多路复用;
    - 多张图片也可以重复利用一个连接通道搞定;

## 你对 '媒体查询' 的理解?

### 是什么

- 媒体查询由:
  - 一个可选的媒体类型;
  - 和零个或多个:
    - 使用媒体功能的:
      - 限制了样式表范围的表达式;
- 组成;
- 这些表达式描述了媒体特征:
  - 最终会被解析为 true 或 false;
- 如果媒体查询中:
  - 指定的媒体类型:
    - '匹配' 展示文档所使用的 '设备类型';
      - 并且 '所有的表达式' 的值都是 true;
        - 那么该 '媒体查询的结果' 为 true;
          - 那么 '媒体查询内的样式' 将会 '生效';

```html
<!-- link元素中的CSS媒体查询 -->
<link rel="stylesheet" media="(max-width: 800px)" href="example.css" />
<!-- 样式表中的CSS媒体查询 -->
<style>
  @media (max-width: 600px) {
    .facet_sidebar {
      display: none;
    }
  }
</style>
```

## 你对盒模型的理解

### 是什么?

- 当对一个文档进行布局(lay out)的时候:
  - 浏览器的 '渲染引擎' 会:
    - 根据标准之一的:
      - CSS 基础框盒模型(CSS basic box model);
        - 将 '所有元素' 表示为一个个矩形的盒子(box);
          - CSS 决定这些盒子的:
            - 大小、位置以及属性(例如颜色、背 景、边框尺寸...)。;
- 盒模型由:
  - content(内容)
  - padding(内边距)
  - border(边框)
  - margin(外边距)
- 组成;

## '标准盒模型' 和 '怪异盒模型' 有什么区别?

- 在 W3C 标准下:
  - 我们定义元素的 width 值:
    - 即为盒模型中的 content 的宽度值;
  - height 值:
    - 即为盒模型中的 content 的高度值;
- 因此，'标准盒模型'下:

> 元素的宽度 = margin-left + border-left + padding-left + width + padding-right + border-right + margin-right

- 而 IE '怪异盒模型'(IE8 以下):
  - width 的宽度:
    - 并不是 content 的宽度;
    - 而是 border-left + padding-left + content 的宽度值 + padding-right + border-right 之和;
  - height 同理;
- 在 '怪异盒模型' 下:

> 元素占据的宽度 = margin-left + width + margin-right

---

- 虽然现代浏览器默认使用 W3C 的标准盒模型;
  - 但是在不少情况下;
    - 怪异盒模型更好用;
      - 于是 W3C 在 css3 中加入 box- sizing;

```css
box-sizing: content-box // 标准盒模型
box-sizing: border-box // 怪异盒模型
box-sizing: padding-box // 火狐的私有模型，没人用
```

## 谈谈对 BFC 的理解

### 是什么?

- 书面解释:
  - BFC(Block Formatting Context)这几个英文拆解;
    - Box:
      - CSS 布局的基本单位;
        - Box 是 CSS 布局的对象和基本单位;
      - 直观点来说:
        - 就是 '一个⻚面' 是由很多个 Box 组成的;
          - 实际就是上个问题说的盒模型
    - Formatting context:
      - 块级上下文格式化;
      - 它是⻚面中的一块渲染区域;
        - 并且有一套渲染规则;
          - 它决定了其子元素将如何定位;
          - 以及和其他元素的关系和相互作用;
- 简而言之，它是一块独立的区域;
  - 让处于 BFC 内部的元素与外部的元素互相隔离;

### 如何形成?

- BFC 触发条件:
  - 根元素，即 HTML 元素;
  - position: fixed/absolute;
  - float 不为 none;
  - overflow 不为 visible;
  - display 的值为:
    - inline-block
    - table-cell
    - table-caption

### 作用是什么?

- 防止 margin 发生重叠;
- 两栏布局，防止文字环绕等;
- 防止元素塌陷;

## 为什么有时候人们用 translate 来改变位置而不是定位?

- translate()是 transform 的一个值;
  - 改变 transform 或 opacity:
    - 不会触发浏览器重新布局(reflow)或重绘(repaint);
      - 只会 触发复合(compositions);
  - 而改变绝对定位会触发重新布局，进而触发 '重绘' 和 '复合';
  - transform 使浏览器:
    - 为元素创建一 个 GPU 图层;
      - 但 '改变绝对定位' 会使用到 CPU;
- 因此 translate()更高效，可以缩短平滑动画的绘制时间;
- translate 改变位置时:
  - 元素依然会占据其原始空间;
    - 绝对定位就不会发生这种情况;

## 伪类和伪元素的区别是什么?

### 是什么?

#### 伪类(pseudo-class)

- 伪类(pseudo-class) 是一个以冒号(:)作为前缀;
    - 被添加到:
        - 一个选择器末尾的 '关键字';
- 当你希望样式:
    - 在特定状态下:
        - 才被呈现到指定的元素时:
            - 你可以往元素的选择器后面加上:
                - 对应的伪类;(hover、active、focus...);

#### 伪元素

- 伪元素用于:
    - 创建一些 '不在文档树中的元素';
        - 并为其添加样式;
- 比如说:
    - 我们可以通过::before;
        - 来在一个元素前增加一些 '文本';
            - 并为这些文本添加样式;

> 虽然用户可以看到这些文本，但是这些文本实际上不在文档树中;(icon用的居多)

### 区别

- 其实上文已经表达清楚两者区别了;
    - 伪类是:
        - 通过在 '元素选择器上' 加入 '伪类' 改变 '元素状态';
    - 伪元素是:
        - 通过对 '元素的操作' 进行对 '元素的改变';

> 通过 p::before 对文本添加额外的元素;
> 通过 p:first-child 改变了文本的第一个子元素样式;

## 你对flex的理解?

- web应用有 '不同设备尺寸' 和 '分辨率';
    - 这时需要 '响应式界面设计' 来满足 '复杂的布局需求';
- Flex弹性盒模型的优势在于:
    - 开发人员只是 '声明布局应该具有的行为';
        - 而不需要给出具体的实现方式;
        - 浏览器负责完成实际布局;
- 当布局涉及到:
    - 不定宽度
    - 分布对⻬的场景时;
        - 就要优先考虑弹性盒布局;

## 关于CSS的动画与过渡问题

- ..
