const gulp = require('gulp');
const watch = require('gulp-watch');

// liveload
gulp.task('watch', () => {
    watch('app/*.jsx', gulp.series('default'), async (done) => {
        console.log('done', done);
    })
})


