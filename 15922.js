// 아우으 우아으이야!!
const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '15922.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
let idx = 0;
const n = +input[idx++].trim();
const arr = [];
for (let i = 0; i < n; i++) {
  const [x, y] = input[idx++].trim().split(' ').map(Number);
  arr.push([x, y]);
}
arr.sort((a, b) => {
  if (a[0] === b[0]) return a[1] - b[1];
  return a[0] - b[0];
});

let start = arr[0][0];
let end = arr[0][1];
let sum = 0;
for (let i = 1; i < n; i++) {
  const [s, e] = arr[i];
  if (end < s) {
    sum += end - start;
    start = s;
    end = e;
  } else {
    end = Math.max(end, e);
  }
}
sum += end - start;
console.log(sum);
