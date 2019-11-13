const gulp = require('gulp');
const concat = require('gulp-concat');
const minify = require('gulp-minify-css');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const connect = require('gulp-connect');
const babel = require('gulp-babel');
const sass = require('gulp-sass');

gulp.task('copy-html', () => {
    gulp.src('*.html')
        .pipe(gulp.dest('dist'))
        .pipe(connect.reload())
})

gulp.task('copy-css', () => {
    gulp.src('./css/**/*')
        .pipe(concat('main.css'))
        .pipe(gulp.dest('dist/css'))
        .pipe(minify())
        .pipe(rename('main.min.css'))
        .pipe(gulp.dest('dist/css'))
        .pipe(connect.reload())
})

gulp.task('copy-js', () => {
    gulp.src('./js/**/*')
        .pipe(concat('main.js'))
        .pipe(babel())
        .pipe(gulp.dest('dist/js'))
        .pipe(uglify())
        .pipe(rename('main.min.js'))
        .pipe(gulp.dest('dist/js'))

        .pipe(connect.reload())
})

gulp.task('copy-data', () => {
    gulp.src('data/**/*')
        .pipe(gulp.dest('dist/data'))
        .pipe(connect.reload())
})

gulp.task('copy-assets', () => {
    gulp.src('./assets/**/*')
        .pipe(gulp.dest('dist/assets'))
        .pipe(connect.reload())
})

gulp.task('scss2css', () => {
    gulp.src('scss/**/*')
        .pipe(concat('main.scss'))
        .pipe(sass())
        .pipe(gulp.dest('dist/css'))
        .pipe(minify())
        .pipe(rename('main.min.css'))
        .pipe(gulp.dest('dist/css'))
        .pipe(connect.reload())
})

gulp.task('watch', () => {
    gulp.watch('*.html', ['copy-html'])
    gulp.watch('css/**/*', ['copy-css'])
    gulp.watch('js/**/*', ['copy-js'])
    gulp.watch('assets/**/*', ['copy-assets'])
    gulp.watch('data/**/*', ['copy-data'])
    gulp.watch('scss/**/*', ['scss2css'])
})

gulp.task('build', ['copy-html', 'copy-css', 'copy-js', 'copy-assets', 'copy-data', 'scss2css'], () => {
    console.log('success')    
})

gulp.task('server', () => {
    connect.server({
        host: '127.0.0.1',
        port: 8555,
        root: 'dist',
        livereload: true
    })
})

gulp.task('default', ['build','server', 'watch'])