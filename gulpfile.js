var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    karma = require('gulp-karma');

gulp.task('lint', function () {
  gulp.src('src/**/*.js').pipe(jshint()).pipe(jshint.reporter('default'));
});

gulp.task('watch', function () {
  var watcher = gulp.watch(['src/**/*.js',
                            'test/specs/**/*.js',
                            'test/mocks/**/*.js'],
                           ['lint', 'test']);
  watcher.on('change', function (event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
  });
});

gulp.task('test', function () {
  return gulp.src(['bower_components/angular/angular.js',
                   'bower_components/angular-mocks/angular-mocks.js',
                   'bower_components/angular-animate/angular-animate.js',
                   'bower_components/angular-ui-router/release/angular-ui-router.js',
                   'bower_components/angular-sanitize/angular-sanitize.js',
                   'bower_components/ionic/release/js/ionic.js',
                   'bower_components/ionic/release/js/ionic-angular.js',
                   'bower_components/achan.cordova/navigator.js',
                   'src/**/*.js',
                   'test/mocks/**/*.js',
                   'test/specs/**/*.js'])
      .pipe(karma({
        configFile: 'karma.conf.js',
        action: 'run'
      }));
});
