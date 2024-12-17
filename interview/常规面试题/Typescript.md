# TypeScript高频面试题及解析

- 这篇文章是关于 TypeScript 高频面试题及解析的整理。
- 涵盖: **类型系统**、**函数与类**、**泛型**、**模块化** 等众多方面。
  
基本概念：

- 接口 interface
- 枚举 enum
- 联合类型等
- 也有高级概念如协变逆变等
  
还介绍了各种特性：

- 可选参数
- 默认参数等
  
并通过代码示例进行说明，对理解 TypeScript 相关知识及应对面试有帮助。

> 本文整理了一些TypeScript 的面试题，一起来看看吧！

面试题涉及了 TypeScript 语言的各个方面，包括 **基本语法**、**类型系统**、**函数**、**类**、**模块化**、**泛型**、**装饰器**等。在面试中，常见的 TypeScript 面试题主要围绕以下几个方面展开：

- **类型系统**：考察对 TypeScript 类型系统的理解，包括 **基本类型**、**联合类型**、**交叉类型**、**接口**、**类型别名**、**类型推断**、**类型守卫**等。
- **函数和类**：涉及 **函数** -> **参数类型**、**返回值类型**、**箭头函数**、**函数重载**、**类的定义**、**继承**、**访问修饰符** 等概念。
- **泛型**：考察在 **函数、类和接口** 中如何使用 **泛型** 来增加：代码的**灵活性**和**复用性**。
- **模块化**：问题可能涉及 ES6 模块化的语法、**导入导出方式** 以及 **模块解析** 等内容。
- **装饰器**：了解对 **装饰器的使用**，包括 **类装饰器**、**方法装饰器**、**属性装饰器** 以及 **参数装饰器** 的**定义和应用**。
- **编译配置**：熟悉 tsconfig.json 中的 **配置选项**，包括 **编译目标**、**模块系统**、**严格模式**等。
- **工程化实践**：了解 TypeScript 在项目中的**实际应用**，如与 **JavaScript 的混用**、**第三方库的声明文件使用**、**类型声明**等。

> 下面是上述涵盖内容的具体面试题～

## 什么是TypeScript

- TypeScript 是:
  - 一种由微软开发的 **开源编程语言**，它是JavaScript的超集。
    - 超集: TypeScript包含了JavaScript的所有功能，并在此基础上添加了一些新的特性。
  - TypeScript通过添加:
    - **静态类型**
    - **类**
    - **接口**
    - **模块**
  - 等功能，使得在 **大型应用程序** 中更容易进行 **维护** 和 **扩展**。
  - 它可以被编译为纯 JavaScript，从而能够在任何支持JavaScript的地方运行。
  - 使用TypeScript可以 -> 帮助开发人员:
    - 编码过程中, 避免一些常见的错误。
    - 提供更好的 **代码编辑** 功能和 **工具支持**。

## 类型声明 和 类型推断 的区别，并 举例应用

- **类型声明**: **显式** 的为 变量 或 函数 **指定类型**。
- **类型推断**: TypeScript 根据 **赋值语句** 其 **右侧的值**，**自动推断** 变量的类型。例如：

```ts
// 类型声明
let x: number;
x = 10;
// 类型推断
let y = 20; // TypeScript会自动推断y的类型为number
```

- 类型声明的优点:
  - 可以 **明确** 变量的类型，提高代码的 **可读性**。
- 类型推断的优点:
  - 简化代码，减少 **重复** 的类型声明。
  - 使代码更加 **简洁**。

## 什么是接口（interface），它的作用，接口的使用场景。接口和类型别名（Type Alias）的区别

### 接口

- interface：
  - 用于 **描述** 对象的形状的 **结构化类型**。
  - 它定义了 -> 对象 -> 应该包含哪些: **属性**和 **方法**。
  - 在TypeScript中，接口可以用来:
    - **约束对象的结构**，以提高代码的 **可读性**和 **维护性**。例如：

```ts
interface Person {
    name: string;
    age: number;
}
function greet(person: Person) {
    return `Hello, ${person.name}!`;
}
```

- **接口** 的使用场景:
  - 在 **函数** 或 **类** 中: 用于 **约束参数** 或 **属性** 的类型。
  - 在 **对象** 的 **结构化描述** 中: 用于 **定义对象的形状**，也就是数据的 **结构**。

### 类型别名

- **类型别名**:
  - Type Alias
  - 用于给 **类型** 取一个 **别名**。
  - 可以用来定义 **基本类型**、**联合类型**、**交叉类型** 等。
  - 例如，定义一个 **字符串** 类型的别名：

```ts
type Name = string;
let name: Name = 'Alice';
```

- **接口** 和 **类型别名** 的区别:
  - **接口**:
    - 只能用来 **描述对象的结构**。
    - 可以 **扩展** 和 **继承**。
  - **类型别名**:
    - 可以用来 **描述任意类型**。（基本类型、联合类型、交叉类型等）
    - 不能 **扩展** 和 **继承**。

## 什么是泛型（Generics），它的作用，泛型的使用场景

- **泛型**:
  - Generics
  - 是一种在定义 **函数、类或接口** 时使用 **类型参数** 的方式。以增加代码的 **灵活性** 和 **重用性**。
  - 用于 **增强代码的灵活性** 和 **复用性**。
  - 可以在 **函数**、**类** 和 **接口** 中使用泛型。
  - 通过 **泛型**，可以 **延迟** 决定 **类型**，在使用时再指定具体的类型。
  - 例如，定义一个 **泛型函数**：

```ts
function identity<T>(arg: T): T {
      return arg;
}
let output = identity<string>('hello');
```

- **泛型** 的使用场景:
  - 在 **函数** 中: 用于 **约束参数** 和 **返回值** 的类型。
  - 在 **类** 中: 用于 **约束属性** 和 **方法** 的类型。
  - 在 **接口** 中: 用于 **描述对象** 的 **结构**。

## 枚举（enum）是什么，它的优势，应用案例。枚举和常量枚举的区别

### 枚举

- **枚举**:
  - Enum
  - 一个常量，用于定义 **一组命名**。
  - 枚举类型可以为一组数值赋予 **友好的名字**。
  - 例如，定义一个 **颜色枚举**：

```ts
enum Color {
      Red,
      Green,
      Blue
}
let c: Color = Color.Green;
```

