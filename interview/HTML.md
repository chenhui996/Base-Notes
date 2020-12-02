# HTML 面试题

## doctype 的作用是什么?

- DOCTYPE 是:
  - html5 标准网⻚声明;
    - 且必须声明在 HTML 文档的第一行;
    - 来告知:
      - 浏览器的解析器:
        - 用什么 '文档标准':
          - 解析这个文档;
            - 不同的 '文档标准的渲染模式' 会 '影响到浏览器' 对于:
              - 'CSS 代码' 甚至 'JavaScript 脚本' 的解析;

---

- 文档解析类型有:
  - BackCompat:怪异模式;
    》 浏览器使用自己的 '怪异模式' 解析渲染⻚面;
    - 如果没有声明 DOCTYPE ，'默认' 就是这个模式;
  - CSS1Compat:标准模式;
    - 浏览器使用 W3C 的标准解析渲染⻚面;

---

> IE8 还有一种:
>
> > 介乎于上述两者之间的:
> >
> > > 近乎标准的模式，但是基本淘汰了。

### 这三种模式的区别是什么?

- 标准模式(standards mode):
  - ⻚面按照 HTML 与 CSS 的 '官方标准定义' 渲染;
- 怪异模式(quirks mode)模式:
  - 会模拟更旧的浏览器的行为;（**ps：具体的也没深入了解，我平时都用标准模式**）
- 近乎标准(almost standards)模式:
  - 会实施了一种:
    - '表单元格尺寸' 的怪异行为(与 IE7 之前的单元格布局方式一致);
  - 除此之外符合标准定义;（**ps：具体的也没深入了解，因为基本已经淘汰了**）

## HTML、XHTML、XML 有什么区别

- HTML(超文本标记语言):
  - 在 'html4.0 之前' HTML 先有 '实现' 再有 '标准';
    - 导致 HTML 非常混乱和松散;
- XML(可扩展标记语言):
  - 主要用于存储数据和结构，可扩展;
  - 大家熟悉的 JSON 也是相似的作用;
    - 但是 JSON 更加轻量高 效;
      - 所以 XML 现在 '市场越来越小' 了;
- XHTML(可扩展超文本标记语言):
  - 基于上面两者而来;
    - W3C 为了解决 'HTML 混乱问题' 而生;
      - 并基于此诞生了 HTML5;
      - 开头加入 `<!DOCTYPE html>` 的做法因此而来;
        - 不加就是兼容混乱的 HTML;
        - 加了就是 '标准模式' ;

## 什么是 data-属性?

- HTML 的 '数据属性':
  - 用于将 '数据' 储存于:
    - 标准的 HTML 元素中;
      - 作为 '额外' 信息;
  - 我们可以通过 'js 访问并操作' 它;
    - 来达到操作数据的目的;(ps:一般称之为自定义属性)

> 前端框架出现之后，这种方法已经不流行了

## 你对 HTML 语义化的理解?

- 语义化是指:
  - 使用恰当语义的 'html 标签';
    - 让⻚面具有良好的 '结构' 与 '含义';
      - 比如 `<p>` 标签就代表段落;
      - `<article>` 代表正文内容等等;

---

- 语义化的 '好处' 主要有两点:
  - 开发者友好:
    - 使用 '语义类标签 ' 增强了 '可读性';
      - 开发者能够:
        - 清晰地看出网⻚的结构;
      - 也更为便于团队的 '开发和维护';
  - 机器友好:
    - 带有语义的文字 '表现力丰富';
      - 更适合 '搜索引擎的爬虫' 爬取有效信息;
      - 语义类还可以支持 '读屏软件'，根据文章可以 '自动生成目录';(ps:例如识别所有 h1 标签，收集后，生成目录等等)

---

- 这对于简书、知乎这种富文本类的应用很重要;
  - 语义化对于其网站的内容传播有很大的帮助;
- 但是对于功能性的 web 软件重要性大打折扣:
  - 比如一个按钮、Skeleton 这种组件:
    - 根本没有对应的语义，也不需要什么 SEO;

## HTML5 与 HTML4 的不同之处

- 文件类型声明(<!DOCTYPE>)仅有一型:
  - `<!DOCTYPE HTML>`;
- 新的解析顺序:
  - 不再基于 SGML;
    - SGML:标准通用标记语言（简称“通用标言”），是一种定义电子文档结构和描述其内容的 '国际标准语言';
