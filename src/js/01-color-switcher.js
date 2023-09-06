function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

const body = document.querySelector('body');
const start = document.querySelector('button[data-start]');
const stop = document.querySelector('button[data-stop]');


start.addEventListener('click', onClickStart);

function onClickStart(e) {
  body.style.background = getRandomHexColor();
  start.disabled = true;

  const intervalId = setInterval(() => {
    body.style.background = getRandomHexColor();    
  }, 1000);

  stop.addEventListener('click', onClickStop);

  function onClickStop(e) {
    clearInterval(intervalId);
    start.disabled = false;
  }

}

