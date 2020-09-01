# TypeScript

- 推荐用 vscode 进行编译:
  - 因为 vscode 是基于 typescript 进行编译的;
- 默认情况下，ts 文件的后缀是:
  - draft.ts

## 将 ts 文件转换成 js 文件

- 在命令行输入：

```
$tsc index.ts
```

- 然后，目录下即生成一个新的.js 结尾的文件;

### --outDir

- 指定编译文件输出目录:

```
$tsc --outDir ./dist ./ts_kkb/exp1.ts
```

- 执行后:
  - exp1.js 文件，将会在./dist 文件夹下生成;

### --target

- 指定编译的代码版本:
  - 默认为 ES3;
  - 所以要用--target 进行代码版本控制;

```
$tsc --outDir ./dist --target es5 ./ts_kkb/exp1/ts
```

- 这样，代码编译后，将是基于 es5 版本的 js 代码文件;

### --watch

- 在监听模式下运行:
  - 当文件发生改变时，自动进行编译:

```
$tsc --outDir ./dist --target es5 --watch ./ts_kkb/exp1/ts
```

- 自动：可以理解成类似 nodemon 的自动化;

## 编译配置文件

- 每次编译都调用那么长的命令，太繁琐，所以 tsc 支持我们进行————编译配置文件

### tsconfig.json

- 所有配置文件，都直接在此文件下进行配置， 然后编译成一个命令，统一执行;

```json
{
  "compilerOptions": {
    "outDir": "./dist",
    "target": "ES6",
    "watch": true
  },
  "include": ["./src/**/*"]
}
```

- include: 指定 ts 编译起效的目录;
- `**`: 所有目录(包括子目录);
- `*`: 所有文件，也可以指定类型文件;

- 配置完成后，只需要在命令行输入：
  - tsc，即可运行;
  - 要注意的是:
    - 直接用 tsc，要 cd 进 tsconfig.json 的当前目录内;
    - 由于在 dist 文件下生成了 js 文件，其中声明的变量名称重复了，故会有报错，说咱们'重复定义'了变量名，无视即可;

### --project

- 使用--project 或-p 指定配置文件目录;
  - 默认是加载该目录下的 tsconfig.json 文件;
- 若配置文件不叫 tsconfig.json:

```
tsc -p ./configs/ts.json
```

## 动态类型语言&静态类型语言

### 动态类型语言

- 程序'运行期间'才做数据类型检查的语言，如: JavaScript

### 静态类型语言

- 程序'编译期间'做数据类型检查的语言，如：Java

## 静态类型语言的优缺点

### 优点：

- 程序编译阶段(配合 IDE、编辑器甚至可以在编码阶段)：
  - 即可发现一些潜在错误;
  - 避免程序在'生产环境'运行了以后再出现错误;
- 编码规范、有利于团队开发协作、也更有利于大型项目开发、项目重构;
- 配合 IDE、编辑器提供更强大的代码智能提示/检查;
- 代码即文档;

### 缺点

- 麻烦;
- 缺少灵活性;

## 动态类型语言的优缺点

### 优点

- 静态类型语言的缺点;

### 缺点

- 静态类型语言的优点;

## 类型系统

- 类型系统包含两个重要的组成部分：
  - 类型标注(定义、注解) - typing;
  - 类型检测(检查) - type-checking;

### 类型标注

- 在代码中给'数据'添加类型说明:
  - 变量
  - 函数(参数、返回值)
- 当一个变量或函数(参数)等被标注以后：
  - 就'不能存储'或'传入'与'标注类型不符合'的'类型';
- 有了标注，TypeScript 编译器就能按照标注对这些数据进行类型合法检测;
- 有了标注，各种编辑器、IDE 等就能进行智能提示;

### 类型检测

- 对'类型'数据进行检测;
  - 注意，检查的是类型，不是值;
  - 值是业务层具体逻辑;

## 类型标注

- 在 ts 中，基本语法格式:
  - 数据载体: 类型;
- ts 的类型标注:
  - 基础的简单的类型标注;
  - 高级的深入的类型标注;

### null 和 undefind

