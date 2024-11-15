// 피자판매
const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '2632.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const c = +input.shift().trim();
const [n, m] = input.shift().trim().split(' ').map(Number);

const arr1 = [];
const arr2 = [];
for (let i = 0; i < n; i++) {
  arr1.push(+input.shift());
}
for (let i = 0; i < m; i++) {
  arr2.push(+input.shift());
}

const ac1 = Array.from(Array(n), () => Array(n).fill(0));
const ac2 = Array.from(Array(m), () => Array(m).fill(0));

for (let i = 0; i < n; i++) {
  ac1[i][0] = arr1[i];
  for (let j = 1; j < n; j++) {
    ac1[i][j] = ac1[i][j - 1] + arr1[(i + j) % n];
  }
}

for (let i = 0; i < m; i++) {
  ac2[i][0] = arr2[i];
  for (let j = 1; j < m; j++) {
    ac2[i][j] = ac2[i][j - 1] + arr2[(i + j) % m];
  }
}

const sum1 = [];
ac1.forEach((row) => sum1.push(...row.slice(0, -1)));
sum1.push(0);
sum1.sort((a, b) => a - b);
sum1.push(ac1[0][n - 1]);
const sum1count = {};
for (let i = 0; i < sum1.length; i++) {
  sum1count[sum1[i]] = (sum1count[sum1[i]] || 0) + 1;
}

const sum2 = [];
ac2.forEach((row) => sum2.push(...row.slice(0, -1)));
sum2.push(0);
sum2.sort((a, b) => a - b);
sum2.push(ac2[0][m - 1]);
const sum2count = {};
for (let i = 0; i < sum2.length; i++) {
  sum2count[sum2[i]] = (sum2count[sum2[i]] || 0) + 1;
}
// console.log('🚀 ~ file: 2632.js:52 ~ sum2count:', sum2count);

let cnt = 0;
for (let i = 0; i <= c; i++) {
  cnt += (sum1count[i] || 0) * (sum2count[c - i] || 0);
}
// function binarySearch(arr, target) {
//   let left = 0;
//   let right = arr.length - 1;

//   while (left <= right) {
//     const mid = Math.floor((left + right) / 2);

//     if (arr[mid] === target) {
//       return mid;
//     } else if (arr[mid] < target) {
//       left = mid + 1;
//     } else {
//       right = mid - 1;
//     }
//   }

//   return -1;
// }

// let cnt = 0;
// for (let i = 0; i < sum1.length; i++) {
//   const target = c - sum1[i];

//   if (target == 0) {
//     cnt++;
//     continue;
//   }
//   if (target < 0) break;

//   if (binarySearch(sum2, target) !== -1) {
//     cnt += sum2count[target];
//   }
// }
console.log(cnt);
