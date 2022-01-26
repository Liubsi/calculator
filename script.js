const numContainer = document.getElementById("num-container"); 
const opContainer = document.getElementById("op-container");
const display = document.getElementById("display"); 

let displayText = ""; 

let operators = ["+", "-", "*", "/", "AC"];
let operandsStack = []; 
let operatorsStack = [];  

let operations = [
    (a, b) => a + b, 
    (a, b) => a - b, 
    (a, b) => a * b, 
    (a, b) => a / b
];

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

        cell.addEventListener('click', () => {
            operandsStack.push(cell.innerText); // does not support multiple digit operatoins
            if (cell.innerText == "=") {
                equals(); 
            }
            else {
                displayText += cell.innerText + " "; 
            }
            display.innerText = displayText; 
        });
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
            operatorsStack.push(cell.innerText); 

            if (cell.innerText == "AC") {
                clear(); 
            }
            else {
                displayText += cell.innerText + " "; 
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
    displayText = operate(); 
}

function operate() { // handles two numbers
    console.log(operandsStack); 
    let num1 = operandsStack.shift(); 
    let num2 = operandsStack.shift(); 
    let numOperator; 
    let operation; 

    let result = 0; 

    console.log(operatorsStack); 

    for (let operator of operatorsStack) {
        console.log(operator);
        operation = operations[operators.indexOf(operator)]; 
    }
    console.log(num1); 
    return operation(num1, num2); 
}

makeCalculator(); 
