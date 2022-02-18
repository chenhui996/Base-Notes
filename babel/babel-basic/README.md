# babel-learn

下面我都将围绕这个babel-basic项目来进行讲解.

希望你也能在本地准备一个这样的项目案例, 以便你更好的理解我接下来要说的内容.

## @babel/core

我们学习 Babel, 首先要了解一个叫 @babel/core 的东西, 它是 Babel 的 "核心模块".

当然要使用它, 我们得先安装：

```shell
$npm i --save-dev @babel/core
```

安装成功之后, 就可以在我们的代码中使用了, 你可以采用CommonJS的引用方式：

```js
const babel = require('@babel/core');
babel.transform("code", options);
```

> 这里的知识点有很多, 不过你不用急于的掌握它, 只需要知道它是 Babel 的核心, 让我们接着往下看.

---

## @babel/cli

再然后就是 @babel/cli：

- 一个终端运行工具
- 内置的插件

运行你从 "终端" 使用 "babel的工具".

同样, 它也需要先安装:

```shell
$npm i --save-dev @babel/cli @babel/core
```

让我们安装 @babel/cli 的同时, 再来安装一下 @babel/core.

现在, 让我先在 src/index.js 中写上一段简单的代码, 并来看看它的 "基本用法".

### src/index.js:

```js
const fn = () => 1; // 箭头函数, 返回值为1
console.log(fn());
```

### 用法一: 命令行的形式

在项目根目录执行语句:

```shell
$./node_modules/.bin/babel src --out-dir lib
```

这段语句的意思是: 

- 使用：我们设置的解析方式, 来解析 -> src 目录下的 "所有JS文件".
- 将 "转换后" 的 "每个文件" 都 "输出"到 "lib目录" 下.

但是注意了, 由于我们现在没有设置 "任何的解析方式".

所以你在执行了这段语句之后：

- 能看到 "项目" 中多了一个 lib 目录.
  - 而且里面的 "JS代码" 和 "src中的" 是 **一样** 的.
- 至于 "解析方式", 就是后面要介绍的：
  - **plugins**
  - **presets**

另外, 如果你是npm@5.2.0附带的npm包运行器的话, 就可以用 npx babel 来代替 ./node_modules/.bin/babel :

```shell
$npx babel src --out-dir lib
```

### 用法二: 给package.json中配置一段脚本命令:

```json
{
    "name": "babel-basic",
    "version": "1.0.0",
    "description": "",
    "main": "index.js",
    "scripts": {
      "build": "babel src -d lib"
    },
    "keywords": [],
    "author": "",
    "license": "ISC",
    "devDependencies": {
       "@babel/cli": "^7.8.4",
       "@babel/core": "^7.8.4"
    }
}
```

现在运行npm run build效果也是一样的, -d 是 --out-dir 的缩写...

- 我们使用上面的 --out-dir 选项.
  - 你可以通过使用 --help 运行它来查看 cli 工具接受的 "其余选项".

```shell
$npx babel --help
```

**但对我们来说 "最重要" 的是 --plugins 和 --presets.**

---

## 插件plugins

### 基本概念

知道了 Babel 的 "基本用法" 之后, 让我们来看看具体的 "代码转换".

现在要介绍的是**插件 plugins**, 它的本质就是一个 "JS程序", 指示着 **Babel 如何对代码进行转换**.

> 所以你也可以 "编写自己的插件", 来应用你想要的 "任何代码转换".

### 插件案例(箭头函数插件)

先学习一些基本的插件.

如果你是要将 ES6+ 转成 ES5, 可以依赖**官方插件,** 例如:

```@babel/plugin-transform-arrow-functions```:

```shell
$npm i --save-dev @babel/plugin-transform-arrow-functions
$npx babel src --out-dir lib --plugins=@babel/plugin-transform-arrow-functions
```

这个插件的作用是, 将 "箭头函数" 转换为 ES5 兼容的函数.

还记得我们之前的 src/index.js 吗:

现在编译之后, 你再打开 lib/index.js 来看看.

它是不是被转换为ES5的代码了呢? 😁

```js
const fn = function () {
  return 1;
}; // 箭头函数, 返回值为1


console.log(fn());
```

捣鼓了这么久, 终于看到了一点实际的效果, 此时有点小兴奋啊😄

虽然我们已经实现了 "箭头函数转换" 的功能, 但是 ES6+ 其它的语法(比求幂运算符**)却并不能转换:

