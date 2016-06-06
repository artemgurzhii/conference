let jsonUrl;
if (window.location.href === 'http://localhost:3000/') {
  jsonUrl = 'data/search.json';
} else {
  jsonUrl = '../../data/search.json';
}

jekyllSearch({
  input: document.getElementsByClassName('search-input')[0],
  results: document.getElementsByClassName('search-results-list')[0],
  template: '<li><a href="{url}">{title} - {date}</a></li>',
  json: jsonUrl,
  noResults: '<li>No results found</li>',
  limit: 10,
  fuzzy: true
});
