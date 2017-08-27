
var answer = chooseGameAnswer();
var guessedLetters = [];
var tries = 14;
createBoard(answer);


document.onkeyup = function(event) {
    var keyPressed = event.key;

    if(!guessedLetters.includes(keyPressed)){
        guessedLetters.push(keyPressed);
        tries--;
        updateTries();
    }
    showGuesses(guessedLetters);

    if(answer.includes(keyPressed)){
        showLetter(keyPressed, answer);
    }
}

function chooseGameAnswer(){

    var islandList = ["sumatra", "tahiti", "bora bora", "bali", "maui", "boracay", "palawan", "jamaica"];

    var answer = "";
    var index = 0;
    var max = islandList.length -1;

    // Random game answer.
    index = Math.floor(Math.random() * max + 1);
    answer = islandList[index];

    return answer;

}

function showLetter(letter, answer){
	var element;
    for(var i=0; i<answer.length; i++){
        if(answer.charAt(i)===letter){
            element = document.getElementById("letter_" + i);
            element.innerText = letter;
        }
    }
}

function showGuesses(guessedLetters){
	var element = document.getElementById("letters");
    element.innerText = "";

    for(var i=0; i<guessedLetters.length; i++){
    	letter = guessedLetters[i];
        element.innerText += letter + "";
    }
}

function createBoard(answer){
    var gameBoard = document.getElementById("gameBoard");

    for(var i=0; i<answer.length; i++){
        gameBoard.innerHTML += "<div style=\"float:left;margin:20px;\" id=letter_" + i + "> _ </div>";
    }

    updateTries();
}

function updateTries(){
    var guesses = document.getElementById("tries");
    guesses.innerText = tries;
}
