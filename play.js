// تحديد العناصر الأساسية
const cells = document.querySelectorAll(".cell");
const message = document.getElementById("message");
const restartButton = document.getElementById("restart");

let board = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];
let currentPlayer = "X";
let gameOver = false;

// إضافة حدث النقر إلى الخلايا
cells.forEach((cell) => {
  cell.addEventListener("click", () => {
    if (!gameOver && cell.innerText === "") {
      const row = cell.dataset.row;
      const col = cell.dataset.col;
      board[row][col] = currentPlayer;
      cell.innerText = currentPlayer;

      checkWin();
      switchPlayer();
    }
  });
});

// إعادة تشغيل اللعبة
restartButton.addEventListener("click", restart);

// التحقق من وجود فائز
function checkWin() {
  // التحقق من الصفوف
  for (let i = 0; i < board.length; i++) {
    if (board[i][0] !== "" && board[i][0] === board[i][1] && board[i][0] === board[i][2]) {
      gameOver = true;
      message.innerText = `${currentPlayer} wins!`;
      break;
    }
  }

  // التحقق من الأعمدة
  for (let i = 0; i < board.length; i++) {
    if (board[0][i] !== "" && board[0][i] === board[1][i] && board[0][i] === board[2][i]) {
      gameOver = true;
      message.innerText = `${currentPlayer} wins!`;
      break;
    }
  }

  // التحقق من القطر// الأول
  if (board[0][0] !== "" && board[0][0] === board[1][1] && board[0][0] === board[2][2]) {
    gameOver = true;
    message.innerText = `${currentPlayer} wins!`;
  }

  // التحقق من القطر الثاني
  if (board[0][2] !== "" && board[0][2] === board[1][1] && board[0][2] === board[2][0]) {
    gameOver = true;
    message.innerText = `${currentPlayer} wins!`;
  }

  // التحقق من التعادل
  if (!gameOver && board.flat().every((cell) => cell !== "")) {
    gameOver = true;
    message.innerText = "It's a tie!";
  }
}

// تغيير اللاعب الحالي
function switchPlayer() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  message.innerText = `${currentPlayer}'s turn`;
}

// إعادة تشغيل اللعبة
function restart() {
  board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
  currentPlayer = "X";
  gameOver = false;
  cells.forEach((cell) => (cell.innerText = ""));
  message.innerText = `${currentPlayer}'s turn`;
}