// 함께 블록 쌓기
const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : '18427.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const [n, m, h] = input[0].split(' ').map(Number);
const students = [];
for (let i = 1; i <= n; i++) {
  let arr = input[i].split(' ').map(Number);
  students.push(arr);
}

const dp = Array(1001).fill(0);
dp[0] = 1;

for (let i = 0; i < students.length; i++) {
  const blocks = students[i];

  for (let j = 1000; j >= 0; j--) {
    if (dp[j] > 0) {
      for (let k = 0; k < blocks.length; k++) {
        dp[j + blocks[k]] = (dp[j + blocks[k]] + dp[j]) % 10007;
      }
    }
  }
}

console.log(dp[h]);
