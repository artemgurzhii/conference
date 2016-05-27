const XHR = (method = 'GET', url = 'http://localhost:3000/data/search.json', asyncLoad = true, callback = null) => {
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
// XHR()
//   .then(
//     result => alert(result),
//     error => alert(error)
//   );


//
// let postDate = post.date;
// let today = curr.date;
// if (postDate > today) {
//   let sort = (post1, post2) => {
//     if (post1.date > post2.date) {
//       return post2.date;
//     } else {
//       return post1.date;
//     }
//   }
// }
//
// let getAllPostsDate = post => {
//   let dates = [];
//   dates.push(post.date);
// }
//
//
//
// let dates;
// let sort = ()
