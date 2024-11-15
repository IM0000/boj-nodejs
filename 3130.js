// 붙인드롬
const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '3130.txt';
const [n, m] = fs.readFileSync(filePath).toString().trim().split(' ');

function getP(N) {
  const list = [];

  if (N % 2 == 0) {
    // 짝수
    let half = N / 2;
    let start = 10 ** (half - 1);
    let end = 10 ** half - 1;

    for (let i = start; i <= end; i++) {}
  } else {
    // 홀수
  }
  return list;
}

let 길이, 나누는수;
let 자리수 = new Array(10).fill(0);
let 왼쪽 = new Array(1000000).fill(0);
let 오른쪽 = new Array(1000000).fill(0);

길이 = 2;
나누는수 = 10;

function 생성(i, 나머지) {
  console.log('🚀 ~ file: 3130.js:28 ~ i, 나머지:', i, 나머지);
  if (2 * i < 길이) {
    for (자리수[i] = 0; 자리수[i] < 10; ++자리수[i]) {
      생성(i + 1, (나머지 * 10 + 자리수[i]) % 나누는수);
    }
  } else if (i < 길이) {
    자리수[i] = 자리수[길이 - i - 1];
    생성(i + 1, (나머지 * 10 + 자리수[i]) % 나누는수);
  } else {
    if (자리수[0] !== 0) 왼쪽[나머지] += 1;
    오른쪽[나머지] += 1;
  }
}

생성(0, 0);
console.log(자리수);
console.log(왼쪽);
console.log(오른쪽);
