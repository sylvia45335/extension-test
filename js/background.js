chrome.runtime.onInstalled.addListener(() => {
  console.log('hello Jackie');
});

async function getCurrentTab() {
  let queryOptions = { active: true, lastFocusedWindow: true };
  // `tab` will either be a `tabs.Tab` instance or `undefined`.
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}

chrome.runtime.onConnect.addListener((port) => {
  const tab = getCurrentTab();
  console.log(tab);
  let backgroundPort = port;

  backgroundPort.onMessage.addListener((message, sender, sendResponse) => {
    console.log(message);

    // chrome.scripting.executeScript({
    //   target: { tabId: tab.id },
    //   files: ['/js/contentScript.js'],
    // });
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      console.log(tab);
      //   chrome.scripting.executeScript({
      //     target: { tabId: tabs[0].id },
      //     files: ['/js/contentScript.js'],
      //   });

      function change(color) {
        document.querySelector('body').style.backgroundColor = color;
      }

      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id, allFrames: true },
        func: change,
        args: [message.body],
      });

      chrome.tabs.sendMessage(tabs[0].id, {
        body: message.body,
      });
    });
  });
});
