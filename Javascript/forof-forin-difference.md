# for of 和 for in 的区别？

- 先说结论：

  - 1.
    - 推荐在循环对象属性的时候:
      - 使用 for...in;
    - 在遍历数组的时候:
      - 使用 for...of;
  - 2.
    - for...in 循环出的是 key;
    - for...of 循环出的是 value;
  - 3.
    - for...of 是 ES6 新引入的特性;
    - 修复了 ES5 引入的 for...in 的不足;
  - 4.

    - for...of 不能循环普通的对象;
      - 需要通过和 Object.keys()搭配使用;

    <br>

- 假设我们要遍历一个数组的 value:
  - let aArray = ['a',123,{a:'1',b:'2'}]
- 使用 for...in 循环：

```js
// index 是数组属性名称;
for (let index in aArray) {
  console.log(`${aArray[index]}`);
}
```

- 使用 for...of 循环：

```js
// value 是数据属性对应的value值;
for (let value of aArray) {
  console.log(value);
}
```

- 咋一看好像好像只是写法不一样而已;
  - 那为什么说 for...of 修复了 for...in 的缺陷和不足?
- 假设我们往数组添加一个属性 name:
  - aArray.name = 'demo'
- 再分别查看上面写的两个循环：
  - for...in 会将 aArray.name 也打印出来;
  - 但是 aArray.name 不是数组元素;
    - 它是数组属性;
  - 所以不应该被打印;
- 所以说，作用于数组的 for-in 循环:

  - 除了遍历数组元素以外;
  - 还会遍历自定义属性;
    <br>

- for...of 循环不会循环对象的 key;
- 只会循环出数组的 value;
- 因此 for...of 不能循环遍历普通对象;
  - 对普通对象的属性遍历推荐使用 for...in;
- 如果实在想用 for...of 来遍历普通对象的属性的话:
  - 可以通过和 Object.keys()搭配使用;
  - 先获取对象的所有 key 的数组;
  - 然后遍历：

```js
var student = {
  name: "wujunchuan",
  age: 22,
  locate: {
    country: "china",
    city: "xiamen",
    school: "XMUT",
  },
};
for (let key of Object.keys(student)) {
  // 使用Object.keys()方法获取对象key的数组
  // 结局还是转成数组后，让for...of去起效
  console.log(key + ": " + student[key]);
}
```
