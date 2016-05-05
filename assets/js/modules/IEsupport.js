function ieTags() {
  let tags = [
    "article",
    "video",
    "audio",
    "aside",
    "footer",
    "header",
    "main",
    "nav",
    "section",
    "time",
  ];

  for(let i = 0, l = tags.length; i < l; i++) {
    document.createElement(tags[i]);
  }
};
