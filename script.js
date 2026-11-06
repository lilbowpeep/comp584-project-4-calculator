const screen = document.querySelector('.calculator-screen');
const buttons = document.querySelector('.calculator-buttons');
let displayValue = '0';
let firstNumber = null;
let operator = null;
let startNewNumber = true;

function clearCalculator() {
  displayValue = '0';
  firstNumber = null;
  operator = null;
  startNewNumber = true;
}

function calculate(first, second, operation) {
  if (operation === '+') {
    return first + second;
  } else if (operation === '-') {
    return first - second;
  } else if (operation === '×') {
    return first * second;
  } else if (operation === '÷') {
    return second === 0 ? NaN : first / second;
  }
}

buttons.addEventListener('click', function (event) {
  if (event.target.tagName !== 'BUTTON') {
    return;
  }

  const value = event.target.textContent;

  if (value >= '0' && value <= '9') {
    if (startNewNumber || displayValue === '0') {
      displayValue = value;
    } else {
      displayValue += value;
    }
    startNewNumber = false;
  } else if (value === 'C') {
    clearCalculator();
  } else if (value === '←') {
    if (displayValue === 'Error') {
      clearCalculator();
    } else if (!startNewNumber) {
      displayValue = displayValue.slice(0, -1);
      if (displayValue === '' || displayValue === '-') {
        displayValue = '0';
      }
    }
  } else if (displayValue !== 'Error') {
    if (operator !== null && !startNewNumber) {
      const result = calculate(firstNumber, Number(displayValue), operator);
      displayValue = Number.isFinite(result) ? String(result) : 'Error';
      firstNumber = null;
      operator = null;
    }

    if (value !== '=' && displayValue !== 'Error') {
      firstNumber = Number(displayValue);
      operator = value;
    } else {
      operator = null;
    }
    startNewNumber = true;
  }

  screen.textContent = displayValue;
});
