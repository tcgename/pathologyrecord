const cards = document.querySelectorAll('.card');
const remainingCountElement = document.getElementById('remainingCount');
let remainingCards = Array.from(cards);
let displayedCards = new Set();

document.getElementById('randomButton').addEventListener('click', function() {
    if (remainingCards.length === 0) return;

    const randomIndex = Math.floor(Math.random() * remainingCards.length);
    const selectedCard = remainingCards[randomIndex];
    
    cards.forEach(card => {
        card.style.display = 'none';
    });
    selectedCard.style.display = 'block';

    displayedCards.add(selectedCard);
    remainingCards = remainingCards.filter(card => !displayedCards.has(card));
    
    updateRemainingCount();
});

document.getElementById('resetButton').addEventListener('click', function() {
    remainingCards = Array.from(cards);
    displayedCards.clear();
    cards.forEach(card => {
        card.style.display = 'none';
        card.classList.remove('show-text'); // Remove text display class
    });
    updateRemainingCount();
});

cards.forEach(card => {
    card.addEventListener('click', function() {
        this.classList.toggle('show-text'); // Toggle text display on click
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const randomIndex = Math.floor(Math.random() * cards.length);
    cards[randomIndex].style.display = 'block';

    displayedCards.add(cards[randomIndex]);
    remainingCards = remainingCards.filter(card => !displayedCards.has(card));
    
    updateRemainingCount();

    // Simulate a delay to display the loader (e.g., 2 seconds)
    setTimeout(function() {
        document.getElementById('loader').style.display = 'none';
        const content = document.querySelector('.content');
        content.style.display = 'flex';
        content.style.flexDirection = 'column';
        content.style.alignItems = 'center';

        // Animate the content
        document.querySelectorAll('.content > *').forEach((element, index) => {
            setTimeout(() => {
                element.style.opacity = 1;
                element.style.animation = 'slideIn 0.5s ease-out';
            }, index * 100); // Stagger the animation of each element
        });
    }, 2000);
});

function updateRemainingCount() {
    remainingCountElement.textContent = remainingCards.length;
}
