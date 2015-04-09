var gulp = require('gulp'),
    watch = require('gulp-watch'),
    less = require("gulp-less"),
    react = require("gulp-react"),
    rename = require("gulp-rename");

gulp.task("watch", function () {
    gulp.src("static/less/**/*.less")
        .pipe(watch("static/less/**/*.less"))
        .pipe(less())
        .pipe(gulp.dest("static/css"));

    gulp.src("static/javascript/src/**/*.jsx")
        .pipe(watch("static/javascript/src/**/*.jsx"))
        .pipe(react())
        .pipe(rename({
            "extname": ".js"
        }))
        .pipe(gulp.dest("static/javascript/dist"))
        .on('error', function (err) {
            console.log(err);
        });
});