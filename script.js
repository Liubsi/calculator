const numContainer = document.getElementById("num-container"); 
const opContainer = document.getElementById("op-container");
const display = document.getElementById("display"); 

let displayText = ""; 
let consecDigits = false; 
let resulted = false; 

let operators = ["+", "-", "*", "/", "AC"];
let mappedOperators = ["add", "subtract", "multiply", "divide"];

let operandsStack = []; 
let operatorsStack = [];  
let digits = []; 

const operations = {
    add: (a, b) => a + b, 
    subtract: (a, b) => a - b, 
    multiply: (a, b) => a * b, 
    divide: (a, b) => a / b
};

function makeCalculator() {
    makeBody(5, 3); 
    makeOperators(operators.length, 1); 
}

function makeBody(rows, cols) { 
    numContainer.style.setProperty('--grid-rows', rows);
    numContainer.style.setProperty('--grid-cols', cols);

    let content = [0, ".", "=", 1, 2, 3, 4, 5, 6, 7, 8, 9, "(", ")", "%"];

    // does not go to grid # 0
    for (let numGrid = (rows * cols); numGrid > 0; numGrid--) {
        let cell = document.createElement("button");
        numContainer.appendChild(cell).className = "num-items"; 
        cell.innerText = content[numGrid-1]; 

        if (cell.innerText != "." && cell.innerText != "(" && cell.innerText != ")" && cell.innerText != "%") { // disable ( ) . %
            cell.addEventListener('click', () => {
                if (cell.innerText == "=") {
                    consecDigits = false; 
                    resulted = true; 
                    // error checking 
                    if (digits.length != 0) {
                        operandsStack[operandsStack.length] = concatDigits("This shouldn't do anything"); 
                    }
                    if (!checkError()) {
                        equals(); 
                    }
                }
                else {
                    // if number entered after result is calculated 
                    if (resulted) {
                        clear(); 
                    }
                    consecDigits = true; 
                    concatDigits(cell.innerText); 
                    displayText += cell.innerText + ""; 
                }
                display.innerText = displayText; 

            });
        }   
    }
}

function makeOperators(rows, cols) { // includes clear (AC)
    opContainer.style.setProperty('--grid-rows', rows);
    opContainer.style.setProperty('--grid-cols', cols);

    // does not go to grid # 0
    for (let gridNum = (rows * cols); gridNum > 0; gridNum--) {
        let cell = document.createElement("button");
        opContainer.appendChild(cell).className = "operators"; 
        cell.innerText = operators[gridNum-1]; 

        cell.addEventListener('click', () => {
            consecDigits = false; 
            resulted = false; 

            if (cell.innerText == "AC") {
                clear(); 
            }
            else {
                // error checking 
                if (digits.length != 0) {
                    operandsStack.push(concatDigits("This shouldn't do anything")); 
                }
                operatorsStack.push(cell.innerText); 
                displayText += " " + cell.innerText + " "; 
            }
            display.innerText = displayText;       
        });
    }
}

function clear() {
    displayText = ""; 
    operandsStack = [];
    operatorsStack = []; 
}

function equals() {
    console.log(operandsStack);
    console.log(operatorsStack); 

    while (operatorsStack.length > 0) {
        displayText = operate() + " "; 
    }
}

function determineOrder() { // enforce order of operations
    const order = [["/", "*"], ["+", "-"]];
    let executionOrder = 0; 
    
}

function checkError() {
    if ((operandsStack.length - operatorsStack.length) != 1) {
        displayText = "Error"; 
        return true; 
    }
    return false; 
}

function concatDigits(digit) { // concatenates digits 
    if (consecDigits) {
        digits.push(digit); 
    }
    else {
        let bigNumber = ""; 
        for (let i = 0; i < digits.length; i++) {
            bigNumber += digits[i]; 
        }
        digits = []; 
        return bigNumber; 
    }
}

function operate() { // handles two numbers at a time

    let num1 = parseFloat(operandsStack.shift()); 
    let num2 = parseFloat(operandsStack.shift()); 
    let firstOperation = operatorsStack.shift(); 

    for (let i of operandsStack) {
        if (i == num1) {

        }
    }

    let operation = mappedOperators[operators.indexOf(firstOperation)];
    let result = operations[operation](num1, num2); 

    operandsStack.unshift(result); 

    return result; 
}

makeCalculator(); 
