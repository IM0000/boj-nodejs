// 봄버맨
const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '16918.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
let idx = 0;
const [r, c, n] = input[idx++].split(' ').map(Number);
const board = Array.from({ length: r }, () => input[idx++].trim().split(''));

// Function to get the cells to be cleared when bombs explode
function getBoom(board) {
  const boom = Array.from({ length: r }, () => Array(c).fill(false));
  for (let i = 0; i < r; i++) {
    for (let j = 0; j < c; j++) {
      if (board[i][j] === 'O') {
        boom[i][j] = true;
        if (i > 0) boom[i - 1][j] = true;
        if (i < r - 1) boom[i + 1][j] = true;
        if (j > 0) boom[i][j - 1] = true;
        if (j < c - 1) boom[i][j + 1] = true;
      }
    }
  }
  return boom;
}

// Function to place bombs everywhere
function fillBombs() {
  return Array.from({ length: r }, () => Array(c).fill('O'));
}

// Function to apply explosion
function explode(currentBoard) {
  const boom = getBoom(currentBoard);
  const newBoard = Array.from({ length: r }, () => Array(c).fill('O'));
  for (let i = 0; i < r; i++) {
    for (let j = 0; j < c; j++) {
      if (boom[i][j]) {
        newBoard[i][j] = '.';
      }
    }
  }
  return newBoard;
}

if (n === 1) {
  // Initial state
  console.log(board.map((row) => row.join('')).join('\n'));
} else if (n % 2 === 0) {
  // All bombs
  console.log(
    fillBombs()
      .map((row) => row.join(''))
      .join('\n')
  );
} else {
  // Either first explosion or second explosion
  const firstExplosion = explode(board);
  if (n % 4 === 3) {
    console.log(firstExplosion.map((row) => row.join('')).join('\n'));
  } else {
    const secondExplosion = explode(firstExplosion);
    console.log(secondExplosion.map((row) => row.join('')).join('\n'));
  }
}
