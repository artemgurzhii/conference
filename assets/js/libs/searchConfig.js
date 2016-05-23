if (window.location.href === "http://localhost:3000/") {
  SimpleJekyllSearch({
    searchInput: document.getElementsByClassName('search-input')[0],
    resultsContainer: document.getElementsByClassName('search-results-list')[0],
    searchResultTemplate: '<li><a href="{url}">{title} - {date}</a></li>',
    json: 'data/search.json',
    noResultsText: '<li>No results found</li>',
    limit: 10,
    fuzzy: true
  });
}
