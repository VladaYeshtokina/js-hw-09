import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';



const refs = {
  datetimePicker: document.querySelector('#datetime-picker'),
  startButton: document.querySelector('button[data-start]'),
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
  timer: document.querySelector('.timer'),
};

let selectedTime = null;
refs.startButton.disabled = true;
refs.timer.textContent = '00:00:00:00';

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {    
    if (selectedDates[0] < options.defaultDate) {
      Notify.failure('Please choose a date in the future');
      return;
    }
    refs.startButton.disabled = false;
    selectedTime = selectedDates[0];    
  },
};

flatpickr(refs.datetimePicker, options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function updateDate({ days, hours, minutes, seconds }) {
  refs.timer.textContent = `${days}:${hours}:${minutes}:${seconds}`;  
}

refs.startButton.addEventListener('click', onButtonClick);

function onButtonClick(e) {
  const intervalId = setInterval(() => {
    if (selectedTime - Date.now() < 0) {
      clearInterval(intervalId);
      return;
    }    
    const time = convertMs(selectedTime - Date.now());
    updateDate(time);
  }, 1000);  
}

