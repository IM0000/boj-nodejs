const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '1038.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const N = +input[0];
const dp = Array.from({ length: 1000001 }, () => -1);

const q = [];
for (let i = 0; i < 10; i++) {
  q.push(i);
  dp[i] = i;
}

let idx = 10;

while (idx <= N && q.length) {
  const cur = q.shift();
  const last = cur % 10;
  for (let i = 0; i < last; i++) {
    const next = cur * 10 + i;
    q.push(next);
    dp[idx++] = next;
  }
}

console.log(dp[N]);
