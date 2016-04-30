(function($) {
  document.addEventListener('DOMContentLoaded', () => {
    "use stict";

    let tags = [
      "article",
      "video",
      "audio",
      "aside",
      "footer",
      "header",
      "main",
      "nav",
      "section",
      "time",
    ];

    for(let i = 0, l = tags.length; i < l; i++) {
      document.createElement(tags[i]);
    }

    let
        body         = document.querySelector('body'),
        menu         = document.querySelector('#menu'),
        sidebar      = document.querySelector('#sidebar'),
        main         = document.querySelector('#main'),
        search       = document.querySelectorAll('.search'),
        search_icon  = document.querySelector('.search i.fa-search'),
        search_link  = document.querySelector('.search a[href="#search"]'),
        search_form  = document.querySelector('.search .search-form'),
        search_input = document.querySelector('.search .search-form > input');

    search_link.addEventListener('click', navbarSearchClick, false);
    search_input.addEventListener('keydown', navbarSearchKeydown, false);
    search_input.addEventListener('blur', navbarSearchBlur, false);

    function navbarSearchBlur() {
      search_icon.classList.remove('active');
      search_form.classList.remove('visible');
    }

    function navbarSearchClick(e) {
      e.preventDefault();
      if (search_form.className !== 'visible') {
        search_input.focus();
        search_icon.classList.toggle('active');
        search_form.classList.toggle('visible');
      }
    }

    function navbarSearchKeydown(e) {
      if ((e.keyCode === 13 || e.which === 13) && search_input.value.length === 0) {
        search_input.blur();
        return false;
      }
    }

  });
})(jQuery);

const XHR = function(method, url, asyncLoad, callback) {
    let request = new XMLHttpRequest();
    request.onload = function (e) {
      if (request.readyState === 4) {
        if (request.status === 200) {
          callback(request.responseText);
        } else {
          console.log(request.status + ': ' + request.statusText);
        }
      }
    };
  request.open(method, url, asyncLoad);
  request.send();
};

let requestDataSearchInput = data => {
  let a = JSON.parse(data);
  console.log(a[0].link);
};
XHR('GET', 'http://localhost:3000/data/conf.json', true, requestDataSearchInput);


(function($) {
  var substringMatcher = function(strs) {
  return function findMatches(q, cb) {
    var matches, substringRegex;

    // an array that will be populated with substring matches
    matches = [];

    // regex used to determine if a string contains the substring `q`
    substrRegex = new RegExp(q, 'i');

    // iterate through the pool of strings and for any string that
    // contains the substring `q`, add it to the `matches` array
    $.each(strs, function(i, str) {
      if (substrRegex.test(str)) {
        matches.push(str);
      }
    });

    cb(matches);
  };
};

var states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California',
  'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii',
  'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana',
  'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota',
  'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
  'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota',
  'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island',
  'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
  'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
];

$('.typeahead').typeahead({
  hint: true,
  highlight: true,
  minLength: 1
},
{
  name: 'states',
  source: substringMatcher(states)
});
})();
