window.addEventListener('message', (event) => {
  chrome.runtime.sendMessage(event.data);
});

chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {
  alert('hello from content script');
  window.postMessage({
    body: { color: document.querySelector('body').style.backgroundColor },
  });
});

// document.querySelector('body').style.backgroundColor = 'blue';
