// X와 K
// 8/2 = 4, 0
// 4/2 = 2, 0
// 2/2 = 1, 0
// 1/2 = 0, 1
// 1000
// X를 이진수로 바꾸고, 0인 자리를 파악
// k를 이진수로 바꿈
const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '1322.txt';
let [X, K] = fs.readFileSync(filePath).toString().trim().split(' ');
const xArr = Array(64).fill(0);
const cArr = Array(64).fill(0);
let c = BigInt(1);
for (let i = 0; i <= 64; i++) {
  if (BigInt(X) < c) break;
  if ((X >> i) & 1) {
    xArr[i] = 1;
  }
  c *= 2n;
}
K = parseInt(K).toString(2);

let idx = 0;
for (let i = 0; i <= K.length - 1; i++) {
  let num = Number(K[K.length - i - 1]);
  for (let j = idx; j <= 64; j++) {
    if (xArr[j] === 0) {
      idx = j + 1;
      xArr[j] = num;
      cArr[j] = num;
      break;
    }
  }
}
let answer = cArr.reverse().join('');
console.log(BigInt('0b' + answer).toString());
