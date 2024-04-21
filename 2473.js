const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '2473.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

let index = 0;
const N = +input[index++];
const arr = input[index++].split(' ').map(Number);
arr.sort((a, b) => a - b);

let min = Number.MAX_SAFE_INTEGER;
let answer = [];
for(let i=1; i<N-1; i++) {
  let m = arr[i];
  let left = i-1;
  let right = i+1;
  
  while(left >= 0 && right < N) {
    let sum = m + arr[left] + arr[right];
    if(Math.abs(sum) < min) {
      min = Math.abs(sum);
      answer = [arr[left], m, arr[right]];
    }

    if(sum < 0) {
      right++;
    } else if(sum > 0) {
      left--;
    } else if(sum === 0) {
      break;
    }
  }
}

console.log(answer.join(' '));