const MOD = 1000000007;
function power(n, m) {
  let result = BigInt(1);
  m = BigInt(m);
  while(m > 0n) {
    if(m & 1n) result = (result * BigInt(n)) % BigInt(MOD);
    m >>= 1n;
    n = (BigInt(n) * BigInt(n)) % BigInt(MOD);
  }
  return result;
}

const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '13172.txt';
const input = fs.readFileSync(filePath).toString().split('\n');

let index = 0;
const M = Number(input[index++]);

let sum = 0n;
for (let i = 0; i < M; i++) {
  let [n, s] = input[index++].split(' '); // 숫자를 BigInt로 변환
  n = BigInt(n);
  s = BigInt(s);

  sum = (sum + ((s * (power(n, BigInt(MOD) - BigInt(2))) % BigInt(MOD)))) % BigInt(MOD); // BigInt 계산
}
console.log(Number(sum));