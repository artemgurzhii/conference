// Main Variables
// Selecting Elements
const store = document.querySelector('.post-main-page');// Storing container class so it will not search for entire document body
const txt = store.querySelectorAll('.text-count');     // Getting number of words in post
const charCount = store.querySelector('.chars-length'); // Getting span element where to put number of CHARACTERS
const readTime = store.querySelector('.read-time');     // Getting span element where to put reading time

// iterations
let i;                  // iterated variable
let newTxtString;       // creating new string where is gonna be all text
const len = txt.length; // storing txt array length so it didn't recalculate each time

for (i = 0; i < len; i++) {
  newTxtString += txt[i].textContent;
}

// Math operations with time
let seconds = Math.floor(newTxtString.match(/\b[-?(\w+)?]+\b/gi).length * 60 / 275);
let minutes = Math.floor(seconds / 60);

charCount.textContent = newTxtString
  .replace(/ /gi, '') // removing space from text
  .length;            // getting length of text after cleaning

if (seconds > 60) {
  seconds = seconds - minutes * 60;
  readTime.innerHTML = `${minutes}m ${seconds}s`;
} else {
  readTime.innerHTML = `${seconds}s`;
}
