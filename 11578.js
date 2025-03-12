// 팀원 모집
const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : '11578.txt';
const input = fs.readFileSync(filePath).toString().split('\n');
const [n, m] = input.shift().split(' ').map(Number);
const arr = input.map((item) => item.split(' ').map(Number));
arr.sort((a, b) => b[0] - a[0]);
let a = Math.pow(2, m) - 1;

let min = Number.MAX_SAFE_INTEGER;
for (let i = 1; i <= a; i++) {
  let check = [];

  for (let j = 0; j < m; j++) {
    if (i & (1 << j)) {
      check.push(j);
    }
  }

  let cLen = check.length;
  let s = new Set();

  for (let j = 0; j < check.length; j++) {
    let [l, ...item] = arr[check[j]];
    item.forEach((item) => s.add(item));
  }

  if (s.size === n) {
    min = Math.min(cLen, min);
  }
}

console.log(min > 10 ? -1 : min);
