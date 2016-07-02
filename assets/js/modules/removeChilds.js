// defining removeChilds function
// this function will remove all childrens from element and clear input value if needed
let removeChilds = (removeElem, clearVal) => {
  while(removeElem.firstElementChild) {
    removeElem.removeChild(removeElem.firstElementChild);
  }
  if (clearVal) {
    clearVal.value = '';
  }
};

// exporting function
module.exports = {
  removeChilds
};