- 是所有类型的子类型：
  - 所有类型的值，都可以设置为 null 和 undefind,不会报错;
- 所有未标注的对象的类型，都为 any;

### strictNullChecks

- 严格的空值检查字段;
- 写在 tsconfig.json 的配置项;
  - strictNullChecks:true

## 内置对象类型

### 对象标注

```ts
let a: Object = {};
```

### 数组标注

```ts
let arr: Array<number> = [1, 2, 3];
```

### 日期标注

```ts
let a: Date = new Date();
```

### 字面量标注：

- 对象内容若有属性：
  - 必须在声明变量名处'挨个'标注完整;

```ts
let a: { username: string; age: number } = {
  username: "cain",
  age: 100,
};
```

- 缺点：
  - 不太方便;
  - 不利于复用;
- 解决方案：
  - 用接口的形式:
    - 提高复用性;

### 接口

- 给类型定义名称;
- 只存在与源码和编译过程;
  - 最后通过 tsc 编译成 js 后，interface 是不存在的;
  - 是给编译器看的;

```ts
interface Person {
  username: string;
  age: number;
}

let a: Person = {
  username: "cain",
  age: 100,
};

let a1: Person = {
  username: "snake",
  age: 123131,
};
```

- 优点:
  - 复用性高;
- 缺点:
  - 接口只能作为类型标注使用;
    - 不能作为具体值;
    - 它只是一种抽象的结构定义,并不是实体;
      - 没有具体的功能实现;
- 解决方案：
  - 类与构造函数

### 类与构造函数

- 实现既能定义，又能引用;
- 与 interface 不同的是，编译后:
  - 约束参数结构的部分去除;
    - 只留类的构造函数的部分的;

```ts
class Person {
  // username: string
  constructor(public username: string, public age: number) {}
}

let user: Person = new Person("cain", 18);
```

- 用类的方式，就即能标注 user 对象，又能引用其构造函数;
- 优点：
  - 功能相对强大，定义实体的同时也定义了对应的类型;
- 缺点：
  - 复杂：
    - 比如只想约束某个函数'接收'的'参数结构';
    - 没有必要去定一个类;
    - 使用接口会更加简单(所以是根据需求，具体情况，具体分析);

### 包装对象

- 指的是 JS 中的:
  - String
  - Number
  - Boolean
- 我们知道，string 与 String 不一样;
- 在 ts 中也是如此;

```ts
// 错误的：
let a: string = new String("1");

// 正确的：
let b: String = new String("1");
b = "1";
```

- 原因：
  - 字符串有的，字符串对象一定有;
  - 字符串对象有的，字符串不一定有;
    - 会损失数据;

## 数组类型

- 数组是什么？
  - 一类具有相同特性的数据的有序集合;
  - 这里需要注意两个点:
    - 相同特性;
    - 有序的;
- 所以，引出的 ts 中的数组存储：
  - 数组存储的'类型必须一致';
    - 在标注数组类型时：
      - 同时要标注数组中存储的数据类型;

```ts
// 数字类型数组
let arr1: Array<number> = [1, 2, 3];

// 字符串类型数组
let arr2: string[] = ["a", "b", "c"];
```

- 但是若我硬是想在一个数组里面，添加多个类型的数据呢？咋搞？
  - 不多说————元组

## 元组类型

- 元组类似数组，但是存储的元素类型不必相同;
- 但是需要注意:
  - '初始化数据'的'个数'以及'对应位置'标注类型必须一致;
  - '越界数据'必须是'元组标注'中的'类型之一';
    - 标注越界数据可以不用对应顺序 - 联合类型

```js
// 初始化时注意：顺序、类型和数量，这3个点都必须对应;
let data: [string, number] = ["cain", 11];

// 初始化完成后，就可以正常添加元素了
// 正确的:
data.push(1);
data.push("aaa");

// 错误的:
data.push(true);
// 原因: 标注类型中'标注的数组data',未允许含有boolean类型的元素;
```

## 枚举类型

- 枚举的作用：
  - 组织收集一组'关联数据'的方式;
