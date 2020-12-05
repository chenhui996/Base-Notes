# Javascript 面试题

## 解释下变量提升?

- JavaScript 引擎的工作方式是:
  - 先解析代码:
    - '获取' 所有 '被声明的变量';
  - 然后再一行一行地运行;
- 这造成的结果:
  - 就是 '所有的变量' 的 '声明语句';
    - 都会被提升到代码的头部;
      - 这就叫做变量提升(hoisting);

---

```js
console.log(a); // undefined
var a = 1;
function b() {
  console.log(a);
}
b(); // 1
```

- 上面的代码 '实际执行顺序' 是这样的:
- 第一步:
  - 引擎将 var a = 1 拆解为 var a = undefined 和 a = 1 ;
    - 然后将 var a = undefined 放到最顶端;
      - a = 1 还在原来的位置;
- 这样一来代码就是这样:

```js
var a = undefined;
console.log(a); // undefined

a = 1;

function b() {
  console.log(a);
}
b(); // 1
```

- 第二步:
  - 就是执行;
    - js 引擎一行一行从上往下执行:
      - 就造成了当前的结果，这就叫变量提升;

## 一段 JavaScript 代码是如何执行的?

- 请移步至同目录下的 "Work.md"进行查阅;

## 理解闭包吗?

- 这个问题其实在问:
  - 闭包是什么?
  - 闭包有什么作用?

### 闭包是什么?

- MDN 的解释:
  - 闭包是:
    - '函数' 和 '声明该函数' 的:
      - '词法环境' 的 '组合';
- 按照作者的理解就是:
  - **'闭包 = '函数'' 和 '函数体内可访问的变量总和'**';
    - 举个简单的例子:

```js
(function () {
  var a = 1;
  function add() {
    var b = 2;
    var sum = b + a;
    console.log(sum); // 3
  }
})();
```

- **add 函数本身**:
  - 以及其内部可访问的变量:
    - 即 **a = 1** ;
      - 这 '两个组合' 在一起:
        - 就被称为闭包，仅此而已;

### 闭包的作用

- 闭包最大的作用就是:
  - **隐藏变量**;
- 闭包的一大特性就是:
  - '内部函数' 总是可以访问:
    - **其所在的外部函数中**
      - 声明的 '参数' 和 '变量';
        - 即使在其外部函数被返回(寿命终结)了之后;

> 基于此特性，JavaScript 可以实现私有变量、特权变量、储存变量等;

---

- 我们就以私有变量举例;
  - 私有变量的实现方法很多:
    - 有靠约定的(变量名前加`_`);
    - 有靠 Proxy 代理的;
    - 也有靠 Symbol 这种新数据类型的;

> 但是真正广泛流行的其实是使用闭包;

```js
function Person() {
  var name = "cxk";
  this.getName = function () {
    return name;
  };
  this.setName = function (value) {
    name = value;
  };
}

const cxk = new Person();

console.log(cxk.getName()); // cxk
cxk.setName("jntm");
console.log(cxk.getName()); // jntm
console.log(name); // name is not defined
```

- 函数体内的:

```js
var name = "cxk";
```

- 只有:
  - getName 和 setName;
    - 两个函数可以访问;
- 外部无法访问:
  - 相当于将 '变量私有化';

## JavaScript 的作用域链理解吗?

- JavaScript 属于 '静态作用域';
  - 即 '声明的作用域' 是根据:
    - 程序正文在 '编译时' 就 '确定的':
      - 有时也称为词法作用域;
- 其本质是:
  - JavaScript 在执行过程中:
    - 会创造 '可执行上下文';
      - 可执行上下文中的 '词法环境' 中:
        - 含有 '外部词法环境' 的 '引用';
          - 我们可以通过这个引用:
            - 获取外部词法环境的变量、声明等;

> 这些 '引用'串联起来 '一起指向全局的词法环境'，因此形成了 '作用域链';

## ES6模块与CommonJS模块有什么区别?

- ..