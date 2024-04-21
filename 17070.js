const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '17070.txt';
const input = fs.readFileSync(filePath).toString().split('\n');

let index = 0;
const N = +input[index++].trim();

const map = Array.from(Array(N), () => Array(N));

for(let i = 0; i<N; i++) {
  map[i] = input[index++].split(' ').map(Number);
}

function solution(N, board) {
  const dp = Array.from({ length: 3 }, () =>
    Array.from({ length: N }, () => new Array(N).fill(0))
  );

  dp[0][0][1] = 1;

  for (let i = 2; i < N; i++) {
    if (board[0][i] === 0) {
      dp[0][0][i] = dp[0][0][i - 1];
    }
  }

  for (let r = 1; r < N; r++) {
    for (let c = 1; c < N; c++) {
      if (board[r][c] === 0 && board[r][c - 1] === 0 && board[r - 1][c] === 0) {
        dp[1][r][c] = dp[0][r - 1][c - 1] + dp[1][r - 1][c - 1] + dp[2][r - 1][c - 1];
      }

      if (board[r][c] === 0) {
        dp[0][r][c] = dp[0][r][c - 1] + dp[1][r][c - 1];
        dp[2][r][c] = dp[2][r - 1][c] + dp[1][r - 1][c];
      }
    }
  }

  let result = 0;
  for (let i = 0; i < 3; i++) {
    result += dp[i][N - 1][N - 1];
  }
  
  return result;
}

console.log(solution(N, map))