- 通过枚举:
  - 可以给一组有'关联意义'的数据赋予一些友好的名字;

```ts
enum HTTP_CODE {
  // key不能是数字，只能是字符
  // value可以是数字和字符串，不能是其他类型的值
  // 数字类型枚举
  // 字符串类型枚举
  OK = 200,
  NOT_FOUND = 404,
  // 默认为0,但是如下不为零，他会是其上一个非字符串的key，的枚举值+1
  METHOD_NOT_ALLOWED,
  // 所以它是405
}

// 200
HTTP_CODE.OK;
// 一旦在enum中被确定，将不能再用right引用改值;
// 因为，当前它是一个只读的属性;
```

- 编译后还可以看到，enum 是一种自枚举的形式;
  - HTTP_CODE.OK 可以访问到 200;
  - HTTP_CODE.200 可以访问到 OK;
- 枚举名称推荐使用全大写：
  - 因为其标注值是常量;

## 无值类型

- 表示没有任何数据的类型;
- 通常用于标注'无法返回值函数'的返回值类型;
- 函数默认标注类型为: void;

```js
function fn(): void {
  // 没有return 或者renturn undefind
  return;
}
let v = fn();
// 你写了返回值，就会报错;
```

- 只有在非严格模式下，null 才能被 return 返回，而不报错;

## Never 类型

- 当一个函数永远不可能执行 return 的时候;
  - 返回的就是 never;
- 与 void 不同:
  - void 是执行了 return，只是没有值;
  - never 是不会执行 return:
    - 比如抛出错误，导致函数终止执行;

```ts
function fn(): never {
  throw new Error("error");
}
```

## 任意类型

- any 类型，不多说，你懂的;

## 未知类型

- unknow 类型
  - 仅能赋值给 unknow、any
  - 没有任何属性和方法

## 函数类型

- 函数类型标注格式:
  - 参数
  - 返回值

```ts
// 函数名称(参数1: 类型, 参数2: 类型, 参数3: 类型): 返回值类型;
function add(x: number, y: number): number {
  return x + y;
}
```

# 接口 interface

- 怎样才算掌握?
  - 理解接口的概念;
  - 学会通过接口标注复杂结构的对象;
    <br>
- 概念:
  - 对复杂的对象类型进行标注的一种方式;
  - 给其他代码定义一种"不可违背"的契约;
- 接口的'基础语法'定义结构:

```ts
interface Point {
  x: number;
  y: string;
}
```

- 定义好了一个类型 Point;
  - 我们用起来：

```ts
// 通过上面的接口Point来给一个'数据'进行'类型标注'
let p1: Point = {
  x: 100,
  y: "cain",
};
```

- 注意：
  - 接口是一种'类型'，不能作为'值'使用;

### readonly

- 在定义 interface 时，还可以给定义的属性加上只读属性：readonly;

```ts
interface Point {
  readonly x: number;
  readonly y: string;
  color?: string;
  // 属性后面加？，代表这个属性在给一个'数据'进行'类型标注'时，可以不用此属性;
}
```

### 任意属性

- 我们不可能永远能预先在 interface 里写好所有的类型;
  - 所以需要给一个可扩展的属性 ———— 任意属性;
  - 直接上代码:

```ts
interface Point {
  readonly x: number;
  readonly y: string;
  color?: string;

  // [key: string]:number;
  // 由于color与[key: string]类型冲突，故要改写：
  [key: string]: string | underfind;
  // key 只能被标注为'数字'或'字符串';
}
```

- 定义任意属性时:
  - 若定义的是字符串类型;
  - 但是数据类型是数字,那么会进行隐式转换;
    - 将数字转成字符串;

### 标注函数的 interface

```ts
interface Point {
  (x: number, y: string): number;
}

let fn1: Point = function (a: number, b: string): number {
  return a + b;
};
```

## 高级类型

- 掌握？
  - 满足更多的标注需求,使用:
    - 联合类型
    - 交叉类型
    - 字面量类型
  - 简化标注操作,使用:
    - 类型别名
    - 类型推导
  - 掌握'类型断言'的使用;

### 联合类型

- 也可以称为:
  - 多选类型;