- **枚举** 的优势:
  - 提高代码的 **可读性** 和 **可维护性**。
  - 避免使用 **魔法数**，使代码更加 **清晰**。
    - 魔法数: 代码中直接使用的数字，不容易理解。
  - 可以通过 **枚举值** 获取 **枚举名**，也可以通过 **枚举名** 获取 **枚举值**。
    - 例如，通过 **枚举值** 获取 **枚举名**：
      - `let colorName: string = Color[2]; // 输出: 'Blue'`
    - 通过 **枚举名** 获取 **枚举值**：
      - `let colorValue: number = Color['Green']; // 输出: 1`

### 常量枚举

- **常量枚举**:
  - Const Enums
  - 常量枚举是一种 **优化**，在编译阶段会被 **删除**。
  - 常量枚举会在使用的地方直接 **内联** 枚举值，而不会创建一个 **对象**。
  - 例如，定义一个 **常量枚举**：

```ts
const enum Direction {
      Up,
      Down,
      Left,
      Right
}

let directions = [Direction.Up, Direction.Down, Direction.Left, Direction.Right];
```

- **枚举** 和 **常量枚举** 的区别:
  - **枚举**:
    - 在 **运行时** 会生成一个 **对象**。
    - 可以通过 **枚举值** 获取 **枚举名**，也可以通过 **枚举名** 获取 **枚举值**。
  - **常量枚举**:
    - 在 **编译阶段** 会被 **删除**。
    - 会在使用的地方直接 **内联** 枚举值，而不会创建一个 **对象**。
      - 内联: 将 **枚举值** 直接替换到使用的地方。
      - 优点: 减少了 **运行时** 的开销。

## 如何处理 可空类型（nullable types）和 undefined类型，如何正确处理这些类型 以 避免潜在错误

### 可空类型

- **可空类型**:
  - Nullable Types
  - 在TypeScript中，可空类型是指：
    - 一个变量 -> 可以存储 -> 特定类型的 **值**，也可以存储 **null** 或 **undefined**。
    - 通过使用 **可空类型**，开发者可以:
      - 明确表达 -> 一个变量可能包含 **特定类型的值**，也可能 **不包含值（即为null或undefined）**。
    - 有助于提高代码的 **可读性**，并使得 **变量的可能取值范围** 更加 **清晰**。
    - 为了声明一个可空类型，可以使用联合类型（Union Types），例如 number | null 或 string | undefined。例如：

```ts
let numberOrNull: number | null = 10; 
numberOrNull = null; // 可以赋值为null 
    
let stringOrUndefined: string | undefined = "Hello"; 
stringOrUndefined = undefined; // 可以赋值为undefined
```

- **正确处理可空类型**:
  - 例如，使用 **类型断言** 处理 **可空类型**：

```ts
let z: number | null = null;
let result = z!.toFixed(); // 使用非空断言操作符'!'，避免空值错误
```

- **正确处理undefined类型**:
  - 例如，使用 **类型守卫** 处理 **undefined类型**：

```ts
let x: number | undefined = undefined;
if (x !== undefined) {
      let result = x.toFixed(); // 使用类型守卫，避免undefined错误
}
```

> 使用 **类型断言** 不能处理 **undefined类型**，因为 **undefined类型** 也是一种 **有效值**。因此，需要使用 **类型守卫** 来处理 **undefined类型**。

## 什么是联合类型和交叉类型

### 联合类型

- **联合类型**:
  - Union Types
  - 联合类型是指 -> 变量 -> 可以存储 -> 多种类型的 **值** 中的 **一种**。
  - 使用 **竖线**（|）分隔多个类型，表示 -> 变量 -> 可以是 -> 这些类型中的 **任意一种**。
  - 例如，定义一个 **联合类型** 的变量：

```ts
let value: string | number;
value = "Hello"; // 可以存储字符串
value = 10; // 可以存储数字
```

- **联合类型** 的优势:
  - 增加了代码的 **灵活性**，使得变量可以存储多种类型的值。

### 交叉类型

- **交叉类型**:
  - Intersection Types
  - 交叉类型是指 -> 变量 -> 可以同时具有 -> 多种类型的 **属性** 和 **方法**。
  - 使用 **&** 运算符连接多个类型，表示 -> 变量 -> 同时具有 -> 这些类型的 **属性** 和 **方法**。
  - 例如，定义一个 **交叉类型** 的变量：

```ts
interface A {
      a: number;
}
interface B {
      b: string;
}
let ab: A & B = { a: 1, b: "hello" };
```

- **交叉类型** 的优势:
  - 可以将多个类型的 **属性** 和 **方法** 合并到一个变量中，提高代码的 **复用性**。

## 什么是类型守卫（Type Guards），如何使用类型守卫

- **类型守卫**:
  - Type Guards
  - 类型守卫是一种在TypeScript中 -> 用于 **判断变量类型** 的技术。
  - 通过使用 **类型守卫**，可以在代码中 -> **明确** 变量的类型，从而避免 **类型错误**。
  - 例如，使用 **typeof** 运算符进行 **类型守卫**：

```ts
function isNumber(x: any): x is number {
      return typeof x === "number";
}
let value: any = 10;
if (isNumber(value)) {
      let result = value.toFixed(); // 可以安全地调用number类型的方法
}
```

- **类型守卫** 的优势:
  - 可以在代码中 -> **明确** 变量的类型，避免 **类型错误**。
  - 提高代码的 **可读性** 和 **可维护性**。

## 什么是TypeScript中的声明文件（Declaration Files）

- **声明文件**:
  - Declaration Files
  - 在TypeScript中，声明文件是一种 -> 用于描述 **第三方库** 或 **模块** 的 **类型定义** 的文件。
  - 声明文件通常以 **.d.ts** 为后缀，用于告诉TypeScript编译器 -> 第三方库或模块的 **类型信息**。
  - 通过使用声明文件，可以为 **JavaScript库** 提供 **类型定义**，以便在TypeScript项目中 **使用这些库时** -> 获得 **智能感知** 和 **类型安全**。
  - 例如，定义一个 **声明文件** jquery.d.ts：

```ts
declare var $: (selector: string) => any;
```

- **声明文件** 的优势:
  - 可以为 **第三方库** 提供 **类型定义**，提高代码的 **可读性** 和 **可维护性**。
  - 可以在TypeScript中 -> 安全地使用 **JavaScript库** 的功能。

## 什么是命名空间（Namespace）和模块（Module）

### 命名空间

- **命名空间**:
  - Namespace
  - 命名空间是一种在TypeScript中 -> 用于 **组织代码** 和 **避免命名冲突** 的技术。
  - 通过使用 **命名空间**，可以将相关的 **接口**、**类** 和 **函数** -> 组织到一个 **命名空间** 中，以提高代码的 **可读性** 和 **可维护性**。
  - 例如，定义一个 **命名空间** Shapes：

