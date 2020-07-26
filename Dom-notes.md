# Dom

- 文档对象模型;

# document

- dom 树的最外层;

# <html>

- 根元素

# childNodes

- 子节点：
  - 获取 dom 树中其中一个的 dom 的'所有'子节点;

# nodeType

- 查看节点的节点类型;
- 节点类型:
  - 10:文档声明;
  - 1:元素节点(标签名称);
  - 3:文本节点(#text);
  - 8:注释节点(#comment);
  - 9:文档节点(#document);

# nodeName

- 查看节点的节点名称;
- 节点名称：
  - 文档声明:html;
  - <html>:HTML；
  - 元素节点:元素标签大写表示;

# children

- 获取 dom 树中其中一个的 dom 的'所有'元素子节点;

# parentNode

- 获取 dom 树中其中一个的 dom 的'父节点';

# parentElement

- 获取 dom 树中其中一个的 dom 的'父元素';

# offsetParent

- 定位父级(元素根据定位的这个父级);

# attributes

- 获取 dom 的属性列表;

# getAttribute

- 获取 dom 的某一个属性的属性值;
  - class、id、...、自定义属性;
  - dom.getAttributes("hahaha");

# setAttribute

- 设置 dom 的某一个属性和属性值;
- dom.getAttributes("name","chenhui");
  - name:属性名称;
  - chenhui:属性值;

# removeAttribute

- 移除 dom 的某一个属性;

# hasAttribute

- 判断 dom 的某一个属性是否存在;
- 返回布尔值;

# dom 的属性

- dom 的属性在文档中:
  - 只能是字符串;
  - 就算给其他类型的属性值，也会被转成字符串;

# dom.index:

- 直接对对象进行属性设置，其不会添加到文档中，存在内存里;
- ECMA 存储;
- 只要操作了 innerHTML,其对象上，存在内存中的事件和相关属性都会丢失;
  - 办法：将属性加在 dom 文档上，dom 文档的属性不会丢失;

# dom 中的自定义属性:

# data-XXX：

- 统一标准，自定义属性前缀为:data-;

# 获取与添加 data-XXX：

- dom.dataset.XXX;
  - 即可获取或添加 dom 的自定义属性：XXX;

# 传值与传址

- 简单数据类型:传值;
  - Number;
  - String;
  - Boolean;
  - Undefind;
  - Null;
- 简单数据类型会新开辟内存地址;
- 复杂数据类型:传址;
  - Object;
- 复杂数据类型不会新开辟内存地址;

# insetBefore()

- 插入标签之前
- obj.insetBefore(newNode,oldNode);
  - 必须有两个参数：
    - newNode：需插入的节点;
    - oldNode：插入这个节点之前;

# replaceChild()

- 替换节点；
- obj.replaceChild(newNode,oldNode);
  - 必须有两个参数：
    - newNode：需插入的节点;
    - oldNode：插入这个节点之前;

# node.remove()

- 删除节点;
- 返回 undefind;

# parent.removeChild()

- 删除 parent 下的某一个节点;

# cloneNode()

- 克隆节点
  - 参数为布尔值：
    - true:深拷贝;
    - false:浅拷贝;

# 尺寸相关 

# offset

- offsetWidth:可视宽度;
  - 元素本身宽度 + padding + border；
- offsetHeight:可视高度;
  - 元素本身高度 + padding + border；
- offsetLeft: 距离定位父级的left坐标;
- offsetTop: 距离定位父级的top坐标;

# client

- clientWidth: 可视宽度 + border;
- clientHeight: 可视高度 + border;
- clientLeft: 左边框宽度;
- clientTop: 上边框宽度;

# scroll

- scrollWidth: 内容宽度;
  - 注意，滚动条可能会影响宽度;
- scrollHeight: 内容高度;
  - 内容高度若比元素高度高，则为内容高度;
- scrollLeft: 左右滚动距离;
- scrollTop: 上下滚动距离;

# getBoundingClientRect()

- 方法返回元素的大小及其相对于视口的位置
