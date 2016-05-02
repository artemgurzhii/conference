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
      searchInput: document.getElementById('search-input'),
      resultsContainer: document.getElementById('results-container'),
      json: 'data/search.json',
      searchResultTemplate: '<li><a href="{url}">{title} - {date}</a></li>',
      noResultsText: 'No results found',
      limit: 10,
      fuzzy: false,
      exclude: ['Welcome']
    });

  });
})();
