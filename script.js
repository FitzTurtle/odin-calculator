let firstNum="";
let secondNum="";
let operator="";
let currentEquation="";
let firstDone = false;
const operationRegex = new RegExp(/[\/\+\-\*]/);

const buttons = document.querySelectorAll(".button");
// console.log(numButtons);
// const opButtons = document.querySelectorAll(".button.operation");

buttons.forEach( (button) => button.addEventListener('click', buildEquation));


function buildEquation(e) {

    const buttonClasses = e.target.classList;
    const isNumber = buttonClasses.contains("number");
    const isOperator = buttonClasses.contains("operation")
    const isEqual = buttonClasses.contains("equal");

    const input = e.target.id;

    //Build first number if no first number
    if(!firstDone) {

        if(e.target.id==="-" &&  firstNum === "") {
            firstNum = "-";
            currentEquation = firstNum;
        }

        if(isNumber) {
            firstNum += input;
            currentEquation = firstNum;
        } else if ((isOperator) && (firstNum !== "" && firstNum !=="-")) {
            operator = e.target.id;
            currentEquation += operator;
            firstDone = true;
        } else if (isEqual) {
            //do not calculate
        }
        updateDisplay(currentEquation);
    } 
    //After an initual calculation, only allow an operator
    else if(firstDone && operator === ""){
        operator = e.target.id;
        currentEquation += operator;
        updateDisplay(currentEquation)
    }
    //build second number if operator exists
    else if (firstDone && operator !== "") {
        if(e.target.id==="-" &&  secondNum === "") {
            secondNum = "-";
            currentEquation = firstNum+operator+secondNum;
        }
        if(isNumber) {
            secondNum += input;
            currentEquation = firstNum+operator+secondNum;
        } else if (isOperator) {
            //do not add another
        } else if (isEqual) {
            currentEquation = operate(operator, firstNum, secondNum);
            refresh();
        }
        updateDisplay(currentEquation);
    }
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

function refresh(){
    firstNum = currentEquation;
    secondNum = "";
    operator ="";
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