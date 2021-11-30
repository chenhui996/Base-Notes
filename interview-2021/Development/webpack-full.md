# webpack

- webpack 已是前端打包构建的不二选择。
- 每日必用，面试必要。
- 成熟的**工具**：
  - 重点在于配置和使用，原理并不高优。

## 讲解范围

- 基本配置。
- 高级配置。
- 优化打包效率。
- 优化产出代码。
- 构建流程概述。
- babel。

---

## 面试题

### 前端代码为何要进行 '构建' 和 '打包' ？

### module、chunk、bundle 分别什么意思，有何区别？

### loader 和 plugin 的区别？

### webpack 如何实现懒加载？

### webpack 常见性能优化

### babel-runtime 和 babel-polyfill 的区别

---

## 关于 webpack 5

- webpack 5 主要是 '内部效率' 的优化。
- 对比 webpack 4，没有太多使用上的改动。
- 可以直接使用 webpack 5 来学习课程。

### webpack 5 改动

升级 webpack 5 以及周边插件后，代码需要做出的调整：

- package.json 的 dev-server 命令改了:

```json
"dev": "webpack serve --config build"
```

- 升级新版本:

```js
const { merge } = require("webpack-merge"); // 之前是 smart
const { CleanWebpackPlugin } = require("clean-webpack-plugin"); // 之前是直接引用，无需解构。
```

- `module.rules` 中 `loader: ['xxx-loader']` 换成 `use: ['xxx-loader']`。
- `filename: 'bundle.[contenthash:8].js'` 其中 `h` 小写，不能大写。

---

## webpack 基本配置

### 拆分配置 和 merge。

- 拆分配置 和 merge
  - 拆分配置：
    - webpack.common.js - 公共配置
    - webpack.dev.js - 开发环境配置
    - webpack.prod.js - 生产环境配置
  - merge：
    - 公共的 webpack.common.js 需要分别引入到 '开发环境配置' 和 '生产环境配置'。
    - 如下：

```js
// merge
const webpackCommonConf = require("./webpack.common.js");
const { smart } = require("webpack-merge"); // merge 中解构出 smart

module.exports = smart(webpackCommonConf, {
  //...
});
```

#### webpack.common.js - 公共配置

- 公共配置都有些什么：

```js
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { srcPath, distPath } = require("./paths"); // 自己定义的，常用的文件路径。

module.exports = {
  entry: path.join(srcPath, "index"),
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: ["babel-loader"],
        include: srcPath, // 需要解析的文件，其所在路径
        exclude: /node_modules/, // 不需要解析的文件，其所在的路径
      },
      {
        test: /\.css$/,
        // loader 的执行顺序是：从后往前
        loader: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.less$/,
        // 增加 'less-loader', 注意顺序
        loader: ["style-loader", "css-loader", "less-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(srcPath, "index.html"),
      filename: "index.html",
    }),
  ],
};
```

> 然后 '开发环境配置' 和 '生产环境配置'，也基于各自环境的特殊性，有着各自不同的配置。（这里就不过多演示了）

### 启动本地服务 webpack-dev-server

- dev 环境下（开发环境）：
  - 安装 `webpack-dev-server` 并使用。
- 注意：
  - 启动本地服务：npm run webpack-dev-server ...
  - webpack 构建：npm run webpack ...
- 一些常见的可配置项：

```js
module.exports = {
  //...
  devServer: {
    port: 8080,
    progress: true, // 显示打包的进度条
    contentBase: distPath, // 启动服务的根目录
    open: true, // 自动打开浏览器
    compress: true, // 启动 gzip 压缩

    // 设置代理
    proxy: {
      // 将本地 /api/xxx 代理到 localhost:3000/api/xxx
      "/api": "http://localhost:3000",

      // 将本地 /api2/xxx 代理到 localhost:3000/xxx
      "/api2": {
        target: "http://localhost:3000",
        pathRewrite: {
          "/api2": "",
        },
      },
    },
  },
};
```

### 处理 ES6、样式

- 在 `webpack.common.js` 下去处理：
  - 也就是配置 module 下的 rules，为各类语言做单独配置

