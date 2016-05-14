const gulp = require('gulp');
const eslint = require('gulp-eslint');
const mocha = require('gulp-mocha');
const webpack = require('webpack-stream');
const protractor = require('gulp-protractor').protractor;
const cp = require('child-process');
var children = [];
var serverFiles = ['lib/**/*.js, models/**/*.js, server/**/*.js, test/**/*_test.js,'
  + 'gulpfile.js, index.js'];
var clientFiles = ['app/**/*.js'];
var testFiles = ['test/**/*test.js'];

// lint tasks
gulp.task('lint:server', () => {
  return gulp.src(serverFiles)
  .pipe(eslint())
  .pipe(eslint.format());
});

gulp.task('lint:client', () => {
  return gulp.src(clientFiles)
  .pipe(eslint())
  .pipe(eslint.format());
});

gulp.task('lint', ['lint:server', 'lint:client']);

// build tasks
gulp.task('webpack:dev', ['lint'], () => {
  return gulp.src('app/js/entry.js')
  .pipe(webpack( {
    devtool: 'source-map',
    output: {
      filename: 'bundle.js'
    }
  }))
  .pipe(gulp.dest('./build'));
});

gulp.task('static:dev', () => {
  return gulp.src('app/**/*.html')
  .pipe(gulp.dest('./build'));
});

gulp.task('css:dev', () => {
  return gulp.src('app/css/**/*.css')
  .pipe(gulp.dest('./build'));
});

gulp.task('build', ['webpack:dev', 'static:dev', 'css:dev']);

// test tasks
gulp.task('mocha', () => {
  return gulp.src(testFiles)
  .pipe(mocha());
});
