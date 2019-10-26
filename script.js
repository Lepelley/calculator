/**
 * Addition x + y
 * @param {number} x 
 * @param {number} y 
 * @returns {number} = x + y
 */
const addition = (x, y) => {
  return x + y;
};

/**
 * Substraction x - y
 * @param {number} x 
 * @param {number} y 
 * @returns {number} = x - y
 */
const substration = (x, y) => {
  return x - y;
};

/**
 * Multiplication x * y
 * @param {number} x 
 * @param {number} y 
 * @returns {number} = x * y
 */
const multiplication = (x, y) => {
  return x * y;
}

/**
 * Division x / y
 * @param {number} x 
 * @param {number} y 
 * @returns {number} = x / y
 */
const division = (x, y) => {
  if (y === 0) {
    alert('Can\'t divide by 0.');
    return 0;
  }
  return x / y;
};

/** 
 * @param {string} operate 
 * @param {number} x
 * @param {number} y 
 * @returns {number} x operate y
 */
const operate = (operate, x, y) => {
  if (operate === '+') {
    
    return roundNumber(addition(x, y), 2);
  }
  if (operate === '-') {
    return roundNumber(substration(x, y), 2);
  }
  if (operate === '×') {
    return roundNumber(multiplication(x, y), 2);
  }
  if (operate === '÷') {
    return roundNumber(division(x, y), 2);
  }
  console.error(`No support for operator : ${operate}`);
};

/**
 * @param {number} number - number to round
 * @param {number} numberDecimal - number of decimals you want
 */
const roundNumber = (number, numberDecimal) => {
  const inter = Math.pow(10, numberDecimal);
  return (Math.round(number * inter) / inter);
};



/**
 * @param {string} value - value to add to the display
 * @returns {string} - old value of #display
 */
const addValueToDisplay = (value) => {
  const displayElt = document.getElementById('display');
  const number = displayElt.innerHTML;
  displayElt.innerHTML += value;
  return number;
};

/**
 * Clear the display
 */
const clear = (numbers, operators) => {
  const displayElt = document.getElementById('display');
  const decimalElt = document.getElementById('decimal');
  displayElt.innerHTML = '';
  numbers = [];
  operators = [];
  decimalElt.removeAttribute('disabled');
};

/**
 * Get the last number entered (before the last operator or equal)
 * @param {string} stringFromDisplay 
 * @param {array} numbers - array of string contains number for the formule
 * @param {number} numbersOfOperators 
 * @returns {string} - next number
 */
const getNumber = (stringFromDisplay, numbers, numbersOfOperators) => {
  let numbersLength = 0;
  numbers.forEach(element => {
    numbersLength += element.length;
  });
  return stringFromDisplay.substring(numbersLength + numbersOfOperators);
};

/**
 * Return the formule solved
 * @param {array} numbers - array of string or numbers
 * @param {array} operators - array of operators, can be null
 * @returns {number} - result
 */
const getResult = (numbers, operators) => {
  // priority operators first
  for (let i = 0 ; i < operators.length ; i++) {
    if (operators[i] == '×' || operators[i] == '÷') {
      if (numbers[i] === '') {
        numbers[i] = 0;
      }
      if (numbers[i+1] === '') {
        numbers[i+1] = 0;
      }
      numbers[i] = operate(operators[i], parseFloat(numbers[i]), parseFloat(numbers [i+1]));
      numbers.splice(i+1);
      operators.splice(i);
    }
  }
  // then other
  for (let i = operators.length - 1 ; i >= 0 ; i--) {
    if (numbers[i] === '') {
      numbers[i] = 0;
    }
    if (numbers[i+1] === '') {
      numbers[i+1] = 0;
    }
    numbers[i] = operate(operators[i], parseFloat(numbers[i]),  parseFloat(numbers [i+1]));
    numbers.splice(i+1);
    operators.splice(i);
  }
  // display the result and clear array
  const result = numbers[0];
  numbers.splice(0);
  return result;
};

const calculator = () => {
  const numbers = [];
  const operators = [];
  let isDecimalUsed = false;

  // inits
  const buttonsNumber = [
    {html: document.getElementById('zero'), value:'0'},
    {html: document.getElementById('one'), value:'1'},
    {html: document.getElementById('two'), value:'2'},
    {html: document.getElementById('three'), value:'3'},
    {html: document.getElementById('four'), value:'4'},
    {html: document.getElementById('five'), value:'5'},
    {html: document.getElementById('six'), value:'6'},
    {html: document.getElementById('seven'), value:'7'},
    {html: document.getElementById('eight'), value:'8'},
    {html: document.getElementById('nine'), value:'9'}
  ];

  buttonsNumber.forEach(element => {
    element.html.addEventListener('click', (e) => {
      addValueToDisplay(element.value);
    });
  });

  // Decimal
  const decimalElt = document.getElementById('decimal');
  decimalElt.addEventListener('click', () => {
    addValueToDisplay('.');
    decimalElt.setAttribute('disabled', '');
    isDecimalUsed = true;
  });

  const buttonsOperator = [
    {html: document.getElementById('addition'), value:'+'},
    {html: document.getElementById('substraction'), value:'-'},
    {html: document.getElementById('multiplication'), value:'×'},
    {html: document.getElementById('division'), value:'÷'},
  ];

  buttonsOperator.forEach(element => {
    element.html.addEventListener('click', (e) => {
      numbers[numbers.length] = getNumber(addValueToDisplay(element.value), numbers, operators.length);
      operators[operators.length] = element.value;
      if (isDecimalUsed) {
        isDecimalUsed = false;
        decimalElt.removeAttribute('disabled');
      }
    });
  });
  
  const displayElt = document.getElementById('display');

  // Clear
  const clearElt = document.getElementById('clear');
  clearElt.addEventListener('click', () => {
    clear(numbers, operators);
  });

  const eraseElt = document.getElementById('erase');
  eraseElt.addEventListener('click', () => {
    if (displayElt.innerHTML[displayElt.innerHTML.length-1] === '.') {
      isDecimalUsed = false;
      decimalElt.removeAttribute('disabled');
    }
    displayElt.innerHTML = displayElt.innerHTML.substring(0,displayElt.innerHTML.length-1);
  });
  
  // Equal
  const equalElt = document.getElementById('equal');
  equalElt.addEventListener('click', () => {
    numbers[numbers.length] = getNumber(displayElt.innerHTML, numbers, operators.length);
    displayElt.innerHTML = getResult(numbers, operators);
    inputLeft = 9;
    if (displayElt.innerHTML !== '') {
      isDecimalUsed = true;
      decimalElt.setAttribute('disabled', '');
    }
  });
}

calculator(); // start !
