# 常规面试题

## 何为 REM 布局？REM 布局的原理是什么？

- REM 是 CSS3 新增的一个相对单位（root em，根em），这个单位引起了广泛关注。
- 这个单位与em有什么区别呢？
  - 区别在于 -> 使用rem为元素 -> 设定字体大小时，仍然是 **相对大小**，但相对的 -> **只是HTML根元素**。
  - 这个单位可谓集 **相对大小** 和 **绝对大小** 的优点于一身，通过它:
    - 既可以做到 -> 只修改根元素 -> 就可 **成比例地调整所有** 字体大小。
    - 又可以 **避免** -> 字体大小逐层复合的连锁反应。
- 目前，除了IE8及更早版本外，所有浏览器均已支持rem。

## 说说BFC

- BFC(Block Formatting Context)直译为"块级格式化上下文"。
- 是一个独立的渲染区域，只有Block-level box参与，它规定了内部的Block-level Box如何布局。
- 说人话： 就是一个独立的块。里面的元素和外面的元素不会互相影响。
- 触发BFC的条件：
  - 根元素
  - float属性不为none
  - position为absolute或fixed
  - display为inline-block, table-cell, table-caption, flex, inline-flex
  - overflow不为visible
- 例子：

```html

<style>
    .container {
        overflow: hidden;
    }
    .box {
        width: 100px;
        height: 100px;
        background: red;
        margin: 10px;
    }
</style>

<div class="container">
    <div class="box"></div>
    <div class="box"></div>
</div>
```

- 总结：
  - BFC：块级格式化上下文（Block Formatting Context）
  - IFC：行内格式化上下文（Inline Formatting Context）
  - GFC：网格布局格式化上下文（Grid Formatting Context）
  - FFC：自适应格式化上下文（Flex Formatting Context）

## Object.assign() 是浅拷贝还是深拷贝？

- Object.assign() 是浅拷贝。
- 深拷贝：
  - 复制对象的所有属性，包括嵌套对象。复制对象的所有层级，创建引用对象的完整副本。因此，副本和原始对象完全独立。
  - js中：
    - 使用递归方法：编写一个递归函数，遍历对象的所有层级，并复制每个层级的对象和属性。
    - 使用JSON.stringify()和JSON.parse()：将对象序列化为JSON字符串，然后再反序列化为一个新的对象。
      - 这种方法适用于大多数普通对象，但对于包含特殊属性（如函数、undefined、null、Date、RegExp等）的对象可能不适用。
- 浅拷贝：只会拷贝对象的第一层属性，如果属性是对象，拷贝的是对象的引用。

## 你在前端工作中，如何处理压力和面对挑战？

- 前端工作中，压力和挑战是常有的事情，如何处理压力和面对挑战，是每个前端工程师都需要思考的问题。
- 处理压力和面对挑战的方法：
  - 保持积极的心态，不要轻易放弃。
  - 学会分析问题，找到问题的根源，有针对性地解决问题。
  - 学会沟通，和同事、领导、客户等多沟通，多交流，多学习。
  - 学会总结，总结工作中遇到的问题和解决方法，形成自己的知识体系。
  - 学会自我调节，适当的休息和放松，保持身心健康。
  - 学会自我提升，不断学习新知识，提高自己的技术水平。

## 什么是 event.target 和 event.currentTarget？

- event.target：触发事件的元素。
- event.currentTarget：绑定事件的元素。
- event.target 和 event.currentTarget 的区别：
  - event.target：触发事件的元素，可能是事件的源头，也可能是事件的目标。
  - event.currentTarget：绑定事件的元素，一般是事件的目标。

## 如何实现一个元素的拖拽？

- 实现一个元素的拖拽，可以通过原生JS或者JQuery来实现。
- 原生JS实现拖拽的步骤：
  - 给元素绑定mousedown事件，当鼠标按下时，记录鼠标按下的位置和元素的位置。
  - 给document绑定mousemove事件，当鼠标移动时，计算鼠标移动的距离，更新元素的位置。
  - 给document绑定mouseup事件，当鼠标松开时，取消mousemove事件。

## js事件坐标 screen、client、page、offset、layer 的区别

