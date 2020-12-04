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

- 空div方法: 
```html
<div style="clear:both;"></div>
```
- Clearfix 方法:
    - 上文使用.clearfix类已经提到;
- overflow: 
    - auto或overflow: hidden方法，使用BFC;

> 在flex已经成为布局主流之后，浮动这种东⻄越来越少⻅了，毕竟它的副作用太大

## 你对css sprites的理解，好处是什么?

### 是什么 ?

- 雪碧图也叫CSS精灵:
    - 是一CSS图像合成技术;
        - 开发人员往往将:
            - 小图标合并在一起之后的图片:
                - 称作雪碧图;

### 如何操作?

- 使用工具(PS之类的)将多张图片打包成一张雪碧图;
    - 并为其生成合适的 CSS;
- 每张图片都有相应的 CSS 类:
    - 该类 定义了background-image、background-position和background-size属性;
- 使用图片时，将相应的类添加到你的元素中;

### 好处

- 减少加载多张图片的 HTTP 请求数(一张雪碧图只需要一个请求);
- 提前加载资源;

### 不足

- CSS Sprite维护成本较高;
    - 如果⻚面背景有少许改动，一般就要改这张合并的图片;
- 加载速度优势在http2开启后荡然无存:
    - HTTP2多路复用;
        - 多张图片也可以重复利用一个连接通道搞定;

## 你对媒体查询的理解?

- ...
