# 面试官：webpack 原理都不会？

## 引言

- 前一段时间我把 webpack 源码大概读了一遍;
- webpack 到 4.x 版本后，其源码已经比较庞大;
- 对各种开发场景进行了高度抽象;
  - 阅读成本也愈发昂贵;

<br>

- 过度分析源码对于大家并没有太大的帮助;
- 本文主要是想通过分析 webpack 的:
  - '构建流程'以及'实现'一个简单的 webpack;
  - 让大家对 webpack 的'内部原理'有一个大概的了解;

## webpack 构建流程分析

- entry-option: 初始化流程;
- run: 开始编译;
- make: 从 entry 开始'递归的'分析依赖，对每个'依赖模块'进行 build;
- before-resolve: 对'模块位置'进行解析;
- build-module: 开始'构建'某个'模块';
- normal-module-loader: 将 loader 加载完成的 module 进行编译，生成 AST 树;
- program: 遍历 AST 树，当遇到 require 等一些调用表达式时，收集依赖;
- seal: 所有依赖 build 完成，开始优化;
- emit: 输出到 dist 目录;
  <br>
- webpack 的'运行流程'是一个'串行'的过程;
- 从启动到结束会依次执行以下流程:
  - 首先会从'配置文件'和 'Shell 语句'中'读取'与'合并'参数;
    - 并初始化'需要使用的插件'和'配置插件'等'执行环境'所需要的参数;
  - 初始化完成后会调用 Compiler 的 run:
    - 来真正启动 webpack'编译构建'过程;
  - webpack 的构建流程包括:
    - compile
    - make
    - build
    - seal
    - emit
- 执行完这些阶段就完成了构建过程;

### 阿辉个人小结（笔记）：

- (个人当前理解，后面随着学习深入，会逐步进行调整)
  <br>
- 简单的说，webpack 的构建流程就是：
  - 先用 compiler 的 run 命令启动编译;
  - 然后再开始递归分析所有"依赖模块"，对每个"依赖模块"进行 build；
  - build 步骤要细：
    - 先分析模块位置；
    - 开始构建一个个模块；
    - 将所有模块生成 AST 树进行遍历；
    - 遍历过程中遇到 require 等一些调用表达式时，收集依赖;
    - 所有模块构建与依赖收集完毕,开始优化;
    - 最后，输出到 dist 目录;

### 初始化

#### entry-options 启动

- 从'配置文件'和 'Shell 语句'中'读取与合并'参数，得出最终的参数;

#### run 实例化

- compiler:
  - 用上一步'得到的参数'初始化 Compiler 对象;
  - 加载所有配置的插件;
  - 执行对象的 run 方法开始执行编译;

### 编译构建

#### entry 确定入口

- 根据配置中的 entry 找出所有的入口文件;

#### make 编译模块

- 从入口文件出发:
  - 调用所有配置的 Loader 对模块进行翻译;
  - 再找出该模块依赖的模块;
  - 再递归本步骤:
    - 直到所有'入口依赖'的文件都经过了本步骤的处理;

#### build module 完成模块编译

- 经过上面一步使用 Loader 翻译完所有模块后;
  - 得到了每个模块被翻译后的最终内容;
  - 以及它们之间的依赖关系;

#### seal 输出资源

- 根据'入口'和'模块'之间的依赖关系;
  - 组装成一个个包含多个模块的 Chunk;
- 再把每个 Chunk 转换成一个单独的文件加入到输出列表;
- 这步是可以修改输出内容的最后机会;

#### emit 输出完成

- 在确定好输出内容后;
  - '根据配置'确定输出的'路径'和'文件名';
  - 把文件内容写入到文件系统;
    <br>
- 分析完构建流程，下面让我们自己动手实现一个简易的 webpack 吧;

## 实现一个简易的 webpack

### 准备工作

#### 目录结构

- 我们先来初始化一个项目，结构如下：

