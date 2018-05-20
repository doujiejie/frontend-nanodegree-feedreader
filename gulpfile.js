/*eslint-env node */

var gulp = require('gulp');
// var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
// var eslint = require('gulp-eslint');
var jasmine = require('gulp-jasmine-phantom');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
// var imagemin = require('gulp-imagemin');
// var pngquant = require('imagemin-pngquant');

// gulp.task('default', function() {
// 	return gulp.src('src/images/*')
// 		.pipe(imagemin({
// 			progressive: true,
// 			use: [pngquant()]
// 		}))
// 		.pipe(gulp.dest('dist/images'));
// });

gulp.task('default', ['copy-html', 'styles', 'scripts'], function() {
	gulp.watch('sass/**/*.scss', ['styles']);
	// gulp.watch('js/**/*.js', ['lint']);
	gulp.watch('/index.html', ['copy-html']);
	gulp.watch('./dist/index.html').on('change', browserSync.reload);
	browserSync.init({
		server: './dist'
	});
});

gulp.task('dist', [
	'copy-html',
	'copy-css',
	'copy-js',
	'scripts-dist'
]);

gulp.task('scripts', function() {
	gulp.src('src/js/**/*.js')
		.pipe(concat('all.js'))
		.pipe(gulp.dest('dist/js'));
});

gulp.task('scripts-dist', function() {
	gulp.src('src/js/**/*.js')
		.pipe(sourcemaps.init())
		.pipe(concat('all.js'))
		.pipe(uglify())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('dist/js'));
});

gulp.task('copy-html', function() {
	gulp.src('src/index.html')
		.pipe(gulp.dest('./dist'));
});

gulp.task('copy-css', function() {
	gulp.src('src/css/*.css')
		.pipe(gulp.dest('./dist/css'));
});

gulp.task('copy-js', function() {
	gulp.src('src/js/*.js')
		.pipe(gulp.dest('./dist/js'));
});

// gulp.task('copy-images', function() {
// 	gulp.src('img/*')
// 		.pipe(gulp.dest('dist/img'));
// });

// gulp.task('styles', function() {
// 	gulp.src('sass/**/*.scss')
// 		.pipe(sass({
// 			outputStyle: 'compressed'
// 		}).on('error', sass.logError))
// 		.pipe(autoprefixer({
// 			browsers: ['last 2 versions']
// 		}))
// 		.pipe(gulp.dest('dist/css'))
// 		.pipe(browserSync.stream());
// });

gulp.task('tests', function () {
	gulp.src('jasmine/spec/feedreader.js')
		.pipe(jasmine({
			integration: true,
			vendor: 'src/js/**/*.js'
		}));
});