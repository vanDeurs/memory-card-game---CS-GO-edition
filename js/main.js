const cards = document.querySelectorAll('.card');

let firstCard, secondCard;
let hasFlippedCard = false;
let lockBoard = false;

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.toggle('flip');
    
    if (!hasFlippedCard) {
        // First card
        hasFlippedCard = true;
        firstCard = this;
    } else {
        // Second card
        hasFlippedCard = false;
        secondCard = this;

        checkForMatch();
    }
}


function checkForMatch() {
    let isMatch = firstCard.dataset.weapon === secondCard.dataset.weapon;
    isMatch ? disableCards() : unFlipCards();
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
}

function unFlipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        lockBoard = false;
    }, 1200);
}

(function shuffleCards() {
    cards.forEach(card => {
        let randomPosition = Math.floor(Math.random() * 12);
        card.style.order = randomPosition;
    });
})();


// Add event listener.
cards.forEach(card => card.addEventListener('click', flipCard));