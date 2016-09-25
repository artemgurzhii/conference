if (window.location.href.includes('page') || window.location.href === 'https://artemgurzhii.github.io/conference/') {
  require('./libs/jekyllSearch');
  require('./libs/searchConfig');
  require('./modules/removeSearchList');
} else if (window.location.href.indexOf('contact') > -1) {
  require('./modules/validateContactForms');
} else if (window.location.href.indexOf('about') > -1) {

} else {
  require('./modules/post-read');
}

if ( 'serviceWorker' in navigator && (typeof Cache !== 'undefined' && Cache.prototype.addAll) ) {
  navigator.serviceWorker.register('/ServiceWorker.js');
}
