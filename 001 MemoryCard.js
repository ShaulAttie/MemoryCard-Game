// To get a deck of cards with 2 cards of each type according to the num of pairs the user wanto to play
let numPairs = 2; // usar range 6 ate 25
// let ranVal = document.getElementById('ran')
//         console.log(ranVal);
// let numPairs = document.getElementsByTagName('ranValue')
let cards = ['0'];

//SHUFFLE----------------------------------------------------------------------------------------
(function shuffle() {
    for (i = 0; i < numPairs * 2; i++) {
        //Creating Characters based in numPairs. random (num 0->1). range (65->65+numPairs). fromCharCode (num->Letters). String (result->string)
        let card = String.fromCharCode(Math.floor(Math.random() * ((65 + numPairs) - 65) + 65));
        let count = 0;

        cards.forEach(check)
        //Checking for max of 2 idem cards
        function check(elem) {
            ((elem.search(card) !== -1 && count < 2) ? count++ : null);

        }
        // if there are 2 idem cards i is not going foward so i'm using i-- giving place for a new card on that spot
        ((count < 2) ? cards[i] = card : i--);
    }
})(); // puting the function inside () and adding in the end (); will call the the function at first

let board = document.getElementById("game-table") // Section Id on .html 

//Creating tags for cards under board (<section id="game-table" class="game-table"></section>)
//Every CARD is build by a div with front-face (img) back-face (letters by shuffle())
for (i in cards) {
    //add a <div> every x cards, board child
    let elemA = document.createElement('div')       // create a div element
    elemA.className = ("memory-card")               // create a card class on div element  
    board.appendChild(elemA)                        // connect the element to his father board (.game-table)

    let cardDown = document.createElement('div')    // create a div element
    cardDown.innerText = (cards[i])                 // add a inner text with cards game
    cardDown.className = ("back-face")
    elemA.appendChild(cardDown)                     // connect to his father div .memory-card

    let imgUp = document.createElement('img')
    imgUp.className = ("front-face")
    imgUp.src = ("card.jpg")                        //image inside dir
    elemA.appendChild(imgUp)                        // connect to his father div .memory-card

}
console.log(board);

// creates a NodeList (cards00) with all .memory-card tags. in this case <div>
let cards00 = document.querySelectorAll(".memory-card");

let hasFlippedCard = false;                 // FLAG that tell if card has been flipped
let lockBoard = false;                      // can't click another card till the cards turn over again
let firstCard, secondCard;

function flipCard() {
    if (lockBoard) return;                  //Condition thar lock the board with lockBoard flag in unFlipCards()
    if (this === firstCard) return;         //After clicked first cards the card will be stored at "this"
    //after click second card is is the same as this (first card) we will exit the function 

    this.classList.add('flip');             //so knowing the elem clicked by "this" we "add" a new class "flip" to it . 
    //there is a option o "toggle" instead of "add" that will add or remove the class depending on preview state
    // console.log('work');                 //just checking if the function work when card is clicked
    // console.log(this);                   //shows on console the element that was clicked

    if (!hasFlippedCard) {
        //first click
        hasFlippedCard = true;              //turning the flag to true after clicked
        firstCard = this;                   //now we know where we clicked with "this". we store the info to firstCard
        // console.log({ hasFlippedCard, firstCard });
        return; // no need for else
    }
    // else {
    // //second click
    //     hasFlippedCard = false;
    //     secondCard = this;
    //     // console.log({ firstCard, secondCard });
    // }
    // console.log(firstCard.innerText);                //to see what letter was behind the firstCard
    // console.log(secondCard.innerText);               // to see what letter was behind the secondCard

    secondCard = this;                  //now we know where we clicked with "this". we store the info to secondCard
    checkForMatch();
}

let count = 0;
let countTrue = 0;

//Checking is the innerText values from first and second cards matches
function checkForMatch() {
    let isMatch = firstCard.innerText === secondCard.innerText;
    // console.log(isMatch);                                    //expected true or false
    count++ // Count the numbers of tryes to finish the game

    document.getElementById("count").innerHTML = count;         //sending the count value to html

    isMatch ? disableCards() | setTimeout(congratultion, 500) | setTimeout(deleteCards, 2000) : unflipCards();
    //setTimeout will wait 0.5sec to start the function congratulation
    //setTimeout will wait 2sec to start the function deleteCards
}

//Shows a alert with congratulation to user
function congratultion() {
    countTrue++                 // when a match occour countTrue goes up and when is = to numPairs the game is over
    (countTrue == numPairs) ? alert('Congratulations!!! You finish the game in ' + count + ' moves.') : null;
}

//disable cards. this way can not be a doble click on them 
function disableCards() {

    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}

function deleteCards() {
    let teste = document.getElementsByClassName("memory-card flip")
    for (i in teste) {
        teste[i].classList.add('delete')
    }
}

//Will flip the cards again if is not a match. And removing "flip" className so we can click on the same card again.
function unflipCards() {
    lockBoard = true;                              //Flag thats lock the board till the unMatch cards unFLip

    setTimeout(() => {                             //Waiting 1.5 sec to unflip cards
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();                              //Reset Flags after 1.5 sec timeout
    }, 1500);
}

//Reset FLAG and Cards info
function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];       //reset flags
    [firstCard, secondCard] = [null, null];             //reset cards

}

//for Each card on cards00 we add a Click Event that will activate the function flipCard
cards00.forEach(card => card.addEventListener('click', flipCard));
