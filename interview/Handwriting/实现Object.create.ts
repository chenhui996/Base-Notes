/**
 * 手写 Object.create 方法
 * 用法：创建一个新的对象，如果传入 null 则创建一个没有原型的对象，否则新对象的原型指向传入的对象
 * @param {T} proto 要作为新对象原型的对象，或者为 null 以创建一个没有原型的对象
 * @return {any} 新创建的对象
 */
function myCreate<T extends object | null>(proto: T): T {
  // 创建一个空构造函数
  const F = function () { } as () => void;

  // 将传入对象的原型赋值给空构造函数的 prototype 属性
  F.prototype = proto;

  // 使用 new 操作符创建 F 的实例，该实例的原型即为传入的 proto，即之后的实例化的对象： newObj.__proto__ -> F.prototype -> proto
  return new F();
}

// 示例使用
const personPrototype = {
  greet() {
    console.log('Hello!');
  }
};

const person = myCreate(personPrototype);
person.greet(); // 输出：Hello!

const noPrototypeObject = myCreate(null);
// noPrototypeObject 没有原型，即 noPrototypeObject.__proto__ === undefined