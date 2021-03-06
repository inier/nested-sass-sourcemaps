var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var prefix = require('gulp-autoprefixer');
// POST CSS
var postcss = require('gulp-postcss');
var cssnext = require('postcss-cssnext');

var paths = {
    styles: {
        src: 'src/scss',
        files: 'src/scss/**/*.scss',
        dest: 'dist/css'
    }
}

gulp.task('prefix', function (){
    return gulp.src(paths.styles.files)
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(prefix())
        .pipe(sourcemaps.write('.', {
            includeContent: false,
            sourceRoot: '../../../src/scss'
        }))
        .pipe(gulp.dest(paths.styles.dest + '/prefix'));
});

gulp.task('noPrefix', function (){
    return gulp.src(paths.styles.files)
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(sourcemaps.write('.', {
            includeContent: false,
            sourceRoot: '../../../src/scss'
        }))
        .pipe(gulp.dest(paths.styles.dest + '/noPrefix'));
});

gulp.task('workAround', function (){
    return gulp.src(paths.styles.files)
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(sourcemaps.write({
            includeContent: false
        }))
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(prefix())
        .pipe(sourcemaps.write('.', {
            includeContent: false,
            destPath: paths.styles.dest + '/workAround'
        }))
        .pipe(gulp.dest(paths.styles.dest + '/workAround'));
});

gulp.task('postCSS', function (){
    var processors = [
        cssnext()
    ];

    return gulp.src(paths.styles.files)
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(postcss(processors))
        .pipe(sourcemaps.write('.', {
            includeContent: false,
            sourceRoot: '../../../src/scss'
        }))
        .pipe(gulp.dest(paths.styles.dest + '/postCSS'));
});

gulp.task('default', ['noPrefix', 'prefix', 'workAround', 'postCSS']);