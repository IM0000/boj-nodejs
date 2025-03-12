// 누가 이길까
const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : '28449.txt';
const input = fs.readFileSync(filePath).toString().split('\n');
const [n, m] = input[0].split(' ').map(Number);
const nArr = input[1].split(' ').map(Number);
const mArr = input[2].split(' ').map(Number);

nArr.sort((a, b) => a - b);
mArr.sort((a, b) => a - b);
let mMap = {};
mArr.forEach((x) => {
  if (mMap[x] === undefined) {
    mMap[x] = 1;
  } else {
    mMap[x]++;
  }
});

let HI = 0;
let ARC = 0;
let D = 0;
let isDraw;

for (let i = 0; i < nArr.length; i++) {
  let hi = nArr[i];
  isDraw = false;
  let index = lowerBound(mArr, hi);
  if (isDraw) {
    D += mMap[mArr[index]];
    HI += index;
    ARC += mArr.length - (index + mMap[mArr[index]]);
  } else {
    HI += index;
    ARC += mArr.length - index;
  }
}

console.log(`${HI} ${ARC} ${D}`);

function lowerBound(arr, target) {
  let l = 0,
    r = arr.length;
  while (l < r) {
    let mid = Math.floor((l + r) / 2);
    if (arr[mid] < target) {
      l = mid + 1;
    } else {
      r = mid;
      if (arr[mid] === target) {
        isDraw = true;
      }
    }
  }
  return l;
}