- 这是因为:
  - 我们只使用了:
    - @babel/plugin-transform-arrow-functions这个功能插件, 没有使用其它的了.

---

## presets:

### 基本概念

如果想要转换 ES6+ 的 "其它代码" 为 ES5.

可以使用 "preset" 来 "代替" 预先设定的 "一组插件", 而不是 "逐一添加" 我们想要的所有插件.

**这里可以理解为 "一个 preset" 就是 "一组插件" 的 "集合"**

presets 和 plugins 一样, 也可以 "创建自己的 preset", "分享" 你需要的 "任何插件组合".

### @babel/preset-env

例如, 我们使用 ```env``` preset:

```shell
$npm i --save-dev @babel/preset-env
```

**```env``` preset**:

- 这个preset包, 支持现代 JavaScript(ES6+) 的所有插件.
  - 也就是说你安装使用了 ```env``` preset 之后.
  - 就可以看到其它 "ES6+ 语法的转换" 了.

现在让我们来用用 ES7 中的, "求幂运算符" 和 "函数参数支持尾部逗号" 这两个功能吧:

### src/index.js:

```js
const fn = () => 1; // ES6箭头函数, 返回值为1
let num = 3 ** 2; // ES7求幂运算符
let foo = function(a, b, c, ) { // ES7参数支持尾部逗号
    console.log('a:', a)
    console.log('b:', b)
    console.log('c:', c)
}
foo(1, 3, 4)
console.log(fn());
console.log(num);
```

然后在 "命令行" 里使用这个 preset:

```shell
$npx babel src --out-dir lib --presets=@babel/preset-env
```

现在打开 lib/src 看看:

```js
"use strict";

var fn = function fn() {
  return 1;
}; // 箭头函数, 返回值为1


var num = Math.pow(3, 2);

var foo = function foo(a, b, c) {
  console.log('a:', a);
  console.log('b:', b);
  console.log('c:', c);
};

foo(1, 3, 4);
console.log(fn());
console.log(num);
```

"求幂运算符" 被 "转换" 为成 ```Math.pow()```

"函数参数" 的 "最后一个逗号" 也被去掉了.

### 小结

截止到现在, 看完了：

- @babel/core
- @babel/cli
- plugins
- presets

相信你对Babel的功能有一定了解了。

**但是真正使用起来我们不可能都是靠命令行的形式吧**

**没错, 接下来我要将这些功能做成配置项.**

---

## 配置

上面👆介绍的都是一些 "终端传入CLI" 的方式, 在实际使用上, 我们更加偏向于 **配置文件**.

例如, 我们在 "项目的根目录" 下创建一个 ```babel.config.js``` 文件:

```js
const presets = [
	[
    "@babel/env",
    {
      targets: {
        edge: "17",
        chrome: "64",
        firefox: "60",
        safari: "11.1"
      }
    }
  ]	
]

module.exports = { presets };
```

加上这个配置的作用是:

- 使用了 ```env``` preset 这个 preset.
- ```env``` preset,  **只会为 "目标浏览器" 中 "没有的功能" 加载 "转换插件"**.

现在你要使用这个配置就很简单了, "直接用" 我们前面 package.json 配置的 "命令行语句", 执行 npm run build 就可以了.

这个命令行语句看起来并没有修改, 那是因为:

- 它 "默认会去寻找" 跟 "根目录下" 的一个名为 ```babel.config.js``` 的文件.
  - (或者 ```babelrc.js``` 也可以, 这个在之后的使用 "babel 的几种方式" 中会说到)
- 所以其实就相当于以下这个配置:

```json
{
	"scripts": {
		"build": "babel src -d lib --config-file ./babel.config.js"
	}
}
```

因此如果你的 "Babel 配置文件" 是 ```babel.config.js``` 的话, 这两种效果是一样的.

(```--config-file``` 指令 就类似于 webpack 中的 ```--config```, **用于 "指定" 以哪个 "配置文件" 构建**)

这里我重点要说一下, **只会为 "目标浏览器" 中 "没有的功能" 加载 "转换插件"**, 这句话的意思:

- 例如这里配置的其中一项是 ```edge: "17"```
  - 那就表示, 它 "转换之后的代码" 支持到 ```edge17```.

所以你会发现, 如果你用了上面 babel.config.js 的配置之后, 生成的 "lib 文件夹下的代码" 好像并没有发生什么改变, 也就是它并没有被转换成 ES5 的代码:

