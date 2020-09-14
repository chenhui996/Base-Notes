# Jest

## 什么是 Jest?

- Jest 是 Facebook 的一套开源的:
  - JavaScript 测试框架;
- 它自动集成了:
  - 断言
  - JSDom
  - 覆盖率报告
  - 等开发者所需要的:
    - 所有测试工具
- 是一款几乎零配置的测试框架;
- 并且它对:
  - 同样是 Facebook 的开源前端框架:
    - React 的测试十分友好;

## 安装 Jest

### 初始化 package.json

- 在 shell 中输入以下命令:
  - 初始化前端项目并生成 package.json：

```
npm init -y
```

### 安装 Jest 及相关依赖

- 在 shell 中输入以下命令:
  - 安装测试所需要的依赖：
    - jest
    - babel-jest
    - babel-core
    - babel-preset-env
    - regenerator-runtime

```
npm install -D jest babel-jest babel-core babel-preset-env regenerator-runtime
```

- 这几个依赖是为了:
  - 让我们可以使用'ES6 的语法特性'进行'单元测试';
- ES6 提供的 import 来导入模块的方式;
  - Jest 本身是不支持的;

### 添加.babelrc 文件

- 在项目的根目录下添加.babelrc 文件;
  - 并在文件复制如下内容:

```json
{
  "presets": ["env"]
}
```

### 修改 package.json 中的 test 脚本

- 打开 package.json 文件;
  - 将 script 下的 test 的值修改为 jest：

```json
"scripts": {
  "test": "jest"
}
```

## 编写你的第一个 Jest 测试

#### 创建 src 和 test 目录及相关文件

- 在项目根目录下创建 src 目录;
  - 并在 src 目录下添加 functions.js 文件;
- 在项目根目录下创建 test 目录;
  - 并在 test 目录下创建 functions.test.js 文件;

---

- Jest 会自动找到'项目'中'所有使用':
  - .spec.js 或.test.js 文件命名的测试文件
  - 并执行;
- 通常我们在编写测试文件时:
  - 遵循的命名规范:
    - 测试文件的文件名 = 被测试模块名 + .test.js
    - 例如被测试模块为 functions.js;
    - 那么对应的测试文件命名为 functions.test.js;

#### 在 src/functions.js 中创建被测试的模块

```js
function sum(a, b) {
  return a + b;
}

export default sum;
```

#### 在 test/functions.test.js 文件中创建测试用例

```js
import sum from "../src/functions";

test("sum(2+2)等于4", () => {
  expect(sum(2, 2)).toBe(4);
});
```

#### 运行 npm run test, Jest 会在 shell 中打印出以下消息：

```
 PASS  test/functions.test.js
  √ sum(2 + 2) 等于 4 (7ms)

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        4.8s
```

## 常用的几个 Jest 断言

- 上面测试用例中的:
  - expect(sum(2, 2)).toBe(4);
  - 为一句断言;
- Jest 为我们提供了 expect 函数:
  - 用来'包装'被测试的方法并'返回一个对象';
  - 该对象中包含一系列的匹配器:
    - 来让我们更方便的进行断言;
    - 上面的 toBe 函数即为一个匹配器;

### 我们来介绍几种常用的 Jest 断言，其中会涉及多个匹配器

#### .not

- .not 修饰符:
  - 允许你测试结果:
    - 不等于某个值的情况;
  - 这和英语的语法几乎完全一样，很好理解;

```js
import sum from "../src/functions";

test("sum(2, 2) 不等于 5", () => {
  expect(sum(2, 2)).not.toBe(5);
});
```

#### .toEqual()

- .toEqual 匹配器:
  - 会递归的检查对象:
    - 所有'属性'和'属性值'是否相等;
- 所以如果要进行:
  - 应用类型的比较时;
    - 请使用.toEqual 匹配器而不是.toBe;

```js
// 待测试组件
export default {
  getAuthor() {
    return {
      name: "LITANGHUI",
      age: 24,
    };
  },
};
```

```js
// jest测试文件
import functions from "../src/functions";

test("getAuthor()返回的对象深度相等", () => {
  expect(functions.getAuthor()).toEqual(functions.getAuthor());
});
// .toEqual后面的functions.getAuthor()可以自己定义
test("getAuthor()返回的对象内存地址不同", () => {
  expect(functions.getAuthor()).not.toBe(functions.getAuthor());
});
// .toEqual后面的functions.getAuthor()可以自己定义
```

#### .toHaveLength

- .toHaveLength:
  - 可以很方便的用来测试:
    - '字符串'和'数组类型'的'长度'是否满足预期;

```js
// 待测试组件
function arrayNum(num) {
  if (!Number.isInteger(num)) {
    throw Error("我只接收整数，老哥");
  }

  let result = [];
  for (let i = 0; i <= num - 1; i++) {
    result.push(i);
  }

  return result;
}
export default arrayNum;
```

```js
// jest测试文件
import arrayNum from "../src/functions";

test("arrayNum的作用是可以测数组的长度", () => {
  expect(arrayNum(10)).toHaveLength(10);
});
```

#### .toThrow

- .toThorw 能够让我们测试:
  - 被测试方法是否'按照预期抛出异常';
  - 但是在使用时需要注意的是:
    - 我们必须使用一个函数将:
      - 将被测试的函数做一个包装;
  - 正如下面 箭头函数 所做的那样;
    - 否则会因为'函数抛出'导致该'断言失败';

```js
// functions.test.js
import arrayNum from "../src/functions";
test("getIntArray(3.3)应该抛出错误", () => {
  // 用箭头函数包装'将要被测试的函数';
  expect(() => {
    arrayNum(3.3);
  }).toThrow("我只接收整数，老哥"); // toThrow里面若有错误信息，需要跟组件内抛出的错误信息匹配
});
```

#### .toMatch

- .toMatch 传入一个正则表达式:
  - 它允许我们用来进行'字符串类型'的正则匹配;

```js
// functions.test.js
import functions from "../src/functions";

test('getAuthor().name应该包含"li"这个姓氏', () => {
  expect(functions.getAuthor().name).toMatch(/li/i);
});
```
