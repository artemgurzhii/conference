let
  wrapper      = document.getElementById('wrapper'),
  main         = wrapper.querySelector('#main'),
  searchCont   = main.querySelector('div.search-container'),
  searchInput  = searchCont.querySelector('input.search-input'),
  searchIcon   = searchCont.querySelector('i.clear-search-input'),
  searchUl     = searchCont.querySelector('ul.search-results-list');

searchIcon.addEventListener('click', deleteSearchList, false);
document.body.addEventListener('click', deleteSearchList, false);

function deleteSearchList() {
  while(searchUl.firstChild) {
    searchUl.removeChild(searchUl.firstChild);
  }
  searchInput.value = '';
}
