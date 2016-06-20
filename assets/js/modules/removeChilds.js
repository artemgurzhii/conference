let removeChilds = (removeElem, clearVal) => {     // remove childs from body function
  while(removeElem.firstChild) {                   // while parent have childs
    removeElem.removeChild(removeElem.firstChild); // remove them
  }
  if (clearVal) {         // if there any field that needs to be cleared
    clearVal.value = '';  // clear it
  }
};

// exporting function
module.exports = {
  removeChilds
};
