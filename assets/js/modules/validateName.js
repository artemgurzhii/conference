// Main variables
let
    _form         = document.querySelector('form.feedback-contact'),
    _submitButton = _form.querySelector('.submit-feedback'),
    _name         = _form.querySelector('input[type="text"]');

// validate name function
// ================
let validateName = e => {
  // filter for name validation
  let filter = /^[a-zA-Z ]{4,30}$/;
  // returning boolean value from testing
  let testing = filter.test(_name.value);
  let _para = document.createElement('p');
      _para.textContent = 'Invalid name';

  // if input not empty
  if (_name.value.length) {
    if (_name.value.length < 2 || _name.value.length > 30) {

    }
    // and if it didn't pass test
    if (!testing) {
      e.preventDefault();
      if (_name.classList.contains('valid-input-value')) {
        _name.classList.remove('valid-input-value');
      }

      if (!(_name.classList.contains('invalid-input-value'))) {
        _name.parentNode.insertBefore(_para, _name.nextSibling);
      }

      _name.classList.add('invalid-input-value');

    } else {

      if (_name.parentNode.children.length === 3) {
        _name.parentNode.removeChild(_name.parentNode.lastElementChild);
      }

      _name.classList.remove('invalid-input-value');
      _name.classList.add('valid-input-value');

    }
  }
};

// Calling validateName function on button click
_submitButton.addEventListener('click', validateName, false);
