let
    _submitButton = document.querySelector('.submit-feedback'),
    _input        = document.querySelector('input[type="email"]'),
    _showNotif    = document.querySelector('.email-form.email');
let validateEmail = e => {
  let filter = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  let testing = filter.test(_input.value);
  if (!testing) {
    e.preventDefault();
    let div = document.createElement('DIV');
    div.setAttribute('class', 'incorrect-email');
    div.innerHTML = '<p>Please enter correct email address</p>';
    _showNotif.appendChild(div);
    return div;
  }
};

_submitButton.addEventListener('click', validateEmail, false);
