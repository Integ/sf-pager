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
        .pipe(gulp.dest("static/javascript/dist"));
});

gulp.task("build", function () {
    gulp.src("static/less/**/*.less")
        .pipe(less())
        .pipe(gulp.dest("static/css"));

    gulp.src("static/javascript/src/**/*.jsx")
        .pipe(react())
        .pipe(uglify())
        .pipe(rename({
            "extname": ".min.js"
        }))
        .pipe(gulp.dest("static/javascript/dist"));
});

gulp.task("concat", function() {
    gulp.src(['static/javascript/dist/question/answer-react.min.js',
              'static/javascript/dist/tag-react.min.js',
              'static/javascript/dist/question/question-react.min.js',
              'static/javascript/dist/question/question.min.js'])
        .pipe(concat("question-all.min.js"))
        .pipe(gulp.dest("static/javascript/dist/question"));

    gulp.src(['static/javascript/dist/tag-react.min.js',
              'static/javascript/dist/article/article-react.min.js'])
        .pipe(concat("article-all.min.js"))
        .pipe(gulp.dest("static/javascript/dist/article"));

    gulp.src(['static/javascript/dist/comment/comment-react.min.js',
              'static/javascript/dist/comment/comment-list-react.min.js'])
        .pipe(concat("comment-all.min.js"))
        .pipe(gulp.dest("static/javascript/dist/comment"));

    gulp.src(['static/javascript/dist/activity/activity-react.min.js',
        'static/javascript/dist/activity/activity.min.js'])
        .pipe(concat("activity-all.min.js"))
        .pipe(gulp.dest("static/javascript/dist/activity"));
});

gulp.task("product", ['build','concat']);