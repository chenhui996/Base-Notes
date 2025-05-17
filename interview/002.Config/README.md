# 面试官：讲讲前端工程化吧

- 概念：前端工程化是指通过工具和方法，提高前端开发效率、降低维护成本、提升代码质量的一种手段。
- 阅读方式：
  - 本文档： 必须全部读完，了解前端工程化的概念和内容。
  - code-example.md： 代码示例，实际操作例子。（可按需查阅）
    - 1. 预防手写代码
    - 2. 帮助理解，加深印象 

## 真题：了解过 AST 吗？说一下吧。

- 概念：AST（Abstract Syntax Tree）抽象语法树，是源代码的抽象语法结构的树状表现形式。

### 问：为什么需要 AST？

- **解析**：将源代码解析成抽象语法树，方便分析和处理。
- **代码的本质**：代码是字符串。
    - 字符串的一些操作，就是所谓的**编译**，也就是编译器的一些操作。
    - AST是 **代码的抽象语法结构** ，更适合 **分析** 和 **处理**。
  - 问：**为什么更适合** 分析和处理？
  - 答：因为 AST 是 **树状结构**，可以方便地 **遍历、查找、修改和生成代码**。
    - 追：为什么树状结构更适合？
    - 答：树状结构是 **递归结构**，适合递归遍历和处理。
      - 追：说到递归结构了，说说递归吧：
      - 答：递归是指 -> 在函数的定义中 -> 调用函数自身的方法，**递归结构**是指 -> 数据结构中 -> 包含 **自身** 的结构。
      - 追：递归的例子？
      - 答：阶乘函数、深拷贝对象和数组等。（代码示例：[## 递归的例子]）

## 草稿：

代码的本质：字符串
字符串的一些操作，就是所谓的编译。
- 流程： 
  - compiler:
    - code -> lexer (tokens -> 别名：词法分析) -> parser (AST -> 别名：语法分析) -> semantic analysis(语义分析) -> code generation(代码生成)
  - tokens（词法分析）: 
    - 将 源代码 转换成 单词流，称为 **词法单元**（tokens）：
      - 如：`let a = 1;` -> `let` `a` `=` `1` `;`
      - 每个单词都有自己的类型，如：
        - `let` 是关键字
        - `a` 是标识符
        - `=` 是操作符
        - `1` 是数字
        - `;` 是分号
  - AST（语法分析）: 
    - 将 词法单元 流转换成 **抽象语法树**（AST），也就是 **标记** 所构成的 **数据结构**，表示 **源代码的结构和规则**：
      - 如：`let a = 1;` -> 
        - `VariableDeclaration`（变量声明）节点
          - `Identifier`（标识符）节点：`a`
          - `Literal`（字面量）节点：`1`
  - semantic analysis:（语义分析）：
    - 检查代码的语义是否正确：类型检查、作用域检查等。
    - 确保代码的正确性、安全性和合理性。
  - code generation（代码生成）：
    - 将抽象语法树转换成代码。
    - 生成目标代码，如：
      - 机器码、字节码、源代码等。
      - 代码文本、进行代码压缩等。

- lexer
  - 词法分析器，将源代码转换成 **词法单元** 流。
- parser
  - 语法分析器，将词法单元流转换成 **抽象语法树**（AST）。
- semantic analysis
  - 语义分析器，检查代码的语义是否正确。
- code generation
  - 代码生成器，将抽象语法树转换成代码。

## 代码示例

- 一个编译器，最核心的代码：

```ts
function compile(code: string): string {
  // 词法分析
  const tokens = lexer(code);

  // 语法分析
  const ast = parser(tokens);

  // 语义分析
  semanticAnalysis(ast);

  // 代码生成
  return codeGeneration(ast);
}
```

---

## 面试：webpack 打包过程与原理

- 概念：Webpack是一个现代JavaScript应用程序的静态模块打包工具。

### 问：webpack 的基本配置有哪些？

- **入口（Entry）**：告诉Webpack从哪里开始构建依赖图。
- **输出（Output）**：Webpack构建后的文件输出位置和命名规则。
- **加载器（Loaders）**：转换那些本身不能直接作为JavaScript模块被处理的文件类型。
- **插件（Plugins）**：执行范围更广的任务，包括打包优化、资源管理和输出。
- **模式（Mode）**：设置构建环境模式，支持`development`和`production`。
- **代码分割（Code Splitting）**：将代码分离到不同的bundle中，实现按需加载或优化加载时间。
- **树摇（Tree Shaking）**：通过静态分析移除JavaScript中用不到的代码。
- **热模块替换（HMR, Hot Module Replacement）**：在应用程序运行时替换、添加或删除模块，而无需重新加载整个页面。
- **持久化缓存（Persistent Caching）**：通过生成唯一的文件名来确保浏览器缓存的有效性。
- **环境变量（Environment Variables）**：在Webpack构建过程中使用的全局变量，用于区分不同的构建环境。
- **Babel**：将ES6+代码转换为向后兼容的JavaScript代码，与Webpack配合使用。
- **PostCSS**：处理CSS，通过插件和预设转换CSS代码，与Webpack集成使用。
- **Webpack Dev Server**：Webpack官方提供的小型Express服务器，用于本地开发环境。
- **Webpack Bundle Analyzer**：可视化Webpack打包结果的工具，帮助分析bundle大小和组成。
- **其他配置**：如`resolve`、`devtool`、`optimization`等。

### 问：spiltChunk 怎么做？

- **定义**：将代码分离到不同的bundle中，以实现按需加载或优化加载时间。
- **实现**：使用动态导入（`import()`）、`entry`中的多入口点或`optimization.splitChunks`配置。
- **配置**：在`webpack.config.js`中的`optimization.splitChunks`字段配置，包括`chunks`、`minSize`、`minChunks`等选项。

```json
// webpack.config.js
module.exports = {
  // ...
  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 30000,
      minChunks: 1,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  }
};
```

- 上述配置解析：
  - `chunks: 'all'`：对所有模块进行代码分割。
  - `minSize: 30000`：模块的最小大小为30KB。
  - `minChunks: 1`：模块的最小引用次数为1。
  - `cacheGroups`：缓存组，用于配置代码分割的规则。
    - `vendors`：将来自`node_modules`目录的模块打包到`vendors`组。
    - `default`：将被引用至少两次的模块打包到`default`组。
    - `priority`：优先级，值越大优先级越高。
    - `reuseExistingChunk`：复用已经存在的chunk。
    - `test`：匹配模块的正则表达式。
- 总结：通过配置`optimization.splitChunks`实现代码分割，提高应用性能和加载速度。
- cacheGroups 下的 vendors 是什么？
  - `vendors`：将来自`node_modules`目录的模块打包到`vendors`组。

### 问：tree shaking 怎么做？

- **定义**：通过静态分析移除JavaScript中用不到的代码（死代码）。
- **实现**：确保使用ES6模块语法，并设置`mode`为`production`，Webpack会自动进行树摇优化。
- **配置**：在`webpack.config.js`中的`mode`字段指定为`production`。

```json
// webpack.config.js
module.exports = {
  mode: 'production'
};
```

### 问：HMR 怎么做？

- **定义**：在应用程序运行时替换、添加或删除模块，而无需重新加载整个页面。
- **实现**：使用Webpack Dev Server，并在Webpack配置中启用HMR功能。
- **配置**：在`webpack.config.js`中的`devServer.hot`字段设置为`true`。

```json
// webpack.config.js
module.exports = {
  devServer: {
    hot: true
  }
};
```

### 问：持久化缓存怎么做？

- **定义**：通过生成唯一的文件名来确保浏览器缓存的有效性，实现持久化缓存。
- **实现**：使用`output.filename`中的`[contenthash]`占位符生成唯一的文件名。
- **配置**：在`webpack.config.js`中的`output.filename`字段中使用`[contenthash]`占位符。

```json
// webpack.config.js
module.exports = {
  output: {
    filename: '[name].[contenthash].js'
  }
};
```

### 问：环境变量怎么做？

- **定义**：在Webpack构建过程中使用的全局变量，用于区分不同的构建环境。
- **实现**：使用`DefinePlugin`插件定义环境变量，或在`webpack.config.js`中根据`mode`设置不同的环墧变量。
- **配置**：在`webpack.config.js`中的`plugins`字段配置`DefinePlugin`插件。

```json
// webpack.config.js
const webpack = require('webpack');

module.exports = {
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ]
};
```

### 问：webpack 的打包流程是怎样的？

- **流程**：从入口文件开始，递归解析依赖关系，构建依赖图，然后按照配置进行加载、转换和打包。
- **步骤**：
  - **1. 读取配置**：读取`webpack.config.js`配置文件。
  - **2. 解析入口**：解析入口文件，构建模块依赖关系。
  - **3. 编译模块**：递归编译模块，将模块转换成AST，再转换成代码。
  - **4. 生成代码**：根据模块之间的依赖关系，生成代码块。
  - **5. 输出文件**：将代码块写入到文件系统中，生成最终的打包文件。
- **优化**：通过代码分割、树摇、持久化缓存、按需加载等技术，减少打包时间和bundle大小。
- **错误处理**：使用`webpack.config.js`中的`devtool`字段配置错误和警告的显示方式，或使用Webpack Dev Server的`client-overlay`选项。

### 问：说说 Dll

- **定义**：Dll（Dynamic Link Library）是一种动态链接库，用于提前编译和打包第三方库，以减少构建时间和优化性能。（第二次编译时将会直接引用）
- **优势**：减少重复构建、提高构建速度、减小打包体积。
- **实现**：使用`DllPlugin`和`DllReferencePlugin`插件，将第三方库打包成动态链接库，再在应用程序中引用。
- **总结(背)**：
  - DLL 其实就是一种很方便的库文件，里面打包了一些常用的代码和数据，这样多个程序就能共享这些资源了，不用每个程序都自己带一份。
  - 在Webpack里，DLL特别有用，它能帮我们把像React、ReactDOM这样的第三方库提前编译好，打包成一个单独的文件。
    - 这样做的好处呢，就是能大大减少我们的构建时间。
    - 你想啊，每次构建项目都要重新编译这些库多浪费时间啊，有了DLL，Webpack就可以直接引用这个已经编译好的文件了。
    - 而且，DLL还能帮我们减小打包体积，虽然单个DLL文件可能不小，但如果多个项目或者多个入口文件都用到了同样的库，那整体来说就节省空间了。
  - 具体到Webpack的配置嘛，就是:
    1. 先用 **DllPlugin 插件** 来 **生成 DLL文件和它的映射文件（manifest）**
       - manifest.json文件：会包含关于DLL文件中各个模块的映射信息，这样Webpack在构建过程中就知道如何引用这些模块了
    2. 然后在 **项目的Webpack配置里** 用 **DllReferencePlugin插件** -> **引用** -> 这个**映射文件**。
      - 这样，Webpack就知道怎么去找DLL文件里的代码了。
  - 总之，DLL就是个优化构建过程的好东西，能让我们的开发效率更高，项目构建得更快。"

```json
// webpack.dll.config.js
const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'production', // 设置构建模式为生产环境
  entry: {
    vendor: ['react', 'react-dom'] // 指定要打包成DLL的第三方库
  },
  output: {
    // 输出配置，通常你需要指定输出文件的名称和路径
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].dll.js',
    library: '[name]_dll' // 这里的[name]会被entry中的键（如vendor）替换
  },
  plugins: [
    new webpack.DllPlugin({
      name: '[name]_dll', // 与output.library保持一致
      path: path.resolve(__dirname, 'dist', '[name]-manifest.json') // 指定manifest文件的输出路径
    })
  ]
};

// webpack.config.js
const path = require('path');
const webpack = require('webpack');

module.exports = {
  plugins: [
    new webpack.DllReferencePlugin({
      manifest: require(path.resolve(__dirname, 'dist', 'vendor-manifest.json')),
    }),
  ],
};
```

### 问：说说 CSS 提取

- **定义**：将CSS从JavaScript中提取出来，单独生成CSS文件，以减小打包体积和优化加载速度。
- **实现**：使用`MiniCssExtractPlugin`插件，将CSS提取到单独的文件中。
- **配置**：在`webpack.config.js`中的`plugins`字段配置`MiniCssExtractPlugin`插件。

```json
// webpack.config.js
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css'
    })
  ]
};
```

### 问：说说 Terser 压缩

- **定义**：使用Terser插件对JavaScript代码进行压缩和优化。
- **实现**：使用`TerserPlugin`插件，对JavaScript代码进行压缩和优化。
- **配置**：在`webpack.config.js`中的`optimization.minimizer`字段配置`TerserPlugin`插件。

```json
// webpack.config.js
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  optimization: {
    minimizer: [new TerserPlugin()]
  }
};
```


