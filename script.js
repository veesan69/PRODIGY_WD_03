const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const message = document.getElementById('message');
const restartButton = document.getElementById('restartButton');

let currentPlayer = 'X';
let gameActive = true;
let gameState = ['', '', '', '', '', '', '', '', ''];

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

const handleCellClick = (index) => {
  if (gameState[index] !== '' || !gameActive) return;

  gameState[index] = currentPlayer;
  cells[index].innerText = currentPlayer;
  cells[index].classList.add(currentPlayer);

  checkWin();
  checkDraw();

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
};

const checkWin = () => {
  winningConditions.forEach((condition) => {
    const [a, b, c] = condition;
    if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
      gameActive = false;
      message.innerText = `${gameState[a]} wins!`;
    }
  });
};

const checkDraw = () => {
  if (!gameState.includes('') && gameActive) {
    gameActive = false;
    message.innerText = "It's a draw!";
  }
};

const restartGame = () => {
  currentPlayer = 'X';
  gameActive = true;
  gameState = ['', '', '', '', '', '', '', '', ''];
  message.innerText = '';
  cells.forEach(cell => {
    cell.innerText = '';
    cell.classList.remove('X', 'O');
  });
};

cells.forEach((cell, index) => {
  cell.addEventListener('click', () => handleCellClick(index));
});

restartButton.addEventListener('click', restartGame);
