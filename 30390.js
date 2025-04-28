// 우주왕자 사교파티
const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : '30390.txt';
const [a, b, k] = fs
  .readFileSync(filePath)
  .toString()
  .trim()
  .split(' ')
  .map(Number);

const init = gcd(a, b);
const S = a + b;
const L = Math.max(0, a - k);
const R = Math.min(a + k, S);

const divisors = [];
for (let i = 1; i <= Math.sqrt(S); i++) {
  if (S % i === 0) {
    divisors.push(i);
    if (S / i !== i) {
      divisors.push(S / i);
    }
  }
}

divisors.sort((a, b) => b - a);

let answer = 1;
for (const d of divisors) {
  const low = Math.ceil(L / d);
  const high = Math.floor(R / d);
  if (low <= high) {
    answer = d;
    break;
  }
}

console.log(init > answer ? init : answer);

function gcd(a, b) {
  if (b === 0) return a;
  return gcd(b, a % b);
}
