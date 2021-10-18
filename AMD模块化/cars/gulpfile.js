/* 
    gulp  发布任务
*/
const gulp = require("gulp");
gulp.task("copy-html", function(){
    return gulp.src("*.html")
    .pipe(gulp.dest("demo"))
    .pipe(connect.reload());
})

const scss = require("gulp-sass")(require("sass"));
const minifyCSS = require("gulp-minify-css");
const rename = require("gulp-rename");
gulp.task("scss", function(){
    return gulp.src("stylessheet/index.scss")
    .pipe(scss())
    .pipe(gulp.dest("demo/css"))
    .pipe(minifyCSS())
    .pipe(rename("index.min.css"))
    .pipe(gulp.dest("demo/css"))
    .pipe(connect.reload());
})

gulp.task("scripts", function(){
    return gulp.src(["*.js", "!gulpfile.js"])
    .pipe(gulp.dest("demo/js"))
    .pipe(connect.reload());
})

gulp.task("images", function(){
    return gulp.src("images/*.{jpg,png}")
    .pipe(gulp.dest("demo/images"))
    .pipe(connect.reload());
})

gulp.task("data", function(){
    return gulp.src(["*.json", "!package.json"])
    .pipe(gulp.dest("demo/data"))
    .pipe(connect.reload());
})

/* 
    监听
*/
gulp.task("watch", function(){
    gulp.watch("*.html", gulp.series('copy-html'));
    gulp.watch("stylesheet/index.scss", gulp.series('scss'));
    gulp.watch(["*.js", "!gulpfile.js"], gulp.series('scripts'));
    gulp.watch("images/*.{jpg,png}", gulp.series("images"));
    gulp.watch(["*.json", "!package.json"], gulp.series('data'));

})

const connect = require("gulp-connect");
gulp.task("server", function(){
    connect.server({
        root: "demo",
        port: 8888,
        livereload: true
    })
})

gulp.task('build',gulp.parallel('copy-html','scripts','images','data','scss'))


gulp.task("default", gulp.parallel('build','server', 'watch'));

