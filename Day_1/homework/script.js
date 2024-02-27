let buttons = document.getElementsByClassName("button");
const displayBar = document.getElementsByClassName("display")[0];

let inputVal1 = [];
let inputVal2 = [];
let operator = "";

function checkNum (clicked) {
    return !isNaN(clicked.innerHTML);
}

function addInput (value) {
    if (operator == "") {
        inputVal1.push(value);
        inputVal1[0] = inputVal1.join("");
        if (inputVal1.length > 1) {
            inputVal1.pop();
        }
        displayBar.innerHTML = inputVal1[0];
        return;
    } else {
        inputVal2.push(value);
        inputVal2[0] = inputVal2.join("");
        if (inputVal2.length > 1) {
            inputVal2.pop();
        }
        displayBar.innerHTML = inputVal2[0];
        return;
    }
}

function checkOperator (value) {
    if (value == "C") {
        inputVal1.pop();
        inputVal2.pop();
        operator = "";
        displayBar.innerHTML = "";
        return;
    }

    if (inputVal1.length !== 0) {
        if (inputVal2.length !== 0 && value === "=") {
            calcResult();
        } else if (inputVal2.length === 0 && value !== "=") {
            operator = value;
            return;
        }
    } else {
        return;
    }
}

function calcResult () {
    inputVal1[0] = parseFloat(inputVal1[0]);
    inputVal2[0] = parseFloat(inputVal2[0]);

    if (operator === "+") {
        inputVal1[0] += inputVal2[0];
    } else if (operator === "-") {
        inputVal1[0] -= inputVal2[0];
    } else if (operator === "*") {
        inputVal1[0] *= inputVal2[0];
    } else if (operator === "/") {
        inputVal1[0] /= inputVal2[0];
    } else {
        return;
    }

    displayBar.innerHTML = inputVal1[0];
    operator = "";
    inputVal2.pop();
}

function buttonClick (clicked) {
    if (checkNum(clicked) === true) {
        return (addInput(clicked.innerHTML));
    }

    if (checkNum(clicked) === false) {
        return (checkOperator(clicked.innerHTML));
    }
}

//Create Addition Button
document.getElementsByClassName("row")[4].insertAdjacentHTML('beforeend', `<div class="button">+</div>`);
document.styleSheets[0].deleteRule(5);

for (let i = 0; buttons.length > i; i++) {
    buttons[i].addEventListener("click", function() {
        buttonClick(buttons[i]);
    });
}