import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  startBtn: document.querySelector('[data-start]'),
  timerInput: document.getElementById('datetime-picker'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

let ms;
let timerIntervalId;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  // onClose(selectedDates) {
  //   const selectedDate = selectedDates[0];
  //   let currentDate = new Date();
  //   console.log(currentDate);
  //   if (currentDate >= selectedDate) {
  //     window.alert('Please choose a date in the future');
  //     refs.startBtn.disabled = true;
  //   } else {
  //     refs.startBtn.disabled = false;
  //     ms = selectedDate - currentDate;
  //     console.log(ms);
  //     const convertDate = convertMs(ms);
  //     timerMarkup(convertDate);
  //   }
  // },

  onClose(selectedDates) {
    const selectedDate = selectedDates[0];

    if (options.defaultDate >= selectedDate) {
      window.alert('Please choose a date in the future');
      refs.startBtn.disabled = true;
    } else {
      refs.startBtn.disabled = false;
      refs.startBtn.addEventListener('click', handlerStartBtn);

      function handlerStartBtn() {
        refs.startBtn.disabled = true;
        refs.timerInput.disabled = true;
        timerIntervalId = setInterval(countTimer, 1000, selectedDate);
      }
    }
  },
};

flatpickr('#datetime-picker', options);

refs.startBtn.disabled = true;

function countTimer(selectedDate) {
  const currentDate = new Date();
  console.log(selectedDate);

  ms = selectedDate - currentDate;
  console.log(ms);
  const convertDate = convertMs(ms);
  timerMarkup(convertDate);
  if (
    refs.days.textContent == 0 &&
    refs.hours.textContent == 0 &&
    refs.minutes.textContent == 0 &&
    refs.seconds.textContent == 0
  ) {
    clearInterval(timerIntervalId);
    refs.timerInput.disabled = false;
  }
}

function timerMarkup({ days, hours, minutes, seconds }) {
  refs.days.textContent = days;
  refs.hours.textContent = hours;
  refs.minutes.textContent = minutes;
  refs.seconds.textContent = seconds;
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

// console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
