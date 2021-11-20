const gulp = require("gulp");
const sass = require("gulp-sass")(require("node-sass"));
const del = require("del");
const argv = require("yargs").argv;

const buildDir = argv.production ? "build" : argv.public ? "public" : "dev";

gulp.task("styles", () => {
  return gulp
    .src("src/styles/index.scss")
    .pipe(
      sass({ outputStyle: argv.production ? "compressed" : "expanded" }).on(
        "error",
        sass.logError
      )
    )
    .pipe(gulp.dest(`./${buildDir}/assets/`));
});

gulp.task("clean", () => {
  return del([`./${buildDir}/assets/main.css`]);
});

gulp.task("default", gulp.series(["clean", "styles"]));
