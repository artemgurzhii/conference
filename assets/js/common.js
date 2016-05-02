(() => {
  document.addEventListener('DOMContentLoaded', () => {
    "use stict";

    let tags = [
      "article",
      "video",
      "audio",
      "aside",
      "footer",
      "header",
      "main",
      "nav",
      "section",
      "time",
    ];

    for(let i = 0, l = tags.length; i < l; i++) {
      document.createElement(tags[i]);
    }

    // function fo creating and appending new element to body
    function createNewElement(element) {
      let newElement = document.createElement(element);
      document.body.appendChild(newElement);
      return newElement;
    }

    let
        body         = document.querySelector('body'),
        menu         = document.querySelector('#menu'),
        sidebar      = document.querySelector('#sidebar'),
        main         = document.querySelector('#main');

    const XHR = function(method, url, asyncLoad, callback) {
        let request = new XMLHttpRequest();
        request.onload = function (e) {
          if (request.readyState === 4) {
            if (request.status === 200) {
              callback(request.responseText);
            } else {
              console.log(request.status + ': ' + request.statusText);
            }
          }
        };
      request.open(method, url, asyncLoad);
      request.send();
    };
    // XHR('GET', 'http://localhost:3000/data/conf.json', true, requestDataSearchInput);

    SimpleJekyllSearch({
      // input field where to write text
      searchInput: document.getElementsByClassName('search-input')[0],
      // result container
      resultsContainer: document.getElementsByClassName('search-results-container')[0],
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

  });
})();