- **screenX、screenY**：
  - 鼠标相对于屏幕左上角的坐标。
- **clientX、clientY**：
  - 鼠标相对于浏览器窗口左上角的坐标。
- **pageX、pageY**：
  - 鼠标相对于页面左上角的坐标。
- **offsetX、offsetY**：
  - 以事件目标元素（即触发事件的元素）的padding box的左上角为参照点。
- **layerX、layerY**：
  - 则是以离点击处最近的有定位（position非static）的祖先元素的border box的左上角为参照点。
  - 如果没有这样的祖先元素，则相对于整个页面的body元素计算偏移。
  
> 以上坐标都是相对于视口的坐标，不随页面滚动而改变。
> 以上坐标都是相对于事件源元素的坐标，不随父元素的定位而改变。

## 利用 reduce 函数，将 树状结构扁平化

```javascript

const tree = [{
        id: 1,
        name: 'a',
        children: [{
                id: 2,
                name: 'b',
                children: [{
                        id: 3,
                        name: 'c',
                    },
                    {
                        id: 4,
                        name: 'd',
                    },
                ],
            },
            {
                id: 5,
                name: 'e',
            },
        ],
    },
    {
        id: 6,
        name: 'f',
    },
];

function flatten(tree) {
    return tree.reduce((result, node) => {
        const curNode = {...node };
        // 删除children属性
        delete curNode.children;

        result.push(curNode);
        if (node.children) {
            result.push(...flatten(node.children));
        }
        return result;
    }, []);
}

console.log(flatten(tree));
```

## commonJS 和 ES6 模块化的区别

- **CommonJS**：
  - 是一种模块化规范，Node.js采用了这种规范。
  - CommonJS模块的特点：
    - 所有代码都运行在模块作用域，不会污染全局作用域。
    - 模块可以多次加载，但只会在第一次加载时运行一次，然后缓存。
    - 模块加载的顺序，按照代码中出现的顺序。
    - 模块可以导出变量、函数、对象，使用module.exports导出。
    - 模块可以导入其他模块的输出，使用require()导入。
- **ES6模块化**：
  - ES6模块化是ECMAScript 6标准新增的模块化规范。
  - ES6模块化的特点：
    - ES6模块化是编译时加载，编译时生成静态代码。
    - ES6模块化是单例模式，只会加载一次，每次加载都是同一个实例。
    - ES6模块化是动态引用，可以在代码中任意位置引用，不受限制。
    - ES6模块化是静态分析，可以在编译时优化。
    - ES6模块化是默认导出和命名导出，使用export导出，使用import导入。
- **CommonJS和ES6模块化的区别**：
  - CommonJS是运行时加载，ES6模块化是编译时加载。
  - CommonJS是动态加载，ES6模块化是静态加载。
  - CommonJS是值拷贝，ES6模块化是值引用。
  - CommonJS是单例模式，ES6模块化是多例模式。
  - CommonJS是同步加载，ES6模块化是异步加载。

## 单例模式的实现

- **单例模式**：
  - 单例模式是一种常用的设计模式，保证一个类仅有一个实例，并提供一个访问它的全局访问点。
  - 单例模式的实现方式：
    - **懒汉式**：在第一次调用时实例化对象。
    - **饿汉式**：在类加载时就实例化对象。
    - **双重检查锁**：在懒汉式的基础上，加上双重检查锁，保证线程安全。
    - **静态内部类**：利用静态内部类的特性，实现延迟加载和线程安全。
    - **枚举**：利用枚举的特性，实现单例模式。
  - 单例模式的应用场景：
    - 需要频繁创建的对象。
    - 创建对象时耗时过多或耗资源过多，但又经常用到的对象。
    - 频繁访问数据库或文件的对象。
    - 需要保持唯一性的对象。
  - 单例模式的优点：
    - 保证一个类仅有一个实例。
    - 提供一个全局访问点。
    - 避免频繁创建和销毁对象，节省内存和性能。
  - 单例模式的缺点：
    - 单例模式一般没有接口，扩展困难。
    - 单例模式对测试不利，不容易模拟对象的行为。
    - 单例模式与单一职责原则冲突，一个类只能有一个实例，而且负责创建和管理单例的逻辑。
  - 例子：

