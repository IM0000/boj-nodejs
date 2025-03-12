const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : '1456.txt';
const input = fs
  .readFileSync(filePath)
  .toString()
  .trim()
  .split(' ')
  .map(BigInt);

const [A, B] = input;
const maxPrime = 10000000; // 최대 소수 탐색 범위 (10^7)
const primes = Array(maxPrime + 1).fill(true);
primes[0] = primes[1] = false;
for (let i = 2; i <= maxPrime; i++) {
  // 최대 탐색 범위까지 소수 판별
  if (primes[i]) {
    for (let j = i * i; j <= maxPrime; j += i) {
      primes[j] = false;
    }
  }
}

let cnt = 0n;
for (let i = 2n; i <= maxPrime; i++) {
  // 최대 탐색 범위까지 소수 순회
  if (primes[i]) {
    let num = i * i;
    while (num <= B) {
      if (num >= A) {
        cnt++;
      }
      if (num > B / i) break; // overflow 방지
      num *= i;
    }
  }
}
console.log(cnt.toString());
