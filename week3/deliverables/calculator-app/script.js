function calculate(operator) {
  let num1 = parseFloat(document.getElementById("num1").value);
  let num2 = parseFloat(document.getElementById("num2").value);
  let result = 0;

  if (isNaN(num1) || isNaN(num2)) {
    alert("Please enter valid numbers");
    return;
  }
  if (operator === "+") {
    result = num1 + num2;
  } else if (operator === "-") {
    result = num1 - num2;
  } else if (operator === "*") {
    result = num1 * num2;
  } else if (operator === "/") {
    if (num2 === 0) {
      alert("cannot divide by zero");
      return;
    }
    result = num1 / num2;
  }
  document.getElementById("result").textContent = result;
}
