const gulp = require('gulp')
const browserSync = require('browser-sync').create()
const webpack = require('webpack-stream')

// Move any html files to dist folder for deploy
gulp.task("html", function () {
    return gulp.src("src/*.html")
        .pipe(gulp.dest("dist"))
})
// Move any files in js folder to dist folder for deploy
gulp.task("js", function () {
    return gulp.src("src/js/*.js")
        .pipe(
            webpack({
                output: {
                    filename: "app.js"
                }
        }))
        .pipe(gulp.dest("dist/js"))
})

// Watches files for changes
gulp.task("watch", function () {
    // While "watch"ing files - loads live server with website preview coming from "dist" folder
    browserSync.init({
        server: {
            baseDir: "dist"
        }
    })
    // If any ".html" file is updated then reruns gulp html task to move files to dist folder and also updates live server
    gulp.watch("src/*.html", gulp.series("html")).on("change", browserSync.reload)
    // If js folder is updated then reruns gulp js task and move files to dist folder
    gulp.watch("src/js/*", gulp.series("js"))
})

// Runs all the following tasks on "gulp" command
const build = gulp.series(["html", "js", "watch"])
gulp.task('default', build)