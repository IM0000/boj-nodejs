const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : '15961.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

let index = 0;
// 접시의 수 N, 초밥의 가짓수 d, 연속해서 먹는 접시의 수 k, 쿠폰 번호 c
let [N, d, k, c] = input[index++].split(' ').map(Number);
let arr = [];
for (let i = 0; i < N; i++) {
  arr.push(Number(input[index++]));
}
let cnt = 1;
let max = 0;
const check = new Array(d + 1).fill(0);
check[c] = 1;
let s = 0;
let e = k - 1;

for(let i = 0; i < k; i++) {
  if(check[arr[i]]++ == 0) cnt++;
}

for(let i = 0; i < N; i++) {
  if(--check[arr[s]] == 0) cnt--;
  s = (s + 1) % N;
  e = (e + 1) % N;
  if(check[arr[e]]++ == 0) cnt++;
  if(cnt > max) max = cnt;
}

console.log(max);