当然可以，以下是单例模式的几种实现方式的代码例子：

### 懒汉式

在JavaScript中，懒汉式单例模式可以通过在第一次调用时创建对象来实现。

```js
class SingletonLazy {
    constructor(){
      if(SingletonLazy.instance){
        return SingleLazy.instance;
      }
      this.value = Math.random(); // 示例属性
      SingletonLazy.instance = this;
      return this;
    }

    static getInstance(){
      if(!SingletonLazy.instance){
        SingletonLazy.instance = new SingletonLazy();
      }

      return SingletonLazy.instance;
    }
}

// 使用
const instance1 = SingletonLazy.getInstance();
const instance2 = SingletonLazy.getInstance();
console.log(instance1 === instance2); // true
```

### 饿汉式

饿汉式在类加载（或脚本执行）时就实例化对象。

```js
class SingletonEager{
  constructor(){
    if(SingletonEager.instance){
      return SingletonEager.instance;
    }

    this.value = Math.random(); // 示例属性
    SingletonEager.instance = this;
  }
}

SingletonEager.instance = new SingletonEager();

Object.defineProperty(SingletonEager, 'getInstance', {
  value: function(){
    return SingletonEager.instance;
    },
  }
)

// 使用
const eagerInstance1 = SingletonEager.getInstance();
const eagerInstance2 = SingletonEager.getInstance();
console.log(eagerInstance1 === eagerInstance2); // true
```

### 使用闭包（模块模式）

在JavaScript中，可以利用闭包（或模块模式）来创建一个私有的实例，并提供一个全局的访问点。

```js
const SingletonModule = (function() {
    let instance;

    function createInstance() {
        const object = new Object('I am the instance');
        return object;
    }

    return {
        getInstance: function() {
            if (!instance) {
                instance = createInstance();
            }
            return instance;
        }
    };
})();

// 使用
const moduleInstance1 = SingletonModule.getInstance();
const moduleInstance2 = SingletonModule.getInstance();
console.log(moduleInstance1 === moduleInstance2); // true
```

### 使用ES6 Symbol和私有字段

在ES6中，可以使用Symbol和类的私有字段来实现单例模式。

```js
const SingletonSymbol = (function() {
    const instance = Symbol('instance');

    class Singleton {
        constructor(value) {
            if (Singleton[instance]) {
                return Singleton[instance];
            }
            this.value = value || Math.random();
            Singleton[instance] = this;
        }

        static getInstance(value) {
            if (!Singleton[instance]) {
                new Singleton(value);
            }
            return Singleton[instance];
        }
    }

    return Singleton;
})();

// 使用
const symbolInstance1 = SingletonSymbol.getInstance();
const symbolInstance2 = SingletonSymbol.getInstance();
console.log(symbolInstance1 === symbolInstance2); // true
```

## 问：new操作符具体干了什么呢？

- 在 JavaScript 中，当你使用 new 操作符来创建一个对象时，会发生几件事情：
  1. 创建一个新的空对象。
  2. 设置原型：将这个新对象的 隐式原型（**\__proto\__**）设置为构造函数的显式原型（prototype）属性。
  3. 改变 this 指向：调用 **构造函数**，并将这个 **新对象** 作为 **构造函数的 this 上下文**（也就是说，在构造函数内部，this 指向这个新对象）。
  4. 如果 **构造函数** 没有 **显式地返回一个对象**，则默认返回这个新对象。
     - 详细：
       - 如果构造函数 **没有显式地返回** 一个对象，JavaScript 引擎就会默认 **返回那个通过 new 操作符创建的新对象**。
       - 如果构造函数 **显式地返回** 了一个对象，那么返回的 **就是那个显式返回的对象**，而不是新创建的对象。// 如：return {a: 1}, 即返回这个对象，而不是 new 创建的对象。
       - 如果构造函数 **返回的是非对象类型**（如字符串、数字、布尔值等），那么这些返回值**会被忽略**，仍然 **返回那个通过 new 操作符创建的新对象**。
