/** 手写 new 操作符
 * 用法：创建一个实例化对象
 * 思路：
 *  1、判断传入的 fn 是否为 function
 *  2、创建一个空对象
 *  3、将这个空对象的原型设置为构造函数的 prototype 属性。
 *  4、使用 apply 执行构造函数 并传入参数 arguments 获取函数的返回值
 *  5、判断这个返回值 如果返回的是 Object || Function 类型 就返回该对象 否则返回创建的对象
 * @param {Function} fn 构造函数
 * @return {*}
 */
function myNew (fn, ...args) {
  if (typeof fn !== 'function') throw new Error('must be a function')

  const newObj = Object.create(fn.prototype) // fn.prototype = newObj.__proto__

  const result = fn.apply(newObj, args)

  const flag =
    result && (typeof result === 'object' || typeof result === 'function')

  return flag ? result : newObj
}
