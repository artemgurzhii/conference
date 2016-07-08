// arguments - node element and className to remove,add and check if has
// defining hasClass function
const hasClass = (el, className) => {
  if (el instanceof HTMLElement) {
    if (el.classList) {
      return el.classList.contains(className);
    } else {
      return !!el.className.match(new RegExp(`(\\s|^)${className}(\\s|$)`));
    }
  } else {
    throw new Error('Error occurred: Problem with arguments or el type');
  }
};

// defining addClass function
const addClass = (el, className) => {
  if (el instanceof HTMLElement) {
    if (el.classList && !hasClass(el, className)) {
      el.classList.add(className);
    } else if (!hasClass(el, className)) {
      el.className += ` ${className}`;
    }
  } else {
    throw new Error('Error occurred: Problem with arguments or el type');
  }
};

// defining removeClass function
const removeClass = (el, className) => {
  if (el instanceof HTMLElement) {
    if (el.classList && hasClass(el, className)) {
      el.classList.remove(className);
    } else if (hasClass(el, className)) {
      const reg = /(\s|^)${className}(\s|$)/;
      el.className = el.className.replace(reg, ' ');
    }
  } else {
    throw new Error('Error occurred: Problem with arguments or element type');
  }
};

// exporting functions
module.exports = {
  addClass,
  hasClass,
  removeClass
};
