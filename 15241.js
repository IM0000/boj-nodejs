const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '15241.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [n, m] = input[0].split(' ').map(Number);
const dp = Array.from({ length: n }, () => Array(m).fill(0));
dp[0][0] = 1;

for (let i = 1; i <= n; i++) {
  let arr = input[i].split('');
  for (let j = 0; j < arr.length; j++) {
    if (i == 1 && j == 0) continue;
    if (arr[j] == 'X') continue;
    if (i == 1 && j > 0) {
      dp[i - 1][j] = dp[i - 1][j - 1];
      continue;
    }
    if (i > 1 && j == 0) {
      dp[i - 1][j] = dp[i - 2][j];
      continue;
    }

    dp[i - 1][j] = (dp[i - 1][j - 1] + dp[i - 2][j]) % 1000000007;
  }
}
console.log(dp[n - 1][m - 1]);
