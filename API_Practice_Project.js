
const deckUrl = 'https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1';
const message1 = document.getElementById('message1');
const message2 = document.getElementById('message2');
let drawUrl = '';
let deckId = '';

const clearCards = function() {
    for (i = 0; i < 5; i++) {
        document.getElementById('card' + i).innerHTML = '';
        document.getElementById('card' + i).style = 'display: none;'
    }
}

const shuffleDeck = async () => {
    try {
        const response = await fetch(`${deckUrl}`, {
            method: 'GET'
        });
    console.log('Response =', response);
    const newDeck = await response.json();
    console.log('New Deck = ', newDeck);
    console.log(newDeck.deck_id);
    deckId = newDeck.deck_id;
    message1.textContent = 'A new deck has been shuffled.';
    message2.textContent = 'The deck contains 52 cards.';
    clearCards();
    }
    catch (err) {console.error('Error in shuffleDeck', err); }
}

const drawCards = async (numCards) => {
    drawUrl = 'https://www.deckofcardsapi.com/api/deck/' + deckId + '/draw/?count=' + numCards;
    try {
        const response = await fetch(`${drawUrl}`, {
            method: 'GET'
        });
    console.log('Response =', response);
    const newCards = await response.json();
    console.log('New Cards = ', newCards.cards);
    clearCards();
    for (i = 0; i < newCards.cards.length; i++) {
        const img = document.createElement('img');
        img.src = newCards.cards[i].image;
        document.getElementById('card' + i).style = 'display: inline-block;';
        document.getElementById('card' + i).innerHTML = '<img src =' + img.src + '></img>';
    }
        message2.textContent = 'The deck now contains ' + newCards.remaining + ' cards.';
    } 
    catch (err) {console.error('Error in drawCards', err); }
}

// const quoteUrl = 'https://zenquotes.io/api';
// const getRandomQuote = async () => {
//     console.log(`${quoteUrl}/quotes/`)
//     try {
//         const response = await fetch(`${quoteUrl}/quotes/`, {
//             mode: 'no-cors',
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//         });
    
//     console.log('Response =', response);
//     const randomQuote = await response.json();
//     console.log('Random Quote = ', randomQuote);
//     } 
//     catch (err) {console.error('Error in getRandomQuote', err); }
// }
