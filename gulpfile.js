var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    watch = require('gulp-watch')
    livereload = require('gulp-livereload')

gulp.task('default', ['watch']);

gulp.task('jshint',function(){
  return gulp.src('app.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('watch',function(){
  
  gulp.watch('app.js',['jshint'])

});

