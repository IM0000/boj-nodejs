// 동전
const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : '9084.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
let idx = 0;
let T = +input[idx++].trim();
const answer = [];
while (T-- > 0) {
  let n = +input[idx++].trim();
  let coins = input[idx++].split(' ').map(Number);
  let target = +input[idx++].trim();

  // dp[n] = n원 만드는 방법의 수
  const dp = Array(target + 1).fill(0);
  dp[0] = 1;
  for (let i = 0; i < coins.length; i++) {
    let coin = coins[i];
    for (let c = coin; c <= target; c++) {
      dp[c] += dp[c - coin];
    }
  }
  answer.push(dp[target]);
}
console.log(answer.join('\n'));
