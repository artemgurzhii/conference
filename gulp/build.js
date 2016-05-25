// Plugins
const $ = require('gulp-load-plugins')();
import {obj as combiner} from 'stream-combiner2';
import cp                from 'child_process';
import browserSync       from 'browser-sync';
import gulp              from 'gulp';

// Dev
const jekyll = process.platform === 'win32' ? 'jekyll.bat' : 'jekyll';
const msgBuild = '<span>Running:</span> jekyll build';

// Module
module.exports = options => {
  return done => {
    return cp.spawn(jekyll, ['build'], {stdio: 'inherit'}).on('close', done);
  };
};
