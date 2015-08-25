const gulp = require('gulp');
const browserify = require('browserify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');
const rename = require('gulp-rename');
const bufferify = require('vinyl-buffer');
const babel = require('gulp-babel');

gulp.task('bundle', function() {
  'use strict';

  const bundler = browserify({
    cache: {},
    packageCache: {},
    entries: ['./example/app.js'],
    debug: true,
  });

  bundler.transform(babelify);
  bundler.on('update', bundle);

  function bundle() {
    return bundler.bundle()
      .pipe(source('./example/app.js'))
      .pipe(bufferify())
      .pipe(rename('bundle.js'))
      .pipe(gulp.dest('./example'));
  }

  bundle();
});

gulp.task('build', function() {
  return gulp.src('./lib/link-ping.js')
    .pipe(babel())
    .pipe(gulp.dest('./dist'));
});

gulp.task('default', ['bundle']);
