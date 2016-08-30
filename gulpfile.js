var gulp = require('gulp');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');
var nested = require('postcss-nested');
var scss = require('postcss-scss');
var cssimport = require("gulp-cssimport");
var rename = require("gulp-rename")

gulp.task('css', function() {
  var processors = [
    autoprefixer({browsers: ['last 1 version']}),
    nested
  ];
  return gulp.src('./src/sutra.css')
  .pipe(cssimport())
  .pipe(postcss(processors, {syntax: scss}))
  .pipe(gulp.dest('./dist'));
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
})