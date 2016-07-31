// importing functions
const addEvent = reuqire('./events').addEvent;

// defining XHR(request) function
function XHR(url) {
  return new Promise((resolve, reject) => {
    let request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.send(null);
    addEvent(request, 'readystatechange', () => {
      if (request.status === 200) {
        if (request.readyState === 4) {
          resolve(JSON.parse(request.response));
        }
      } else {
        reject(`XMLHttpRequest rejected with status ${request.status}: ${request.statusText}`);
      }
    }, false);
  });
}

// exporting function
module.exports = {
  XHR
};

// Usage
// XHR('http://localhost:3000/data/search.json')
//   .then(result => console.log(JSON.stringify(result, null, 2)))
//   .catch(error => new Error(error));
