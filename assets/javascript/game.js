
var guessedLetters = [];
var tries = 14;
var gameCounter = 0;
var wins = 0;

var islandList = ["sumatra", "tahiti", "bora bora",
                  "bali", "maui", "boracay", "aruba",
                  "palawan", "hawaii", "jamaica", 
                  "ibiza", "madagascar", "malta"];
var photoList = [
  "320px-Flag_of_Indonesia.png",
  "320px-Flag_of_French_Polynesia.png",
  "320px-Flag_of_French_Polynesia.png",
  "320px-Flag_of_Indonesia.png",
  "320px-Flag_of_the_United_States.png",
  "320px-Flag_of_the_Philippines.png",
  "320px-Flag_of_Aruba.png",
  "320px-Flag_of_the_Philippines.png",
  "320px-Flag_of_the_United_States.png",
  "320px-Flag_of_Jamaica.png",
  "320px-Ibiza_flag.png",
  "320px-Flag_of_Madagascar.png",
  "320px-Flag_of_Malta.png"
];

 // Initialize the first game board.
var answer = chooseGameAnswer();
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
        playSound();
    }
    tries = 14;
    gameCounter = 0;
    guessedLetters = [];
    answer = chooseGameAnswer();
    createBoard(answer);
    showGuesses(guessedLetters);
}

function chooseGameAnswer(){

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

        if(element.innerText === ""){
            element.innerText += letter;
        } else {
            element.innerText += ", " + letter;
        }
    }
}

function createBoard(answer){

    var gameBoard = document.getElementById("gameBoard");

    gameBoard.innerHTML = "";
    for(var i=0; i<answer.length; i++){
        // Skip over spaces in the answer.
        if(answer[i] === " "){
            gameBoard.innerHTML +=
              "<div class='letter' id='letter_" + i + "'> </div>";
              gameCounter++;
        } else{
            gameBoard.innerHTML += 
              "<div class='letter' id='letter_" + i + "'> _ </div>";
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

    var idx = islandList.indexOf(answer);
    var img = document.getElementById("image");
    img.innerHTML = "<img src='assets/images/" + photoList[idx] + "'></>";
}

function playSound() {

    var mp3s = [
      "assets/sounds/Ding-ding-ding-sound.mp3",
      "assets/sounds/Quack-sound-effect.mp3",
      "assets/sounds/Sea-waves-sound.mp3",
      "assets/sounds/Ta-da-orchestra-fanfare.mp3",
      "assets/sounds/Twinkle-sound-effect.mp3"
    ];

    var max = mp3s.length -1;

    // Choose a random sound.
    index = Math.floor(Math.random() * (max + 1));

    var audioElement = document.createElement("audio");
    audioElement.src = mp3s[index];

    audioElement.play();
}