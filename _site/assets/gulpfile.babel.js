// Main
import postcss          from 'gulp-postcss';
import gulp             from 'gulp';

// Gulp-plugins
import strip            from 'gulp-strip-comments';
import prefix           from 'gulp-autoprefixer';
import sourcemaps       from 'gulp-sourcemaps';
import duration         from 'gulp-duration';
import htmlmin          from 'gulp-htmlmin';
import plumber          from 'gulp-plumber';
import changed          from 'gulp-changed';
import rename           from 'gulp-rename';
import jshint           from 'gulp-jshint';
import notify           from 'gulp-notify';
import uglify           from 'gulp-uglify';
import babel            from 'gulp-babel';
import jscpd            from 'gulp-jscpd';
import debug            from 'gulp-debug';
import sass             from 'gulp-sass';
import size             from 'gulp-size';
import csso             from 'gulp-csso';
import gulpIf           from 'gulp-if';

// Postcss-plugins
import pxtorem          from 'postcss-pxtorem';
import zindex           from 'postcss-zindex';
import focus            from 'postcss-focus';

// Other
import imageminPngquant from 'imagemin-pngquant';
import combiner         from 'stream-combiner2';
import webpack          from 'webpack-stream';
import imagemin         from 'gulp-imagemin';
import cp               from 'child_process';
import cssMqpacker      from 'css-mqpacker';
import browserSync      from 'browser-sync';
import jsdoc            from 'gulp-jsdoc3';
import del              from 'del';

const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV === 'devlopment'; // NODE_ENV=production gulp

const paths = {
  // css
  css: {
    sassAll:  'assets/css/*/*/*.*',
    sassMain: 'assets/css/main.sass',
    cssMin:   'assets/css/min'
  },

  // js
  js: {
    jsModules: 'assets/js/modules/*.js',
    jsMain:    'assets/js/common.js',
    jsMin:     'assets/js/min'
  },

  // gulp.watch(paths.css.sassMain,   gulp.series('assets:css', 'browser:build', 'browser:rebuild'));
  // gulp.watch(paths.css.sassAll,    gulp.series('assets:css', 'browser:build', 'browser:rebuild'));
  // gulp.watch(paths.js.jsModules,   gulp.series('assets:js',  'browser:build', 'browser:rebuild'));
  // gulp.watch(paths.js.jsMain,      gulp.series('assets:js',  'browser:build', 'browser:rebuild'));

  //images
  img: {
    imagesAll: 'assets/img/*.*',
    imagesMin: 'assets/img/min/'
  },

  // html
  html: {
    includes: '_includes/*.html',
    layouts:  '_layouts/*.html',
    site:     '_site',
    main:     '*.html',
    posts:    '_includes/posts/*.html'
  },

  // markdowm
  markdown: {
    posts: '_posts/*.markdown'
  },

  json: {
    jsonSearch: '_site/data/*.json'
  }
}

const jekyll = process.platform === 'win32' ? 'jekyll.bat' : 'jekyll',
  messages = {
    build: '<span>Running:</span> jekyll build'
};

// Assets
// ========================
// CSS
gulp.task('assets:css', () => {
  let processors = [
      zindex,
      pxtorem,
      focus,
      cssMqpacker
  ];
  let combined = combiner.obj([
    gulp.src(paths.css.sassMain),
      plumber(),
      changed('.'),
      size(),
      gulpIf(isDevelopment, sourcemaps.init()),
      sass({
        includePaths: ['assets/css/'],
        onError: browserSync.notify
      }),
      postcss(processors),
      prefix({ browsers: ['> 1%', 'ie 8', 'ie 7', 'ie 6'], cascade: false }),
      rename({ suffix: ".min"}),
      duration('CSS'),
      debug({title: 'Checking CSS:'}),
      gulpIf(isDevelopment, sourcemaps.write('.')),
    gulp.dest(paths.css.cssMin)
  ])
  combined.on('error', console.error.bind(console))
  return combined;
});
// JS
gulp.task('assets:js', () => {
  let combined = combiner.obj([
    gulp.src(paths.js.jsMain),
      plumber(),
      changed('.'),
      size(),
      gulpIf(isDevelopment, sourcemaps.init()),
      webpack(),
      jshint({
        esversion: 6
      }),
      jshint.reporter('jshint-stylish'),
      babel({
        presets: ['es2015']
      }),
      jscpd(),
      strip(),
      rename({ suffix: ".min"}),
      duration('JS'),
      debug({title: 'Checking JavaScript:'}),
      gulpIf(isDevelopment, sourcemaps.write('.')),
    gulp.dest(paths.js.jsMin)
  ])
  combined.on('error', console.error.bind(console))
  return combined;
});
// IMG
gulp.task('assets:image', () => {
  let combined = combiner.obj([
    gulp.src(paths.img.imagesAll, {since: gulp.lastRun('assets:image')}),
      changed(paths.img.imagesMin),
      size(),
      imagemin({
        progressive: true,
        svgoPlugins: [{removeViewBox: false}],
        use: [imageminPngquant()]
      }),
      duration('IMG'),
      debug({title: 'Checking Images:'}),
    gulp.dest(paths.img.imagesMin)
  ])
  combined.on('error', console.error.bind(console))
  return combined;
});

