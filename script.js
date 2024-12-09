const gameBoard = document.querySelector('.game-board');
const targetDisplay = document.getElementById('target');
const movesDisplay = document.getElementById('moves');
const timeDisplay = document.getElementById('time');
const newGameButton = document.querySelector('.new-game');


let targetMoves = 8; // Adjust the target moves as needed
let currentMoves = 0;
let timeElapsed = 0;
let intervalId;

function createButton(row, col) {
  const button = document.createElement('button');
  button.classList.add('game-button');
  button.addEventListener('click', () => toggleLights(row, col));
  gameBoard.appendChild(button);
}

function updateTimer() {
    timeElapsed++;
    const minutes = Math.floor(timeElapsed / 60);
    const seconds = timeElapsed % 60;
    timeDisplay.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }

function toggleLights(row, col) {
  const button = gameBoard.children[row * 5 + col];
  button.classList.toggle('is-off');
  currentMoves++;
  movesDisplay.textContent = currentMoves;

  // Check for adjacent buttons and toggle them
  if (row > 0) {
    toggleLights(row - 1, col);
  }
  if (row < 4) {
    toggleLights(row + 1, col);
  }
  if (col > 0) {
    toggleLights(row, col - 1);
  }
  if (col < 4) {
    toggleLights(row, col + 1);
  }

  // Check for win condition
  if (isGameWon()) {
    clearInterval(intervalId);
    alert('You win!');
  }
}

function startTimer() {
    intervalId = setInterval(() => {
      timeElapsed++;
      const minutes = Math.floor(timeElapsed / 60);
      const seconds = timeElapsed % 60;
      timeDisplay.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }, 1000);
  }
  
  function newGame() {
    generateBoard();
    currentMoves = 0;
    timeElapsed = 0;
    movesDisplay.textContent = '0';
    timeDisplay.textContent = '0:00';
    clearInterval(intervalId); // Clear the previous interval
  intervalId = setInterval(updateTimer, 1000); // Start a new interval
  }

function isGameWon() {
  // Implement your win condition checking logic here
  // For example, you could check if all buttons are off
  return Array.from(gameBoard.children).every(button => button.classList.contains('is-off'));
}

function startTimer() {
  intervalId = setInterval(() => {
    timeElapsed++;
    const minutes = Math.floor(timeElapsed / 60);
    const seconds = timeElapsed % 60;
    timeDisplay.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }, 1000);
}

function newGame() {
  generateBoard();
  currentMoves = 0;
  timeElapsed = 0;
  movesDisplay.textContent = '0';
  timeDisplay.textContent = '0:00';
  clearInterval(intervalId);
  startTimer();
}

function generateBoard() {
  gameBoard.innerHTML = ''; // Clear the board

  for (let row = 0; row < 5; row++) {
    for (let col = 0; col < 5; col++) {
      createButton(row, col);
    }
  }

  // Randomize the initial state
  for (let i = 0; i < 25; i++) {
    const randomRow = Math.floor(Math.random() * 5);
    const randomCol = Math.floor(Math.random() * 5);
    toggleLights(randomRow, randomCol);
  }
}

newGame();