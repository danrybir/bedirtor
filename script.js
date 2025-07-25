window.addEventListener('DOMContentLoaded', (event) => {
  const editor = document.getElementById('editor');
  let saveTimeout;

  const savedContent = localStorage.getItem('editorContent');
  if (savedContent) {
    editor.innerHTML = savedContent;
  }

  // saving
  editor.addEventListener('input', () => {
    clearTimeout(saveTimeout);
    saveTimeout = setTimeout(() => {
      localStorage.setItem('editorContent', editor.innerHTML);
    }, 500); // Save after 500ms of inactivity
  });
  const contextMenu = document.getElementById('contextMenu');
  const boldBtn = document.getElementById('boldBtn');
  const italicBtn = document.getElementById('italicBtn');
  const underlineBtn = document.getElementById('underlineBtn');
  const h1Btn = document.getElementById('h1Btn');
  const h2Btn = document.getElementById('h2Btn');
  const h3Btn = document.getElementById('h3Btn');
  const linkBtn = document.getElementById('linkBtn');
  const listOlBtn = document.getElementById('listOlBtn');
  const listUlBtn = document.getElementById('listUlBtn');

  const mainMenuBtn = document.getElementById('mainMenuBtn');
  const mainMenu = document.getElementById('mainMenu');
  const newBtn = document.getElementById('newBtn');
  const openBtn = document.getElementById('openBtn');
  const fileInput = document.getElementById('fileInput');
  const saveBtn = document.getElementById('saveBtn');
  const copyBtn = document.getElementById('copyBtn');
  const cutBtn = document.getElementById('cutBtn');
  const pasteBtn = document.getElementById('pasteBtn');
  const converter = new showdown.Converter();

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

  const toggleHeading = (heading) => {
    if (document.queryCommandValue('formatBlock') === heading) {
      document.execCommand('formatBlock', false, 'div');
    } else {
      document.execCommand('formatBlock', false, `<${heading}>`);
    }
    hideContextMenu();
  };

  const toggleHeading = (heading) => {
    if (document.queryCommandValue('formatBlock') === heading) {
      document.execCommand('formatBlock', false, 'div');
    } else {
      document.execCommand('formatBlock', false, `<${heading}>`);
    }
    editor.focus(); // Keep focus
    hideContextMenu();
  };

  boldBtn.addEventListener('click', () => {
    document.execCommand('bold', false, null);
    editor.focus();
    hideContextMenu();
  });

  italicBtn.addEventListener('click', () => {
    document.execCommand('italic', false, null);
    editor.focus();
    hideContextMenu();
  });

  underlineBtn.addEventListener('click', () => {
    document.execCommand('underline', false, null);
    editor.focus();
    hideContextMenu();
  });

  h1Btn.addEventListener('click', () => {
    toggleHeading('h1');
  });

  h2Btn.addEventListener('click', () => {
    toggleHeading('h2');
  });

  h3Btn.addEventListener('click', () => {
    toggleHeading('h3');
  });

  linkBtn.addEventListener('click', () => {
    const url = prompt('Enter a URL:');
    if (url) {
      document.execCommand('createLink', false, url);
    }
    editor.focus();
    hideContextMenu();
  });

  listOlBtn.addEventListener('click', () => {
    document.execCommand('insertOrderedList', false, null);
    editor.focus();
    hideContextMenu();
  });

  listUlBtn.addEventListener('click', () => {
    document.execCommand('insertUnorderedList', false, null);
    editor.focus();
    hideContextMenu();
  });

  copyBtn.addEventListener('click', () => {
    document.execCommand('copy');
    editor.focus();
    hideContextMenu();
  });

  cutBtn.addEventListener('click', () => {
    document.execCommand('cut');
    editor.focus();
    hideContextMenu();
  });

  pasteBtn.addEventListener('click', async () => {
    try {
      const text = await navigator.clipboard.readText();
      document.execCommand('insertText', false, text);
    } catch (err) {
      console.error('Failed to read clipboard contents: ', err);
      // Fallback for older browsers or if permission is denied
      document.execCommand('paste');
    }
    editor.focus();
    hideContextMenu();
  });
});
