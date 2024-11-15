const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '30406.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const N = +input.shift();
const arr = input.shift().split(' ').map(Number);

let c0 = 0,
  c1 = 0,
  c2 = 0,
  c3 = 0;

for (let i = 0; i < arr.length; i++) {
  if (arr[i] === 0) c0++;
  else if (arr[i] === 1) c1++;
  else if (arr[i] === 2) c2++;
  else if (arr[i] === 3) c3++;
}

let s11 = Math.min(c0, c3);
let s12 = Math.min(c1, c2);
let sum = 0;

sum += s11 * 3;
sum += s12 * 3;

c0 -= s11;
c3 -= s11;
c1 -= s12;
c2 -= s12;

let s21 = Math.min(c0, c2);
let s22 = Math.min(c1, c3);

sum += s21 * 2;
sum += s22 * 2;

let s31 = Math.min(c0, c1);
let s32 = Math.min(c2, c3);

sum += s31;
sum += s32;

console.log(sum);
