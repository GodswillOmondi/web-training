let count = 0;

const countDisplay = document.getElementById("count");
const increaseBtn = document.getElementById("increase");
const decreaseBtn = document.getElementById("decrease");
const resetBtn = document.getElementById("reset");

function updateDisplay() {
  countDisplay.textContent = count;

  if (count > 0) {
    countDisplay.style.color = "green";
  } else if (count < 0) {
    countDisplay.style.color = "red";
  } else {
    countDisplay.style.color = "yellow";
  }
}

increaseBtn.addEventListener("click", function () {
  count++;
  updateDisplay();
});

decreaseBtn.addEventListener("click", function () {
  if (count > 0) {
    count--;
    updateDisplay();
  }
});

resetBtn.addEventListener("click", function () {
  count = 0;
  updateDisplay();
});
