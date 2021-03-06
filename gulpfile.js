var gulp = require("gulp");
var plumber = require('gulp-plumber');
var sourcemaps = require('gulp-sourcemaps');
var rename = require('gulp-rename');
var chmod = require('gulp-chmod');

// パス設定（環境によって変更があるので）
var paths = {
    babel : "./src/assets/babel/",
    js : "./dist/assets/js/",
    scss : "./src/assets/scss/",
    css : "./dist/assets/css/",
    ejs : "./src/ejs/"
}


var error = function(err) {
    console.log(err.message);
}


// ejs
var ejs = require('gulp-ejs');
gulp.task("ejs", function() {
    gulp.src(
        [paths.ejs + "**/*.ejs", '!' + paths.ejs + "**/_*.ejs"]
    )
    .pipe(plumber())
    .pipe(ejs())
    .pipe(ejs({}, {}, {"ext": ".html"}))
    .pipe(gulp.dest("./dist"))
    .pipe(browserSync.stream());
});



// プラグインの読み込み
var sass = require("gulp-sass");
var rsass      = require('gulp-ruby-sass');
var pleeease = require('gulp-pleeease');
var clean = require('gulp-clean-css');
var sassGlob = require("gulp-sass-glob"); //重くなるならいらない

// Sassコンパイルタスクの定義
gulp.task("scss", function() {
  return gulp.src(paths.scss + '**/*.scss')
    .pipe(plumber({errorHandler: error}))

//    .pipe(pleeease({sass: true}))
//    .pipe(rename({extname: '.css'}))

    .pipe(sassGlob()) // Sassの@importにおけるglobを有効にする
    .pipe(sass().on('error', sass.logError))

    .pipe(pleeease({ //最終的に対象バージョンに合わせて出力
        autoprefixer: {"browsers": ["last 4 versions", "ios 6"]},
        minifier: true,
        mqpacker: true
    }))

    //.pipe(sourcemaps.init())
    // .pipe(sourcemaps.write())
    .pipe(chmod(755))
    .pipe(gulp.dest(paths.css))
    .pipe(browserSync.stream());
});



// JS
var babelify = require('babelify');
var watchify = require('gulp-watchify');
var streamify = require('gulp-streamify')
var uglify = require('gulp-uglify');
var esdoc = require("gulp-esdoc");

gulp.task('js', watchify(function(watchify) {
    return gulp.src(paths.babel + '*.js')
    .pipe(plumber({errorHandler: error}))
    .pipe(sourcemaps.init())
    .pipe(watchify({
        watch: true,
        setup: function(bundle) {
            bundle.transform(babelify, {presets: "es2015"})
        }
    }))
    .pipe(streamify(uglify()))
    .pipe(streamify(sourcemaps.write()))
    .pipe(chmod(755))
    .pipe(gulp.dest(paths.js))
}))


// Static Server + watching scss/html files
var browserSync = require('browser-sync').create();
gulp.task('server', function() {
    browserSync.init({
        server: {
            baseDir: "./dist",
            startPath: './dist/index.html'
        }
    });
});

// COMMON
gulp.task('watch', function(){
    gulp.watch(paths.scss + '**/*.scss', ['scss']);
    gulp.watch(paths.ejs + '**/*.ejs', ['ejs']);
    gulp.watch('.dist/**/*.html').on('change', function() {
      browserSync.reload()
    });
});

gulp.task('default', ['js', 'watch', 'server']);
// gulp.task('default', ['js', 'watch', 'server']);