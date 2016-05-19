var gulp = require('gulp'),
	sass = require('gulp-sass'),
	browserSync = require('browser-sync'),
	minifyCSS = require('gulp-cssnano'),
	concat = require('gulp-concat'),
	rename = require('gulp-rename'),
	imagemin = require('gulp-imagemin');

gulp.task('sass', function() {
  	return gulp.src('src/scss/**/*.scss')
	  	.pipe(sass().on('error', sass.logError))
		.pipe(sass())
		.pipe(minifyCSS({discardComments: {
			removeAll: false
		}}))
		.pipe(rename({
			suffix: ".min"
		}))
		.pipe(concat('stylesheet.min.css'))
		.pipe(gulp.dest('dist/css/'))
		.pipe(browserSync.reload({
		  stream: true
		}))
});

gulp.task('copy:images', function() {
	gulp.src('src/images/*')
		.pipe(imagemin())
		.pipe(gulp.dest('dist/images'))
});

gulp.task('copy:index', function() {
	gulp.src('src/index.html')
		.pipe(gulp.dest('dist'))
});

gulp.task('build', ['sass','copy:index','copy:images']);

gulp.task('default', ['build']);

gulp.task('watch', ['browserSync', 'sass'],function(){
	gulp.watch('./src/scss/**/*.scss', ['sass']);
	gulp.watch('./**/*.html', browserSync.reload);
	gulp.watch('./src/js/**/*.js', browserSync.reload);
});

gulp.task('browserSync', function() {
	browserSync({
		server: {
			baseDir: 'dist'
		},
	})
});
