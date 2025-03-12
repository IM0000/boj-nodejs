// 저금통
/*
dp[n][m] : 앞저금통 n, 뒤저금통 m 까지 최대 소수 등장 횟수

dp[1][1] = 0;
dp[1][2] = 0;
dp[2][1] = 0;
dp[i][j] = ij === prime ? Math.max(dp[i][j-1] +1, dp[i-1][j] + 1) : Math.max(dp[i][j-1], dp[i-1][j])
*/
const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : '2421.txt';
const n = +fs.readFileSync(filePath).toString().trim();

const primes = Array(1000000).fill(true);
primes[0] = false;
primes[1] = false;
for (let i = 2; i < 1000000; i++) {
  for (let j = i + i; j < 1000000; j += i) {
    primes[j] = false;
  }
}

const dp = Array.from({ length: n + 1 }, () => Array(n + 1).fill(0));

for (let i = 1; i <= n; i++) {
  for (let j = 1; j <= n; j++) {
    if (i == 1 && j == 1) continue;
    let ij = '' + i + j;
    let numIj = Number(ij);
    dp[i][j] = primes[numIj]
      ? Math.max(dp[i][j - 1] + 1, dp[i - 1][j] + 1)
      : Math.max(dp[i][j - 1], dp[i - 1][j]);
  }
}

console.log(dp[n][n]);
