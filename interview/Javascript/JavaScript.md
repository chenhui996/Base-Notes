# Javascript 面试题

## 解释下变量提升?

- JavaScript 引擎的工作方式是:
  - 先解析代码:
    - '获取' 所有 '被声明的变量';
  - 然后再一行一行地运行;
- 这造成的结果:
  - 就是 '所有的变量' 的 '声明语句';
    - 都会被提升到代码的头部;
      - 这就叫做变量提升(hoisting);

---

```js
console.log(a); // undefined
var a = 1;
function b() {
  console.log(a);
}
b(); // 1
```

- 上面的代码 '实际执行顺序' 是这样的:
- 第一步:
  - 引擎将 var a = 1 拆解为 var a = undefined 和 a = 1 ;
    - 然后将 var a = undefined 放到最顶端;
      - a = 1 还在原来的位置;
- 这样一来代码就是这样:

```js
var a = undefined;
console.log(a); // undefined

a = 1;

function b() {
  console.log(a);
}
b(); // 1
```

- 第二步:
  - 就是执行;
    - js 引擎一行一行从上往下执行:
      - 就造成了当前的结果，这就叫变量提升;

## 一段JavaScript代码是如何执行的?

- ..
