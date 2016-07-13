var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    minifycss = require('gulp-clean-css'),
    rename = require('gulp-rename');

var generated = "assets/leaflet/",
    vendor = "assets/vendor/",
    source = 'bower_components/';

gulp.task('makeDist', function () {

    gulp.src('src/leaflet.pin.js')
        .pipe(uglify())
        .pipe(rename('leaflet.pin.min.js'))
        .pipe(gulp.dest('dist/'));

    gulp.src('src/leaflet.pin.css')
        .pipe(minifycss())
        .pipe(rename('leaflet.pin.min.css'))
        .pipe(gulp.dest('dist/'));

    gulp.src([
        'src/**/*'
    ]).pipe(gulp.dest('dist/'));

});

gulp.task('copyAssets', function () {
    // Copy leaflet js files

    gulp.src([
        'leaflet-dist/leaflet.js',
        'leaflet-draw/dist/leaflet.draw.js',
        'leaflet-geometry/dist/leaflet.geometryutil.js'
    ], {
        cwd: source
    }).pipe(gulp.dest(generated + 'js/'));

    // Copy css files

    gulp.src([
        'leaflet-dist/leaflet.css',
        'leaflet-draw/dist/leaflet.draw.css'
    ], {
        cwd: source
    }).pipe(gulp.dest(generated + 'css/'));

    // Copy images

    gulp.src([
        'leaflet-dist/images/*',
        'leaflet-draw/dist/images/*'
    ], {
        cwd: source
    }).pipe(gulp.dest(generated + 'css/images/'))
        .pipe(gulp.dest(generated + 'js/images/'));
});
