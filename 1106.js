// 호텔
const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : '1106.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [c, n] = input[0].split(' ').map(Number);
const arr = input.slice(1).map((item) => item.split(' ').map(Number));
const dp = Array(1101).fill(Infinity);
dp[0] = 0;
let min = Infinity;
for (let i = 0; i < arr.length; i++) {
  const [cost, customer] = arr[i];
  for (let j = customer; j < dp.length; j++) {
    if (dp[j - customer] + cost < dp[j]) {
      dp[j] = dp[j - customer] + cost;
      if (j >= c && dp[j] < min) {
        min = dp[j];
      }
    }
  }
}
console.log(min);
