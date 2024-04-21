const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : '14003.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const N = +input.shift();
const arr = input[0].split(' ').map(Number);
let idxArr = Array(arr.length).fill(-1);

let sub = [];
sub.push(arr[0]);
idxArr[0] = 0;

for(let i=1; i<N; i++) {
  let n = arr[i];
  if(n > sub[sub.length-1]) {
    sub.push(n);
    idxArr[i] = sub.length-1;
  } else {
    let idx = binarySearch(sub, n);
    sub[idx] = n;
    idxArr[i] = idx;
  }
}

let answer = Array(sub.length).fill(0);

let seek = sub.length-1;
for(let i=arr.length-1; i>=0; i--) {
  if(idxArr[i] === seek) {
    answer[seek] = arr[i];
    seek--;
  }
}
console.log(answer.length)
console.log(answer.join(' '))

function binarySearch(arr, target) {
  let start = 0;
  let end = arr.length-1;
  let mid,idx;
  while(start <= end) {
    mid = Math.floor((start+end)/2);
    if(arr[mid] >= target) {
      idx = mid;
      end = mid-1;
    }
    else start = mid+1;
  }
  return idx;
}
