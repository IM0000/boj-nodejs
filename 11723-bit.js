const filePath = process.platform === 'linux' ? '/dev/stdin' : '11723.txt';
const fs = require('fs');
const input = fs.readFileSync(filePath).toString().split('\n');

const M = +input.shift(); // 1 <= M <= 3,000,000

let S = 0b0;

// add x: S에 x를 추가한다. (1 ≤ x ≤ 20) S에 x가 이미 있는 경우에는 연산을 무시한다.
// remove x: S에서 x를 제거한다. (1 ≤ x ≤ 20) S에 x가 없는 경우에는 연산을 무시한다.
// check x: S에 x가 있으면 1을, 없으면 0을 출력한다. (1 ≤ x ≤ 20)
// toggle x: S에 x가 있으면 x를 제거하고, 없으면 x를 추가한다. (1 ≤ x ≤ 20)
// all: S를 {1, 2, ..., 20} 으로 바꾼다.
// empty: S를 공집합으로 바꾼다.
let answer = '';
input.forEach((e) => {
  let [func, x] = e.split(' ');
  x = Number(x);

  switch (func) {
    case 'add':
      S = (1 << x) | S;
      break;
    case 'remove':
      S = ~(1 << x) & S; 
      break;
    case 'check':
      if((1 << x) & S === 0) {
        answer += '0\n';
      } else {
        answer += '1\n';
      }
      break;
    case 'toggle':  
      S = (1 << x) ^ S;
      break;
    case 'all':
      S = 0b111111111111111111111;
      break;
    case 'empty':
      S = 0b0;
      break;
  }
});
console.log(answer);