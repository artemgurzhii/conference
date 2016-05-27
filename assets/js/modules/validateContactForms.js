// Classes manipulation
let hasClass = (el, className) => {
  if (el.classList) {
    return el.classList.contains(className);
  } else {
    return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
  }
};

let addClass = (el, className) => {
  if (el.classList) {
    el.classList.add(className);
  } else if (!hasClass(el, className)) {
    el.className += " " + className;
  }
};

let removeClass = (el, className) => {
  if (el.classList) {
    el.classList.remove(className);
  } else if (hasClass(el, className)) {
    let reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
    el.className = el.className.replace(reg, ' ');
  }
};

// Main variables
let
    _form         = document.querySelector('form.feedback-contact'),
    _submitButton = _form.querySelector('.submit-feedback'),
    _name         = _form.querySelector('input[type="text"]'),
    _email        = _form.querySelector('input[type="email"]');


// validate form function
// ================
let validateForm = (e, filter, inputField, invalidText) => {
  let testing = filter.test(inputField.value);         // returning boolean value from testing
  let _para = document.createElement('p');             // creating paragraph
      _para.textContent = invalidText;                 // and adding text content for NOT valid name

  if (inputField.value.length) {                       // if input not empty
    if (!testing) {                                    // and if it DIDN'T pass test
      e.preventDefault();                              // prevent form from submission
      if (hasClass(inputField, 'valid-input-value')) { // if it has 'valid-input-value' class
        removeClass(inputField, 'valid-input-value');  // remove it
      }

      if (!hasClass(inputField, 'invalid-input-value')) {                  // if it doesn't have 'invalid-input-value' class
        addClass(inputField, 'invalid-input-value');                       // add it (red border)
        inputField.parentNode.insertBefore(_para, inputField.nextSibling); // and add notify meassage
      }

    } else {                                                                       // if it DID pass test

      if (inputField.parentNode.children.length === 3) {                           // and if it already have notify message
        inputField.parentNode.removeChild(inputField.parentNode.lastElementChild); // remove message
        removeClass(inputField, 'invalid-input-value');                            // and remove 'invalid-input-value' class
      }

      addClass(inputField, 'valid-input-value');                                   // and add 'valid-input-value' class (green border)

    }

  }

};

// name validation function
let validateName = () => {
  validateForm(event, /^[a-zA-Z а-яА-Я ]{4,30}$/, _name, 'Invalid name');
}

// email validation function
let validateEmail = () => {
  validateForm(event, /^(([^<>+()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, _email, 'Invalid email');
}

_submitButton.addEventListener('click', validateName, false);  // adding event on 'name' input submit
_submitButton.addEventListener('click', validateEmail, false); // adding event on 'email' input submit
