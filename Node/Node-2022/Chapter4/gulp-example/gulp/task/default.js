const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps'); // 像加载标准 Node 模块那样加载 Gulp 插件
const babel = require('gulp-babel');
const concat = require('gulp-concat');

gulp.task('default', () => {
    console.log('in');
    return gulp.src('app/*.jsx') // 用 Gulp 自带的文件聚集工具 gulp.src 查找所有的 React jsx 文件
        .pipe(sourcemaps.init()) // 开始 监视 源文件，为 调试 构建 源码映射 -> 本例为：压缩文件（xx.min.js）
        .pipe(babel({
            presets: ['es2015', 'react'] // 使用 ES2015 和 React（JSX）配置 gulp-babel
        }))
        .pipe(concat('all.js')) // 把所有 源码文件 拼到一个 all.js 中
        .pipe(sourcemaps.write('.')) // 单独写入 源码映射 文件 -> 本例为：压缩文件（xx.min.js）
        .pipe(gulp.dest('dest')); // 将所有文件放到 dist/ 目录下
})
