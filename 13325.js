const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '13325.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

let depth = +input.shift();
let arr = input.shift().split(' ').map(Number);
arr = [0, ...arr];
// console.log('🚀 ~ file: 13325.js:8 ~ arr:', arr);

let arrCount = Math.pow(2, depth + 1) - 1;
// console.log('🚀 ~ file: 13325.js:10 ~ arrCount:', arrCount);
// let addArr = Array(arrCount).fill(-1);
let leafCount = Math.pow(2, depth);
// console.log('🚀 ~ file: 13325.js:14 ~ leafCount:', leafCount);
let diffs = [0];

let max = 0;

for (let i = 1; i < arrCount; i++) {
  let pIdx = Math.floor((i - 1) / 2);
  diffs[i] = diffs[pIdx] + arr[i];

  if (max < diffs[i]) {
    max = diffs[i];
  }
}
// console.log('🚀 ~ file: 13325.js:25 ~ diffs:', diffs);

for (let i = arrCount - 1; i >= leafCount - 1; i--) {
  diffs[i] = max - diffs[i];
}
// console.log('🚀 ~ file: 13325.js:31 ~ diffs:', diffs);

for (let i = arrCount - 1; i > 0; i -= 2) {
  let left = diffs[i - 1];
  let right = diffs[i];
  let pIdx = Math.floor((i - 1) / 2);
  let tmp = Math.abs(left - right);
  // console.log('🚀 ~ file: 13325.js:38 ~ diff:', tmp);

  if (left > right) {
    arr[i - 1] = arr[i - 1] + tmp;
    diffs[pIdx] = right;
  } else if (left < right) {
    arr[i] = arr[i] + tmp;
    diffs[pIdx] = left;
  } else {
    diffs[pIdx] = left;
  }
}

let ans = 0;
for (let i = 1; i < arr.length; i++) {
  ans += arr[i];
}
console.log(ans);

// let maxIdx = 0;
// let leafArr = [];
// let leafStartIdx = arrCount - leafCount;

// for (let i = 1; i < arr.length; i++) {
//   let pIdx = Math.floor((i - 1) / 2);
//   treeSum[i] = treeSum[pIdx] + arr[i];
//   if (max < treeSum[i]) {
//     max = treeSum[i];
//     maxIdx = i;
//   }
//   if (i >= leafStartIdx) leafArr.push([treeSum[i], i]);
// }

// leafArr.sort((a, b) => b[0] - a[0]);

// for (let i = 0; i < leafArr.length; i++) {
//   let [sum, idx] = leafArr[i];
//   let tmp = 0;
//   let stack = [];

//   while (idx != 0) {
//     tmp += arr[idx];
//     stack.push([tmp, idx]);
//     idx = Math.floor((idx - 1) / 2);
//   }

//   let hp = max;

//   while (stack.length) {
//     let [tmp, idx] = stack.pop();
//     let pIdx = Math.floor((idx - 1) / 2);

//     if (i == 0) {
//       addArr[idx] = 0;
//       continue;
//     }

//     if (idx == 0 || addArr[idx] !== -1) {
//       continue;
//     }

//     if (addArr[idx] == -1) {
//       addArr[idx] = hp - tmp;
//       if (addArr[pIdx] !== -1)
//         addArr[idx] = hp - tmp - treeSum[pIdx] - addArr[pIdx];
//     }
//   }
// }
// let ans = 0;

// arr.forEach((item) => (ans += item));
// addArr.forEach((item) => {
//   if (item !== -1) ans += item;
// });
// console.log(ans);
