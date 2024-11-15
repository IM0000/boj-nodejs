const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '4233.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

function isPrime(n) {
  if (n <= 1n) return false;
  for (let i = 2n; i * i <= n; i++) {
    if (n % i === 0n) return false;
  }
  return true;
}

function modPow(x, n, mod) {
  let res = 1n;
  while (n > 0n) {
    if (n & 1n) {
      res = (res * x) % mod; // if n is 홀수
      console.log('##', res, n);
    }
    x = (x * x) % mod;
    console.log(x, n);
    n = n / 2n; // same as n >>= 1;
  }
  return res;
}
modPow(3n, 256n, 13n);
// const answer = [];

// for (let i = 0; i < input.length; i++) {
//   const [p, a] = input[i].split(' ').map((x) => BigInt(x));
//   if (p === 0n && a === 0n) break;

//   if (isPrime(p)) {
//     answer.push('no');
//   } else {
//     if (modPow(a, p, p) === a) {
//       answer.push('yes');
//     } else {
//       answer.push('no');
//     }
//   }
// }
// console.log(answer.join('\n'));
