const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '11050.txt';
const [N, K] = fs.readFileSync(filePath).toString().trim().split(' ').map(Number);

function factorial(n) {
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}

const answer = factorial(N) / factorial(N-K) / factorial(K);
console.log(answer);