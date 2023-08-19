let firstNum;
let secondNum;
let operator;
let currentEquation="";
const operationRegex = new RegExp(/[\/\+\-\*]/);

const buttons = document.querySelectorAll(".button");
// console.log(numButtons);
// const opButtons = document.querySelectorAll(".button.operation");

buttons.forEach( (button) => button.addEventListener('click', addToDisplay));



function addToDisplay(e){

    const buttonClasses = e.target.classList;
    const input = e.target.id;
   


    //number buttons
    if (buttonClasses.contains('number') && currentEquation.length <=10) {
        currentEquation += input;
        updateDisplay(currentEquation);
    } 
    //operator buttons
    else if (buttonClasses.contains('operation')) {
        if (operationRegex.test(currentEquation)) {

        } else {
            currentEquation += input;
            updateDisplay(currentEquation);
        }
    }
    //equal button
    else if (buttonClasses.contains('equal')) {
        parseCalculation(currentEquation);
    }
    console.log(currentEquation);
    console.log(operationRegex.test(currentEquation));
}

function parseCalculation(equation) {
    let [num1, num2] = equation.split(operationRegex);
    let operand = equation.charAt(equation.search(operationRegex));
    console.log(num1);
    console.log(num2);
    console.log(operand);
    updateDisplay(operate(operand, num1, num2));
}

function updateDisplay(content){
    const display = document.querySelector(".display");
    display.textContent = content;
}

// Basic Functions
function add(num1, num2) {
    return num1+num2;
}

function subtract(num1, num2) {
    return num1-num2;
}

function multiply(num1, num2) {
    return num1*num2;
}

function divide(num1, num2) {
    return num1/num2;
}

//Operations
function operate(operation, num1, num2) {

    switch (operation) {
        case "+":
            return add(num1,num2);
            break;
        case "-":
            return subtract(num1,num2);
            break;
        case "*":
            return multiply(num1,num2);
            break;
        case "/":
            return divide(num1,num2);
            break;
    }
}