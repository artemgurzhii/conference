import gulp from 'gulp';

const paths = {
  cssMin:'assets/css/min',
  css:   'assets/css/main.sass',
  js:    'assets/js/common.js',
  jsM:   'assets/js/modules/*.js',
  jsMin: 'assets/js/min',
  img:   'assets/img/*.*',
  imgMin: 'assets/img/min/',
  clean: '_site',
  site:  '_site/index.html',
  md:    'README.md'
};

let lazyRequireTask = (taskName, path, options = {}) => {
  path = './gulp/' + path;
  gulp.task(taskName, callback => {
    let task = require(path).call(this, options);
    return task(callback);
  });
};

lazyRequireTask('assets:css', 'css', {
  src: paths.css,
  dest: paths.cssMin
});

lazyRequireTask('assets:js', 'js', {
  src: paths.js,
  dest: paths.jsMin
});

lazyRequireTask('assets:img', 'img', {
  src: paths.img,
  dest: paths.imgMin
});

lazyRequireTask('clean', 'clean', {
  src: paths.clean
});

lazyRequireTask('deploy:js', 'deploy/js', {
  src: paths.js,
  dest: paths.jsMin
});

lazyRequireTask('deploy:css', 'deploy/css', {
  src: paths.css,
  dest: paths.cssMin
});

lazyRequireTask('deploy:img', 'deploy/img', {
  src: paths.img,
  dest: paths.imgMin
});

lazyRequireTask('deploy:docs', 'deploy/docs', {
  src: [paths.md, paths.jsM]
});

lazyRequireTask('deploy:html', 'deploy/html', {
  src: paths.site,
  dest: paths.clean
});

lazyRequireTask('browser:sync', 'sync');
lazyRequireTask('browser:build', 'build');

const browser = gulp.parallel('browser:sync', 'browser:build');
const assets  = gulp.parallel('assets:css', 'assets:js', 'assets:img');
const clean   = gulp.parallel('clean');
const build   = gulp.series(clean, gulp.parallel(browser, assets));
const deploy  = gulp.parallel('browser:sync', 'browser:build', 'deploy:css', 'deploy:js', 'deploy:img', 'deploy:html', 'deploy:docs');
export { build, clean, assets, browser, deploy };
export default build;