- 标注'一个变量'为'多个类型之一'时;
  - 可以选择联合类型标注;
- 它们之间是'或'的关系;

```ts
function css(el: Element, attr: string, value: string | number) {
  return value;
}

let box = document.querySelector("div");

// 其中，value可能是字符串，也可能是数字

if (box) {
  // 字符串的情况：
  css(box, "width", "100px");

  // 数字的情况
  css(box, "opacity", 1);
}
// 所以，要用到联合类型
```

### 交叉类型

- 交叉类型也可以称为:
  - 合并类型;
    - 把多种类型合并到一起;
    - 成为一种新的类型;
    - '且'的关系;
- 对一个对象进行扩展:

```ts
interface o1 {
  x: number;
  y: string;
}
interface o2 {
  z: boolean;
}

// 由于target转换成es5，故Object.assign会提示报错;
let obj: o1 & o2 = Object.assign({}, { x: 1, y: "cain" }, { z: true });
// 解决方案：
// 在tsconfig.json中:
// target的转换输出成es6;
// 用lib配置第三方库:
// lib:['ES2015']

// 这个时候，obj就拥有x y z三个属性;
// 验证：咱们在ts中引用不会报错，即说明交叉类型使用成功;
obj.x;
obj.y;
obj.z;
```

- 用 & 将两个 interface 标注合并成一个，一起使用;
- 记得 tsconfig.json 中 lib 配置的坑;

### 字变量类型

- 标注的不是某个类型:
  - 而是一个'固定值';
- 配合'联合类型'会更有用;

```ts
// 简单来说，标注了字变量类型，你以后'只能引用'标注的那些'固定的值'了;
function setPosition(
  el: Element,
  direction: "left" | "top" | "right" | "bottom"
) {
  return direction;
}

let boxW = document.querySelector("div");

// ok
boxW && setPosition(boxW, "bottom");

// err
// box&&setPosition(box, 'haha');
```

#### 使'类型别名'定义'函数'类型

- type 来定义函数类型;

```ts
type callback = (a: string) => string;
let fn: callback = function (a) {};

// 或者直接
let fn: (a: string) => string = function (a) {};
```

#### interface 与 type 区别

- interface:
  - 只能描述:
    - object
    - class
    - function
  - 同名 interface 自动合并，利于扩展;
- type:
  - 不能重名;
  - 能描述所有数据;

### 类型推导

- 每次都'显式标注类型'会比较麻烦;
- TS 提供了一种更加方便的特性:
  - 类型推导
- TS 编译器会根据'当前上下文':
  - 自动推导出对应的类型标注;
  - 这个'过程'发生在:
    - 初始化变量
    - 设置函数默认参数值
    - 返回函数值

```ts
// 自动推断x为number
let x = 1;
// err
x = "a";

// 函数推导：根据'参数的默认值'和'函数的返回值'，进行自动推断'两者'的'类型';
function fn(a = 1) {
  return a * a;
}
// 参数a的类型标注将被赋予number类型
// fn的返回值的类型标注将被赋予number类型;
```

- 字面量类型推导:

```ts
function fn(a = 1) {
  if (true) {
    return 100;
  } else {
    return "cain";
  }
}
// 鼠标放在fn上，即可看到:
// function fn(a?: number): 100 | "cain"
```

### 类型断言

- 标注一个更加精确的类型(缩小类型标注范围);

```ts
let img = document.querySelector("#img");
// 明显，img的类型为Element;
// 但是Element是元素的统称，不够精确;

// 所以可以写成:
let img = <HTMLImageElement>document.querySelector("#img");

// 或:
let img = document.querySelector("#img") as HTMLImageElement;
```

## 函数详解

- 掌握?
  - 掌握 TS 中的'函数类型标注';
  - 函数'可选参数'和'参数默认值';
  - 剩余参数;
  - 函数中的 this;
  - 函数重载;

### 函数的标注

- 一个函数的标注包含:
  - 参数
  - 返回值

