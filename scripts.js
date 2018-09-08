const cards = document.querySelectorAll(".memory-card");

let hasFlippedCard = false;
let lockBoard = false; //Will be our lock state to prevent more than 2 cards flipped at once
let firstCard, secondCard;
let counter = 0;
let matches = 0;

const winDiv = document.getElementById("win-div");
const wrapper = document.getElementById("wrapper");

function flipCard() {
  if (lockBoard) return; //Does not allow a flip until a card is hidden or matched when true
  if (this === firstCard) return; //Does not allow the same card to be clicked twice in a turn
  this.classList.add("flip");

  if(!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    return;
  }

  secondCard = this;

  checkForMatch();
}

// Original match check
// function checkForMatch() {
//   if (firstCard.dataset.name === secondCard.dataset.name) {
//     disableCards();
//     return;
//   }
//    unFlipCards();
// }

// More 'elegant' match check using ternary operator
function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
  isMatch ? disableCards() : unFlipCards();
  counter += 1;
  checkWin();
  document.getElementById('counter-display').innerHTML = "TURNS: " + counter;
}

// Remove click flip from cards, effectively removing them from the game
// Check for 6 matches, trigger win banner div visibility
function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  matches += 1;
  resetBoard();
}

// Turn cards back over if not a match
function unFlipCards() {
  lockBoard = true; //Prevents more than these two from being flipped
  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    resetBoard();
  }, 1500); 
}

//Will reset card variables between turns. Using ES6 destructuring assignment
function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

function checkWin() {
  if (matches === 6) {
    document.getElementById("win-display").innerHTML = "You won in " + counter + " turns!";
    winDiv.classList.remove("hidden");
    wrapper.classList.add("faded");
  }
}

(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();

function reloadPage(){
  location.reload();
}

cards.forEach(card => card.addEventListener("click", flipCard));

