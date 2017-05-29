var gulp = require('gulp');
var gutil = require('gulp-util');
var revReplace = require('gulp-rev-replace');
var webpack = require('webpack');
var webpackConfig = require('./webpack.config');

var basedir = './target/prepare/';

gulp.task('prepare', function () {
  var srcdir = './src/main/webapp/';
  return gulp.src([srcdir + '**/*.js', srcdir + '**/*.css', srcdir + '**/*.jsp', srcdir + '**/*.html', srcdir + '**/*.htm', '!' + srcdir + 'static/entries/**/**'])
    .pipe(gulp.dest(basedir));
});

gulp.task('webpack', ['prepare'], function (callback) {
  webpack(webpackConfig, function (err, stats) {
    if (err) throw new gutil.PluginError('webpack', err);
    gutil.log('[webpack]', stats.toString());
    callback();
  });
});

/**
 * Replace Revisioned JS & CSS filename to JSP src attribute
 *  - https://github.com/jamesknelson/gulp-rev-replace
 */
gulp.task('replace-rev', ['webpack'], function () {
  return gulp.src([basedir + '**/*.jsp', basedir + '**/*.html', basedir + '**/*.htm'])
    .pipe(revReplace({
      manifest: gulp.src(basedir + 'static/bundle/rev-manifest.json'),
      replaceInExtensions: ['.jsp', '.html', '.htm']
    }))
    .pipe(gulp.dest(basedir));
});

gulp.task('default', ['replace-rev']);
