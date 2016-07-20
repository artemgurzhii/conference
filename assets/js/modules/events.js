// arguments - node element, event to trigger and function to execute
// addEvent function
const addEvent = (elem, type, func) => {
  if (elem.addEventListener) {
    elem.addEventListener(type, func, false);
  } else {
    elem.attachEvent(`on${type}`, func);
  }
};

// defining removeEvent function
const removeEvent = (elem, type, func) => {
  if (elem.removeEventListener) {
    elem.removeEventListener(type, func, false);
  } else {
    elem.detachEvent(`on${type}`, func);
  }
};

// exporting functions
module.exports = {
  addEvent,
  removeEvent
};