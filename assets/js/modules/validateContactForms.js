// importing functions
const addClass = require('./classes').addClass;
const hasClass = require('./classes').hasClass;
const removeClass = require('./classes').removeClass;
const addEvent = require('./events').addEvent;

// DOM Elements
const _form = document.querySelector('.feedback-contact');
const _submitBtn = _form.querySelector('.submit-feedback');
const _name = _form.querySelector('input[type="text"]');
const _email = _form.querySelector('input[type="email"]');

// defining validateForm function
// this function will addClass Valid if input value passed test, and Invalid class if didn't
const validateForm = (e, filter, inputField, invalidText, validClass, invalidClass) => {
  let testing = filter.test(inputField.value);
  const _para = document.createElement('p');

  if (inputField.value.length) {
    if (!testing) {
      if (typeof e.preventDefault === 'function') {
        e.preventDefault();
      } else {
        e.returnValue = false;
      }

      if (hasClass(inputField, validClass)) {
        removeClass(inputField, validClass);
      }
      if (!hasClass(inputField, invalidClass)) {
        addClass(inputField, invalidClass);
        _para.textContent = invalidText;
        inputField.parentNode.insertBefore(_para, inputField.nextElementSibling);
      }
    } else {
      if (inputField.parentNode.children.length === 3) {
        inputField.parentNode.removeChild(inputField.parentNode.lastElementChild);
        removeClass(inputField, 'invalid-input-value');
      }
      addClass(inputField, validClass);
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

// adding eventlisteners on submit-button-click
addEvent(_submitBtn, 'click', validateName);
addEvent(_submitBtn, 'click', validateEmail);
