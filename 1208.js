const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '1208.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [N,S] = input[0].split(' ').map(Number);
const arr = input[1].split(' ').map(Number);

const map = {};
let cnt = 0;

leftSum(0,0);
rightSum(Math.floor(N/2),0);

if(S == 0) {
  cnt -= 1;
}

console.log(cnt);

function leftSum(idx, sum) {
  if(idx == Math.floor(N/2)) {
    if(map[sum]) map[sum]++;
    else map[sum] = 1;
    return;
  }

  leftSum(idx+1, sum+arr[idx]);
  leftSum(idx+1, sum);
}

function rightSum(idx, sum) {
  if(idx == N) {
    if(map[S-sum]) cnt += map[S-sum];
    return;
  }

  rightSum(idx+1, sum+arr[idx]);
  rightSum(idx+1, sum);
}