// 방벽 게임
const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : '32714.txt';
const N = +fs.readFileSync(filePath).toString().trim();
const dp = [0, 1, 3];
if (N <= 3) {
  console.log(dp[N - 1]);
} else {
  console.log(N * 3 - 4);
}
