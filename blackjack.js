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
    return
