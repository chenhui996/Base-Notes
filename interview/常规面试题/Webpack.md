# webpack

- Webpack 的 **面试重点** 围绕:
  - 核心概念
  - 配置优化
  - 打包原理
- 展开。
- 回答时需结合具体场景，如：
  - **概念清晰**：区分 Loader 与 Plugin、Chunk 与 Bundle。
  - **实践导向**：举例优化手段（Tree Shaking、Code Splitting）。
  - **原理理解**：热更新、构建流程、自定义扩展能力。

## 核心概念

- **Entry（入口）**：
  - 定义打包的起点， webpack 从入口文件开始 **构建依赖图**。
  - 示例：
    - `entry: './src/index.js'` 或配置多入口。
- **Output（输出）**：
  - 定义 **打包后的文件**：
    - 输出位置
    - 命名规则
  - 示例：

```js
module.export = {
    ouput: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    }
}
```

- **Loader（加载器）**：
  - 处理非 js 文件（如 css、图片），将其转换为模块。
  - 常见 loader：`babel-loader`、`css-loader`、`file-loader`。
  - 配置示例：

```js
module.export ={
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    }
}
```

- **Pligin（插件）**：
  - 扩展 webpack 功能，如：
    - 打包优化
    - 资源管理
    - 环境变量注入
    - 等
  - 常用插件：
    - `HtmlWebpackPlugin`
    - `CleanWebpackPlugin`
    - `MinCssExtractPlugin`
- **Module（模块）**：
  - webpack 中，一切皆模块（js、css、图片等）
  - 都通过 loader 进行处理。
- **Chunk（代码块）**：
  - webpack 将 **模块** 按 **依赖关系** 分割成 **不同的 chunk**（如 入口 chunk、异步加载 chunk）。
- **Bundle（包）**：
  - 最终生成的打包文件，可能包含多个 chunk。

---

## 面试题（基础类）

### 1. webpack 的作用是什么？与 grunt/gulp 有什么区别？

- **作用**：
  - 模块打包工具：
    - 处理模块依赖
    - 转换代码（如 es6 -> es5）
    - 优化资源
- **区别**：
  - grunt/gulp 是 **任务执行工具**，侧重 **流程自动化**（如 文件压缩、合并）。
  - webpack 是模块化打包工具，核心是 **依赖分析** 和 **代码转换**。

### 2. Loader 和 Plugin 的区别是什么？

- **loader**：处理 **单个文件**，在打包过程中 **转换文件的内容**（如 sass -> css、ts -> js）。
- **plugin**：扩展 webpack 功能，作用于 **整个构建流程**（如生成 html 文件、压缩代码）。

### 3. 如何实现代码分割（code splitting）？

- **方式1**：
  - 配置多入口（`entry: {app: './app.js', admin: './admin.js'}`。
- **方式2**：
  - 动态导入（`import(./module).then(...)`）。
- **方式3**：
  - 使用 `SplitChunksPlugin` 提取公共代码。

```js
module.export = {
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    }
}
```

### 4. Webpack 的构建流程是怎样的？

1. 初始化参数（合并配置文件和命令行参数）。
2. 创建 Compiler 对象，加载插件。
3. 确定入口，递归构建依赖图。
4. 调用 Loader 转换模块。
5. 生成 Chunk 和 Bundle。
6. 输出到文件系统。

---

## 面试题（配置类）

### 1. 如何配置开发环境的 Source Map？

```js
module.exports = {
    devtool: 'cheap-module-eval-source-map' // 开发环境推荐
}
```

### 2. 如何配置多环境（开发/生产）?

- 使用 `webpack-merge` 合并通用配置：

```js
const {merge} = require('webpack-merge');
const commonConfig = require('./webpack.common.js');
const productionConfig = require('./webpack.prod.js');
const developmentConfig = require('./webpack.dev.js');

module.exports = (env) => {
    return merge(commonConfig, env.production ? productionConfig : developmentConfig)
}
```

### 3. 如何优化构建速度？

- 缩小 loader 作用范围（include/exclude）。
- 使用 cache-loader 或 webpack5 的持久化缓存。
- 多线程打包（thread-loader 或 happypack）。
- 使用 DllPlugin 预编译公共库。

---

## 面试题（优化类）

### 1. 如何实现 tree shaking？需要满足什么条件？

- **条件**：
  - 使用 ES6 模块语法（import / export）。
  - 生产模式 启用 `optimization.useExports`。
- **配置**：

```js
module.exports = {
    optimization: {
        useExports: true, // 标记未使用代码
        minimize: true // 删除未使用代码
    }
}
```

### 2. 如何优化 首屏加载 性能？

- 代码分割 + 懒加载。
- 使用 preload/prefetch 预加载 **关键资源**。
- 压缩代码（JS/CSS/图片）。
- 使用CDN加速静态资源。
  
