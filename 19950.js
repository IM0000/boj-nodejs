const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '19950.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [x1, y1, z1, x2, y2, z2] = input[0].split(' ').map(Number);
const n = +input[1];
const arr = input[2].split(' ').map(Number);

function getLength(x1, y1, z1, x2, y2, z2) {
  return Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2 + (z1 - z2) ** 2);
}

let l = getLength(x1, y1, z1, x2, y2, z2);
let s = arr.reduce((a, b) => a + b, 0);
let ans = '';
if (s < l) {
  ans = 'NO';
} else if (s == l) {
  ans = 'YES';
} else {
  arr.sort((a, b) => b - a);
  if (2 * arr[0] - s > l) {
    ans = 'NO';
  } else {
    ans = 'YES';
  }
}
console.log(ans);
