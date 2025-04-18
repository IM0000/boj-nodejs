// 조금 똑똑한 뢰벗과 조금 잘생긴 사냐
// 제켄도르프 정리 : 모든 자연수는 인접하지 않은 피보나치 수의 합으로 표현 가능하며, 그 조합은 유일하다.
// 1 1 2 3 5 8 13 21 34 55 89
// 10 => 2 8
const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : '14856.txt';
const num = fs.readFileSync(filePath).toString().trim();
const fibArr = [1n, 2n];
for (let i = 2; i < 88; i++) {
  fibArr[i] = fibArr[i - 1] + fibArr[i - 2];
}

let bigNum = BigInt(num);

const answer = [];
let k = 88;
while (k--) {
  if (fibArr[k] <= bigNum) {
    answer.push(fibArr[k]);
    bigNum -= fibArr[k];
  }
  if (bigNum === 0n) {
    break;
  }
}

console.log(answer.length);
console.log(answer.reverse().join(' '));
