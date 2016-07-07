if (window.location.href.indexOf('page') > -1 || window.location.href === 'https://artemgurzhii.github.io/conference/' ) {
  require('./libs/jekyllSearch');
  require('./libs/searchConfig');
  require('./modules/removeSearchList');
} else {
  if (window.location.href.indexOf('contact') > -1) {
    require('./modules/validateContactForms');
  } else if (window.location.href.indexOf('about') > -1) {

  } else {
    require('./modules/post-read');
  }
}

require('./modules/xhr');
