let buttons = document.getElementsByClassName("button");
let displayBar = document.getElementsByClassName("display")[0];
let historyList = document.getElementsByClassName("history-list");
let clearAllHistory = document.querySelector(".clear-history");
let darkModeSwitch = document.querySelector(".switch");

let inputVal1 = [];
let inputVal2 = [];
let operator = "";

function checkNum (clicked) { //Determines if the button that was clicked was a number or not. True for number. False for anything else.
    return !isNaN(clicked.innerHTML);
}

function addInput (value) { //Determines if we should be acting on inputVal1 or inputVal2 based on whether or not an operator has been entered yet
    if (operator == "") { //if no operator, then inputVal1
        inputVal1.push(value); //adds the newest number to the array
        inputVal1[0] = inputVal1.join(""); //joins the numbers together (1, 2 -> 12, 2)
        if (inputVal1.length > 1) {
            inputVal1.pop(); //removes the second value (12, 2 -> 12)
        }
        displayBar.innerHTML = inputVal1[0]; //displays number in HTML
        return;
    } else { //same as above, but only occurs when there is an operator present
        inputVal2.push(value);
        inputVal2[0] = inputVal2.join("");
        if (inputVal2.length > 1) {
            inputVal2.pop();
        }
        displayBar.innerHTML = inputVal2[0];
        return;
    }
}

function checkOperator (value) { //if the clicked button was not a number, we end up here and determine the correct behavior
    if (value == "C") { //clears all variables and sets the calculator back to neutral if the operator was C
        inputVal1.pop();
        inputVal2.pop();
        operator = "";
        displayBar.innerHTML = "";
        return;
    }

    if (inputVal1.length !== 0) { //Will not allow the operator keys to function if no initial value was entered first
        if (inputVal2.length !== 0 && value === "=") { //if the second value has already been entered and the operator that was clicked was =, proceed to calculate the result
            calcResult();
        } else if (inputVal2.length === 0 && value !== "=") { //if there is no second value and the operator is not =, then assign the operator to the clicked button
            operator = value;
            return;
        }
    } else { //ya goofed it. Try again.
        return;
    }
}

function recordHistory (historyStr) {
    historyList[0].insertAdjacentHTML(`afterbegin`, `<div class="historyItem">` + historyStr + '<br><br><button class="clearSingle">Delete</button><hr></div>'); //displays historyStr in the history field of the calculator whenever called

    historyList[0].querySelectorAll(".historyItem").forEach(historyItem => { //for each item inside of the history list that is tagged as a history item
        let delButton = historyItem.querySelector(".clearSingle"); //assign the child delete button to delButton
        delButton.addEventListener("click", function () { //when delButton is clicked, replace that history item's HTML with a blank string
            historyItem.innerHTML = "";
        });
    });
}

function calcResult () { //what it says on the tin: calculates the result of the requested operation
    let storedVal1 = inputVal1[0]; //stores the string value of inputVal1[0] in order to record it in history
    inputVal1[0] = parseFloat(inputVal1[0]); //convert values to floats in order to ensure that we're doing math on numbers and not strings
    inputVal2[0] = parseFloat(inputVal2[0]); //floats picked for division purposes

    if (operator === "+") { //addition
        inputVal1[0] += inputVal2[0]; //all answers are assigned to inputVal1[0] for display. This also allows further operations to be done on the answer, rather than requiring a clean slate each time
    } else if (operator === "-") { //subtraction
        inputVal1[0] -= inputVal2[0];
    } else if (operator === "*") { //multiplication
        inputVal1[0] *= inputVal2[0];
    } else if (operator === "/") { //division
        inputVal1[0] /= inputVal2[0];
    } else { //something went wrong
        return;
    }

    displayBar.innerHTML = inputVal1[0]; //update HTML output
    recordHistory(storedVal1 + " " + operator + " " + inputVal2[0] + " = " + inputVal1[0]);
    operator = ""; //clear operator
    inputVal2.pop(); //delete second value
}

function buttonClick (clicked) { //initial check after clicking a button
    if (checkNum(clicked) === true) { //button clicked was a number
        return (addInput(clicked.innerHTML));
    }

    if (checkNum(clicked) === false) { //button clicked was not a number
        return (checkOperator(clicked.innerHTML));
    }
}

//Create Addition Button
document.getElementsByClassName("row")[4].insertAdjacentHTML('beforeend', `<div class="button">+</div>`);

for (let i = 0; buttons.length > i; i++) { //assigns click listeners to all buttons and has them report their contents to begin operation
    buttons[i].addEventListener("click", function() {
        buttonClick(buttons[i]);
    });
}

clearAllHistory.addEventListener("click", function () { //assigns click listener to replace all history HTML with an empty string
    historyList[0].innerHTML = "";
});

darkModeSwitch.addEventListener("change", function () { //assigns change listener to dark mode checkbox
    if (darkModeSwitch.checked) {
        document.querySelector('body').setAttribute('class', 'dark'); //changes class based on checkbox state
    } else {
        document.querySelector('body').setAttribute('class', 'light');
    }
});