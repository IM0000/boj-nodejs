// 달나라 토끼를 위한 구매대금 지불 도우미
const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : '17212.txt';
const input = +fs.readFileSync(filePath).toString().trim();

// 동전의 종류는 1원, 2원, 5원, 7원
// 최소 동전의 갯수로 지불금액 만들어야 함
const coins = [1, 2, 5, 7];

// dp[i] = i원을 만들기 취한 최소 동전의 갯수
const dp = Array(input + 1).fill(Infinity);
dp[0] = 0;

for (const coin of coins) {
  for (let i = 0; i <= input; i++) {
    if (i - coin >= 0) {
      dp[i] = Math.min(dp[i], dp[i - coin] + 1);
    }
  }
}
console.log(dp[input]);
