const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : '1744.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

let N = +input.shift();
let arr = [...input].map(Number);

let answer = 0;
let minus = [];
let plus = [];
for(let i=0; i<arr.length; i++) {
  let num = Number(arr[i]);

  if(num <= 0) minus.push(num);
  else if(num > 1) plus.push(num);
  else answer += num;
}

minus.sort((a, b) => a - b);
plus.sort((a, b) => b - a);

for(let i=0; i<minus.length; i+=2) {
  if(i+1 >= minus.length) answer += minus[i];
  else answer += (minus[i] * minus[i+1]);
}

for(let i=0; i<plus.length; i+=2) {
  if(i+1 >= plus.length) answer += plus[i];
  else answer += (plus[i] * plus[i+1]);
}

console.log(answer);
// 0이 있고 마이너스가 홀수 -> 가장 큰 마이너스와 0을 곱함
// 0이 없고 마이너스가 홀수 -> 가장 큰 마이너스만 남김
// 마이너스가 짝수이면 0은 어느 수와도 곱하지 않음
// 1은 어느 수와도 곱하지 않음