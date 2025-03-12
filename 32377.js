// 풍선 터트리기
const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : '32377.txt';
const input = fs.readFileSync(filePath).toString().split(' ').map(BigInt);

const n = input[0];
let max = 0n;
for (let i = 1; i <= 3; i++) {
  if (max < input[i]) {
    max = input[i];
  }
}
max *= n;

let left = 1n;
let right = max;

while (left <= right) {
  let mid = (left + right) / 2n;

  let count = 0n;

  for (let i = 1; i <= 3; i++) {
    count += mid / input[i];
  }

  if (count < n) {
    left = mid + 1n;
  } else {
    right = mid - 1n;
  }
}

let preCount = 0n;
for (let i = 1; i <= 3; i++) {
  preCount += (left - 1n) / input[i];
}

for (let i = 1; i <= 3; i++) {
  if (left % input[i] === 0n) {
    preCount++;
    if (preCount === n) {
      if (i === 1) {
        console.log('A win');
      } else if (i === 2) {
        console.log('B win');
      } else {
        console.log('C win');
      }
    }
  }
}
