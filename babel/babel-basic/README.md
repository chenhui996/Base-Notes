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

但是注意了, 由于我们现在没有设置 "任何的解析方式".(.babelrc)

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
$cnpm i --save-dev @babel/plugin-transform-arrow-functions
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
$cnpm i --save-dev @babel/preset-env
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

- 截止到现在, 看完了：
  - @babel/core
  - @babel/cli
  - plugins
  - presets
- 相信你对Babel的功能有一定了解了。
- **但是真正使用起来我们不可能都是靠命令行的形式吧**
  - **没错, 接下来我要将这些功能做成配置项.**
    - 也就是常说的 .babelrc 文件

---



