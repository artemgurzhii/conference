// Main
import postcss          from 'gulp-postcss';
import gulp             from 'gulp';

// Gulp-plugins
import strip            from 'gulp-strip-comments';
import prefix           from 'gulp-autoprefixer';
import sourcemaps       from 'gulp-sourcemaps';
import jsonlint         from 'gulp-jsonlint';
import htmlmin          from 'gulp-htmlmin';
import plumber          from 'gulp-plumber';
import changed          from 'gulp-changed';
import rename           from 'gulp-rename';
import concat           from 'gulp-concat';
import jshint           from 'gulp-jshint';
import notify           from 'gulp-notify';
import babel            from 'gulp-babel';
import jscpd            from 'gulp-jscpd';
import debug            from 'gulp-debug';
import uglify           from 'gulp-uglify';
import sass             from 'gulp-sass';
import size             from 'gulp-size';
import csso             from 'gulp-csso';
import gulpIf           from 'gulp-if';

// Postcss-plugins
import colorShort       from 'postcss-color-short';
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
import del              from 'del';

const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV === 'devlopment'; // NODE_ENV=production gulp

const paths = {
  // css
  css: {
    sassAll:  'assets/css/*/*/*.*',
    sassMain: 'assets/css/main.sass',
    cssMin:   'assets/css/min/'
  },

  // js
  js: {
    jsMain:    'assets/js/common.js',
    jsMin:     'assets/js/min/',
    jsModules: 'assets/js/modules/*.js'
  },

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
    build: '<span style="color: grey">Running:</span> jekyll build'
};

// Assets
// ========================
// CSS
gulp.task('assets:css', () => {
  let processors = [
      zindex,
      cssMqpacker,
      colorShort,
      pxtorem,
      focus
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
      csso(),
      rename({ suffix: ".min"}),
      debug({title: 'Checking CSS:'}),
      gulpIf(isDevelopment, sourcemaps.write('.')),
    gulp.dest('assets/css/min')
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
      rename({
        dirname: paths.js.jsMin,
        basename: "common",
        suffix: ".min",
        extname: ".js"
      }),
      debug({title: 'Checking JavaScript:'}),
    gulp.dest('./')
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
  return cp.spawn( jekyll , ['build'], {stdio: 'inherit'})
    .on('close', done)
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
  gulp.watch(paths.css.sassMain, gulp.series('assets:css', 'browser:build', 'browser:rebuild'));
  gulp.watch(paths.css.sassAll, gulp.series('assets:css', 'browser:build', 'browser:rebuild'));
  gulp.watch(paths.js.jsMain, gulp.series('assets:js', 'browser:build', 'browser:rebuild'));
  gulp.watch(paths.js.jsModules, gulp.series('assets:js', 'browser:build', 'browser:rebuild'));
  gulp.watch(paths.html.includes, gulp.series('browser:build', 'browser:rebuild'));
  gulp.watch(paths.html.layouts, gulp.series('browser:build', 'browser:rebuild'));
  gulp.watch(paths.html.main, gulp.series('browser:build', 'browser:rebuild'));
  gulp.watch(paths.html.posts, gulp.series('browser:build', 'browser:rebuild'));
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
// HTML
gulp.task('deploy:html', () => {
  let combined = combiner.obj([
    gulp.src(paths.html.includes),
      size(),
      htmlmin({collapseWhitespace: true}),
      srip(),
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
// JSON
gulp.task('deploy:json', () => {
  let combined = combiner.obj([
    gulp.src(paths.json.jsonSearch),
      size(),
      plumber(),
      jsonlint(),
      jsonlint.reporter(),
      jsonlint.failOnError(),
      debug({title: 'Checking JSON:'}),
    gulp.dest('.')
  ])
  combined.on('error', console.error.bind(console))
  return combined;
});

const browser = gulp.parallel('browser:build', 'browser:rebuild', 'browser:sync');
const assets = gulp.parallel('assets:js', 'assets:css', 'assets:image');
const clean = gulp.parallel('clean:del');
const build = gulp.series(clean, gulp.parallel(browser, assets));
const deploy = gulp.parallel('deploy:image', 'deploy:html', 'deploy:json');
export { build, clean, assets, browser, deploy };
export default build;
