// 신을 모시는 사당
const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : '27210.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const n = +input[0].trim();
const arr = input[1].split(' ').map(Number);
const a = [0];
for (let i = 0; i < n; i++) {
  if (arr[i] === 2) {
    a.push(-1);
  } else {
    a.push(1);
  }
}
// maxDp[i] => 처음부터 i번째 돌상까지 고려했을때, i번째에서 끝나는 연속구간의 최대 합
const maxDp = Array(n + 1).fill(0);
const minDp = Array(n + 1).fill(0);
maxDp[1] = a[1];
minDp[1] = a[1];

for (let i = 2; i <= n; i++) {
  maxDp[i] = Math.max(a[i], maxDp[i - 1] + a[i]);
  minDp[i] = Math.min(a[i], minDp[i - 1] + a[i]);
}

let max = 0;
let min = Infinity;
for (let i = 1; i <= n; i++) {
  max = Math.max(max, maxDp[i]);
  min = Math.min(min, minDp[i]);
}

let answer = Math.max(max, Math.abs(min));
console.log(answer);
