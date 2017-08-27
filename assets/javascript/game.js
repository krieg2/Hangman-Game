var answer;
var guessedLetters = [];

document.onkeyup = function(event) {
    var keyPressed = event.key;
    guessedLetters.push(keyPressed);

    if(answer.includes(keyPressed)){
        //showLetter(keyPressed, answer);
    }
}

