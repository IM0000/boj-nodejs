// 균형
const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : '22968.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
let [n, ...arr] = input.map(Number);

// n높이 avl 트리 만드는데 필요한 최소 정점수
// dp[n] = dp[n-1] + dp[n-2] + 1
const dp = Array(44);
dp[0] = 0;
dp[1] = 1;
dp[2] = 2;

for (let i = 3; i < 44; i++) {
  dp[i] = dp[i - 1] + dp[i - 2] + 1;
}
const answer = arr.map((item) => {
  for (let i = 0; i < 43; i++) {
    if (dp[i] <= item && item < dp[i + 1]) {
      return i;
    }
  }
});
console.log(answer.join('\n'));
