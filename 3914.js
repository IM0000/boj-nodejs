// Maximum Sum
const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '3914.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const n = +input[0].trim();
const dp = Array.from({ length: n }, () => Array(1001).fill(0));
const arr = Array.from({ length: n }, () => Array(1001).fill(0));
// dp[n번쨰 상자][숫자] = 합
// dp[n][m] = dp[n-1][1~k] && k는 m보다 작으면서 가장 큰 수 + arr[n][m]
for (let i = 1; i <= n; i++) {
  let box = input[i].split(' ').map(Number);
  for (let j = 1; j <= box[0]; j++) {
    arr[i - 1][box[j]] = box[j];
    if (i === 1) {
      dp[i - 1][box[j]] = box[j];
    }
  }
}

for (let i = 1; i < n; i++) {
  for (let j = 0; j < 1001; j++) {
    dp[i][j] = arr[i][j];
    for (let k = 0; k <= j; k++) {
      dp[i][j] = Math.max(dp[i][j], dp[i - 1][k] + arr[i][j]);
    }
  }
}

let max = 0;
for (let i = 1; i < 1001; i++) {
  if (max <= dp[n - 1][i]) {
    max = dp[n - 1][i];
  }
}
console.log(max);
