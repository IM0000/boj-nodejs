// 행성 정렬
const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './25344.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const N = +input[0].trim();
const arr = input[1].split(' ').map(Number);

function gcd(a, b) {
  if (b === 0) return a;
  return gcd(b, a % b);
}

function lcm(a, b) {
  return (a * b) / gcd(a, b);
}

let ans = 1;
for (let i = 0; i < arr.length; i++) {
  if (i == 0) {
    ans = arr[i];
  } else {
    ans = lcm(ans, arr[i]);
  }
}
console.log(ans);
