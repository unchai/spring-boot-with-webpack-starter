var gulp = require('gulp');
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var rev = require('gulp-rev');
var revReplace = require('gulp-rev-replace');
var filter = require('gulp-filter');
var cleanCss = require('gulp-clean-css');
var sourcemaps = require('gulp-sourcemaps');
var gulpif = require('gulp-if');
var revdel = require('gulp-rev-delete-original');
var debug = require('gulp-debug');
var babel = require('gulp-babel');
var yargs = require('yargs');
var del = require('del');

var basedir = './target/prepare/';
var withSourcemaps = yargs.argv['with-sourcemaps'];

if (withSourcemaps) {
	console.log('Making sourcemaps files...');
}

gulp.task('prepare', function () {
	var srcdir = './src/main/webapp/';
	return gulp.src([srcdir + '**/*.js', srcdir + '**/*.css', srcdir + '**/*.jsp'])
		.pipe(gulp.dest(basedir));
});

/**
 * JS Babel
 *  - https://github.com/babel/gulp-babel
 */
gulp.task('babel', ['prepare'], function () {
	return gulp.src([basedir + '**/*.js', '!' + basedir + 'static/bower_components/**/**'])
		.pipe(babel({presets: ['es2015']}))
		.pipe(gulp.dest(basedir));
});

/**
 * JS & CSS Aggregate
 *  - https://github.com/jonkemp/gulp-useref
 */
gulp.task('useref', ['babel'], function () {
	return gulp.src(basedir + '**/*.jsp')
		.pipe(useref({searchPath: basedir}))
		.pipe(gulp.dest(basedir));
});

/**
 * Uglify JS + Clean CSS + Revisionize
 *  - https://github.com/terinjokes/gulp-uglify
 *  - https://github.com/scniro/gulp-clean-css
 *  - https://github.com/sindresorhus/gulp-rev
 *  - https://github.com/nib-health-funds/gulp-rev-delete-original
 */
gulp.task('uglify', ['useref'], function () {
	var JS_FILTER = filter(['**/*.js'], {restore: true});
	var CSS_FILTER = filter(['**/*.css'], {restore: true});

	return gulp.src([basedir + '**/*.js', basedir + '**/*.css', '!' + basedir + 'static/bower_components/**/**'])
		.pipe(sourcemaps.init({loadMaps: true}))
		.pipe(JS_FILTER)
		.pipe(uglify()) // JS Uglify & minify
		.pipe(JS_FILTER.restore)
		.pipe(CSS_FILTER)
		.pipe(cleanCss({processImport: false})) // CSS Cleaning & minify
		.pipe(CSS_FILTER.restore)
		.pipe(rev()) // Revisioning
		.pipe(revdel()) // Delete original file
		.pipe(gulpif(withSourcemaps, sourcemaps.write('.')))
		.pipe(debug({title: 'minify:'}))
		.pipe(gulp.dest(basedir))
		.pipe(rev.manifest()) // Make revisioned file map
		.pipe(gulp.dest(basedir));
});

/**
 * Replace Revisioned JS & CSS filename to JSP src attribute
 *  - https://github.com/jamesknelson/gulp-rev-replace
 */
gulp.task('replace-rev', ['uglify'], function () {
	return gulp.src(basedir + '**/*.jsp')
		.pipe(revReplace({
			manifest: gulp.src(basedir + 'rev-manifest.json'),
			replaceInExtensions: ['.jsp']
		}))
		.pipe(gulp.dest(basedir));
});

gulp.task('clean', ['replace-rev'], function () {
	del([basedir + 'static/bower_components']);
});

gulp.task('default', ['clean']);