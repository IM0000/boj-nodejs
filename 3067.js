const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : '3067.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

let index = 0;
let T = +input[index++].trim();

while(T--) {
  let N = +input[index++].trim();
  let coins = input[index++].trim().split(' ').map(Number);
  let target = +input[index++].trim();

  let dp = Array.from({length: target + 1}, () => 0);
  dp[0] = 1;

  for(let coin of coins) {
    for(let i=coin; i<=target; i++) {
      dp[i] += dp[i - coin];
    }
  }
  console.log(dp[target]);
}