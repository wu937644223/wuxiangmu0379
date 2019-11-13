# 1、安装淘宝镜像

npm install cnpm -g --registry=https://registry.npm.taobao.org

cnpm -v

# 2、生成项目描述文件 package.json

npm init  
cnpm init (可代替 npm init)

（需要项目名称、版本号、描述、入口文件、运行命令、作者、证书 ---- 一路按回车即可）

# 3、全局安装gulp

cnpm i gulp@3 -g

**全局安装gulp**

**@3 代表选择了 3 的版本**

**i 即为 install**

**-g 即为 --global**

gulp -v

# 4、当前目录内部安装 gulp 模块

cnpm i gulp@3 -D

cnpm i gulp@3 -S （二者选择其一即可）

**-D  缩写  --save-dev 开发依赖**

**-S 缩写 --save 项目依赖**

开发依赖： 开发过程中需要使用到的依赖的模块，项目上线时不需要的模块 --- 代码格式校验的模块

项目依赖： 项目上线仍然需要使用的模块

----- 如果不知道怎么选择，那你就写 -S

# 5、创建文件 gulpfile.js ,配置gulp

```
const gulp = require('gulp');
```

## 5.1 创建 index.html，使用gulp完成对于index.html的复制操作，复制到当前目录的dist目录内

```
+++
// 复制index.html 到 dist 目录
gulp.task('copy-index', function () {
    gulp.src('./index.html')
        .pipe(gulp.dest('dist'))
})
```

命令行执行了  gulp copy-index 发现多了 dist目录

## 5.2 gulp/css/a.css + gulp/css/b.css

### 5.2.1 复制 gulp/css 至 dist/css

gulp.src('./css/**/*') 

拷贝css文件夹下的所有文件以及文件夹内的文件
```
+++
gulp.task('copy-css', function () {
    gulp.src('./css/**/*')
        .pipe(gulp.dest('dist/css'))
})
```
gulp copy-css

### 5.2.2 合并css文件

cnpm i gulp-concat -S

```
//++++
const concat = require('gulp-concat');
gulp.task('copy-css', function () {
    gulp.src('./css/**/*') // 拿到所有的css
        // ++++
        .pipe(concat('main.css')) // 合并
        .pipe(gulp.dest('dist/css'))
})
```

### 5.2.3 压缩css

cnpm i gulp-minify-css -S

```
// ++++
const minifyCss = require('gulp-minify-css');
gulp.task('copy-css', function () {
    gulp.src('./css/**/*') // 拿到所有的css
        .pipe(concat('main.css')) // 合并
        // ++++
        .pipe(minifyCss()) // 压缩
        .pipe(gulp.dest('dist/css'))
})
```

### 5.2.4 既要 未压缩的也要有压缩的

cnpm i gulp-rename -S

重命名

合并代码放到dist/css

压缩css 重命名 再放到dist/css

```
//+++
const rename = require('gulp-rename');
gulp.task('copy-css', function () {
    gulp.src('./css/**/*') // 拿到所有的css
        .pipe(concat('main.css')) // 合并
        //+++
        .pipe(gulp.dest('dist/css'))
        .pipe(minifyCss()) // 压缩
        //+++
        .pipe(rename('main.min.css'))
        .pipe(gulp.dest('dist/css'))
})
```
## 5.3 gulp/js/a.js + gulp/js/b.js

### 5.3.1 复制gulp/js 至 dist/js

```
gulp.task('copy-js', () => {
    gulp.src('./js/**/*')
        .pipe(gulp.dest('dist/js'))
})
```

### 5.3.2 合并js代码至 dist/js

```
gulp.task('copy-js', () => {
    gulp.src('./js/**/*')
        // +++
        .pipe(concat('main.js'))
        .pipe(gulp.dest('dist/js'))
})
```

### 5.3.3 压缩js

cnpm i gulp-uglify -S

压缩js模块

```
//+++
const uglify = require('gulp-uglify');

gulp.task('copy-js', () => {
    gulp.src('./js/**/*')
        .pipe(concat('main.js')) // 合并js
        // +++
        .pipe(uglify()) // 压缩js
        .pipe(gulp.dest('dist/js'))
})
```

### 5.3.4 合并压缩重命名

```
gulp.task('copy-js', () => {
    gulp.src('./js/**/*')
        .pipe(concat('main.js')) // 合并js
        // +++
        .pipe(gulp.dest('dist/js'))
        .pipe(uglify()) // 压缩js
        // +++
        .pipe(rename('main.min.js'))
        .pipe(gulp.dest('dist/js'))
})
```

## 5.4 gulp/assets  --- 图片

### 5.4.1 复制图片至 dist/assets

```
//+++
gulp.task('copy-images', () => {
    gulp.src('./assets/**/*')
        .pipe(gulp.dest('dist/assets'))
})
```

### 5.4.2 压缩图片

cnpm i gulp-imagemin -S

```
//+++ 
const imagemin = require('gulp-imagemin');
gulp.task('copy-images', () => {
    gulp.src('./assets/**/*')
        // +++
        .pipe(imagemin()) // 压缩图片
        .pipe(gulp.dest('dist/assets'))
})
```

## 5.5 处理数据 data/home.json data/kind.json

没有后端接口时，自己的模拟数据

复制

```
// +++
gulp.task('copy-data', () => {
    gulp.src('./data/**/*')
        .pipe(gulp.dest('dist/data'))
})
```

# 6、一次性执行多个任务

任务的名称不要自己随意定义，就写build

```
// +++
gulp.task('build', ['copy-index', 'copy-css', 'copy-js', 'copy-images', 'copy-data'], () => {
    console.log('success')
})
```
# 7、gulp 服务器

cnpm i gulp-connect -S

server 任务名不能更改

```
//+++
gulp.task('server', () => {
    connect.server({
        // 说明服务器的根目录
        root: 'dist',
        livereload: true // 实时更新
    })
})

```

# 8、检测html文件、css文件、js文件、图片、数据的改变，执行不同的任务

```
// +++
gulp.task('watch', () => {
    gulp.watch('index.html', ['copy-index'])
    gulp.watch('css/**/*', ['copy-css'])
    gulp.watch('js/**/*', ['copy-js'])
    gulp.watch('assets/**/*', ['copy-images'])
    gulp.watch('data/**/*', ['copy-data'])
})
```

# 9、同时默认执行 server 任务 和 watch 任务

```
gulp.task('default', ['server', 'watch'])
```

 gulp

 # 10、热更新  --- 主动更新页面

 在页面、css、js、图片、数据相关任务最后执行一句话，重新启动服务器

 ```
gulp.task('copy-data', () => {
    gulp.src('./data/**/*')
        .pipe(gulp.dest('dist/data'))
        .pipe(connect.reload()) //*********************************************
})
 ```


es5  es6转换代码

 cnpm i gulp@3 gulp-concat gulp-minify-css gulp-uglify gulp-sass gulp-rename gulp-connect gulp-imagemin -S

 cnpm i babel-core gulp-babel@7 babel-preset-env -D