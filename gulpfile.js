var gulp          = require('gulp'),
    sass          = require('gulp-sass'),
    autoprefixer  = require('gulp-autoprefixer'),
    minifycss     = require('gulp-minify-css'),
    rename        = require('gulp-rename'),
    concat        = require('gulp-concat'),
    notify        = require('gulp-notify'),
    coffee        = require('gulp-coffee'),
    uglify        = require('gulp-uglify'),
    bourbon       = require('node-bourbon').includePaths,
    gulpif        = require('gulp-if'),
    bower         = require('gulp-bower-files'),
    livereload    = require('gulp-livereload'),
    lr            = require('tiny-lr'),
    server        = lr(),
    cssbeautify   = require('gulp-cssbeautify');

var paths = {
  scripts: ['assets/javascripts/**/*.js', 'assets/javascripts/**/*.coffee'],
  styles: ['assets/stylesheets/**/*.scss'],
  bower: ['bower.json']
};

gulp.task('bower', function(){
  bower().pipe(gulp.dest("assets/javascripts"));
});

gulp.task('scripts', function() {
  gulp.src(paths.scripts)
    .pipe(gulpif(/[.]coffee$/, coffee()))
    // .pipe(uglify())
    .pipe(concat('main.js'))
    .pipe(gulp.dest(''))
    .pipe(livereload(server))
    .pipe(notify({
      message: 'Script task completed.'
    }));
});

gulp.task('styles', function() {
  gulp.src('assets/stylesheets/application.scss')
    .pipe(sass({
      includePaths: ['assets/stylesheets/sass/'].concat(bourbon)
    }))
    .pipe(autoprefixer('last 2 versions'))
    .pipe(minifycss())
    .pipe(cssbeautify())
    .pipe(gulp.dest(''))
    .pipe(livereload(server))
    .pipe(notify({
      message: 'Style task completed.'
    }));
});

gulp.task('watch', function() {
  gulp.watch(paths.scripts, ['scripts']);
  gulp.watch(paths.styles, ['styles']);
  gulp.watch(paths.bower, ['bower', 'scripts']);
});

gulp.task('default', ['bower', 'scripts', 'styles', 'watch']);
