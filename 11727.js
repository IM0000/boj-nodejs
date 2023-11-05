const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '11727.txt';
const n = fs.readFileSync(filePath).toString().trim();

const dp = [0,1,3];

for(let i=3; i<=n; i++) {
  dp[i] = (dp[i-2]*2 + dp[i-1]) % 10007;
}

console.log(dp[n]);