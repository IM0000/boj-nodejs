const input = require('fs')
  .readFileSync('input.txt', 'utf-8')
  .toString()
  .trim()
  .split('\n');

const [n, k] = input[0].split(' ').map(Number);
const road = Array(1000001).fill(0);
const arr = [];
let maxX = -1;
for (let i = 1; i <= n; i++) {
  let [g, x] = input[i].split(' ').map(Number);
  if (maxX < x) {
    maxX = x;
  }
  road[x] = g;
  arr.push([g, x]);
}

// 초기 윈도우 합 계산 (예: 0 ~ min(K, maxX))
let currentSum = 0;
for (let i = 0; i <= Math.min(k, maxX); i++) {
  currentSum += road[i];
}
let maxSum = currentSum;

for (let i = 1; i <= maxX; i++) {
  if (i - k - 1 >= 0) {
    currentSum -= road[i - k - 1];
  }
  if (i + k <= maxX) {
    currentSum += road[i + k];
  }
  if (currentSum > maxSum) {
    maxSum = currentSum;
  }
}
console.log(maxSum);
