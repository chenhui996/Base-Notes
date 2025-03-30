# ES5 怎么实现继承？

## ES5 实现继承的核心思想

- 在 ES5 中，继承的 **核心思想** 是通过 **原型链（prototype chain）**  + **构造函数（Constructor Stealing）** 组合来实现的。
- 具体来说，继承实现的方式 包括以下几个步骤：

### 1. 子类继承父类的方法（构造函数继承）

- 通过在 **子类构造函数中，调用父类构造函数（Parent.call(this, ...)）**，让 **子类实例** 获得父类的 **实例属性**。

### 2. 子类继承父类的方法（原型继承）

- 通过 `Object.create(Parent.prototype)` 让 **子类的原型对象** 继承 **父类的原型对象**，从而继承 **方法（共享于所有实例）**。
  
### 3. 修复 `Child.prototype.constructor`

- 因为 `Object.create(Parent.prototype)` 创建了一个新对象。
- 这个新对象的 constructor 默认指向 Parent，所以需要手动修复。（符合原型设计规则

## 代码

```js
// 父类
function Parent (name) {
  this.name = name // 父类的实例属性
}

// 父类的方法
Parent.prototype.sayHello = function () {
  console.log(`Hello, my name is ${this.name}`)
}

// 子类
function Child (name, age) {
  // 调用父类的构造函数，继承父类的实例属性
  Parent.call(this, name)
  this.age = age // 子类的实例属性
}

// 继承父类的方法
Child.prototype = Object.create(Parent.prototype);

// 修复子类的构造函数
Child.prototype.constructor = Child;

// 子类的方法
Child.prototype.sayAge = function() {
  console.log(`I am ${this.age} years old`);
};


// 测试
const child = new Child('Alice', 10);
child.sayHello(); // 输出: Hello, my name is Alice
child.sayAge();   // 输出: I am 10 years old
```

---

## 面试回答

- 在 ES5 中，实现继承主要有三个关键点：

1. **属性继承**：在子类的构造函数中，通过 Parent.call(this) 调用父类的构造函数，这样可以将父类的实例属性（比如 this.name）继承到子类中。
2. **方法继承**：通过 Child.prototype = Object.create(Parent.prototype)，将子类的原型对象指向父类的实例，这样子类就能继承父类原型上的方法（比如 Parent.prototype.sayHello）。
3. **修复构造函数**：由于 Object.create 会覆盖子类原型对象的构造函数，所以需要手动修复，将 Child.prototype.constructor 指向子类本身，确保构造函数指向正确。

- 这样，子类就可以同时继承父类的属性和方法，并且还能添加自己的属性和方法。
