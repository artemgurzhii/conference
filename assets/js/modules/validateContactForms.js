// imports
const addClass = require('./classes').addClass;
const hasClass = require('./classes').hasClass;
const removeClass = require('./classes').removeClass;
const addEvent = require('./events').addEvent;

// Main variables
const
    _form         = document.querySelector('form.feedback-contact'),
    _submitButton = _form.querySelector('.submit-feedback'),
    _name         = _form.querySelector('input[type="text"]'),
    _email        = _form.querySelector('input[type="email"]');

// validate form function
// ================
const validateForm = (e, filter, inputField, invalidText, validClass, invalidClass) => {
  const testing = filter.test(inputField.value);  // returning boolean value from testing
  const _para = document.createElement('p');      // creating paragraph
      _para.textContent = invalidText;          // and adding text content for invalid input value

  if (inputField.value.length) {                // if input not empty
    if (!testing) {                             // and if it DIDN'T pass test
      e.preventDefault();                       // prevent form from submission
      if (hasClass(inputField, validClass)) {   // if it has 'valid-input-value' class
        removeClass(inputField, validClass);    // remove it (green border)
      }
      if (!hasClass(inputField, invalidClass)) {                           // if it doesn't have 'invalid-input-value' class
        addClass(inputField, invalidClass);                                // add it (red border)
        inputField.parentNode.insertBefore(_para, inputField.nextSibling); // and add notify message
      }
    } else {                                                                       // if it DID pass test
      if (inputField.parentNode.children.length === 3) {                           // and if it already have notify message
        inputField.parentNode.removeChild(inputField.parentNode.lastElementChild); // remove message
        removeClass(inputField, 'invalid-input-value');                            // and remove 'invalid-input-value' class
      }
      addClass(inputField, validClass);                                            // and add 'valid-input-value' class (green border)
    }
  }
};

// name validation function
const validateName = () => {
  const validateNameFilter = /^[a-zA-Z а-яА-Я ]{4,30}$/;
  validateForm(event, validateNameFilter, _name, 'Invalid name', 'valid-input-value', 'invalid-input-value');
};

// email validation function
const validateEmail = () => {
  const validateEmailFilter = /^(([^<>+()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  validateForm(event, validateEmailFilter, _email, 'Invalid email', 'valid-input-value', 'invalid-input-value');
};

addEvent(_submitButton, 'click', validateName);  // adding event on 'name' input submit
addEvent(_submitButton, 'click', validateEmail); // adding event on 'email' input submit
