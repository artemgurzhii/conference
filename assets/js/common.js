// if (window.location.href === "http://localhost:3000/") {
//   require('./libs/jekyllSearch');
//   require('./libs/searchConfig');
//   require('./modules/search');
// }

require('./libs/jekyllSearch');
require('./libs/searchConfig');
require('./modules/search');

require('./modules/xhr');
if ((window.location.href.indexOf('contact') > -1) || window.location.href === "http://localhost:3000/contact/") {
  require('./modules/validateEmail');
}

// require('./modules/mysearch');
