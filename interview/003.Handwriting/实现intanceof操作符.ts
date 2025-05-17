/** 手写 instanceof 方法
 * 用法：instanceof 运算符用于检测构造函数的 prototype 属性是否出现在某个实例对象的原型链上。
 * 思路：
 *  1、通过 Object.getPrototypeOf 获取 obj 的原型
 *  2、循环判断 objProtoType 是否和 constructor 的原型相等
 *    2.1、如果相等就返回 true
 *    2.2、如果不相等 就重新赋值一下 obj 的原型 进入下一次循环
 *  3、判断是 objProtoType 是否为空 如果为空就说明不存在 返回 false
 * @param {any} obj 需要判断的数据
 * @param {Function} taget 构造函数
 * @return {boolean} 如果 obj 是 constructor 的实例则返回 true，否则返回 false
 */
function myInstanceof<T>(obj: any, taget: new (...args: any[]) => T): boolean {
  let curObjPrototype: any = Object.getPrototypeOf(obj);

  while (curObjPrototype !== null) {
    if (curObjPrototype === taget.prototype) {
      return true;
    }

    curObjPrototype = Object.getPrototypeOf(curObjPrototype);
  }

  return false;
}

// ---------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------

// 示例使用
namespace InstanceofPerson {
  export class Person {
    name: string;

    constructor(name: string) {
      this.name = name;
    }
  }
}


const instanceofPerson = new InstanceofPerson.Person('Alice');
console.log(myInstanceof(instanceofPerson, InstanceofPerson.Person)); // 应该输出：true
console.log(myInstanceof(instanceofPerson, String)); // 应该输出：false

