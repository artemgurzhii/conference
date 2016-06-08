let host = "http://artemgurzhii.github.io/";
if (window.location.host === host && window.location.protocol !== "https:") {
  window.location.protocol = "https:";
}

require('./modules/xhr');

if (window.location.href === 'http://localhost:3000/' || window.location.href.indexOf('page') > -1) {
  require('./libs/jekyllSearch');
  require('./libs/searchConfig');
  require('./modules/search');
}

if (window.location.href.indexOf('contact') > -1) {
  require('./modules/validateContactForms');
}
