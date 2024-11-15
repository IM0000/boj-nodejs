const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '12762.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
let N = +input[0];
let arr1 = input[1].split(' ').map(Number);
let arr2 = [...arr1].reverse();
let dp1 = Array(N).fill(1);
let dp2 = Array(N).fill(1);

// 0에서부터 감소하는 부분 수열
for (let i = 0; i < N; i++) {
  for (let j = 0; j < i; j++) {
    if (arr1[i] < arr1[j]) {
      dp1[i] = Math.max(dp1[i], dp1[j] + 1);
    }
  }
}

// N-1에서부터 감소하는 부분 수열
for (let i = 0; i < N; i++) {
  for (let j = 0; j < i; j++) {
    if (arr2[i] < arr2[j]) {
      dp2[i] = Math.max(dp2[i], dp2[j] + 1);
    }
  }
}
dp2 = [...dp2].reverse();

let max = 0;
for (let i = 0; i < N; i++) {
  max = Math.max(max, dp1[i] + dp2[i] - 1);
}
console.log(max);

// let lds = [arr[0]];
// let ldsCnt = [1];
// for (let i = 1; i < N; i++) {
//   let num = arr[i];
//   if (lds[lds.length - 1] > num) {
//     lds.push(num);
//   } else {
//     let idx = binarySearch(0, lds.length - 1, num, arr);
//     lds[idx] = num;
//   }
//   ldsCnt.push(lds.length);
// }

// var rArr = [...arr].reverse();
// let lds2 = [rArr[0]];
// let ldsCnt2 = [1];
// for (let i = 1; i < N; i++) {
//   let num = rArr[i];
//   if (lds2[lds2.length - 1] > num) {
//     lds2.push(num);
//   } else {
//     let idx = binarySearch(0, lds2.length - 1, num, rArr);
//     lds2[idx] = num;
//   }
//   ldsCnt2.push(lds2.length);
// }
// lds2 = [...lds2].reverse();
// ldsCnt2 = [...ldsCnt2].reverse();

// let max = 0;
// let crossIdx = -1;
// for (let i = 0; i < ldsCnt.length - 1; i++) {
//   if (max < ldsCnt[i] + ldsCnt2[i + 1]) {
//     max = ldsCnt[i] + ldsCnt2[i + 1];
//     crossIdx = i;
//   }
// }
// if (arr[crossIdx] == arr[crossIdx + 1]) {
//   console.log(max - 1);
// } else {
//   console.log(max);
// }

function binarySearch(s, e, target, arr) {
  let idx = e;
  while (s <= e) {
    let mid = Math.floor((s + e) / 2);

    if (arr[mid] == target) {
      return mid;
    } else if (arr[mid] < target) {
      e = mid - 1;
      idx = mid;
    } else {
      s = mid + 1;
    }
  }
  return idx;
}
