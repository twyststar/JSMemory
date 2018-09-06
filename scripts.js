const cards = document.querySelectorAll(".memory-card");

let hasFlippedCard = false;
let lockBoard = false; //Will be our lock state to prevent more than 2 cards flipped at once
let firstCard, secondCard;

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
}

// Remove click flip from cards, effectively removing them from the game
function disableCards() {
  firstCard.removeEventListener('ckick', flipCard);
  secondCard.removeEventListener('click', flipCard);

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

(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();

cards.forEach(card => card.addEventListener("click", flipCard));
