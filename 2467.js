const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '2467.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const N = +input[0];
const arr = input[1].split(' ').map(Number);
let ans = [];
let min = Number.MAX_SAFE_INTEGER;

for(let i=0; i<arr.length-1; i++){
  let tmp = arr[i];
  let left = i+1;
  let right = arr.length-1;

  while(left <= right){
    let mid = Math.floor((left+right)/2);
    let sum = Math.abs(tmp + arr[mid]);
    if(sum < min){
      min = sum;
      ans = [tmp, arr[mid]];
    }
    if(tmp + arr[mid] > 0) right = mid-1;
    else left = mid+1;
  }
}

console.log(ans.join(' '));