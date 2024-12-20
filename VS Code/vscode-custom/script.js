document.addEventListener('DOMContentLoaded', function () {
  const checkElement = setInterval(() => {
    const commandDialog = document.querySelector('.quick-input-widget');

    if (commandDialog) {
      // Check if the command palette element is visible for the first time.
      if (commandDialog.style.display !== 'none') {
        applyBlur();
      }

      observeCommandDialog(commandDialog);
      clearInterval(checkElement);
    }
  }, 500); // Check every 0.5s

  function observeCommandDialog(commandDialog) {
    const observer = new MutationObserver(() => {
      if (commandDialog.style.display !== 'none') {
        applyBlur();
      } else {
        removeBlur();
      }
    });

    observer.observe(commandDialog, { attributes: true });
  }

  function applyBlur() {
    const wholeWindow =
      '.monaco-workbench .monaco-scrollable-element > .split-view-container';
    const editorWindow = '.monaco-workbench .part.editor > .content';

    let targetDiv = document.querySelector(editorWindow);

    const monacoContainers = Array.from(document.querySelectorAll(wholeWindow));
    if (monacoContainers.length > 1) {
      targetDiv = monacoContainers[1];
    }

    let blurElement = document.getElementById('bg-blur');

    if (!blurElement) {
      blurElement = document.createElement('div');
      blurElement.setAttribute('id', 'bg-blur');
      blurElement.addEventListener('click', removeBlur);
      targetDiv.appendChild(blurElement);
    }
  }

  function removeBlur() {
    const blurElement = document.getElementById('bg-blur');
    if (blurElement) {
      blurElement.remove();
    }
  }
});
