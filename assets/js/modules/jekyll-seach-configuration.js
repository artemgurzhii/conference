if (window.location.href === 'http://localhost:3000/') {
  SimpleJekyllSearch({
    // input field where to write text
    searchInput: document.getElementsByClassName('search-input')[0],
    // result container
    resultsContainer: document.getElementsByClassName('search-results-list')[0],
    // custom template for results
    searchResultTemplate: '<li><a href="{url}">{title} - {date}</a></li>',
    // json file for seaching
    json: 'data/search.json',
    // text to write when there is no matches
    noResultsText: '<li>No results found</li>',
    // limit of results
    limit: 10,
    // less restrictive matching (менее подробный поиск)
    fuzzy: false
  });

}
