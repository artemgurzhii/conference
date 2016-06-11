const addEvent = (elem, type, func) => {
  if (elem.addEventListener) {
    elem.addEventListener(type, func, false);
  } else {
    elem.attachEvent(`on${type}`, func);
  }
};

module.exports = {
  addEvent
};
