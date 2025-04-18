// 행렬 곱셈 순서 4
const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : '25683.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
let n = +input[0].trim();
let arr = [];
for (let i = 0; i < n; i++) {
  arr.push(input[i + 1].split(' ').map(BigInt));
}
let lastCol = arr[arr.length - 1][1];
let answer = 0n;
while (arr.length > 1) {
  let cal;
  let [r, c] = arr.pop();
  let [prevR, prevC] = arr[arr.length - 1];
  cal = prevR * prevC * lastCol;
  answer += cal;
}
console.log(answer.toString());
