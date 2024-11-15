// 카우버거 알바생
const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '17208.txt';
const input = fs.readFileSync(filePath).toString().split('\n');
const [N, M, K] = input[0].split(' ').map(Number);

const dp = Array.from({ length: M + 1 }, () => Array(K + 1).fill(0));

// dp[M][K]
for (let i = 0; i < N; i++) {
  const [c, f] = input[i + 1].split(' ').map(Number);

  for (let m = M; m >= c; m--) {
    for (let k = K; k >= f; k--) {
      dp[m][k] = Math.max(dp[m][k], dp[m - c][k - f] + 1);
    }
  }
}
console.log(dp[M][K]);
