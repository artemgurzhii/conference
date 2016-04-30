// document ready
document.addEventListener('DOMContentLoaded', () => {

});

// Selecting elements
var user = document.querySelector('.user');    // select first element that mathes this class
var user = document.querySelectoAll('.user');  // select al elements that mathes this class

// Attaching and removing event listeners
user.addEventListener('click', userFunc);
user.removeEventListener('mouseover', userFunc);

// Manipulating classes and attributes
var classes = user.classList; // return list of all classes
classes.add("red");           // add class red to user class list
classes.toggle("hidden");     // if classes have class 'hidden' it will delete it, other way it will add class 'hidden'

// Getting and setting element content
var userContent = user.textContent;   // return text content of element
user.textContent = " lorem ipsum";    // set new text content
var userContent = user.innerHTML;     // return html markup in current element

// Inserting and removing elements
var fries = document.createElement("div");
fries.innerHTML = '<li><h4> Fries </h4></li>';  // insert this html code in this element
user.appendChild(fries);                        // insert this piece of code in user

// Walking the DOM tree
user.addEventListener('click', function (e) {
  var parent = e.target.parentNode;
  var children = e.target.children;
  var previous = e.target.previousElementSibling;
  var next = e.target.nextElementSibling;
});

// Looping over arrays
var ninjaTurtles = ["Donatello", "Leonardo", "Michelangelo", "Raphael"];
ninjaTurtles.forEach(function (item, array, index) {
  console.log(item, array, index);
});

// Animations
var animation = btn[i].getAttribute('data-animation');
circle.classList.add(animation);
window.setTimeout(function () {
  circle.classList.remove(animation);
}, 1000);

// AJAX

var request = new XMLHttpRequest();
request.open('GET', '/_data/conf.json', true);
request.send();
request.onload = function (e) {
  if (request.readyState === 4) {
    // Check if the get was successful.
    if (request.status === 200) {
      console.lo(request.responseText);
    } else {
      console.log(request.status + ': ' + request.statusText);
    }
  }
};

// Catch errors:
request.onerror = function (e) {
  console.error(request.statusText);
};
// Using a small library, such as Reqwest, can make your job much easier.
reqwest({
    url: 'data.json',
    method: 'get',
    error: function (err) {
    },
    success: function (resp) {
        console.log(resp);
    }
});


// вместо for in loop
for (var prop in obj) {
  if (obj.hasOwnProperty(prop))
    console.log(prop); // => bar
}

// использовать ->
Object.keys(obj).forEach(prop => console.log(prop));


// use Self-Executing Functions
(function doSomething() {
  return {
    name: 'jeff',
    lastName: 'way'
  };
})();
