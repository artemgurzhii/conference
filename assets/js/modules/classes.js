// arguments - node element and className to remove, add and check if has
// defining hasClass function
function hasClass(el, className) {
  if (el instanceof HTMLElement) {
    if (el.classList) {
      return el.classList.contains(className);
    } else {
      return !!el.className.match(new RegExp(`(\\s|^)${className}(\\s|$)`));
    }
  } else {
    throw new Error('Argument at first position is not instance of HTMLElement');
  }
}

// defining addClass function
function addClass(el, className) {
  if (el instanceof HTMLElement) {
    if (el.classList && !hasClass(el, className)) {
      el.classList.add(className);
    } else if (!hasClass(el, className)) {
      el.className += ` ${className}`;
    }
  } else {
    throw new Error('Argument at first position is not instance of HTMLElement');
  }
}

// defining removeClass function
function removeClass(el, className) {
  if (el instanceof HTMLElement) {
    if (el.classList && hasClass(el, className)) {
      el.classList.remove(className);
    } else if (hasClass(el, className)) {
      const reg = /(\s|^)${className}(\s|$)/;
      el.className = el.className.replace(reg, ' ');
    }
  } else {
    throw new Error('Argument at first position is not instance of HTMLElement');
  }
}

// defining toggleClass function
function toggleClass(el, className) {
  return hasClass(el, className) ? removeClass(el, className) : addClass(el, className);
}

// exporting functions
module.exports = {
  addClass,
  hasClass,
  removeClass,
  toggleClass
};
