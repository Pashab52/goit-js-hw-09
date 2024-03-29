import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import Notiflix from 'notiflix';

Notiflix.Notify.init({
  position: 'center-top', // 'right-top' - 'right-bottom' - 'left-top' - 'left-bottom' - 'center-top' - 'center-bottom' - 'center-center'
});

const refs = {
  startBtn: document.querySelector('[data-start]'),
  timerInput: document.getElementById('datetime-picker'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

let ms;
let timerTimeoutId;
let delay = 0;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    const selectedDate = selectedDates[0];

    if (options.defaultDate >= selectedDate) {
      Notiflix.Notify.warning('Please choose a date in the future');
      refs.startBtn.disabled = true;
    } else {
      refs.startBtn.disabled = false;
      refs.startBtn.addEventListener('click', handlerStartBtn);

      function handlerStartBtn() {
        refs.startBtn.disabled = true;
        refs.timerInput.disabled = true;
        timerTimeoutId = setTimeout(countTimer, 0, selectedDate);
      }
    }
  },
};

flatpickr('#datetime-picker', options);

refs.startBtn.disabled = true;

function countTimer(selectedDate) {
  const currentDate = new Date();
  console.log(selectedDate);

  if (currentDate >= selectedDate) {
    clearTimeout(timerTimeoutId);
    return;
  }

  ms = selectedDate - currentDate;
  const convertDate = convertMs(ms);
  timerMarkup(convertDate);
  if (
    refs.days.textContent == 0 &&
    refs.hours.textContent == 0 &&
    refs.minutes.textContent == 0 &&
    refs.seconds.textContent == 0
  ) {
    clearTimeout(timerTimeoutId);

    // refs.timerInput.disabled = false;
    // хотів зробити, щоб після закінчення відліку інпут розблоковувався і можна було
    // вибрати дату і запустити таймер ще раз, але чомусь в таймер підтягується перша
    // видрана дата і відображається почергово на сторінці
  }
  timerTimeoutId = setTimeout(countTimer, 1000, selectedDate);
}

function addLeadingZero(data) {
  return String(data).padStart(2, '0');
}

function timerMarkup({ days, hours, minutes, seconds }) {
  refs.days.textContent = addLeadingZero(days);
  refs.hours.textContent = addLeadingZero(hours);
  refs.minutes.textContent = addLeadingZero(minutes);
  refs.seconds.textContent = addLeadingZero(seconds);
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

refs.startBtn.classList.add('start-btn');
