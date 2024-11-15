const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '1947.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const N = +input.shift();
const M = 1000000000;
const dp = [0, 0, 1, 2];

for (let i = 4; i <= N; i++) {
  dp[i] = ((i - 1) * ((dp[i - 1] + dp[i - 2]) % M)) % M;
}

console.log(dp[N]);
