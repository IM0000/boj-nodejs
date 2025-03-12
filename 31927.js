// 렬정! 렬정! 렬정!
const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '31927.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const N = parseInt(input[0]);
const A = input[1].split(' ').map(Number);

const operations = [];
const K_limit = Math.floor(N / 2);

let x = 1000000;

for (let i = 0; i < K_limit; i++) {
  const idx1 = i;
  const idx2 = N - i - 1;

  A[idx1] += x;
  A[idx2] -= x;
  operations.push(A.join(' '));
  x -= 5000;
}

function isNonIncreasing(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] < arr[i + 1]) {
      return false;
    }
  }
  return true;
}

if (isNonIncreasing(A)) {
  console.log(operations.length);
  if (operations.length > 0) {
    console.log(operations.join('\n'));
  }
} else {
  console.log(-1);
}

// const CENTER_VALUE = arr[center];

// for (let i = 0; i < n; i++) {
//   arr[i] -= CENTER_VALUE;
// }
// console.log('🚀 ~ file: 31927.js:13 ~ arr:', arr);

// let l = 0;
// let r = n - 1;
// let answer = [];
// let cnt = 0;

// while (l < r) {
//   console.log('##');
//   let max = 5000;
//   // 0~center
//   for (let i = 0; i <= center; i++) {
//     max = Math.max(max, arr[i]);
//   }
//   console.log('🚀 ~ file: 31927.js:29 ~ max:', max);
//   console.log('🚀 ~ file: 31927.js:30 ~ arr[l]:', arr[l]);
//   let dif1 = max - arr[l];
//   console.log('🚀 ~ file: 31927.js:29 ~ dif1:', dif1);

//   let min = 1;
//   // center~last
//   for (let i = center + 1; i < n; i++) {
//     min = Math.min(min, arr[i]);
//   }
//   let dif2 = min + arr[r];
//   console.log('🚀 ~ file: 31927.js:37 ~ dif2:', dif2);

//   let dif = Math.max(dif1, Math.abs(dif2));

//   if (dif1 !== dif2) {
//     arr[l] += dif;
//     arr[r] -= dif;
//     let ans = '';
//     for (let i = 0; i < n; i++) {
//       ans = ans + (arr[i] + CENTER_VALUE) + ' ';
//     }
//     console.log('🚀 ~ file: 31927.js:47 ~ ans:', ans);
//     l++;
//     r--;
//     if (dif !== 0) {
//       answer.push(ans.trim());
//       cnt++;
//     }
//     console.log('🚀 ~ file: 31927.js:57 ~ cnt:', cnt);
//   } else if (dif1 < dif2) {
//     // arr[l] += dif1;
//     // arr[r] -= dif1;
//     // let ans = '';
//     // for (let i = 0; i < n; i++) {
//     //   ans = ans + (arr[i] + CENTER_VALUE) + ' ';
//     // }
//     // answer.push(ans.trim());
//     // l++;
//     // r--;
//     // cnt++;
//   } else {
//     l++;
//     r--;
//   }
// }
// console.log(answer);
// console.log(arr);

// let desc = true;
// for (let i = 0; i < n - 1; i++) {
//   if (arr[i] < arr[i + 1] && cnt >= center) {
//     desc = false;
//     break;
//   } else if (arr[i] < arr[i + 1]) {
//     cnt++;
//     let temp = arr[i];
//     arr[i] = arr[i + 1];
//     arr[i + 1] = temp;
//     answer.push(arr.map((item) => item + CENTER_VALUE).join(' '));
//   }
// }

// if (desc) {
//   console.log(cnt);
//   if (answer.length > 0) {
//     console.log(answer.join('\n'));
//   }
// } else {
//   console.log(-1);
// }
