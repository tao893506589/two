//  gulp 相当于nodejs的第三方模块   通过require进行引用   下载配置之后进行使用
const { task } = require("gulp");
const gulp = require("gulp")
const { connect } = require("http2")

// 将html文件放在未创建的文件夹下
gulp.task("html",function(){
    return gulp.src("*.html").pipe(gulp.desk("../gulp/html")).pipe(connect.reload());
})



// 将图片资源放在文件夹下
gulp.task("img",function(){
    return gulp.src("*.{jpg,png,gif}")
                .pipe(gulp.dest("../gulp/images"))
                .pipe(connect.reload())
})


// 将json文件放在文件夹下
gulp.task("json",function(){
    return gulp.src("*.json").pipe(gulp.dest("../gulp/json"))
                            .pipe(connect.reload())
})


// 将scss文件放入文件夹下
// 以下模块要先下载   在引入使用
// npm install gulp-sass  sass      sass的插件
// npm install gulp-minify-css      css的压缩插件
// npm install gulp-rename          文件改名的插件

const sass = require("gulp-sass")(require("sass"))
const yasuosass = require("gulp-minify-css")
const gainame = require("gulp-rename")
gulp.task("sass",function(){
    return gulp.src("*.scss")                           //找到要转变的scss文件
                .pipe(sass())                           // 调用sacc()  将scss文件转为css文件
                .pipe(gulp.dest("../gulp/scss-css"))        // 未压缩的的版本放在scss文件夹下
                .pipe(yasuosass())                      // 调用压缩css的方法（插件）
                // .pipe(rename(""))    改名操作
                .pipe(gulp.desk("../gulp/css"))         // 改完名字后将压缩完的css放在css文件夹下
                .pipe(connect.reload())
})



// 处理js文件放在文件夹下
// 需要将js/1.js+2.js整合成一个文件index.min.js文件
// npm install gulp-concat 用来合并所有代码的插件
// npm install gulp-uglify 用来压缩js文件的插件
const concat = require("gulp-concat")
const uglify = require("gulp-uglify")
gulp.task("script",function(){
    return gulp.src("*.js")
                .pipe(concat("index.js"))       //  将js下的所有js文件合并成名为index.js的文件下
                .pipe(gulp.dest("../gulp/js"))       //  将生成的合并文件放在data的js文件夹下
                .pipe(uglify())                     // 进行文件的压缩
                .pipe(rename("index.main.js"))      // 改个名字
                .pipe(gulp.dest("../gulp/rename-js"))         //   改完名字的放在data的js文件夹下
                .pipe(connect.reload())
})



//   处理监听任务
// 当发现文件改动时   相应地也要进行相应的改动
gulp.task("watch",function(){
    /*
        第一个参数为监听的文件路径
        第二个参数是    监听文件的任务名即task名字      使用gulp.series() 方法
    */
    gulp.watch("*.html",gulp.series("html"));
    gulp.watch("*.{jpg,png,gif}",gulp.series("img"));
    gulp.watch("*.json",gulp.series("json"));
    gulp.watch("*.scss",gulp.series("sass"));
    gulp.watch("*.js",gulp.series("script"))
}) 




// 启动一个服务器   将data文件夹中的运行起来
// npm install gulp-connect             热加载   配置一个服务器
const connect1 = require("gulp-connect")
gulp.task("server",function(){
    connect1.server({
        root:"gulp",        // 指明根目录
        port:8080,          // 服务器的端口号
        livereload:true     // 启动实时刷新功能
    })
})



//   串行执行
// gulp.task("start",gulp.series("copy","date","img"),function(done){
//     done();
// })


//   并行执行
gulp.task("start1",gulp.parallel("html","json","img","sass","script"),function(done){
    done();
})

// 创建默认的任务
// 将所有任务串行执行    防止堵塞  所以必须用串行   parallel
gulp.task("default",gulp.parallel("start1","server","watch"))
