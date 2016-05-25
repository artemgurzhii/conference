(function e(t, n, r) {
  function s(o, u) {
    if (!n[o]) {
      if (!t[o]) {
        let a = typeof require === "function" && require;
        if (!u && a) {
          return a(o, !0);
        }
        if (i) {
          return i(o, !0);
        }
        throw new Error("Cannot find module '" + o + "'");
      }
      let f = n[o] = {
        exports: {}
      };
      t[o][0].call(f.exports, e => {
        let n = t[o][1][e];
        return s(n ? n : e);
      }, f, f.exports, e, t, n, r);
    }
    return n[o].exports;
  }
  let i = typeof require === "function" && require,
      rLength = r.length;

  for (let o = 0; o < rLength; o += 1) {
    s(r[o]);
  }
  return s;
})({
  1: [(require, module, exports) => {

      let XHR = (xhr, callback)  => {
        return () => {
          if (xhr.readyState === 4) {
            if (xhr.status === 200) {
              callback(null, JSON.parse(xhr.responseText));
            } else {
              callback(xhr.status + ': ' + xhr.statusText);
            }
          } else {
            return;
          }
        };
      };

      const load = (location, callback) => {
        let request = new XMLHttpRequest();
        request.open('GET', location, true);
        request.send();
        request.onreadystatechange = XHR(request, callback);
      };

      module.exports = {
        load: load
      };

  }, {}],
  2: [(require, module, exports) => {

      module.exports = function OptsValidate(params) {

        let validateParams = params => {
          if (!params) {
            return false;
          }
          return params.required !== undefined && params.required instanceof Array;
        };

        if (!validateParams(params)) {
          throw new Error('Options Validator: required options missing');
        }
        if (!(this instanceof OptsValidate)) {
          return new OptsValidate(params);
        }

        let requiredOptions = params.required;

        this.getRequiredOptions = () => {
          return requiredOptions;
        };

        this.validate = param =>  {
          let errors = [];
          requiredOptions.forEach((requiredName) => {
            if (param[requiredName] === undefined) {
              errors.push(requiredName);
            }
          });
          return errors;
        };

      };
  }, {}],
  3: [(require, module, exports) => {

      let fuzzySearch = require('./searchType/fuzzySearch');
      let literalSearch = require('./searchType/literalSearch');

      let data = [];
      let opt = {};
      opt.fuzzy = false;
      opt.limit = 10;
      opt.searchStrategy = opt.fuzzy ? fuzzySearch : literalSearch;


      let put = data => {
        if (isObject(data)) {
          return addObject(data);
        }
        if (isArray(data)) {
          return addArray(data);
        }
        return undefined;
      };

      let clear = () => {
        data.length = 0;
        return data;
      };

      let get = () => {
        return data;
      };

      let isObject = obj => {
        return !!obj && Object.prototype.toString.call(obj) === '[object Object]';
      };

      let isArray = obj => {
        return !!obj && Object.prototype.toString.call(obj) === '[object Array]';
      };

      let addObject = _data => {
        data.push(_data);
        return data;
      };

      let addArray = _data => {
        let added = [],
            dataLength =_data.length,
            i;
        for (i = 0; i < dataLength; i++) {
          if (isObject(_data[i])) {
            added.push(addObject(_data[i]));
          }
        }
        return added;
      };

      let search = crit => {
        if (!crit) {
          return [];
        }
        return findMatches(data, crit, opt.searchStrategy, opt);
      };

      let setOptions = (_opt = {}) => {
        opt.fuzzy = _opt.fuzzy || false;
        opt.limit = _opt.limit || 10;
        opt.searchStrategy = _opt.fuzzy ? fuzzySearch: literalSearch;
      };

      let findMatches = (data, crit, strategy, opt) => {
        let matches = [];
        let i;
        let dataLength = data.length;
        let matchesLength = matches.length;
        for (i = 0; i < dataLength && matchesLength < opt.limit; i++) {
          let match = findMatchesInObject(data[i], crit, strategy, opt);
          if (match) {
            matches.push(match);
          }
        }
        return matches;
      };

      let findMatchesInObject = (obj, crit, strategy, opt) => {
        for (let key in obj) {
          if (obj.hasOwnProperty(key)) {
            if (!isExcluded(obj[key], opt.exclude) && strategy.matches(obj[key], crit)) {
              return obj;
            }
          }
        }
      };

      let isExcluded = (term, excludedTerms = []) => {
        let excluded = false,
            excTermsLength = excludedTerms.length,
            i;
        for (i = 0; i < excTermsLength; i++) {
          let excludedTerm = excludedTerms[i];
          if (!excluded && new RegExp(term).test(excludedTerm)) {
            excluded = true;
          }
        }
        return excluded;
      };

      module.exports = {
        put: put,
        clear: clear,
        get: get,
        search: search,
        setOptions: setOptions
      };

  }, {
      "./searchType/fuzzySearch": 4,
      "./searchType/literalSearch": 5
  }],
  4: [(require, module, exports) => {

      function fuzzySearch() {
        this.matches = (string, crit) => {
          if (typeof string !== 'string' || typeof crit !== 'string') {
            return false;
          }
          let fuzzy = crit.split("")
            .reduce((a, b) => a + '[^' + b + ']*' + b);
          fuzzy = new RegExp(fuzzy, 'gi');
          return !!fuzzy.test(string);
        };
      }

      module.exports = new fuzzySearch();

  }, {}],
  5: [(require, module, exports) => {

      function literalSearch() {
        this.matches = (string, crit) => {
          if (typeof string !== 'string') {
            return false;
          }
          string = string.trim();
          return string.toLowerCase().indexOf(crit.toLowerCase()) >= 0;
        };
      }

      module.exports = new literalSearch();

  }, {}],
  6: [(require, module, exports) => {

      let options = {};
      options.pattern = /\{(.*?)\}/g;
      options.template = '';
      options.middleware = () => {};

      let setOptions = _options => {
        options.template = _options.template || options.template;
        if (typeof _options.middleware === 'function') {
          options.middleware = _options.middleware;
        }
      };

      let compile = data => {
        return options.template.replace(options.pattern, (match, prop) => {
          let value = options.middleware(prop, data[prop], options.template);
          if (value !== undefined) {
            return value;
          }
          return data[prop] || match;
        });
      };

      module.exports = {
        compile: compile,
        setOptions: setOptions
      };

  }, {}],
  7: [(require, module, exports) => {
      ((window, document, undefined) => {

        let options = {
          input: null,
          results: null,
          json: [],
          template: '<li><a href="{url}" title="{desc}">{title}</a></li>',
          templateMiddleware: () => {},
          noResults: 'No results found',
          limit: 10,
          fuzzy: false,
          exclude: []
        };

        let requiredOptions = ['input', 'results', 'json'];
        let templater = require('./Template');
        let repository = require('./Repo');
        let jsonLoader = require('./JSONLoad');
        let optionsValidator = require('./OptsValidate')({
          required: requiredOptions
        });
        let utils = require('./utils');

        let initWithJSON = json => {
          repository.put(json);
          registerInput();
        };

        let initWithURL = url => {
          jsonLoader.load(url, (err, json) => {
            if (err) {
              throwError(`failed to get JSON (${url})`);
            }
            initWithJSON(json);
          });
        };

        window.jekyllSearch = _options => {
          let errors = optionsValidator.validate(_options);
          if (errors.length) {
            throwError(`You must specify the following required options: ${requiredOptions}`);
          }

          options = utils.merge(options, _options);

          templater.setOptions({
            template: options.template,
            middleware: options.templateMiddleware,
          });

          repository.setOptions({
            fuzzy: options.fuzzy,
            limit: options.limit,
          });

          if (utils.isJSON(options.json)) {
            initWithJSON(options.json);
          } else {
            initWithURL(options.json);
          }
        };

        // for backwards compatibility
        window.jekyllSearch.init = window.jekyllSearch;

        if (typeof window.SimpleJekyllSearchInit === 'function') {
          window.SimpleJekyllSearchInit.call(this, window.jekyllSearch);
        }

        let emptyResultsContainer = () => {
          options.results.innerHTML = '';
        };

        let appendToResultsContainer = text => {
          options.results.innerHTML += text;
        };

        let render = results => {
          let resLength = results.length,
              i;
          if (resLength === 0) {
            return appendToResultsContainer(options.noResults);
          }
          for (i = 0; i < resLength; i++) {
            appendToResultsContainer(templater.compile(results[i]));
          }
        };

        let isValidQuery = query => {
          return query && query.length > 0;
        };

        let isWhitelistedKey = key => {
          return [13, 16, 20, 37, 38, 39, 40, 91].indexOf(key) === -1;
        };

        function throwError(message) {
          throw new Error(`Jekyll Search - ${message}`);
        }

        function registerInput() {
          options.input.addEventListener('keyup', e => {
            let key = e.which;
            let query = e.target.value;
            if (isWhitelistedKey(key) && isValidQuery(query)) {
              emptyResultsContainer();
              render(repository.search(query));
            }
            if (options.input.value.length === 0) {
              emptyResultsContainer();
            }
          });
        }

      })(window, document);
  }, {
      "./JSONLoad": 1,
      "./OptsValidate": 2,
      "./Repo": 3,
      "./Template": 6,
      "./utils": 8
  }],
  8: [(require, module, exports) => {

      let merge = (defaultParams, mergeParams) => {
        let mergedOptions = {};
        for (let option in defaultParams) {
          if (defaultParams.hasOwnProperty(option)) {
            mergedOptions[option] = defaultParams[option];
            if (mergeParams[option] !== undefined) {
              mergedOptions[option] = mergeParams[option];
            }
          }
        }
        return mergedOptions;
      };

      let isJSON = json => {
        try {
          if (json instanceof Object && JSON.parse(JSON.stringify(json))) {
            return true;
          }
          return false;
        } catch (e) {
          return false;
        }
      };

      module.exports = {
        merge: merge,
        isJSON: isJSON,
      };

  }, {}]
}, {}, [7]);
