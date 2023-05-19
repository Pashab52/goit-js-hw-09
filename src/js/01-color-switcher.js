const { btnStart, btnStop, body } = {
  btnStart: document.querySelector('[data-start]'),
  btnStop: document.querySelector('[data-stop]'),
  body: document.body,
};
let colorIntervalId;
let delay = 0;

console.log(btnStart, btnStop, body);

btnStart.addEventListener('click', holderBtnStart);

btnStop.addEventListener('click', holderBtnStop);

// function holderBtnStart(event) {
//   btnStart.disabled = true;
//   colorIntervalId = setInterval(bodyColorChange, delay);
//   delay = 1000;
// }

// function bodyColorChange() {
//   body.style.backgroundColor = getRandomHexColor();
// }

// function getRandomHexColor() {
//   return `#${Math.floor(Math.random() * 16777215)
//     .toString(16)
//     .padStart(6, 0)}`;
// }

// function holderBtnStop() {
//   clearInterval(colorIntervalId);
//   btnStart.disabled = false;
// }

function holderBtnStart(event) {
  btnStart.disabled = true;
  colorIntervalId = setTimeout(function bodyColorChange() {
    body.style.backgroundColor = getRandomHexColor();
    delay = 1000;
    colorIntervalId = setTimeout(bodyColorChange, delay);
  }, delay);
}

// function bodyColorChange() {
//   body.style.backgroundColor = getRandomHexColor();
// }

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

function holderBtnStop() {
  clearTimeout(colorIntervalId);
  delay = 0;
  btnStart.disabled = false;
}
