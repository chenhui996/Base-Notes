// gulpfile.js
const gulp = require("gulp");
/**
 * 合并文件插件
 * gulp的插件很多，有4000多个，足够满足大家日常的各种需求，而且插件写起来也超级简单
 */
const gulpConcat = require("gulp-concat");
const through2 = require("through2");

// ----------------------------------------------------------------

// task：创建 gulp 子任务
gulp.task('concat', () => {
    return gulp.src('./20201108/*.txt') // src: 指定要处理的文件。读取文件转化为可读流，参数可以是文件通配符匹配，也可以是文件路径数组。
        .pipe(gulpConcat('20201108.txt')) // pipe: 管道，把 gulp 的 "执行步骤" 一步步串联起来，也是 gulp 的核心。
        .pipe(gulp.dest('./demo/')) // dest: 存放文件的目标路径。
        .on('end', () => { // on: 事件监听
            console.log('concat: 文件合并完成');
        })
})

// 创建文件去除空行任务 - 子任务 - series
gulp.task('format', gulp.series('concat', () => {
    return gulp.src('./demo/20201108.txt')
        .pipe(through2.obj(function (file, encoding, cb) { // through2：文件流转换，写gulp插件必备，下面会大概的介绍一下
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
        .pipe(gulp.dest('./demo/'))
        .on('end', () => {
            console.log('format: 去除空行完成');
        })
}))

// 创建监听任务
gulp.task('watch', () => {
    // 因为是需要顺序执行子任务，所以用的concat，如果是需要并行执行的话用parallel
    gulp.watch('./20201108/*.txt', gulp.series('format', (cb) => {
        cb();
    })).on('change', () => { // 更多事件监听可以查看官方文档
        console.log('watch: 文件被改变');
    })
})