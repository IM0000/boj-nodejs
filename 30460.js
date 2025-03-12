// 스위치
const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : '30460.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const n = +input[0].trim();
const arr = [0, ...input[1].split(' ').map(Number)];

// dp[n][0~2] : 0~2: 2배 할수있는 횟수, n번째까지 고려했을 때 최대 합
const dp = Array.from({ length: n + 1 }, () => Array(3).fill(0));
dp[1][0] = arr[1];
dp[1][1] = undefined;
dp[1][2] = arr[1] * 2;
for (let i = 2; i <= n; i++) {
  let score = arr[i];
  if (dp[i - 1][1] !== undefined) {
    dp[i][0] = Math.max(dp[i - 1][0] + score, dp[i - 1][1] + score * 2);
  } else {
    dp[i][0] = dp[i - 1][0] + score;
  }
  if (i > 1) dp[i][1] = dp[i - 1][2] + score * 2;
  dp[i][2] = dp[i - 1][0] + score * 2;
}
console.log(Math.max(...dp[n]));