```js
module.exports = {
  // ...
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: ["babel-loader"],
        include: srcPath, // 需要解析的文件，其所在路径
        exclude: /node_modules/, // 不需要解析的文件，其所在的路径
      },
      {
        test: /\.css$/,
        // loader 的执行顺序是：从后往前
        loader: ["style-loader", "css-loader", "postcss-loader"], // postcss-loader 处理 css 兼容性问题
      },
      {
        test: /\.less$/,
        // 增加 'less-loader', 注意顺序
        loader: ["style-loader", "css-loader", "less-loader"],
      },
    ],
  },
  // ...
};
```

#### postcss-loader

- postcss-loader 处理 css 兼容性问题：
  - 注意写在 loader 的最后，因为需要最先执行。
    - loader 的执行顺序是：从后往前。
  - 还需要在根目录下创建`postcss.config.js`：

```js
module.exports = {
  plugins: [require("autoprefixer")], // autoprefixer 是需要安装的，它能帮我加一些类似于 -Webkit 的前缀。
};
```

### 处理图片

- 开发环境下的简单配置（图片）：
  - 在 `webpack.dev.js` 下去处理：
    - 配置 module 下的 rules，为图片单独配置。
- 生产环境下的复杂配置（图片）：
  - 在 `webpack.prod.js` 下去处理：
    - 配置 module 下的 rules，为图片单独配置。

```js
// 开发模式下的 图片 简单配置
module.exports = {
  mode: "development",
  // ...
  module: {
    rules: [
      // 直接引入图片 url
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        use: "file-loader",
      },
    ],
  },
  // ...
};
```

```js
// 生产模式下的 图片 复杂配置
module.exports = {
  mode: "production",
  output: {
      filename: 'bundle.[contentHash:8].js', // 重新 build 时，若是 hash 没变，则选择命中缓存，让页面加载更快。
      path: distPath
  }
  module: {
    rules: [
      // 图片 - 考虑 base64 编码的情况
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        use: {
          loader: "url-loader",
          options: {
            // 小于 5kb 的图片用 base64 格式产出
            // 否则，依然延用 file-loader 的形式，产出 url 格式
            limit: 5 * 1024,

            // 不满足条件的 img，均打包到 img 目录下
            outputPath: "/img1",

            // 设置图片的 cdn 地址 （也可以统一在外面的 output 中设置，）
            // publicPath: 'http://cdn.abc.com'
          },
        },
      },
    ],
  },
  // ...
};
```

---

## webpack 高级配置

- 基本配置只能做 demo，不能做线上项目。
- 面试考察基本配置，只是为了快速判断你是否用过 webpack。
- 以下高级配置，也是通过面试的必要条件。
  - 多入口。
  - 抽离 CSS 文件。
  - 抽离 公共代码。
  - 懒加载。
  - 处理 JSX。
  - 处理 Vue。

### 多入口

- 配置要点：
  - 1.多个 entry。
  - 2.output 加 `[name]` 变量。
  - 3.设多个 html 页面解析。
    - chunks 指明该 html 页面需要加载哪些 js 文件。

#### webpack.common.js 中 entry 要建多个：

- webpack.common.js 中：
  - entry 要建两个：

```js
module.exports = {
  entry: {
    index: path.join(srcPath, "index.js"),
    other: path.join(srcPath, "other.js"),
  },
  // ...
};
```

#### webpack.prod.js 中 output 加变量：

- 由于多入口设置完毕，那么，出口文件，也要做出区分：

```js
module.exports = {
  mode: "production",
  output: {
    filename: "[name].[contentHash:8].js", // name 即多入口时 entry 的 key 名
    path: distPath,
  },
  // ...
};
```

#### webpack.common.js 中 html 解析要建多个：

```js
module.exports = {
  // ...
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(srcPath, "index.html"),
      filename: "index.html",
      chunks: ["index"], // 只引用 index.js
    }),
    new HtmlWebpackPlugin({
      template: path.join(srcPath, "other.html"),
      filename: "other.html",
      chunks: ["other"], // 只引用 other.js
    }),
  ],
};
```

---

### 插入小 tips：每次 build 清空 dist 文件夹

- 在 weboack.prod.js 中配置：
  - CleanWebpackPlugin

```js
module.exports = {
  //...
  plugins: [
    new CleanWebpackPlugin(), // 会默认清空 output.path 文件夹
    new webpack.DefinePlugin({
      // window.ENV = 'production'
      ENV: JSON.stringify("production"),
    }),
  ],
};
```

