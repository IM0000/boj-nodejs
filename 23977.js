const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '23977.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [K, N] = input[0].split(' ').map(Number);
const arr = input[1].split(' ').map(Number);

let lowest = arr[0];
for (let i = 1; i < arr.length; i++) {
  lowest = lcm(lowest, arr[i]);
}

console.log(lowest - K);

function gcd(a, b) {
  let r;
  while (b !== 0) {
    r = a % b;
    a = b;
    b = r;
  }
  return a;
}

function lcm(a, b) {
  return (a * b) / gcd(a, b);
}
