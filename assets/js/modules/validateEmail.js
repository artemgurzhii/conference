let
    _form         = document.querySelector('form.feedback-contact'),
    _submitButton = _form.querySelector('.submit-feedback'),
    _input        = _form.querySelector('input[type="email"]');

let validateEmail = e => {
  let filter = /^(([^<>+()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  let testing = filter.test(_input.value);
  if (!testing) {
    e.preventDefault();
    _input.classList.add('invalid-email');
  }
};

_submitButton.addEventListener('click', validateEmail, false);
