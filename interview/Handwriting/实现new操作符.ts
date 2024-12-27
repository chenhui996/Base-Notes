/** 手写 new 操作符
 * 用法：创建一个实例化对象
 * 思路：
 *  1、判断传入的 fn 是否为 function
 *  2、创建一个空对象
 *  3、将这个空对象的原型设置为构造函数的 prototype 属性。
 *  4、使用 apply 执行构造函数 并传入参数 arguments 获取函数的返回值
 *  5、判断这个返回值 如果返回的是 Object || Function 类型 就返回该对象 否则返回创建的对象
 * @param {ConstructorFunction} fn 构造函数
 * @param {any[]} args 构造函数参数列表
 * @return {any} 返回实例化对象
 */
function myNew<T>(fn: new (...args: any[]) => T, ...args: any[]): T {
  if (typeof fn !== 'function') {
    throw new Error('The first argument must be a function');
  }

  // 创建一个空对象，并将其原型设置为构造函数的 prototype 属性
  const newObj = Object.create(fn.prototype);

  // 使用 apply 方法执行构造函数，并传入参数 args
  // 这里我们将构造函数调用的结果存储在 result 变量中
  const result = fn.apply(newObj, args);

  // 判断构造函数是否返回了一个对象（或者函数，因为在 JS 中函数也是对象）
  // 如果返回了对象，则返回该对象；否则返回新创建的对象
  return typeof result === 'object' && result !== null ? result : newObj;
}

// ---------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------

// 示例使用
namespace NewPerson {
  export class Person {
    name: string;
    age: number;

    constructor(name: string, age: number) {
      this.name = name;
      this.age = age;
    }

    sayHello() {
      console.log(`Hello, my name is ${this.name} and I am ${this.age} years old.`);
    }
  }
}


const newPerson = myNew(NewPerson.Person, 'Alice', 30);
newPerson.sayHello(); // 应该输出：Hello, my name is Alice and I am 30 years old.

