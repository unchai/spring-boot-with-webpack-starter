var gulp = require('gulp');
var cleanCss = require('gulp-clean-css');
var debug = require('gulp-debug');
var filter = require('gulp-filter');
var rev = require('gulp-rev');
var revdel = require('gulp-rev-delete-original');
var revReplace = require('gulp-rev-replace');
var uglify = require('gulp-uglify');
var gutil = require('gulp-util');
var webpack = require('webpack');
var webpackConfig = require('./webpack.config');

var basedir = './target/prepare/';

gulp.task('prepare', function () {
	var srcdir = './src/main/webapp/';
	return gulp.src([srcdir + '**/*.js', srcdir + '**/*.css', srcdir + '**/*.jsp', '!' + srcdir + 'static/entries/**/**'])
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
 * Uglify JS + Clean CSS + Revisionize
 *  - https://github.com/terinjokes/gulp-uglify
 *  - https://github.com/scniro/gulp-clean-css
 *  - https://github.com/sindresorhus/gulp-rev
 *  - https://github.com/nib-health-funds/gulp-rev-delete-original
 */
gulp.task('uglify', ['webpack'], function () {
	var JS_FILTER = filter(['**/*.js', '!target/prepare/static/bundle/**/**'], {restore: true});
	var CSS_FILTER = filter(['**/*.css'], {restore: true});

	return gulp.src([basedir + '**/*.js', basedir + '**/*.css', '!' + basedir + 'static/vendor/**/**'])
		.pipe(JS_FILTER)
		.pipe(uglify()) // JS Uglify & minify
		.pipe(debug({title: 'uglify:'}))
		.pipe(JS_FILTER.restore)
		.pipe(CSS_FILTER)
		.pipe(cleanCss({processImport: false})) // CSS Cleaning & minify
		.pipe(debug({title: 'cleanCss:'}))
		.pipe(CSS_FILTER.restore)
		.pipe(rev()) // Revisioning
		.pipe(revdel()) // Delete original file
		.pipe(debug({title: 'revisioning:'}))
		.pipe(gulp.dest(basedir))
		.pipe(rev.manifest()) // Make revisioned file map
		.pipe(gulp.dest(basedir));
});

/**
 * Replace Revisioned JS & CSS filename to JSP src attribute
 *  - https://github.com/jamesknelson/gulp-rev-replace
 */
gulp.task('replace-rev', ['uglify'], function () {
	return gulp.src([basedir + '**/*.jsp', basedir + '**/*.html', basedir + '**/*.htm'])
		.pipe(revReplace({
			manifest: gulp.src(basedir + 'rev-manifest.json'),
			replaceInExtensions: ['.jsp', '.html', '.htm']
		}))
		.pipe(gulp.dest(basedir));
});

gulp.task('default', ['replace-rev']);
