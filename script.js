/* ======== VERSION 1 ==================

/*
### TODOS
- [ ] Add numbers > 9 as one number, not several separate digits
-------------
while the button clicked is a number, keep appending it to current number entry
if user clicks number:
  if previous entry in numbersOperators is a number:  
    append it
  else 
    add it to numbersOperators
-------------
- [ ] Add correct characters for x**2, mod, squareroot to calculatorGrid.
- [ ] Name the methods in calculator the same as the characters for operations on calculatorGrid
- [ ] Evaluate if user hits Enter
- [ ] Show click effect on each button (CSS)
- [ ] Add Pi
- [ ] Add % calc
- [ ] Break out of while loop in calculator.evaluate() if expression is faulty
*/

/* 
STRATEGY 1

Event listener on calculator:
If click on number or operator (except =):
  Append number/operator to text in lower text field
If click on =: // upon calling calculator.evaluate()
  Display previous calculation in top text field
  Display result in bottom text field
If click on 'Clear':
  Clear bottom text field

Calculator object:
  // methods:
  /: num / num
  *: num * num
  -: num - num
  +: num + num
  mod: num mod num
  x²: num * num
  root: squareroot(num)

calculation = []
// trim each value entered
if click on number:
  push number to calculation
if click on operator:
  push operator to calcuation
if click on =/ hit enter:
  // evaluate the values in calculation:
  while calculation.length > 1:
    if first value === root && second value is number:
      call 'root' and pass in number
      save result
      cut off the first two values in `calculation`
      add result to beginning of array
    else if first value is number && second value is x²:
      call 'x²' and pass in number
      save result
      cut off the first two values in `calculation`
      add result to beginning of array
    else if first and third value is a number && second value is an operator (one of /, *, -, +, mod):
      call the method specified by operator and pass in the numbers as arguments
      save result
      cut off the first three values in `calculation`
      add result to beginning of array
    else:
      display 'faulty expression' on screen

  // what if calculation is longer? evaluate after user hits =/enter? (GNOME calculator does that)

  // example of valid calculation: [4, +, 4, *, 6, /, 2], = ->
  [24]
  if the first
  evaluate the first three values // call the respective methods
  replace the first three values with the result
  keep doing this (recursion) until array.length is 1 -  this is the result

  // example of invalid calculation: [4]

  [4, x²]

*/

// let calculatorGrid = document.getElementById('calculator-grid');
// calculatorGrid.addEventListener('click', calculatorCallback);

// /*

// click 1
// calculation = [1, ]
// click +
// calculation = [1, +]
// click 2
// calculation = [1, +, 2]
// click =
//   // evaluate
// */

// let numbersOperators = [];
// let operations = ["+", "-", "*", "/"];

// function Calculator() {
//   this["+"] = function(a, b) {
//     return a + b;
//   };
//   this["-"] = function(a, b) {
//     return a - b;
//   };
//   this["*"] = function(a, b) {
//     return a * b;
//   };
//   this["/"] = function(a, b) {
//     return a / b;
//   };
//   this["mod"] = function(a, b) {
//     return a % b;
//   };
//   this["x**2"] = function(a) {
//     return a * a;
//   };
//   this["sqrt(x)"] = function(a) {
//     return Math.sqrt(a);
//   };
//   this["%"] = function(a, b) {
//     return a/100 * b;
//   };
//   this.evaluate = function(numbersOperators) {
//     let operator, number, result;
    
//     while (numbersOperators.length > 1) {
      
//       // Square root
//       // Sqrt(x) symbol
//       if (numbersOperators[0] === "sqrt(x)" && isNaN(numbersOperators[1]) === false) {
//         result = this[numbersOperators[0]](numbersOperators[1]);
//         console.log(`operator: ${numbersOperators[0]} of ${numbersOperators[1]} = ${result}`);
//         numbersOperators.splice(0, 2);
//         numbersOperators.unshift(result);
//         console.log("numbersOperators after splicing first two elements and adding result: ", numbersOperators);
//       // x²
//       } else if (isNaN(numbersOperators[0]) === false && numbersOperators[1] ===  "x**2") {
//         result = this[numbersOperators[1]](numbersOperators[0]);
//         console.log(`result of x²: ${result}`);
//         numbersOperators.splice(0, 2);
//         numbersOperators.unshift(result);
//       // Percentage calculation
//       } else if (
//         // number % * number
//         !isNaN(numbersOperators[0]) &&
//         !isNaN(numbersOperators[3]) &&
//         numbersOperators[1] === "%" &&
//         numbersOperators[2] === "*"
//       ) {
//         let percent = numbersOperators[1];
//         result = this[percent](numbersOperators[0], numbersOperators[3]);
//         console.log(`Result of ${numbersOperators[0]} % * ${numbersOperators[3]} = ${result}`);
//         numbersOperators.splice(0, 4);
//         numbersOperators.unshift(result);

