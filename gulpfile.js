import gulp from "gulp";

import {path} from "./gulp/config/path.js";
import {plugins} from "./gulp/config/plugins.js";

global.app = {
  asBuild: process.argv.includes("--build"),
  asDev: !process.argv.includes("--build"),
  path: path,
  gulp: gulp,
  plugins: plugins,
};

import {copy} from "./gulp/task/copy.js";
import {reset} from "./gulp/task/reset.js";
import {html} from "./gulp/task/html.js";
import {server} from "./gulp/task/server.js";
import {scss} from "./gulp/task/scss.js";
import {js} from "./gulp/task/js.js";
import {images} from "./gulp/task/images.js";

function watcher() {
  gulp.watch(path.watch.files, copy);
  gulp.watch(path.watch.html, html);
  gulp.watch(path.watch.scss, scss);
  gulp.watch(path.watch.js, js);
  gulp.watch(path.watch.images, images);
}

const mainTask = gulp.parallel(copy, html, scss, js, images);

export const dev = gulp.series(reset, mainTask, gulp.parallel(watcher, server));
export const build = gulp.series(reset, mainTask);

gulp.task("default", dev);
