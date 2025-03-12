// 약수의 합
const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '17425.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const N = +input.shift();

const prefixSum = Array(1000001).fill(1);

for (let i = 2; i <= 10; i++) {
  for (let j = 1; j * i <= 10; j++) {
    prefixSum[i * j] += i;
    console.log(
      '🚀 ~ file: 17425.js:12 ~ prefixSum[i * j]:',
      i * j,
      i,
      j,
      prefixSum[i * j]
    );
  }
  prefixSum[i] += prefixSum[i - 1];
}
const answer = input.map((elem) => prefixSum[+elem].toString()).join('\n');
console.log(answer);
