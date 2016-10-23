// Plugins
const sync = require('browser-sync').create();
import gulp from 'gulp';

// Path
const paths = {
  css: 'assets/css/**',
  js:  'assets/js/**',
  html: '**.html',
  markdown: '_posts/*.md'
}

// Module
module.exports = options => {
  return () => {
    sync.init({
      server: {
        baseDir: '_site'
      },
      host: 'localhost',
      notify: false
    })
    sync.watch(paths.css).on('change', gulp.series('css', 'browser:build', sync.reload));
    sync.watch(paths.js).on('change', gulp.series('js', 'browser:build', sync.reload));
    sync.watch(paths.html).on('change', gulp.series('browser:build', sync.reload));
    sync.watch(paths.markdown).on('change', gulp.series('browser:build', sync.reload));
  };
};
