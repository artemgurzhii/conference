jekyllSearch({
  input: document.getElementsByClassName('search-input')[0],
  results: document.getElementsByClassName('search-results-list')[0],
  template: '<li><a href="{url}">{title} - {date}</a></li>',
  json: 'data/search.json',
  noResults: '<li>No results found</li>',
  limit: 10,
  fuzzy: true
});
