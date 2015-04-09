var gulp = require('gulp'),
    watch = require('gulp-watch'),
    less = require("gulp-less"),
    react = require("gulp-react"),
    uglify = require("gulp-uglify"),
    concat = require("gulp-concat"),
    rename = require("gulp-rename");

gulp.task("watch", function () {
    gulp.src("static/less/**/*.less")
        .pipe(watch("static/less/**/*.less"))
        .pipe(less())
        .pipe(gulp.dest("static/css"));

    gulp.src("static/javascript/src/**/*.jsx")
        .pipe(watch("static/javascript/src/**/*.jsx"))
        .pipe(react())
        .pipe(uglify())
        .pipe(rename({
            "extname": ".min.js"
        }))
        .pipe(gulp.dest("static/javascript/dist"))
        .on('error', function (err) {
            console.log(err);
        });
});

gulp.task("concat", function() {
    gulp.src(['static/javascript/dist/answer-react.min.js',
              'static/javascript/dist/question-react.min.js',
              'static/javascript/dist/question.min.js'])
        .pipe(concat("question-all.min.js"))
        .pipe(gulp.dest("static/javascript/dist"));
});