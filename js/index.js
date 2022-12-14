// const handleClick = () => {
//   document.querySelector('body').style.backgroundColor = 'blue';
// };

const connectPort = () => {
  let port = chrome.runtime.connect();
  port.postMessage({
    body: 'pink',
  });
};

let button = document.querySelector('.testing');

button.addEventListener('click', () => {
  //   handleClick();
  connectPort();
});
