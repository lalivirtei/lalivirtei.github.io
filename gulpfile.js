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
// const changed = require('gulp-changed');
const sourcemaps = require('gulp-sourcemaps');

function browserSync() {
    bs.init({
        server: {
            baseDir: 'docs',
        },
        notify: false
    });
}

function layout() {
    return src('source/index.pug')
        .pipe(pug())
        .pipe(dest('docs'))
        .pipe(bs.stream())
}

function styles() {
    // noinspection JSCheckFunctionSignatures
    return src('source/main.scss')
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
        .pipe(dest('docs'))
        .pipe(bs.stream())
}

function scripts() {
    return src('source/script.js')
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
        .pipe(dest('docs'))
        .pipe(bs.stream())
}

function images() {
    return src('source/images/*')
        // .pipe(changed('source/images'))
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
        .pipe(dest('docs/images'))
        .pipe(bs.stream());
}

function watcher() {
    watch("source/index.pug", {usePolling: true}, layout).on('change', bs.reload);
    watch("source/main.scss", {usePolling: true}, styles);
    watch("source/script.js", {usePolling: true}, scripts);
    watch("source/images/*", {usePolling: true}, images);
}

function moveAssets() {
    return src('source/favicon/*')
        .pipe(dest('docs'));
}

exports.layout = layout;
exports.styles = styles;
exports.scripts = scripts;
exports.images = images;
exports.build = parallel(layout, styles, scripts, images, moveAssets);

exports.browserSync = browserSync;
exports.watcher = watcher;
exports.default = series(parallel(layout, styles, scripts, images), parallel(browserSync, watcher));