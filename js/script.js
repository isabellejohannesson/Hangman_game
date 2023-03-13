// Globala variabler

const fruits = [
    "ANANAS", 
    "BANAN", 
    "AVOKADO", 
    "KIWI", 
    "LITCHI", 
    "ÄPPLE", 
    "SATSUMAS",
    "APELSIN",
    "STJÄRNFRUKT",
    "PÄRON"
];      // Array: med spelets alla ord

let selectedWord = "";
let hangmanImg = document.getElementById('hangman'); 
let msgHolderEl = document.querySelector('#message');     // DOM-nod: Ger meddelande när spelet är över
let startGameBtnEl = document.getElementById('startGameBtn');  // DOM-nod: knappen som du startar spelet med
let letterButtonEls = document.querySelector('#letterButtons'); // Array av DOM-noder: Knapparna för bokstäverna
let letterButtonsAll = document.querySelectorAll('#letterButtons button');
let letterBox; // <li> med ruta där bokstaven hamnar när den är rätt
let letterBoxEls; // <ul> som håller bokstavsrutor
let wrongGuesses = 0;
let maxWrong = 6;
let rightGuesses = [];
let guessedLetter;

  // Funktion som startar spelet vid knapptryckning, och då tillkallas andra funktioner
  function startGame() {
    resetGame();
    selectedWord = "";
    wrongGuesses = 0;
    maxWrong = 6;
    rightGuesses = [];
    guessedLetter;
    randomWord();
    createLetterBoxes();
    updateHangmanPicture();
 }
  // Reset-funktion som sätter disabled = false på alla knappar igen, för att ta bort disabled efter tryck
    function resetGame() {
    for(i = 0; i < selectedWord.length; i++) {
        let letterBoxes = document.querySelector('#letterBoxes > ul')
        letterBoxes.innerHTML = "";
    }

    for(i = 0; i < letterButtonsAll.length; i++) {
        letterButtonsAll[i].disabled = false;
    }

    letterButtonEls.addEventListener('click', clickfunction);

    msgHolderEl.innerHTML = "";
    startGameBtnEl.innerHTML = "Starta spelet"
 }

 startGameBtnEl.addEventListener('click', startGame);

 //Funktion som gör knappar disabled igen när sidan laddar och laddar om, samt tar bort eventlistener
 function reloadLetters() {
    for(i = 0; i < letterButtonsAll.length; i++) {
        letterButtonsAll[i].disabled = true;
    }

    letterButtonEls.removeEventListener('click', clickfunction);
 }

//Funktion för att slumpa fram ett ord ur arrayen:
function randomWord() {
    selectedWord = fruits[Math.floor(Math.random()*fruits.length)];
    return(selectedWord);
 }

 function createLetterBoxes() {
    letterBoxEls = document.querySelector('#letterBoxes > ul'); 
    
    for(i = 0; i < selectedWord.length; i++) {
        letterBox = document.createElement('li');
        letterBox.innerHTML = "<input type=\"text\" disabled=\"\" value=\"\">";
        letterBoxEls.appendChild(letterBox); 
    }
    return(letterBoxEls);
 }
 
 function addLetterToBox(i, guessedLetter) {
    letterBox = letterBoxEls.getElementsByTagName("li")[i]; 
    letterBox.innerHTML = "<input type=\"text\" disabled=\"\" value=\""+guessedLetter+"\">";
 }

 //Gissa fel-eller rätt-förfarande och koll om spelet är förlorat
function clickfunction(input) {
    if (wrongGuesses < maxWrong){
    guessedLetter = input.target.value;
    input.target.disabled = true;
    let isMiss = true;

    for(let i = 0; i < selectedWord.length; i++) {
        let currentLetterInSelectedWord = selectedWord.charAt(i);
        if(guessedLetter == currentLetterInSelectedWord) {
            addLetterToBox(i, guessedLetter);
            addLetterToRightGuesses();
            isMiss = false;
        } 
    }
    if(isMiss) {
        wrongGuesses++; 
        updateHangmanPicture();
        }
    }
    else{
        startGameBtnEl.innerHTML = "Försök igen"
        msgHolderEl.innerHTML = "Tyvärr, du förlorade! Försök igen!"
        }
}

 // Knapptrycksfunktion bokstäver
 letterButtonEls.addEventListener('click', clickfunction);

// Funktion som lägger rätt gissade bokstäver i en array och jämför med selectedWord för att kolla om spelet är vunnet
 function addLetterToRightGuesses() {
    rightGuesses.push(guessedLetter); 
    if(rightGuesses.length == selectedWord.length) {
    msgHolderEl.innerHTML = "Du vann! Bra jobbat!"
    startGameBtnEl.innerHTML = "Spela igen"
    }
 }

// Funktion som uppdaterar bilden i synk med antalet felgissningar

  function updateHangmanPicture() {
    hangmanImg.src = './images/' + wrongGuesses + '.svg';
  };
  