// DOM Elements
const _store = document.querySelector('.post-main-page');
const _txt = _store.querySelectorAll('.text-count');
const _charCount = _store.querySelector('.chars-length');
const _readTime = _store.querySelector('.read-time');

// iterations
let i;
let newTxtString;
const len = _txt.length;
for (i = 0; i < len; i++) {
  newTxtString += _txt[i].textContent;
}

// Math operations with time to get time in minutes and seconds
let seconds = Math.floor(newTxtString.match(/\b[-?(\w+)?]+\b/gi).length * 60 / 275);
let minutes = Math.floor(seconds / 60);

// removing spaces from string and setting number of characters in string to new string length
_charCount.textContent = newTxtString
  .replace(/ /gi, '')
  .length;

// display seconds/minutes and seconds if needed
if (seconds > 60) {
  seconds = seconds - minutes * 60;
  _readTime.textContent = `${minutes}m ${seconds}s`;
} else {
  _readTime.textContent = `${seconds}s`;
}
