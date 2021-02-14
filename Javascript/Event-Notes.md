#  Event

- 浏览器给予的功能,均为默认事件(默认行为);

### addEventListener()

- div.addEventListener('eventType', callback(),[Boolean || {Object}]):
  - eventType: 事件类型;
  - callback(): 回调函数;
  - Boolean: 可选参数:
    - true: 事件捕获;
    - false: 事件冒泡;
  - {Object}:含有三个对象属性;
    - capture: (boolean)是否执行捕获,默认 false;
    - once: (boolean)是否只执行一次,默认 false;
    - passive: (boolean)取消阻止浏览器默认行为 false;
- 相较于 div.onclick:
  - 结论：更好;
  - 同样事件不会互相覆盖，互相影响，各自独立;

## 事件流

### 事件冒泡

- js 特性;
- 执行'子元素事件触发时'，父元素如有'同样事件'，也会执行;
- 由小到大;

### 事件捕获

- 由大到小;

## preventDefault()

- 阻止浏览器默认行为;

## removeEventListener()

- 取消元素事件;
- div.removeEventListener("eventType", 命名函数;
  - eventType:事件类型;
  - 命名函数：必须是命名封装好的函数,不能输入函数体;

## Event 事件对象

### Event.target

- 目标元素;
  - 事件触发的目标源元素;
- 可用 Event.target.tagName 扩展添加一些逻辑条件;

### Event.currentTarget

- 起始元素;
  - 事件绑定元素;

## 事件委托

- 事件委托优点：
  - 可减少需要添加事件绑定的元素;
  - 可给新增Dom元素添加事件(在不刷新页面的情况下);
- 事件委托的缺点:
  - 事件处理函数中需要判断事件源增加逻辑复杂度;
  - 祖父级和事件之间不能有阻止冒泡;

### mouseover

- 鼠标移入;
  - 事件触发的目标源元素;

### mouseout

- 鼠标移出;
  - 事件触发的目标源元素;

### mouseenter

- 鼠标移入;
  - 事件绑定元素;

### mouseleave

- 鼠标移出;
  - 事件绑定元素;

### e.cancelBubble()

- 取消时间冒泡
  - Boolean;
  - 意思就是在这一层就隔断;

### e.stopPropagation()

- 取消时间冒泡
  - Boolean;
  - 意思就是在这一层就隔断;