```ts
namespace Shapes {
      export interface Shape {
          draw(): void;
      }
      export class Circle implements Shape {
          draw() {
              console.log("Circle is drawn");
          }
      }
}

// 使用命名空间中的类
let circle = new Shapes.Circle();
circle.draw();
```

### 模块

- **模块**:
  - Module
  - 模块是一种在TypeScript中 -> 用于 **组织代码** 和 **实现模块化** 的技术。
  - 通过使用 **模块**，可以将相关的 **接口**、**类** 和 **函数** -> 封装到一个 **模块** 中，以提高代码的 **可复用性** 和 **可维护性**。
  - 例如，定义一个 **模块** Shapes：

```ts
export interface Shape {
      draw(): void;
}
export class Circle implements Shape {
      draw() {
          console.log("Circle is drawn");
      }
}

// 使用模块中的类
import { Circle } from "./Shapes";
let circle = new Circle();
circle.draw();
```

## TypeScript中的可选参数和默认参数是什么

- **可选参数**:
  - Optional Parameters
  - 在TypeScript中，函数的参数可以使用 **?** 符号 -> 表示为 **可选参数**。
  - **可选参数** 可以在函数调用时 -> 不传递值，而使用默认值。
  - 例如，定义一个带有 **可选参数** 的函数：

```ts
function greet(name?: string) {
      if (name) {
          return `Hello, ${name}!`;
      } else {
          return `Hello!`;
      }
}
let message = greet(); // 不传递参数
console.log(message); // 输出: Hello!
```

- **默认参数**:
  - Default Parameters
  - 在TypeScript中，函数的参数可以使用 **=** 符号 -> 指定默认值。
  - **默认参数** 可以在函数调用时 -> 不传递值，而使用默认值。
  - 例如，定义一个带有 **默认参数** 的函数：

```ts
function greet(name: string = "World") {
      return `Hello, ${name}!`;
}
let message = greet(); // 不传递参数
console.log(message); // 输出: Hello, World!
```

- **可选参数** 和 **默认参数** 的优势:
  - 提高代码的 **灵活性**，使得函数的参数可以在调用时 -> 不传递值，而使用默认值。

## 索引类型（Index Types）是什么，好处有什么

- **索引类型**:
  - Index Types
  - 在TypeScript中，索引类型是一种 -> 用于 **描述对象的索引签名** 的技术。
  - 通过使用 **索引类型**，可以在对象中 -> 使用 **索引** 来访问属性的值。
    - 允许我们在 TypeScript 中创建具有 **动态属性名称** 的对象，并且能够根据 **已知的键** 来获取 **相应的属性类型**。
  - 例如，定义一个带有 **索引类型** 的对象：

```ts
interface Person {
      [key: string]: string;
}
let person: Person = {
      name: "Alice",
      age: "30"
};
console.log(person["name"]); // 输出: Alice
console.log(person["age"]); // 输出: 30
```

### 索引类型的优势
  
### 动态属性访问

- 在处理 **动态属性名** 的对象时：
  - 可以使用 **索引类型** 来实现类型安全的属性访问。
  - 例如，当从服务器返回的 JSON 数据中提取属性时：
  - 可以利用 **索引类型** 来确保 **属性名存在** 并获取其 **对应的类型**。

### 代码重用

- 可以在对象中 -> 使用 **动态属性名称**，提高代码的 **可复用性**。
- 当需要创建 **通用函数** 来操作 **对象属性** 时，**索引类型** 可以帮助我们实现更加通用和灵活的代码。
  - 例如，一个通用的函数可能需要根据传入的属性名称获取属性值，并进行特定的处理。

```ts
interface ServerData {
  id: number;
  name: string;
  age: number;
  // 可能还有其他动态属性
}
function getPropertyValue(obj: ServerData, key: keyof ServerData): void {
  console.log(obj\[key]); // 确保 obj\[key] 的类型是正确的 // 这里可以直接使用索引类型来获取属性值
}
```

### 动态扩展对象

- 当需要处理来自外部来源（比如 API 响应或数据库查询）的动态数据时，索引类型可以让我们轻松地处理这种情况，而不必为每个可能的属性手动定义类型。

```ts
interface ServerData {
    id: number;
    name: string;
    age: number;
    // 可能还有其他动态属性
}
function processServerData(data: ServerData): void {
    // 处理数据
}
```

### 类型安全性

- 索引类型可以增强代码的类型安全性，因为它们可以捕获可能的属性名拼写错误或键不存在的情况。(自动提示)

```ts
interface ServerData {
    id: number;
    name: string;
    age: number;
}

function getPropertyValue(obj: ServerData, key: keyof ServerData): void {
    console.log(obj\[key]); // 确保 obj\[key] 的类型是正确的
}
```

### 映射类型

- 在 TypeScript 中，映射类型（Mapped Types）是一种强大的工具，允许你**基于现有类型创建新类型**
  - 并按照一定规则对 -> 类型中的属性 -> 进行**转换或重新映射**。
  - 它们通常用于:
    - 将一个**对象类型** -> **每个属性** -> 按照某种模式 -> 转换为 -> 另一个**对象类型**的属性。
- 映射类型通过 **type 关键字** 和 **一种特殊的语法来定义**，语法如下：
  
```ts
type MappedType = {
  [Property in KeyType]: TypeOfProperty;
};
```

- 其中：
  - PropertyType 是: 你要映射的 -> 目标类型的 -> 属性类型。
  - KeyType 是：你要遍历的 -> 键的类型，通常是一个 **联合类型** 或者 **对象的键的类型**。
- 实例：

```ts
// 假设我们有一个简单的接口 Person：
interface Person {
  name: string;
  age: number;
  location: string;
}

// 我们可以使用映射类型来创建一个新类型，其中每个属性的类型都被转换为 string 类型:

type AllStrings = {
  [Property in keyof Person]: string;
};
 
// 等价于
// type AllStrings = {
//   name: string;
//   age: string;
//   location: string;
// };
```

- 在这个例子中：
  - keyof Person 生成一个联合类型 'name' | 'age' | 'location'。
  - [Property in keyof Person] 遍历这些键。
  - 每个键的类型都被映射为 string。

#### 条件映射

- 你也可以在映射过程中加入条件逻辑。
  - 例如，我们可以创建一个映射类型，将 Person 中数值类型的属性转换为 string，而其他属性保持不变：

```ts
// 假设我们有一个简单的接口 Person：
interface Person {
  name: string;
  age: number;
  location: string;
}

type ConditionalMapping = {
  [Property in keyof Person]: Person[Property] extends number ? string : Person[Property];
};

// 等价于
// type ConditionalMapping = {
//   name: string;
//   age: string;
//   location: string;
// };
```