### src/index.js:

```js
const fn = () => 1; // ES6箭头函数, 返回值为1
let num = 3 ** 2; // ES7求幂运算符
let foo = function(a, b, c, ) { // ES7参数支持尾部逗号
    console.log('a:', a)
    console.log('b:', b)
    console.log('c:', c)
}
foo(1, 3, 4)
console.log(fn());
console.log(num);
```

### 使用 ```babel.config.js``` 配置之后构建的 ```lib/index.js```:

```js
"use strict";

const fn = () => 1; // ES6箭头函数, 返回值为1


let num = 3 ** 2; // ES7求幂运算符

let foo = function foo(a, b, c) {
  // ES7参数支持尾部逗号
  console.log('a:', a);
  console.log('b:', b);
  console.log('c:', c);
};

foo(1, 3, 4);
console.log(fn());
console.log(num);
```

"箭头函数" 依旧是箭头函数, "求幂运算符" 依旧是求幂运算符.

**这是因为, 在 "Edge17浏览器" 中 "支持 ES7" 的这些功能, 所以它就没有必要将其转换了, 它只会为目标浏览器中没有的功能加载转换插件!!!**

如果我们将 edge17 改成edge10看看 🤔️?

### babel.config.js:

```js
const presets = [
    [
        "@babel/env",
        {
            targets: {
                edge: "10",
                firefox: "60",
                chrome: "67",
                safari: "11.1",
            },
        },
    ],
];

module.exports = { presets };
```

保存重新运行 ```npm run build```, 你就会发现 ```lib/index.js``` 现在有所改变了:

```js
"use strict";

var fn = function fn() {
  return 1;
}; // ES6箭头函数, 返回值为1


var num = Math.pow(3, 2); // ES7求幂运算符

var foo = function foo(a, b, c) {
  // ES7参数支持尾部逗号
  console.log('a:', a);
  console.log('b:', b);
  console.log('c:', c);
};

foo(1, 3, 4);
console.log(fn());
console.log(num);
```

---

## Polyfill

小回顾：

```Plugins``` 是提供的插件, 例如 "箭头函数转普通函数" ```@babel/plugin-transform-arrow-functions```.

```Presets``` 是一组 ```Plugins``` 的集合.

**而 Polyfill 是, 对 "执行环境" 或者 "其它功能" 的一个 "补充".**

什么意思呢 🤔️?

就像, 现在你想在 "edge10浏览器" 中, 使用 ES7 中的方法 ```includes()```.

但是我们知道, "这个版本的浏览器环境" 是 "不支持" 你使用这个方法的.

所以如果你强行使用, **并不能达到预期的效果.**


而polyfill的作用正是如此:

知道你的环境不允许, 那就帮你引用一个这个环境.

也就是说, 此时 "编译后的代码" 就会变成这样:

```js
// 原来的代码
var hasTwo = [1, 2, 3].includes(2);

// 加了polyfill之后的代码
require("core-js/modules/es7.array.includes");
require("core-js/modules/es6.string.includes");
var hasTwo = [1, 2, 3].includes(2);
```

这样说你应该就能看懂它的作用了吧 😁

现在就让我们来学习一个重要的 polyfill, 它就是 ```@babel/polyfill```.

**```@babel/polyfill``` 用来模拟完成 ES6+ 环境:**

- 可以使用像 ```Promise``` 或者 ```WeakMap``` 这样的 "新内置函数".
- 可以使用像 ```Array.from``` 或者 ```Object.assign``` 这样的 "静态方法".
- 可以使用像 ```Array.prototype.includes``` 这样的 "实例方法".
- 还有 ```generator``` 函数.

为了实现这一点, Polyfill 增加了 **全局范围** 以及像 String 这样的 "原生原型".

而 ```@babel/polyfill``` 模块包括了 ```core-js``` 和自定义 ```regenerator runtime```.

对于 **库/工具** 来说:

- 如果你不需要像 ```Array.prototype.includes``` 这样的 "实例方法".
  - 可以使用 ```transform runtime``` 插件, 而不是使用 "污染全局的 ```@babel/polyfill```".
- 对于 "应用程序", 建议安装使用 ```@babel/polyfill```.

```shell
$npm i --save @babel/polyfill
```

(注意 ```--save``` 选项而不是 ```--save-dev```, 因为这是一个需要在 "源代码之前运行的 polyfill"。)

但是由于我们使用的是 ```env``` preset, 这里个配置中有一个叫做 "useBuiltIns" 的选项:

- 如果将这个选择设置为 "usage", 就只包括你需要的 polyfill.

此时的 ```babel.config.js``` 调整为:

```js
const presets = [
	[
		"@babel/env",
		{
			targets: {
				edge: "17",
				chrome: "64",
				firefox: "67",
				safari: '11.1'
			},
			useBuiltIns: "usage"
		}
	]
]

module.exports = { presets }
```

- 安装配置了 ```@babel/polyfill```:
  - Babel 将 "检查你的所有代码".
  - 查找 "目标环境" 中 "缺少的功能".
    - 并引入 "仅包含所需" 的 polyfill.

(如果我们没有将 ```env``` preset 的 "useBuiltIns" 选项的设置为 "usage" ，就必须在其他代码之前 require 一次完整的 polyfill。)

还是上面👆的那个例子, 我们来改造一下, 使用 ```Edge17``` 中没有的 ```Promise.prototype.finally```:

### src/index.js:

```js
const fn = () => 1; // ES6箭头函数, 返回值为1
let num = 3 ** 2; // ES7求幂运算符
let hasTwo = [1, 2, 3].includes(2)
let foo = function(a, b, c, ) { // ES7参数支持尾部逗号
    console.log('a:', a)
    console.log('b:', b)
    console.log('c:', c)
}
foo(1, 3, 4)
Promise.resolve().finally();
console.log(fn());
console.log(num);
console.log(hasTwo);
```

现在执行 ```npm run build``` 之后生成的 ```lib/index.js``` 变成了:

```js
"use strict";

require("core-js/modules/es7.promise.finally");

const fn = () => 1; // ES6箭头函数, 返回值为1


let num = 3 ** 2; // ES7求幂运算符

let hasTwo = [1, 2, 3].includes(2);

let foo = function foo(a, b, c) {
  // ES7参数支持尾部逗号
  console.log('a:', a);
  console.log('b:', b);
  console.log('c:', c);
};

foo(1, 3, 4);
Promise.resolve().finally();
console.log(fn());
console.log(num);
console.log(hasTwo);
```

```@babel/polyfill``` 帮我们引入了 ```Edge17``` 环境中没有的 ```promise.finally()```

---

## 被 deprecated 的 @babel/polyfill

上面介绍的 ```@babel/polyfill的polypill```, 其实它在 ```Babel7.4.0``` 以上已经 "不被推荐使用" 了.

- 而是:
  - 推荐使用 ```core-js@3``` + ```@babel/preset-env```
  - 然后设置 ```@babel/preset-env``` 的 ```corejs``` 选项为 **3**.

因此如果你按着, 我文章中讲方式使用 ```@babel/polyfill```, 是可以实现的, 不过控制台中会抛出一个警告⚠️:

```
WARNING: We noticed you're using the `useBuiltIns` option without declaring a core-js version. Currently, we assume version 2.x when no version is passed. Since this default version will likely change in future versions of Babel, we recommend explicitly setting the core-js version you are using via the `corejs` option.

You should also be sure that the version you pass to the `corejs` option matches the version specified in your `package.json`'s `dependencies` section. If it doesn't, you need to run one of the following commands:

  npm install --save core-js@2    npm install --save core-js@3
  yarn add core-js@2              yarn add core-js@3
```

解决办法是卸载掉 ```@babel/polyfill```, 然后重新安装 ```core-js@版本号```. 

然后重新配置一些 ```babel.config.js``` 文件.

1. 安装 ```core-js@3```:

```shell
$npm i --save core-js@3
```

2. 添加 ```corejs``` 选项:

```js
const presets = [
[
  "@babel/env",
      {
        targets: {
        edge: "17",
        chrome: "64",
        firefox: "67",
        safari: '11.1'
      },
      useBuiltIns: "usage",
      corejs: 3
    }
  ]
]

module.exports = { presets }
```

(useBuiltIns 选项还是不能去掉)

现在重新 ```npm run build``` 之后就不会有这个警告了, 而且生成的 ```lib``` 也是正确的.

---

## 结语

- ```babel/cli``` 允许我们从终端运行Babel.
- ```env``` preset 只包含我们使用的功能的转换, 实现我们的 "目标浏览器中缺少的功能".
- ```@babel/polyfill``` 实现 "所有新的JS功能", 为 "目标浏览器" 引入 "缺少的环境"(**但是Babel7.4.0以上不推荐使用**)
