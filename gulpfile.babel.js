// Main
import postcss          from 'gulp-postcss';
import gulp             from 'gulp';

// Gulp-plugins
import rmvHtmlComnts    from 'gulp-remove-html-comments';
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
import csso             from 'gulp-csso';
import gulpIf           from 'gulp-if';

// Postcss-plugins
import colorShort       from 'postcss-color-short';
import pxtorem          from 'postcss-pxtorem';
import focus            from 'postcss-focus';
import size             from 'postcss-size';

// Other
import imageminPngquant from 'imagemin-pngquant';
import combiner         from 'stream-combiner2';
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
    jsMain: 'assets/js/*.js',
    jsMin:  'assets/js/min/'
  },

  //images
  img: {
    imagesAll: 'assets/img/*.*',
    imagesMin: 'assets/img/min/'
  },

  // html
  html: {
    includes: '_includes/*.html',
    site:     '_site',
    main:     '*.html'
  },

  // markdowm
  markdown: {
    posts: '_posts/*.markdown'
  }
}

const jekyll = process.platform === 'win32' ? 'jekyll.bat' : 'jekyll',
  messages = {
    build: '<span style="color: grey">Running:</span> jekyll build'
};

// Assets
// ========================
gulp.task('assets:css', () => {
  let processors = [
      cssMqpacker,
      colorShort,
      pxtorem,
      focus,
      size
    ]
  let combined = combiner.obj([
    gulp.src(paths.css.sassMain),
      plumber(),
      changed(paths.css.cssMin),
      gulpIf(isDevelopment, sourcemaps.init()),
      sass({
        includePaths: ['assets/css/'],
        onError: browserSync.notify
      }),
      postcss(processors),
      prefix({ browsers: ['> 1%', 'ie 8', 'ie 7', 'ie 6'], cascade: false }),
      csso(),
      rename({suffix: '.min'}),
      debug({title: 'Checking CSS:'}),
      gulpIf(isDevelopment, sourcemaps.write('.')),
      gulp.dest(paths.css.cssMin)
  ])
  combined.on('error', console.error.bind(console))
  return combined;
});
gulp.task('assets:js', () => {
  let combined = combiner.obj([
    gulp.src(paths.js.jsMain),
      plumber(),
      changed(paths.js.jsMain),
      jshint(),
      jshint.reporter('jshint-stylish'),
      babel({
        presets: ['es2015']
      }),
      jscpd(),
      concat(paths.js.jsMain),
      //uglify(),
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
gulp.task('assets:json', () => {
  let combined = combiner.obj([
    gulp.src('*.json'),
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
gulp.task('assets:image', () => {
  let combined = combiner.obj([
    gulp.src(paths.img.imagesAll),
      changed(paths.img.imagesMin),
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
  gulp.watch(paths.html.includes, gulp.series('browser:build', 'browser:rebuild'));
  gulp.watch(paths.html.main, gulp.series('browser:build', 'browser:rebuild'));
  gulp.watch(paths.markdown.posts, gulp.series('browser:build', 'browser:rebuild'));
});

// Cleen
// ========================
gulp.task('clean:del', done => {
  return del(paths.html.site)
  done();
});

// DEPLOY
// html
gulp.task('deploy:html', () => {
  let combined = combiner.obj([
    gulp.src(paths.html.includes),
      rmvHtmlComnts(),
      htmlmin({collapseWhitespace: true}),
      debug({title: 'Checking HTML:'}),
    gulp.dest(paths.html.includes)
  ])
  combined.on('error', console.error.bind(console))
  return combined;
});

// image
gulp.task('deploy:image', () => {
  let combined = combiner.obj([
    gulp.src(paths.img.imagesAll),
      imageminPngquant({quality: '100', speed: 1})(),
      debug({title: 'Checking Images:'}),
    gulp.dest(paths.img.imagesMin)
  ])
  combined.on('error', console.error.bind(console))
  return combined;
});

const browser = gulp.parallel('browser:build', 'browser:rebuild', 'browser:sync');
const assets = gulp.parallel('assets:js', 'assets:css', 'assets:json', 'assets:image');
const clean = gulp.parallel('clean:del');
const build = gulp.series(clean, gulp.parallel(assets, browser));
const deploy = gulp.parallel('deploy:image', 'deploy:html');
export { build, clean, assets, browser, deploy };
export default build;
