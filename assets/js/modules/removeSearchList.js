// importing functions
const addEvent = require('./events').addEvent;
const removeChilds = require('./removeChilds').removeChilds;

// DOM Elements
const _searchWrap  = document.querySelector('.search-container');
const _searchInput = _searchWrap.querySelector('.search-input');
const _searchIcon  = _searchWrap.querySelector('.clear-search-input');
const _searchList  = _searchWrap.querySelector('.search-results-list');

// defining remove_searchList function
const remove_searchList = () => removeChilds(_searchList, _searchInput);

// adding eventlistener on close icon click
addEvent(_searchIcon, 'click', remove_searchList);

// exporting function
module.exports = {
  removeChilds
};
