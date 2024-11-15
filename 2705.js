const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '2705.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

let index = 0;
let T = +input[index++].trim();

const dp = Array.from({ length: 1001 }, () => 0);
dp[1] = 1;

for (let i = 2; i <= 1000; i++) {
  let half = Math.floor(i / 2);
  for (let j = 1; j <= half; j++) {
    dp[i] += dp[j];
  }
  dp[i] += 1;
}

const answer = [];
while (T--) {
  const n = +input[index++].trim();
  answer.push(dp[n]);
}
console.log(answer.join('\n'));
