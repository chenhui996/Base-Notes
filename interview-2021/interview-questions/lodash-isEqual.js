// 判断师傅是对象或数组
function isObject(obj) {
  return typeof obj === "object" && obj !== null;
}

// 手写深度比较，模拟 lodash.isEqual
function isEqual(objA, objB) {
  if (!isObject(objA) || !isObject(objB)) {
    // 值类型（注意，参与 equal 的一般不会是函数）
    return objA === objB;
  }
  if (objA === objB) {
    return true;
  }
  // 到这一步可以确定，两个都是引用类型，也就是都是对象或数组，而且不相等。
  // 1.先取出 objA 和 objB 的 keys，比较个数。
  const objAKeys = Object.keys(objA);
  const objBKeys = Object.keys(objB);
  if (objAKeys.length !== objBKeys.length) {
    return false;
  }
  // 2.以 objA 为基准，和 objB 依此进行递归比较（因为会有深层次key）
  for (let key in objA) {
    // 比较当前 key 的 val ———— 递归
    const res = isEqual(objA[key], objB[key]);
    if (!res) {
      return false;
    }
  }
  // 3. 全相等
  return true;
}

const objA = {
  a: 100,
  b: {
    x: 100,
    y: 200,
  },
};
const objB = {
  a: 100,
  b: {
    x: 100,
    y: 200,
  },
};

console.log(isEqual(objA, objB));
