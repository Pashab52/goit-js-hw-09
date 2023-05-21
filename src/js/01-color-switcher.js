const { btnStart, btnStop, body } = {
  btnStart: document.querySelector('[data-start]'),
  btnStop: document.querySelector('[data-stop]'),
  body: document.body,
};
let colorIntervalId;

btnStop.disabled = true;

btnStart.addEventListener('click', holderBtnStart);

btnStop.addEventListener('click', holderBtnStop);

function holderBtnStart(event) {
  btnStart.disabled = true;
  btnStop.disabled = false;
  colorIntervalId = setTimeout(function bodyColorChange() {
    body.style.backgroundColor = getRandomHexColor();
    console.log(body.style.backgroundColor);
    colorIntervalId = setTimeout(bodyColorChange, 1000);
  }, 0);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

function holderBtnStop() {
  clearTimeout(colorIntervalId);
  btnStart.disabled = false;
  btnStop.disabled = true;
}
