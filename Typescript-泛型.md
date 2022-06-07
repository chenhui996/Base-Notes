# 一文读懂 TypeScript 泛型及应用（ 7.8K字）

作者：阿宝哥
来源：https://juejin.cn/post/6844904184894980104

---

觉得 TypeScript 泛型有点难，想系统学习 TypeScript 泛型相关知识的小伙伴们看过来。

本文从```八个方面```入手，全方位带你一步步学习 TypeScript 中泛型，详细的```内容大纲```请看下图：

- 泛型是什么
- 泛型接口
- 泛型类
- 泛型约束
- 泛型参数默认类型
- 泛型条件类型
- 泛型工具类
- 使用泛型创建对象

---

## 一、泛型是什么

软件工程中，我们不仅要```创建```一致的```定义良好的 API```，同时也要考虑```可重用性```。

```组件```不仅能够```支持当前的数据类型```，同时也能```支持未来的数据类型```，这在创建```大型系统```时为你提供了十分```灵活的功能```。

在像 C# 和 Java 这样的语言中，可以```使用泛型来创建可重用的组件```，一个```组件```可以支持```多种类型的数据```。 这样用户就可以```以自己的数据类型```来使用组件。

设计泛型的关键目的是：在成员之间提供有意义的约束。这些成员可以是：类的```实例成员```、类的```方法```、```函数参数```和```函数返回值```。

---

为了便于大家更好地理解上述的内容，我们来举个例子，在这个例子中，我们将一步步揭示泛型的作用。

首先我们来定义一个```通用的 identity 函数```，该函数接收一个参数并直接返回它：

```ts
function identity (value) {
  return value;
}

console.log(identity(1)) // 1
```

现在，我们将 identity 函数做适当的调整，以支持 TypeScript 的 Number 类型的参数：

```ts
function identity (value: Number) : Number {
  return value;
}

console.log(identity(1)) // 1
```

这里 identity 的问题是我们将 Number 类型分配给```参数```和```返回类型```，使该函数仅可用于该原始类型。但该函数```并不是可扩展或通用的```，很明显这并不是我们所希望的。

我们确实可以把 Number 换成 any，我们失去了定义应该返回哪种类型的能力，并且在这个过程中使编译器失去了类型保护的作用。

我们的目标是让 ```identity 函数```可以```适用于任何特定的类型```，为了实现这个目标，我们可以使用```泛型```来解决这个问题，具体实现方式如下：

```ts
function identity <T>(value: T) : T {
    return value;
}

console.log(identity<Number>(1)) // 1
```

对于刚接触 TypeScript 泛型的读者来说，首次看到 <T> 语法会感到陌生。

但这没什么可担心的，就像传递参数一样，我们传递了：```我们想要用于 特定函数调用 的类型```。

参考上面代码：

- 当我们调用 ```identity<Number>(1)```，Number 类型就像参数 1 一样，它将在```出现 T 的任何位置 “填充该类型”```。
- <T>：
  - 图中 <T> 内部的 T 被称为 ```类型变量```，它是我们希望传递给 identity 函数的```类型占位符```。
  - 同时 T 被分配给 value 参数用来代替它的类型：
    - 此时 T 即可充当的各种类型，而不是特定的 Number 类型。

---

T 代表 Type，在```定义泛型时```通常用作第一个类型变量名称。

但实际上 T 可以用任何有效名称代替。除了 T 之外，以下是常见泛型变量代表的意思：

- K（Key）：表示对象中的键类型。
- V（Value）：表示对象中的值类型。
- E（Element）：表示元素类型。

---

其实并不是只能定义一个类型变量，我们可以引入希望定义的任何数量的类型变量。

比如我们引入一个新的类型变量 U，用于扩展我们定义的 identity 函数：

```ts
function identity <T, U>(value: T, message: U): T{
    console.log(message);
    return value;
}

console.log(identity<number, string>(68, "Semlinker"));
```

对于上述代码:

- 编译器足够聪明，能够知道我们的参数类型，并将它们赋值给 T 和 U，而不需要开发人员显式指定它们。
- 相比之前定义的 identity 函数:
  - 新的 identity 函数增加了一个类型变量 U，但该函数的```返回类型```我们仍然使用 T。

如果我们想要返回两种类型的对象该怎么办呢？

针对这个问题，我们有多种方案，其中一种就是使用```元组```，即为元组设置通用的类型：

```ts
function identity <T, U>(value: T, message: U) : [T, U] {
  return [value, message];
}
```

虽然使用元组解决了上述的问题，但有没有其它更好的方案呢？答案是有的，你可以使用泛型接口。

---

### 二、泛型接口

为了解决上面提到的问题，首先让我们创建：一个用于的 identity 函数通用 Identities 接口：

```ts
interface Identities<V, M> {
    value: V,
    message: M
}
```

在上述的 ```Identities``` 接口中，我们引入了 ```类型变量``` V 和 M，来进一步说明```有效的字母```都可以用于表示类型变量。
之后我们就可以将 ```Identities``` 接口作为 ```identity``` 函数的返回类型：

```ts
interface Identities<V, M> {
    value: V,
    message: M
}

function identity<T, U>(value: T, message: U): Identities<T, U> {
    console.log(value + ": " + typeof (value));
    console.log(message + ": " + typeof (message));
    let identities: Identities<T, U> = {
        value,
        message
    }

    return identities;
}

console.log(identity(68, "Semlinker"));
```

