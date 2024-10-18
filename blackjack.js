let playerHand = [];
let dealerHand = [];
let playerBalance = parseFloat(localStorage.getItem('balance')) || 1000; // Get balance from localStorage
let currentBet = 0;
let deck = [];

document.getElementById("balance").innerText = `$${playerBalance.toFixed(2)}`;

// Function to start a new round
function placeBet() {
  const betAmount = parseInt(document.getElementById('bet-amount').value);
  
  if (betAmount > playerBalance || betAmount <= 0) {
    alert("Invalid bet amount.");
    return;
  }
  
  currentBet = betAmount;
  playerBalance -= currentBet;
  document.getElementById("balance").innerText = `$${playerBalance.toFixed(2)}`;
  
  // Start a new round
  startNewGame();
}

// Function to initialize a new game
function startNewGame() {
  deck = createDeck();
  playerHand = [drawCard(), drawCard()];
  dealerHand = [drawCard(), drawCard()];

  updateHands();
  checkForBlackjack();
}

// Function to create a new deck
function createDeck() {
  let suits = ['♠', '♥', '♦', '♣'];
  let values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
  let newDeck = [];
  
  for (let suit of suits) {
    for (let value of values) {
      newDeck.push({ value, suit });
    }
  }
  
  return shuffleDeck(newDeck);
}

// Shuffle the deck
function shuffleDeck(deck) {
  for (let i = deck.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
}

// Function to draw a card from the deck
function drawCard() {
  return deck.pop();
}

// Function to calculate the hand value
function calculateHandValue(hand) {
  let value = 0;
  let aces = 0;
  
  for (let card of hand) {
    if (card.value === 'A') {
      value += 11;
      aces++;
    } else if (['K', 'Q', 'J'].includes(card.value)) {
      value += 10;
    } else {
      value += parseInt(card.value);
    }
  }

  // Adjust for Aces
  while (value > 21 && aces > 0) {
    value -= 10;
    aces--;
  }
  
  return value;
}

// Function to update the hands displayed on the page
function updateHands() {
  const dealerHandEl = document.getElementById('dealer-hand');
  const playerHandEl = document.getElementById('player-hand');
  
  dealerHandEl.innerText = dealerHand.map(card => `${card.value}${card.suit}`).join(' ');
  playerHandEl.innerText = playerHand.map(card => `${card.value}${card.suit}`).join(' ');
}

// Player chooses to hit
function hit() {
  playerHand.push(drawCard());
  updateHands();
  
  const playerValue = calculateHandValue(playerHand);
  
  if (playerValue > 21) {
    endGame('Bust! You lose.');
  }
}

// Player chooses to stand
function stand() {
  let dealerValue = calculateHandValue(dealerHand);
  
  while (dealerValue < 17) {
    dealerHand.push(drawCard());
    dealerValue = calculateHandValue(dealerHand);
  }
  
  updateHands();
  determineWinner();
}

// Check for immediate Blackjack
function checkForBlackjack() {
  const playerValue = calculateHandValue(playerHand);
  const dealerValue = calculateHandValue(dealerHand);
  
  if (playerValue === 21) {
    endGame('Blackjack! You win.');
  } else if (dealerValue === 21) {
    endGame('Dealer has Blackjack! You lose.');
  }
}

// Function to determine the winner
function determineWinner() {
  const playerValue = calculateHandValue(playerHand);
  const dealerValue = calculateHandValue(dealerHand);
  
  if (dealerValue > 21 || playerValue > dealerValue) {
    endGame('You win!');
  } else if (playerValue < dealerValue) {
    endGame('You lose.');
  } else {
    endGame('It\'s a tie.');
  }
}

// End the game with a result
function endGame(result) {
  document.getElementById('result').innerText = result;
  
  if (result.includes('win')) {
    playerBalance += currentBet * 2; // Player wins double the bet
  }
  
  document.getElementById("balance").innerText = `$${playerBalance.toFixed(2)}`;
  localStorage.setItem('balance', playerBalance); // Save updated balance
}

// Go back to the casino
function goBack() {
  window.location.href = 'index.html'; // Replace with your casino's main page
}