```
|-- forestpack
    |-- dist
    |   |-- bundle.js
    |   |-- index.html
    |-- lib
    |   |-- compiler.js
    |   |-- index.js
    |   |-- parser.js
    |   |-- test.js
    |-- src
    |   |-- greeting.js
    |   |-- index.js
    |-- forstpack.config.js
    |-- package.json
```

- 这里我先解释下每个文件/文件夹对应的含义：
  - dist：打包目录
  - lib：核心文件，主要包括 compiler 和 parser
    - compiler.js:
      - 编译相关;
      - Compiler 为一个类, 并且有 run 方法去开启编译;
      - 还有构建 module（buildModule）和输出文件（emitFiles）;
    - parser.js:
      - 解析相关;
      - 包含解析 AST（getAST）;
      - 收集依赖（getDependencies）;
      - 转换（es6 转 es5）;
    - index.js:
      - 实例化 Compiler 类;
      - 并将配置参数（对应 forstpack.config.js）传入;
    - test.js:
      - 测试文件;
      - 用于测试方法函数打 console 使用;
  - src：源代码。也就对应我们的业务代码;
  - forstpack.config.js： 配置文件。类似 webpack.config.js;
  - package.json：这个就不用我多说了～～～（什么，你不知道？？）

#### package.json 是什么?

- 什么是 Node.js 的模块（Module）？
- 在 Node.js 中，模块是一个库或者框架；
  - 也是一个 Node.js 项目；
- Node.js 项目遵循模块化架构：
  - 当我们创建了一个 Node.js 项目；
  - 意味着创建了一个模块;
- 这个模块的描述文件，被称为 package.json;

#### 先完成“造轮子”前 30%的代码

- 项目搞起来了，但似乎还少点东西～～
- 对了！基础的文件我们需要先完善下：
  - forstpack.config.js
  - src
- 首先是 forstpack.config.js：

```js
const path = require("path");

module.exports = {
  entry: path.join(__dirname, "./src/index.js"),
  output: {
    path: path.join(__dirname, "./dist"),
    filename: "bundle.js",
  },
};
```

- 内容很简单，定义一下入口、出口;
- 其次是 src，这里在 src 目录下定义了两个文件：
- greeting.js:

```js
// greeting.js
export function greeting(name) {
  return "你好" + name;
}
```

- index.js:

```js
import { greeting } from "./greeting.js";
document.write(greeting("森林"));
```

- ok，到这里我们已经把需要准备的工作都完成了;
- 问：为什么这么基础？答：当然要基础了，我们的核心是“造轮子”！！）

### 梳理下逻辑

- 短暂的停留一下，我们梳理下逻辑：

- Q: 我们要做什么？
- A: 做一个比 webpack 更强的 super webpack;(吹了起来)
- Q: 怎么去做？
- A: 看下文
- Q: 整个的流程是什么？
- A: 大概流程就是:
  - 读取入口文件
  - 分析入口文件:
    - '递归'的去'读取模块所依赖'的'文件内容';
    - 生成 AST 语法树;
  - 根据 AST 语法树:
    - 生成浏览器能够运行的代码;

### 正式开工

#### compile.js 编写

```js
const path = require("path");
const fs = require("fs");

module.exports = class Compiler {
  // 接收通过lib/index.js new Compiler(options).run()传入的参数，对应`forestpack.config.js`的配置
  constructor(options) {
    const { entry, output } = options;
    this.entry = entry;
    this.output = output;
    this.modules = [];
  }
  // 开启编译
  run() {}
  // 构建模块相关
  buildModule(filename, isEntry) {
    // filename: 文件名称
    // isEntry: 是否是入口文件
  }
  // 输出文件
  emitFiles() {}
};
```

- compile.js 主要做了几个事情：
  - 接收 forestpack.config.js 配置参数，并初始化 entry、output;
  - 开启编译 run 方法:
    - 处理构建模块;
    - 收集依赖;
    - 输出文件;
    - 等;
  - buildModule 方法:
    - 主要用于构建模块（被 run 方法调用）;
  - emitFiles 方法: - 输出文件（同样被 run 方法调用）;
    <br>
