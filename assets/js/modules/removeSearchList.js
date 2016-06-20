// importing addEvent and removeChilds functions
const addEvent = require('./events').addEvent;
const removeChilds = require('./removeChilds').removeChilds;

// main variables
const _searchWrap   = document.querySelector('.search-container');       // storing main div variable so it's not gonna search for entire body
const _searchInput  = _searchWrap.querySelector('.search-input');        // input to be cleared
const _searchIcon   = _searchWrap.querySelector('.clear-search-input');  // icon to click to remove childs
const _searchList   = _searchWrap.querySelector('.search-results-list'); // parent node where to remove childs

const remove_searchList = () => {            // defining remove_searchList function
  removeChilds(_searchList, _searchInput);  // defining elements
};

addEvent(_searchIcon, 'click', remove_searchList);  // calling function


module.exports = {
  removeChilds
};