- 新的元素:
  - section
  - video
  - progress
  - nav
  - meter
  - time
  - aside
  - canvas
  - command
  - datalist
  - details
  - embed
  - figcaption
  - figure
  - footer
  - header
  - hgroup
  - keygen
  - mark
  - output
  - rp
  - rt
  - ruby
  - source
  - summary
  - wbr
- input 元素的新类型:
  - date, email, url 等等;
- 新的属性:
  - ping(用于 a 与 area)
  - charset(用于 meta)
  - async(用于 script)
- 全域属性:
  - id
  - tabindex
  - repeat
- 新的全域属性:
  - contenteditable
  - contextmenu
  - draggable
  - dropzone
  - hidden
  - spellcheck
- 移除元素:
  - acronym
  - applet
  - basefont
  - big
  - center
  - dir
  - font
  - frame
  - frameset
  - isindex
  - noframes
  - strike
  - tt

---

- 主要就是新增了一些属性、元素和方法等，然后移除了部分元素;

## 有哪些常用的 meta 标签?

- meta 标签由:
  - name 和 content 两个属性来定义;
    - 来描述一个 'HTML 网⻚文档' 的 '属性';
      - 例如作者、日期和时间、网⻚描述、关键词、⻚面刷新等;
    - 除了一些 http 标准规定了一些 name 作为大家使用的共识;
      - 开发者也可以自定义 name;

### 常用 meta:

- charset:
  - 用于描述 'HTML 文档' 的 '编码形式';

```html
<meta charset="UTF-8" />
```

- http-equiv:
  - 顾名思义，相当于 http 的文件头作用:
    - 比如下面的代码就可以设置 http 的缓存过期日期;

```js
<meta http-equiv="expires" content="Wed, 20 Jun 2019 22:33:00 GMT">
```

- viewport:
  - Web 开发人员可以控制视口的大小和比例;
    - 移动前端最熟悉不过;

```js
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
```

- apple-mobile-web-app-status-bar-style:
  - 为了自定义评估工具栏的颜色;
    - 开发过 PWA 应用的开发者应该很熟悉;

```js
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
```

## src 和 href 的区别?

- **src 是**:
  - 是 source 的缩写，是资源，页面必不可少的一部分;
  - 指向 '外部资源' 的位置;
    - 指向的内容会:
      - 嵌入到文档中 '当前标签' 所在的位置:
    - 在请求 src 资源时:
      - 会将其指向的资源:
        - '下载' 并 '应用' 到文档内;
          - js 脚本
          - img 图片
          - frame 等元素
        - 当 '浏览器' 解析到该元素时:
          - 会 '暂停其他资源' 的下载和处理;
            - 直到将该资源加载、编译、执行完毕;
              - 所以一般 js 脚本会放在 '底部' 而不是头部;(会阻塞)
- **href 是**:
  - 表示超文本引用;
  - 指向 '网络资源' 所在位置(的超链接);
    - 用来 '建立' 和 '当前元素或文档 '之间的 '连接';
      - 当 '浏览器' 识别到它 '指向的文件' 时:
        - 就会 '并行下载' 资源，'不会停止' 对 '当前文档' 的处理;(不会阻塞)

---

### 总结

- 区别总结, 有三个点:
  - **请求 '资源类型' 不同**:
    - href 是 Hypertext Reference 的缩写，表示超文本引用;
      - 用来建立 '当前元素' 和 '文档' 之间的 '链接';
      - 常用的有：link、a;
    - 在请求 src 资源时:
      - 会将其指向的资源 '下载并应用' 到文档中;
      - 常用的有 script、img 、iframe;
  - **作用结果不同**:
    - href 用于在 '当前文档' 和 '引用资源' 之间确立联系;
    - src 用于 '替换' 当前内容;
  - **浏览器解析方式不同**:
    - 若在文档中添加 href ，浏览器会识别该文档为 CSS 文件;
      - 就会并行下载资源并且不会停止对当前文档的处理;
    - 当浏览器解析到 src ，会暂停其他资源的下载和处理;
      - 直到将该资源加载、编译、执行完毕，图片和框架等也如此;
        - 类似于将所指向资源应用到当前内容;
      - 这也是为什么建议把 js 脚本放在底部而不是头部的原因
