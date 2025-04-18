// 정산소
const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : '11735.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
let [n, q] = input.shift().split(' ').map(Number);
const query = input.map((item) => item.split(' '));
const answer = [];

// 15 + n
let firstSum = Array.from({ length: n }, (_, i) => i + 1).reduce(
  (acc, cur) => acc + cur,
  0
);
let sumArr = Array(n + 1).fill(0);
const cCheck = Array(n + 1).fill(false);
const rCheck = Array(n + 1).fill(false);
let C = 0;
let cCnt = 0;
let R = 0;
let rCnt = 0;
for (let i = 1; i <= n; i++) {
  sumArr[i] = firstSum + i * n;
}

for (let i = 0; i < query.length; i++) {
  let [cr, num] = query[i];
  num = Number(num);
  if (cr == 'C') {
    if (cCheck[num]) {
      answer.push(0);
    } else {
      answer.push(sumArr[num] - R - num * rCnt);
      C += num;
      cCnt++;
      cCheck[num] = true;
    }
  } else {
    if (rCheck[num]) {
      answer.push(0);
    } else {
      answer.push(sumArr[num] - C - num * cCnt);
      R += num;
      rCnt++;
      rCheck[num] = true;
    }
  }
}

console.log(answer.join('\n'));
