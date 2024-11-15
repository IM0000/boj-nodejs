const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '31534.txt';
const input = fs.readFileSync(filePath).toString().trim().split(' ');

let [a, b, c] = input.map(Number);

if (a == b) {
  console.log(-1);
} else {
  if (a > b) {
    [a, b] = [b, a];
  }
  let p = b - a;
  let x = (a * c) / p;
  console.log('🚀 ~ file: 31534.js:12 ~ x:', x);
  let A = Math.sqrt(Math.pow(x, 2) + Math.pow(a, 2));
  console.log('🚀 ~ file: 31534.js:14 ~ A:', A);
  let B = Math.sqrt(Math.pow(p, 2) + Math.pow(c, 2));

  const PI = Math.PI;
  let answer = PI * (Math.pow(A + B, 2) - Math.pow(A, 2));
  console.log(answer);
}