- 到这里，compiler.js 的大致结构已经出来了;
- 但是得到模块的源码后, 需要去解析;
  - '替换源码'和'获取模块的依赖项';
  - 也就对应我们下面需要完善的 parser.js;

#### parser.js 编写

```js
const fs = require("fs");
// const babylon = require("babylon");
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const { transformFromAst } = require("babel-core");
module.exports = {
  // 解析我们的代码生成AST抽象语法树
  getAST: (path) => {
    const source = fs.readFileSync(path, "utf-8");

    return parser.parse(source, {
      sourceType: "module", //表示我们要解析的是ES模块
    });
  },
  // 对AST节点进行递归遍历
  getDependencies: (ast) => {
    const dependencies = [];
    traverse(ast, {
      ImportDeclaration: ({ node }) => {
        dependencies.push(node.source.value);
      },
    });
    return dependencies;
  },
  // 将获得的ES6的AST转化成ES5
  transform: (ast) => {
    const { code } = transformFromAst(ast, null, {
      presets: ["env"],
    });
    return code;
  },
};
```

- 看完这代码是不是有点懵（说好的保证让看懂的 ）
- 别着急，你听我辩解！！
  <br>
- 这里要先着重说下用到的几个 babel 包：
  - @babel/parser:
    - 用于将源码生成 AST;
  - @babel/traverse:
    - 对 AST 节点进行递归遍历;
  - babel-core/@babel/preset-env:
    - 将获得的 ES6 的 AST 转化成 ES5;
      <br>
- parser.js 中主要就三个方法：
  - getAST:
    - 将获取到的模块内容 解析成 AST 语法树;
  - getDependencies:
    - 遍历 AST，将用到的依赖收集起来;
  - transform:
    - 把获得的 ES6 的 AST 转化成 ES5;

### 完善 compiler.js

- 在上面我们已经将 compiler.js 中会用到的函数占好位置;
- 下面我们需要完善一下 compiler.js:
  - 当然会用到 parser.js 中的一些方法;
  - 直接上代码：

```js
const { getAST, getDependencies, transform } = require("./parser");
const path = require("path");
const fs = require("fs");

module.exports = class Compiler {
  constructor(options) {
    const { entry, output } = options;
    this.entry = entry;
    this.output = output;
    this.modules = [];
  }
  // 开启编译
  run() {
    const entryModule = this.buildModule(this.entry, true);
    this.modules.push(entryModule);
    this.modules.map((_module) => {
      _module.dependencies.map((dependency) => {
        this.modules.push(this.buildModule(dependency));
      });
    });
    // console.log(this.modules);
    this.emitFiles();
  }
  // 构建模块相关
  buildModule(filename, isEntry) {
    let ast;
    if (isEntry) {
      ast = getAST(filename);
    } else {
      const absolutePath = path.join(process.cwd(), "./src", filename);
      ast = getAST(absolutePath);
    }

    return {
      filename, // 文件名称
      dependencies: getDependencies(ast), // 依赖列表
      transformCode: transform(ast), // 转化后的代码
    };
  }
  // 输出文件
  emitFiles() {
    const outputPath = path.join(this.output.path, this.output.filename);
    let modules = "";
    this.modules.map((_module) => {
      modules += `'${_module.filename}' : function(require, module, exports) {${_module.transformCode}},`;
    });

    const bundle = `
        (function(modules) {
          function require(fileName) {
            const fn = modules[fileName];
            const module = { exports:{}};
            fn(require, module, module.exports)
            return module.exports
          }
          require('${this.entry}')
        })({${modules}})
    `;

    fs.writeFileSync(outputPath, bundle, "utf-8");
  }
};
```

- 关于 compiler.js 的内部函数，上面我说过一遍，这里主要来看下 emitFiles：
  - 这里的 bundle 一大坨，什么鬼？
    <br>
