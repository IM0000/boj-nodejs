const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '28081.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [W, H, K] = input.shift().split(' ').map(Number);
const N = +input.shift().trim();
const yArr = input.shift().split(' ').map(Number);
const M = +input.shift().trim();
const xArr = input.shift().split(' ').map(Number);

let x = [0, ...xArr, W];
let y = [0, ...yArr, H];

let width = [],
  height = [];
for (let i = 0; i < x.length - 1; i++) {
  width.push(x[i + 1] - x[i]);
}
width.sort((a, b) => a - b);
for (let i = 0; i < y.length - 1; i++) {
  height.push(y[i + 1] - y[i]);
}
height.sort((a, b) => a - b);

const binarySearch = (target) => {
  let left = 0,
    right = height.length - 1;
  let idx = -1;
  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    if (height[mid] <= target) {
      left = mid + 1;
      idx = mid;
    } else {
      right = mid - 1;
    }
  }
  return idx;
};

let cnt = 0;
for (let i = 0; i < width.length; i++) {
  let idx = binarySearch(K / width[i]);
  cnt += idx + 1;
}
console.log(cnt);
