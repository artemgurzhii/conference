// arguments - node element and className to remove,add and check if has
// hasClass function
const hasClass = (elem, className) => {
  if (elem.classList) {
    return elem.classList.contains(className);
  } else {
    return !!elem.className.match(new RegExp(`(\\s|^)${className}(\\s|$)`));
  }
};

// addClass function
const addClass = (elem, className) => {
  if (elem.classList && !hasClass(elem, className)) {
    elem.classList.add(className);
  } else if (!hasClass(elem, className)) {
    elem.className += ` ${className}`;
  }
};

// removeClass function
const removeClass = (elem, className) => {
  if (elem.classList && hasClass(elem, className)) {
    elem.classList.remove(className);
  } else if (hasClass(elem, className)) {
    const reg = new RegExp(`(\\s|^)${className}(\\s|$)`);
    elem.className = elem.className.replace(reg, ' ');
  }
};

// exporting functions
module.exports = {
  addClass,
  hasClass,
  removeClass
};
