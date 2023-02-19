const {src, dest, watch, parallel, series} = require('gulp');
const pug = require('gulp-pug');
const sass = require('gulp-sass')(require('sass'));
const postCSS = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const bs = require('browser-sync').create();
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const concat = require('gulp-concat');
const TerserPlugin = require('terser-webpack-plugin');
const imagemin = require('gulp-imagemin');
const changed = require('gulp-changed');
const sourcemaps = require('gulp-sourcemaps');

function browserSync() {
    bs.init({
        server: {
            baseDir: '../',
        },
        notify: false
    });
}

function layout() {
    return src(['index.pug'])
        .pipe(pug())
        .pipe(dest('../'))
        .pipe(bs.stream())
}

function styles() {
    // noinspection JSCheckFunctionSignatures
    return src('main.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(postCSS([
            autoprefixer({grid: 'autoplace'}),
            cssnano({
                preset: [
                    'default',
                    {
                        discardComments: {removeAll: true}
                    }
                ]
            })
        ]))
        .pipe(sourcemaps.write())
        .pipe(dest('../build'))
        .pipe(bs.stream())
}

function scripts() {
    return src('script.js')
        .pipe(sourcemaps.init())
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

        }, webpack).on('error', () => this.emit('end')))
        .pipe(concat('script.min.js'))
        .pipe(sourcemaps.write())
        .pipe(dest('../build'))
        .pipe(bs.stream())
}

function images() {
    return src('images/*')
        .pipe(changed('../build/images'))
        .pipe(imagemin([
            imagemin.svgo({
                // plugins disabled to prevent svgo from empty svg sprite
                plugins: [
                    {
                        cleanupIDs: false,
                        removeUselessDefs: false
                    }
                ]
            })
        ]))
        .pipe(dest('../build/images'))
        .pipe(bs.stream());
}

function watcher() {
    watch("blocks/**/*.scss", {usePolling: true}, styles);
    watch("main.scss", {usePolling: true}, styles);
    watch("script.js", {usePolling: true}, scripts);
    watch("img/*", {usePolling: true}, images);
    watch("blocks/**/*.pug", {usePolling: true}, layout).on('change', bs.reload);
    watch("index.pug", {usePolling: true}, layout).on('change', bs.reload);
}

exports.layout = layout;
exports.styles = styles;
exports.scripts = scripts;
exports.images = images;
exports.build = parallel(layout, styles, scripts, images);

exports.browserSync = browserSync;
exports.watcher = watcher;
exports.default = series(parallel(layout, styles, scripts, images), parallel(browserSync, watcher));