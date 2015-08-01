var gulp = require('gulp'),
	less = require('gulp-less'),
	sourcemaps = require('gulp-sourcemaps'),
	watch = require('gulp-watch'),
	browserSync = require('browser-sync'),
	minifyCSS = require('gulp-minify-css'),
	mainBowerFiles = require('main-bower-files'),
	bowerFiles = mainBowerFiles(),
	uglify = require('gulp-uglify'),
	concat = require('gulp-concat'),
	autoprefixer = require('gulp-autoprefixer'),
	handlebars = require('gulp-compile-handlebars'),
	rename = require('gulp-rename'),
	plumber = require('gulp-plumber'),
	notify = require('gulp-notify'),
	templateData = require('./app/data/data.json'),
	sprity = require('sprity'),
	gulpif = require('gulp-if');

console.info('********** Bower Files **********');
console.info(bowerFiles);

/******************************
 * Default task
 ******************************/
gulp.task('default', [
	'copyAssets',
	'browser-sync',
	'handlebars',
	'jsConcat',
	'pluginsConcat',
	'sprites',
	'less',
	'watch'
]);

/******************************
 * Build task
 ******************************/
gulp.task('build', [
	'copyAssets',
	'handlebars',
	'pluginsConcat',
	'jsConcat',
	'less-min'
]);

/******************************
 * Sprite task
 ******************************/
gulp.task('sprites', function () {
	return sprity.src({
			src: './assets/img/icons/*.{png, jpg}',
			style: './icons.less',
			cssPath: '../img',
			orientation: 'binary-tree',
			template: './app/less/sprity-template.handlebars'
				// ... other optional options
				// for example if you want to generate scss instead of css
				//processor: 'sass', // make sure you have installed sprity-sass
		})
		.pipe(gulpif(
			'*.png',
			gulp.dest('./public/img/'),
			gulp.dest('./app/less/')));
});

/******************************
 * Copy assets to public
 ******************************/
gulp.task('copyAssets', function () {
	'use strict';
	gulp.src([
			'assets/**/*.*',
			'!assets/**/*.less',
			'!assets/img/icons/*.png'
		])
		.pipe(gulp.dest('public'));
});

/******************************
 * Handlebars
 ******************************/
gulp.task('handlebars', function () {
	gulp.src('app/templates/*.handlebars')
		.pipe(plumber())
		.pipe(handlebars(templateData, {
			ignorePartials: true, //ignores the unknown partials
			partials: {
				footer: '<footer>the end</footer>'
			},
			batch: ['./app/templates/partials'],
			helpers: {
				capitals: function (str) {
					return str.fn(this).toUpperCase();
				}
			}
		}))
		.pipe(rename({
			extname: '.html'
		}))
		.pipe(gulp.dest('./public'));
});

/******************************
 * JS plugins
 ******************************/
gulp.task('pluginsConcat', function () {
	gulp.src(bowerFiles)
		.pipe(plumber())
		.pipe(concat('plugins.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('public/js'));
});

/******************************
 * JS concat
 ******************************/
gulp.task('jsConcat', function () {
	gulp.src(['app/js/**/*.js'])
		.pipe(plumber())
		.pipe(sourcemaps.init())
		.pipe(concat('app.js'))
		// .pipe(uglify())
		.on('error', notify.onError(function (error) {
			return '\nAn error occurred while uglifying js.\nLook in the console for details.\n' + error;
		}))
		.pipe(sourcemaps.write('../js'))
		.pipe(gulp.dest('public/js'));
});

/******************************
 * Browser sync
 ******************************/
gulp.task('browser-sync', function () {
	var files = [
		'public/**/*.html',
		'public/js/**/*.js',
		'public/css/**/*.css'
	];

	browserSync.init(files, {
		server: {
			baseDir: './public'
		},
		open: false
	});
});

/******************************
 * Watch
 ******************************/
gulp.task('watch', function () {
	gulp.watch('app/img/icons/*.png', ['sprites']);
	gulp.watch('app/less/*.less', ['less']);
	gulp.watch('app/js/**/*.js', ['jsConcat']);
	gulp.watch('app/templates/**/*.handlebars', ['handlebars']);
});

/******************************
 * Less
 ******************************/
gulp.task('less', function () {
	gulp.src('app/less/app.less')
		.pipe(plumber())
		.pipe(sourcemaps.init())
		.pipe(less())
		.on('error', notify.onError(function (error) {
			return '\nAn error occurred while compiling css.\nLook in the console for details.\n' + error;
		}))
		.pipe(autoprefixer({
			browsers: ['last 5 versions'],
			cascade: false
		}))
		.pipe(sourcemaps.write('../css'))
		.pipe(gulp.dest('public/css'));
});

/******************************
 * Less min
 ******************************/
gulp.task('less-min', function () {
	gulp.src('app/less/app.less')
		.pipe(plumber())
		.pipe(less())
		.on('error', notify.onError(function (error) {
			return '\nAn error occurred while compiling css.\nLook in the console for details.\n' + error;
		}))
		.pipe(autoprefixer({
			browsers: ['last 5 versions'],
			cascade: false
		}))
		.pipe(minifyCSS({
			keepBreaks: false,
			keepSpecialComments: true,
			benchmark: false,
			debug: true
		}))
		.pipe(gulp.dest('public/css'));
});
