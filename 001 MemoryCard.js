// To get a deck of cards with 2 cards of each type according to the num of pairs the user want to play
const board = document.getElementById("game-table")         // <div id="game-table" class="game-table">
const players = document.getElementById("players")          // <div id="players">
const ranValueOut = document.getElementById('ranValueOut')  //<output name="x" id="ranValueOut">10</output> pairs
const ran = document.getElementById('ran')                  // <input type="range" id="ran" name="ran" min="3" max="25" value="10">
const startGame = document.getElementById('startGame')      // <button type="submit" id="startGame">

let numPairs;
let numPlayers;
let cards = ['0'];
let count = 0;                                              // to count number os moves
let countTrue = 0;                                          // to count only the match moves
let playBoard = [];                                         // create a array to count players points
let playersCount = 0;                                       // counter used to change players turn
let nPoint = 0;                                             // to check if there is players with more points 
let finalPlayer = 0                                         // to save the players with more points

ran.addEventListener('input', newValue)                     // adding event to range newValue()

function newValue() {                                       // func thats change to value of range on screen
    ranValueOut.innerText = ran.value
}

ran.addEventListener('input', newValue)                     // adding newValue()

function newValue() {                                       //Will update range value to user
    ranValueOut.innerText = ran.value
    numPairs = ran.value
}

startGame.addEventListener('click', show)                   // adding event to start game button show()

function show() {
    cards = ['0']
    countTrue = 0
    count = 0;
    playersCount = 1
    nPoint = 0
    playBoard = [];
    document.getElementById('wellcome').innerText = ''      // deleting the Wellcome text

    document.getElementById("count").innerHTML = count;     // updating the num of tries to user
    clearBoard()                                            // Clear cards and Payers before next game
    numPairs = Number(document.getElementById('ran').value) // Takes NumPairs value from the user

    shuffle(numPairs)

    cards00 = document.querySelectorAll(".memory-card");    // finding all the memory cards
    cards00.forEach(card => card.addEventListener('click', flipCard));  // adding a event to each card flipCard()

    numPlayers = Number(document.getElementById('numPlayers').value)    // taking the num of players from user
    numPlayers = checkNumPlayers(numPlayers)                // checking is the num of players is relevant to the game 

    createPlayBoard(numPlayers)
    createPlayers(numPlayers)
    document.getElementById('players' + playersCount).dataset.back = 'back' // marking the turn os the first player
}

//Clear cards and Payers before next game
function clearBoard() {
    // Clear Cards
    let divMC = document.querySelectorAll('.memory-card');
    for (i = 0; div00 = divMC[i]; i++) {
        div00.parentNode.removeChild(div00);
    }
    //Clear Players
    let divP = document.querySelectorAll('.play');
    for (i = 0; div00 = divP[i]; i++) {
        div00.parentNode.removeChild(div00);
    }
}

// shuffle(numPairs)
//SHUFFLE----------------------------------------------------------------------------------------
function shuffle(numPairs) {
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
    createGame(cards)
}

//Creating tags for cards under board (<section id="game-table" class="game-table"></section>)
//Every CARD is build by a div with front-face (img) back-face (letters by shuffle())
function createGame(cards) {
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
}

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

//Checking is the innerText values from first and second cards matches
function checkForMatch() {
    let isMatch = firstCard.innerText === secondCard.innerText;
    // console.log(isMatch);                                    //expected true or false
    count++ // Count the numbers of tryes to finish the game
    document.getElementById("count").innerHTML = count;         //sending the count value to html

    isMatch ? disableCards() | countTrue++ | (countTrue == numPairs ? setTimeout(congratulation, 500) : null) | setTimeout(deleteCards, 1500) | addPoint()
        : (unflipCards(), changePlayer());
    //setTimeout will wait 0.5sec to start the function congratulation
    //setTimeout will wait 1.5sec to start the function deleteCards
}
let flag = 0
//Shows a alert with congratulation to user
function congratulation() {
    playBoard.find(v => v.player == playersCount ? (alert(`Congratulations!!!\n The Player ${v.player} finished the Game...`), nPoint = v.points, finalPlayer = v.player) : null);
    // }
    playBoard.forEach((v) => {
        if (nPoint < v.points) {
            nPoint = v.points
            finalPlayer = v.player
            alert('but he is not the winner')
        }
    })
    playBoard.forEach((v) => {
        if (nPoint == v.points) {
            flag++;
        }
    })
    if (flag >= 2) {
        alert('there is a tie!!!\nPlay Again!!!')
    }
    if (flag == 1 && finalPlayer != 0) {
        alert(`Player ${finalPlayer} is the winner`)
    }
    // if (flag == 1 && finalPlayer == 0) {
    //     alert(`Player ${finalPlayer} is the winner`)
    // }

}

//disable cards. this way can not be a doble click on them 
function disableCards() {
    lockBoard = true;                              //Flag thats lock the board till the unMatch cards unFLip

    setTimeout(() => {                             //Waiting 1.5 sec to unflip cards
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);

        resetBoard();                              //Reset Flags after 1.5 sec timeout
    }, 1500);
}

// DELETE cards after match
function deleteCards() {
    for (i of document.getElementsByClassName("memory-card flip")) {
        i.classList.add('delete')
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

//Creating Divs for players Board on HTML
function createPlayers(numPlayers) {
    for (i = 1; i <= numPlayers; i++) {
        let elemDiv = document.createElement('div')       // create a div element
        elemDiv.id = ("players" + i)               // create a card class on div element  
        elemDiv.className = ('play')
        players.appendChild(elemDiv)

        let elemSpan = document.createElement('span')
        elemSpan.id = ('value' + i)
        elemSpan.innerText = (`Player ${i}: 0 points`)
        elemDiv.appendChild(elemSpan)
    }
}

//Adding Point to a player
function addPoint() {
    playBoard.find(v => v.player == playersCount ? (v.points++,
        document.getElementById('value' + playersCount).innerText = `Player ${playersCount}: ${v.points} points`) : null)
}

//Changing Player Turn //
function changePlayer() {
    (playersCount == numPlayers) ?
        playersCount = 1 | playBoard.find(v => v.player == playersCount ? delete document.getElementById('players' + (numPlayers)).dataset.back : null) :
        playersCount++ | playBoard.find(v => v.player == playersCount ? delete document.getElementById('players' + (playersCount - 1)).dataset.back : null);
    playBoard.find(v => v.player == playersCount ? document.getElementById('players' + playersCount).dataset.back = 'back' : null)
}

//Creating a Board with numPlayers and points = 0
function createPlayBoard(numPlayers) {
    for (i = 1; i <= numPlayers; i++) {
        createItem(i, 0)
    }
    function createItem(player, points) {
        jog = {
            player, points
        }
        playBoard.push(jog)
    }
}

function checkNumPlayers(numPlayers) {
    if (numPlayers <= 0) {
        numPlayers = 1
    }
    if (numPlayers > 8) {
        numPlayers = 8
    }
    return numPlayers
}
