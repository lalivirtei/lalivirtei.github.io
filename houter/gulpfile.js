const {src, dest, watch, parallel, series} = require('gulp');
const pug = require('gulp-pug');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const bs = require('browser-sync').create();
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const concat = require('gulp-concat');
const TerserPlugin = require('terser-webpack-plugin');

function browserSync() {
    bs.init({
        server: {
            baseDir: 'build',
        },
        notify: false
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

function scripts() {
    return src(['src/js/*.js', '!src/js/*.min.js'])
        .pipe(webpackStream({
            mode: 'production',
            performance: {hints: false},
            module: {
                rules: [
                    {
                        test: /\.m?js$/,
                        exclude: /('node_modules')/,
                        use: {
                            loader: 'babel-loader',
                            options: {
                                presets: ['@babel/preset-env'],
                                plugins: ['babel-plugin-root-import']
                            }
                        }
                    }
                ]
            },
            optimization: {
                minimize: true,
                minimizer: [
                    new TerserPlugin({
                        terserOptions: {
                            format: {
                                comments: false
                            }
                        },
                        extractComments: false
                    })
                ]
            }

        }, webpack).on('error', err => this.emit('end')))
        .pipe(concat('scripts.min.js'))
        .pipe(dest('build'))
        .pipe(bs.stream())
}

function watcher() {
    watch("src/**/*.scss", {usePolling: true}, styles);
    watch("src/**/*.pug", {usePolling: true}, layout).on('change', bs.reload);
}

exports.layout = layout;
exports.styles = styles;
exports.scripts = scripts;
exports.build = parallel(layout, styles, scripts);
exports.browserSync = browserSync;
exports.watcher = watcher;
exports.default = series(layout, styles, scripts, parallel(browserSync, watcher));