#### 实用场景

- 映射类型在 TypeScript 中非常有用，特别是在以下场景中：
  - 当你需要**批量转换对象类型的属性**时。
  - 当你希望**基于现有类型**创建**具有相似结构但属性类型不同的新类型**时。
  - 在使用**高级类型操作**（如条件类型、泛型等）时，提供更灵活的类型控制。

> 总的来说，映射类型是 TypeScript 类型系统中一个非常强大和灵活的特性，能够极大地提高类型安全和代码的可维护性。

## const和readonly的区别

- **const**:
  - const 是 TypeScript 中的关键字，用于声明一个 **只读变量**。
  - const 声明的变量 -> 不能被重新赋值。
  - 例如，定义一个 **只读变量**：

```ts
const PI = 3.14;
PI = 3.14159; // Error: Cannot assign to 'PI' because it is a constant.
```

- **readonly**:
  - readonly 是 TypeScript 中的关键字，用于声明一个 **只读属性**。
  - readonly 声明的属性 -> 不能被重新赋值。
  - 例如，定义一个 **只读属性**：

```ts
class Circle {
      readonly PI = 3.14;
}
let circle = new Circle();
circle.PI = 3.14159; // Error: Cannot assign to 'PI' because it is a read-only property.
```

> 总结来说，const主要用于 **声明常量值**，而readonly则用于 **标记类的属性使其只读**。

## TypeScript 中 any 类型的作用是什么，滥用会有什么后果

- 在TypeScript中，any类型的作用是：
  - 允许我们在编写代码时 -> **不指定具体的类型** -> 从而可以接受 **任何类型** 的值。
  - 使用any类型相当于 -> **放弃** -> 对该值的 **静态类型** 检查，使得代码在 **编译阶段** 不会对这些值进行类型检查。
- 主要情况下，any类型的使用包括以下几点：
  - **绕过**：
    - **不确定**一个变量或表达式的**具体类型**时，可以使用any类型来**暂时绕过**类型检查。
  - **动态匹配**：
    - 与**动态类型**的JavaScript代码交互时，可以使用any类型来处理这些**动态类型的值**。
  - **过于复杂**：
    - 有时候某些**操作难以明确地定义其类型**，或者需要**较复杂的类型推导**时，也可以使用any类型。

### 滥用的后果

- 尽管any类型提供了灵活性，但由于它会放弃TypeScript的静态类型检查，因此滥用any类型可能会降低代码的健壮性和可维护性。当滥用any类型时，可能会导致以下后果：
  - **代码可读性下降**：在编译阶段不会报错，但实际上可能是一个错误
  - **潜在的运行时错误**：在编译阶段不会报错，但在运行时会引发错误
  - **类型安全受损**：编译器无法推断返回值的具体类型
- 可能引入未知的运行时行为和错误。降低了代码的可维护性和可读性，因为难以理解某些变量或参数的具体类型。

> 因此，在实际开发中，应尽量避免过度使用any类型。可以通过合适的**类型声明**、**接口定义**和**联合类型**等方式，提高代码的**健壮性**和**可维护性**。

## TypeScript中的this有什么需要注意的

- 在TypeScript中，与JavaScript相比，this的行为基本上是一致的。
- 然而，TypeScript提供了 **类型注解** 和 **类型检查**，可以帮助开发者更容易地理解和处理this关键字的使用。

> Typescript中箭头函数的 this 和 ES6 中箭头函数中的 this 是一致的。

- 在TypeScript中，当将noImplicitThis设置为true时，意味着在函数或对象中使用this时，**必须显式声明this的类型**。
- 这一设置可以帮助开发者更明确地指定this的类型，以避免因为隐式的this引用而导致的潜在问题。
- 具体来说，如果将noImplicitThis设置为true，则在下列情况下必须显式声明this的类型：
  - 在函数内部使用this时，需要使用箭头函数或显示绑定this。
  - 在某些类方法或对象方法中，需要明确定义this的类型。
- 示例代码如下所示：

```ts
class MyClass {
  private value: number = 42;

  public myMethod(this: MyClass) {
    console.log(this.value);
  }

  public myMethod2 = () => {
    console.log(this.value);
  }
}

let obj = new MyClass();
obj.myMethod(); // 此处必须传入合适的 this 类型
```

- 通过将noImplicitThis设置为true，TypeScript要求我们在使用this时明确指定其类型，从而在编译阶段进行更严格的类型检查，帮助避免一些可能出现的错误和不确定性。

> 注：noImplicitThis是TypeScript编译器的一个配置选项，用于控制在函数或对象方法中使用this时的严格性。
> 当将noImplicitThis设置为true时，意味着必须显式声明this的类型，否则会触发编译错误。

## TypeScript数据类型

- 在TypeScript中，常见的数据类型包括以下几种：
  - **基本类型**：
    - **number**
    - **string**
    - **boolean**
    - **null、undefined**
    - **symbol**: 表示唯一的、不可变的值
  - **复合类型**：
    - **array**: 表示 **数组**，可以使用number[]或Array<number>来声明其中元素的类型。
    - **tuple**: 表示 **元组**，用于表示固定数量和类型的数组。
      - 例：`let tuple: [number, string] = [1, 'hello']`;
    - **enum**: 表示 **枚举类型**，用于定义具名常量集合。
      - 例：`enum Color { Red, Green, Blue }`
  - **对象类型**：
    - **object**：
      - 表示**非原始类型**，即除number、string、boolean、symbol、null或undefined之外的类型。
    - **interface**：
      - 用于描述 **对象的结构**，并且可以重复使用。
  - **函数类型**：
    - **function**: 表示函数类型。
    - **void**: 表示函数没有返回值。
    - **any**: 表示任意类型。
  - **高级类型**：
    - **联合类型 union types**: 表示一个值可以是几种类型之一。
    - **交叉类型 intersection types**: 表示一个值同时拥有多种类型的特性。

## interface可以给Function/Array/Class（Indexable）做声明吗？

- 在TypeScript中，interface可以用来声明 **函数、数组和类**（具有**索引签名**的**类**）。下面是一些示例代码：

1. **函数**：

```ts
interface MyFunction {
      (x: number, y: number): number;
}
let add: MyFunction = function(x, y) {
      return x + y;
};
console.log(add(1, 2)); // 输出: 3
```

2. **数组**：

```ts
interface MyArray {
      [index: number]: string;
}
let myArray: MyArray = ["a", "b", "c"];
console.log(myArray[1]); // 输出: b
```

3. **类**（具有索引签名的类）：

