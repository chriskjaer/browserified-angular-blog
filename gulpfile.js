'use strict';

var gulp = require('gulp'),
    // gutil = require('gulp-util'),
    // path = require('path'),
    // app = require('./package.json');
    sass = require('gulp-sass'),
    browserify = require('gulp-browserify'),
    concat = require('gulp-concat'),
    browserSync = require('browser-sync');

//
// TASKS
// -------------------------------------------------------------

// --- Task for compiling our sass ---
gulp.task('css', function () {
  return gulp.src('./app/assets/styles/*.scss')
    // .pipe(plumber())
    .pipe(
      sass({
      errLogToConsole: true,
      sourceComments: 'map'
    })
    )
    .pipe(gulp.dest('./app/assets/styles/'));
});


gulp.task('browserify', function () {
  return gulp.src(['./app/src/main.js'])
    .pipe(browserify({
      insertGlobals : true,
      debug : true,
      transform: ['jadeify'],
      extensions: ['.jade'],
      shim: {
        angular: {
          path: './node_modules/angular/angular.js',
          exports: 'angular'
        },
        'angular-route': {
          path: './node_modules/angular-route/angular-route.js',
          exports: 'ngRoute',
          depends: {
            angular: 'angular'
          }
        }
      }
    }))
    .pipe(concat('bundle.js'))
    .pipe(gulp.dest('./app/'));
});


// --- Setting up browser sync - see https://github.com/shakyShane/browser-sync ---
gulp.task('browser-sync', function () {
  browserSync.init([
    './app/assets/styles/*.css',
    './app/**/*.html',
    './app/bundle.js'
  ],
  {
    server: {
      baseDir: './app/'
    },
    ghostMode: {
      clickedLinks: true, // Allow click events on <a> elements (buggy, avoid if possible)
      clicks: true,
      links: false,
      forms: true,
      scroll: true
    },
    timestamps: false // turn this off, and allow chrome to write to disk and see magic happens across devices when you change stuff in style inspector.
  });
});


// --- Let gulp keep an eye on our files and compile stuff if it changes ---
gulp.task('watch', ['browser-sync'], function () {
  gulp.watch('./app/assets/styles/**/*.scss', ['css']);
  gulp.watch('./app/src/**/*.*', ['browserify']);
});


// --- Default gulp task, run with gulp. - Starts our project and opens a new browser window.
gulp.task('default', ['css', 'browserify'], function () {
  gulp.start('watch');
});
