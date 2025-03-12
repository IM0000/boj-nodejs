// 페스트리
const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '5625.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
let idx = 0;
const n = +input[idx++].trim();
const arr = [];
for (let i = 0; i < n; i++) {
  const triangle = input[idx++].trim().split(' ').map(Number);
  arr.push(triangle);
}
const X = Array(1000001).fill(0);
const Y = Array(1000001).fill(0);

for (let i = 0; i < arr.length; i++) {
  const max_x = Math.max(arr[i][0], arr[i][2], arr[i][4]);
  const min_x = Math.min(arr[i][0], arr[i][2], arr[i][4]);
  const max_y = Math.max(arr[i][1], arr[i][3], arr[i][5]);
  const min_y = Math.min(arr[i][1], arr[i][3], arr[i][5]);

  X[min_x + 1] += 1;
  X[max_x] -= 1;
  Y[min_y + 1] += 1;
  Y[max_y] -= 1;
}

const 누적X = [];
const 누적Y = [];
for (let i = 0; i < 1000001; i++) {
  if (i === 0) {
    누적X[i] = X[i];
    누적Y[i] = Y[i];
  } else {
    누적X[i] = 누적X[i - 1] + X[i];
    누적Y[i] = 누적Y[i - 1] + Y[i];
  }
}

const answer = [];
const m = +input[idx++].trim();
for (let i = 0; i < m; i++) {
  const [c, _, num] = input[idx++].trim().split(' ');
  if (c === 'x') {
    answer.push(누적X[Number(num)]);
  } else if (c === 'y') {
    answer.push(누적Y[Number(num)]);
  }
}
console.log(answer.join('\n'));
