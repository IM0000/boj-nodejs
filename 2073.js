// 수도배관공사
const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : '2073.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const [d, p] = input[0].split(' ').map(Number);
const arr = [];
for (let i = 1; i < input.length; i++) {
  const [l, c] = input[i].split(' ').map(Number);
  arr.push([l, c]);
}
arr.sort((a, b) => b[1] - a[1]);

// dp[x] : x길이 파이프 만들었을 때, 최대 용량
const dp = Array(d + 1).fill(-1);
dp[0] = 0;
for (let i = 0; i < arr.length; i++) {
  const [l, c] = arr[i];

  for (let j = d; j >= 0; j--) {
    if (dp[j] !== -1) {
      if (j + l > d) continue;

      if (dp[j] === 0) {
        if (dp[j + l] < c) {
          dp[j + l] = Math.max(dp[j], c);
        }
      } else {
        let min = Math.min(dp[j], c);
        if (dp[j + l] < min) dp[j + l] = min;
      }
    }
  }
}
console.log(dp[d]);
