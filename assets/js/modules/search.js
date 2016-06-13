const addEvent = require('./events').addEvent;

let
    _searchWrap   = document.querySelector('div.search-container'),
    _searchInput  = _searchWrap.querySelector('input.search-input'),
    _searchIcon   = _searchWrap.querySelector('i.clear-search-input'),
    _searchList   = _searchWrap.querySelector('ul.search-results-list');

let remove_searchList = () => {
  while(_searchList.firstChild) {
    _searchList.removeChild(_searchList.firstChild);
  }
  _searchInput.value = '';
};

addEvent(_searchIcon, 'click', remove_searchList);
