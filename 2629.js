const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '2629.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const N = +input[0].trim();
const ws = input[1].trim().split(' ').map(Number);
const M = +input[2].trim();
const ms = input[3].trim().split(' ').map(Number);

const dp = Array.from({ length: N + 1 }, () => Array(40001).fill(false));
dp[0][0] = true;

for (let i = 1; i <= N; i++) {
  const w = ws[i - 1];
  for (let j = 0; j <= 40000; j++) {
    dp[i][j] = dp[i - 1][j] || dp[i - 1][Math.abs(j - w)];
    if (j + w < 40001) dp[i][j] = dp[i][j] || dp[i - 1][j + w];
  }
}

const answer = ms.map((m) => (dp[N][m] ? 'Y' : 'N')).join(' ');
console.log(answer.trim());
