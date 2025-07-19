window.addEventListener('DOMContentLoaded', (event) => {
  console.log('DOM fully loaded and parsed');

  const boldBtn = document.getElementById('boldBtn');
  const italicBtn = document.getElementById('italicBtn');
  const underlineBtn = document.getElementById('underlineBtn');

  boldBtn.addEventListener('click', () => {
    document.execCommand('bold', false, null);
  });

  italicBtn.addEventListener('click', () => {
    document.execCommand('italic', false, null);
  });

  underlineBtn.addEventListener('click', () => {
    document.execCommand('underline', false, null);
  });
});