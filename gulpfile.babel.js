import gulp from             'gulp';
import rename from           'gulp-rename';
import babel from            'gulp-babel';
import sass from             'gulp-sass';
import csso from             'gulp-csso';
import prefix from           'gulp-autoprefixer';
import cp from               'child_process';
import imagemin from         'imagemin';
import imageminPngquant from 'imagemin-pngquant';
import browserSync from      'browser-sync';
import jscpd from            'gulp-jscpd';
import uglify from           'gulp-uglify';
import concat from           'gulp-concat';
import jshint from           'gulp-jshint';
import plumber from          'gulp-plumber';
import changed from          'gulp-changed';
import webpack from          'gulp-webpack';
import rmvHtmlComnts from    'gulp-remove-html-comments';
import debug from            'gulp-debug';
import colorShort from       'postcss-color-short';
import pxtorem from          'postcss-pxtorem';
import size from             'postcss-size';
import cssMqpacker from      'css-mqpacker';
import focus from            'postcss-focus';
import jsonlint from         'gulp-jsonlint';
import postcss from          'gulp-postcss';

const paths = {
  // css
  cssAll:     'assets/css/*.*',
  css:        'assets/css/*.css',
  sassAll:    'assets/css/*/*.*',
  sassAllAll: 'assets/css/*/*/*.*',
  sass:       'assets/css/main.sass',
  cssMin:     'assets/css/min/',

  // js
  jsAll:  'assets/js/*.*',
  jsMain: 'assets/js/*.js',
  jsMin:  'assets/js/min/common.min.js',

  //images
  imagesAll: 'assets/img/*.*',
  imagesMin: 'assets/img/min/',

  // html
  includes: '_includes/*.html',
  site:     '_site'
}

const jekyll = process.platform === 'win32' ? 'jekyll.bat' : 'jekyll',
  messages = {
    jekyllBuild: '<span style="color: grey">Running:</span> jekyll build'
};

// task jekyll-build
gulp.task('jekyll-build', (done) => {
  browserSync.notify(messages.jekyllBuild);
  return cp.spawn( jekyll , ['build'], {stdio: 'inherit'})
    .on('close', done);
});

// task jekyll-rebuild
gulp.task('jekyll-rebuild', ['jekyll-build'], () => browserSync.reload());

// task browser-sync
gulp.task('browser-sync', ['jekyll-build'], () => {
  browserSync({
    server: {
      baseDir: paths.site
    },
    host: "localhost",
    notify: false
  });
});

// task css
gulp.task('css', () => {
  const processors = [
    colorShort,
    focus,
    size,
    pxtorem,
    cssMqpacker
  ];
  return gulp.src(paths.sass)
    .pipe(postcss(processors))
    .pipe(sass({
      includePaths: ['css'],
      onError: browserSync.notify
    }))
    .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
    .pipe(csso())
    .pipe(rename({suffix: '.min'}))
    .pipe(debug({title: 'Checking:'}))
    .pipe(gulp.dest(paths.cssMin));
});

// task html
gulp.task('html', () => {
  return gulp.src(paths.includes)
    .pipe(rmvHtmlComnts())
    .pipe(gulp.dest(''));
});

// task image
gulp.task('image', () => {
  return gulp.src(paths.imagesAll)
    .pipe(imageminPngquant({quality: '65-80', speed: 4})())
    .pipe(debug({title: 'Checking:'}))
    .pipe(gulp.dest(paths.imagesMin));
});


// this part response for all stuff with js
gulp.task('js', () => {
  return gulp.src(paths.jsMain)
    //.pipe(webpack())
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(jscpd({
      'min-lines': 1,
      verbose    : true
    }))
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(concat(paths.jsMin))
    .pipe(changed(paths.jsAll))
    .pipe(uglify())
    .pipe(debug({title: 'Checking:'}))
    .pipe(gulp.dest(''))
});

// watch changes and run tasks
gulp.task('watch', () => {
  gulp.watch(paths.sassAll, ['css', 'jekyll-build', 'jekyll-rebuild']);
  gulp.watch(paths.sassAllAll, ['css', 'jekyll-build', 'jekyll-rebuild']);
  gulp.watch(paths.cssAll, ['css', 'jekyll-build', 'jekyll-rebuild']);
  gulp.watch(paths.jsAll, ['js', 'jekyll-build', 'jekyll-rebuild']);
  gulp.watch(paths.includes, ['jekyll-build', 'jekyll-rebuild']);
});

// Prevent pipe breaking caused by errors from gulp plugins
gulp.task('plumber', () => {
  return gulp.src(['css', 'js', 'html'], {read: false})
    .pipe(plumber())
    .pipe(debug({title: 'Checking:'}));
});

// task default
gulp.task('default', () => {
  gulp.start('image', 'plumber', 'browser-sync', 'watch', 'css', 'js', 'jekyll-build', 'jekyll-rebuild');
});
