// importing addEvent function
const addEvent = require('./events').addEvent;

// main variables
let _searchWrap   = document.querySelector('div.search-container');
let _searchInput  = _searchWrap.querySelector('input.search-input');
let _searchIcon   = _searchWrap.querySelector('i.clear-search-input');
let _searchList   = _searchWrap.querySelector('ul.search-results-list');

// remove childs from body function
let removeChilds = (elemToRemove, clearValue) => {
  // removing childs while there is childs
  while(elemToRemove.firstChild) {
    elemToRemove.removeChild(elemToRemove.firstChild);
  }
  // if there any field that needs to be cleared
  if (clearValue) {
    clearValue.value = '';
  }
};

// defining remove_searchList function
let remove_searchList = () => {
  removeChilds(_searchList, _searchInput);
}

// calling function
addEvent(_searchIcon, 'click', remove_searchList);
