# JavaScript 中的 map()和 forEach()有什么区别？

- JavaScript 中一些最受欢迎的功能可能是 map 和 forEach;
- 从 ECMAScript 5（简称 es5）开始，它们就开始存在了;
  <br>

- 区别：

  - map 返回新数组；
  - foreach 不返回新数组；
    <br>

  - map 速度快于 foreach;

## 何时使用 map()和 forEach()？

- 由于它们之间的主要区别在于是否有返回值;
  - 所以你会希望使用 map 来制作一个新的数组;

```js
const people = [
  { name: "Josh", whatCanDo: "painting" },
  { name: "Lay", whatCanDo: "security" },
  { name: "Ralph", whatCanDo: "cleaning" },
];

function makeWorkers(people) {
  return people.map((person) => {
    const { name, whatCanDo } = person;
    return (
      <li key={name}>
        My name is {name}, I can do {whatCanDo}
      </li>
    );
  });
}

<ul>makeWorkers(people)</ul>;
```

- 在创建一个新的数组时使用 map;
- 当你不需要制作一个新的数组，而是要对数据做一些事情时
  - 就使用 forEach;
    <br>
- 两者都比 JavaScript 内置的 for 循环慢;
