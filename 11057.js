const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : '11057.txt';
const N = +fs.readFileSync(filePath, 'utf-8').toString().trim();

const dp = Array.from({length:N+1}, ()=>Array(10));

for(let i=0; i<10; i++) {
  dp[1][i] = 1;
}

for(let i=2; i<=N; i++) {
  for(let j=0; j<10; j++) {
    let sum = 0;
    for(let k=0; k<=j; k++) {
      sum = (sum + dp[i-1][k]) % 10007;
    }
    dp[i][j] = sum;
  }
}

let ans = dp[N].reduce((acc, cur) => (acc + cur) % 10007);
console.log(ans);