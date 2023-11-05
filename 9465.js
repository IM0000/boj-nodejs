const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '9465.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

let index = 0;
let T = +input[index++].trim();

while(T--) {
  const n = +input[index++].trim();
  const map = Array(2);
  map[0] = input[index++].split(' ').map(Number);
  map[1] = input[index++].split(' ').map(Number);
  
  const dp = Array.from(Array(2), ()=>Array(n).fill(0));

  dp[0][0] = map[0][0];
  dp[1][0] = map[1][0];
  dp[0][1] = map[1][0] + map[0][1];
  dp[1][1] = map[0][0] + map[1][1];

  for(let i=2; i<n; i++) {
    dp[0][i] = map[0][i] + Math.max(dp[1][i-1], dp[1][i-2]);
    dp[1][i] = map[1][i] + Math.max(dp[0][i-1], dp[0][i-2]);
  }

  console.log(Math.max(dp[0][n-1], dp[1][n-1]));
}