```ts
interface MyDictionary {
      [key: string]: string;
}
class Dictionary implements MyDictionary {
      [key: string]: string;
}
let dict = new Dictionary();
dict["name"] = "Alice";
dict["age"] = "30";
console.log(dict["name"]); // 输出: Alice
```

- implements：用于实现接口，表示类实现了接口中定义的属性和方法。

## TypeScript中的 协变、逆变、双变 和 抗变 是什么

- 在TypeScript中：
  - **协变（Covariance）**
  - **逆变（Contravariance）**
  - **双变（Bivariance）**
  - **抗变（Invariance**
- 是与 **类型相关** 的概念，涉及到 **参数类型** 的 **子类型关系**。
- 下面对这些概念进行解释，并提供**示例代码**。

### 协变（Covariance）

- **协变**是指：
  - **区别**：协变意味着 **子类型** 可以 **赋值** 给 **父类型**。
  - **应用场景**：数组类型是协变的，因此可以将 **子类型的数组** 赋值给 **父类型的数组**。

> 协变表示类型T的子类型可以赋值给类型U，当且仅当T是U的子类型。
> 在TypeScript中，数组是协变的，这意味着可以将子类型的数组赋值给父类型的数组。

```ts
// 1. 假设我们有这样一个Animal类型，它很简单，只有一个name属性：
type Animal = { name: string };

// 2. 然后，我们定义了一个Dog类型，它是Animal的一个子类型，因为它除了name属性外，还增加了一个breed属性来表示狗的品种：
type Dog = Animal & { breed: string };

// 3. 现在，我们创建了一个Dog类型的数组，里面包含了一些狗的对象：
let dogs: Dog[] = [{ name: "Fido", breed: "Poodle" }];

// 接下来，我们要展示协变的作用了。
// 你看，我们可以把这个Dog类型的数组 -> 直接赋值 -> 给一个Animal类型的数组变量，而TypeScript编译器不会报错：
let animals: Animal[] = dogs; // 这里发生了协变，Dog[] 被当作 Animal[] 来用

// 这是因为Dog是Animal的子类型，所以Dog[]（Dog类型的数组）也被视为Animal[]（Animal类型的数组）的子类型。
// 这就是协变在TypeScript中的实际应用
```

### 逆变（Contravariance）

- **逆变**是指：
  - **区别**：逆变意味着 -> 一个 **接受子类型参数的函数** 可以被当作 **接受超类型（或父类型）参数的函数**来使用。
  - **应用场景**：函数参数类型是逆变的，因此可以将接受 **子类型参数的函数** 赋值给 **接受超类型参数的函数变量**。

> 逆变表示类型T的超类型可以赋值给类型U，当且仅当T是U的子类型。
> 在TypeScript中，函数参数是逆变的，这意味着可以将超类型的函数赋值给子类型的函数。

```ts
type Logger<T> = (arg: T) => void;
let logNumber: Logger<number> = (x: number) => console.log(x);
let logAny: Logger<any> = logNumber; // 函数参数是逆变的，这是合法的

// 上面例子，父类型是Logger<any>，子类型是Logger<number>，因为number是any的子类型，所以Logger<number>是Logger<any>的子类型。
// 这个赋值是合法的，因为logNumber函数能够处理number类型的参数，而any类型的参数可以包含number类型的值。
```

### 双变（Bivariance）

- **双变**是指：
  - **区别**：双变意味着 -> 既可以将 **子类型赋值给父类型**，也可以将 **父类型赋值给子类型**。
  - **应用场景**：双变是 **协变** 和 **逆变** 的结合，可以在 **需要时** 既支持 **协变**，也支持 **逆变**。
  - strictFunctionTypes 选项：在TypeScript中，可以通过 **strictFunctionTypes** 选项来控制函数类型的 **协变** 和 **逆变** 行为。

> 双变表示类型T和U是彼此的子类型，当且仅当T是U的子类型，U是T的子类型。
> 在TypeScript中，双变是一种折中的方式，可以同时支持协变和逆变。

```ts
interface Animal {
    makeSound(): void;
}

interface Dog extends Animal {
    bark(): void;
}

let animal: Animal;
let dog: Dog = { makeSound: () => {}, bark: () => {} };

// 双变行为：将子类型的对象赋值给父类型的变量
animal = dog;

// 尝试双变行为（在严格模式下可能会报错）：将父类型的对象赋值给子类型的变量
// 注意：这在实际应用中通常是不安全的，因此不建议这样做
dog = animal; // 这行代码在严格模式下会报错，因为Animal不一定是Dog
```

### 抗变（Invariance）

- **抗变**是指：
  - **区别**：抗变意味着 -> 不能将 **子类型赋值给父类型**，也不能将 **父类型赋值给子类型**。
  - **应用场景**：抗变是 **协变** 和 **逆变** 的 **反向**，通常用于 **不允许类型转换** 的场景。

> 抗变表示类型T和U是彼此的超类型，当且仅当T和U是不相关的类型。
> 在TypeScript中，抗变是一种不允许类型转换的方式，通常用于不允许类型转换的场景。

#### 抗变的例子

- **元组类型**：
  - 元组是TypeScript中的一个特性，它允许你表示一个已知元素数量和类型的数组，各元素的类型不必相同。
  - 在元组类型中，抗变意味着你不能将一个元素类型不同的元组赋值给另一个元组，即使它们包含的元素数量相同。

```ts
let tuple1: [number, string] = [1, "hello"];
let tuple2: [string, number];

// 下面的赋值会报错，因为元组的元素类型不匹配
tuple2 = tuple1; // Error: Type '[number, string]' is not assignable to type '[string, number]'.
```

- **泛型类型参数（在特定情况下）**:
  - 当泛型类型参数被用于某些特定的位置时，比如作为函数参数的类型时，它们可能表现出抗变特性。
  - 这意味着你不能将一个具体类型的函数赋值给一个期望不同具体类型参数的函数变量，即使这两个类型之间存在子类型关系。

```ts
type Identity<T> = (arg: T) => T;

let identityNumber: Identity<number> = (x: number) => x;
let identityAny: Identity<any>;

// 下面的赋值在严格模式下会报错，因为Identity<number>不是Identity<any>的子类型（抗变）
identityAny = identityNumber; // Error in strict mode: Type 'Identity<number>' is not assignable to type 'Identity<any>'.
```

## TypeScript中的静态类型和动态类型有什么区别

- 静态类型是在 **编译期间** 进行类型检查，可以在 **编辑器** 或 **IDE** 中 发现大部分**类型错误**。
- 动态类型是在 **运行时** 才确定 **变量的类型**，通常与**动态语言**相**关联**。

### 静态类型（Static Typing）

