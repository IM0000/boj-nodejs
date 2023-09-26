const filePath = process.platform === 'linux' ? '/dev/stdin' : '10986.txt';
const fs = require('fs');
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const [N, M] = input.shift().split(' ').map(Number);
let sum = [];

// 구간 합 % M 구하기
input[0]
  .split(' ')
  .map(Number)
  .forEach((val, idx) => {
    if (idx === 0) {
      sum[idx] = val % M;
    } else {
      sum[idx] = (sum[idx - 1] + val) % M;
    }
  });

// sum 결과로 나온 숫자 카운팅
let cnt = [];
sum.forEach((val, idx) => {
  if (!cnt[val]) cnt[val] = 0;
  cnt[val]++;
});

// 답: 0의 갯수 + 같은수의 2개 선택하는 조합
let answer = 0;
cnt.forEach((val, idx) => {
  if (val !== 0) {
    if (idx === 0) {
      answer += cnt[idx];
    }
    let n = cnt[idx];
    answer += (n * (n - 1)) / 2;
  }
});

console.log(answer);