以上代码成功运行后，在控制台会输出以下结果：

```shell
68: number
Semlinker: string
{value: 68, message: "Semlinker"}
```

泛型出了可以应用在 ```函数``` 和 ```接口``` 之外，它也可以应用在类中，下面我们就来看一下 ```在类中如何使用泛型```。

## 三、泛型类

在类中使用泛型也很简单，我们只需要在```类名```后面，使用 <T, ...> 的语法定义任意多个```类型变量```，具体示例如下：

```ts
interface GenericInterface<U> {
    value: U
    getIdentity: () => U
}

class IdentityClass<T> implements GenericInterface<T>{
    value: T;

    constructor(value: T) {
        this.value = value
    }

    getIdentity(): T {
        return this.value
    }
}

const myNumberClass = new IdentityClass<Number>(68);
console.log(myNumberClass.getIdentity()); // 68


const myStringClass = new IdentityClass<String>("Semlinker");
console.log(myStringClass.getIdentity()); // Semlinker
```

接下来我们以实例化 myNumberClass 为例，来分析一下其调用过程： 

- 在实例化 ```IdentityClass``` 对象时，我们传入 ```Number``` 类型和构造函数参数值 ```68```。
- 之后在 ```IdentityClass``` 类中，类型变量 ```T``` 的值变成 ```Number``` 类型。
- ```IdentityClass``` 类实现了 ```GenericInterface<T>```。
  - 而此时 ```T``` 表示 ```Number``` 类型，因此等价于该类实现了 ```GenericInterface<Number>``` 接口。
- 而对于 ```GenericInterface<U>``` 接口来说，类型变量 ```U``` 也变成了 ```Number```。
  - 这里我故意使用不同的```类型变量名```：```以表明 类型值 沿链向上传播，且与变量名无关。```

---

```泛型类```可确保：在整个类中```一致地使用指定的数据类型```。

比如，在使用 Typescript 的 React 项目中使用了以下约定：

```ts
type Props = {
    className?: string
    //...
};

type State = {
    submitted?: bool
    //...
};

class MyComponent extends React.Component<Props, State> {
    // 在组件内部使用 props 与 state时，就能保证其二者是我们上面定义的 Props, State 类型。

    //...
}
```

在以上代码中，我们将```泛型与 React 组件```一起使用，以确保组件的 props 和 state 是类型安全的。

---

相信看到这里一些读者会有疑问，我们在什么时候需要使用泛型呢？

两个参考标准：

- 当你的函数、接口或类```将处理多种数据类型```时。
- 当函数、接口或类在```多个地方```使用该数据类型时。

很有可能你没有办法保证在项目早期就使用泛型的组件，但是随着项目的发展，组件的功能通常会被扩展。

这种增加的可扩展性最终很可能会满足上述两个条件。

```在这种情况下，引入泛型将比复制组件来满足一系列数据类型更干净。```

我们将在本文的后面探讨更多满足这两个条件的用例。不过在这样做之前，让我们先介绍一下 Typescript 泛型提供的其他功能。

## 四、泛型约束

有时我们可能希望限制：每个```类型变量```接受的```类型数量```，这就是泛型约束的作用。

下面我们来举几个例子，介绍一下```如何使用泛型约束```。

### 4.1 确保属性存在

有时候，我们希望```类型变量对应的类型上```存在某些属性。这时，除非我们```显式地```将```特定属性定义为类型变量```，否则编译器不会知道它们的存在。

一个很好的例子：

- 在处理```字符串或数组```时，我们会假设 length 属性是可用的。

让我们再次使用 identity 函数并尝试输出参数的长度：

```ts
function identity<T>(arg: T) : T {
    console.log(arg.length); // Error
    return arg;
}
```

在这种情况下，编译器将不会知道 ```T``` 确实含有 ```length``` 属性，尤其是在可以将```任何类型```赋给类型变量 ```T``` 的情况下。

我们需要做的就是：让类型变量 ```extends``` 一个含有我们所需属性的接口，比如这样：

```ts
interface Length {
    length: number;
}

function identity<T extends Length>(arg: T): T {
    console.log(arg.length); // 可获取到length属性
    return arg;
}

const result = {
    length: 10,
}

console.log(identity(result));
```

```T extends Length``` 用于告诉编译器，我们支持已经实现 Length 接口的任何类型。

之后，当我们使用```不含有 length 属性的对象```作为参数调用 identity 函数时，TypeScript 会提示相关的错误信息：

```ts
identity(68); // Error
// Argument of type '68' is not assignable to parameter of type 'Length'.(2345)
```

此外，我们还可以使用 ```,``` 号来分隔多种约束类型，比如：```<T extends Length, Type2, Type3>```。

而对于上述的 ```length``` 属性问题来说：如果我们```显式```地将```变量设置为数组类型```，也可以解决该问题，具体方式如下：

```ts
function identity<T>(arg: T[]): T[] {
   console.log(arg.length);  
   return arg; 
}

// or
function identity<T>(arg: Array<T>): Array<T> {      
  console.log(arg.length);
  return arg; 
}

console.log(identity([1, 2, 3]));
console.log(identity('45678'.split('')));
```