- **定义**：
  - 静态类型是指 -> 在**编译阶段** -> 进行 -> 类型检查的类型系统。
  - 通过**类型注解**或**推断** -> 确定**变量、参数和返回值**的 **类型**。
- **特点**：
  - 静态类型能够 -> 在编码阶段 -> 就发现大部分类型错误，提供了更好的代码健壮性和可维护性。
- **优势**：
  - 可以在 **编辑器** 或 **IDE** 中实现**代码提示**、**自动补全**和 **类型检查**，帮助开发者减少错误并提高代码质量。

### 动态类型（Dynamic Typing）

- **定义**：
  - 动态类型是指 -> 在运行时 -> 才确定变量的类型，通常与 **动态语言相关联**，允许 -> **同一个变量** -> 在不同时间 -> **引用** -> **不同类型的值**。
- **特点**：
  - 动态类型使得 -> 变量的类型 -> 灵活多变，在运行时 -> 可以根据 -> 上下文或条件 -> **动态地** -> 改变 -> 变量的类型。
- **优势**：
  - 动态类型可以带来更大的灵活性，适用于一些需要频繁变化类型的场景。

```ts
// 动态类型（Dynamic Typing） 

// 例子1
let x: any = 10; // x 是一个 number 类型
x = "Hello"; // x 变成了 string 类型

// 例子2
// 使用 unknown 类型来处理不确定类型的数据
let unknownValue: unknown = "This could be anything";

// 你不能直接对 unknown 类型的值进行操作
// console.log(unknownValue.length); // Error: Property 'length' does not exist on type 'unknown'.

// 你需要先检查类型
if (typeof unknownValue === "string") {
    console.log(unknownValue.length); // 现在我们知道它是一个字符串，可以安全地访问 length 属性
}

// 或者使用类型断言
let stringValue = unknownValue as string;
console.log(stringValue.length); // 使用类型断言后，TypeScript认为它是一个字符串
```

### 区别总结

- **时机差异**：
  - 静态类型在 **编译期间** 进行类型检查。
  - 而动态类型是在 **运行时** 才确定变量的类型。
- **代码稳定性**：
  - 静态类型有助于在编码阶段发现大部分类型错误，提高代码稳定性。
  - 动态类型对类型的要求较为灵活，但可能增加了代码的不确定性。
- **使用场景**：
  - 静态类型适合于大型项目和团队，能够提供更强的类型安全性。
  - 动态类型适用于快速原型开发和灵活多变的场景，能够更快地迭代和测试代码。（any啥的较多）

## 介绍TypeScript中的可选属性、只读属性和类型断言

- **可选属性**： 使用 ? 来标记一个属性可以存在，也可以不存在。
- **只读属性**： 使用 readonly 关键字来标记一个属性是只读的。
- **类型断言**： 允许将一个实体强制指定为特定的类型，使用 <Type> 或 value as Type。

```ts
// 可选属性
interface Person {
  name: string;
  age?: number; // 可选属性
}

// 只读属性
interface Point {
  readonly x: number;
  readonly y: number;
}
let p1: Point = { x: 10, y: 20 };
p1.x = 5; // Error: 只读属性无法重新赋值

// 类型断言
let someValue: any = "hello";
let strLength: number = (someValue as string).length;
```

## TypeScript 中的模块化是如何工作的，举例说明

- TypeScript 中使用 ES6 模块系统，可以使用 import 和 export 关键字来导入和导出模块。
- 可以通过 export default 导出默认模块，在导入时可以使用 import moduleName from 'modulePath'。

## 如何约束泛型参数的类型范围

- 可以使用泛型约束（**extends关键字**）来限制泛型参数的类型范围，确保 **泛型参数** 符合某种**特定的条件**。

```ts
interface Lengthwise {
  length: number;
}
function loggingIdentity<T extends Lengthwise>(arg: T): T {
  console.log(arg.length);
  return arg;
}
loggingIdentity({length: 10, value: 3});  // 参数满足 Lengthwise 接口要求，可以正常调用
```

## 什么是泛型约束中的 keyof 关键字，举例说明其用法

- keyof 是 TypeScript 中用来 -> 获取对象类型 -> 所有键（属性名）-> 的操作符。
- 可以使用 keyof 来定义泛型约束，限制泛型参数为某个对象的键。

```ts
function getProperty<T, K extends keyof T>(obj: T, key: K) {
  return obj[key];
}
let x = { a: 1, b: 2, c: 3 };
getProperty(x, "a"); // 正确
getProperty(x, "d"); // 错误：Argument of type '"d"' is not assignable to parameter of type '"a" | "b" | "c"'
```

## 什么是条件类型（conditional types），能够举例说明其使用场景吗

- 条件类型是 TypeScript 中的高级类型操作符，可以根据一个 **类型关系** 判断 **结果类型**。
- 例如，可以使用 **条件类型** 实现一个 **类型过滤器**，根据**输入**类型**输出**不同的**结果**类型。

```ts
type NonNullable<T> = T extends null | undefined ? never : T;
type T0 = NonNullable<string | null>;  // string
type T1 = NonNullable<string | null | undefined>;  // string
type T2 = NonNullable<string | number | null>;  // string | number
```

## 什么是装饰器，有什么作用，如何在TypeScript中使用类装饰器

- 装饰器是 -> 一种**特殊类型**的**声明**，可以附加到**类、方法、访问符、属性或参数上**，以修改其行为。
- 在 TypeScript 中，装饰器提供了一种在 -> 声明时 -> 定义 -> 如何处理类的方法、属性或参数的机制。

如何在 TypeScript 中使用类装饰器：

```ts
type ConstructorType = new (...args: any[]) => {};

function classDecorator<T extends ConstructorType>(constructor: T) {
  return class extends constructor {
    newProperty = "new property";
    hello = "override";
  };
}

@classDecorator
class Greeter {
  property = "property";
  hello: string;
  constructor(m: string) {
    this.hello = m;
  }
}
console.log(new Greeter("world")); // 输出 { property: 'property', hello: 'override', newProperty: 'new property' }
```

## 类装饰器 和 方法装饰器 的执行顺序是怎样的

- 当有多个装饰器应用于同一个声明时（比如一个类中的方法），它们将按照 **自下而上** 的顺序应用。
  - 例子：

```ts
// 多个装饰器应用于同一个类

function firstClassDecorator(target: any) {
  console.log("firstClassDecorator called");
}

function secondClassDecorator(target: any) {
  console.log("secondClassDecorator called");
}

@firstClassDecorator
@secondClassDecorator
class Example {}

// 输出：
// secondClassDecorator called
// firstClassDecorator called
```

