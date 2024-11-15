const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : '10422.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const MOD = 1000000007n;
let T = +input.shift();
let arr = input.map(Number);

const dp = Array.from({length:2501}, ()=>BigInt(0));
dp[0] = 1n;
dp[1] = 1n;
for(let i=2; i<=2500; i++) {
  for(let j=0; j<=i-1; j++) {
    dp[i] += (dp[j] * dp[i-j-1]);
    dp[i] %= MOD;
  }
}

let ans = [];
for(let i=0; i<T; i++) {
  let n = arr[i];
  if(n % 2 === 1) {
    ans.push(0);
  } else {
    n = Math.floor(n/2);
    ans.push(dp[n]);
  }
}
console.log(ans.join('\n'));