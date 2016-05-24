require('./libs/geolocator');
require('./modules/xhr');

if ((window.location.href.indexOf('contact') > -1) || window.location.href === "http://localhost:3000/contact/") {
  require('./modules/validateEmail');
}

// if (window.location.href === "http://localhost:3000/") {
//   require('./libs/jekyllSearch');
//   require('./libs/searchConfig');
//   require('./modules/search');
// }

// (() => {
//   import geolocator from './libs/geolocator';
//   import xhr from './modules/xhr';
//   import validateEmail from './modules/validateEmail';
//   import jekyllSearch from './libs/jekyllSearch';
//   import searchConfig from './libs/searchConfig';
//   import search from './modules/search';
// })();
