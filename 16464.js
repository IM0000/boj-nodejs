// 가주아
const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '16464.txt';
const [n, ...arr] = fs.readFileSync(filePath).toString().trim().split('\n');
const N = +n;
const answer = [];
for (let i = 0; i < N; i++) {
  let num = +arr[i].trim();
  if (num % 2 === 1) {
    answer.push('Gazua');
    continue;
  }

  while (num !== 1) {
    if (num % 2 === 1) break;
    num /= 2;
  }

  if (num === 1) answer.push('GoHanGang');
  else answer.push('Gazua');
}

console.log(answer.join('\n'));
