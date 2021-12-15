# TypeScript

---

## keyof 类型操作符

### 简介

TypeScript 允许我们 **遍历某种类型的属性**，并通过 keyof 操作符 **提取** 其 **属性的名称**。

keyof 操作符，可以用于 **获取** 某种类型的 **所有键**，其 **返回类型** 是 **联合类型**。

### 使用

```ts
interface Person {
  name: string
  age: number
  location: string
}

type K1 = keyof Person // "name" | "age" | "location"
type K2 = keyof Person[] // number | "length" | "push" | "concat" | ...
type K3 = keyof {[x: string]: Person} // string | number
```

上述例子中，K3 返回的是 **string | number**。

是因为，在 js 中，对象的 key，obj[1] == obj["1"]。

---

### keyof 操作类

**除了接口**，keyof 操作符，还可以用于 **操作类**。

```ts
class Person {
  name: string = 'Semlinker'
}

let sname: keyof Person
sname = 'name'
```

上述例子中，如果把 sname = "name"换成 sname = "age"，这是会报错的：

```ts
Type '"age"' is not assignable to type '"name"'.
```

这是因为，在定义 class 类的时候，并没有定义 age 这个属性。

---

### keyof 的作用

类型约束，约束取值，明确取值。

```ts
type Todo = {
  id: number
  text: string
  done: boolean
}

const todo: Todo = {
  id: 1,
  text: 'Learn TypeScript keyof',
  done: false,
}

function prop<T extends object, K extends keyof T>(obj: T, key: K) {
  return obj[key]
}

const id = prop(todo, 'id') // const id: number
const text = prop(todo, 'text') // const text: string
const done = prop(todo, 'done') // const done: boolean
```

解释一下上面的代码：

- 首先定义一个 **泛型类型T**，并且使用到 **extends**，**类型约束**，使 **泛型类型T** 必须是 **object类型的子类型**，也就是**Todo的子类型**。
- 然后使用 **keyof** 获取 **T类型的所有键**。其 **返回类型** 是 **联合类型**，也即是 **number | string | boolean**。
- 最后再次使用 **extends** 关键字，将 **k类型** 必须是 **keyof T** 的 **子类型**。

> 此时在使用的时候，用户再次输入一个不存在的属性时，编译器就会报错提示了。
