let balance = 1000; // Starting balance

// Function to add funds in increments of 1000
function addFunds() {
  balance += 1000;
  document.getElementById("balance").innerText = `$${balance.toFixed(2)}`;
}

// Function to start the Blackjack game
function startBlackjack() {
  // Save current balance to localStorage for the Blackjack game
  localStorage.setItem('balance', balance);
  window.location.href = "blackjack.html"; // Link to Blackjack page
}
