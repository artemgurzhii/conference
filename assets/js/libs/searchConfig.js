jekyllSearch({
  input: document.querySelector('.search-input'),
  results: document.querySelector('.search-results-list'),
  template: '<li><a href="https://artemgurzhii.github.io/conference{url}">{title} - {date}</a></li>',
  json: 'https://raw.githubusercontent.com/artemgurzhii/conference/gh-pages/data/search.json',
  noResults: '<li>No results found</li>',
  limit: 10,
  fuzzy: true
});
