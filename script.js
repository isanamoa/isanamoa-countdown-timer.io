const display__end_time = document.querySelector(".display__end-time");
const display__time_left = document.querySelector(".display__time-left");
const timer__button = document.querySelectorAll(".timer__button");
const submit__button = document.querySelector("[name=submitCustomForm]");
let inptVal = document.querySelector("[name=minutes]");
let resetInterval;

const timerFunction = (second) => {
  clearInterval(resetInterval);
  displayTimer(second);

  resetInterval = setInterval(() => {
    second--;
    if (second <= 0) {
      clearInterval(resetInterval);
    }
    displayTimer(second);
  }, 1000);

  let currentTime = Date.now();
  currentTime += second * 1000;

  displayTimerEnding(currentTime);
};

const displayTimer = (second) => {
  const timerTime = new Date(second * 1000);
  const hour = timerTime.getHours();
  const minutes = timerTime.getMinutes();
  const seconds = timerTime.getSeconds();
  const display = `${hour >= 1 ? hour * 60 + minutes : minutes}:${ seconds < 10 ? "0" : "" }${seconds}`;
  display__time_left.textContent = display;
};

const displayTimerEnding = (currentTime) => {
  const endTimer = new Date(currentTime);
  const endingHour = endTimer.getHours();
  const endingMinutes = endTimer.getMinutes();
  const display = `Be Back At ${ endingHour <= 12 ? endingHour : endingHour % 12 }:${endingMinutes}`;
  display__end_time.textContent = display;
};
function handlingButtonData() {
  const button_data = parseInt(this.getAttribute("data-time"));
  timerFunction(button_data);
}
timer__button.forEach((button) => {
  button.addEventListener("click", handlingButtonData);
});
submit__button.addEventListener("click", (e) => {
  e.preventDefault();
  const timerMinInSec = inptVal.value <= 0 ? 1 : inptVal.value * 60;
  timerFunction(timerMinInSec);
  inptVal.value = "";
});