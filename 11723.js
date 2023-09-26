let S = {};
let fn = {};
// add x: S에 x를 추가한다. (1 ≤ x ≤ 20) S에 x가 이미 있는 경우에는 연산을 무시한다.
fn.add = (x) => {
  !S[x] ? (S[x] = x) : '';
};
// remove x: S에서 x를 제거한다. (1 ≤ x ≤ 20) S에 x가 없는 경우에는 연산을 무시한다.
fn.remove = (x) => {
  !!S[x] ? (S[x] = undefined) : '';
};
// check x: S에 x가 있으면 1을, 없으면 0을 출력한다. (1 ≤ x ≤ 20)
let answer = '';
fn.check = (x) => {
  !!S[x] ? (answer += '1\n') : (answer += '0\n');
};
// toggle x: S에 x가 있으면 x를 제거하고, 없으면 x를 추가한다. (1 ≤ x ≤ 20)
fn.toggle = (x) => {
  !S[x] ? (S[x] = x) : (S[x] = undefined);
};
// all: S를 {1, 2, ..., 20} 으로 바꾼다.
fn.all = () => {
  S = {};
  for (let i = 1; i < 21; i++) {
    S[i] = i;
  }
};
// empty: S를 공집합으로 바꾼다.
fn.empty = () => {
  S = {};
};

const filePath = process.platform === 'linux' ? '/dev/stdin' : '11723.txt';
const fs = require('fs');
const input = fs.readFileSync(filePath).toString().split('\n');

const M = +input.shift(); // 1 <= M <= 3,000,000

input.forEach(e=>{
  let [fnStr, x] = e.split(' ');
  fn[fnStr](x);
})

console.log(answer);