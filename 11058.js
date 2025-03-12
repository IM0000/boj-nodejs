// 크리보드
const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : '11058.txt';
const n = +fs.readFileSync(filePath).toString().trim();
const dp = Array(101).fill(0n);

for (let i = 1n; i <= n; i++) {
  dp[i] = dp[i - 1n] + 1n;
  for (let j = 3n; j < i; j++) {
    if (dp[i] < dp[i - j] * (j - 1n)) {
      dp[i] = dp[i - j] * (j - 1n);
    }
  }
}
console.log(Number(dp[n]));
