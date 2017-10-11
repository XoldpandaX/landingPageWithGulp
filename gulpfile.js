const
    gulp         = require('gulp'),
    sass         = require('gulp-sass'),
    browserSync  = require('browser-sync'),
    concat       = require('gulp-concat'),
    uglify       = require('gulp-uglifyjs'),
    del          = require('del'),
    imagemin     = require('gulp-imagemin'),
    pngquant     = require('imagemin-pngquant'),
    cache        = require('gulp-cache'),
    autoprefixer = require('gulp-autoprefixer');

gulp.task('sass', function() {
    return gulp.src('src/sass/**/*.scss')
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(autoprefixer(['last 15 versions', '> 1%']))
        .pipe(gulp.dest('src/css'))
        .pipe(browserSync.reload({stream: true}))
});

gulp.task('compressLibs', function() {
    return gulp.src('src/libs/jQuery/jquery-3.2.1.min.js')
        .pipe(concat('allLibs.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('src/js/allJs'));
});

gulp.task('compressUserScripts', function() {
    return gulp.src('src/js/*.js')
        .pipe(concat('allUsercScripts.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('src/js/allJs'));
});

gulp.task('browser-sync', function() {
    browserSync({
        server : {
            baseDir: 'src'
        },
        notify: false
    })
});

gulp.task('clean', function() { return del.sync('dist'); });

gulp.task('clear', function() { return cache.clearAll(); });

gulp.task('img', function() {
    return gulp.src('src/img/**/*')
        .pipe(cache(imagemin({
            interlaced: true,
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]

        })))
        .pipe(gulp.dest('dist/img'));
});

gulp.task('watch', ['browser-sync', 'sass', 'compressLibs', 'compressUserScripts'], function() {
    gulp.watch('src/sass/**/*.scss', ['sass']);
    gulp.watch('src/*.html', browserSync.reload);
    gulp.watch('src/js/**/*.js', browserSync.reload);
});

gulp.task('build', ['clean' , 'img', 'sass', 'compressLibs', 'compressUserScripts'], function() {
    var buildCss = gulp.src('src/css/main.css')
        .pipe(gulp.dest('dist/css'));

    var buildFonts = gulp.src('src/fonts/**/*')
        .pipe(gulp.dest('dist/fonts'));

    var buildJs = gulp.src('src/js/allJs/**/*')
        .pipe(gulp.dest('dist/js/allJs'));

    var buildHTML = gulp.src('src/*.html')
        .pipe(gulp.dest('dist'));
});