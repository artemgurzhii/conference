// defining XHR function
//
const XHR = (url = 'http://localhost:3000/data/search.json', callback = undefined) => {
  return new Promise((resolve, reject) => {
    let request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.send();
    request.onreadystatechange = () => {
      if (request.readyState === 4) {
        if (request.status === 200) {
          let parsed = JSON.parse(request.response);
          resolve(parsed);
        } else {
          reject(`XHR rejected ${request.status}: ${request.statusText}`);
        }
      } else {
        reject(`XHR rejected ${request.status}: ${request.statusText}`);
      }
    };
  });
};

// exporting function
module.exports = {
  XHR
};

// Usage
// XHR()
//   .then(result => console.log(result)
//   .then(result2 => console.log(result2)
//   .catch(error => console.log(error);
