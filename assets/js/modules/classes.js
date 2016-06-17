const hasClass = (elem, className) => {
  if (elem.classList) {
    return elem.classList.contains(className);
  } else {
    return !!elem.className.match(new RegExp(`(\\s|^)${className}(\\s|$)`));
  }
};

const addClass = (elem, className) => {
  if (elem.classList) {
    elem.classList.add(className);
  } else if (!hasClass(elem, className)) {
    elem.className += ` ${className}`;
  }
};

const removeClass = (elem, className) => {
  if (elem.classList) {
    elem.classList.remove(className);
  } else if (hasClass(elem, className)) {
    const reg = new RegExp(`(\\s|^)${className}(\\s|$)`);
    elem.className = elem.className.replace(reg, ' ');
  }
};

module.exports = {
  addClass,
  hasClass,
  removeClass
};
