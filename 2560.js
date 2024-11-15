const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '2560.txt';
let [a, b, d, N] = fs
  .readFileSync(filePath)
  .toString()
  .trim()
  .split(' ')
  .map(Number);

let s = Array(N + 1).fill(0);
s[0] = 1;

let p = 0;
let sum = 1;
for (let i = 1; i <= N; i++) {
  if (i >= a && i < b) {
    p = (p + s[i - a]) % 1000;
  } else if (i >= b) {
    p = (((p + s[i - a]) % 1000) - s[i - b] + 1000) % 1000;
  }
  s[i] = p;
  if (i < d) {
    sum = (sum + s[i]) % 1000;
  } else {
    sum = (((sum + s[i]) % 1000) - s[i - d] + 1000) % 1000;
  }
}
// console.log(s);
console.log(sum);
