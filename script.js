/*JavaScript for the War Card Game (Project 1)*/

//const all the classes from the html file to js
const restartBtn = document.querySelector(".restart");
const player1Btn = document.querySelector(".player1Btn");
const player1Facedown = document.querySelector(".facedownText1");
const player2Facedown = document.querySelector(".facedownText2");
const player1Faceup = document.querySelector(".faceupText1");
const player2Faceup = document.querySelector(".faceupText2");
const winLose = document.querySelector(".winLose");
const suit = document.querySelector(".suits1");
let input = document.querySelector(".input");
const start = document.querySelector(".start");
const firstSection = document.querySelector(".firstSection");
const main = document.querySelector(".main-container");
const playerOneName = document.querySelector(".player1");

/*Functions*/

/* Create the deck of cards */
const suits = ["diamonds", "hearts", "spades", "clubs"];
const num = [
  "ace",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "jack",
  "queen",
  "king",
];

/* Function to build the deck */
function getDeck(suits, nums) {
  let deck = [];

  for (let i = 0; i < suits.length; i++) {
    for (let j = 0; j < nums.length; j++) {
      //create obj for the card
      let card = {
        suit: suits[i],
        number: nums[j],
        img: `img/52cards/${nums[j]}_of_${suits[i]}.png`,
        // img: `img/52cards/king_of_hearts.png`,
      };
      //push card into deck
      deck.push(card);
    }
  }

  return deck;
}

/* Function to shuffle the deck of cards */
function shuffleDeck(deck) {
  let currIndex = deck.length,
    randomIndex;

  while (currIndex != 0) {
    randomIndex = Math.floor(Math.random() * currIndex);
    currIndex--;

    [deck[currIndex], deck[randomIndex]] = [deck[randomIndex], deck[currIndex]];
  }

  return deck;
}

/* Function to deal a card */
function dealCard(deck) {
  return deck.pop();
}

/* Function to change the value of ace, jack, queen, and king into numbers */
function getValue(value) {
  if (value == "ace") {
    value = 1;
  } else if (value == "jack") {
    value = 11;
  } else if (value == "queen") {
    value = 12;
  } else if (value == "king") {
    value = 13;
  }
  return value;
}

//get the winner between the two cards
function winnerIs(card1, card2) {
  //temp values to hold the card number
  let value1 = card1.number;
  let value2 = card2.number;

  value1 = getValue(value1);
  value2 = getValue(value2);

  // //give values to the letters
  // if (value1 == "ace") {
  //   value1 = 1;
  // } else if (value1 == "jack") {
  //   value1 = 11;
  // } else if (value1 == "queen") {
  //   value1 = 12;
  // } else if (value1 == "king") {
  //   value1 = 13;
  // }
  // if (value2 == "ace") {
  //   value2 = 1;
  // } else if (value2 == "jack") {
  //   value2 = 11;
  // } else if (value2 == "queen") {
  //   value2 = 12;
  // } else if (value2 == "king") {
  //   value2 = 13;
  // }

  //find the greater value between card1 and card2
  let winnerIs = Math.max(value1, value2);
  //return the greater card
  if (winnerIs == value1) {
    return card1;
  } else {
    return card2;
  }
}

/*winner takes the card and places it at the button of the deck*/
function placeCardBottom(deck, card1, card2) {
  // console.log(deck, card1, card2);
  return deck.unshift(card1, card2);
}

/* Draw function button */
function draw(event) {
  event.preventDefault();

  if (player1Deck.length !== 52 || player2Deck.length !== 52) {
    let tempArr1 = [];
    let tempArr2 = [];

    //Dealing the cards for both players
    let player1Card = dealCard(player1Deck);
    let player2Card = dealCard(player2Deck);

    //displaying the new deck count
    player1Facedown.textContent = player1Deck.length;
    player2Facedown.textContent = player2Deck.length;

    //displaying the dealt card face up
    player1Faceup.setAttribute("src", player1Card.img);
    player2Faceup.setAttribute("src", player2Card.img);

    /* Find the winner*/

    if (player1Card.number === player2Card.number) {
      tempArr1 = [
        player1Card,
        dealCard(player1Deck),
        dealCard(player1Deck),
        dealCard(player1Deck),
      ];
      player1Card = dealCard(player1Deck);
      player1Facedown.textContent = player1Deck.length;
      player1Faceup.textContent = player1Card.number;
      tempArr2 = [
        player2Card,
        dealCard(player2Deck),
        dealCard(player2Deck),
        dealCard(player2Deck),
      ];
      player2Card = dealCard(player2Deck);
      player2Facedown.textContent = player2Deck.length;
      player2Faceup.textContent = player2Card.number;
    }
    const winner = winnerIs(player1Card, player2Card);
    console.log(winner);

    if (winner.number == player1Card.number) {
      player1Deck = player1Deck.concat(tempArr1);
      placeCardBottom(player1Deck, player1Card, player2Card);
      player1Facedown.textContent = player1Deck.length;
      winLose.textContent = " Player 1 WON THE ROUND";
    } else {
      player2Deck = player2Deck.concat(tempArr2);
      placeCardBottom(player2Deck, player1Card, player2Card);
      player2Facedown.textContent = player2Deck.length;
      winLose.textContent = "Player 2 WON THE ROUND";
    }
  } else if (player1Deck.length === 52) {
    winLose.textContent = "Player 1 Wins!";
  } else if (player2Deck.length === 52) {
    winLose.textContent = "Player 2 Wins!";
  }
}
/*restart button function*/
function restart(event) {
  event.preventDefault();
  //get the deck
  const deck = getDeck(suits, num);
  //shuffle the deck
  shuffleDeck(deck);
  //split the deck in half for the two players
  const half = Math.ceil(deck.length / 2);
  let player1Deck = deck.slice(0, half);

  let player2Deck = deck.slice(-half);
  player1Facedown.textContent = player1Deck.length;
  player2Facedown.textContent = player2Deck.length;
  // player1Faceup.textContent = "Face Up Cards";
  // player2Faceup.textContent = "Face Up Cards";
  player1Faceup.setAttribute("src");
  player2Faceup.setAttribute("src");
  winLose.textContent = " ";
}

/* Start Function */
function startGame(event) {
  event.preventDefault();
  console.log(input.value);

  playerOneName.textContent = input.value.toUpperCase();
  input.value = firstSection.style.display = "none";
  main.classList.remove("hidden");
}

//get the deck
const deck = getDeck(suits, num);
//shuffle the deck
shuffleDeck(deck);
//split the deck in half for the two players
const half = Math.ceil(deck.length / 2);
let player1Deck = deck.slice(0, half);

let player2Deck = deck.slice(-half);
player1Facedown.textContent = player1Deck.length;
player2Facedown.textContent = player2Deck.length;

/* Calling the functions */

start.addEventListener("click", startGame);
player1Btn.addEventListener("click", draw);
restartBtn.addEventListener("click", restart);
