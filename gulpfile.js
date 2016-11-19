var gulp = require('gulp');
var concat = require('gulp-concat');
var transform = require('vinyl-transform');
var browserify = require('browserify');
var reactify = require('reactify');
var source = require("vinyl-source-stream");
var watchify = require('watchify');

function handleError () {
  var args = Array.prototype.slice.call(arguments);
  console.log('errors: ', args);
  this.emit('end');
}

function browserifyShare (watch) {
  var b = browserify('./src/js/main.js', {
    cache: {},
    packageCache: {},
    fullPaths: true
  }).transform(reactify);

  if (watch) {
    b = watchify(b);
    b.on('update', function(){
      bundleShare(b);
    });
  }

  // Our source file is here!!! ugh
  // b.add('./src/js/main.js');
  bundleShare(b);
}

function bundleShare (b) {
  b.bundle()
    .on('error', handleError)
    .pipe(source('main.js'))
    .pipe(gulp.dest('dist/js/'))
}

gulp.task('browserify', function () {
  browserifyShare(false);
});

gulp.task('watchify', function(){
  browserifyShare(true);
});

gulp.task('copy', function () {
  return gulp.src('src/index.html')
    .pipe(gulp.dest('dist/'));
});

gulp.task('default', ['browserify', 'copy']);

gulp.task('watch', ['watchify'], function () {
  return gulp.watch('src/**/*', ['copy']);
});


