const {src, dest, watch} = require('gulp');
const pug = require('gulp-pug');
const sass = require('gulp-sass')(require('sass'));

function html() {
    return src('src/**/*.pug')
        .pipe(pug())
        .pipe(dest('build'));
}

function styles() {
    // noinspection JSCheckFunctionSignatures
    return src('src/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(dest('build'));
}

exports.html = html;
exports.styles = styles;
exports.watch = function () {
    watch("src/**/*.scss", styles);
}