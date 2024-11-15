const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '2225.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [N, K] = input[0].split(' ').map(Number);

const dp = Array.from({ length: K + 1 }, () => Array(N + 1).fill(0));
const MOD = 1000000000;

// dp[k][n] : k개 더해서 n을 만드는 갯수 (0<=l<=n)
// Z dp[k-1][n-l] 0<=l, l<=n

for (let i = 0; i <= N; i++) {
  dp[1][i] = 1;
}

for (let i = 2; i <= K; i++) {
  for (let j = 0; j <= N; j++) {
    for (let l = 0; l <= j; l++) {
      dp[i][j] += dp[i - 1][j - l];
      dp[i][j] %= MOD;
    }
  }
}
console.log(dp[K][N]);
