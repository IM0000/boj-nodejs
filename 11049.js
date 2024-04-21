const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '11049.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

let N = +input[0].trim();
let arr = [];

for(let i=1; i<=N; i++) {
  arr.push(input[i].trim().split(' ').map(Number));
}

let dp = Array.from({length: N}, ()=>Array(N).fill(0));

for(let i=0; i<N-1; i++) {
  dp[i][i+1] = arr[i][0] * arr[i+1][0] * arr[i+1][1];
}

for(let gap=2; gap<N; gap++) {
  for(let left=0; left<N-gap; left++) {
    let right = left + gap;
    dp[left][right] = Number.MAX_SAFE_INTEGER;

    for(let m=left; m<right; m++) {
      let count = dp[left][m] + dp[m+1][right] + arr[left][0] * arr[m][1] * arr[right][1];
      dp[left][right] = Math.min(dp[left][right], count);
    }
  }
}
console.log(dp[0][N-1]);