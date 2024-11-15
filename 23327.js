const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '23327.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

let index = 0;
let [n, q] = input[index++].split(' ').map(Number);
let arr = input[index++].split(' ').map(Number);
arr = [0, ...arr];
// 덧셈 누적합
let addArr = [0, arr[1]];
for (let i = 2; i <= n; i++) {
  addArr[i] = addArr[i - 1] + arr[i];
}
// console.log('🚀 ~ file: 23327.js:14 ~ addArr:', addArr);

// 곱셈 누적합
let mulArr = [0, 0, arr[1] * arr[2]];
for (let i = 3; i <= n; i++) {
  mulArr[i] = mulArr[i - 1] + arr[i] * addArr[i - 1];
}
// console.log('🚀 ~ file: 23327.js:20 ~ mulArr:', mulArr);

function sol(l, r) {
  let minus = 0;
  minus = addArr[l - 1] * (addArr[r] - addArr[l - 1]);
  // 1부터 시작할 떄 값
  let temp = mulArr[r] - mulArr[l - 1] - minus;
  return temp;
}

let answer = [];
for (let i = 0; i < q; i++) {
  let [l, r] = input[index++].split(' ').map(Number);
  answer.push(sol(l, r));
}
console.log(answer.join('\n'));
