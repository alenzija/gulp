import gulpsass from "gulp-sass";
import dartsass from "sass";
import rename from "gulp-rename";

import cleanCss from "gulp-clean-css"; //Сжатие CSS файла
import webpcss from "gulp-webpcss"; //Вывод webp изображений
import autoprefixer from "gulp-autoprefixer"; //Добавление вендерных префиксов
import groupCssMediaQueries from "gulp-group-css-media-queries"; //Группировка медиа-запросов

const sass = gulpsass(dartsass);

export const scss = () => {
  return (
    app.gulp
      .src(app.path.src.scss, {sourcemaps: app.asDev})
      .pipe(sass())
      .pipe(
        app.plugins.plumber(
          app.plugins.notify.onError({
            title: "SCSS",
            message: "Error:<%=error.message%>",
          })
        )
      )
      .pipe(app.plugins.if(app.asBuild, groupCssMediaQueries()))
      //  .pipe(
      //   webpcss({
      //      webpClass: ".webp",
      //     noWebpClass: ".no-webp",
      //  })
      // )
      .pipe(
        app.plugins.if(
          app.asBuild,
          autoprefixer({
            grid: true,
            overrideBrowserslist: ["last 3 versions"],
            cascade: true,
          })
        )
      )
      .pipe(app.plugins.replace(/@img\//g, "../img/"))
      .pipe(app.gulp.dest(app.path.build.css))
      .pipe(app.plugins.if(app.asBuild, cleanCss()))
      .pipe(
        rename({
          extname: ".min.css",
        })
      )
      .pipe(app.gulp.dest(app.path.build.css))
      .pipe(app.plugins.browsersync.stream())
  );
};
