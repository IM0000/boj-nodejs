// 동전 바꿔주기
const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : '2624.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const T = +input[0].trim();
const k = +input[1].trim();
const arr = [];
for (let i = 0; i < k; i++) {
  arr.push(input[i + 2].split(' ').map(Number));
}

// dp[i][t] = i번째 동전 종류까지 사용하여 t금액을 만드는 경우의 수
const dp = Array.from({ length: k + 1 }, () => Array(T + 1).fill(0));
dp[0][0] = 1;
for (let i = 1; i <= k; i++) {
  let [p, n] = arr[i - 1];
  for (let t = 0; t <= T; t++) {
    for (let j = 0; j <= n; j++) {
      if (t - j * p >= 0) {
        dp[i][t] += dp[i - 1][t - j * p];
      }
    }
  }
}
console.log(dp[k][T]);
