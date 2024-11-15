// Square Coins
const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '22839.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const coins = [];
for (let i = 1; i <= 17; i++) {
  coins.push(i * i);
}

const maxAmount = 300;
const dp = Array.from({ length: maxAmount + 1 }, () => 0);
// dp[i] : i원을 만드는 방법의 수
dp[0] = 1;

// 각 동전마다 누적 방식으로 가능한 조합 수를 계산
for (const coin of coins) {
  for (let i = coin; i <= maxAmount; i++) {
    dp[i] += dp[i - coin];
    if (coin == 4) console.log(i, dp[i], i - coin, dp[i - coin]);
  }
}

let idx = 0;
const answer = [];
while (true) {
  const target = +input[idx++];
  if (target == 0) break;
  answer.push(dp[target]);
}

console.log(answer.join('\n'));
