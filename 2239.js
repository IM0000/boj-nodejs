const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '2239.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const sudoku = [];

input.forEach((row) => {
  sudoku.push(row.split('').map(Number));
});

const zero = [];
for (let i = 0; i < 9; i++) {
  for (let j = 0; j < 9; j++) {
    if (sudoku[i][j] === 0) zero.push([i, j]);
  }
}

dfs(0);

function isPossible(x, y, num) {
  for (let i = 0; i < 9; i++) {
    if (sudoku[x][i] === num) return false;
    if (sudoku[i][y] === num) return false;
  }
  const sx = Math.floor(x / 3) * 3;
  const sy = Math.floor(y / 3) * 3;
  for (let i = sx; i < sx + 3; i++) {
    for (let j = sy; j < sy + 3; j++) {
      if (sudoku[i][j] === num) return false;
    }
  }
  return true;
}

function dfs(idx) {
  if (idx === zero.length) {
    console.log(sudoku.map((row) => row.join('')).join('\n'));
    process.exit();
  }
  const [x, y] = zero[idx];
  for (let i = 1; i <= 9; i++) {
    if (isPossible(x, y, i)) {
      sudoku[x][y] = i;
      dfs(idx + 1);
      sudoku[x][y] = 0;
    }
  }
}