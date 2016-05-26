// Main variables
let
    _form         = document.querySelector('form.feedback-contact'),
    _submitButton = _form.querySelector('.submit-feedback'),
    _email        = _form.querySelector('input[type="email"]');

// validate email function
// ================
let validateEmail = e => {
  // filter for email validation
  let filter = /^(([^<>+()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  // returning boolean value from testing
  let testing = filter.test(_email.value);
  let _para = document.createElement('p');
  _para.textContent = 'Invalid email';

  // if input not empty
  if (_email.value.length) {
    // and if it didn't pass test
    if (!testing) {
      e.preventDefault();
      if (_email.classList.contains('valid-input-value')) {
        _email.classList.remove('valid-input-value');
      }

      if (!(_email.classList.contains('invalid-input-value'))) {
        _email.parentNode.insertBefore(_para, _email.nextSibling);
      }

      _email.classList.add('invalid-input-value');

    } else {

      if (_email.parentNode.children.length === 3) {
        _email.parentNode.removeChild(_email.parentNode.lastElementChild);
      }

      _email.classList.remove('invalid-input-value');
      _email.classList.add('valid-input-value');

    }
  }
};

// Calling validateEmail function on button click
_submitButton.addEventListener('click', validateEmail, false);
