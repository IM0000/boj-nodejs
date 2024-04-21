const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : '1124.txt';
const [A, B] = fs
  .readFileSync(filePath)
  .toString()
  .trim()
  .split(' ')
  .map(Number);

const primeList = [];
const isPrime = new Array(100001).fill(true);
isPrime[0] = false;
isPrime[1] = false;
for (let i = 2; i <= 100000; i++) {
  if (isPrime[i]) {
    primeList.push(i);
    for (let j = i * i; j <= 100000; j += i) {
      isPrime[j] = false;
    }
  }
}

let answer = 0;
for (let i = A; i <= B; i++) {
  let num = numOfPrime(i);
  if(primeList.indexOf(num) > -1) answer++;
}
console.log(answer);

function numOfPrime(n) {
  let cnt = 0;
  for (let i = 0; i < primeList.length; i++) {
    if (primeList[i] > n) break;

    if (n % primeList[i] === 0) {
      n = n / primeList[i];
      cnt++;
      i = -1;
    }
  }
  return cnt;
}
