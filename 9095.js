let arr = require('fs')
//   .readFileSync('/dev/stdin')
  .readFileSync('9095.txt')
  .toString()
  .trim()
  .split('\n')
  .map(e=>e.trim());

const T = arr[0];
arr = arr.slice(1);

// f(n-3) + f(n-2) + f(n-1)
var dp = new Array(10).fill(undefined);
dp[0] = 1, dp[1] = 2, dp[2] = 4;

for(var i = 3; i < 10; i++) {
    dp[i] = dp[i-1] + dp[i-2] + dp[i-3];
}

for(var i = 0; i < arr.length; i++) {
    console.log(dp[arr[i] - 1]);
}