const { series } = require('gulp');
const gulp = require('gulp');
const pug = require('gulp-pug');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', () => {
    return gulp.src('dev/sass/**/*.sass')
      .pipe(sass({
        outputStyle: 'compressed'
      }).on('error', sass.logError))
        .pipe(gulp.dest('dist/css/'))        
        // .pipe(browserSync.stream());
});


// Compile pug into browsers
gulp.task('pug', () => {
  return gulp.src('dev/pug/**/*.pug')
    .pipe(pug({
        pretty: true
      }))
      .pipe(gulp.dest('dist/'))        
      // .pipe(browserSync.stream());
});

gulp.task('default', () => { 
  gulp.watch('dev/**/*.pug', gulp.series('pug'))
  gulp.watch('dev/sass/**/*.sass', gulp.series('sass'))
  gulp.watch('dist/**/*.html'). on('change', browserSync.reload)
  gulp.watch('dist/**/*.css'). on('change', browserSync.reload)
  browserSync.init({
    server: {
      baseDir: './dist'
    }
  })
});