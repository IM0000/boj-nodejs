// 창영이와 커피
const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '22115.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [N, K] = input[0].split(' ').map(Number);
const arr = input[1].split(' ').map(Number);
// dp[n][카페인합] = 최소 갯수
//  = min(dp[n-1][1~K]) + 1;
const dp = Array.from({ length: N + 1 }, () => Array(K + 1).fill(Infinity));
for (let i = 0; i <= N; i++) {
  dp[i][0] = 0;
}
for (let i = 1; i <= N; i++) {
  let caf = arr[i - 1];
  for (let j = 0; j <= K; j++) {
    if (j - caf >= 0) {
      dp[i][j] = Math.min(dp[i - 1][j], dp[i - 1][j - caf] + 1);
    } else {
      dp[i][j] = dp[i - 1][j];
    }
  }
}
if (dp[N][K] == Infinity) {
  console.log(-1);
} else {
  console.log(dp[N][K]);
}
