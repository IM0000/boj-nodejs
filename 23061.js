// 백남이의 여행 준비
const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '23061.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [n, m] = input[0].split(' ').map(Number);
const items = [];
const bags = [];

for (let i = 1; i <= n; i++) {
  items.push(input[i].split(' ').map(Number));
}

for (let i = n + 1; i <= n + m; i++) {
  bags.push(+input[i].trim());
}

const maxBagW = Math.max(...bags);

let max = 0;
let num = 1;

const dp = Array(maxBagW + 1).fill(0);

for (let j = 1; j <= n; j++) {
  const [w, v] = items[j - 1];

  for (let k = maxBagW; k >= w; k--) {
    dp[k] = Math.max(dp[k], dp[k - w] + v);
  }
}

for (let i = 0; i < bags.length; i++) {
  const bagW = bags[i];
  if (max < dp[bagW] / bagW) {
    max = dp[bagW] / bagW;
    num = i + 1;
  }
}
console.log(num);
