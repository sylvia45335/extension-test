// const handleClick = () => {
//   document.querySelector('body').style.backgroundColor = 'blue';
// };
let port;

function newColor(color) {
  const newButton = document.createElement('button');
  newButton.innerText = color;
  document.querySelector('body').appendChild(newButton);
}

const connectPort = () => {
  port = chrome.runtime.connect();
  port.postMessage({
    body: 'pink',
  });

  port.onMessage.addListener((message, sender, sendResponse) => {
    console.log(message.body.color);
    alert(message.body.color);
    newColor(message.body.color);
  });
};

let button = document.querySelector('.testing');

button.addEventListener('click', () => {
  //   handleClick();
  connectPort();
});
