const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '2208.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [N, M] = input.shift().split(' ').map(Number);
const arr = [0, ...input.map(Number)];

const cuSum = Array(N + 1).fill(0);
for (let i = 1; i <= N; i++) {
  cuSum[i] = cuSum[i - 1] + arr[i];
}

const dp = Array(N + 1).fill(0);

dp[M] = cuSum[M];
let max = dp[M];
for (let i = M + 1; i <= N; i++) {
  dp[i] = Math.max(dp[i - 1] + arr[i], cuSum[i] - cuSum[i - M]);
  max = Math.max(max, dp[i]);
}

if (max < 0) {
  max = 0;
}

console.log(max);
