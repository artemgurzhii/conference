const XHR = (method = 'GET', url, asyncLoad = true, callback = null) => {
  return new Promise((resolve, reject) => {
    let request = new XMLHttpRequest();
    request.open(method, url, asyncLoad);
    request.send();
    request.onreadystatechange = () => {
      if (request.readyState === 4) {
        if (request.status === 200) {
          let parsed = JSON.parse(request.response);
          resolve(parsed);
        } else {
          reject(request.status + ': ' + request.statusText);
        }
      } else {
        return;
      }
    };
  });
};
// XHR('GET', 'http://localhost:3000/data/search.json', true);

// module.exports = {
//
// }
