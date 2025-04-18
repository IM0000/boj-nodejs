// 점프 점프
const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : '11060.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const n = Number(input[0]);
const arr = input[1].split(' ').map(Number);
const dp = Array(n).fill(Infinity);
dp[0] = 0;
const queue = [0];
let front = 0;
let rear = 0;
while (front <= rear) {
  const cur = queue[front++];
  for (let i = 1; i <= arr[cur]; i++) {
    if (cur + i >= n) break;
    if (dp[cur + i] > dp[cur] + 1) {
      dp[cur + i] = dp[cur] + 1;
      queue[++rear] = cur + i;
    }
  }
}
if (dp[n - 1] === Infinity) {
  console.log(-1);
} else {
  console.log(dp[n - 1]);
}