---

### 抽离 CSS 文件

- webpack.common.js 中 module 的 rules：
  - 只留 js 解析的项。
- 先满足 dev 环境下的 css 配置：
  - css 处理移到 webpack.dev.js 下：

```js
// dev 环境下
module.exports = {
  mode: "development",
  module: {
    rules: [
      // 直接引入图片 url
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        use: "file-loader",
      },
      {
        test: /\.css$/,
        // loader 的执行顺序是：从后往前
        loader: ["style-loader", "css-loader", "postcss-loader"], // postcss-loader 处理 css 兼容性问题
      },
      {
        test: /\.less$/,
        // 增加 'less-loader', 注意顺序
        loader: ["style-loader", "css-loader", "less-loader"],
      },
    ],
  },
  // ...
};
```

- 再满足 prod 环境下的 css 配置：
  - 需求：不能通过插入 style 标签内容来加载，要抽离出 css 文件。
  - 措施：
    - 1. 安装 `mini-css-extract-plugin` 插件。
    - 2. 在 prod 环境下：
      - 做一份 css 的 rules 配置（于 dev 完全不同，带有抽离功能）。
      - plugins 配置中 用 `MiniCssExtractPlugin` 配置 '抽离 css 文件' 的配置。
    - 3. 压缩抽离出来的 css 文件：
      - 配置 `optimization`，通过用两个插件的方式去进行配置：
        - `terser-webpack-plugin`
        - `optimize-css-assets-webpack`

```js
// prod 环境下
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserJSPlugin = require("terser-webpack-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack");

module.exports = {
  mode: "production",
  module: {
    rules: [
      // 图片 - 考虑 base64 编码的情况
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        use: {
          loader: "url-loader",
          options: {
            // 小于 5kb 的图片用 base64 格式产出
            // 否则，依然延用 file-loader 的形式，产出 url 格式
            limit: 5 * 1024,

            // 不满足条件的 img，均打包到 img 目录下
            outputPath: "/img1",

            // 设置图片的 cdn 地址 （也可以统一在外面的 output 中设置，）
            // publicPath: 'http://cdn.abc.com'
          },
        },
      },
      // 抽离 css
      {
        test: /\.css$/,
        loader: [
          MiniCssExtractPlugin.loader, // 注意，这里不再用 style-loader
          "css-loader",
          "postcss-loader",
        ],
      },
      // 抽离 less --> css
      {
        test: /\.less$/,
        loader: [
          MiniCssExtractPlugin.loader, // 注意，这里不再用 style-loader
          "css-loader",
          "less-loader",
          "postcss-loader",
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(), // 会默认清空 output.path 文件夹
    new webpack.DefinePlugin({
      // window.ENV = 'production'
      ENV: JSON.stringify("production"),
    }),

    // 抽离 css 文件
    new MiniCssExtractPlugin({
      filename: "css/main.[contentHash:8].css",
    }),
  ],
  optimization: {
    // 压缩 css
    minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
  },
};
```

> 生产环境下所有的产出，都要用 hash 规则去做，这样才能最大程度上命中浏览器的缓存。

---

### 抽离公共代码

- 需求：
  - 将公共代码抽离出来，各个文件只需要进行单独的引用。
    - 这样能减少执行和加载的次数。
  - 开发环境无所谓，打包更快，更快的进行本地测试，所以不需要抽离。
    - 所以主要是作用于 '生产环境'，`webpack.prod.js` 进行配置。
      - 另外还需调整 `webpack.common.js` 中的 chunks 的参数（考虑代码分割）。
- 措施：
  - 配置 `webpack.prod.js` 中 `optimization` 下的 chunk。
  - 调整 `webpack.common.js` 中的 chunks 的参数（引用 `optimization` 中创建的 chunk）。

