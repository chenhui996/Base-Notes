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

## 常用的几个Jest断言

- 上面测试用例中的:
    - expect(sum(2, 2)).toBe(4);
    - 为一句断言;