// Browser
// ========================
gulp.task('browser:build', done => {
  browserSync.notify(messages.build);
  return cp.spawn(jekyll, ['build'], {stdio: 'inherit'})
    .on('close', done);
});
gulp.task('browser:rebuild', () => browserSync.reload());

gulp.task('browser:sync', () => {
  browserSync.init({
    server: {
      baseDir: paths.html.site
    },
    host: "localhost",
    notify: false
  })
  gulp.watch(paths.css.sassMain,   gulp.series('assets:css', 'browser:build', 'browser:rebuild'));
  gulp.watch(paths.css.sassAll,    gulp.series('assets:css', 'browser:build', 'browser:rebuild'));
  gulp.watch(paths.js.jsModules,   gulp.series('assets:js',  'browser:build', 'browser:rebuild'));
  gulp.watch(paths.js.jsMain,      gulp.series('assets:js',  'browser:build', 'browser:rebuild'));
  gulp.watch(paths.html.includes,  gulp.series('browser:build', 'browser:rebuild'));
  gulp.watch(paths.html.layouts,   gulp.series('browser:build', 'browser:rebuild'));
  gulp.watch(paths.html.main,      gulp.series('browser:build', 'browser:rebuild'));
  gulp.watch(paths.html.posts,     gulp.series('browser:build', 'browser:rebuild'));
  gulp.watch(paths.markdown.posts, gulp.series('browser:build', 'browser:rebuild'));
});

// Cleen
// ========================
gulp.task('clean:del', done => {
  return del(paths.html.site)
  done();
});

// DEPLOY
// ========================
// CSS
gulp.task('deploy:css', () => {
  let processors = [
      zindex,
      pxtorem,
      focus,
      cssMqpacker
  ];
  let combined = combiner.obj([
    gulp.src(paths.css.sassMain),
      plumber(),
      changed('.'),
      sass({
        includePaths: ['assets/css/'],
      }),
      postcss(processors),
      prefix({ browsers: ['> 1%', 'ie 8', 'ie 7', 'ie 6'], cascade: false }),
      csso(),
      rename({ suffix: ".min"}),
    gulp.dest(paths.css.cssMin)
  ])
  combined.on('error', console.error.bind(console))
  return combined;
});
// JS
gulp.task('deploy:js', () => {
  let combined = combiner.obj([
    gulp.src(paths.js.jsMain),
      plumber(),
      changed('.'),
      webpack(),
      jshint({
        esversion: 6
      }),
      jshint.reporter('jshint-stylish'),
      babel({
        presets: ['es2015']
      }),
      jscpd(),
      strip(),
      uglify(),
      rename({ suffix: ".min"}),
    gulp.dest(paths.js.jsMin)
  ])
  combined.on('error', console.error.bind(console))
  return combined;
});
// HTML
gulp.task('deploy:html', () => {
  let combined = combiner.obj([
    gulp.src(paths.html.includes),
      size(),
      srip(),
      htmlmin({collapseWhitespace: true}),
      debug({title: 'Checking HTML:'}),
    gulp.dest(paths.html.includes)
  ])
  combined.on('error', console.error.bind(console))
  return combined;
});
// IMG
gulp.task('deploy:image', () => {
  let combined = combiner.obj([
    gulp.src(paths.img.imagesAll),
      size(),
      imageminPngquant({quality: '100', speed: 1})(),
      debug({title: 'Checking Images:'}),
    gulp.dest(paths.img.imagesMin)
  ])
  combined.on('error', console.error.bind(console))
  return combined;
});
// Documentation
gulp.task('deploy:docs', cb => {
  const config = require('./jsdoc.json');
  let combined = combiner.obj([
    gulp.src(['README.md', 'assets/js/modules/*.js'], {read: false}),
      jsdoc(config, cb),
      duration('Documentation'),
      debug({title: 'Writing documentation:'}),
  ])
  combined.on('error', console.error.bind(console))
  return combined;
});

const browser = gulp.parallel('browser:sync', 'browser:build', 'browser:rebuild');
const assets  = gulp.parallel('assets:css', 'assets:js', 'assets:image');
const clean   = gulp.parallel('clean:del');
const build   = gulp.series(clean, gulp.parallel(browser, assets));
const deploy  = gulp.series(clean, gulp.parallel('deploy:css', 'deploy:js', 'deploy:image', 'deploy:html', 'deploy:docs'));
export { build, clean, assets, browser, deploy };
export default build;
