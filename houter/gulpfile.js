const {src, dest, watch, parallel, series} = require('gulp');
const pug = require('gulp-pug');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const bs = require('browser-sync').create();

function browserSync() {
    bs.init({
        server: {
            baseDir: 'build',
        },
    });
}

function layout() {
    return src('src/**/*.pug')
        .pipe(pug())
        .pipe(dest('build'))
        .pipe(bs.stream())
}

function styles() {
    // noinspection JSCheckFunctionSignatures
    return src('src/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(dest('build'))
        .pipe(bs.stream())
}

function watcher() {
    watch("src/**/*.scss", {usePolling: true}, styles);
    watch("src/**/*.pug", {usePolling: true}, layout).on('change', bs.reload);
}

exports.layout = layout;
exports.styles = styles;
exports.browserSync = browserSync;
exports.watcher = watcher;
exports.default = series(layout, styles, parallel(browserSync, watcher));