// Plugins
import cp from 'child_process';

// Module
module.exports = options => done => cp.spawn('jekyll', ['build'], {stdio: 'inherit'}).on('close', done);
