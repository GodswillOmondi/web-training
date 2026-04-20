const secondSpan = document.getElementById("second-span");
const millisecondSpan = document.getElementById("millisecond-span");
const startBtn = document.getElementById("start-btn");
const stopBtn = document.getElementById("stop-btn");
const pauseBtn = document.getElementById("pause-btn");
const resetBtn = document.getElementById("reset-btn");

let seconds = 0;
let milliseconds = 0;
function startStopWatch() {
  console.log("stopwatch started");

  setTimeout(() => {
    milliseconds++;
    console.log(milliseconds);
    millisecondSpan.textContent = milliseconds;
    if (milliseconds >= 100) {
      milliseconds = 0;
      seconds++;
      secondSpan.textContent = seconds;
    }
  }, 10);
}

startBtn.addEventListener("click", startStopWatch);
