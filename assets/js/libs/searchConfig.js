let jsonUrl;
if (document.location.href.indexOf('page' > -1)) {
  jsonUrl = '../../data/search.json';
} else {
  jsonUrl = 'data/search.json';
}

jekyllSearch({
  input: document.querySelector('.search-input'),
  results: document.querySelector('.search-results-list'),
  template: '<li><a href="{url}">{title} - {date}</a></li>',
  json: jsonUrl,
  noResults: '<li>No results found</li>',
  limit: 10,
  fuzzy: true
});
