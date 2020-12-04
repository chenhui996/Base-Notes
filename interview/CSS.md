# CSS 面试题

## CSS 选择器的优先级是怎样的？

- CSS 选择器的优先级是:
  - 内联 > ID 选择器 > 类选择器 > 标签选择器;

## link 和@import 的区别？

- link 属于 XHTML 标签;
  - ⽽@import 是 CSS 提供的;
- ⻚⾯被加载时:
  - link 会同时被加载;
  - ⽽@import 引⽤的 CSS 会:
    - 等到 '⻚⾯被加载完' 再加载;
- import 只在 IE 5 以上才能识别;
  - ⽽ link 是 XHTML 标签，⽆兼容问题;(为什么？XHTML 是 W3C 出的啊)
- link ⽅式的样式 '权重⾼于' @import 的权重(优先级);
- 使⽤ dom 控制样式时的差别:
  - 当使⽤ javascript 控制 dom 去:
    - 去改变样式的时候:
      - 只能使⽤ link 标签;
        - 因为 @import 不是 dom 可以控制的;
