// importing addEvent function
const addEvent = require('./events').addEvent;

// main variables
let _searchWrap   = document.querySelector('div.search-container');
let _searchInput  = _searchWrap.querySelector('input.search-input');
let _searchIcon   = _searchWrap.querySelector('i.clear-search-input');
let _searchList   = _searchWrap.querySelector('ul.search-results-list');

// remove childs from body function
let removeChilds = (elemToRemove, clearValue) => {
  while(elemToRemove.firstChild) {
    elemToRemove.removeChild(elemToRemove.firstChild);
  }
  if (clearValue) {
    clearValue.value = '';
  }
};

let remove_searchList = () => {
  removeChilds(_searchList, _searchInput);
}

addEvent(_searchIcon, 'click', remove_searchList);
