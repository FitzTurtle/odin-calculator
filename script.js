let firstNum="";
let secondNum="";
let operator="";
let currentEquation="";
let firstDone = false;
let firstHasDecimal = false;
let secondHasDecimal =false;

const operationRegex = new RegExp(/[\/\+\-\*]/);
const calcRegex = new RegExp(/[(0-9)\/\+\-\*]/);

const buttons = document.querySelectorAll(".button");
const clearButton = document.querySelector(".clear");

buttons.forEach( (button) => button.addEventListener('click', buildEquation));
clearButton.addEventListener('click', clear);

window.addEventListener('keypress', handlePress);

function handlePress(e) {
    if(calcRegex.test(e.key)){
    document.getElementById(e.key).click();
    }
    if(e.key=="Enter"){
        document.getElementById("=").click();
    }
}

function buildEquation(e) {

    const buttonClasses = e.target.classList;
    const isNumber = buttonClasses.contains("number");
    const isOperator = buttonClasses.contains("operation")
    const isEqual = buttonClasses.contains("equal");
    const isDecimal = buttonClasses.contains("decimal");

    const input = e.target.id;

    //Build first number if no first number
    if(!firstDone) {

        if(e.target.id==="-" &&  firstNum === "") {
            firstNum = "-";
            currentEquation = firstNum;
        }
        if(isDecimal && !firstHasDecimal) {
            firstNum += ".";
            currentEquation = firstNum;
            firstHasDecimal=true;
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
    else if(firstDone && isOperator && operator === ""){
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
        if(isDecimal && !secondHasDecimal) {
            secondNum += ".";
            currentEquation =firstNum+operator+secondNum;
            secondHasDecimal = true;
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

function clear(){
    firstNum="";
    secondNum="";
    operator="";
    currentEquation="";
    firstDone = false;
    firstHasDecimal = false;
    secondHasDecimal = false;
    updateDisplay(currentEquation);
}

function updateDisplay(content){
    const display = document.querySelector(".display");
    if(content.toString().length<=11){
        display.textContent = content;
    } else {
        display.textContent = "Er: Too Big";
    }
}

// Basic Functions
function add(num1, num2) {

    num1 = +num1;
    num2 = +num2;

    return roundToTwo(num1+num2);
}

function subtract(num1, num2) {
    return roundToTwo(num1-num2);
}

function multiply(num1, num2) {
    return roundToTwo(num1*num2);
}

function divide(num1, num2) {
    if(num2=="0"){
        return ":( div by 0";
    }
    return roundToTwo(num1/num2);
}

function refresh(){
    firstNum = currentEquation;
    secondNum = "";
    operator ="";
    secondHasDecimal = false;
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

function roundToTwo (num) {
    return Math.round(num*100)/100;
}