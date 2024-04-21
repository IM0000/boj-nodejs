const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '10942.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
let index = 0;
const N = +input[index++];
const arr = input[index++].split(' ').map(Number);
const M = +input[index++];
const dp = Array.from(Array(N), () => Array(N).fill(0));

for(let i=0; i<N; i++) {
  dp[i][i] = true;
}

for(let i=N-1; i>=0; i--) {
  for(let j=i+1; j<N; j++) {
    if(j-i === 1 || j-i === 2) {
      dp[i][j] = arr[i] === arr[j];
    } else {
      dp[i][j] = arr[i] === arr[j] && dp[i+1][j-1];
    }
  }
}

let ans = [];
for(let i=0; i<M; i++) {
  const [s,e] = input[index++].split(' ').map(Number);
  ans.push(dp[s-1][e-1] ? 1 : 0);
}
console.log(ans.join('\n'));