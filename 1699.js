// 제곱수의 합
const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '1699.txt';
let n = +fs.readFileSync(filePath).toString().trim();

const dp = Array(n + 1).fill(0);
for (let i = 0; i <= n; i++) {
  dp[i] = i;
}

for (let i = 2; i <= n; i++) {
  let sqrt = Math.floor(Math.sqrt(i));
  for (let j = 1; j <= sqrt; j++) {
    dp[i] = Math.min(dp[i], dp[i - j * j] + 1);
  }
}

console.log(dp[n]);
