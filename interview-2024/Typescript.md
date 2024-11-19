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
  - 用于定义 **一组命名** 的常量。
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

### 索引类型的优势:
  
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

### TypeScript 中 any 类型的作用是什么，滥用会有什么后果

- 在TypeScript中，any类型的作用是：
  - 允许我们在编写代码时 -> **不指定具体的类型** -> 从而可以接受 **任何类型** 的值。
  - 使用any类型相当于 -> **放弃** -> 对该值的 **静态类型** 检查，使得代码在 **编译阶段** 不会对这些值进行类型检查。







