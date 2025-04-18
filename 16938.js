// 캠프 준비
const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : '16938.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

let [n, l, r, x] = input[0].split(' ').map(Number);
const problems = input[1].split(' ').map(Number);

// l <= sum <= r, (r - l) >= x
const k = 1 << n;
let count = 0;
for (let i = 0; i < k; i++) {
  let sum = 0;
  let max = Number.MIN_SAFE_INTEGER;
  let min = Number.MAX_SAFE_INTEGER;

  for (let j = 0; j < n; j++) {
    if (i & (1 << j)) {
      let level = problems[j];
      sum += level;
      if (max < level) {
        max = level;
      }
      if (min > level) {
        min = level;
      }
    }
  }

  if (l <= sum && sum <= r && max - min >= x) {
    count++;
  }
}

console.log(count);
