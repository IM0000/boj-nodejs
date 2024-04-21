const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '15829.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const n = +input[0];
const str = input[1];

let r = 1n;
const M = 1234567891n;

let sum = 0n;
for(let i=0; i<n; i++){
  sum += BigInt(str[i].charCodeAt(0) - 96) * r;
  r *= 31n;
  r %= M;
  sum %= M;
}

console.log(Number(sum));