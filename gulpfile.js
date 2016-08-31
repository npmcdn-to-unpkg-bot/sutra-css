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
var pixrem  = require('pixrem');
var sourcemaps = require('gulp-sourcemaps');
var shell = require('gulp-shell');

gulp.task('css', function() {
  var processors = [
    autoprefixer({browsers: ['last 1 version']}),
    pixrem({unitPrecision: 3})
  ];
  return gulp.src('./src/sutra.scss')
  .pipe(sourcemaps.init())
  .pipe(sass().on('error', sass.logError))
  .pipe(postcss(processors))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest('./dist'))
  .pipe(browserSync.reload({stream: true}));
});

gulp.task('css-docs', function() {
  var processors = [
    autoprefixer({browsers: ['last 1 version']}),
    pixrem({unitPrecision: 3}),
    cssnano()
  ];
  return gulp.src('./app/doc_assets/style.scss')
  .pipe(sourcemaps.init())
  .pipe(sass().on('error', sass.logError))
  .pipe(postcss(processors))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest('./app/docs'))
  .pipe(browserSync.reload({stream: true}));
});

gulp.task('css-min', function() {
  return gulp.src('./dist/sutra.css')
  .pipe(postcss([cssnano()]))
  .pipe(rename(function(path) {
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


gulp.task('hologram', function () {
  return gulp.src('', {read: false})
  .pipe(shell([
    'hologram'
  ]))
});

gulp.task('watch', ['css', 'css-docs', 'hologram'] ,function() {
  gulp.watch('./src/**/*.scss', ['css', 'css-docs', 'hologram']);
  gulp.watch('./**/*.html', ['css', 'css-docs']);
  gulp.watch('./dist/sutra.css', ['css-min'])
  gulp.watch('./app/doc_assets/**/*.scss', ['css-docs', 'hologram'])
});



gulp.task('browser-sync', function() {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });
});
