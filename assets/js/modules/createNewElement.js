function createNewElement(element = 'DIV') {
  let newElement = document.createElement(element);
  document.body.appendChild(newElement);
  return newElement;
}
