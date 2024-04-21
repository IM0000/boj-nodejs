const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : '2643.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

let n = +input.shift();
let arr = input.map(item => item.split(' ').map(Number).sort((a,b) => b-a));

arr.sort((a,b) => {
  if(a[0] === b[0]) return b[1]-a[1];
  return b[0]-a[0];
});

const dp = Array.from({length:n}, (_,i) => [1,arr[i][1]]);
let max = 1;
for(let i=0; i<n; i++) {
  for(let j=i-1; j>=0; j--) {
    if(dp[j][1] >= arr[i][1] && dp[j][0] + 1 > dp[i][0]) {
      dp[i][0] = dp[j][0] + 1;
      dp[i][1] = arr[i][1];
      max = Math.max(max, dp[i][0]);
    }
  }
}
console.log(max)