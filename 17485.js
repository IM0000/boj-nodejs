// 진우의 달 여행
const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : '17485.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const [n, m] = input.shift().split(' ').map(Number);
const arr = input.map((i) => i.split(' ').map(Number));

// dp[n][m][i] : i(0~2) 위치에서 n,m 위치에 도착했을 때 최소연료값
const dp = Array.from({ length: n }, () =>
  Array.from({ length: m }, () => Array(3).fill(Infinity))
);

for (let i = 0; i < n; i++) {
  for (let j = 0; j < m; j++) {
    if (i === 0) {
      dp[i][j][0] = arr[i][j];
      dp[i][j][1] = arr[i][j];
      dp[i][j][2] = arr[i][j];
      continue;
    }
    for (let l = 0; l < 3; l++) {
      dp[i][j][0] = Math.min(
        dp[i][j][0],
        (l !== 0 ? dp[i - 1][j][l] : Infinity) + arr[i][j]
      );
      dp[i][j][1] = Math.min(
        dp[i][j][1],
        (l !== 1 && j - 1 >= 0 ? dp[i - 1][j - 1][l] : Infinity) + arr[i][j]
      );
      dp[i][j][2] = Math.min(
        dp[i][j][2],
        (l !== 2 && j + 1 < m ? dp[i - 1][j + 1][l] : Infinity) + arr[i][j]
      );
    }
  }
}

let min = Infinity;
for (let j = 0; j < m; j++) {
  for (let k = 0; k < 3; k++) {
    min = Math.min(min, dp[n - 1][j][k]);
  }
}
console.log(min);
