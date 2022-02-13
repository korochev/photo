const { gulp, src, dest, series, watch } = require('gulp')
const { exec } = require("child_process");

const gulpif = require('gulp-if')
const argv = require('yargs').argv

const del = require('del')
const sourcemaps = require('gulp-sourcemaps')
const ghPages = require('gulp-gh-pages')
const browserSync = require('browser-sync').create()
const merge = require('gulp-merge')
const through = require('through2')
const size = require('gulp-size')


const sass = require('gulp-sass')(require('sass'))
var postcss = require('gulp-postcss')
const postcssPresetEnv = require('postcss-preset-env')
const cleanCSS = require('gulp-clean-css')

const svgSprite = require('gulp-svg-sprite')
const imagemin = require('gulp-imagemin')
const convertToWebp = require('gulp-webp')

const babel = require('gulp-babel')
const notify = require('gulp-notify');
const { exit } = require('process');
const uglify = require('gulp-uglify-es').default;


const clean = () => {
    if (argv.prod) {
        return del('dest/build') 
    }
    else {
        return del('dest/dev')
    }
}

const fonts = () => {
    return src('src/fonts/**')
        .pipe(gulpif(argv.prod, dest('dest/build/fonts'), dest('dest/dev/fonts')))
}

const docs = () => {
    return src('src/*.html')
        .pipe(gulpif(argv.prod, dest('dest/build'), dest('dest/dev')))
        .pipe(browserSync.stream())
}

const styles = () => {
    return src('src/css/**/*.css')
        .pipe(gulpif(!argv.prod, sourcemaps.init()))
        .pipe(sass().on('error', sass.logError))
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
        .pipe(gulpif(!argv.prod, sourcemaps.write()))
        .pipe(gulpif(argv.prod, dest('dest/build/css'), dest('dest/dev/css')))
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
        .pipe(gulpif(argv.prod, dest('dest/build/js'), dest('dest/dev/js')))
        .pipe(browserSync.stream())
}

const svgSprites = () => {
    return src('src/img/svg/**/*.svg')
        .pipe(svgSprite({
            mode: {
                stack: {
                    sprite: '../sprite.svg'
                }
            }
        }))
        .pipe(gulpif(argv.prod, dest('dest/build/img'), dest('dest/dev/img')))
}

const _modifyImageTask = (sources, opti) => {
    
    return src(sources)
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
            .pipe(gulpif(opti, convertToWebp()))
            .pipe(size())
            .pipe(gulpif(argv.prod, dest('dest/build/img'), dest('dest/dev/img'))) 
}

const webp = () => {
    return _modifyImageTask([
        'src/img/**/*.jpg',
        'src/img/**/*.png',
        'src/img/*.svg',
        'src/img/**/*.jpeg',
    ], true)
}

const jpeg = () => {
    return _modifyImageTask(['src/img/**/*@2x.jpg'])
}


const gh = (cb) => {
    return exec('git add -A && git commit -m "upd" && git push origin main', function (err, stdout, stderr) {
        // take appropriate action then
        //console.log(stdout)
        //cb(null)
    });
    
};

const watchFiles = () => {
    browserSync.init({
        server: {
            baseDir: 'dest/dev'
        }
    })

}

if(!argv.prod) {
    watch('src/css/**/*.css', styles)
    watch('src/**/*.html', docs)
    watch('src/img/svg/**/*.svg', svgSprites)
    watch('src/js/**/*.js', scripts)
    watch('src/fonts/**', fonts)
}

const tasks = [clean, fonts, docs, scripts, styles, jpeg, webp, svgSprites]
if(!argv.prod)tasks.push(watchFiles);else tasks.push(gh)

exports.styles = styles
exports.scripts = scripts
exports.save = gh


exports.images = series([jpeg, webp])
exports.default = series(tasks)