//       // Addition, subtraction, multiplication, division
//       } else if (!isNaN(numbersOperators[0]) && !isNaN(numbersOperators[2]) && operations.includes(numbersOperators[1])) {
//         operator = numbersOperators[1];
//         result = this[operator](numbersOperators[0], numbersOperators[2]);
//         numbersOperators.splice(0, 3);
//         numbersOperators.unshift(result);
//       } else {
//         console.log("Faulty expression");
//       }
//     }

//     return result;
//   }
// }

// let calculator = new Calculator();

// function calculatorCallback(event) {
//   let clickedValue = event.target.innerText.trim();
//   if (clickedValue === "=") {
//     // Evaluate
//     console.log("numbersOperators: ", numbersOperators);
//     let result = calculator.evaluate(numbersOperators);
//     console.log("result: ", result);
//   } else if (isNaN(clickedValue)) {
//     numbersOperators.push(clickedValue);
//   } else {
//     numbersOperators.push(+clickedValue);
//   }
// }


/* =============== END OF VERSION ONE ============= */

// ============== VERSION 2 =======================


// Elements of calculator
let previousOperation = document.querySelector('.js-previous-operation');
let currentOperation = document.querySelector('.js-current-operation');
const operatorButtons = document.querySelectorAll('.js-operator');
const numberButtons = document.querySelectorAll('.js-number');
const functionButtons = document.querySelectorAll('.js-functions');
const allClearButton = document.querySelector('.js-all-clear');
const deleteButton = document.querySelector('.js-clear-delete');
// what event listener to add to parensButtons?
const parensButtons = document.querySelectorAll('.js-parens');
const equalsButton = document.querySelector('.js-equals');
const percentButton = document.querySelector('.js-percent');
const piButton = document.querySelector('.js-pi');

let operand1 = '';
let operand2 = '';
let operator = '';

// EVENT LISTENERS
// exp: after running this code, each button with class .js-number has an event listener. Confidence: 40%. Reality: 90%.
// exp: The event listener listens for click events and assigns the textContent of the button to the correct operand (operand1 if no operator chosen, operand2 if operator chosen). Confidence: 15%.
// Reality: 50%. The event listener listens for click events and APPENDS (not assigns) the number to the correct operand. 90%.
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
      if (!operator) {
        operand1 += button.textContent;
        console.log("operand1:", operand1);
      } else if (operator) {
        operand2 += button.textContent;
        console.log("operand2: ", operand2);
      }
    });
});

// Exp.: After this code runs,
// each operator button has an event listener. 80%.
// Reality: 90%
// The event listener assigns the clicked operator to `operator`, if `operator` is ''. Else, it returns. 40%
// Reality: 80%.
operatorButtons.forEach(button => {
  button.addEventListener('click', () => {
    if (operand1 && !operator) {
      if (button.textContent === "mod") {
        operator = "%";      
      } else {
        operator = button.textContent;
      }
      console.log("operator: ", operator);
    } else {
      console.log(`operator already assigned (${operator}) or operand1 not yet assigned (${operand1}).`);
      return;
    }
  });
});

equalsButton.addEventListener('click', () => {
  console.log('run compute function');
});

allClearButton.addEventListener('click', () => {
  console.log('run clearAll');
});

deleteButton.addEventListener('click', () => {
  console.log('Run calculator.delete()');
});


// Calculator object
let Calculator = function() {
  this.currentOperation = ''; // brauche ich das wirklich?
  this.operand1;
  this.operand2;
  this.operator;
  this.result;

  this.compute = function() {};
  this.clearAll = function() {};
  this.delete = function() {};
  this.updateDisplay = function() {
    // currentOperation.textContent = '123Test';
  };
  this.updateOperands = function() {};
};

let calculator = new Calculator();




