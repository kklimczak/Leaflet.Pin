var gulp = require('gulp');

var generated = "leaflet/";

gulp.task('copy', function () {

  // Copy js files

  gulp.src([
        'leaflet-dist/leaflet.js',
        'leaflet-draw/dist/leaflet.draw.js',
        'leaflet-geometry/dist/leaflet.geometryutil.js'
    ], {
        cwd: 'bower_components/'
    }).pipe(gulp.dest(generated + 'js/'));

  // Copy css files

  gulp.src([
        'leaflet-dist/leaflet.css',
        'leaflet-draw/dist/leaflet.draw.css'
    ], {
        cwd: 'bower_components/'
    }).pipe(gulp.dest(generated + 'css/'));

  // Copy images

  gulp.src([
        'leaflet-dist/images/*',
        'leaflet-draw/dist/images/*'
    ], {
        cwd: 'bower_components/'
    }).pipe(gulp.dest(generated + 'css/images/'))
    .pipe(gulp.dest(generated + 'js/images/'));
})
