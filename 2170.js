// 선 긋기
const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : '2170.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const n = +input[0].trim();
const arr = input.slice(1).map((x) => x.split(' ').map(BigInt));
arr.sort((a, b) => {
  if (a[0] === b[0]) {
    return a[1] < b[1] ? -1 : a[1] > b[1] ? 1 : 0;
  }
  return a[0] < b[0] ? -1 : 1;
});
let sum = 0n;

let [cx, cy] = arr[0];
for (let i = 1; i < n; i++) {
  let [nx, ny] = arr[i];

  if (nx <= cy && cy <= ny) {
    cy = ny;
  } else if (cy > ny) {
  } else {
    sum += cy - cx;
    cx = nx;
    cy = ny;
  }
}
sum += cy - cx;
console.log(sum.toString());