### 3. webpack5 有哪些新特性？

- 模块联邦（module federation）：跨应用共享模块。
- 持久化缓存：显著提升构建速度。
- 资源模块（asset modules）：内置处理图片、字体等资源，无需 `file-loader`。
- top level await： 支持顶层 await。

---

## 面试题（原理题）

### 1. 手写一个简单的 loader

```js
// 功能：将文本中的 red 替换为 blue
module.exports = function(source) {
    return source.replace(/red/g, 'blue');
}

// 配置
module.exports = {
    test: /\.txt$/,
    use: './path/to/custom-loader.js'
}
```

### 2. 手写一个简单的 plugin

```js
class LogPlugin{
    apply(compiler){
        compiler.hooks.done.tap('LogPlugin', stats => {
            console.log('Build completed!')
        })
    }
}

// 配置
module.exports = {
    plugins: [new LogPlugin()]
}
```

### 3. 解释 webpack 的 热更新（HMR）原理

- **步骤**：

1. **本地服务** 与 **浏览器** 建立 websocket 连接。
2. 文件修改后，webpack 重新编译。
3. **服务端** 向 **客户端** 发送： hash 和 更新模块 的 json 文件。
4. 客户端 通过 json 文件，拉取更新后的 **模块代码**。
5. 替换 旧模块，触发 **页面局部更新**。

---

## 实战代码示例

### webpack 基础配置

```js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.[contenthash].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index/html'
        })
    ],
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    }
}
```

---

## 补充追问

### 1. HtmlWebpackPlugin

- 作用：
  - **自动生成 html 文件**：根据 **模版** 或 **默认配置** 生成 html 入口文件。
  - **自动注入资源**：将打包后的 js、css 文件 自动插入 html 中（支持哈希文件名）。
  - **多页面支持**：为 多入口应用 生成多个 html 文件。
- 配置示例：

```js
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html', // 自定义模版
            filename: 'index.html',       // 输出文件名
            chunks: ['main'],             // 指定注入的 chunk（多入口时按需加载）
            favicon: './src/favicon.ico'  // 自动添加 favicon
            minify: {
                collapseWhitespace: true,
                removeComments: true
            }
        })
    ]
}
```

- 适用场景：
  - **单页应用（SPA）**：自动将入口 js 和 css 注入 html，无需手动维护 `<script>` 标签。
  - **多页应用（MPA）**：为每个页面生成独立的 html 文件，并关联对应的 js/css。
  - **动态哈希文件名**：避免浏览器缓存问题（如 bindle.[hash].js）。
  - **SEO 优化**：通过 自定义模版 添加 SEO 相关的 `<meta>` 标签。

### 2. CleanWebpackPlugin

- 作用：
  - **清理输出目录**：在每次构建前删除旧的输出文件，避免残留文件干扰。
- 配置示例：

```js
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  output: {
    path: path.resolve(__dirname, 'dist'), // 输出目录
  },
  plugins: [
    new CleanWebpackPlugin(), // 默认清理 output.path 目录
  ]
};
```

- 适用场景：
  - **生产环境构建**：确保每次构建时 dist 目录都是干净的，避免旧文件残留。
  - **自动化部署**：在 CI/CD 流程中，保证部署的代码是最新且完整的。
  - **多配置项目**：当 webpack 配置输出到不同目录时，按需清理特定路径。

### 3. MiniCssExtractPlugin

- 作用：
  - **提取 CSS 到独立文件**：将 css 从 js 中分离，生产单独的 .css 文件。（而非通过 js 插入 `<style>` 标签）。
  - **支持按需加载**：与 `splitChunks` 配合实现 css 代码分割。
- 配置示例：

```js
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  module: {

  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash].css', // 输出路径和文件名格式
      chunkFilename: 'css/[id].[contenthash].css' // 非入口 chunk 的命名规则
    })
  ]
}
```

- 适用场景：
  - **生产环境优化**：
    - 分离 css 文件，利用浏览器并行加载（避免 js 加载完成前，页面无样式）。
    - 启动缓存（独立的 css 文件可设置长期缓存）。
  - **CSS 代码分割**：
    - 结合 `optimization.splitChunks` 提取公共 css。
  - **SSR（服务端渲染）**：
    - 避免服务端渲染时通过 js 插入样式导致的闪烁问题。

### 总结

- **HtmlWebpackPlugin**：解决 HTML 与资源的自动化关联问题，适合所有 Web 项目。
- **CleanWebpackPlugin**：维护输出目录的整洁性，适合生产环境或自动化部署流程。
- **MiniCssExtractPlugin**：优化 CSS 加载性能，适合生产环境分离和压缩样式文件。

---
