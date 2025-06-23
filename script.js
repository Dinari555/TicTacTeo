const board = document.getElementById("board");
const status = document.getElementById("status");
let currentPlayer = "X";
let gameState = Array(9).fill("");

function drawBoard() {
  board.innerHTML = "";
  gameState.forEach((val, i) => {
    const cell = document.createElement("div");
    cell.className = "cell";
    cell.textContent = val;
    cell.onclick = () => handleMove(i);
    board.appendChild(cell);
  });
}

function handleMove(index) {
  if (gameState[index] || checkWinner()) return;
  gameState[index] = currentPlayer;
  drawBoard();
  if (checkWinner()) {
    status.textContent = `Le joueur ${currentPlayer} a gagné !`;
    status.style.color = "gold"; // couleur jaune élégante

  } else if (!gameState.includes("")) {
    status.textContent = "Match nul !";
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    status.textContent = `Tour de ${currentPlayer}`;
  }
}

function checkWinner() {
  const winCombos = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];
  return winCombos.some(combo =>
    combo.every(i => gameState[i] === currentPlayer)
  );
}

function restartGame() {
  currentPlayer = "X";
  gameState = Array(9).fill("");
  status.textContent = "Tour de X";
  drawBoard();
}

drawBoard();
status.textContent = "Tour de X";
