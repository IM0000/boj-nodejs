const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : '31814.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

let index = 0;
let N = +input[index++].trim();
let arr = input[index++].split(' ').map(Number);
let sum = 0;
let dp = Array.from({ length: N }, () => Array(N).fill(0));
for (let i = N - 1; i >= 0; i--) {
  for (let j = N - 1; j >= 0; j--) {
    if (arr[i] <= arr[j]) {
      if (i + 1 < N && j + 1 < N) {
        dp[i][j] = dp[i + 1][j + 1] + 1;
      } else {
        dp[i][j] = 1;
      }
    }
    sum += dp[i][j];
  }
}
console.log(sum);
