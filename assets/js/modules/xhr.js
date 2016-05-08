function XHR(method, url, asyncLoad, callback) {
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
// XHR('GET', 'http://localhost:3000/data/conf.json', true, requestDataSearchInput);
