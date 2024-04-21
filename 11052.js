const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '11052.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const N = +input.shift();
const pArr = [0, ...input[0].split(' ').map(Number)];

const dp = Array(N + 1).fill(0);
dp[1] = pArr[1];

for(let i=2; i<=N; i++) {
  for(let j=1; j<=i; j++) {
    dp[i] = Math.max(dp[i], dp[i-j] + pArr[j]);
  }
}
console.log(dp[N]);