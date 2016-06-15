const XHR = (method = 'GET', url = 'http://localhost:3000/data/search.json', asyncLoad = true, callback = undefined) => {
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
          reject(`XHR request was rejected with ${request.status}: ${request.statusText}`);
        }
      } else {
        reject(`XHR request was rejected with ${request.status}: ${request.statusText}`);
      }
    };
  });
};

module.exports = {
  XHR
};


// XHR()
//   .then(
//     result => console.log(result);
//   ).catch(
//     error => console.log(error);
//   )
