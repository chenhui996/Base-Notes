# glup-learn

vue，react等spa项目出现，才让webpack取而代之。
gulp也逐渐退出幕前，转战幕后，去做了它更擅长的事情：**前端开发流程规范管理**。

现在我们在各种组件库，像antd，element-ui，vant等比较人们的组件库，或者其他一些前端工程中都能看到它的身影，只不过它不再介入到业务的实际生产开发中了。

> 所以对业务开发人员来说是不太能感知到它的存在了

## gulp和webpack的区别

首先，可能很多人面试过程中都会被问到这个问题。

**作者的理解：**

### gulp

**强调的是规范前端开发的流程**

- 是一个 “基于流” 的 “自动化构建工具”。(不包括模块化的功能)
  - 通过配置一系列的 task，例如：
    - 文件压缩合并
    - 雪碧图
    - 启动server
    - 版本控制
    - 等等
  - 然后，定义 “执行顺序” 来让 gulp 执行 task,
    - 从而构建 “前端项目” 的流程。

### webpack

**是一个前端模块化方案**

- 是一个 “自动化” 模块打包工具：
  - 把开发中的所有资源：
    - （图片、js文件、css文件等）都看成模块。
  - 通过 “loader（加载器）” 和 “plugins（插件）” 对 “资源” 进行处理。
    - 划分成不同的模块，需要哪个加载哪个。
      - 实现 “按需加载” 的功能。
      - 入口 “引入” 的更多是js文件。

---

- 在webpack刚面世的时候，webpack在gulp中也有一个插件（gulp-webpack）。
  - 使其可以作为 gulp️ 一个 “子任务” 来执行。
- 只不过当时还是 JQuery 的时代，功能基本重复，
  - 真正使用 webpack 的还是很少。
  - react 等 spa 框架的出现，让webpack迅速蹿红。

---

## gulp的核心api

- **task**：“创建” 一个任务。
- **series**：“顺序执行” 多个任务。
- **parallel**：“并行执行” 多个任务。
- **src**：读取 “数据源” 转换成 stream。
- **pipe**：管道 - 可以在 “中间” 对 “数据流” 进行 “处理”。
- **dest**：输出 “数据流” 到 “目标路径”。
- **on**：“事件” 监听。
- **watch**：“数据源” 监听。

这些 api 在 demo 中，都有用一个 “例子串起来” 讲解使用。

其他的基本很少会用到了，这里就不多复述。网上的很多文章，还有官方的api都有详细的。

本文就用一个实际的例子把这几个api全部串联起来，我将实现一个这样的功能：

1. 监听 20201108 文件夹下的 “任意” 一个文件有变动。
2. 合并 20201108 文件夹下的 “所有文件” 并 “生成新文件”。
3. 去除 “合并后” 文件里的 “多余空行”。
   
- 每个任务结束都打印 console.log。

---

## 全局安装gulp

```shell
$ npm i gulp -g
```

## 新建gulpfile.js文件

项目根目录新建gulpfile.js文件

### 文件头引入模块

```js
// gulpfile.js
const gulp = require("gulp");
/**
 * 合并文件插件
 * gulp的插件很多，有4000多个，足够满足大家日常的各种需求，而且插件写起来也超级简单
 */
const concat = require("gulp-concat");
const through2 = require("through2");
```

### 创建合并文件任务

- 新建合并任务:
  - “读取” 20201108目录 下 “所有txt文件”。
  - “合并” 为 20201108.txt 文件。
    - 存储在 demo 文件夹下。

```js
// task：创建 gulp 子任务
gulp.task('concat', () => {
    return gulp.src('./20201108/*.txt') // src: 指定要处理的文件。读取文件转化为可读流，参数可以是文件通配符匹配，也可以是文件路径数组。
          .pipe(gulpConcat('20201108.txt')) // pipe: 管道，把 gulp 的 "执行步骤" 一步步串联起来，也是 gulp 的核心。
          .pipe(dest('./demo/')) // dest: 存放文件的目标路径。
          .on('end', () => { // on: 事件监听
            console.log('concat: 文件合并完成');
          })
})
```

### 创建文件去除空行任务

- 因为是需要 “顺序执行子任务”
  - 所以用的series。
  - 如果是 “需要并行执行” 的话用 parallel。
- 代码中的 through2 主要是用来做 “文件流” 转换过滤。
  - 写 gulp 插件必备，下一节会大概的介绍一下。

```js
// 创建文件去除空行任务 - 子任务 - series
gulp.task('format', gulp.series('concat', () => {
    return gulp.src('./demo/20201108.txt')
        .pipe(through2.obj((file, encoding, cb) => { // through2：文件流转换，写gulp插件必备，下面会大概的介绍一下
            let contents = file.contents.toString();
            contents = contents
                .replace(/(\n[\s\t]*\r*\n)/g, "\n")
                .replace(/^[\n\r\n\t]*|[\n\r\n\t]*$/g, ""); // 去除空行
            let lines = contents.split(/\n/g);
            totalLine = lines.length;
            contents = lines.join("\n");
            file.contents = Buffer.from(contents);
            this.push(file);
            cb();
        }))
        .pipe(dest('./demo/'))
        .on('end', () => {
            console.log('format: 去除空行完成');
        })
}))
```

### 创建监听任务

- 当 “20201108 文件夹” 下的 “文件” 有 “写入操作” 时：
  - 去 “执行 format” 任务。
    - “format 任务” 又 “依赖 concat 任务” 执行。

```js
// 创建监听任务
gulp.task('watch', () => {
    // 因为是需要顺序执行子任务，所以用的concat，如果是需要并行执行的话用parallel
    gulp.watch('./20201108/*.txt', gulp.series('format', (cb) => {
        cb();
    })).on('change', () => { // 更多事件监听可以查看官方文档
        console.log('watch: 文件被改变');
    })
})
```

### 在项目目录下执行

以上几步的代码合并到一个gulpfile.js文件中即可运行

```shell
# 监控20201108文件夹下所有文件变化，则执行format子任务
$ gulp watch
```
