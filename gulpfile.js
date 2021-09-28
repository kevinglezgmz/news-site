const gulp = require("gulp");
const gulpSass = require("gulp-sass")(require("sass"));
const gulpTs = require("gulp-typescript");

gulp.task("styles", () => {
  return gulp.src("src/sass/**/*.scss").pipe(gulpSass()).pipe(gulp.dest("assets/styles"));
});

gulp.task("scripts", () => {
  const tsConfig = gulpTs.createProject("tsconfig.json");
  return tsConfig.src().pipe(tsConfig()).pipe(gulp.dest("assets/scripts"));
});

gulp.task(
  "styles:watch",
  gulp.series("styles", (done) => {
    gulp.watch("src/sass/**/*.scss", gulp.series("styles"));
    done();
  })
);

gulp.task(
  "scripts:watch",
  gulp.series("scripts", (done) => {
    gulp.watch("src/scripts/**/*.ts", gulp.series("scripts"));
    done();
  })
);

gulp.task("serve", (done) => {
  const tasks = gulp.parallel("styles:watch", "scripts:watch");
  tasks();
  done();
});

gulp.task(
  "default",
  gulp.parallel("styles", "scripts", (done) => {
    done();
  })
);
