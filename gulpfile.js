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
<<<<<<< HEAD
  
  gulp.watch('app.js',['jshint'])
=======

  gulp.watch(['app.js','public/*.js'],['jshint'])
>>>>>>> 6e39b9e5320c047622c143ec772c247451982c31

});

