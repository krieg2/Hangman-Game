
var answer = chooseGameAnswer();
var guessedLetters = [];
var tries = 14;
var gameCounter = 0;
var wins = 0;
createBoard(answer);


document.onkeyup = function(event) {

    var keyPressed = event.key;
    keyPressed = keyPressed.toLowerCase();

    var regEx = /^[a-z]$/;
    if(regEx.test(keyPressed) &&
       !guessedLetters.includes(keyPressed)){

        guessedLetters.push(keyPressed);
        showGuesses(guessedLetters);

        if(answer.includes(keyPressed)){

            showLetter(keyPressed, answer);
            if(gameCounter===answer.length){

            	updateLastAnswer(answer);
            	resetGame(true);
            }
        } else{

            tries--;
            updateTries();

            if(tries===0){
            	resetGame(false);
            }
        }
    }
}

function resetGame(won){

    if(won===true){
        wins++;
        updateWins();
    }
    tries = 14;
    gameCounter = 0;
    guessedLetters = [];
    answer = chooseGameAnswer();
    createBoard(answer);
    showGuesses(guessedLetters);
}

function chooseGameAnswer(){

    var islandList = ["sumatra", "tahiti", "bora bora",
                      "bali", "maui", "boracay", "aruba",
                      "palawan", "honolulu", "jamaica"];

    var answer = "";
    var index = 0;
    var max = islandList.length -1;

    // Random game answer.
    index = Math.floor(Math.random() * (max + 1));
    answer = islandList[index];

    return answer;
}


function showLetter(letter, answer){

	var element;
    for(var i=0; i<answer.length; i++){
        if(answer.charAt(i)===letter){
            element = document.getElementById("letter_" + i);
            element.innerText = letter;
            gameCounter++;
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

    gameBoard.innerHTML = "";
    for(var i=0; i<answer.length; i++){
        // Skip over spaces in the answer.
        if(answer[i] === " "){
            gameBoard.innerHTML +=
              "<div class=\"letter\" id=\"letter_" + i + "\"> </div>";
              gameCounter++;
        } else{
            gameBoard.innerHTML += 
              "<div class=\"letter\" id=\"letter_" + i + "\"> _ </div>";
        }
    }

    updateTries();
}

function updateTries(){

    var element = document.getElementById("tries");
    element.innerText = tries;
}

function updateWins(){

    var element = document.getElementById("wins");
    element.innerText = wins;
}

function updateLastAnswer(answer){

    var element = document.getElementById("lastAnswer");
    element.innerText = answer;
}