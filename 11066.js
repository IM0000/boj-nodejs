const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '11066.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

let index = 0;
let T = +input[index++].trim();
let dp, subSum, cost;

let ans = '';
//dp[i][j]  = i번째 장부터 j번째 장까지 합치는데 드는 최소한의 비용.
while (T--) {
  let K = +input[index++].trim();
  cost = input[index++].trim().split(' ').map(Number);
  dp = Array.from({ length: K + 1 }, () => Array(K + 1).fill(0));
  subSum = Array.from(Array(K + 1), () => 0); // 구간합

  subSum[0] = 0;
  for (let i = 1; i <= K; i++) {
    subSum[i] = subSum[i - 1] + cost[i - 1];
  }

  for (let d = 1; d <= K; d++) {
    for (let i = 1; i + d <= K; i++) {
      let j = i + d;
      dp[i][j] = Number.MAX_SAFE_INTEGER;
      for (let k = i; k < j; k++) {
        dp[i][j] = Math.min(
          dp[i][j],
          dp[i][k] + dp[k + 1][j] + subSum[j] - subSum[i - 1]
        );
      }
    }
  }
  ans += dp[1][K] + '\n';
}

console.log(ans.trim());
