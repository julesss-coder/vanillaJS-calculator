/*
### TODOS
- [ ] Add correct characters for x**2, mod, squareroot to calculatorGrid.
- [ ] Name the methods in calculator the same as the characters for operations on calculatorGrid
- [ ] Evaluate if user hits Enter
*/

/* 
STRATEGY 1

Event listener on calculator

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

let calculatorGrid = document.getElementById('calculator-grid');
calculatorGrid.addEventListener('click', calculatorCallback);

/*

click 1
calculation = [1, ]
click +
calculation = [1, +]
click 2
calculation = [1, +, 2]
click =
  // evaluate
*/

let calculationParts = [];

function Calculator() {
  this["+"] = function(a, b) {
    return a + b;
  };
  this["-"] = function(a, b) {
    return a - b;
  };
  this["*"] = function(a, b) {
    return a * b;
  };
  this["/"] = function(a, b) {
    return a / b;
  };
  this["mod"] = function(a, b) {
    return a % b;
  };
  this["x**2"] = function(a) {
    return a * a;
  };
  this["sqrt(x)"] = function(a) {
    return Math.sqrt(a);
  };
  this.evaluate = function(calculationParts) {
    if (calculationParts.length > 1) {
      if (calculationParts[0] === "sqrt(x)" && isNaN(calculationParts[1]) === false) {
        let operation = calculationParts[0];
        let number = calculationParts[1];
        let result = this[operation](number);
        console.log(`operation: ${operation} of ${number} = ${result}`);
        calculationParts.splice(0, 2);
        calculationParts.unshift(result);
        console.log("calculationParts after splicing first two elements and adding result: ", calculationParts);
        return result;
      } // === CONTINUE HERE ===
    }
  }
}

let calculator = new Calculator();

function calculatorCallback(event) {
  let clickedValue = event.target.innerText;
  if (clickedValue === "=") {
    // Evaluate
    console.log("calculationParts: ", calculationParts);
    let result = calculator.evaluate(calculationParts);
  } else if (isNaN(clickedValue)) {
    calculationParts.push(clickedValue);
  } else {
    calculationParts.push(+clickedValue);
  }
}