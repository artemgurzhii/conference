const gulp           = require('gulp'),
    rename           = require('gulp-rename'),
    babel            = require('gulp-babel'),
    sass             = require('gulp-sass'),
    csso             = require('gulp-csso'),
    prefix           = require('gulp-autoprefixer'),
    cp               = require('child_process'),
    imagemin         = require('imagemin'),
    imageminPngquant = require('imagemin-pngquant'),
    browserSync      = require('browser-sync'),
    jscpd            = require('gulp-jscpd'),
    uglify           = require('gulp-uglify'),
    concat           = require('gulp-concat'),
    jshint           = require('gulp-jshint'),
    plumber          = require('gulp-plumber'),
    changed          = require('gulp-changed'),
    webpack          = require('gulp-webpack'),
    rmvHtmlComnts    = require('gulp-remove-html-comments'),
    debug            = require('gulp-debug'),
    colorShort       = require('postcss-color-short'),
    pxtorem          = require('postcss-pxtorem'),
    size             = require('postcss-size'),
    cssMqpacker      = require('css-mqpacker'),
    focus            = require('postcss-focus'),
    jsonlint         = require('gulp-jsonlint'),
    postcss          = require('gulp-postcss');

const assetsDir = {
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
      baseDir: assetsDir.site
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
  return gulp.src(assetsDir.sass)
    .pipe(postcss(processors))
    .pipe(sass({
      includePaths: ['css'],
      onError: browserSync.notify
    }))
    .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
    .pipe(csso())
    .pipe(rename({suffix: '.min'}))
    .pipe(debug({title: 'Checking:'}))
    .pipe(gulp.dest(assetsDir.cssMin));
});

// task html
gulp.task('html', () => {
  return gulp.src(assetsDir.includes)
    .pipe(rmvHtmlComnts())
    .pipe(gulp.dest(''));
});

// task image
gulp.task('image', () => {
  return gulp.src(assetsDir.imagesAll)
    .pipe(imageminPngquant({quality: '65-80', speed: 4})())
    .pipe(debug({title: 'Checking:'}))
    .pipe(gulp.dest(assetsDir.imagesMin));
});


// this part response for all stuff with js
gulp.task('js', () => {
  return gulp.src(assetsDir.jsMain)
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
    .pipe(concat(assetsDir.jsMin))
    .pipe(changed(assetsDir.jsAll))
    .pipe(uglify())
    .pipe(debug({title: 'Checking:'}))
    .pipe(gulp.dest(''))
});

// watch changes and run tasks
gulp.task('watch', () => {
  gulp.watch(assetsDir.sassAll, ['css', 'jekyll-build', 'jekyll-rebuild']);
  gulp.watch(assetsDir.sassAllAll, ['css', 'jekyll-build', 'jekyll-rebuild']);
  gulp.watch(assetsDir.cssAll, ['css', 'jekyll-build', 'jekyll-rebuild']);
  gulp.watch(assetsDir.jsAll, ['js', 'jekyll-build', 'jekyll-rebuild']);
  gulp.watch(assetsDir.includes, ['jekyll-build', 'jekyll-rebuild']);
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