- 我们先来了解下 webpack 的文件'打包'机制;
  - 下面一段代码是经过 webpack 打包精简过后的代码:

```js
// dist/index.xxxx.js
(function(modules) {
  // 已经加载过的模块
  var installedModules = {};

  // 模块加载函数
  function __webpack_require__(moduleId) {
    if(installedModules[moduleId]) {
      return installedModules[moduleId].exports;
    }
    var module = installedModules[moduleId] = {
      i: moduleId,
      l: false,
      exports: {}
    };
    modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
    module.l = true;
    return module.exports;
  }
  __webpack_require__(0);
})([
/* 0 module */
(function(module, exports, __webpack_require__) {
  ...
}),
/* 1 module */
(function(module, exports, __webpack_require__) {
  ...
}),
/* n module */
(function(module, exports, __webpack_require__) {
  ...
})]);
```

- 简单分析下：
  - webpack 将所有模块(可以简单理解成文件):
    - 包裹于一个函数中;
    - 并传入默认参数;
    - 然后将所有模块：
      - 放入一个数组中，取名为 modules;
      - 并通过数组的下标来作为 moduleId;
  - 将 modules 传入一个自执行函数中:
    - 自执行函数中包含:
      - 一个 installedModules 已经加载过的模块;
      - 一个模块加载函数;
    - 最后加载入口模块并返回;
  - `__webpack_require__` 模块加载;
    - 先判断 installedModules 是否已加载;
    - 加载过了就直接返回 exports 数据;
    - 没有加载过该模块就通过:
      - modules[moduleId].call(module.exports, module, module.exports, `__webpack_require__`)执行模块;
      - 并且将 module.exports 给返回;
- (还是没听懂!)
- 那我换个说法吧：
  - 经过 webpack 打包出来的是一个匿名闭包函数（IIFE）;
  - modules 是一个数组:
    - 每一项是一个模块初始化函数;
  - `__webpack_require__`用来加载模块，返回 module.exports;
  - 通过 WEBPACK_REQUIRE_METHOD(0)启动程序

### lib/index.js 入口文件编写

- 到这里，就剩最后一步了；
- 在 lib 目录创建 index.js：

```js
const Compiler = require("./compiler");
const options = require("../forestpack.config");

new Compiler(options).run();
```

- 这里逻辑就比较简单了:
  - 实例化 Compiler 类;
  - 并将配置参数（对应 forstpack.config.js）传入;
- 运行 node lib/index.js;
  - 就会在 dist 目录下生成 bundle.js 文件;

```js

        (function(modules){
            function require(filename){
                const fn = modules[filename];
                const module = {exports:{}};
                fn(require, module, module.exports);
                return module.exports
            }
            require('/Users/chenhui/Downloads/wepack-learn/forestpack/src/index.js')
        })({'/Users/chenhui/Downloads/wepack-learn/forestpack/src/index.js': function(require, module, exports){"use strict";

var _greeting = require("./greeting.js");

document.write((0, _greeting.greeting)("森林"));},'./greeting.js': function(require, module, exports){"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.greeting = greeting;

function greeting(name) {
  return "你好" + name;
}}})

```

- 和上面用 webpack 打包生成的 js 文件作下对比，是不是很相似呢？

### 来吧！展示

- 我们在dist目录下创建index.html文件，引入打包生成的bundle.js文件：
```js
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <script src="./bundle.js"></script>
  </body>
</html>
```

- 此时打开浏览器：
    - 即显示：你好森林;

## 总结

- 通过对webpack构建流程的分析以及实现了一个简易的forestpack;
- 相信你对webpack的构建原理已经有了一个清晰的认知！

## 参考

- 本文是看过极客时间程柳锋老师的「玩转 webpack」课程后整理的;
- 这里也十分推荐大家去学习这门课程～

# 本文转载

- 作者：前端森林
- 链接：https://juejin.im/post/6859538537830858759
- 来源：掘金