- 对于方法装饰器，它们将按照 **从下到上** 的顺序被依次调用。
  - 例子：

```ts
// 方法装饰器

function firstMethodDecorator(target: any, key: string, descriptor: PropertyDescriptor) {
  console.log("firstMethodDecorator called");
}

function secondMethodDecorator(target: any, key: string, descriptor: PropertyDescriptor) {
  console.log("secondMethodDecorator called");
}

class Example {
  @firstMethodDecorator
  @secondMethodDecorator
  method() {}
}

// 输出：
// secondMethodDecorator called
// firstMethodDecorator called
```

## 装饰器工厂是什么，请给出一个装饰器工厂的使用示例

- 装饰器工厂是 -> 一个返回装饰器 -> 的**函数**。它可以接受参数，并根据参数动态生成装饰器。
- 以下是一个简单的装饰器工厂示例：

```ts
function color(value: string) {
  return function (target: any, propertyKey: string) {
    // ... 在此处使用 value 和其他参数来操作装饰目标
  };
}

class Car {
  @color('red')
  brand: string;
}
```

## TypeScript 中 type 和 interface 的区别?

- 相同点：
  - 都可以描述 **对象** 或者 **函数**。
  - 都允许 **拓展**（extends）。
- 不同点：
  - **type** 可以声明 **基本类型**、**联合类型**、**元组**。interface不行
  - **type** 可以使用 **typeof** 获取实例的类型进行赋值。interface不行
  - **多个相同的 interface 声明可以自动合并**。
- 使用 interface 描述‘数据结构’，使用 type 描述‘类型关系’
  - 为什么？
    - **这通常是一个最佳实践的建议，但不是硬性规定。**
    - interface 更适合定义对象的结构，因为它们更直观且易于理解，特别是在定义类的时候。  
    - 而 type 则更灵活，可以用于定义复杂的类型关系：
      - 如**联合类型、交叉类型、映射类型**等
      - 这些用 interface 来表达可能会比较困难或不够直观。

## TypeScript 中 ?.、??、!、!.、_、** 等符号的含义？

- 一个个来：
  - **?.**：可选链操作符，用于简化访问可能为 null 或 undefined 的属性的代码。
  - **??**：空值合并操作符，用于提供默认值，当左侧的操作数为 null 或 undefined 时，返回右侧的操作数。
    - 例子：`let x = a ?? b; // 如果 a 为 null 或 undefined，则 x = b，否则 x = a`
  - **!**：非空断言操作符，用于断言一个值不为 null 或 undefined。
    - 例子：`let x!: number; // 声明 x 为 number 类型，但不赋值`
  - **!.**：非空断言操作符，用于断言一个值不为 null 或 undefined。
    - 例子：`let x!: number; // 声明 x 为 number 类型，但不赋值`
  - **_**：下划线，通常用于表示一个不重要的变量，或者表示一个未使用的参数。
    - 例子：`function foo(_a: number, b: number) { return b; }`
  - **\*\***：幂运算符，用于计算一个数的幂。
    - 例子：`let x = 2 ** 3; // x = 8`

## 简单介绍一下 TypeScript 模块的加载机制？

- 假设有一个导入语句 `import { a } from "moduleA"`;

 1. 首先，编译器会 -> 尝试定位 -> 需要 -> 导入的模块文件，通过 **绝对或者相对的路径** 查找方式；
 2. 如果上面的解析失败了，没有查找到对应的模块，编译器会 -> 尝试定位 -> 一个外部模块声明（.d.ts）；（逐级向上查找 node_modules 文件夹）
 3. 最后，如果编译器还是不能解析这个模块，则会抛出一个错误 error TS2307: Cannot find module 'moduleA'.

## 简单聊聊你对 TypeScript 类型兼容性的理解？

- **ts 类型兼容**：
  - 当一个类型 Y  -> 可以赋值给另一个 -> 类型 X 时:
    - 我们就可以说:
      - 类型 X 兼容类型 Y
      - 也就是说两者在结构上是一致的，而不一定非得通过 extends 的方式继承而来。
  - 也就是所谓的 -> 协变

```ts
interface X {
  a: any;
  b: any;
}

interface Y {
  a: any;
  b: any;
  c: any;
}

let x: X = { a: 1, b: 2 };
let y: Y = { a: 1, b: 2, c: 3 };

x = y; // OK
```

- **接口的兼容性：**
  - X = Y
    - 只要目标类型 X 中声明的属性变量在源类型 Y 中都存在就是兼容的（ Y 中的类型可以比 X 中的多，但是不能少）
    - 还是协变概念。

- **函数的兼容性：**
  - X = Y  
  - Y 的每个参数必须能在 X 里找到对应类型的参数，参数的名字相同与否无所谓，只看它们的类型

## TypeScript 中同名的 interface 或者同名的 interface 和 class 可以合并吗？

- 同名的interface会自动合并，同名的interface和class会自动聚合。

```ts
interface A {
  a: string;
}

interface A {
  b: string;
}

let a: A = { a: "hello", b: "world" };

class B {
  a: string;
}

interface B {
  b: string;
}

let b: B = { a: "hello", b: "world" };
```

## 如何使 TypeScript 项目引入并识别编译为 JavaScript 的 npm 库包？

- 选择安装 ts 版本，npm install @types/包名 --save；
- 对于没有类型的 js 库，需要编写同名的.d.ts文件

## TypeScript 的 tsconfig.json 中有哪些配置项信息？

```json
{
  "files": [],
  "include": [],
  "exclude": [],
  "compileOnSave": false,
  "extends": "",
  "compilerOptions": { ... }
}
```

- **files**: 是一个数组列表，里面包含指定文件的相对或绝对路径，用来指定待编译文件，编译器在编译的时候只会编译包含在files中列出的文件。
- **include & exclude**: 指定编译某些文件，或者指定排除某些文件。
- **compileOnSave：true**: 让IDE在保存文件的时候根据tsconfig.json重新生成文件。
- **extends**: 可以通过指定一个其他的tsconfig.json文件路径，来继承这个配置文件里的配置。
- **compilerOptions**: 编译配置项，如何对具体的ts文件进行编译

## TypeScript 中如何设置模块导入的路径别名？

- 通过 tsconfig.json 中的 paths 项来配置:

```json
{ 
  "compilerOptions": 
    {
      "baseUrl": ".", 
      "paths": { 
         "@helper/*": ["src/helper/*"], 
         "@utils/*": ["src/utils/*"], 
         ... 
      } 
   } 
}
```

## declare，declare global 是什么？

