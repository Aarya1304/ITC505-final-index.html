const gameBoard = document.querySelector('.game-board');
const targetDisplay = document.getElementById('target');
const movesDisplay = document.getElementById('moves');
const timeDisplay = document.getElementById('time');
const newGameButton = document.querySelector('.new-game');

let targetMoves = 8; // Target moves
let currentMoves = 0;
let timeElapsed = 0;
let intervalId;

// Create a game button at row and col
function createButton(row, col) {
  const button = document.createElement('button');
  button.classList.add('game-button');
  button.dataset.row = row;
  button.dataset.col = col;
  button.addEventListener('click', () => handleLightToggle(row, col));
  gameBoard.appendChild(button);
}

// Toggle a light and its neighbors
function handleLightToggle(row, col) {
  toggleLight(row, col);
  if (row > 0) toggleLight(row - 1, col); // Up
  if (row < 4) toggleLight(row + 1, col); // Down
  if (col > 0) toggleLight(row, col - 1); // Left
  if (col < 4) toggleLight(row, col + 1); // Right

  currentMoves++;
  movesDisplay.textContent = currentMoves;

  if (isGameWon()) {
    clearInterval(intervalId);
    setTimeout(() => alert('You win!'), 100); // Delay alert slightly
  }
}

function toggleLight(row, col) {
  const button = gameBoard.children[row * 5 + col];
  button.classList.toggle('is-off');
}

function isGameWon() {
  return Array.from(gameBoard.children).every(button => button.classList.contains('is-off'));
}

function updateTimer() {
  timeElapsed++;
  const minutes = Math.floor(timeElapsed / 60);
  const seconds = timeElapsed % 60;
  timeDisplay.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

function generateBoard() {
  gameBoard.innerHTML = ''; // Clear board
  for (let row = 0; row < 5; row++) {
    for (let col = 0; col < 5; col++) {
      createButton(row, col);
    }
  }

  // Randomize initial state
  for (let i = 0; i < 25; i++) {
    const randomRow = Math.floor(Math.random() * 5);
    const randomCol = Math.floor(Math.random() * 5);
    toggleLight(randomRow, randomCol);
  }
}

function newGame() {
  generateBoard();
  currentMoves = 0;
  timeElapsed = 0;
  movesDisplay.textContent = '0';
  timeDisplay.textContent = '0:00';
  clearInterval(intervalId);
  intervalId = setInterval(updateTimer, 1000);
}

newGameButton.addEventListener('click', newGame);
newGame();
