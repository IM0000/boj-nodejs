// Ordinary Ordinals
const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : '24930.txt';
const input = fs
  .readFileSync(filePath)
  .toString()
  .trim()
  .split(' ')
  .map(BigInt);
const [n, m] = input;
let sum = 0n;
let ans1 = 0n;
let ans2 = 0n;

if (n === 0n) {
  ans1 = 2n;
} else if (n === 1n) {
  ans1 = 4n;
} else {
  let N = n;
  ans1 = 1n;
  let temp1 = 2n;
  while (N) {
    if (N & 1n) {
      ans1 = (ans1 * temp1) % m;
    }
    N = N >> 1n;
    temp1 = (temp1 * temp1) % m;
  }
  ans1 = (ans1 * 2n) % m;

  let NN = n - 1n;
  ans2 = 1n;
  let temp2 = 2n;
  while (NN) {
    if (NN & 1n) {
      ans2 = (ans2 * temp2) % m;
    }
    NN = NN >> 1n;
    temp2 = (temp2 * temp2) % m;
  }

  ans2 = (ans2 - 1n) % m;
}

sum = (ans1 + ans2 + m) % m;
console.log(sum.toString());
