# webpack 和 babel

- ES6 模块化，浏览器暂不支持。
- ES6 语法，浏览器并不完全支持。
- 压缩代码，整合代码，以让网页加载更快。

## 搭建

- 初始化：npm init
  - 文件夹下会生成：package.json
- 安装 webpack：
  - 淘宝代理镜像：npm.taobao.org
    - `--registry=https://registry.npm.taobao.org`

```
npm install webpack webpack-cli -D
```

### 创建配置文件：webpack.config.js

- 书写配置项

```js
// 初步书写 webpack 配置文件
const path = require("path");

module.exports = {
  mode: "development", // production
  entry: path.join(__dirname, "src", "index.js"),
  output: {
    filename: "bundle.js",
    path: path.join(__dirname, "dist"),
  },
};
```

### 运行 webpack

- 在 package.json 中加一个命令：
  - "build": "webpack --config webpack.config.js"

### 安装插件

- html-webpack-plugin
  - 用来解析 html 的插件。

```
npm install html-webpack-plugin -D
```

- webpack-dev-server
  - 能启动服务的插件

```
npm install webpack-dev-server -D
```

### 补充 webpack 配置文件

- 加上 html 解析和 本地服务：

```js
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development", // production
  entry: path.join(__dirname, "src", "index.js"),
  output: {
    filename: "bundle.js",
    path: path.join(__dirname, "dist"),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src", "index.html"),
      filename: "index.html",
    }),
  ],
  devServer: {
    port: 3000,
    contentBase: path.join(__dirname, "dist"),
  },
};
```

### 启动本地服务

- 在 package.json 中加一个命令：
  - "dev": "webpack-dev-server"
    - 命令行启动：

```
npm run dev
```

- 浏览器访问：
  - localhost:3000

> 版本问题非常重要，基本上过几个版本，之前的方法就被更新了，要修改。（但是道理不会变，只是使用上微调）

---

## babel

- 代码编译
  - 主要场景：将 ES6 编译成 ES5

### 安装

```
npm i @babel/core @babel/preset-env babel-loader -D
```

### 书写 babel 配置文件

- 在根目录下创建文件：
  - `.babelrc`
- 书写配置文件：

```json
{
  "presets": ["@babel/preset-env"]
}
```

### 补充 webpack 配置文件

- 加了 module，设定 babel 的编译规则。

```js
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development", // production
  entry: path.join(__dirname, "src", "index.js"),
  output: {
    filename: "bundle.js",
    path: path.join(__dirname, "dist"),
  },
  // 根据不同模块进行不同的解析
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: ["babel-loader"],
        include: path.join(__dirname, "src"),
        exclude: /node_modules/,
      },
    ],
  },
  // 解析 html
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src", "index.html"),
      filename: "index.html",
    }),
  ],
  // 本地服务
  devServer: {
    port: 3000,
    contentBase: path.join(__dirname, "dist"),
  },
};
```

---

## ES6 模块化

- export 导出
- import 导入

---

## 配置 webpack 生产环境

### 创建生产环境配置文件：webpack.prod.js

- mode 改为 production。
- output 的文件名称加上 contenthash。

```js
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "production",
  entry: path.join(__dirname, "src", "index.js"),
  output: {
    filename: "bundle.[contenthash].js",
    path: path.join(__dirname, "dist"),
  },
  // 根据不同模块进行不同的解析
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: ["babel-loader"],
        include: path.join(__dirname, "src"),
        exclude: /node_modules/,
      },
    ],
  },
  // 解析 html
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src", "index.html"),
      filename: "index.html",
    }),
  ],
};
```

- 在 package.json 中覆盖一个命令：
  - "build": "webpack --config webpack.prod.js"
