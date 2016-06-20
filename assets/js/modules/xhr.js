// defining function
const XHR = (url = 'http://localhost:3000/data/search.json', callback = undefined) => {
  return new Promise((resolve, reject) => { // using promises ES6 feature
    let request = new XMLHttpRequest();     // creating request
    request.open('GET', url, true);         // opening request, type=GET, url=url, async=true
    request.send();                         // sending request
    request.onreadystatechange = () => {    // when getting response
      if (request.readyState === 4) {       // if request completed
        if (request.status === 200) {       // and completed successfully
          let parsed = JSON.parse(request.response);
          resolve(parsed);                  // resolving promise
        } else {
          reject(`XHR rejected ${request.status}: ${request.statusText}`);
        }
      } else {
        reject(`XHR rejected ${request.status}: ${request.statusText}`);
      }
    };
  });
};

// exporting module
module.exports = {
  XHR
};

// XHR()
//   .then(result => console.log(result)
//   .then(result2 => console.log(result2)
//   .catch(error => console.log(error);
