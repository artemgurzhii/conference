const addEvent = (elem, type, func) => {
  if (elem.addEventListener) {
    elem.addEventListener(type, func, false);
  } else {
    elem.attachEvent(`on${type}`, func);
  }
};

const removeEvent = (elem, type, func) => {
  if (elem.removeEventListener) {
    elem.removeEventListener(type, func, false);
  } else {
    elem.detachEvent(`on${type}`, func);
  }
};

module.exports = {
  addEvent,
  removeEvent
};
