const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '1562.txt';
const N = +fs.readFileSync(filePath).toString().trim();
const mod = 1000000000;

//dp[i][j][k] = 길이가 i이면서 j집합을 포함하고 k로 끝나는 계단수
const dp = Array.from({ length: N + 1 }, () => Array.from({ length: 1 << 10 }, () => Array(10).fill(0)));

for(let j=2; j<1024; j*=2) {
  dp[1][j][Math.log2(j)] = 1;
}

let answer = 0;
for(let i=2; i<=N; i++) {
  for(let j=0; j<1024; j++) {
    for(let k=0; k<10; k++) {
      if(i == 39 && (j | (1 << k)) === 1022 && k == 7) {
        var a=1022;
        console.log("🚀 ~ file: 1562.js:18 ~ 1022:", a.toString(2))
        console.log(j.toString(2), j);
        console.log((1<<k).toString(2), k);
        console.log('##');
      }
      if (k == 0) {
        dp[i][j | (1 << k)][k] = (dp[i][j | (1 << k)][k] % mod + dp[i - 1][j][k + 1] % mod) % mod;
      }
      else if (k == 9) {
        dp[i][j | (1 << k)][k] = (dp[i][j | (1 << k)][k] % mod + dp[i - 1][j][k - 1] % mod) % mod;
      }
      else {
        dp[i][j | (1 << k)][k] = (dp[i][j | (1 << k)][k] % mod + dp[i - 1][j][k - 1] % mod + dp[i - 1][j][k + 1] % mod) % mod;
      }
      if (i == N && j == 1023) {
        answer = (answer % mod + dp[i][j][k] % mod) % mod;
      }
    }
  }
}

console.log(answer);