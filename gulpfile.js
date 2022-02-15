const { gulp, src, dest, series, watch } = require('gulp')
const { exec } = require("child_process");

const gulpif = require('gulp-if')
const argv = require('yargs').argv

const del = require('del')
const sourcemaps = require('gulp-sourcemaps')
const ghPages = require('gulp-gh-pages')
const browserSync = require('browser-sync').create()
const through = require('through2')
const size = require('gulp-size')
var shell = require('shelljs');

const inline = require('gulp-inline')
const formatHtml = require('gulp-format-html')

const sass = require('gulp-sass')(require('sass'))
var postcss = require('gulp-postcss')
const postcssPresetEnv = require('postcss-preset-env')
const cleanCSS = require('gulp-clean-css')

const imagemin = require('gulp-imagemin')
const convertToWebp = require('gulp-webp')

const babel = require('gulp-babel')
const notify = require('gulp-notify')
const { exit } = require('process')
const { write } = require('fs')
const uglify = require('gulp-uglify-es').default


const clean = () => {
    if (argv.prod) {
        return del('dest/build') 
    }
    else {
        return del('dest/dev')
    }
}

const resources = () => {
    return src('src/resources/**')
        .pipe(gulpif(argv.prod, dest('dest/build/resources'), dest('dest/dev/resources')))
}

const docs = () => {
    return src('src/*.html')
        .pipe(inline({
            base: 'src/',
            disabledTypes: ['js', 'css'] 
        }))
        .pipe(formatHtml())
        .pipe(gulpif(argv.prod, dest('dest/build'), dest('dest/dev')))
        .pipe(browserSync.stream())
}

const styles = () => {
    return src('src/css/**/*.scss')
        .pipe(gulpif(!argv.prod, sourcemaps.init()))
        .pipe(sass().on('error', sass.logError))
        .pipe(gulpif(!argv.prod, sourcemaps.write()))
         .pipe(postcss([
            postcssPresetEnv({})
          ]))
        /*
        ==Условие gulpif prod==
        .pipe(cleanCSS({
            level:2
        })) */
        .pipe(gulpif(argv.prod, cleanCSS({
            level:2
        })))
        .pipe(gulpif(argv.prod, dest('dest/build'), dest('dest/dev')))
        .pipe(browserSync.stream())
}

const scripts = () => {
    return src([ 
            'src/js/*.js'
         ])
        .pipe(gulpif(!argv.prod, sourcemaps.init()))
        .pipe(gulpif(argv.prod, babel()))
        .pipe(gulpif(argv.prod, uglify({toplevel: true}).on('error', notify.onError())))
        .pipe(gulpif(!argv.prod, sourcemaps.write()))
        .pipe(gulpif(argv.prod, dest('dest/build'), dest('dest/dev')))
        .pipe(browserSync.stream())
}

const _modifyImageTask = (webp) => {
    
    return src([
                'src/img/**/*.jpg',
                'src/img/**/*.png',
                'src/img/*.svg',
                'src/img/**/*.jpeg',
            ])
            .pipe(imagemin([
                imagemin.gifsicle({interlaced: true}) ,
                imagemin.mozjpeg({quality: 75, progressive: true}),
                imagemin.optipng({optimizationLevel: 5}),
                imagemin.svgo({
                    plugins: [
                        {removeViewBox: true},
                        {cleanupIDs: false}
                    ]
                })
            ]))
            .pipe(gulpif(webp, convertToWebp()))
            .pipe(size())
            .pipe(gulpif(argv.prod, 
                gulpif(webp,dest('dest/build/img/webp'),dest('dest/build/img/jpeg')), 
                gulpif(webp,dest('dest/dev/img/webp'),dest('dest/dev/img/jpeg'))
            )) 
}

const webp = () => {
    return _modifyImageTask(true)
}

const jpeg = () => {
    return _modifyImageTask()
}


const gh = () => {
    return src('dest/build/**/*') 
        .pipe(through.obj(
            console.log('###Update for main branch###'),
            shell.exec('git add -A && git commit -m "upd" && git push origin main'),
            console.log('###Update for gh-pages branch###')
        ))
        .pipe(ghPages())
};

const watchFiles = () => {
    browserSync.init({
        server: {
            baseDir: 'dest/dev'
        }
    })

}

if(!argv.prod) {
    watch('src/css/**/*.scss', styles)
    watch('src/**/*.html', docs)
    watch('src/js/**/*.js', scripts)
    watch('src/resources/**', resources)
}

const tasks = [clean, resources, docs, scripts, styles, jpeg, webp]
if(!argv.prod)tasks.push(watchFiles);else tasks.push(gh)

exports.styles = styles
exports.scripts = scripts
exports.save = gh


exports.images = series([jpeg, webp])
exports.default = series(tasks)