const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '1806.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const [N, S] = input[0].split(' ').map(Number);
const arr = input[1].split(' ').map(Number);

let answer = 100001;

let sum = [0];
for(let i=1; i<=N; i++) {
  sum[i] = sum[i-1] + arr[i-1];
}

for(let i=0; i<=N; i++) {
  let index = binarySearch(sum, sum[i] + S, i, N);
  if(index !== -1) {
    answer = Math.min(answer, index - i);
  }
}

if(answer === 100001) answer = 0;
console.log(answer);

function binarySearch(arr, target, start, end) {
  let temp = -1;
  while(start <= end) {
    let mid = Math.floor((start + end) / 2);
    if(arr[mid] >= target) {
      temp = mid;
      end = mid - 1;
    }
    else start = mid + 1;
  }
  return temp;
}