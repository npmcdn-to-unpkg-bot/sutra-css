var gulp = require('gulp');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');
var nested = require('postcss-nested');
var scss = require('postcss-scss');
var rename = require("gulp-rename");
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var csscomb = require('gulp-csscomb');

gulp.task('css', function() {
  var processors = [
    autoprefixer({browsers: ['last 1 version']}),
    nested
  ];
  return gulp.src('./src/sutra.scss')
  .pipe(sass().on('error', sass.logError))
  .pipe(postcss(processors, {syntax: scss}))
  .pipe(gulp.dest('./dist'))
  .pipe(browserSync.reload({stream: true}));
});

gulp.task('css-min', function() {
  return gulp.src('./dist/sutra.css')
  .pipe(postcss([cssnano()]))
  .pipe(rename(function (path) {
    path.dirname += "/";
    path.basename += ".min";
    path.extname = ".css"
  }))
  .pipe(gulp.dest('./dist'))
});

gulp.task('css-comb', function() {
  return gulp.src('src/**/*.scss')
  .pipe(csscomb())
  .pipe(gulp.dest('./src/'));
});

gulp.task('watch', function() {
  gulp.watch('src/**/*.scss', ['css','css-min']).on('change', browserSync.reload);
})


gulp.task('browser-sync', function() {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });
});
