let userNameText = document.querySelector("#userName");
let passwordText = document.querySelector("#password");
let loginButton = document.querySelector("#logIn");
let errorMessage = document.querySelector("#errorMessage");

function clickLogin (button, pass, user) {
    button.addEventListener("click", function () {
        //console.log(user, pass);
        if (user.value !== "" && pass.value !== "") {
            console.log("Success");
            window.location.href = "index2.html";
            return;
        }
        console.log("Failure");
        errorMessage.style.display = "flex";
        return;
    });
}

clickLogin(loginButton, passwordText, userNameText);