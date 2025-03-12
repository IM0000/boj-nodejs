// 올바른 괄호
const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '24552.txt';

// 입력 읽기
const input = fs.readFileSync(filePath).toString().trim();

let leftCnt = 0;
let rightCnt = 0;
let sum = 0;

for (let i = 0; i < input.length; i++) {
  if (input[i] === '(') {
    leftCnt++;
    sum++;
  } else if (input[i] === ')') {
    rightCnt++;
    sum--;
  }

  if (sum < 0) {
    console.log(rightCnt);
    process.exit(0);
  }

  if (sum === 0) {
    leftCnt = 0;
  }
}

console.log(leftCnt);
