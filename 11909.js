// 배열 탈출
const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : '11909.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const n = +input[0];
const arr = [];
for (let i = 1; i <= n; i++) {
  arr.push(input[i].split(' ').map(Number));
}
// dp[i][j] : i, j에 도착했을 때 최소 비용
const dp = Array.from({ length: n }, () => Array(n).fill(Infinity));
dp[0][0] = 0;
for (let i = 0; i < n; i++) {
  for (let j = 0; j < n; j++) {
    if (i === 0 && j === 0) continue;
    if (i > 0) {
      if (arr[i][j] >= arr[i - 1][j]) {
        let dif = arr[i][j] - arr[i - 1][j];
        dp[i][j] = Math.min(dp[i][j], dp[i - 1][j] + dif + 1);
      } else {
        dp[i][j] = Math.min(dp[i][j], dp[i - 1][j]);
      }
    }
    if (j > 0) {
      if (arr[i][j] >= arr[i][j - 1]) {
        let dif = arr[i][j] - arr[i][j - 1];
        dp[i][j] = Math.min(dp[i][j], dp[i][j - 1] + dif + 1);
      } else {
        dp[i][j] = Math.min(dp[i][j], dp[i][j - 1]);
      }
    }
  }
}
console.log(dp[n - 1][n - 1]);