```ts
// 例1:
function fn(a1: string): string {
  return a1;
}

// 例2:
let fn2: (a2: string) => string = function (a2) {
  return a2;
};

// 例3:
type callback = (a3: string) => string;

let fn3: callback = function (a3) {
  return a3;
};

// 例4:
interface ICallBack {
  (a: string): string;
}
let fn4: ICallBack = function (a4) {
  return a4;
};
```

### 可选参数和默认参数

#### 可选参数

- 通过'参数名'后面添加 ? 来标注该参数是可选的;

```ts
function css(el: Element, attr: string, value?: any) {
  return attr;
}

let div = document.querySelector("div");

// 正常
div && css(div, "width", "100px");
// value可选，所以不加的情况
div && css(div, "width");
```

#### 默认参数

- 我们还可以给'参数'设置默认参数
  - 有默认值的参数:
    - 也是可选的
  - 设置了'默认值'的参数可以根据值:
    - 自动推导类型

```ts
// 定义一个函数，一个显式的数组标注，一个直接给予默认值参数
function sort(items: Array<number>, order = "desc") {
  return items;
}

// order是直接给予默认值的参数，是可选的;
// order可传可不穿，不穿，默认用desc;
sort([1, 2, 3]);

// 在传默认值的情况下，用'联合类型'来限定值
function sort2(items: Array<number>, order: "desc" | "abc" = "desc") {
  return items;
}
```

#### 剩余参数

- 剩余参数是一个数组;
  - 标注时要注意;

```ts
interface IObj {
  [key: string]: any;
}
function merge(target: IObj, ...other: Array<IObj>) {
  return other;
}
let newObj = merge({ x: 1 }, { y: 2 }, { z: 3 });
// 简单来说，就是对一整个数组进行标注;
```

### 函数中的 this

- 函数中的 this 类型，怎么标注？
  - 普通函数;
  - 箭头函数;

#### 普通函数

- 对于普通函数而言:
  - this 是会随着调用环境的变化而变化的;
  - 所以默认情况下，普通函数中的 this 被标注为 any;
- 我们可以在函数的第一个参数位上:
  - 显式的标注 this 的类型;

```ts
interface T {
  a: number;
  fn: (x: number) => void;
}

let obj: T = {
  a: 1,
  // 注意，需要在首位显式的标注this，且其标注的this不占参数位
  fn(this: T, x: number) {
    return x;
  },
};
```

- 或用'断言'的方式进行标注:

```ts
interface T {
  a: number;
  fn: (x: number) => void;
}
let obj: T = {
  a: 1,
  // 注意，需要在首位显式的标注this，且其标注的this不占参数位
  fn(x: number) {
    return (<T>this).a;
  },
};
// 不好，因为每次都要声明，还要写在函数内部;
```

#### 箭头函数

- 箭头函数中的 this 取决于函数的作用域;
  - 直接写在箭头函数外的作用域上定义;

### 函数重载

- 有的时候，同一个函数会:
  - 接收'不同类型'的参数;
  - 返回'不同类型'的返回值;
- 我们可以使用'函数重载'来实现;
```ts
function showOrHide(
  el: Element,
  attr: string,
  value: "block" | "none" | number
) {
  //
}

let div = document.querySelector("div");

if (div) {
  showOrHide(div, "display", "none");
  showOrHide(div, "opacity", 1);
  // 由于咱css比较6，主观上不会写错;
  // 但是ts就是给写错的时候准备的;
  // 假设写成：showOrHide( div, 'display', 1 );
  // 就报错了;
}
// 所以，对于这个例子，我们需要的是'一对对正确的'css样式'组合';
// 不能随便拼接

// 我们来看看'函数重载'

// display的情况
function showOrHide2(el: HTMLElement, attr: "display", value: "block" | "none");
// opacity的情况
function showOrHide2(el: HTMLElement, attr: "opacity", value: number);
// 其他情况
function showOrHide2(el: HTMLElement, attr: any, value: any) {
    el.style[attr] = value;
}

let div2 = document.querySelector("div");

if (div2) {
  showOrHide2(div2, "display", "none");
  showOrHide2(div2, "opacity", 1);
  // err
  // showOrHide2(div2, "opacity", "none");
}
```


