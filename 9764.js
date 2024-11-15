const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '9764.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const MOD = 100999;
let index = 0;
let T = +input[index++].trim();

// dp[i][j] = dp[i-1][j-1] + dp[i-j][j-1]
/* 
  1. Buttom-Up
  Dp table을 2차원으로 설정하여 dp[i][j] = 1~j를 가지고 i를 만들 수 있는 경우의 수로 생각한다.

  1. j > i 이면 dp[i][j] = dp[i][j-1]로 이전 dp값과 같다.(j가 아무리 커져봐야 i보다 크면 더 이상의 경우수가 생기지 않기 때문)

  2. j <= i 이면 dp[i][j] = dp[i][j-1] + dp[i-j][j-1] 이다.
  예를 들어보자, dp[5][4]를 구하고 싶다.(1~4를 이용하여 5를 구하는 경우)
  dp[5][4] = dp[5][3](1~3을 이용하여 5를 구하는 경우) + dp[1][3](1~3을 이용하여 1을 구하는 경우)이다.
  우선 1~4를 이용하여 5를 구하는 경우에다가 4가 무조건 들어가는 경우는 더해주면 되는 것이다. 4가 무조건 들어가려면 5-4=1이므로 1을 구하는 방법을 구하면 되는 것이다.
  사실 5를 구하는 방법인데 4를 이미 사용한거나 다름 없으므로 1~3을 이용해 1을 구하는 방법을 구하면 최종 1~4를 이용해 5를 구하는 방법이 구해지게 된다. 
*/
const dp = Array.from({ length: 2001 }, () => Array(2001).fill(0));
dp[0][0] = 1;
for (let i = 1; i < 2001; i++) {
  dp[i][0] = 0;
  dp[0][i] = 1;
}

for (let i = 1; i < 2001; i++) {
  for (let j = 1; j < 2001; j++) {
    if (i < j) {
      dp[i][j] = dp[i][j - 1];
      continue;
    }
    dp[i][j] = (dp[i][j - 1] + dp[i - j][j - 1]) % MOD;
  }
}

const answer = [];
while (T--) {
  let N = +input[index++].trim();
  answer.push(dp[N][N]);
}

console.log(answer.join('\n'));
