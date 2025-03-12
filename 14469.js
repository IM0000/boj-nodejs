// 소가 길을 건너간 이유 3
const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '14469.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const n = +input[0].trim();
const arr = input.slice(1).map((cow) => cow.split(' ').map(Number));
arr.sort((a, b) => a[0] - b[0]);
let cur = 0;
for (let i = 0; i < arr.length; i++) {
  let m = Math.max(cur, arr[i][0]);
  cur = m + arr[i][1];
}
console.log(cur);
