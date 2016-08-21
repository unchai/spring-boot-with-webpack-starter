var gulp = require('gulp');
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var rev = require('gulp-rev');
var revReplace = require('gulp-rev-replace');
var filter = require('gulp-filter');
var cleanCss = require('gulp-clean-css');
var sourcemaps = require('gulp-sourcemaps');
var jshint = require('gulp-jshint');
var gulpif = require('gulp-if');
var lazypipe = require('lazypipe');

var argv = require('yargs').argv;

// User-made Javascript file filter. (exclude aggregated & vendor-provided file)
var userMadeJsFileFilter = filter(['**/*.js', '!target/deploy/static/aggregate/**/*.js', '!target/deploy/static/vendor/**/*.js'], {restore: true});
var baseDir = './target/deploy/';
var withSourcemaps = argv['with-sourcemaps'];

if (withSourcemaps) {
	console.log('Making sourcemaps files...');
}

gulp.task('jshint', function () {
	return gulp.src(baseDir + '**/*.js')
		.pipe(userMadeJsFileFilter)
		.pipe(jshint())
		.pipe(userMadeJsFileFilter.restore)
		.pipe(jshint.reporter('default'));
});

/**
 * JS&CSS Aggregate + Uglify + Revisionize + Replace JSP src attribute
 */
gulp.task('useref', function () {
	return gulp.src(baseDir + '**/*.jsp')
		.pipe(useref({searchPath: './src/main/webapp'}, lazypipe().pipe(sourcemaps.init, {loadMaps: true})))
		.pipe(gulpif('*.js', (lazypipe().pipe(uglify).pipe(rev))()))
		.pipe(gulpif('*.css', (lazypipe().pipe(cleanCss, {processImport: false}).pipe(rev))()))
		.pipe(revReplace({replaceInExtensions: ['.jsp']}))
		.pipe(gulpif(withSourcemaps, sourcemaps.write('.')))
		.pipe(gulp.dest(baseDir));
});

/**
 * Uglify + Revisionize
 */
gulp.task('uglify-rev:js', function () {
	return gulp.src(baseDir + '**/*.js')
		.pipe(userMadeJsFileFilter)
		.pipe(sourcemaps.init({loadMaps: true}))
		.pipe(uglify())
		.pipe(rev())
		.pipe(gulpif(withSourcemaps, sourcemaps.write('.')))
		.pipe(userMadeJsFileFilter.restore)
		.pipe(gulp.dest(baseDir))
		.pipe(rev.manifest())
		.pipe(gulp.dest(baseDir));
});

gulp.task('revrepl:js', ['uglify-rev:js', 'useref'], function () {
	return gulp.src(baseDir + '**/*.jsp')
		.pipe(revReplace({
			manifest: gulp.src(baseDir + 'rev-manifest.json'),
			replaceInExtensions: ['.jsp']
		}))
		.pipe(gulp.dest(baseDir));
});

gulp.task('default', ['jshint', 'useref', 'revrepl:js']);
