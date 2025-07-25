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
      const markdown = editor.innerText;
      const html = converter.makeHtml(markdown);
      localStorage.setItem('editorContent', html);
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

  h1Btn.addEventListener('click', () => {
    document.execCommand('formatBlock', false, '<h1>');
    hideContextMenu();
  });

  h2Btn.addEventListener('click', () => {
    document.execCommand('formatBlock', false, '<h2>');
    hideContextMenu();
  });

  h3Btn.addEventListener('click', () => {
    document.execCommand('formatBlock', false, '<h3>');
    hideContextMenu();
  });

  linkBtn.addEventListener('click', () => {
    const url = prompt('Enter a URL:');
    if (url) {
      document.execCommand('createLink', false, url);
    }
    hideContextMenu();
  });

  listOlBtn.addEventListener('click', () => {
    document.execCommand('insertOrderedList', false, null);
    hideContextMenu();
  });

  listUlBtn.addEventListener('click', () => {
    document.execCommand('insertUnorderedList', false, null);
    hideContextMenu();
  });

  // Allow default Enter key behavior
  editor.addEventListener('keydown', (e) => {
    if(e.key === 'Enter') {
      // Allow default Enter key behavior (e.g., new paragraph/line)
      // The browser's default behavior for 'Enter' in a contenteditable element
      // typically handles newlines and formatting inheritance correctly.
    }
  });

  // Toggle main menu visibility
  mainMenuBtn.addEventListener('click', () => {
    mainMenu.style.display = mainMenu.style.display === 'block' ? 'none' : 'block';
  });

  // Hide main menu when clicking elsewhere
  document.addEventListener('click', (e) => {
    if (!mainMenu.contains(e.target) && !mainMenuBtn.contains(e.target)) {
      mainMenu.style.display = 'none';
    }
  });

  // New document
  newBtn.addEventListener('click', () => {
    editor.innerHTML = '';
    mainMenu.style.display = 'none';
  });

  // Open document
  openBtn.addEventListener('click', () => {
    fileInput.click();
  });

  fileInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const markdown = e.target.result;
        const html = converter.makeHtml(markdown);
        editor.innerHTML = html;
      };
      reader.readAsText(file);
    }
    mainMenu.style.display = 'none';
  });

  // Save document
  saveBtn.addEventListener('click', () => {
    const filename = prompt('Enter filename:', 'document.md');
    if (filename) {
      const html = editor.innerHTML;
      const markdown = converter.makeMarkdown(html);
      const blob = new Blob([markdown], { type: 'text/markdown' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
    mainMenu.style.display = 'none';
  });

  // Copy, Cut, Paste
  copyBtn.addEventListener('click', () => {
    document.execCommand('copy');
    hideContextMenu();
  });

  cutBtn.addEventListener('click', () => {
    document.execCommand('cut');
    hideContextMenu();
  });

  pasteBtn.addEventListener('click', () => {
    document.execCommand('paste');
    hideContextMenu();
  });
});