- declare 是用来定义 **全局变量、全局函数、全局命名空间、js modules、class等**
- declare global 为 -> 全局对象 window -> 增加新的属性
  
```ts
declare var jQuery: (selector: string) => any;
declare function jQuery(selector: string): any;

declare namespace jQuery {
  function ajax(url: string, settings?: any): void;
}

declare global {
  interface Window {
    myVar: string;
  }
}
```

## 对 TypeScript 类中成员的 public、private、protected、readonly 修饰符的理解？

- **public**: 成员都默认为public，被此限定符修饰的成员是 -> 可以被外部访问。
- **private**: 被此限定符修饰的成员是 -> 只可以被类的内部访问。
- **protected**: 被此限定符修饰的成员是 -> 只可以被类的内部以及类的子类访问。
- **readonly**: 关键字将属性设置为只读的。 只读属性 -> 必须在 **声明时** 或 **构造函数里** 被初始化。

## keyof 和 typeof 关键字的作用？

- **keyof**: 用于获取 **对象类型的所有键**（属性名）的联合类型。
- **typeof**: 用于获取 **实例的类型** 进行赋值。

```ts
interface Person {
  name: string;
  age: number;
}

type PersonKeys = keyof Person; // "name" | "age"

// -------------------------------------------------

let person: Person = { name: "Alice", age: 30 };

let key: keyof typeof person; // "name" | "age"
```

## 简述工具类型 Exclude、Omit、Merge、Intersection、Overwrite的作用

#### Exclude<T, U>

- 从 T 中排除出可分配给 U的元素。

#### Omit<T, K>

- 忽略T中的某些属性。

#### Partial<Type>

- 构造一个类型，将Type的所有属性设置为 **可选**。

#### Required<Type>

- 构造一个类型，将Type的所有属性设置为 **必选**。

#### Readonly<Type>

- 构造一个类型，将Type的所有属性设置为 **只读**。
  
#### Record<Keys, Type>

- 构造一个类型，其属性名的类型为Keys，属性值的类型为Type。

```ts
type CatName = "miffy" | "boris" | "mordred";

interface CatInfo {
  age: number;
  breed: string;
}

const cats: Record<CatName, CatInfo> = {
  miffy: { age: 10, breed: "Persian" },
  boris: { age: 5, breed: "Maine" },
  mordred: { age: 16, breed: "British Shorthair" }
};
```

#### Pick<Type, Keys>

- 从Type中挑选出Keys的属性。

#### Extract<Type, Union>

- 从Type中提取出可以赋值给Union的类型。

```ts
type T0 = Extract<"a" | "b" | "c", "a" | "f">;  // "a"
```

#### NonNullable<Type>

- 从Type中排除null和undefined。

```ts
type T0 = NonNullable<string | null | undefined>;  // string
```

#### Parameters<Type>

- 获取 **函数类型** 的 **参数类型** 的 **元组**。

```ts
type T0 = Parameters<() => string>;  // []
type T1 = Parameters<(s: string) => void>;  // [string]
type T2 = Parameters<<T>(arg: T) => T>;  // [unknown]

function f1(arg1: string, arg2: number): void {}
type T3 = Parameters<typeof f1>;  // [string, number]
```

#### ConstructorParameters<Type>

- 获取 **构造函数类型** 的 **参数类型** 的 **元组**。

```ts
type T0 = ConstructorParameters<ErrorConstructor>;  // [string]
type T1 = ConstructorParameters<FunctionConstructor>;  // string[]
type T2 = ConstructorParameters<RegExpConstructor>;  // [string, "g" | "i" | "m" | undefined]
```

#### ReturnType<Type>

- 获取 **函数类型** 的 **返回类型**。

```ts
type T0 = ReturnType<() => string>;  // string
type T1 = ReturnType<(s: string) => void>;  // void
type T2 = ReturnType<<T>() => T>;  // unknown
type T3 = ReturnType<<T extends U, U extends number[]>() => T>;  // number[]

function f1(): void {}
type T4 = ReturnType<typeof f1>;  // void
```

#### InstanceType<Type>

- 获取 **构造函数类型** 的 **实例类型**。

```ts
class C {
  x = 0;
  y = 0;
}

type T0 = InstanceType<typeof C>;  // C
```

#### NoInfer<Type>

- 从Type中排除 **不可推断** 的类型。

```ts
type T0 = NoInfer<string>;  // string
type T1 = NoInfer<number>;  // number
type T2 = NoInfer<undefined>;  // undefined
type T3 = NoInfer<null>;  // null
type T4 = NoInfer<unknown>;  // unknown
type T5 = NoInfer<any>;  // any
type T6 = NoInfer<never>;  // never
type T7 = NoInfer<void>;  // void
type T8 = NoInfer<{}>;  // {}
type T9 = NoInfer<Function>;  // Function
type T10 = NoInfer<() => void>;  // () => void
type T11 = NoInfer<Promise<string>>;  // Promise<string>
type T12 = NoInfer<RegExp>;  // RegExp
```

#### ThisParameterType<Type>

- 获取函数类型的 this 参数类型。

```ts
type T0 = ThisParameterType<(this: Date, x: number, y: number) => void>;  // Date
```

#### OmitThisParameter<Type>

- 从函数类型中排除 this 参数。

```ts
type T0 = OmitThisParameter<(this: Date, x: number, y: number) => void>;  // (x: number, y: number) => void
```

#### ThisType<Type>

- 用于指定 this 的类型。

```ts
type ObjectDescriptor<D, M> = {
  data?: D;
  methods?: M & ThisType<D & M>;  // Type of 'this' in methods is D & M
};

function makeObject<D, M>(desc: ObjectDescriptor<D, M>): D & M {
  let data: object = desc.data || {};
  let methods: object = desc.methods || {};
  return { ...data, ...methods } as D & M;
}

let obj = makeObject({
  data: { x: 0, y: 0 },
  methods: {
    moveBy(dx: number, dy: number) {
      this.x += dx;  // Strongly typed this
      this.y += dy;  // Strongly typed this
    }
  }
});
```

#### Intrinsic String Manipulation Types

- TypeScript 4.1 引入了一组新的 **内置字符串操作类型**，用于处理字符串类型。

```ts
type T0 = Uppercase<"hello">;  // "HELLO"
type T1 = Lowercase<"HELLO">;  // "hello"
type T2 = Capitalize<"hello">;  // "Hello"
type T3 = Uncapitalize<"Hello">;  // "hello"
```

---

> 参考链接：<https://juejin.cn/post/6999985372440559624>
> 参考链接：<https://juejin.cn/post/6999985372440559624>
> 参考链接：<https://www.typescriptlang.org/docs/handbook/utility-types.html>