```js
// 配置 `webpack.prod.js` 下 `optimization`。
module.exports = {
  mode: "production",
  //...
  optimization: {
    // 压缩 css
    minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],

    // 分割代码块
    splitChunks: {
      chunks: "all",
      /**
       * initial 入口 chunk，对于异步导入的文件不处理
       * async 异步 chunk, 只对异步导入的文件处理
       * all 全部 chunk
       */

      // 缓存分组
      cacheGroups: {
        // 第三方模块
        vendor: {
          name: "vendor", // chunk 名称
          priority: 1, // 权限更高，优先抽离，重要！！！
          test: /node_modules/,
          minSize: 0, // 大小限制
          minChunks: 1, // 最少复用过几次
        },

        // 公共的模块
        common: {
          name: "common", // chunk 名称
          priority: 0, // 优先级
          minSize: 0, // 公共模块的大小限制
          minChunks: 2, // 公共模块最少复用过几次
        },
      },
    },
  },
};
```

```js
// 调整 `webpack.common.js` 中的 chunks 的参数（考虑代码分割）。
module.exports = {
  // ...
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(srcPath, "index.html"),
      filename: "index.html",
      chunks: ["index", "vendor", "common"], // 要考虑代码分割
    }),
    new HtmlWebpackPlugin({
      template: path.join(srcPath, "other.html"),
      filename: "other.html",
      chunks: ["other", "common"], // 要考虑代码分割
    }),
  ],
};
```

---

### 懒加载（异步加载）

- 引入动态数据 - 懒加载

```js
setTimeout(() => {
  // 定义一个 chunk
  import("./dynamic-data.js").then((res) => {
    console.log(res.default.message); // 注意这里的 default
  }, 1500);
});
```

---

### 处理 JSX

- 用 babel：
  - 在 `.babelrc` 中写上：

```json
{
  "presets": ["@babel/preset-react"]
}
```

> 记得 `@babel/preset-react` 是需要 npm 下载安装的。

---

### 处理 vue

- `webpack.common.js` 下 module 的 rules，新增个 vue 的配置解析：

```js
module.exports = {
  //...
  module: {
    rules: [
      //..
      {
        test: /\.vue$/,
        loader: ["vue-loader"],
        include: srcPath,
      },
    ],
  },
};
```

---

## module、chunk、bundle 的区别

- module:
  - 各个源码文件，webpack 中一切皆模块。（只要能被分析和引用到的文件或说文件名，这都是模块）
- chunk:
  - 多模块合并成的，如 entry、import()、splitChunk。
- bundle:
  - 最终的输出文件。

---

# webpack 性能优化

- 大厂必考&社区热议话题：
  - 优化打包构建速度 - 开发体验和效率。
  - 优化产出代码 - 产品性能。

## 优化打包构建速度 - 开发体验和效率。

- 优化 babel-loader。
- IgnorePlugin。
- noParse。
- happyPack。
- ParallelUglifyPlugin。
- 自动刷新。
- 热更新。
- DllPlugin。

---

### 优化 babel-loader

```js
module.exports = {
  mode: "production",
  module: {
    rules: [
      {
        test: /\.js/,
        use: ["babel-loader?cacheDirectory"], // 开启缓存
        include: path.resolve(__dirname, "src"), // 明确范围
      },
    ],
  },
};
```

---

### IgnorePlugin 避免引入无用模块

-  顾名思义，避免引入无用模块：
  - 场景：
    - import moment from 'moment'。（日期处理的库，支持很多国语言）
      - 默认会引入所有语言 JS 代码，代码过大。
      - 需求：只引入部分语言代码（中文或英文）
  - 措施：
    - `webpack.prod.js` 中的 `plugins 进行配置 `IgnorePlugin`。
    - 在需要用到 moment 中文语言包的地方（js 文件），手动引入中文语言包。

```js
// plugins 配置 IgnorePlugin
module.exports = {
  mode: "production",
  //...
  plugins: [
    //...

    // 忽略 moment
    new webpack.IgnorePlugin(/\.\/locale/, /moment/),
  ],
};
```

```js
// 手动引入 moment 中文语言包
import moment from "moment"; // 此处的引入，就会被 默认忽略 所有语言包
import "moment/locale/zh-cn"; // 手动引入中文语言包
```

---

### noParse 避免重复打包

- 像一些 `xxx.min.js` 基本都是已模块化处理过的，就不需要重新用 webpack 打包模块化了。
  - 所以我们可以用 noParse 忽略那些已经模块化的文件。

```js
module.exports = {
  mode: "production",
  module: {
    // 忽略对 `react.min.js` 文件的递归解析处理
    noParse: [/react\.min\.js$/],
  },
};
```

#### IgnorePlugin 和 noParse 有什么区别？

- IgnorePlugin 是直接不引入，代码中没有。
  - 需要什么，自己手动引。
- noParse 是引入，但不打包。

> 两者都可以提升文件构建速度，IgnorePlugin 还可以优化产出文件的体积。

---

### happyPack 多进程打包

- JS 是 '单线程'，开启 '多进程' 打包。
- 提高构建速度（特别是多核 CPU）。
- 用法：
  - 安装 `happypack`。
  - 在 `webpack.prod.js` 中引用。
  - 将 `webpack.common.js ` 中 module 下的 rules 移除 js 配置 - `babel-loader`。
    - 在 `webpack.prod.js` 中:
      - module 下的 rules 新增 js 配置 - `happypack`。
      - plugins 下新增配置。

```js
// prod 环境下
const HappyPack = require("happypack");

