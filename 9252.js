const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '9252.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const [a, b] = input;
const dp = Array.from(Array(a.length + 1), () => Array(b.length + 1).fill(0));

for(let i=1; i<=a.length; i++) {
  for(let j=1; j<=b.length; j++) {
    let max = Math.max(dp[i-1][j], dp[i][j-1]);
    dp[i][j] = a[i-1] === b[j-1] ? dp[i-1][j-1] + 1 : max;
  }
}

const len = dp[a.length][b.length];
let temp = len;
let lcs = len !== 0 ? Array(len) : [];

for(let i=a.length; i>0; i--) {
  if(temp === 0) break;
  for(let j=b.length; j>0; j--) {
    if(dp[i][j] !== dp[i-1][j] && dp[i][j] !== dp[i][j-1]) {
      lcs[temp-1] = b[j-1];
      temp--;
      i--;
      if(i === 0) break;
    } else if(dp[i][j] === dp[i-1][j]) {
      i--;
      j++;
      if(i === 0) break;
    }
  }
}
console.log(len);
if(len !== 0) console.log(lcs.join(''));

function print2DArray(arr) {
  for (let i = 0; i < arr.length; i++) {
    console.log(arr[i].join(''));
  }
}