// Enable right click and print
/*document.addEventListener('DOMContentLoaded', () => {
  document.oncontextmenu = null;
  document.onkeydown = null;
  document.body.style.userSelect = 'text';
});

// Try to extract PDF
setTimeout(() => {
  const iframes = document.querySelectorAll('iframe');
  iframes.forEach((iframe) => {
    if (iframe.src.includes('.pdf') || iframe.src.startsWith('blob:')) {
      console.log('PDF Found:', iframe.src);
    }
  });
}, 3000);*/