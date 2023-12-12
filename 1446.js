const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '1446.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

let index = 0;
const [N, D] = input[index++].trim().split(' ').map(Number);

const p = [];
for(let i=0; i<N; i++) {
  const [u,v,w] = input[index++].trim().split(' ').map(Number);
  if(v > D) continue;
  if(v-u < w) continue;
  
  if(!p[v]) p[v] = [];
  p[v].push([u,w]);
}
// console.log(p)
const dp = [];
dp[0] = 0;
for(let i=1; i<=D; i++) {
  dp[i] = i;
  if(p[i]) {
    let min = 10000;
    for(let j=0; j<p[i].length; j++) {
      min = Math.min(min, dp[p[i][j][0]] + p[i][j][1]);
    }
    dp[i] = Math.min(min, dp[i]);
  }
  dp[i] = Math.min(dp[i], dp[i-1] + 1);
}

console.log(dp[D])