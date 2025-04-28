// 알고리즘 수업 - 행렬 경로 문제 3
const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : '24426.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const n = +input[0].trim();
let index = 1;
const board = [Array(n + 1).fill(0)];
for (let i = 0; i < n; i++) {
  board.push([0, ...input[index++].split(' ').map(Number)]);
}

const [r, c] = input[index].split(' ').map(Number);
const board2 = Array.from({ length: n - r + 2 }, () => Array(n - c + 2));
for (let i = 0; i <= n - r + 1; i++) {
  for (let j = 0; j <= n - c + 1; j++) {
    if (i === 0 || j === 0) {
      board2[i][j] = 0;
    } else {
      board2[i][j] = board[i + r - 1][j + c - 1];
    }
  }
}

const answer1 = getMaxPath(board, r, c) - board[r][c];
const answer2 = getMaxPath(board2, n - r + 1, n - c + 1);
board[r][c] = Number.MIN_SAFE_INTEGER;
const answer3 = getMaxPath(board, n, n);
console.log(`${answer1 + answer2} ${answer3}`);

function getMaxPath(m, x, y) {
  // dp[r][c] => r,c 위치에 도착했을 때 경로 합
  const dp = Array.from({ length: x + 1 }, () =>
    Array(y + 1).fill(Number.MIN_SAFE_INTEGER)
  );
  dp[1][1] = m[1][1];

  for (let i = 1; i <= x; i++) {
    for (let j = 1; j <= y; j++) {
      if (i === 1 && j === 1) continue;
      dp[i][j] = m[i][j] + Math.max(dp[i - 1][j], dp[i][j - 1]);
    }
  }

  return dp[x][y];
}
