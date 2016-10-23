import gulp from 'gulp';

const paths = {
  cssMin:'assets/css/min',
  css:   'assets/css/*.sass',
  js:    'assets/js/common.js',
  jsMin: 'assets/js/min',
  img:   'assets/img/**',
  imgMin: 'assets/img/min/',
  clean: '_site',
  site:  '_site/**.html',
  md:    'README.md'
};

function lazyRequireTask(taskName, path, options = {}) {
  path = `./gulp/${path}`;
  gulp.task(taskName, callback => {
    let task = require(path).call(this, options);
    return task(callback);
  });
}

lazyRequireTask('css', 'css', {
  src: paths.css,
  dest: paths.cssMin
});

lazyRequireTask('js', 'js', {
  src: paths.js,
  dest: paths.jsMin
});

lazyRequireTask('img', 'img', {
  src: paths.img,
  dest: paths.imgMin
});

lazyRequireTask('clean', 'clean', {
  src: paths.clean
});

lazyRequireTask('html', 'deploy/html', {
  src: paths.site,
  dest: paths.clean
});

lazyRequireTask('browser:sync', 'sync');
lazyRequireTask('browser:build', 'build');

const browser = gulp.parallel('browser:sync', 'browser:build');
const assets  = gulp.parallel('css', 'js', 'img');
const dep  = gulp.parallel(assets, 'html');
const clean   = gulp.parallel('clean');
const build   = gulp.series(clean, gulp.parallel(browser, assets));
const deploy  = gulp.parallel('browser:sync', 'browser:build', dep);
export { build, clean, assets, browser, deploy };
export default build;
