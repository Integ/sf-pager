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
    gulp.src(['static/javascript/src/question/answer-react.jsx',
              'static/javascript/src/tag-react.jsx',
              'static/javascript/src/question/question-react.jsx',
              'static/javascript/src/question/question.jsx'])
        .pipe(react())
        .pipe(concat("question-all.min.js"))
        .pipe(uglify())
        .pipe(gulp.dest("static/javascript/dist/question"));


    gulp.src(['static/javascript/src/tag-react.jsx',
              'static/javascript/src/article/article-react.jsx'])
        .pipe(react())
        .pipe(concat("article-all.min.js"))
        .pipe(uglify())
        .pipe(gulp.dest("static/javascript/dist/article"));

    gulp.src(['static/javascript/src/comment/comment-react.jsx',
              'static/javascript/src/comment/comment-list-react.jsx'])
        .pipe(react())
        .pipe(concat("comment-all.min.js"))
        .pipe(uglify())
        .pipe(gulp.dest("static/javascript/dist/comment"));


    gulp.src(['static/javascript/src/activity/activity-react.jsx',
        'static/javascript/src/activity/activity.jsx'])
        .pipe(react())
        .pipe(concat("activity-all.min.js"))
        .pipe(uglify())
        .pipe(gulp.dest("static/javascript/dist/activity"));
});
