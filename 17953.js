// 디저트
const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : '17953.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [n, m] = input.shift().split(' ').map(Number);
const arr = input.map((item) => item.split(' ').map(Number));

// dp[n][m] : n일차 m을 먹었을 때 최대 만족도
const dp = Array.from({ length: n }, () => Array(m).fill(0));

for (let i = 0; i < m; i++) {
  dp[0][i] = arr[i][0];
}

for (let i = 1; i < n; i++) {
  for (let k = 0; k < m; k++) {
    // k: 이전에 먹은 간식 종류
    for (let j = 0; j < m; j++) {
      let satisfaction = arr[j][i];
      if (j === k) {
        satisfaction = Math.floor(satisfaction / 2);
      }
      dp[i][j] = Math.max(dp[i][j], dp[i - 1][k] + satisfaction);
    }
  }
}
console.log(Math.max(...dp[n - 1]));
console.log(dp);
