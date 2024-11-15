// 타일 채우기
const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '2144.txt';
const input = +fs.readFileSync(filePath).toString().trim();

const dp = Array(31).fill(0);
dp[0] = 1;
dp[2] = 3;
for (let i = 4; i <= 30; i++) {
  dp[i] = dp[i - 2] * 3;
  for (let j = 4; j <= i; j += 2) {
    dp[i] += dp[i - j] * 2;
  }
}
console.log(dp[input]);
