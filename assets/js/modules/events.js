// arguments - node element, event to trigger and function to execute
// addEvent function
function addEvent(elem, type, func) {
  if (elem.addEventListener) {
    return elem.addEventListener(type, func, false);
  } else {
    return elem.attachEvent(`on${type}`, func);
  }
}

// defining removeEvent function
function removeEvent(elem, type, func) {
  if (elem.removeEventListener) {
    return elem.removeEventListener(type, func, false);
  } else {
    return elem.detachEvent(`on${type}`, func);
  }
}

// exporting functions
module.exports = {
  addEvent,
  removeEvent
};
