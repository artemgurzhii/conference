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
}

_searchIcon.addEventListener('click', remove_searchList, false);
