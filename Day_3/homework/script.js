const catFacts = "https://catfact.ninja/facts?limit=10";
const epicMemes = "https://api.imgflip.com/get_memes?limit=100";
const funnyHahas = "https://official-joke-api.appspot.com/random_ten";
const buttons = document.querySelectorAll(".button");
const catSection = document.querySelector(".catFacts");
const memeSection = document.querySelector(".memes");
const jokeSection = document.querySelector(".jokes");

function addCatFact (catFact) {
    catSection.innerHTML = "<p>" + catFact.data[(Math.floor(Math.random() * (catFact.data).length))].fact + "</p>";
}

function addJoke (joke) {
    let randInt = Math.floor(Math.random() * joke.length);

    jokeSection.innerHTML = "<p>" + joke[randInt].setup + "</p><br><h3>" + joke[randInt].punchline + "</h3>";
} 

function addMeme (meme) {
    meme = (meme.data).memes;
    let randInt = Math.floor(Math.random() * meme.length);

    memeSection.innerHTML = `<img src="` + meme[randInt].url + `" alt="` + meme[randInt].name + `">`
    console.log(meme);

}

function identifyButton (clickedButton) {
    if (clickedButton === buttons[0]) {
        fetch(catFacts).then(response => response.json()).then(data => addCatFact(data)).catch(error => console.error("Error: ", error));
    } else if (clickedButton === buttons[1]) {
        fetch(funnyHahas).then(response => response.json()).then(data => addJoke(data)).catch(error => console.error("Error: ", error));
    } else if (clickedButton === buttons[2]) {
        fetch(epicMemes).then(response => response.json()).then(data => addMeme(data)).catch(error => console.error("Error: ", error));
    } else {
        return;
    }
}

buttons.forEach(element => {
    element.addEventListener("click", function () {
        identifyButton(element);
    });
});
