var gulp = require('gulp');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');

gulp.task('css', function () {
  var processors = [
    autoprefixer({browsers: ['last 1 version']}),
    cssnano(),
  ];
  return gulp.src('./src/*.css')
  .pipe(postcss(processors))
  .pipe(gulp.dest('./dist'));
});
