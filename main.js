// DOM variables
const numberButton = document.querySelectorAll(".btn-number");
const operatorButton = document.querySelectorAll(".btn-operator");
const display = document.getElementById("display");
const toggleBtn = document.querySelector(".theme-toggler");
const calculator = document.querySelector(".calculator");
const toggleIcon = document.querySelector(".toggle-icon");
const equal = document.querySelector("#equal");
const backspace = document.querySelector("#backspace");
const clear = document.querySelector("#clear");

// constants
const numbersArray = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "."];
const operatorsArray = ["+", "-", "*", "/", "%"];

// variables
let isDark = true;
let displayValue = 0;
let firstNumber = 0;
let operator = null;
let isOperationInProgress = false;

// Helper functions

// creating display function
const updateDisplay = () => {
  display.value = displayValue;
  display.textContent = displayValue;
};

// Sets default values on start and click of clear
const setDefaults = () => {
  displayValue = 0;
  firstNumber = 0;
  operator = null;
  isOperationInProgress = false;
};

// functions
// 1 creatiob math oprator functions
const addition = (num1, num2) => {
  return num1 + num2;
};

const subtraction = (num1, num2) => {
  return num1 - num2;
};

const multiply = (num1, num2) => {
  return num1 * num2;
};

const divide = (num1, num2) => {
  return num1 / num2;
};

const percentage = (num1, num2) => {
  return (num1 * 100) / num2;
};

// 2 creating operate function
const operate = (num1, num2, op) => {
  let result;
  if (op === "+") {
    result = addition(num1, num2);
  } else if (op === "-") {
    result = subtraction(num1, num2);
  } else if (op === "x") {
    result = multiply(num1, num2);
  } else if (op === "÷" || op === "/") {
    if (num2 === 0) {
      return "error";
    } else {
      result = divide(num1, num2);
    }
  } else if (op === "%") {
    result = percentage(num1, num2);
  }
  return parseFloat(result.toFixed(3));
};

const triggerOperation = () => {
  if (!operator) {
    return 0;
  }
  const secondNumber = parseFloat(displayValue);
  result = operate(firstNumber, secondNumber, operator);
  displayValue = String(result);
  updateDisplay();
  firstNumber = result;
};

const numberHandler = (value) => {
  if (value === "." && displayValue.includes(".")) return;
  if (isOperationInProgress) {
    displayValue = "";
    isOperationInProgress = false;
  }
  displayValue = +displayValue === 0 ? value : displayValue + value;
  updateDisplay();
};

// 4 creating a operator function
const operateHandler = (value) => {
  if (operator && !isOperationInProgress) {
    triggerOperation();
  } else {
    firstNumber = parseFloat(displayValue);
  }
  isOperationInProgress = true;
  operator = value;
};

const backSpaceHandler = () => {
  displayValue = displayValue.slice(0, -1);
  updateDisplay();
};

// 6 implemention clear handler
const start = () => {
  setDefaults();
  updateDisplay();
};

// theme toggle
const themeToggle = () => {
  calculator.classList.toggle("dark");
  toggleBtn.classList.toggle("active");
  isDark = !isDark;
};

// event listeners
Array.from(numberButton).forEach((key) => {
  key.addEventListener("click", (e) => {
    numberHandler(e.target.innerText);
  });
});

Array.from(operatorButton).forEach((key) => {
  key.addEventListener("click", (e) => {
    operateHandler(e.target.innerText);
  });
});

// equal
equal.addEventListener("click", triggerOperation);

// clear
clear.addEventListener("click", start);

// backspace
backspace.addEventListener("click", backSpaceHandler);

// toggle dark
toggleBtn.addEventListener("click", themeToggle);

// added keyboard implementation
window.addEventListener("keydown", (e) => {
  const keyValue = e.key;
  if (numbersArray.includes(keyValue)) {
    numberHandler(keyValue);
  } else if (operatorsArray.includes(keyValue)) {
    operateHandler(keyValue);
  } else if (keyValue == "Enter" || keyValue === "=") {
    triggerOperation();
  } else if (keyValue == "Backspace") {
    backSpaceHandler();
  }
});

start();
