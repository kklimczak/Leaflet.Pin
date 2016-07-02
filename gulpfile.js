var gulp = require('gulp');

var generated = "leaflet/",
    vendor = "vendor/",
    source = 'bower_components/';

gulp.task('copy', function () {

    // Copy leaflet js files

    gulp.src([
        'leaflet-dist/leaflet.js',
        'leaflet-draw/dist/leaflet.draw.js',
        'leaflet-geometry/dist/leaflet.geometryutil.js'
    ], {
        cwd: source
    }).pipe(gulp.dest(generated + 'js/'));

    // Copy vendor js files

    gulp.src([
        'lodash/dist/lodash.min.js'
    ], {
        cwd: source
    }).pipe(gulp.dest(vendor + 'js/'));

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
