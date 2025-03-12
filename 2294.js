// 동전2
const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : '2294.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [n, k] = input.shift().split(' ').map(Number);
const arr = input.map(Number);
const dp = Array(k + 1).fill(Infinity);
dp[0] = 0;
for (let i = 0; i < k + 1; i++) {
  for (let j = 0; j < arr.length; j++) {
    let coin = arr[j];
    if (i >= coin && dp[i - coin] !== Infinity) {
      dp[i] = Math.min(dp[i], dp[i - coin] + 1);
    }
  }
}
if (dp[k] === Infinity) {
  console.log(-1);
} else {
  console.log(dp[k]);
}
