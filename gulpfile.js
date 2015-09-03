var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');
var ts = require('gulp-typescript');
var babeljs = require('gulp-babel');
var annotate = require('gulp-ng-annotate');
var es = require('event-stream');
var Builder = require('systemjs-builder');

var paths = {
  sass: ['./scss/**/*.scss']
};

gulp.task('default', ['sass', 'bundle']);

gulp.task('compile', function(done) {
  var typescripts = gulp.src('src/**/*.ts')
    .pipe(ts({
      target: 'ES6'
    }));
  var es6scripts = gulp.src('src/**/*.js');
  
  return es.merge(typescripts.js, es6scripts)
    .pipe(babeljs({
      modules: "system"
    }))
    .pipe(annotate())
    .pipe(gulp.dest('build'));
});

gulp.task('bundle', ['compile'], function(done) {
    var builder = new Builder({
      baseURL: 'build',
      defaultJSExtensions: true
    });
    
    builder
      .build('main.js', 'www/js/bundle.js', {
//        minify: true,
//        sourceMaps: true
      })
      .then(function() {
        done();
      })
      .catch(function(err) {
        console.error('Build error:', err);
      });
});

gulp.task('sass', function(done) {
  gulp.src('./scss/ionic.app.scss')
    .pipe(sass({
      errLogToConsole: true
    }))
    .pipe(gulp.dest('./www/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});

gulp.task('watch', function() {
  gulp.watch(paths.sass, ['sass']);
});

gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});
