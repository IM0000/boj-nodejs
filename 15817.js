// 배수 공사
const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '15817.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const [n, x] = input[0].split(' ').map(Number);
const pipes = [];
for (let i = 1; i <= n; i++) {
  const [cs, cnt] = input[i].split(' ').map(Number);
  pipes.push([cs, cnt]);
}

const dp = Array(x + 1).fill(0);
dp[0] = 1;

// dp[k] = k 길이를 만드는 경우의 수

for (let i = 0; i < n; i++) {
  const [Li, Ci] = pipes[i];
  // 내림차순으로 순회하여 중복 계산을 방지
  for (let k = x; k >= 0; k--) {
    if (dp[k] > 0) {
      for (let j = 1; j <= Ci && k + j * Li <= x; j++) {
        dp[k + j * Li] += dp[k];
      }
    }
  }
}

console.log(dp[x]);
