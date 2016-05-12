let
    searchWrap   = document.querySelector('div.search-container'),
    searchInput  = searchWrap.querySelector('input.search-input'),
    searchIcon   = searchWrap.querySelector('i.clear-search-input'),
    searchList   = searchWrap.querySelector('ul.search-results-list');

let deleteSearchList = () => {
  while(searchList.firstChild) {
    searchList.removeChild(searchList.firstChild);
  }
  searchInput.value = '';
}

searchIcon.addEventListener('click', deleteSearchList, false);
document.body.addEventListener('click', deleteSearchList, false);
