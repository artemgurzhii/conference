// Plugins
import del from 'del';

// Module
module.exports = options => () => del(options.src);
