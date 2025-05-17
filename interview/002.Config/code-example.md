# 代码示例

## 递归的例子

简单递归：阶乘函数
  
```ts
function factorial(n: number): number {
  if (n === 0) {
    return 1;
  }
  return n * factorial(n - 1);
}

console.log(factorial(5)); // 120: 5*4*3*2*1
```

深拷贝：递归遍历对象和数组
  
```ts
function deepClone(obj: any): any {
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }
  const result = Array.isArray(obj) ? [] : {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      result[key] = deepClone(obj[key]);
    }
  }
  return result;
}

const obj = { a: 1, b: { c: 2 } };
const clone = deepClone(obj);

console.log(clone); // { a: 1, b: { c: 2 } }
```