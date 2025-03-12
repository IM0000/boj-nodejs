// 네 개의 소수
const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '1153.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const N = +input[0].trim();
const primes = Array(1000001).fill(true);
primes[0] = primes[1] = false;
for (let i = 0; i * i <= 1000000; i++) {
  if (primes[i]) {
    for (let j = i * i; j <= 1000000; j += i) {
      primes[j] = false;
    }
  }
}

function findPrime(num) {
  for (let i = 2; i <= Math.floor(num / 2); i++) {
    if (primes[i] && primes[num - i]) {
      return `${i} ${num - i}`;
    }
  }
  return false;
}

let answer = '-1';

let x = findPrime(N - 4);
if (x !== false) {
  answer = '2 2 ' + x;
} else {
  let y = findPrime(N - 5);
  if (y !== false) {
    answer = '2 3 ' + y;
  }
}

console.log(answer);
