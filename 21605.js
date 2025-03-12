// 아름다운 수열
const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '21605.txt';
const input = +fs.readFileSync(filePath).toString().trim();

let answer = '';
for (let i = 0; i < input - 1; i++) {
  answer += '1 -1 ';
}
answer += '-1 1';
console.log(answer);