module.exports = {
  mode: "production",
  module: {
    rules: [
      //js
      {
        test: /\.js$/,
        // 把对 .js 文件的处理转交给 id 为 babel 的 HappyPack 实例。
        use: ["happy/loader?id=babel"],
        include: srcPath,
      },
      // 图片 - 考虑 base64 编码的情况
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        use: {
          loader: "url-loader",
          options: {
            // 小于 5kb 的图片用 base64 格式产出
            // 否则，依然延用 file-loader 的形式，产出 url 格式
            limit: 5 * 1024,

            // 不满足条件的 img，均打包到 img 目录下
            outputPath: "/img1",

            // 设置图片的 cdn 地址 （也可以统一在外面的 output 中设置）
            // publicPath: 'http://cdn.abc.com'
          },
        },
      },
    ],
  },
  plugins: [
    // ...

    // happyPack 开启多进程打包
    new HappyPack({
      // 用唯一的标识符 id 来代表当前的 HappyPack 是用来处理一类特定的文件
      id: "babel",
      loaders: ["babel-loader?cacheDirectory"],
    }),

    //...
  ],
};
```

---

### ParallelUglifyPlugin 多进程压缩 JS

- webpack 内置 Uglify 工具压缩 JS。
- JS 单线程，开启多进程压缩更快。
- 原理和 happyPack 同理。
- 操作：
  - 下载插件 `webpack-parallel-uglify-plugin`。
  - 在 `webpack.prod.js` 中 plugins 新增配置。

```js
module.exports = {
  mode: "production",
  //...
  plugins: [
    // ...

    // 使用 ParallelUglifyPlugin 并行压缩输出的 JS 代码
    new ParallelUglifyPlugin({
      // 传递给 UglifyJS 的参数
      // (还是使用 UglifyJS 压缩，只不过帮助开启了多进程)
      uglifyJS: {
        output: {
          beautify: false, // 最紧凑的输出
          comments: false, // 删除所有的注释
        },
        compress: {
          // 删除所有的 `console` 语句，可以兼容 ie 浏览器。
          drop_console: true,
          // 内嵌定义了，但是只用到一次的变量
          collapse_vars: true,
          // 提取出 出现多次，但是没有定义成变量，去引用的静态值
          reduce_vars: true,
        },
      },
    }),
  ],
};
```

---

## 关于开启多进程

- 项目较大，打包较慢，开启多进程能提高速度。
- 项目较小，打包很快，开启多进程会降低速度（进程开销）。
- 按需使用。

> 所以就先正常单进程打包，等打包速度慢慢变慢了，再可以尝试去提高速度，开启多进程打包。

---

### 自动刷新

- 在开发环境下，watch 属性改为 true，开启监听。
  - 还可以为监听做一些配置。

> 开启监听就意味这 webserver-dev-server 会自动开启刷新浏览器。

```js
module.exports = {
  watch: true, // 开始监听，默认为 false
  // 注意，开启监听之后，webpack-dev-server 会自动开启刷新浏览器。

  // 监听配置
  watchOptions: {
    ignored: /node_modules/, // 忽略哪些
    // 监听到变化发生后会等 300ms 再去执行动作，防止文件更新太快导致 重新编译频率太高。
    aggregateTimeout: 300, // 默认为 300ms
    // 判断文件是否发生变化是 通过不停的去询问系统 指定文件有没有变化实现的
    poll: 1000, // 默认每隔 1000 毫秒询问一次
  },
};
```

---

### 热更新

- 
