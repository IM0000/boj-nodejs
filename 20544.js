// 공룡게임
const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '20544.txt';
let n = +fs.readFileSync(filePath).toString().trim();
const MAX = 1000000007;
console.log(countMaps(n));

function countMaps(N) {
  const n = N;

  const dp = Array.from({ length: n + 1 }, () => Array(3).fill(0));
  const dp2 = Array.from({ length: n + 1 }, () => Array(3).fill(0));

  dp[0][0] = 1;
  dp2[0][0] = 1;
  dp[1] = [1, 1, 1];
  dp2[1] = [1, 1, 1];
  // dp[i][j] = 경우의수 : i지점에 높이j인 선인장이 있을때 게임을 클리어한 경우의수
  // dp2는 높이가 0과 1인 선인장만 있는 경우
  for (let i = 2; i <= n; i++) {
    for (let j = 0; j <= 2; j++) {
      if (j === 0) {
        dp[i][0] = (dp[i - 1][0] + dp[i - 1][1] + dp[i - 1][2]) % MAX;
        dp2[i][0] = (dp2[i - 1][0] + dp2[i - 1][1]) % MAX;
      } else if (j === 1) {
        dp[i][1] = (dp[i - 1][0] + 2 * dp[i - 2][0]) % MAX;
        dp2[i][1] = (dp2[i - 1][0] + dp2[i - 2][0]) % MAX;
      } else {
        dp[i][2] = (dp[i - 2][0] + dp[i - 1][0]) % MAX;
      }
    }
  }

  const result = (dp[n][0] - dp2[n][0] + MAX) % MAX;
  return result;
}
