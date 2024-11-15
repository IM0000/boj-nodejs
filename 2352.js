// 반도체 설계
const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '2352.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const n = +input[0].trim();
const arr = input[1].trim().split(' ').map(Number);

const rArr = [];

for (let i = 0; i < arr.length; i++) {
  if (rArr.length === 0 || rArr[rArr.length - 1] < arr[i]) {
    rArr.push(arr[i]);
    continue;
  }

  let idx = binarySearch(arr[i], rArr);
  rArr[idx] = arr[i];
}

console.log(rArr.length);

function binarySearch(target, arr) {
  let l = 0;
  let r = arr.length - 1;

  while (l <= r) {
    let mid = Math.floor((l + r) / 2);
    if (arr[mid] < target) {
      l = mid + 1;
    } else {
      r = mid - 1;
    }
  }
  return l;
}
