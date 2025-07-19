window.addEventListener('DOMContentLoaded', (event) => {
  const editor = document.getElementById('editor');
  const contextMenu = document.getElementById('contextMenu');
  const boldBtn = document.getElementById('boldBtn');
  const italicBtn = document.getElementById('italicBtn');
  const underlineBtn = document.getElementById('underlineBtn');

  // Function to detect mobile
  const isMobile = () => {
    return /Mobi|Android/i.test(navigator.userAgent);
  };

  // Show context menu
  const showContextMenu = (e) => {
    e.preventDefault(); // Prevent default context menu
    // if(isMobile()) {
      contextMenu.style.display = 'block';
      contextMenu.style.left = `${e.clientX}px`;
      contextMenu.style.top = `${e.clientY}px`;
    // }
  };

  // Hide context menu
  const hideContextMenu = () => {
    contextMenu.style.display = 'none';
  };

  // Event listener for right-click (desktop) or long-press (mobile)
  editor.addEventListener('contextmenu', showContextMenu);
  document.addEventListener('click', hideContextMenu); // Hide when clicking elsewhere

  // Styling functions
  boldBtn.addEventListener('click', () => {
    document.execCommand('bold', false, null);
    hideContextMenu();
  });

  italicBtn.addEventListener('click', () => {
    document.execCommand('italic', false, null);
    hideContextMenu();
  });

  underlineBtn.addEventListener('click', () => {
    document.execCommand('underline', false, null);
    hideContextMenu();
  });
});
