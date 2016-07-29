const externalLink = document.querySelectorAll('a[href^="http"]');
let i;
let linksLength = externalLinks.length;
for (i = 0; i < linksLength; i++) {
  if(!externalLinks[i].getAttribute('target')) {
    externalLinks[i].setAttribute('target', '_blank');
  }
}
