const XHR = (method, url, asyncLoad, callback) => {
  let request = new XMLHttpRequest();
  request.open(method, url, asyncLoad);
  request.send();
  request.onreadystatechange = () => {
    if (request.readyState === 4) {
      if (request.status === 200) {
        console.log(request.responseText);
      } else {
        console.log(request.status + ': ' + request.statusText);
      }
    } else {
      return;
    }
  };
}
// XHR('GET', 'http://localhost:3000/data/search.json', true);
