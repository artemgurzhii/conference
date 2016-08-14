// all external links will have attribute target='_blank'
// rel='noopener' so the new page can't access your window object via window.opener
// and will open in new window
const links = document.querySelectorAll('a[href^="http"]');
if (typeof Array.prototype.forEach === 'function') {
  links.forEach(link => {
    if(!link.getAttribute('target')) {
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener');
    }
  });
} else {
  let i;
  let linksLength = links.length;
  for (i = 0; i < linksLength; i++) {
    if(!links[i].getAttribute('target')) {
      links[i].setAttribute('target', '_blank');
      links[i].setAttribute('rel', 'noopener');
    }
  }
}
